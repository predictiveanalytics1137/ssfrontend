// import React, { useEffect, useState } from "react";
// import {
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   Tooltip,
//   CartesianGrid,
//   Legend,
//   ResponsiveContainer,
// } from "recharts";

// interface PredictionData {
//   actual: number[];
//   predicted: number[];
// }

// const ModelEvaluation: React.FC = () => {
//   const [data, setData] = useState<PredictionData | null>(null);
//   const [bias, setBias] = useState<number | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await fetch("http://127.0.0.1:8000/model/modelget/4");
//         if (!response.ok) {
//           throw new Error(`Error fetching data: ${response.statusText}`);
//         }
//         const result = await response.json();

//         const actual = result.predictions.actual || [];
//         const predicted = result.predictions.predicted || [];

//         if (!actual.length || !predicted.length) {
//           throw new Error("Actual or predicted data is missing from the API.");
//         }

//         // Calculate bias
//         const totalActual = actual.reduce((acc: any, val: any) => acc + val, 0);
//         const totalPredicted = predicted.reduce((acc: any, val: any) => acc + val, 0);
//         const biasValue = ((totalPredicted - totalActual) / totalActual) * 100;

//         setData({ actual, predicted });
//         setBias(biasValue);
//         setLoading(false);
//       } catch (err) {
//         setError(err instanceof Error ? err.message : "Unknown error occurred");
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   if (loading) {
//     return <div className="text-center mt-6">Loading...</div>;
//   }

//   if (error) {
//     return (
//       <div className="text-center text-red-500 mt-6">
//         Error: {error}
//       </div>
//     );
//   }

//   if (!data) {
//     return <div className="text-center mt-6">No data available</div>;
//   }

//   const chartData = data.actual.map((value, index) => ({
//     index: index + 1,
//     actual: value,
//     predicted: data.predicted[index],
//   }));

//   const totalActual = data.actual.reduce((acc, val) => acc + val, 0).toFixed(1);
//   const totalPredicted = data.predicted.reduce((acc, val) => acc + val, 0).toFixed(1);

//   return (
//     <div className="p-6 bg-gray-50 min-h-screen">
//       <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6">
//         <h2 className="text-2xl font-bold mb-4">How Good Is The Model?</h2>

//         <div className="flex justify-between items-center mb-6">
//           <div>
//             <p className="text-gray-600">
//               Total Actual: <span className="font-semibold text-gray-800">{totalActual}</span>
//             </p>
//             <p className="text-gray-600">
//               Total Predicted: <span className="font-semibold text-gray-800">{totalPredicted}</span>
//             </p>
//           </div>
//           <div className="text-center">
//             <p className="text-xl font-semibold">
//               Bias:{" "}
//               <span
//                 className={`${
//                   bias && bias < 0 ? "text-red-500" : "text-green-500"
//                 }`}
//               >
//                 {bias?.toFixed(1)}%
//               </span>
//             </p>
//             <p className="text-gray-500 text-sm">
//               (Negative bias means underprediction)
//             </p>
//           </div>
//         </div>

//         <ResponsiveContainer width="100%" height={300}>
//           <LineChart data={chartData}>
//             <CartesianGrid strokeDasharray="3 3" />
//             <XAxis dataKey="index" label={{ value: "Index", position: "insideBottom", offset: -5 }} />
//             <YAxis label={{ value: "Values", angle: -90, position: "insideLeft" }} />
//             <Tooltip />
//             <Legend />
//             <Line type="monotone" dataKey="actual" stroke="#8884d8" name="Actual Values" />
//             <Line type="monotone" dataKey="predicted" stroke="#82ca9d" name="Predicted Values" />
//           </LineChart>
//         </ResponsiveContainer>
//       </div>
//     </div>
//   );
// };

// export default ModelEvaluation;




// ModelEvaluation.tsx
import React from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, Legend, ResponsiveContainer } from "recharts";

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

interface ModelEvaluationProps {
  modelData: MetricsData;
}

const ModelEvaluation: React.FC<ModelEvaluationProps> = ({ modelData }) => {
  const { predictions } = modelData;
  const actual = predictions.actual;
  const predicted = predictions.predicted;

  if (!actual || !predicted) {
    return <div>No predictions data available</div>;
  }

  const chartData = actual.map((value: number, index: number) => ({
    index: index + 1,
    actual: value,
    predicted: predicted[index],
  }));

  const totalActual = actual.reduce((acc, val) => acc + val, 0).toFixed(1);
  const totalPredicted = predicted.reduce((acc, val) => acc + val, 0).toFixed(1);
  const biasValue = ((Number(totalPredicted) - Number(totalActual)) / Number(totalActual)) * 100;

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold mb-4">How Good Is The Model?</h2>
        <div className="flex justify-between items-center mb-6">
          <div>
            <p className="text-gray-600">
              Total Actual: <span className="font-semibold text-gray-800">{totalActual}</span>
            </p>
            <p className="text-gray-600">
              Total Predicted: <span className="font-semibold text-gray-800">{totalPredicted}</span>
            </p>
          </div>
          <div className="text-center">
            <p className="text-xl font-semibold">
              Bias:{" "}
              <span className={biasValue < 0 ? "text-red-500" : "text-green-500"}>
                {biasValue.toFixed(1)}%
              </span>
            </p>
            <p className="text-gray-500 text-sm">
              (Negative bias means underprediction)
            </p>
          </div>
        </div>

        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="index" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="actual" stroke="#8884d8" name="Actual Values" />
            <Line type="monotone" dataKey="predicted" stroke="#82ca9d" name="Predicted Values" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ModelEvaluation;
