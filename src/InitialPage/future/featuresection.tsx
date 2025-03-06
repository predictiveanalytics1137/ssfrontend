// import React from 'react';
// import { motion } from 'framer-motion';
// import { Brain, TrendingUp, Clock, AlertCircle, Users, UserMinus, LineChart, Factory, Shield } from 'lucide-react';



// const FeaturesSection = () => {
//   const features = [
//     {
//       icon: Brain,
//       title: "Machine Learning",
//       description: "Build machine learning models that predict future outcomes with unprecedented accuracy."
//     },
//     {
//       icon: TrendingUp,
//       title: "Predictive Analytics",
//       description: "Leverage advanced data analysis to predict trends and make informed business decisions."
//     },
//     {
//       icon: Clock,
//       title: "Time Series Forecasting",
//       description: "Forecast future values with precision based on historical time series data analysis."
//     },
//     {
//       icon: AlertCircle,
//       title: "Anomaly Detection",
//       description: "Detect outliers and anomalies in your data using sophisticated AI algorithms."
//     },
//     {
//       icon: Users,
//       title: "Customer Lifetime Value",
//       description: "Accurately predict and maximize the future value of customer relationships."
//     },
//     {
//       icon: UserMinus,
//       title: "Churn Prediction",
//       description: "Identify at-risk customers early and take proactive retention measures."
//     },
//     {
//       icon: LineChart,
//       title: "Demand Forecasting",
//       description: "Optimize inventory with AI-powered demand forecasting for products and services."
//     },
//     {
//       icon: Factory,
//       title: "Predictive Maintenance",
//       description: "Minimize downtime with AI-driven predictive maintenance for equipment and systems."
//     },
//     {
//       icon: Shield,
//       title: "Fraud Detection",
//       description: "Protect your business with advanced ML-powered fraud detection systems."
//     }
//   ];

//   return (
//     <section className="relative py-20 overflow-hidden">
//       {/* Animated background elements */}
//       <div className="absolute inset-0 bg-gradient-to-br from-purple-950 via-purple-900 to-indigo-950">
//         <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:32px_32px]" />
//       </div>

//       <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         {/* Section header */}
//         <div className="text-center mb-16">
//           <motion.div
//             initial={{ opacity: 0, y: -20 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//             transition={{ duration: 0.6 }}
//             className="inline-block mb-4 px-4 py-1.5 bg-white/10 backdrop-blur-sm rounded-full"
//           >
//             <span className="text-sm font-medium text-purple-200">
//               Powered by Advanced AI
//             </span>
//           </motion.div>

//           <motion.h2
//             initial={{ opacity: 0, y: 20 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//             transition={{ duration: 0.6, delay: 0.2 }}
//             className="text-4xl lg:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-purple-200"
//           >
//             Transform Data into Powerful Predictions
//           </motion.h2>

//           <motion.p
//             initial={{ opacity: 0, y: 20 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//             transition={{ duration: 0.6, delay: 0.3 }}
//             className="max-w-2xl mx-auto text-xl text-gray-300"
//           >
//             Unlock the full potential of your data with our comprehensive suite of AI-powered predictive analytics tools.
//           </motion.p>
//         </div>

//         {/* Features grid */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
//           {features.map((feature, index) => (
//             <FeatureCard
//               key={feature.title}
//               icon={feature.icon}
//               title={feature.title}
//               description={feature.description}
//               index={index}
//             />
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default FeaturesSection;