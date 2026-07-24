'use client';

import { Settings, ShieldAlert, Mail } from 'lucide-react';

export default function SettingsPage() {
  return (
    <div className="space-y-8 animate-in fade-in duration-500 max-w-3xl">
      <header className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white flex items-center gap-3">
            <Settings size={28} className="text-blue-500" />
            Account Settings
          </h1>
          <p className="text-slate-400 mt-1">Manage your account preferences and security.</p>
        </div>
      </header>

      <div className="glass-panel p-8 space-y-6">
        <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <Mail className="text-slate-400" size={20} />
          Email Preferences
        </h2>
        <div className="space-y-4 border-b border-white/10 pb-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium text-white">Monthly Analytics Report</h3>
              <p className="text-sm text-slate-400">Receive a summary of your profile views and link clicks.</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" defaultChecked />
              <div className="w-11 h-6 bg-white/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
            </label>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium text-white">Product Updates</h3>
              <p className="text-sm text-slate-400">Hear about new features and major updates first.</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" />
              <div className="w-11 h-6 bg-white/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
            </label>
          </div>
        </div>

        <h2 className="text-xl font-bold text-red-400 pt-2 flex items-center gap-2">
          <ShieldAlert size={20} />
          Danger Zone
        </h2>
        <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h3 className="font-medium text-white mb-1">Delete Account</h3>
            <p className="text-sm text-slate-400">
              Permanently delete your account and all of your content. This action cannot be undone.
            </p>
          </div>
          <button className="px-6 py-2 rounded-xl border border-red-500/50 text-red-400 hover:bg-red-500 hover:text-white transition-colors font-medium whitespace-nowrap">
            Delete Account
          </button>
        </div>
      </div>
    </div>
  );
}
