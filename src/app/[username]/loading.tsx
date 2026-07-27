export default function Loading() {
  return (
    <main 
      className="min-h-screen w-full relative bg-slate-950 flex flex-col items-center py-12 px-4"
    >
      <div className="w-full max-w-2xl space-y-10 animate-pulse">
        
        {/* Profile Header Skeleton */}
        <header className="flex flex-col items-center text-center space-y-4">
          <div className="w-24 h-24 rounded-full bg-slate-800 border-2 border-slate-700 shadow-lg"></div>
          <div className="space-y-2">
            <div className="h-8 w-48 bg-slate-800 rounded-md mx-auto"></div>
            <div className="h-4 w-32 bg-slate-800/50 rounded-md mx-auto"></div>
          </div>
          <div className="h-16 w-full max-w-md bg-slate-800/30 rounded-md"></div>
          <div className="flex gap-4 pt-2">
            <div className="w-10 h-10 rounded-full bg-slate-800"></div>
            <div className="w-10 h-10 rounded-full bg-slate-800"></div>
          </div>
        </header>

        {/* Custom Links Skeleton */}
        <section className="space-y-4">
          <div className="h-16 w-full bg-slate-800/40 rounded-xl"></div>
          <div className="h-16 w-full bg-slate-800/40 rounded-xl"></div>
          <div className="h-16 w-full bg-slate-800/40 rounded-xl"></div>
        </section>

        {/* GitHub Stats Grid Skeleton */}
        <section>
          <div className="h-4 w-32 bg-slate-800 rounded-md mb-4 flex items-center gap-2"></div>
          <div className="grid grid-cols-2 gap-4">
            <div className="h-28 bg-slate-800/40 rounded-xl flex flex-col items-center justify-center"></div>
            <div className="h-28 bg-slate-800/40 rounded-xl flex flex-col items-center justify-center"></div>
          </div>
        </section>

        {/* Recent Articles Skeleton */}
        <section>
          <div className="h-4 w-32 bg-slate-800 rounded-md mb-4 flex items-center gap-2"></div>
          <div className="space-y-4">
            <div className="h-24 w-full bg-slate-800/40 rounded-xl"></div>
            <div className="h-24 w-full bg-slate-800/40 rounded-xl"></div>
          </div>
        </section>

      </div>
    </main>
  );
}
