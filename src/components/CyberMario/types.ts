export interface Message {
  type: 'user' | 'bot';
  content: string;
  timestamp: Date;
  options?: string[];
}

export interface Tool {
  id: 'assessment' | 'consultation' | 'builder';
  name: string;
  icon: React.FC<{ className?: string }>;
  description: string;
}