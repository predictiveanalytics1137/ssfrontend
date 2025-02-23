
// // // // // // // // // // // import React, { useState } from "react";
// // // // // // // // // // // import PerformanceConsistency from "./PerformanceConsistency"; // Import the PerformanceConsistency component
// // // // // // // // // // // import FeatureImportanceProps from "./FeatureImportanceProps";
// // // // // // // // // // // import ModelEvaluation from "./ModelEvaluation";

// // // // // // // // // // // const ExpandableBox: React.FC<{ title: string; children?: React.ReactNode; healthyCheck?: boolean; suggestion?: string }> = ({
// // // // // // // // // // //   title,
// // // // // // // // // // //   children,
// // // // // // // // // // //   healthyCheck,
// // // // // // // // // // //   suggestion,
// // // // // // // // // // // }) => {
// // // // // // // // // // //   const [isOpen, setIsOpen] = useState(false);

// // // // // // // // // // //   return (
// // // // // // // // // // //     <div className="border rounded-lg mb-4 p-4 shadow-sm bg-white">
// // // // // // // // // // //       <div
// // // // // // // // // // //         className="flex justify-between items-center cursor-pointer"
// // // // // // // // // // //         onClick={() => setIsOpen(!isOpen)}
// // // // // // // // // // //       >
// // // // // // // // // // //         <h3 className="text-lg font-semibold">{title}</h3>
// // // // // // // // // // //         <div className="flex items-center space-x-2">
// // // // // // // // // // //           {healthyCheck && (
// // // // // // // // // // //             <span className="text-green-600 font-medium">Healthy check</span>
// // // // // // // // // // //           )}
// // // // // // // // // // //           {suggestion && (
// // // // // // // // // // //             <span className="text-yellow-500 font-medium">{suggestion}</span>
// // // // // // // // // // //           )}
// // // // // // // // // // //           <button
// // // // // // // // // // //             className="text-blue-500"
// // // // // // // // // // //             aria-label={isOpen ? "Collapse" : "Expand"}
// // // // // // // // // // //           >
// // // // // // // // // // //             {isOpen ? "-" : "+"}
// // // // // // // // // // //           </button>
// // // // // // // // // // //         </div>
// // // // // // // // // // //       </div>
// // // // // // // // // // //       {isOpen && <div className="mt-4">{children}</div>}
// // // // // // // // // // //     </div>
// // // // // // // // // // //   );
// // // // // // // // // // // };

// // // // // // // // // // // const Dashboard: React.FC = () => {
// // // // // // // // // // //   return (
// // // // // // // // // // //     <div className="p-8 bg-gray-100 min-h-screen flex justify-center">
// // // // // // // // // // //       <div className="max-w-4xl w-full">
// // // // // // // // // // //         <h1 className="text-2xl font-bold mb-6">Explore Your Model</h1>
// // // // // // // // // // //         <div>
// // // // // // // // // // //           <h2 className="text-xl font-semibold mb-4">
// // // // // // // // // // //             Dive deeper into your model's performance
// // // // // // // // // // //           </h2>
// // // // // // // // // // //           {/* <ExpandableBox title="Metrics Analysis" /> */}
// // // // // // // // // // //           <ExpandableBox title="Metrics Analysis">
// // // // // // // // // // //             <ModelEvaluation /> {/* Embed the PerformanceConsistency component */}
// // // // // // // // // // //           </ExpandableBox>
// // // // // // // // // // //           {/* <ExpandableBox title="Model vs Benchmark by range" /> */}
// // // // // // // // // // //           <ExpandableBox title="Performance Consistency (overfit)" suggestion="1 Suggestion">
// // // // // // // // // // //             <PerformanceConsistency /> {/* Embed the PerformanceConsistency component */}
// // // // // // // // // // //           </ExpandableBox>
// // // // // // // // // // //         </div>
// // // // // // // // // // //         <div className="mt-6">
// // // // // // // // // // //           <h2 className="text-xl font-semibold mb-4">
// // // // // // // // // // //             Analyze how your data attributes affect predictions
// // // // // // // // // // //           </h2>
// // // // // // // // // // //           <ExpandableBox
// // // // // // // // // // //             title="Attribute Columns & Features Importance"
// // // // // // // // // // //             healthyCheck
// // // // // // // // // // //           >
// // // // // // // // // // //             <FeatureImportanceProps /> {/* Embed the FeatureImportance component */}
// // // // // // // // // // //           </ExpandableBox>
// // // // // // // // // // //           <ExpandableBox title="Columns & Features Values Effect" healthyCheck />
// // // // // // // // // // //         </div>
// // // // // // // // // // //         <div className="mt-6">
// // // // // // // // // // //           <h2 className="text-xl font-semibold mb-4">
// // // // // // // // // // //             Evaluate the quality of the training data
// // // // // // // // // // //           </h2>
// // // // // // // // // // //           <ExpandableBox title="Core set statistics" healthyCheck />
// // // // // // // // // // //           <ExpandableBox title="Core set over time" healthyCheck />
// // // // // // // // // // //           <ExpandableBox
// // // // // // // // // // //             title="Attribute Columns & Features Importance"
// // // // // // // // // // //             healthyCheck
// // // // // // // // // // //           >
// // // // // // // // // // //             <FeatureImportanceProps /> {/* Embed the FeatureImportance component */}
// // // // // // // // // // //           </ExpandableBox>
// // // // // // // // // // //         </div>
// // // // // // // // // // //       </div>
// // // // // // // // // // //     </div>
// // // // // // // // // // //   );
// // // // // // // // // // // };

// // // // // // // // // // // export default Dashboard;



// // // // // // // // // // // Dynamic code, do not remove it



// // // // // // // // // // // // Dashboard.tsx

// // // // // // // // // // // import React, { useEffect, useState } from "react";
// // // // // // // // // // // import PerformanceConsistency from "./PerformanceConsistency";
// // // // // // // // // // // import FeatureImportanceProps from "./FeatureImportanceProps";
// // // // // // // // // // // import ModelEvaluation from "./ModelEvaluation";
// // // // // // // // // // // import { useLocation } from "react-router-dom";

// // // // // // // // // // // interface Metrics {
// // // // // // // // // // //   rmse: number;
// // // // // // // // // // //   r2_score: number;
// // // // // // // // // // //   mae: number;
// // // // // // // // // // // }

// // // // // // // // // // // interface ModelMetrics {
// // // // // // // // // // //   training: Metrics;
// // // // // // // // // // //   testing: Metrics;
// // // // // // // // // // //   assessment: string;
// // // // // // // // // // // }

// // // // // // // // // // // interface MetricsData {
// // // // // // // // // // //   model_metrics: ModelMetrics;
// // // // // // // // // // //   attribute_columns: string[];
// // // // // // // // // // //   feature_importance: Record<string, number>;
// // // // // // // // // // //   core_statistics: Record<string, any>;
// // // // // // // // // // //   attribute_statistics: Record<string, any>;
// // // // // // // // // // //   predictions: {
// // // // // // // // // // //     actual: number[];
// // // // // // // // // // //     predicted: number[];
// // // // // // // // // // //   };
// // // // // // // // // // //   user_id: string;
// // // // // // // // // // //   chat_id: string;
// // // // // // // // // // // }

// // // // // // // // // // // const ExpandableBox: React.FC<{ title: string; children?: React.ReactNode; healthyCheck?: boolean; suggestion?: string }> = ({
// // // // // // // // // // //   title,
// // // // // // // // // // //   children,
// // // // // // // // // // //   healthyCheck,
// // // // // // // // // // //   suggestion,
// // // // // // // // // // // }) => {
// // // // // // // // // // //   const [isOpen, setIsOpen] = useState(false);

// // // // // // // // // // //   return (
// // // // // // // // // // //     <div className="border rounded-lg mb-4 p-4 shadow-sm bg-white">
// // // // // // // // // // //       <div
// // // // // // // // // // //         className="flex justify-between items-center cursor-pointer"
// // // // // // // // // // //         onClick={() => setIsOpen(!isOpen)}
// // // // // // // // // // //       >
// // // // // // // // // // //         <h3 className="text-lg font-semibold">{title}</h3>
// // // // // // // // // // //         <div className="flex items-center space-x-2">
// // // // // // // // // // //           {healthyCheck && (
// // // // // // // // // // //             <span className="text-green-600 font-medium">Healthy check</span>
// // // // // // // // // // //           )}
// // // // // // // // // // //           {suggestion && (
// // // // // // // // // // //             <span className="text-yellow-500 font-medium">{suggestion}</span>
// // // // // // // // // // //           )}
// // // // // // // // // // //           <button
// // // // // // // // // // //             className="text-blue-500"
// // // // // // // // // // //             aria-label={isOpen ? "Collapse" : "Expand"}
// // // // // // // // // // //           >
// // // // // // // // // // //             {isOpen ? "-" : "+"}
// // // // // // // // // // //           </button>
// // // // // // // // // // //         </div>
// // // // // // // // // // //       </div>
// // // // // // // // // // //       {isOpen && <div className="mt-4">{children}</div>}
// // // // // // // // // // //     </div>
// // // // // // // // // // //   );
// // // // // // // // // // // };

// // // // // // // // // // // const Dashboard: React.FC = () => {
// // // // // // // // // // //   const location = useLocation();
// // // // // // // // // // //   const userId = location.state?.user_id;
// // // // // // // // // // //   const chatId = location.state?.chat_id;

// // // // // // // // // // //   const [data, setData] = useState<MetricsData | null>(null);
// // // // // // // // // // //   const [loading, setLoading] = useState(true);
// // // // // // // // // // //   const [error, setError] = useState<string | null>(null);

// // // // // // // // // // //   useEffect(() => {
// // // // // // // // // // //     if (!userId || !chatId) {
// // // // // // // // // // //       setError("Missing user_id or chat_id");
// // // // // // // // // // //       setLoading(false);
// // // // // // // // // // //       return;
// // // // // // // // // // //     }

// // // // // // // // // // //     const fetchData = async () => {
// // // // // // // // // // //       try {
// // // // // // // // // // //         const url = `http://127.0.0.1:8000/model/modelget/?user_id=${userId}&chat_id=${chatId}`;
      
// // // // // // // // // // //         const response = await fetch(url);
// // // // // // // // // // //         if (!response.ok) {
// // // // // // // // // // //           throw new Error(`Failed to fetch model results: ${response.statusText}`);
// // // // // // // // // // //         }
// // // // // // // // // // //         const result = await response.json();
// // // // // // // // // // //         setData(result);
// // // // // // // // // // //       } catch (err) {
// // // // // // // // // // //         setError(err instanceof Error ? err.message : "Unknown error");
// // // // // // // // // // //       } finally {
// // // // // // // // // // //         setLoading(false);
// // // // // // // // // // //       }
// // // // // // // // // // //     };

// // // // // // // // // // //     fetchData();
// // // // // // // // // // //   }, [userId, chatId]);

// // // // // // // // // // //   if (loading) {
// // // // // // // // // // //     return <div className="text-center mt-6">Loading Dashboard data...</div>;
// // // // // // // // // // //   }

// // // // // // // // // // //   if (error) {
// // // // // // // // // // //     return <div className="text-center text-red-500 mt-6">{error}</div>;
// // // // // // // // // // //   }

// // // // // // // // // // //   if (!data) {
// // // // // // // // // // //     return <div className="text-center mt-6">No data available</div>;
// // // // // // // // // // //   }

// // // // // // // // // // //   return (
// // // // // // // // // // //     <div className="p-8 bg-gray-100 min-h-screen flex justify-center">
// // // // // // // // // // //       <div className="max-w-4xl w-full">
// // // // // // // // // // //         <h1 className="text-2xl font-bold mb-6">
// // // // // // // // // // //           Explore Your Model (User: {data.user_id}, Chat: {data.chat_id})
// // // // // // // // // // //         </h1>
// // // // // // // // // // //         <div>
// // // // // // // // // // //           <h2 className="text-xl font-semibold mb-4">Dive deeper into your model's performance</h2>
// // // // // // // // // // //           <ExpandableBox title="Metrics Analysis">
// // // // // // // // // // //             {/* Pass data as props */}
// // // // // // // // // // //             <ModelEvaluation modelData={data} />
// // // // // // // // // // //           </ExpandableBox>
// // // // // // // // // // //           <ExpandableBox title="Performance Consistency (overfit)" suggestion="1 Suggestion">
// // // // // // // // // // //             <PerformanceConsistency modelData={data} />
// // // // // // // // // // //           </ExpandableBox>
// // // // // // // // // // //         </div>
// // // // // // // // // // //         <div className="mt-6">
// // // // // // // // // // //           <h2 className="text-xl font-semibold mb-4">
// // // // // // // // // // //             Analyze how your data attributes affect predictions
// // // // // // // // // // //           </h2>
// // // // // // // // // // //           <ExpandableBox title="Attribute Columns & Features Importance" healthyCheck>
// // // // // // // // // // //             <FeatureImportanceProps modelData={data} />
// // // // // // // // // // //           </ExpandableBox>
// // // // // // // // // // //           <ExpandableBox title="Columns & Features Values Effect" healthyCheck />
// // // // // // // // // // //         </div>
// // // // // // // // // // //         <div className="mt-6">
// // // // // // // // // // //           <h2 className="text-xl font-semibold mb-4">
// // // // // // // // // // //             Evaluate the quality of the training data
// // // // // // // // // // //           </h2>
// // // // // // // // // // //           <ExpandableBox title="Core set statistics" healthyCheck />
// // // // // // // // // // //           <ExpandableBox title="Core set over time" healthyCheck />
// // // // // // // // // // //           <ExpandableBox title="Attribute Columns & Features Importance" healthyCheck>
// // // // // // // // // // //             <FeatureImportanceProps modelData={data} />
// // // // // // // // // // //           </ExpandableBox>
// // // // // // // // // // //         </div>
// // // // // // // // // // //       </div>
// // // // // // // // // // //     </div>
// // // // // // // // // // //   );
// // // // // // // // // // // };

// // // // // // // // // // // export default Dashboard;




// // // // // // // // // // import React, { useEffect, useState } from "react";
// // // // // // // // // // import PerformanceConsistency from "./PerformanceConsistency";
// // // // // // // // // // import FeatureImportanceProps from "./FeatureImportanceProps";
// // // // // // // // // // import ModelEvaluation from "./ModelEvaluation";
// // // // // // // // // // // import { useLocation } from "react-router-dom";

// // // // // // // // // // interface Metrics {
// // // // // // // // // //   rmse: number;
// // // // // // // // // //   r2_score: number;
// // // // // // // // // //   mae: number;
// // // // // // // // // // }

// // // // // // // // // // interface ModelMetrics {
// // // // // // // // // //   training: Metrics;
// // // // // // // // // //   testing: Metrics;
// // // // // // // // // //   assessment: string;
// // // // // // // // // // }

// // // // // // // // // // interface MetricsData {
// // // // // // // // // //   model_metrics: ModelMetrics;
// // // // // // // // // //   attribute_columns: string[];
// // // // // // // // // //   feature_importance: Record<string, number>;
// // // // // // // // // //   core_statistics: Record<string, any>;
// // // // // // // // // //   attribute_statistics: Record<string, any>;
// // // // // // // // // //   predictions: {
// // // // // // // // // //     actual: number[];
// // // // // // // // // //     predicted: number[];
// // // // // // // // // //   };
// // // // // // // // // //   user_id: string;
// // // // // // // // // //   chat_id: string;
// // // // // // // // // // }

// // // // // // // // // // const ExpandableBox: React.FC<{
// // // // // // // // // //   title: string;
// // // // // // // // // //   children?: React.ReactNode;
// // // // // // // // // //   healthyCheck?: boolean;
// // // // // // // // // //   suggestion?: string;
// // // // // // // // // // }> = ({ title, children, healthyCheck, suggestion }) => {
// // // // // // // // // //   const [isOpen, setIsOpen] = useState(false);

// // // // // // // // // //   return (
// // // // // // // // // //     <div className="border rounded-lg mb-4 p-4 shadow-sm bg-white">
// // // // // // // // // //       <div
// // // // // // // // // //         className="flex justify-between items-center cursor-pointer"
// // // // // // // // // //         onClick={() => setIsOpen(!isOpen)}
// // // // // // // // // //       >
// // // // // // // // // //         <h3 className="text-lg font-semibold">{title}</h3>
// // // // // // // // // //         <div className="flex items-center space-x-2">
// // // // // // // // // //           {healthyCheck && (
// // // // // // // // // //             <span className="text-green-600 font-medium">Healthy check</span>
// // // // // // // // // //           )}
// // // // // // // // // //           {suggestion && (
// // // // // // // // // //             <span className="text-yellow-500 font-medium">{suggestion}</span>
// // // // // // // // // //           )}
// // // // // // // // // //           <button
// // // // // // // // // //             className="text-blue-500"
// // // // // // // // // //             aria-label={isOpen ? "Collapse" : "Expand"}
// // // // // // // // // //           >
// // // // // // // // // //             {isOpen ? "-" : "+"}
// // // // // // // // // //           </button>
// // // // // // // // // //         </div>
// // // // // // // // // //       </div>
// // // // // // // // // //       {isOpen && <div className="mt-4">{children}</div>}
// // // // // // // // // //     </div>
// // // // // // // // // //   );
// // // // // // // // // // };

// // // // // // // // // // const Dashboard: React.FC = () => {
// // // // // // // // // //   // Commented out the dynamic code
// // // // // // // // // //   // const location = useLocation();
// // // // // // // // // //   // const userId = location.state?.user_id;
// // // // // // // // // //   // const chatId = location.state?.chat_id;

// // // // // // // // // //   // Hardcoded values for testing
// // // // // // // // // //   const userId = "12";
// // // // // // // // // //   const chatId = "5";

// // // // // // // // // //   const [data, setData] = useState<MetricsData | null>(null);
// // // // // // // // // //   const [loading, setLoading] = useState(true);
// // // // // // // // // //   const [error, setError] = useState<string | null>(null);

// // // // // // // // // //   useEffect(() => {
// // // // // // // // // //     if (!userId || !chatId) {
// // // // // // // // // //       setError("Missing user_id or chat_id");
// // // // // // // // // //       setLoading(false);
// // // // // // // // // //       return;
// // // // // // // // // //     }

// // // // // // // // // //     const fetchData = async () => {
// // // // // // // // // //       try {
// // // // // // // // // //         const url = `http://127.0.0.1:8000/model/modelget/?user_id=${userId}&chat_id=${chatId}`;

// // // // // // // // // //         const response = await fetch(url);
// // // // // // // // // //         if (!response.ok) {
// // // // // // // // // //           throw new Error(`Failed to fetch model results: ${response.statusText}`);
// // // // // // // // // //         }
// // // // // // // // // //         const result = await response.json();
// // // // // // // // // //         setData(result);
// // // // // // // // // //       } catch (err) {
// // // // // // // // // //         setError(err instanceof Error ? err.message : "Unknown error");
// // // // // // // // // //       } finally {
// // // // // // // // // //         setLoading(false);
// // // // // // // // // //       }
// // // // // // // // // //     };

// // // // // // // // // //     fetchData();
// // // // // // // // // //   }, [userId, chatId]);

// // // // // // // // // //   if (loading) {
// // // // // // // // // //     return <div className="text-center mt-6">Loading Dashboard data...</div>;
// // // // // // // // // //   }

// // // // // // // // // //   if (error) {
// // // // // // // // // //     return <div className="text-center text-red-500 mt-6">{error}</div>;
// // // // // // // // // //   }

// // // // // // // // // //   if (!data) {
// // // // // // // // // //     return <div className="text-center mt-6">No data available</div>;
// // // // // // // // // //   }

// // // // // // // // // //   return (
// // // // // // // // // //     <div className="p-8 bg-gray-100 min-h-screen flex justify-center">
// // // // // // // // // //       <div className="max-w-4xl w-full">
// // // // // // // // // //         <h1 className="text-2xl font-bold mb-6">
// // // // // // // // // //           Explore Your Model (User: {data.user_id}, Chat: {data.chat_id})
// // // // // // // // // //         </h1>
// // // // // // // // // //         <div>
// // // // // // // // // //           <h2 className="text-xl font-semibold mb-4">
// // // // // // // // // //             Dive deeper into your model's performance
// // // // // // // // // //           </h2>
// // // // // // // // // //           <ExpandableBox title="Metrics Analysis">
// // // // // // // // // //             <ModelEvaluation modelData={data} />
// // // // // // // // // //           </ExpandableBox>
// // // // // // // // // //           <ExpandableBox
// // // // // // // // // //             title="Performance Consistency (overfit)"
// // // // // // // // // //             suggestion="1 Suggestion"
// // // // // // // // // //           >
// // // // // // // // // //             <PerformanceConsistency modelData={data} />
// // // // // // // // // //           </ExpandableBox>
// // // // // // // // // //         </div>
// // // // // // // // // //         <div className="mt-6">
// // // // // // // // // //           <h2 className="text-xl font-semibold mb-4">
// // // // // // // // // //             Analyze how your data attributes affect predictions
// // // // // // // // // //           </h2>
// // // // // // // // // //           <ExpandableBox
// // // // // // // // // //             title="Attribute Columns & Features Importance"
// // // // // // // // // //             healthyCheck
// // // // // // // // // //           >
// // // // // // // // // //             <FeatureImportanceProps modelData={data} />
// // // // // // // // // //           </ExpandableBox>
// // // // // // // // // //           <ExpandableBox title="Columns & Features Values Effect" healthyCheck />
// // // // // // // // // //         </div>
// // // // // // // // // //         <div className="mt-6">
// // // // // // // // // //           <h2 className="text-l font-semibold mb-4">
// // // // // // // // // //             Evaluate the quality of the training data
// // // // // // // // // //           </h2>
// // // // // // // // // //           <ExpandableBox title="Core set statistics" healthyCheck />
// // // // // // // // // //           <ExpandableBox title="Core set over time" healthyCheck />
// // // // // // // // // //           <ExpandableBox
// // // // // // // // // //             title="Attribute Columns & Features Importance"
// // // // // // // // // //             healthyCheck
// // // // // // // // // //           >
// // // // // // // // // //             <FeatureImportanceProps modelData={data} />
// // // // // // // // // //           </ExpandableBox>
// // // // // // // // // //         </div>
// // // // // // // // // //       </div>
// // // // // // // // // //     </div>
// // // // // // // // // //   );
// // // // // // // // // // };

// // // // // // // // // // export default Dashboard;





// // // // // // // // // import React, { useEffect, useState } from "react";
// // // // // // // // // import { motion, AnimatePresence } from "framer-motion";
// // // // // // // // // import PerformanceConsistency from "./PerformanceConsistency";
// // // // // // // // // import FeatureImportanceProps from "./FeatureImportanceProps";
// // // // // // // // // import ModelEvaluation from "./ModelEvaluation";

// // // // // // // // // interface Metrics {
// // // // // // // // //   rmse: number;
// // // // // // // // //   r2_score: number;
// // // // // // // // //   mae: number;
// // // // // // // // // }

// // // // // // // // // interface ModelMetrics {
// // // // // // // // //   training: Metrics;
// // // // // // // // //   testing: Metrics;
// // // // // // // // //   assessment: string;
// // // // // // // // // }

// // // // // // // // // interface MetricsData {
// // // // // // // // //   model_metrics: ModelMetrics;
// // // // // // // // //   attribute_columns: string[];
// // // // // // // // //   feature_importance: Record<string, number>;
// // // // // // // // //   core_statistics: Record<string, any>;
// // // // // // // // //   attribute_statistics: Record<string, any>;
// // // // // // // // //   predictions: {
// // // // // // // // //     actual: number[];
// // // // // // // // //     predicted: number[];
// // // // // // // // //   };
// // // // // // // // //   user_id: string;
// // // // // // // // //   chat_id: string;
// // // // // // // // // }

// // // // // // // // // const ExpandableBox: React.FC<{
// // // // // // // // //   title: string;
// // // // // // // // //   children?: React.ReactNode;
// // // // // // // // //   healthyCheck?: boolean;
// // // // // // // // //   suggestion?: string;
// // // // // // // // // }> = ({ title, children, healthyCheck, suggestion }) => {
// // // // // // // // //   const [isOpen, setIsOpen] = useState(false);

// // // // // // // // //   return (
// // // // // // // // //     <motion.div
// // // // // // // // //       className="border rounded-lg mb-4 p-4 shadow-sm bg-white"
// // // // // // // // //       initial={{ opacity: 0, y: 20 }}
// // // // // // // // //       animate={{ opacity: 1, y: 0 }}
// // // // // // // // //       transition={{ duration: 0.3 }}
// // // // // // // // //     >
// // // // // // // // //       <div
// // // // // // // // //         className="flex justify-between items-center cursor-pointer"
// // // // // // // // //         onClick={() => setIsOpen(!isOpen)}
// // // // // // // // //       >
// // // // // // // // //         <h3 className="text-base font-semibold text-gray-700">{title}</h3>
// // // // // // // // //         <div className="flex items-center space-x-2">
// // // // // // // // //           {healthyCheck && (
// // // // // // // // //             <span className="text-green-500 font-medium text-sm">Healthy check</span>
// // // // // // // // //           )}
// // // // // // // // //           {suggestion && (
// // // // // // // // //             <span className="text-yellow-500 font-medium text-sm">{suggestion}</span>
// // // // // // // // //           )}
// // // // // // // // //           <button
// // // // // // // // //             className="text-blue-500 focus:outline-none text-sm"
// // // // // // // // //             aria-label={isOpen ? "Collapse" : "Expand"}
// // // // // // // // //           >
// // // // // // // // //             <motion.span
// // // // // // // // //               animate={{ rotate: isOpen ? 180 : 0 }}
// // // // // // // // //               transition={{ duration: 0.3 }}
// // // // // // // // //             >
// // // // // // // // //               {isOpen ? "-" : "+"}
// // // // // // // // //             </motion.span>
// // // // // // // // //           </button>
// // // // // // // // //         </div>
// // // // // // // // //       </div>
// // // // // // // // //       <AnimatePresence>
// // // // // // // // //         {isOpen && (
// // // // // // // // //           <motion.div
// // // // // // // // //             className="mt-4"
// // // // // // // // //             initial={{ opacity: 0, height: 0 }}
// // // // // // // // //             animate={{ opacity: 1, height: "auto" }}
// // // // // // // // //             exit={{ opacity: 0, height: 0 }}
// // // // // // // // //             transition={{ duration: 0.3 }}
// // // // // // // // //           >
// // // // // // // // //             {children}
// // // // // // // // //           </motion.div>
// // // // // // // // //         )}
// // // // // // // // //       </AnimatePresence>
// // // // // // // // //     </motion.div>
// // // // // // // // //   );
// // // // // // // // // };

// // // // // // // // // const Dashboard: React.FC = () => {
// // // // // // // // //   // Hardcoded values for testing
// // // // // // // // //   const userId = "12";
// // // // // // // // //   const chatId = "5";

// // // // // // // // //   const [data, setData] = useState<MetricsData | null>(null);
// // // // // // // // //   const [loading, setLoading] = useState(true);
// // // // // // // // //   const [error, setError] = useState<string | null>(null);

// // // // // // // // //   useEffect(() => {
// // // // // // // // //     if (!userId || !chatId) {
// // // // // // // // //       setError("Missing user_id or chat_id");
// // // // // // // // //       setLoading(false);
// // // // // // // // //       return;
// // // // // // // // //     }

// // // // // // // // //     const fetchData = async () => {
// // // // // // // // //       try {
// // // // // // // // //         const url = `http://127.0.0.1:8000/model/modelget/?user_id=${userId}&chat_id=${chatId}`;

// // // // // // // // //         const response = await fetch(url);
// // // // // // // // //         if (!response.ok) {
// // // // // // // // //           throw new Error(`Failed to fetch model results: ${response.statusText}`);
// // // // // // // // //         }
// // // // // // // // //         const result = await response.json();
// // // // // // // // //         setData(result);
// // // // // // // // //       } catch (err) {
// // // // // // // // //         setError(err instanceof Error ? err.message : "Unknown error");
// // // // // // // // //       } finally {
// // // // // // // // //         setLoading(false);
// // // // // // // // //       }
// // // // // // // // //     };

// // // // // // // // //     fetchData();
// // // // // // // // //   }, [userId, chatId]);

// // // // // // // // //   if (loading) {
// // // // // // // // //     return (
// // // // // // // // //       <div className="flex items-center justify-center min-h-screen bg-gray-100">
// // // // // // // // //         <div className="text-center">
// // // // // // // // //           <motion.div
// // // // // // // // //             className="bg-white p-8 rounded-lg shadow-md"
// // // // // // // // //             initial={{ opacity: 0, scale: 0.8 }}
// // // // // // // // //             animate={{ opacity: 1, scale: 1 }}
// // // // // // // // //             transition={{ duration: 0.5 }}
// // // // // // // // //           >
// // // // // // // // //             <div className="text-gray-500 text-sm mb-2">Loading Dashboard data...</div>
// // // // // // // // //             <div className="h-2 w-32 bg-gray-200 rounded-full animate-pulse" />
// // // // // // // // //           </motion.div>
// // // // // // // // //         </div>
// // // // // // // // //       </div>
// // // // // // // // //     );
// // // // // // // // //   }

// // // // // // // // //   if (error) {
// // // // // // // // //     return (
// // // // // // // // //       <div className="flex items-center justify-center min-h-screen bg-gray-100">
// // // // // // // // //         <motion.div
// // // // // // // // //           className="bg-white p-8 rounded-lg shadow-md text-center"
// // // // // // // // //           initial={{ opacity: 0, scale: 0.8 }}
// // // // // // // // //           animate={{ opacity: 1, scale: 1 }}
// // // // // // // // //           transition={{ duration: 0.5 }}
// // // // // // // // //         >
// // // // // // // // //           <div className="text-red-500 font-medium mb-2 text-sm">Error</div>
// // // // // // // // //           <div className="text-gray-500 text-sm">{error}</div>
// // // // // // // // //         </motion.div>
// // // // // // // // //       </div>
// // // // // // // // //     );
// // // // // // // // //   }

// // // // // // // // //   if (!data) {
// // // // // // // // //     return (
// // // // // // // // //       <div className="flex items-center justify-center min-h-screen bg-gray-100">
// // // // // // // // //         <motion.div
// // // // // // // // //           className="bg-white p-8 rounded-lg shadow-md text-center"
// // // // // // // // //           initial={{ opacity: 0, scale: 0.8 }}
// // // // // // // // //           animate={{ opacity: 1, scale: 1 }}
// // // // // // // // //           transition={{ duration: 0.5 }}
// // // // // // // // //         >
// // // // // // // // //           <div className="text-gray-500 text-sm">No data available</div>
// // // // // // // // //         </motion.div>
// // // // // // // // //       </div>
// // // // // // // // //     );
// // // // // // // // //   }

// // // // // // // // //   return (
// // // // // // // // //     <div className="p-8 bg-gray-100 min-h-screen flex justify-center">
// // // // // // // // //       <motion.div
// // // // // // // // //         className="max-w-4xl w-full"
// // // // // // // // //         initial={{ opacity: 0, y: 20 }}
// // // // // // // // //         animate={{ opacity: 1, y: 0 }}
// // // // // // // // //         transition={{ duration: 0.5 }}
// // // // // // // // //       >
// // // // // // // // //         <h1 className="text-xl font-bold mb-6 text-gray-800">
// // // // // // // // //           Explore Your Model (User: {data.user_id}, Chat: {data.chat_id})
// // // // // // // // //         </h1>
// // // // // // // // //         <div>
// // // // // // // // //           <h2 className="text-lg font-semibold mb-4 text-gray-700">
// // // // // // // // //             Dive deeper into your model's performance
// // // // // // // // //           </h2>
// // // // // // // // //           <ExpandableBox title="Metrics Analysis">
// // // // // // // // //             <motion.div
// // // // // // // // //               initial={{ opacity: 0, y: 20 }}
// // // // // // // // //               animate={{ opacity: 1, y: 0 }}
// // // // // // // // //               transition={{ duration: 0.3 }}
// // // // // // // // //             >
// // // // // // // // //               <ModelEvaluation modelData={data} />
// // // // // // // // //             </motion.div>
// // // // // // // // //           </ExpandableBox>
// // // // // // // // //           <ExpandableBox
// // // // // // // // //             title="Performance Consistency (overfit)"
// // // // // // // // //             suggestion="1 Suggestion"
// // // // // // // // //           >
// // // // // // // // //             <PerformanceConsistency modelData={data} />
// // // // // // // // //           </ExpandableBox>
// // // // // // // // //         </div>
// // // // // // // // //         <div className="mt-6">
// // // // // // // // //           <h2 className="text-lg font-semibold mb-4 text-gray-700">
// // // // // // // // //             Analyze how your data attributes affect predictions
// // // // // // // // //           </h2>
// // // // // // // // //           <ExpandableBox
// // // // // // // // //             title="Attribute Columns & Features Importance"
// // // // // // // // //             healthyCheck
// // // // // // // // //           >
// // // // // // // // //             <FeatureImportanceProps modelData={data} />
// // // // // // // // //           </ExpandableBox>
// // // // // // // // //           <ExpandableBox title="Columns & Features Values Effect" healthyCheck />
// // // // // // // // //         </div>
// // // // // // // // //         <div className="mt-6">
// // // // // // // // //           <h2 className="text-lg font-semibold mb-4 text-gray-700">
// // // // // // // // //             Evaluate the quality of the training data
// // // // // // // // //           </h2>
// // // // // // // // //           <ExpandableBox title="Core set statistics" healthyCheck />
// // // // // // // // //           <ExpandableBox title="Core set over time" healthyCheck />
// // // // // // // // //           <ExpandableBox
// // // // // // // // //             title="Attribute Columns & Features Importance"
// // // // // // // // //             healthyCheck
// // // // // // // // //           >
// // // // // // // // //             <FeatureImportanceProps modelData={data} />
// // // // // // // // //           </ExpandableBox>
// // // // // // // // //         </div>
// // // // // // // // //       </motion.div>
// // // // // // // // //     </div>
// // // // // // // // //   );
// // // // // // // // // };

// // // // // // // // // export default Dashboard;





// // // // // // // // import React, { useEffect, useState } from "react";
// // // // // // // // import { motion, AnimatePresence } from "framer-motion";
// // // // // // // // import PerformanceConsistency from "./PerformanceConsistency";
// // // // // // // // import FeatureImportanceProps from "./FeatureImportanceProps";
// // // // // // // // import ModelEvaluation from "./ModelEvaluation";

// // // // // // // // interface Metrics {
// // // // // // // //   rmse: number;
// // // // // // // //   r2_score: number;
// // // // // // // //   mae: number;
// // // // // // // // }

// // // // // // // // interface ModelMetrics {
// // // // // // // //   training: Metrics;
// // // // // // // //   testing: Metrics;
// // // // // // // //   assessment: string;
// // // // // // // // }

// // // // // // // // interface MetricsData {
// // // // // // // //   model_metrics: ModelMetrics;
// // // // // // // //   attribute_columns: string[];
// // // // // // // //   feature_importance: Record<string, number>;
// // // // // // // //   core_statistics: Record<string, any>;
// // // // // // // //   attribute_statistics: Record<string, any>;
// // // // // // // //   predictions: {
// // // // // // // //     actual: number[];
// // // // // // // //     predicted: number[];
// // // // // // // //   };
// // // // // // // //   user_id: string;
// // // // // // // //   chat_id: string;
// // // // // // // // }

// // // // // // // // const ExpandableBox: React.FC<{
// // // // // // // //   title: string;
// // // // // // // //   children?: React.ReactNode;
// // // // // // // //   suggestion?: string;
// // // // // // // // }> = ({ title, children, suggestion }) => {
// // // // // // // //   const [isOpen, setIsOpen] = useState(false);

// // // // // // // //   return (
// // // // // // // //     <motion.div
// // // // // // // //       className="border rounded-lg mb-4 p-4 shadow-sm bg-white"
// // // // // // // //       initial={{ opacity: 0, y: 20 }}
// // // // // // // //       animate={{ opacity: 1, y: 0 }}
// // // // // // // //       transition={{ duration: 0.3 }}
// // // // // // // //     >
// // // // // // // //       <div
// // // // // // // //         className="flex justify-between items-center cursor-pointer"
// // // // // // // //         onClick={() => setIsOpen(!isOpen)}
// // // // // // // //       >
// // // // // // // //         <h3 className="text-base font-semibold text-gray-700">{title}</h3>
// // // // // // // //         <div className="flex items-center space-x-2">
// // // // // // // //           {suggestion && (
// // // // // // // //             <span className="text-yellow-500 font-medium text-sm">{suggestion}</span>
// // // // // // // //           )}
// // // // // // // //           <motion.button
// // // // // // // //             className="text-blue-500 focus:outline-none text-sm"
// // // // // // // //             aria-label={isOpen ? "Collapse" : "Expand"}
// // // // // // // //             animate={{ rotate: isOpen ? 180 : 0 }}
// // // // // // // //             transition={{ duration: 0.3 }}
// // // // // // // //           >
// // // // // // // //             {isOpen ? "-" : "+"}
// // // // // // // //           </motion.button>
// // // // // // // //         </div>
// // // // // // // //       </div>
// // // // // // // //       <AnimatePresence>
// // // // // // // //         {isOpen && (
// // // // // // // //           <motion.div
// // // // // // // //             className="mt-4"
// // // // // // // //             initial={{ opacity: 0, height: 0 }}
// // // // // // // //             animate={{ opacity: 1, height: "auto" }}
// // // // // // // //             exit={{ opacity: 0, height: 0 }}
// // // // // // // //             transition={{ duration: 0.3 }}
// // // // // // // //           >
// // // // // // // //             {children}
// // // // // // // //           </motion.div>
// // // // // // // //         )}
// // // // // // // //       </AnimatePresence>
// // // // // // // //     </motion.div>
// // // // // // // //   );
// // // // // // // // };

// // // // // // // // const Dashboard: React.FC = () => {
// // // // // // // //   const userId = "12"; // Hardcoded for testing
// // // // // // // //   const chatId = "5";

// // // // // // // //   const [data, setData] = useState<MetricsData | null>(null);
// // // // // // // //   const [loading, setLoading] = useState(true);
// // // // // // // //   const [error, setError] = useState<string | null>(null);

// // // // // // // //   useEffect(() => {
// // // // // // // //     const fetchData = async () => {
// // // // // // // //       try {
// // // // // // // //         const url = `http://127.0.0.1:8000/model/modelget/?user_id=${userId}&chat_id=${chatId}`;

// // // // // // // //         const response = await fetch(url);
// // // // // // // //         if (!response.ok) {
// // // // // // // //           throw new Error(`Failed to fetch model results: ${response.statusText}`);
// // // // // // // //         }
// // // // // // // //         const result = await response.json();
// // // // // // // //         setData(result);
// // // // // // // //       } catch (err) {
// // // // // // // //         setError(err instanceof Error ? err.message : "Unknown error occurred");
// // // // // // // //       } finally {
// // // // // // // //         setLoading(false);
// // // // // // // //       }
// // // // // // // //     };

// // // // // // // //     fetchData();
// // // // // // // //   }, [userId, chatId]);

// // // // // // // //   if (loading) {
// // // // // // // //     return (
// // // // // // // //       <div className="flex items-center justify-center min-h-screen bg-gray-100">
// // // // // // // //         <motion.div
// // // // // // // //           className="text-center bg-white p-6 rounded-lg shadow-md"
// // // // // // // //           initial={{ opacity: 0, scale: 0.8 }}
// // // // // // // //           animate={{ opacity: 1, scale: 1 }}
// // // // // // // //           transition={{ duration: 0.5 }}
// // // // // // // //         >
// // // // // // // //           <div className="text-gray-500">Loading Dashboard data...</div>
// // // // // // // //         </motion.div>
// // // // // // // //       </div>
// // // // // // // //     );
// // // // // // // //   }

// // // // // // // //   if (error) {
// // // // // // // //     return (
// // // // // // // //       <div className="flex items-center justify-center min-h-screen bg-gray-100">
// // // // // // // //         <motion.div
// // // // // // // //           className="text-center bg-white p-6 rounded-lg shadow-md"
// // // // // // // //           initial={{ opacity: 0, scale: 0.8 }}
// // // // // // // //           animate={{ opacity: 1, scale: 1 }}
// // // // // // // //           transition={{ duration: 0.5 }}
// // // // // // // //         >
// // // // // // // //           <div className="text-red-500 font-semibold mb-2">Error</div>
// // // // // // // //           <div className="text-gray-500">{error}</div>
// // // // // // // //         </motion.div>
// // // // // // // //       </div>
// // // // // // // //     );
// // // // // // // //   }

// // // // // // // //   if (!data) {
// // // // // // // //     return (
// // // // // // // //       <div className="flex items-center justify-center min-h-screen bg-gray-100">
// // // // // // // //         <motion.div
// // // // // // // //           className="text-center bg-white p-6 rounded-lg shadow-md"
// // // // // // // //           initial={{ opacity: 0, scale: 0.8 }}
// // // // // // // //           animate={{ opacity: 1, scale: 1 }}
// // // // // // // //           transition={{ duration: 0.5 }}
// // // // // // // //         >
// // // // // // // //           <div className="text-gray-500">No data available</div>
// // // // // // // //         </motion.div>
// // // // // // // //       </div>
// // // // // // // //     );
// // // // // // // //   }

// // // // // // // //   return (
// // // // // // // //     <div className="p-8 bg-gray-50 min-h-screen flex justify-center">
// // // // // // // //       <motion.div
// // // // // // // //         className="max-w-4xl w-full"
// // // // // // // //         initial={{ opacity: 0, y: 20 }}
// // // // // // // //         animate={{ opacity: 1, y: 0 }}
// // // // // // // //         transition={{ duration: 0.5 }}
// // // // // // // //       >
// // // // // // // //         <h1 className="text-2xl font-bold mb-6 text-gray-800">
// // // // // // // //           {`Model Dashboard (User: ${data.user_id}, Chat: ${data.chat_id})`}
// // // // // // // //         </h1>
// // // // // // // //         <ExpandableBox title="Metrics Analysis">
// // // // // // // //           <ModelEvaluation modelData={data} />
// // // // // // // //         </ExpandableBox>
// // // // // // // //         {/* <ExpandableBox title="Performance Consistency">
// // // // // // // //           <PerformanceConsistency
// // // // // // // //             modelMetrics={data.model_metrics}
// // // // // // // //             headings={{
// // // // // // // //               main: "Performance Consistency",
// // // // // // // //               description: "This section displays training and testing R² scores.",
// // // // // // // //             }}
// // // // // // // //             labels={{
// // // // // // // //               training: "Training R² Score",
// // // // // // // //               testing: "Testing R² Score",
// // // // // // // //             }}
// // // // // // // //             warnings={{
// // // // // // // //               condition:
// // // // // // // //                 data.model_metrics.training.r2_score -
// // // // // // // //                   data.model_metrics.testing.r2_score >
// // // // // // // //                 0.1,
// // // // // // // //               message: "Significant difference detected between training and testing scores.",
// // // // // // // //             }}
// // // // // // // //           />
// // // // // // // //         </ExpandableBox> */}
// // // // // // // //         <ExpandableBox title="Performance Consistency">
// // // // // // // //   <PerformanceConsistency
// // // // // // // //     modelMetrics={data.model_metrics}
// // // // // // // //     headings={{
// // // // // // // //       main: "Model Performance Consistency",
// // // // // // // //       description:
// // // // // // // //         "Compare your model's training and testing R² scores to evaluate its generalization.",
// // // // // // // //     }}
// // // // // // // //     labels={{
// // // // // // // //       training: "Training Set R² Score",
// // // // // // // //       testing: "Testing Set R² Score",
// // // // // // // //     }}
// // // // // // // //     warnings={{
// // // // // // // //       condition: !!data.model_metrics.assessment, // Dynamic condition based on assessment
// // // // // // // //       message: data.model_metrics.assessment || "No assessment provided.",
// // // // // // // //     }}
// // // // // // // //   />
// // // // // // // // </ExpandableBox>




// // // // // // // //         <ExpandableBox title="Feature Importance">
// // // // // // // //           <FeatureImportanceProps modelData={data} />
// // // // // // // //         </ExpandableBox>
// // // // // // // //       </motion.div>
// // // // // // // //     </div>
// // // // // // // //   );
// // // // // // // // };

// // // // // // // // export default Dashboard;




// // // // // // // import React, { useEffect, useState } from "react";
// // // // // // // import { motion, AnimatePresence } from "framer-motion";
// // // // // // // import { useLocation } from "react-router-dom";
// // // // // // // import PerformanceConsistency from "./PerformanceConsistency";
// // // // // // // import FeatureImportanceProps from "./FeatureImportanceProps";
// // // // // // // import ModelEvaluation from "./ModelEvaluation";

// // // // // // // // Interface definitions
// // // // // // // interface Metrics {
// // // // // // //   rmse: number;
// // // // // // //   r2_score: number;
// // // // // // //   mae: number;
// // // // // // // }

// // // // // // // interface ModelMetrics {
// // // // // // //   training: Metrics;
// // // // // // //   testing: Metrics;
// // // // // // //   assessment: string;
// // // // // // // }

// // // // // // // interface MetricsData {
// // // // // // //   model_metrics: ModelMetrics;
// // // // // // //   attribute_columns: string[];
// // // // // // //   feature_importance: Record<string, number>;
// // // // // // //   core_statistics: Record<string, any>;
// // // // // // //   attribute_statistics: Record<string, any>;
// // // // // // //   predictions: {
// // // // // // //     actual: number[];
// // // // // // //     predicted: number[];
// // // // // // //   };
// // // // // // //   user_id: string;
// // // // // // //   chat_id: string;
// // // // // // // }

// // // // // // // // ExpandableBox Component
// // // // // // // const ExpandableBox: React.FC<{
// // // // // // //   title: string;
// // // // // // //   children?: React.ReactNode;
// // // // // // //   suggestion?: string;
// // // // // // // }> = ({ title, children, suggestion }) => {
// // // // // // //   const [isOpen, setIsOpen] = useState(false);

// // // // // // //   return (
// // // // // // //     <motion.div
// // // // // // //       className="border rounded-lg mb-4 p-4 shadow-sm bg-white"
// // // // // // //       initial={{ opacity: 0, y: 20 }}
// // // // // // //       animate={{ opacity: 1, y: 0 }}
// // // // // // //       transition={{ duration: 0.3 }}
// // // // // // //     >
// // // // // // //       <div
// // // // // // //         className="flex justify-between items-center cursor-pointer"
// // // // // // //         onClick={() => setIsOpen(!isOpen)}
// // // // // // //       >
// // // // // // //         <h3 className="text-base font-semibold text-gray-700">{title}</h3>
// // // // // // //         <div className="flex items-center space-x-2">
// // // // // // //           {suggestion && (
// // // // // // //             <span className="text-yellow-500 font-medium text-sm">{suggestion}</span>
// // // // // // //           )}
// // // // // // //           <motion.button
// // // // // // //             className="text-blue-500 focus:outline-none text-sm"
// // // // // // //             aria-label={isOpen ? "Collapse" : "Expand"}
// // // // // // //             animate={{ rotate: isOpen ? 180 : 0 }}
// // // // // // //             transition={{ duration: 0.3 }}
// // // // // // //           >
// // // // // // //             {isOpen ? "-" : "+"}
// // // // // // //           </motion.button>
// // // // // // //         </div>
// // // // // // //       </div>
// // // // // // //       <AnimatePresence>
// // // // // // //         {isOpen && (
// // // // // // //           <motion.div
// // // // // // //             className="mt-4"
// // // // // // //             initial={{ opacity: 0, height: 0 }}
// // // // // // //             animate={{ opacity: 1, height: "auto" }}
// // // // // // //             exit={{ opacity: 0, height: 0 }}
// // // // // // //             transition={{ duration: 0.3 }}
// // // // // // //           >
// // // // // // //             {children}
// // // // // // //           </motion.div>
// // // // // // //         )}
// // // // // // //       </AnimatePresence>
// // // // // // //     </motion.div>
// // // // // // //   );
// // // // // // // };

// // // // // // // // Main Dashboard Component
// // // // // // // const Dashboard: React.FC = () => {
// // // // // // //   const location = useLocation();
// // // // // // //   const userId = location.state?.user_id || "default_user";
// // // // // // //   const chatId = location.state?.chat_id || "default_chat";

// // // // // // //   const [data, setData] = useState<MetricsData | null>(null);
// // // // // // //   const [loading, setLoading] = useState(true);
// // // // // // //   const [error, setError] = useState<string | null>(null);

// // // // // // //   useEffect(() => {
// // // // // // //     const fetchData = async () => {
// // // // // // //       try {
// // // // // // //         const url = `http://127.0.0.1:8000/model/modelget/?user_id=${userId}&chat_id=${chatId}`;
// // // // // // //         const response = await fetch(url);

// // // // // // //         if (!response.ok) {
// // // // // // //           throw new Error(`Failed to fetch model results: ${response.statusText}`);
// // // // // // //         }

// // // // // // //         const result = await response.json();
// // // // // // //         setData(result);
// // // // // // //       } catch (err) {
// // // // // // //         setError(err instanceof Error ? err.message : "Unknown error occurred");
// // // // // // //       } finally {
// // // // // // //         setLoading(false);
// // // // // // //       }
// // // // // // //     };

// // // // // // //     fetchData();
// // // // // // //   }, [userId, chatId]);

// // // // // // //   if (loading) {
// // // // // // //     return (
// // // // // // //       <div className="flex items-center justify-center min-h-screen bg-gray-100">
// // // // // // //         <motion.div
// // // // // // //           className="text-center bg-white p-6 rounded-lg shadow-md"
// // // // // // //           initial={{ opacity: 0, scale: 0.8 }}
// // // // // // //           animate={{ opacity: 1, scale: 1 }}
// // // // // // //           transition={{ duration: 0.5 }}
// // // // // // //         >
// // // // // // //           <div className="text-gray-500">Loading Dashboard data...</div>
// // // // // // //         </motion.div>
// // // // // // //       </div>
// // // // // // //     );
// // // // // // //   }

// // // // // // //   if (error) {
// // // // // // //     return (
// // // // // // //       <div className="flex items-center justify-center min-h-screen bg-gray-100">
// // // // // // //         <motion.div
// // // // // // //           className="text-center bg-white p-6 rounded-lg shadow-md"
// // // // // // //           initial={{ opacity: 0, scale: 0.8 }}
// // // // // // //           animate={{ opacity: 1, scale: 1 }}
// // // // // // //           transition={{ duration: 0.5 }}
// // // // // // //         >
// // // // // // //           <div className="text-red-500 font-semibold mb-2">Error</div>
// // // // // // //           <div className="text-gray-500">{error}</div>
// // // // // // //         </motion.div>
// // // // // // //       </div>
// // // // // // //     );
// // // // // // //   }

// // // // // // //   if (!data) {
// // // // // // //     return (
// // // // // // //       <div className="flex items-center justify-center min-h-screen bg-gray-100">
// // // // // // //         <motion.div
// // // // // // //           className="text-center bg-white p-6 rounded-lg shadow-md"
// // // // // // //           initial={{ opacity: 0, scale: 0.8 }}
// // // // // // //           animate={{ opacity: 1, scale: 1 }}
// // // // // // //           transition={{ duration: 0.5 }}
// // // // // // //         >
// // // // // // //           <div className="text-gray-500">No data available</div>
// // // // // // //         </motion.div>
// // // // // // //       </div>
// // // // // // //     );
// // // // // // //   }

// // // // // // //   return (
// // // // // // //     <div className="p-8 bg-gray-50 min-h-screen flex justify-center">
// // // // // // //       <motion.div
// // // // // // //         className="max-w-4xl w-full"
// // // // // // //         initial={{ opacity: 0, y: 20 }}
// // // // // // //         animate={{ opacity: 1, y: 0 }}
// // // // // // //         transition={{ duration: 0.5 }}
// // // // // // //       >
// // // // // // //         <h1 className="text-2xl font-bold mb-6 text-gray-800">
// // // // // // //           {`Model Dashboard (User: ${data.user_id}, Chat: ${data.chat_id})`}
// // // // // // //         </h1>
// // // // // // //         <ExpandableBox title="Metrics Analysis">
// // // // // // //           <ModelEvaluation modelData={data} />
// // // // // // //         </ExpandableBox>

// // // // // // //         <ExpandableBox title="Performance Consistency">
// // // // // // //           <PerformanceConsistency
// // // // // // //             modelMetrics={data.model_metrics}
// // // // // // //             headings={{
// // // // // // //               main: "Model Performance Consistency",
// // // // // // //               description: "Compare your model's training and testing R² scores.",
// // // // // // //             }}
// // // // // // //             labels={{
// // // // // // //               training: "Training R² Score",
// // // // // // //               testing: "Testing R² Score",
// // // // // // //             }}
// // // // // // //             warnings={{
// // // // // // //               condition: !!data.model_metrics.assessment,
// // // // // // //               message: data.model_metrics.assessment || "No assessment provided.",
// // // // // // //             }}
// // // // // // //           />
// // // // // // //         </ExpandableBox>

// // // // // // //         <ExpandableBox title="Feature Importance">
// // // // // // //           <FeatureImportanceProps modelData={data} />
// // // // // // //         </ExpandableBox>
// // // // // // //       </motion.div>
// // // // // // //     </div>
// // // // // // //   );
// // // // // // // };

// // // // // // // export default Dashboard;





// // // // // // Dashboard.tsx
// // // // // import React, { useEffect, useState } from "react";
// // // // // import { motion, AnimatePresence } from "framer-motion";
// // // // // import PerformanceConsistency from "./PerformanceConsistency";
// // // // // import FeatureImportanceProps from "./FeatureImportanceProps";
// // // // // import ModelEvaluation from "./ModelEvaluation";

// // // // // interface Metrics {
// // // // //   rmse: number;
// // // // //   r2_score: number;
// // // // //   mae: number;
// // // // // }

// // // // // interface ModelMetrics {
// // // // //   training: Metrics;
// // // // //   testing: Metrics;
// // // // //   assessment: string;
// // // // // }

// // // // // interface MetricsData {
// // // // //   model_metrics: ModelMetrics;
// // // // //   feature_importance: Record<string, number>;
// // // // //   predictions: {
// // // // //     actual: number[];
// // // // //     predicted: number[];
// // // // //   };
// // // // //   user_id: string;
// // // // //   chat_id: string;
// // // // // }

// // // // // interface DashboardProps {
// // // // //   user_id: string;
// // // // //   chat_id: string;
// // // // // }

// // // // // const ExpandableBox: React.FC<{ title: string; children?: React.ReactNode }> = ({
// // // // //   title,
// // // // //   children,
// // // // // }) => {
// // // // //   const [isOpen, setIsOpen] = useState(false);

// // // // //   return (
// // // // //     <motion.div className="border rounded-lg mb-4 p-4 shadow-sm bg-white">
// // // // //       <div
// // // // //         className="flex justify-between items-center cursor-pointer"
// // // // //         onClick={() => setIsOpen(!isOpen)}
// // // // //       >
// // // // //         <h3 className="text-base font-semibold text-gray-700">{title}</h3>
// // // // //         <motion.button
// // // // //           className="text-blue-500 focus:outline-none"
// // // // //           animate={{ rotate: isOpen ? 180 : 0 }}
// // // // //         >
// // // // //           {isOpen ? "-" : "+"}
// // // // //         </motion.button>
// // // // //       </div>
// // // // //       <AnimatePresence>
// // // // //         {isOpen && (
// // // // //           <motion.div className="mt-4">{children}</motion.div>
// // // // //         )}
// // // // //       </AnimatePresence>
// // // // //     </motion.div>
// // // // //   );
// // // // // };

// // // // // const Dashboard: React.FC<DashboardProps> = ({ user_id, chat_id }) => {
// // // // //   console.log('Dashboard received user_id:', user_id, 'and chat_id:', chat_id);
// // // // //   const [data, setData] = useState<MetricsData | null>(null);
// // // // //   const [loading, setLoading] = useState(true);
// // // // //   const [error, setError] = useState<string | null>(null);

// // // // //   useEffect(() => {
// // // // //     const fetchData = async () => {
// // // // //       try {
// // // // //         const url = `http://127.0.0.1:8000/model/modelget/?user_id=${user_id}&chat_id=${chat_id}`;
// // // // //         const response = await fetch(url);
// // // // //         if (!response.ok) throw new Error("Failed to fetch dashboard data");
// // // // //         const result = await response.json();
// // // // //         setData(result);
// // // // //       } catch (err) {
// // // // //         setError(err instanceof Error ? err.message : "Unknown error occurred");
// // // // //       } finally {
// // // // //         setLoading(false);
// // // // //       }
// // // // //     };
// // // // //     fetchData();
// // // // //   }, [user_id, chat_id]);

// // // // //   if (loading) return <div>Loading Dashboard...</div>;
// // // // //   if (error) return <div>Error: {error}</div>;
// // // // //   if (!data) return <div>No data available</div>;

// // // // //   return (
// // // // //     <div className="p-4">
// // // // //       <h2 className="text-xl font-bold mb-4">Model Dashboard</h2>
// // // // //       <ExpandableBox title="Metrics Analysis">
// // // // //         <ModelEvaluation modelData={data} />
// // // // //       </ExpandableBox>
// // // // //       <ExpandableBox title="Performance Consistency">
// // // // //         <PerformanceConsistency modelMetrics={data.model_metrics} headings={{
// // // // //           main: "Model Performance Consistency",
// // // // //                         description: "Compare your model's training and testing R² scores.",
// // // // //         }} labels={{
// // // // //           training: "Training R² Score",
// // // // //                         testing: "Testing R² Score",
// // // // //         }} warnings={{
// // // // //           condition: !!data.model_metrics.assessment,
// // // // //                         message: data.model_metrics.assessment || "No assessment provided.",
// // // // //         }} />
// // // // //       </ExpandableBox>
// // // // //       <ExpandableBox title="Feature Importance">
// // // // //         <FeatureImportanceProps modelData={data} />
// // // // //       </ExpandableBox>
// // // // //     </div>
// // // // //   );
// // // // // };

// // // // // export default Dashboard;




// // // // // // // src/components/Dashboard/Dashboard.tsx

// // // // // // import React, { useEffect, useState } from 'react';
// // // // // // import { FiLoader } from 'react-icons/fi';
// // // // // // import Navbar from '../NotebookUI/Navbar/Navbar';

// // // // // // interface DashboardProps {
// // // // // //   user_id: string;
// // // // // //   chat_id: string;
// // // // // // }

// // // // // // interface Metrics {
// // // // // //   rmse: number;
// // // // // //   r2_score: number;
// // // // // //   mae: number;
// // // // // // }

// // // // // // interface ModelMetrics {
// // // // // //   training: Metrics;
// // // // // //   testing: Metrics;
// // // // // //   assessment: string;
// // // // // // }

// // // // // // interface MetricsData {
// // // // // //   model_metrics: ModelMetrics;
// // // // // //   feature_importance: Record<string, number>;
// // // // // //   predictions: {
// // // // // //     actual: number[];
// // // // // //     predicted: number[];
// // // // // //   };
// // // // // //   user_id: string;
// // // // // //   chat_id: string;
// // // // // // }

// // // // // // const Dashboard: React.FC<DashboardProps> = ({ user_id, chat_id }) => {
// // // // // //   const [data, setData] = useState<MetricsData | null>(null);
// // // // // //   const [loading, setLoading] = useState<boolean>(true);
// // // // // //   const [error, setError] = useState<string | null>(null);

// // // // // //   useEffect(() => {
// // // // // //     const fetchMetrics = async () => {
// // // // // //       try {
// // // // // //         const response = await fetch(`http://127.0.0.1:8000/model/modelget/?user_id=${user_id}&chat_id=${chat_id}`);
// // // // // //         if (!response.ok) throw new Error('Failed to fetch model metrics');
// // // // // //         const result: MetricsData = await response.json();
// // // // // //         setData(result);
// // // // // //       } catch (err) {
// // // // // //         setError(err instanceof Error ? err.message : 'Unknown error occurred');
// // // // // //       } finally {
// // // // // //         setLoading(false);
// // // // // //       }
// // // // // //     };
// // // // // //     fetchMetrics();
// // // // // //   }, [user_id, chat_id]);

// // // // // //   if (loading) return <Loading />;
// // // // // //   if (error) return <ErrorMessage message={error} />;
// // // // // //   if (!data) return <div>No data available</div>;

// // // // // //   return (
// // // // // //     <div className="h-screen flex flex-col bg-gray-50">
// // // // // //       {/* <Navbar isTrained={true} /> */}

// // // // // //       <div className="flex-1 p-6 overflow-y-auto">
// // // // // //         <h2 className="text-2xl font-bold mb-6">Model Dashboard</h2>
// // // // // //         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
// // // // // //           {/* RMSE */}
// // // // // //           <MetricCard title="RMSE" value={data.model_metrics.training.rmse.toFixed(2)} />
// // // // // //           {/* R² Score */}
// // // // // //           <MetricCard title="R² Score" value={data.model_metrics.training.r2_score.toFixed(2)} />
// // // // // //           {/* MAE */}
// // // // // //           <MetricCard title="MAE" value={data.model_metrics.training.mae.toFixed(2)} />
// // // // // //           {/* Feature Importance */}
// // // // // //           <FeatureImportance feature_importance={data.feature_importance} />
// // // // // //         </div>
// // // // // //       </div>
// // // // // //     </div>
// // // // // //   );
// // // // // // };

// // // // // // // Loading Component
// // // // // // const Loading: React.FC = () => (
// // // // // //   <div className="flex justify-center items-center h-screen">
// // // // // //     <FiLoader className="animate-spin text-4xl text-teal-500" />
// // // // // //   </div>
// // // // // // );

// // // // // // // Error Message Component
// // // // // // interface ErrorMessageProps {
// // // // // //   message: string;
// // // // // // }

// // // // // // const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => (
// // // // // //   <div className="flex justify-center items-center h-screen">
// // // // // //     <p className="text-red-500 text-lg">{message}</p>
// // // // // //   </div>
// // // // // // );

// // // // // // // MetricCard Component
// // // // // // interface MetricCardProps {
// // // // // //   title: string;
// // // // // //   value: string;
// // // // // // }

// // // // // // const MetricCard: React.FC<MetricCardProps> = ({ title, value }) => (
// // // // // //   <div className="bg-white p-6 rounded-lg shadow-md">
// // // // // //     <h3 className="text-sm font-medium text-gray-500">{title}</h3>
// // // // // //     <p className="mt-2 text-2xl font-semibold text-teal-600">{value}</p>
// // // // // //   </div>
// // // // // // );

// // // // // // // FeatureImportance Component
// // // // // // interface FeatureImportanceProps {
// // // // // //   feature_importance: Record<string, number>;
// // // // // // }

// // // // // // const FeatureImportance: React.FC<FeatureImportanceProps> = ({ feature_importance }) => {
// // // // // //   const sortedFeatures = Object.entries(feature_importance).sort((a, b) => b[1] - a[1]);

// // // // // //   return (
// // // // // //     <div className="bg-white p-6 rounded-lg shadow-md">
// // // // // //       <h3 className="text-sm font-medium text-gray-500 mb-4">Feature Importance</h3>
// // // // // //       <ul>
// // // // // //         {sortedFeatures.map(([feature, importance]) => (
// // // // // //           <li key={feature} className="flex justify-between items-center py-1">
// // // // // //             <span className="text-sm text-gray-700">{feature}</span>
// // // // // //             <span className="text-sm text-gray-700">{importance.toFixed(2)}</span>
// // // // // //           </li>
// // // // // //         ))}
// // // // // //       </ul>
// // // // // //     </div>
// // // // // //   );
// // // // // // };

// // // // // // export default Dashboard;





// // // // // import React, { useEffect, useState } from "react";
// // // // // import { motion, AnimatePresence } from "framer-motion";
// // // // // import PerformanceConsistency from "./PerformanceConsistency";
// // // // // import FeatureImportanceProps from "./FeatureImportanceProps";
// // // // // import ModelEvaluation from "./ModelEvaluation";

// // // // // interface Metrics {
// // // // //   rmse: number;
// // // // //   r2_score: number;
// // // // //   mae: number;
// // // // // }

// // // // // interface ModelMetrics {
// // // // //   training: Metrics;
// // // // //   testing: Metrics;
// // // // //   assessment: string;
// // // // // }

// // // // // interface MetricsData {
// // // // //   model_metrics: ModelMetrics;
// // // // //   feature_importance: Record<string, number>;
// // // // //   predictions: {
// // // // //     actual: number[];
// // // // //     predicted: number[];
// // // // //   };
// // // // //   user_id: string;
// // // // //   chat_id: string;
// // // // // }

// // // // // interface DashboardProps {
// // // // //   user_id: string;
// // // // //   chat_id: string;
// // // // //   data?: MetricsData | null; // Optional data prop
// // // // // }

// // // // // const ExpandableBox: React.FC<{ title: string; children?: React.ReactNode }> = ({
// // // // //   title,
// // // // //   children,
// // // // // }) => {
// // // // //   const [isOpen, setIsOpen] = useState(false);

// // // // //   return (
// // // // //     <motion.div className="border rounded-lg mb-4 p-4 shadow-sm bg-white">
// // // // //       <div
// // // // //         className="flex justify-between items-center cursor-pointer"
// // // // //         onClick={() => setIsOpen(!isOpen)}
// // // // //       >
// // // // //         <h3 className="text-base font-semibold text-gray-700">{title}</h3>
// // // // //         <motion.button
// // // // //           className="text-blue-500 focus:outline-none"
// // // // //           animate={{ rotate: isOpen ? 180 : 0 }}
// // // // //         >
// // // // //           {isOpen ? "-" : "+"}
// // // // //         </motion.button>
// // // // //       </div>
// // // // //       <AnimatePresence>
// // // // //         {isOpen && <motion.div className="mt-4">{children}</motion.div>}
// // // // //       </AnimatePresence>
// // // // //     </motion.div>
// // // // //   );
// // // // // };

// // // // // const Dashboard: React.FC<DashboardProps> = ({ user_id, chat_id, data }) => {
// // // // //   console.log("Dashboard received user_id:", user_id, "and chat_id:", chat_id);
// // // // //   const [dashboardData, setDashboardData] = useState<MetricsData | null>(data || null);
// // // // //   const [loading, setLoading] = useState(!data); // Skip loading if data is provided
// // // // //   const [error, setError] = useState<string | null>(null);

// // // // //   useEffect(() => {
// // // // //     if (!data) {
// // // // //       // Fetch data only if not passed via props
// // // // //       const fetchData = async () => {
// // // // //         try {
// // // // //           console.log("Fetching data for Dashboard...");
// // // // //           const url = `http://127.0.0.1:8000/model/modelget/?user_id=${user_id}&chat_id=${chat_id}`;
// // // // //           const response = await fetch(url);
// // // // //           if (!response.ok) throw new Error("Failed to fetch dashboard data");
// // // // //           const result = await response.json();
// // // // //           setDashboardData(result);
// // // // //         } catch (err) {
// // // // //           setError(err instanceof Error ? err.message : "Unknown error occurred");
// // // // //         } finally {
// // // // //           setLoading(false);
// // // // //         }
// // // // //       };
// // // // //       fetchData();
// // // // //     }
// // // // //   }, [user_id, chat_id, data]);

// // // // //   if (loading) return <div>Loading Dashboard...</div>;
// // // // //   if (error) return <div>Error: {error}</div>;
// // // // //   if (!dashboardData) return <div>No data available</div>;

// // // // //   return (
// // // // //     <div className="p-4">
// // // // //       <h2 className="text-xl font-bold mb-4">Model Dashboard</h2>
// // // // //       <ExpandableBox title="Metrics Analysis">
// // // // //         <ModelEvaluation modelData={dashboardData} />
// // // // //       </ExpandableBox>
// // // // //       <ExpandableBox title="Performance Consistency">
// // // // //         <PerformanceConsistency
// // // // //           modelMetrics={dashboardData.model_metrics}
// // // // //           headings={{
// // // // //             main: "Model Performance Consistency",
// // // // //             description: "Compare your model's training and testing R² scores.",
// // // // //           }}
// // // // //           labels={{
// // // // //             training: "Training R² Score",
// // // // //             testing: "Testing R² Score",
// // // // //           }}
// // // // //           warnings={{
// // // // //             condition: !!dashboardData.model_metrics.assessment,
// // // // //             message:
// // // // //               dashboardData.model_metrics.assessment || "No assessment provided.",
// // // // //           }}
// // // // //         />
// // // // //       </ExpandableBox>
// // // // //       <ExpandableBox title="Feature Importance">
// // // // //         <FeatureImportanceProps modelData={dashboardData} />
// // // // //       </ExpandableBox>
// // // // //     </div>
// // // // //   );
// // // // // };

// // // // // export default Dashboard;











// // // // import React, { useEffect, useState } from "react";
// // // // import { motion, AnimatePresence } from "framer-motion";
// // // // import PerformanceConsistency from "./PerformanceConsistency";
// // // // import FeatureImportanceProps from "./FeatureImportanceProps";
// // // // import ModelEvaluation from "./ModelEvaluation";

// // // // // ~~~--- Types ---~~~
// // // // interface Metrics {
// // // //   rmse: number;
// // // //   r2_score: number;
// // // //   mae: number;
// // // // }

// // // // interface ModelMetrics {
// // // //   training: Metrics;
// // // //   testing: Metrics;
// // // //   assessment: string;
// // // // }

// // // // interface MetricsData {
// // // //   model_metrics: ModelMetrics;
// // // //   feature_importance: Record<string, number>;
// // // //   predictions: {
// // // //     actual: number[];
// // // //     predicted: number[];
// // // //   };
// // // //   user_id: string;
// // // //   chat_id: string;
// // // // }

// // // // interface DashboardProps {
// // // //   user_id: string;
// // // //   chat_id: string;
// // // //   data?: MetricsData | null; // If you already have the data
// // // // }

// // // // // ~~~--- A small step progress UI component ---~~~
// // // // const StepProgressBar: React.FC<{ status: string }> = ({ status }) => {
// // // //   // We map each status to a stepIndex, so we know how many steps are "complete"
// // // //   let stepIndex = 0;
// // // //   // Adjust this logic to match your backend statuses:
// // // //   // e.g. "step1", "step2", "step3", "success"
// // // //   switch (status) {
// // // //     case "step1":
// // // //       stepIndex = 1;
// // // //       break;
// // // //     case "step2":
// // // //       stepIndex = 2;
// // // //       break;
// // // //     case "step3":
// // // //       stepIndex = 3;
// // // //       break;
// // // //     case "success":
// // // //       stepIndex = 4;
// // // //       break;
// // // //     default:
// // // //       stepIndex = 0; // unknown or not started
// // // //   }

// // // //   // We'll have 4 steps total: Step 1, Step 2, Step 3, Finish
// // // //   // If stepIndex >= 1 => step1 done, if >= 2 => step2 done, etc.
// // // //   const steps = [
// // // //     { label: "Step 1" },
// // // //     { label: "Step 2" },
// // // //     { label: "Step 3" },
// // // //     { label: "Finish" },
// // // //   ];

// // // //   return (
// // // //     <div className="flex items-center justify-between w-full max-w-xl mx-auto my-6">
// // // //       {steps.map((step, idx) => {
// // // //         const isCompleted = stepIndex >= idx + 1; // e.g. stepIndex=2 => steps 1&2 completed
// // // //         return (
// // // //           <div key={step.label} className="flex-1 flex items-center">
// // // //             {/* Circle */}
// // // //             <div className="relative flex flex-col items-center text-center">
// // // //               <div
// // // //                 className={`h-10 w-10 rounded-full border-2 flex items-center justify-center ${
// // // //                   isCompleted
// // // //                     ? "bg-green-500 border-green-500"
// // // //                     : "bg-gray-200 border-gray-400"
// // // //                 }`}
// // // //               >
// // // //                 {isCompleted ? (
// // // //                   <svg
// // // //                     className="text-white w-5 h-5"
// // // //                     fill="none"
// // // //                     stroke="currentColor"
// // // //                     strokeWidth={2}
// // // //                     viewBox="0 0 24 24"
// // // //                   >
// // // //                     <path
// // // //                       strokeLinecap="round"
// // // //                       strokeLinejoin="round"
// // // //                       d="M5 13l4 4L19 7"
// // // //                     />
// // // //                   </svg>
// // // //                 ) : (
// // // //                   <span className="text-xs text-gray-700">{idx + 1}</span>
// // // //                 )}
// // // //               </div>
// // // //               {/* Label */}
// // // //               <span className="text-xs mt-2 text-gray-800">{step.label}</span>
// // // //             </div>
// // // //             {/* Connector line except for the last step */}
// // // //             {idx < steps.length - 1 && (
// // // //               <div
// // // //                 className={`flex-auto border-t-2 mx-2 ${
// // // //                   stepIndex > idx + 1 ? "border-green-500" : "border-gray-300"
// // // //                 }`}
// // // //               />
// // // //             )}
// // // //           </div>
// // // //         );
// // // //       })}
// // // //     </div>
// // // //   );
// // // // };

// // // // // ~~~--- ExpandableBox for each dashboard section ---~~~
// // // // const ExpandableBox: React.FC<{ title: string; children?: React.ReactNode }> = ({
// // // //   title,
// // // //   children,
// // // // }) => {
// // // //   const [isOpen, setIsOpen] = useState(false);

// // // //   return (
// // // //     <motion.div className="border rounded-lg mb-4 p-4 shadow-sm bg-white">
// // // //       <div
// // // //         className="flex justify-between items-center cursor-pointer"
// // // //         onClick={() => setIsOpen(!isOpen)}
// // // //       >
// // // //         <h3 className="text-base font-semibold text-gray-700">{title}</h3>
// // // //         <motion.button
// // // //           className="text-blue-500 focus:outline-none"
// // // //           animate={{ rotate: isOpen ? 180 : 0 }}
// // // //         >
// // // //           {isOpen ? "-" : "+"}
// // // //         </motion.button>
// // // //       </div>
// // // //       <AnimatePresence>
// // // //         {isOpen && <motion.div className="mt-4">{children}</motion.div>}
// // // //       </AnimatePresence>
// // // //     </motion.div>
// // // //   );
// // // // };

// // // // // ~~~--- The main Dashboard component ---~~~
// // // // const Dashboard: React.FC<DashboardProps> = ({ user_id, chat_id, data }) => {
// // // //   console.log("Dashboard received user_id:", user_id, "and chat_id:", chat_id);

// // // //   // We'll fetch the "metadata" from GET /api/get_prediction_metadata/?user_id=xxx&chat_id=yyy
// // // //   const [progressStatus, setProgressStatus] = useState<string>("success");
// // // //   const [progressLoading, setProgressLoading] = useState(false);
// // // //   const [progressError, setProgressError] = useState<string | null>(null);

// // // //   // Then for the final model results (the original Dashboard data):
// // // //   const [dashboardData, setDashboardData] = useState<MetricsData | null>(data || null);
// // // //   const [loadingData, setLoadingData] = useState(!data); // if data is provided, skip loading
// // // //   const [errorData, setErrorData] = useState<string | null>(null);

// // // //   // 1) Fetch the step-based metadata
// // // //   // useEffect(() => {
// // // //   //   const fetchMetadata = async () => {
// // // //   //     try {
// // // //   //       setProgressLoading(true);
// // // //   //       const url = `http://127.0.0.1:8000/api/get_prediction_metadata/?user_id=${user_id}&chat_id=${chat_id}`;
// // // //   //       const resp = await fetch(url);
// // // //   //       if (!resp.ok) {
// // // //   //         throw new Error(`Failed to fetch prediction metadata: ${resp.statusText}`);
// // // //   //       }
// // // //   //       const result = await resp.json();
// // // //   //       // We assume the shape is { metadata: [ { status: "step2" } ] }
// // // //   //       if (!result.metadata || !result.metadata.length) {
// // // //   //         throw new Error("No metadata found.");
// // // //   //       }
// // // //   //       const item = result.metadata[0];
// // // //   //       console.log("Fetched metadata:", item);
// // // //   //       setProgressStatus(item.status || "");
// // // //   //     } catch (err: any) {
// // // //   //       console.error("Error fetching prediction metadata:", err);
// // // //   //       setProgressError(
// // // //   //         err instanceof Error ? err.message : "Unknown error occurred."
// // // //   //       );
// // // //   //     } finally {
// // // //   //       setProgressLoading(false);
// // // //   //     }
// // // //   //   };
// // // //   //   fetchMetadata();
// // // //   // }, [user_id, chat_id]);

// // // //   // 2) If the status is success, fetch the normal dashboard data (unless it's already passed in as props)
// // // //   useEffect(() => {
// // // //     if (!data ) {
// // // //       // status = success => let's fetch the normal modelget data
// // // //       const fetchDashboardData = async () => {
// // // //         try {
// // // //           setLoadingData(true);
// // // //           const url = `http://127.0.0.1:8000/model/modelget/?user_id=${user_id}&chat_id=${chat_id}`;
// // // //           const response = await fetch(url);
// // // //           if (!response.ok) {
// // // //             throw new Error("Failed to fetch dashboard data");
// // // //           }
// // // //           const result = await response.json();
// // // //           setDashboardData(result);
// // // //         } catch (err) {
// // // //           setErrorData(
// // // //             err instanceof Error ? err.message : "Unknown error occurred"
// // // //           );
// // // //         } finally {
// // // //           setLoadingData(false);
// // // //         }
// // // //       };
// // // //       fetchDashboardData();
// // // //     }
// // // //   }, [progressStatus, data, user_id, chat_id]);

// // // //   // Render logic
// // // //   // If still loading metadata, show a "loading..."
// // // //   if (progressLoading) {
// // // //     return <div>Loading progress status...</div>;
// // // //   }
// // // //   if (progressError) {
// // // //     return <div className="text-red-500">{progressError}</div>;
// // // //   }

// // // //   // If status != 'success', show the step progress bar:
// // // //   if (progressStatus !== "success") {
// // // //     return (
// // // //       <div className="p-6">
// // // //         <h2 className="text-xl font-bold mb-2">Model Building Progress</h2>
// // // //         <p className="text-sm text-gray-600 mb-4">
// // // //           Hang tight! Your model/predictions are still processing...
// // // //         </p>
// // // //         <StepProgressBar status={progressStatus} />
// // // //       </div>
// // // //     );
// // // //   }

// // // //   // If we get here, status == "success". We proceed with the normal Dashboard UI.
// // // //   // We can still be loading or have an error for the "modelget" data
// // // //   if (loadingData) {
// // // //     return <div>Loading Dashboard data...</div>;
// // // //   }
// // // //   if (errorData) {
// // // //     return <div className="text-red-500">Error: {errorData}</div>;
// // // //   }
// // // //   if (!dashboardData) {
// // // //     return <div>No data available for the dashboard</div>;
// // // //   }

// // // //   // Finally, we show the standard Dashboard sections:
// // // //   return (
// // // //     <div className="p-4">
// // // //       <h2 className="text-xl font-bold mb-4">Model Dashboard</h2>
// // // //       <ExpandableBox title="Metrics Analysis">
// // // //         <ModelEvaluation modelData={dashboardData} />
// // // //       </ExpandableBox>
// // // //       <ExpandableBox title="Performance Consistency">
// // // //         <PerformanceConsistency
// // // //           modelMetrics={dashboardData.model_metrics}
// // // //           headings={{
// // // //             main: "Model Performance Consistency",
// // // //             description: "Compare your model's training and testing R² scores.",
// // // //           }}
// // // //           labels={{
// // // //             training: "Training R² Score",
// // // //             testing: "Testing R² Score",
// // // //           }}
// // // //           warnings={{
// // // //             condition: !!dashboardData.model_metrics.assessment,
// // // //             message:
// // // //               dashboardData.model_metrics.assessment || "No assessment provided.",
// // // //           }}
// // // //         />
// // // //       </ExpandableBox>
// // // //       <ExpandableBox title="Feature Importance">
// // // //         <FeatureImportanceProps modelData={dashboardData} />
// // // //       </ExpandableBox>
// // // //     </div>
// // // //   );
// // // // };

// // // // export default Dashboard;






// // import React, { useEffect, useState } from "react";
// // import { motion, AnimatePresence } from "framer-motion";
// // import PerformanceConsistency from "./PerformanceConsistency";
// // import FeatureImportanceProps from "./FeatureImportanceProps";
// // import ModelEvaluation from "./ModelEvaluation";
// // import ResidualAnalysis from "./ResidualAnalysis";
// // import ModelMetadata from "./ModelMetadata";
// // import DataCharacteristics from "./DataCharacteristics";
// // import CoreAttributeStatistics from "./CoreAttributeStatistics";
// // import ExtendedFeatureAnalysis from "./ExtendedFeatureAnalysis";

// // // ~~~--- Types ---~~~
// // interface Metrics {
// //   rmse: number;
// //   r2_score: number;
// //   mae: number;
// // }

// // interface ModelMetrics {
// //   training: Metrics;
// //   testing: Metrics;
// //   assessment: string;
// //   residuals?: {
// //     "25%": number;
// //     median: number;
// //     "75%": number;
// //     min: number;
// //     max: number;
// //     std: number;
// //     mean: number;
// //   };
// // }

// // export interface MetricsData {
// //   model_metrics: ModelMetrics;
// //   feature_importance: Record<string, number>; // legacy field
// //   feature_analysis: {
// //     top_features: Record<string, number>;
// //     shap_importance: Record<string, number>;
// //     attribute_columns: string[];
// //     feature_importance: Record<string, number>;
// //   };
// //   predictions: {
// //     actual: number[];
// //     predicted: number[];
// //   };
// //   model_metadata: {
// //     timestamp: string;
// //     model_type: string;
// //     num_features: number;
// //     hyperparameters: Record<string, any>;
// //     training_samples: number;
// //     testing_samples: number;
// //     evaluation_duration: number;
// //   };
// //   data_characteristics: {
// //     actual_distribution: { mean: number; std: number; min: number; max: number };
// //     predicted_distribution: { mean: number; std: number; min: number; max: number };
// //     feature_correlations: Record<string, number>;
// //   };
// //   core_statistics: Record<string, Record<string, number | string>>;
// //   attribute_statistics: Record<string, Record<string, number | string>>;
// //   user_id: string;
// //   chat_id: string;
// // }

// // interface DashboardProps {
// //   user_id: string;
// //   chat_id: string;
// //   data?: MetricsData | null; // If you already have the data
// // }

// // // ~~~--- A small step progress UI component ---~~~
// // const StepProgressBar: React.FC<{ status: string }> = ({ status }) => {
// //   // We map each status to a stepIndex, so we know how many steps are "complete"
// //   let stepIndex = 0;
// //   // Adjust this logic to match your backend statuses:
// //   // e.g. "step1", "step2", "step3", "success"
// //   switch (status) {
// //     case "step1":
// //       stepIndex = 1;
// //       break;
// //     case "step2":
// //       stepIndex = 2;
// //       break;
// //     case "step3":
// //       stepIndex = 3;
// //       break;
// //     case "success":
// //       stepIndex = 4;
// //       break;
// //     default:
// //       stepIndex = 0; // unknown or not started
// //   }

// //   // We'll have 4 steps total: Step 1, Step 2, Step 3, Finish
// //   // If stepIndex >= 1 => step1 done, if >= 2 => step2 done, etc.
// //   const steps = [
// //     { label: "Step 1" },
// //     { label: "Step 2" },
// //     { label: "Step 3" },
// //     { label: "Finish" },
// //   ];

// //   return (
// //     <div className="flex items-center justify-between w-full max-w-xl mx-auto my-6">
// //       {steps.map((step, idx) => {
// //         const isCompleted = stepIndex >= idx + 1; // e.g. stepIndex=2 => steps 1&2 completed
// //         return (
// //           <div key={step.label} className="flex-1 flex items-center">
// //             {/* Circle */}
// //             <div className="relative flex flex-col items-center text-center">
// //               <div
// //                 className={`h-10 w-10 rounded-full border-2 flex items-center justify-center ${
// //                   isCompleted
// //                     ? "bg-green-500 border-green-500"
// //                     : "bg-gray-200 border-gray-400"
// //                 }`}
// //               >
// //                 {isCompleted ? (
// //                   <svg
// //                     className="text-white w-5 h-5"
// //                     fill="none"
// //                     stroke="currentColor"
// //                     strokeWidth={2}
// //                     viewBox="0 0 24 24"
// //                   >
// //                     <path
// //                       strokeLinecap="round"
// //                       strokeLinejoin="round"
// //                       d="M5 13l4 4L19 7"
// //                     />
// //                   </svg>
// //                 ) : (
// //                   <span className="text-xs text-gray-700">{idx + 1}</span>
// //                 )}
// //               </div>
// //               {/* Label */}
// //               <span className="text-xs mt-2 text-gray-800">{step.label}</span>
// //             </div>
// //             {/* Connector line except for the last step */}
// //             {idx < steps.length - 1 && (
// //               <div
// //                 className={`flex-auto border-t-2 mx-2 ${
// //                   stepIndex > idx + 1 ? "border-green-500" : "border-gray-300"
// //                 }`}
// //               />
// //             )}
// //           </div>
// //         );
// //       })}
// //     </div>
// //   );
// // };

// // // ~~~--- ExpandableBox for each dashboard section ---~~~
// // const ExpandableBox: React.FC<{ title: string; children?: React.ReactNode }> = ({
// //   title,
// //   children,
// // }) => {
// //   const [isOpen, setIsOpen] = useState(false);

// //   return (
// //     <motion.div className="border rounded-lg mb-4 p-4 shadow-sm bg-white">
// //       <div
// //         className="flex justify-between items-center cursor-pointer"
// //         onClick={() => setIsOpen(!isOpen)}
// //       >
// //         <h3 className="text-base font-semibold text-gray-700">{title}</h3>
// //         <motion.button
// //           className="text-blue-500 focus:outline-none"
// //           animate={{ rotate: isOpen ? 180 : 0 }}
// //         >
// //           {isOpen ? "-" : "+"}
// //         </motion.button>
// //       </div>
// //       <AnimatePresence>
// //         {isOpen && <motion.div className="mt-4">{children}</motion.div>}
// //       </AnimatePresence>
// //     </motion.div>
// //   );
// // };



// // // ~~~--- The main Dashboard component ---~~~
// // const Dashboard: React.FC<DashboardProps> = ({ user_id, chat_id, data }) => {
// //   console.log("Dashboard received user_id:", user_id, "and chat_id:", chat_id);

// //   // We'll fetch the "metadata" from GET /api/get_prediction_metadata/?user_id=xxx&chat_id=yyy
// //   const [progressStatus, setProgressStatus] = useState<string>("success");
// //   const [progressLoading, setProgressLoading] = useState(false);
// //   const [progressError, setProgressError] = useState<string | null>(null);

// //   // Then for the final model results (the original Dashboard data):
// //   const [dashboardData, setDashboardData] = useState<MetricsData | null>(data || null);
// //   const [loadingData, setLoadingData] = useState(!data); // if data is provided, skip loading
// //   const [errorData, setErrorData] = useState<string | null>(null);

// //   // // 1) Fetch the step-based metadata
// //   // useEffect(() => {
// //   //   const fetchMetadata = async () => {
// //   //     try {
// //   //       setProgressLoading(true);
// //   //       const url = `http://127.0.0.1:8000/api/get_prediction_metadata/?user_id=${user_id}&chat_id=${chat_id}`;
// //   //       const resp = await fetch(url);
// //   //       if (!resp.ok) {
// //   //         throw new Error(`Failed to fetch prediction metadata: ${resp.statusText}`);
// //   //       }
// //   //       const result = await resp.json();
// //   //       // We assume the shape is { metadata: [ { status: "step2" } ] }
// //   //       if (!result.metadata || !result.metadata.length) {
// //   //         throw new Error("No metadata found.");
// //   //       }
// //   //       const item = result.metadata[0];
// //   //       console.log("Fetched metadata:", item);
// //   //       setProgressStatus(item.status || "");
// //   //     } catch (err: any) {
// //   //       console.error("Error fetching prediction metadata:", err);
// //   //       setProgressError(
// //   //         err instanceof Error ? err.message : "Unknown error occurred."
// //   //       );
// //   //     } finally {
// //   //       setProgressLoading(false);
// //   //     }
// //   //   };
// //   //   fetchMetadata();
// //   // }, [user_id, chat_id]);

// //   // 2) If the status is success, fetch the normal dashboard data (unless it's already passed in as props)
// //   useEffect(() => {
// //     if (!data) {
// //       // status = success => let's fetch the normal modelget data
// //       const fetchDashboardData = async () => {
// //         try {
// //           setLoadingData(true);
// //           const url = `http://127.0.0.1:8000/model/modelget/?user_id=${user_id}&chat_id=${chat_id}`;
// //           const response = await fetch(url);
// //           if (!response.ok) {
// //             throw new Error("Failed to fetch dashboard data");
// //           }
// //           const result = await response.json();
// //           setDashboardData(result);
// //         } catch (err) {
// //           setErrorData(err instanceof Error ? err.message : "Unknown error occurred");
// //         } finally {
// //           setLoadingData(false);
// //         }
// //       };
// //       fetchDashboardData();
// //     }
// //   }, [progressStatus, data, user_id, chat_id]);

// //   // Render logic
// //   // If still loading metadata, show a "loading..."
// //   if (progressLoading) {
// //     return <div>Loading progress status...</div>;
// //   }
// //   if (progressError) {
// //     return <div className="text-red-500">{progressError}</div>;
// //   }

// //   // If status != 'success', show the step progress bar:
// //   if (progressStatus !== "success") {
// //     return (
// //       <div className="p-6">
// //         <h2 className="text-xl font-bold mb-2">Model Building Progress</h2>
// //         <p className="text-sm text-gray-600 mb-4">
// //           Hang tight! Your model/predictions are still processing...
// //         </p>
// //         <StepProgressBar status={progressStatus} />
// //       </div>
// //     );
// //   }

// //   // If we get here, status == "success". We proceed with the normal Dashboard UI.
// //   // We can still be loading or have an error for the "modelget" data
// //   if (loadingData) {
// //     return <div>Loading Dashboard data...</div>;
// //   }
// //   if (errorData) {
// //     return <div className="text-red-500">Error: {errorData}</div>;
// //   }
// //   if (!dashboardData ) {
// //     return <div>Dashboard will only be available after training the model</div>;
// //   }

// //   // Finally, we show the standard Dashboard sections along with new ones:
// //   return (
// //     <div className="p-4">
// //       <h2 className="text-xl font-bold mb-4">Model Dashboard</h2>
// //       <ExpandableBox title="Metrics Analysis">
// //         <ModelEvaluation modelData={dashboardData} />
// //       </ExpandableBox>
// //       <ExpandableBox title="Performance Consistency">
// //         <PerformanceConsistency
// //           modelMetrics={dashboardData.model_metrics}
// //           headings={{
// //             main: "Model Performance Consistency",
// //             description: "Compare your model's training and testing R² scores.",
// //           }}
// //           labels={{ training: "Training R² Score", testing: "Testing R² Score" }}
// //           warnings={{
// //             condition: !!dashboardData.model_metrics.assessment,
// //             message: dashboardData.model_metrics.assessment || "No assessment provided.",
// //           }}
// //         />
// //       </ExpandableBox>
// //       <ExpandableBox title="Feature Importance">
// //         <FeatureImportanceProps modelData={dashboardData} />
// //       </ExpandableBox>
// //       <ExpandableBox title="Residual Analysis">
// //         <ResidualAnalysis residuals={dashboardData.model_metrics.residuals} />
// //       </ExpandableBox>
// //       <ExpandableBox title="Model Metadata">
// //         <ModelMetadata metadata={dashboardData.model_metadata} />
// //       </ExpandableBox>
// //       <ExpandableBox title="Data Characteristics">
// //         <DataCharacteristics characteristics={dashboardData.data_characteristics} />
// //       </ExpandableBox>
// //       <ExpandableBox title="Core & Attribute Statistics">
// //         <CoreAttributeStatistics
// //           coreStats={dashboardData.core_statistics}
// //           attributeStats={dashboardData.attribute_statistics}
// //         />
// //       </ExpandableBox>
// //       <ExpandableBox title="Extended Feature Analysis">
// //         <ExtendedFeatureAnalysis featureAnalysis={dashboardData.feature_analysis} />
// //       </ExpandableBox>
// //     </div>
// //   );
// // };

// // export default Dashboard;







// // // import React, { useEffect, useState } from "react";
// // // import { motion, AnimatePresence } from "framer-motion";
// // // import PerformanceConsistency from "./PerformanceConsistency";
// // // import FeatureImportanceProps from "./FeatureImportanceProps";
// // // import ModelEvaluation from "./ModelEvaluation";
// // // import ResidualAnalysis from "./ResidualAnalysis";
// // // import ModelMetadata from "./ModelMetadata";
// // // import DataCharacteristics from "./DataCharacteristics";
// // // import CoreAttributeStatistics from "./CoreAttributeStatistics";
// // // import ExtendedFeatureAnalysis from "./ExtendedFeatureAnalysis";

// // // // ~~~--- Types ---~~~
// // // interface Metrics {
// // //   rmse: number;
// // //   r2_score: number;
// // //   mae: number;
// // // }

// // // interface ModelMetrics {
// // //   training: Metrics;
// // //   testing: Metrics;
// // //   assessment: string;
// // //   residuals?: {
// // //     "25%": number;
// // //     median: number;
// // //     "75%": number;
// // //     min: number;
// // //     max: number;
// // //     std: number;
// // //     mean: number;
// // //   };
// // // }

// // // export interface MetricsData {
// // //   model_metrics: ModelMetrics;
// // //   feature_importance: Record<string, number>; // legacy field
// // //   feature_analysis: {
// // //     top_features: Record<string, number>;
// // //     shap_importance: Record<string, number>;
// // //     attribute_columns: string[];
// // //     feature_importance: Record<string, number>;
// // //   };
// // //   predictions: {
// // //     actual: number[];
// // //     predicted: number[];
// // //   };
// // //   model_metadata: {
// // //     timestamp: string;
// // //     model_type: string;
// // //     num_features: number;
// // //     hyperparameters: Record<string, any>;
// // //     training_samples: number;
// // //     testing_samples: number;
// // //     evaluation_duration: number;
// // //   };
// // //   data_characteristics: {
// // //     actual_distribution: { mean: number; std: number; min: number; max: number };
// // //     predicted_distribution: { mean: number; std: number; min: number; max: number };
// // //     feature_correlations: Record<string, number>;
// // //   };
// // //   core_statistics: Record<string, Record<string, number | string>>;
// // //   attribute_statistics: Record<string, Record<string, number | string>>;
// // //   user_id: string;
// // //   chat_id: string;
// // // }

// // // interface DashboardProps {
// // //   user_id: string;
// // //   chat_id: string;
// // //   data?: MetricsData | null; // If you already have the data
// // // }

// // // // ~~~--- A small step progress UI component ---~~~
// // // const StepProgressBar: React.FC<{ status: string }> = ({ status }) => {
// // //   // We map each status to a stepIndex, so we know how many steps are "complete"
// // //   let stepIndex = 0;
// // //   // Adjust this logic to match your backend statuses:
// // //   // e.g. "step1", "step2", "step3", "success"
// // //   switch (status) {
// // //     case "step1":
// // //       stepIndex = 1;
// // //       break;
// // //     case "step2":
// // //       stepIndex = 2;
// // //       break;
// // //     case "step3":
// // //       stepIndex = 3;
// // //       break;
// // //     case "success":
// // //       stepIndex = 4;
// // //       break;
// // //     default:
// // //       stepIndex = 0; // unknown or not started
// // //   }

// // //   // We'll have 4 steps total: Step 1, Step 2, Step 3, Finish
// // //   // If stepIndex >= 1 => step1 done, if >= 2 => step2 done, etc.
// // //   const steps = [
// // //     { label: "Step 1" },
// // //     { label: "Step 2" },
// // //     { label: "Step 3" },
// // //     { label: "Finish" },
// // //   ];

// // //   return (
// // //     <div className="flex items-center justify-between w-full max-w-xl mx-auto my-6">
// // //       {steps.map((step, idx) => {
// // //         const isCompleted = stepIndex >= idx + 1; // e.g. stepIndex=2 => steps 1&2 completed
// // //         return (
// // //           <div key={step.label} className="flex-1 flex items-center">
// // //             {/* Circle */}
// // //             <div className="relative flex flex-col items-center text-center">
// // //               <div
// // //                 className={`h-10 w-10 rounded-full border-2 flex items-center justify-center ${
// // //                   isCompleted
// // //                     ? "bg-green-500 border-green-500"
// // //                     : "bg-gray-200 border-gray-400"
// // //                 }`}
// // //               >
// // //                 {isCompleted ? (
// // //                   <svg
// // //                     className="text-white w-5 h-5"
// // //                     fill="none"
// // //                     stroke="currentColor"
// // //                     strokeWidth={2}
// // //                     viewBox="0 0 24 24"
// // //                   >
// // //                     <path
// // //                       strokeLinecap="round"
// // //                       strokeLinejoin="round"
// // //                       d="M5 13l4 4L19 7"
// // //                     />
// // //                   </svg>
// // //                 ) : (
// // //                   <span className="text-xs text-gray-700">{idx + 1}</span>
// // //                 )}
// // //               </div>
// // //               {/* Label */}
// // //               <span className="text-xs mt-2 text-gray-800">{step.label}</span>
// // //             </div>
// // //             {/* Connector line except for the last step */}
// // //             {idx < steps.length - 1 && (
// // //               <div
// // //                 className={`flex-auto border-t-2 mx-2 ${
// // //                   stepIndex > idx + 1 ? "border-green-500" : "border-gray-300"
// // //                 }`}
// // //               />
// // //             )}
// // //           </div>
// // //         );
// // //       })}
// // //     </div>
// // //   );
// // // };

// // // // ~~~--- ExpandableBox for each dashboard section ---~~~
// // // const ExpandableBox: React.FC<{ title: string; children?: React.ReactNode }> = ({
// // //   title,
// // //   children,
// // // }) => {
// // //   const [isOpen, setIsOpen] = useState(false);

// // //   return (
// // //     <motion.div className="border rounded-lg mb-4 p-4 shadow-sm bg-white">
// // //       <div
// // //         className="flex justify-between items-center cursor-pointer"
// // //         onClick={() => setIsOpen(!isOpen)}
// // //       >
// // //         <h3 className="text-base font-semibold text-gray-700">{title}</h3>
// // //         <motion.button
// // //           className="text-blue-500 focus:outline-none"
// // //           animate={{ rotate: isOpen ? 180 : 0 }}
// // //         >
// // //           {isOpen ? "-" : "+"}
// // //         </motion.button>
// // //       </div>
// // //       <AnimatePresence>
// // //         {isOpen && <motion.div className="mt-4">{children}</motion.div>}
// // //       </AnimatePresence>
// // //     </motion.div>
// // //   );
// // // };

// // // // ~~~--- The main Dashboard component ---~~~
// // // const Dashboard: React.FC<DashboardProps> = ({ user_id, chat_id, data }) => {
// // //   console.log("Dashboard received user_id:", user_id, "and chat_id:", chat_id);

// // //   // We'll fetch the "metadata" from GET /api/get_prediction_metadata/?user_id=xxx&chat_id=yyy
// // //   const [progressStatus, setProgressStatus] = useState<string>("");
// // //   const [progressLoading, setProgressLoading] = useState(true);
// // //   const [progressError, setProgressError] = useState<string | null>(null);

// // //   // Then for the final model results (the original Dashboard data):
// // //   const [dashboardData, setDashboardData] = useState<MetricsData | null>(data || null);
// // //   const [loadingData, setLoadingData] = useState(!data); // if data is provided, skip loading
// // //   const [errorData, setErrorData] = useState<string | null>(null);

// // //   // 1) Fetch the step-based metadata
// // //   // (Since the metadata API is commented out, we simulate a "step1" status)
// // //   useEffect(() => {
// // //     setProgressStatus("step1");
// // //     setProgressLoading(false);
// // //   }, [user_id, chat_id]);

// // //   // 2) If the status is success, fetch the normal dashboard data (unless it's already passed in as props)
// // //   useEffect(() => {
// // //     if (!data && progressStatus === "success") {
// // //       // status = success => let's fetch the normal modelget data
// // //       const fetchDashboardData = async () => {
// // //         try {
// // //           setLoadingData(true);
// // //           const url = `http://127.0.0.1:8000/model/modelget/?user_id=${user_id}&chat_id=${chat_id}`;
// // //           const response = await fetch(url);
// // //           if (!response.ok) {
// // //             throw new Error("Failed to fetch dashboard data");
// // //           }
// // //           const result = await response.json();
// // //           setDashboardData(result);
// // //         } catch (err) {
// // //           setErrorData(err instanceof Error ? err.message : "Unknown error occurred");
// // //         } finally {
// // //           setLoadingData(false);
// // //         }
// // //       };
// // //       fetchDashboardData();
// // //     }
// // //   }, [progressStatus, data, user_id, chat_id]);

// // //   // Render logic
// // //   // If still loading metadata, show a "loading..."
// // //   if (progressLoading) {
// // //     return <div>Loading progress status...</div>;
// // //   }
// // //   if (progressError) {
// // //     return <div className="text-red-500">{progressError}</div>;
// // //   }

// // //   // When progress is in Step 1 and there's no dashboard data, display the message with an icon in the center:
// // //   if (progressStatus === "step1" && !dashboardData) {
// // //     return (
// // //       <div className="flex flex-col items-center justify-center h-full p-4">
// // //         <svg
// // //           xmlns="http://www.w3.org/2000/svg"
// // //           className="h-16 w-16 text-gray-500 mb-4"
// // //           fill="none"
// // //           viewBox="0 0 24 24"
// // //           stroke="currentColor"
// // //         >
// // //           {/* Clock icon */}
// // //           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6l4 2" />
// // //           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4a8 8 0 100 16 8 8 0 000-16z" />
// // //         </svg>
// // //         <div className="text-center text-gray-600 font-semibold">
// // //           Dashboard will only be available after training the model
// // //         </div>
// // //       </div>
// // //     );
// // //   }

// // //   // If status != 'success', show the step progress bar:
// // //   if (progressStatus !== "success") {
// // //     return (
// // //       <div className="p-6">
// // //         <h2 className="text-xl font-bold mb-2">Model Building Progress</h2>
// // //         <p className="text-sm text-gray-600 mb-4">
// // //           Hang tight! Your model/predictions are still processing...
// // //         </p>
// // //         <StepProgressBar status={progressStatus} />
// // //       </div>
// // //     );
// // //   }

// // //   // If we get here, status == "success". We proceed with the normal Dashboard UI.
// // //   // We can still be loading or have an error for the "modelget" data
// // //   if (loadingData) {
// // //     return <div>Loading Dashboard data...</div>;
// // //   }
// // //   if (errorData) {
// // //     return <div className="text-red-500">Error: {errorData}</div>;
// // //   }
// // //   if (!dashboardData) {
// // //     return (
// // //       <div className="flex flex-col items-center justify-center h-full p-4">
// // //         <svg
// // //           xmlns="http://www.w3.org/2000/svg"
// // //           className="h-16 w-16 text-gray-500 mb-4"
// // //           fill="none"
// // //           viewBox="0 0 24 24"
// // //           stroke="currentColor"
// // //         >
// // //           {/* Clock icon */}
// // //           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6l4 2" />
// // //           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4a8 8 0 100 16 8 8 0 000-16z" />
// // //         </svg>
// // //         <div className="text-center text-gray-600 font-semibold">
// // //           Dashboard will only be available after training the model
// // //         </div>
// // //       </div>
// // //     );
// // //   }

// // //   // Finally, we show the standard Dashboard sections along with new ones:
// // //   return (
// // //     <div className="p-4">
// // //       <h2 className="text-xl font-bold mb-4">Model Dashboard</h2>
// // //       <ExpandableBox title="Metrics Analysis">
// // //         <ModelEvaluation modelData={dashboardData} />
// // //       </ExpandableBox>
// // //       <ExpandableBox title="Performance Consistency">
// // //         <PerformanceConsistency
// // //           modelMetrics={dashboardData.model_metrics}
// // //           headings={{
// // //             main: "Model Performance Consistency",
// // //             description: "Compare your model's training and testing R² scores.",
// // //           }}
// // //           labels={{ training: "Training R² Score", testing: "Testing R² Score" }}
// // //           warnings={{
// // //             condition: !!dashboardData.model_metrics.assessment,
// // //             message: dashboardData.model_metrics.assessment || "No assessment provided.",
// // //           }}
// // //         />
// // //       </ExpandableBox>
// // //       <ExpandableBox title="Feature Importance">
// // //         <FeatureImportanceProps modelData={dashboardData} />
// // //       </ExpandableBox>
// // //       <ExpandableBox title="Residual Analysis">
// // //         <ResidualAnalysis residuals={dashboardData.model_metrics.residuals} />
// // //       </ExpandableBox>
// // //       <ExpandableBox title="Model Metadata">
// // //         <ModelMetadata metadata={dashboardData.model_metadata} />
// // //       </ExpandableBox>
// // //       <ExpandableBox title="Data Characteristics">
// // //         <DataCharacteristics characteristics={dashboardData.data_characteristics} />
// // //       </ExpandableBox>
// // //       <ExpandableBox title="Core & Attribute Statistics">
// // //         <CoreAttributeStatistics
// // //           coreStats={dashboardData.core_statistics}
// // //           attributeStats={dashboardData.attribute_statistics}
// // //         />
// // //       </ExpandableBox>
// // //       <ExpandableBox title="Extended Feature Analysis">
// // //         <ExtendedFeatureAnalysis featureAnalysis={dashboardData.feature_analysis} />
// // //       </ExpandableBox>
// // //     </div>
// // //   );
// // // };

// // // export default Dashboard;





// import React, { useEffect, useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import PerformanceConsistency from "./PerformanceConsistency";
// import FeatureImportanceProps from "./FeatureImportanceProps";
// import ModelEvaluation from "./ModelEvaluation";
// import ResidualAnalysis from "./ResidualAnalysis";
// import ModelMetadata from "./ModelMetadata";
// import DataCharacteristics from "./DataCharacteristics";
// import CoreAttributeStatistics from "./CoreAttributeStatistics";
// import ExtendedFeatureAnalysis from "./ExtendedFeatureAnalysis";
// import FeatureImportanceDashboard from "./FeatureImportanceProps";

// // ~~~--- Types ---~~~
// interface Metrics {
//   rmse: number;
//   r2_score: number;
//   mae: number;
// }

// interface ModelMetrics {
//   training: Metrics;
//   testing: Metrics;
//   assessment: string;
//   residuals?: {
//     "25%": number;
//     median: number;
//     "75%": number;
//     min: number;
//     max: number;
//     std: number;
//     mean: number;
//   };
// }

// export interface MetricsData {
//   model_metrics: ModelMetrics;
//   feature_importance: Record<string, number>; // legacy field
//   feature_analysis: {
//     top_features: Record<string, number>;
//     shap_importance: Record<string, number>;
//     attribute_columns: string[];
//     feature_importance: Record<string, number>;
//   };
//   predictions: {
//     actual: number[];
//     predicted: number[];
//   };
//   model_metadata: {
//     timestamp: string;
//     model_type: string;
//     num_features: number;
//     hyperparameters: Record<string, any>;
//     training_samples: number;
//     testing_samples: number;
//     evaluation_duration: number;
//   };
//   data_characteristics: {
//     actual_distribution: { mean: number; std: number; min: number; max: number };
//     predicted_distribution: { mean: number; std: number; min: number; max: number };
//     feature_correlations: Record<string, number>;
//   };
//   core_statistics: Record<string, Record<string, number | string>>;
//   attribute_statistics: Record<string, Record<string, number | string>>;
//   user_id: string;
//   chat_id: string;
// }

// interface DashboardProps {
//   user_id: string;
//   chat_id: string;
//   data?: MetricsData | null; // If you already have the data
// }

// // A small helper to format numbers with a "k" suffix if they're large
// function formatAsK(num: number): string {
//   if (Math.abs(num) >= 1000) {
//     return (num / 1000).toFixed(2) + "k";
//   } else {
//     return num.toFixed(2);
//   }
// }

// // ~~~--- A small step progress UI component ---~~~
// const StepProgressBar: React.FC<{ status: string }> = ({ status }) => {
//   let stepIndex = 0;
//   // e.g. "step1", "step2", "step3", "success"
//   switch (status) {
//     case "step1":
//       stepIndex = 1;
//       break;
//     case "step2":
//       stepIndex = 2;
//       break;
//     case "step3":
//       stepIndex = 3;
//       break;
//     case "success":
//       stepIndex = 4;
//       break;
//     default:
//       stepIndex = 0; // unknown or not started
//   }

//   const steps = [
//     { label: "Step 1" },
//     { label: "Step 2" },
//     { label: "Step 3" },
//     { label: "Finish" },
//   ];

//   return (
//     <div className="flex items-center justify-between w-full max-w-xl mx-auto my-6">
//       {steps.map((step, idx) => {
//         const isCompleted = stepIndex >= idx + 1;
//         return (
//           <div key={step.label} className="flex-1 flex items-center">
//             <div className="relative flex flex-col items-center text-center">
//               <div
//                 className={`h-10 w-10 rounded-full border-2 flex items-center justify-center ${
//                   isCompleted
//                     ? "bg-green-500 border-green-500"
//                     : "bg-gray-200 border-gray-400"
//                 }`}
//               >
//                 {isCompleted ? (
//                   <svg
//                     className="text-white w-5 h-5"
//                     fill="none"
//                     stroke="currentColor"
//                     strokeWidth={2}
//                     viewBox="0 0 24 24"
//                   >
//                     <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
//                   </svg>
//                 ) : (
//                   <span className="text-xs text-gray-700">{idx + 1}</span>
//                 )}
//               </div>
//               <span className="text-xs mt-2 text-gray-800">{step.label}</span>
//             </div>
//             {idx < steps.length - 1 && (
//               <div
//                 className={`flex-auto border-t-2 mx-2 ${
//                   stepIndex > idx + 1 ? "border-green-500" : "border-gray-300"
//                 }`}
//               />
//             )}
//           </div>
//         );
//       })}
//     </div>
//   );
// };

// // ~~~--- ExpandableBox for each dashboard section ---~~~
// const ExpandableBox: React.FC<{ title: string; children?: React.ReactNode }> = ({
//   title,
//   children,
// }) => {
//   const [isOpen, setIsOpen] = useState(false);

//   return (
//     <motion.div className="border rounded-lg mb-4 p-4 shadow-sm bg-white">
//       <div
//         className="flex justify-between items-center cursor-pointer"
//         onClick={() => setIsOpen(!isOpen)}
//       >
//         <h3 className="text-base font-semibold text-gray-700">{title}</h3>
//         <motion.button
//           className="text-blue-500 focus:outline-none"
//           animate={{ rotate: isOpen ? 180 : 0 }}
//         >
//           {isOpen ? "-" : "+"}
//         </motion.button>
//       </div>
//       <AnimatePresence>
//         {isOpen && <motion.div className="mt-4">{children}</motion.div>}
//       </AnimatePresence>
//     </motion.div>
//   );
// };

// // ~~~--- The main Dashboard component ---~~~
// const Dashboard: React.FC<DashboardProps> = ({ user_id, chat_id, data }) => {
//   console.log("Dashboard received user_id:", user_id, "and chat_id:", chat_id);

//   const [progressStatus, setProgressStatus] = useState<string>("");
//   const [progressLoading, setProgressLoading] = useState(true);
//   const [progressError, setProgressError] = useState<string | null>(null);

//   const [dashboardData, setDashboardData] = useState<MetricsData | null>(data || null);
//   const [loadingData, setLoadingData] = useState(!data);
//   const [errorData, setErrorData] = useState<string | null>(null);

//   // Track which tab is active: "evaluation" or "predictions"
//   const [activeTab, setActiveTab] = useState<"evaluation" | "predictions">("evaluation");

//   // 1) Fetch the step-based metadata
//   useEffect(() => {
//     const fetchMetadata = async () => {
//       try {
//         setProgressLoading(true);
//         const url = `http://127.0.0.1:8000/api/get_prediction_metadata/?user_id=${user_id}&chat_id=${chat_id}`;
//         const resp = await fetch(url);
//         if (!resp.ok) {
//           throw new Error(`Failed to fetch prediction metadata: ${resp.statusText}`);
//         }
//         const result = await resp.json();
//         if (!result.metadata || !result.metadata.length) {
//           throw new Error("No metadata found.");
//         }
//         const item = result.metadata[0];
//         console.log("Fetched metadata:", item);
//         setProgressStatus(item.status || "");
//       } catch (err: any) {
//         console.error("Error fetching prediction metadata:", err);
//         setProgressError(
//           err instanceof Error ? err.message : "Unknown error occurred."
//         );
//       } finally {
//         setProgressLoading(false);
//       }
//     };
//     fetchMetadata();
//   }, [user_id, chat_id]);

//   // 2) If the status is success, fetch the normal dashboard data
//   useEffect(() => {
//     if (!data && progressStatus === "success") {
//       const fetchDashboardData = async () => {
//         try {
//           setLoadingData(true);
//           const url = `http://127.0.0.1:8000/model/modelget/?user_id=${user_id}&chat_id=${chat_id}`;
//           const response = await fetch(url);
//           if (!response.ok) {
//             throw new Error("Failed to fetch dashboard data");
//           }
//           const result = await response.json();
//           setDashboardData(result);
//         } catch (err) {
//           setErrorData(err instanceof Error ? err.message : "Unknown error occurred");
//         } finally {
//           setLoadingData(false);
//         }
//       };
//       fetchDashboardData();
//     }
//   }, [progressStatus, data, user_id, chat_id]);

//   // Render logic
//   if (progressLoading) {
//     return <div>Loading progress status...</div>;
//   }
//   if (progressError) {
//     return <div className="text-red-500">{progressError}</div>;
//   }

//   if (progressStatus !== "success") {
//     return (
//       <div className="p-6">
//         <h2 className="text-xl font-bold mb-2">Model Building Progress</h2>
//         <p className="text-sm text-gray-600 mb-4">
//           Hang tight! Your model/predictions are still processing...
//         </p>
//         <StepProgressBar status={progressStatus} />
//       </div>
//     );
//   }

//   if (loadingData) {
//     return <div>Loading Dashboard data...</div>;
//   }
//   if (errorData) {
//     return <div className="text-red-500">Error: {errorData}</div>;
//   }
//   if (!dashboardData) {
//     return <div>Dashboard will only be available after training the model</div>;
//   }

//   return (
//     <div className="p-4">
//       {/* Tab bar */}
//       <div className="flex space-x-4 border-b pb-1 mb-4">
//         <button
//           className={`${
//             activeTab === "evaluation" ? "font-semibold border-b-2 border-blue-500" : ""
//           }`}
//           onClick={() => setActiveTab("evaluation")}
//         >
//           Model Evaluation
//         </button>
//         <button
//           className={`${
//             activeTab === "predictions" ? "font-semibold border-b-2 border-blue-500" : ""
//           }`}
//           onClick={() => setActiveTab("predictions")}
//         >
//           Test Set Predictions
//         </button>
//       </div>

//       {/* --- MODEL EVALUATION TAB --- */}
//       {activeTab === "evaluation" && (
//         <>
//           <h2 className="text-xl font-bold mb-4">Model Dashboard</h2>
//           <ExpandableBox title="Metrics Analysis">
//             <ModelEvaluation modelData={dashboardData} />
//           </ExpandableBox>
//           <ExpandableBox title="Performance Consistency">
//             <PerformanceConsistency
//               modelMetrics={dashboardData.model_metrics}
//               headings={{
//                 main: "Model Performance Consistency",
//                 description: "Compare your model's training and testing R² scores.",
//               }}
//               labels={{ training: "Training R² Score", testing: "Testing R² Score" }}
//               warnings={{
//                 condition: !!dashboardData.model_metrics.assessment,
//                 message: dashboardData.model_metrics.assessment || "No assessment provided.",
//               }}
//             />
//           </ExpandableBox>
//           <ExpandableBox title="Feature Importance">
//             <FeatureImportanceDashboard modelData={dashboardData} />
//           </ExpandableBox>
//           <ExpandableBox title="Residual Analysis">
//             <ResidualAnalysis residuals={dashboardData.model_metrics.residuals} />
//           </ExpandableBox>
//           <ExpandableBox title="Model Metadata">
//             <ModelMetadata metadata={dashboardData.model_metadata} />
//           </ExpandableBox>
//           <ExpandableBox title="Data Characteristics">
//             <DataCharacteristics characteristics={dashboardData.data_characteristics} />
//           </ExpandableBox>
//           <ExpandableBox title="Core & Attribute Statistics">
//             <CoreAttributeStatistics
//               coreStats={dashboardData.core_statistics}
//               attributeStats={dashboardData.attribute_statistics}
//             />
//           </ExpandableBox>
//           <ExpandableBox title="Extended Feature Analysis">
//             <ExtendedFeatureAnalysis featureAnalysis={dashboardData.feature_analysis} />
//           </ExpandableBox>
//         </>
//       )}

//       {/* --- TEST SET PREDICTIONS TAB --- */}
//       {activeTab === "predictions" && (
//         <div className="overflow-x-auto">
//           {!dashboardData.predictions?.actual?.length ||
//           !dashboardData.predictions?.predicted?.length ? (
//             <div>No predictions to show.</div>
//           ) : (
//             <>
//               {/* Summaries row with info hover icons */}
//               <div className="flex flex-wrap items-center gap-4 mb-4">
//                 {/* Entities count */}
//                 <div className="px-3 py-2 border rounded">
//                   <div className="text-sm text-gray-500 flex items-center gap-1">
//                     <span>Number of entities</span>
//                     <svg
//                       className="w-4 h-4 text-gray-400 hover:text-gray-700 cursor-help"
//                       fill="none"
//                       stroke="currentColor"
//                       strokeWidth={2}
//                       viewBox="0 0 24 24"
//                       >
//                      <title>"The test set contains 10% of the data, and it is used to evaluate the model performance on unseen data."</title>
                    
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         d="M13 16h-1v-4h1m0-4h-.01M12 6a9 
//                           9 0 100 18 9 9 0 000-18z"
//                       />
//                     </svg>
//                   </div>
//                   <div className="font-semibold">
//                     {dashboardData.predictions.actual.length}
//                   </div>
//                 </div>

//                 {/* Average target value */}
//                 <div className="px-3 py-2 border rounded">
//                   <div className="text-sm text-gray-500 flex items-center gap-1">
//                     <span>Average target value</span>
//                     <svg
//                       className="w-4 h-4 text-gray-400 hover:text-gray-700 cursor-help"
//                       fill="none"
//                       stroke="currentColor"
//                       strokeWidth={2}
//                       viewBox="0 0 24 24"
//                       >
//                         <title>The average value of entities in the test set</title>
                    
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         d="M13 16h-1v-4h1m0-4h-.01M12 6a9 
//                           9 0 100 18 9 9 0 000-18z"
//                       />
//                     </svg>
//                   </div>
//                   <div className="font-semibold">
//                     {formatAsK(
//                       dashboardData.predictions.actual.reduce((a, b) => a + b, 0) /
//                         dashboardData.predictions.actual.length
//                     )}
//                   </div>
//                 </div>
//               </div>

              

//               {/* The actual table */}
//               <table className="min-w-full text-left border-collapse table-auto">
//                 <thead>
//                   <tr className="bg-gray-100 text-sm">
//                     <th className="px-4 py-2 border">No. of Entities</th>
//                     <th className="px-4 py-2 border">Actual</th>
//                     <th className="px-4 py-2 border">Predicted</th>
//                     <th className="px-4 py-2 border">Error</th>
//                   </tr>
//                 </thead>
//                 <tbody className="text-sm">
//                   {dashboardData.predictions.actual.map((actVal, i) => {
//                     const predVal = dashboardData.predictions.predicted[i];
//                     const errorVal = predVal - actVal;
//                     const errorColor =
//                       errorVal === 0
//                         ? "text-gray-700"
//                         : errorVal < 0
//                         ? "text-red-600"
//                         : "text-green-600";

//                     return (
//                       <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}>
//                         <td className="px-4 py-2 border">{i + 1}</td>
//                         <td className="px-4 py-2 border">{actVal}</td>
//                         <td className="px-4 py-2 border">{predVal}</td>
//                         <td className={`px-4 py-2 border font-semibold ${errorColor}`}>
//                           {errorVal > 0
//                             ? `+${errorVal.toFixed(2)}`
//                             : errorVal.toFixed(2)}
//                         </td>
//                       </tr>
//                     );
//                   })}
//                 </tbody>
//               </table>
//             </>
//           )}
//         </div>
//       )}
//     </div>
//   );
// };

// export default Dashboard;





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

// ~~~--- Types ---~~~
interface Metrics {
  rmse: number;
  r2_score: number;
  mae: number;
}

interface ModelMetrics {
  training: Metrics;
  testing: Metrics;
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
  feature_analysis: {
    top_features: Record<string, number>;
    shap_importance: Record<string, number>;
    attribute_columns: string[];
    feature_importance: Record<string, number>;
  };
  predictions: {
    actual: number[];
    predicted: number[];
  };
  model_metadata: {
    timestamp: string;
    model_type: string;
    num_features: number;
    hyperparameters: Record<string, any>;
    training_samples: number;
    testing_samples: number;
    evaluation_duration: number;
  };
  data_characteristics: {
    actual_distribution: { mean: number; std: number; min: number; max: number };
    predicted_distribution: { mean: number; std: number; min: number; max: number };
    feature_correlations: Record<string, number>;
  };
  core_statistics: Record<string, Record<string, number | string>>;
  attribute_statistics: Record<string, Record<string, number | string>>;
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
    case "step1": stepIndex = 1; break;
    case "step2": stepIndex = 2; break;
    case "step3": stepIndex = 3; break;
    case "success": stepIndex = 4; break;
    default: stepIndex = 0;
  }

  const steps = [
    { label: "Step 1" },
    { label: "Step 2" },
    { label: "Step 3" },
    { label: "Finish" },
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
    <motion.div className="border rounded-lg mb-4 p-4 shadow-sm bg-white">
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
        {isOpen && <motion.div className="mt-4">{children}</motion.div>}
      </AnimatePresence>
    </motion.div>
  );
};

const EmptyState: React.FC<{ message: string }> = ({ message }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] p-4">
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
      <p className="text-gray-600 text-lg font-medium text-center max-w-md">
        {message}
      </p>
    </div>
  );
};

const Dashboard: React.FC<DashboardProps> = ({ user_id, chat_id, data }) => {
  console.log("Dashboard received user_id:", user_id, "and chat_id:", chat_id);

  const [progressStatus, setProgressStatus] = useState<string>("");
  const [progressLoading, setProgressLoading] = useState(true);
  const [progressError, setProgressError] = useState<string | null>(null);

  const [dashboardData, setDashboardData] = useState<MetricsData | null>(data || null);
  const [loadingData, setLoadingData] = useState(!data);
  const [errorData, setErrorData] = useState<string | null>(null);

  const [activeTab, setActiveTab] = useState<"evaluation" | "predictions">("evaluation");

  useEffect(() => {
    const fetchMetadata = async () => {
      try {
        setProgressLoading(true);
        const url = `http://127.0.0.1:8000/api/get_prediction_metadata/?user_id=${user_id}&chat_id=${chat_id}`;
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
    if (!data && progressStatus === "success") {
      const fetchDashboardData = async () => {
        try {
          setLoadingData(true);
          const url = `http://127.0.0.1:8000/model/modelget/?user_id=${user_id}&chat_id=${chat_id}`;
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

  if (progressStatus !== "success") {
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
    <div className="p-4">
      <div className="flex space-x-4 border-b pb-1 mb-4">
        <button
          className={`${
            activeTab === "evaluation" ? "font-semibold border-b-2 border-blue-500" : ""
          }`}
          onClick={() => setActiveTab("evaluation")}
        >
          Model Evaluation
        </button>
        <button
          className={`${
            activeTab === "predictions" ? "font-semibold border-b-2 border-blue-500" : ""
          }`}
          onClick={() => setActiveTab("predictions")}
        >
          Test Set Predictions
        </button>
      </div>

      {activeTab === "evaluation" && (
        <>
          <h2 className="text-xl font-bold mb-4">Model Dashboard</h2>
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
              labels={{ training: "Training R² Score", testing: "Testing R² Score" }}
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
            <ModelMetadata metadata={dashboardData.model_metadata} />
          </ExpandableBox>
          <ExpandableBox title="Data Characteristics">
            <DataCharacteristics characteristics={dashboardData.data_characteristics} />
          </ExpandableBox>
          <ExpandableBox title="Core & Attribute Statistics">
            <CoreAttributeStatistics
              coreStats={dashboardData.core_statistics}
              attributeStats={dashboardData.attribute_statistics}
            />
          </ExpandableBox>
          <ExpandableBox title="Extended Feature Analysis">
            <ExtendedFeatureAnalysis featureAnalysis={dashboardData.feature_analysis} />
          </ExpandableBox>
        </>
      )}

      {activeTab === "predictions" && (
        <div className="overflow-x-auto">
          {!dashboardData.predictions?.actual?.length ||
          !dashboardData.predictions?.predicted?.length ? (
            <div>No predictions to show.</div>
          ) : (
            <>
              <div className="flex flex-wrap items-center gap-4 mb-4">
                <div className="px-3 py-2 border rounded">
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
                <div className="px-3 py-2 border rounded">
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
                    <th className="px-4 py-2 border">No. of Entities</th>
                    <th className="px-4 py-2 border">Actual</th>
                    <th className="px-4 py-2 border">Predicted</th>
                    <th className="px-4 py-2 border">Error</th>
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

                    return (
                      <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                        <td className="px-4 py-2 border">{i + 1}</td>
                        <td className="px-4 py-2 border">{actVal}</td>
                        <td className="px-4 py-2 border">{predVal}</td>
                        <td className={`px-4 py-2 border font-semibold ${errorColor}`}>
                          {errorVal > 0
                            ? `+${errorVal.toFixed(2)}`
                            : errorVal.toFixed(2)}
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