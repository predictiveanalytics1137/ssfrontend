// // DataCharacteristics.tsx
// import React from "react";

// interface Distribution {
//   mean: number | null;
//   std: number | null;
//   min: number | null;
//   max: number | null;
// }

// interface DataCharacteristicsProps {
//   characteristics: {
//     actual_distribution: Distribution | null;
//     predicted_distribution: Distribution | null;
//     feature_correlations: Record<string, number> | null;
//   } | null;
// }

// const DataCharacteristics: React.FC<DataCharacteristicsProps> = ({ characteristics }) => {
//   if (!characteristics) {
//     return (
//       <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
//         <h3 className="text-base font-semibold text-gray-700 mb-4">
//           Data Characteristics
//         </h3>
//         <p className="text-sm text-gray-600">No data characteristics available.</p>
//       </div>
//     );
//   }

//   const formatDistribution = (dist: Distribution | null) => {
//     if (!dist) {
//       return {
//         mean: "N/A",
//         std: "N/A",
//         min: "N/A",
//         max: "N/A",
//       };
//     }
//     return {
//       mean: dist.mean != null ? dist.mean.toFixed(2) : "N/A",
//       std: dist.std != null ? dist.std.toFixed(2) : "N/A",
//       min: dist.min != null ? dist.min.toFixed(2) : "N/A",
//       max: dist.max != null ? dist.max.toFixed(2) : "N/A",
//     };
//   };

//   const actualDist = formatDistribution(characteristics.actual_distribution);
//   const predictedDist = formatDistribution(characteristics.predicted_distribution);

//   return (
//     <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
//       <h3 className="text-base font-semibold text-gray-700 mb-4">
//         Data Characteristics
//       </h3>
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//         <div className="border p-4 rounded">
//           <h4 className="text-sm font-semibold text-gray-700 mb-2">
//             Actual Distribution
//           </h4>
//           <ul className="text-sm text-gray-600">
//             <li>Mean: {actualDist.mean}</li>
//             <li>Std: {actualDist.std}</li>
//             <li>Min: {actualDist.min}</li>
//             <li>Max: {actualDist.max}</li>
//           </ul>
//         </div>
//         <div className="border p-4 rounded">
//           <h4 className="text-sm font-semibold text-gray-700 mb-2">
//             Predicted Distribution
//           </h4>
//           <ul className="text-sm text-gray-600">
//             <li>Mean: {predictedDist.mean}</li>
//             <li>Std: {predictedDist.std}</li>
//             <li>Min: {predictedDist.min}</li>
//             <li>Max: {predictedDist.max}</li>
//           </ul>
//         </div>
//       </div>
//       <div className="mt-4">
//         <h4 className="text-sm font-semibold text-gray-700 mb-2">
//           Feature Correlations
//         </h4>
//         {characteristics.feature_correlations &&
//         Object.keys(characteristics.feature_correlations).length > 0 ? (
//           <div className="overflow-x-auto">
//             <table className="min-w-full text-sm text-gray-600">
//               <thead className="bg-gray-100">
//                 <tr>
//                   <th className="px-4 py-2">Feature</th>
//                   <th className="px-4 py-2">Correlation</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {Object.entries(characteristics.feature_correlations).map(
//                   ([feature, corr], idx) => (
//                     <tr key={idx} className="border-b">
//                       <td className="px-4 py-2">{feature}</td>
//                       <td className="px-4 py-2">
//                         {corr != null ? corr.toFixed(4) : "N/A"}
//                       </td>
//                     </tr>
//                   )
//                 )}
//               </tbody>
//             </table>
//           </div>
//         ) : (
//           <p className="text-sm text-gray-600">No feature correlations available.</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default DataCharacteristics;




import React from "react";
import Plot from "react-plotly.js";

interface Distribution {
  mean: number | null;
  std: number | null;
  min: number | null;
  max: number | null;
}

interface DataCharacteristicsProps {
  characteristics: {
    actual_distribution: Distribution | null;
    predicted_distribution: Distribution | null;
    feature_correlations: Record<string, number> | null;
  } | null;
}

const DataCharacteristics: React.FC<DataCharacteristicsProps> = ({ characteristics }) => {
  if (!characteristics) {
    return (
      <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6 text-center">
        <h3 className="text-xl font-semibold text-gray-700 mb-4">📊 Data Characteristics</h3>
        <p className="text-gray-600">No data available.</p>
      </div>
    );
  }

  // Format distribution values
  const formatDistribution = (dist: Distribution | null) => ({
    mean: dist?.mean?.toFixed(2) || "N/A",
    std: dist?.std?.toFixed(2) || "N/A",
    min: dist?.min?.toFixed(2) || "N/A",
    max: dist?.max?.toFixed(2) || "N/A",
  });

  const actualDist = formatDistribution(characteristics.actual_distribution);
  const predictedDist = formatDistribution(characteristics.predicted_distribution);

  return (
    <div className="container mx-auto p-6">
      <h3 className="text-2xl font-bold text-gray-700 mb-6 text-center">📊 Data Characteristics</h3>

      {/* Distribution Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* Actual Distribution */}
        <div className="bg-gradient-to-r from-blue-300 to-blue-500 text-white rounded-lg shadow-lg p-6">
          <h4 className="text-lg font-semibold mb-2">🎯 Actual Distribution</h4>
          <p>Mean: <strong>{actualDist.mean}</strong></p>
          <p>Std Dev: <strong>{actualDist.std}</strong></p>
          <p>Min: <strong>{actualDist.min}</strong></p>
          <p>Max: <strong>{actualDist.max}</strong></p>
        </div>

        {/* Predicted Distribution */}
        <div className="bg-gradient-to-r from-green-300 to-green-500 text-white rounded-lg shadow-lg p-6">
          <h4 className="text-lg font-semibold mb-2">🔮 Predicted Distribution</h4>
          <p>Mean: <strong>{predictedDist.mean}</strong></p>
          <p>Std Dev: <strong>{predictedDist.std}</strong></p>
          <p>Min: <strong>{predictedDist.min}</strong></p>
          <p>Max: <strong>{predictedDist.max}</strong></p>
        </div>
      </div>

      {/* Box Plot Comparison */}
      <div className="bg-white shadow-md rounded-lg p-6 mb-6">
        <h4 className="text-lg font-semibold text-gray-700 mb-4 text-center">📦 Actual vs Predicted Distribution</h4>
        <Plot
          data={[
            {
              y: [
                characteristics.actual_distribution?.min,
                characteristics.actual_distribution?.mean,
                characteristics.actual_distribution?.max,
              ].filter((value) => value !== null && value !== undefined),
              type: "box",
              name: "Actual Distribution",
              marker: { color: "#3366FF" },
            },
            {
              y: [
                characteristics.predicted_distribution?.min,
                characteristics.predicted_distribution?.mean,
                characteristics.predicted_distribution?.max,
              ].filter((value) => value !== null && value !== undefined),
              type: "box",
              name: "Predicted Distribution",
              marker: { color: "#33CC99" },
            },
          ]}
          layout={{
            height: 300,
            margin: { t: 20, b: 40, l: 50, r: 10 },
            xaxis: { title: "Distribution Type" },
            yaxis: { title: "Values" },
            showlegend: true,
          }}
          config={{ displayModeBar: false }}
        />
      </div>

      {/* Feature Correlation Table */}
      <div className="bg-white shadow-md rounded-lg p-6 mb-6">
        <h4 className="text-lg font-semibold text-gray-700 mb-4 text-center">🔄 Feature Correlations</h4>
        <table className="min-w-full text-sm text-gray-600 border">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-left">Feature</th>
              <th className="px-4 py-2 text-left">Correlation</th>
            </tr>
          </thead>
          <tbody>
            {characteristics.feature_correlations &&
              Object.entries(characteristics.feature_correlations).map(([feature, corr], idx) => (
                <tr key={idx} className="border-b">
                  <td className="px-4 py-2">{feature}</td>
                  <td className="px-4 py-2">
                    {corr != null ? corr.toFixed(4) : "N/A"}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      {/* Feature Correlation Heatmap */}
      <div className="bg-white shadow-md rounded-lg p-6">
        <h4 className="text-lg font-semibold text-gray-700 mb-4 text-center">🔥 Feature Correlations (Heatmap)</h4>
        <Plot
          data={[
            {
              z: characteristics.feature_correlations ? Object.values(characteristics.feature_correlations) : [],
              x: characteristics.feature_correlations ? Object.keys(characteristics.feature_correlations) : [],
              y: [""],
              type: "heatmap",
              colorscale: "Blues",
            },
          ]}
          layout={{
            height: 250,
            margin: { t: 20, b: 40, l: 50, r: 10 },
            xaxis: { title: "Feature" },
            yaxis: { showticklabels: false },
          }}
          config={{ displayModeBar: false }}
        />
      </div>
    </div>
  );
};

export default DataCharacteristics;
