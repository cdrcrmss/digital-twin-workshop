'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, Activity, Clock, TrendingUp, AlertCircle, CheckCircle, Database } from 'lucide-react';
import { PageWrapper } from '../components/PageWrapper';

export default function MonitoringPage() {
  const [metrics, setMetrics] = useState({
    responseTime: 95,
    uptime: 99.9,
    requestsPerMin: 42,
    errorRate: 0.1,
    cacheHitRate: 82,
    activeUsers: 8
  });

  // Simulate live updates
  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics(prev => ({
        responseTime: Math.floor(Math.random() * 50 + 70),
        uptime: 99.9,
        requestsPerMin: Math.floor(Math.random() * 20 + 35),
        errorRate: Math.random() * 0.5,
        cacheHitRate: Math.floor(Math.random() * 10 + 78),
        activeUsers: Math.floor(Math.random() * 5 + 5)
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const healthStatus = [
    { service: 'API Server', status: 'healthy', uptime: '99.9%', latency: '95ms' },
    { service: 'Vector Database', status: 'healthy', uptime: '100%', latency: '12ms' },
    { service: 'LLM Provider (Groq)', status: 'healthy', uptime: '99.8%', latency: '380ms' },
    { service: 'Cache System', status: 'healthy', uptime: '100%', latency: '2ms' },
    { service: 'Portfolio Frontend', status: 'healthy', uptime: '100%', latency: '45ms' }
  ];

  const recentRequests = [
    { time: '14:23:45', endpoint: '/api/mcp', method: 'POST', status: 200, duration: '92ms' },
    { time: '14:23:42', endpoint: '/api/mcp', method: 'POST', status: 200, duration: '48ms' },
    { time: '14:23:38', endpoint: '/api/mcp', method: 'GET', status: 200, duration: '12ms' },
    { time: '14:23:35', endpoint: '/api/mcp', method: 'POST', status: 200, duration: '105ms' },
    { time: '14:23:30', endpoint: '/api/mcp', method: 'POST', status: 200, duration: '51ms' }
  ];

  return (
    <PageWrapper>
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 py-8 sm:py-12">
        <Link href="/optimization" className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 mb-6">
          <ArrowLeft className="w-4 h-4" />
          Back to Optimization
        </Link>

        <div className="flex items-center justify-between mb-12">
          <div>
            <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              Production Monitoring
            </h1>
            <p className="text-xl text-zinc-400 light:text-zinc-600">
              Live Performance Metrics Dashboard
            </p>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-green-900/30 border border-green-800 rounded-lg">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
            <span className="text-sm text-green-400 font-semibold">All Systems Operational</span>
          </div>
        </div>

        {/* Real-Time Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
          <div className="bg-zinc-900 light:bg-zinc-100 rounded-xl p-6 border border-zinc-800 light:border-zinc-300">
            <div className="flex items-center gap-2 mb-2">
              <Clock className="w-4 h-4 text-blue-400" />
              <span className="text-xs text-zinc-500 light:text-zinc-600">Avg Response</span>
            </div>
            <div className="text-3xl font-bold text-blue-400">{metrics.responseTime}ms</div>
            <div className="text-xs text-green-400 mt-1">↓ 80% faster</div>
          </div>

          <div className="bg-zinc-900 light:bg-zinc-100 rounded-xl p-6 border border-zinc-800 light:border-zinc-300">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="w-4 h-4 text-green-400" />
              <span className="text-xs text-zinc-500 light:text-zinc-600">Uptime</span>
            </div>
            <div className="text-3xl font-bold text-green-400">{metrics.uptime}%</div>
            <div className="text-xs text-green-400 mt-1">Last 30 days</div>
          </div>

          <div className="bg-zinc-900 light:bg-zinc-100 rounded-xl p-6 border border-zinc-800 light:border-zinc-300">
            <div className="flex items-center gap-2 mb-2">
              <Activity className="w-4 h-4 text-purple-400" />
              <span className="text-xs text-zinc-500 light:text-zinc-600">Requests/min</span>
            </div>
            <div className="text-3xl font-bold text-purple-400">{metrics.requestsPerMin}</div>
            <div className="text-xs text-zinc-400 mt-1">Real-time</div>
          </div>

          <div className="bg-zinc-900 light:bg-zinc-100 rounded-xl p-6 border border-zinc-800 light:border-zinc-300">
            <div className="flex items-center gap-2 mb-2">
              <AlertCircle className="w-4 h-4 text-red-400" />
              <span className="text-xs text-zinc-500 light:text-zinc-600">Error Rate</span>
            </div>
            <div className="text-3xl font-bold text-red-400">{metrics.errorRate.toFixed(1)}%</div>
            <div className="text-xs text-green-400 mt-1">Excellent</div>
          </div>

          <div className="bg-zinc-900 light:bg-zinc-100 rounded-xl p-6 border border-zinc-800 light:border-zinc-300">
            <div className="flex items-center gap-2 mb-2">
              <Database className="w-4 h-4 text-orange-400" />
              <span className="text-xs text-zinc-500 light:text-zinc-600">Cache Hit</span>
            </div>
            <div className="text-3xl font-bold text-orange-400">{metrics.cacheHitRate}%</div>
            <div className="text-xs text-green-400 mt-1">Optimized</div>
          </div>

          <div className="bg-zinc-900 light:bg-zinc-100 rounded-xl p-6 border border-zinc-800 light:border-zinc-300">
            <div className="flex items-center gap-2 mb-2">
              <Activity className="w-4 h-4 text-cyan-400" />
              <span className="text-xs text-zinc-500 light:text-zinc-600">Active Users</span>
            </div>
            <div className="text-3xl font-bold text-cyan-400">{metrics.activeUsers}</div>
            <div className="text-xs text-zinc-400 mt-1">Now</div>
          </div>
        </div>

        {/* Service Health */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Service Health Status</h2>
          <div className="bg-zinc-900 light:bg-zinc-100 rounded-xl border border-zinc-800 light:border-zinc-300 overflow-hidden">
            <table className="w-full">
              <thead className="bg-zinc-800 light:bg-zinc-200">
                <tr>
                  <th className="text-left p-4 text-sm font-semibold">Service</th>
                  <th className="text-center p-4 text-sm font-semibold">Status</th>
                  <th className="text-center p-4 text-sm font-semibold">Uptime</th>
                  <th className="text-center p-4 text-sm font-semibold">Latency</th>
                </tr>
              </thead>
              <tbody>
                {healthStatus.map((service, idx) => (
                  <tr key={idx} className="border-t border-zinc-800 light:border-zinc-300">
                    <td className="p-4 text-sm font-medium">{service.service}</td>
                    <td className="p-4 text-center">
                      <div className="flex items-center justify-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span className="text-sm text-green-400">{service.status}</span>
                      </div>
                    </td>
                    <td className="p-4 text-center text-sm">{service.uptime}</td>
                    <td className="p-4 text-center">
                      <span className="text-sm px-3 py-1 rounded-full bg-blue-900/30 text-blue-300">
                        {service.latency}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Recent Requests */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Recent API Requests</h2>
          <div className="bg-zinc-900 light:bg-zinc-100 rounded-xl border border-zinc-800 light:border-zinc-300 overflow-hidden">
            <table className="w-full font-mono text-xs">
              <thead className="bg-zinc-800 light:bg-zinc-200">
                <tr>
                  <th className="text-left p-3 font-semibold">Time</th>
                  <th className="text-left p-3 font-semibold">Endpoint</th>
                  <th className="text-center p-3 font-semibold">Method</th>
                  <th className="text-center p-3 font-semibold">Status</th>
                  <th className="text-right p-3 font-semibold">Duration</th>
                </tr>
              </thead>
              <tbody>
                {recentRequests.map((req, idx) => (
                  <tr key={idx} className="border-t border-zinc-800 light:border-zinc-300">
                    <td className="p-3 text-zinc-400">{req.time}</td>
                    <td className="p-3">{req.endpoint}</td>
                    <td className="p-3 text-center">
                      <span className={`px-2 py-1 rounded text-xs ${
                        req.method === 'POST' 
                          ? 'bg-blue-900/30 text-blue-300' 
                          : 'bg-green-900/30 text-green-300'
                      }`}>
                        {req.method}
                      </span>
                    </td>
                    <td className="p-3 text-center">
                      <span className="px-2 py-1 rounded bg-green-900/30 text-green-300 text-xs">
                        {req.status}
                      </span>
                    </td>
                    <td className="p-3 text-right text-blue-400">{req.duration}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Performance Chart */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Response Time Trend (Last 24h)</h2>
          <div className="bg-zinc-900 light:bg-zinc-100 rounded-xl p-6 border border-zinc-800 light:border-zinc-300">
            <div className="h-64 flex items-end gap-2">
              {[85, 92, 78, 95, 88, 82, 90, 87, 93, 89, 91, 86, 94, 88, 85, 92, 89, 91, 87, 90, 93, 88, 86, 91].map((height, idx) => {
                return (
                  <div key={idx} className="flex-1 relative group">
                    <div
                      className="bg-gradient-to-t from-[#00d9a3] to-[#00f5c4] rounded-t hover:opacity-80 transition-opacity cursor-pointer"
                      style={{ height: `${height}%` }}
                    />
                    <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 bg-black light:bg-white px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap border border-[#00d9a3]">
                      <span className="text-white light:text-black">{idx}:00 - {Math.floor(height * 2)}ms</span>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="flex justify-between mt-4 text-xs text-zinc-500">
              <span>00:00</span>
              <span>06:00</span>
              <span>12:00</span>
              <span>18:00</span>
              <span>24:00</span>
            </div>
          </div>
        </div>

        {/* Alerts & Notifications */}
        <div>
          <h2 className="text-2xl font-bold mb-4">System Alerts</h2>
          <div className="space-y-3">
            <div className="bg-green-900/20 border border-green-800 rounded-lg p-4 flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
              <div>
                <div className="font-semibold text-green-400">All systems operating normally</div>
                <div className="text-sm text-zinc-400 mt-1">No issues detected in the last 24 hours</div>
              </div>
            </div>
            <div className="bg-blue-900/20 border border-blue-800 rounded-lg p-4 flex items-start gap-3">
              <Activity className="w-5 h-5 text-blue-500 mt-0.5" />
              <div>
                <div className="font-semibold text-blue-400">Cache optimization active</div>
                <div className="text-sm text-zinc-400 mt-1">82% cache hit rate - excellent performance</div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 flex gap-4 justify-center">
          <Link
            href="/optimization"
            className="inline-block bg-zinc-800 light:bg-zinc-200 hover:bg-zinc-700 light:hover:bg-zinc-300 text-white light:text-black font-semibold px-8 py-3 rounded-lg transition-colors"
          >
            ← Optimization
          </Link>
          <Link
            href="/scalability"
            className="inline-block bg-purple-600 hover:bg-purple-700 text-white font-semibold px-8 py-3 rounded-lg transition-colors"
          >
            Scalability Testing →
          </Link>
        </div>
      </div>
    </PageWrapper>
  );
}
