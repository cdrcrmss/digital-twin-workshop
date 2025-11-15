export default function GitHubPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-black text-zinc-900 dark:text-white">
      <div className="container mx-auto max-w-4xl px-6 py-12">
        <h1 className="text-4xl font-bold mb-8 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          GitHub Repository
        </h1>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4 text-blue-600 dark:text-blue-400">Complete Implementation</h2>
          <p className="text-lg mb-6 text-zinc-700 dark:text-zinc-300">
            The full source code for this Digital Twin RAG system is available on GitHub. 
            The repository includes all implementation details, configuration files, and documentation.
          </p>

          <div className="bg-zinc-100 dark:bg-zinc-900 p-8 rounded-lg border border-zinc-300 dark:border-zinc-800 text-center">
            <div className="mb-6">
              <svg className="w-24 h-24 mx-auto text-zinc-800 dark:text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
              </svg>
            </div>
            
            <h3 className="text-xl font-semibold mb-4 text-zinc-900 dark:text-white">Lord Cedric D. Ramos</h3>
            
            <a
              href="https://github.com/cdrcrmss"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-zinc-800 hover:bg-zinc-900 dark:bg-white dark:hover:bg-zinc-200 dark:text-black text-white font-semibold px-8 py-4 rounded-lg transition-colors text-lg mb-4"
            >
              View GitHub Profile
            </a>

            <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-4">
              github.com/cdrcrmss
            </p>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4 text-blue-600 dark:text-blue-400">Repository Structure</h2>
          <div className="bg-zinc-100 dark:bg-zinc-900 p-6 rounded-lg border border-zinc-300 dark:border-zinc-800">
            <pre className="text-sm text-zinc-700 dark:text-zinc-300 overflow-x-auto">
{`digital-twin-workshop/
├── digital-twin-mcp/           # Main RAG system
│   ├── src/
│   │   ├── app/                # Next.js app directory
│   │   │   ├── api/mcp/        # MCP endpoint
│   │   │   ├── about/          # Documentation pages
│   │   │   ├── github/
│   │   │   ├── testing/
│   │   │   └── profile-data/
│   │   ├── components/         # React components
│   │   └── lib/                # RAG logic & utilities
│   ├── .env.local              # Environment variables
│   └── package.json
│
├── digitaltwin.json            # Professional profile data
├── embed_digitaltwin.py        # Vector embedding script
├── check_vectors.py            # Vector verification
└── requirements.txt            # Python dependencies`}
            </pre>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4 text-blue-600 dark:text-blue-400">Key Files</h2>
          <div className="space-y-4">
            <div className="bg-zinc-100 dark:bg-zinc-900 p-4 rounded-lg border border-zinc-300 dark:border-zinc-800">
              <h3 className="font-semibold mb-2 text-zinc-900 dark:text-white">digitaltwin.json</h3>
              <p className="text-sm text-zinc-700 dark:text-zinc-300">
                Professional profile data structured with 16 content chunks covering skills, projects, 
                education, and interview preparation.
              </p>
            </div>

            <div className="bg-zinc-100 dark:bg-zinc-900 p-4 rounded-lg border border-zinc-300 dark:border-zinc-800">
              <h3 className="font-semibold mb-2 text-zinc-900 dark:text-white">embed_digitaltwin.py</h3>
              <p className="text-sm text-zinc-700 dark:text-zinc-300">
                Python script that uploads professional content to Upstash Vector database 
                using sentence-transformers embeddings.
              </p>
            </div>

            <div className="bg-zinc-100 dark:bg-zinc-900 p-4 rounded-lg border border-zinc-300 dark:border-zinc-800">
              <h3 className="font-semibold mb-2 text-zinc-900 dark:text-white">src/lib/llm-enhanced-rag.ts</h3>
              <p className="text-sm text-zinc-700 dark:text-zinc-300">
                Core RAG implementation with query enhancement and response formatting 
                using Groq/Ollama LLMs.
              </p>
            </div>

            <div className="bg-zinc-100 dark:bg-zinc-900 p-4 rounded-lg border border-zinc-300 dark:border-zinc-800">
              <h3 className="font-semibold mb-2 text-zinc-900 dark:text-white">src/app/api/mcp/route.ts</h3>
              <p className="text-sm text-zinc-700 dark:text-zinc-300">
                MCP server endpoint with CORS support for AI agent integration.
              </p>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4 text-blue-600 dark:text-blue-400">Technologies Used</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {[
              'Next.js 16',
              'TypeScript',
              'React 19',
              'Upstash Vector',
              'Groq API',
              'Ollama',
              'Tailwind CSS',
              'ShadCN UI',
              'Python',
              'sentence-transformers',
              'Vercel',
              'MCP Protocol'
            ].map((tech) => (
              <div
                key={tech}
                className="bg-blue-100 dark:bg-blue-900/30 px-4 py-2 rounded text-center text-sm font-medium text-blue-800 dark:text-blue-300"
              >
                {tech}
              </div>
            ))}
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4 text-blue-600 dark:text-blue-400">Contact & Links</h2>
          <div className="bg-zinc-100 dark:bg-zinc-900 p-6 rounded-lg border border-zinc-300 dark:border-zinc-800">
            <ul className="space-y-3 text-zinc-700 dark:text-zinc-300">
              <li className="flex items-center gap-3">
                <span className="font-semibold w-24">GitHub:</span>
                <a href="https://github.com/cdrcrmss" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">
                  github.com/cdrcrmss
                </a>
              </li>
              <li className="flex items-center gap-3">
                <span className="font-semibold w-24">LinkedIn:</span>
                <a href="https://www.linkedin.com/in/cedric-ramos-548971286/" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">
                  linkedin.com/in/cedric-ramos-548971286
                </a>
              </li>
              <li className="flex items-center gap-3">
                <span className="font-semibold w-24">Portfolio:</span>
                <a href="https://week2-ai-cv-website.vercel.app/" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">
                  week2-ai-cv-website.vercel.app
                </a>
              </li>
            </ul>
          </div>
        </section>

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
