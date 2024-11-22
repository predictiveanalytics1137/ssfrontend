

// App.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './Navbar/Navbar';
import ChatInterface from './ChatWindow/ChatInterface';
import InitialPage from './InitialPage/InitialPage';
import HomePage from './HomePage/HomePage';
import NotebookLayout from './NotebookUI/NotebookLayout';
import ErrorBoundary from './Errorboundary';

const App: React.FC = () => {
  return (
    <Router>
      <MainContent />
    </Router>
  );
};

const MainContent: React.FC = () => {
  const location = useLocation();
  const hideNavbarRoutes = ['/Home', '/chat', '/notebook'];

  return (
    <>
      {!hideNavbarRoutes.includes(location.pathname) && <Navbar />}
      <Routes>
        <Route path="/" element={<InitialPage />} />
        <Route path="/Home" element={<HomePage />} />
        <Route path="/chat" element={<ChatInterface />} />
        {/* <Route path="/notebook" element={<NotebookLayout />} /> */}
        <Route
          path="/notebook"
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
