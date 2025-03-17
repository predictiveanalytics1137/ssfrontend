import React from "react";
import { motion } from "framer-motion";

interface ModelBuildingProgressProps {
  status: string;
}

const ModelBuildingProgress: React.FC<ModelBuildingProgressProps> = ({ status }) => {
  let stepIndex = 0;
  switch (status) {
    case "inprogress":
      stepIndex = 1;
      break;
    case "feature_engineering_completed":
      stepIndex = 2;
      break;
    case "hyperparameter_tuning_completed":
      stepIndex = 3;
      break;
    case "training_completed":
      stepIndex = 4;
      break;
    default:
      stepIndex = 0;
  }

  const steps = [
    { 
      label: "Data Preprocessing", 
      description: "Cleaning & normalizing data"
    },
    { 
      label: "Feature Engineering", 
      description: "Creating new features"
    },
    { 
      label: "Model Training", 
      description: "Training the ML model"
    },
    { 
      label: "Prediction & Deployment", 
      description: "Making predictions"
    }
  ];

  return (
    <div className="bg-gradient-to-r from-gray-50 to-slate-100 rounded-2xl shadow-lg p-8 max-w-4xl mx-auto border border-gray-100">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Model Building Progress</h2>
          <div className="flex items-center mt-2">
            <span className="animate-pulse relative flex h-3 w-3 mr-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-indigo-500"></span>
            </span>
            <p className="text-gray-600">
              Hang tight! Your model/predictions are still processing...
            </p>
          </div>
        </div>
        
        <div className="bg-indigo-50 text-indigo-700 px-4 py-2 rounded-full text-sm font-medium">
          Step {stepIndex} of {steps.length}
        </div>
      </div>

      {/* Steps Container */}
      <div className="space-y-5">
        {steps.map((step, idx) => {
          const isCompleted = stepIndex > idx + 1;
          const isCurrent = stepIndex === idx + 1;
          const isPending = stepIndex < idx + 1;
          
          return (
            <div 
              key={step.label} 
              className={`relative ${
                isCompleted ? "opacity-100" : isCurrent ? "opacity-100" : "opacity-60"
              }`}
            >
              {/* Vertical line connecting steps */}
              {idx < steps.length - 1 && (
                <div className="absolute left-3.5 top-10 w-0.5 h-14 bg-gray-200 z-0"></div>
              )}
              
              {/* Completed line */}
              {isCompleted && idx < steps.length - 1 && (
                <motion.div 
                  initial={{ height: 0 }}
                  animate={{ height: "56px" }}
                  className="absolute left-3.5 top-10 w-0.5 bg-indigo-500 z-10"
                />
              )}
              
              <div className="flex items-start space-x-4">
                {/* Step indicator */}
                <div className="relative pt-1.5">
                  {isCompleted ? (
                    <div className="h-7 w-7 rounded-full bg-indigo-500 flex items-center justify-center text-white">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                    </div>
                  ) : isCurrent ? (
                    <div className="h-7 w-7 rounded-full border-2 border-indigo-500 bg-white flex items-center justify-center">
                      <span className="animate-pulse relative flex h-3 w-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-indigo-500"></span>
                      </span>
                    </div>
                  ) : (
                    <div className="h-7 w-7 rounded-full border-2 border-gray-300 bg-white flex items-center justify-center">
                      <span className="text-xs font-medium text-gray-500">{idx + 1}</span>
                    </div>
                  )}
                </div>
                
                {/* Step content */}
                <div className="flex-1">
                  <div className={`flex flex-wrap items-center justify-between py-2 px-4 rounded-lg ${
                    isCurrent ? "bg-white shadow-md border border-indigo-100" : "bg-transparent"
                  }`}>
                    <div>
                      <h3 className={`font-semibold text-sm ${
                        isCompleted ? "text-indigo-600" : isCurrent ? "text-indigo-700" : "text-gray-600"
                      }`}>
                        {step.label}
                      </h3>
                      <p className="text-xs text-gray-500 mt-1">{step.description}</p>
                    </div>
                    
                    {/* Status indicators */}
                    {isCompleted && (
                      <span className="text-xs font-medium text-green-600 bg-green-50 rounded-full px-2.5 py-1">
                        Complete
                      </span>
                    )}
                    {isCurrent && (
                      <span className="text-xs font-medium text-indigo-600 bg-indigo-50 rounded-full px-2.5 py-1">
                        In Progress
                      </span>
                    )}
                    {isPending && (
                      <span className="text-xs font-medium text-gray-500 bg-gray-100 rounded-full px-2.5 py-1">
                        Pending
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Progress percentage and estimated time */}
      <div className="mt-8">
        <div className="flex justify-between text-xs text-gray-500 mb-1">
          <span>Progress</span>
          <span>{Math.round((stepIndex / steps.length) * 100)}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-1.5">
          <motion.div 
            className="bg-indigo-600 h-1.5 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${(stepIndex / steps.length) * 100}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
        <p className="mt-4 text-center text-xs text-gray-500">
          Estimated completion time: ~{Math.max(5 - stepIndex, 1)} {Math.max(5 - stepIndex, 1) === 1 ? 'minute' : 'minutes'} remaining
        </p>
      </div>
    </div>
  );
};

export default ModelBuildingProgress;