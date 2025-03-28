import React, { useState } from 'react';
import { motion } from 'framer-motion';

const AIBusinessCards: React.FC = () => {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  const cards = [
    {
      title: 'Infuse AI into your business',
      subtitle: 'Integrate AI into your existing business processes',
      colorClass: 'bg-green-400',
      icon: (
        <svg viewBox="0 0 200 200" className="w-full h-full">
          <defs>
            <linearGradient id="gridGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#4A90E2" stopOpacity="0.7" />
              <stop offset="50%" stopColor="#50C878" stopOpacity="0.7" />
              <stop offset="100%" stopColor="#FFD700" stopOpacity="0.7" />
            </linearGradient>
          </defs>
          <g transform="translate(50, 50)">
            <rect x="0" y="0" width="100" height="100" 
              fill="url(#gridGradient1)" 
              strokeWidth="2" 
              stroke="rgba(255,255,255,0.3)"
            />
            <path 
              d="M0,0 L100,0 L100,100 L0,100 Z" 
              fill="none" 
              stroke="rgba(255,255,255,0.5)" 
              strokeDasharray="5,5"
            />
          </g>
        </svg>
      )
    },
    {
      title: 'Secure your AI outcomes',
      subtitle: 'Eliminate common AI risks with built-in governance guardrails',
      colorClass: 'bg-purple-300',
      icon: (
        <svg viewBox="0 0 200 200" className="w-full h-full">
          <defs>
            <linearGradient id="gridGradient2" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#4A90E2" stopOpacity="0.7" />
              <stop offset="50%" stopColor="#50C878" stopOpacity="0.7" />
              <stop offset="100%" stopColor="#FFD700" stopOpacity="0.7" />
            </linearGradient>
          </defs>
          <g transform="translate(50, 50)">
            <rect x="0" y="0" width="100" height="100" 
              fill="url(#gridGradient2)" 
              strokeWidth="2" 
              stroke="rgba(255,255,255,0.3)"
            />
            <path 
              d="M0,0 L100,0 L100,100 L0,100 Z" 
              fill="none" 
              stroke="rgba(255,255,255,0.5)" 
              strokeDasharray="5,5"
            />
          </g>
        </svg>
      )
    },
    {
      title: 'Empower your AI teams',
      subtitle: 'Maximize team impact with built-in collaboration and orchestration',
      colorClass: 'bg-yellow-300',
      icon: (
        <svg viewBox="0 0 200 200" className="w-full h-full">
          <defs>
            <linearGradient id="gridGradient3" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#4A90E2" stopOpacity="0.7" />
              <stop offset="50%" stopColor="#50C878" stopOpacity="0.7" />
              <stop offset="100%" stopColor="#FFD700" stopOpacity="0.7" />
            </linearGradient>
          </defs>
          <g transform="translate(50, 50)">
            <rect x="0" y="0" width="100" height="100" 
              fill="url(#gridGradient3)" 
              strokeWidth="2" 
              stroke="rgba(255,255,255,0.3)"
            />
            <path 
              d="M0,0 L100,0 L100,100 L0,100 Z" 
              fill="none" 
              stroke="rgba(255,255,255,0.5)" 
              strokeDasharray="5,5"
            />
          </g>
        </svg>
      )
    }
  ];

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-6xl">
        {cards.map((card, index) => (
          <motion.div 
            key={index} 
            className={`
              relative overflow-hidden rounded-2xl shadow-lg 
              ${hoveredCard === index ? card.colorClass : 'bg-gray-200'}
              transition-all duration-500 ease-in-out
            `}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              duration: 0.5, 
              delay: index * 0.2,
              type: "spring",
              stiffness: 100
            }}
            onHoverStart={() => setHoveredCard(index)}
            onHoverEnd={() => setHoveredCard(null)}
          >
            <div className="p-6 relative z-10">
              <motion.div 
                className="h-32 w-32 mx-auto mb-6 text-gray-600 opacity-80"
                animate={{
                  rotate: hoveredCard === index ? [0, 5, -5, 0] : 0,
                  scale: hoveredCard === index ? 1.1 : 1
                }}
                transition={{ duration: 0.3 }}
              >
                {card.icon}
              </motion.div>
              
              <h2 className={`
                text-2xl font-bold text-center mb-4 
                ${hoveredCard === index ? 'text-gray-900' : 'text-gray-700'}
                transition-colors duration-500
              `}>
                {card.title}
              </h2>
              
              <p className={`
                text-center mb-6 
                ${hoveredCard === index ? 'text-gray-800' : 'text-gray-600'}
                transition-colors duration-500
              `}>
                {card.subtitle}
              </p>
              
              <motion.button 
                className={`
                  mx-auto block px-6 py-3 rounded-full 
                  ${hoveredCard === index 
                    ? 'bg-white/50 text-gray-900' 
                    : 'bg-gray-300/30 text-gray-700'}
                  backdrop-blur-sm hover:bg-white/50 
                  transition-all duration-500
                `}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Explore our products →
              </motion.button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default AIBusinessCards;