



import React, { useState, useMemo } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Info, ChevronDown, ChevronUp } from "lucide-react";

interface Metrics {
  mae: number;
  rmse: number;
  r2_score: number;
}

interface ModelMetrics {
  validation: Metrics;
  assessment: string;
}

interface MetricsData {
  model_metrics: ModelMetrics;
  predictions: {
    actual: number[];
    predicted: number[];
  };
}

interface ModelEvaluationProps {
  modelData: MetricsData;
}

const ModelEvaluation: React.FC<ModelEvaluationProps> = ({ modelData }) => {
  const { predictions, model_metrics } = modelData;

  const actual = predictions?.actual;
  const predicted = predictions?.predicted;

  const [showActual, setShowActual] = useState(true);
  const [showPredicted, setShowPredicted] = useState(true);
  const [isMetricsExpanded, setIsMetricsExpanded] = useState(false);

  // Memoize chart data for performance
  const chartData = useMemo(() => {
    if (!actual || !predicted) return [];
    return actual.map((value: number, index: number) => ({
      index: index + 1,
      actual: value,
      predicted: predicted[index],
    }));
  }, [actual, predicted]);

  // Calculate totals and bias
  const totalActual = useMemo(
    () => (actual?.reduce((acc, val) => acc + val, 0) || 0).toFixed(1),
    [actual]
  );
  const totalPredicted = useMemo(
    () => (predicted?.reduce((acc, val) => acc + val, 0) || 0).toFixed(1),
    [predicted]
  );
  const biasValue = useMemo(
    () =>
      actual && actual.length > 0 && totalActual !== "0.0"
        ? ((Number(totalPredicted) - Number(totalActual)) / Number(totalActual)) * 100
        : 0,
    [totalActual, totalPredicted, actual]
  );

  // Validation metrics
  const mae = model_metrics.validation.mae.toFixed(1);
  const rmse = model_metrics.validation.rmse.toFixed(1);
  const r2Score = model_metrics.validation.r2_score.toFixed(2);

  if (!actual || !predicted) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-yellow-50 to-green-50">
        <div className="text-center p-4 bg-white rounded-lg shadow-sm max-w-md border border-gray-100">
          <Info className="mx-auto mb-2 text-gray-500" size={20} />
          <h2 className="text-sm font-medium text-gray-700 mb-1">
            No Data Available
          </h2>
          <p className="text-xs text-gray-500">
            Please ensure prediction data is provided. Contact support if this issue persists.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-50 to-green-50 py-12 px-4 sm:px-6 lg:px-16">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-12 bg-gradient-to-r from-blue-200 to-purple-200 p-4 rounded-lg shadow-md border border-gray-200">
          <h1 className="text-sm font-semibold text-gray-800 flex items-center gap-1">
            <Info className="text-blue-600 w-4 h-4" />
            Model Performance Analysis
          </h1>
          <p className="text-xs text-gray-600 mt-1">
            A detailed evaluation of model accuracy and predictive performance.
          </p>
        </div>

        {/* Key Metrics Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {/* Prediction Bias */}
          <div className="p-4 bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-300">
            <h3 className="text-xs font-medium text-gray-700 mb-2">Prediction Bias</h3>
            <p
              className={`text-sm font-semibold ${
                biasValue < 0 ? "text-red-600" : "text-green-600"
              }`}
            >
              {biasValue.toFixed(1)}%
            </p>
            <p className="text-xs text-gray-500 mt-1">
              {biasValue < 0 ? "Underestimates" : "Overestimates"} by this percentage.
            </p>
          </div>

          {/* Prediction Totals */}
          <div className="p-4 bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-300">
            <h3 className="text-xs font-medium text-gray-700 mb-2">Prediction Totals</h3>
            <div className="space-y-2">
              <p className="text-xs flex justify-between items-center">
                <span className="text-gray-500">Actual Total:</span>
                <span className="text-blue-600 font-semibold">
                  {Number(totalActual).toLocaleString()}
                </span>
              </p>
              <p className="text-xs flex justify-between items-center">
                <span className="text-gray-500">Predicted Total:</span>
                <span className="text-green-600 font-semibold">
                  {Number(totalPredicted).toLocaleString()}
                </span>
              </p>
            </div>
          </div>

          {/* Model Assessment */}
          <div className="p-4 bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-300">
            <h3 className="text-xs font-medium text-gray-700 mb-2">Model Assessment</h3>
            <p className="text-sm font-medium text-gray-800">
              {model_metrics.assessment || "Not Assessed"}
            </p>
            {model_metrics.assessment === "Underfitting" && (
              <p className="text-xs text-gray-500 mt-1">
                The model lacks complexity and may need improvement.
              </p>
            )}
          </div>
        </div>

        {/* Detailed Metrics (Expandable) */}
        <div className="mb-12 bg-white rounded-lg shadow-sm border border-gray-200">
          <div
            className="p-4 cursor-pointer flex justify-between items-center border-b border-gray-200"
            onClick={() => setIsMetricsExpanded(!isMetricsExpanded)}
          >
            <h3 className="text-sm font-medium text-gray-800">Detailed Performance Metrics</h3>
            {isMetricsExpanded ? (
              <ChevronUp className="text-gray-500 w-4 h-4" />
            ) : (
              <ChevronDown className="text-gray-500 w-4 h-4" />
            )}
          </div>
          {isMetricsExpanded && (
            <div className="p-4 grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="p-3 bg-gray-50 rounded-lg border border-gray-100">
                <h4 className="text-xs font-medium text-gray-700 mb-1">Mean Absolute Error (MAE)</h4>
                <p className="text-sm font-semibold text-red-600">{mae}</p>
                <p className="text-xs text-gray-500 mt-1">
                  Average prediction error. Lower values indicate better accuracy.
                </p>
              </div>
              <div className="p-3 bg-gray-50 rounded-lg border border-gray-100">
                <h4 className="text-xs font-medium text-gray-700 mb-1">
                  Root Mean Squared Error (RMSE)
                </h4>
                <p className="text-sm font-semibold text-red-600">{rmse}</p>
                <p className="text-xs text-gray-500 mt-1">
                  Measures larger errors’ impact. Lower values are preferable.
                </p>
              </div>
              <div className="p-3 bg-gray-50 rounded-lg border border-gray-100">
                <h4 className="text-xs font-medium text-gray-700 mb-1">R² Score</h4>
                <p className="text-sm font-semibold text-green-600">{r2Score}</p>
                <p className="text-xs text-gray-500 mt-1">
                  Indicates prediction fit. Values closer to 1 signify better alignment.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Prediction Chart Section */}
        <div className="mb-12 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-sm font-semibold text-gray-800 mb-4">Prediction Visualization</h2>
          <p className="text-xs text-gray-600 mb-6">
            This chart visualizes actual vs. predicted values over observations. Use the
            toggles below to interactively filter the data. Hover over points for detailed
            insights.
          </p>
          <div className="flex justify-start space-x-4 mb-6">
            <label className="flex items-center space-x-1 text-xs text-gray-700">
              <input
                type="checkbox"
                checked={showActual}
                onChange={() => setShowActual(!showActual)}
                className="form-checkbox w-3 h-3 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <span>Show Actual Values (Blue)</span>
            </label>
            <label className="flex items-center space-x-1 text-xs text-gray-700">
              <input
                type="checkbox"
                checked={showPredicted}
                onChange={() => setShowPredicted(!showPredicted)}
                className="form-checkbox w-3 h-3 text-green-600 border-gray-300 rounded focus:ring-green-500"
              />
              <span>Show Predicted Values (Green)</span>
            </label>
          </div>

          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis
                dataKey="index"
                type="number"
                allowDecimals={false}
                tick={{ fill: "#4B5563", fontSize: 10 }}
                axisLine={{ stroke: "#E5E7EB" }}
                label={{
                  value: "Observation Index",
                  position: "insideBottom",
                  offset: -8,
                  fill: "#4B5563",
                  fontSize: 10,
                }}
              />
              <YAxis
                tick={{ fill: "#4B5563", fontSize: 10 }}
                label={{
                  value: "Value",
                  angle: -90,
                  position: "insideLeft",
                  offset: 8,
                  fill: "#4B5563",
                  fontSize: 10,
                }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "white",
                  border: "1px solid #E5E7EB",
                  borderRadius: "4px",
                  fontSize: "10px",
                  padding: "6px",
                  boxShadow: "0 1px 2px rgba(0, 0, 0, 0.1)",
                }}
                formatter={(value, name) => [
                  `${value.toLocaleString()}`,
                  name === "actual" ? "Actual Value" : "Predicted Value",
                ]}
                labelFormatter={(label) => `Step ${label}`}
              />
              <Legend
                wrapperStyle={{ fontSize: "10px", paddingTop: "6px" }}
                verticalAlign="top"
              />
              {showActual && (
                <Line
                  type="monotone"
                  dataKey="actual"
                  stroke="#4F46E5"
                  strokeWidth={1.5}
                  dot={{ r: 3, fill: "#93C5FD" }}
                  name="Actual Values"
                  animationDuration={800}
                  isAnimationActive={true}
                />
              )}
              {showPredicted && (
                <Line
                  type="monotone"
                  dataKey="predicted"
                  stroke="#34D399"
                  strokeWidth={1.5}
                  dot={{ r: 3, fill: "#6EE7B7" }}
                  name="Predicted Values"
                  animationDuration={800}
                  isAnimationActive={true}
                />
              )}
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Responsive and Formal Styling */}
      <style >{`
        @media (max-width: 640px) {
          .grid-cols-3 {
            grid-template-columns: 1fr;
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
          .max-w-5xl {
            max-width: 100%;
          }
          .mb-12, .mb-10 {
            margin-bottom: 1.5rem;
          }
        }
        @media (min-width: 641px) and (max-width: 1024px) {
          .grid-cols-3 {
            grid-template-columns: repeat(2, 1fr);
          }
          .max-w-5xl {
            max-width: 90%;
          }
        }
        .hover:shadow-md {
          transition: box-shadow 0.3s ease;
        }
        .animate-bounce-slow {
          animation: bounce 2s infinite ease-in-out;
        }
        .animate-pulse-slow {
          animation: pulse 2s infinite ease-in-out;
        }
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-3px); }
        }
        @keyframes pulse {
          0% { transform: scale(1); }
          50% { transform: scale(1.02); }
          100% { transform: scale(1); }
        }
      `}</style>
    </div>
  );
};

export default ModelEvaluation;
