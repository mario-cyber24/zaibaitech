import React, { useState, useEffect, useRef } from 'react';
import { Bot, Send, X, ChevronDown, ChevronUp, Shield, Code, Lock } from 'lucide-react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { useChatStore } from './store';
import { Message, Tool } from './types';
import SecurityAssessmentTool from '../SecurityAssessmentTool';
import ConsultationTool from '../SecurityConsultation/ConsultationTool';
import WebsiteBuilder from '../SecureWebsiteBuilder/WebsiteBuilder';

const MessageTransition = React.forwardRef<HTMLDivElement, { message: Message; index: number }>(
  ({ message, index }, ref) => (
    <div
      ref={ref}
      className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'} mb-4`}
    >
      {message.type === 'bot' && (
        <div className="w-8 h-8 rounded-full bg-[#3e92cc] flex items-center justify-center flex-shrink-0 mr-2">
          <Bot className="w-5 h-5 text-white" />
        </div>
      )}
      <div
        className={`max-w-[80%] rounded-lg p-4 ${
          message.type === 'user'
            ? 'bg-[#3e92cc] text-white rounded-br-none'
            : 'bg-gray-100 text-gray-800 rounded-bl-none'
        }`}
      >
        <p className="text-sm md:text-base leading-relaxed">{message.content}</p>
        {message.options && (
          <div className="mt-4 space-y-2">
            {message.options.map((option, idx) => (
              <button
                key={idx}
                onClick={() => window.dispatchEvent(new CustomEvent('chatOptionClick', { detail: option }))}
                className="block w-full text-left text-sm md:text-base bg-white text-[#0a2463] px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors shadow-sm"
              >
                {option}
              </button>
            ))}
          </div>
        )}
      </div>
      {message.type === 'user' && (
        <div className="w-8 h-8 rounded-full bg-[#0a2463] flex items-center justify-center flex-shrink-0 ml-2">
          <div className="w-4 h-4 bg-white rounded-full"></div>
        </div>
      )}
    </div>
  )
);

MessageTransition.displayName = 'MessageTransition';

export default function CyberMario() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const chatRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const nodeRef = useRef(null);

  const { messages, addMessage, activeTool, setActiveTool } = useChatStore();

  const tools: Tool[] = [
    {
      id: 'assessment',
      name: 'Security Assessment',
      icon: Shield,
      description: 'Scan your website for security vulnerabilities'
    },
    {
      id: 'consultation',
      name: 'AI Consultation',
      icon: Lock,
      description: 'Get personalized security recommendations'
    },
    {
      id: 'builder',
      name: 'Website Builder',
      icon: Code,
      description: 'Build a secure website from templates'
    }
  ];

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    const handleOptionClick = (event: CustomEvent<string>) => {
      handleOptionSelect(event.detail);
    };

    window.addEventListener('chatOptionClick', handleOptionClick as EventListener);

    return () => {
      window.removeEventListener('chatOptionClick', handleOptionClick as EventListener);
    };
  }, []);

  useEffect(() => {
    if (isOpen && !messages.length) {
      setIsTyping(true);
      setTimeout(() => {
        addMessage({
          type: 'bot',
          content: "Hi, I'm Cyber Mario, your security assistant from ZaiBai Tech! 👋 I can help you secure your digital assets using our powerful security tools. What would you like to do today?",
          timestamp: new Date(),
          options: [
            'Scan my website for vulnerabilities',
            'Get security recommendations',
            'Build a secure website'
          ]
        });
        setIsTyping(false);
      }, 1000);
    }
  }, [isOpen, messages.length, addMessage]);

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = () => {
    if (!inputValue.trim()) return;

    addMessage({
      type: 'user',
      content: inputValue,
      timestamp: new Date()
    });

    processUserInput(inputValue);
    setInputValue('');
  };

  const handleOptionSelect = (option: string) => {
    addMessage({
      type: 'user',
      content: option,
      timestamp: new Date()
    });

    processUserInput(option);
  };

  const processUserInput = (input: string) => {
    const lowerInput = input.toLowerCase();
    setIsTyping(true);

    setTimeout(() => {
      if (lowerInput.includes('scan') || lowerInput.includes('vulnerability')) {
        setActiveTool('assessment');
        addMessage({
          type: 'bot',
          content: "I'll help you scan your website for security vulnerabilities. Please enter your website URL to begin the assessment.",
          timestamp: new Date()
        });
      } else if (lowerInput.includes('recommend') || lowerInput.includes('consultation')) {
        setActiveTool('consultation');
        addMessage({
          type: 'bot',
          content: "I'll guide you through our AI-powered security consultation. Let's start by understanding your organization's security needs.",
          timestamp: new Date()
        });
      } else if (lowerInput.includes('build') || lowerInput.includes('website')) {
        setActiveTool('builder');
        addMessage({
          type: 'bot',
          content: "I'll help you build a secure website using our templates. Let's find the perfect security configuration for your needs.",
          timestamp: new Date()
        });
      } else {
        addMessage({
          type: 'bot',
          content: "I can help you with website security assessment, AI security consultation, or building a secure website. Which would you like to explore?",
          timestamp: new Date(),
          options: [
            'Scan my website for vulnerabilities',
            'Get security recommendations',
            'Build a secure website'
          ]
        });
      }
      setIsTyping(false);
    }, 1000);
  };

  const chatWindowClasses = `
    fixed bg-white rounded-lg shadow-xl z-50 transition-all duration-300
    ${isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}
    ${isMinimized ? 'h-16' : 'h-[600px]'}
    ${isMobile 
      ? 'bottom-0 left-0 right-0 m-0 w-full rounded-b-none' 
      : 'bottom-4 right-4 w-96'
    }
  `;

  return (
    <>
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className={`
            fixed bg-[#0a2463] text-white p-4 rounded-full shadow-lg hover:bg-[#1e3a8a] 
            transition-colors z-50 group
            ${isMobile ? 'bottom-4 right-4' : 'bottom-8 right-8'}
          `}
        >
          <Bot className="w-6 h-6 group-hover:scale-110 transition-transform" />
        </button>
      )}

      <div className={chatWindowClasses}>
        {/* Header */}
        <div className="bg-gradient-to-r from-[#0a2463] to-[#1e3a8a] text-white p-4 rounded-t-lg flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <Bot className="w-6 h-6" />
              <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
            </div>
            <div>
              <span className="font-semibold">Cyber Mario</span>
              <p className="text-xs text-gray-300">Security Assistant</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setIsMinimized(!isMinimized)}
              className="text-white hover:text-gray-200 transition-colors p-1"
            >
              {isMinimized ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
            </button>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white hover:text-gray-200 transition-colors p-1"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {!isMinimized && (
          <>
            {/* Chat Messages */}
            <div 
              ref={chatRef} 
              className={`
                overflow-y-auto p-4 space-y-4
                ${isMobile ? 'h-[calc(100vh-8rem)]' : 'h-[456px]'}
              `}
            >
              <TransitionGroup>
                {messages.map((message, index) => (
                  <CSSTransition
                    key={index}
                    timeout={300}
                    classNames="message"
                    nodeRef={nodeRef}
                  >
                    <MessageTransition ref={nodeRef} message={message} index={index} />
                  </CSSTransition>
                ))}
              </TransitionGroup>
              {isTyping && (
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 rounded-full bg-[#3e92cc] flex items-center justify-center flex-shrink-0">
                    <Bot className="w-5 h-5 text-white" />
                  </div>
                  <div className="bg-gray-100 rounded-lg p-4 inline-flex items-center space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                  </div>
                </div>
              )}
            </div>

            {/* Active Tool */}
            {activeTool && (
              <div 
                className={`
                  overflow-y-auto absolute inset-0 top-16 bg-white rounded-b-lg
                  ${isMobile ? 'h-[calc(100vh-4rem)]' : 'h-[456px]'}
                `}
              >
                <div className="p-4">
                  <button
                    onClick={() => setActiveTool(null)}
                    className="text-[#3e92cc] hover:text-[#0a2463] font-semibold mb-4 flex items-center"
                  >
                    <ChevronUp className="w-5 h-5 mr-1 rotate-90" />
                    Back to Chat
                  </button>
                  {activeTool === 'assessment' && <SecurityAssessmentTool />}
                  {activeTool === 'consultation' && <ConsultationTool />}
                  {activeTool === 'builder' && <WebsiteBuilder />}
                </div>
              </div>
            )}

            {/* Input Area */}
            <div className="p-4 border-t">
              <div className="flex items-center space-x-2">
                <input
                  ref={inputRef}
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Type your message..."
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3e92cc] focus:border-transparent"
                />
                <button
                  onClick={handleSend}
                  disabled={!inputValue.trim()}
                  className={`p-2 rounded-lg transition-colors ${
                    inputValue.trim()
                      ? 'bg-[#3e92cc] text-white hover:bg-[#357eaf]'
                      : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  }`}
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}