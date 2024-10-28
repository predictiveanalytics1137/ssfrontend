// import React, { useState } from 'react';
// import { Send, User, Bot, Loader2 } from 'lucide-react';

// interface Message {
//   id: string;
//   content: string;
//   sender: 'user' | 'bot';
//   timestamp: Date;
// }

// const ChatInterface = () => {
//   const [messages, setMessages] = useState<Message[]>([]);
//   const [inputMessage, setInputMessage] = useState('');
//   const [isLoading, setIsLoading] = useState(false);

//   const handleSendMessage = () => {
//     if (!inputMessage.trim()) return;

//     const newMessage: Message = {
//       id: Date.now().toString(),
//       content: inputMessage,
//       sender: 'user',
//       timestamp: new Date(),
//     };

//     setMessages([...messages, newMessage]);
//     setInputMessage('');
//     setIsLoading(true);

//     // Simulate bot response
//     setTimeout(() => {
//       const botResponse: Message = {
//         id: (Date.now() + 1).toString(),
//         content: "I'm a bot response. This is a placeholder message.",
//         sender: 'bot',
//         timestamp: new Date(),
//       };
//       setMessages(prev => [...prev, botResponse]);
//       setIsLoading(false);
//     }, 1000);
//   };

//   return (
//     <div className="flex flex-col h-screen bg-gray-50">
//       {/* Header */}
//       <div className="bg-white border-b p-4">
//         <h1 className="text-xl font-semibold text-gray-800">Chat Assistant</h1>
//       </div>

//       {/* Chat Container */}
//       <div className="flex-1 overflow-y-auto p-4 space-y-4">
//         {messages.map((message) => (
//           <div
//             key={message.id}
//             className={`flex ${
//               message.sender === 'user' ? 'justify-end' : 'justify-start'
//             }`}
//           >
//             <div
//               className={`flex max-w-[80%] items-start space-x-2 ${
//                 message.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''
//               }`}
//             >
//               <div
//                 className={`p-2 rounded-lg ${
//                   message.sender === 'user'
//                     ? 'bg-blue-500 text-white'
//                     : 'bg-white border text-gray-800'
//                 }`}
//               >
//                 <div className="flex items-center space-x-2 mb-1">
//                   {message.sender === 'user' ? (
//                     <User className="w-4 h-4" />
//                   ) : (
//                     <Bot className="w-4 h-4" />
//                   )}
//                   <span className="text-xs">
//                     {message.timestamp.toLocaleTimeString()}
//                   </span>
//                 </div>
//                 <p className="text-sm">{message.content}</p>
//               </div>
//             </div>
//           </div>
//         ))}
//         {isLoading && (
//           <div className="flex justify-start">
//             <div className="bg-white border rounded-lg p-4">
//               <Loader2 className="w-4 h-4 animate-spin" />
//             </div>
//           </div>
//         )}
//       </div>

//       {/* Input Area */}
//       <div className="border-t bg-white p-4">
//         <div className="flex space-x-4">
//           <input
//             type="text"
//             value={inputMessage}
//             onChange={(e) => setInputMessage(e.target.value)}
//             onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
//             placeholder="Type your message..."
//             className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//           <button
//             onClick={handleSendMessage}
//             className="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
//           >
//             <Send className="w-5 h-5" />
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ChatInterface;


import React, { useState } from 'react';
import { Send, User, Bot, Loader2 } from 'lucide-react';

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

const ChatInterface = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    // Add the user's message to the chat
    const newMessage: Message = {
      id: Date.now().toString(),
      content: inputMessage,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages([...messages, newMessage]);
    setInputMessage('');
    setIsLoading(true);

    try {
      // Send the user's message to the Django backend
      const response = await fetch('http://localhost:8000/api/chat/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: inputMessage }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();

      // Add the bot's response to the chat
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: data.response, // Get the response from the backend
        sender: 'bot',
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botResponse]);
    } catch (error) {
      console.error('Error fetching response:', error);
      // Optionally, add an error message to the chat
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: 'Error: Unable to get a response. Please try again later.',
        sender: 'bot',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b p-4">
        <h1 className="text-xl font-semibold text-gray-800">Chat Assistant</h1>
      </div>

      {/* Chat Container */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${
              message.sender === 'user' ? 'justify-end' : 'justify-start'
            }`}
          >
            <div
              className={`flex max-w-[80%] items-start space-x-2 ${
                message.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''
              }`}
            >
              <div
                className={`p-2 rounded-lg ${
                  message.sender === 'user'
                    ? 'bg-blue-500 text-white'
                    : 'bg-white border text-gray-800'
                }`}
              >
                <div className="flex items-center space-x-2 mb-1">
                  {message.sender === 'user' ? (
                    <User className="w-4 h-4" />
                  ) : (
                    <Bot className="w-4 h-4" />
                  )}
                  <span className="text-xs">
                    {message.timestamp.toLocaleTimeString()}
                  </span>
                </div>
                <p className="text-sm">{message.content}</p>
              </div>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-white border rounded-lg p-4">
              <Loader2 className="w-4 h-4 animate-spin" />
            </div>
          </div>
        )}
      </div>

      {/* Input Area */}
      <div className="border-t bg-white p-4">
        <div className="flex space-x-4">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder="Type your message..."
            className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleSendMessage}
            className="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;
