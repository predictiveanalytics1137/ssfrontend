import React from 'react';
import { TrendingUp, Boxes, Cpu, Network, ArrowRight, Sparkles } from 'lucide-react';
import { Card, CardContent } from '../components/ui/card';
import { useNavigate } from 'react-router-dom';

const PacxLanding7 = () => {
  const navigate = useNavigate();
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-purple-950 via-purple-900 to-indigo-950 text-white overflow-hidden">
      {/* Enhanced tech background animations */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Animated grid overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff15_1px,transparent_1px),linear-gradient(to_bottom,#ffffff15_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black_70%)]" />
        
        {/* Floating tech elements */}
        <div className="absolute inset-0">
          {/* Large orbital rings */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-purple-500/30 rounded-full animate-[spin_20s_linear_infinite]" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-purple-400/20 rounded-full animate-[spin_15s_linear_infinite_reverse]" />
          
          {/* Digital circuit lines */}
          <div className="absolute top-0 left-0 w-full h-full">
            <div className="absolute top-[20%] left-[10%] w-32 h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent animate-pulse" />
            <div className="absolute top-[40%] right-[15%] w-48 h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent animate-pulse delay-300" />
            <div className="absolute bottom-[30%] left-[25%] w-40 h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent animate-pulse delay-700" />
          </div>

          {/* Tech nodes */}
          <div className="absolute top-1/4 left-1/4 w-3 h-3 bg-purple-400 rounded-full animate-ping [animation-duration:3s]" />
          <div className="absolute top-3/4 right-1/4 w-3 h-3 bg-purple-400 rounded-full animate-ping [animation-duration:2.5s] delay-300" />
          <div className="absolute top-1/2 right-1/3 w-3 h-3 bg-purple-400 rounded-full animate-ping [animation-duration:4s] delay-500" />
          
          {/* Data streams */}
          <div className="absolute h-full w-px bg-gradient-to-b from-transparent via-purple-500/40 to-transparent left-1/4 animate-data-stream" />
          <div className="absolute h-full w-px bg-gradient-to-b from-transparent via-purple-500/40 to-transparent left-2/4 animate-data-stream delay-500" />
          <div className="absolute h-full w-px bg-gradient-to-b from-transparent via-purple-500/40 to-transparent right-1/4 animate-data-stream delay-1000" />

          {/* Glowing orbs */}
          <div className="absolute top-1/4 right-1/4 w-32 h-32 bg-purple-500/10 rounded-full blur-3xl animate-glow" />
          <div className="absolute bottom-1/3 left-1/3 w-40 h-40 bg-indigo-500/10 rounded-full blur-3xl animate-glow delay-700" />
          
          {/* Digital particles */}
          <div className="absolute inset-0">
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className="absolute w-1 h-1 bg-purple-400/40 rounded-full"
                style={{
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                  animation: `float ${5 + Math.random() * 5}s linear infinite`,
                  animationDelay: `${Math.random() * 5}s`
                }}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
        {/* Header section */}
        <div className="mb-20 space-y-6">
          <div className="flex items-center space-x-3 mb-4">
            <span className="px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-sm text-sm font-medium">
              AI-Powered Analytics
            </span>
            <Sparkles className="w-5 h-5 text-purple-300" />
          </div>
          <h1 className="text-5xl lg:text-7xl font-bold">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-purple-200 to-purple-400">
              pacx.ai
            </span>
          </h1>
          <div className="flex items-center text-gray-300 space-x-3">
            <span className="text-xl">Powered by</span>
            <TrendingUp className="w-6 h-6 text-purple-400" />
            <span className="text-xl font-light">Advanced AI</span>
          </div>
        </div>

        {/* Main content */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="space-y-8">
            <h2 className="text-4xl lg:text-5xl font-bold leading-tight">
              Transform Your Business with{' '}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">
                AI-Driven Predictions
              </span>
            </h2>
            <p className="text-xl text-gray-300 leading-relaxed">
              Harness the power of advanced predictive analytics to make data-driven decisions, 
              optimize operations, and stay ahead of market trends.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="group relative inline-flex items-center justify-center bg-[#5B3557] hover:bg-[#4a2a46] text-white font-bold py-4 px-8 rounded-xl text-lg transition-all duration-300" onClick={() => navigate('/book-demo')}>
                Get Started Now
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white bg-white/10 hover:bg-white/20 rounded-xl backdrop-blur-sm transition-all duration-300">
                Watch Demo
              </button>
            </div>
          </div>

          {/* Feature box */}
          <Card className="bg-white/[0.07] backdrop-blur-xl border-white/10 shadow-2xl rounded-2xl overflow-hidden">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-white to-purple-200">
                Why Choose Pacx.ai?
              </h3>
              <ul className="space-y-6">
                <li className="flex items-start group">
                  <div className="rounded-xl bg-[#5B3557]/30 p-3 mr-4 group-hover:bg-[#5B3557]/40 transition-all duration-300">
                    <Cpu className="w-5 h-5 text-purple-300" />
                  </div>
                  <div>
                    <h4 className="font-bold mb-2">Real-time Analytics</h4>
                    <p className="text-gray-300">Get instant insights with our powerful predictive engine</p>
                  </div>
                </li>
                <li className="flex items-start group">
                  <div className="rounded-xl bg-[#5B3557]/30 p-3 mr-4 group-hover:bg-[#5B3557]/40 transition-all duration-300">
                    <Boxes className="w-5 h-5 text-purple-300" />
                  </div>
                  <div>
                    <h4 className="font-bold mb-2">Scalable Solutions</h4>
                    <p className="text-gray-300">Enterprise-grade infrastructure that grows with your needs</p>
                  </div>
                </li>
                <li className="flex items-start group">
                  <div className="rounded-xl bg-[#5B3557]/30 p-3 mr-4 group-hover:bg-[#5B3557]/40 transition-all duration-300">
                    <Network className="w-5 h-5 text-purple-300" />
                  </div>
                  <div>
                    <h4 className="font-bold mb-2">Advanced AI Models</h4>
                    <p className="text-gray-300">State-of-the-art machine learning algorithms for accurate predictions</p>
                  </div>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Add these keyframes to your global CSS */}
      <style>{`
        @keyframes data-stream {
          0% { transform: translateY(-100%); opacity: 0; }
          50% { opacity: 1; }
          100% { transform: translateY(100%); opacity: 0; }
        }
        @keyframes glow {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(1.1); }
        }
        @keyframes float {
          0% { transform: translateY(0) translateX(0); }
          33% { transform: translateY(-50px) translateX(20px); }
          66% { transform: translateY(30px) translateX(-20px); }
          100% { transform: translateY(0) translateX(0); }
        }
      `}</style>
    </div>
  );
};

export default PacxLanding7;