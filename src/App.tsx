

// App.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './Navbar/Navbar';
import ChatInterface from './ChatWindow/ChatInterface';
import InitialPage from './InitialPage/InitialPage';
import HomePage from './HomePage/HomePage';
import NotebookLayout from './NotebookUI/NotebookLayout';
import ErrorBoundary from './Errorboundary';

import Login from './Auth/Login';
import Register from './Auth/Register';
import TrainingInProgress from './Dashboard/traininginprogress';
import Dashboard from './Dashboard/Dashboard';
import PredictionsUI from './Predict/PredictNewData';
import { AuthProvider } from './Auth/AuthContext';
import TestDashboard from './Dashboard/testDashboard';
import BookDemoPage from './pages/bookademo';

const App: React.FC = () => {
  return (
    <Router>
      <AuthProvider>
        <MainContent />
      </AuthProvider>
    </Router>
  );
};

const MainContent: React.FC = () => {
  const location = useLocation();
  const hideNavbarRoutes = ['/home', '/chat', '/notebook', '/Dashboard','/PredictNewData', '/register', '/login', '/training', '/'];
  const shouldHideNavbar = hideNavbarRoutes.some(route => location.pathname.startsWith(route));


  return (
    <>
      {/* {!hideNavbarRoutes.includes(location.pathname) && (<Navbar/> */}
      {!shouldHideNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={<InitialPage />} />
        <Route path="/home" element={<HomePage />} />
        {/* <Route path="/chat" element={<ChatInterface />} /> */}
        <Route path="/chat" element={<ChatInterface />} />
        <Route path="/chat/:user_id/:chat_id" element={<ChatInterface />} />
        {/* <Route path="/Dashboard" element={<Dashboard user_id={''} chat_id={''}  />} /> */}
        <Route path="/training" element={<TrainingInProgress />} />
        <Route path="/PredictNewData" element={<PredictionsUI />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/bookademo" element={<BookDemoPage />} />
        {/* <Route path="/Dashboard" element={<TestDashboard />} /> */}
        {/* <Route path="/PerformanceConsistency" element={<PerformanceConsistency />} /> */}
        {/* <Route path="/notebook" element={<NotebookLayout />} /> */}
        {/* <Route
          path="/notebook"
          element={
            <ErrorBoundary>
              <NotebookLayout />
            </ErrorBoundary>
          }
        /> */}
          <Route
        path="/notebook/:user_id/:chat_id"
          element={
        <ErrorBoundary>
          <NotebookLayout />
        </ErrorBoundary>
      }
    />
        {/* <Route path="/about" element={<About />} /> */}
      </Routes>
      

      
    </>
  );
};

export default App;



