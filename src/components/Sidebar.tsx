import Link from 'next/link';
import { LayoutDashboard, Link2, Palette, User, Settings } from '@/components/Icons';

export default function Sidebar() {
  const links = [
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { name: 'My Links', href: '/dashboard/links', icon: Link2 },
    { name: 'Appearance', href: '/dashboard/appearance', icon: Palette },
    { name: 'Profile', href: '/dashboard/profile', icon: User },
    { name: 'Settings', href: '/dashboard/settings', icon: Settings },
  ];

  return (
    <aside 
      style={{ width: 'var(--sidebar-width)' }} 
      className="h-screen fixed left-0 top-0 border-r border-white/10 bg-white/5 backdrop-blur-xl p-6 flex flex-col"
    >
      <div className="mb-10 flex items-center gap-2">
        <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center font-bold text-white shadow-lg shadow-blue-500/20">
          D
        </div>
        <h1 className="text-xl font-bold tracking-tight">DevLink</h1>
      </div>

      <nav className="flex-1 space-y-2">
        {links.map((link) => {
          const Icon = link.icon;
          return (
            <Link 
              key={link.name} 
              href={link.href}
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-300 hover:text-white hover:bg-white/10 transition-all active:scale-95"
            >
              <Icon size={20} />
              <span className="font-medium">{link.name}</span>
            </Link>
          );
        })}
      </nav>

      <div className="pt-6 border-t border-white/10 mt-auto">
        <Link 
          href="/"
          className="flex items-center justify-center gap-2 px-4 py-2 w-full text-sm font-medium text-slate-400 hover:text-white transition-colors"
        >
          Sign Out
        </Link>
      </div>
    </aside>
  );
}
