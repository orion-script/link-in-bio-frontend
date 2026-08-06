import Image from 'next/image';
import { Activity, Star, BookOpen, ExternalLink, Github, Mail, Link2 } from '@/components/Icons';
import Link from 'next/link';
import { AnalyticsTracker } from '@/components/AnalyticsTracker';
import { TrackedLink } from '@/components/TrackedLink';

const BaseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export default async function PublicProfilePage({
  params,
}: {
  params: Promise<{ username: string }>;
}) {
  const { username } = await params;

  // Fetch Live GitHub Data (No cache for real-time feel, or 10s revalidate)
  const githubRes = await fetch(`${BaseUrl}/github/${username}/stats`, { next: { revalidate: 60 } }).catch(() => null);
  const githubData = githubRes && githubRes.ok ? await githubRes.json() : null;

  // Fetch Live DEV.to Data
  const blogRes = await fetch(`${BaseUrl}/blog/devto/${username}`, { next: { revalidate: 3600 } }).catch(() => null);
  const blogData = blogRes && blogRes.ok ? await blogRes.json() : [];

  // Fallback to mock data for parts we haven't connected to the DB yet
  const user = {
    name: username.charAt(0).toUpperCase() + username.slice(1),
    username: username,
    bio: "Full-stack developer building cool things on the internet. Next.js, NestJS, and TypeScript enthusiast.",
    avatarUrl: `https://github.com/${username}.png`,
    theme: 'midnight',
  };

  const links = [
    { id: '1', title: 'My Portfolio', url: 'https://orionscript.dev' },
    { id: '2', title: 'Follow me on X (Twitter)', url: 'https://x.com/orion_codes' },
    { id: '3', title: 'LinkedIn Connect', url: 'https://www.linkedin.com/in/orioncodes' },
  ];

  interface GithubRepo {
    stars: number;
    forks: number;
    language?: {
      name?: string;
    } | null;
  }

  // Merge Live Data with Fallbacks
  const github = githubData ? {
    followers: githubData.stats.followers,
    stars: githubData.pinnedRepos.reduce((acc: number, repo: GithubRepo) => acc + repo.stars, 0),
    forks: githubData.pinnedRepos.reduce((acc: number, repo: GithubRepo) => acc + repo.forks, 0),
    primaryLanguage: githubData.pinnedRepos[0]?.language?.name || 'TypeScript',
  } : {
    followers: 0,
    stars: 0,
    forks: 0,
    primaryLanguage: 'N/A',
  };

  interface Article {
    id: string;
    title: string;
    platform: string;
    date: string;
    url: string;
  }

  const articles: Article[] = blogData.length > 0 ? blogData : [
    { id: 'fallback', title: 'No articles published yet', platform: 'Blog', date: '', url: '#' }
  ];

  return (
    <main 
      data-theme={user.theme} 
      className="min-h-screen w-full relative"
      style={{
        backgroundColor: 'var(--bg-color)',
        color: 'var(--text-color)',
        backgroundImage: 'radial-gradient(circle at 15% 50%, var(--gradient-color-1), transparent 25%), radial-gradient(circle at 85% 30%, var(--gradient-color-2), transparent 25%)',
        backgroundAttachment: 'fixed'
      }}
    >
      <AnalyticsTracker username={user.username} />
      <div className="min-h-screen py-12 px-4 sm:px-6 relative z-10 animate-in fade-in duration-700">
        <div className="max-w-2xl mx-auto space-y-10">
          
          {/* Profile Header */}
          <header className="flex flex-col items-center text-center space-y-4">
            <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-(--accent-color) shadow-lg shadow-(--accent-color)/20">
              <Image
                src={user.avatarUrl} 
                alt={user.name}
                width={96}
                height={96}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white tracking-tight">{user.name}</h1>
              <p className="text-(--accent-color) font-medium">@{user.username}</p>
            </div>
            <p className="text-slate-300 max-w-md leading-relaxed">
              {user.bio}
            </p>
            <div className="flex gap-4 pt-2">
              <a href={`https://github.com/${user.username}`} target="_blank" className="p-2 rounded-full glass-button hover:text-white">
                <Github size={20} />
              </a>
              <a href="mailto:olaniyijohnayomide@gmail.com" className="p-2 rounded-full glass-button hover:text-white">
                <Mail size={20} />
              </a>
            </div>
          </header>

          {/* Custom Links */}
          <section className="space-y-4">
            {links.map((link) => (
              <TrackedLink 
                key={link.id} 
                linkId={link.id}
                url={link.url}
                className="block p-4 rounded-xl glass-panel text-center font-medium text-white hover:scale-[1.02] hover:bg-white/10 hover:border-(--accent-color) transition-all active:scale-95 shadow-lg shadow-black/10"
              >
                {link.title}
              </TrackedLink>
            ))}
          </section>

          {/* GitHub Stats Grid */}
          <section>
            <h2 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4 flex items-center gap-2">
              <Github size={16} /> GitHub Stats
            </h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="glass-panel p-4 flex flex-col items-center justify-center text-center">
                <Activity size={24} className="text-blue-400 mb-2" />
                <div className="text-2xl font-bold text-white">{github.followers}</div>
                <div className="text-xs text-slate-400 uppercase tracking-wider font-semibold">Followers</div>
              </div>
              <div className="glass-panel p-4 flex flex-col items-center justify-center text-center">
                <Star size={24} className="text-yellow-400 mb-2" />
                <div className="text-2xl font-bold text-white">{github.stars}</div>
                <div className="text-xs text-slate-400 uppercase tracking-wider font-semibold">Stars</div>
              </div>
            </div>
          </section>

          {/* Recent Articles */}
          <section>
            <h2 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4 flex items-center gap-2">
              <BookOpen size={16} /> Recent Articles
            </h2>
            <div className="space-y-4">
              {articles.map((article: Article) => (
                <a 
                  key={article.id}
                  href={article.url}
                  target="_blank"
                  rel="noopener noreferrer" 
                  className="flex flex-col p-5 rounded-xl glass-panel hover:bg-white/10 transition-colors group"
                >
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-xs font-semibold text-(--accent-color) uppercase tracking-wider bg-(--accent-color)/10 px-2 py-1 rounded-md">
                      {article.platform}
                    </span>
                    <ExternalLink size={16} className="text-slate-500 group-hover:text-white transition-colors" />
                  </div>
                  <h3 className="font-semibold text-white text-lg mb-1">{article.title}</h3>
                  <div className="text-sm text-slate-400">{article.date}</div>
                </a>
              ))}
            </div>
          </section>

          {/* Footer branding */}
          <footer className="pt-8 pb-4 text-center">
            <Link href="/" className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-white transition-colors">
              <Link2 size={16} />
              Built with Developer Link-in-Bio
            </Link>
          </footer>

        </div>
      </div>
    </main>
  );
}
