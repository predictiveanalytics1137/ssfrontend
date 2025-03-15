


import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PerformanceConsistency from "./PerformanceConsistency";
import FeatureImportanceProps from "./FeatureImportanceProps";
import ModelEvaluation from "./ModelEvaluation";
import ResidualAnalysis from "./ResidualAnalysis";
import ModelMetadata from "./ModelMetadata";
import DataCharacteristics from "./DataCharacteristics";
import CoreAttributeStatistics from "./CoreAttributeStatistics";
import ExtendedFeatureAnalysis from "./ExtendedFeatureAnalysis";
import FeatureImportanceDashboard from "./FeatureImportanceProps";
import { API_BASE_URL } from "../constants";

// ~~~--- Types ---~~~
interface Metrics {
  rmse: number;
  r2_score: number;
  mae: number;
}

interface ModelMetrics {
  training: Metrics;
  testing: Metrics;
  validation: Metrics; // Added validation property
  assessment: string;
  residuals?: {
    "25%": number;
    median: number;
    "75%": number;
    min: number;
    max: number;
    std: number;
    mean: number;
  };
}

export interface MetricsData {
  model_metrics: ModelMetrics;
  feature_importance: Record<string, number>;
  feature_analysis?: {
    top_features: Record<string, number>;
    shap_importance: Record<string, number>;
    attribute_columns: string[];
    feature_importance: Record<string, number>;
  };
  predictions: {
    actual: number[];
    predicted: number[];
    product_id: string[];
    analysis_time: string[];
  };
  model_metadata?: {
    timestamp: string;
    model_type: string;
    num_features: number;
    hyperparameters: Record<string, any>;
    training_samples: number;
    testing_samples: number;
    evaluation_duration: number;
  };
  data_characteristics?: {
    actual_distribution: { mean: number; std: number; min: number; max: number };
    predicted_distribution: { mean: number; std: number; min: number; max: number };
    feature_correlations: Record<string, number>;
  };
  core_statistics?: Record<string, Record<string, number | string>>;
  attribute_statistics?: Record<string, Record<string, number | string>>;
  user_id: string;
  chat_id: string;
}

interface DashboardProps {
  user_id: string;
  chat_id: string;
  data?: MetricsData | null;
}

function formatAsK(num: number): string {
  if (Math.abs(num) >= 1000) {
    return (num / 1000).toFixed(2) + "k";
  } else {
    return num.toFixed(2);
  }
}

const StepProgressBar: React.FC<{ status: string }> = ({ status }) => {
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

  // const steps = [
  //   { label: "Step 1" },
  //   { label: "Step 2" },
  //   { label: "Step 3" },
  //   { label: "Finish" },
  // ];
  const steps = [
    { label: "Data Preprocessing" },  // Step 1: Cleaning & preparing data
    { label: "Feature Engineering" }, // Step 2: Creating new features
    { label: "Model Training" },      // Step 3: Training the ML model
    // { label: "Model Evaluation" },    // Step 4: Validating performance
    { label: "Prediction & Deployment" } // Step 5: Making predictions & deploying
];


  return (
    <div className="flex items-center justify-between w-full max-w-xl mx-auto my-6">
      {steps.map((step, idx) => {
        const isCompleted = stepIndex >= idx + 1;
        return (
          <div key={step.label} className="flex-1 flex items-center">
            <div className="relative flex flex-col items-center text-center">
              <div
                className={`h-10 w-10 rounded-full border-2 flex items-center justify-center ${
                  isCompleted
                    ? "bg-green-500 border-green-500"
                    : "bg-gray-200 border-gray-400"
                }`}
              >
                {isCompleted ? (
                  <svg
                    className="text-white w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  <span className="text-xs text-gray-700">{idx + 1}</span>
                )}
              </div>
              <span className="text-xs mt-2 text-gray-800">{step.label}</span>
            </div>
            {idx < steps.length - 1 && (
              <div
                className={`flex-auto border-t-2 mx-2 ${
                  stepIndex > idx + 1 ? "border-green-500" : "border-gray-300"
                }`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
};

const ExpandableBox: React.FC<{ title: string; children?: React.ReactNode }> = ({
  title,
  children,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div className="border rounded-lg mb-8 p-6 shadow-sm bg-white">
      <div
        className="flex justify-between items-center cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h3 className="text-base font-semibold text-gray-700">{title}</h3>
        <motion.button
          className="text-blue-500 focus:outline-none"
          animate={{ rotate: isOpen ? 180 : 0 }}
        >
          {isOpen ? "-" : "+"}
        </motion.button>
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="mt-4"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const EmptyState: React.FC<{ message: string }> = ({ message }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] p-8">
      <svg
        className="w-16 h-16 text-gray-400 mb-4"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25m18 0A2.25 2.25 0 0018.75 3H5.25A2.25 2.25 0 003 5.25m18 0V12a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 12V5.25"
        />
      </svg>
      <p className="text-gray-600 text-lg font-medium text-center max-w-md">{message}</p>
    </div>
  );
};

const Dashboard: React.FC<DashboardProps> = ({ user_id, chat_id, data }) => {
  console.log("Dashboard received user_id:", user_id, "and chat_id:", chat_id);

  const [progressStatus, setProgressStatus] = useState<string>("");
  const [progressLoading, setProgressLoading] = useState(true);
  const [progressError, setProgressError] = useState<string | null>(null);

  const [dashboardData, setDashboardData] = useState<MetricsData | null>(data ?? null);
  const [loadingData, setLoadingData] = useState(!data);
  const [errorData, setErrorData] = useState<string | null>(null);

  const [activeTab, setActiveTab] = useState<"evaluation" | "predictions">("evaluation");

  useEffect(() => {
    const fetchMetadata = async () => {
      try {
        setProgressLoading(true);
        const url = `${API_BASE_URL}/api/get_prediction_metadata/?user_id=${user_id}&chat_id=${chat_id}`;
        const resp = await fetch(url);
        if (!resp.ok) {
          if (resp.status === 404) {
            // Treat 404 as no metadata exists (model not trained)
            setProgressStatus("");
            setProgressLoading(false);
            return;
          }
          throw new Error(`Failed to fetch prediction metadata: ${resp.statusText}`);
        }
        const result = await resp.json();
        if (!result.metadata || !result.metadata.length) {
          setProgressStatus("");
        } else {
          const item = result.metadata[0];
          console.log("Fetched metadata:", item);
          setProgressStatus(item.status || "");
        }
      } catch (err: any) {
        console.error("Error fetching prediction metadata:", err);
        // Instead of setting an error, assume no model exists
        setProgressStatus("");
      } finally {
        setProgressLoading(false);
      }
    };
    fetchMetadata();
  }, [user_id, chat_id]);

  useEffect(() => {
    if (!data && progressStatus === "training_completed") {
      const fetchDashboardData = async () => {
        try {
          setLoadingData(true);
          const url = `${API_BASE_URL}/model/modelget/?user_id=${user_id}&chat_id=${chat_id}`;
          const response = await fetch(url);
          if (!response.ok) {
            throw new Error("Failed to fetch dashboard data");
          }
          const result = await response.json();
          setDashboardData(result);
        } catch (err) {
          setErrorData(err instanceof Error ? err.message : "Unknown error occurred");
        } finally {
          setLoadingData(false);
        }
      };
      fetchDashboardData();
    }
  }, [progressStatus, data, user_id, chat_id]);

  if (progressLoading) {
    return <div className="p-4">Loading progress status...</div>;
  }

  if (progressError) {
    return (
      <EmptyState message={`Error: ${progressError}. Please train a model to proceed.`} />
    );
  }

  if (!progressStatus) {
    return (
      <EmptyState message="Dashboard will only be available after you train your model" />
    );
  }

  if (progressStatus !== "training_completed") {
    return (
      <div className="p-6">
        <h2 className="text-xl font-bold mb-2">Model Building Progress</h2>
        <p className="text-sm text-gray-600 mb-4">
          Hang tight! Your model/predictions are still processing...
        </p>
        <StepProgressBar status={progressStatus} />
      </div>
    );
  }

  if (loadingData) {
    return <div className="p-4">Loading Dashboard data...</div>;
  }

  if (errorData) {
    return <div className="p-4 text-red-500">Error: {errorData}</div>;
  }

  if (!dashboardData || Object.keys(dashboardData).length === 0) {
    return (
      <EmptyState message="Dashboard will only be available after you train your model" />
    );
  }

  return (
    <div className="p-8">
      <div className="flex space-x-8 border-b pb-2 mb-8">
        <button
          className={`${
            activeTab === "evaluation" ? "font-semibold border-b-2 border-[#5B3557]" : ""
          }`}
          onClick={() => setActiveTab("evaluation")}
        >
          Model Evaluation
        </button>
        <button
          className={`${
            activeTab === "predictions" ? "font-semibold border-b-2 border-[#5B3557]" : ""
          }`}
          onClick={() => setActiveTab("predictions")}
        >
          Test Set Predictions
        </button>
      </div>

      {activeTab === "evaluation" && (
        <>
          <h2 className="text-xl font-bold mb-6">Model Dashboard</h2>
          <ExpandableBox title="Metrics Analysis">
            <ModelEvaluation modelData={dashboardData} />
          </ExpandableBox>
          <ExpandableBox title="Performance Consistency">
            <PerformanceConsistency
              modelMetrics={dashboardData.model_metrics}
              headings={{
                main: "Model Performance Consistency",
                description: "Compare your model's training and testing R² scores.",
              }}
              labels={{ validation: "Validation R² Score" }}
              warnings={{
                condition: !!dashboardData.model_metrics.assessment,
                message: dashboardData.model_metrics.assessment || "No assessment provided.",
              }}
            />
          </ExpandableBox>
          <ExpandableBox title="Feature Importance">
            <FeatureImportanceDashboard modelData={dashboardData} />
          </ExpandableBox>
          <ExpandableBox title="Residual Analysis">
            <ResidualAnalysis residuals={dashboardData.model_metrics.residuals} />
          </ExpandableBox>
          <ExpandableBox title="Model Metadata">
            <ModelMetadata metadata={dashboardData.model_metadata ?? null} />
          </ExpandableBox>
          {/* <ExpandableBox title="Data Characteristics">
            {/* <DataCharacteristics characteristics={dashboardData.data_characteristics ?? null} /> */}
          {/* </ExpandableBox> */} 
          {/* <ExpandableBox title="Core & Attribute Statistics">
            <CoreAttributeStatistics
              coreStats={dashboardData.core_statistics ?? null}
              attributeStats={dashboardData.attribute_statistics ?? null}
            />
          </ExpandableBox> */}
          <ExpandableBox title="Extended Feature Analysis">
            <ExtendedFeatureAnalysis featureAnalysis={dashboardData.feature_analysis ?? null} />
          </ExpandableBox>
        </>
      )}

      {activeTab === "predictions" && (
        <div className="overflow-x-auto mt-6">
          {!dashboardData.predictions?.actual?.length ||
          !dashboardData.predictions?.predicted?.length ||
          !dashboardData.predictions?.product_id?.length ||
          !dashboardData.predictions?.analysis_time?.length ? (
            <div>No predictions to show.</div>
          ) : (
            <>
              <div className="flex flex-wrap items-center gap-4 mb-6">
                <div className="px-4 py-3 border rounded">
                  <div className="text-sm text-gray-500 flex items-center gap-1">
                    <span>Number of entities</span>
                    <svg
                      className="w-4 h-4 text-gray-400 hover:text-gray-700 cursor-help"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      viewBox="0 0 24 24"
                    >
                      <title>
                        "The test set contains 10% of the data, and it is used to evaluate the model performance on unseen data."
                      </title>
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M13 16h-1v-4h1m0-4h-.01M12 6a9 9 0 100 18 9 9 0 000-18z"
                      />
                    </svg>
                  </div>
                  <div className="font-semibold">
                    {dashboardData.predictions.actual.length}
                  </div>
                </div>
                <div className="px-4 py-3 border rounded">
                  <div className="text-sm text-gray-500 flex items-center gap-1">
                    <span>Average target value</span>
                    <svg
                      className="w-4 h-4 text-gray-400 hover:text-gray-700 cursor-help"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      viewBox="0 0 24 24"
                    >
                      <title>The average value of entities in the test set</title>
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M13 16h-1v-4h1m0-4h-.01M12 6a9 9 0 100 18 9 9 0 000-18z"
                      />
                    </svg>
                  </div>
                  <div className="font-semibold">
                    {formatAsK(
                      dashboardData.predictions.actual.reduce((a, b) => a + b, 0) /
                        dashboardData.predictions.actual.length
                    )}
                  </div>
                </div>
              </div>

              <table className="min-w-full text-left border-collapse table-auto">
                <thead>
                  <tr className="bg-gray-100 text-sm">
                    <th className="px-4 py-2 border">Product ID</th>
                    <th className="px-4 py-2 border">Analysis Time</th>
                    <th className="px-4 py-2 border">Actual</th>
                    <th className="px-4 py-2 border">Predicted</th>
                    <th className="px-4 py-2 border">Error</th>
                    <th className="px-4 py-2 border">Percentage</th>
                  </tr>
                </thead>
                <tbody className="text-sm">
                  {dashboardData.predictions.actual.map((actVal, i) => {
                    const predVal = dashboardData.predictions.predicted[i];
                    const errorVal = predVal - actVal;
                    const errorColor =
                      errorVal === 0
                        ? "text-gray-700"
                        : errorVal < 0
                        ? "text-red-600"
                        : "text-green-600";
                    const percentageError =
                      actVal !== 0 ? ((predVal - actVal) / actVal) * 100 : 0; // Avoid division by zero
                    const percentageColor =
                      percentageError === 0
                        ? "text-gray-700"
                        : percentageError < 0
                        ? "text-red-600"
                        : "text-green-600";

                    return (
                      <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                        <td className="px-4 py-2 border">{dashboardData.predictions.product_id[i]}</td>
                        <td className="px-4 py-2 border">{dashboardData.predictions.analysis_time[i]}</td>
                        <td className="px-4 py-2 border">{actVal}</td>
                        <td className="px-4 py-2 border">{predVal}</td>
                        <td className={`px-4 py-2 border font-semibold ${errorColor}`}>
                          {errorVal > 0 ? `+${errorVal.toFixed(2)}` : errorVal.toFixed(2)}
                        </td>
                        <td className={`px-4 py-2 border font-semibold ${percentageColor}`}>
                          {percentageError.toFixed(2)}%
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default Dashboard;