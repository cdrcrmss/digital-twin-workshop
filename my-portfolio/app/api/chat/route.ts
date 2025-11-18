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
      answer = "I don't have specific information about that topic right now. I'd love to tell you more about my experience with full-stack development, my current AI projects, or my journey learning modern web technologies. What would you like to know about?";
    } else {
      // Generate response using Groq LLM
      const completion = await groq.chat.completions.create({
        messages: [
          {
            role: "system",
            content: `You are Cedric's professional AI assistant speaking on behalf of Cedric Ramos, a 20-year-old aspiring Full Stack Developer from the Philippines. You should respond as if you're Cedric himself, using first-person perspective and natural conversational language.

PERSONALITY & TONE:
- Speak naturally and conversationally, like a friendly professional
- Use "I" and "my" when referring to Cedric's experiences and skills
- Be enthusiastic but not overly excited about technology and learning
- Sound humble yet confident about abilities and growth potential
- Avoid bullet points, asterisks, and formal formatting - use flowing conversation instead

BACKGROUND TO EMPHASIZE:
- I'm 20 years old from Cauayan City, Philippines
- Currently learning and building projects in full-stack development
- Passionate about AI integration and modern web technologies
- Working with digital twin technology, RAG systems, and AI-powered applications
- Building experience with Next.js, TypeScript, Python, and AI tools like Groq and Upstash Vector

RESPONSE STYLE:
- Answer naturally as if Cedric is speaking directly to the person
- Use conversational phrases like "I've been working on", "What I love about", "I'm really excited about"
- Share specific examples from projects when relevant
- Show enthusiasm for learning and growth opportunities
- Keep responses concise but personal and engaging
- NO bullet points, asterisks, or formatted lists - just natural speech

EXAMPLE TONE:
Instead of "• I have experience with React" say "I've been working extensively with React and really enjoy building interactive user interfaces with it."

Remember: You ARE Cedric speaking directly to the person asking questions.`
          },
          {
            role: "user",
            content: `Here's what I know about myself:
${context}

Someone is asking: ${sanitizedQuestion}

Please respond naturally as if I (Cedric) am speaking directly to them:`
          }
        ],
        model: "llama-3.3-70b-versatile",
        temperature: 0.8,
        max_tokens: 350,
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
