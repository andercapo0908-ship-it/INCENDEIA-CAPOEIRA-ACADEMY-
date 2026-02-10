
import React, { useState, useRef, useEffect } from 'react';
import { MOCK_CHATS } from '../constants';
import { Send, Image as ImageIcon, Smile, Flame } from 'lucide-react';

const CommunityChat: React.FC = () => {
  const [messages, setMessages] = useState(MOCK_CHATS);
  const [input, setInput] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const newMessage = {
      id: Date.now().toString(),
      sender: 'Você',
      avatar: 'https://i.pravatar.cc/150?u=me',
      text: input,
      timestamp: new Date(),
      isMe: true
    };

    setMessages([...messages, newMessage]);
    setInput('');

    setTimeout(() => {
      const response = {
        id: (Date.now() + 1).toString(),
        sender: 'Mestre Lua',
        avatar: 'https://i.pravatar.cc/150?u=lua',
        text: 'Axé! Mantenham o fogo do treino aceso! 🔥',
        timestamp: new Date(),
        isMe: false
      };
      setMessages(prev => [...prev, response]);
    }, 1500);
  };

  return (
    <div className="flex flex-col h-full bg-black">
      <div className="px-4 py-2 border-b border-zinc-900 bg-zinc-950 flex items-center justify-between">
         <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-red-600 rounded-full animate-pulse shadow-[0_0_8px_red]" />
            <span className="text-[10px] font-black text-white uppercase tracking-widest">Chat Online</span>
         </div>
         <span className="text-[9px] font-bold text-gray-500 uppercase tracking-tighter">14 Alunos ativos</span>
      </div>

      <div ref={scrollRef} className="flex-1 p-4 space-y-4 overflow-y-auto no-scrollbar">
        <div className="text-center py-4">
          <span className="bg-zinc-900 border border-zinc-800 text-gray-500 text-[9px] px-3 py-1 rounded-full uppercase font-black tracking-widest">Início da Conversa</span>
        </div>
        
        {messages.map((msg) => (
          <div key={msg.id} className={`flex gap-3 ${msg.isMe ? 'flex-row-reverse' : ''}`}>
            {!msg.isMe && (
              <img src={msg.avatar} alt={msg.sender} className="w-8 h-8 rounded-lg shadow-lg border border-zinc-800 flex-shrink-0" />
            )}
            <div className={`max-w-[80%] ${msg.isMe ? 'items-end' : 'items-start'} flex flex-col`}>
              {!msg.isMe && (
                <div className="flex items-center gap-1 mb-1 ml-1">
                  <span className="text-[9px] font-black text-red-500 uppercase tracking-tighter">{msg.sender}</span>
                  {msg.sender === 'Mestre Lua' && <Flame size={8} className="text-red-500 fill-current" />}
                </div>
              )}
              <div className={`p-3 rounded-2xl text-xs shadow-xl ${
                msg.isMe 
                  ? 'bg-red-600 text-white rounded-tr-none border border-red-500 shadow-red-900/20' 
                  : 'bg-zinc-900 text-gray-200 rounded-tl-none border border-zinc-800'
              }`}>
                {msg.text}
              </div>
              <span className="text-[8px] font-bold text-gray-600 mt-1 uppercase">
                {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="p-4 bg-zinc-950 border-t border-zinc-900">
        <form onSubmit={handleSend} className="flex items-center gap-2">
          <button type="button" className="p-2 text-gray-600 hover:text-red-500 transition-colors"><ImageIcon size={18}/></button>
          <div className="flex-1 relative">
            <input 
              type="text" 
              placeholder="Fale com a comunidade..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="w-full bg-zinc-900 border border-zinc-800 rounded-full pl-4 pr-10 py-3 text-xs text-gray-200 focus:outline-none focus:ring-2 focus:ring-red-600 transition-all placeholder:text-gray-600"
            />
            <button type="button" className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600 hover:text-red-500"><Smile size={18}/></button>
          </div>
          <button 
            type="submit"
            className="w-10 h-10 bg-red-600 text-white rounded-full flex items-center justify-center shadow-[0_4px_15px_rgba(220,38,38,0.4)] hover:bg-red-700 active:scale-90 transition-all"
          >
            <Send size={16} fill="currentColor" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default CommunityChat;
