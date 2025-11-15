#!/usr/bin/env node

/**
 * MCP Stdio Server for Claude Desktop
 * This server uses stdio transport to communicate with Claude Desktop
 */

import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
    CallToolRequestSchema,
    ListToolsRequestSchema,
} from '@modelcontextprotocol/sdk/types.js';
import { Index } from '@upstash/vector';
import Groq from 'groq-sdk';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config({ path: '.env.local' });

// Initialize Upstash Vector
const index = new Index({
    url: process.env.UPSTASH_VECTOR_REST_URL,
    token: process.env.UPSTASH_VECTOR_REST_TOKEN,
});

// Initialize Groq
const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY,
});

// Create MCP server
const server = new Server({
    name: 'digital-twin-mcp',
    version: '1.0.0',
}, {
    capabilities: {
        tools: {},
    },
});

// List available tools
server.setRequestHandler(ListToolsRequestSchema, async() => {
    return {
        tools: [{
                name: 'query_digital_twin',
                description: 'Query the Digital Twin RAG system to get information about Cedric Ramos\' professional background, skills, experience, and projects. Use this when you need to answer questions about his qualifications, technical expertise, or career history.',
                inputSchema: {
                    type: 'object',
                    properties: {
                        question: {
                            type: 'string',
                            description: 'The question to ask about Cedric\'s professional background',
                        },
                    },
                    required: ['question'],
                },
            },
            {
                name: 'search_vector_db',
                description: 'Perform a direct vector similarity search in the professional profile database. Returns raw content chunks with metadata and similarity scores.',
                inputSchema: {
                    type: 'object',
                    properties: {
                        query: {
                            type: 'string',
                            description: 'Search query text',
                        },
                        topK: {
                            type: 'number',
                            description: 'Number of results to return (default: 3)',
                            default: 3,
                        },
                    },
                    required: ['query'],
                },
            },
            {
                name: 'get_profile_sections',
                description: 'Get specific sections of the professional profile (skills, experience, education, projects). Useful for structured information retrieval.',
                inputSchema: {
                    type: 'object',
                    properties: {
                        sections: {
                            type: 'array',
                            items: {
                                type: 'string',
                                enum: ['skills', 'experience', 'education', 'projects', 'all'],
                            },
                            description: 'Which profile sections to retrieve',
                        },
                    },
                    required: ['sections'],
                },
            },
        ],
    };
});

// Handle tool calls
server.setRequestHandler(CallToolRequestSchema, async(request) => {
    const { name, arguments: args } = request.params;

    try {
        if (name === 'query_digital_twin') {
            const { question } = args;

            // Step 1: Vector search
            const searchResults = await index.query({
                data: question,
                topK: 5,
                includeMetadata: true,
            });

            // Step 2: Format context
            const context = searchResults
                .map(result => result.metadata ?.content || '')
                .filter(Boolean)
                .join('\n\n');

            if (!context) {
                return {
                    content: [{
                        type: 'text',
                        text: "I don't have specific information to answer that question about Cedric's professional background.",
                    }, ],
                };
            }

            // Step 3: Generate response with LLM
            const completion = await groq.chat.completions.create({
                messages: [{
                        role: 'system',
                        content: `You are Cedric Ramos' AI digital twin assistant. Answer questions about his professional background, skills, and experience based on the provided context. Use first person when describing his qualifications and achievements.`,
                    },
                    {
                        role: 'user',
                        content: `Context: ${context}\n\nQuestion: ${question}\n\nAnswer:`,
                    },
                ],
                model: 'llama-3.3-70b-versatile',
                temperature: 0.7,
                max_tokens: 500,
            });

            const answer = completion.choices[0] ?.message ?.content || 'Unable to generate response.';

            return {
                content: [{
                    type: 'text',
                    text: answer,
                }, ],
            };
        }

        if (name === 'search_vector_db') {
            const { query, topK = 3 } = args;

            const searchResults = await index.query({
                data: query,
                topK,
                includeMetadata: true,
            });

            const results = searchResults.map(result => ({
                id: result.id,
                score: result.score,
                type: result.metadata ?.type,
                title: result.metadata ?.title,
                content: result.metadata ?.content ?.substring(0, 200) + '...',
            }));

            return {
                content: [{
                    type: 'text',
                    text: JSON.stringify(results, null, 2),
                }, ],
            };
        }

        if (name === 'get_profile_sections') {
            const { sections } = args;
            const sectionTypes = sections.includes('all') ? ['skill', 'experience', 'education', 'project'] :
                sections;

            const results = [];

            for (const section of sectionTypes) {
                const searchResults = await index.query({
                    data: section,
                    topK: 5,
                    includeMetadata: true,
                    filter: section !== 'all' ? `type = '${section}'` : undefined,
                });

                results.push({
                    section,
                    items: searchResults.map(r => ({
                        title: r.metadata ?.title,
                        content: r.metadata ?.content,
                    })),
                });
            }

            return {
                content: [{
                    type: 'text',
                    text: JSON.stringify(results, null, 2),
                }, ],
            };
        }

        throw new Error(`Unknown tool: ${name}`);
    } catch (error) {
        return {
            content: [{
                type: 'text',
                text: `Error: ${error.message}`,
            }, ],
            isError: true,
        };
    }
});

// Start the server
async function main() {
    const transport = new StdioServerTransport();
    await server.connect(transport);
    console.error('Digital Twin MCP Server running on stdio');
}

main().catch((error) => {
    console.error('Fatal error:', error);
    process.exit(1);
});
