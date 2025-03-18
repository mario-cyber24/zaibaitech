import React from 'react';
import { motion } from 'framer-motion';
import { Bot } from 'lucide-react';
import { typingIndicatorVariants } from './animations';

export default function TypingIndicator() {
  return (
    <motion.div
      className="flex items-center space-x-2"
      variants={typingIndicatorVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#3e92cc] to-[#2a7ab8] flex items-center justify-center flex-shrink-0 shadow-lg">
        <Bot className="w-5 h-5 text-white" />
      </div>
      <div className="bg-white rounded-lg p-4 shadow-md inline-flex items-center space-x-1">
        <motion.div
          className="w-2 h-2 bg-[#3e92cc] rounded-full"
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
        />
        <motion.div
          className="w-2 h-2 bg-[#3e92cc] rounded-full"
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
        />
        <motion.div
          className="w-2 h-2 bg-[#3e92cc] rounded-full"
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }}
        />
      </div>
    </motion.div>
  );
}