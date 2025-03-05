// // // import React from 'react';
// // // import { motion } from 'framer-motion';
// // // import { Brain, TrendingUp, Clock, AlertCircle, Users, UserMinus, LineChart, Factory, Shield } from 'lucide-react';
// // // import FeatureCard from './feature';

// // // const FeaturesSection2 = () => {
// // //   const features = [
// // //     {
// // //       icon: Brain,
// // //       title: "Machine Learning",
// // //       description: "Build machine learning models that predict future outcomes with unprecedented accuracy."
// // //     },
// // //     {
// // //       icon: TrendingUp,
// // //       title: "Predictive Analytics",
// // //       description: "Leverage advanced data analysis to predict trends and make informed business decisions."
// // //     },
// // //     {
// // //       icon: Clock,
// // //       title: "Time Series Forecasting",
// // //       description: "Forecast future values with precision based on historical time series data analysis."
// // //     },
// // //     {
// // //       icon: AlertCircle,
// // //       title: "Anomaly Detection",
// // //       description: "Detect outliers and anomalies in your data using sophisticated AI algorithms."
// // //     },
// // //     {
// // //       icon: Users,
// // //       title: "Customer Lifetime Value",
// // //       description: "Accurately predict and maximize the future value of customer relationships."
// // //     },
// // //     {
// // //       icon: UserMinus,
// // //       title: "Churn Prediction",
// // //       description: "Identify at-risk customers early and take proactive retention measures."
// // //     },
// // //     {
// // //       icon: LineChart,
// // //       title: "Demand Forecasting",
// // //       description: "Optimize inventory with AI-powered demand forecasting for products and services."
// // //     },
// // //     {
// // //       icon: Factory,
// // //       title: "Predictive Maintenance",
// // //       description: "Minimize downtime with AI-driven predictive maintenance for equipment and systems."
// // //     },
// // //     {
// // //       icon: Shield,
// // //       title: "Fraud Detection",
// // //       description: "Protect your business with advanced ML-powered fraud detection systems."
// // //     }
// // //   ];

// // //   return (
// // //     <section className="relative py-20 overflow-hidden">
// // //       {/* Unique background treatment */}
// // //       <div className="absolute inset-0">
// // //         {/* Dark overlay with mesh gradient */}
// // //         <div className="absolute inset-0 bg-gradient-to-b from-purple-950 via-[#2a1635] to-[#1a0f21]">
// // //           {/* Hexagonal grid pattern */}
// // //           <div className="absolute inset-0" style={{
// // //             backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0l25.98 15v30L30 60 4.02 45V15z' fill-opacity='0.05' fill='%239b5de5' fill-rule='evenodd'/%3E%3C/svg%3E")`,
// // //             backgroundSize: '60px 60px'
// // //           }} />
// // //         </div>

// // //         {/* Glowing orbs */}
// // //         <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl animate-pulse" />
// // //         <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl animate-pulse delay-1000" />

// // //         {/* Animated lines */}
// // //         <div className="absolute inset-0">
// // //           <div className="absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-500/20 to-transparent animate-scan" />
// // //           <div className="absolute top-2/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-500/20 to-transparent animate-scan delay-1000" />
// // //           <div className="absolute top-3/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-500/20 to-transparent animate-scan delay-2000" />
// // //         </div>
// // //       </div>

// // //       <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
// // //         {/* Section header */}
// // //         <div className="text-center mb-16">
// // //           <motion.div
// // //             initial={{ opacity: 0, y: -20 }}
// // //             whileInView={{ opacity: 1, y: 0 }}
// // //             viewport={{ once: true }}
// // //             transition={{ duration: 0.6 }}
// // //             className="inline-block mb-4 px-4 py-1.5 bg-white/10 backdrop-blur-sm rounded-full"
// // //           >
// // //             <span className="text-sm font-medium text-purple-200">
// // //               Powered by Advanced AI
// // //             </span>
// // //           </motion.div>

// // //           <motion.h2
// // //             initial={{ opacity: 0, y: 20 }}
// // //             whileInView={{ opacity: 1, y: 0 }}
// // //             viewport={{ once: true }}
// // //             transition={{ duration: 0.6, delay: 0.2 }}
// // //             className="text-4xl lg:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-purple-200"
// // //           >
// // //             Transform Data into Powerful Predictions
// // //           </motion.h2>

// // //           <motion.p
// // //             initial={{ opacity: 0, y: 20 }}
// // //             whileInView={{ opacity: 1, y: 0 }}
// // //             viewport={{ once: true }}
// // //             transition={{ duration: 0.6, delay: 0.3 }}
// // //             className="max-w-2xl mx-auto text-xl text-gray-300"
// // //           >
// // //             Unlock the full potential of your data with our comprehensive suite of AI-powered predictive analytics tools.
// // //           </motion.p>
// // //         </div>

// // //         {/* Features grid */}
// // //         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
// // //           {features.map((feature, index) => (
// // //             <FeatureCard
// // //               key={feature.title}
// // //               icon={feature.icon}
// // //               title={feature.title}
// // //               description={feature.description}
// // //               index={index}
// // //             />
// // //           ))}
// // //         </div>
// // //       </div>

// // //       {/* Add these keyframes to your global CSS */}
// // //       <style>{`
// // //         @keyframes scan {
// // //           0% { transform: translateX(-100%); opacity: 0; }
// // //           50% { opacity: 1; }
// // //           100% { transform: translateX(100%); opacity: 0; }
// // //         }
// // //       `}</style>
// // //     </section>
// // //   );
// // // };

// // // export default FeaturesSection2;







// // // // import React from 'react';
// // // // import { motion } from 'framer-motion';
// // // // import { Brain, TrendingUp, Clock, AlertCircle, Users, UserMinus, LineChart, Factory, Shield } from 'lucide-react';
// // // // import FeatureCard from './feature';

// // // // const FeaturesSection2: React.FC = () => {
// // // //   const features = [
// // // //     {
// // // //       icon: Brain,
// // // //       title: "Quantum Learning",
// // // //       description: "Harness quantum AI for precise future predictions."
// // // //     },
// // // //     {
// // // //       icon: TrendingUp,
// // // //       title: "Cosmic Analytics",
// // // //       description: "Navigate trends with interstellar data insights."
// // // //     },
// // // //     {
// // // //       icon: Clock,
// // // //       title: "Temporal Forecasting",
// // // //       description: "Predict timelines from celestial data patterns."
// // // //     },
// // // //     {
// // // //       icon: AlertCircle,
// // // //       title: "Astro Anomaly Detection",
// // // //       description: "Spot cosmic anomalies with advanced AI."
// // // //     },
// // // //     {
// // // //       icon: Users,
// // // //       title: "Stellar Customer Value",
// // // //       description: "Maximize value across star systems."
// // // //     },
// // // //     {
// // // //       icon: UserMinus,
// // // //       title: "Galaxy Churn Prediction",
// // // //       description: "Prevent losses in the vast universe."
// // // //     },
// // // //     {
// // // //       icon: LineChart,
// // // //       title: "Nebula Demand Forecasting",
// // // //       description: "Optimize resources across nebulae."
// // // //     },
// // // //     {
// // // //       icon: Factory,
// // // //       title: "Celestial Maintenance",
// // // //       description: "Maintain systems with star-powered predictions."
// // // //     },
// // // //     {
// // // //       icon: Shield,
// // // //       title: "Interstellar Fraud Detection",
// // // //       description: "Protect against cosmic threats."
// // // //     }
// // // //   ];

// // // //   return (
// // // //     <section className="relative py-20 overflow-hidden">
// // // //       <div className="absolute inset-0 bg-white">
// // // //         {/* Nebula gradient overlay */}
// // // //         <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#9b5de510_0%,transparent_70%)] opacity-10" />
        
// // // //         {/* Starfield animation */}
// // // //         <div className="absolute inset-0">
// // // //           {[...Array(50)].map((_, i) => (
// // // //             <div
// // // //               key={i}
// // // //               className="absolute w-1 h-1 bg-[#9b5de5]/40 rounded-full"
// // // //               style={{
// // // //                 top: `${Math.random() * 100}%`,
// // // //                 left: `${Math.random() * 100}%`,
// // // //                 animation: `twinkle ${2 + Math.random() * 3}s infinite alternate`,
// // // //                 animationDelay: `${Math.random() * 5}s`
// // // //               }}
// // // //             />
// // // //           ))}
// // // //         </div>

// // // //         {/* Floating nebulae */}
// // // //         <motion.div
// // // //           animate={{ scale: [1, 1.1, 1], rotate: [0, 360, 0] }}
// // // //           transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
// // // //           className="absolute top-1/4 left-1/4 w-48 h-48 bg-[#9b5de5]/15 rounded-full blur-2xl animate-pulse"
// // // //         />
// // // //         <motion.div
// // // //           animate={{ scale: [1, 1.15, 1], rotate: [0, -360, 0] }}
// // // //           transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
// // // //           className="absolute bottom-1/3 right-1/3 w-64 h-64 bg-[#5B3557]/10 rounded-full blur-2xl animate-pulse delay-500"
// // // //         />
// // // //       </div>

// // // //       <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
// // // //         <div className="text-center mb-16">
// // // //           <motion.div
// // // //             initial={{ opacity: 0, y: -20 }}
// // // //             whileInView={{ opacity: 1, y: 0 }}
// // // //             viewport={{ once: true }}
// // // //             transition={{ duration: 0.6 }}
// // // //             className="inline-block px-4 py-1.5 bg-[#5B3557]/20 rounded-full backdrop-blur-md"
// // // //           >
// // // //             <span className="text-sm font-medium text-[#5B3557]">
// // // //               Cosmic Features
// // // //             </span>
// // // //           </motion.div>

// // // //           <motion.h2
// // // //             initial={{ opacity: 0, y: 20 }}
// // // //             whileInView={{ opacity: 1, y: 0 }}
// // // //             viewport={{ once: true }}
// // // //             transition={{ duration: 0.6, delay: 0.2 }}
// // // //             className="text-4xl lg:text-5xl font-bold text-[#1A1A1A]"
// // // //           >
// // // //             Discover the Universe of AI
// // // //           </motion.h2>

// // // //           <motion.p
// // // //             initial={{ opacity: 0, y: 20 }}
// // // //             whileInView={{ opacity: 1, y: 0 }}
// // // //             viewport={{ once: true }}
// // // //             transition={{ duration: 0.6, delay: 0.3 }}
// // // //             className="max-w-2xl mx-auto text-xl text-gray-600 mt-4"
// // // //           >
// // // //             Explore PACX.ai’s stellar tools to navigate the cosmos of data and predictions.
// // // //           </motion.p>
// // // //         </div>

// // // //         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
// // // //           {features.map((feature, index) => (
// // // //             <FeatureCard
// // // //               key={feature.title}
// // // //               icon={feature.icon}
// // // //               title={feature.title}
// // // //               description={feature.description}
// // // //               index={index}
// // // //               className="bg-white border border-[#5B3557]/10 hover:border-[#5B3557]/20 shadow-md hover:shadow-lg glow"
// // // //             />
// // // //           ))}
// // // //         </div>
// // // //       </div>

// // // //       <style>{`
// // // //         @keyframes twinkle {
// // // //           0%, 100% { opacity: 0.3; transform: scale(1); }
// // // //           50% { opacity: 1; transform: scale(1.2); }
// // // //         }
// // // //         .glow {
// // // //           box-shadow: 0 0 15px rgba(155, 93, 229, 0.3);
// // // //           transition: box-shadow 0.3s ease;
// // // //         }
// // // //         .glow:hover {
// // // //           box-shadow: 0 0 25px rgba(155, 93, 229, 0.5);
// // // //         }
// // // //       `}</style>
// // // //     </section>
// // // //   );
// // // // };

// // // // export default FeaturesSection2;




// // import React from 'react';
// // import { motion } from 'framer-motion';
// // import {
// //   Cpu,
// //   TrendingUp,
// //   Clock,
// //   AlertCircle,
// //   Users,
// //   UserMinus,
// //   LineChart,
// //   Factory,
// //   Shield
// // } from 'lucide-react';
// // import { Card, CardContent } from '../../components/ui/card';

// // const FeaturesSection2: React.FC = () => {
// //   const features = [
// //     {
// //       icon: Cpu,
// //       title: "Machine Learning",
// //       description: "Build advanced ML models that predict future outcomes with unprecedented accuracy, enabling data-driven strategies and continuous improvement."
// //     },
// //     {
// //       icon: TrendingUp,
// //       title: "Predictive Analytics",
// //       description: "Leverage advanced data analysis to anticipate trends, uncover hidden insights, and guide strategic decision-making for sustainable growth."
// //     },
// //     {
// //       icon: Clock,
// //       title: "Time Series Forecasting",
// //       description: "Forecast future values with high accuracy by analyzing historical data patterns and seasonal fluctuations, ensuring precise resource planning."
// //     },
// //     {
// //       icon: AlertCircle,
// //       title: "Anomaly Detection",
// //       description: "Detect outliers and unusual patterns in real time, enabling you to proactively mitigate potential risks or system failures."
// //     },
// //     {
// //       icon: Users,
// //       title: "Customer Lifetime Value",
// //       description: "Accurately predict the long-term profitability of each customer, helping you allocate resources and tailor marketing efforts for maximum ROI."
// //     },
// //     {
// //       icon: UserMinus,
// //       title: "Churn Prediction",
// //       description: "Identify at-risk customers early, understand the reasons behind churn, and take proactive retention measures to safeguard your revenue."
// //     },
// //     {
// //       icon: LineChart,
// //       title: "Demand Forecasting",
// //       description: "Optimize inventory and resource planning across multiple channels, reducing waste and ensuring timely delivery of products or services."
// //     },
// //     {
// //       icon: Factory,
// //       title: "Predictive Maintenance",
// //       description: "Minimize downtime by anticipating maintenance needs using AI-driven insights, extending equipment life and cutting operational costs."
// //     },
// //     {
// //       icon: Shield,
// //       title: "Fraud Detection",
// //       description: "Protect your business and customers from fraudulent activities with real-time ML-powered detection systems that identify suspicious transactions."
// //     }
// //   ];

// //   return (
// //     <section className="relative py-16 bg-white overflow-hidden">
// //       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
// //         {/* Section Header */}
// //         <div className="text-center mb-12">
// //           <motion.div
// //             initial={{ opacity: 0, y: -10 }}
// //             whileInView={{ opacity: 1, y: 0 }}
// //             viewport={{ once: true }}
// //             transition={{ duration: 0.5 }}
// //             className="inline-block px-3 py-1 bg-gray-100 rounded-full"
// //           >
// //             <span className="text-sm font-medium text-gray-700">
// //               Predictive Analytics Features
// //             </span>
// //           </motion.div>

// //           <motion.h2
// //             initial={{ opacity: 0, y: 10 }}
// //             whileInView={{ opacity: 1, y: 0 }}
// //             viewport={{ once: true }}
// //             transition={{ duration: 0.5, delay: 0.2 }}
// //             className="text-3xl sm:text-4xl font-bold text-gray-800 mt-4"
// //           >
// //             Unlock Data-Driven Insights
// //           </motion.h2>

// //           <motion.p
// //             initial={{ opacity: 0, y: 10 }}
// //             whileInView={{ opacity: 1, y: 0 }}
// //             viewport={{ once: true }}
// //             transition={{ duration: 0.5, delay: 0.3 }}
// //             className="mt-2 text-sm text-gray-600 max-w-xl mx-auto"
// //           >
// //             Our comprehensive suite of predictive analytics solutions empowers you to forecast trends,
// //             detect anomalies, and optimize your operations with precise, data-driven insights.
// //           </motion.p>
// //         </div>

// //         {/* Features Grid */}
// //         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
// //           {features.map((feature, index) => (
// //             <motion.div
// //               key={feature.title}
// //               initial={{ opacity: 0, y: 10 }}
// //               whileInView={{ opacity: 1, y: 0 }}
// //               viewport={{ once: true }}
// //               transition={{ duration: 0.5, delay: index * 0.1 }}
// //             >
// //               <Card className="bg-white border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300">
// //                 <CardContent className="p-4 space-y-2">
// //                   {/* Icon */}
// //                   <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-100">
// //                     <feature.icon className="w-5 h-5 text-[#5B3557]" />
// //                   </div>
// //                   {/* Title */}
// //                   <h3 className="text-sm font-semibold text-gray-800">
// //                     {feature.title}
// //                   </h3>
// //                   {/* Description */}
// //                   <p className="text-sm text-gray-600 leading-snug">
// //                     {feature.description}
// //                   </p>
// //                 </CardContent>
// //               </Card>
// //             </motion.div>
// //           ))}
// //         </div>
// //       </div>
// //     </section>
// //   );
// // };

// // export default FeaturesSection2;







// import React from 'react';
// import { motion } from 'framer-motion';
// import {
//   Cpu,
//   TrendingUp,
//   Clock,
//   AlertCircle,
//   Users,
//   UserMinus,
//   LineChart,
//   Factory,
//   Shield,
// } from 'lucide-react';
// import { Card, CardContent } from '../../components/ui/card';

// const FeaturesSection2: React.FC = () => {
//   const features = [
//     {
//       icon: Cpu,
//       title: 'Machine Learning',
//       description:
//         'Build advanced ML models that predict future outcomes with unprecedented accuracy, enabling data-driven strategies and continuous improvement.',
//     },
//     {
//       icon: TrendingUp,
//       title: 'Predictive Analytics',
//       description:
//         'Leverage advanced data analysis to anticipate trends, uncover hidden insights, and guide strategic decision-making for sustainable growth.',
//     },
//     {
//       icon: Clock,
//       title: 'Time Series Forecasting',
//       description:
//         'Forecast future values with high accuracy by analyzing historical data patterns and seasonal fluctuations, ensuring precise resource planning.',
//     },
//     {
//       icon: AlertCircle,
//       title: 'Anomaly Detection',
//       description:
//         'Detect outliers and unusual patterns in real time, enabling you to proactively mitigate potential risks or system failures.',
//     },
//     {
//       icon: Users,
//       title: 'Customer Lifetime Value',
//       description:
//         'Accurately predict the long-term profitability of each customer, helping you allocate resources and tailor marketing efforts for maximum ROI.',
//     },
//     {
//       icon: UserMinus,
//       title: 'Churn Prediction',
//       description:
//         'Identify at-risk customers early, understand the reasons behind churn, and take proactive retention measures to safeguard your revenue.',
//     },
//     {
//       icon: LineChart,
//       title: 'Demand Forecasting',
//       description:
//         'Optimize inventory and resource planning across multiple channels, reducing waste and ensuring timely delivery of products or services.',
//     },
//     {
//       icon: Factory,
//       title: 'Predictive Maintenance',
//       description:
//         'Minimize downtime by anticipating maintenance needs using AI-driven insights, extending equipment life and cutting operational costs.',
//     },
//     {
//       icon: Shield,
//       title: 'Fraud Detection',
//       description:
//         'Protect your business and customers from fraudulent activities with real-time ML-powered detection systems that identify suspicious transactions.',
//     },
//   ];

//   return (
//     <section className="relative py-24 bg-white overflow-hidden">
//       <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
//         {/* Section Header */}
//         <div className="text-center mb-16">
//           <motion.div
//             initial={{ opacity: 0, y: -10 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//             transition={{ duration: 0.5 }}
//             className="inline-block px-4 py-2 bg-gray-100 rounded-full"
//           >
//             <span className="text-base font-medium text-gray-700">
//               Predictive Analytics Features
//             </span>
//           </motion.div>

//           <motion.h2
//             initial={{ opacity: 0, y: 10 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//             transition={{ duration: 0.5, delay: 0.2 }}
//             className="text-4xl sm:text-5xl font-bold text-[#5B3557] mt-6"
//           >
//             Unlock Data-Driven Insights
//           </motion.h2>

//           <motion.p
//             initial={{ opacity: 0, y: 10 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//             transition={{ duration: 0.5, delay: 0.3 }}
//             className="mt-4 text-base text-gray-600 max-w-2xl mx-auto leading-relaxed"
//           >
//             Our comprehensive suite of predictive analytics solutions empowers you
//             to forecast trends, detect anomalies, and optimize your operations
//             with precise, data-driven insights.
//           </motion.p>
//         </div>

//         {/* Features Grid */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
//           {features.map((feature, index) => (
//             <motion.div
//               key={feature.title}
//               initial={{ opacity: 0, y: 10 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               viewport={{ once: true }}
//               transition={{ duration: 0.5, delay: index * 0.1 }}
//             >
//               <Card className="bg-white border border-gray-200 shadow-sm hover:shadow-lg transition-transform duration-300 transform hover:-translate-y-1">
//                 <CardContent className="p-6 space-y-3">
//                   {/* Icon */}
//                   <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gray-100">
//                     <feature.icon className="w-6 h-6 text-[#5B3557]" />
//                   </div>
//                   {/* Title */}
//                   <h3 className="text-base font-semibold text-[#5B3557]">
//                     {feature.title}
//                   </h3>
//                   {/* Description */}
//                   <p className="text-sm text-gray-600 leading-relaxed">
//                     {feature.description}
//                   </p>
//                 </CardContent>
//               </Card>
//             </motion.div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default FeaturesSection2;





import React from 'react';
import { motion } from 'framer-motion';
import {
  Cpu,
  TrendingUp,
  Clock,
  AlertCircle,
  Users,
  UserMinus,
  LineChart,
  Factory,
  Shield,
} from 'lucide-react';
import { Card, CardContent } from '../../components/ui/card';

const FeaturesSection2: React.FC = () => {
  const features = [
    {
      icon: Cpu,
      title: 'Machine Learning',
      description:
        'Build advanced ML models that predict future outcomes with unprecedented accuracy, enabling data-driven strategies and continuous improvement.',
    },
    {
      icon: TrendingUp,
      title: 'Predictive Analytics',
      description:
        'Leverage advanced data analysis to anticipate trends, uncover hidden insights, and guide strategic decision-making for sustainable growth.',
    },
    {
      icon: Clock,
      title: 'Time Series Forecasting',
      description:
        'Forecast future values with high accuracy by analyzing historical data patterns and seasonal fluctuations, ensuring precise resource planning.',
    },
    {
      icon: AlertCircle,
      title: 'Anomaly Detection',
      description:
        'Detect outliers and unusual patterns in real time, enabling you to proactively mitigate potential risks or system failures.',
    },
    {
      icon: Users,
      title: 'Customer Lifetime Value',
      description:
        'Accurately predict the long-term profitability of each customer, helping you allocate resources and tailor marketing efforts for maximum ROI.',
    },
    {
      icon: UserMinus,
      title: 'Churn Prediction',
      description:
        'Identify at-risk customers early, understand the reasons behind churn, and take proactive retention measures to safeguard your revenue.',
    },
    {
      icon: LineChart,
      title: 'Demand Forecasting',
      description:
        'Optimize inventory and resource planning across multiple channels, reducing waste and ensuring timely delivery of products or services.',
    },
    {
      icon: Factory,
      title: 'Predictive Maintenance',
      description:
        'Minimize downtime by anticipating maintenance needs using AI-driven insights, extending equipment life and cutting operational costs.',
    },
    {
      icon: Shield,
      title: 'Fraud Detection',
      description:
        'Protect your business and customers from fraudulent activities with real-time ML-powered detection systems that identify suspicious transactions.',
    },
  ];

  return (
    <section className="relative py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-block px-4 py-2 bg-gray-100 rounded-full"
          >
            <span className="text-base font-medium text-gray-700">
              Predictive Analytics Features
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-4xl sm:text-5xl font-bold text-[#5B3557] mt-6"
          >
            Unlock Data-Driven Insights
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-4 text-base text-gray-600 max-w-2xl mx-auto leading-relaxed"
          >
            Our comprehensive suite of predictive analytics solutions empowers you
            to forecast trends, detect anomalies, and optimize your operations
            with precise, data-driven insights.
          </motion.p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-16">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="bg-white border border-gray-200 shadow-sm hover:shadow-lg transition-transform duration-300 transform hover:-translate-y-1">
                <CardContent className="p-4 space-y-2">
                  {/* Icon */}
                  <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gray-100">
                    <feature.icon className="w-6 h-6 text-[#5B3557]" />
                  </div>
                  {/* Title */}
                  <h3 className="text-base font-semibold text-[#5B3557]">
                    {feature.title}
                  </h3>
                  {/* Description */}
                  <p className="text-sm text-gray-600 leading-normal">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection2;
