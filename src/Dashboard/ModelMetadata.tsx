// // // ModelMetadata.tsx
// // import React from "react";

// // interface ModelMetadataProps {
// //   metadata: {
// //     timestamp: string | null;
// //     model_type: string | null;
// //     num_features: number | null;
// //     hyperparameters: Record<string, any> | null;
// //     training_samples: number | null;
// //     testing_samples: number | null;
// //     evaluation_duration: number | null;
// //   } | null;
// // }

// // const ModelMetadata: React.FC<ModelMetadataProps> = ({ metadata }) => {
// //   if (!metadata) {
// //     return (
// //       <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
// //         <h3 className="text-base font-semibold text-gray-700 mb-4">
// //           Model Metadata
// //         </h3>
// //         <p className="text-sm text-gray-600">No metadata available.</p>
// //       </div>
// //     );
// //   }

// //   return (
// //     <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
// //       <h3 className="text-base font-semibold text-gray-700 mb-4">
// //         Model Metadata
// //       </h3>
// //       <table className="min-w-full text-sm text-gray-600">
// //         <tbody>
// //           <tr>
// //             <td className="px-4 py-2 font-medium">Model Type:</td>
// //             <td className="px-4 py-2">{metadata.model_type || "N/A"}</td>
// //           </tr>
// //           <tr>
// //             <td className="px-4 py-2 font-medium">Timestamp:</td>
// //             <td className="px-4 py-2">
// //               {metadata.timestamp
// //                 ? new Date(metadata.timestamp).toLocaleString()
// //                 : "N/A"}
// //             </td>
// //           </tr>
// //           <tr>
// //             <td className="px-4 py-2 font-medium">Number of Features:</td>
// //             <td className="px-4 py-2">
// //               {metadata.num_features != null ? metadata.num_features : "N/A"}
// //             </td>
// //           </tr>
// //           <tr>
// //             <td className="px-4 py-2 font-medium">Training Samples:</td>
// //             <td className="px-4 py-2">
// //               {metadata.training_samples != null ? metadata.training_samples : "N/A"}
// //             </td>
// //           </tr>
// //           <tr>
// //             <td className="px-4 py-2 font-medium">Testing Samples:</td>
// //             <td className="px-4 py-2">
// //               {metadata.testing_samples != null ? metadata.testing_samples : "N/A"}
// //             </td>
// //           </tr>
// //           <tr>
// //             <td className="px-4 py-2 font-medium">
// //               Evaluation Duration (s):
// //             </td>
// //             <td className="px-4 py-2">
// //               {metadata.evaluation_duration != null
// //                 ? metadata.evaluation_duration.toFixed(3)
// //                 : "N/A"}
// //             </td>
// //           </tr>
// //           <tr>
// //             <td className="px-4 py-2 font-medium">Hyperparameters:</td>
// //             <td className="px-4 py-2">
// //               {metadata.hyperparameters &&
// //               Object.keys(metadata.hyperparameters).length > 0 ? (
// //                 <ul className="list-disc list-inside">
// //                   {Object.entries(metadata.hyperparameters).map(([key, value]) => (
// //                     <li key={key}>
// //                       {key}: {value != null ? value.toString() : "N/A"}
// //                     </li>
// //                   ))}
// //                 </ul>
// //               ) : (
// //                 "N/A"
// //               )}
// //             </td>
// //           </tr>
// //         </tbody>
// //       </table>
// //     </div>
// //   );
// // };

// // export default ModelMetadata;



// import React, { useState } from "react";
// import Plot from "react-plotly.js";

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
//   const [showHyperparams, setShowHyperparams] = useState(false);

//   if (!metadata) {
//     return (
//       <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
//         <h3 className="text-lg font-semibold text-gray-700 mb-4">Model Metadata</h3>
//         <p className="text-sm text-gray-600">No metadata available.</p>
//       </div>
//     );
//   }

//   return (
//     <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
//       <h3 className="text-lg font-semibold text-gray-700 mb-4">Model Metadata</h3>

//       {/* Model Summary */}
//       <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
//         {/* Model Type */}
//         <div className="p-4 border rounded-lg shadow-sm bg-gray-50">
//           <p className="text-sm text-gray-500">Model Type</p>
//           <p className="text-lg font-semibold text-gray-700">{metadata.model_type || "N/A"}</p>
//         </div>

//         {/* Number of Features */}
//         <div className="p-4 border rounded-lg shadow-sm bg-gray-50">
//           <p className="text-sm text-gray-500">Number of Features</p>
//           <p className="text-lg font-semibold text-gray-700">{metadata.num_features ?? "N/A"}</p>
//         </div>

//         {/* Evaluation Duration */}
//         <div className="p-4 border rounded-lg shadow-sm bg-gray-50">
//           <p className="text-sm text-gray-500">Evaluation Time (s)</p>
//           <p className="text-lg font-semibold text-gray-700">
//             {metadata.evaluation_duration?.toFixed(3) ?? "N/A"}
//           </p>
//         </div>
//       </div>

//       {/* Timestamp */}
//       <div className="p-4 border rounded-lg shadow-sm bg-gray-50 mb-6">
//         <p className="text-sm text-gray-500">Trained On</p>
//         <p className="text-lg font-semibold text-gray-700">
//           {metadata.timestamp ? new Date(metadata.timestamp).toLocaleString() : "N/A"}
//         </p>
//       </div>

//       {/* Interactive Pie Chart for Training vs Testing */}
//       <div className="bg-gray-50 p-4 rounded-lg shadow-sm mb-6">
//         <h4 className="text-md font-semibold text-gray-700 mb-2">Training vs Testing Samples</h4>
//         <Plot
//           data={[
//             {
//               values: [metadata.training_samples ?? 0, metadata.testing_samples ?? 0],
//               labels: ["Training Samples", "Testing Samples"],
//               type: "pie",
//               marker: { colors: ["#3366FF", "#33CC99"] }, // Updated Colors (Blue & Green)
//               textinfo: "label+percent",
//               hoverinfo: "label+percent",
//             },
//           ]}
//           layout={{
//             height: 250,
//             margin: { t: 10, b: 10, l: 10, r: 10 },
//             showlegend: true,
//           }}
//           config={{ displayModeBar: false }} // Removes Camera & Toolbar
//         />
//       </div>

//       {/* Hyperparameters - Collapsible */}
//       <div className="p-4 border rounded-lg shadow-sm bg-gray-50">
//         <button
//           onClick={() => setShowHyperparams(!showHyperparams)}
//           className="text-blue-500 font-semibold hover:underline focus:outline-none"
//         >
//           {showHyperparams ? "Hide" : "Show"} Hyperparameters
//         </button>

//         {showHyperparams && metadata.hyperparameters && (
//           <ul className="list-disc list-inside mt-4 text-gray-700 text-sm">
//             {Object.entries(metadata.hyperparameters).map(([key, value]) => (
//               <li key={key} className="py-1">
//                 <strong>{key}:</strong> {value}
//               </li>
//             ))}
//           </ul>
//         )}
//       </div>
//     </div>
//   );
// };

// export default ModelMetadata;




import React, { useState, useMemo } from "react";
import Plot from "react-plotly.js";
import { Info, ChevronDown, ChevronUp, HelpCircle } from "lucide-react";

interface ModelMetadata {
  timestamp?: string | null;
  model_type?: string | null;
  num_features?: number | null;
  hyperparameters?: Record<string, any> | null;
  training_samples?: number | null;
  testing_samples?: number | null;
  evaluation_duration?: number | null;
}

interface ModelMetadataProps {
  metadata: ModelMetadata | null;
}

const ModelMetadata: React.FC<ModelMetadataProps> = ({ metadata }) => {
  const [showHyperparams, setShowHyperparams] = useState(false);
  const [showInfo, setShowInfo] = useState<{
    [key: string]: boolean;
  }>({});

  // Memoize metadata for performance, with comprehensive fallbacks for all outcomes
  const processedMetadata = useMemo(() => {
    return {
      timestamp: metadata?.timestamp || null,
      model_type: metadata?.model_type || "N/A",
      num_features: metadata?.num_features ?? 0,
      hyperparameters: metadata?.hyperparameters || {},
      training_samples: metadata?.training_samples ?? 0,
      testing_samples: metadata?.testing_samples ?? 0,
      evaluation_duration: metadata?.evaluation_duration ?? 0,
    };
  }, [metadata]);

  // Dynamic info content based on ML output, handling all possible outcomes
  const getInfoContent = (key: string) => {
    const {
      model_type,
      num_features,
      training_samples,
      testing_samples,
      evaluation_duration,
      hyperparameters,
    } = processedMetadata;
    const totalSamples = Math.max((training_samples || 0) + (testing_samples || 0), 1); // Prevent division by zero
    const trainingPercent = totalSamples > 0 ? (training_samples / totalSamples) * 100 : 0;
    const testingPercent = totalSamples > 0 ? (testing_samples / totalSamples) * 100 : 0;

    switch (key) {
      case "metadata":
        return (
          <div className="text-xs text-gray-600 p-3 bg-gray-50 rounded-md border border-gray-200 shadow-sm">
            <p className="flex items-start gap-1">
              <HelpCircle className="text-gray-400 w-3 h-3 mt-0.5" />
              <strong>Model Metadata:</strong> This section details your model’s
              configuration, including its type ({model_type}), features
              ({num_features.toLocaleString() || "N/A"}), and sample sizes
              ({training_samples.toLocaleString()} training,
              {testing_samples.toLocaleString()} testing). The evaluation duration
              ({evaluation_duration.toFixed(3).toLocaleString()}s) indicates how long
              it took to assess the model. If any values are missing, zero, or extreme
              (e.g., {num_features === 0 ? "no features" : ""}, {training_samples === 0
                ? "no training samples"
                : ""}, {testing_samples === 0 ? "no testing samples" : ""}),
              it may signal data issues, an incomplete model, or unusual configurations.
              This helps users understand the model’s basics and experts optimize or debug
              it.
            </p>
          </div>
        );
      case "pieChart":
        return (
          <div className="text-xs text-gray-600 p-3 bg-gray-50 rounded-md border border-gray-200 shadow-sm">
            <p className="flex items-start gap-1">
              <HelpCircle className="text-gray-400 w-3 h-3 mt-0.5" />
              <strong>Training vs Testing Samples:</strong> This pie chart shows the
              distribution of samples used to train ({training_samples.toLocaleString()})
              and test ({testing_samples.toLocaleString()}) your model, representing
              {trainingPercent.toFixed(1)}% and {testingPercent.toFixed(1)}% of total
              samples ({totalSamples.toLocaleString()}). If either is zero, missing, or
              disproportionately large/small, the model may lack sufficient data for
              learning or evaluation, potentially leading to unreliable predictions. This
              helps users check data usage and experts assess risks like overfitting or
              underfitting based on the split.
            </p>
          </div>
        );
      case "hyperparams":
        return (
          <div className="text-xs text-gray-600 p-3 bg-gray-50 rounded-md border border-gray-200 shadow-sm">
            <p className="flex items-start gap-1">
              <HelpCircle className="text-gray-400 w-3 h-3 mt-0.5" />
              <strong>Hyperparameters:</strong> These settings control how your model
              ({model_type}) learns, such as {Object.keys(hyperparameters || {}).join(", ") || "none specified"}. You have
              {Object.keys(hyperparameters || {}).length} hyperparameters, e.g., depth: 4 (if
              applicable). If none are specified, missing, or extreme, the model may use
              defaults or behave unexpectedly, affecting performance. Users can think of
              these as tuning knobs—adjusting them can improve or worsen predictions, and
              experts use them to fine-tune performance, balance complexity, and prevent
              issues like overfitting or underfitting.
            </p>
          </div>
        );
      default:
        return null;
    }
  };

  if (!metadata) {
    return (
      <div className="p-6 bg-white rounded-lg shadow-md border border-gray-200">
        <h3 className="text-sm font-semibold text-gray-700 mb-4">Model Metadata</h3>
        <p className="text-xs text-gray-600">No metadata available.</p>
      </div>
    );
  }

  return (
    <div className="p-6 bg-white rounded-lg shadow-md border border-gray-200">
      {/* Header */}
      <div className="mb-12">
        <div className="flex justify-between items-center">
          <h3 className="text-sm font-semibold text-gray-800">Model Metadata</h3>
          <Info
            className="text-gray-400 w-3 h-3 cursor-pointer"
            onClick={() => setShowInfo((prev) => ({ ...prev, metadata: !prev.metadata }))}
          />
        </div>
        {showInfo.metadata && getInfoContent("metadata")}
        <p className="text-xs text-gray-500 mt-2">
          Detailed information about your model’s configuration and performance.
        </p>
      </div>

      {/* Model Summary - Spacious Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mb-12">
        {/* Model Type */}
        <div className="p-4 bg-gray-50 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-300">
          <p className="text-xs text-gray-500">Model Type</p>
          <p className="text-sm font-medium text-gray-800">{processedMetadata.model_type}</p>
        </div>

        {/* Number of Features */}
        <div className="p-4 bg-gray-50 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-300">
          <p className="text-xs text-gray-500">Number of Features</p>
          <p className="text-sm font-medium text-gray-800">
            {processedMetadata.num_features.toLocaleString() || "N/A"}
          </p>
        </div>

        {/* Evaluation Duration */}
        <div className="p-4 bg-gray-50 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-300">
          <p className="text-xs text-gray-500">Evaluation Time (s)</p>
          <p className="text-sm font-medium text-gray-800">
            {processedMetadata.evaluation_duration?.toFixed(3).toLocaleString() || "N/A"}
          </p>
        </div>
      </div>

      {/* Timestamp */}
      <div className="p-4 bg-gray-50 rounded-lg shadow-sm border border-gray-200 mb-12 hover:shadow-md transition-shadow duration-300">
        <p className="text-xs text-gray-500">Trained On</p>
        <p className="text-sm font-medium text-gray-800">
          {processedMetadata.timestamp
            ? new Date(processedMetadata.timestamp).toLocaleString()
            : "N/A"}
        </p>
      </div>

      {/* Training vs Testing Samples - Interactive Pie Chart */}
      <div className="p-4 bg-gray-50 rounded-lg shadow-sm border border-gray-200 mb-12">
        <div className="flex justify-between items-center mb-4">
          <h4 className="text-sm font-medium text-gray-800">Training vs Testing Samples</h4>
          <Info
            className="text-gray-400 w-3 h-3 cursor-pointer"
            onClick={() => setShowInfo((prev) => ({ ...prev, pieChart: !prev.pieChart }))}
          />
        </div>
        {showInfo.pieChart && getInfoContent("pieChart")}
        <Plot
          data={[
            {
              values: [
                Math.max(processedMetadata.training_samples || 0, 0), // Ensure non-negative
                Math.max(processedMetadata.testing_samples || 0, 0), // Ensure non-negative
              ],
              labels: ["Training Samples", "Testing Samples"],
              type: "pie",
              marker: { colors: ["#3366FF", "#34D399"] }, // Blue & Green for consistency
              textinfo: "label+percent", // Show labels and percentages on top
              textposition: "outside", // Position labels outside the pie for visibility
              textfont: { size: 10, family: "Arial, sans-serif", color: "#000" }, // Smaller font for readability
              hoverinfo: "label+percent+name", // Corrected to valid Plotly hoverinfo
              pull: [0, 0], // Prevent slices from being pulled apart
              rotation: 90, // Rotate for better label positioning
            },
          ]}
          layout={{
            height: 400, // Increased height for spaciousness
            width: 400, // Fixed width in pixels for stability, responsive via style
            margin: { t: 40, b: 40, l: 20, r: 20 }, // More margin for spaciousness and labels
            showlegend: true,
            legend: { orientation: "h", y: -0.1, font: { size: 10 } },
            title: {
              text: "Training vs Testing Samples",
              font: { size: 12 },
              x: 0.5,
            },
          }}
          config={{ displayModeBar: false }} // Removes Camera & Toolbar
          style={{ maxWidth: "100%", width: "100%" }} // Ensure responsiveness
        />
      </div>

      {/* Hyperparameters - Collapsible and Interactive */}
      <div className="p-4 bg-gray-50 rounded-lg shadow-sm border border-gray-200">
        <div className="flex justify-between items-center mb-4">
          <h4 className="text-sm font-medium text-gray-800">Hyperparameters</h4>
          <Info
            className="text-gray-400 w-3 h-3 cursor-pointer"
            onClick={() => setShowInfo((prev) => ({ ...prev, hyperparams: !prev.hyperparams }))}
          />
        </div>
        {showInfo.hyperparams && getInfoContent("hyperparams")}
        <button
          onClick={() => setShowHyperparams(!showHyperparams)}
          className="text-blue-500 text-xs font-medium hover:underline focus:outline-none transition-colors duration-200"
        >
          {showHyperparams ? "Hide" : "Show"} Hyperparameters
        </button>

        {showHyperparams && processedMetadata.hyperparameters && Object.keys(processedMetadata.hyperparameters).length > 0 && (
          <ul className="list-disc list-inside mt-4 text-xs text-gray-700">
            {Object.entries(processedMetadata.hyperparameters).map(([key, value]) => (
              <li key={key} className="py-2"> {/* Increased padding for spaciousness */}
                <strong>{key}:</strong>{" "}
                {typeof value === "object" && value !== null
                  ? JSON.stringify(value).substring(0, 50) + (JSON.stringify(value).length > 50 ? "..." : "")
                  : value?.toString() || "N/A"}
              </li>
            ))}
          </ul>
        )}
        {showHyperparams && (!processedMetadata.hyperparameters || Object.keys(processedMetadata.hyperparameters).length === 0) && (
          <p className="text-xs text-gray-600 mt-4">No hyperparameters available.</p>
        )}
      </div>
    </div>
  );
};

export default ModelMetadata;