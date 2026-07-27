'use client';
import { useEffect, useState, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Github, Activity, BookOpen, Star } from '@/components/Icons';

const BaseUrl = process.env.NEXT_PUBLIC_BASE_URL;

function AuthHandler({ children, setToken }: { children: React.ReactNode, setToken: (t: string | null) => void }) {
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const tokenFromUrl = searchParams.get('token');
    if (tokenFromUrl) {
      localStorage.setItem('access_token', tokenFromUrl);
      setToken(tokenFromUrl);
      router.replace('/');
    } else {
      const storedToken = localStorage.getItem('access_token');
      if (storedToken) {
        setToken(storedToken);
      }
    }
  }, [searchParams, router, setToken]);

  return <>{children}</>;
}

export default function Home() {
  const [token, setToken] = useState<string | null>(null);

  const handleLogin = () => {
    window.location.href = `${BaseUrl}/auth/github`;
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 relative overflow-hidden font-(family-name:--font-geist-sans)">
      {/* Background Gradients (Glassmorphism theme consistency) */}
      <div className="absolute top-0 inset-x-0 h-screen bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))] pointer-events-none" />
      <div className="absolute bottom-0 inset-x-0 h-screen bg-[radial-gradient(ellipse_80%_80%_at_50%_120%,rgba(56,189,248,0.15),rgba(255,255,255,0))] pointer-events-none" />

      <Suspense fallback={<div className="text-white min-h-screen flex items-center justify-center">Loading...</div>}>
        <AuthHandler setToken={setToken}>
          
          {/* Navbar */}
          <nav className="relative z-10 w-full max-w-7xl mx-auto px-6 py-6 flex items-center justify-between">
            <div className="flex items-center gap-2 font-bold text-xl tracking-tight">
              <div className="w-8 h-8 rounded-lg bg-blue-500 flex items-center justify-center text-white">
                D
              </div>
              DevLink
            </div>
            <div>
              {token ? (
                <Link href="/dashboard" className="glass-button px-5 py-2 text-sm font-medium">
                  Dashboard
                </Link>
              ) : (
                <button onClick={handleLogin} className="glass-button px-5 py-2 text-sm font-medium flex items-center gap-2">
                  <Github size={16} /> Sign In
                </button>
              )}
            </div>
          </nav>

          <main className="relative z-10 w-full max-w-7xl mx-auto px-6 pb-24 flex flex-col items-center">
            
            {/* Hero Section */}
            <section className="pt-24 pb-16 md:pt-32 md:pb-24 flex flex-col items-center text-center max-w-4xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold uppercase tracking-wide mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
                <Star size={12} /> Version 1.0 is live
              </div>
              <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 animate-in fade-in slide-in-from-bottom-6 duration-700 delay-100">
                Stop updating your portfolio manually.
              </h1>
              <p className="text-xl md:text-2xl text-slate-400 max-w-2xl mb-10 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200">
                Your Developer Portfolio, on Autopilot. Connect your GitHub and dev blogs once, and never touch your link-in-bio again.
              </p>
              
              <div className="animate-in fade-in slide-in-from-bottom-10 duration-700 delay-300">
                {token ? (
                  <Link
                    href="/dashboard"
                    className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-blue-500 hover:bg-blue-600 text-white font-semibold transition-all hover:scale-105 active:scale-95 shadow-lg shadow-blue-500/25"
                  >
                    Go to Dashboard
                  </Link>
                ) : (
                  <button
                    onClick={handleLogin}
                    className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-white text-slate-900 font-semibold hover:bg-slate-200 transition-all hover:scale-105 active:scale-95 shadow-xl shadow-white/10 cursor-pointer"
                  >
                    <Github size={20} />
                    Continue with GitHub
                  </button>
                )}
              </div>
            </section>

            {/* Features Grid */}
            <section className="w-full grid grid-cols-1 md:grid-cols-3 gap-6 pt-16">
              
              <div className="glass-panel p-8 flex flex-col items-start text-left hover:bg-white/4 transition-colors">
                <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center text-blue-400 mb-6">
                  <Github size={24} />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">Live GitHub Stats</h3>
                <p className="text-slate-400 leading-relaxed">
                  Your pinned repositories, follower count, and total stars are automatically synced directly from the GitHub GraphQL API.
                </p>
              </div>

              <div className="glass-panel p-8 flex flex-col items-start text-left hover:bg-white/4 transition-colors">
                <div className="w-12 h-12 rounded-xl bg-emerald-500/20 flex items-center justify-center text-emerald-400 mb-6">
                  <BookOpen size={24} />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">Blog Integration</h3>
                <p className="text-slate-400 leading-relaxed">
                  Publish an article on DEV.to or Medium? It automatically appears on your profile within minutes via our backend caches.
                </p>
              </div>

              <div className="glass-panel p-8 flex flex-col items-start text-left hover:bg-white/4 transition-colors">
                <div className="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center text-purple-400 mb-6">
                  <Activity size={24} />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">Native Analytics</h3>
                <p className="text-slate-400 leading-relaxed">
                  See exactly how many people view your profile and which custom links they click with our native tracking engine.
                </p>
              </div>

            </section>

            {/* Bottom CTA */}
            <section className="w-full max-w-4xl mt-32 glass-panel p-12 flex flex-col items-center text-center relative overflow-hidden border-blue-500/20">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(59,130,246,0.15),transparent)] pointer-events-none" />
              <h2 className="text-3xl font-bold text-white mb-4 relative z-10">Ready to automate your portfolio?</h2>
              <p className="text-slate-400 mb-8 max-w-lg relative z-10">Join hundreds of developers who have already stopped wasting time manually updating their personal sites.</p>
              
              <div className="relative z-10">
                {token ? (
                  <Link href="/dashboard" className="glass-button px-8 py-3 bg-white/10 hover:bg-white/20 text-white font-medium inline-block">
                    Open Dashboard
                  </Link>
                ) : (
                  <button onClick={handleLogin} className="glass-button px-8 py-3 bg-white text-slate-900 hover:bg-slate-200 font-semibold flex items-center gap-2 cursor-pointer">
                    <Github size={18} /> Get Started Free
                  </button>
                )}
              </div>
            </section>

          </main>
          
          <footer className="relative z-10 text-center pb-8 text-slate-500 text-sm">
            &copy; 2026 Developer Link-in-Bio. Built in public in 14 days.
          </footer>
        </AuthHandler>
      </Suspense>
    </div>
  );
}
