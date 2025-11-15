# 🚀 Deployment Guide - Cedric's AI Portfolio

## Prerequisites
- GitHub account
- Vercel account (free tier works!)
- Your Upstash Vector and Groq credentials ready

## Step 1: Prepare for Deployment

### A. Create `.env.example` file
This helps others (and Vercel) know what environment variables are needed:

```bash
# Digital Twin MCP Server URL
NEXT_PUBLIC_MCP_URL=http://localhost:3000/api/mcp

# Upstash Vector Database
UPSTASH_VECTOR_REST_URL=
UPSTASH_VECTOR_REST_TOKEN=

# Groq API for LLM
GROQ_API_KEY=
```

### B. Verify `.gitignore` excludes sensitive files
Make sure these are in `.gitignore`:
- `.env.local`
- `.env*.local`
- `node_modules/`

## Step 2: Deploy MCP Server to Vercel

### Option A: Deploy via Vercel CLI
```powershell
# Install Vercel CLI (if not installed)
npm install -g vercel

# Navigate to MCP server directory
cd C:\Users\Cedric\digital-twin-workshop\digital-twin-mcp

# Deploy
vercel

# Follow prompts:
# - Link to existing project? No
# - Project name: cedric-digital-twin-mcp
# - Directory: ./
# - Override settings? No

# Add environment variables
vercel env add UPSTASH_VECTOR_REST_URL
vercel env add UPSTASH_VECTOR_REST_TOKEN
vercel env add GROQ_API_KEY

# Deploy to production
vercel --prod
```

### Option B: Deploy via Vercel Dashboard
1. Go to [vercel.com](https://vercel.com)
2. Click "Add New" → "Project"
3. Import from Git or drag the `digital-twin-mcp` folder
4. Configure:
   - **Framework Preset**: Next.js
   - **Root Directory**: `./`
5. Add environment variables:
   - `UPSTASH_VECTOR_REST_URL`
   - `UPSTASH_VECTOR_REST_TOKEN`
   - `GROQ_API_KEY`
6. Click "Deploy"

**Save your MCP URL**: `https://cedric-digital-twin-mcp.vercel.app`

## Step 3: Deploy Portfolio to Vercel

### Update MCP URL for Production
Before deploying, you need to update the portfolio to use the deployed MCP server:

1. In `my-portfolio/.env.local`, add production MCP URL:
```bash
NEXT_PUBLIC_MCP_URL=https://your-mcp-server.vercel.app/api/mcp
```

### Deploy Portfolio
```powershell
cd C:\Users\Cedric\digital-twin-workshop\my-portfolio

# Deploy
vercel

# Add environment variable
vercel env add NEXT_PUBLIC_MCP_URL

# Deploy to production
vercel --prod
```

**OR via Vercel Dashboard:**
1. Import `my-portfolio` folder
2. Add environment variable:
   - `NEXT_PUBLIC_MCP_URL` = `https://your-mcp-server.vercel.app/api/mcp`
3. Deploy

## Step 4: Test Your Live Portfolio! 🎉

1. Visit your portfolio URL: `https://your-portfolio.vercel.app`
2. Click the AI chatbot button
3. Ask: "What are Cedric's technical skills?"
4. Verify it works!

## Optional: Custom Domain

1. Go to Vercel Dashboard → Your Project → Settings → Domains
2. Add your custom domain (e.g., `cedricramos.com`)
3. Follow DNS configuration instructions

## Ollama Setup (Local Development Only)

Ollama runs locally, so it won't work in Vercel deployment. For production, use Groq (already configured).

To use Ollama locally:
1. Download from [ollama.ai](https://ollama.ai)
2. Install and run: `ollama pull llama3.2`
3. In MCP `.env.local`, set: `USE_OLLAMA=true`
4. Restart dev servers

## Troubleshooting

### Chatbot shows "Failed to fetch"
- Check CORS headers in MCP `/api/mcp/route.ts`
- Verify `NEXT_PUBLIC_MCP_URL` is correct
- Check Vercel function logs

### LLM errors
- Verify Groq API key is valid
- Check Groq model availability (use `llama-3.3-70b-versatile`)
- Review Vercel function logs

### Vector search not working
- Confirm Upstash Vector credentials are correct
- Verify 16 vectors were embedded successfully
- Test vector search in Upstash console

## Environment Variables Summary

### MCP Server (digital-twin-mcp)
```
UPSTASH_VECTOR_REST_URL=https://arriving-wombat-2511-us1-vector.upstash.io
UPSTASH_VECTOR_REST_TOKEN=<your-token>
GROQ_API_KEY=<your-groq-key>
USE_OLLAMA=false
```

### Portfolio (my-portfolio)
```
NEXT_PUBLIC_MCP_URL=https://your-mcp-server.vercel.app/api/mcp
```

## Next Steps After Deployment

1. ✅ Share your portfolio link on LinkedIn
2. ✅ Add to your resume/CV
3. ✅ Test chatbot with various questions
4. ✅ Monitor Vercel analytics
5. ✅ Update profile data as needed (re-run `embed_profile.py`)

---

**Questions?** Check Vercel docs or ask the AI chatbot! 😊
