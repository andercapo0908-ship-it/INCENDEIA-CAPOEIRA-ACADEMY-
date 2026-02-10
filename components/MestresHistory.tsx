
import React from 'react';
import { BookOpen, Star, Camera, ChevronRight, Flame } from 'lucide-react';

const MestresHistory: React.FC = () => {
  const masters = [
    { name: 'Mestre Bimba', title: 'A Chama Regional', img: 'https://picsum.photos/seed/bimba/200' },
    { name: 'Mestre Pastinha', title: 'Alma da Angola', img: 'https://picsum.photos/seed/pastinha/200' },
    { name: 'Mestre Boneco', title: 'Fundador Incendeia', img: 'https://picsum.photos/seed/boneco/200' },
  ];

  const gallery = [
    'https://picsum.photos/seed/hist1/400/400',
    'https://picsum.photos/seed/hist2/400/400',
    'https://picsum.photos/seed/hist3/400/400',
    'https://picsum.photos/seed/hist4/400/400',
    'https://picsum.photos/seed/hist5/400/400',
    'https://picsum.photos/seed/hist6/400/400',
  ];

  return (
    <div className="p-6 space-y-8 animate-in slide-in-from-right duration-300 bg-black min-h-full">
      {/* Group Story */}
      <section>
        <div className="flex items-center gap-2 mb-4">
          <div className="w-8 h-8 bg-red-600 rounded-lg flex items-center justify-center shadow-lg shadow-red-900/20">
            <BookOpen className="text-white" size={18} />
          </div>
          <h3 className="font-black text-xs uppercase tracking-[0.2em] text-gray-400">Origens do Fogo</h3>
        </div>
        <div className="bg-zinc-900 p-6 rounded-2xl shadow-xl border border-zinc-800 leading-relaxed text-xs text-gray-400 space-y-4 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-5">
             <Flame size={100} className="text-red-600 fill-current" />
          </div>
          <p className="relative z-10">
            A <strong>INCENDEIA CAPOEIRA ACADEMY</strong> nasceu do desejo de unir a tradição ancestral dos grandes mestres com a intensidade de um treinamento de elite moderno.
          </p>
          <p className="relative z-10">
            Fundada em 1998, nossa academia não apenas ensina a arte, mas forja caráter através do suor e do ritmo. Nosso lema é o fogo que nunca se apaga dentro da roda.
          </p>
          <button className="text-red-500 font-black uppercase tracking-tighter flex items-center gap-1 mt-4 text-[10px]">
            Explorar Linha do Tempo <ChevronRight size={14} />
          </button>
        </div>
      </section>

      {/* Masters Section */}
      <section>
        <div className="flex items-center gap-2 mb-4">
          <div className="w-8 h-8 bg-zinc-900 rounded-lg border border-zinc-800 flex items-center justify-center">
            <Star className="text-red-500" size={18} />
          </div>
          <h3 className="font-black text-xs uppercase tracking-[0.2em] text-gray-400">Linhagem Sagrada</h3>
        </div>
        <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar">
          {masters.map((m, idx) => (
            <div key={idx} className="flex-shrink-0 w-32 text-center group">
              <div className="relative mb-3">
                <img src={m.img} alt={m.name} className="w-32 h-32 rounded-2xl object-cover shadow-2xl border border-zinc-800 grayscale group-hover:grayscale-0 group-hover:border-red-600 transition-all" />
                <div className="absolute inset-0 bg-gradient-to-t from-red-600/60 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center pb-2">
                  <span className="text-white text-[9px] font-black uppercase tracking-widest">Ver Perfil</span>
                </div>
              </div>
              <h4 className="font-black text-white text-[10px] uppercase tracking-tight">{m.name}</h4>
              <p className="text-[8px] text-red-500 uppercase font-black tracking-widest mt-0.5">{m.title}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Photo Gallery */}
      <section>
        <div className="flex items-center gap-2 mb-4">
          <div className="w-8 h-8 bg-zinc-900 rounded-lg border border-zinc-800 flex items-center justify-center">
            <Camera className="text-red-500" size={18} />
          </div>
          <h3 className="font-black text-xs uppercase tracking-[0.2em] text-gray-400">Registros do Asfalto</h3>
        </div>
        <div className="grid grid-cols-3 gap-2">
          {gallery.map((img, idx) => (
            <div key={idx} className="relative group overflow-hidden rounded-lg shadow-xl border border-zinc-800 aspect-square">
              <img 
                src={img} 
                alt="Gallery" 
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-500" 
              />
              <div className="absolute inset-0 bg-red-600/20 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default MestresHistory;
