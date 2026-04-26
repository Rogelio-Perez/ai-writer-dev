# LinkedIn Integration for AI Writer Dev Blog

This guide explains how to set up automatic LinkedIn sharing for articles published in the AI Writer Dev Blog application.

## Overview

The application now includes automatic LinkedIn sharing functionality. When you generate and publish an article using the `npm run generate:article` command, it will automatically:
1. Create the article draft and hero image
2. Add the article to the blog data
3. Share a promotional post to LinkedIn with:
   - Eye-catching emojis
   - Article title and excerpt
   - Link to the full article
   - The generated hero image
   - Relevant hashtags

## Setup Instructions

### 1. Create a LinkedIn Developer Application

1. Go to [LinkedIn Developer Portal](https://www.linkedin.com/developers/)
2. Sign in with your LinkedIn account
3. Click "Create app" and fill in the details:
   - App name: Your blog name (e.g., "AI Writer Dev Blog")
   - App description: Description of your blog
   - App logo: Upload your logo
   - Business email: Your email
4. Accept the terms and submit

### 2. Get Your API Credentials

After creating your app, you'll see:
- **Client ID** (under "Auth" tab)
- **Client Secret** (under "Auth" tab)

### 3. Set Up OAuth 2.0 Authorization

To get an access token for automatic posting, you need to complete the OAuth flow once:

1. Add these redirect URLs in your LinkedIn app settings:
   - `http://localhost:3000/linkedin/callback` (for development)
   - Your actual domain callback (for production)

2. Use this URL to get the authorization code (replace `YOUR_CLIENT_ID`):
   ```
   https://www.linkedin.com/oauth/v2/authorization?
   response_type=code&
   client_id=YOUR_CLIENT_ID&
   redirect_uri=http://localhost:3000/linkedin/callback&
   scope=r_liteprofile%20w_member_social&
   state=random_string
   ```

3. After authorizing, you'll be redirected to your callback URL with a `code` parameter

4. Exchange the code for an access token using curl:
   ```bash
   curl -X POST https://www.linkedin.com/oauth/v2/accessToken \
     -H "Content-Type: application/x-www-form-urlencoded" \
     -d "grant_type=authorization_code&
         code=AUTHORIZATION_CODE_FROM_STEP_3&
         redirect_uri=http://localhost:3000/linkedin/callback&
         client_id=YOUR_CLIENT_ID&
         client_secret=YOUR_CLIENT_SECRET"
   ```

5. Save the `access_token` from the response

### 4. Configure Environment Variables

Add these to your `.env` file (copy from `.env.example`):

```env
# Existing variables...
OPENAI_API_KEY=your_openai_key_here
VITE_SITE_URL=https://yourblog.com

# LinkedIn Integration
VITE_LINKEDIN_CLIENT_ID=your_linkedin_client_id
VITE_LINKEDIN_CLIENT_SECRET=your_linkedin_client_secret
LINKEDIN_ACCESS_TOKEN=your_linkedin_access_token_from_step_4
LINKEDIN_MEMBER_ID=your_linkedin_member_id_if_profile_lookup_is_not_permitted
```

### 5. Test the Integration

Run the article generation command:
```bash
npm run generate:article -- --topic "Your Article Topic" --category tutorials --slug your-article-slug
```

If configured correctly, you should see:
```
✅ Successfully shared to LinkedIn: https://yourblog.com/en/blog/your-article-slug
```

## How It Works

When an article is published (not in draft-only mode), the system:

1. Gets your LinkedIn profile ID using the access token
2. Formats a promotional post with:
   - Emojis based on article topic (🤖 for AI, 📚 for tutorials, etc.)
   - Article title and excerpt
   - Link to the full article
   - Relevant hashtags (#AI #Developer #Tech #Programming #Innovation)
3. Uploads the generated hero image to LinkedIn
4. Creates the post with the image and content

## Customizing the Promotional Format

The promotional content is formatted in `src/lib/linkedin.ts` in the `formatLinkedInPost` function. You can customize:

- Emoji selection logic
- Content structure
- Hashtags
- Call-to-action text

## Troubleshooting

### Common Issues

1. **"LinkedIn credentials not configured"**
   - Make sure `VITE_LINKEDIN_CLIENT_ID` and `VITE_LINKEDIN_CLIENT_SECRET` are set in `.env`

2. **"LinkedIn access token not found"**
   - Set `LINKEDIN_ACCESS_TOKEN` in `.env` with a valid token

3. **"Not enough permissions to access: me.GET.NO_VERSION" or identity lookup errors**
   - Your token can post but cannot read the member profile needed to derive the author URN
   - Add `LINKEDIN_MEMBER_ID` in `.env` and the generator will skip the profile lookup step
   - You can also re-authorize with identity scopes if your LinkedIn app supports them

4. **Authentication errors**
   - Check that your access token hasn't expired (typically 60 days)
   - Ensure your LinkedIn app has the required permissions: `r_liteprofile` and `w_member_social`

5. **Image upload failures**
   - Verify that `VITE_SITE_URL` is correctly set so LinkedIn can access your image
   - Make sure your site is publicly accessible (not behind localhost/firewall)

### Manual Testing

To test LinkedIn API directly:
```bash
# Get profile
curl -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  https://api.linkedin.com/v2/me

# Check what permissions your token has
curl -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  https://api.linkedin.com/v2/userinfo
```

## Security Notes

- Never commit your access tokens or client secrets to version control
- The `.env` file is already in `.gitignore`
- Consider using a separate LinkedIn account for blog automation
- Monitor your LinkedIn application usage in the developer dashboard

## Disclaimer

This integration uses LinkedIn's API and is subject to their [Terms of Service](https://www.linkedin.com/legal/user-agreement) and [API Terms of Use](https://developer.linkedin.com/terms). Make sure your usage complies with their policies, particularly regarding automated content sharing.
