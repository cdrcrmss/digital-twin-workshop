/**
 * LLM-Enhanced RAG System
 * Implements query preprocessing and response post-processing for better interview preparation
 * Supports both Groq (cloud) and Ollama (local) LLM providers
 */

import Groq from 'groq-sdk';
import { chatWithOllama, isOllamaAvailable } from './ollama-client';

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY!,
});

// LLM provider selection
const USE_OLLAMA = process.env.USE_OLLAMA === 'true';
const OLLAMA_MODEL = process.env.OLLAMA_MODEL || 'llama3.2';

export interface RAGResult {
  id: string;
  score: number;
  metadata?: {
    title?: string;
    content?: string;
    type?: string;
    category?: string;
    [key: string]: any;
  };
}

export interface EnhancedRAGResponse {
  response: string;
  metadata: {
    originalQuery: string;
    enhancedQuery: string;
    resultsFound: number;
    processingTime: number;
  };
}

/**
 * Call LLM with provider abstraction (Groq or Ollama)
 */
async function callLLM(
  messages: Array<{ role: string; content: string }>,
  options: { temperature?: number; maxTokens?: number } = {}
): Promise<string> {
  const { temperature = 0.7, maxTokens = 600 } = options;

  // Try Ollama first if enabled
  if (USE_OLLAMA) {
    try {
      const available = await isOllamaAvailable();
      if (available) {
        console.log('🦙 Using Ollama for LLM generation');
        return await chatWithOllama(messages, {
          model: OLLAMA_MODEL,
          temperature,
          maxTokens,
        });
      } else {
        console.warn('⚠️ Ollama not available, falling back to Groq');
      }
    } catch (error) {
      console.error('❌ Ollama failed, falling back to Groq:', error);
    }
  }

  // Fallback to Groq
  console.log('☁️ Using Groq for LLM generation');
  const completion = await groq.chat.completions.create({
    messages: messages as any,
    model: 'llama-3.3-70b-versatile',
    temperature,
    max_tokens: maxTokens,
  });

  return completion.choices[0]?.message?.content?.trim() || '';
}

/**
 * Enhance user query with LLM for better vector search accuracy
 * Expands context, adds synonyms, and focuses on interview-relevant aspects
 */
export async function enhanceQuery(originalQuery: string): Promise<string> {
  const enhancementPrompt = `You are an interview preparation assistant that improves search queries.

Original question: "${originalQuery}"

Enhance this query to better search professional profile data by:
- Adding relevant synonyms and related terms
- Expanding context for interview scenarios
- Including technical and soft skill variations
- Focusing on achievements and quantifiable results
- Adding STAR format elements (Situation, Task, Action, Result)

Return only the enhanced search query (no explanation, no quotes):`;

  try {
    const enhanced = await callLLM(
      [{ role: 'user', content: enhancementPrompt }],
      { temperature: 0.3, maxTokens: 150 }
    );

    return enhanced || originalQuery;
    return enhanced;
  } catch (error) {
    console.error('Query enhancement failed:', error);
    return originalQuery; // Fallback to original query
  }
}

/**
 * Format RAG results into interview-ready responses
 * Uses STAR format and includes interview coaching
 */
export async function formatForInterview(
  ragResults: RAGResult[],
  originalQuestion: string,
  interviewContext?: string
): Promise<string> {
  // Extract context from results
  const context = ragResults
    .map(result => {
      const title = result.metadata?.title || 'Information';
      const content = result.metadata?.content || '';
      return `${title}: ${content}`;
    })
    .join('\n\n');

  if (!context.trim()) {
    return "I don't have specific information to answer that question. Could you ask about my experience, skills, projects, or career goals?";
  }

  const formattingPrompt = `You are an expert interview coach. Create a compelling interview response using this professional data.

Question: "${originalQuestion}"
${interviewContext ? `Interview Context: ${interviewContext}` : ''}

Professional Background Data:
${context}

Create a response that:
- Directly addresses the interview question in first person (speak as "I")
- Uses specific examples and quantifiable achievements from the data
- Applies STAR format (Situation-Task-Action-Result) when telling stories
- Sounds confident and natural for an interview setting
- Highlights unique value and differentiators
- Includes relevant technical details without being overwhelming
- Keeps response concise (2-3 paragraphs max)

Interview Response:`;

  try {
    const response = await callLLM(
      [{ role: 'user', content: formattingPrompt }],
      { temperature: 0.7, maxTokens: 600 }
    );

    return response || context;
  } catch (error) {
    console.error('Response formatting failed:', error);
    return context; // Fallback to raw RAG results
  }
}

/**
 * Interview context configurations for different interview types
 */
export const INTERVIEW_CONTEXTS = {
  technical: 'This is a technical interview. Focus on: technical skills, problem-solving, architecture decisions, code quality, and specific technologies used.',
  behavioral: 'This is a behavioral interview. Focus on: leadership, teamwork, communication, conflict resolution, and STAR format stories with emotional intelligence.',
  screening: 'This is an initial HR/recruiter screening. Focus on: cultural fit, basic qualifications, salary expectations, availability, and motivation.',
  executive: 'This is an executive/leadership interview. Focus on: strategic thinking, business impact, vision, leadership philosophy, and high-level achievements.',
  hiring_manager: 'This is a hiring manager interview. Focus on: role-specific responsibilities, team collaboration, project delivery, and how you handle challenges.',
} as const;

export type InterviewType = keyof typeof INTERVIEW_CONTEXTS;

/**
 * Enhanced RAG query with context-aware processing
 */
export async function contextAwareRAG(
  query: string,
  ragResults: RAGResult[],
  interviewType?: InterviewType
): Promise<EnhancedRAGResponse> {
  const startTime = Date.now();

  // Step 1: Enhance the query
  const enhancedQuery = await enhanceQuery(query);

  // Step 2: Format response with interview context
  const context = interviewType ? INTERVIEW_CONTEXTS[interviewType] : undefined;
  const response = await formatForInterview(ragResults, query, context);

  const processingTime = Date.now() - startTime;

  return {
    response,
    metadata: {
      originalQuery: query,
      enhancedQuery,
      resultsFound: ragResults.length,
      processingTime,
    },
  };
}

/**
 * Performance monitoring for production use
 */
export interface RAGMetrics {
  queryEnhancementTime: number;
  vectorSearchTime: number;
  responseFormattingTime: number;
  totalTime: number;
}

export async function monitoredEnhanceQuery(query: string): Promise<{ enhanced: string; metrics: { time: number } }> {
  const start = Date.now();
  const enhanced = await enhanceQuery(query);
  const time = Date.now() - start;
  
  return { enhanced, metrics: { time } };
}

export async function monitoredFormatResponse(
  ragResults: RAGResult[],
  originalQuestion: string
): Promise<{ response: string; metrics: { time: number } }> {
  const start = Date.now();
  const response = await formatForInterview(ragResults, originalQuestion);
  const time = Date.now() - start;
  
  return { response, metrics: { time } };
}
