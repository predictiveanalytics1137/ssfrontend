
import React, { useState } from "react";
import PerformanceConsistency from "./PerformanceConsistency"; // Import the PerformanceConsistency component
import FeatureImportanceProps from "./FeatureImportanceProps";
import ModelEvaluation from "./ModelEvaluation";

const ExpandableBox: React.FC<{ title: string; children?: React.ReactNode; healthyCheck?: boolean; suggestion?: string }> = ({
  title,
  children,
  healthyCheck,
  suggestion,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border rounded-lg mb-4 p-4 shadow-sm bg-white">
      <div
        className="flex justify-between items-center cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h3 className="text-lg font-semibold">{title}</h3>
        <div className="flex items-center space-x-2">
          {healthyCheck && (
            <span className="text-green-600 font-medium">Healthy check</span>
          )}
          {suggestion && (
            <span className="text-yellow-500 font-medium">{suggestion}</span>
          )}
          <button
            className="text-blue-500"
            aria-label={isOpen ? "Collapse" : "Expand"}
          >
            {isOpen ? "-" : "+"}
          </button>
        </div>
      </div>
      {isOpen && <div className="mt-4">{children}</div>}
    </div>
  );
};

const Dashboard: React.FC = () => {
  return (
    <div className="p-8 bg-gray-100 min-h-screen flex justify-center">
      <div className="max-w-4xl w-full">
        <h1 className="text-2xl font-bold mb-6">Explore Your Model</h1>
        <div>
          <h2 className="text-xl font-semibold mb-4">
            Dive deeper into your model's performance
          </h2>
          {/* <ExpandableBox title="Metrics Analysis" /> */}
          <ExpandableBox title="Metrics Analysis">
            <ModelEvaluation /> {/* Embed the PerformanceConsistency component */}
          </ExpandableBox>
          {/* <ExpandableBox title="Model vs Benchmark by range" /> */}
          <ExpandableBox title="Performance Consistency (overfit)" suggestion="1 Suggestion">
            <PerformanceConsistency /> {/* Embed the PerformanceConsistency component */}
          </ExpandableBox>
        </div>
        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-4">
            Analyze how your data attributes affect predictions
          </h2>
          <ExpandableBox
            title="Attribute Columns & Features Importance"
            healthyCheck
          >
            <FeatureImportanceProps /> {/* Embed the FeatureImportance component */}
          </ExpandableBox>
          <ExpandableBox title="Columns & Features Values Effect" healthyCheck />
        </div>
        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-4">
            Evaluate the quality of the training data
          </h2>
          <ExpandableBox title="Core set statistics" healthyCheck />
          <ExpandableBox title="Core set over time" healthyCheck />
          <ExpandableBox
            title="Attribute Columns & Features Importance"
            healthyCheck
          >
            <FeatureImportanceProps /> {/* Embed the FeatureImportance component */}
          </ExpandableBox>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
