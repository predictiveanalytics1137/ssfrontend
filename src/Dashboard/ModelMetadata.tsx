// // ModelMetadata.tsx
// import React from "react";

// interface ModelMetadataProps {
//   metadata: {
//     timestamp: string | null;
//     model_type: string | null;
//     num_features: number | null;
//     hyperparameters: Record<string, any> | null;
//     training_samples: number | null;
//     testing_samples: number | null;
//     evaluation_duration: number | null;
//   } | null;
// }

// const ModelMetadata: React.FC<ModelMetadataProps> = ({ metadata }) => {
//   if (!metadata) {
//     return (
//       <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
//         <h3 className="text-base font-semibold text-gray-700 mb-4">
//           Model Metadata
//         </h3>
//         <p className="text-sm text-gray-600">No metadata available.</p>
//       </div>
//     );
//   }

//   return (
//     <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
//       <h3 className="text-base font-semibold text-gray-700 mb-4">
//         Model Metadata
//       </h3>
//       <table className="min-w-full text-sm text-gray-600">
//         <tbody>
//           <tr>
//             <td className="px-4 py-2 font-medium">Model Type:</td>
//             <td className="px-4 py-2">{metadata.model_type || "N/A"}</td>
//           </tr>
//           <tr>
//             <td className="px-4 py-2 font-medium">Timestamp:</td>
//             <td className="px-4 py-2">
//               {metadata.timestamp
//                 ? new Date(metadata.timestamp).toLocaleString()
//                 : "N/A"}
//             </td>
//           </tr>
//           <tr>
//             <td className="px-4 py-2 font-medium">Number of Features:</td>
//             <td className="px-4 py-2">
//               {metadata.num_features != null ? metadata.num_features : "N/A"}
//             </td>
//           </tr>
//           <tr>
//             <td className="px-4 py-2 font-medium">Training Samples:</td>
//             <td className="px-4 py-2">
//               {metadata.training_samples != null ? metadata.training_samples : "N/A"}
//             </td>
//           </tr>
//           <tr>
//             <td className="px-4 py-2 font-medium">Testing Samples:</td>
//             <td className="px-4 py-2">
//               {metadata.testing_samples != null ? metadata.testing_samples : "N/A"}
//             </td>
//           </tr>
//           <tr>
//             <td className="px-4 py-2 font-medium">
//               Evaluation Duration (s):
//             </td>
//             <td className="px-4 py-2">
//               {metadata.evaluation_duration != null
//                 ? metadata.evaluation_duration.toFixed(3)
//                 : "N/A"}
//             </td>
//           </tr>
//           <tr>
//             <td className="px-4 py-2 font-medium">Hyperparameters:</td>
//             <td className="px-4 py-2">
//               {metadata.hyperparameters &&
//               Object.keys(metadata.hyperparameters).length > 0 ? (
//                 <ul className="list-disc list-inside">
//                   {Object.entries(metadata.hyperparameters).map(([key, value]) => (
//                     <li key={key}>
//                       {key}: {value != null ? value.toString() : "N/A"}
//                     </li>
//                   ))}
//                 </ul>
//               ) : (
//                 "N/A"
//               )}
//             </td>
//           </tr>
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default ModelMetadata;



import React, { useState } from "react";
import Plot from "react-plotly.js";

interface ModelMetadataProps {
  metadata: {
    timestamp: string | null;
    model_type: string | null;
    num_features: number | null;
    hyperparameters: Record<string, any> | null;
    training_samples: number | null;
    testing_samples: number | null;
    evaluation_duration: number | null;
  } | null;
}

const ModelMetadata: React.FC<ModelMetadataProps> = ({ metadata }) => {
  const [showHyperparams, setShowHyperparams] = useState(false);

  if (!metadata) {
    return (
      <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-700 mb-4">Model Metadata</h3>
        <p className="text-sm text-gray-600">No metadata available.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-700 mb-4">Model Metadata</h3>

      {/* Model Summary */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
        {/* Model Type */}
        <div className="p-4 border rounded-lg shadow-sm bg-gray-50">
          <p className="text-sm text-gray-500">Model Type</p>
          <p className="text-lg font-semibold text-gray-700">{metadata.model_type || "N/A"}</p>
        </div>

        {/* Number of Features */}
        <div className="p-4 border rounded-lg shadow-sm bg-gray-50">
          <p className="text-sm text-gray-500">Number of Features</p>
          <p className="text-lg font-semibold text-gray-700">{metadata.num_features ?? "N/A"}</p>
        </div>

        {/* Evaluation Duration */}
        <div className="p-4 border rounded-lg shadow-sm bg-gray-50">
          <p className="text-sm text-gray-500">Evaluation Time (s)</p>
          <p className="text-lg font-semibold text-gray-700">
            {metadata.evaluation_duration?.toFixed(3) ?? "N/A"}
          </p>
        </div>
      </div>

      {/* Timestamp */}
      <div className="p-4 border rounded-lg shadow-sm bg-gray-50 mb-6">
        <p className="text-sm text-gray-500">Trained On</p>
        <p className="text-lg font-semibold text-gray-700">
          {metadata.timestamp ? new Date(metadata.timestamp).toLocaleString() : "N/A"}
        </p>
      </div>

      {/* Interactive Pie Chart for Training vs Testing */}
      <div className="bg-gray-50 p-4 rounded-lg shadow-sm mb-6">
        <h4 className="text-md font-semibold text-gray-700 mb-2">Training vs Testing Samples</h4>
        <Plot
          data={[
            {
              values: [metadata.training_samples ?? 0, metadata.testing_samples ?? 0],
              labels: ["Training Samples", "Testing Samples"],
              type: "pie",
              marker: { colors: ["#3366FF", "#33CC99"] }, // Updated Colors (Blue & Green)
              textinfo: "label+percent",
              hoverinfo: "label+percent",
            },
          ]}
          layout={{
            height: 250,
            margin: { t: 10, b: 10, l: 10, r: 10 },
            showlegend: true,
          }}
          config={{ displayModeBar: false }} // Removes Camera & Toolbar
        />
      </div>

      {/* Hyperparameters - Collapsible */}
      <div className="p-4 border rounded-lg shadow-sm bg-gray-50">
        <button
          onClick={() => setShowHyperparams(!showHyperparams)}
          className="text-blue-500 font-semibold hover:underline focus:outline-none"
        >
          {showHyperparams ? "Hide" : "Show"} Hyperparameters
        </button>

        {showHyperparams && metadata.hyperparameters && (
          <ul className="list-disc list-inside mt-4 text-gray-700 text-sm">
            {Object.entries(metadata.hyperparameters).map(([key, value]) => (
              <li key={key} className="py-1">
                <strong>{key}:</strong> {value}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default ModelMetadata;
