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
      answer = "I don't have specific information to answer that question. Could you ask about Cedric's experience, skills, projects, or career goals?";
    } else {
      // Generate response using Groq LLM
      const completion = await groq.chat.completions.create({
        messages: [
          {
            role: "system",
            content: `You are Cedric's AI assistant. Answer questions in first person about his professional background, skills, and experience based on the provided context. Be concise, professional, and interview-ready. Use STAR format (Situation-Task-Action-Result) when telling stories. If the question is inappropriate or not related to professional topics, respond with "I don't know" and redirect to professional topics.`
          },
          {
            role: "user",
            content: `Context about Cedric:\n${context}\n\nQuestion: ${sanitizedQuestion}\n\nAnswer:`
          }
        ],
        model: "llama-3.3-70b-versatile",
        temperature: 0.7,
        max_tokens: 500,
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
    console.error('Error processing chat request:', error);
    
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
