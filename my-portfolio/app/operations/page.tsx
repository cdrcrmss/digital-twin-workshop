'use client';

import Link from 'next/link';
import { ArrowLeft, Rocket, GitBranch, AlertTriangle, RotateCcw, CheckCircle, Terminal } from 'lucide-react';

export default function OperationsPage() {
  const deploymentSteps = [
    {
      step: 1,
      title: 'Pre-deployment Checks',
      commands: [
        { cmd: 'pnpm run build', desc: 'Build production bundle' },
        { cmd: 'pnpm run test', desc: 'Run all tests' },
        { cmd: 'git status', desc: 'Verify clean working directory' }
      ],
      checklist: [
        'All tests passing',
        'No TypeScript errors',
        'Environment variables configured',
        'Database migrations applied'
      ]
    },
    {
      step: 2,
      title: 'Deploy to Production',
      commands: [
        { cmd: 'git push origin main', desc: 'Push to main branch' },
        { cmd: 'vercel --prod', desc: 'Deploy to Vercel production' }
      ],
      checklist: [
        'Deployment successful',
        'Health check passing',
        'No console errors',
        'API endpoints responding'
      ]
    },
    {
      step: 3,
      title: 'Post-deployment Verification',
      commands: [
        { cmd: 'curl https://api.example.com/health', desc: 'Check API health' },
        { cmd: 'pnpm run test:e2e', desc: 'Run end-to-end tests' }
      ],
      checklist: [
        'All services operational',
        'Monitoring dashboards updated',
        'Response times normal',
        'No spike in error rate'
      ]
    }
  ];

  const rollbackProcedure = [
    { step: 'Identify Issue', action: 'Monitor alerts and error tracking to confirm deployment issue', time: '2 min' },
    { step: 'Trigger Rollback', action: 'Use Vercel dashboard or CLI to rollback to previous deployment', time: '1 min' },
    { step: 'Verify Rollback', action: 'Confirm previous version is live and functioning correctly', time: '2 min' },
    { step: 'Post-mortem', action: 'Document issue, root cause, and prevention measures', time: '30 min' }
  ];

  const monitoringAlerts = [
    {
      name: 'High Error Rate',
      threshold: 'Error rate > 5%',
      severity: 'critical',
      action: 'Immediate rollback if deployment-related, investigate and fix otherwise',
      escalation: 'Alert team lead if unresolved after 15 minutes'
    },
    {
      name: 'Slow Response Time',
      threshold: 'P95 response > 500ms',
      severity: 'warning',
      action: 'Check database connection pool, review recent code changes',
      escalation: 'Upgrade to critical if P95 exceeds 1000ms'
    },
    {
      name: 'API Downtime',
      threshold: 'Health check fails 3 consecutive times',
      severity: 'critical',
      action: 'Immediate investigation, check server logs and infrastructure',
      escalation: 'Page on-call engineer immediately'
    },
    {
      name: 'Cache Hit Rate Drop',
      threshold: 'Cache hit rate < 60%',
      severity: 'info',
      action: 'Review cache configuration, check for cache invalidation issues',
      escalation: 'Upgrade to warning if below 40%'
    }
  ];

  const maintenanceTasks = [
    {
      frequency: 'Daily',
      tasks: [
        'Review error logs and monitoring dashboards',
        'Check API response times and uptime',
        'Verify cache hit rates and performance metrics'
      ]
    },
    {
      frequency: 'Weekly',
      tasks: [
        'Update dependencies with security patches',
        'Review and optimize database queries',
        'Analyze user feedback and reported issues',
        'Backup configuration and environment variables'
      ]
    },
    {
      frequency: 'Monthly',
      tasks: [
        'Review and update documentation',
        'Conduct load testing to verify scalability',
        'Optimize infrastructure costs',
        'Security audit and penetration testing'
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-[#0f1419] light:bg-white text-white light:text-gray-900">
      <div className="container mx-auto max-w-7xl px-6 py-12">
        <Link href="/scalability" className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 mb-6">
          <ArrowLeft className="w-4 h-4" />
          Back to Scalability
        </Link>

        <div className="mb-12">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            Production Operations
          </h1>
          <p className="text-xl text-zinc-400 light:text-zinc-600">
            Deployment procedures, maintenance, and incident response
          </p>
        </div>

        {/* Deployment Process */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Deployment Process</h2>
          <div className="space-y-6">
            {deploymentSteps.map((section, idx) => (
              <div key={idx} className="bg-zinc-900 light:bg-zinc-100 rounded-xl p-6 border border-zinc-800 light:border-zinc-300">
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-purple-900/30 text-purple-400 font-bold">
                    {section.step}
                  </div>
                  <h3 className="text-xl font-bold">{section.title}</h3>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-sm font-semibold text-zinc-500 mb-3">Commands</h4>
                    <div className="space-y-2">
                      {section.commands.map((command, cIdx) => (
                        <div key={cIdx} className="bg-black light:bg-white rounded p-3 border border-zinc-800 light:border-zinc-300">
                          <div className="flex items-center gap-2 mb-1">
                            <Terminal className="w-3 h-3 text-green-400" />
                            <code className="text-sm text-green-400 font-mono">{command.cmd}</code>
                          </div>
                          <div className="text-xs text-zinc-500 ml-5">{command.desc}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-semibold text-zinc-500 mb-3">Checklist</h4>
                    <div className="space-y-2">
                      {section.checklist.map((item, iIdx) => (
                        <div key={iIdx} className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-green-400" />
                          <span className="text-sm">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Rollback Procedure */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Rollback Procedure</h2>
          <div className="bg-zinc-900 light:bg-zinc-100 rounded-xl border border-zinc-800 light:border-zinc-300 overflow-hidden">
            <div className="bg-red-900/20 border-b border-red-800 p-4 flex items-center gap-3">
              <RotateCcw className="w-5 h-5 text-red-400" />
              <div>
                <div className="font-semibold text-red-400">Emergency Rollback Protocol</div>
                <div className="text-sm text-zinc-400">Follow these steps if deployment causes critical issues</div>
              </div>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {rollbackProcedure.map((item, idx) => (
                  <div key={idx} className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-red-900/30 text-red-400 font-bold text-sm">
                        {idx + 1}
                      </div>
                      {idx < rollbackProcedure.length - 1 && (
                        <div className="w-0.5 flex-1 bg-zinc-800 light:bg-zinc-300 my-2" />
                      )}
                    </div>
                    <div className="flex-1 pb-4">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold">{item.step}</h4>
                        <span className="text-xs text-zinc-500 px-2 py-1 bg-zinc-800 light:bg-zinc-200 rounded">
                          ~{item.time}
                        </span>
                      </div>
                      <p className="text-sm text-zinc-400 light:text-zinc-600">{item.action}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 p-4 bg-zinc-800 light:bg-zinc-200 rounded-lg">
                <h4 className="text-sm font-semibold mb-2">Vercel Rollback Commands</h4>
                <div className="space-y-2">
                  <div className="bg-black light:bg-white rounded p-2 border border-zinc-700 light:border-zinc-300">
                    <code className="text-xs text-green-400 font-mono">vercel rollback</code>
                    <span className="text-xs text-zinc-500 ml-3">Interactive rollback selection</span>
                  </div>
                  <div className="bg-black light:bg-white rounded p-2 border border-zinc-700 light:border-zinc-300">
                    <code className="text-xs text-green-400 font-mono">vercel rollback [deployment-url]</code>
                    <span className="text-xs text-zinc-500 ml-3">Rollback to specific deployment</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Monitoring Alerts */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Monitoring Alerts & Response</h2>
          <div className="grid grid-cols-1 gap-4">
            {monitoringAlerts.map((alert, idx) => (
              <div key={idx} className="bg-zinc-900 light:bg-zinc-100 rounded-xl p-6 border border-zinc-800 light:border-zinc-300">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <AlertTriangle className={`w-5 h-5 ${
                      alert.severity === 'critical' ? 'text-red-400' : 
                      alert.severity === 'warning' ? 'text-yellow-400' : 
                      'text-blue-400'
                    }`} />
                    <div>
                      <h3 className="text-lg font-bold">{alert.name}</h3>
                      <div className="text-sm text-zinc-400 light:text-zinc-600">{alert.threshold}</div>
                    </div>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    alert.severity === 'critical' ? 'bg-red-900/30 text-red-400' : 
                    alert.severity === 'warning' ? 'bg-yellow-900/30 text-yellow-400' : 
                    'bg-blue-900/30 text-blue-400'
                  }`}>
                    {alert.severity.toUpperCase()}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <div className="text-xs font-semibold text-zinc-500 mb-2">Immediate Action</div>
                    <p className="text-sm text-zinc-300 light:text-zinc-700">{alert.action}</p>
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-zinc-500 mb-2">Escalation Procedure</div>
                    <p className="text-sm text-zinc-300 light:text-zinc-700">{alert.escalation}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Maintenance Schedule */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Maintenance Schedule</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {maintenanceTasks.map((schedule, idx) => (
              <div key={idx} className="bg-zinc-900 light:bg-zinc-100 rounded-xl p-6 border border-zinc-800 light:border-zinc-300">
                <div className="flex items-center gap-2 mb-4">
                  <GitBranch className="w-5 h-5 text-purple-400" />
                  <h3 className="text-lg font-bold">{schedule.frequency}</h3>
                </div>
                <div className="space-y-2">
                  {schedule.tasks.map((task, tIdx) => (
                    <div key={tIdx} className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-purple-400 rounded-full mt-2" />
                      <span className="text-sm text-zinc-300 light:text-zinc-700">{task}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Infrastructure Overview */}
        <div>
          <h2 className="text-2xl font-bold mb-6">Infrastructure Stack</h2>
          <div className="bg-zinc-900 light:bg-zinc-100 rounded-xl p-6 border border-zinc-800 light:border-zinc-300">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold mb-4">Production Services</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center py-2 border-b border-zinc-800 light:border-zinc-300">
                    <span className="text-sm text-zinc-400">Hosting</span>
                    <span className="text-sm font-semibold">Vercel (Edge Functions)</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-zinc-800 light:border-zinc-300">
                    <span className="text-sm text-zinc-400">Vector Database</span>
                    <span className="text-sm font-semibold">Upstash Vector</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-zinc-800 light:border-zinc-300">
                    <span className="text-sm text-zinc-400">LLM Provider</span>
                    <span className="text-sm font-semibold">Groq (llama-3.3-70b)</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-zinc-800 light:border-zinc-300">
                    <span className="text-sm text-zinc-400">Caching</span>
                    <span className="text-sm font-semibold">Upstash Redis</span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="text-sm text-zinc-400">CDN</span>
                    <span className="text-sm font-semibold">Vercel Edge Network</span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-4">Environment Variables</h3>
                <div className="space-y-2">
                  <div className="bg-black light:bg-white rounded p-3 border border-zinc-800 light:border-zinc-300">
                    <code className="text-xs text-green-400 font-mono">UPSTASH_VECTOR_REST_URL</code>
                    <div className="text-xs text-zinc-500 mt-1">Vector database endpoint</div>
                  </div>
                  <div className="bg-black light:bg-white rounded p-3 border border-zinc-800 light:border-zinc-300">
                    <code className="text-xs text-green-400 font-mono">UPSTASH_VECTOR_REST_TOKEN</code>
                    <div className="text-xs text-zinc-500 mt-1">Authentication token</div>
                  </div>
                  <div className="bg-black light:bg-white rounded p-3 border border-zinc-800 light:border-zinc-300">
                    <code className="text-xs text-green-400 font-mono">GROQ_API_KEY</code>
                    <div className="text-xs text-zinc-500 mt-1">LLM API access key</div>
                  </div>
                  <div className="bg-black light:bg-white rounded p-3 border border-zinc-800 light:border-zinc-300">
                    <code className="text-xs text-green-400 font-mono">USE_OLLAMA</code>
                    <div className="text-xs text-zinc-500 mt-1">Toggle local LLM (default: false)</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 flex gap-4 justify-center">
          <Link
            href="/scalability"
            className="inline-block bg-zinc-800 light:bg-zinc-200 hover:bg-zinc-700 light:hover:bg-zinc-300 text-white light:text-black font-semibold px-8 py-3 rounded-lg transition-colors"
          >
            ← Scalability
          </Link>
          <Link
            href="/mcp-integration"
            className="inline-block bg-purple-600 hover:bg-purple-700 text-white font-semibold px-8 py-3 rounded-lg transition-colors"
          >
            MCP Integration →
          </Link>
        </div>
      </div>
    </div>
  );
}
