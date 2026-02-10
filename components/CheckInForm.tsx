
import React, { useState } from 'react';
import { X, Upload, Send, Loader2, CheckCircle2, Flame } from 'lucide-react';
import { getTrainingFeedback } from '../services/geminiService';

interface CheckInFormProps {
  onClose: () => void;
}

const CheckInForm: React.FC<CheckInFormProps> = ({ onClose }) => {
  const [hours, setHours] = useState<number>(1);
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const aiResponse = await getTrainingFeedback(description, hours);
    setFeedback(aiResponse);
    setLoading(false);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[70] flex items-end sm:items-center justify-center p-4 animate-in fade-in duration-300">
      <div className="bg-zinc-950 w-full max-w-md rounded-2xl p-6 shadow-2xl border border-zinc-800 animate-in slide-in-from-bottom duration-300">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-2">
            <Flame className="text-red-600" size={20} />
            <h3 className="text-lg font-black text-white uppercase tracking-tighter">Check-in de Treino</h3>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-zinc-900 rounded-full text-gray-400"><X /></button>
        </div>

        {feedback ? (
          <div className="space-y-6 text-center py-4">
            <div className="flex justify-center">
              <div className="w-16 h-16 bg-red-600/20 text-red-500 rounded-full flex items-center justify-center border border-red-500/30">
                <CheckCircle2 size={40} />
              </div>
            </div>
            <div>
              <h4 className="font-black text-lg text-white uppercase tracking-tight mb-2">Relatório do Mestre</h4>
              <div className="bg-zinc-900 p-5 rounded-xl italic text-gray-300 text-sm leading-relaxed border-l-4 border-red-600">
                "{feedback}"
              </div>
            </div>
            <button 
              onClick={onClose}
              className="w-full bg-red-600 text-white font-black py-3 rounded-xl shadow-lg hover:bg-red-700 transition-all uppercase tracking-widest text-xs"
            >
              Valeu, Mestre!
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3">Horas de Suor</label>
              <div className="flex items-center gap-4 bg-zinc-900 p-3 rounded-xl border border-zinc-800">
                <input 
                  type="range" 
                  min="0.5" max="8" step="0.5" 
                  value={hours}
                  onChange={(e) => setHours(parseFloat(e.target.value))}
                  className="flex-1 accent-red-600 bg-zinc-800"
                />
                <span className="w-10 text-right font-black text-red-500 text-sm">{hours}h</span>
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3">O que você incendiou hoje?</label>
              <textarea 
                required
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Descreva sua movimentação e fundamentos..."
                className="w-full bg-zinc-900 border border-zinc-800 rounded-xl p-4 h-24 text-gray-300 text-sm focus:ring-2 focus:ring-red-600 outline-none transition-all placeholder:text-gray-600"
              />
            </div>

            <div>
              <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3">Evidência de Progresso (Vídeo)</label>
              <div className="border-2 border-dashed border-zinc-800 rounded-xl p-6 flex flex-col items-center justify-center gap-2 bg-zinc-900 hover:bg-zinc-800 transition-colors cursor-pointer relative group">
                <Upload className="text-gray-500 group-hover:text-red-500 transition-colors" />
                <span className="text-[10px] text-gray-500 font-bold uppercase tracking-tight">{file ? file.name : 'Selecionar vídeo do treino'}</span>
                <input 
                  type="file" 
                  accept="video/*" 
                  onChange={handleFileChange}
                  className="absolute inset-0 opacity-0 cursor-pointer"
                />
              </div>
            </div>

            <button 
              type="submit"
              disabled={loading}
              className="w-full bg-red-600 text-white font-black py-4 rounded-xl shadow-lg hover:bg-red-700 transition-all disabled:opacity-50 flex items-center justify-center gap-2 uppercase tracking-[0.2em] text-xs"
            >
              {loading ? <Loader2 className="animate-spin" /> : <Send size={16} />}
              {loading ? 'Processando...' : 'Registrar Treino'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default CheckInForm;
