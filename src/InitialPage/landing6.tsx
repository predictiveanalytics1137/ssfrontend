// // // // import React from 'react';
// // // // import { TrendingUp, Boxes, Cpu, Network, ArrowRight, Sparkles } from 'lucide-react';
// // // // import { Card, CardContent } from '../components/ui/card';
// // // // import { useNavigate } from 'react-router-dom';

// // // // const PacxLanding6 = () => {
// // // //   const navigate = useNavigate();
// // // //   return (
// // // //     <div className="relative min-h-screen bg-gradient-to-br from-purple-950 via-purple-900 to-indigo-950 text-white overflow-hidden">
// // // //       {/* Gradient overlay for bottom darkening */}
// // // //       <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/80 pointer-events-none z-10" />
      
// // // //       {/* Enhanced tech background animations */}
// // // //       <div className="absolute inset-0 overflow-hidden">
// // // //         {/* Animated grid overlay */}
// // // //         <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff15_1px,transparent_1px),linear-gradient(to_bottom,#ffffff15_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black_70%)]" />
        
// // // //         {/* Floating tech elements */}
// // // //         <div className="absolute inset-0">
// // // //           {/* Large orbital rings */}
// // // //           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-purple-500/30 rounded-full animate-[spin_20s_linear_infinite]" />
// // // //           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-purple-400/20 rounded-full animate-[spin_15s_linear_infinite_reverse]" />
          
// // // //           {/* Digital circuit lines */}
// // // //           <div className="absolute top-0 left-0 w-full h-full">
// // // //             <div className="absolute top-[20%] left-[10%] w-32 h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent animate-pulse" />
// // // //             <div className="absolute top-[40%] right-[15%] w-48 h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent animate-pulse delay-300" />
// // // //             <div className="absolute bottom-[30%] left-[25%] w-40 h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent animate-pulse delay-700" />
// // // //           </div>

// // // //           {/* Tech nodes */}
// // // //           <div className="absolute top-1/4 left-1/4 w-3 h-3 bg-purple-400 rounded-full animate-ping [animation-duration:3s]" />
// // // //           <div className="absolute top-3/4 right-1/4 w-3 h-3 bg-purple-400 rounded-full animate-ping [animation-duration:2.5s] delay-300" />
// // // //           <div className="absolute top-1/2 right-1/3 w-3 h-3 bg-purple-400 rounded-full animate-ping [animation-duration:4s] delay-500" />
          
// // // //           {/* Data streams */}
// // // //           <div className="absolute h-full w-px bg-gradient-to-b from-transparent via-purple-500/40 to-transparent left-1/4 animate-data-stream" />
// // // //           <div className="absolute h-full w-px bg-gradient-to-b from-transparent via-purple-500/40 to-transparent left-2/4 animate-data-stream delay-500" />
// // // //           <div className="absolute h-full w-px bg-gradient-to-b from-transparent via-purple-500/40 to-transparent right-1/4 animate-data-stream delay-1000" />

// // // //           {/* Glowing orbs */}
// // // //           <div className="absolute top-1/4 right-1/4 w-32 h-32 bg-purple-500/10 rounded-full blur-3xl animate-glow" />
// // // //           <div className="absolute bottom-1/3 left-1/3 w-40 h-40 bg-indigo-500/10 rounded-full blur-3xl animate-glow delay-700" />
          
// // // //           {/* Digital particles */}
// // // //           <div className="absolute inset-0">
// // // //             {[...Array(20)].map((_, i) => (
// // // //               <div
// // // //                 key={i}
// // // //                 className="absolute w-1 h-1 bg-purple-400/40 rounded-full"
// // // //                 style={{
// // // //                   top: `${Math.random() * 100}%`,
// // // //                   left: `${Math.random() * 100}%`,
// // // //                   animation: `float ${5 + Math.random() * 5}s linear infinite`,
// // // //                   animationDelay: `${Math.random() * 5}s`
// // // //                 }}
// // // //               />
// // // //             ))}
// // // //           </div>
// // // //         </div>
// // // //       </div>

// // // //       <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20 z-20">
// // // //         {/* Header section */}
// // // //         <div className="mb-20 space-y-6">
// // // //           <div className="flex items-center space-x-3 mb-4">
// // // //             <span className="px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-sm text-sm font-medium">
// // // //               AI-Powered Analytics
// // // //             </span>
// // // //             <Sparkles className="w-5 h-5 text-purple-300" />
// // // //           </div>
// // // //           <h1 className="text-5xl lg:text-7xl font-bold">
// // // //             <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-purple-200 to-purple-400">
// // // //               pacx.ai
// // // //             </span>
// // // //           </h1>
// // // //           <div className="flex items-center text-gray-300 space-x-3">
// // // //             <span className="text-xl">Powered by</span>
// // // //             <TrendingUp className="w-6 h-6 text-purple-400" />
// // // //             <span className="text-xl font-light">Advanced AI</span>
// // // //           </div>
// // // //         </div>

// // // //         {/* Main content */}
// // // //         <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
// // // //           <div className="space-y-8">
// // // //             <h2 className="text-4xl lg:text-5xl font-bold leading-tight">
// // // //               Transform Your Business with{' '}
// // // //               <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">
// // // //                 AI-Driven Predictions
// // // //               </span>
// // // //             </h2>
// // // //             <p className="text-xl text-gray-300 leading-relaxed">
// // // //               Harness the power of advanced predictive analytics to make data-driven decisions, 
// // // //               optimize operations, and stay ahead of market trends.
// // // //             </p>
// // // //             <div className="flex flex-col sm:flex-row gap-4">
// // // //               <button className="group relative inline-flex items-center justify-center bg-[#5B3557] hover:bg-[#4a2a46] text-white font-bold py-4 px-8 rounded-xl text-lg transition-all duration-300" onClick={() => navigate('/bookademo')}>
// // // //                 Get Started Now
// // // //                 <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
// // // //               </button>
// // // //               <button className="inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white bg-white/10 hover:bg-white/20 rounded-xl backdrop-blur-sm transition-all duration-300">
// // // //                 Watch Demo
// // // //               </button>
// // // //             </div>
// // // //           </div>

// // // //           {/* Feature box */}
// // // //           <Card className="bg-white/[0.07] backdrop-blur-xl border-white/10 shadow-2xl rounded-2xl overflow-hidden">
// // // //             <CardContent className="p-8">
// // // //               <h3 className="text-2xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-white to-purple-200">
// // // //                 Why Choose Pacx.ai?
// // // //               </h3>
// // // //               <ul className="space-y-6">
// // // //                 <li className="flex items-start group">
// // // //                   <div className="rounded-xl bg-[#5B3557]/30 p-3 mr-4 group-hover:bg-[#5B3557]/40 transition-all duration-300">
// // // //                     <Cpu className="w-5 h-5 text-purple-300" />
// // // //                   </div>
// // // //                   <div>
// // // //                     <h4 className="font-bold mb-2">Real-time Analytics</h4>
// // // //                     <p className="text-gray-300">Get instant insights with our powerful predictive engine</p>
// // // //                   </div>
// // // //                 </li>
// // // //                 <li className="flex items-start group">
// // // //                   <div className="rounded-xl bg-[#5B3557]/30 p-3 mr-4 group-hover:bg-[#5B3557]/40 transition-all duration-300">
// // // //                     <Boxes className="w-5 h-5 text-purple-300" />
// // // //                   </div>
// // // //                   <div>
// // // //                     <h4 className="font-bold mb-2">Scalable Solutions</h4>
// // // //                     <p className="text-gray-300">Enterprise-grade infrastructure that grows with your needs</p>
// // // //                   </div>
// // // //                 </li>
// // // //                 <li className="flex items-start group">
// // // //                   <div className="rounded-xl bg-[#5B3557]/30 p-3 mr-4 group-hover:bg-[#5B3557]/40 transition-all duration-300">
// // // //                     <Network className="w-5 h-5 text-purple-300" />
// // // //                   </div>
// // // //                   <div>
// // // //                     <h4 className="font-bold mb-2">Advanced AI Models</h4>
// // // //                     <p className="text-gray-300">State-of-the-art machine learning algorithms for accurate predictions</p>
// // // //                   </div>
// // // //                 </li>
// // // //               </ul>
// // // //             </CardContent>
// // // //           </Card>
// // // //         </div>
// // // //       </div>

// // // //       {/* Add these keyframes to your global CSS */}
// // // //       <style>{`
// // // //         @keyframes data-stream {
// // // //           0% { transform: translateY(-100%); opacity: 0; }
// // // //           50% { opacity: 1; }
// // // //           100% { transform: translateY(100%); opacity: 0; }
// // // //         }
// // // //         @keyframes glow {
// // // //           0%, 100% { opacity: 0.3; transform: scale(1); }
// // // //           50% { opacity: 0.5; transform: scale(1.1); }
// // // //         }
// // // //         @keyframes float {
// // // //           0% { transform: translateY(0) translateX(0); }
// // // //           33% { transform: translateY(-50px) translateX(20px); }
// // // //           66% { transform: translateY(30px) translateX(-20px); }
// // // //           100% { transform: translateY(0) translateX(0); }
// // // //         }
// // // //       `}</style>
// // // //     </div>
// // // //   );
// // // // };

// // // // export default PacxLanding6;




// // // // // import React from 'react';
// // // // // import { Globe, ArrowRight, Sparkles, Star } from 'lucide-react';
// // // // // import { Card, CardContent } from '../components/ui/card';
// // // // // import { useNavigate } from 'react-router-dom';
// // // // // import { motion } from 'framer-motion';

// // // // // const PacxLanding6: React.FC = () => {
// // // // //   const navigate = useNavigate();

// // // // //   return (
// // // // //     <div className="relative min-h-screen bg-white text-[#1A1A1A] overflow-hidden">
// // // // //       {/* Nebula background animation */}
// // // // //       <div className="absolute inset-0 overflow-hidden">
// // // // //         <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#9b5de510_0%,transparent_70%)] opacity-20" />
        
// // // // //         {/* Floating celestial orbs */}
// // // // //         <div className="absolute inset-0">
// // // // //           <motion.div
// // // // //             animate={{ scale: [1, 1.1, 1], rotate: [0, 360, 0] }}
// // // // //             transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
// // // // //             className="absolute top-1/4 left-1/4 w-32 h-32 bg-[#9b5de5]/20 rounded-full blur-2xl animate-pulse"
// // // // //           />
// // // // //           <motion.div
// // // // //             animate={{ scale: [1, 1.15, 1], rotate: [0, -360, 0] }}
// // // // //             transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
// // // // //             className="absolute bottom-1/3 right-1/3 w-40 h-40 bg-[#5B3557]/15 rounded-full blur-2xl animate-pulse delay-500"
// // // // //           />
          
// // // // //           {/* Starfield effect */}
// // // // //           <div className="absolute inset-0">
// // // // //             {[...Array(50)].map((_, i) => (
// // // // //               <div
// // // // //                 key={i}
// // // // //                 className="absolute w-1 h-1 bg-[#9b5de5]/40 rounded-full"
// // // // //                 style={{
// // // // //                   top: `${Math.random() * 100}%`,
// // // // //                   left: `${Math.random() * 100}%`,
// // // // //                   animation: `twinkle ${2 + Math.random() * 3}s infinite alternate`,
// // // // //                   animationDelay: `${Math.random() * 5}s`
// // // // //                 }}
// // // // //               />
// // // // //             ))}
// // // // //           </div>

// // // // //           {/* Orbiting particles */}
// // // // //           <motion.div
// // // // //             animate={{ rotate: 360 }}
// // // // //             transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
// // // // //             className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px]"
// // // // //           >
// // // // //             <div className="absolute w-2 h-2 bg-[#9b5de5]/30 rounded-full top-[-10px] left-1/2 -translate-x-1/2 animate-orbit" />
// // // // //             <div className="absolute w-2 h-2 bg-[#5B3557]/30 rounded-full top-1/2 left-[-10px] -translate-y-1/2 animate-orbit delay-1000" />
// // // // //           </motion.div>
// // // // //         </div>
// // // // //       </div>

// // // // //       <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 z-20">
// // // // //         {/* Header */}
// // // // //         <div className="mb-20 text-center">
// // // // //           <motion.div
// // // // //             initial={{ opacity: 0, y: -20 }}
// // // // //             whileInView={{ opacity: 1, y: 0 }}
// // // // //             viewport={{ once: true }}
// // // // //             transition={{ duration: 0.6 }}
// // // // //             className="inline-block px-4 py-1.5 bg-[#5B3557]/20 rounded-full backdrop-blur-md"
// // // // //           >
// // // // //             <span className="text-sm font-medium text-[#5B3557]">
// // // // //               AI-Powered Analytics
// // // // //             </span>
// // // // //           </motion.div>
// // // // //           <motion.h1
// // // // //             initial={{ opacity: 0, y: 20 }}
// // // // //             whileInView={{ opacity: 1, y: 0 }}
// // // // //             viewport={{ once: true }}
// // // // //             transition={{ duration: 0.6, delay: 0.2 }}
// // // // //             className="text-5xl lg:text-7xl font-bold text-[#5B3557]"
// // // // //           >
// // // // //             PACX.ai
// // // // //           </motion.h1>
// // // // //           <motion.div
// // // // //             initial={{ opacity: 0, y: 20 }}
// // // // //             whileInView={{ opacity: 1, y: 0 }}
// // // // //             viewport={{ once: true }}
// // // // //             transition={{ duration: 0.6, delay: 0.3 }}
// // // // //             className="flex items-center justify-center text-gray-600 space-x-3"
// // // // //           >
// // // // //             <span className="text-xl">Powered by</span>
// // // // //             <Globe className="w-6 h-6 text-[#5B3557]" />
// // // // //             <span className="text-xl font-light">Galactic AI</span>
// // // // //           </motion.div>
// // // // //         </div>

// // // // //         {/* Main content */}
// // // // //         <div className="grid lg:grid-cols-2 gap-12 items-center">
// // // // //           <motion.div
// // // // //             initial={{ opacity: 0, x: -50 }}
// // // // //             whileInView={{ opacity: 1, x: 0 }}
// // // // //             viewport={{ once: true }}
// // // // //             transition={{ duration: 0.6 }}
// // // // //             className="space-y-8"
// // // // //           >
// // // // //             <h2 className="text-4xl lg:text-5xl font-bold leading-tight text-[#1A1A1A]">
// // // // //               Explore the Cosmos of AI Predictions
// // // // //             </h2>
// // // // //             <p className="text-xl text-gray-600 leading-relaxed max-w-2xl">
// // // // //               Dive into a universe of data-driven insights with PACX.ai’s otherworldly predictive analytics, propelling your business to new frontiers.
// // // // //             </p>
// // // // //             <div className="flex flex-col sm:flex-row gap-4">
// // // // //               <motion.button
// // // // //                 whileHover={{ scale: 1.05 }}
// // // // //                 whileTap={{ scale: 0.95 }}
// // // // //                 onClick={() => navigate('/bookademo')}
// // // // //                 className="group relative inline-flex items-center justify-center bg-[#5B3557] hover:bg-[#4a2a46] text-white font-bold py-4 px-8 rounded-full text-lg shadow-md transition-all duration-300 glow"
// // // // //               >
// // // // //                 Launch Now
// // // // //                 <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
// // // // //               </motion.button>
// // // // //               <motion.button
// // // // //                 whileHover={{ scale: 1.05 }}
// // // // //                 whileTap={{ scale: 0.95 }}
// // // // //                 className="inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-[#5B3557] bg-[#5B3557]/10 hover:bg-[#5B3557]/20 rounded-full backdrop-blur-md transition-all duration-300"
// // // // //               >
// // // // //                 View Galaxy
// // // // //               </motion.button>
// // // // //             </div>
// // // // //           </motion.div>

// // // // //           <motion.div
// // // // //             initial={{ opacity: 0, x: 50 }}
// // // // //             whileInView={{ opacity: 1, x: 0 }}
// // // // //             viewport={{ once: true }}
// // // // //             transition={{ duration: 0.6, delay: 0.2 }}
// // // // //             className="rounded-2xl overflow-hidden"
// // // // //           >
// // // // //             <Card className="bg-white border border-[#5B3557]/10 shadow-md">
// // // // //               <CardContent className="p-8">
// // // // //                 <h3 className="text-2xl font-bold mb-8 text-[#5B3557]">
// // // // //                   Why PACX.ai?
// // // // //                 </h3>
// // // // //                 <ul className="space-y-6">
// // // // //                   <li className="flex items-start group">
// // // // //                     <div className="rounded-full bg-[#5B3557]/20 p-3 mr-4 group-hover:bg-[#5B3557]/30 transition-all duration-300">
// // // // //                       <Sparkles className="w-5 h-5 text-[#5B3557]" />
// // // // //                     </div>
// // // // //                     <div>
// // // // //                       <h4 className="font-bold mb-2 text-[#1A1A1A]">Nebula Insights</h4>
// // // // //                       <p className="text-gray-600">Instant cosmic predictions</p>
// // // // //                     </div>
// // // // //                   </li>
// // // // //                   <li className="flex items-start group">
// // // // //                     <div className="rounded-full bg-[#5B3557]/20 p-3 mr-4 group-hover:bg-[#5B3557]/30 transition-all duration-300">
// // // // //                       <Globe className="w-5 h-5 text-[#5B3557]" />
// // // // //                     </div>
// // // // //                     <div>
// // // // //                       <h4 className="font-bold mb-2 text-[#1A1A1A]">Interstellar Scale</h4>
// // // // //                       <p className="text-gray-600">Expand across galaxies</p>
// // // // //                     </div>
// // // // //                   </li>
// // // // //                   <li className="flex items-start group">
// // // // //                     <div className="rounded-full bg-[#5B3557]/20 p-3 mr-4 group-hover:bg-[#5B3557]/30 transition-all duration-300">
// // // // //                       <Star className="w-5 h-5 text-[#5B3557]" />
// // // // //                     </div>
// // // // //                     <div>
// // // // //                       <h4 className="font-bold mb-2 text-[#1A1A1A]">Stellar AI Models</h4>
// // // // //                       <p className="text-gray-600">Advanced algorithms from the stars</p>
// // // // //                     </div>
// // // // //                   </li>
// // // // //                 </ul>
// // // // //               </CardContent>
// // // // //             </Card>
// // // // //           </motion.div>
// // // // //         </div>
// // // // //       </div>

// // // // //       <style>{`
// // // // //         @keyframes twinkle {
// // // // //           0%, 100% { opacity: 0.3; transform: scale(1); }
// // // // //           50% { opacity: 1; transform: scale(1.2); }
// // // // //         }
// // // // //         @keyframes float {
// // // // //           0% { transform: translateY(0) translateX(0); }
// // // // //           50% { transform: translateY(-20px) translateX(15px); }
// // // // //           100% { transform: translateY(0) translateX(0); }
// // // // //         }
// // // // //         @keyframes orbit {
// // // // //           0% { transform: rotate(0deg) translateX(300px) rotate(0deg); }
// // // // //           100% { transform: rotate(360deg) translateX(300px) rotate(-360deg); }
// // // // //         }
// // // // //         .glow {
// // // // //           box-shadow: 0 0 15px rgba(155, 93, 229, 0.3);
// // // // //           transition: box-shadow 0.3s ease;
// // // // //         }
// // // // //         .glow:hover {
// // // // //           box-shadow: 0 0 25px rgba(155, 93, 229, 0.5);
// // // // //         }
// // // // //       `}</style>
// // // // //     </div>
// // // // //   );
// // // // // };

// // // // // export default PacxLanding6;





// // // import React from 'react';
// // // import { TrendingUp, Boxes, Cpu, Network, ArrowRight, Sparkles } from 'lucide-react';
// // // import { Card, CardContent } from '../components/ui/card';
// // // import { useNavigate } from 'react-router-dom';

// // // const PacxLanding6 = () => {
// // //   const navigate = useNavigate();

// // //   return (
// // //     <div className="relative min-h-screen bg-white text-[#1A1A1A] overflow-hidden">
// // //       {/* Enhanced tech background animations */}
// // //       <div className="absolute inset-0 overflow-hidden pointer-events-none">
// // //         {/* Animated grid overlay */}
// // //         <div className="absolute inset-0 bg-[linear-gradient(to_right,#5B355722_1px,transparent_1px),linear-gradient(to_bottom,#5B355722_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black_70%)]" />

// // //         {/* Floating tech elements */}
// // //         <div className="absolute inset-0">
// // //           {/* Large orbital rings */}
// // //           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-[#5B3557]/30 rounded-full animate-[spin_20s_linear_infinite]" />
// // //           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-[#5B3557]/20 rounded-full animate-[spin_15s_linear_infinite_reverse]" />

// // //           {/* Digital circuit lines */}
// // //           <div className="absolute top-0 left-0 w-full h-full">
// // //             <div className="absolute top-[20%] left-[10%] w-32 h-px bg-gradient-to-r from-transparent via-[#5B3557]/50 to-transparent animate-pulse" />
// // //             <div className="absolute top-[40%] right-[15%] w-48 h-px bg-gradient-to-r from-transparent via-[#5B3557]/50 to-transparent animate-pulse delay-300" />
// // //             <div className="absolute bottom-[30%] left-[25%] w-40 h-px bg-gradient-to-r from-transparent via-[#5B3557]/50 to-transparent animate-pulse delay-700" />
// // //           </div>

// // //           {/* Tech nodes */}
// // //           <div className="absolute top-1/4 left-1/4 w-3 h-3 bg-[#5B3557] rounded-full animate-ping [animation-duration:3s]" />
// // //           <div className="absolute top-3/4 right-1/4 w-3 h-3 bg-[#5B3557] rounded-full animate-ping [animation-duration:2.5s] delay-300" />
// // //           <div className="absolute top-1/2 right-1/3 w-3 h-3 bg-[#5B3557] rounded-full animate-ping [animation-duration:4s] delay-500" />

// // //           {/* Data streams */}
// // //           <div className="absolute h-full w-px bg-gradient-to-b from-transparent via-[#5B3557]/40 to-transparent left-1/4 animate-data-stream" />
// // //           <div className="absolute h-full w-px bg-gradient-to-b from-transparent via-[#5B3557]/40 to-transparent left-2/4 animate-data-stream delay-500" />
// // //           <div className="absolute h-full w-px bg-gradient-to-b from-transparent via-[#5B3557]/40 to-transparent right-1/4 animate-data-stream delay-1000" />

// // //           {/* Glowing orbs */}
// // //           <div className="absolute top-1/4 right-1/4 w-32 h-32 bg-[#5B3557]/10 rounded-full blur-3xl animate-glow" />
// // //           <div className="absolute bottom-1/3 left-1/3 w-40 h-40 bg-[#5B3557]/15 rounded-full blur-3xl animate-glow delay-700" />

// // //           {/* Digital particles */}
// // //           <div className="absolute inset-0">
// // //             {[...Array(20)].map((_, i) => (
// // //               <div
// // //                 key={i}
// // //                 className="absolute w-1 h-1 bg-[#5B3557]/40 rounded-full"
// // //                 style={{
// // //                   top: `${Math.random() * 100}%`,
// // //                   left: `${Math.random() * 100}%`,
// // //                   animation: `float ${5 + Math.random() * 5}s linear infinite`,
// // //                   animationDelay: `${Math.random() * 5}s`
// // //                 }}
// // //               />
// // //             ))}
// // //           </div>
// // //         </div>
// // //       </div>

// // //       {/* Main container with extra padding for a spacious feel */}
// // //       <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24 z-20 space-y-16">
// // //         {/* Header section */}
// // //         <div className="space-y-6">
// // //           <div className="flex items-center space-x-3 mb-3">
// // //             <span className="px-3 py-1 rounded-full bg-[#5B3557]/10 backdrop-blur-sm text-xs font-medium text-[#5B3557]">
// // //               AI-Powered Analytics
// // //             </span>
// // //             <Sparkles className="w-4 h-4 text-[#5B3557]" />
// // //           </div>
// // //           {/* Smaller headline */}
// // //           <h1 className="text-3xl lg:text-4xl font-bold leading-tight">
// // //             <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#5B3557] via-[#8C618A] to-[#B580B2]">
// // //               pacx.ai
// // //             </span>
// // //           </h1>
// // //           <div className="flex items-center text-gray-700 space-x-2">
// // //             <span className="text-base">Powered by</span>
// // //             <TrendingUp className="w-5 h-5 text-[#5B3557]" />
// // //             <span className="text-base font-light">Advanced AI</span>
// // //           </div>
// // //         </div>

// // //         {/* Main content */}
// // //         <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
// // //           <div className="space-y-6">
// // //             <h2 className="text-2xl lg:text-3xl font-bold leading-snug">
// // //               Transform Your Business with{' '}
// // //               <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#5B3557] to-[#B580B2]">
// // //                 AI-Driven Predictions
// // //               </span>
// // //             </h2>
// // //             <p className="text-sm lg:text-base text-gray-600 leading-relaxed">
// // //               Harness the power of advanced predictive analytics to make data-driven decisions, 
// // //               optimize operations, and stay ahead of market trends.
// // //             </p>
// // //             <div className="flex flex-col sm:flex-row gap-4">
// // //               <button
// // //                 className="group relative inline-flex items-center justify-center bg-[#5B3557] hover:bg-[#4a2a46] text-white font-semibold py-3 px-6 rounded-xl text-sm transition-all duration-300"
// // //                 onClick={() => navigate('/bookademo')}
// // //               >
// // //                 Get Started Now
// // //                 <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
// // //               </button>
// // //               <button className="inline-flex items-center justify-center px-6 py-3 text-sm font-semibold text-[#5B3557] bg-[#5B3557]/10 hover:bg-[#5B3557]/20 rounded-xl backdrop-blur-sm transition-all duration-300">
// // //                 Watch Demo
// // //               </button>
// // //             </div>
// // //           </div>

// // //           {/* Feature box */}
// // //           <Card className="bg-[#5B3557]/5 backdrop-blur-xl border-[#5B3557]/10 shadow-2xl rounded-2xl overflow-hidden">
// // //             <CardContent className="p-6 space-y-6">
// // //               <h3 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#5B3557] to-[#8C618A]">
// // //                 Why Choose Pacx.ai?
// // //               </h3>
// // //               <ul className="space-y-5">
// // //                 <li className="flex items-start group">
// // //                   <div className="rounded-xl bg-[#5B3557]/20 p-2 mr-4 group-hover:bg-[#5B3557]/30 transition-all duration-300">
// // //                     <Cpu className="w-4 h-4 text-[#5B3557]" />
// // //                   </div>
// // //                   <div>
// // //                     <h4 className="font-semibold text-sm mb-1">Real-time Analytics</h4>
// // //                     <p className="text-xs text-gray-700 leading-snug">
// // //                       Get instant insights with our powerful predictive engine
// // //                     </p>
// // //                   </div>
// // //                 </li>
// // //                 <li className="flex items-start group">
// // //                   <div className="rounded-xl bg-[#5B3557]/20 p-2 mr-4 group-hover:bg-[#5B3557]/30 transition-all duration-300">
// // //                     <Boxes className="w-4 h-4 text-[#5B3557]" />
// // //                   </div>
// // //                   <div>
// // //                     <h4 className="font-semibold text-sm mb-1">Scalable Solutions</h4>
// // //                     <p className="text-xs text-gray-700 leading-snug">
// // //                       Enterprise-grade infrastructure that grows with your needs
// // //                     </p>
// // //                   </div>
// // //                 </li>
// // //                 <li className="flex items-start group">
// // //                   <div className="rounded-xl bg-[#5B3557]/20 p-2 mr-4 group-hover:bg-[#5B3557]/30 transition-all duration-300">
// // //                     <Network className="w-4 h-4 text-[#5B3557]" />
// // //                   </div>
// // //                   <div>
// // //                     <h4 className="font-semibold text-sm mb-1">Advanced AI Models</h4>
// // //                     <p className="text-xs text-gray-700 leading-snug">
// // //                       State-of-the-art machine learning algorithms for accurate predictions
// // //                     </p>
// // //                   </div>
// // //                 </li>
// // //               </ul>
// // //             </CardContent>
// // //           </Card>
// // //         </div>
// // //       </div>

// // //       {/* Add these keyframes to your global CSS */}
// // //       <style>{`
// // //         @keyframes data-stream {
// // //           0% { transform: translateY(-100%); opacity: 0; }
// // //           50% { opacity: 1; }
// // //           100% { transform: translateY(100%); opacity: 0; }
// // //         }
// // //         @keyframes glow {
// // //           0%, 100% { opacity: 0.3; transform: scale(1); }
// // //           50% { opacity: 0.5; transform: scale(1.1); }
// // //         }
// // //         @keyframes float {
// // //           0% { transform: translateY(0) translateX(0); }
// // //           33% { transform: translateY(-50px) translateX(20px); }
// // //           66% { transform: translateY(30px) translateX(-20px); }
// // //           100% { transform: translateY(0) translateX(0); }
// // //         }
// // //       `}</style>
// // //     </div>
// // //   );
// // // };

// // // export default PacxLanding6;




// // import React from 'react';
// // import { TrendingUp, Boxes, Cpu, Network, ArrowRight, Sparkles } from 'lucide-react';
// // import { Card, CardContent } from '../components/ui/card';
// // import { useNavigate } from 'react-router-dom';

// // const PacxLanding6 = () => {
// //   const navigate = useNavigate();

// //   return (
// //     <div className="relative min-h-screen bg-gray-50 text-[#1A1A1A] overflow-hidden">
// //       {/* Enhanced tech background animations */}
// //       <div className="absolute inset-0 overflow-hidden pointer-events-none">
// //         {/* Subtle grid overlay (brand color with low opacity) */}
// //         <div className="absolute inset-0 bg-[linear-gradient(to_right,#5B355722_1px,transparent_1px),linear-gradient(to_bottom,#5B355722_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black_70%)]" />

// //         {/* Floating tech elements */}
// //         <div className="absolute inset-0">
// //           {/* Large orbital rings */}
// //           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-[#5B3557]/30 rounded-full animate-[spin_20s_linear_infinite]" />
// //           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-[#5B3557]/20 rounded-full animate-[spin_15s_linear_infinite_reverse]" />

// //           {/* Digital circuit lines */}
// //           <div className="absolute top-0 left-0 w-full h-full">
// //             <div className="absolute top-[20%] left-[10%] w-32 h-px bg-gradient-to-r from-transparent via-[#5B3557]/50 to-transparent animate-pulse" />
// //             <div className="absolute top-[40%] right-[15%] w-48 h-px bg-gradient-to-r from-transparent via-[#5B3557]/50 to-transparent animate-pulse delay-300" />
// //             <div className="absolute bottom-[30%] left-[25%] w-40 h-px bg-gradient-to-r from-transparent via-[#5B3557]/50 to-transparent animate-pulse delay-700" />
// //           </div>

// //           {/* Tech nodes */}
// //           <div className="absolute top-1/4 left-1/4 w-3 h-3 bg-[#5B3557] rounded-full animate-ping [animation-duration:3s]" />
// //           <div className="absolute top-3/4 right-1/4 w-3 h-3 bg-[#5B3557] rounded-full animate-ping [animation-duration:2.5s] delay-300" />
// //           <div className="absolute top-1/2 right-1/3 w-3 h-3 bg-[#5B3557] rounded-full animate-ping [animation-duration:4s] delay-500" />

// //           {/* Data streams */}
// //           <div className="absolute h-full w-px bg-gradient-to-b from-transparent via-[#5B3557]/40 to-transparent left-1/4 animate-data-stream" />
// //           <div className="absolute h-full w-px bg-gradient-to-b from-transparent via-[#5B3557]/40 to-transparent left-2/4 animate-data-stream delay-500" />
// //           <div className="absolute h-full w-px bg-gradient-to-b from-transparent via-[#5B3557]/40 to-transparent right-1/4 animate-data-stream delay-1000" />

// //           {/* Glowing orbs */}
// //           <div className="absolute top-1/4 right-1/4 w-32 h-32 bg-[#5B3557]/10 rounded-full blur-3xl animate-glow" />
// //           <div className="absolute bottom-1/3 left-1/3 w-40 h-40 bg-[#5B3557]/15 rounded-full blur-3xl animate-glow delay-700" />

// //           {/* Digital particles */}
// //           <div className="absolute inset-0">
// //             {[...Array(20)].map((_, i) => (
// //               <div
// //                 key={i}
// //                 className="absolute w-1 h-1 bg-[#5B3557]/40 rounded-full"
// //                 style={{
// //                   top: `${Math.random() * 100}%`,
// //                   left: `${Math.random() * 100}%`,
// //                   animation: `float ${5 + Math.random() * 5}s linear infinite`,
// //                   animationDelay: `${Math.random() * 5}s`
// //                 }}
// //               />
// //             ))}
// //           </div>
// //         </div>
// //       </div>

// //       {/* Main container for content */}
// //       <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24 z-20 space-y-16">
// //         {/* Header section */}
// //         <div className="space-y-4">
// //           <div className="flex items-center space-x-3">
// //             <span className="px-3 py-1 rounded-full bg-[#5B3557]/10 text-xs font-medium text-[#5B3557]">
// //               AI-Powered Analytics
// //             </span>
// //             <Sparkles className="w-4 h-4 text-[#5B3557]" />
// //           </div>
// //           <h1 className="text-3xl lg:text-4xl font-semibold leading-tight">
// //             <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#5B3557] via-[#8C618A] to-[#B580B2]">
// //               pacx.ai
// //             </span>
// //           </h1>
// //           <div className="flex items-center text-gray-700 space-x-2">
// //             <span className="text-sm font-medium">Powered by</span>
// //             <TrendingUp className="w-5 h-5 text-[#5B3557]" />
// //             <span className="text-sm font-light">Advanced AI</span>
// //           </div>
// //         </div>

// //         {/* Main content */}
// //         <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
// //           <div className="space-y-6">
// //             <h2 className="text-2xl lg:text-3xl font-semibold leading-snug">
// //               Transform Your Business with{' '}
// //               <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#5B3557] to-[#B580B2]">
// //                 AI-Driven Predictions
// //               </span>
// //             </h2>
// //             <p className="text-sm lg:text-base font-medium text-gray-600 leading-relaxed">
// //               Harness the power of advanced predictive analytics to make data-driven decisions, 
// //               optimize operations, and stay ahead of market trends.
// //             </p>
// //             <div className="flex flex-col sm:flex-row gap-4">
// //               <button
// //                 className="group relative inline-flex items-center justify-center bg-[#5B3557] hover:bg-[#4a2a46] text-white font-medium py-3 px-6 rounded-xl text-sm transition-all duration-300"
// //                 onClick={() => navigate('/bookademo')}
// //               >
// //                 Get Started Now
// //                 <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
// //               </button>
// //               <button className="inline-flex items-center justify-center px-6 py-3 text-sm font-medium text-[#5B3557] bg-[#5B3557]/10 hover:bg-[#5B3557]/20 rounded-xl backdrop-blur-sm transition-all duration-300">
// //                 Watch Demo
// //               </button>
// //             </div>
// //           </div>

// //           {/* Feature box */}
// //           <Card className="bg-[#5B3557]/5 backdrop-blur-xl border-[#5B3557]/10 shadow-2xl rounded-2xl overflow-hidden">
// //             <CardContent className="p-6 space-y-6">
// //               <h3 className="text-xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-[#5B3557] to-[#8C618A]">
// //                 Why Choose Pacx.ai?
// //               </h3>
// //               <ul className="space-y-5">
// //                 <li className="flex items-start group">
// //                   <div className="rounded-xl bg-[#5B3557]/20 p-2 mr-4 group-hover:bg-[#5B3557]/30 transition-all duration-300">
// //                     <Cpu className="w-4 h-4 text-[#5B3557]" />
// //                   </div>
// //                   <div>
// //                     <h4 className="font-medium text-sm mb-1">Real-time Analytics</h4>
// //                     <p className="text-xs text-gray-700 leading-snug">
// //                       Get instant insights with our powerful predictive engine
// //                     </p>
// //                   </div>
// //                 </li>
// //                 <li className="flex items-start group">
// //                   <div className="rounded-xl bg-[#5B3557]/20 p-2 mr-4 group-hover:bg-[#5B3557]/30 transition-all duration-300">
// //                     <Boxes className="w-4 h-4 text-[#5B3557]" />
// //                   </div>
// //                   <div>
// //                     <h4 className="font-medium text-sm mb-1">Scalable Solutions</h4>
// //                     <p className="text-xs text-gray-700 leading-snug">
// //                       Enterprise-grade infrastructure that grows with your needs
// //                     </p>
// //                   </div>
// //                 </li>
// //                 <li className="flex items-start group">
// //                   <div className="rounded-xl bg-[#5B3557]/20 p-2 mr-4 group-hover:bg-[#5B3557]/30 transition-all duration-300">
// //                     <Network className="w-4 h-4 text-[#5B3557]" />
// //                   </div>
// //                   <div>
// //                     <h4 className="font-medium text-sm mb-1">Advanced AI Models</h4>
// //                     <p className="text-xs text-gray-700 leading-snug">
// //                       State-of-the-art machine learning algorithms for accurate predictions
// //                     </p>
// //                   </div>
// //                 </li>
// //               </ul>
// //             </CardContent>
// //           </Card>
// //         </div>
// //       </div>

// //       {/* Animation Keyframes */}
// //       <style>{`
// //         @keyframes data-stream {
// //           0% { transform: translateY(-100%); opacity: 0; }
// //           50% { opacity: 1; }
// //           100% { transform: translateY(100%); opacity: 0; }
// //         }
// //         @keyframes glow {
// //           0%, 100% { opacity: 0.3; transform: scale(1); }
// //           50% { opacity: 0.5; transform: scale(1.1); }
// //         }
// //         @keyframes float {
// //           0% { transform: translateY(0) translateX(0); }
// //           33% { transform: translateY(-50px) translateX(20px); }
// //           66% { transform: translateY(30px) translateX(-20px); }
// //           100% { transform: translateY(0) translateX(0); }
// //         }
// //       `}</style>
// //     </div>
// //   );
// // };

// // export default PacxLanding6;






// import React from 'react';
// import { TrendingUp, Boxes, Cpu, Network, ArrowRight, Sparkles } from 'lucide-react';
// import { Card, CardContent } from '../components/ui/card';
// import { useNavigate } from 'react-router-dom';

// const PacxLanding6 = () => {
//   const navigate = useNavigate();

//   return (
//     <div className="relative min-h-screen overflow-hidden text-white">
//       {/* 
//         1) Dark Purple Background (top):
//            We’ll place all animations here at z-0.
//       */}
//       <div className="absolute inset-0 bg-gradient-to-br from-[#24172A] to-[#3A2740] z-0" />

//       {/* 
//         2) Less Bright White Overlay (bottom):
//            Using semi-transparent white so it's not too bright.
//            Increase or decrease h-[50vh] to adjust where the blend starts.
//       */}
//       <div className="absolute bottom-0 left-0 w-full h-[50vh] bg-gradient-to-t from-white/40 to-transparent z-10 pointer-events-none" />

//       {/* Floating / Animated Elements (z-0) */}
//       <div className="absolute inset-0 pointer-events-none z-0">
//         {/* Subtle grid overlay in white */}
//         <div className="absolute inset-0 bg-[linear-gradient(to_right,white/10_1px,transparent_1px),linear-gradient(to_bottom,white/10_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black_70%)]" />

//         {/* Large orbital rings in white */}
//         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-white/30 rounded-full animate-[spin_20s_linear_infinite]" />
//         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-white/20 rounded-full animate-[spin_15s_linear_infinite_reverse]" />

//         {/* Digital circuit lines in white */}
//         <div className="absolute top-0 left-0 w-full h-full">
//           <div className="absolute top-[20%] left-[10%] w-32 h-px bg-gradient-to-r from-transparent via-white/50 to-transparent animate-pulse" />
//           <div className="absolute top-[40%] right-[15%] w-48 h-px bg-gradient-to-r from-transparent via-white/50 to-transparent animate-pulse delay-300" />
//           <div className="absolute bottom-[30%] left-[25%] w-40 h-px bg-gradient-to-r from-transparent via-white/50 to-transparent animate-pulse delay-700" />
//         </div>

//         {/* Tech nodes in white */}
//         <div className="absolute top-1/4 left-1/4 w-3 h-3 bg-white rounded-full animate-ping [animation-duration:3s]" />
//         <div className="absolute top-3/4 right-1/4 w-3 h-3 bg-white rounded-full animate-ping [animation-duration:2.5s] delay-300" />
//         <div className="absolute top-1/2 right-1/3 w-3 h-3 bg-white rounded-full animate-ping [animation-duration:4s] delay-500" />

//         {/* Data streams in white */}
//         <div className="absolute h-full w-px bg-gradient-to-b from-transparent via-white/40 to-transparent left-1/4 animate-data-stream" />
//         <div className="absolute h-full w-px bg-gradient-to-b from-transparent via-white/40 to-transparent left-2/4 animate-data-stream delay-500" />
//         <div className="absolute h-full w-px bg-gradient-to-b from-transparent via-white/40 to-transparent right-1/4 animate-data-stream delay-1000" />

//         {/* Glowing orbs in white */}
//         <div className="absolute top-1/4 right-1/4 w-32 h-32 bg-white/10 rounded-full blur-3xl animate-glow" />
//         <div className="absolute bottom-1/3 left-1/3 w-40 h-40 bg-white/15 rounded-full blur-3xl animate-glow delay-700" />

//         {/* Digital particles in white */}
//         <div className="absolute inset-0">
//           {[...Array(20)].map((_, i) => (
//             <div
//               key={i}
//               className="absolute w-1 h-1 bg-white/40 rounded-full"
//               style={{
//                 top: `${Math.random() * 100}%`,
//                 left: `${Math.random() * 100}%`,
//                 animation: `float ${5 + Math.random() * 5}s linear infinite`,
//                 animationDelay: `${Math.random() * 5}s`
//               }}
//             />
//           ))}
//         </div>
//       </div>

//       {/* Main container for content (z-20) */}
//       <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24 z-20 space-y-16">
//         {/* Header section - white text for top portion */}
//         <div className="space-y-4">
//           <div className="flex items-center space-x-3">
//             <span className="px-3 py-1 rounded-full bg-[#5B3557] text-xs font-medium text-white">
//               AI-Powered Analytics
//             </span>
//             <Sparkles className="w-4 h-4 text-white" />
//           </div>
//           <h1 className="text-3xl lg:text-4xl font-semibold leading-tight">
//             <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-[#ddd]">
//               pacx.ai
//             </span>
//           </h1>
//           <div className="flex items-center text-gray-300 space-x-2">
//             <span className="text-sm font-medium">Powered by</span>
//             <TrendingUp className="w-5 h-5 text-white" />
//             <span className="text-sm font-light">Advanced AI</span>
//           </div>
//         </div>

//         {/* Main content */}
//         <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
//           {/* Left side (white text) */}
//           <div className="space-y-6">
//             <h2 className="text-2xl lg:text-3xl font-semibold leading-snug">
//               Transform Your Business with{' '}
//               <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-[#ccc]">
//                 AI-Driven Predictions
//               </span>
//             </h2>
//             <p className="text-sm lg:text-base font-medium text-gray-300 leading-relaxed">
//               Harness the power of advanced predictive analytics to make data-driven decisions, 
//               optimize operations, and stay ahead of market trends.
//             </p>
//             <div className="flex flex-col sm:flex-row gap-4">
//               <button
//                 className="group relative inline-flex items-center justify-center bg-[#5B3557] hover:bg-[#4a2a46] text-white font-medium py-3 px-6 rounded-xl text-sm transition-all duration-300"
//                 onClick={() => navigate('/bookademo')}
//               >
//                 Get Started Now
//                 <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
//               </button>
//               <button className="inline-flex items-center justify-center px-6 py-3 text-sm font-medium text-white bg-white/10 hover:bg-white/20 rounded-xl backdrop-blur-sm transition-all duration-300">
//                 Watch Demo
//               </button>
//             </div>
//           </div>

//           {/* Right side feature card (softer white background, darker text) */}
//           <Card className="bg-[#FAFAFA] text-[#1A1A1A] shadow-2xl rounded-2xl border border-gray-200 overflow-hidden">
//             <CardContent className="p-6 space-y-6">
//               <h3 className="text-xl font-semibold">
//                 Why Choose Pacx.ai?
//               </h3>
//               <ul className="space-y-5">
//                 <li className="flex items-start group">
//                   <div className="rounded-xl bg-[#5B3557]/10 p-2 mr-4 group-hover:bg-[#5B3557]/20 transition-all duration-300">
//                     <Cpu className="w-4 h-4 text-[#5B3557]" />
//                   </div>
//                   <div>
//                     <h4 className="font-medium text-sm mb-1">Real-time Analytics</h4>
//                     <p className="text-xs text-gray-700 leading-snug">
//                       Get instant insights with our powerful predictive engine
//                     </p>
//                   </div>
//                 </li>
//                 <li className="flex items-start group">
//                   <div className="rounded-xl bg-[#5B3557]/10 p-2 mr-4 group-hover:bg-[#5B3557]/20 transition-all duration-300">
//                     <Boxes className="w-4 h-4 text-[#5B3557]" />
//                   </div>
//                   <div>
//                     <h4 className="font-medium text-sm mb-1">Scalable Solutions</h4>
//                     <p className="text-xs text-gray-700 leading-snug">
//                       Enterprise-grade infrastructure that grows with your needs
//                     </p>
//                   </div>
//                 </li>
//                 <li className="flex items-start group">
//                   <div className="rounded-xl bg-[#5B3557]/10 p-2 mr-4 group-hover:bg-[#5B3557]/20 transition-all duration-300">
//                     <Network className="w-4 h-4 text-[#5B3557]" />
//                   </div>
//                   <div>
//                     <h4 className="font-medium text-sm mb-1">Advanced AI Models</h4>
//                     <p className="text-xs text-gray-700 leading-snug">
//                       State-of-the-art machine learning algorithms for accurate predictions
//                     </p>
//                   </div>
//                 </li>
//               </ul>
//             </CardContent>
//           </Card>
//         </div>
//       </div>

//       {/* Animation Keyframes */}
//       <style>{`
//         @keyframes data-stream {
//           0% { transform: translateY(-100%); opacity: 0; }
//           50% { opacity: 1; }
//           100% { transform: translateY(100%); opacity: 0; }
//         }
//         @keyframes glow {
//           0%, 100% { opacity: 0.3; transform: scale(1); }
//           50% { opacity: 0.5; transform: scale(1.1); }
//         }
//         @keyframes float {
//           0% { transform: translateY(0) translateX(0); }
//           33% { transform: translateY(-50px) translateX(20px); }
//           66% { transform: translateY(30px) translateX(-20px); }
//           100% { transform: translateY(0) translateX(0); }
//         }
//       `}</style>
//     </div>
//   );
// };

// export default PacxLanding6;




import React from 'react';
import { TrendingUp, Boxes, Cpu, Network, ArrowRight, Sparkles } from 'lucide-react';
import { Card, CardContent } from '../components/ui/card';
import { useNavigate } from 'react-router-dom';

const PacxLanding6 = () => {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen overflow-hidden text-white">
      {/* Dark Purple Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#110910] to-[#28162B] z-0" />

      {/* White Overlay (Lower Section) */}
      <div className="absolute bottom-0 left-0 w-full h-[50vh] bg-gradient-to-t from-white/15 to-transparent z-10 pointer-events-none" />

      {/* Floating & Animated Elements */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {/* Subtle Grid Overlay in White */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,white/10_1px,transparent_1px),linear-gradient(to_bottom,white/10_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black_70%)]" />

        {/* Large Orbital Rings in White */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-white/15 rounded-full animate-[spin_20s_linear_infinite]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-white/10 rounded-full animate-[spin_15s_linear_infinite_reverse]" />

        {/* Digital Circuit Lines in White */}
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-[20%] left-[10%] w-32 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse" />
          <div className="absolute top-[40%] right-[15%] w-48 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse delay-300" />
          <div className="absolute bottom-[30%] left-[25%] w-40 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse delay-700" />
        </div>

        {/* Tech Nodes in White */}
        <div className="absolute top-1/4 left-1/4 w-3 h-3 bg-white rounded-full animate-ping [animation-duration:3s]" />
        <div className="absolute top-3/4 right-1/4 w-3 h-3 bg-white rounded-full animate-ping [animation-duration:2.5s] delay-300" />
        <div className="absolute top-1/2 right-1/3 w-3 h-3 bg-white rounded-full animate-ping [animation-duration:4s] delay-500" />

        {/* Data Streams in White */}
        <div className="absolute h-full w-px bg-gradient-to-b from-transparent via-white/30 to-transparent left-1/4 animate-data-stream" />
        <div className="absolute h-full w-px bg-gradient-to-b from-transparent via-white/30 to-transparent left-2/4 animate-data-stream delay-500" />
        <div className="absolute h-full w-px bg-gradient-to-b from-transparent via-white/30 to-transparent right-1/4 animate-data-stream delay-1000" />

        {/* Glowing Orbs in White */}
        <div className="absolute top-1/4 right-1/4 w-32 h-32 bg-white/10 rounded-full blur-3xl animate-glow" />
        <div className="absolute bottom-1/3 left-1/3 w-40 h-40 bg-white/15 rounded-full blur-3xl animate-glow delay-700" />

        {/* Floating White Particles */}
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-white/50 rounded-full"
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

      {/* Main Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24 z-20 space-y-16">
        {/* Header Section */}
        <div className="space-y-4">
          <div className="flex items-center space-x-3">
            <span className="px-3 py-1 rounded-full bg-[#5B3557] text-xs font-medium text-white">
              AI-Powered Analytics
            </span>
            <Sparkles className="w-4 h-4 text-white" />
          </div>
          <h1 className="text-3xl lg:text-4xl font-semibold leading-tight">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-[#ddd]">
              pacx.ai
            </span>
          </h1>
          <div className="flex items-center text-gray-300 space-x-2">
            <span className="text-sm font-medium">Powered by</span>
            <TrendingUp className="w-5 h-5 text-white" />
            <span className="text-sm font-light">Advanced AI</span>
          </div>
        </div>

        {/* Main Section */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Side */}
          <div className="space-y-6">
            <h2 className="text-2xl lg:text-3xl font-semibold leading-snug">
              Transform Your Business with{' '}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-[#ccc]">
                AI-Driven Predictions
              </span>
            </h2>
            <p className="text-sm lg:text-base font-medium text-gray-300 leading-relaxed">
              Harness the power of advanced predictive analytics to make data-driven decisions, 
              optimize operations, and stay ahead of market trends.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                className="group relative inline-flex items-center justify-center bg-[#5B3557] hover:bg-[#4a2a46] text-white font-medium py-3 px-6 rounded-xl text-sm transition-all duration-300"
                onClick={() => navigate('/bookademo')}
              >
                Get Started Now
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="inline-flex items-center justify-center px-6 py-3 text-sm font-medium text-white bg-white/10 hover:bg-white/20 rounded-xl backdrop-blur-sm transition-all duration-300">
                Watch Demo
              </button>
            </div>
          </div>

          {/* Feature Card */}
          <Card className="bg-white text-[#1A1A1A] shadow-lg rounded-2xl border border-gray-300 overflow-hidden">
            <CardContent className="p-6 space-y-6">
              <h3 className="text-xl font-semibold">Why Choose Pacx.ai?</h3>
              <ul className="space-y-5">
                <li className="flex items-start group">
                  <div className="rounded-xl bg-gray-200 p-2 mr-4">
                    <Cpu className="w-4 h-4 text-[#5B3557]" />
                  </div>
                  <div>
                    <h4 className="font-medium text-sm mb-1">Real-time Analytics</h4>
                    <p className="text-xs text-gray-700 leading-snug">
                      Get instant insights with our powerful predictive engine
                    </p>
                  </div>
                </li>
                <li className="flex items-start group">
                  <div className="rounded-xl bg-gray-200 p-2 mr-4">
                    <Boxes className="w-4 h-4 text-[#5B3557]" />
                  </div>
                  <div>
                    <h4 className="font-medium text-sm mb-1">Scalable Solutions</h4>
                    <p className="text-xs text-gray-700 leading-snug">
                      Enterprise-grade infrastructure that grows with your needs
                    </p>
                  </div>
                </li>
                <li className="flex items-start group">
                  <div className="rounded-xl bg-gray-200 p-2 mr-4">
                    <Network className="w-4 h-4 text-[#5B3557]" />
                  </div>
                  <div>
                    <h4 className="font-medium text-sm mb-1">Advanced AI Models</h4>
                    <p className="text-xs text-gray-700 leading-snug">
                      State-of-the-art machine learning algorithms for accurate predictions
                    </p>
                  </div>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Animation Keyframes */}
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

export default PacxLanding6;
