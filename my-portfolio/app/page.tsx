import { AIChat } from './components/AIChat';
import { ThemeToggle } from './components/ThemeToggle';
import { CVViewer } from './components/CVViewer';
import { Github, Linkedin, Facebook, Code, Sparkles, Briefcase, GraduationCap } from 'lucide-react';

export default function Home() {
  const skills = [
    { name: 'JavaScript', icon: '🟨' },
    { name: 'TypeScript', icon: '🔷' },
    { name: 'React', icon: '⚛️' },
    { name: 'Next.js', icon: '▲' },
    { name: 'Node.js', icon: '🟢' },
    { name: 'Tailwind CSS', icon: '🎨' },
    { name: 'Python', icon: '🐍' },
    { name: 'SQL', icon: '🗄️' },
    { name: 'Git', icon: '📚' },
    { name: 'Docker', icon: '🐳' },
  ];

  const projects = [
    {
      title: 'Digital Twin RAG System',
      description: 'AI-powered interview preparation assistant using RAG technology, Upstash Vector, and Groq LLM.',
      tech: ['Next.js', 'TypeScript', 'Upstash', 'AI/ML'],
      year: '2025'
    },
    {
      title: 'AI-Enhanced CV Website',
      description: 'Modern, responsive portfolio website with dark mode and interactive sections.',
      tech: ['Next.js', 'Tailwind CSS', 'Vercel'],
      year: '2025',
      link: 'https://week2-ai-cv-website.vercel.app/'
    },
  ];

  return (
    <div className="min-h-screen bg-black light:bg-white text-white light:text-black transition-colors duration-300">
      {/* AI Chat Component */}
      <AIChat />
      
      {/* Theme Toggle */}
      <ThemeToggle />
      
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-black/80 light:bg-white/80 backdrop-blur-md border-b border-zinc-800 light:border-zinc-200 z-40">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="text-xl font-bold">
            <a href="/" className="text-gradient hover:opacity-80 transition">CR</a>
          </div>
          <div className="hidden lg:flex gap-6 text-sm">
            <a href="#about" className="hover:text-purple-400 transition">About</a>
            <a href="#skills" className="hover:text-purple-400 transition">Skills</a>
            <a href="/projects" className="hover:text-purple-400 transition">Projects</a>
            <a href="/advanced-features" className="hover:text-purple-400 transition">Advanced</a>
            <a href="/optimization" className="hover:text-purple-400 transition">Optimization</a>
            <a href="/monitoring" className="hover:text-purple-400 transition">Monitoring</a>
            <a href="/mcp-integration" className="hover:text-purple-400 transition">MCP</a>
            <a href="/demo" className="hover:text-purple-400 transition">Demo</a>
            <a href="/professional" className="hover:text-purple-400 transition">Branding</a>
            <a href="#contact" className="hover:text-purple-400 transition">Contact</a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center px-6 pt-20">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-6">
            <div className="w-32 h-32 mx-auto mb-6 rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 p-1">
              <div className="w-full h-full rounded-full bg-black light:bg-white overflow-hidden">
                <img 
                  src="/cedric-photo.jpg" 
                  alt="Cedric Ramos"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            Lord Cedric D. <span className="text-gradient">Ramos</span>
          </h1>
          
          <p className="text-2xl md:text-3xl text-zinc-400 mb-4">
            Full Stack Developer
          </p>
          
          <p className="text-lg text-zinc-500 max-w-2xl mx-auto mb-8">
            Passionate about building modern web applications with React, Next.js, and AI integration. 
            Based in Cauayan City, Philippines 🇵🇭
          </p>
          
          <div className="flex gap-4 justify-center mb-8">
            <a
              href="https://github.com/cdrcrmss"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-zinc-900 hover:bg-zinc-800 rounded-lg transition"
            >
              <Github className="w-6 h-6" />
            </a>
            <a
              href="https://www.linkedin.com/in/cedric-ramos-548971286/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-zinc-900 hover:bg-zinc-800 rounded-lg transition"
            >
              <Linkedin className="w-6 h-6" />
            </a>
            <a
              href="https://www.facebook.com/cdrcrmss"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-zinc-900 hover:bg-zinc-800 rounded-lg transition"
            >
              <Facebook className="w-6 h-6" />
            </a>
          </div>
          
          <CVViewer />

          <div className="mt-12 p-6 bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-purple-500/30 rounded-2xl hover-lift">
            <div className="flex items-center justify-center gap-2 text-purple-400">
              <Sparkles className="w-5 h-5 animate-pulse" />
              <span className="text-sm font-medium">Try the AI chatbot in the bottom right corner!</span>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-center gap-3 mb-8">
            <Briefcase className="w-8 h-8 text-blue-500" />
            <h2 className="text-4xl font-bold text-center">
              About <span className="text-gradient">Me</span>
            </h2>
          </div>
          <div className="bg-zinc-900 light:bg-zinc-100 rounded-2xl p-8 border border-zinc-800 light:border-zinc-300 hover-lift shadow-xl">
            <p className="text-lg text-zinc-300 light:text-black mb-6 leading-relaxed">
              I'm a 20-year-old aspiring Full Stack Developer from Cauayan City, Philippines. 
              I'm deeply passionate about web development and continuously exploring the world of 
              modern JavaScript frameworks, frontend design, and backend technologies.
            </p>
            <p className="text-lg text-zinc-300 light:text-black mb-6 leading-relaxed">
              I enjoy creating user-friendly and visually appealing web applications while learning 
              new tools and best practices that enhance both performance and user experience. My goal 
              is to grow as a developer who builds meaningful and impactful digital solutions.
            </p>
            <p className="text-lg text-zinc-300 light:text-black leading-relaxed">
              When I'm not coding, you can find me experimenting with new technologies, contributing 
              to projects, or enjoying outdoor adventures.
            </p>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 px-6 bg-zinc-950 light:bg-zinc-50">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-center gap-3 mb-8">
            <Code className="w-8 h-8 text-purple-500" />
            <h2 className="text-4xl font-bold text-center">
              Skills & <span className="text-gradient">Expertise</span>
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {skills.map((skill, index) => (
              <div
                key={skill.name}
                className="bg-zinc-900 light:bg-white hover:bg-zinc-800 light:hover:bg-zinc-50 border border-zinc-800 light:border-zinc-300 rounded-xl p-6 text-center transition-all duration-300 cursor-pointer group hover-lift shadow-lg"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="text-4xl mb-3 group-hover:scale-125 transition-transform duration-300">{skill.icon}</div>
                <p className="font-medium text-white light:text-black">{skill.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-center gap-3 mb-8">
            <Sparkles className="w-8 h-8 text-pink-500" />
            <h2 className="text-4xl font-bold text-center">
              Featured <span className="text-gradient">Projects</span>
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {projects.map((project) => (
              <div
                key={project.title}
                className="bg-zinc-900 light:bg-zinc-100 border border-zinc-800 light:border-zinc-300 rounded-2xl p-6 hover:border-purple-500/50 transition-all duration-300 group hover-lift shadow-xl"
              >
                <div className="flex items-start justify-between mb-4">
                  <Code className="w-8 h-8 text-purple-400" />
                  <span className="text-sm text-zinc-500">{project.year}</span>
                </div>
                <h3 className="text-xl font-bold mb-3 group-hover:text-gradient transition">{project.title}</h3>
                <p className="text-zinc-400 mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 bg-zinc-800 text-xs rounded-full text-purple-400"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                {project.link && (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-block text-sm text-purple-400 hover:text-purple-300 transition"
                  >
                    View Project →
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-6 bg-zinc-950">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-8">
            Get In <span className="text-gradient">Touch</span>
          </h2>
          <p className="text-lg text-zinc-400 mb-8 max-w-2xl mx-auto">
            I'm always open to new opportunities, collaborations, and interesting projects. 
            Feel free to reach out!
          </p>
          <div className="flex gap-4 justify-center">
            <a
              href="mailto:contact@cedricramos.dev"
              className="px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 rounded-full font-medium transition flex items-center gap-2 shadow-lg hover:shadow-xl hover:scale-105"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              Send Email
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-zinc-800 bg-zinc-950 light:bg-zinc-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            {/* About Column */}
            <div>
              <h3 className="text-lg font-bold mb-4 text-gradient">Cedric Ramos</h3>
              <p className="text-sm text-zinc-400 light:text-zinc-600 mb-4">
                Full Stack Developer specializing in AI-powered web applications with Next.js and modern technologies.
              </p>
              <div className="flex gap-3">
                <a href="https://github.com/cdrcrmss" target="_blank" rel="noopener noreferrer" className="text-zinc-400 hover:text-purple-400 transition">
                  <Github className="w-5 h-5" />
                </a>
                <a href="https://www.linkedin.com/in/cedric-ramos-548971286/" target="_blank" rel="noopener noreferrer" className="text-zinc-400 hover:text-purple-400 transition">
                  <Linkedin className="w-5 h-5" />
                </a>
                <a href="https://www.facebook.com/cdrcrmss" target="_blank" rel="noopener noreferrer" className="text-zinc-400 hover:text-purple-400 transition">
                  <Facebook className="w-5 h-5" />
                </a>
              </div>
            </div>

            {/* Week 6-7 Column */}
            <div>
              <h3 className="text-sm font-bold mb-4 text-purple-400">Digital Twin (Weeks 6-7)</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="/projects" className="text-zinc-400 hover:text-purple-400 transition">All Projects</a></li>
                <li><a href="/advanced-features" className="text-zinc-400 hover:text-purple-400 transition">Advanced Features</a></li>
                <li><a href="/optimization" className="text-zinc-400 hover:text-purple-400 transition">Optimization</a></li>
                <li><a href="http://localhost:3000/about" target="_blank" className="text-zinc-400 hover:text-purple-400 transition">RAG Architecture</a></li>
                <li><a href="http://localhost:3000/testing" target="_blank" className="text-zinc-400 hover:text-purple-400 transition">Testing (25+ Queries)</a></li>
              </ul>
            </div>

            {/* Week 8 Column */}
            <div>
              <h3 className="text-sm font-bold mb-4 text-blue-400">Production (Week 8)</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="/monitoring" className="text-zinc-400 hover:text-purple-400 transition">Monitoring Dashboard</a></li>
                <li><a href="/scalability" className="text-zinc-400 hover:text-purple-400 transition">Scalability Testing</a></li>
                <li><a href="/operations" className="text-zinc-400 hover:text-purple-400 transition">Operations Guide</a></li>
                <li><a href="http://localhost:3000/profile-data" target="_blank" className="text-zinc-400 hover:text-purple-400 transition">Profile Data (16 Chunks)</a></li>
                <li><a href="http://localhost:3000/github" target="_blank" className="text-zinc-400 hover:text-purple-400 transition">GitHub Repository</a></li>
              </ul>
            </div>

            {/* Final Integration Column */}
            <div>
              <h3 className="text-sm font-bold mb-4 text-green-400">Final Integration</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="/mcp-integration" className="text-zinc-400 hover:text-purple-400 transition">MCP Protocol</a></li>
                <li><a href="/demo" className="text-zinc-400 hover:text-purple-400 transition">Live Demos</a></li>
                <li><a href="/professional" className="text-zinc-400 hover:text-purple-400 transition">Design System</a></li>
                <li><a href="http://localhost:3000" target="_blank" className="text-zinc-400 hover:text-purple-400 transition">Digital Twin Chat</a></li>
                <li><a href="/Cedric-Ramos-CV.pdf" target="_blank" className="text-zinc-400 hover:text-purple-400 transition">Download CV (PDF)</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-zinc-800 light:border-zinc-300 pt-8 text-center">
            <p className="text-zinc-500 text-sm mb-2">© 2025 Lord Cedric D. Ramos. Built with Next.js & ❤️</p>
            <p className="text-zinc-600 text-xs">
              <span className="text-purple-400">Digital Twin RAG</span> · 
              <span className="text-blue-400"> MCP Protocol</span> · 
              <span className="text-green-400"> Upstash Vector</span> · 
              <span className="text-orange-400"> Groq LLM</span>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
