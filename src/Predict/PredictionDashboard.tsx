import React from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const PredictionDashboard: React.FC = () => {
  const { prediction_id } = useParams<{ prediction_id: string }>();
  const location = useLocation();
  const navigate = useNavigate();
  const { predictionsData } = (location.state as { predictionsData: Array<{
    predicted: number;
    product_id: string;
    sampled_date: string;
  }> }) || { predictionsData: [] };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-[#5B3557]">
        <div className="mx-auto px-8 py-6 flex justify-between items-center">
          <h1 className="text-2xl font-semibold text-white">
            Prediction Dashboard - ID: {prediction_id}
          </h1>
          <button
            onClick={() => navigate(-1)}
            className="flex items-center text-white hover:text-gray-200"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back to Predictions
          </button>
        </div>
      </header>
      <div className="mx-auto max-w-screen-xl px-8 py-10">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Prediction Results</h2>
          </div>
          <div className="overflow-x-auto">
            {predictionsData.length === 0 ? (
              <div className="p-8 text-center bg-gray-100">
                <p className="text-lg text-gray-600">No prediction data available.</p>
              </div>
            ) : (
              <table className="w-full text-sm">
                <thead className="bg-gray-50 text-xs uppercase text-gray-500">
                  <tr>
                    <th className="px-6 py-3 text-left font-medium tracking-wider">Product ID</th>
                    <th className="px-6 py-3 text-left font-medium tracking-wider">Predicted Value</th>
                    <th className="px-6 py-3 text-left font-medium tracking-wider">Sampled Date</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {predictionsData.map((data, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-gray-900">
                        {data.product_id}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                        {data.predicted.toFixed(2)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                        {new Date(data.sampled_date).toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PredictionDashboard;