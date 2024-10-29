// import { ArrowRight, Database, MessageSquare } from 'lucide-react';

// const Homepage = () => {
//   return (
//     <div className="min-h-screen pt-20">
//       {/* Header Section */}
//       <div className="max-w-6xl mx-auto px-4 py-16">
//         <p className="text-teal-600 text-center mb-4 ">Machine learning made simple</p>
        
//         <h1 className="text-4xl md:text-6xl text-center font-bold text-teal-800 mb-6">
//           The automated predictive analytics platform
//           <br />
//           designed for data analysts
//         </h1>
        
//         <p className="text-xl text-center text-teal-700 mb-8">
//           Build powerful predictive AI capabilities that drive business impact
//         </p>
        
//         <div className="flex justify-center gap-4 mb-16">
//           <button className="bg-teal-700 text-white px-6 py-2 rounded-md hover:bg-teal-800 transition-colors">
//             Book a demo
//           </button>
//           <button className="border-2 border-teal-700 text-teal-700 px-6 py-2 rounded-md hover:bg-teal-50 transition-colors">
//             Sign up for free
//           </button>
//         </div>

//         {/* Main Illustration Section */}
//         <div className="bg-gradient-to-r from-teal-100/50 to-teal-200/50 rounded-xl p-8">
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
//             {/* Raw Data Section */}
//             <div className="flex flex-col items-center space-y-4">
//               <div className="w-16 h-16 bg-teal-100 rounded-lg flex items-center justify-center">
//                 <Database className="w-8 h-8 text-teal-600" />
//               </div>
//               <p className="text-teal-600 font-medium">Raw data</p>
//               <div className="w-full h-32 border-2 border-teal-200 rounded-lg bg-white"></div>
//             </div>

//             {/* Predictive Chat Section */}
//             <div className="flex flex-col items-center space-y-4">
//               <div className="w-full bg-white rounded-lg p-4 shadow-lg">
//                 <div className="flex items-center gap-2 mb-4">
//                   <MessageSquare className="w-5 h-5 text-teal-600" />
//                   <span className="text-teal-700 font-medium">Predictive Chat</span>
//                 </div>
//                 <div className="border border-teal-200 rounded-lg p-3 mb-4">
//                   <p className="text-sm text-teal-700">
//                     Predict which user is more likely to convert next month
//                   </p>
//                 </div>
//                 <div className="flex gap-2 items-center border-t pt-2">
//                   <input
//                     type="text"
//                     placeholder="Type your message here..."
//                     className="flex-1 text-sm text-teal-600 placeholder-teal-400 focus:outline-none"
//                   />
//                   <ArrowRight className="w-4 h-4 text-teal-500" />
//                 </div>
//               </div>
//             </div>

//             {/* Results Section */}
//             <div className="flex flex-col items-center space-y-4">
//               <div className="w-full bg-white rounded-lg p-4 shadow-lg">
//                 <div className="flex justify-between items-center mb-4 text-sm">
//                   <span className="text-teal-700">Customer ID</span>
//                   <span className="text-teal-700">Conversion %</span>
//                 </div>
//                 <div className="flex justify-between items-center">
//                   <span className="text-teal-600">684234792</span>
//                   <div className="flex items-center gap-1">
//                     <span className="text-teal-600">0.82%</span>
//                     <button className="bg-teal-100 text-teal-700 px-3 py-1 rounded-md text-sm">
//                       Predict
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Homepage;


// import React from 'react';
// import { LucideIcon } from 'lucide-react';
// import {
//   Brain,
//   TrendingUp,
//   Clock,
//   AlertCircle,
//   Users,
//   UserMinus,
//   LineChart,
//   Factory,
//   Shield,
//   AlertTriangle,
//   Database,
//   FileInput,
//   Cpu,
//   Zap,
//   BarChart2,
//   RefreshCw,
//   PlayCircle
// } from 'lucide-react';

// interface FeatureCardProps {
//   icon: LucideIcon;
//   title: string;
//   description: string;
//   className?: string;
// }

// interface ProcessStepProps {
//   icon: LucideIcon;
//   number: string;
//   title: string;
//   description: string;
// }

// const FeatureCard: React.FC<FeatureCardProps> = ({ icon: Icon, title, description, className = '' }) => (
//   <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
//     <div className={`w-full h-48 rounded-lg mb-4 flex items-center justify-center ${className}`}>
//       <Icon className="w-12 h-12 text-white" />
//     </div>
//     <h3 className="text-l font-bold text-gray-800 mb-2">{title}</h3>
//     <p className="text-teal-700">{description}</p>
//   </div>
// );

// const ProcessStep: React.FC<ProcessStepProps> = ({ icon: Icon, number, title, description }) => (
//   <div className="bg-white p-6 rounded-xl shadow-sm">
//     <div className="flex items-center gap-4 mb-3">
//       <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center">
//         <Icon className="w-6 h-6 text-teal-600" />
//       </div>
//       <div>
//         <div className="text-sm text-teal-700 font-medium">{number}</div>
//         <h3 className="font-bold text-gray-800">{title}</h3>
//       </div>
//     </div>
//     <p className="text-teal-700 text-sm">{description}</p>
//   </div>
// );
// const Homepage = () => {
//   return (
//     <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
//       {/* Hero Section */}
//       <section className="relative overflow-hidden pt-20 pb-16 md:pt-32 md:pb-24">
//         <div className="absolute inset-0 bg-gradient-to-br from-teal-500 via-teal-600 to-teal-800"></div>
//         <div className="relative max-w-6xl mx-auto px-4">
//           <h1 className="text-3xl md:text-4xl font-bold text-white text-center mb-6">
//             Unlock the power of AI to predict and prevent issues before they happen
//           </h1>
//           <div className="flex justify-center">
//             <button className="bg-teal-400 hover:bg-teal-300 text-teal-900 px-8 py-3 rounded-lg font-medium transition-colors">
//               Get started
//             </button>
//           </div>
//         </div>
//       </section>

//       {/* Features Section */}
//       <section className="py-16 md:py-24 bg-gray-50">
//         <div className="max-w-6xl mx-auto px-4">
//           <h2 className="text-2xl md:text-4xl font-bold text-gray-800 text-center mb-4">
//             Unleash the power of predictive analytics
//           </h2>
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
//             <FeatureCard
//               icon={Brain}
//               title="Machine Learning"
//               description="Build machine learning models that predict future outcomes."
//               className="bg-gradient-to-br from-purple-500 to-indigo-600"
//             />
//             <FeatureCard
//               icon={TrendingUp}
//               title="Predictive Analytics"
//               description="Leverage data to predict trends and make better business decisions."
//               className="bg-gradient-to-br from-orange-400 to-pink-500"
//             />
//             <FeatureCard
//               icon={Clock}
//               title="Time Series Forecasting"
//               description="Forecast future values based on historical time series data."
//               className="bg-gradient-to-br from-teal-400 to-cyan-500"
//             />
//             <FeatureCard
//               icon={AlertCircle}
//               title="Anomaly Detection"
//               description="Detect outliers and anomalies in your data using AI."
//               className="bg-gradient-to-br from-gray-500 to-gray-700"
//             />
//             <FeatureCard
//               icon={Users}
//               title="Customer Lifetime Value"
//               description="Predict the future value of a customer's lifetime purchases."
//               className="bg-gradient-to-br from-teal-500 to-emerald-600"
//             />
//             <FeatureCard
//               icon={UserMinus}
//               title="Churn Prediction"
//               description="Identify customers who are likely to churn and take action."
//               className="bg-gradient-to-br from-emerald-400 to-teal-600"
//             />
//             <FeatureCard
//               icon={LineChart}
//               title="Demand Forecasting"
//               description="Forecast demand for products and services to optimize inventory."
//               className="bg-gradient-to-br from-blue-400 to-indigo-600"
//             />
//             <FeatureCard
//               icon={Factory}
//               title="Predictive Maintenance"
//               description="Use predictive analytics to anticipate equipment failures and reduce downtime."
//               className="bg-gradient-to-br from-orange-500 to-red-600"
//             />
//             <FeatureCard
//               icon={Shield}
//               title="Fraud Detection"
//               description="Detect fraudulent activity using machine learning and predictive modeling."
//               className="bg-gradient-to-br from-pink-400 to-rose-600"
//             />
//           </div>
//         </div>
//       </section>

//       {/* How It Works Section */}
//       <section className="py-16 md:py-24">
//         <div className="max-w-6xl mx-auto px-4">
//           <h2 className="text-3xl md:text-4xl font-bold text-gray-800 text-center mb-12">
//             How Predicta AI works
//           </h2>
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//             <ProcessStep
//               icon={Database}
//               number="1. Data collection"
//               title="Gather Data"
//               description="Gather historical and real-time data from various sources and systems."
//             />
//             <ProcessStep
//               icon={FileInput}
//               number="2. Data processing"
//               title="Process & Clean"
//               description="Clean, organize, and prepare the data for analysis and model training."
//             />
//             <ProcessStep
//               icon={Cpu}
//               number="3. Model training"
//               title="Train Models"
//               description="Develop and refine machine learning models based on the prepared data."
//             />
//             <ProcessStep
//               icon={Zap}
//               number="4. Real-time predictions"
//               title="Make Predictions"
//               description="Use the trained models to predict future outcomes and events in real time."
//             />
//             <ProcessStep
//               icon={BarChart2}
//               number="5. Results analysis"
//               title="Analyze Results"
//               description="Review and interpret the predictions to inform decision-making and actions."
//             />
//             <ProcessStep
//               icon={RefreshCw}
//               number="6. Feedback loop"
//               title="Continuous Improvement"
//               description="Incorporate feedback and new data to continuously improve the models and predictions."
//             />
//           </div>
//         </div>
//       </section>

//       {/* CTA Section */}
//       <section className="py-16 md:py-24 bg-gray-50">
//         <div className="max-w-3xl mx-auto px-4 text-center">
//           <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-8">
//             Ready to harness the power of AI?
//           </h2>
//           <button className="bg-teal-600 hover:bg-teal-800 text-white px-8 py-3 rounded-lg font-medium transition-colors">
//             Start your free trial
//           </button>
//         </div>
//       </section>
//     </div>
//   );
// };

// export default Homepage;



import React from 'react';
import { LucideIcon } from 'lucide-react';
import {
  Brain,
  TrendingUp,
  Clock,
  AlertCircle,
  Users,
  UserMinus,
  LineChart,
  Factory,
  Shield,
  Database,
  FileInput,
  Cpu,
  Zap,
  BarChart2,
  RefreshCw,
} from 'lucide-react';

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  className?: string;
}

interface ProcessStepProps {
  icon: LucideIcon;
  number: string;
  title: string;
  description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({
  icon: Icon,
  title,
  description,
  className = '',
}) => (
  <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
    <div className={`w-full h-48 rounded-lg mb-4 flex items-center justify-center ${className}`}>
      <Icon className="w-12 h-12 text-white" />
    </div>
    <h3 className="font-semibold text-gray-800 mb-2">{title}</h3>
    <p className="text-teal-800">{description}</p>
  </div>
);

const ProcessStep: React.FC<ProcessStepProps> = ({
  icon: Icon,
  number,
  title,
  description,
}) => (
  <div className="bg-white p-6 rounded-xl shadow-sm">
    <div className="flex items-center gap-4 mb-3">
      <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center">
        <Icon className="w-6 h-6 text-teal-600" />
      </div>
      <div>
        <div className="text-sm text-teal-700 font-medium">{number}</div>
        <h3 className="font-bold text-gray-800">{title}</h3>
      </div>
    </div>
    <p className="text-teal-700 text-sm">{description}</p>
  </div>
);

const Homepage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white pt-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-20 pb-16 md:pt-32 md:pb-24">
        <div className="absolute inset-0 bg-gradient-to-br from-teal-500 via-teal-600 to-teal-800"></div>
        <div className="relative max-w-6xl mx-auto px-4">
        <h1 className="  font-semibold text-white text-center">

        Making Machine Learning Accessible
</h1>
          <h1 className="text-2xl md:text-4xl font-bold text-white text-center mb-6">



          The automated predictive analytics platform
        <br />
          designed for data analysts
          </h1>
          <div className="flex justify-center">
            <button className="bg-teal-400 hover:bg-teal-300 text-teal-900 px-8 py-3 rounded-lg font-medium transition-colors">
              Get started
            </button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-l md:text-4xl font-bold text-gray-800 text-center mb-4">
            Unleash the power of predictive analytics
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
            <FeatureCard
              icon={Brain}
              title="Machine Learning"
              description="Build machine learning models that predict future outcomes."
              className="bg-gradient-to-br from-purple-500 to-indigo-600"
            />
            <FeatureCard
              icon={TrendingUp}
              title="Predictive Analytics"
              description="Leverage data to predict trends and make better business decisions."
              className="bg-gradient-to-br from-orange-400 to-pink-500"
            />
            <FeatureCard
              icon={Clock}
              title="Time Series Forecasting"
              description="Forecast future values based on historical time series data."
              className="bg-gradient-to-br from-teal-400 to-cyan-500"
            />
            <FeatureCard
              icon={AlertCircle}
              title="Anomaly Detection"
              description="Detect outliers and anomalies in your data using AI."
              className="bg-gradient-to-br from-gray-500 to-gray-700"
            />
            <FeatureCard
              icon={Users}
              title="Customer Lifetime Value"
              description="Predict the future value of a customer's lifetime purchases."
              className="bg-gradient-to-br from-teal-500 to-emerald-600"
            />
            <FeatureCard
              icon={UserMinus}
              title="Churn Prediction"
              description="Identify customers who are likely to churn and take action."
              className="bg-gradient-to-br from-emerald-400 to-teal-600"
            />
            <FeatureCard
              icon={LineChart}
              title="Demand Forecasting"
              description="Forecast demand for products and services to optimize inventory."
              className="bg-gradient-to-br from-blue-400 to-indigo-600"
            />
            <FeatureCard
              icon={Factory}
              title="Predictive Maintenance"
              description="Use predictive analytics to anticipate equipment failures and reduce downtime."
              className="bg-gradient-to-br from-orange-500 to-red-600"
            />
            <FeatureCard
              icon={Shield}
              title="Fraud Detection"
              description="Detect fraudulent activity using machine learning and predictive modeling."
              className="bg-gradient-to-br from-pink-400 to-rose-600"
            />
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 text-center mb-12">
            How PredictaAI Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <ProcessStep
              icon={Database}
              number="1. Data Collection"
              title="Gather Data"
              description="Collect historical and real-time data from various sources and systems."
            />
            <ProcessStep
              icon={FileInput}
              number="2. Data Processing"
              title="Process & Clean"
              description="Clean, organize, and prepare the data for analysis and model training."
            />
            <ProcessStep
              icon={Cpu}
              number="3. Model Training"
              title="Train Models"
              description="Develop and refine machine learning models based on the prepared data."
            />
            <ProcessStep
              icon={Zap}
              number="4. Real-Time Predictions"
              title="Make Predictions"
              description="Use the trained models to predict future outcomes and events in real time."
            />
            <ProcessStep
              icon={BarChart2}
              number="5. Results Analysis"
              title="Analyze Results"
              description="Review and interpret the predictions to inform decision-making and actions."
            />
            <ProcessStep
              icon={RefreshCw}
              number="6. Feedback Loop"
              title="Continuous Improvement"
              description="Incorporate feedback and new data to continuously improve the models and predictions."
            />
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-8">
            Ready to Harness the Power of AI?
          </h2>
          <button className="bg-teal-600 hover:bg-teal-800 text-white px-8 py-3 rounded-lg font-medium transition-colors">
            Start Your Free Trial
          </button>
        </div>
      </section>
    </div>
  );
};

export default Homepage;
