import { create } from 'zustand';
import { Message } from './types';

interface ChatState {
  messages: Message[];
  activeTool: 'assessment' | 'consultation' | 'builder' | null;
  addMessage: (message: Message) => void;
  setActiveTool: (tool: 'assessment' | 'consultation' | 'builder' | null) => void;
}

export const useChatStore = create<ChatState>((set) => ({
  messages: [],
  activeTool: null,
  addMessage: (message) => set((state) => ({ messages: [...state.messages, message] })),
  setActiveTool: (tool) => set({ activeTool: tool })
}));