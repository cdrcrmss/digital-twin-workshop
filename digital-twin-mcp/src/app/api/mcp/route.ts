import { NextResponse } from 'next/server';
import { Index } from '@upstash/vector';
import { Groq } from 'groq-sdk';
import { enhanceQuery, formatForInterview, type InterviewType, INTERVIEW_CONTEXTS } from '@/lib/llm-enhanced-rag';

// CORS headers for cross-origin requests
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

// Initialize Upstash Vector
const index = new Index({
  url: process.env.UPSTASH_VECTOR_REST_URL!,
  token: process.env.UPSTASH_VECTOR_REST_TOKEN!,
});

// Initialize Groq
const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

// Handle OPTIONS requests for CORS preflight
export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { question, enhanced = true, interviewType } = body;
    
    console.log('📥 Received question:', question);
    console.log('🎯 Enhanced mode:', enhanced);
    console.log('🎭 Interview type:', interviewType || 'general');
    
    const startTime = Date.now();
    
    // Step 1: Enhance query if enabled
    let searchQuery = question;
    let enhancementTime = 0;
    
    if (enhanced) {
      const enhanceStart = Date.now();
      searchQuery = await enhanceQuery(question);
      enhancementTime = Date.now() - enhanceStart;
      console.log('✨ Enhanced query:', searchQuery);
    }
    
    // Step 2: Perform vector search
    const searchStart = Date.now();
    const searchResults = await index.query({
      data: searchQuery,
      topK: 5,
      includeMetadata: true,
    });
    const searchTime = Date.now() - searchStart;
    
    console.log(`🔍 Found ${searchResults.length} results in ${searchTime}ms`);

    // Step 3: Format response with LLM if enhanced mode
    let answer;
    let formattingTime = 0;
    
    if (enhanced && searchResults.length > 0) {
      const formatStart = Date.now();
      
      // Convert results to expected format
      const ragResults = searchResults.map(result => ({
        id: String(result.id),
        score: result.score,
        metadata: result.metadata as Record<string, any>,
      }));
      
      // Get interview context if specified
      const context = interviewType && INTERVIEW_CONTEXTS[interviewType as InterviewType] 
        ? INTERVIEW_CONTEXTS[interviewType as InterviewType]
        : undefined;
      
      answer = await formatForInterview(ragResults, question, context);
      formattingTime = Date.now() - formatStart;
      console.log(`💬 Formatted response in ${formattingTime}ms`);
    } else {
      // Fallback: basic response without LLM enhancement
      const context = searchResults
        .map(result => result.metadata?.content || '')
        .filter(Boolean)
        .join('\n\n');

      if (!context) {
        answer = "I don't have specific information to answer that question. Could you ask about my experience, skills, projects, or career goals?";
      } else {
        const completion = await groq.chat.completions.create({
          messages: [
            {
              role: "system",
              content: `You are an AI digital twin. Answer questions in first person about your professional background, skills, and experience based on the provided context.`
            },
            {
              role: "user",
              content: `Context: ${context}\n\nQuestion: ${question}\n\nAnswer:`
            }
          ],
          model: "llama3-70b-8192",
          temperature: 0.7,
          max_tokens: 500,
        });
        
        answer = completion.choices[0]?.message?.content || "I couldn't generate a response.";
      }
    }
    
    const totalTime = Date.now() - startTime;

    return NextResponse.json({
      answer,
      sources: searchResults.map(r => ({
        title: r.metadata?.title,
        type: r.metadata?.type,
        score: r.score,
      })),
      metadata: {
        enhanced,
        interviewType: interviewType || 'general',
        originalQuery: question,
        enhancedQuery: enhanced ? searchQuery : undefined,
        performance: {
          queryEnhancement: enhancementTime,
          vectorSearch: searchTime,
          responseFormatting: formattingTime,
          total: totalTime,
        },
        resultsCount: searchResults.length,
      }
    }, { headers: corsHeaders });

  } catch (error) {
    console.error('❌ Error processing MCP request:', error);
    return NextResponse.json(
      { 
        error: 'Internal server error',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500, headers: corsHeaders }
    );
  }
}

// Handle GET requests for health check
export async function GET() {
  return NextResponse.json({
    status: 'ok',
    service: 'Digital Twin MCP Server',
    version: '2.0.0',
    features: ['basic-rag', 'llm-enhanced-rag', 'interview-contexts'],
    timestamp: new Date().toISOString(),
  }, { headers: corsHeaders });
}
