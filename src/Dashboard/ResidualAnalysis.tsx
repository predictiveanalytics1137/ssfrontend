// // // ResidualAnalysis.tsx
// // import React from "react";

// // interface Residuals {
// //   "25%": number | null;
// //   median: number | null;
// //   "75%": number | null;
// //   min: number | null;
// //   max: number | null;
// //   std: number | null;
// //   mean: number | null;
// // }

// // interface ResidualAnalysisProps {
// //   residuals: Residuals | null | undefined;
// // }

// // const ResidualAnalysis: React.FC<ResidualAnalysisProps> = ({ residuals }) => {
// //   if (!residuals) {
// //     return (
// //       <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
// //         <h3 className="text-base font-semibold text-gray-700 mb-4">
// //           Residual Analysis
// //         </h3>
// //         <p className="text-sm text-gray-600">No residual data available.</p>
// //       </div>
// //     );
// //   }

// //   const formatValue = (value: number | null) =>
// //     value != null ? value.toFixed(2) : "N/A";

// //   return (
// //     <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
// //       <h3 className="text-base font-semibold text-gray-700 mb-4">
// //         Residual Analysis
// //       </h3>
// //       <table className="min-w-full text-sm text-gray-600">
// //         <tbody>
// //           <tr>
// //             <td className="px-4 py-2 font-medium">Min:</td>
// //             <td className="px-4 py-2">{formatValue(residuals.min)}</td>
// //           </tr>
// //           <tr>
// //             <td className="px-4 py-2 font-medium">25%:</td>
// //             <td className="px-4 py-2">{formatValue(residuals["25%"])}</td>
// //           </tr>
// //           <tr>
// //             <td className="px-4 py-2 font-medium">Median:</td>
// //             <td className="px-4 py-2">{formatValue(residuals.median)}</td>
// //           </tr>
// //           <tr>
// //             <td className="px-4 py-2 font-medium">75%:</td>
// //             <td className="px-4 py-2">{formatValue(residuals["75%"])}</td>
// //           </tr>
// //           <tr>
// //             <td className="px-4 py-2 font-medium">Max:</td>
// //             <td className="px-4 py-2">{formatValue(residuals.max)}</td>
// //           </tr>
// //           <tr>
// //             <td className="px-4 py-2 font-medium">Mean:</td>
// //             <td className="px-4 py-2">{formatValue(residuals.mean)}</td>
// //           </tr>
// //           <tr>
// //             <td className="px-4 py-2 font-medium">Std:</td>
// //             <td className="px-4 py-2">{formatValue(residuals.std)}</td>
// //           </tr>
// //         </tbody>
// //       </table>
// //     </div>
// //   );
// // };

// // export default ResidualAnalysis;



// import React from "react";
// import {
//   ComposedChart,
//   Bar,
//   XAxis,
//   YAxis,
//   Tooltip,
//   ReferenceLine,
//   Cell,
//   ResponsiveContainer,
//   CartesianGrid
// } from "recharts";
// import { AlertTriangle, CheckCircle, Ban } from "lucide-react";

// interface Residuals {
//   "25%": number | null;
//   median: number | null;
//   "75%": number | null;
//   min: number | null;
//   max: number | null;
//   std: number | null;
//   mean: number | null;
// }

// interface ResidualAnalysisProps {
//   residuals: Residuals | null | undefined;
// }

// const ResidualAnalysis: React.FC<ResidualAnalysisProps> = ({ residuals }) => {
//   // Error State Component
//   const ErrorState = ({ message }: { message: string }) => (
//     <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
//       <Ban className="w-12 h-12 text-red-500 mx-auto mb-4" />
//       <h3 className="text-lg font-semibold text-gray-800 mb-2">Data Issue</h3>
//       <p className="text-gray-600">{message}</p>
//     </div>
//   );

//   // Validate presence of residuals
//   if (!residuals) {
//     return <ErrorState message="No residual data available for analysis." />;
//   }

//   // Check for null values
//   const hasNullValues = Object.values(residuals).some(value => value === null);
//   if (hasNullValues) {
//     return <ErrorState message="Incomplete residual data detected." />;
//   }

//   // Check for invalid numeric values
//   const hasInvalidValues = Object.values(residuals).some(
//     value => typeof value === "number" && (isNaN(value) || !isFinite(value))
//   );
//   if (hasInvalidValues) {
//     return <ErrorState message="Invalid values detected in residual data." />;
//   }

//   try {
//     // Calculate bins for histogram
//     const binCount = 15; // Adjustable bin count
//     const range = residuals.max! - residuals.min!;
//     const binWidth = range / binCount;

//     // Create histogram data
//     const histogramData = Array.from({ length: binCount }, (_, i) => {
//       const start = residuals.min! + i * binWidth;
//       const end = start + binWidth;
//       const midpoint = (start + end) / 2;

//       return {
//         binStart: start,
//         binEnd: end,
//         midpoint,
//         value: 0, // Will be populated with actual counts
//         label: `${start.toFixed(1)} to ${end.toFixed(1)}`
//       };
//     });

//     // Model performance assessment
//     const getModelStatus = () => {
//       const absStd = Math.abs(residuals.std!);
//       const absMean = Math.abs(residuals.mean!);

//       if (absStd < 5 && absMean < 2) {
//         return {
//           status: "excellent",
//           color: "text-green-600",
//           icon: <CheckCircle className="w-5 h-5 text-green-600" />,
//           message: "Model performing well"
//         };
//       }

//       if (absStd < 10 && absMean < 5) {
//         return {
//           status: "good",
//           color: "text-blue-600",
//           icon: <CheckCircle className="w-5 h-5 text-blue-600" />,
//           message: "Model performing adequately"
//         };
//       }

//       return {
//         status: "needs-improvement",
//         color: "text-yellow-600",
//         icon: <AlertTriangle className="w-5 h-5 text-yellow-600" />,
//         message: "Model needs improvement"
//       };
//     };

//     const modelStatus = getModelStatus();

//     // Custom tooltip component
//     const CustomTooltip = ({ active, payload }: any) => {
//       if (!active || !payload || !payload.length) return null;

//       const data = payload[0].payload;
//       return (
//         <div className="bg-white p-3 rounded shadow-lg border border-gray-200">
//           <p className="font-medium text-sm">Range: {data.label}</p>
//           <p className="text-sm text-gray-600">Count: {data.value}</p>
//         </div>
//       );
//     };

//     return (
//       <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-6">
//         {/* Header with Model Status */}
//         <div className="flex items-center justify-between mb-6">
//           <div>
//             <h3 className="text-xl font-semibold text-gray-800">
//               Model Prediction Analysis
//             </h3>
//             <p className="text-sm text-gray-600 mt-1">
//               Based on {histogramData.length} data points
//             </p>
//           </div>
//           <div
//             className={`flex items-center gap-2 ${modelStatus.color} bg-opacity-10 px-3 py-2 rounded-full`}
//           >
//             {modelStatus.icon}
//             <span className="text-sm font-medium">{modelStatus.message}</span>
//           </div>
//         </div>

//         {/* Main Chart */}
//         <div className="h-80 mb-6">
//           <ResponsiveContainer width="100%" height="100%">
//             <ComposedChart
//               data={histogramData}
//               margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
//             >
//               <CartesianGrid strokeDasharray="3 3" opacity={0.4} />
//               <XAxis
//                 dataKey="midpoint"
//                 type="number"
//                 label={{ value: "Prediction Error", position: "bottom" }}
//                 // Use non-null assertion here to satisfy TS
//                 domain={[residuals.min!, residuals.max!]}
//               />
//               <YAxis
//                 label={{ value: "Frequency", angle: -90, position: "insideLeft" }}
//               />
//               <Tooltip content={<CustomTooltip />} />

//               {/* Zero reference line */}
//               <ReferenceLine
//                 x={0}
//                 stroke="#666"
//                 strokeDasharray="3 3"
//                 label={{ value: "Perfect Prediction", position: "top" }}
//               />

//               {/* Distribution bars */}
//               <Bar dataKey="value" fill="#8884d8">
//                 {histogramData.map((entry, index) => (
//                   <Cell
//                     key={`cell-${index}`}
//                     fill={entry.midpoint < 0 ? "#FF9999" : "#99FF99"}
//                   />
//                 ))}
//               </Bar>

//               {/* Mean reference line */}
//               <ReferenceLine
//                 // Non-null assertion since we've checked residuals.mean isn't null
//                 x={residuals.mean!}
//                 stroke="#FF6B6B"
//                 strokeDasharray="3 3"
//                 label={{
//                   value: `Mean: ${residuals.mean!.toFixed(2)}`,
//                   position: "top"
//                 }}
//               />
//             </ComposedChart>
//           </ResponsiveContainer>
//         </div>

//         {/* Key Metrics Grid */}
//         <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
//           <div className="p-3 bg-gray-50 rounded-lg">
//             <div className="text-gray-600">Average Error</div>
//             <div className="text-lg font-semibold text-gray-800">
//               {residuals.mean!.toFixed(2)}
//             </div>
//           </div>

//           <div className="p-3 bg-gray-50 rounded-lg">
//             <div className="text-gray-600">Error Spread</div>
//             <div className="text-lg font-semibold text-gray-800">
//               ±{residuals.std!.toFixed(2)}
//             </div>
//           </div>

//           <div className="p-3 bg-gray-50 rounded-lg">
//             <div className="text-gray-600">Typical Range</div>
//             <div className="text-lg font-semibold text-gray-800">
//               {residuals["25%"]!.toFixed(1)} to {residuals["75%"]!.toFixed(1)}
//             </div>
//           </div>

//           <div className="p-3 bg-gray-50 rounded-lg">
//             <div className="text-gray-600">Max Deviation</div>
//             <div className="text-lg font-semibold text-gray-800">
//               {Math.max(
//                 Math.abs(residuals.min!),
//                 Math.abs(residuals.max!)
//               ).toFixed(1)}
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   } catch (error) {
//     return <ErrorState message="Error processing residual data." />;
//   }
// };

// export default ResidualAnalysis;



// ResidualAnalysis.tsx
import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface Residuals {
  "25%": number | null;
  median: number | null;
  "75%": number | null;
  min: number | null;
  max: number | null;
  std: number | null;
  mean: number | null;
}

interface ResidualAnalysisProps {
  residuals: Residuals | null | undefined;
}

const ResidualAnalysis: React.FC<ResidualAnalysisProps> = ({ residuals }) => {
  if (!residuals) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
        <h3 className="text-base font-semibold text-gray-700 mb-4">
          Residual Analysis
        </h3>
        <p className="text-sm text-gray-600">No residual data available.</p>
      </div>
    );
  }

  const formatValue = (value: number | null) =>
    value != null ? value.toFixed(2) : "N/A";

  const data = {
    labels: ["Min", "25%", "Median", "75%", "Max"],
    datasets: [
      {
        label: "Residual Values",
        data: [
          residuals.min,
          residuals["25%"],
          residuals.median,
          residuals["75%"],
          residuals.max,
        ],
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Residual Analysis",
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Percentiles",
        },
      },
      y: {
        title: {
          display: true,
          text: "Values",
        },
      },
    },
  };

  const minMaxRange = residuals.max! - residuals.min!;
  const iqr = residuals["75%"]! - residuals["25%"]!;

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
      <h3 className="text-base font-semibold text-gray-700 mb-4">
        Residual Analysis
      </h3>
      <div className="mb-4">
        <Bar data={data} options={options} />
      </div>
      <table className="min-w-full text-sm text-gray-600 mb-4">
        <tbody>
          <tr>
            <td className="px-4 py-2 font-medium">Min:</td>
            <td className="px-4 py-2">{formatValue(residuals.min)}</td>
          </tr>
          <tr>
            <td className="px-4 py-2 font-medium">25%:</td>
            <td className="px-4 py-2">{formatValue(residuals["25%"])}</td>
          </tr>
          <tr>
            <td className="px-4 py-2 font-medium">Median:</td>
            <td className="px-4 py-2">{formatValue(residuals.median)}</td>
          </tr>
          <tr>
            <td className="px-4 py-2 font-medium">75%:</td>
            <td className="px-4 py-2">{formatValue(residuals["75%"])}</td>
          </tr>
          <tr>
            <td className="px-4 py-2 font-medium">Max:</td>
            <td className="px-4 py-2">{formatValue(residuals.max)}</td>
          </tr>
          <tr>
            <td className="px-4 py-2 font-medium">Mean:</td>
            <td className="px-4 py-2">{formatValue(residuals.mean)}</td>
          </tr>
          <tr>
            <td className="px-4 py-2 font-medium">Std:</td>
            <td className="px-4 py-2">{formatValue(residuals.std)}</td>
          </tr>
        </tbody>
      </table>
      <div className="text-sm text-gray-600">
        <h4 className="font-semibold mb-2">Explanation:</h4>
        <ul className="list-disc pl-4">
          <li>
            <strong>Min and Max</strong>: The smallest residual is {formatValue(residuals.min)} and the largest is {formatValue(residuals.max)}. A wide range of {minMaxRange.toFixed(2)} might indicate some predictions are significantly off.
          </li>
          <li>
            <strong>25% and 75%</strong>: The middle 50% of residuals range from {formatValue(residuals["25%"])} to {formatValue(residuals["75%"])}. An IQR of {iqr.toFixed(2)} indicates the spread of the central residuals.
          </li>
          <li>
            <strong>Median</strong>: The median residual is {formatValue(residuals.median)}. A median close to zero suggests unbiased predictions.
          </li>
          <li>
            <strong>Mean</strong>: The mean residual is {formatValue(residuals.mean)}. A mean close to zero indicates no systematic bias.
          </li>
          <li>
            <strong>Std (Standard Deviation)</strong>: The standard deviation is {formatValue(residuals.std)}. Lower values indicate a better model fit with less variability in residuals.
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ResidualAnalysis;
