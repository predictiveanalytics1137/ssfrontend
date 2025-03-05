import React from 'react';
import { motion } from 'framer-motion';
import {
  Database,
  FileInput,
  Cpu,
  Zap,
  BarChart2,
  RefreshCw,
} from 'lucide-react';

/**
 * Reusable card for each step of the process
 */
interface ProcessStepProps {
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  number: string;
  title: string;
  description: string;
  index: number;
}

const ProcessStep: React.FC<ProcessStepProps> = ({ icon: Icon, number, title, description, index }) => {
  return (
    <motion.div
      // GPU-based transform to minimize text blurring
      className="transform-gpu bg-white p-8 rounded-xl shadow-sm hover:shadow-lg transition-all"
      initial={{ opacity: 0, x: -30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      // Slight scale-up on hover
      whileHover={{ scale: 1.02 }}
    >
      <div className="flex items-center gap-4 mb-3">
        <motion.div
          className="transform-gpu w-12 h-12 bg-[#5B3557]/10 rounded-lg flex items-center justify-center"
          whileHover={{ rotate: 360 }}
          transition={{ duration: 0.5 }}
        >
          <Icon className="w-6 h-6 text-[#5B3557]" />
        </motion.div>
        <div>
          <div className="text-sm text-[#5B3557]/90 font-medium">{number}</div>
          <h3 className="text-lg font-bold text-[#5B3557]">{title}</h3>
        </div>
      </div>
      <p className="text-[#5B3557]/90 text-sm leading-relaxed">{description}</p>
    </motion.div>
  );
};

/**
 * Main "How It Works" Section
 */
const HowPacxAiWorks = () => {
  return (
    <section className="py-24 px-4 bg-[#5B3557]/5">
      <div className="max-w-7xl mx-auto">
        <motion.h2
          className="text-4xl font-bold text-[#5B3557] text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          How PACX AI Works
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
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
  );
};

export default HowPacxAiWorks;
