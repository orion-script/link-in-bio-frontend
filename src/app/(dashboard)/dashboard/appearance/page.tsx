'use client';

import { useTheme } from '@/lib/themeContext';
import { Palette, CheckCircle2 } from 'lucide-react';

export default function AppearancePage() {
  const { theme, setTheme } = useTheme();

  const themes = [
    { id: 'default', name: 'Dark Glass', color: '#0f111a', accent: '#3b82f6' },
    { id: 'midnight', name: 'Midnight Blue', color: '#050b14', accent: '#8b5cf6' },
    { id: 'forest', name: 'Forest Green', color: '#06120b', accent: '#10b981' },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <header>
        <h1 className="text-3xl font-bold tracking-tight text-white flex items-center gap-3">
          <Palette size={28} className="text-[var(--accent-color)]" />
          Appearance
        </h1>
        <p className="text-slate-400 mt-2">Customize the look and feel of your public profile.</p>
      </header>

      <div className="glass-panel p-8">
        <h2 className="text-xl font-bold text-white mb-6">Theme Selection</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {themes.map((t) => (
            <button
              key={t.id}
              onClick={() => setTheme(t.id as any)}
              className={`relative flex flex-col items-start p-6 rounded-2xl border-2 transition-all ${
                theme === t.id 
                  ? 'border-[var(--accent-color)] bg-white/10 scale-[1.02] shadow-lg shadow-black/20' 
                  : 'border-white/10 bg-white/5 hover:bg-white/10 hover:border-white/20'
              }`}
            >
              <div 
                className="w-full h-24 rounded-lg mb-4 flex items-center justify-center border border-white/10 shadow-inner"
                style={{ backgroundColor: t.color }}
              >
                <div 
                  className="w-10 h-10 rounded-full flex items-center justify-center shadow-lg"
                  style={{ backgroundColor: t.accent }}
                >
                  {theme === t.id && <CheckCircle2 className="text-white" size={20} />}
                </div>
              </div>
              <h3 className="font-semibold text-white">{t.name}</h3>
              <p className="text-sm text-slate-400 mt-1">
                {theme === t.id ? 'Currently active' : 'Click to select'}
              </p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
