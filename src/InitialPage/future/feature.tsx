// // import React from 'react';
// // import { motion } from 'framer-motion';

// // interface FeatureCardProps {
// //   icon: React.ComponentType<{ className?: string }>;
// //   title: string;
// //   description: string;
// //   index: number;
// // }

// // const FeatureCard: React.FC<FeatureCardProps> = ({ icon: Icon, title, description, index }) => {
// //   return (
// //     <motion.div
// //       initial={{ opacity: 0, y: 20 }}
// //       whileInView={{ opacity: 1, y: 0 }}
// //       viewport={{ once: true }}
// //       transition={{ duration: 0.5, delay: index * 0.1 }}
// //       className="group relative overflow-hidden rounded-2xl bg-white/10 backdrop-blur-lg border border-white/10 p-6 hover:shadow-2xl hover:shadow-purple-500/10 transition-all duration-300"
// //     >
// //       {/* Background gradient */}
// //       <div className="absolute inset-0 bg-gradient-to-br from-purple-950/50 to-indigo-950/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
// //       {/* Content */}
// //       <div className="relative z-10">
// //         {/* Icon container with glow effect */}
// //         <div className="mb-6 inline-block">
// //           <div className="relative">
// //             <div className="absolute inset-0 bg-purple-500/20 blur-xl rounded-full group-hover:bg-purple-500/30 transition-all duration-300" />
// //             <div className="relative w-12 h-12 flex items-center justify-center rounded-xl bg-[#5B3557] group-hover:bg-[#4a2a46] transition-colors duration-300">
// //               <Icon className="w-6 h-6 text-purple-100" />
// //             </div>
// //           </div>
// //         </div>

// //         {/* Title with gradient effect */}
// //         <h3 className="text-xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-white to-purple-200 group-hover:to-purple-300 transition-colors duration-300">
// //           {title}
// //         </h3>

// //         {/* Description */}
// //         <p className="text-gray-300 leading-relaxed">
// //           {description}
// //         </p>

// //         {/* Hover indicator */}
// //         <div className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-purple-500 to-indigo-500 w-0 group-hover:w-full transition-all duration-300" />
// //       </div>
// //     </motion.div>
// //   );
// // };

// // export default FeatureCard;





// import React from 'react';
// import { LucideIcon } from 'lucide-react';
// import { motion } from 'framer-motion';

// interface FeatureCardProps {
//   icon: LucideIcon;
//   title: string;
//   description: string;
//   className?: string;
//   index: number;
// }

// const FeatureCard: React.FC<FeatureCardProps> = ({
//   icon: Icon,
//   title,
//   description,
//   className = '',
//   index,
// }) => (
//   <motion.div
//     initial={{ opacity: 0, y: 30 }}
//     whileInView={{ opacity: 1, y: 0 }}
//     viewport={{ once: true }}
//     transition={{ duration: 0.5, delay: index * 0.1 }}
//     whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
//     className={`bg-white p-6 rounded-xl border border-[#5B3557]/10 hover:border-[#5B3557]/20 shadow-md hover:shadow-lg transition-all ${className}`}
//   >
//     <div className="flex items-center gap-4 mb-4">
//       <div className="w-12 h-12 bg-[#5B3557]/20 rounded-full flex items-center justify-center glow">
//         <Icon className="w-6 h-6 text-[#5B3557]" />
//       </div>
//       <h3 className="font-bold text-[#1A1A1A] text-lg">{title}</h3>
//     </div>
//     <p className="font-medium">{description}</p>
//   </motion.div>
// );

// export default FeatureCard;