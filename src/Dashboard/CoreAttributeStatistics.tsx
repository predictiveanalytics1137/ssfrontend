// // CoreAttributeStatistics.tsx
// import React, { useState } from "react";

// interface CoreAttributeStatisticsProps {
//   coreStats: Record<string, Record<string, number | string>> | null;
//   attributeStats: Record<string, Record<string, number | string>> | null;
// }

// const CoreAttributeStatistics: React.FC<CoreAttributeStatisticsProps> = ({
//   coreStats,
//   attributeStats,
// }) => {
//   const [activeTab, setActiveTab] = useState<"core" | "attribute">("core");

//   const renderTable = (
//     stats: Record<string, Record<string, number | string>> | null
//   ) => {
//     if (!stats) {
//       return <p className="text-sm text-gray-600">No statistics available.</p>;
//     }
//     return (
//       <div className="overflow-x-auto">
//         <table className="min-w-full text-sm text-gray-600">
//           <thead className="bg-gray-100">
//             <tr>
//               <th className="px-4 py-2">Feature</th>
//               <th className="px-4 py-2">Metric</th>
//               <th className="px-4 py-2">Value</th>
//             </tr>
//           </thead>
//           <tbody>
//             {Object.entries(stats).map(([feature, metrics]) =>
//               Object.entries(metrics).map(([metric, value], idx) => (
//                 <tr key={`${feature}-${metric}-${idx}`} className="border-b">
//                   <td className="px-4 py-2">{feature}</td>
//                   <td className="px-4 py-2">{metric}</td>
//                   <td className="px-4 py-2">
//                     {value !== null && value !== undefined && typeof value === "number"
//                       ? value.toFixed(2)
//                       : value || "N/A"}
//                   </td>
//                 </tr>
//               ))
//             )}
//           </tbody>
//         </table>
//       </div>
//     );
//   };

//   return (
//     <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
//       <h3 className="text-base font-semibold text-gray-700 mb-4">
//         Core & Attribute Statistics
//       </h3>
//       <div className="flex space-x-4 mb-4">
//         <button
//           onClick={() => setActiveTab("core")}
//           className={`px-4 py-2 text-sm font-medium rounded ${
//             activeTab === "core"
//               ? "bg-blue-500 text-white"
//               : "bg-gray-100 text-gray-600 hover:bg-gray-200"
//           }`}
//         >
//           Core Statistics
//         </button>
//         <button
//           onClick={() => setActiveTab("attribute")}
//           className={`px-4 py-2 text-sm font-medium rounded ${
//             activeTab === "attribute"
//               ? "bg-blue-500 text-white"
//               : "bg-gray-100 text-gray-600 hover:bg-gray-200"
//           }`}
//         >
//           Attribute Statistics
//         </button>
//       </div>
//       {activeTab === "core" ? renderTable(coreStats) : renderTable(attributeStats)}
//     </div>
//   );
// };

// export default CoreAttributeStatistics;



import React, { useState } from "react";

interface CoreAttributeStatisticsProps {
  coreStats: Record<string, Record<string, number | string>> | null;
  attributeStats: Record<string, Record<string, number | string>> | null;
}

const CoreAttributeStatistics: React.FC<CoreAttributeStatisticsProps> = ({ coreStats, attributeStats }) => {
  const [activeTab, setActiveTab] = useState<"core" | "attribute">("core");
  const [searchQuery, setSearchQuery] = useState("");

  const renderTable = (stats: Record<string, Record<string, number | string>> | null) => {
    if (!stats) {
      return <p className="text-sm text-gray-600 text-center">No statistics available.</p>;
    }

    const filteredStats = Object.entries(stats).filter(([feature]) =>
      feature.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
      <div className="overflow-x-auto mt-4">
        <table className="min-w-full text-sm text-gray-700 border border-gray-300 rounded-lg shadow-md">
          <thead className="bg-gray-200 text-gray-700">
            <tr>
              <th className="px-4 py-3 text-left">Feature</th>
              <th className="px-4 py-3 text-left">Metric</th>
              <th className="px-4 py-3 text-left">Value</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-300">
            {filteredStats.map(([feature, metrics]) =>
              Object.entries(metrics).map(([metric, value], idx) => (
                <tr key={`${feature}-${metric}-${idx}`} className="hover:bg-gray-100 transition-all">
                  <td className="px-4 py-2 font-medium">{feature}</td>
                  <td className="px-4 py-2">{metric}</td>
                  <td className="px-4 py-2">
                    {typeof value === "number" ? value.toFixed(2) : value || "N/A"}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
      <h3 className="text-xl font-semibold text-gray-700 mb-6 text-center">📊 Core & Attribute Statistics</h3>

      {/* Tabs for Core & Attribute Statistics */}
      <div className="flex justify-center space-x-4 mb-4">
        <button
          onClick={() => setActiveTab("core")}
          className={`px-6 py-2 text-sm font-medium rounded-lg shadow-md transition-all ${
            activeTab === "core"
              ? "bg-blue-500 text-white"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          Core Statistics
        </button>
        <button
          onClick={() => setActiveTab("attribute")}
          className={`px-6 py-2 text-sm font-medium rounded-lg shadow-md transition-all ${
            activeTab === "attribute"
              ? "bg-blue-500 text-white"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          Attribute Statistics
        </button>
      </div>

      {/* Search Feature */}
      <div className="mb-4 flex justify-center">
        <input
          type="text"
          placeholder="🔍 Search by Feature Name..."
          className="px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Render Table Based on Active Tab */}
      {activeTab === "core" ? renderTable(coreStats) : renderTable(attributeStats)}
    </div>
  );
};

export default CoreAttributeStatistics;
