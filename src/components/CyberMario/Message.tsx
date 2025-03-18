import React from 'react';
import { motion } from 'framer-motion';
import { Bot } from 'lucide-react';
import { Message as MessageType } from './types';
import { messageVariants, optionButtonVariants } from './animations';

interface MessageProps {
  message: MessageType;
}

export default function Message({ message }: MessageProps) {
  return (
    <motion.div
      className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'} mb-4`}
      variants={messageVariants}
      initial="hidden"
      animate="visible"
      custom={message.type}
    >
      {message.type === 'bot' && (
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#3e92cc] to-[#2a7ab8] flex items-center justify-center flex-shrink-0 mr-2 shadow-lg">
          <Bot className="w-5 h-5 text-white" />
        </div>
      )}
      <div
        className={`
          max-w-[80%] rounded-lg p-4 shadow-md
          ${message.type === 'user'
            ? 'bg-gradient-to-br from-[#3e92cc] to-[#2a7ab8] text-white rounded-br-none'
            : 'bg-white text-gray-800 rounded-bl-none border border-gray-100'
          }
        `}
      >
        <p className="text-sm md:text-base leading-relaxed">{message.content}</p>
        {message.options && (
          <div className="mt-4 space-y-2">
            {message.options.map((option, idx) => (
              <motion.button
                key={idx}
                variants={optionButtonVariants}
                initial="hidden"
                animate="visible"
                whileHover="hover"
                whileTap="tap"
                onClick={() => window.dispatchEvent(new CustomEvent('chatOptionClick', { detail: option }))}
                className="block w-full text-left text-sm md:text-base bg-white text-[#0a2463] px-4 py-2 rounded-lg transition-colors shadow-sm hover:shadow-md"
              >
                {option}
              </motion.button>
            ))}
          </div>
        )}
      </div>
      {message.type === 'user' && (
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#0a2463] to-[#1e3a8a] flex items-center justify-center flex-shrink-0 ml-2 shadow-lg">
          <div className="w-4 h-4 bg-white rounded-full"></div>
        </div>
      )}
    </motion.div>
  );
}