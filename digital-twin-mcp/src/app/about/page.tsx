export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-black text-zinc-900 dark:text-white">
      <div className="container mx-auto max-w-4xl px-6 py-12">
        <h1 className="text-4xl font-bold mb-8 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          About the Digital Twin RAG System
        </h1>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4 text-blue-600 dark:text-blue-400">System Architecture</h2>
          <p className="text-lg mb-4 text-zinc-700 dark:text-zinc-300">
            This Digital Twin RAG (Retrieval-Augmented Generation) system is designed to provide accurate, 
            context-aware responses about my professional background to recruiters and potential employers.
          </p>
          <div className="bg-zinc-100 dark:bg-zinc-900 p-6 rounded-lg border border-zinc-300 dark:border-zinc-800">
            <h3 className="font-semibold mb-3 text-lg">Core Components:</h3>
            <ul className="space-y-2 text-zinc-700 dark:text-zinc-300">
              <li>• <strong>Vector Database:</strong> Upstash Vector for semantic search and similarity matching</li>
              <li>• <strong>Embedding Model:</strong> sentence-transformers/all-MiniLM-L6-v2 (384 dimensions)</li>
              <li>• <strong>LLM Provider:</strong> Groq API with LLaMA 3.3 70B model for fast inference</li>
              <li>• <strong>Alternative LLM:</strong> Ollama (llama3.2) for local deployment option</li>
              <li>• <strong>Protocol:</strong> Model Context Protocol (MCP) for AI agent integration</li>
              <li>• <strong>Frontend:</strong> Next.js 16 with TypeScript and React 19</li>
            </ul>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4 text-blue-600 dark:text-blue-400">RAG Implementation</h2>
          <div className="space-y-4 text-zinc-700 dark:text-zinc-300">
            <div className="bg-zinc-100 dark:bg-zinc-900 p-6 rounded-lg border border-zinc-300 dark:border-zinc-800">
              <h3 className="font-semibold mb-2 text-lg text-zinc-900 dark:text-white">1. Query Enhancement</h3>
              <p>User queries are enhanced using LLM to expand context and improve semantic search accuracy.</p>
              <code className="block mt-2 bg-zinc-200 dark:bg-zinc-800 p-3 rounded text-sm">
                Enhanced Query → Vector Embedding → Semantic Search
              </code>
            </div>

            <div className="bg-zinc-100 dark:bg-zinc-900 p-6 rounded-lg border border-zinc-300 dark:border-zinc-800">
              <h3 className="font-semibold mb-2 text-lg text-zinc-900 dark:text-white">2. Vector Search</h3>
              <p>Upstash Vector performs similarity search across 16 professional profile chunks, returning top-3 most relevant results.</p>
              <code className="block mt-2 bg-zinc-200 dark:bg-zinc-800 p-3 rounded text-sm">
                topK: 3 | includeMetadata: true | Cosine Similarity
              </code>
            </div>

            <div className="bg-zinc-100 dark:bg-zinc-900 p-6 rounded-lg border border-zinc-300 dark:border-zinc-800">
              <h3 className="font-semibold mb-2 text-lg text-zinc-900 dark:text-white">3. Response Generation</h3>
              <p>Retrieved context is formatted for interview-style responses using LLM post-processing for natural, professional answers.</p>
              <code className="block mt-2 bg-zinc-200 dark:bg-zinc-800 p-3 rounded text-sm">
                Context + Query → LLM Formatting → Professional Response
              </code>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4 text-blue-600 dark:text-blue-400">Upstash Vector Configuration</h2>
          <div className="bg-zinc-100 dark:bg-zinc-900 p-6 rounded-lg border border-zinc-300 dark:border-zinc-800">
            <ul className="space-y-2 text-zinc-700 dark:text-zinc-300">
              <li>• <strong>Database:</strong> Upstash Vector (Free tier)</li>
              <li>• <strong>Region:</strong> US East 1</li>
              <li>• <strong>Embedding Model:</strong> sentence-transformers/all-MiniLM-L6-v2</li>
              <li>• <strong>Vector Dimensions:</strong> 384</li>
              <li>• <strong>Similarity Metric:</strong> Cosine Similarity</li>
              <li>• <strong>Total Vectors:</strong> 16 professional content chunks</li>
              <li>• <strong>Content Types:</strong> Introduction, Skills, Projects, Education, Career Goals, Interview Prep</li>
            </ul>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4 text-blue-600 dark:text-blue-400">LLM Integration</h2>
          <div className="space-y-4">
            <div className="bg-zinc-100 dark:bg-zinc-900 p-6 rounded-lg border border-zinc-300 dark:border-zinc-800">
              <h3 className="font-semibold mb-2 text-lg text-zinc-900 dark:text-white">Groq API (Primary)</h3>
              <ul className="space-y-2 text-zinc-700 dark:text-zinc-300">
                <li>• <strong>Model:</strong> llama-3.3-70b-versatile</li>
                <li>• <strong>Temperature:</strong> 0.3 (consistent responses)</li>
                <li>• <strong>Max Tokens:</strong> 1000</li>
                <li>• <strong>Latency:</strong> ~500ms average</li>
                <li>• <strong>Use Case:</strong> Query enhancement and response formatting</li>
              </ul>
            </div>

            <div className="bg-zinc-100 dark:bg-zinc-900 p-6 rounded-lg border border-zinc-300 dark:border-zinc-800">
              <h3 className="font-semibold mb-2 text-lg text-zinc-900 dark:text-white">Ollama (Alternative)</h3>
              <ul className="space-y-2 text-zinc-700 dark:text-zinc-300">
                <li>• <strong>Model:</strong> llama3.2</li>
                <li>• <strong>Deployment:</strong> Local (http://localhost:11434)</li>
                <li>• <strong>Configuration:</strong> USE_OLLAMA=true flag</li>
                <li>• <strong>Fallback:</strong> Automatic fallback to Groq if unavailable</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4 text-blue-600 dark:text-blue-400">Model Context Protocol (MCP)</h2>
          <div className="bg-zinc-100 dark:bg-zinc-900 p-6 rounded-lg border border-zinc-300 dark:border-zinc-800">
            <p className="mb-4 text-zinc-700 dark:text-zinc-300">
              The system implements MCP for integration with AI development tools like VS Code and Claude Desktop.
            </p>
            <ul className="space-y-2 text-zinc-700 dark:text-zinc-300">
              <li>• <strong>Endpoint:</strong> /api/mcp (POST)</li>
              <li>• <strong>CORS:</strong> Enabled for cross-origin requests</li>
              <li>• <strong>Health Check:</strong> /api/mcp (GET)</li>
              <li>• <strong>Request Format:</strong> JSON with query field</li>
              <li>• <strong>Response Format:</strong> JSON with answer and sources</li>
            </ul>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4 text-blue-600 dark:text-blue-400">Technical Stack</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-zinc-100 dark:bg-zinc-900 p-6 rounded-lg border border-zinc-300 dark:border-zinc-800">
              <h3 className="font-semibold mb-3 text-zinc-900 dark:text-white">Frontend</h3>
              <ul className="space-y-1 text-sm text-zinc-700 dark:text-zinc-300">
                <li>• Next.js 16.0.3</li>
                <li>• React 19.2.0</li>
                <li>• TypeScript 5</li>
                <li>• Tailwind CSS 4</li>
                <li>• ShadCN UI Components</li>
              </ul>
            </div>

            <div className="bg-zinc-100 dark:bg-zinc-900 p-6 rounded-lg border border-zinc-300 dark:border-zinc-800">
              <h3 className="font-semibold mb-3 text-zinc-900 dark:text-white">Backend/AI</h3>
              <ul className="space-y-1 text-sm text-zinc-700 dark:text-zinc-300">
                <li>• Upstash Vector SDK</li>
                <li>• Groq API Client</li>
                <li>• Ollama Integration</li>
                <li>• Python (embedding script)</li>
                <li>• Next.js API Routes</li>
              </ul>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 text-blue-600 dark:text-blue-400">Quality Optimization</h2>
          <div className="bg-zinc-100 dark:bg-zinc-900 p-6 rounded-lg border border-zinc-300 dark:border-zinc-800">
            <ul className="space-y-2 text-zinc-700 dark:text-zinc-300">
              <li>• <strong>Embedding Quality:</strong> Sentence transformers optimized for semantic similarity</li>
              <li>• <strong>Query Enhancement:</strong> LLM pre-processing expands context for better retrieval</li>
              <li>• <strong>Top-K Search:</strong> Returns 3 most relevant chunks to balance accuracy and context</li>
              <li>• <strong>Response Formatting:</strong> Interview-style post-processing for professional answers</li>
              <li>• <strong>Error Handling:</strong> Graceful fallbacks and error messages</li>
              <li>• <strong>CORS Support:</strong> Cross-origin requests for portfolio integration</li>
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
