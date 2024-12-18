
// // import React, { useState } from "react";
// // import PerformanceConsistency from "./PerformanceConsistency"; // Import the PerformanceConsistency component
// // import FeatureImportanceProps from "./FeatureImportanceProps";
// // import ModelEvaluation from "./ModelEvaluation";

// // const ExpandableBox: React.FC<{ title: string; children?: React.ReactNode; healthyCheck?: boolean; suggestion?: string }> = ({
// //   title,
// //   children,
// //   healthyCheck,
// //   suggestion,
// // }) => {
// //   const [isOpen, setIsOpen] = useState(false);

// //   return (
// //     <div className="border rounded-lg mb-4 p-4 shadow-sm bg-white">
// //       <div
// //         className="flex justify-between items-center cursor-pointer"
// //         onClick={() => setIsOpen(!isOpen)}
// //       >
// //         <h3 className="text-lg font-semibold">{title}</h3>
// //         <div className="flex items-center space-x-2">
// //           {healthyCheck && (
// //             <span className="text-green-600 font-medium">Healthy check</span>
// //           )}
// //           {suggestion && (
// //             <span className="text-yellow-500 font-medium">{suggestion}</span>
// //           )}
// //           <button
// //             className="text-blue-500"
// //             aria-label={isOpen ? "Collapse" : "Expand"}
// //           >
// //             {isOpen ? "-" : "+"}
// //           </button>
// //         </div>
// //       </div>
// //       {isOpen && <div className="mt-4">{children}</div>}
// //     </div>
// //   );
// // };

// // const Dashboard: React.FC = () => {
// //   return (
// //     <div className="p-8 bg-gray-100 min-h-screen flex justify-center">
// //       <div className="max-w-4xl w-full">
// //         <h1 className="text-2xl font-bold mb-6">Explore Your Model</h1>
// //         <div>
// //           <h2 className="text-xl font-semibold mb-4">
// //             Dive deeper into your model's performance
// //           </h2>
// //           {/* <ExpandableBox title="Metrics Analysis" /> */}
// //           <ExpandableBox title="Metrics Analysis">
// //             <ModelEvaluation /> {/* Embed the PerformanceConsistency component */}
// //           </ExpandableBox>
// //           {/* <ExpandableBox title="Model vs Benchmark by range" /> */}
// //           <ExpandableBox title="Performance Consistency (overfit)" suggestion="1 Suggestion">
// //             <PerformanceConsistency /> {/* Embed the PerformanceConsistency component */}
// //           </ExpandableBox>
// //         </div>
// //         <div className="mt-6">
// //           <h2 className="text-xl font-semibold mb-4">
// //             Analyze how your data attributes affect predictions
// //           </h2>
// //           <ExpandableBox
// //             title="Attribute Columns & Features Importance"
// //             healthyCheck
// //           >
// //             <FeatureImportanceProps /> {/* Embed the FeatureImportance component */}
// //           </ExpandableBox>
// //           <ExpandableBox title="Columns & Features Values Effect" healthyCheck />
// //         </div>
// //         <div className="mt-6">
// //           <h2 className="text-xl font-semibold mb-4">
// //             Evaluate the quality of the training data
// //           </h2>
// //           <ExpandableBox title="Core set statistics" healthyCheck />
// //           <ExpandableBox title="Core set over time" healthyCheck />
// //           <ExpandableBox
// //             title="Attribute Columns & Features Importance"
// //             healthyCheck
// //           >
// //             <FeatureImportanceProps /> {/* Embed the FeatureImportance component */}
// //           </ExpandableBox>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default Dashboard;



// // Dynamic code, do not remove it



// // // Dashboard.tsx

// // import React, { useEffect, useState } from "react";
// // import PerformanceConsistency from "./PerformanceConsistency";
// // import FeatureImportanceProps from "./FeatureImportanceProps";
// // import ModelEvaluation from "./ModelEvaluation";
// // import { useLocation } from "react-router-dom";

// // interface Metrics {
// //   rmse: number;
// //   r2_score: number;
// //   mae: number;
// // }

// // interface ModelMetrics {
// //   training: Metrics;
// //   testing: Metrics;
// //   assessment: string;
// // }

// // interface MetricsData {
// //   model_metrics: ModelMetrics;
// //   attribute_columns: string[];
// //   feature_importance: Record<string, number>;
// //   core_statistics: Record<string, any>;
// //   attribute_statistics: Record<string, any>;
// //   predictions: {
// //     actual: number[];
// //     predicted: number[];
// //   };
// //   user_id: string;
// //   chat_id: string;
// // }

// // const ExpandableBox: React.FC<{ title: string; children?: React.ReactNode; healthyCheck?: boolean; suggestion?: string }> = ({
// //   title,
// //   children,
// //   healthyCheck,
// //   suggestion,
// // }) => {
// //   const [isOpen, setIsOpen] = useState(false);

// //   return (
// //     <div className="border rounded-lg mb-4 p-4 shadow-sm bg-white">
// //       <div
// //         className="flex justify-between items-center cursor-pointer"
// //         onClick={() => setIsOpen(!isOpen)}
// //       >
// //         <h3 className="text-lg font-semibold">{title}</h3>
// //         <div className="flex items-center space-x-2">
// //           {healthyCheck && (
// //             <span className="text-green-600 font-medium">Healthy check</span>
// //           )}
// //           {suggestion && (
// //             <span className="text-yellow-500 font-medium">{suggestion}</span>
// //           )}
// //           <button
// //             className="text-blue-500"
// //             aria-label={isOpen ? "Collapse" : "Expand"}
// //           >
// //             {isOpen ? "-" : "+"}
// //           </button>
// //         </div>
// //       </div>
// //       {isOpen && <div className="mt-4">{children}</div>}
// //     </div>
// //   );
// // };

// // const Dashboard: React.FC = () => {
// //   const location = useLocation();
// //   const userId = location.state?.user_id;
// //   const chatId = location.state?.chat_id;

// //   const [data, setData] = useState<MetricsData | null>(null);
// //   const [loading, setLoading] = useState(true);
// //   const [error, setError] = useState<string | null>(null);

// //   useEffect(() => {
// //     if (!userId || !chatId) {
// //       setError("Missing user_id or chat_id");
// //       setLoading(false);
// //       return;
// //     }

// //     const fetchData = async () => {
// //       try {
// //         const url = `http://127.0.0.1:8000/model/modelget/?user_id=${userId}&chat_id=${chatId}`;
      
// //         const response = await fetch(url);
// //         if (!response.ok) {
// //           throw new Error(`Failed to fetch model results: ${response.statusText}`);
// //         }
// //         const result = await response.json();
// //         setData(result);
// //       } catch (err) {
// //         setError(err instanceof Error ? err.message : "Unknown error");
// //       } finally {
// //         setLoading(false);
// //       }
// //     };

// //     fetchData();
// //   }, [userId, chatId]);

// //   if (loading) {
// //     return <div className="text-center mt-6">Loading Dashboard data...</div>;
// //   }

// //   if (error) {
// //     return <div className="text-center text-red-500 mt-6">{error}</div>;
// //   }

// //   if (!data) {
// //     return <div className="text-center mt-6">No data available</div>;
// //   }

// //   return (
// //     <div className="p-8 bg-gray-100 min-h-screen flex justify-center">
// //       <div className="max-w-4xl w-full">
// //         <h1 className="text-2xl font-bold mb-6">
// //           Explore Your Model (User: {data.user_id}, Chat: {data.chat_id})
// //         </h1>
// //         <div>
// //           <h2 className="text-xl font-semibold mb-4">Dive deeper into your model's performance</h2>
// //           <ExpandableBox title="Metrics Analysis">
// //             {/* Pass data as props */}
// //             <ModelEvaluation modelData={data} />
// //           </ExpandableBox>
// //           <ExpandableBox title="Performance Consistency (overfit)" suggestion="1 Suggestion">
// //             <PerformanceConsistency modelData={data} />
// //           </ExpandableBox>
// //         </div>
// //         <div className="mt-6">
// //           <h2 className="text-xl font-semibold mb-4">
// //             Analyze how your data attributes affect predictions
// //           </h2>
// //           <ExpandableBox title="Attribute Columns & Features Importance" healthyCheck>
// //             <FeatureImportanceProps modelData={data} />
// //           </ExpandableBox>
// //           <ExpandableBox title="Columns & Features Values Effect" healthyCheck />
// //         </div>
// //         <div className="mt-6">
// //           <h2 className="text-xl font-semibold mb-4">
// //             Evaluate the quality of the training data
// //           </h2>
// //           <ExpandableBox title="Core set statistics" healthyCheck />
// //           <ExpandableBox title="Core set over time" healthyCheck />
// //           <ExpandableBox title="Attribute Columns & Features Importance" healthyCheck>
// //             <FeatureImportanceProps modelData={data} />
// //           </ExpandableBox>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default Dashboard;




// import React, { useEffect, useState } from "react";
// import PerformanceConsistency from "./PerformanceConsistency";
// import FeatureImportanceProps from "./FeatureImportanceProps";
// import ModelEvaluation from "./ModelEvaluation";
// // import { useLocation } from "react-router-dom";

// interface Metrics {
//   rmse: number;
//   r2_score: number;
//   mae: number;
// }

// interface ModelMetrics {
//   training: Metrics;
//   testing: Metrics;
//   assessment: string;
// }

// interface MetricsData {
//   model_metrics: ModelMetrics;
//   attribute_columns: string[];
//   feature_importance: Record<string, number>;
//   core_statistics: Record<string, any>;
//   attribute_statistics: Record<string, any>;
//   predictions: {
//     actual: number[];
//     predicted: number[];
//   };
//   user_id: string;
//   chat_id: string;
// }

// const ExpandableBox: React.FC<{
//   title: string;
//   children?: React.ReactNode;
//   healthyCheck?: boolean;
//   suggestion?: string;
// }> = ({ title, children, healthyCheck, suggestion }) => {
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
//   // Commented out the dynamic code
//   // const location = useLocation();
//   // const userId = location.state?.user_id;
//   // const chatId = location.state?.chat_id;

//   // Hardcoded values for testing
//   const userId = "12";
//   const chatId = "5";

//   const [data, setData] = useState<MetricsData | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     if (!userId || !chatId) {
//       setError("Missing user_id or chat_id");
//       setLoading(false);
//       return;
//     }

//     const fetchData = async () => {
//       try {
//         const url = `http://127.0.0.1:8000/model/modelget/?user_id=${userId}&chat_id=${chatId}`;

//         const response = await fetch(url);
//         if (!response.ok) {
//           throw new Error(`Failed to fetch model results: ${response.statusText}`);
//         }
//         const result = await response.json();
//         setData(result);
//       } catch (err) {
//         setError(err instanceof Error ? err.message : "Unknown error");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, [userId, chatId]);

//   if (loading) {
//     return <div className="text-center mt-6">Loading Dashboard data...</div>;
//   }

//   if (error) {
//     return <div className="text-center text-red-500 mt-6">{error}</div>;
//   }

//   if (!data) {
//     return <div className="text-center mt-6">No data available</div>;
//   }

//   return (
//     <div className="p-8 bg-gray-100 min-h-screen flex justify-center">
//       <div className="max-w-4xl w-full">
//         <h1 className="text-2xl font-bold mb-6">
//           Explore Your Model (User: {data.user_id}, Chat: {data.chat_id})
//         </h1>
//         <div>
//           <h2 className="text-xl font-semibold mb-4">
//             Dive deeper into your model's performance
//           </h2>
//           <ExpandableBox title="Metrics Analysis">
//             <ModelEvaluation modelData={data} />
//           </ExpandableBox>
//           <ExpandableBox
//             title="Performance Consistency (overfit)"
//             suggestion="1 Suggestion"
//           >
//             <PerformanceConsistency modelData={data} />
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
//             <FeatureImportanceProps modelData={data} />
//           </ExpandableBox>
//           <ExpandableBox title="Columns & Features Values Effect" healthyCheck />
//         </div>
//         <div className="mt-6">
//           <h2 className="text-l font-semibold mb-4">
//             Evaluate the quality of the training data
//           </h2>
//           <ExpandableBox title="Core set statistics" healthyCheck />
//           <ExpandableBox title="Core set over time" healthyCheck />
//           <ExpandableBox
//             title="Attribute Columns & Features Importance"
//             healthyCheck
//           >
//             <FeatureImportanceProps modelData={data} />
//           </ExpandableBox>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;





import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PerformanceConsistency from "./PerformanceConsistency";
import FeatureImportanceProps from "./FeatureImportanceProps";
import ModelEvaluation from "./ModelEvaluation";

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

const ExpandableBox: React.FC<{
  title: string;
  children?: React.ReactNode;
  healthyCheck?: boolean;
  suggestion?: string;
}> = ({ title, children, healthyCheck, suggestion }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      className="border rounded-lg mb-4 p-4 shadow-sm bg-white"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div
        className="flex justify-between items-center cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h3 className="text-base font-semibold text-gray-700">{title}</h3>
        <div className="flex items-center space-x-2">
          {healthyCheck && (
            <span className="text-green-500 font-medium text-sm">Healthy check</span>
          )}
          {suggestion && (
            <span className="text-yellow-500 font-medium text-sm">{suggestion}</span>
          )}
          <button
            className="text-blue-500 focus:outline-none text-sm"
            aria-label={isOpen ? "Collapse" : "Expand"}
          >
            <motion.span
              animate={{ rotate: isOpen ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              {isOpen ? "-" : "+"}
            </motion.span>
          </button>
        </div>
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="mt-4"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const Dashboard: React.FC = () => {
  // Hardcoded values for testing
  const userId = "12";
  const chatId = "5";

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
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="text-center">
          <motion.div
            className="bg-white p-8 rounded-lg shadow-md"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="text-gray-500 text-sm mb-2">Loading Dashboard data...</div>
            <div className="h-2 w-32 bg-gray-200 rounded-full animate-pulse" />
          </motion.div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <motion.div
          className="bg-white p-8 rounded-lg shadow-md text-center"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-red-500 font-medium mb-2 text-sm">Error</div>
          <div className="text-gray-500 text-sm">{error}</div>
        </motion.div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <motion.div
          className="bg-white p-8 rounded-lg shadow-md text-center"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-gray-500 text-sm">No data available</div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="p-8 bg-gray-100 min-h-screen flex justify-center">
      <motion.div
        className="max-w-4xl w-full"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-xl font-bold mb-6 text-gray-800">
          Explore Your Model (User: {data.user_id}, Chat: {data.chat_id})
        </h1>
        <div>
          <h2 className="text-lg font-semibold mb-4 text-gray-700">
            Dive deeper into your model's performance
          </h2>
          <ExpandableBox title="Metrics Analysis">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <ModelEvaluation modelData={data} />
            </motion.div>
          </ExpandableBox>
          <ExpandableBox
            title="Performance Consistency (overfit)"
            suggestion="1 Suggestion"
          >
            <PerformanceConsistency modelData={data} />
          </ExpandableBox>
        </div>
        <div className="mt-6">
          <h2 className="text-lg font-semibold mb-4 text-gray-700">
            Analyze how your data attributes affect predictions
          </h2>
          <ExpandableBox
            title="Attribute Columns & Features Importance"
            healthyCheck
          >
            <FeatureImportanceProps modelData={data} />
          </ExpandableBox>
          <ExpandableBox title="Columns & Features Values Effect" healthyCheck />
        </div>
        <div className="mt-6">
          <h2 className="text-lg font-semibold mb-4 text-gray-700">
            Evaluate the quality of the training data
          </h2>
          <ExpandableBox title="Core set statistics" healthyCheck />
          <ExpandableBox title="Core set over time" healthyCheck />
          <ExpandableBox
            title="Attribute Columns & Features Importance"
            healthyCheck
          >
            <FeatureImportanceProps modelData={data} />
          </ExpandableBox>
        </div>
      </motion.div>
    </div>
  );
};

export default Dashboard;