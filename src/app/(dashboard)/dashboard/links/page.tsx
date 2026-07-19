'use client';

import { useState } from 'react';
import { 
  DndContext, 
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { SortableLinkItem } from '@/components/SortableLinkItem';
import { Link2, Plus } from '@/components/Icons';

export default function LinksPage() {
  const [links, setLinks] = useState([
    { id: '1', title: 'My Portfolio', url: 'https://myportfolio.com' },
    { id: '2', title: 'Twitter', url: 'https://twitter.com/dev' },
    { id: '3', title: 'LinkedIn', url: 'https://linkedin.com/in/dev' },
  ]);

  const [newTitle, setNewTitle] = useState('');
  const [newUrl, setNewUrl] = useState('');

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: any) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      setLinks((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);
        
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  const handleAddLink = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle || !newUrl) return;
    
    const newLink = {
      id: Math.random().toString(36).substring(7),
      title: newTitle,
      url: newUrl,
    };
    
    setLinks([newLink, ...links]);
    setNewTitle('');
    setNewUrl('');
  };

  const handleDelete = (id: string) => {
    setLinks(links.filter((link) => link.id !== id));
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <header>
        <h1 className="text-3xl font-bold tracking-tight text-white flex items-center gap-3">
          <Link2 size={28} className="text-[var(--accent-color)]" />
          My Links
        </h1>
        <p className="text-slate-400 mt-2">Add and reorder the custom links you want to display on your profile.</p>
      </header>

      {/* Add New Link Form */}
      <div className="glass-panel p-6">
        <form onSubmit={handleAddLink} className="flex flex-col md:flex-row gap-4 items-end">
          <div className="flex-1 space-y-2 w-full">
            <label className="text-sm font-medium text-slate-300">Link Title</label>
            <input 
              type="text" 
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              placeholder="e.g. My Portfolio" 
              className="glass-input w-full"
              required
            />
          </div>
          <div className="flex-1 space-y-2 w-full">
            <label className="text-sm font-medium text-slate-300">URL</label>
            <input 
              type="url" 
              value={newUrl}
              onChange={(e) => setNewUrl(e.target.value)}
              placeholder="https://..." 
              className="glass-input w-full"
              required
            />
          </div>
          <button type="submit" className="glass-button px-6 py-[13px] flex items-center justify-center gap-2 font-medium bg-[var(--accent-color)] text-white border-transparent hover:bg-[var(--accent-color)] hover:brightness-110 mb-0.5 w-full md:w-auto">
            <Plus size={18} />
            Add Link
          </button>
        </form>
      </div>

      {/* Sortable List */}
      <div>
        <h2 className="text-xl font-bold text-white mb-4">Your Links</h2>
        <DndContext 
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext 
            items={links.map(l => l.id)}
            strategy={verticalListSortingStrategy}
          >
            <div className="space-y-3">
              {links.map((link) => (
                <SortableLinkItem 
                  key={link.id} 
                  id={link.id}
                  title={link.title}
                  url={link.url}
                  onDelete={handleDelete}
                />
              ))}
              {links.length === 0 && (
                <div className="text-center p-12 glass-panel border-dashed">
                  <p className="text-slate-400">You haven't added any custom links yet.</p>
                </div>
              )}
            </div>
          </SortableContext>
        </DndContext>
      </div>
    </div>
  );
}
