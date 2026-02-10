
export type AppTab = 'home' | 'training' | 'agenda' | 'chat' | 'history';

export interface VideoLesson {
  id: string;
  title: string;
  category: string;
  duration: string;
  level: 'Iniciante' | 'Intermediário' | 'Avançado';
  thumbnail: string;
}

export interface TrainingLog {
  id: string;
  date: string;
  hours: number;
  description: string;
  videoUrl?: string;
  aiFeedback?: string;
}

export interface CapoeiraEvent {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  lat: number;
  lng: number;
  description: string;
}

export interface ChatMessage {
  id: string;
  sender: string;
  avatar: string;
  text: string;
  timestamp: Date;
  isMe: boolean;
}
