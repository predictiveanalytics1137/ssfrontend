

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

  return (
    <>
      {!hideNavbarRoutes.includes(location.pathname) && (
        <Navbar
          
        />
      )}
      <Routes>
        <Route path="/" element={<InitialPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/chat" element={<ChatInterface />} />
        {/* <Route path="/Dashboard" element={<Dashboard user_id={''} chat_id={''} />} /> */}
        <Route path="/training" element={<TrainingInProgress />} />
        <Route path="/PredictNewData" element={<PredictionsUI />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
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




// // App.tsx
// import React from 'react';
// import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
// import ChatInterface from './ChatWindow/ChatInterface';
// import InitialPage from './InitialPage/InitialPage';
// import HomePage from './HomePage/HomePage';
// import NotebookLayout from './NotebookUI/NotebookLayout';
// import ErrorBoundary from './Errorboundary';
// import Dashboard from './Dashboard/Dashboard';
// import TrainingInProgress from './Dashboard/traininginprogress';
// import PredictionsUI from './Predict/PredictNewData';
// import Login from './Auth/Login';
// import Register from './Auth/Register';

// const App: React.FC = () => {
//   return (
//     <Router>
//       <MainContent />
//     </Router>
//   );
// };

// const MainContent: React.FC = () => {
//   const location = useLocation();
//   const hideNavbarRoutes = ['/Home', '/chat', '/notebook', '/Dashboard', '/PredictNewData', '/register', '/login', '/training'];

//   return (
//     <>
//       {/* Navbar will only show on routes that aren't part of hideNavbarRoutes */}
//       {!(hideNavbarRoutes.includes(location.pathname)) && (
//         <div className="h-14 shadow-md">
//           <p className="text-gray-700 font-semibold text-center pt-3">
//             Welcome to the App! Use the navigation links to proceed.
//           </p>
//         </div>
//       )}
      
//       <Routes>
//         <Route path="/" element={<InitialPage />} />
//         <Route path="/Home" element={<HomePage />} />
//         <Route path="/chat" element={<ChatInterface />} />
//         <Route path="/training" element={<TrainingInProgress />} />
//         <Route path="/register" element={<Register />} />
//         <Route path="/login" element={<Login />} />

//         {/* NotebookLayout wrapped in ErrorBoundary */}
//         <Route
//           path="/notebook"
//           element={
//             <ErrorBoundary>
//               <NotebookLayout />
//             </ErrorBoundary>
//           }
//         />

        
//       </Routes>
//     </>
//   );
// };

// export default App;
