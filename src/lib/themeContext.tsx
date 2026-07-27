'use client';

import { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'default' | 'midnight' | 'forest';

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

import { usePathname } from 'next/navigation';

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window === 'undefined') return 'default';
    const savedTheme = localStorage.getItem('theme') as Theme;
    return savedTheme ?? 'default';
  });
  const pathname = usePathname();

  useEffect(() => {
    // Only apply the user's dashboard theme to the dashboard and homepage
    // Public profile pages will manage their own theme independently
    const isInternalRoute = pathname === '/' || pathname?.startsWith('/dashboard');
    
    if (isInternalRoute) {
      const root = document.documentElement;
      if (theme === 'default') {
        root.removeAttribute('data-theme');
      } else {
        root.setAttribute('data-theme', theme);
      }
      localStorage.setItem('theme', theme);
    }
  }, [theme, pathname]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
