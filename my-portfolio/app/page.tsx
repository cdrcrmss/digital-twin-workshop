import Link from 'next/link';
import { AIChat } from './components/AIChat';
import { ThemeToggle } from './components/ThemeToggle';
import { CVViewer } from './components/CVViewer';
import { Github, Linkedin, Facebook, Mail, ArrowRight, Code2, Sparkles, Briefcase } from 'lucide-react';

export default function Home() {
  const skills = [
    'JavaScript', 'TypeScript', 'React', 'Next.js', 'Node.js',
    'Tailwind CSS', 'Python', 'SQL', 'Git', 'Docker'
  ];

  const projects = [
    {
      title: 'Digital Twin RAG System',
      description: 'AI-powered interview preparation assistant using RAG technology.',
      tech: ['Next.js', 'TypeScript', 'Upstash', 'AI/ML'],
      year: '2025'
    },
    {
      title: 'AI-Enhanced CV Website',
      description: 'Modern, responsive portfolio website with dark mode.',
      tech: ['Next.js', 'Tailwind CSS', 'Vercel'],
      year: '2025',
      link: 'https://week2-ai-cv-website.vercel.app/'
    },
  ];

  return (
    <div className="min-h-screen bg-black text-white transition-colors duration-300 overflow-x-hidden dark:bg-black dark:text-white light:bg-white light:text-gray-900">
      {/* AI Chat Component */}
      <AIChat />
      
      {/* Theme Toggle */}
      <ThemeToggle />

      {/* Geometric Background Shapes */}
      <div className="geo-shape geo-circle w-32 h-32 top-20 right-10 dark:opacity-30 light:opacity-5" />
      <div className="geo-shape geo-square w-24 h-24 bottom-40 left-10 dark:opacity-30 light:opacity-5" />
      <div className="geo-shape geo-circle w-40 h-40 top-1/2 right-1/4 dark:opacity-20 light:opacity-5" />
      
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-black/80 backdrop-blur-xl border-b border-gray-800/50 z-50 dark:bg-black/80 dark:border-gray-800/50 light:bg-white/95 light:border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold">
            <Link href="/" className="text-gradient hover:opacity-80 transition-opacity duration-200">CR</Link>
          </div>
          <div className="hidden lg:flex gap-8 text-sm font-medium dark:text-white light:text-gray-700">
            <a href="/projects" className="hover:text-[#6366f1] transition-colors duration-200">Projects</a>
            <a href="/advanced-features" className="hover:text-[#6366f1] transition-colors duration-200">Advanced</a>
            <a href="/optimization" className="hover:text-[#6366f1] transition-colors duration-200">Optimization</a>
            <a href="/monitoring" className="hover:text-[#6366f1] transition-colors duration-200">Monitoring</a>
            <a href="/mcp-integration" className="hover:text-[#6366f1] transition-colors duration-200">MCP</a>
            <a href="/demo" className="hover:text-[#6366f1] transition-colors duration-200">Demo</a>
            <a href="/professional" className="hover:text-[#6366f1] transition-colors duration-200">Branding</a>
            <a href="#contact" className="hover:text-[#6366f1] transition-colors duration-200">Contact</a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="relative min-h-screen flex items-center px-6 pt-20">
        {/* Animated Blob - Hidden in Light Mode */}
        <div className="hero-blob dark:block light:hidden" style={{ top: '20%', right: '10%' }} />
        
        <div className="max-w-7xl mx-auto w-full grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-6 z-10">
            <div className="inline-block px-4 py-2 bg-gray-900 dark:bg-gray-900 light:bg-gray-100 rounded-full border border-gray-800 dark:border-gray-800 light:border-gray-200">
              <span className="text-sm text-gray-400 dark:text-gray-400 light:text-gray-600">Welcome to my world</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold leading-tight">
              HELLO I&apos;M<br />
              <span className="text-gradient">Cedric Ramos</span>
            </h1>
            
            <p className="text-lg text-gray-400 dark:text-gray-400 light:text-gray-600 max-w-lg">
              I&apos;m a 20-year-old Full Stack Developer from Cauayan City, Philippines. Welcome to my portfolio world.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <a href="mailto:contact@cedricramos.dev" className="btn-primary flex items-center gap-2">
                <Mail className="w-5 h-5" /> Contact Me
              </a>
              <a href="/projects" className="btn-outline flex items-center gap-2">
                View Projects <ArrowRight className="w-4 h-4" />
              </a>
              <CVViewer />
            </div>
          </div>

          {/* Right Image with Stats */}
          <div className="relative">
            <div className="relative w-full max-w-md mx-auto profile-image-container">
              {/* Main Photo Circle */}
              <div className="relative w-full aspect-square rounded-full overflow-hidden border-4 border-[#00d9a3] dark:border-[#00d9a3] light:border-[#6366f1] shadow-2xl shadow-[#00d9a3]/20 light:shadow-[#6366f1]/20">
                <div className="absolute inset-0 bg-gradient-to-br from-[#00d9a3]/20 to-transparent dark:block light:hidden" />
                <img 
                  src="/cedric-photo.jpg" 
                  alt="Cedric Ramos"
                  className="w-full h-full object-cover relative z-10"
                />
              </div>

              {/* Stats Badges - Using CSS Classes for Perfect Positioning */}
              <div className="stats-badge stats-badge-top-right">
                <div className="text-2xl font-bold text-[#00d9a3] dark:text-[#00d9a3] light:text-[#6366f1]">2</div>
                <div className="text-xs text-gray-400 dark:text-gray-400 light:text-gray-600">Projects</div>
              </div>
              <div className="stats-badge stats-badge-bottom-left">
                <div className="text-2xl font-bold text-[#00d9a3] dark:text-[#00d9a3] light:text-[#6366f1]">215+</div>
                <div className="text-xs text-gray-400 dark:text-gray-400 light:text-gray-600">Hours</div>
              </div>
              <div className="stats-badge stats-badge-bottom-right">
                <div className="text-2xl font-bold text-[#00d9a3] dark:text-[#00d9a3] light:text-[#6366f1]">97%</div>
                <div className="text-xs text-gray-400 dark:text-gray-400 light:text-gray-600">Quality</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-center gap-3 mb-8">
            <Briefcase className="w-8 h-8 text-[#00d9a3]" />
            <h2 className="text-4xl font-bold text-center">
              About <span className="text-gradient">Me</span>
            </h2>
          </div>
          <div className="modern-card">
            <p className="text-lg text-gray-300 light:text-gray-700 mb-6 leading-relaxed">
              I&apos;m a 20-year-old aspiring Full Stack Developer from Cauayan City, Philippines. 
              I'm deeply passionate about web development and continuously exploring the world of 
              modern JavaScript frameworks, frontend design, and backend technologies.
            </p>
            <p className="text-lg text-gray-300 light:text-gray-700 mb-6 leading-relaxed">
              I enjoy creating user-friendly and visually appealing web applications while learning
              new tools and best practices that enhance both performance and user experience. My goal
              is to grow as a developer who builds meaningful and impactful digital solutions.
            </p>
            <p className="text-lg text-gray-300 light:text-gray-700 leading-relaxed">
              When I'm not coding, you can find me experimenting with new technologies, contributing 
              to projects, or enjoying outdoor adventures.
            </p>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 px-6 bg-[#1a1f26] light:bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="section-title text-4xl md:text-5xl font-bold mb-4">
              Skills & <span className="text-gradient">Expertise</span>
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {skills.map((skill, index) => (
              <div
                key={skill}
                className="skill-badge"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                {skill}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="portfolio" className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="section-title text-4xl md:text-5xl font-bold mb-4">
              Featured <span className="text-gradient">Projects</span>
            </h2>
            <p className="text-gray-400 light:text-gray-600 max-w-2xl mx-auto">
              Check out some of my recent work
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {projects.map((project, index) => (
              <div
                key={project.title}
                className="project-card"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-start justify-between mb-4">
                  <Code2 className="w-8 h-8 text-[#00d9a3]" />
                  <span className="text-sm text-gray-500">{project.year}</span>
                </div>
                <h3 className="text-2xl font-bold mb-3">{project.title}</h3>
                <p className="text-gray-400 light:text-gray-600 mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tech.map((tech) => (
                    <span key={tech} className="skill-badge text-sm">
                      {tech}
                    </span>
                  ))}
                </div>
                {project.link && (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-[#00d9a3] hover:text-[#00f5c4] transition font-medium"
                  >
                    View Project <ArrowRight className="w-4 h-4" />
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-6 bg-[#1a1f26] light:bg-gray-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-8">
            Get In <span className="text-gradient">Touch</span>
          </h2>
          <p className="text-lg text-gray-400 light:text-gray-600 mb-8 max-w-2xl mx-auto">
            I'm always open to new opportunities, collaborations, and interesting projects. 
            Feel free to reach out!
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <a href="mailto:contact@cedricramos.dev" className="btn-primary flex items-center justify-center gap-2">
              <Mail className="w-5 h-5" /> Send Email
            </a>
            <CVViewer />
          </div>

          <div className="flex gap-6 justify-center">
            <a
              href="https://github.com/cdrcrmss"
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 bg-[#0f1419] light:bg-white rounded-lg hover:scale-110 transition-transform border border-gray-800 light:border-gray-200"
            >
              <Github className="w-6 h-6" />
            </a>
            <a
              href="https://www.linkedin.com/in/cedric-ramos-548971286/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 bg-[#0f1419] light:bg-white rounded-lg hover:scale-110 transition-transform border border-gray-800 light:border-gray-200"
            >
              <Linkedin className="w-6 h-6" />
            </a>
            <a
              href="https://www.facebook.com/cdrcrmss"
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 bg-[#0f1419] light:bg-white rounded-lg hover:scale-110 transition-transform border border-gray-800 light:border-gray-200"
            >
              <Facebook className="w-6 h-6" />
            </a>
          </div>

          <div className="mt-12 p-6 bg-[#00d9a3]/10 dark:bg-[#00d9a3]/10 light:bg-[#6366f1]/10 border border-[#00d9a3]/30 dark:border-[#00d9a3]/30 light:border-[#6366f1]/30 rounded-2xl">
            <div className="flex items-center justify-center gap-2 text-[#00d9a3] dark:text-[#00d9a3] light:text-[#6366f1]">
              <Sparkles className="w-5 h-5 animate-pulse" />
              <span className="text-sm font-medium">Try the AI chatbot in the bottom right corner!</span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-gray-800 light:border-gray-200 bg-[#0f1419] light:bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            {/* About Column */}
            <div>
              <h3 className="text-lg font-bold mb-4 text-gradient">Cedric Ramos</h3>
              <p className="text-sm text-gray-400 light:text-gray-600 mb-4">
                Full Stack Developer specializing in AI-powered web applications with Next.js and modern technologies.
              </p>
              <div className="flex gap-3">
                <a href="https://github.com/cdrcrmss" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#00d9a3] transition">
                  <Github className="w-5 h-5" />
                </a>
                <a href="https://www.linkedin.com/in/cedric-ramos-548971286/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#00d9a3] transition">
                  <Linkedin className="w-5 h-5" />
                </a>
                <a href="https://www.facebook.com/cdrcrmss" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#00d9a3] transition">
                  <Facebook className="w-5 h-5" />
                </a>
              </div>
            </div>

            {/* Projects Column */}
            <div>
              <h3 className="text-sm font-bold mb-4 text-[#00d9a3] dark:text-[#00d9a3] light:text-[#6366f1]">Projects</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="/projects" className="text-gray-400 dark:text-gray-400 light:text-gray-600 hover:text-[#00d9a3] dark:hover:text-[#00d9a3] light:hover:text-[#6366f1] transition">All Projects</a></li>
                <li><a href="/advanced-features" className="text-gray-400 dark:text-gray-400 light:text-gray-600 hover:text-[#00d9a3] dark:hover:text-[#00d9a3] light:hover:text-[#6366f1] transition">Advanced Features</a></li>
                <li><a href="/optimization" className="text-gray-400 dark:text-gray-400 light:text-gray-600 hover:text-[#00d9a3] dark:hover:text-[#00d9a3] light:hover:text-[#6366f1] transition">Optimization</a></li>
              </ul>
            </div>

            {/* Resources Column */}
            <div>
              <h3 className="text-sm font-bold mb-4 text-[#00d9a3] dark:text-[#00d9a3] light:text-[#6366f1]">Resources</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="/monitoring" className="text-gray-400 dark:text-gray-400 light:text-gray-600 hover:text-[#00d9a3] dark:hover:text-[#00d9a3] light:hover:text-[#6366f1] transition">Monitoring</a></li>
                <li><a href="/mcp-integration" className="text-gray-400 dark:text-gray-400 light:text-gray-600 hover:text-[#00d9a3] dark:hover:text-[#00d9a3] light:hover:text-[#6366f1] transition">MCP Protocol</a></li>
                <li><a href="/demo" className="text-gray-400 dark:text-gray-400 light:text-gray-600 hover:text-[#00d9a3] dark:hover:text-[#00d9a3] light:hover:text-[#6366f1] transition">Live Demos</a></li>
              </ul>
            </div>

            {/* Contact Column */}
            <div>
              <h3 className="text-sm font-bold mb-4 text-[#00d9a3] dark:text-[#00d9a3] light:text-[#6366f1]">Contact</h3>
              <ul className="space-y-2 text-sm">
                <li className="text-gray-400 dark:text-gray-400 light:text-gray-600">Cauayan City, Philippines</li>
                <li><a href="mailto:contact@cedricramos.dev" className="text-gray-400 dark:text-gray-400 light:text-gray-600 hover:text-[#00d9a3] dark:hover:text-[#00d9a3] light:hover:text-[#6366f1] transition">contact@cedricramos.dev</a></li>
                <li><a href="/Cedric-Ramos-CV.pdf" target="_blank" className="text-gray-400 dark:text-gray-400 light:text-gray-600 hover:text-[#00d9a3] dark:hover:text-[#00d9a3] light:hover:text-[#6366f1] transition">Download CV</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 light:border-gray-200 pt-8 text-center">
            <p className="text-gray-500 dark:text-gray-500 light:text-gray-600 text-sm mb-2">© 2025 Lord Cedric D. Ramos. Built with Next.js</p>
            <p className="text-gray-600 dark:text-gray-600 light:text-gray-500 text-xs">
              <span className="text-[#00d9a3] dark:text-[#00d9a3] light:text-[#6366f1]">Digital Twin RAG</span> · 
              <span className="text-[#00d9a3] dark:text-[#00d9a3] light:text-[#6366f1]"> MCP Protocol</span> · 
              <span className="text-[#00d9a3] dark:text-[#00d9a3] light:text-[#6366f1]"> Upstash Vector</span> · 
              <span className="text-[#00d9a3] dark:text-[#00d9a3] light:text-[#6366f1]"> Groq LLM</span>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
