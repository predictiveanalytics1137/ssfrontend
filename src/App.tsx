
// // import './App.css'
// // import ChatInterface from './ChatWindow/ChatInterface'
// // import Navbar from './Navbar/Navbar'




// // function App() {

// //   return (
// //     <>
// //     <Navbar />
// //       {/* <div> <Homepage/></div> */}
// //       <ChatInterface />
// //     </>
// //   )
// // }

// // export default App



// import React from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Navbar from './Navbar/Navbar';
// ;
// import ChatInterface from './ChatWindow/ChatInterface';
// import InitialPage from './InitialPage/InitialPage';
// import HomePage from './HomePage/Homepage';


// const App: React.FC = () => {

//    // Define routes where Navbar should be hidden
//    const hideNavbarRoutes = ['/Home', '/chat'];
//   return (
//      <>
//     {!hideNavbarRoutes.includes(location.pathname) && <Navbar />}
//     <Router>

//       <Navbar />
      
//       <Routes>
//         <Route path="/" element={<InitialPage />} />

//         <Route  path="/Home"  element= {<HomePage/>}/>

//         <Route path ="/chat" element ={<ChatInterface />}>
        
//         </Route>
        
//         {
//         // /* <Route path="/about" element={<About />} />
        
//         }
//       </Routes>
//     </Router>
//     </>
//   );
// };

// export default App;


// App.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './Navbar/Navbar';
import ChatInterface from './ChatWindow/ChatInterface';
import InitialPage from './InitialPage/InitialPage';
import HomePage from './HomePage/HomePage';
import NotebookLayout from './NotebookUI/NotebookLayout';
import ErrorBoundary from './ErrorBoundary';

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
