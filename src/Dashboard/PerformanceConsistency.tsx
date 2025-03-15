



import React, { useState, useMemo } from "react";
import { AlertTriangle, Info, ChevronDown, ChevronUp, HelpCircle } from "lucide-react";

interface Metrics {
  mae?: number; // Optional to handle missing values
  rmse?: number;
  r2_score?: number;
}

interface ModelMetrics {
  validation?: Metrics; // Optional to handle missing validation
  assessment?: string; // Optional to handle missing assessment
}

interface PerformanceConsistencyProps {
  modelMetrics: ModelMetrics;
  headings: {
    main: string;
    description: string;
  };
  labels: {
    validation: string;
  };
  warnings: {
    condition: boolean;
    message?: string; // Optional to handle missing message
  };
}

const PerformanceConsistency: React.FC<PerformanceConsistencyProps> = ({
  modelMetrics,
  headings,
  labels,
  warnings,
}) => {
  const [activeTab, setActiveTab] = useState<"overview" | "details">("overview");
  const [isDetailsExpanded, setIsDetailsExpanded] = useState(false);
  const [showInfo, setShowInfo] = useState<{
    [key: string]: boolean;
  }>({});

  // Memoize metrics for performance, with comprehensive fallbacks
  const validationR2 = useMemo(() => {
    const r2 = modelMetrics.validation?.r2_score || 0;
    // Cap R² between -1 and 1, handle NaN or invalid numbers
    return isNaN(r2) || r2 < -1 || r2 > 1 ? 0 : Math.max(Math.min(r2, 1), -1);
  }, [modelMetrics.validation?.r2_score]);

  const validationMAE = useMemo(() => {
    const mae = modelMetrics.validation?.mae || 0;
    // Ensure non-negative, handle NaN or invalid numbers
    return mae >= 0 && !isNaN(mae) ? mae.toFixed(4) : "0.0000";
  }, [modelMetrics.validation?.mae]);

  const validationRMSE = useMemo(() => {
    const rmse = modelMetrics.validation?.rmse || 0;
    // Ensure non-negative, handle NaN or invalid numbers
    return rmse >= 0 && !isNaN(rmse) ? rmse.toFixed(4) : "0.0000";
  }, [modelMetrics.validation?.rmse]);

  // Dynamic info content based on ML output, with combined explanations for all outcomes
  const getInfoContent = (key: string) => {
    const r2Percentage = (validationR2 * 100).toFixed(2);
    const assessment = modelMetrics.assessment || "Not Assessed";
    const isUnderfitting = assessment?.toLowerCase() === "underfitting";
    const maeFormatted = Number(validationMAE).toLocaleString();
    const rmseFormatted = Number(validationRMSE).toLocaleString();

    switch (key) {
      case "overview":
        return (
          <div className="text-xs text-gray-600 p-3 bg-gray-50 rounded-md border border-gray-200 shadow-sm">
            <p className="flex items-start gap-1">
              <HelpCircle className="text-gray-400 w-3 h-3 mt-0.5" />
              <strong>Overview:</strong> This section shows how well your model predicts
              values using the R² score ({r2Percentage}%), which measures how much of the
              actual data’s variation the model explains. A value close to 100% (or 1.0)
              indicates excellent predictions, but your model’s {r2Percentage}% (negative
              or low) suggests poor performance, possibly worse than guessing the average.
              This could indicate issues like underfitting, overfitting, or data
              limitations, depending on the assessment (“{assessment}”). Use this to
              assess model accuracy and identify areas for improvement, such as adding
              features, tuning parameters, or enhancing data quality.
            </p>
          </div>
        );
      case "details":
        return (
          <div className="text-xs text-gray-600 p-3 bg-gray-50 rounded-md border border-gray-200 shadow-sm">
            <p className="flex items-start gap-1">
              <HelpCircle className="text-gray-400 w-3 h-3 mt-0.5" />
              <strong>Details:</strong> These metrics provide insight into your model’s
              accuracy:
            </p>
            <ul className="list-disc pl-4 mt-1 text-xs">
              <li className="flex items-start gap-1">
                <HelpCircle className="text-gray-400 w-3 h-3 mt-0.5" />
                <strong>MAE ({maeFormatted}):</strong> The average absolute difference
                between predicted and actual values, indicating prediction error. A value
                of {maeFormatted} means predictions are off by {maeFormatted} units on
                average—lower values suggest higher accuracy. This helps identify overall
                prediction quality and guides model improvements.
              </li>
              <li className="flex items-start gap-1">
                <HelpCircle className="text-gray-400 w-3 h-3 mt-0.5" />
                <strong>RMSE ({rmseFormatted}):</strong> Emphasizes larger errors,
                providing a measure of prediction accuracy. Your {rmseFormatted} suggests
                significant deviations in some predictions—lower values are preferable,
                and this metric is useful for detecting outliers or major errors in the
                model.
              </li>
              <li className="flex items-start gap-1">
                <HelpCircle className="text-gray-400 w-3 h-3 mt-0.5" />
                <strong>R² Score ({validationR2.toFixed(2)}):</strong> Measures how well
                predictions explain actual values. Your {validationR2.toFixed(2)} (e.g.,
                negative or low) indicates poor fit, suggesting the model may struggle
                with the data’s complexity or require adjustments like more features,
                better data, or tuning.
              </li>
            </ul>
          </div>
        );
      case "warning":
        return (
          <div className="text-xs text-gray-600 p-3 bg-gray-50 rounded-md border border-gray-200 shadow-sm">
            <p className="flex items-start gap-1">
              <HelpCircle className="text-gray-400 w-3 h-3 mt-0.5" />
              <strong>Model Warning:</strong> The assessment “{assessment || 'Not Assessed'}”
              indicates potential issues with your model. For example, “Underfitting” means
              the model is too simple to capture the data’s complexity, leading to poor
              predictions (R² = {validationR2.toFixed(2)}, MAE = {maeFormatted}, RMSE =
              {rmseFormatted}). This suggests you may need to add more features, tune the
              model, improve data quality, or use techniques like regularization. If the
              assessment is missing or unclear, verify your data and model configuration.
            </p>
          </div>
        );
      default:
        return null;
    }
  };

  const renderR2Indicator = () => (
    <div className="p-4 bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-300">
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-xs font-medium text-gray-700 flex items-center gap-1">
          {labels.validation} R² Score
          <Info
            className="text-gray-400 w-3 h-3 cursor-pointer"
            onClick={() => setShowInfo((prev) => ({ ...prev, overview: !prev.overview }))}
          />
        </h3>
      </div>
      {showInfo.overview && getInfoContent("overview")}
      <div className="w-full bg-gray-200 h-2 rounded-full">
        <div
          className={`h-full rounded-full ${
            validationR2 >= 0.7
              ? "bg-green-500"
              : validationR2 >= 0.5
              ? "bg-blue-400"
              : "bg-yellow-500"
          }`}
          style={{ width: `${Math.max(Math.min(validationR2 * 100, 100), 0)}%` }} // Cap at 100%, ensure non-negative
        />
      </div>
      <p className="text-xs mt-2 text-gray-600">
        Value: <span className="font-medium">{(validationR2 * 100).toFixed(2)}%</span>
      </p>
    </div>
  );

  const renderWarning = () => (
    <div className="p-4 bg-yellow-50 rounded-lg shadow-sm border border-yellow-200 mb-6 flex items-start gap-2 animate-pulse-slow">
      <AlertTriangle className="text-yellow-500 w-4 h-4 mt-0.5" />
      <div>
        <h4 className="text-xs font-medium text-yellow-700 mb-1">Model Alert</h4>
        <p className="text-xs text-gray-600">
          {warnings.message || "No specific assessment provided."}
        </p>
        <Info
          className="text-gray-400 w-3 h-3 cursor-pointer mt-1"
          onClick={() => setShowInfo((prev) => ({ ...prev, warning: !prev.warning }))}
        />
        {showInfo.warning && getInfoContent("warning")}
      </div>
    </div>
  );

  return (
    <div className="p-6 bg-white rounded-lg shadow-md border border-gray-200">
      {/* Header */}
      <div className="mb-10">
        <h2 className="text-sm font-semibold text-gray-800">{headings.main}</h2>
        <p className="text-xs text-gray-500 mt-1">{headings.description}</p>
      </div>

      {/* Tabs */}
      <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4 mb-8">
        <button
          onClick={() => setActiveTab("overview")}
          className={`px-3 py-2 text-xs font-medium rounded-md ${
            activeTab === "overview"
              ? "bg-blue-500 text-white"
              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
          } transition-colors duration-200`}
        >
          Overview
        </button>
        <button
          onClick={() => setActiveTab("details")}
          className={`px-3 py-2 text-xs font-medium rounded-md ${
            activeTab === "details"
              ? "bg-blue-500 text-white"
              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
          } transition-colors duration-200`}
        >
          Details
        </button>
      </div>

      {/* Content */}
      {activeTab === "overview" && (
        <div className="space-y-8">
          {renderR2Indicator()}
          {warnings.condition && renderWarning()}
        </div>
      )}

      {activeTab === "details" && (
        <div className="space-y-8">
          <div className="p-4 bg-white rounded-lg shadow-sm border border-gray-200">
            <div
              className="cursor-pointer flex justify-between items-center border-b border-gray-200 pb-3 mb-4"
              onClick={() => setIsDetailsExpanded(!isDetailsExpanded)}
            >
              <h3 className="text-sm font-medium text-gray-800">Model Metrics</h3>
              {isDetailsExpanded ? (
                <ChevronUp className="text-gray-500 w-4 h-4" />
              ) : (
                <ChevronDown className="text-gray-500 w-4 h-4" />
              )}
            </div>
            {isDetailsExpanded && (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-xs text-gray-700 animate-fade-in">
                <p className="flex items-center gap-1">
                  <HelpCircle className="text-gray-400 w-3 h-3" />
                  MAE: {validationMAE}
                </p>
                <p className="flex items-center gap-1">
                  <HelpCircle className="text-gray-400 w-3 h-3" />
                  RMSE: {validationRMSE}
                </p>
                <p className="flex items-center gap-1">
                  <HelpCircle className="text-gray-400 w-3 h-3" />
                  R² Score: {validationR2.toFixed(4)}
                </p>
              </div>
            )}
          </div>
          <div className="p-4 bg-white rounded-lg shadow-sm border border-gray-200">
            <h3 className="text-sm font-medium text-gray-800 mb-2">Model Assessment</h3>
            <p className="text-xs text-gray-600">
              {modelMetrics.assessment || "No assessment provided."}
            </p>
            <Info
              className="text-gray-400 w-3 h-3 cursor-pointer mt-1"
              onClick={() => setShowInfo((prev) => ({ ...prev, details: !prev.details }))}
            />
            {showInfo.details && getInfoContent("details")}
          </div>
        </div>
      )}
    </div>
  );
};

// Ensure the style is properly defined as a string outside the JSX
const styles = `
  @media (max-width: 480px) {
    .grid-cols-3 {
      grid-template-columns: 1fr;
    }
    .grid-cols-2 {
      grid-template-columns: 1fr;
    }
    .text-sm {
      font-size: 0.7rem;
    }
    .text-xs {
      font-size: 0.6rem;
    }
    .p-4, .p-6 {
      padding: 0.6rem;
    }
    .mb-10, .mb-8 {
      margin-bottom: 1rem;
    }
    .space-y-8, .space-x-4 {
      gap: 0.6rem;
    }
    .flex-col {
      flex-direction: column;
    }
  }
  @media (min-width: 481px) and (max-width: 768px) {
    .grid-cols-3 {
      grid-template-columns: repeat(2, 1fr);
    }
    .grid-cols-2 {
      grid-template-columns: 1fr 1fr;
    }
    .text-sm {
      font-size: 0.75rem;
    }
    .text-xs {
      font-size: 0.65rem;
    }
    .p-4, .p-6 {
      padding: 0.75rem;
    }
    .mb-10, .mb-8 {
      margin-bottom: 1.25rem;
    }
    .space-y-8, .space-x-4 {
      gap: 0.75rem;
    }
  }
  @media (min-width: 769px) and (max-width: 1024px) {
    .grid-cols-3 {
      grid-template-columns: repeat(3, 1fr);
    }
    .max-w-5xl {
      max-width: 90%;
    }
  }
  @media (min-width: 1025px) {
    .max-w-5xl {
      max-width: 100%;
    }
  }
  .hover:shadow-md {
    transition: box-shadow 0.3s ease;
  }
  .transition-colors {
    transition: background-color 0.3s ease, color 0.3s ease;
  }
  .animate-pulse-slow {
    animation: pulse 2s infinite ease-in-out;
  }
  .animate-fade-in {
    animation: fadeIn 1s ease-in;
  }
  @keyframes pulse {
    0% { transform: scale(1); }
    50% { transform: scale(1.02); }
    100% { transform: scale(1); }
  }
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
`;

export default PerformanceConsistency;