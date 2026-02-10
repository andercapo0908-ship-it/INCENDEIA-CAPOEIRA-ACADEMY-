
import React, { useState } from 'react';
import { VideoLesson, CapoeiraEvent } from '../types';
import { Plus, Trash2, Edit3, Save, X, Film, Calendar, Settings2 } from 'lucide-react';

interface AdminPanelProps {
  videos: VideoLesson[];
  setVideos: React.Dispatch<React.SetStateAction<VideoLesson[]>>;
  events: CapoeiraEvent[];
  setEvents: React.Dispatch<React.SetStateAction<CapoeiraEvent[]>>;
}

const AdminPanel: React.FC<AdminPanelProps> = ({ videos, setVideos, events, setEvents }) => {
  const [activeSubTab, setActiveSubTab] = useState<'videos' | 'events'>('videos');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);

  // Form States
  const [vTitle, setVTitle] = useState('');
  const [vCat, setVCat] = useState('Fundamentos');
  const [vLevel, setVLevel] = useState('Iniciante');
  const [vDuration, setVDuration] = useState('10:00');
  
  const [eTitle, setETitle] = useState('');
  const [eLocation, setELocation] = useState('');
  const [eDate, setEDate] = useState('');
  const [eTime, setETime] = useState('');

  const resetForms = () => {
    setVTitle(''); setVCat('Fundamentos'); setVLevel('Iniciante'); setVDuration('10:00');
    setETitle(''); setELocation(''); setEDate(''); setETime('');
    setEditingItem(null);
    setIsFormOpen(false);
  };

  const handleEdit = (item: any) => {
    setEditingItem(item);
    if (activeSubTab === 'videos') {
      setVTitle(item.title); setVCat(item.category); setVLevel(item.level); setVDuration(item.duration);
    } else {
      setETitle(item.title); setELocation(item.location); setEDate(item.date); setETime(item.time);
    }
    setIsFormOpen(true);
  };

  const handleDelete = (id: string) => {
    if (confirm('Deseja realmente excluir este item?')) {
      if (activeSubTab === 'videos') setVideos(prev => prev.filter(v => v.id !== id));
      else setEvents(prev => prev.filter(e => e.id !== id));
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (activeSubTab === 'videos') {
      const newItem: VideoLesson = {
        id: editingItem?.id || Date.now().toString(),
        title: vTitle,
        category: vCat,
        level: vLevel as any,
        duration: vDuration,
        thumbnail: editingItem?.thumbnail || `https://picsum.photos/seed/${vTitle}/400/225`
      };
      if (editingItem) setVideos(prev => prev.map(v => v.id === editingItem.id ? newItem : v));
      else setVideos(prev => [newItem, ...prev]);
    } else {
      const newItem: CapoeiraEvent = {
        id: editingItem?.id || Date.now().toString(),
        title: eTitle,
        location: eLocation,
        date: eDate,
        time: eTime,
        lat: 0, lng: 0,
        description: 'Evento atualizado via painel.'
      };
      if (editingItem) setEvents(prev => prev.map(ev => ev.id === editingItem.id ? newItem : ev));
      else setEvents(prev => [newItem, ...prev]);
    }
    resetForms();
  };

  return (
    <div className="p-6 min-h-full animate-in fade-in duration-300">
      <div className="flex bg-zinc-900 p-1 rounded-xl mb-6 border border-zinc-800">
        <button 
          onClick={() => setActiveSubTab('videos')}
          className={`flex-1 py-3 rounded-lg flex items-center justify-center gap-2 text-[10px] font-black uppercase tracking-widest transition-all ${activeSubTab === 'videos' ? 'bg-red-600 text-white shadow-lg' : 'text-gray-500'}`}
        >
          <Film size={14} /> Vídeos
        </button>
        <button 
          onClick={() => setActiveSubTab('events')}
          className={`flex-1 py-3 rounded-lg flex items-center justify-center gap-2 text-[10px] font-black uppercase tracking-widest transition-all ${activeSubTab === 'events' ? 'bg-red-600 text-white shadow-lg' : 'text-gray-500'}`}
        >
          <Calendar size={14} /> Eventos
        </button>
      </div>

      <div className="space-y-3">
        {(activeSubTab === 'videos' ? videos : events).map((item: any) => (
          <div key={item.id} className="bg-zinc-900 p-4 rounded-xl border border-zinc-800 flex items-center justify-between group">
            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-black text-gray-200 truncate uppercase tracking-tight">{item.title}</h4>
              <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mt-1">
                {activeSubTab === 'videos' ? `${item.category} • ${item.level}` : `${item.date} • ${item.location.split(',')[0]}`}
              </p>
            </div>
            <div className="flex gap-2">
              <button onClick={() => handleEdit(item)} className="p-2 bg-zinc-800 text-gray-400 hover:text-red-500 rounded-lg transition-colors"><Edit3 size={16}/></button>
              <button onClick={() => handleDelete(item.id)} className="p-2 bg-zinc-800 text-gray-400 hover:text-red-600 rounded-lg transition-colors"><Trash2 size={16}/></button>
            </div>
          </div>
        ))}
      </div>

      {/* FAB */}
      <button 
        onClick={() => { resetForms(); setIsFormOpen(true); }}
        className="fixed bottom-28 right-6 w-14 h-14 bg-red-600 text-white rounded-full flex items-center justify-center shadow-2xl border-2 border-red-500 animate-bounce"
      >
        <Plus size={28} />
      </button>

      {/* Form Modal */}
      {isFormOpen && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-md z-[80] flex items-center justify-center p-4">
          <div className="bg-zinc-950 w-full max-w-sm rounded-2xl border border-zinc-800 shadow-2xl overflow-hidden animate-in zoom-in duration-200">
            <div className="p-6 border-b border-zinc-900 flex justify-between items-center bg-red-950/20">
              <div className="flex items-center gap-2">
                <Settings2 size={18} className="text-red-500" />
                <h3 className="text-sm font-black text-white uppercase tracking-widest">{editingItem ? 'Editar' : 'Adicionar'} {activeSubTab === 'videos' ? 'Vídeo' : 'Evento'}</h3>
              </div>
              <button onClick={() => setIsFormOpen(false)} className="text-gray-500 hover:text-white"><X size={20}/></button>
            </div>
            
            <form onSubmit={handleSave} className="p-6 space-y-4">
              {activeSubTab === 'videos' ? (
                <>
                  <div className="space-y-1">
                    <label className="text-[9px] font-black text-gray-500 uppercase tracking-widest">Título da Aula</label>
                    <input required value={vTitle} onChange={e => setVTitle(e.target.value)} className="w-full bg-zinc-900 border border-zinc-800 p-3 rounded-lg text-sm text-white focus:border-red-600 outline-none" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-[9px] font-black text-gray-500 uppercase tracking-widest">Categoria</label>
                      <select value={vCat} onChange={e => setVCat(e.target.value)} className="w-full bg-zinc-900 border border-zinc-800 p-3 rounded-lg text-sm text-white outline-none">
                        <option>Fundamentos</option><option>Ataques</option><option>Defesa</option><option>Movimentação</option>
                      </select>
                    </div>
                    <div className="space-y-1">
                      <label className="text-[9px] font-black text-gray-500 uppercase tracking-widest">Nível</label>
                      <select value={vLevel} onChange={e => setVLevel(e.target.value)} className="w-full bg-zinc-900 border border-zinc-800 p-3 rounded-lg text-sm text-white outline-none">
                        <option>Iniciante</option><option>Intermediário</option><option>Avançado</option>
                      </select>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <label className="text-[9px] font-black text-gray-500 uppercase tracking-widest">Duração</label>
                    <input required value={vDuration} onChange={e => setVDuration(e.target.value)} className="w-full bg-zinc-900 border border-zinc-800 p-3 rounded-lg text-sm text-white focus:border-red-600 outline-none" placeholder="Ex: 12:40" />
                  </div>
                </>
              ) : (
                <>
                  <div className="space-y-1">
                    <label className="text-[9px] font-black text-gray-500 uppercase tracking-widest">Nome do Evento</label>
                    <input required value={eTitle} onChange={e => setETitle(e.target.value)} className="w-full bg-zinc-900 border border-zinc-800 p-3 rounded-lg text-sm text-white focus:border-red-600 outline-none" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[9px] font-black text-gray-500 uppercase tracking-widest">Localização</label>
                    <input required value={eLocation} onChange={e => setELocation(e.target.value)} className="w-full bg-zinc-900 border border-zinc-800 p-3 rounded-lg text-sm text-white focus:border-red-600 outline-none" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-[9px] font-black text-gray-500 uppercase tracking-widest">Data</label>
                      <input type="date" required value={eDate} onChange={e => setEDate(e.target.value)} className="w-full bg-zinc-900 border border-zinc-800 p-3 rounded-lg text-sm text-white outline-none" />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[9px] font-black text-gray-500 uppercase tracking-widest">Hora</label>
                      <input type="time" required value={eTime} onChange={e => setETime(e.target.value)} className="w-full bg-zinc-900 border border-zinc-800 p-3 rounded-lg text-sm text-white outline-none" />
                    </div>
                  </div>
                </>
              )}

              <button type="submit" className="w-full bg-red-600 text-white font-black py-4 rounded-xl shadow-lg hover:bg-red-700 transition-all flex items-center justify-center gap-2 uppercase tracking-widest text-[10px] mt-4">
                <Save size={16} /> Salvar Alterações
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPanel;
