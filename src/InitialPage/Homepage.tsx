// HomePage.tsx
import React from 'react';
import { motion } from 'framer-motion';
import {
  Brain,
  TrendingUp,
  Clock,
  AlertCircle,
  Users,
  LineChart,
  Factory,
  Shield,
} from 'lucide-react';

const features = [
  {
    icon: Brain,
    title: 'Advanced AI',
    desc: 'Experience next-level machine learning & neural networks.',
  },
  {
    icon: TrendingUp,
    title: 'Predictive Analytics',
    desc: 'Accurate forecasting to empower data-driven decisions.',
  },
  {
    icon: Clock,
    title: 'Real-Time Insights',
    desc: 'Immediate updates on anomalies and emerging trends.',
  },
  {
    icon: AlertCircle,
    title: 'Risk Mitigation',
    desc: 'Identify and respond to critical events before they happen.',
  },
  {
    icon: Users,
    title: 'Customer Analysis',
    desc: 'Optimize engagement & retention using AI-driven metrics.',
  },
  {
    icon: LineChart,
    title: 'Demand Forecasting',
    desc: 'Strategize inventory with precision predictions.',
  },
  {
    icon: Factory,
    title: 'Predictive Maintenance',
    desc: 'Reduce downtime with early detection of equipment failures.',
  },
  {
    icon: Shield,
    title: 'Fraud Detection',
    desc: 'Protect your business with robust anomaly detection.',
  },
];

const HomePage: React.FC = () => {
  return (
    <div className="relative w-full min-h-screen bg-gradient-to-br from-[#2A0034] via-[#3F0341] to-[#6E0F67] text-white overflow-hidden">
      {/* Animated Gradient Orbs / Shapes */}
      <div className="pointer-events-none absolute inset-0">
        {/* Orb 1 */}
        <motion.div
          className="absolute w-96 h-96 bg-purple-400 rounded-full mix-blend-screen filter blur-3xl opacity-30"
          animate={{ x: [0, 200, 0], y: [0, -200, 0] }}
          transition={{ duration: 10, repeat: Infinity, repeatType: 'mirror' }}
        />
        {/* Orb 2 */}
        <motion.div
          className="absolute w-80 h-80 bg-pink-500 rounded-full mix-blend-screen filter blur-3xl opacity-25 top-1/2 left-1/2"
          animate={{ x: [-100, 100, -100], y: [0, 100, 0] }}
          transition={{ duration: 15, repeat: Infinity, repeatType: 'mirror' }}
        />
        {/* Subtle Particle Background */}
        {[...Array(25)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-purple-200 rounded-full"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{ y: [0, -20, 0] }}
            transition={{
              duration: 5 + Math.random() * 5,
              repeat: Infinity,
              repeatType: 'mirror',
              delay: Math.random() * 3,
            }}
          />
        ))}
      </div>

      {/* Hero Section */}
      <div className="relative flex flex-col items-center justify-center h-[90vh] text-center px-4">
        <motion.h1
          className="text-4xl md:text-6xl font-extrabold mb-4"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          PACX.AI
        </motion.h1>
        <motion.h2
          className="text-xl md:text-2xl text-purple-100 mb-8 max-w-2xl"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          Revolutionizing Automated Predictive Analytics with Futuristic AI
        </motion.h2>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-purple-600 hover:bg-purple-700 px-8 py-3 rounded-full font-semibold text-white"
        >
          Chat With Gen AI
        </motion.button>
      </div>

      {/* Features Section */}
      <div className="relative py-16 px-4 max-w-6xl mx-auto">
        <motion.h3
          className="text-3xl md:text-4xl font-bold text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          Key Capabilities
        </motion.h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={idx}
                className="bg-purple-800/40 backdrop-blur-sm p-6 rounded-xl shadow-xl hover:shadow-2xl transition-all"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
              >
                <div className="flex items-center justify-center mb-4">
                  <Icon className="w-8 h-8 text-purple-200" />
                </div>
                <h4 className="text-lg font-bold mb-2">{item.title}</h4>
                <p className="text-sm text-purple-100">{item.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* CTA Section */}
      <div className="relative py-16 px-4 max-w-3xl mx-auto text-center">
        <motion.h3
          className="text-3xl md:text-4xl font-bold mb-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Ready to Dive In?
        </motion.h3>
        <motion.p
          className="text-purple-100 mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Start your journey with PACX.AI and unlock the power of automated predictive analytics.
        </motion.p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-purple-600 hover:bg-purple-700 px-6 py-3 rounded-full font-semibold text-white"
        >
          Get Started for Free
        </motion.button>
      </div>
    </div>
  );
};

export default HomePage;
