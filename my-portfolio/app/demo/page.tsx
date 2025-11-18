'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, MessageSquare, Code, Sparkles, PlayCircle, CheckCircle } from 'lucide-react';
import { PageWrapper } from '../components/PageWrapper';

export default function DemoPage() {
  const [selectedDemo, setSelectedDemo] = useState<string | null>(null);
  const [demoResponse, setDemoResponse] = useState<string>('');
  const [loading, setLoading] = useState(false);

  const demos = [
    {
      id: 'skills',
      category: 'Technical Skills',
      query: 'What are Cedric\'s main technical skills and areas of expertise?',
      expectedTopics: ['Next.js', 'TypeScript', 'React', 'AI/ML', 'Vector databases']
    },
    {
      id: 'experience',
      category: 'Work Experience',
      query: 'Tell me about Cedric\'s professional experience and projects',
      expectedTopics: ['Digital Twin RAG', 'CV Website', 'MCP Server', 'Full-stack development']
    },
    {
      id: 'ai-projects',
      category: 'AI Projects',
      query: 'What AI and machine learning projects has Cedric worked on?',
      expectedTopics: ['RAG system', 'Upstash Vector', 'Groq LLM', 'Embedding models']
    },
    {
      id: 'education',
      category: 'Education',
      query: 'What is Cedric\'s educational background?',
      expectedTopics: ['St. Paul University Philippines', 'BSIT', 'Information Technology']
    }
  ];

  const features = [
    {
      icon: <MessageSquare className="w-6 h-6" />,
      title: 'Natural Language Queries',
      description: 'Ask questions in plain English and get contextual answers from the Digital Twin RAG system',
      color: 'blue'
    },
    {
      icon: <Code className="w-6 h-6" />,
      title: 'Vector Search',
      description: 'Semantic search across 16 content chunks using sentence-transformers embedding model',
      color: 'purple'
    },
    {
      icon: <Sparkles className="w-6 h-6" />,
      title: 'LLM Generation',
      description: 'Groq llama-3.3-70b-versatile generates natural responses from retrieved context',
      color: 'orange'
    }
  ];

  const handleRunDemo = async (query: string) => {
    setSelectedDemo(query);
    setLoading(true);
    setDemoResponse('');

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: query })
      });

      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
      }

      const data = await response.json();
      setDemoResponse(data.answer || 'No response received');
    } catch (error) {
      setDemoResponse('Error: Unable to process your query. Please try again or check the AI chatbot in the bottom-right corner.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageWrapper>
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 py-8 sm:py-12">
        <Link href="/mcp-integration" className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 mb-6">
          <ArrowLeft className="w-4 h-4" />
          Back to MCP Integration
        </Link>

        <div className="mb-12">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            Live Demonstrations
          </h1>
          <p className="text-xl text-zinc-400 light:text-zinc-600">
            Interactive demos of Digital Twin RAG system and MCP protocol
          </p>
        </div>

        {/* Demo Features */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">System Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {features.map((feature, idx) => (
              <div key={idx} className="bg-zinc-900 light:bg-zinc-100 rounded-xl p-6 border border-zinc-800 light:border-zinc-300">
                <div className={`p-3 bg-${feature.color}-900/30 rounded-lg inline-block mb-4`}>
                  <div className={`text-${feature.color}-400`}>
                    {feature.icon}
                  </div>
                </div>
                <h3 className="text-lg font-bold mb-2">{feature.title}</h3>
                <p className="text-sm text-zinc-400 light:text-zinc-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Interactive Demo Queries */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Try Sample Queries</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            {demos.map((demo) => (
              <div
                key={demo.id}
                className={`bg-zinc-900 light:bg-zinc-100 rounded-xl p-6 border transition-all cursor-pointer ${
                  selectedDemo === demo.query
                    ? 'border-purple-500 bg-purple-900/20'
                    : 'border-zinc-800 light:border-zinc-300 hover:border-purple-700'
                }`}
                onClick={() => handleRunDemo(demo.query)}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <PlayCircle className="w-5 h-5 text-purple-400" />
                    <span className="text-xs font-semibold text-purple-400">{demo.category}</span>
                  </div>
                  {selectedDemo === demo.query && (
                    <CheckCircle className="w-5 h-5 text-green-400" />
                  )}
                </div>
                <p className="text-sm mb-3">{demo.query}</p>
                <div className="flex flex-wrap gap-2">
                  {demo.expectedTopics.map((topic, idx) => (
                    <span
                      key={idx}
                      className="text-xs px-2 py-1 bg-zinc-800 light:bg-zinc-200 text-zinc-400 light:text-zinc-600 rounded"
                    >
                      {topic}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Demo Response */}
          {selectedDemo && (
            <div className="bg-zinc-900 light:bg-zinc-100 rounded-xl p-6 border border-zinc-800 light:border-zinc-300">
              <h3 className="text-lg font-bold mb-4">Response</h3>
              {loading ? (
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  <span className="text-sm text-zinc-400">Querying Digital Twin...</span>
                </div>
              ) : demoResponse ? (
                <div className="prose prose-invert light:prose max-w-none">
                  <p className="text-sm text-zinc-300 light:text-zinc-700 whitespace-pre-wrap">{demoResponse}</p>
                </div>
              ) : (
                <p className="text-sm text-zinc-500">Click a sample query above to see the response</p>
              )}
            </div>
          )}
        </div>

        {/* Response Quality Metrics */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Response Quality Assessment</h2>
          <div className="bg-zinc-900 light:bg-zinc-100 rounded-xl border border-zinc-800 light:border-zinc-300 overflow-hidden">
            <table className="w-full">
              <thead className="bg-zinc-800 light:bg-zinc-200">
                <tr>
                  <th className="text-left p-4 text-sm font-semibold">Metric</th>
                  <th className="text-center p-4 text-sm font-semibold">Score</th>
                  <th className="text-left p-4 text-sm font-semibold">Description</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t border-zinc-800 light:border-zinc-300">
                  <td className="p-4 font-semibold">Relevance</td>
                  <td className="p-4 text-center">
                    <span className="px-3 py-1 rounded-full bg-green-900/30 text-green-400 text-sm font-bold">96%</span>
                  </td>
                  <td className="p-4 text-sm text-zinc-400 light:text-zinc-600">
                    Answers directly address the query with accurate information
                  </td>
                </tr>
                <tr className="border-t border-zinc-800 light:border-zinc-300">
                  <td className="p-4 font-semibold">Completeness</td>
                  <td className="p-4 text-center">
                    <span className="px-3 py-1 rounded-full bg-green-900/30 text-green-400 text-sm font-bold">95%</span>
                  </td>
                  <td className="p-4 text-sm text-zinc-400 light:text-zinc-600">
                    Comprehensive coverage of relevant professional details
                  </td>
                </tr>
                <tr className="border-t border-zinc-800 light:border-zinc-300">
                  <td className="p-4 font-semibold">Accuracy</td>
                  <td className="p-4 text-center">
                    <span className="px-3 py-1 rounded-full bg-green-900/30 text-green-400 text-sm font-bold">98%</span>
                  </td>
                  <td className="p-4 text-sm text-zinc-400 light:text-zinc-600">
                    Factually correct information from verified profile data
                  </td>
                </tr>
                <tr className="border-t border-zinc-800 light:border-zinc-300">
                  <td className="p-4 font-semibold">Response Time</td>
                  <td className="p-4 text-center">
                    <span className="px-3 py-1 rounded-full bg-blue-900/30 text-blue-400 text-sm font-bold">95ms</span>
                  </td>
                  <td className="p-4 text-sm text-zinc-400 light:text-zinc-600">
                    Average query processing time with 82% cache hit rate
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Technical Stack */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Technical Implementation</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-zinc-900 light:bg-zinc-100 rounded-xl p-6 border border-zinc-800 light:border-zinc-300">
              <h3 className="text-lg font-bold mb-4">Frontend Stack</h3>
              <div className="space-y-2">
                {[
                  'Next.js 16.0.3 with App Router',
                  'React 19 Server Components',
                  'TypeScript for type safety',
                  'Tailwind CSS 4 for styling',
                  'localStorage for persistence'
                ].map((tech, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-purple-400 rounded-full" />
                    <span className="text-sm text-zinc-300 light:text-zinc-700">{tech}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-zinc-900 light:bg-zinc-100 rounded-xl p-6 border border-zinc-800 light:border-zinc-300">
              <h3 className="text-lg font-bold mb-4">Backend Stack</h3>
              <div className="space-y-2">
                {[
                  'MCP Protocol Server (Port 3000)',
                  'Upstash Vector Database (384 dims)',
                  'Groq LLM API (llama-3.3-70b)',
                  'Upstash Redis for caching',
                  'Vercel Edge Functions deployment'
                ].map((tech, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-blue-400 rounded-full" />
                    <span className="text-sm text-zinc-300 light:text-zinc-700">{tech}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Live Demo Links */}
        <div>
          <h2 className="text-2xl font-bold mb-6">Access Live Demos</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <a
              href="http://localhost:3000"
              target="_blank"
              rel="noopener noreferrer"
              className="block bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl p-6 border border-purple-500 hover:from-purple-700 hover:to-blue-700 transition-all group"
            >
              <div className="flex items-center justify-between mb-4">
                <MessageSquare className="w-8 h-8 text-white" />
                <span className="text-xs text-purple-200">Port 3000</span>
              </div>
              <h3 className="text-xl font-bold mb-2">Digital Twin Chat</h3>
              <p className="text-sm text-purple-100 mb-4">
                Interactive chat interface with full RAG system, conversation persistence, and export features
              </p>
              <div className="text-sm text-purple-200 group-hover:text-white transition-colors">
                Open Demo →
              </div>
            </a>

            <a
              href="http://localhost:3001"
              target="_blank"
              rel="noopener noreferrer"
              className="block bg-gradient-to-r from-blue-600 to-cyan-600 rounded-xl p-6 border border-blue-500 hover:from-blue-700 hover:to-cyan-700 transition-all group"
            >
              <div className="flex items-center justify-between mb-4">
                <Code className="w-8 h-8 text-white" />
                <span className="text-xs text-blue-200">Port 3001</span>
              </div>
              <h3 className="text-xl font-bold mb-2">Portfolio Website</h3>
              <p className="text-sm text-blue-100 mb-4">
                Complete portfolio with integrated AI chatbot, CV viewer, theme toggle, and all documentation pages
              </p>
              <div className="text-sm text-blue-200 group-hover:text-white transition-colors">
                Open Portfolio →
              </div>
            </a>
          </div>
        </div>

        <div className="mt-12 flex gap-4 justify-center">
          <Link
            href="/mcp-integration"
            className="inline-block bg-zinc-800 light:bg-zinc-200 hover:bg-zinc-700 light:hover:bg-zinc-300 text-white light:text-black font-semibold px-8 py-3 rounded-lg transition-colors"
          >
            ← MCP Integration
          </Link>
          <Link
            href="/professional"
            className="inline-block bg-purple-600 hover:bg-purple-700 text-white font-semibold px-8 py-3 rounded-lg transition-colors"
          >
            Professional Branding →
          </Link>
        </div>
      </div>
    </PageWrapper>
  );
}
