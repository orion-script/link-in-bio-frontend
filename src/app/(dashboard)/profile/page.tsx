'use client';

import { useState } from 'react';
import { User, Save, Github, Twitter, Linkedin, Loader } from 'lucide-react';

export default function ProfilePage() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  
  // Mock state since we haven't built the PATCH /users/:id route
  const [formData, setFormData] = useState({
    displayName: 'Orion Script',
    bio: 'Full-stack developer building cool things on the internet. Next.js, NestJS, and TypeScript enthusiast.',
    githubUrl: 'https://github.com/orion-script',
    twitterUrl: 'https://x.com/orionscript',
    linkedinUrl: 'https://linkedin.com/in/orionscript'
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setSuccess(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API request
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    }, 1000);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500 max-w-3xl">
      <header className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white flex items-center gap-3">
            <User size={28} className="text-blue-500" />
            Profile Details
          </h1>
          <p className="text-slate-400 mt-1">Manage your public profile information and social links.</p>
        </div>
      </header>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="glass-panel p-8 space-y-6">
          <h2 className="text-xl font-bold text-white mb-4">Basic Information</h2>
          
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-300">Display Name</label>
            <input 
              type="text" 
              name="displayName"
              value={formData.displayName}
              onChange={handleChange}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors"
              placeholder="Your Name"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-300">Bio</label>
            <textarea 
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              rows={4}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors resize-none"
              placeholder="Tell us about yourself..."
            />
            <p className="text-xs text-slate-500 text-right">{formData.bio.length} / 160</p>
          </div>
        </div>

        <div className="glass-panel p-8 space-y-6">
          <h2 className="text-xl font-bold text-white mb-4">Social Links</h2>
          
          <div className="space-y-4">
            <div className="relative">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                <Github size={18} />
              </div>
              <input 
                type="url" 
                name="githubUrl"
                value={formData.githubUrl}
                onChange={handleChange}
                className="w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors"
                placeholder="https://github.com/yourusername"
              />
            </div>

            <div className="relative">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                <Twitter size={18} />
              </div>
              <input 
                type="url" 
                name="twitterUrl"
                value={formData.twitterUrl}
                onChange={handleChange}
                className="w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors"
                placeholder="https://x.com/yourusername"
              />
            </div>

            <div className="relative">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                <Linkedin size={18} />
              </div>
              <input 
                type="url" 
                name="linkedinUrl"
                value={formData.linkedinUrl}
                onChange={handleChange}
                className="w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors"
                placeholder="https://linkedin.com/in/yourusername"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end pt-4">
          <button 
            type="submit" 
            disabled={loading}
            className={`flex items-center gap-2 px-6 py-3 rounded-full font-semibold transition-all ${
              success 
                ? 'bg-emerald-500 text-white' 
                : 'bg-blue-500 hover:bg-blue-600 text-white hover:scale-105 active:scale-95 shadow-lg shadow-blue-500/20'
            }`}
          >
            {loading ? (
               <Loader size={18} className="animate-spin" />
            ) : success ? (
               <Save size={18} />
            ) : (
               <Save size={18} />
            )}
            {loading ? 'Saving...' : success ? 'Saved!' : 'Save Changes'}
          </button>
        </div>
      </form>
    </div>
  );
}
