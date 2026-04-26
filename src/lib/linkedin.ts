type Locale = "en" | "es";

interface BlogPost {
  slug: string;
  title: { en: string; es: string };
  excerpt: { en: string; es: string };
  content: { en: string; es: string };
  category: string;
  tags: string[];
  author: string;
  publishedAt: string;
  readTime?: number;
  featured: boolean;
  image: string;
  imagePrompt?: string;
}

export interface LinkedInPostData {
  accessToken: string;
  authorUrn: string;
  content: string;
  imageUrl: string;
  articleUrl: string;
  title: { en: string; es: string };
}

/**
 * Formats promotional content for LinkedIn with emojis and call-to-action
 */
export function formatLinkedInPost(post: BlogPost, locale: Locale): string {
  const { title, excerpt, slug } = post;
  // For Node.js environment, we'll get the URL from process.env or use a default
  const baseUrl = process.env.VITE_SITE_URL || "https://yourblog.com";
  const articleUrl = `${baseUrl}/${locale}/blog/${slug}`;

  // Emoji-rich promotional format
  const emojiTitle = title[locale].includes("AI") 
    ? `🤖 ${title[locale]} ` 
    : title[locale].includes("Tutorial") 
      ? `📚 ${title[locale]} ` 
      : title[locale].includes("Productivity") 
        ? `⚡ ${title[locale]} ` 
        : `📝 ${title[locale]} `;

  const content = `
${emojiTitle}

${excerpt[locale]}

🔗 Read the full article: ${articleUrl}

#AI #Developer #Tech #Programming #Innovation
  `.trim();

  return content;
}

/**
 * Exchange authorization code for access token
 */
export async function exchangeCodeForToken(
  code: string,
  redirectUri: string
): Promise<{ accessToken: string }> {
  const clientId = process.env.VITE_LINKEDIN_CLIENT_ID;
  const clientSecret = process.env.VITE_LINKEDIN_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    throw new Error("LinkedIn client credentials not configured");
  }

  const params = new URLSearchParams({
    grant_type: "authorization_code",
    code,
    redirect_uri: redirectUri,
    client_id: clientId,
    client_secret: clientSecret,
  });

  const response = await fetch("https://www.linkedin.com/oauth/v2/accessToken", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: params.toString(),
  });

  if (!response.ok) {
    throw new Error(`Failed to get access token: ${response.statusText}`);
  }

  return response.json();
}

/**
 * Get user profile to obtain author URN
 */
export async function getUserProfile(accessToken: string): Promise<{ id: string }> {
  const response = await fetch("https://api.linkedin.com/v2/me", {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to get user profile: ${response.statusText}`);
  }

  return response.json();
}

/**
 * Upload image to LinkedIn
 */
export async function uploadImageToLinkedIn(
  accessToken: string,
  imageUrl: string
): Promise<string> {
  // First, we need to register the upload
  const registerResponse = await fetch(
    "https://api.linkedin.com/v2/assets?action=registerUpload",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        registerUploadRequest: {
          recipes: ["urn:li:digitalmediaRecipe:feedshare-image"],
          owner: "urn:li:person:{{userId}}",
          serviceRelationships: [
            {
              identifier: "urn:li:userGeneratedContent",
              relationshipType: "OWNER",
            },
          ],
          supportedUploadMechanism: ["SYNCHRONOUS_UPLOAD"],
        },
      }),
    }
  );

  if (!registerResponse.ok) {
    throw new Error(`Failed to register image upload: ${registerResponse.statusText}`);
  }

  const registerData = await registerResponse.json();
  const uploadUrl = registerData.value.uploadMechanism[
    "com.linkedin.digitalmedia.uploading.MediaUploadHttpRequest"
  ].uploadUrl;
  const asset = registerData.value.asset;

  // Download the image from our server
  const imageResponse = await fetch(imageUrl);
  if (!imageResponse.ok) {
    throw new Error(`Failed to fetch image: ${imageResponse.statusText}`);
  }
  const imageBuffer = await imageResponse.arrayBuffer();

  // Upload the image to LinkedIn
  const uploadResponse = await fetch(uploadUrl, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    body: imageBuffer,
  });

  if (!uploadResponse.ok) {
    throw new Error(`Failed to upload image: ${uploadResponse.statusText}`);
  }

  return asset;
}

/**
 * Create a LinkedIn post with image and content
 */
export async function createLinkedInPost(
  accessToken: string,
  authorUrn: string,
  content: string,
  imageAsset: string
): Promise<void> {
  const response = await fetch("https://api.linkedin.com/v2/ugcPosts", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
      "X-Restli-Protocol-Version": "2.0.0",
    },
    body: JSON.stringify({
      author: `urn:li:person:${authorUrn}`,
      lifecycleState: "PUBLISHED",
      specificContent: {
        "com.linkedin.ugc.ShareContent": {
          shareCommentary: {
            text: content,
          },
          shareMediaCategory: "IMAGE",
          media: [
            {
              status: "READY",
              description: {
                text: "Hero image from AI Writer Dev Blog",
              },
              media: imageAsset,
              title: {
                text: "AI Writer Dev Blog",
              },
            },
          ],
        },
      },
      visibility: {
        "com.linkedin.ugc.MemberNetworkVisibility": "PUBLIC",
      },
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Failed to create LinkedIn post: ${response.statusText} - ${errorText}`);
  }
}