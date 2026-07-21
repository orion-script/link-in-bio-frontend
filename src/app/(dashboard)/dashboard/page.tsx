'use client';

import { useEffect, useState } from 'react';
import { Activity, Star, GitFork, BookOpen, ExternalLink, RefreshCw } from '@/components/Icons';

const BaseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export default function DashboardPage() {
  // We'll mock the data for now until we connect the real backend session
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const username = 'orion-script'; // Mock session user
        
        // Fetch all real data in parallel
        const [analyticsRes, githubRes, blogRes] = await Promise.allSettled([
          fetch(`${BaseUrl}/analytics/stats/${username}`),
          fetch(`${BaseUrl}/github/${username}/stats`),
          fetch(`${BaseUrl}/blog/devto/${username}`)
        ]);
        
        const analyticsData = analyticsRes.status === 'fulfilled' && analyticsRes.value.ok ? await analyticsRes.value.json() : null;
        const githubData = githubRes.status === 'fulfilled' && githubRes.value.ok ? await githubRes.value.json() : null;
        const blogData = blogRes.status === 'fulfilled' && blogRes.value.ok ? await blogRes.value.json() : [];
        
        setStats({
          analytics: analyticsData,
          github: githubData ? {
            followers: githubData.stats.followers,
            stars: githubData.pinnedRepos.reduce((acc: number, repo: any) => acc + repo.stars, 0),
            forks: githubData.pinnedRepos.reduce((acc: number, repo: any) => acc + repo.forks, 0),
            primaryLanguage: githubData.pinnedRepos[0]?.language?.name || 'TypeScript',
          } : { followers: 0, stars: 0, forks: 0, primaryLanguage: 'N/A' },
          articles: blogData.length > 0 ? blogData : [
             { title: 'No articles published yet', platform: 'Blog', date: '' }
          ],
          pinnedRepos: githubData?.pinnedRepos || []
        });
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    
    fetchData();
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
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatCard title="Profile Views" value={loading ? '...' : stats.analytics?.totalViews || 0} icon={Activity} color="text-emerald-400" />
        <StatCard title="Link Clicks" value={loading ? '...' : stats.analytics?.totalClicks || 0} icon={ExternalLink} color="text-indigo-400" />
        <StatCard title="GitHub Followers" value={loading ? '...' : stats.github.followers} icon={Star} color="text-blue-400" />
        <StatCard title="Total Repository Stars" value={loading ? '...' : stats.github.stars} icon={Star} color="text-yellow-400" />
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
          {loading ? (
             <div className="flex flex-col items-center justify-center h-48 animate-pulse border-2 border-dashed border-white/10 rounded-xl">
               <div className="w-8 h-8 bg-white/10 rounded-full mb-3"></div>
               <div className="h-4 bg-white/10 rounded w-1/2 mb-2"></div>
               <div className="h-3 bg-white/10 rounded w-1/3"></div>
             </div>
          ) : stats.pinnedRepos?.length > 0 ? (
            <div className="space-y-4">
              {stats.pinnedRepos.map((repo: any, i: number) => (
                <a key={i} href={repo.url} target="_blank" rel="noopener noreferrer" className="p-4 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors flex flex-col group block">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-medium text-white group-hover:text-blue-400 transition-colors">{repo.name}</h3>
                    <div className="flex items-center gap-2 text-xs text-slate-400 font-semibold">
                      {repo.language?.name && (
                         <span className="flex items-center gap-1">
                           <span className="w-2 h-2 rounded-full" style={{ backgroundColor: repo.language.color || '#ccc' }}></span>
                           {repo.language.name}
                         </span>
                      )}
                      <span className="flex items-center gap-1"><Star size={12} className="text-yellow-400"/> {repo.stars}</span>
                    </div>
                  </div>
                  <p className="text-xs text-slate-400 line-clamp-2">{repo.description}</p>
                </a>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-48 text-center border-2 border-dashed border-white/10 rounded-xl">
              <GitFork size={32} className="text-slate-500 mb-3" />
              <p className="text-slate-400 font-medium">No repositories pinned yet.</p>
              <button className="mt-4 glass-button px-4 py-2 text-sm">Connect GitHub</button>
            </div>
          )}
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
