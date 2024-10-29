
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
;
import ChatInterface from './ChatWindow/ChatInterface';
import Homepage from './Homepage/Homepage';


const App: React.FC = () => {
  return (
    <Router>

      <Navbar />
      {/* <ChatInterface /> */}
      <Routes>
        <Route path="/" element={<Homepage />} />

        <Route path ="/chat" element ={<ChatInterface />}></Route>
        
        {
        // /* <Route path="/about" element={<About />} />
        
        }
      </Routes>
    </Router>
  );
};

export default App;
