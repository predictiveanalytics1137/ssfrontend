// // import React from 'react';
// // import { LucideIcon } from 'lucide-react';
// // import { motion } from 'framer-motion';
// // import {
// //   Brain,
// //   TrendingUp,
// //   Clock,
// //   AlertCircle,
// //   Users,
// //   UserMinus,
// //   LineChart,
// //   Factory,
// //   Shield,
// //   Database,
// //   FileInput,
// //   Cpu,
// //   Zap,
// //   BarChart2,
// //   RefreshCw,
// // } from 'lucide-react';
// // import Navbar from '../Navbar/Navbar';
// // import { useNavigate } from 'react-router-dom';
// // import PacxLanding6 from './landing6';
// // import PacxLanding7 from './landing7';
// // import FeaturesSection from './future/featuresection';
// // import FeaturesSection2 from './future/featuresection2';
// // import Navbar2 from '../Navbar/navbar2';
// // import Navbar3 from '../Navbar/navbar3';

// // interface FeatureCardProps {
// //   icon: LucideIcon;
// //   title: string;
// //   description: string;
// //   className?: string;
// //   index: number;
// // }

// // interface ProcessStepProps {
// //   icon: LucideIcon;
// //   number: string;
// //   title: string;
// //   description: string;
// //   index: number;
// // }




// // const FeatureCard: React.FC<FeatureCardProps> = ({
// //   icon: Icon,
// //   title,
// //   description,
// //   className = '',
// //   index,
// // }) => (
// //   <motion.div
// //     initial={{ opacity: 0, y: 30 }}
// //     whileInView={{ opacity: 1, y: 0 }}
// //     viewport={{ once: true }}
// //     transition={{ duration: 0.5, delay: index * 0.1 }}
// //     whileHover={{ y: -5, transition: { duration: 0.2 } }}
// //     className="bg-white p-4 rounded-xl shadow-sm hover:shadow-xl transition-all"
// //   >
// //     <div
// //       className={`w-full h-48 rounded-lg mb-3 flex items-center justify-center ${className}`}
// //     >
// //       <Icon className="w-12 h-12 text-white" />
// //     </div>
// //     <h3 className="font-semibold text-gray-700 mb-1 text-sm">{title}</h3>
// //     <p className="text-teal-700 text-xs">{description}</p>
// //   </motion.div>
// // );

// // const ProcessStep: React.FC<ProcessStepProps> = ({
// //   icon: Icon,
// //   number,
// //   title,
// //   description,
// //   index,
// // }) => (
// //   <motion.div
// //     initial={{ opacity: 0, x: -30 }}
// //     whileInView={{ opacity: 1, x: 0 }}
// //     viewport={{ once: true }}
// //     transition={{ duration: 0.5, delay: index * 0.1 }}
// //     whileHover={{ scale: 1.02 }}
// //     className="bg-white p-4 rounded-xl shadow-sm hover:shadow-lg transition-all"
// //   >
// //     <div className="flex items-center gap-3 mb-2">
// //       <motion.div
// //         whileHover={{ rotate: 360 }}
// //         transition={{ duration: 0.5 }}
// //         className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center"
// //       >
// //         <Icon className="w-6 h-6 text-teal-600" />
// //       </motion.div>
// //       <div>
// //         <div className="text-xs text-teal-700 font-medium">{number}</div>
// //         <h3 className="font-bold text-gray-700 text-sm">{title}</h3>
// //       </div>
// //     </div>
// //     <p className="text-teal-700 text-xs">{description}</p>
// //   </motion.div>
// // );

// // const InitialPage = () => {

// //   const navigate = useNavigate();

// //   const handleButtonClick = () => {
// //     navigate('/Home');
// //   };

// //   return (
// //     <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white pt-16">
// //       {/* Include Navbar */}
// //       {/* <Navbar /> */}
// //       <Navbar2 />
// //       {/* <Navbar3 />  */}

// //       {/* Hero Section */}
// //       {/* <LandingPage />
// //       <PacxLanding />
// //       <PacxLanding2 />
// //       <PacxLanding4 />
// //       <PacxLanding5 />
// //       <PacxLanding6 /> */}
// //       <PacxLanding6 />
// //       {/* <PacxLanding7 /> */}
// //       {/* <PacxLanding8 />
// //       <PacxLanding9 /> */}


// //       {/* <FeaturesSection /> */}
// //       <FeaturesSection2 />

// //       {/* Features Section */}

// //       {/* How It Works Section */}
// //       <section className="py-12 md:py-20">
// //         <div className="max-w-6xl mx-auto px-4">
// //           <motion.h2
// //             initial={{ opacity: 0, y: 20 }}
// //             whileInView={{ opacity: 1, y: 0 }}
// //             viewport={{ once: true }}
// //             transition={{ duration: 0.6 }}
// //             className="text-2xl md:text-3xl font-bold text-gray-800 text-center mb-10"
// //           >
// //             How PACX AI Works
// //           </motion.h2>
// //           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
// //             {/* Process Steps */}
// //             <ProcessStep
// //               icon={Database}
// //               number="1. Data Collection"
// //               title="Gather Data"
// //               description="Collect historical and real-time data from various sources and systems."
// //               index={0}
// //             />
// //             <ProcessStep
// //               icon={FileInput}
// //               number="2. Data Processing"
// //               title="Process & Clean"
// //               description="Clean, organize, and prepare the data for analysis and model training."
// //               index={1}
// //             />
// //             <ProcessStep
// //               icon={Cpu}
// //               number="3. Model Training"
// //               title="Train Models"
// //               description="Develop and refine machine learning models based on the prepared data."
// //               index={2}
// //             />
// //             <ProcessStep
// //               icon={Zap}
// //               number="4. Real-Time Predictions"
// //               title="Make Predictions"
// //               description="Use the trained models to predict future outcomes and events in real time."
// //               index={3}
// //             />
// //             <ProcessStep
// //               icon={BarChart2}
// //               number="5. Results Analysis"
// //               title="Analyze Results"
// //               description="Review and interpret the predictions to inform decision-making and actions."
// //               index={4}
// //             />
// //             <ProcessStep
// //               icon={RefreshCw}
// //               number="6. Feedback Loop"
// //               title="Continuous Improvement"
// //               description="Incorporate feedback and new data to continuously improve the models and predictions."
// //               index={5}
// //             />
// //           </div>
// //         </div>
// //       </section>

// //       {/* Call to Action Section */}
// //       <section className="py-12 md:py-20 bg-gray-50">
// //         <div className="max-w-3xl mx-auto px-4 text-center">
// //           <motion.h2
// //             initial={{ opacity: 0, y: 20 }}
// //             whileInView={{ opacity: 1, y: 0 }}
// //             viewport={{ once: true }}
// //             transition={{ duration: 0.6 }}
// //             className="text-2xl md:text-3xl font-bold text-gray-800 mb-6"
// //           >
// //             Ready to Harness the Power of AI?
// //           </motion.h2>
// //           <motion.button
// //             whileHover={{ scale: 1.05 }}
// //             whileTap={{ scale: 0.95 }}
// //             className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-2 rounded-lg font-medium text-sm transition-colors"
// //           >
// //             Start Your Free Trial
// //           </motion.button>
// //         </div>
// //       </section>
// //     </div>
// //   );
// // };

// // export default InitialPage;



// import React from 'react';
// import { useNavigate } from 'react-router-dom';
// import Navbar2 from '../Navbar/navbar2';
// import PacxLanding6 from './landing6';
// import FeaturesSection2 from './future/featuresection2';

// const InitialPage: React.FC = () => {
//   const navigate = useNavigate();

//   return (
//     <div className="min-h-screen bg-white text-[#1A1A1A]">
//       <Navbar2 />
//       <PacxLanding6 />
//       <FeaturesSection2 />
//     </div>
//   );
// };

// export default InitialPage;




import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Navbar/navbar2';
import MainSection from './landing6';
import FeaturesSection from './future/featuresection2';
import MiddleSection from './landing7';
import Footer from './footer';

const InitialPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white text-[#1A1A1A]">
      <Navbar />
      <MainSection />
      <FeaturesSection />
      <MiddleSection />
      <Footer />

    </div>
  );
};

export default InitialPage;