'use client';

import { useState } from 'react';

const profileData = {
  name: "Lord Cedric D. Ramos - Digital Twin",
  description: "AI-powered professional profile for interview preparation and portfolio chatbot",
  version: "1.0.0",
  created_at: "2025-11-14T14:00:00+08:00",
  total_chunks: 16,
  content_chunks: [
    {
      id: "personal_intro",
      title: "Professional Introduction",
      content: "I'm Lord Cedric D. Ramos, a 20-year-old aspiring Full Stack Developer from Cauayan City, Philippines. I'm deeply passionate about web development and continuously exploring the world of modern JavaScript frameworks, frontend design, and backend technologies. I enjoy creating user-friendly and visually appealing web applications while learning new tools and best practices that enhance both performance and user experience. My goal is to grow as a developer who builds meaningful and impactful digital solutions.",
      type: "introduction",
      metadata: {
        name: "Lord Cedric D. Ramos",
        age: 20,
        location: "Cauayan City, Philippines",
        role: "Full Stack Developer",
        category: "personal"
      }
    },
    {
      id: "about_me",
      title: "About Me",
      content: "When I'm not coding, you can find me experimenting with new technologies, contributing to projects, or enjoying outdoor adventures. I'm constantly learning and staying up-to-date with the latest developments in web development, AI integration, and modern frameworks. I believe in building applications that not only work well but also provide an excellent user experience.",
      type: "about",
      metadata: {
        interests: ["new technologies", "open source", "outdoor adventures"],
        category: "personal"
      }
    },
    {
      id: "skills_frontend",
      title: "Frontend Development Skills",
      content: "I'm proficient in JavaScript and TypeScript, with strong experience in React and Next.js for building modern, responsive web applications. I use Tailwind CSS for creating beautiful, maintainable user interfaces. I focus on component-based architecture, state management, and creating performant, accessible web experiences.",
      type: "skills",
      metadata: {
        category: "technical_skills",
        proficiency_level: "Intermediate-Advanced",
        technologies: ["JavaScript", "TypeScript", "React", "Next.js", "Tailwind CSS"],
        tags: ["frontend", "UI/UX", "responsive design"]
      }
    },
    {
      id: "skills_backend",
      title: "Backend Development Skills",
      content: "I have experience with Node.js for building server-side applications and APIs. I work with SQL databases for data management and persistence. I understand RESTful API design principles and can create scalable backend solutions that support modern web applications.",
      type: "skills",
      metadata: {
        category: "technical_skills",
        proficiency_level: "Intermediate",
        technologies: ["Node.js", "SQL", "REST APIs"],
        tags: ["backend", "API development", "databases"]
      }
    },
    {
      id: "skills_tools",
      title: "Development Tools and DevOps",
      content: "I'm experienced with version control using Git for collaborative development. I have hands-on experience with Docker for containerization and deployment. I follow modern development workflows and best practices for code quality, testing, and continuous integration.",
      type: "skills",
      metadata: {
        category: "technical_skills",
        technologies: ["Git", "Docker", "CI/CD"],
        tags: ["DevOps", "version control", "containerization"]
      }
    },
    {
      id: "skills_python",
      title: "Python Development",
      content: "I have knowledge of Python for backend development, scripting, and automation. I've worked with Python frameworks and libraries for building web applications and integrating AI/ML features. I'm comfortable with Python for data processing and API development.",
      type: "skills",
      metadata: {
        category: "technical_skills",
        proficiency_level: "Intermediate",
        technologies: ["Python"],
        tags: ["backend", "scripting", "automation"]
      }
    },
    {
      id: "project_digital_twin",
      title: "Project - Digital Twin RAG System",
      content: "Built a production-ready Digital Twin AI assistant using RAG (Retrieval-Augmented Generation) technology. The system uses Upstash Vector for semantic search, Groq's LLaMA models for fast inference, and implements the Model Context Protocol (MCP) for integration with VS Code and Claude Desktop. Built with Next.js 16, TypeScript, and deployed on Vercel. Features LLM-enhanced query preprocessing and response post-processing for interview preparation.",
      type: "project",
      metadata: {
        technologies: ["Next.js", "TypeScript", "Upstash Vector", "Groq API", "MCP Protocol", "Vercel", "Python"],
        category: "projects",
        year: 2025,
        tags: ["RAG", "AI", "full-stack", "vector database"]
      }
    },
    {
      id: "project_cv_website",
      title: "Project - AI-Enhanced CV Website",
      content: "Developed a modern, responsive CV website using Next.js and Tailwind CSS. Features include a clean, professional design with dark mode support, interactive sections for projects, education, and contact information. Integrated AI chatbot functionality for interactive portfolio exploration. Deployed on Vercel with optimized performance and SEO.",
      type: "project",
      metadata: {
        url: "https://week2-ai-cv-website.vercel.app/",
        technologies: ["Next.js", "React", "Tailwind CSS", "Vercel"],
        category: "projects",
        year: 2025,
        tags: ["portfolio", "UI/UX", "responsive design"]
      }
    },
    {
      id: "learning_focus",
      title: "Current Learning and Development",
      content: "I'm currently focusing on advancing my skills in AI integration, particularly RAG systems and vector databases. I'm learning about Model Context Protocol (MCP) for AI agent development, exploring Upstash Vector for semantic search, and mastering advanced Next.js patterns. I'm also deepening my understanding of TypeScript, modern React patterns, and cloud deployment strategies.",
      type: "learning",
      metadata: {
        current_focus: ["AI/RAG systems", "Vector databases", "MCP protocol", "Advanced Next.js", "TypeScript"],
        category: "professional_development",
        tags: ["continuous learning", "AI", "modern web development"]
      }
    },
    {
      id: "career_goals",
      title: "Career Goals and Aspirations",
      content: "My immediate goal is to secure a Full Stack Developer role where I can apply my skills in React, Next.js, and Node.js while continuing to learn and grow. I'm particularly interested in positions that involve AI integration, modern web technologies, and creating user-centric applications. Long-term, I aspire to become a senior developer and technical leader, contributing to innovative projects that make a real impact. I want to specialize in the intersection of web development and AI, building intelligent, scalable applications.",
      type: "career_goals",
      metadata: {
        short_term: "Full Stack Developer role with AI focus",
        long_term: "Senior Developer / Technical Leader",
        interests: ["AI integration", "Modern web development", "User-centric design"],
        category: "career_development"
      }
    },
    {
      id: "contact_info",
      title: "Contact and Social Media",
      content: "You can reach me through GitHub at github.com/cdrcrmss, LinkedIn at linkedin.com/in/cedric-ramos-548971286, or Facebook at facebook.com/cdrcrmss. I'm open to collaboration opportunities, job offers, and connecting with fellow developers. Feel free to check out my portfolio at week2-ai-cv-website.vercel.app to see my work and download my CV.",
      type: "contact",
      metadata: {
        github: "https://github.com/cdrcrmss",
        linkedin: "https://www.linkedin.com/in/cedric-ramos-548971286/",
        facebook: "https://www.facebook.com/cdrcrmss",
        portfolio: "https://week2-ai-cv-website.vercel.app/",
        category: "contact_information"
      }
    },
    {
      id: "education",
      title: "Education Background",
      content: "I'm currently pursuing my education in Computer Science / Information Technology, focusing on web development, software engineering, and modern programming practices. I'm committed to continuous learning through online courses, tutorials, workshops, and hands-on projects. I actively participate in developer communities and stay updated with the latest industry trends and technologies.",
      type: "education",
      metadata: {
        field: "Computer Science / Information Technology",
        location: "Cauayan City, Philippines",
        category: "education",
        learning_methods: ["online courses", "self-study", "hands-on projects", "community participation"]
      }
    },
    {
      id: "work_style",
      title: "Work Style and Approach",
      content: "I approach development with a focus on clean code, user experience, and continuous improvement. I believe in following best practices, writing maintainable code, and creating well-documented solutions. I enjoy collaborating with teams, learning from others, and sharing knowledge. I'm adaptable, quick to learn new technologies, and always looking for ways to improve both my technical skills and the projects I work on.",
      type: "work_style",
      metadata: {
        values: ["clean code", "user experience", "continuous improvement", "collaboration"],
        category: "professional_attributes",
        tags: ["teamwork", "best practices", "adaptability"]
      }
    },
    {
      id: "interview_why_hire",
      title: "Why You Should Hire Me",
      content: "You should hire me because I bring genuine passion for web development combined with a strong foundation in modern technologies like React, Next.js, and TypeScript. I'm a quick learner who stays current with industry trends and best practices. I focus on creating high-quality, user-friendly applications while writing clean, maintainable code. My recent projects demonstrate my ability to work with cutting-edge technologies like AI/RAG systems and vector databases. I'm eager to contribute to meaningful projects, grow alongside a team, and bring fresh perspectives to problem-solving. Most importantly, I'm dedicated to continuous learning and improvement, making me a valuable long-term asset to any development team.",
      type: "interview_prep",
      metadata: {
        key_strengths: ["passion", "modern tech stack", "quick learner", "quality focus", "AI knowledge"],
        category: "interview_preparation"
      }
    },
    {
      id: "interview_strengths",
      title: "Key Strengths",
      content: "My key strengths include: 1) Strong foundation in modern JavaScript/TypeScript and React/Next.js ecosystem, 2) Ability to quickly learn and adapt to new technologies and frameworks, 3) Focus on creating excellent user experiences with clean, responsive designs, 4) Experience with full-stack development from frontend to backend and deployment, 5) Genuine passion for coding and building meaningful applications, 6) Self-motivated and committed to continuous learning and improvement.",
      type: "interview_prep",
      metadata: {
        category: "interview_preparation",
        tags: ["strengths", "technical skills", "soft skills"]
      }
    },
    {
      id: "interview_challenges",
      title: "Overcoming Challenges",
      content: "When I face challenges in development, I approach them systematically: I break down complex problems into smaller, manageable pieces, research solutions through documentation and community resources, experiment with different approaches, and learn from both successes and failures. For example, when building my Digital Twin RAG system, I had to learn about vector databases, semantic search, and LLM integration from scratch. I dedicated time to understanding the concepts, studied examples, and iteratively built the solution while documenting my learning process. This experience taught me that persistent learning and hands-on experimentation are key to mastering new technologies.",
      type: "interview_prep",
      metadata: {
        category: "interview_preparation",
        tags: ["problem-solving", "learning approach", "resilience"]
      }
    }
  ]
};

export default function ProfileDataPage() {
  const [selectedChunk, setSelectedChunk] = useState<any>(null);
  const [filterType, setFilterType] = useState<string>('All');

  const contentTypes = ['All', ...Array.from(new Set(profileData.content_chunks.map(c => c.type)))];
  const filteredChunks = filterType === 'All' 
    ? profileData.content_chunks 
    : profileData.content_chunks.filter(c => c.type === filterType);

  const getTypeColor = (type: string) => {
    const colors: Record<string, string> = {
      introduction: 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300',
      about: 'bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300',
      skills: 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300',
      project: 'bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-300',
      learning: 'bg-pink-100 dark:bg-pink-900/30 text-pink-800 dark:text-pink-300',
      career_goals: 'bg-indigo-100 dark:bg-indigo-900/30 text-indigo-800 dark:text-indigo-300',
      contact: 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300',
      education: 'bg-teal-100 dark:bg-teal-900/30 text-teal-800 dark:text-teal-300',
      work_style: 'bg-cyan-100 dark:bg-cyan-900/30 text-cyan-800 dark:text-cyan-300',
      interview_prep: 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300'
    };
    return colors[type] || 'bg-zinc-100 dark:bg-zinc-900/30 text-zinc-800 dark:text-zinc-300';
  };

  return (
    <div className="min-h-screen bg-white dark:bg-black text-zinc-900 dark:text-white">
      <div className="container mx-auto max-w-6xl px-6 py-12">
        <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Professional Profile Data Structure
        </h1>
        <p className="text-lg mb-8 text-zinc-700 dark:text-zinc-300">
          Organized content chunks for semantic search and RAG retrieval
        </p>

        {/* Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-blue-100 dark:bg-blue-900/30 p-6 rounded-lg border border-blue-300 dark:border-blue-800">
            <h3 className="text-sm font-semibold text-blue-800 dark:text-blue-300 mb-2">Total Chunks</h3>
            <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">{profileData.total_chunks}</p>
          </div>
          <div className="bg-green-100 dark:bg-green-900/30 p-6 rounded-lg border border-green-300 dark:border-green-800">
            <h3 className="text-sm font-semibold text-green-800 dark:text-green-300 mb-2">Content Types</h3>
            <p className="text-3xl font-bold text-green-600 dark:text-green-400">{contentTypes.length - 1}</p>
          </div>
          <div className="bg-purple-100 dark:bg-purple-900/30 p-6 rounded-lg border border-purple-300 dark:border-purple-800">
            <h3 className="text-sm font-semibold text-purple-800 dark:text-purple-300 mb-2">Version</h3>
            <p className="text-3xl font-bold text-purple-600 dark:text-purple-400">{profileData.version}</p>
          </div>
          <div className="bg-orange-100 dark:bg-orange-900/30 p-6 rounded-lg border border-orange-300 dark:border-orange-800">
            <h3 className="text-sm font-semibold text-orange-800 dark:text-orange-300 mb-2">Embedding Model</h3>
            <p className="text-xs font-bold text-orange-600 dark:text-orange-400">all-MiniLM-L6-v2</p>
          </div>
        </div>

        {/* Filter */}
        <div className="mb-6">
          <label className="block text-sm font-semibold mb-2">Filter by Content Type:</label>
          <div className="flex flex-wrap gap-2">
            {contentTypes.map(type => (
              <button
                key={type}
                onClick={() => setFilterType(type)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  filterType === type
                    ? 'bg-blue-600 text-white'
                    : 'bg-zinc-200 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-300 dark:hover:bg-zinc-700'
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Chunk List */}
          <div className="space-y-3 max-h-[800px] overflow-y-auto pr-2">
            {filteredChunks.map((chunk, idx) => (
              <div
                key={chunk.id}
                onClick={() => setSelectedChunk(chunk)}
                className={`p-4 rounded-lg border cursor-pointer transition-all hover:shadow-lg ${
                  selectedChunk?.id === chunk.id
                    ? 'bg-blue-100 dark:bg-blue-900/30 border-blue-500'
                    : 'bg-zinc-100 dark:bg-zinc-900 border-zinc-300 dark:border-zinc-800'
                }`}
              >
                <div className="flex justify-between items-start mb-2">
                  <span className={`text-xs font-semibold px-2 py-1 rounded ${getTypeColor(chunk.type)}`}>
                    {chunk.type}
                  </span>
                  <span className="text-xs text-zinc-500 dark:text-zinc-400">#{idx + 1}</span>
                </div>
                <h3 className="font-semibold mb-2 text-zinc-900 dark:text-white">{chunk.title}</h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 line-clamp-2">{chunk.content}</p>
                <p className="text-xs text-zinc-500 dark:text-zinc-500 mt-2">ID: {chunk.id}</p>
              </div>
            ))}
          </div>

          {/* Detail Panel */}
          <div className="bg-zinc-100 dark:bg-zinc-900 p-6 rounded-lg border border-zinc-300 dark:border-zinc-800 sticky top-6 max-h-[800px] overflow-y-auto">
            {selectedChunk ? (
              <>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-zinc-900 dark:text-white">Chunk Details</h3>
                  <span className={`text-xs font-semibold px-3 py-1 rounded ${getTypeColor(selectedChunk.type)}`}>
                    {selectedChunk.type}
                  </span>
                </div>

                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-semibold text-zinc-700 dark:text-zinc-300 mb-1">Title</h4>
                    <p className="text-zinc-900 dark:text-white font-medium">{selectedChunk.title}</p>
                  </div>

                  <div>
                    <h4 className="text-sm font-semibold text-zinc-700 dark:text-zinc-300 mb-1">ID</h4>
                    <code className="text-sm bg-zinc-200 dark:bg-zinc-800 px-2 py-1 rounded">{selectedChunk.id}</code>
                  </div>

                  <div>
                    <h4 className="text-sm font-semibold text-zinc-700 dark:text-zinc-300 mb-2">Content</h4>
                    <p className="text-sm text-zinc-700 dark:text-zinc-300 bg-white dark:bg-zinc-800 p-3 rounded border border-zinc-300 dark:border-zinc-700">
                      {selectedChunk.content}
                    </p>
                  </div>

                  <div>
                    <h4 className="text-sm font-semibold text-zinc-700 dark:text-zinc-300 mb-2">Metadata</h4>
                    <div className="bg-white dark:bg-zinc-800 p-3 rounded border border-zinc-300 dark:border-zinc-700">
                      <pre className="text-xs text-zinc-700 dark:text-zinc-300 overflow-x-auto">
                        {JSON.stringify(selectedChunk.metadata, null, 2)}
                      </pre>
                    </div>
                  </div>

                  {selectedChunk.metadata.technologies && (
                    <div>
                      <h4 className="text-sm font-semibold text-zinc-700 dark:text-zinc-300 mb-2">Technologies</h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedChunk.metadata.technologies.map((tech: string) => (
                          <span
                            key={tech}
                            className="text-xs px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {selectedChunk.metadata.tags && (
                    <div>
                      <h4 className="text-sm font-semibold text-zinc-700 dark:text-zinc-300 mb-2">Tags</h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedChunk.metadata.tags.map((tag: string) => (
                          <span
                            key={tag}
                            className="text-xs px-2 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300 rounded"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <div className="text-center text-zinc-500 dark:text-zinc-400 py-12">
                Select a content chunk to view details
              </div>
            )}
          </div>
        </div>

        <div className="mt-12 bg-zinc-100 dark:bg-zinc-900 p-6 rounded-lg border border-zinc-300 dark:border-zinc-800">
          <h2 className="text-xl font-semibold mb-4 text-zinc-900 dark:text-white">Content Organization</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-zinc-700 dark:text-zinc-300">
            <div>
              <h3 className="font-semibold mb-2">Structured Metadata</h3>
              <ul className="space-y-1 text-xs">
                <li>• Categories for semantic grouping</li>
                <li>• Proficiency levels for skills</li>
                <li>• Technology tags for filtering</li>
                <li>• Links and URLs for projects</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-2">RAG Optimization</h3>
              <ul className="space-y-1 text-xs">
                <li>• 384-dimension embeddings</li>
                <li>• Semantic similarity search</li>
                <li>• Context-aware retrieval</li>
                <li>• Top-3 relevance ranking</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-12 text-center">
          <a 
            href="/"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg transition-colors"
          >
            ← Back to Chat
          </a>
        </div>
      </div>
    </div>
  );
}
