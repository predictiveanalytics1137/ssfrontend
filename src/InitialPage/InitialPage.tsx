import React from 'react';
import { LucideIcon } from 'lucide-react';
import { motion } from 'framer-motion';
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
import Navbar from '../Navbar/Navbar';
import { useNavigate } from 'react-router-dom';

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  className?: string;
  index: number;
}

interface ProcessStepProps {
  icon: LucideIcon;
  number: string;
  title: string;
  description: string;
  index: number;
}

const FeatureCard: React.FC<FeatureCardProps> = ({
  icon: Icon,
  title,
  description,
  className = '',
  index,
}) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
    whileHover={{ y: -5, transition: { duration: 0.2 } }}
    className="bg-white p-4 rounded-xl shadow-sm hover:shadow-xl transition-all"
  >
    <div
      className={`w-full h-48 rounded-lg mb-3 flex items-center justify-center ${className}`}
    >
      <Icon className="w-12 h-12 text-white" />
    </div>
    <h3 className="font-semibold text-gray-700 mb-1 text-sm">{title}</h3>
    <p className="text-teal-700 text-xs">{description}</p>
  </motion.div>
);

const ProcessStep: React.FC<ProcessStepProps> = ({
  icon: Icon,
  number,
  title,
  description,
  index,
}) => (
  <motion.div
    initial={{ opacity: 0, x: -30 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
    whileHover={{ scale: 1.02 }}
    className="bg-white p-4 rounded-xl shadow-sm hover:shadow-lg transition-all"
  >
    <div className="flex items-center gap-3 mb-2">
      <motion.div
        whileHover={{ rotate: 360 }}
        transition={{ duration: 0.5 }}
        className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center"
      >
        <Icon className="w-6 h-6 text-teal-600" />
      </motion.div>
      <div>
        <div className="text-xs text-teal-700 font-medium">{number}</div>
        <h3 className="font-bold text-gray-700 text-sm">{title}</h3>
      </div>
    </div>
    <p className="text-teal-700 text-xs">{description}</p>
  </motion.div>
);

const InitialPage = () => {

  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate('/Home');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white pt-16">
      {/* Include Navbar */}
      <Navbar />

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-20 pb-16 md:pt-32 md:pb-24">
        <div className="absolute inset-0 bg-gray-900 z-0">
          {/* Animated background patterns */}
          <div className="absolute inset-0">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: [0.4, 0.6, 0.4] }}
              transition={{ duration: 5, repeat: Infinity }}
              className="absolute inset-0 z-0"
              style={{
                backgroundImage:
                  'radial-gradient(circle at 1% 1%, #0D9488 0.5%, transparent 25%)',
              }}
            />
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: [0.3, 0.5, 0.3] }}
              transition={{ duration: 7, repeat: Infinity, delay: 1 }}
              className="absolute inset-0 z-0"
              style={{
                backgroundImage:
                  'radial-gradient(circle at 99% 99%, #0F766E 0.5%, transparent 25%)',
              }}
            />
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: [0.2, 0.4, 0.2] }}
              transition={{ duration: 6, repeat: Infinity, delay: 2 }}
              className="absolute inset-0 z-0"
              style={{
                backgroundImage:
                  'radial-gradient(circle at 50% 50%, #14B8A6 0.5%, transparent 25%)',
              }}
            />
          </div>
        </div>
        <div className="relative max-w-6xl mx-auto px-4">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-lg font-semibold text-white text-center mb-4"
          >
            Making Machine Learning Accessible
          </motion.h1>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h1 className="text-xl md:text-3xl font-bold text-white text-center mb-6">
              The automated predictive analytics platform
              <br />
              designed for data analysts
            </h1>
          </motion.div>
          <motion.div
            className="flex justify-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-2 rounded-lg font-medium text-sm transition-colors"
              onClick={handleButtonClick}
            >
              Get started
            </motion.button>
          </motion.div>

          {/* Floating Elements */}
          <div className="absolute inset-0 pointer-events-none z-0">
            <motion.div
              animate={{
                y: [0, -20, 0],
                rotate: [0, 5, 0],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="absolute top-1/4 left-1/4 z-0"
            >
              <div className="w-12 h-12 bg-teal-500/30 rounded-lg" />
            </motion.div>
            <motion.div
              animate={{
                y: [0, 20, 0],
                rotate: [0, -5, 0],
              }}
              transition={{
                duration: 7,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="absolute bottom-1/4 right-1/4 z-0"
            >
              <div className="w-16 h-16 bg-teal-600/30 rounded-full" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 md:py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-md md:text-3xl font-bold text-gray-800 text-center mb-4"
          >
            Transform Data into Powerful Predictions
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
            {/* Feature Cards */}
            <FeatureCard
              icon={Brain}
              title="Machine Learning"
              description="Build machine learning models that predict future outcomes."
              className="bg-gradient-to-br from-purple-500 to-indigo-600"
              index={0}
            />
            <FeatureCard
              icon={TrendingUp}
              title="Predictive Analytics"
              description="Leverage data to predict trends and make better business decisions."
              className="bg-gradient-to-br from-orange-400 to-pink-500"
              index={1}
            />
            <FeatureCard
              icon={Clock}
              title="Time Series Forecasting"
              description="Forecast future values based on historical time series data."
              className="bg-gradient-to-br from-teal-400 to-cyan-500"
              index={2}
            />
            <FeatureCard
              icon={AlertCircle}
              title="Anomaly Detection"
              description="Detect outliers and anomalies in your data using AI."
              className="bg-gradient-to-br from-gray-500 to-gray-700"
              index={3}
            />
            <FeatureCard
              icon={Users}
              title="Customer Lifetime Value"
              description="Predict the future value of a customer's lifetime purchases."
              className="bg-gradient-to-br from-teal-500 to-emerald-600"
              index={4}
            />
            <FeatureCard
              icon={UserMinus}
              title="Churn Prediction"
              description="Identify customers who are likely to churn and take action."
              className="bg-gradient-to-br from-emerald-400 to-teal-600"
              index={5}
            />
            <FeatureCard
              icon={LineChart}
              title="Demand Forecasting"
              description="Forecast demand for products and services to optimize inventory."
              className="bg-gradient-to-br from-blue-400 to-indigo-600"
              index={6}
            />
            <FeatureCard
              icon={Factory}
              title="Predictive Maintenance"
              description="Use predictive analytics to anticipate equipment failures and reduce downtime."
              className="bg-gradient-to-br from-orange-500 to-red-600"
              index={7}
            />
            <FeatureCard
              icon={Shield}
              title="Fraud Detection"
              description="Detect fraudulent activity using machine learning and predictive modeling."
              className="bg-gradient-to-br from-pink-400 to-rose-600"
              index={8}
            />
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-12 md:py-20">
        <div className="max-w-6xl mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-2xl md:text-3xl font-bold text-gray-800 text-center mb-10"
          >
            How PACX AI Works
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Process Steps */}
            <ProcessStep
              icon={Database}
              number="1. Data Collection"
              title="Gather Data"
              description="Collect historical and real-time data from various sources and systems."
              index={0}
            />
            <ProcessStep
              icon={FileInput}
              number="2. Data Processing"
              title="Process & Clean"
              description="Clean, organize, and prepare the data for analysis and model training."
              index={1}
            />
            <ProcessStep
              icon={Cpu}
              number="3. Model Training"
              title="Train Models"
              description="Develop and refine machine learning models based on the prepared data."
              index={2}
            />
            <ProcessStep
              icon={Zap}
              number="4. Real-Time Predictions"
              title="Make Predictions"
              description="Use the trained models to predict future outcomes and events in real time."
              index={3}
            />
            <ProcessStep
              icon={BarChart2}
              number="5. Results Analysis"
              title="Analyze Results"
              description="Review and interpret the predictions to inform decision-making and actions."
              index={4}
            />
            <ProcessStep
              icon={RefreshCw}
              number="6. Feedback Loop"
              title="Continuous Improvement"
              description="Incorporate feedback and new data to continuously improve the models and predictions."
              index={5}
            />
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-12 md:py-20 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-2xl md:text-3xl font-bold text-gray-800 mb-6"
          >
            Ready to Harness the Power of AI?
          </motion.h2>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-2 rounded-lg font-medium text-sm transition-colors"
          >
            Start Your Free Trial
          </motion.button>
        </div>
      </section>
    </div>
  );
};

export default InitialPage;
