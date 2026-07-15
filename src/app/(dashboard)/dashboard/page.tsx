'use client';

import { useEffect, useState } from 'react';
import { Activity, Star, GitFork, BookOpen, ExternalLink, RefreshCw } from 'lucide-react';

export default function DashboardPage() {
  // We'll mock the data for now until we connect the real backend session
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching data from our backend
    setTimeout(() => {
      setStats({
        github: {
          followers: 1250,
          stars: 432,
          forks: 89,
          primaryLanguage: 'TypeScript',
        },
        articles: [
          { title: 'Building a Micro-SaaS in 14 Days', platform: 'Medium', date: '2026-07-10' },
          { title: 'Why NestJS is perfect for Backend', platform: 'Dev.to', date: '2026-07-05' },
        ]
      });
      setLoading(false);
    }, 1000);
  }, []);

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <header className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white">Welcome back!</h1>
          <p className="text-slate-400 mt-1">Here is a quick overview of your profile performance.</p>
        </div>
        <button className="glass-button px-4 py-2 flex items-center gap-2 text-sm font-medium">
          <RefreshCw size={16} />
          Sync Data
        </button>
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard title="GitHub Followers" value={loading ? '...' : stats.github.followers} icon={Activity} color="text-blue-400" />
        <StatCard title="Total Repository Stars" value={loading ? '...' : stats.github.stars} icon={Star} color="text-yellow-400" />
        <StatCard title="Primary Language" value={loading ? '...' : stats.github.primaryLanguage} icon={BookOpen} color="text-purple-400" />
      </div>

      {/* Recent Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
        <div className="glass-panel p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-white">Recent Articles</h2>
            <button className="text-sm text-blue-400 hover:text-blue-300 transition-colors flex items-center gap-1">
              View all <ExternalLink size={14} />
            </button>
          </div>
          
          {loading ? (
            <div className="space-y-4">
              {[1, 2].map(i => (
                <div key={i} className="animate-pulse flex space-x-4">
                  <div className="flex-1 space-y-3 py-1">
                    <div className="h-4 bg-white/10 rounded w-3/4"></div>
                    <div className="h-3 bg-white/10 rounded w-1/4"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {stats.articles.map((article: any, i: number) => (
                <div key={i} className="p-4 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors">
                  <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">{article.platform}</div>
                  <h3 className="font-medium text-white mb-2">{article.title}</h3>
                  <div className="text-xs text-slate-500">{article.date}</div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="glass-panel p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-white">Top Repositories</h2>
          </div>
          <div className="flex flex-col items-center justify-center h-48 text-center border-2 border-dashed border-white/10 rounded-xl">
            <GitFork size={32} className="text-slate-500 mb-3" />
            <p className="text-slate-400 font-medium">Sync your GitHub account<br/>to display repositories.</p>
            <button className="mt-4 glass-button px-4 py-2 text-sm">Connect GitHub</button>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value, icon: Icon, color }: any) {
  return (
    <div className="glass-panel p-6 flex flex-col gap-4 hover:bg-white/[0.07] transition-colors cursor-default">
      <div className="flex justify-between items-start">
        <h3 className="text-slate-400 font-medium">{title}</h3>
        <div className={`p-2 rounded-lg bg-white/5 ${color}`}>
          <Icon size={20} />
        </div>
      </div>
      <div className="text-3xl font-bold text-white tracking-tight">{value}</div>
    </div>
  );
}
