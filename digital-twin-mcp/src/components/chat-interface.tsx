'use client';

import { useState, FormEvent } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  metadata?: any;
}

const INTERVIEW_TYPES = [
  { value: '', label: 'General Q&A' },
  { value: 'technical', label: '💻 Technical Interview' },
  { value: 'behavioral', label: '🗣️ Behavioral Interview' },
  { value: 'screening', label: '📞 HR Screening' },
  { value: 'hiring_manager', label: '👔 Hiring Manager' },
  { value: 'executive', label: '🎯 Executive Interview' },
];

const SAMPLE_QUESTIONS = [
  "Tell me about your work experience",
  "What are your key technical skills?",
  "Describe a challenging project you worked on",
  "What are your salary expectations?",
  "Why should we hire you?",
];

export function ChatInterface() {
  const [question, setQuestion] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [conversation, setConversation] = useState<Message[]>([]);
  const [enhanced, setEnhanced] = useState(true);
  const [interviewType, setInterviewType] = useState('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!question.trim()) return;

    setIsLoading(true);
    setConversation(prev => [...prev, { role: 'user', content: question }]);
    
    try {
      const response = await fetch('/api/mcp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          question,
          enhanced,
          interviewType: interviewType || undefined,
        }),
      });

      const data = await response.json();
      setConversation(prev => [...prev, { 
        role: 'assistant', 
        content: data.answer,
        metadata: data.metadata,
      }]);
    } catch (error) {
      console.error('Error:', error);
      setConversation(prev => [...prev, { 
        role: 'assistant', 
        content: 'Sorry, there was an error processing your request.' 
      }]);
    } finally {
      setIsLoading(false);
      setQuestion('');
    }
  };

  const handleSampleQuestion = (q: string) => {
    setQuestion(q);
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">🤖 Digital Twin Assistant</CardTitle>
        <CardDescription>
          AI-powered interview preparation with LLM-enhanced RAG
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Settings */}
          <div className="flex flex-wrap gap-3 p-3 bg-muted/30 rounded-lg">
            <div className="flex items-center gap-2">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={enhanced}
                  onChange={(e) => setEnhanced(e.target.checked)}
                  className="w-4 h-4"
                />
                <span className="text-sm font-medium">
                  ✨ Enhanced Mode (LLM-powered)
                </span>
              </label>
            </div>
            
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">Interview Type:</span>
              <select
                value={interviewType}
                onChange={(e) => setInterviewType(e.target.value)}
                className="px-3 py-1 text-sm border rounded-md bg-background"
              >
                {INTERVIEW_TYPES.map(type => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Sample Questions */}
          {conversation.length === 0 && (
            <div className="space-y-2">
              <p className="text-sm font-medium text-muted-foreground">Try these questions:</p>
              <div className="flex flex-wrap gap-2">
                {SAMPLE_QUESTIONS.map((q, i) => (
                  <button
                    key={i}
                    onClick={() => handleSampleQuestion(q)}
                    className="px-3 py-1 text-sm bg-secondary hover:bg-secondary/80 rounded-full transition-colors"
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>
          )}
          
          {/* Conversation */}
          <div className="space-y-4 h-96 overflow-y-auto p-4 bg-muted/50 rounded-lg mb-4">
            {conversation.length === 0 ? (
              <div className="text-muted-foreground text-center py-12">
                <p className="text-lg font-medium mb-2">Ask me anything!</p>
                <p className="text-sm">I can help with interview preparation, answering questions about experience, skills, projects, and career goals.</p>
              </div>
            ) : (
              conversation.map((msg, index) => (
                <div key={index}>
                  <div 
                    className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div 
                      className={`max-w-[85%] rounded-lg px-4 py-3 ${
                        msg.role === 'user' 
                          ? 'bg-primary text-primary-foreground' 
                          : 'bg-secondary text-secondary-foreground'
                      }`}
                    >
                      <p className="whitespace-pre-line">{msg.content}</p>
                    </div>
                  </div>
                  
                  {/* Performance metrics */}
                  {msg.metadata?.performance && (
                    <div className="flex justify-start mt-1">
                      <div className="text-xs text-muted-foreground px-4">
                        ⚡ {msg.metadata.performance.total}ms
                        {enhanced && ` (enhanced: ${msg.metadata.performance.queryEnhancement}ms + search: ${msg.metadata.performance.vectorSearch}ms + format: ${msg.metadata.performance.responseFormatting}ms)`}
                      </div>
                    </div>
                  )}
                </div>
              ))
            )}
            {isLoading && (
              <div className="flex justify-start">
                <div className="max-w-[80%] rounded-lg px-4 py-3 bg-secondary text-secondary-foreground">
                  <div className="flex space-x-2">
                    <div className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce" style={{ animationDelay: '0ms' }} />
                    <div className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce" style={{ animationDelay: '150ms' }} />
                    <div className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              </div>
            )}
          </div>
          
          <form onSubmit={handleSubmit} className="flex space-x-2">
            <Input
              value={question}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setQuestion(e.target.value)}
              placeholder={`Ask a ${interviewType ? INTERVIEW_TYPES.find(t => t.value === interviewType)?.label : 'question'}...`}
              disabled={isLoading}
              className="flex-1"
            />
            <Button type="submit" disabled={isLoading || !question.trim()}>
              {isLoading ? 'Thinking...' : 'Ask'}
            </Button>
          </form>
          
          {enhanced && (
            <p className="text-xs text-muted-foreground text-center">
              🎯 Enhanced mode uses LLM for query improvement and STAR-format responses
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
