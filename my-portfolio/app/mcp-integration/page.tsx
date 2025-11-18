'use client';

import Link from 'next/link';
import { ArrowLeft, Workflow, Code, Cpu, MessageSquare, CheckCircle, Link2 } from 'lucide-react';
import { PageWrapper } from '../components/PageWrapper';

export default function MCPIntegrationPage() {
  const mcpTools = [
    {
      name: 'query_digital_twin',
      description: 'Query the Digital Twin RAG system for professional background information',
      parameters: {
        query: 'string (required) - The question to ask about professional experience'
      },
      returns: 'Contextual answer with retrieved content chunks and LLM-generated response',
      example: {
        input: '{ "query": "What experience does Cedric have with AI?" }',
        output: 'Cedric has extensive experience with AI and machine learning...'
      }
    },
    {
      name: 'search_vector_db',
      description: 'Direct vector similarity search in Upstash Vector database',
      parameters: {
        query: 'string (required) - Search query text',
        topK: 'number (optional) - Number of results to return (default: 3)'
      },
      returns: 'Array of matching content chunks with metadata and similarity scores',
      example: {
        input: '{ "query": "frontend development", "topK": 3 }',
        output: '[{ "id": "skill_frontend", "score": 0.92, "metadata": {...} }]'
      }
    },
    {
      name: 'get_profile_data',
      description: 'Retrieve structured professional profile information',
      parameters: {
        sections: 'array (optional) - Specific sections to retrieve (skills, experience, education, projects)'
      },
      returns: 'Structured JSON with requested profile sections',
      example: {
        input: '{ "sections": ["skills", "experience"] }',
        output: '{ "skills": [...], "experience": [...] }'
      }
    }
  ];

  const integrationPlatforms = [
    {
      platform: 'VS Code Extension',
      status: 'supported',
      implementation: 'MCP protocol via stdio transport',
      features: [
        'Inline code suggestions from professional context',
        'Auto-complete with experience-based examples',
        'Context-aware documentation lookup',
        'Profile data integration in hover info'
      ]
    },
    {
      platform: 'Claude Desktop',
      status: 'supported',
      implementation: 'MCP server configuration in claude_desktop_config.json',
      features: [
        'Natural language queries about professional background',
        'Conversational access to skills and experience',
        'Project history retrieval',
        'Technical skill lookup'
      ]
    },
    {
      platform: 'Web Interface',
      status: 'active',
      implementation: 'REST API on port 3000',
      features: [
        'Interactive chat interface',
        'Real-time RAG responses',
        'Conversation persistence',
        'Multi-platform CORS support'
      ]
    },
    {
      platform: 'API Clients',
      status: 'supported',
      implementation: 'HTTP POST to /api/mcp endpoint',
      features: [
        'Programmatic access to Digital Twin',
        'JSON request/response format',
        'Rate limiting protection',
        'Response caching'
      ]
    }
  ];

  const codeExamples = {
    stdio: `// MCP Server Configuration (stdio transport)
{
  "mcpServers": {
    "digital-twin": {
      "command": "node",
      "args": ["c:/Users/Cedric/digital-twin-workshop/digital-twin-mcp/server.js"],
      "env": {
        "UPSTASH_VECTOR_REST_URL": "your-url",
        "UPSTASH_VECTOR_REST_TOKEN": "your-token",
        "GROQ_API_KEY": "your-key"
      }
    }
  }
}`,
    api: `// API Integration (REST)
const response = await fetch('http://localhost:3000/api/mcp', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    query: 'What are Cedric's main technical skills?'
  })
});

const data = await response.json();
console.log(data.response);`,
    toolCall: `// MCP Tool Call Example
{
  "method": "tools/call",
  "params": {
    "name": "query_digital_twin",
    "arguments": {
      "query": "Tell me about Cedric's experience with Next.js"
    }
  }
}

// Response
{
  "content": [
    {
      "type": "text",
      "text": "Cedric has extensive experience with Next.js 16.0.3..."
    }
  ]
}`
  };

  return (
    <PageWrapper>
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 py-8 sm:py-12">
        <Link href="/operations" className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 mb-6">
          <ArrowLeft className="w-4 h-4" />
          Back to Operations
        </Link>

        <div className="mb-12">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            MCP Protocol Integration
          </h1>
          <p className="text-xl text-zinc-400 light:text-zinc-600">
            Model Context Protocol implementation and tool calling
          </p>
        </div>

        {/* MCP Overview */}
        <div className="mb-12">
          <div className="bg-gradient-to-r from-purple-900/30 to-blue-900/30 border border-purple-800 rounded-xl p-6">
            <div className="flex items-start gap-4">
              <Workflow className="w-8 h-8 text-purple-400 mt-1" />
              <div>
                <h2 className="text-2xl font-bold mb-3">What is MCP?</h2>
                <p className="text-zinc-300 light:text-zinc-700 mb-4">
                  Model Context Protocol (MCP) is an open standard that enables AI assistants to securely access external data sources and tools. 
                  Our Digital Twin implementation exposes professional profile data through MCP tools, allowing AI models to retrieve contextual information 
                  about skills, experience, and projects through a standardized interface.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-black/30 light:bg-white/30 rounded-lg p-4">
                    <div className="text-purple-400 font-semibold mb-1">3 MCP Tools</div>
                    <div className="text-xs text-zinc-400">query_digital_twin, search_vector_db, get_profile_data</div>
                  </div>
                  <div className="bg-black/30 light:bg-white/30 rounded-lg p-4">
                    <div className="text-blue-400 font-semibold mb-1">4 Platforms</div>
                    <div className="text-xs text-zinc-400">VS Code, Claude Desktop, Web, API Clients</div>
                  </div>
                  <div className="bg-black/30 light:bg-white/30 rounded-lg p-4">
                    <div className="text-green-400 font-semibold mb-1">16 Content Chunks</div>
                    <div className="text-xs text-zinc-400">Embedded in Upstash Vector database</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* MCP Tools */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Available MCP Tools</h2>
          <div className="space-y-4">
            {mcpTools.map((tool, idx) => (
              <div key={idx} className="bg-zinc-900 light:bg-zinc-100 rounded-xl p-6 border border-zinc-800 light:border-zinc-300">
                <div className="flex items-start gap-4 mb-4">
                  <div className="p-3 bg-purple-900/30 rounded-lg">
                    <Code className="w-5 h-5 text-purple-400" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold mb-2">{tool.name}</h3>
                    <p className="text-sm text-zinc-400 light:text-zinc-600">{tool.description}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                  <div>
                    <div className="text-xs font-semibold text-zinc-500 mb-2">Parameters</div>
                    <div className="bg-black light:bg-white rounded p-3 border border-zinc-800 light:border-zinc-300">
                      {Object.entries(tool.parameters).map(([key, value], pIdx) => (
                        <div key={pIdx} className="mb-2 last:mb-0">
                          <code className="text-xs text-green-400 font-mono">{key}</code>
                          <span className="text-xs text-zinc-500 ml-2">- {value}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <div className="text-xs font-semibold text-zinc-500 mb-2">Returns</div>
                    <div className="bg-black light:bg-white rounded p-3 border border-zinc-800 light:border-zinc-300">
                      <p className="text-xs text-zinc-300 light:text-zinc-700">{tool.returns}</p>
                    </div>
                  </div>
                </div>

                <div>
                  <div className="text-xs font-semibold text-zinc-500 mb-2">Example</div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <div className="text-xs text-zinc-500 mb-1">Input</div>
                      <div className="bg-black light:bg-white rounded p-3 border border-zinc-800 light:border-zinc-300">
                        <code className="text-xs text-blue-400 font-mono">{tool.example.input}</code>
                      </div>
                    </div>
                    <div>
                      <div className="text-xs text-zinc-500 mb-1">Output</div>
                      <div className="bg-black light:bg-white rounded p-3 border border-zinc-800 light:border-zinc-300">
                        <code className="text-xs text-green-400 font-mono">{tool.example.output}</code>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Integration Platforms */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Platform Integration</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {integrationPlatforms.map((platform, idx) => (
              <div key={idx} className="bg-zinc-900 light:bg-zinc-100 rounded-xl p-6 border border-zinc-800 light:border-zinc-300">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <Link2 className="w-5 h-5 text-blue-400" />
                    <h3 className="text-lg font-bold">{platform.platform}</h3>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    platform.status === 'active' 
                      ? 'bg-green-900/30 text-green-400' 
                      : 'bg-blue-900/30 text-blue-400'
                  }`}>
                    {platform.status.toUpperCase()}
                  </span>
                </div>

                <div className="mb-4">
                  <div className="text-xs text-zinc-500 mb-1">Implementation</div>
                  <div className="bg-black light:bg-white rounded p-2 border border-zinc-800 light:border-zinc-300">
                    <code className="text-xs text-purple-400 font-mono">{platform.implementation}</code>
                  </div>
                </div>

                <div>
                  <div className="text-xs text-zinc-500 mb-2">Features</div>
                  <div className="space-y-2">
                    {platform.features.map((feature, fIdx) => (
                      <div key={fIdx} className="flex items-start gap-2">
                        <CheckCircle className="w-3 h-3 text-green-400 mt-0.5" />
                        <span className="text-sm text-zinc-300 light:text-zinc-700">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Code Examples */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Implementation Examples</h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                <Cpu className="w-5 h-5 text-purple-400" />
                Stdio Transport Configuration
              </h3>
              <div className="bg-black light:bg-white rounded-xl p-4 border border-zinc-800 light:border-zinc-300 overflow-x-auto">
                <pre className="text-xs text-green-400 font-mono">{codeExamples.stdio}</pre>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-blue-400" />
                REST API Integration
              </h3>
              <div className="bg-black light:bg-white rounded-xl p-4 border border-zinc-800 light:border-zinc-300 overflow-x-auto">
                <pre className="text-xs text-green-400 font-mono">{codeExamples.api}</pre>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                <Code className="w-5 h-5 text-orange-400" />
                MCP Tool Call
              </h3>
              <div className="bg-black light:bg-white rounded-xl p-4 border border-zinc-800 light:border-zinc-300 overflow-x-auto">
                <pre className="text-xs text-green-400 font-mono">{codeExamples.toolCall}</pre>
              </div>
            </div>
          </div>
        </div>

        {/* Architecture Diagram */}
        <div>
          <h2 className="text-2xl font-bold mb-6">MCP Architecture Flow</h2>
          <div className="bg-zinc-900 light:bg-zinc-100 rounded-xl p-8 border border-zinc-800 light:border-zinc-300">
            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="flex-1 text-center">
                <div className="w-24 h-24 mx-auto bg-purple-900/30 rounded-xl flex items-center justify-center mb-3 border border-purple-800">
                  <Workflow className="w-12 h-12 text-purple-400" />
                </div>
                <div className="font-semibold mb-1">1. Client Request</div>
                <div className="text-xs text-zinc-500">VS Code / Claude / Web</div>
              </div>

              <div className="hidden md:block text-zinc-600">→</div>

              <div className="flex-1 text-center">
                <div className="w-24 h-24 mx-auto bg-blue-900/30 rounded-xl flex items-center justify-center mb-3 border border-blue-800">
                  <Code className="w-12 h-12 text-blue-400" />
                </div>
                <div className="font-semibold mb-1">2. MCP Server</div>
                <div className="text-xs text-zinc-500">Port 3000 / Stdio</div>
              </div>

              <div className="hidden md:block text-zinc-600">→</div>

              <div className="flex-1 text-center">
                <div className="w-24 h-24 mx-auto bg-orange-900/30 rounded-xl flex items-center justify-center mb-3 border border-orange-800">
                  <MessageSquare className="w-12 h-12 text-orange-400" />
                </div>
                <div className="font-semibold mb-1">3. Vector Search</div>
                <div className="text-xs text-zinc-500">Upstash Vector DB</div>
              </div>

              <div className="hidden md:block text-zinc-600">→</div>

              <div className="flex-1 text-center">
                <div className="w-24 h-24 mx-auto bg-green-900/30 rounded-xl flex items-center justify-center mb-3 border border-green-800">
                  <Cpu className="w-12 h-12 text-green-400" />
                </div>
                <div className="font-semibold mb-1">4. LLM Generation</div>
                <div className="text-xs text-zinc-500">Groq / Ollama</div>
              </div>

              <div className="hidden md:block text-zinc-600">→</div>

              <div className="flex-1 text-center">
                <div className="w-24 h-24 mx-auto bg-cyan-900/30 rounded-xl flex items-center justify-center mb-3 border border-cyan-800">
                  <CheckCircle className="w-12 h-12 text-cyan-400" />
                </div>
                <div className="font-semibold mb-1">5. Response</div>
                <div className="text-xs text-zinc-500">Contextual Answer</div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 flex gap-4 justify-center">
          <Link
            href="/operations"
            className="inline-block bg-zinc-800 light:bg-zinc-200 hover:bg-zinc-700 light:hover:bg-zinc-300 text-white light:text-black font-semibold px-8 py-3 rounded-lg transition-colors"
          >
            ← Operations
          </Link>
          <Link
            href="/demo"
            className="inline-block bg-purple-600 hover:bg-purple-700 text-white font-semibold px-8 py-3 rounded-lg transition-colors"
          >
            Live Demo →
          </Link>
        </div>
      </div>
    </PageWrapper>
  );
}
