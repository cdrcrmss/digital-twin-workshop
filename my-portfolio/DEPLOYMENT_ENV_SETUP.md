# Environment Variables Setup for Production

## Required Environment Variables

Your AI assistant needs these environment variables to work in production:

```
UPSTASH_VECTOR_REST_URL=your_upstash_vector_url_here
UPSTASH_VECTOR_REST_TOKEN=your_upstash_vector_token_here
GROQ_API_KEY=your_groq_api_key_here
```

**Note**: Replace the placeholder values with your actual API credentials from your `.env.local` file.

## How to Add Them to Different Platforms:

### Vercel (Recommended)
1. Go to your Vercel dashboard
2. Select your project
3. Go to Settings → Environment Variables
4. Add each variable:
   - Name: `UPSTASH_VECTOR_REST_URL`
   - Value: (copy from your .env.local file)
   - Click Add

5. Repeat for `UPSTASH_VECTOR_REST_TOKEN` and `GROQ_API_KEY`
6. Redeploy your project

### Netlify
1. Go to Site settings → Environment variables
2. Add each variable (copy values from .env.local)
3. Redeploy

### Railway/Render
1. Go to your app settings
2. Add environment variables (copy values from .env.local)
3. Redeploy

## Testing
After adding the environment variables and redeploying:
1. Visit your live portfolio
2. Try the AI assistant
3. It should work without "technical difficulties"

## Security Notes
- These are production API keys - keep them secure
- Never commit them to GitHub (they're in .env.local which is gitignored)
- Consider rotating keys periodically
- Copy the actual values from your local .env.local file