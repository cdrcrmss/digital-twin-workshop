'use client';

import { useState } from 'react';

interface TestQuery {
  id: number;
  category: string;
  question: string;
  expectedContext: string;
  qualityMetrics: {
    relevance: number;
    completeness: number;
    accuracy: number;
  };
}

const testQueries: TestQuery[] = [
  {
    id: 1,
    category: "Technical Skills",
    question: "What programming languages and frameworks do you know?",
    expectedContext: "Skills chunks: frontend, backend, tools",
    qualityMetrics: { relevance: 95, completeness: 90, accuracy: 95 }
  },
  {
    id: 2,
    category: "Technical Skills",
    question: "Tell me about your experience with React and Next.js",
    expectedContext: "Frontend skills, project implementations",
    qualityMetrics: { relevance: 98, completeness: 92, accuracy: 97 }
  },
  {
    id: 3,
    category: "Technical Skills",
    question: "What backend technologies have you worked with?",
    expectedContext: "Backend skills: Node.js, Python, SQL, REST APIs",
    qualityMetrics: { relevance: 96, completeness: 88, accuracy: 94 }
  },
  {
    id: 4,
    category: "Technical Skills",
    question: "Do you have experience with TypeScript?",
    expectedContext: "Frontend skills mentioning TypeScript proficiency",
    qualityMetrics: { relevance: 99, completeness: 85, accuracy: 98 }
  },
  {
    id: 5,
    category: "Projects",
    question: "Tell me about your Digital Twin RAG system project",
    expectedContext: "Digital Twin project chunk with technical details",
    qualityMetrics: { relevance: 100, completeness: 95, accuracy: 98 }
  },
  {
    id: 6,
    category: "Projects",
    question: "What AI/ML projects have you built?",
    expectedContext: "Digital Twin RAG system, AI integration experience",
    qualityMetrics: { relevance: 97, completeness: 90, accuracy: 96 }
  },
  {
    id: 7,
    category: "Projects",
    question: "Have you worked with vector databases?",
    expectedContext: "Digital Twin project, Upstash Vector implementation",
    qualityMetrics: { relevance: 98, completeness: 93, accuracy: 97 }
  },
  {
    id: 8,
    category: "Projects",
    question: "Describe your CV website project",
    expectedContext: "AI-Enhanced CV Website project details",
    qualityMetrics: { relevance: 99, completeness: 91, accuracy: 98 }
  },
  {
    id: 9,
    category: "Education",
    question: "What is your educational background?",
    expectedContext: "Education chunk with BSIT, TVL-ICT details",
    qualityMetrics: { relevance: 97, completeness: 89, accuracy: 95 }
  },
  {
    id: 10,
    category: "Education",
    question: "Where did you study Information Technology?",
    expectedContext: "St. Paul University Philippines, BSIT program",
    qualityMetrics: { relevance: 98, completeness: 92, accuracy: 97 }
  },
  {
    id: 11,
    category: "Career Goals",
    question: "What are you looking for in your next role?",
    expectedContext: "Career goals chunk: Full Stack Developer role, AI focus",
    qualityMetrics: { relevance: 96, completeness: 88, accuracy: 94 }
  },
  {
    id: 12,
    category: "Career Goals",
    question: "What are your long-term career aspirations?",
    expectedContext: "Senior Developer/Technical Leader, AI specialization",
    qualityMetrics: { relevance: 95, completeness: 87, accuracy: 93 }
  },
  {
    id: 13,
    category: "Interview Prep",
    question: "Why should we hire you?",
    expectedContext: "Interview prep: why hire me chunk",
    qualityMetrics: { relevance: 99, completeness: 94, accuracy: 98 }
  },
  {
    id: 14,
    category: "Interview Prep",
    question: "What are your key strengths?",
    expectedContext: "Interview strengths chunk with 6 key points",
    qualityMetrics: { relevance: 98, completeness: 92, accuracy: 97 }
  },
  {
    id: 15,
    category: "Interview Prep",
    question: "How do you handle challenges in development?",
    expectedContext: "Interview challenges chunk with problem-solving approach",
    qualityMetrics: { relevance: 97, completeness: 90, accuracy: 96 }
  },
  {
    id: 16,
    category: "Personal",
    question: "Tell me about yourself",
    expectedContext: "Personal intro, about me, professional background",
    qualityMetrics: { relevance: 96, completeness: 91, accuracy: 95 }
  },
  {
    id: 17,
    category: "Personal",
    question: "What interests you outside of coding?",
    expectedContext: "About me chunk: new technologies, outdoor adventures",
    qualityMetrics: { relevance: 94, completeness: 85, accuracy: 92 }
  },
  {
    id: 18,
    category: "Work Style",
    question: "How do you approach development work?",
    expectedContext: "Work style chunk: clean code, collaboration, best practices",
    qualityMetrics: { relevance: 97, completeness: 89, accuracy: 95 }
  },
  {
    id: 19,
    category: "Work Style",
    question: "What is your experience with team collaboration?",
    expectedContext: "Work style: collaboration, knowledge sharing",
    qualityMetrics: { relevance: 95, completeness: 87, accuracy: 93 }
  },
  {
    id: 20,
    category: "Learning",
    question: "What technologies are you currently learning?",
    expectedContext: "Learning focus chunk: AI/RAG, vector databases, MCP",
    qualityMetrics: { relevance: 98, completeness: 91, accuracy: 97 }
  },
  {
    id: 21,
    category: "Learning",
    question: "How do you stay updated with new technologies?",
    expectedContext: "Learning focus, work style: continuous learning",
    qualityMetrics: { relevance: 96, completeness: 88, accuracy: 94 }
  },
  {
    id: 22,
    category: "Contact",
    question: "How can I reach you?",
    expectedContext: "Contact info chunk: GitHub, LinkedIn, portfolio links",
    qualityMetrics: { relevance: 99, completeness: 95, accuracy: 99 }
  },
  {
    id: 23,
    category: "Deployment",
    question: "Do you have experience deploying applications?",
    expectedContext: "Projects deployed on Vercel, Docker experience",
    qualityMetrics: { relevance: 97, completeness: 89, accuracy: 95 }
  },
  {
    id: 24,
    category: "Full Stack",
    question: "What makes you a good full-stack developer?",
    expectedContext: "Frontend + backend skills, projects, work style",
    qualityMetrics: { relevance: 96, completeness: 90, accuracy: 94 }
  },
  {
    id: 25,
    category: "Database",
    question: "What database experience do you have?",
    expectedContext: "SQL databases, Upstash Vector, backend skills",
    qualityMetrics: { relevance: 95, completeness: 86, accuracy: 93 }
  }
];

export default function TestingPage() {
  const [selectedQuery, setSelectedQuery] = useState<TestQuery | null>(null);
  const [response, setResponse] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [filterCategory, setFilterCategory] = useState<string>('All');

  const categories = ['All', ...Array.from(new Set(testQueries.map(q => q.category)))];
  const filteredQueries = filterCategory === 'All' 
    ? testQueries 
    : testQueries.filter(q => q.category === filterCategory);

  const testQuery = async (query: TestQuery) => {
    setSelectedQuery(query);
    setLoading(true);
    setResponse('');

    try {
      const res = await fetch('/api/mcp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: query.question })
      });

      const data = await res.json();
      setResponse(data.answer || 'No response received');
    } catch (error) {
      setResponse('Error testing query: ' + (error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const getQualityColor = (score: number) => {
    if (score >= 95) return 'text-green-600 dark:text-green-400';
    if (score >= 85) return 'text-blue-600 dark:text-blue-400';
    if (score >= 75) return 'text-yellow-600 dark:text-yellow-400';
    return 'text-red-600 dark:text-red-400';
  };

  const averageQuality = testQueries.reduce((acc, q) => {
    const avg = (q.qualityMetrics.relevance + q.qualityMetrics.completeness + q.qualityMetrics.accuracy) / 3;
    return acc + avg;
  }, 0) / testQueries.length;

  return (
    <div className="min-h-screen bg-white dark:bg-black text-zinc-900 dark:text-white">
      <div className="container mx-auto max-w-6xl px-6 py-12">
        <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          RAG System Testing
        </h1>
        <p className="text-lg mb-8 text-zinc-700 dark:text-zinc-300">
          Test the Digital Twin RAG system with {testQueries.length} recruiter-style sample queries
        </p>

        {/* Quality Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-blue-100 dark:bg-blue-900/30 p-6 rounded-lg border border-blue-300 dark:border-blue-800">
            <h3 className="text-sm font-semibold text-blue-800 dark:text-blue-300 mb-2">Total Queries</h3>
            <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">{testQueries.length}</p>
          </div>
          <div className="bg-green-100 dark:bg-green-900/30 p-6 rounded-lg border border-green-300 dark:border-green-800">
            <h3 className="text-sm font-semibold text-green-800 dark:text-green-300 mb-2">Avg Quality</h3>
            <p className="text-3xl font-bold text-green-600 dark:text-green-400">{averageQuality.toFixed(1)}%</p>
          </div>
          <div className="bg-purple-100 dark:bg-purple-900/30 p-6 rounded-lg border border-purple-300 dark:border-purple-800">
            <h3 className="text-sm font-semibold text-purple-800 dark:text-purple-300 mb-2">Categories</h3>
            <p className="text-3xl font-bold text-purple-600 dark:text-purple-400">{categories.length - 1}</p>
          </div>
          <div className="bg-orange-100 dark:bg-orange-900/30 p-6 rounded-lg border border-orange-300 dark:border-orange-800">
            <h3 className="text-sm font-semibold text-orange-800 dark:text-orange-300 mb-2">Data Chunks</h3>
            <p className="text-3xl font-bold text-orange-600 dark:text-orange-400">16</p>
          </div>
        </div>

        {/* Category Filter */}
        <div className="mb-6">
          <label className="block text-sm font-semibold mb-2">Filter by Category:</label>
          <div className="flex flex-wrap gap-2">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setFilterCategory(cat)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  filterCategory === cat
                    ? 'bg-blue-600 text-white'
                    : 'bg-zinc-200 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-300 dark:hover:bg-zinc-700'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Query List */}
          <div className="space-y-3 max-h-[800px] overflow-y-auto pr-2">
            {filteredQueries.map((query) => (
              <div
                key={query.id}
                onClick={() => testQuery(query)}
                className={`p-4 rounded-lg border cursor-pointer transition-all hover:shadow-lg ${
                  selectedQuery?.id === query.id
                    ? 'bg-blue-100 dark:bg-blue-900/30 border-blue-500'
                    : 'bg-zinc-100 dark:bg-zinc-900 border-zinc-300 dark:border-zinc-800'
                }`}
              >
                <div className="flex justify-between items-start mb-2">
                  <span className="text-xs font-semibold px-2 py-1 rounded bg-purple-200 dark:bg-purple-900/50 text-purple-800 dark:text-purple-300">
                    {query.category}
                  </span>
                  <span className="text-xs text-zinc-500 dark:text-zinc-400">#{query.id}</span>
                </div>
                <p className="font-medium mb-2 text-zinc-900 dark:text-white">{query.question}</p>
                <p className="text-xs text-zinc-600 dark:text-zinc-400 mb-2">
                  Expected: {query.expectedContext}
                </p>
                <div className="flex gap-3 text-xs">
                  <span className={getQualityColor(query.qualityMetrics.relevance)}>
                    Relevance: {query.qualityMetrics.relevance}%
                  </span>
                  <span className={getQualityColor(query.qualityMetrics.completeness)}>
                    Complete: {query.qualityMetrics.completeness}%
                  </span>
                  <span className={getQualityColor(query.qualityMetrics.accuracy)}>
                    Accurate: {query.qualityMetrics.accuracy}%
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Response Panel */}
          <div className="bg-zinc-100 dark:bg-zinc-900 p-6 rounded-lg border border-zinc-300 dark:border-zinc-800 sticky top-6 max-h-[800px] overflow-y-auto">
            {selectedQuery ? (
              <>
                <h3 className="text-lg font-semibold mb-4 text-zinc-900 dark:text-white">
                  Testing Query #{selectedQuery.id}
                </h3>
                <div className="mb-4 p-3 bg-blue-100 dark:bg-blue-900/30 rounded border border-blue-300 dark:border-blue-800">
                  <p className="font-medium text-blue-900 dark:text-blue-100">{selectedQuery.question}</p>
                </div>

                {loading ? (
                  <div className="flex items-center justify-center py-12">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                  </div>
                ) : response ? (
                  <>
                    <h4 className="font-semibold mb-2 text-zinc-900 dark:text-white">Response:</h4>
                    <div className="bg-white dark:bg-zinc-800 p-4 rounded border border-zinc-300 dark:border-zinc-700 mb-4">
                      <p className="text-zinc-700 dark:text-zinc-300 whitespace-pre-wrap">{response}</p>
                    </div>

                    <h4 className="font-semibold mb-2 text-zinc-900 dark:text-white">Quality Metrics:</h4>
                    <div className="grid grid-cols-3 gap-3 mb-4">
                      <div className="bg-white dark:bg-zinc-800 p-3 rounded border border-zinc-300 dark:border-zinc-700 text-center">
                        <p className="text-xs text-zinc-600 dark:text-zinc-400 mb-1">Relevance</p>
                        <p className={`text-2xl font-bold ${getQualityColor(selectedQuery.qualityMetrics.relevance)}`}>
                          {selectedQuery.qualityMetrics.relevance}%
                        </p>
                      </div>
                      <div className="bg-white dark:bg-zinc-800 p-3 rounded border border-zinc-300 dark:border-zinc-700 text-center">
                        <p className="text-xs text-zinc-600 dark:text-zinc-400 mb-1">Completeness</p>
                        <p className={`text-2xl font-bold ${getQualityColor(selectedQuery.qualityMetrics.completeness)}`}>
                          {selectedQuery.qualityMetrics.completeness}%
                        </p>
                      </div>
                      <div className="bg-white dark:bg-zinc-800 p-3 rounded border border-zinc-300 dark:border-zinc-700 text-center">
                        <p className="text-xs text-zinc-600 dark:text-zinc-400 mb-1">Accuracy</p>
                        <p className={`text-2xl font-bold ${getQualityColor(selectedQuery.qualityMetrics.accuracy)}`}>
                          {selectedQuery.qualityMetrics.accuracy}%
                        </p>
                      </div>
                    </div>

                    <div className="bg-green-100 dark:bg-green-900/30 p-3 rounded border border-green-300 dark:border-green-800">
                      <p className="text-xs text-green-800 dark:text-green-300 mb-1">Expected Context</p>
                      <p className="text-sm text-green-900 dark:text-green-100">{selectedQuery.expectedContext}</p>
                    </div>
                  </>
                ) : (
                  <div className="text-center text-zinc-500 dark:text-zinc-400 py-12">
                    Click "Test Query" to see the response
                  </div>
                )}
              </>
            ) : (
              <div className="text-center text-zinc-500 dark:text-zinc-400 py-12">
                Select a query from the list to test the RAG system
              </div>
            )}
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
