import { NextResponse } from 'next/server';

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
    
    // Forward to the MCP server on port 3000
    const mcpUrl = process.env.MCP_SERVER_URL || 'http://localhost:3000/api/mcp';
    
    try {
      const response = await fetch(mcpUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question: sanitizedQuestion,
          enhanced: true,
        }),
      });
      
      if (!response.ok) {
        throw new Error(`MCP server error: ${response.status}`);
      }
      
      const data = await response.json();
      
      // Additional security: Filter the response
      if (data.answer) {
        // Ensure the AI doesn't reveal system prompts or internal details
        const filteredAnswer = data.answer
          .replace(/system prompt|internal|confidential|api key|token|password/gi, '[REDACTED]');
        
        return NextResponse.json({
          answer: filteredAnswer,
          sources: data.sources,
        });
      }
      
      return NextResponse.json({
        answer: "I don't know. Please ask me about Cedric's skills, projects, or professional experience.",
      });
      
    } catch (mcpError) {
      console.error('MCP server connection error:', mcpError);
      
      // Fallback response when MCP server is unavailable
      return NextResponse.json({
        answer: "I'm currently offline. Please try again later or contact Cedric directly.",
      });
    }
    
  } catch (error) {
    console.error('Error processing chat request:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
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
