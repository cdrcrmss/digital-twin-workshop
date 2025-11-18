import { NextResponse } from 'next/server';
import { Index } from '@upstash/vector';
import Groq from 'groq-sdk';

// Initialize Upstash Vector
const index = new Index({
  url: process.env.UPSTASH_VECTOR_REST_URL!,
  token: process.env.UPSTASH_VECTOR_REST_TOKEN!,
});

// Initialize Groq
const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY!,
});

// Security: Detect malicious input patterns
function isMaliciousInput(input: string): boolean {
  const maliciousPatterns = [
    // SQL Injection patterns
    /(\bSELECT\b|\bINSERT\b|\bUPDATE\b|\bDELETE\b|\bDROP\b|\bUNION\b|\bEXEC\b)/i,
    /(\bOR\b\s+\d+\s*=\s*\d+|\bAND\b\s+\d+\s*=\s*\d+)/i,
    /(--|\*\/|\/\*|;--|xp_)/i,
    
    // Script injection patterns
    /<script[^>]*>.*?<\/script>/i,
    /<iframe[^>]*>/i,
    /javascript:/i,
    /on\w+\s*=/i,
    
    // Command injection patterns
    /(\||&&|;|\n|`|\$\()/,
    /(wget|curl|nc|netcat|bash|sh|cmd|powershell)/i,
    
    // Path traversal
    /\.\.[\/\\]/,
    
    // Other suspicious patterns
    /(eval\(|exec\(|system\()/i,
  ];
  
  return maliciousPatterns.some(pattern => pattern.test(input));
}

// Security: Sanitize input
function sanitizeInput(input: string): string {
  return input
    .trim()
    .slice(0, 500) // Max 500 characters
    .replace(/[<>]/g, ''); // Remove angle brackets
}

export async function POST(req: Request) {
  try {
    // Check if required environment variables are present
    if (!process.env.UPSTASH_VECTOR_REST_URL || !process.env.UPSTASH_VECTOR_REST_TOKEN || !process.env.GROQ_API_KEY) {
      console.error('❌ Missing environment variables:', {
        UPSTASH_URL: !!process.env.UPSTASH_VECTOR_REST_URL,
        UPSTASH_TOKEN: !!process.env.UPSTASH_VECTOR_REST_TOKEN,
        GROQ_KEY: !!process.env.GROQ_API_KEY,
      });
      
      return NextResponse.json({
        answer: "Sorry, the AI service is not properly configured. Please check the environment variables.",
      });
    }

    const body = await req.json();
    const { question } = body;
    
    // Validate input
    if (!question || typeof question !== 'string') {
      return NextResponse.json(
        { error: 'Invalid question format' },
        { status: 400 }
      );
    }
    
    const sanitizedQuestion = sanitizeInput(question);
    
    // Security check: Detect malicious input
    if (isMaliciousInput(sanitizedQuestion)) {
      console.warn('🚨 Malicious input detected:', sanitizedQuestion);
      return NextResponse.json({
        answer: "I don't know. I can only answer questions about Cedric's professional background, skills, and experience.",
      });
    }
    
    // Check if question is empty after sanitization
    if (!sanitizedQuestion.trim()) {
      return NextResponse.json({
        answer: "Please ask me a question about Cedric's professional background, skills, or experience.",
      });
    }
    
    // Perform RAG query with Upstash Vector
    const searchResults = await index.query({
      data: sanitizedQuestion,
      topK: 3,
      includeMetadata: true,
    });
    
    // Extract context from search results
    const context = searchResults
      .map(result => result.metadata?.content || '')
      .filter(Boolean)
      .join('\n\n');

    let answer: string;
    
    if (!context) {
      answer = "Sorry, I don't have that information right now.\n\nI can help you learn about:\n• Cedric's technical skills and expertise\n• His AI and web development projects\n• Experience with digital twin technology\n• Background in Next.js, TypeScript, and Python\n\nWhat would you like to know?";
    } else {
      // Generate response using Groq LLM
      const completion = await groq.chat.completions.create({
        messages: [
          {
            role: "system",
            content: `You are Cedric's professional AI assistant for his portfolio website. Your role is to provide accurate, concise, and well-formatted responses about his professional background.

RESPONSE GUIDELINES:
• Answer directly and clearly - no verbose explanations unless asked for details
• Use bullet points, numbered lists, or line breaks for better readability
• Keep responses professional and friendly (NO emojis)
• Focus on portfolio context: digital twin technology, RAG systems, MCP protocol, AI/ML, web development
• If you don't know something, say "Sorry, I don't have that information right now." - never make up details

FORMATTING:
• Use proper line breaks for readability
• Structure complex answers with bullets or numbers
• Include relevant technical details when appropriate
• Keep responses conversational but professional

CONTEXT FOCUS:
• Emphasize Cedric's work with AI, digital twins, RAG systems
• Highlight technical skills: Next.js, TypeScript, Python, Upstash Vector, Groq LLM
• Reference his current projects and learning journey
• Position him as an emerging talent in AI-powered web development`
          },
          {
            role: "user",
            content: `Context about Cedric:\n${context}\n\nQuestion: ${sanitizedQuestion}\n\nProvide a clear, well-formatted response:`
          }
        ],
        model: "llama-3.3-70b-versatile",
        temperature: 0.6,
        max_tokens: 400,
      });
      
      answer = completion.choices[0]?.message?.content || "I couldn't generate a response.";
      
      // Additional security: Filter the response
      answer = answer.replace(/system prompt|internal|confidential|api key|token|password/gi, '[REDACTED]');
    }
    
    return NextResponse.json({
      answer,
      sources: searchResults.map(r => ({
        title: r.metadata?.title,
        type: r.metadata?.type,
        score: r.score,
      })),
    });
    
  } catch (error) {
    console.error('❌ Error processing chat request:', error);
    
    // Log more details for debugging
    if (error instanceof Error) {
      console.error('Error details:', {
        message: error.message,
        name: error.name,
        stack: error.stack?.split('\n')[0], // Just first line of stack
      });
    }
    
    // Friendly error message - don't expose internal errors
    return NextResponse.json({
      answer: "I'm currently experiencing technical difficulties. Please try again in a moment.",
    });
  }
}

// Health check endpoint
export async function GET() {
  return NextResponse.json({
    status: 'ok',
    service: 'Portfolio AI Chat API',
    timestamp: new Date().toISOString(),
  });
}
