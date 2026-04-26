#!/usr/bin/env node

import { mkdir, readFile, writeFile } from "node:fs/promises";
import { spawn } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const repoRoot = path.resolve(__dirname, "..");
const postsFile = path.join(repoRoot, "src", "data", "posts.ts");
const draftsDir = path.join(repoRoot, "content", "drafts");
const articleImagesDir = path.join(repoRoot, "public", "articles");
const envFile = path.join(repoRoot, ".env");
const promptsFile = path.join(repoRoot, "prompts.md");

const defaultImageStylePreset = [
  "Create a horizontal editorial hero illustration for a modern developer blog.",
  "Use a restrained visual system aligned to the site design: crisp white or light neutral background, deep charcoal shadows, and green accent lighting close to emerald terminal green.",
  "Compose the scene with one clear technical focal point related to the article topic, plus subtle supporting abstract shapes, grids, panels, or code-inspired geometry.",
  "Use clean depth, soft gradients, elegant contrast, and intentional negative space so headlines could sit on top if needed.",
  "Style should feel premium, minimal, sharp, and consistent across articles.",
  "Do not include logos, brand marks, screenshots, UI chrome, watermarks, or readable text inside the image.",
  "Avoid cartoonish styles, stock-photo look, random colors, busy scenes, and inconsistent visual metaphors.",
].join(" ");

const allowedCategories = [
  "ai-tools",
  "tutorials",
  "productivity",
  "automation",
  "guides",
  "machine-learning",
  "apis",
];

function parseArgs(argv) {
  const args = {};

  for (let i = 0; i < argv.length; i += 1) {
    const token = argv[i];
    if (!token.startsWith("--")) {
      continue;
    }

    const key = token.slice(2);
    const next = argv[i + 1];

    if (!next || next.startsWith("--")) {
      args[key] = true;
      continue;
    }

    args[key] = next;
    i += 1;
  }

  return args;
}

function slugify(value) {
  return value
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[^\w\s-]/g, "")
    .trim()
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function getRequiredArg(args, key) {
  const value = args[key];
  if (!value || typeof value !== "string") {
    throw new Error(`Missing required argument --${key}`);
  }

  return value;
}

async function loadEnvFile() {
  try {
    const source = await readFile(envFile, "utf8");
    for (const line of source.split(/\r?\n/)) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith("#")) {
        continue;
      }

      const separatorIndex = trimmed.indexOf("=");
      if (separatorIndex === -1) {
        continue;
      }

      const key = trimmed.slice(0, separatorIndex).trim();
      let value = trimmed.slice(separatorIndex + 1).trim();
      if (
        (value.startsWith('"') && value.endsWith('"')) ||
        (value.startsWith("'") && value.endsWith("'"))
      ) {
        value = value.slice(1, -1);
      }

      if (!(key in process.env)) {
        process.env[key] = value;
      }
    }
  } catch (error) {
    if (error && typeof error === "object" && "code" in error && error.code === "ENOENT") {
      return;
    }

    throw error;
  }
}

async function loadArticlePromptTemplate() {
  try {
    return await readFile(promptsFile, "utf8");
  } catch (error) {
    if (error && typeof error === "object" && "code" in error && error.code === "ENOENT") {
      return "";
    }

    throw error;
  }
}

function getTodayDate() {
  return new Date().toISOString().slice(0, 10);
}

function getReadingTime(content) {
  const wordsPerMinute = 200;
  const text = content.replace(/```[\s\S]*?```/g, "").replace(/`[^`]+`/g, "");
  const words = text.trim().split(/\s+/).length;
  return Math.max(1, Math.ceil(words / wordsPerMinute));
}

function extractOutputText(responseJson) {
  if (typeof responseJson.output_text === "string" && responseJson.output_text.trim()) {
    return responseJson.output_text;
  }

  for (const item of responseJson.output ?? []) {
    if (item.type !== "message") {
      continue;
    }

    for (const content of item.content ?? []) {
      if (content.type === "output_text" && typeof content.text === "string") {
        return content.text;
      }
    }
  }

  throw new Error("Could not extract model text output from Responses API response.");
}

function escapeTemplateLiteral(value) {
  return value.replace(/\\/g, "\\\\").replace(/`/g, "\\`").replace(/\$\{/g, "\\${");
}

function parseJsonOrNull(text) {
  if (!text.trim()) {
    return null;
  }

  return JSON.parse(text);
}

function runCurlJson({ apiKey, url, body }) {
  return new Promise((resolve, reject) => {
    const child = spawn(
      "curl.exe",
      [
        "-sS",
        "--ssl-no-revoke",
        "-X",
        "POST",
        url,
        "-H",
        `Authorization: Bearer ${apiKey}`,
        "-H",
        "Content-Type: application/json",
        "--data-binary",
        "@-",
      ],
      { stdio: ["pipe", "pipe", "pipe"] }
    );

    let stdout = "";
    let stderr = "";

    child.stdout.on("data", (chunk) => {
      stdout += chunk.toString();
    });

    child.stderr.on("data", (chunk) => {
      stderr += chunk.toString();
    });

    child.on("error", reject);
    child.on("close", (code) => {
      if (code !== 0) {
        reject(new Error(`curl failed with exit code ${code}: ${stderr || stdout}`));
        return;
      }

      try {
        resolve(parseJsonOrNull(stdout));
      } catch {
        reject(new Error(`curl returned non-JSON output: ${stdout.slice(0, 500)}`));
      }
    });

    child.stdin.write(JSON.stringify(body));
    child.stdin.end();
  });
}

async function postOpenAiJson({ apiKey, url, body }) {
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const text = await response.text();
    const parsed = parseJsonOrNull(text);

    if (!response.ok) {
      throw new Error(`${response.status} ${text}`);
    }

    return parsed;
  } catch (error) {
    if (error?.cause?.message?.includes("self-signed certificate in certificate chain") || error?.message === "fetch failed") {
      return runCurlJson({ apiKey, url, body });
    }

    throw error;
  }
}

function runCurlRequest({ method, url, headers = {}, body, binaryBody, allowEmpty = false }) {
  return new Promise((resolve, reject) => {
    const headerArgs = Object.entries(headers).flatMap(([key, value]) => ["-H", `${key}: ${value}`]);
    const baseArgs = ["-sS", "--ssl-no-revoke", "-X", method, url, ...headerArgs];

    if (body !== undefined || binaryBody !== undefined) {
      baseArgs.push("--data-binary", "@-");
    }

    const child = spawn("curl.exe", baseArgs, {
      stdio: ["pipe", "pipe", "pipe"],
    });

    let stdout = "";
    let stderr = "";

    child.stdout.on("data", (chunk) => {
      stdout += chunk.toString();
    });

    child.stderr.on("data", (chunk) => {
      stderr += chunk.toString();
    });

    child.on("error", reject);
    child.on("close", (code) => {
      if (code !== 0) {
        reject(new Error(`curl failed with exit code ${code}: ${stderr || stdout}`));
        return;
      }

      if (allowEmpty && !stdout.trim()) {
        resolve(null);
        return;
      }

      try {
        resolve(parseJsonOrNull(stdout));
      } catch {
        reject(new Error(`curl returned non-JSON output: ${stdout.slice(0, 500)}`));
      }
    });

    if (body !== undefined) {
      child.stdin.write(JSON.stringify(body));
    } else if (binaryBody !== undefined) {
      child.stdin.write(binaryBody);
    }
    child.stdin.end();
  });
}

function formatPostForTs(post) {
  const lines = [
    "  {",
    `    slug: ${JSON.stringify(post.slug)},`,
    "    title: {",
    `      en: ${JSON.stringify(post.title.en)},`,
    `      es: ${JSON.stringify(post.title.es)},`,
    "    },",
    "    excerpt: {",
    `      en: ${JSON.stringify(post.excerpt.en)},`,
    `      es: ${JSON.stringify(post.excerpt.es)},`,
    "    },",
    "    content: {",
    `      en: \`${escapeTemplateLiteral(post.content.en)}\`,`,
    `      es: \`${escapeTemplateLiteral(post.content.es)}\`,`,
    "    },",
    `    category: ${JSON.stringify(post.category)},`,
    `    tags: ${JSON.stringify(post.tags)},`,
    `    author: ${JSON.stringify(post.author)},`,
    `    publishedAt: ${JSON.stringify(post.publishedAt)},`,
    `    readTime: ${post.readTime},`,
    `    featured: ${post.featured ? "true" : "false"},`,
    `    image: ${JSON.stringify(post.image)},`,
    `    imagePrompt: ${JSON.stringify(post.imagePrompt)},`,
    "  },",
  ];

  return lines.join("\n");
}

async function requestArticleDraft({
  apiKey,
  textModel,
  topic,
  category,
  author,
  slug,
  publishedAt,
  imageStylePreset,
  promptTemplate,
}) {
  const schema = {
    type: "object",
    additionalProperties: false,
    required: ["title", "excerpt", "content", "tags", "category", "imagePrompt"],
    properties: {
      title: {
        type: "object",
        additionalProperties: false,
        required: ["en", "es"],
        properties: {
          en: { type: "string" },
          es: { type: "string" },
        },
      },
      excerpt: {
        type: "object",
        additionalProperties: false,
        required: ["en", "es"],
        properties: {
          en: { type: "string" },
          es: { type: "string" },
        },
      },
      content: {
        type: "object",
        additionalProperties: false,
        required: ["en", "es"],
        properties: {
          en: { type: "string" },
          es: { type: "string" },
        },
      },
      tags: {
        type: "array",
        minItems: 3,
        maxItems: 6,
        items: { type: "string" },
      },
      category: {
        type: "string",
        enum: allowedCategories,
      },
      imagePrompt: {
        type: "string",
      },
    },
  };

  const basePrompt = promptTemplate
    ? promptTemplate
        .replaceAll("{{LANGUAGE}}", "English and Spanish")
        .replaceAll("{{TOPIC}}", topic)
    : "";

  const prompt = [
    basePrompt,
    "",
    "Additional output requirements for this project:",
    `- Category must be exactly "${category}".`,
    `- Slug must align with "${slug}".`,
    `- Author must be "${author}".`,
    `- Published date is "${publishedAt}".`,
    "- Return JSON only.",
    "- English and Spanish content must both be complete, natural, and publication-ready.",
    "- Keep tags lowercase and relevant.",
    "- Add imagePrompt as a top-level field in the JSON.",
    "- The imagePrompt must describe a professional landscape blog hero image related to the article topic.",
    "- The imagePrompt must respect this fixed visual art direction:",
    imageStylePreset,
    "- Avoid brand logos, watermarks, UI screenshots, or text-heavy artwork in the image prompt.",
  ]
    .filter(Boolean)
    .join("\n");

  const responseJson = await postOpenAiJson({
    apiKey,
    url: "https://api.openai.com/v1/responses",
    body: {
      model: textModel,
      input: [
        {
          role: "system",
          content: [
            {
              type: "input_text",
              text: "You write high-quality bilingual technical blog content for developers. Output valid JSON that matches the provided schema exactly.",
            },
          ],
        },
        {
          role: "user",
          content: [
            {
              type: "input_text",
              text: prompt,
            },
          ],
        },
      ],
      text: {
        format: {
          type: "json_schema",
          name: "article_draft",
          strict: true,
          schema,
        },
      },
    },
  });

  if (responseJson?.error) {
    throw new Error(`Text generation failed: ${JSON.stringify(responseJson)}`);
  }

  return JSON.parse(extractOutputText(responseJson));
}

async function requestHeroImage({ apiKey, imageModel, prompt }) {
  const responseJson = await postOpenAiJson({
    apiKey,
    url: "https://api.openai.com/v1/images/generations",
    body: {
      model: imageModel,
      prompt,
      size: "1536x1024",
      quality: "medium",
      output_format: "png",
    },
  });

  if (responseJson?.error) {
    throw new Error(`Image generation failed: ${JSON.stringify(responseJson)}`);
  }

  const imageBase64 = responseJson.data?.[0]?.b64_json;
  if (!imageBase64) {
    throw new Error("Image generation response did not contain image data.");
  }

  return Buffer.from(imageBase64, "base64");
}

async function writeDraftArtifacts({ post, imageBuffer, draftOnly }) {
  await mkdir(draftsDir, { recursive: true });
  await mkdir(articleImagesDir, { recursive: true });

  const draftPath = path.join(draftsDir, `${post.slug}.json`);
  const imagePath = path.join(articleImagesDir, `${post.slug}.png`);

  await writeFile(draftPath, `${JSON.stringify(post, null, 2)}\n`, "utf8");
  await writeFile(imagePath, imageBuffer);

  if (!draftOnly) {
    const postsSource = await readFile(postsFile, "utf8");
    if (postsSource.includes(`slug: "${post.slug}"`)) {
      throw new Error(`A post with slug "${post.slug}" already exists in src/data/posts.ts`);
    }

    const insertionPoint = postsSource.lastIndexOf("\n];");
    if (insertionPoint === -1) {
      throw new Error("Could not find posts array terminator in src/data/posts.ts");
    }

    const nextSource = `${postsSource.slice(0, insertionPoint)}\n${formatPostForTs(post)}${postsSource.slice(insertionPoint)}`;
    await writeFile(postsFile, nextSource, "utf8");
  }

  return { draftPath, imagePath };
}

function getLinkedInVersion() {
  const configured = process.env.LINKEDIN_VERSION?.trim();
  return configured || "202604";
}

function getLinkedInIdentityVersion() {
  const configured = process.env.LINKEDIN_IDENTITY_VERSION?.trim();
  return configured || "202510.03";
}

function getConfiguredLinkedInMemberId() {
  const authorUrn = process.env.LINKEDIN_AUTHOR_URN?.trim();
  if (authorUrn?.startsWith("urn:li:person:")) {
    return authorUrn.slice("urn:li:person:".length);
  }

  return process.env.LINKEDIN_MEMBER_ID?.trim() || "";
}

function getArticleUrl(post) {
  const baseUrl = (process.env.VITE_SITE_URL || "")
    .trim()
    .replace(/\/+$/, "")
    .replace(/\/(en|es)$/, "");
  if (!baseUrl || baseUrl.includes("your-site.example.com") || baseUrl.includes("yourblog.com")) {
    throw new Error("VITE_SITE_URL must be set to your public site URL before publishing to LinkedIn.");
  }

  return `${baseUrl}/en/blog/${post.slug}`;
}

function formatLinkedInCommentary(post, articleUrl) {
  return [
    post.title.en,
    "",
    post.excerpt.en,
    "",
    `Read the full article: ${articleUrl}`,
    "",
    "#AI #Developer #Programming #Tech",
  ].join("\n");
}

async function shareToLinkedIn(post, imageBuffer) {
  const accessToken = process.env.LINKEDIN_ACCESS_TOKEN?.trim();
  if (!accessToken) {
    console.warn("LinkedIn access token not found; skipping LinkedIn publishing.");
    return;
  }

  const linkedInVersion = getLinkedInVersion();
  const articleUrl = getArticleUrl(post);
  const commentary = formatLinkedInCommentary(post, articleUrl);
  let memberId = getConfiguredLinkedInMemberId();

  const identityVersion = getLinkedInIdentityVersion();
  let lastIdentityError = "";

  if (!memberId) {
    const identityMe = await runCurlRequest({
      method: "GET",
      url: "https://api.linkedin.com/rest/identityMe",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Linkedin-Version": identityVersion,
      },
      allowEmpty: true,
    }).catch((error) => {
      lastIdentityError = error.message;
      return null;
    });

    if (identityMe?.id) {
      memberId = identityMe.id;
    } else if (identityMe?.message && !lastIdentityError) {
      lastIdentityError = identityMe.message;
    }
  }

  if (!memberId) {
    const legacyProfile = await runCurlRequest({
      method: "GET",
      url: "https://api.linkedin.com/v2/me",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "X-Restli-Protocol-Version": "2.0.0",
        "Linkedin-Version": linkedInVersion,
      },
      allowEmpty: true,
    }).catch((error) => {
      lastIdentityError = error.message;
      return null;
    });

    if (legacyProfile?.id) {
      memberId = legacyProfile.id;
    } else if (!lastIdentityError) {
      lastIdentityError = legacyProfile?.message || "Could not retrieve the LinkedIn member profile.";
    }
  }

  if (!memberId) {
    const userInfo = await runCurlRequest({
      method: "GET",
      url: "https://api.linkedin.com/v2/userinfo",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      allowEmpty: true,
    }).catch((error) => {
      lastIdentityError = error.message;
      return null;
    });

    if (userInfo?.sub) {
      memberId = userInfo.sub;
    } else if (!lastIdentityError) {
      lastIdentityError = userInfo?.message || "Could not retrieve the LinkedIn user identity.";
    }
  }

  if (!memberId) {
    throw new Error(
      `${lastIdentityError || "Could not retrieve the LinkedIn member profile."} Set LINKEDIN_MEMBER_ID in .env to bypass profile lookup for posting-only tokens.`
    );
  }

  const authorUrn = `urn:li:person:${memberId}`;

  const initializeUploadResponse = await runCurlRequest({
    method: "POST",
    url: "https://api.linkedin.com/rest/images?action=initializeUpload",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
      "X-Restli-Protocol-Version": "2.0.0",
      "Linkedin-Version": linkedInVersion,
    },
    body: {
      initializeUploadRequest: {
        owner: authorUrn,
      },
    },
  });

  const uploadUrl = initializeUploadResponse?.value?.uploadUrl;
  const imageUrn = initializeUploadResponse?.value?.image;

  if (!uploadUrl || !imageUrn) {
    throw new Error(`LinkedIn image initialization failed: ${JSON.stringify(initializeUploadResponse)}`);
  }

  await new Promise((resolve, reject) => {
    const child = spawn(
      "curl.exe",
      ["-sS", "--ssl-no-revoke", "-X", "PUT", uploadUrl, "-H", "Content-Type: image/png", "--data-binary", "@-"],
      { stdio: ["pipe", "pipe", "pipe"] }
    );

    let stderr = "";
    child.stderr.on("data", (chunk) => {
      stderr += chunk.toString();
    });
    child.on("error", reject);
    child.on("close", (code) => {
      if (code !== 0) {
        reject(new Error(`LinkedIn image upload failed: ${stderr}`));
        return;
      }

      resolve();
    });

    child.stdin.write(imageBuffer);
    child.stdin.end();
  });

  await runCurlRequest({
    method: "POST",
    url: "https://api.linkedin.com/rest/posts",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
      "X-Restli-Protocol-Version": "2.0.0",
      "Linkedin-Version": linkedInVersion,
    },
    body: {
      author: authorUrn,
      commentary,
      visibility: "PUBLIC",
      distribution: {
        feedDistribution: "MAIN_FEED",
        targetEntities: [],
        thirdPartyDistributionChannels: [],
      },
      lifecycleState: "PUBLISHED",
      isReshareDisabledByAuthor: false,
      content: {
        article: {
          source: articleUrl,
          title: post.title.en,
          description: post.excerpt.en,
          thumbnail: imageUrn,
          thumbnailAltText: post.title.en,
        },
      },
    },
    allowEmpty: true,
  });

  console.log(`LinkedIn post published for ${articleUrl}`);
}

async function main() {
  await loadEnvFile();
  const promptTemplate = await loadArticlePromptTemplate();

  const args = parseArgs(process.argv.slice(2));
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    throw new Error("OPENAI_API_KEY is required.");
  }

  const topic = getRequiredArg(args, "topic");
  const category = getRequiredArg(args, "category");
  if (!allowedCategories.includes(category)) {
    throw new Error(`Invalid --category. Expected one of: ${allowedCategories.join(", ")}`);
  }

  const slug = args.slug ? slugify(String(args.slug)) : slugify(topic);
  const author = typeof args.author === "string" ? args.author : process.env.ARTICLE_AUTHOR || "DevAI Team";
  const publishedAt = typeof args.publishedAt === "string" ? args.publishedAt : getTodayDate();
  const featured = args.featured === "true";
  const draftOnly = Boolean(args["draft-only"]);
  const textModel = process.env.OPENAI_TEXT_MODEL || "gpt-5-mini";
  const imageModel = process.env.OPENAI_IMAGE_MODEL || "gpt-image-1";
  const imageStylePreset =
    typeof args["image-style-preset"] === "string"
      ? args["image-style-preset"]
      : process.env.ARTICLE_IMAGE_STYLE_PRESET || defaultImageStylePreset;

  const draft = await requestArticleDraft({
    apiKey,
    textModel,
    topic,
    category,
    author,
    slug,
    publishedAt,
    imageStylePreset,
    promptTemplate,
  });

  if (draft.category !== category) {
    throw new Error(`Model returned category "${draft.category}" but requested "${category}"`);
  }

  const imageBuffer = await requestHeroImage({
    apiKey,
    imageModel,
    prompt: draft.imagePrompt,
  });

  const post = {
    slug,
    title: draft.title,
    excerpt: draft.excerpt,
    content: draft.content,
    category,
    tags: draft.tags,
    author,
    publishedAt,
    readTime: getReadingTime(draft.content.en),
    featured,
    image: `/articles/${slug}.png`,
    imagePrompt: draft.imagePrompt,
  };

  const { draftPath, imagePath } = await writeDraftArtifacts({
    post,
    imageBuffer,
    draftOnly,
  });

  console.log(`Created draft: ${path.relative(repoRoot, draftPath)}`);
  console.log(`Created image: ${path.relative(repoRoot, imagePath)}`);

  if (draftOnly) {
    console.log("Draft-only mode enabled; src/data/posts.ts was not modified.");
    return;
  }

  console.log("Updated src/data/posts.ts with the new article entry.");
  await shareToLinkedIn(post, imageBuffer);
}

main().catch((error) => {
  if (error?.cause?.message?.includes("self-signed certificate in certificate chain")) {
    console.error("TLS error: Node does not trust your local HTTPS interception certificate.");
    console.error("Set NODE_EXTRA_CA_CERTS to a PEM/CRT file for your local root CA and retry.");
    console.error("Example: NODE_EXTRA_CA_CERTS=./certs/netskope-root.pem");
  }

  if (typeof error?.message === "string" && error.message.includes("insufficient_quota")) {
    console.error("OpenAI rejected the request because the current project has no available quota.");
    console.error("Check billing and project quota in the OpenAI dashboard, then retry.");
  }

  console.error(error.message);
  process.exitCode = 1;
});
