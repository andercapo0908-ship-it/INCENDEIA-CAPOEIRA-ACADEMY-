
import React from 'react';
import { Home, Play, Calendar, MessageCircle, BookOpen } from 'lucide-react';
import { AppTab } from '../types';

interface BottomNavProps {
  activeTab: AppTab;
  onTabChange: (tab: AppTab) => void;
}

const BottomNav: React.FC<BottomNavProps> = ({ activeTab, onTabChange }) => {
  const tabs = [
    { id: 'home', label: 'Início', icon: Home },
    { id: 'training', label: 'Aulas', icon: Play },
    { id: 'agenda', label: 'Agenda', icon: Calendar },
    { id: 'chat', label: 'Chat', icon: MessageCircle },
    { id: 'history', label: 'História', icon: BookOpen },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-zinc-950 border-t border-zinc-800 px-6 py-3 flex justify-between items-center z-30 max-w-md mx-auto">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id as AppTab)}
            className={`flex flex-col items-center gap-1 transition-all ${
              isActive ? 'text-red-500 scale-110' : 'text-gray-500 hover:text-gray-300'
            }`}
          >
            <Icon size={20} fill={isActive ? 'currentColor' : 'none'} className={isActive ? 'drop-shadow-[0_0_8px_rgb(239,68,68,0.5)]' : ''} />
            <span className={`text-[8px] font-black uppercase tracking-tighter ${isActive ? 'opacity-100' : 'opacity-60'}`}>{tab.label}</span>
          </button>
        );
      })}
    </nav>
  );
};

export default BottomNav;
