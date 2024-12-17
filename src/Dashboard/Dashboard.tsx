
// import React, { useState } from "react";
// import PerformanceConsistency from "./PerformanceConsistency"; // Import the PerformanceConsistency component
// import FeatureImportanceProps from "./FeatureImportanceProps";
// import ModelEvaluation from "./ModelEvaluation";

// const ExpandableBox: React.FC<{ title: string; children?: React.ReactNode; healthyCheck?: boolean; suggestion?: string }> = ({
//   title,
//   children,
//   healthyCheck,
//   suggestion,
// }) => {
//   const [isOpen, setIsOpen] = useState(false);

//   return (
//     <div className="border rounded-lg mb-4 p-4 shadow-sm bg-white">
//       <div
//         className="flex justify-between items-center cursor-pointer"
//         onClick={() => setIsOpen(!isOpen)}
//       >
//         <h3 className="text-lg font-semibold">{title}</h3>
//         <div className="flex items-center space-x-2">
//           {healthyCheck && (
//             <span className="text-green-600 font-medium">Healthy check</span>
//           )}
//           {suggestion && (
//             <span className="text-yellow-500 font-medium">{suggestion}</span>
//           )}
//           <button
//             className="text-blue-500"
//             aria-label={isOpen ? "Collapse" : "Expand"}
//           >
//             {isOpen ? "-" : "+"}
//           </button>
//         </div>
//       </div>
//       {isOpen && <div className="mt-4">{children}</div>}
//     </div>
//   );
// };

// const Dashboard: React.FC = () => {
//   return (
//     <div className="p-8 bg-gray-100 min-h-screen flex justify-center">
//       <div className="max-w-4xl w-full">
//         <h1 className="text-2xl font-bold mb-6">Explore Your Model</h1>
//         <div>
//           <h2 className="text-xl font-semibold mb-4">
//             Dive deeper into your model's performance
//           </h2>
//           {/* <ExpandableBox title="Metrics Analysis" /> */}
//           <ExpandableBox title="Metrics Analysis">
//             <ModelEvaluation /> {/* Embed the PerformanceConsistency component */}
//           </ExpandableBox>
//           {/* <ExpandableBox title="Model vs Benchmark by range" /> */}
//           <ExpandableBox title="Performance Consistency (overfit)" suggestion="1 Suggestion">
//             <PerformanceConsistency /> {/* Embed the PerformanceConsistency component */}
//           </ExpandableBox>
//         </div>
//         <div className="mt-6">
//           <h2 className="text-xl font-semibold mb-4">
//             Analyze how your data attributes affect predictions
//           </h2>
//           <ExpandableBox
//             title="Attribute Columns & Features Importance"
//             healthyCheck
//           >
//             <FeatureImportanceProps /> {/* Embed the FeatureImportance component */}
//           </ExpandableBox>
//           <ExpandableBox title="Columns & Features Values Effect" healthyCheck />
//         </div>
//         <div className="mt-6">
//           <h2 className="text-xl font-semibold mb-4">
//             Evaluate the quality of the training data
//           </h2>
//           <ExpandableBox title="Core set statistics" healthyCheck />
//           <ExpandableBox title="Core set over time" healthyCheck />
//           <ExpandableBox
//             title="Attribute Columns & Features Importance"
//             healthyCheck
//           >
//             <FeatureImportanceProps /> {/* Embed the FeatureImportance component */}
//           </ExpandableBox>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;





// Dashboard.tsx

import React, { useEffect, useState } from "react";
import PerformanceConsistency from "./PerformanceConsistency";
import FeatureImportanceProps from "./FeatureImportanceProps";
import ModelEvaluation from "./ModelEvaluation";
import { useLocation } from "react-router-dom";

interface Metrics {
  rmse: number;
  r2_score: number;
  mae: number;
}

interface ModelMetrics {
  training: Metrics;
  testing: Metrics;
  assessment: string;
}

interface MetricsData {
  model_metrics: ModelMetrics;
  attribute_columns: string[];
  feature_importance: Record<string, number>;
  core_statistics: Record<string, any>;
  attribute_statistics: Record<string, any>;
  predictions: {
    actual: number[];
    predicted: number[];
  };
  user_id: string;
  chat_id: string;
}

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
  const location = useLocation();
  const userId = location.state?.user_id;
  const chatId = location.state?.chat_id;

  const [data, setData] = useState<MetricsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!userId || !chatId) {
      setError("Missing user_id or chat_id");
      setLoading(false);
      return;
    }

    const fetchData = async () => {
      try {
        const url = `http://127.0.0.1:8000/model/modelget/?user_id=${userId}&chat_id=${chatId}`;
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`Failed to fetch model results: ${response.statusText}`);
        }
        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [userId, chatId]);

  if (loading) {
    return <div className="text-center mt-6">Loading Dashboard data...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500 mt-6">{error}</div>;
  }

  if (!data) {
    return <div className="text-center mt-6">No data available</div>;
  }

  return (
    <div className="p-8 bg-gray-100 min-h-screen flex justify-center">
      <div className="max-w-4xl w-full">
        <h1 className="text-2xl font-bold mb-6">
          Explore Your Model (User: {data.user_id}, Chat: {data.chat_id})
        </h1>
        <div>
          <h2 className="text-xl font-semibold mb-4">Dive deeper into your model's performance</h2>
          <ExpandableBox title="Metrics Analysis">
            {/* Pass data as props */}
            <ModelEvaluation modelData={data} />
          </ExpandableBox>
          <ExpandableBox title="Performance Consistency (overfit)" suggestion="1 Suggestion">
            <PerformanceConsistency modelData={data} />
          </ExpandableBox>
        </div>
        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-4">
            Analyze how your data attributes affect predictions
          </h2>
          <ExpandableBox title="Attribute Columns & Features Importance" healthyCheck>
            <FeatureImportanceProps modelData={data} />
          </ExpandableBox>
          <ExpandableBox title="Columns & Features Values Effect" healthyCheck />
        </div>
        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-4">
            Evaluate the quality of the training data
          </h2>
          <ExpandableBox title="Core set statistics" healthyCheck />
          <ExpandableBox title="Core set over time" healthyCheck />
          <ExpandableBox title="Attribute Columns & Features Importance" healthyCheck>
            <FeatureImportanceProps modelData={data} />
          </ExpandableBox>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
