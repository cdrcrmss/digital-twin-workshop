'use client';

import Link from 'next/link';
import { ArrowLeft, BookOpen, Code, Database, Globe, Server, Brain, Shield, Rocket, Trophy, Calendar, ExternalLink, Github } from 'lucide-react';
import { PageWrapper } from '../components/PageWrapper';

interface WeekData {
  week: number;
  title: string;
  description: string;
  objectives: string[];
  technologies: string[];
  deliverables: string[];
  githubRepo?: string;
  githubUrl?: string;
  status: 'completed' | 'in-progress' | 'planned';
  icon: React.ComponentType<{ className?: string }>;
}

const learningPath: WeekData[] = [
  {
    week: 1,
    title: "AI Agent Development Environment & Role Understanding",
    description: "Foundation setup for AI-powered development workflow, establishing the development environment and understanding the role of an AI-enhanced full-stack developer.",
    objectives: [
      "Set up professional development environment with AI tools",
      "Understand the modern developer workflow with AI assistance",
      "Establish version control and project structure best practices",
      "Learn fundamental concepts of AI integration in development"
    ],
    technologies: ["VS Code", "GitHub", "Git", "AI Tools", "Command Line"],
    deliverables: [
      "Configured development environment",
      "Initial project repository setup",
      "Understanding of AI-enhanced development workflow"
    ],
    githubRepo: "Git Activity 1",
    githubUrl: "https://github.com/cdrcrmss/digital-twin-workshop/tree/main",
    status: "completed",
    icon: Code
  },
  {
    week: 2,
    title: "Next.js Foundations & Modern Web Development",
    description: "Deep dive into Next.js 15+ features, modern React patterns, and building responsive, professional web applications with TypeScript integration.",
    objectives: [
      "Master Next.js 15+ App Router and Server Components",
      "Implement responsive design with Tailwind CSS",
      "Build professional portfolio website",
      "Deploy modern web applications to production"
    ],
    technologies: ["Next.js 15", "React 19", "TypeScript", "Tailwind CSS", "Vercel"],
    deliverables: [
      "Professional portfolio website",
      "Responsive design implementation",
      "Production deployment on Vercel"
    ],
    githubRepo: "boilerplatejs",
    githubUrl: "https://github.com/cdrcrmss/boilerplatejs",
    status: "completed",
    icon: Globe
  },
  {
    week: 3,
    title: "Full-Stack Development with Person App & Database Integration",
    description: "Build complete full-stack application with database integration, API development, and advanced data handling patterns.",
    objectives: [
      "Design and implement database schemas",
      "Build RESTful APIs with Next.js API routes",
      "Implement CRUD operations and data validation",
      "Handle complex data relationships and queries"
    ],
    technologies: ["Next.js", "Database", "API Development", "TypeScript", "Data Modeling"],
    deliverables: [
      "Complete Person Search Application",
      "Database design and implementation",
      "RESTful API endpoints",
      "Frontend-backend integration"
    ],
    githubRepo: "Person Search App",
    githubUrl: "https://github.com/cdrcrmss/person-search-app",
    status: "completed",
    icon: Database
  },
  {
    week: 4,
    title: "MCP Server Development & Deployment",
    description: "Implement Model Context Protocol (MCP) server for AI agent integration, enabling seamless communication between AI tools and applications.",
    objectives: [
      "Understand Model Context Protocol specifications",
      "Build MCP-compliant API endpoints",
      "Implement proper error handling and validation",
      "Deploy MCP server with production configurations"
    ],
    technologies: ["MCP Protocol", "Next.js API", "CORS", "TypeScript", "API Design"],
    deliverables: [
      "MCP server implementation",
      "API documentation and testing",
      "Integration with AI development tools"
    ],
    githubRepo: "Person Search App",
    githubUrl: "https://github.com/cdrcrmss/person-search-app",
    status: "completed",
    icon: Server
  },
  {
    week: 5,
    title: "Authentication & Security Implementation",
    description: "Implement robust authentication systems, security best practices, and protect applications from common vulnerabilities.",
    objectives: [
      "Implement secure authentication flows",
      "Apply security best practices and input validation",
      "Handle user sessions and authorization",
      "Protect against common web vulnerabilities"
    ],
    technologies: ["Authentication", "Security", "Session Management", "Input Validation"],
    deliverables: [
      "Secure authentication system",
      "Security audit and improvements",
      "User management functionality"
    ],
    githubRepo: "Person Search App",
    githubUrl: "https://github.com/cdrcrmss/person-search-app",
    status: "completed",
    icon: Shield
  },
  {
    week: 6,
    title: "Digital Twin RAG System — Foundation",
    description: "Begin development of AI-powered digital twin using Retrieval-Augmented Generation (RAG) technology for intelligent query processing.",
    objectives: [
      "Design RAG system architecture",
      "Implement vector database integration",
      "Build content embedding and retrieval system",
      "Create foundation for AI-powered responses"
    ],
    technologies: ["RAG Technology", "Vector Database", "Embeddings", "AI/ML", "Python"],
    deliverables: [
      "RAG system foundation",
      "Vector database setup",
      "Content embedding pipeline",
      "Basic query processing"
    ],
    githubRepo: "This portfolio project",
    githubUrl: "https://github.com/cdrcrmss/digital-twin-workshop",
    status: "completed",
    icon: Brain
  },
  {
    week: 7,
    title: "Digital Twin RAG System — Advanced Implementation",
    description: "Advanced RAG implementation with LLM integration, query enhancement, and sophisticated response generation capabilities.",
    objectives: [
      "Integrate Large Language Models (LLM)",
      "Implement query enhancement preprocessing",
      "Build sophisticated response generation",
      "Optimize system performance and accuracy"
    ],
    technologies: ["Groq API", "LLaMA 3.3", "Upstash Vector", "Query Processing", "Response Generation"],
    deliverables: [
      "Complete RAG system with LLM integration",
      "Query enhancement pipeline",
      "High-quality response generation",
      "Performance optimization"
    ],
    githubRepo: "This portfolio project",
    githubUrl: "https://github.com/cdrcrmss/digital-twin-workshop",
    status: "completed",
    icon: Brain
  },
  {
    week: 8,
    title: "Advanced Digital Twin Deployment & Integration",
    description: "Deploy digital twin system to production, implement monitoring, and integrate with various platforms and tools.",
    objectives: [
      "Deploy RAG system to production environment",
      "Implement monitoring and analytics",
      "Create API integrations for multiple platforms",
      "Optimize for performance and scalability"
    ],
    technologies: ["Production Deployment", "Monitoring", "API Integration", "Performance Optimization"],
    deliverables: [
      "Production-ready deployment",
      "Monitoring and analytics setup",
      "Multi-platform integration",
      "Performance optimization"
    ],
    githubRepo: "This portfolio project",
    githubUrl: "https://github.com/cdrcrmss/digital-twin-workshop",
    status: "completed",
    icon: Rocket
  },
  {
    week: 9,
    title: "Portfolio Integration & MCP Tool Enhancement",
    description: "Integrate digital twin system with portfolio website, enhance MCP tools, and create seamless user experiences.",
    objectives: [
      "Integrate AI assistant with portfolio website",
      "Enhance MCP tool capabilities",
      "Implement user-friendly interfaces",
      "Create comprehensive documentation"
    ],
    technologies: ["Next.js Integration", "UI/UX Design", "MCP Enhancement", "Documentation"],
    deliverables: [
      "AI-powered portfolio website",
      "Enhanced MCP tool functionality",
      "User experience improvements",
      "Complete system documentation"
    ],
    githubRepo: "This portfolio project",
    githubUrl: "https://github.com/cdrcrmss/digital-twin-workshop",
    status: "completed",
    icon: Globe
  },
  {
    week: 10,
    title: "Final Showcase & Professional Launch",
    description: "Prepare final project showcase, create professional presentation materials, and launch complete portfolio for career opportunities.",
    objectives: [
      "Create comprehensive project showcase",
      "Prepare professional presentation materials",
      "Launch complete portfolio for recruiters",
      "Document learning journey and achievements"
    ],
    technologies: ["Portfolio Showcase", "Professional Presentation", "Career Preparation"],
    deliverables: [
      "Final project showcase",
      "Professional presentation materials",
      "Career-ready portfolio launch",
      "Complete learning documentation"
    ],
    githubRepo: "Portfolio Launch",
    githubUrl: "#", // Placeholder for future work
    status: "planned",
    icon: Trophy
  }
];

export default function DocumentationPage() {
  const completedWeeks = learningPath.filter(week => week.status === 'completed').length;
  const totalWeeks = learningPath.length;
  const progressPercentage = (completedWeeks / totalWeeks) * 100;

  return (
    <PageWrapper>
      <div className="container mx-auto max-w-6xl px-4 sm:px-6 py-8 sm:py-12">
        {/* Header */}
        <div className="mb-12">
          <Link href="/" className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 mb-6">
            <ArrowLeft className="w-4 h-4" />
            Back to Portfolio
          </Link>
          
          <div className="flex items-center gap-4 mb-6">
            <div className="p-4 bg-purple-900/30 dark:bg-purple-900/30 light:bg-purple-100 border border-purple-800 dark:border-purple-800 light:border-purple-300 rounded-xl">
              <BookOpen className="w-8 h-8 text-purple-400 dark:text-purple-400 light:text-purple-600" />
            </div>
            <div>
              <h1 className="text-5xl font-bold mb-2 bg-gradient-to-r from-purple-400 to-blue-500 bg-clip-text text-transparent">
                Learning Documentation
              </h1>
              <p className="text-xl text-zinc-400 dark:text-zinc-400 light:text-gray-600">
                My 10-week AI-enhanced development bootcamp journey
              </p>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="bg-zinc-800 dark:bg-zinc-800 light:bg-gray-200 rounded-full h-3 mb-6">
            <div 
              className="bg-gradient-to-r from-purple-500 to-blue-500 h-3 rounded-full transition-all duration-500"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
          <div className="flex justify-between items-center text-sm">
            <span className="text-zinc-400 dark:text-zinc-400 light:text-gray-600">
              Progress: {completedWeeks} of {totalWeeks} weeks completed
            </span>
            <span className="text-purple-400 dark:text-purple-400 light:text-purple-600 font-semibold">
              {Math.round(progressPercentage)}%
            </span>
          </div>
        </div>

        {/* Learning Path Timeline */}
        <div className="space-y-8">
          {learningPath.map((week, index) => (
            <div
              key={week.week}
              className={`relative border-l-4 pl-8 pb-8 ${
                week.status === 'completed' 
                  ? 'border-green-400' 
                  : week.status === 'in-progress'
                  ? 'border-yellow-400'
                  : 'border-zinc-600'
              }`}
            >
              {/* Timeline Dot */}
              <div className={`absolute -left-3 w-6 h-6 rounded-full border-4 ${
                week.status === 'completed' 
                  ? 'bg-green-400 border-green-400' 
                  : week.status === 'in-progress'
                  ? 'bg-yellow-400 border-yellow-400'
                  : 'bg-zinc-600 border-zinc-600'
              }`} />

              {/* Week Content */}
              <div className="card bg-zinc-900 dark:bg-zinc-900 light:bg-white border border-zinc-800 dark:border-zinc-800 light:border-gray-200 rounded-xl p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-purple-900/30 dark:bg-purple-900/30 light:bg-purple-100 border border-purple-800 dark:border-purple-800 light:border-purple-300 rounded-lg">
                      <week.icon className="w-6 h-6 text-purple-400 dark:text-purple-400 light:text-purple-600" />
                    </div>
                    <div>
                      <div className="flex items-center gap-3 mb-1">
                        <h2 className="text-2xl font-bold text-white dark:text-white light:text-gray-900">
                          Week {week.week}
                        </h2>
                        <span className={`text-xs px-3 py-1 rounded-full font-medium ${
                          week.status === 'completed'
                            ? 'bg-green-900/30 text-green-400 border border-green-800 dark:bg-green-900/30 dark:text-green-400 dark:border-green-800 light:bg-green-100 light:text-green-700 light:border-green-300'
                            : week.status === 'in-progress'
                            ? 'bg-yellow-900/30 text-yellow-400 border border-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400 dark:border-yellow-800 light:bg-yellow-100 light:text-yellow-700 light:border-yellow-300'
                            : 'bg-zinc-900/30 text-zinc-400 border border-zinc-800 dark:bg-zinc-900/30 dark:text-zinc-400 dark:border-zinc-800 light:bg-gray-100 light:text-gray-600 light:border-gray-300'
                        }`}>
                          {week.status === 'completed' ? 'Completed' : week.status === 'in-progress' ? 'In Progress' : 'Planned'}
                        </span>
                      </div>
                      <h3 className="text-xl font-semibold text-purple-400 dark:text-purple-400 light:text-purple-600 mb-2">
                        {week.title}
                      </h3>
                      <p className="text-zinc-400 dark:text-zinc-400 light:text-gray-600">
                        {week.description}
                      </p>
                    </div>
                  </div>
                  
                  {week.githubUrl && week.githubUrl !== '#' && (
                    <a
                      href={week.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-sm text-zinc-400 hover:text-purple-400 dark:text-zinc-400 dark:hover:text-purple-400 light:text-gray-600 light:hover:text-purple-600 transition-colors"
                    >
                      <Github className="w-4 h-4" />
                      {week.githubRepo}
                    </a>
                  )}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Objectives */}
                  <div>
                    <h4 className="font-semibold mb-3 text-white dark:text-white light:text-gray-900">Learning Objectives</h4>
                    <ul className="space-y-2 text-sm">
                      {week.objectives.map((objective, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-zinc-400 dark:text-zinc-400 light:text-gray-600">
                          <span className="text-purple-400 dark:text-purple-400 light:text-purple-600 mt-0.5">•</span>
                          {objective}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Technologies */}
                  <div>
                    <h4 className="font-semibold mb-3 text-white dark:text-white light:text-gray-900">Technologies Used</h4>
                    <div className="flex flex-wrap gap-2">
                      {week.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="skill-badge text-xs"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Deliverables */}
                  <div>
                    <h4 className="font-semibold mb-3 text-white dark:text-white light:text-gray-900">Key Deliverables</h4>
                    <ul className="space-y-2 text-sm">
                      {week.deliverables.map((deliverable, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-zinc-400 dark:text-zinc-400 light:text-gray-600">
                          <span className="text-green-400 dark:text-green-400 light:text-green-600 mt-0.5">✓</span>
                          {deliverable}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Summary Statistics */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="card bg-zinc-900 dark:bg-zinc-900 light:bg-white border border-zinc-800 dark:border-zinc-800 light:border-gray-200 rounded-xl p-6 text-center">
            <div className="text-3xl font-bold text-purple-400 dark:text-purple-400 light:text-purple-600 mb-2">
              {completedWeeks}
            </div>
            <div className="text-zinc-400 dark:text-zinc-400 light:text-gray-600">Weeks Completed</div>
          </div>
          
          <div className="card bg-zinc-900 dark:bg-zinc-900 light:bg-white border border-zinc-800 dark:border-zinc-800 light:border-gray-200 rounded-xl p-6 text-center">
            <div className="text-3xl font-bold text-blue-400 dark:text-blue-400 light:text-blue-600 mb-2">
              {learningPath.reduce((acc, week) => acc + week.technologies.length, 0)}
            </div>
            <div className="text-zinc-400 dark:text-zinc-400 light:text-gray-600">Technologies Learned</div>
          </div>
          
          <div className="card bg-zinc-900 dark:bg-zinc-900 light:bg-white border border-zinc-800 dark:border-zinc-800 light:border-gray-200 rounded-xl p-6 text-center">
            <div className="text-3xl font-bold text-green-400 dark:text-green-400 light:text-green-600 mb-2">
              {learningPath.reduce((acc, week) => acc + week.deliverables.length, 0)}
            </div>
            <div className="text-zinc-400 dark:text-zinc-400 light:text-gray-600">Projects Delivered</div>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}