
import React from 'react';
import { VideoLesson, CapoeiraEvent, ChatMessage } from './types';

export const VIDEO_LESSONS: VideoLesson[] = [
  { id: '1', title: 'Ginga Básica e Postura', category: 'Fundamentos', duration: '12:40', level: 'Iniciante', thumbnail: 'https://picsum.photos/seed/ginga/400/225' },
  { id: '2', title: 'Martelo Cruzado de Encontro', category: 'Ataques', duration: '08:15', level: 'Intermediário', thumbnail: 'https://picsum.photos/seed/martelo/400/225' },
  { id: '3', title: 'Queda de Rins e Transições', category: 'Movimentação', duration: '15:20', level: 'Avançado', thumbnail: 'https://picsum.photos/seed/queda/400/225' },
  { id: '4', title: 'Esquiva Baixa e Lateral', category: 'Defesa', duration: '10:05', level: 'Iniciante', thumbnail: 'https://picsum.photos/seed/esquiva/400/225' },
];

export const EVENTS: CapoeiraEvent[] = [
  { id: '1', title: 'Roda de Rua - Praça da Sé', date: '2024-11-15', time: '18:00', location: 'Praça da Sé, São Paulo', lat: -23.5505, lng: -46.6333, description: 'Roda aberta tradicional com Mestres convidados.' },
  { id: '2', title: 'Batizado e Troca de Cordas', date: '2024-12-01', time: '09:00', location: 'Ginásio Municipal', lat: -23.5600, lng: -46.6400, description: 'Evento anual de graduação dos alunos.' },
];

export const MOCK_CHATS: ChatMessage[] = [
  { id: '1', sender: 'Mestre Lua', avatar: 'https://i.pravatar.cc/150?u=lua', text: 'Axé pessoal! Quem vem pro treino hoje?', timestamp: new Date(Date.now() - 3600000), isMe: false },
  { id: '2', sender: 'Instrutor Sol', avatar: 'https://i.pravatar.cc/150?u=sol', text: 'Eu estarei lá! Vamos focar em quedas.', timestamp: new Date(Date.now() - 1800000), isMe: false },
  { id: '3', sender: 'Você', avatar: 'https://i.pravatar.cc/150?u=me', text: 'Chegando em 15 minutos!', timestamp: new Date(Date.now() - 600000), isMe: true },
];
