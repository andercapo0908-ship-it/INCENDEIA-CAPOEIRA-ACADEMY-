
import React, { useState } from 'react';
import { CapoeiraEvent } from '../types';
import { MapPin, Calendar, Search, ExternalLink, Loader2, Flame } from 'lucide-react';
import { searchRodasWithGrounding } from '../services/geminiService';

interface EventAgendaProps {
  events: CapoeiraEvent[];
}

const EventAgenda: React.FC<EventAgendaProps> = ({ events }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [aiResults, setAiResults] = useState<{ text: string, links: any[] } | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery) return;
    setLoading(true);
    const results = await searchRodasWithGrounding(searchQuery);
    setAiResults(results);
    setLoading(false);
  };

  return (
    <div className="p-6 space-y-8 bg-black min-h-full">
      <section>
        <div className="flex items-center gap-2 mb-4">
          <Search className="text-red-500" size={18} />
          <h3 className="font-black text-xs uppercase tracking-[0.2em] text-gray-400">Rastrear Rodas</h3>
        </div>
        <form onSubmit={handleSearch} className="relative mb-6 group">
          <input 
            type="text" 
            placeholder="Onde será a próxima vadiagem?"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-4 bg-zinc-900 border border-zinc-800 rounded-xl shadow-xl text-gray-200 text-sm focus:ring-2 focus:ring-red-600 outline-none transition-all placeholder:text-gray-600"
          />
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600 group-focus-within:text-red-500 transition-colors" size={20} />
          <button 
            type="submit"
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-red-600 text-white px-4 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest"
          >
            Buscar
          </button>
        </form>

        {loading && (
          <div className="flex flex-col items-center justify-center p-12 space-y-3">
            <Loader2 className="animate-spin text-red-600" />
            <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Consultando Oráculo...</span>
          </div>
        )}

        {aiResults && (
          <div className="bg-zinc-900 border border-zinc-800 p-5 rounded-2xl shadow-2xl relative overflow-hidden animate-in fade-in zoom-in duration-300">
            <h4 className="text-[10px] font-black text-red-500 uppercase tracking-widest mb-3 flex items-center gap-1">
              <Flame size={12} className="fill-current" />
              Sinalização INCENDEIA
            </h4>
            <p className="text-xs text-gray-300 mb-4 leading-relaxed font-medium">{aiResults.text}</p>
            {aiResults.links.length > 0 && (
              <div className="space-y-2">
                {aiResults.links.map((link, idx) => (
                  <a key={idx} href={link.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-[10px] font-black text-red-500 hover:text-white transition-colors bg-red-950/20 p-2 rounded-lg border border-red-900/30 uppercase tracking-tighter">
                    <ExternalLink size={14} />
                    {link.title}
                  </a>
                ))}
              </div>
            )}
          </div>
        )}
      </section>

      <section>
        <div className="flex items-center gap-2 mb-4">
          <Calendar className="text-red-500" size={18} />
          <h3 className="font-black text-xs uppercase tracking-[0.2em] text-gray-400">Eventos da Academia</h3>
        </div>
        <div className="space-y-4">
          {events.map((event) => (
            <div key={event.id} className="bg-zinc-950 p-4 rounded-xl shadow-lg border border-zinc-900 flex gap-4 hover:border-red-900/50 transition-colors">
              <div className="bg-red-950/40 text-red-500 w-16 h-16 rounded-xl border border-red-900/30 flex flex-col items-center justify-center flex-shrink-0">
                <span className="text-[9px] font-black uppercase tracking-tighter opacity-70">{event.date.split('-')[1]}</span>
                <span className="text-2xl font-black">{event.date.split('-')[2]}</span>
              </div>
              <div className="flex-1">
                <h4 className="font-black text-gray-200 text-sm leading-tight mb-1 uppercase tracking-tight">{event.title}</h4>
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[9px] text-gray-500 mb-2 font-bold uppercase tracking-wider">
                  <div className="flex items-center gap-1"><Calendar size={10} className="text-red-600" /><span>{event.time}</span></div>
                  <div className="flex items-center gap-1"><MapPin size={10} className="text-red-600" /><span>{event.location.split(',')[0]}</span></div>
                </div>
                <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(event.location)}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-[9px] font-black text-red-500 mt-4 uppercase tracking-[0.2em]">
                  <MapPin size={10} /> Abrir Trajeto
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default EventAgenda;
