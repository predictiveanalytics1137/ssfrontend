
import { useState, useEffect, useRef } from 'react';

import {
  Send,
  User as UserIcon,
  Bot,
  MessageSquare,
} from 'lucide-react';
import { motion } from 'framer-motion';

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

const ChatInterface = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    // Add the user's message to the chat
    const newMessage: Message = {
      id: Date.now().toString(),
      content: inputMessage,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages([...messages, newMessage]);
    setInputMessage('');
    setIsLoading(true);

    try {
      // Send the user's message to the backend
      const response = await fetch('http://localhost:8000/api/chat/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: inputMessage }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();

      // Add the bot's response to the chat
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: data.response,
        sender: 'bot',
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botResponse]);
    } catch (error) {
      console.error('Error fetching response:', error);
      // Optionally, add an error message to the chat
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content:
          'Error: Unable to get a response. Please try again later.',
        sender: 'bot',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  // Scroll to the bottom when new messages are added
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="flex flex-col h-screen">
      {/* Header */}
      <div className="bg-teal-600 p-4 flex items-center shadow-md">
        <Bot className="w-6 h-6 text-white mr-2" />
        <h1 className="text-xl font-semibold text-white">
          Chat Assistant
        </h1>
      </div>

      {/* Chat Container */}
      <div
        className="flex-1 overflow-y-auto p-4"
        style={{
          background: 'linear-gradient(to bottom, #e0f7fa, #fff)',
        }}
      >
        {messages.length === 0 ? (
          // Placeholder when there are no messages
          <div className="flex flex-col items-center justify-center h-full text-center text-gray-700">
            <MessageSquare className="w-16 h-16 text-teal-700 mb-4" />
            <h2 className="text-2xl font-semibold mb-2">
              Welcome to AI-powered Chat Assistant
            </h2>
            <p className="mb-4">
              Ask me anything or start by typing a message below.
            </p>
            <p className="text-sm text-gray-500">
              I'm here to help you with predictive analytics.
            </p>
          </div>
        ) : (
          // Chat messages
          <div className="space-y-4">
            {messages.map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className={`flex ${
                  message.sender === 'user'
                    ? 'justify-end'
                    : 'justify-start'
                }`}
              >
                <div
                  className={`flex items-end max-w-xs md:max-w-sm lg:max-w-md ${
                    message.sender === 'user' ? 'flex-row-reverse' : ''
                  }`}
                >
                  {/* Avatar */}
                  <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center">
                    {message.sender === 'user' ? (
                      <UserIcon className="w-5 h-5 text-gray-600" />
                    ) : (
                      <Bot className="w-5 h-5 text-gray-600" />
                    )}
                  </div>
                  {/* Message Bubble */}
                  <div
                    className={`mx-2 p-3 rounded-2xl relative shadow ${
                      message.sender === 'user'
                        ? 'bg-teal-600 text-white'
                        : 'bg-white text-gray-800'
                    }`}
                  >
                    <p className="text-sm">{message.content}</p>
                    <span
                      className={`text-xs mt-1 block ${
                        message.sender === 'user'
                          ? 'text-teal-200 text-right'
                          : 'text-gray-500'
                      }`}
                    >
                      {message.timestamp.toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </span>
                    {/* Tail Triangle */}
                    <div
                      className={`absolute bottom-0 ${
                        message.sender === 'user'
                          ? '-right-1 transform translate-x-full'
                          : '-left-1 transform -translate-x-full'
                      } w-0 h-0 border-t-8 border-t-transparent ${
                        message.sender === 'user'
                          ? 'border-l-8 border-l-teal-600'
                          : 'border-r-8 border-r-white'
                      }`}
                    ></div>
                  </div>
                </div>
              </motion.div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3, repeat: Infinity, repeatType: 'reverse' }}
                  className="flex items-center space-x-2 p-3 bg-white rounded-2xl shadow"
                >
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-teal-600 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-teal-600 rounded-full animate-bounce delay-75"></div>
                    <div className="w-2 h-2 bg-teal-600 rounded-full animate-bounce delay-150"></div>
                  </div>
                  <span className="text-sm text-gray-500">Typing...</span>
                </motion.div>
              </div>
            )}
            {/* Dummy div to maintain scroll position */}
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      {/* Input Area */}
      <div className="bg-white p-4 shadow-inner">
        <div className="flex items-center border rounded-full px-4 py-2 shadow-sm">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder="Type your message..."
            className="flex-1 focus:outline-none text-gray-700"
          />
          <button
            onClick={handleSendMessage}
            className={`ml-2 text-white rounded-full p-2 ${
              inputMessage.trim()
                ? 'bg-teal-600 hover:bg-teal-700'
                : 'bg-gray-300 cursor-not-allowed'
            }`}
            disabled={!inputMessage.trim()}
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;
