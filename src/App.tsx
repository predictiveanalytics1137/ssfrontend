
// import './App.css'
// import ChatInterface from './ChatWindow/ChatInterface'
// import Navbar from './Navbar/Navbar'




// function App() {

//   return (
//     <>
//     <Navbar />
//       {/* <div> <Homepage/></div> */}
//       <ChatInterface />
//     </>
//   )
// }

// export default App



import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Navbar/Navbar';
import Home from './Homepage/Homepage';
import ChatInterface from './ChatWindow/ChatInterface';


const App: React.FC = () => {
  return (
    <Router>
      <Navbar />
      <ChatInterface />
      <Routes>
        <Route path="/home" element={<Home />} />
        {/* <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/contact" element={<Contact />} /> */}
      </Routes>
    </Router>
  );
};

export default App;
