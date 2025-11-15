'use client';

import Image from "next/image";
import { ChatInterface } from '@/components/chat-interface';
import { ThemeProvider } from 'next-themes';

export default function Home() {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
        <main className="min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
          <div className="container mx-auto max-w-6xl">
            <div className="flex flex-col items-center justify-center min-h-[80vh]">
              <div className="w-full max-w-4xl">
                <h1 className="text-3xl md:text-4xl font-bold text-center mb-8 bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                  Digital Twin MCP Server
                </h1>
                <p className="text-center text-muted-foreground mb-8 max-w-2xl mx-auto">
                  Interact with your professional digital twin. Ask about experience, skills, projects, or any other professional details.
                </p>
                <ChatInterface />
              </div>
            </div>
            
            <footer className="mt-16 text-center">
              <div className="mb-6">
                <nav className="flex justify-center gap-4 flex-wrap">
                  <a 
                    href="/about"
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors font-medium"
                  >
                    📖 About
                  </a>
                  <a 
                    href="/testing"
                    className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors font-medium"
                  >
                    🧪 Testing
                  </a>
                  <a 
                    href="/profile-data"
                    className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors font-medium"
                  >
                    📊 Profile Data
                  </a>
                  <a 
                    href="/github"
                    className="px-4 py-2 bg-zinc-800 hover:bg-zinc-900 dark:bg-white dark:hover:bg-zinc-200 dark:text-black text-white rounded-lg transition-colors font-medium"
                  >
                    💻 GitHub
                  </a>
                </nav>
              </div>
              <p className="text-sm text-muted-foreground">Powered by Next.js, Upstash Vector, and Groq</p>
              <p className="mt-1 text-sm text-muted-foreground">Your data remains private and secure</p>
            </footer>
          </div>
        </main>
      </div>
    </ThemeProvider>
  );
}
