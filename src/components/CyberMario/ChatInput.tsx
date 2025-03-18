import React, { useRef, useEffect } from 'react';
import { Send } from 'lucide-react';
import { motion } from 'framer-motion';

interface ChatInputProps {
  value: string;
  onChange: (value: string) => void;
  onSend: () => void;
}

export default function ChatInput({ value, onChange, onSend }: ChatInputProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'Enter' && value.trim()) {
        onSend();
      }
    };

    inputRef.current?.addEventListener('keypress', handleKeyPress);
    return () => {
      inputRef.current?.removeEventListener('keypress', handleKeyPress);
    };
  }, [value, onSend]);

  return (
    <div className="p-4 border-t border-gray-100 bg-white/80 backdrop-blur-sm">
      <div className="flex items-center space-x-2">
        <motion.input
          ref={inputRef}
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Type your message..."
          className="flex-1 px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#3e92cc] focus:border-transparent bg-white"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        />
        <motion.button
          onClick={onSend}
          disabled={!value.trim()}
          className={`p-2 rounded-lg transition-colors ${
            value.trim()
              ? 'bg-gradient-to-r from-[#3e92cc] to-[#2a7ab8] text-white shadow-md hover:shadow-lg'
              : 'bg-gray-100 text-gray-400 cursor-not-allowed'
          }`}
          whileHover={value.trim() ? { scale: 1.05 } : {}}
          whileTap={value.trim() ? { scale: 0.95 } : {}}
        >
          <Send className="w-5 h-5" />
        </motion.button>
      </div>
    </div>
  );
}