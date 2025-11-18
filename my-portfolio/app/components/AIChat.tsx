'use client';

import { useState, FormEvent, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Loader2, Download, Trash2 } from 'lucide-react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp?: Date;
}

interface ParsedMessage extends Omit<Message, 'timestamp'> {
  timestamp?: string;
}

export function AIChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Load conversation history from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('ai-chat-history');
    if (saved) {
      try {
        const parsed: ParsedMessage[] = JSON.parse(saved);
        setMessages(parsed.map((msg) => ({
          ...msg,
          timestamp: msg.timestamp ? new Date(msg.timestamp) : undefined,
        })));
      } catch (error) {
        console.error('Failed to load chat history:', error);
      }
    }
  }, []);

  // Save conversation history to localStorage whenever messages change
  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem('ai-chat-history', JSON.stringify(messages));
    }
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const clearChat = () => {
    if (confirm('Are you sure you want to clear the conversation history?')) {
      setMessages([]);
      localStorage.removeItem('ai-chat-history');
    }
  };

  const exportChat = () => {
    const chatText = messages
      .map((msg) => {
        const time = msg.timestamp ? new Date(msg.timestamp).toLocaleString() : '';
        return `[${msg.role.toUpperCase()}] ${time}\n${msg.content}\n`;
      })
      .join('\n---\n\n');

    const blob = new Blob([chatText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `cedric-ai-chat-${Date.now()}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { 
      role: 'user', 
      content: userMessage,
      timestamp: new Date(),
    }]);
    setIsLoading(true);

    try {
      // Connect to the portfolio's API route
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          question: userMessage,
        }),
      });

      if (!response.ok) {
        throw new Error(`Server error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      
      // Check if we got an error response
      if (data.error || data.detail) {
        throw new Error(data.error || data.detail || 'Server returned an error');
      }
      
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: data.answer || 'Sorry, I couldn\'t generate a response.',
        timestamp: new Date(),
      }]);
    } catch (error) {
      console.error('Error:', error);
      
      // Provide specific, helpful error messages
      let errorMessage = "Sorry, I'm having trouble right now.";
      
      if (error instanceof TypeError && error.message.includes('fetch')) {
        errorMessage = "I'm having trouble connecting. Please check your internet connection and try again.";
      } else if (error instanceof Error) {
        if (error.message.includes('404') || error.message.includes('Not Found')) {
          errorMessage = "The AI service is temporarily unavailable. Please try again in a few moments.";
        } else if (error.message.includes('500')) {
          errorMessage = "I'm experiencing technical difficulties. Please try again shortly.";
        } else {
          errorMessage = "Something went wrong. Please try rephrasing your question.";
        }
      }
      
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: errorMessage,
        timestamp: new Date(),
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Chat Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white p-4 rounded-full shadow-2xl transition-all duration-300 hover:scale-110 group"
        aria-label="Toggle AI Chat"
      >
        {isOpen ? (
          <X className="w-6 h-6" />
        ) : (
          <MessageCircle className="w-6 h-6 animate-pulse" />
        )}
        <span className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-ping"></span>
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="ai-chat-window fixed bottom-24 right-6 z-50 w-96 h-[600px] rounded-2xl shadow-2xl flex flex-col overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-4 text-white">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                  <MessageCircle className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold">AI Assistant</h3>
                  <p className="text-xs opacity-90">Ask me anything about Cedric!</p>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="hover:bg-white/20 p-1 rounded-lg transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            {messages.length > 0 && (
              <div className="flex gap-2 mt-2">
                <button
                  onClick={exportChat}
                  className="flex items-center gap-1 text-xs bg-white/20 hover:bg-white/30 px-3 py-1 rounded-lg transition"
                  title="Export conversation"
                >
                  <Download className="w-3 h-3" />
                  Export
                </button>
                <button
                  onClick={clearChat}
                  className="flex items-center gap-1 text-xs bg-white/20 hover:bg-white/30 px-3 py-1 rounded-lg transition"
                  title="Clear conversation"
                >
                  <Trash2 className="w-3 h-3" />
                  Clear
                </button>
              </div>
            )}
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.length === 0 ? (
              <div className="ai-chat-empty text-center py-12">
                <MessageCircle className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p className="ai-chat-text text-sm">Hi! I'm Cedric, and this is my AI assistant.</p>
                <p className="ai-chat-subtext text-xs mt-2">Feel free to ask me about my skills, projects, or experience!</p>
                <div className="mt-6 space-y-2">
                  <button
                    onClick={() => setInput("What are your main technical skills?")}
                    className="ai-chat-suggestion block w-full text-left px-4 py-2 rounded-lg text-sm transition"
                  >
                    What are your main technical skills?
                  </button>
                  <button
                    onClick={() => setInput("Tell me about your recent projects")}
                    className="ai-chat-suggestion block w-full text-left px-4 py-2 rounded-lg text-sm transition"
                  >
                    Tell me about your recent projects
                  </button>
                  <button
                    onClick={() => setInput("What makes you passionate about development?")}
                    className="ai-chat-suggestion block w-full text-left px-4 py-2 rounded-lg text-sm transition"
                  >
                    What drives your passion for coding?
                  </button>
                </div>
              </div>
            ) : (
              messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div
                    className={`max-w-[85%] rounded-2xl px-4 py-2 ${
                      msg.role === 'user'
                        ? 'ai-chat-bubble-user bg-gradient-to-r from-blue-500 to-purple-600 text-white'
                        : 'ai-chat-bubble-assistant'
                    }`}
                  >
                    <div className="text-sm whitespace-pre-line leading-relaxed">{msg.content}</div>
                  </div>
                </div>
              ))
            )}
            {isLoading && (
              <div className="flex justify-start">
                <div className="ai-chat-loading rounded-2xl px-4 py-3">
                  <Loader2 className="w-5 h-5 animate-spin text-purple-500" />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <form onSubmit={handleSubmit} className="ai-chat-input-form p-4">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask me anything..."
                disabled={isLoading}
                className="ai-chat-input flex-1 px-4 py-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 disabled:opacity-50"
              />
              <button
                type="submit"
                disabled={isLoading || !input.trim()}
                className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white p-2 rounded-xl transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
}
