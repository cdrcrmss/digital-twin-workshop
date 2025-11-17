'use client';

import Link from 'next/link';
import { ArrowLeft, Palette, Type, Layout, Eye, CheckCircle, Code } from 'lucide-react';

export default function ProfessionalPage() {
  const colorPalette = [
    { name: 'Purple Primary', hex: '#a855f7', usage: 'Primary brand color, CTAs, accents' },
    { name: 'Blue Primary', hex: '#3b82f6', usage: 'Secondary brand color, links, highlights' },
    { name: 'Purple Gradient', hex: 'linear-gradient(to right, #9333ea, #3b82f6)', usage: 'Headings, hero sections' },
    { name: 'Dark Background', hex: '#000000', usage: 'Default dark mode background' },
    { name: 'Light Background', hex: '#ffffff', usage: 'Light mode background' },
    { name: 'Zinc 900', hex: '#18181b', usage: 'Card backgrounds (dark mode)' },
    { name: 'Zinc 100', hex: '#f4f4f5', usage: 'Card backgrounds (light mode)' },
    { name: 'Zinc 400', hex: '#a1a1aa', usage: 'Secondary text, labels' }
  ];

  const typography = [
    {
      element: 'h1',
      style: 'text-5xl font-bold',
      example: 'Main Page Headings',
      usage: 'Primary page titles with gradient effect'
    },
    {
      element: 'h2',
      style: 'text-2xl font-bold',
      example: 'Section Headings',
      usage: 'Major section titles'
    },
    {
      element: 'h3',
      style: 'text-xl font-bold',
      example: 'Subsection Titles',
      usage: 'Card headers, feature titles'
    },
    {
      element: 'p',
      style: 'text-base',
      example: 'Body Text',
      usage: 'Paragraphs, descriptions'
    },
    {
      element: 'small',
      style: 'text-sm',
      example: 'Small Text',
      usage: 'Labels, metadata, captions'
    },
    {
      element: 'code',
      style: 'font-mono text-sm',
      example: 'Code Snippets',
      usage: 'Technical content, commands'
    }
  ];

  const components = [
    {
      name: 'Card',
      code: 'bg-zinc-900 light:bg-zinc-100 rounded-xl p-6 border border-zinc-800 light:border-zinc-300',
      preview: true
    },
    {
      name: 'Button Primary',
      code: 'bg-purple-600 hover:bg-purple-700 text-white font-semibold px-8 py-3 rounded-lg',
      preview: true
    },
    {
      name: 'Button Secondary',
      code: 'bg-zinc-800 light:bg-zinc-200 hover:bg-zinc-700 light:hover:bg-zinc-300 text-white light:text-black font-semibold px-8 py-3 rounded-lg',
      preview: true
    },
    {
      name: 'Badge',
      code: 'px-3 py-1 rounded-full bg-purple-900/30 text-purple-400 text-xs font-semibold',
      preview: true
    },
    {
      name: 'Gradient Heading',
      code: 'bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent',
      preview: true
    }
  ];

  const designPrinciples = [
    {
      icon: <Eye className="w-6 h-6" />,
      title: 'Visual Hierarchy',
      description: 'Clear content structure using size, color, and spacing to guide user attention',
      examples: [
        'Gradient headings draw attention to page titles',
        'Card borders create visual separation',
        'Consistent spacing (p-6, gap-6) creates rhythm'
      ]
    },
    {
      icon: <Palette className="w-6 h-6" />,
      title: 'Color Consistency',
      description: 'Purple and blue brand colors with semantic color usage across all pages',
      examples: [
        'Purple for primary actions and brand elements',
        'Blue for secondary actions and highlights',
        'Green for success states and metrics',
        'Red for errors and critical alerts'
      ]
    },
    {
      icon: <Type className="w-6 h-6" />,
      title: 'Typography Scale',
      description: 'Consistent font sizing and weights for readable hierarchy',
      examples: [
        '5xl for page titles (48px)',
        '2xl for section headings (24px)',
        'xl for subsections (20px)',
        'Base for body text (16px)'
      ]
    },
    {
      icon: <Layout className="w-6 h-6" />,
      title: 'Responsive Design',
      description: 'Mobile-first approach with grid layouts that adapt to screen size',
      examples: [
        'Grid cols-1 md:cols-2 lg:cols-3 patterns',
        'Flexible max-width containers (max-w-7xl)',
        'Touch-friendly button sizes (px-8 py-3)',
        'Readable line lengths (prose)'
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-black light:bg-white text-white light:text-gray-900">
      <div className="container mx-auto max-w-7xl px-6 py-12">
        <Link href="/demo" className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 mb-6">
          <ArrowLeft className="w-4 h-4" />
          Back to Demo
        </Link>

        <div className="mb-12">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            Professional Branding
          </h1>
          <p className="text-xl text-zinc-400 light:text-zinc-600">
            Design system and brand guidelines for portfolio consistency
          </p>
        </div>

        {/* Color Palette */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Color Palette</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {colorPalette.map((color, idx) => (
              <div key={idx} className="bg-zinc-900 light:bg-zinc-100 rounded-xl overflow-hidden border border-zinc-800 light:border-zinc-300">
                <div
                  className="h-32 w-full"
                  style={{ background: color.hex }}
                />
                <div className="p-4">
                  <div className="font-bold mb-1">{color.name}</div>
                  <div className="text-xs text-zinc-500 font-mono mb-2">{color.hex}</div>
                  <div className="text-sm text-zinc-400 light:text-zinc-600">{color.usage}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Typography System */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Typography System</h2>
          <div className="bg-zinc-900 light:bg-zinc-100 rounded-xl border border-zinc-800 light:border-zinc-300 overflow-hidden">
            <table className="w-full">
              <thead className="bg-zinc-800 light:bg-zinc-200">
                <tr>
                  <th className="text-left p-4 text-sm font-semibold">Element</th>
                  <th className="text-left p-4 text-sm font-semibold">Tailwind Classes</th>
                  <th className="text-left p-4 text-sm font-semibold">Example</th>
                  <th className="text-left p-4 text-sm font-semibold">Usage</th>
                </tr>
              </thead>
              <tbody>
                {typography.map((type, idx) => (
                  <tr key={idx} className="border-t border-zinc-800 light:border-zinc-300">
                    <td className="p-4">
                      <code className="text-xs text-purple-400 font-mono">&lt;{type.element}&gt;</code>
                    </td>
                    <td className="p-4">
                      <code className="text-xs text-green-400 font-mono">{type.style}</code>
                    </td>
                    <td className="p-4">
                      <span className={type.style}>{type.example}</span>
                    </td>
                    <td className="p-4 text-sm text-zinc-400 light:text-zinc-600">{type.usage}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Component Library */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Component Library</h2>
          <div className="space-y-4">
            {components.map((component, idx) => (
              <div key={idx} className="bg-zinc-900 light:bg-zinc-100 rounded-xl p-6 border border-zinc-800 light:border-zinc-300">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-bold mb-3">{component.name}</h3>
                    <div className="bg-black light:bg-white rounded p-4 border border-zinc-800 light:border-zinc-300 overflow-x-auto">
                      <code className="text-xs text-green-400 font-mono whitespace-pre-wrap">{component.code}</code>
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-zinc-500 mb-3">Preview</div>
                    <div className="flex items-center justify-center p-8 bg-black/20 light:bg-white/20 rounded-lg border border-zinc-800 light:border-zinc-300">
                      {component.name === 'Card' && (
                        <div className={component.code}>
                          <div className="text-sm font-semibold">Sample Card</div>
                          <div className="text-xs text-zinc-400 mt-1">Card component example</div>
                        </div>
                      )}
                      {component.name === 'Button Primary' && (
                        <button className={component.code}>Primary Button</button>
                      )}
                      {component.name === 'Button Secondary' && (
                        <button className={component.code}>Secondary Button</button>
                      )}
                      {component.name === 'Badge' && (
                        <span className={component.code}>BADGE</span>
                      )}
                      {component.name === 'Gradient Heading' && (
                        <h2 className={`text-3xl font-bold ${component.code}`}>Gradient Text</h2>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Design Principles */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Design Principles</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {designPrinciples.map((principle, idx) => (
              <div key={idx} className="bg-zinc-900 light:bg-zinc-100 rounded-xl p-6 border border-zinc-800 light:border-zinc-300">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 bg-purple-900/30 rounded-lg text-purple-400">
                    {principle.icon}
                  </div>
                  <h3 className="text-xl font-bold">{principle.title}</h3>
                </div>
                <p className="text-sm text-zinc-400 light:text-zinc-600 mb-4">{principle.description}</p>
                <div className="space-y-2">
                  {principle.examples.map((example, eIdx) => (
                    <div key={eIdx} className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-400 mt-0.5" />
                      <span className="text-sm text-zinc-300 light:text-zinc-700">{example}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Brand Voice */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Brand Voice & Messaging</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-zinc-900 light:bg-zinc-100 rounded-xl p-6 border border-zinc-800 light:border-zinc-300">
              <h3 className="text-lg font-bold mb-3">Technical</h3>
              <p className="text-sm text-zinc-400 light:text-zinc-600 mb-4">
                Demonstrate expertise through specific technologies, metrics, and implementation details
              </p>
              <div className="text-xs text-zinc-500">
                Example: "Achieved 80% performance improvement through query preprocessing and response caching"
              </div>
            </div>

            <div className="bg-zinc-900 light:bg-zinc-100 rounded-xl p-6 border border-zinc-800 light:border-zinc-300">
              <h3 className="text-lg font-bold mb-3">Professional</h3>
              <p className="text-sm text-zinc-400 light:text-zinc-600 mb-4">
                Maintain clear, concise communication with focus on business value and results
              </p>
              <div className="text-xs text-zinc-500">
                Example: "Digital Twin RAG system provides instant access to professional background with 96% accuracy"
              </div>
            </div>

            <div className="bg-zinc-900 light:bg-zinc-100 rounded-xl p-6 border border-zinc-800 light:border-zinc-300">
              <h3 className="text-lg font-bold mb-3">Innovative</h3>
              <p className="text-sm text-zinc-400 light:text-zinc-600 mb-4">
                Showcase cutting-edge technologies and modern development practices
              </p>
              <div className="text-xs text-zinc-500">
                Example: "MCP protocol integration enables AI assistants to access professional context across platforms"
              </div>
            </div>
          </div>
        </div>

        {/* Usage Guidelines */}
        <div>
          <h2 className="text-2xl font-bold mb-6">Implementation Guidelines</h2>
          <div className="bg-zinc-900 light:bg-zinc-100 rounded-xl p-6 border border-zinc-800 light:border-zinc-300">
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-3">Dark/Light Mode Support</h3>
                <div className="bg-black light:bg-white rounded p-4 border border-zinc-800 light:border-zinc-300">
                  <code className="text-xs text-green-400 font-mono">
                    className="bg-zinc-900 light:bg-zinc-100 text-white light:text-black"
                  </code>
                </div>
                <p className="text-sm text-zinc-400 light:text-zinc-600 mt-2">
                  Use <code className="text-xs text-purple-400 bg-zinc-800 light:bg-zinc-200 px-1 rounded">light:</code> prefix for light mode overrides
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-3">Gradient Applications</h3>
                <div className="bg-black light:bg-white rounded p-4 border border-zinc-800 light:border-zinc-300">
                  <code className="text-xs text-green-400 font-mono">
                    className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent"
                  </code>
                </div>
                <p className="text-sm text-zinc-400 light:text-zinc-600 mt-2">
                  Apply to h1 headings for consistent brand identity across pages
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-3">Spacing System</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center">
                    <div className="bg-purple-600 h-4 rounded mb-2" />
                    <code className="text-xs text-zinc-400">gap-4 / p-4</code>
                  </div>
                  <div className="text-center">
                    <div className="bg-purple-600 h-6 rounded mb-2" />
                    <code className="text-xs text-zinc-400">gap-6 / p-6</code>
                  </div>
                  <div className="text-center">
                    <div className="bg-purple-600 h-8 rounded mb-2" />
                    <code className="text-xs text-zinc-400">gap-8 / p-8</code>
                  </div>
                  <div className="text-center">
                    <div className="bg-purple-600 h-12 rounded mb-2" />
                    <code className="text-xs text-zinc-400">gap-12 / p-12</code>
                  </div>
                </div>
                <p className="text-sm text-zinc-400 light:text-zinc-600 mt-4">
                  Use consistent spacing multiples (4, 6, 8, 12) for visual rhythm
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-3">Border Radius Standards</h3>
                <div className="flex gap-4 items-center">
                  <div className="flex-1">
                    <div className="bg-purple-600 h-16 rounded" />
                    <code className="text-xs text-zinc-400 block mt-2">rounded (0.25rem)</code>
                  </div>
                  <div className="flex-1">
                    <div className="bg-purple-600 h-16 rounded-lg" />
                    <code className="text-xs text-zinc-400 block mt-2">rounded-lg (0.5rem)</code>
                  </div>
                  <div className="flex-1">
                    <div className="bg-purple-600 h-16 rounded-xl" />
                    <code className="text-xs text-zinc-400 block mt-2">rounded-xl (0.75rem)</code>
                  </div>
                  <div className="flex-1">
                    <div className="bg-purple-600 h-16 rounded-full" />
                    <code className="text-xs text-zinc-400 block mt-2">rounded-full</code>
                  </div>
                </div>
                <p className="text-sm text-zinc-400 light:text-zinc-600 mt-4">
                  Use rounded-xl for cards, rounded-lg for buttons, rounded-full for badges
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 flex gap-4 justify-center">
          <Link
            href="/demo"
            className="inline-block bg-zinc-800 light:bg-zinc-200 hover:bg-zinc-700 light:hover:bg-zinc-300 text-white light:text-black font-semibold px-8 py-3 rounded-lg transition-colors"
          >
            ← Live Demo
          </Link>
          <Link
            href="/"
            className="inline-block bg-purple-600 hover:bg-purple-700 text-white font-semibold px-8 py-3 rounded-lg transition-colors"
          >
            Back to Portfolio Home →
          </Link>
        </div>
      </div>
    </div>
  );
}
