'use client';

import { useState } from 'react';
import { ArrowLeft, ExternalLink, Github, Calendar, Code, Zap, Database, Brain, Globe, Server, FileCode } from 'lucide-react';

interface Project {
  id: string;
  week: number;
  title: string;
  subtitle: string;
  description: string;
  challenge: string;
  solution: string;
  technologies: string[];
  features: string[];
  results: string[];
  githubUrl?: string;
  liveUrl?: string;
  category: string;
  IconComponent: React.ComponentType<{ className?: string }>;
}

const projects: Project[] = [
  {
    id: 'digital-twin-rag',
    week: 6,
    title: 'Digital Twin RAG System',
    subtitle: 'AI-Powered Interview Preparation Assistant',
    description: 'Production-ready Digital Twin using Retrieval-Augmented Generation (RAG) technology to provide accurate, context-aware responses about my professional background.',
    challenge: 'Needed an intelligent system that could answer recruiter questions naturally while maintaining accuracy and relevance across diverse topics including skills, projects, education, and career goals.',
    solution: 'Built a comprehensive RAG system using Upstash Vector for semantic search with sentence-transformers embeddings (384 dimensions), integrated Groq\'s LLaMA 3.3 70B model for fast response generation, and implemented query enhancement preprocessing for improved search accuracy.',
    technologies: ['Next.js 16', 'TypeScript', 'Upstash Vector', 'Groq API', 'LLaMA 3.3', 'MCP Protocol', 'Python', 'Vercel'],
    features: [
      'Semantic search across 16 professional content chunks',
      'LLM-enhanced query preprocessing for better retrieval',
      'Interview-style response formatting',
      'Model Context Protocol (MCP) integration',
      'Real-time response generation with <500ms latency',
      'STAR methodology structured content',
      'Dual LLM support (Groq/Ollama)',
      'CORS-enabled API for cross-origin integration'
    ],
    results: [
      '95%+ quality scores on relevance, completeness, and accuracy',
      '25+ tested recruiter-style queries with verified responses',
      'Successfully deployed with production-grade performance',
      'Integrated with portfolio chatbot for interactive Q&A'
    ],
    githubUrl: 'https://github.com/cdrcrmss',
    liveUrl: 'http://localhost:3000',
    category: 'AI/ML',
    IconComponent: Brain
  },
  {
    id: 'cv-website',
    week: 2,
    title: 'AI-Enhanced CV Website',
    subtitle: 'Modern Portfolio with Interactive Chatbot',
    description: 'Professional portfolio website featuring responsive design, dark/light theme switching, and AI chatbot integration for dynamic visitor engagement.',
    challenge: 'Required a professional online presence that stands out to recruiters while providing an interactive way for visitors to learn about my background and skills.',
    solution: 'Designed and developed a modern portfolio using Next.js 16 and Tailwind CSS 4 with clean aesthetics, implemented theme toggle for user preference, integrated Digital Twin RAG chatbot, and optimized for SEO and performance.',
    technologies: ['Next.js 16', 'React 19', 'TypeScript', 'Tailwind CSS 4', 'Vercel', 'Puppeteer'],
    features: [
      'Responsive design optimized for all devices',
      'Dark/light theme switching with persistence',
      'AI chatbot powered by Digital Twin RAG',
      'Automated PDF CV generation',
      'Hero section with professional photo',
      'Skills showcase with 10+ technologies',
      'Project portfolio with hover animations',
      'Contact form integration'
    ],
    results: [
      'Deployed at week2-ai-cv-website.vercel.app',
      'Fully functional AI chatbot with conversation history',
      'Professional presentation suitable for job applications',
      'Optimized Lighthouse scores (90+ across all metrics)'
    ],
    githubUrl: 'https://github.com/cdrcrmss',
    liveUrl: 'https://week2-ai-cv-website.vercel.app/',
    category: 'Full Stack',
    IconComponent: Globe
  },
  {
    id: 'vector-embeddings',
    week: 5,
    title: 'Vector Database Implementation',
    subtitle: 'Semantic Search with Upstash Vector',
    description: 'Implemented vector embeddings and semantic search capabilities using Upstash Vector database for efficient content retrieval.',
    challenge: 'Traditional keyword search was insufficient for understanding the context and meaning behind recruiter queries about my professional background.',
    solution: 'Uploaded 16 professional content chunks to Upstash Vector using sentence-transformers/all-MiniLM-L6-v2 embeddings, enabling semantic similarity search with cosine distance calculation.',
    technologies: ['Python', 'Upstash Vector', 'sentence-transformers', 'NumPy'],
    features: [
      '16 content chunks covering all professional aspects',
      '384-dimensional embeddings for semantic representation',
      'Cosine similarity for relevance ranking',
      'Top-K retrieval (K=3) for optimal context',
      'Metadata-rich content organization',
      'Category-based filtering'
    ],
    results: [
      'Successfully uploaded all 16 vectors to Upstash',
      'Achieved high relevance scores (0.75+) on test queries',
      'Fast retrieval times (<100ms average)',
      'Foundation for RAG system implementation'
    ],
    githubUrl: 'https://github.com/cdrcrmss',
    category: 'AI/ML',
    IconComponent: Database
  },
  {
    id: 'llm-integration',
    week: 4,
    title: 'LLM Integration',
    subtitle: 'Groq API & Ollama Implementation',
    description: 'Integrated multiple Large Language Models for query enhancement and response generation with fallback mechanisms.',
    challenge: 'Needed reliable LLM access with fast response times while maintaining flexibility for local deployment and avoiding vendor lock-in.',
    solution: 'Implemented dual LLM support with Groq API (LLaMA 3.3 70B) as primary provider for speed and Ollama (llama3.2) as local alternative, with automatic fallback logic.',
    technologies: ['Groq API', 'Ollama', 'LLaMA 3.3', 'TypeScript', 'Node.js'],
    features: [
      'Groq API integration with LLaMA 3.3 70B model',
      'Ollama local deployment support',
      'Automatic fallback mechanism',
      'Query enhancement preprocessing',
      'Response formatting post-processing',
      'Temperature control for consistent outputs',
      'Token limit management'
    ],
    results: [
      '~500ms average response time with Groq',
      'Zero-downtime fallback to Ollama when needed',
      'Improved query understanding by 40%',
      'Professional interview-style response formatting'
    ],
    githubUrl: 'https://github.com/cdrcrmss',
    category: 'AI/ML',
    IconComponent: Zap
  },
  {
    id: 'mcp-protocol',
    week: 3,
    title: 'Model Context Protocol Server',
    subtitle: 'AI Agent Integration Interface',
    description: 'Implemented MCP server for seamless integration with AI development tools like VS Code and Claude Desktop.',
    challenge: 'Needed a standardized way to expose the Digital Twin RAG capabilities to various AI agents and development environments.',
    solution: 'Built a MCP-compliant API endpoint with CORS support, health checks, and proper error handling for integration with multiple platforms.',
    technologies: ['Next.js API Routes', 'MCP Protocol', 'TypeScript', 'CORS'],
    features: [
      'RESTful API endpoint (/api/mcp)',
      'POST support for query handling',
      'GET support for health checks',
      'CORS enabled for cross-origin requests',
      'JSON request/response format',
      'Error handling and validation',
      'Integration with RAG backend'
    ],
    results: [
      'Successfully integrated with VS Code',
      'Compatible with Claude Desktop',
      'Supports cross-origin portfolio integration',
      'Enables AI agent tool calling'
    ],
    githubUrl: 'https://github.com/cdrcrmss',
    category: 'Backend',
    IconComponent: Server
  },
  {
    id: 'star-methodology',
    week: 1,
    title: 'STAR Methodology Content',
    subtitle: 'Professional Profile Structuring',
    description: 'Restructured professional content using Situation-Task-Action-Result methodology for interview-ready responses.',
    challenge: 'Raw project descriptions lacked the structured format that recruiters expect when evaluating candidates for technical roles.',
    solution: 'Applied STAR methodology to all project descriptions, clearly defining the situation, task, actions taken, and measurable results achieved.',
    technologies: ['JSON', 'Content Strategy', 'Professional Writing'],
    features: [
      'Situation: Context and business need',
      'Task: Specific objectives and goals',
      'Action: Technical implementation details',
      'Result: Quantifiable outcomes and impact',
      'Metadata tags for categorization',
      'Technology stack documentation'
    ],
    results: [
      'All projects now interview-ready',
      'Clear value proposition in every description',
      'Measurable metrics for each project (95%+ quality scores)',
      'Enhanced RAG response quality'
    ],
    githubUrl: 'https://github.com/cdrcrmss',
    category: 'Professional Development',
    IconComponent: FileCode
  }
];

export default function ProjectsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const categories = ['All', ...Array.from(new Set(projects.map(p => p.category)))];
  const filteredProjects = selectedCategory === 'All' 
    ? projects 
    : projects.filter(p => p.category === selectedCategory);

  return (
    <div className="min-h-screen bg-black light:bg-white text-white light:text-black">
      <div className="container mx-auto max-w-7xl px-6 py-12">
        {/* Header */}
        <div className="mb-8">
          <Link href="/" className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 mb-4">
            <ArrowLeft className="w-4 h-4" />
            Back to Portfolio
          </Link>
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-blue-500 bg-clip-text text-transparent">
            Project Showcase
          </h1>
          <p className="text-xl text-zinc-400 light:text-zinc-600">
            Comprehensive case studies from 8 weeks of development
          </p>
        </div>

        {/* Category Filter */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-3">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-5 py-2 rounded-lg font-medium transition-all ${
                  selectedCategory === cat
                    ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/50'
                    : 'bg-zinc-800 light:bg-zinc-200 text-zinc-300 light:text-zinc-700 hover:bg-zinc-700 light:hover:bg-zinc-300'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              onClick={() => setSelectedProject(project)}
              className="bg-zinc-900 light:bg-zinc-100 rounded-xl p-6 border border-zinc-800 light:border-zinc-300 hover:border-purple-500 transition-all cursor-pointer group hover:shadow-xl hover:shadow-purple-500/20"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-purple-900/30 border border-purple-800 rounded-lg">
                    <project.IconComponent className="w-6 h-6 text-purple-400" />
                  </div>
                  <div>
                    <div className="text-sm text-purple-400 font-semibold">Week {project.week}</div>
                    <h3 className="text-xl font-bold group-hover:text-purple-400 transition-colors">
                      {project.title}
                    </h3>
                  </div>
                </div>
                <span className="text-xs px-3 py-1 rounded-full bg-purple-900/30 text-purple-300 border border-purple-800">
                  {project.category}
                </span>
              </div>
              
              <p className="text-sm text-zinc-500 light:text-zinc-600 mb-3">{project.subtitle}</p>
              <p className="text-sm text-zinc-400 light:text-zinc-600 mb-4 line-clamp-2">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-2 mb-4">
                {project.technologies.slice(0, 4).map((tech) => (
                  <span
                    key={tech}
                    className="text-xs px-2 py-1 bg-blue-900/30 text-blue-300 rounded border border-blue-800"
                  >
                    {tech}
                  </span>
                ))}
                {project.technologies.length > 4 && (
                  <span className="text-xs px-2 py-1 text-zinc-500">
                    +{project.technologies.length - 4} more
                  </span>
                )}
              </div>

              <div className="flex gap-3">
                {project.liveUrl && (
                  <button className="flex items-center gap-1 text-xs text-purple-400 hover:text-purple-300">
                    <ExternalLink className="w-3 h-3" />
                    Live Demo
                  </button>
                )}
                {project.githubUrl && (
                  <button className="flex items-center gap-1 text-xs text-zinc-400 hover:text-zinc-300">
                    <Github className="w-3 h-3" />
                    Source Code
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Project Detail Modal */}
        {selectedProject && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-6">
            <div className="bg-zinc-900 light:bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-zinc-800 light:border-zinc-300">
              <div className="sticky top-0 bg-zinc-900 light:bg-white border-b border-zinc-800 light:border-zinc-300 p-6 flex justify-between items-start">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-4 bg-purple-900/30 border border-purple-800 rounded-xl">
                      <selectedProject.IconComponent className="w-8 h-8 text-purple-400" />
                    </div>
                    <div>
                      <div className="text-sm text-purple-400 font-semibold">Week {selectedProject.week}</div>
                      <h2 className="text-3xl font-bold">{selectedProject.title}</h2>
                    </div>
                  </div>
                  <p className="text-zinc-400 light:text-zinc-600">{selectedProject.subtitle}</p>
                </div>
                <button
                  onClick={() => setSelectedProject(null)}
                  className="text-zinc-500 hover:text-white light:hover:text-black text-2xl"
                >
                  ×
                </button>
              </div>

              <div className="p-6 space-y-6">
                {/* Description */}
                <div>
                  <h3 className="text-xl font-semibold mb-2">Overview</h3>
                  <p className="text-zinc-400 light:text-zinc-600">{selectedProject.description}</p>
                </div>

                {/* Challenge */}
                <div className="bg-red-900/20 border border-red-800 rounded-lg p-4">
                  <h3 className="text-lg font-semibold mb-2 text-red-400">Challenge</h3>
                  <p className="text-zinc-300 light:text-zinc-700">{selectedProject.challenge}</p>
                </div>

                {/* Solution */}
                <div className="bg-green-900/20 border border-green-800 rounded-lg p-4">
                  <h3 className="text-lg font-semibold mb-2 text-green-400">Solution</h3>
                  <p className="text-zinc-300 light:text-zinc-700">{selectedProject.solution}</p>
                </div>

                {/* Technologies */}
                <div>
                  <h3 className="text-xl font-semibold mb-3">Tech Stack</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 bg-blue-900/30 text-blue-300 rounded-lg border border-blue-800 text-sm"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Key Features */}
                <div>
                  <h3 className="text-xl font-semibold mb-3">Key Features</h3>
                  <ul className="space-y-2">
                    {selectedProject.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-zinc-400 light:text-zinc-600">
                        <span className="text-purple-400 mt-1">•</span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Results */}
                <div>
                  <h3 className="text-xl font-semibold mb-3">Results & Impact</h3>
                  <ul className="space-y-2">
                    {selectedProject.results.map((result, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-green-400">
                        <span className="mt-1">✓</span>
                        {result}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Links */}
                <div className="flex gap-4 pt-4">
                  {selectedProject.liveUrl && (
                    <a
                      href={selectedProject.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-6 py-3 bg-purple-600 hover:bg-purple-700 rounded-lg transition-colors"
                    >
                      <ExternalLink className="w-4 h-4" />
                      View Live Demo
                    </a>
                  )}
                  {selectedProject.githubUrl && (
                    <a
                      href={selectedProject.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-6 py-3 bg-zinc-800 light:bg-zinc-200 hover:bg-zinc-700 light:hover:bg-zinc-300 rounded-lg transition-colors"
                    >
                      <Github className="w-4 h-4" />
                      View Source
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
