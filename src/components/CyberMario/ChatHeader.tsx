import React from 'react';
import { Bot, ChevronDown, ChevronUp, X } from 'lucide-react';
import { motion } from 'framer-motion';

interface ChatHeaderProps {
  isMinimized: boolean;
  onMinimize: () => void;
  onClose: () => void;
}

export default function ChatHeader({ isMinimized, onMinimize, onClose }: ChatHeaderProps) {
  return (
    <motion.div
      className="bg-gradient-to-r from-[#0a2463] to-[#1e3a8a] text-white p-4 rounded-t-lg"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="relative">
            <motion.div
              animate={{
                scale: [1, 1.1, 1],
                rotate: [0, 5, -5, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatDelay: 4,
              }}
            >
              <Bot className="w-6 h-6" />
            </motion.div>
            <motion.div
              className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"
              animate={{
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
              }}
            />
          </div>
          <div>
            <motion.span
              className="font-semibold"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              Cyber Mario
            </motion.span>
            <motion.p
              className="text-xs text-gray-300"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              Security Assistant
            </motion.p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <motion.button
            onClick={onMinimize}
            className="text-white hover:text-gray-200 transition-colors p-1"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            {isMinimized ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
          </motion.button>
          <motion.button
            onClick={onClose}
            className="text-white hover:text-gray-200 transition-colors p-1"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <X className="w-5 h-5" />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}