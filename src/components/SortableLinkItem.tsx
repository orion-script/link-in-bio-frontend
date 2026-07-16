'use client';

import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripVertical, Trash2, ExternalLink } from 'lucide-react';

interface SortableLinkItemProps {
  id: string;
  title: string;
  url: string;
  onDelete: (id: string) => void;
}

export function SortableLinkItem({ id, title, url, onDelete }: SortableLinkItemProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`glass-panel p-4 flex items-center gap-4 transition-all ${
        isDragging ? 'opacity-50 ring-2 ring-[var(--accent-color)] shadow-xl z-50 bg-white/10 scale-[1.02]' : 'hover:bg-white/5'
      }`}
    >
      <div 
        {...attributes} 
        {...listeners}
        className="cursor-grab active:cursor-grabbing text-slate-500 hover:text-white p-2 -ml-2 rounded-lg hover:bg-white/10 transition-colors"
      >
        <GripVertical size={20} />
      </div>

      <div className="flex-1 min-w-0">
        <h3 className="font-semibold text-white truncate">{title}</h3>
        <a 
          href={url} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="text-sm text-slate-400 hover:text-[var(--accent-color)] truncate flex items-center gap-1 transition-colors mt-1"
        >
          {url} <ExternalLink size={12} />
        </a>
      </div>

      <button
        onClick={() => onDelete(id)}
        className="p-2 text-slate-500 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-colors"
        title="Delete Link"
      >
        <Trash2 size={18} />
      </button>
    </div>
  );
}
