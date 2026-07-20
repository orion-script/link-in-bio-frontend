'use client';
import { useEffect, useState, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';

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

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    setToken(null);
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-50 flex flex-col items-center justify-center p-8 font-(family-name:--font-geist-sans)">
      <Suspense fallback={<div className="text-white">Loading...</div>}>
        <AuthHandler setToken={setToken}>
          <main className="max-w-3xl w-full flex flex-col items-center gap-8 text-center">
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight bg-linear-to-br from-white to-neutral-500 text-transparent bg-clip-text">
              Developer Link-in-Bio
            </h1>
            <p className="text-xl text-neutral-400 max-w-xl">
              A dynamic, zero-maintenance portfolio that auto-syncs your GitHub commits, repos, and latest articles.
            </p>

            {token ? (
              <div className="flex flex-col items-center gap-4 mt-8 p-8 border border-neutral-800 rounded-2xl bg-neutral-900/50 backdrop-blur-sm w-full max-w-md">
                <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center text-green-400 mb-2">
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h2 className="text-2xl font-semibold">Successfully Authenticated</h2>
                <p className="text-neutral-400 text-sm">Your JWT token is stored securely.</p>
                <div className="flex gap-3 mt-4">
                  <Link
                    href="/dashboard"
                    className="px-6 py-2 rounded-full bg-white text-black font-medium hover:bg-neutral-200 transition-colors text-sm cursor-pointer inline-block"
                  >
                    Go to Dashboard
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="px-6 py-2 rounded-full border border-neutral-700 hover:bg-neutral-800 transition-colors text-sm cursor-pointer"
                  >
                    Sign out
                  </button>
                </div>
              </div>
            ) : (
              <button
                onClick={handleLogin}
                className="mt-8 flex items-center gap-3 bg-white text-black px-8 py-4 rounded-full font-semibold hover:bg-neutral-200 transition-all hover:scale-105 active:scale-95 cursor-pointer"
              >
                <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="css-i6dzq1"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
                Continue with GitHub
              </button>
            )}
          </main>
        </AuthHandler>
      </Suspense>
    </div>
  );
}
