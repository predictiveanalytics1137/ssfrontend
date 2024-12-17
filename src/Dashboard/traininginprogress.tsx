// TrainingInProgress.jsx
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function TrainingInProgress() {
  const location = useLocation();
  const navigate = useNavigate();

  const fileUrl = location.state?.file_url;
  const targetColumn = location.state?.target_column;
  const userId = location.state?.user_id;
  const chatId = location.state?.chat_id;
  const features = location.state?.features;
  const entityColumn = location.state?.entity_column;

  const [status, setStatus] = useState("Starting training...");
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    const runTraining = async () => {
      setStatus("Training in progress...");

      try {
        const payload = {
          file_url: fileUrl,
          target_column: targetColumn,
          user_id: userId,
          chat_id: chatId,
          features: features,
          entity_column: entityColumn,
        };

        // Make the backend request. This will run train_pipeline.py synchronously until done.
        const response = await fetch('http://localhost:8000/api/automation/', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });

        if (!response.ok) {
          throw new Error(`Training failed: ${response.statusText}`);
        }

        const data = await response.json();
        console.log('[DEBUG] Training response:', data);

        // Training done
        setStatus("Training completed successfully!");
        setCompleted(true);

        // After 2 seconds, navigate to dashboard
        setTimeout(() => {
          navigate('/dashboard');
        }, 2000);

      } catch (error) {
        console.error('Error during training:', error);
        setStatus("Error occurred during training. Check console for details.");
      }
    };

    runTraining();
  }, [fileUrl, targetColumn, userId, chatId, features, entityColumn, navigate]);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      {!completed && (
        <>
          {/* A spinner for random visual indication */}
          <div className="animate-spin rounded-full h-32 w-32 border-t-4 border-blue-500 mb-8"></div>
          <h2 className="text-xl font-semibold">{status}</h2>
          <p className="text-gray-600 mt-4">Please wait while we train your model...</p>
        </>
      )}
      {completed && (
        <div className="text-center">
          <h2 className="text-xl font-semibold mb-2">{status}</h2>
          <p className="text-gray-600">Redirecting to dashboard...</p>
        </div>
      )}
    </div>
  );
}

export default TrainingInProgress;
