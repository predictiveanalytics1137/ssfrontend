import React from 'react';
import Dashboard from './Dashboard';

const TestDashboard: React.FC = () => {
  // Hardcoded test values
  const testUserId = "9938938HHDU";
  const testChatId = "21";

  return (
    <Dashboard 
      user_id={testUserId} 
      chat_id={testChatId}
    />
  );
};

export default TestDashboard;