
import React, { useState, useEffect, useCallback } from 'react';
import { AppTab, VideoLesson, CapoeiraEvent } from './types';
import BottomNav from './components/BottomNav';
import TrainingGallery from './components/TrainingGallery';
import CheckInForm from './components/CheckInForm';
import EventAgenda from './components/EventAgenda';
import CommunityChat from './components/CommunityChat';
import MestresHistory from './components/MestresHistory';
import AdminPanel from './components/AdminPanel';
import { VIDEO_LESSONS as INITIAL_VIDEOS, EVENTS as INITIAL_EVENTS } from './constants';
import { User, Bell, Trophy, MapPin, MessageSquare, PlayCircle, Flame, X, ShieldCheck, LogOut, Mail, Lock, ChevronLeft, AlertCircle } from 'lucide-react';

interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'training' | 'agenda' | 'chat' | 'goal';
}

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<AppTab>('home');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showCheckIn, setShowCheckIn] = useState(false);
  const [isAdminMode, setIsAdminMode] = useState(false);
  const [showAdminLogin, setShowAdminLogin] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  
  // Login Form State
  const [adminEmail, setAdminEmail] = useState('');
  const [adminPassword, setAdminPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  // Data State
  const [videoLessons, setVideoLessons] = useState<VideoLesson[]>(INITIAL_VIDEOS);
  const [events, setEvents] = useState<CapoeiraEvent[]>(INITIAL_EVENTS);

  // Push Notification Simulator
  const addNotification = useCallback((title: string, message: string, type: Notification['type']) => {
    const id = Date.now().toString();
    setNotifications(prev => [{ id, title, message, type }, ...prev]);
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== id));
    }, 6000);
  }, []);

  useEffect(() => {
    if (isLoggedIn && !isAdminMode) {
      const timers = [
        setTimeout(() => addNotification('Novo Treino!', 'Mestre Lua postou "Sequências de São Bento Pequeno".', 'training'), 5000),
        setTimeout(() => addNotification('Roda Amanhã!', 'Não esqueça: Roda de Rua na Praça da Sé às 18h.', 'agenda'), 15000),
      ];
      return () => timers.forEach(clearTimeout);
    }
  }, [isLoggedIn, isAdminMode, addNotification]);

  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    
    // Simulated credential check
    if (adminEmail === 'admin@incendeia.com' && adminPassword === 'incendeia123') {
      setIsAdminMode(true);
      setIsLoggedIn(true);
      setShowAdminLogin(false);
    } else {
      setLoginError('Credenciais inválidas. Verifique seu acesso.');
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-red-900 via-red-800 to-black flex flex-col items-center justify-center p-6 text-white overflow-hidden">
        <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mb-6 shadow-[0_0_50px_rgba(220,38,38,0.5)] transition-transform hover:scale-110 duration-500">
          <Flame className="w-14 h-14 text-red-600 fill-current animate-pulse" />
        </div>
        
        {!showAdminLogin ? (
          <div className="w-full max-w-xs space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-black mb-1 tracking-tighter leading-tight">INCENDEIA<br/>CAPOEIRA ACADEMY</h1>
              <p className="text-[10px] opacity-80 uppercase tracking-[0.3em]">Onde o corpo queima e a alma joga</p>
            </div>
            
            <button 
              onClick={() => { setIsAdminMode(false); setIsLoggedIn(true); }}
              className="w-full bg-red-600 text-white font-black py-4 rounded-xl shadow-xl hover:bg-red-700 transition-all active:scale-95 border border-red-500/30 uppercase tracking-widest text-sm"
            >
              Entrar como Aluno
            </button>
            <button 
              onClick={() => setShowAdminLogin(true)}
              className="w-full bg-zinc-900/50 backdrop-blur-sm text-gray-300 font-black py-4 rounded-xl shadow-xl hover:bg-zinc-800 transition-all active:scale-95 border border-zinc-700 uppercase tracking-widest text-sm"
            >
              Acesso Administrador
            </button>
          </div>
        ) : (
          <div className="w-full max-w-xs animate-in slide-in-from-right duration-300">
            <button 
              onClick={() => setShowAdminLogin(false)}
              className="flex items-center gap-2 text-gray-400 mb-6 hover:text-white transition-colors"
            >
              <ChevronLeft size={20} />
              <span className="text-xs font-bold uppercase tracking-widest">Voltar</span>
            </button>

            <h2 className="text-xl font-black uppercase tracking-tight mb-6">Login Administrativo</h2>
            
            <form onSubmit={handleAdminLogin} className="space-y-4">
              <div className="space-y-1">
                <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest">E-mail</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600" size={18} />
                  <input 
                    type="email" 
                    required 
                    value={adminEmail}
                    onChange={(e) => setAdminEmail(e.target.value)}
                    placeholder="adm@incendeia.com"
                    className="w-full bg-zinc-900 border border-zinc-700 rounded-xl py-4 pl-12 pr-4 text-sm focus:border-red-600 outline-none transition-all placeholder:text-zinc-700"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Senha</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600" size={18} />
                  <input 
                    type="password" 
                    required 
                    value={adminPassword}
                    onChange={(e) => setAdminPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full bg-zinc-900 border border-zinc-700 rounded-xl py-4 pl-12 pr-4 text-sm focus:border-red-600 outline-none transition-all placeholder:text-zinc-700"
                  />
                </div>
              </div>

              {loginError && (
                <div className="bg-red-950/30 border border-red-900/50 p-3 rounded-lg flex items-center gap-2 animate-in fade-in zoom-in duration-200">
                  <AlertCircle size={16} className="text-red-500 flex-shrink-0" />
                  <p className="text-[10px] text-red-200 font-bold uppercase leading-tight">{loginError}</p>
                </div>
              )}

              <button 
                type="submit"
                className="w-full bg-red-600 text-white font-black py-4 rounded-xl shadow-xl hover:bg-red-700 transition-all uppercase tracking-widest text-sm"
              >
                Acessar Painel
              </button>
            </form>
          </div>
        )}
        
        <p className="mt-12 text-[10px] opacity-40 uppercase tracking-[0.3em] font-black">Grupo Capoeira Brasil - Elite</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen max-w-md mx-auto bg-black shadow-2xl overflow-hidden relative border-x border-gray-900">
      {/* Toast Notifications */}
      <div className="fixed top-4 left-1/2 -translate-x-1/2 w-full max-w-[340px] z-[60] space-y-2 pointer-events-none px-4">
        {notifications.map(n => (
          <div key={n.id} className="bg-zinc-900 border-l-4 border-red-600 p-4 shadow-2xl rounded-r-xl flex items-start gap-3 pointer-events-auto animate-in slide-in-from-top-4 duration-300">
            <div className="flex-1">
              <h4 className="text-xs font-black text-red-500 uppercase tracking-wider">{n.title}</h4>
              <p className="text-[11px] text-gray-300 mt-0.5">{n.message}</p>
            </div>
            <button onClick={() => setNotifications(prev => prev.filter(x => x.id !== n.id))} className="text-gray-500 hover:text-white">
              <X size={14} />
            </button>
          </div>
        ))}
      </div>

      {/* Header */}
      <header className={`px-6 py-4 flex justify-between items-center ${isAdminMode ? 'bg-red-950/20' : 'bg-black'} border-b border-zinc-800 sticky top-0 z-10 transition-colors`}>
        <div>
          <h2 className="text-lg font-black text-white uppercase tracking-tight">
            {isAdminMode ? 'Painel Admin' : (
              activeTab === 'home' ? 'Bem-vindo, Aluno' :
              activeTab === 'training' ? 'Centro de Treino' :
              activeTab === 'agenda' ? 'Próximas Rodas' :
              activeTab === 'chat' ? 'Comunidade' : 'Nossa Linhagem'
            )}
          </h2>
          <div className="flex items-center gap-1">
            {isAdminMode ? <ShieldCheck size={12} className="text-red-500" /> : <Flame size={12} className="text-red-600 fill-current" />}
            <span className="text-[10px] text-red-500 font-bold uppercase tracking-widest">INCENDEIA ACADEMY</span>
          </div>
        </div>
        <div className="flex gap-2">
          {!isAdminMode && (
            <button className="p-2 bg-zinc-900 rounded-lg border border-zinc-800 relative">
              <Bell size={18} className="text-gray-400"/>
              {notifications.length > 0 && <span className="absolute top-1 right-1 w-2 h-2 bg-red-600 rounded-full border border-black" />}
            </button>
          )}
          <button 
            onClick={() => {
              if (isAdminMode) {
                // If exiting admin mode, go back to choices
                setIsLoggedIn(false);
                setIsAdminMode(false);
              } else {
                // User menu action - simple logout for students in this build
                setIsLoggedIn(false);
              }
            }} 
            className={`p-2 rounded-lg border transition-all ${isAdminMode ? 'bg-red-600 border-red-500 text-white shadow-[0_0_10px_rgba(220,38,38,0.3)]' : 'bg-zinc-900 border-zinc-800 text-gray-400'}`}
            title={isAdminMode ? "Logout Admin" : "Logout Aluno"}
          >
            {isAdminMode ? <LogOut size={18} /> : <User size={18} />}
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto pb-24 scroll-smooth bg-black">
        {isAdminMode ? (
          <AdminPanel 
            videos={videoLessons} 
            setVideos={setVideoLessons}
            events={events}
            setEvents={setEvents}
          />
        ) : (
          <>
            {activeTab === 'home' && (
              <div className="p-6 space-y-6 animate-in fade-in duration-300">
                <div className="bg-gradient-to-br from-red-600 to-red-900 rounded-2xl p-6 text-white shadow-[0_8px_30px_rgb(220,38,38,0.2)] relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-4 opacity-10">
                    <Flame size={120} className="fill-current rotate-12" />
                  </div>
                  <div className="relative z-10">
                    <div className="flex justify-between items-start mb-6">
                      <div>
                        <p className="text-[10px] opacity-70 uppercase tracking-[0.2em] font-black mb-1">Status do Guerreiro</p>
                        <h3 className="text-xl font-black uppercase tracking-tight">Cordão Laranja</h3>
                      </div>
                      <Trophy className="text-white" size={28} />
                    </div>
                    <div className="space-y-3">
                      <div className="flex justify-between text-[10px] font-bold uppercase tracking-wider">
                        <span>Meta Mensal</span>
                        <span>12h / 20h</span>
                      </div>
                      <div className="w-full bg-black/30 h-1.5 rounded-full overflow-hidden">
                        <div className="bg-white h-full w-[60%] shadow-[0_0_10px_white]"></div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <button onClick={() => setShowCheckIn(true)} className="bg-zinc-900 p-4 rounded-xl border border-zinc-800 flex flex-col items-center justify-center gap-2 hover:bg-zinc-800 transition-colors group">
                    <div className="w-10 h-10 bg-red-950 rounded-lg flex items-center justify-center text-red-500 group-hover:scale-110 transition-transform">
                      <PlayCircle size={24} />
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-widest text-gray-300">Check-in</span>
                  </button>
                  <button onClick={() => setActiveTab('agenda')} className="bg-zinc-900 p-4 rounded-xl border border-zinc-800 flex flex-col items-center justify-center gap-2 hover:bg-zinc-800 transition-colors group">
                    <div className="w-10 h-10 bg-zinc-800 rounded-lg flex items-center justify-center text-white group-hover:scale-110 transition-transform">
                      <MapPin size={24} />
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-widest text-gray-300">Agenda</span>
                  </button>
                </div>

                <section>
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="font-black text-xs uppercase tracking-widest text-gray-400">Treinos em Destaque</h3>
                    <button onClick={() => setActiveTab('training')} className="text-red-500 text-[10px] font-black uppercase tracking-tighter">Ver Todos</button>
                  </div>
                  <TrainingGallery videos={videoLessons} compact />
                </section>
              </div>
            )}
            {activeTab === 'training' && <TrainingGallery videos={videoLessons} />}
            {activeTab === 'agenda' && <EventAgenda events={events} />}
            {activeTab === 'chat' && <CommunityChat />}
            {activeTab === 'history' && <MestresHistory />}
          </>
        )}
      </main>

      {showCheckIn && <CheckInForm onClose={() => setShowCheckIn(false)} />}

      <a href="https://wa.me/5511999999999" target="_blank" rel="noopener noreferrer" className="fixed bottom-24 right-6 w-14 h-14 bg-red-600 text-white rounded-full flex items-center justify-center shadow-[0_4px_20px_rgba(220,38,38,0.5)] z-20 hover:scale-110 transition-transform active:scale-95 border-2 border-red-500">
        <MessageSquare size={26} />
      </a>

      {/* Bottom Nav */}
      <BottomNav activeTab={activeTab} onTabChange={(t) => { setActiveTab(t); setIsAdminMode(false); }} />
    </div>
  );
};

export default App;
