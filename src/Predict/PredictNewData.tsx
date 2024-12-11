import React, { useState } from 'react';

interface PredictionData {
  startTime: string;
  runId: string;
  status: string;
  duration: string;
  entityCount: number;
}

const PredictionsUI: React.FC = () => {
  const [predictionsData, setPredictionsData] = useState<PredictionData>({
    startTime: '2024-11-28, 01:54',
    runId: '268145',
    status: 'Success',
    duration: 'Few seconds',
    entityCount: 701,
  });

  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setSelectedFile(event.target.files[0]);
    }
  };

  // const handlePredict = () => {
  //   if (selectedFile) {
  //     // Logic to handle the file upload and prediction
  //     alert(`File "${selectedFile.name}" uploaded for prediction!`);
  //     // Example: Call an API to send the file
  //     // const formData = new FormData();
  //     // formData.append("file", selectedFile);
  //     // fetch('/api/predict', { method: 'POST', body: formData });
  //   } else {
  //     alert('Please select a file first.');
  //   }
  // };
  const handlePredict = async () => {
    if (selectedFile) {
      // Mocking file upload logic here. You should replace this with actual file upload logic.
      const responsePayload = {
        file_url: "s3://pa-documents-storage-bucket/uploads/4a87aeba/Test.csv",
        bucket_name: "artifacts1137",
      };
  
      try {
        const response = await fetch("http://127.0.0.1:8000/api/prediction/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(responsePayload),
        });
  
        if (response.ok) {
          const data = await response.json();
          alert(`Prediction initiated successfully: ${JSON.stringify(data)}`);
        } else {
          const errorText = await response.text();
          alert(`Error in prediction: ${errorText}`);
        }
      } catch (error) {
        console.error("Error while making prediction:", error);
        alert(`An error occurred: ${error}`);
      }
    } else {
      alert("Please select a file first.");
    }
  };
  

  return (
    <div className="flex flex-col h-screen">
      <header className="bg-gray-100 py-4 px-6 flex justify-between items-center">
        <h1 className="text-gray-800 font-bold text-xl">Your trial ends on Dec 19 2024</h1>
        <button className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-2 px-4 rounded">
          predicting store total sales notebook 2024-11-27 19:53:21 UTC
        </button>
      </header>

      <div className="flex-1 flex">
        <div className="bg-gray-100 p-6 w-1/4 border-r border-gray-200">
          <h2 className="text-gray-800 font-bold text-lg mb-4">Quick prediction</h2>
          <p className="text-gray-600 mb-4">
            Upload CSV and use your model for a one-time prediction on new data.
          </p>
          <input
            type="file"
            accept=".csv"
            onChange={handleFileChange}
            className="block w-full text-sm text-gray-500
              file:mr-4 file:py-2 file:px-4
              file:rounded-lg file:border-0
              file:text-sm file:font-semibold
              file:bg-indigo-50 file:text-indigo-700
              hover:file:bg-indigo-100 mb-4"
          />
          <button
            onClick={handlePredict}
            className="bg-indigo-500 hover:bg-indigo-600 text-white font-medium py-2 px-4 rounded mb-4"
          >
            One-time predict from CSV
          </button>

          <h2 className="text-gray-800 font-bold text-lg mb-4">Scheduled prediction</h2>
          <p className="text-gray-600 mb-4">
            For scheduled periodic predictions. Update the predict queries, set a schedule and add an output destination.
          </p>
          <button className="bg-indigo-500 hover:bg-indigo-600 text-white font-medium py-2 px-4 rounded">
            Schedule
          </button>
        </div>

        <div className="flex-1 p-6">
          <h2 className="text-gray-800 font-bold text-lg mb-4">Predictions per Run</h2>
          <div className="h-80 bg-white border rounded-lg shadow-md p-4 overflow-auto">
            <div className="grid grid-cols-5 gap-4 mb-4 text-gray-800 font-medium">
              <div>Start Time</div>
              <div>Run ID</div>
              <div>Status</div>
              <div>Duration</div>
              <div>Entity Count</div>
            </div>
            <div className="grid grid-cols-5 gap-4 text-gray-700">
              <div>{predictionsData.startTime}</div>
              <div>{predictionsData.runId}</div>
              <div>{predictionsData.status}</div>
              <div>{predictionsData.duration}</div>
              <div>{predictionsData.entityCount.toLocaleString()}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PredictionsUI;
