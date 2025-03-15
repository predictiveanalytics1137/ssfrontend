


import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FiLoader } from 'react-icons/fi';
import { API_BASE_URL } from '../constants';

interface TrainingMetadata {
  file_url: string;
  target_column: string;
  entity_column: string;
  features: string[];
  user_id: string;
  chat_id: string;
  notebooks: any; // Add notebooks to the interface
}

const TrainingInProgress: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const {
    file_url,
    target_column,
    user_id,
    chat_id,
    features,
    entity_column,
    notebooks, // Retrieve notebooks from location state
  } = location.state as TrainingMetadata;

  const [status, setStatus] = useState<string>('Starting training...');
  const [completed, setCompleted] = useState<boolean>(false);

  useEffect(() => {
    const runTraining = async () => {
      setStatus('Training in progress...');

      try {
        const payload = {
          file_url,
          target_column,
          user_id,
          chat_id,
          features,
          entity_column,
        };

        const response = await fetch(`${API_BASE_URL}/api/automation/`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });

        if (!response.ok) {
          throw new Error(`Training failed: ${response.statusText}`);
        }

        await response.json(); // We don't need the data here, just confirming completion.

        setStatus('Training completed successfully!');
        setCompleted(true);

        // After 2 seconds, navigate back to Notebook Layout in "After Train" state
        setTimeout(() => {
          console.log('Navigating back to notebook with notebook data:', notebooks);
          navigate('/notebook', {
            state: {
              file_url,
              target_column,
              user_id,
              chat_id,
              features,
              entity_column,
              isTrained: true,
              notebooks, // Pass the notebooks data
            },
          });
        }, 2000);
      } catch (error) {
        console.error('Error during training:', error);
        setStatus('Error occurred during training. Please try again.');
      }
    };

    runTraining();
  }, [file_url, target_column, user_id, chat_id, features, entity_column, notebooks, navigate]);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      {!completed ? (
        <>
          <div className="animate-spin rounded-full h-32 w-32 border-t-4 border-blue-500 mb-8" aria-label="Loading"></div>
          <h2 className="text-xl font-semibold">{status}</h2>
          <p className="text-gray-600 mt-4">Please wait while we train your model...</p>
        </>
      ) : (
        <div className="text-center">
          <h2 className="text-xl font-semibold mb-2">{status}</h2>
          <p className="text-gray-600">Redirecting to Notebook Layout...</p>
        </div>
      )}
    </div>
  );
};

export default TrainingInProgress;