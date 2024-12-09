import React, { useEffect, useState } from "react";

interface Metrics {
  mae: number;
  rmse: number;
  r2_score: number;
}

interface ModelMetrics {
  testing: Metrics;
  training: Metrics;
  assessment: string;
}

const PerformanceConsistency: React.FC = () => {
  const [metrics, setMetrics] = useState<ModelMetrics | null>(null);

  useEffect(() => {
    // Fetch data from the API
    fetch("http://127.0.0.1:8000/model/modelget/4")
      .then((response) => response.json())
      .then((data) => {
        setMetrics(data.model_metrics);
      })
      .catch((error) => console.error("Error fetching metrics:", error));
  }, []);

  if (!metrics) {
    return <div className="text-center mt-8">Loading metrics...</div>;
  }

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-xl font-semibold mb-4">Performance Consistency (Overfit)</h2>
      <div className="border rounded-lg shadow-sm p-4 bg-white">
        <div className="mb-4">
          <p className="text-lg font-medium">
            Compare model results on train and test sets to ensure stability.
          </p>
          <button className="text-blue-500 underline text-sm mt-1">
            Explain
          </button>
        </div>
        <div className="grid grid-cols-2 gap-6">
          <div className="border p-4 rounded-lg bg-gray-50">
            <h3 className="text-md font-medium mb-2">Train & Validation Set R²</h3>
            <div className="bg-blue-200 rounded-full h-6">
              <div
                className="bg-blue-500 h-6 rounded-full text-center text-white text-sm"
                style={{ width: `${metrics.training.r2_score * 100}%` }}
              >
                {(metrics.training.r2_score * 100).toFixed(1)}%
              </div>
            </div>
          </div>
          <div className="border p-4 rounded-lg bg-gray-50">
            <h3 className="text-md font-medium mb-2">Test Set R²</h3>
            <div className="bg-blue-200 rounded-full h-6">
              <div
                className="bg-blue-500 h-6 rounded-full text-center text-white text-sm"
                style={{ width: `${metrics.testing.r2_score * 100}%` }}
              >
                {(metrics.testing.r2_score * 100).toFixed(1)}%
              </div>
            </div>
          </div>
        </div>
        <div className="mt-4 p-4 border-l-4 border-yellow-400 bg-yellow-50">
          <p className="text-yellow-800 text-sm font-medium">
            <strong>Warning:</strong> Your model shows better results on training data than on test data.
          </p>
          <p className="text-yellow-800 text-sm mt-1">
            This suggests a potential case of overfitting, where the model is well-tuned to the known training data
            but struggles to predict on unfamiliar test data.
          </p>
          <button className="text-blue-500 underline text-sm mt-1">How to fix this</button>
        </div>
        <div className="mt-4 p-4 border-l-4 border-blue-400 bg-blue-50">
          <p className="text-blue-800 text-sm">
            <strong>Why is this interesting?</strong> Performance consistency between train and test is an important
            indicator that the model can predict accurately on data it has not previously encountered. If the training
            set yields significantly better results than the test set, it is similar to memorizing specific answers
            without studying the material.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PerformanceConsistency;
