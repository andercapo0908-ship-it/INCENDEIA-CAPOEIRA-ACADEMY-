
import React, { useState } from 'react';
import { VideoLesson } from '../types';
import { Play, BarChart } from 'lucide-react';

interface TrainingGalleryProps {
  compact?: boolean;
  videos: VideoLesson[];
}

const TrainingGallery: React.FC<TrainingGalleryProps> = ({ compact = false, videos }) => {
  const [filter, setFilter] = useState('Todos');
  const categories = ['Todos', 'Fundamentos', 'Ataques', 'Defesa', 'Movimentação'];

  const filteredVideos = compact 
    ? videos.slice(0, 2)
    : filter === 'Todos' ? videos : videos.filter(v => v.category === filter);

  return (
    <div className={compact ? "" : "p-6"}>
      {!compact && (
        <div className="flex gap-2 overflow-x-auto pb-4 mb-6 no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-4 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${
                filter === cat ? 'bg-red-600 text-white shadow-lg' : 'bg-zinc-900 text-gray-500 border border-zinc-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      )}

      <div className="space-y-4">
        {filteredVideos.map((video) => (
          <div key={video.id} className="bg-zinc-900 rounded-xl overflow-hidden border border-zinc-800 group shadow-lg">
            <div className="relative aspect-video">
              <img src={video.thumbnail} alt={video.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 grayscale group-hover:grayscale-0" />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="bg-red-600 rounded-full p-3 shadow-xl">
                  <Play className="text-white fill-current ml-1" size={32} />
                </div>
              </div>
              <span className="absolute bottom-2 right-2 bg-black/80 text-white text-[9px] font-bold px-2 py-1 rounded border border-zinc-700">
                {video.duration}
              </span>
            </div>
            <div className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-[9px] font-black text-red-500 uppercase bg-red-950/50 px-2 py-0.5 rounded border border-red-900/50">
                  {video.category}
                </span>
                <div className="flex items-center gap-1 text-gray-500 text-[9px] font-bold uppercase">
                  <BarChart size={10} />
                  <span>{video.level}</span>
                </div>
              </div>
              <h4 className="font-bold text-gray-200 text-sm leading-tight uppercase tracking-tight">{video.title}</h4>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrainingGallery;
