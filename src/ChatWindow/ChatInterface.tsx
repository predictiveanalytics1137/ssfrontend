// // // import React, { useState } from 'react';
// // // import { Send, User, Bot, Loader2 } from 'lucide-react';

// // // interface Message {
// // //   id: string;
// // //   content: string;
// // //   sender: 'user' | 'bot';
// // //   timestamp: Date;
// // // }

// // // const ChatInterface = () => {
// // //   const [messages, setMessages] = useState<Message[]>([]);
// // //   const [inputMessage, setInputMessage] = useState('');
// // //   const [isLoading, setIsLoading] = useState(false);

// // //   const handleSendMessage = () => {
// // //     if (!inputMessage.trim()) return;

// // //     const newMessage: Message = {
// // //       id: Date.now().toString(),
// // //       content: inputMessage,
// // //       sender: 'user',
// // //       timestamp: new Date(),
// // //     };

// // //     setMessages([...messages, newMessage]);
// // //     setInputMessage('');
// // //     setIsLoading(true);

// // //     // Simulate bot response
// // //     setTimeout(() => {
// // //       const botResponse: Message = {
// // //         id: (Date.now() + 1).toString(),
// // //         content: "I'm a bot response. This is a placeholder message.",
// // //         sender: 'bot',
// // //         timestamp: new Date(),
// // //       };
// // //       setMessages(prev => [...prev, botResponse]);
// // //       setIsLoading(false);
// // //     }, 1000);
// // //   };

// // //   return (
// // //     <div className="flex flex-col h-screen bg-gray-50">
// // //       {/* Header */}
// // //       <div className="bg-white border-b p-4">
// // //         <h1 className="text-xl font-semibold text-gray-800">Chat Assistant</h1>
// // //       </div>

// // //       {/* Chat Container */}
// // //       <div className="flex-1 overflow-y-auto p-4 space-y-4">
// // //         {messages.map((message) => (
// // //           <div
// // //             key={message.id}
// // //             className={`flex ${
// // //               message.sender === 'user' ? 'justify-end' : 'justify-start'
// // //             }`}
// // //           >
// // //             <div
// // //               className={`flex max-w-[80%] items-start space-x-2 ${
// // //                 message.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''
// // //               }`}
// // //             >
// // //               <div
// // //                 className={`p-2 rounded-lg ${
// // //                   message.sender === 'user'
// // //                     ? 'bg-blue-500 text-white'
// // //                     : 'bg-white border text-gray-800'
// // //                 }`}
// // //               >
// // //                 <div className="flex items-center space-x-2 mb-1">
// // //                   {message.sender === 'user' ? (
// // //                     <User className="w-4 h-4" />
// // //                   ) : (
// // //                     <Bot className="w-4 h-4" />
// // //                   )}
// // //                   <span className="text-xs">
// // //                     {message.timestamp.toLocaleTimeString()}
// // //                   </span>
// // //                 </div>
// // //                 <p className="text-sm">{message.content}</p>
// // //               </div>
// // //             </div>
// // //           </div>
// // //         ))}
// // //         {isLoading && (
// // //           <div className="flex justify-start">
// // //             <div className="bg-white border rounded-lg p-4">
// // //               <Loader2 className="w-4 h-4 animate-spin" />
// // //             </div>
// // //           </div>
// // //         )}
// // //       </div>

// // //       {/* Input Area */}
// // //       <div className="border-t bg-white p-4">
// // //         <div className="flex space-x-4">
// // //           <input
// // //             type="text"
// // //             value={inputMessage}
// // //             onChange={(e) => setInputMessage(e.target.value)}
// // //             onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
// // //             placeholder="Type your message..."
// // //             className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
// // //           />
// // //           <button
// // //             onClick={handleSendMessage}
// // //             className="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
// // //           >
// // //             <Send className="w-5 h-5" />
// // //           </button>
// // //         </div>
// // //       </div>
// // //     </div>
// // //   );
// // // };

// // // export default ChatInterface;


// // import React, { useState } from 'react';
// // import { Send, User, Bot, Loader2 } from 'lucide-react';

// // interface Message {
// //   id: string;
// //   content: string;
// //   sender: 'user' | 'bot';
// //   timestamp: Date;
// // }

// // const ChatInterface = () => {
// //   const [messages, setMessages] = useState<Message[]>([]);
// //   const [inputMessage, setInputMessage] = useState('');
// //   const [isLoading, setIsLoading] = useState(false);

// //   const handleSendMessage = async () => {
// //     if (!inputMessage.trim()) return;

// //     // Add the user's message to the chat
// //     const newMessage: Message = {
// //       id: Date.now().toString(),
// //       content: inputMessage,
// //       sender: 'user',
// //       timestamp: new Date(),
// //     };

// //     setMessages([...messages, newMessage]);
// //     setInputMessage('');
// //     setIsLoading(true);

// //     try {
// //       // Send the user's message to the Django backend
// //       const response = await fetch('http://localhost:8000/api/chat/', {
// //         method: 'POST',
// //         headers: {
// //           'Content-Type': 'application/json',
// //         },
// //         body: JSON.stringify({ message: inputMessage }),
// //       });

// //       if (!response.ok) {
// //         throw new Error('Network response was not ok');
// //       }

// //       const data = await response.json();

// //       // Add the bot's response to the chat
// //       const botResponse: Message = {
// //         id: (Date.now() + 1).toString(),
// //         content: data.response, // Get the response from the backend
// //         sender: 'bot',
// //         timestamp: new Date(),
// //       };

// //       setMessages((prev) => [...prev, botResponse]);
// //     } catch (error) {
// //       console.error('Error fetching response:', error);
// //       // Optionally, add an error message to the chat
// //       const errorMessage: Message = {
// //         id: (Date.now() + 1).toString(),
// //         content: 'Error: Unable to get a response. Please try again later.',
// //         sender: 'bot',
// //         timestamp: new Date(),
// //       };
// //       setMessages((prev) => [...prev, errorMessage]);
// //     } finally {
// //       setIsLoading(false);
// //     }
// //   };

// //   return (
// //     <div className="flex flex-col h-screen bg-gray-50">
// //       {/* Header */}
// //       <div className="bg-white border-b p-4">
// //         <h1 className="text-xl font-semibold text-gray-800">Chat Assistant</h1>
// //       </div>

// //       {/* Chat Container */}
// //       <div className="flex-1 overflow-y-auto p-4 space-y-4">
// //         {messages.map((message) => (
// //           <div
// //             key={message.id}
// //             className={`flex ${
// //               message.sender === 'user' ? 'justify-end' : 'justify-start'
// //             }`}
// //           >
// //             <div
// //               className={`flex max-w-[80%] items-start space-x-2 ${
// //                 message.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''
// //               }`}
// //             >
// //               <div
// //                 className={`p-2 rounded-lg ${
// //                   message.sender === 'user'
// //                     ? 'bg-blue-500 text-white'
// //                     : 'bg-white border text-gray-800'
// //                 }`}
// //               >
// //                 <div className="flex items-center space-x-2 mb-1">
// //                   {message.sender === 'user' ? (
// //                     <User className="w-4 h-4" />
// //                   ) : (
// //                     <Bot className="w-4 h-4" />
// //                   )}
// //                   <span className="text-xs">
// //                     {message.timestamp.toLocaleTimeString()}
// //                   </span>
// //                 </div>
// //                 <p className="text-sm">{message.content}</p>
// //               </div>
// //             </div>
// //           </div>
// //         ))}
// //         {isLoading && (
// //           <div className="flex justify-start">
// //             <div className="bg-white border rounded-lg p-4">
// //               <Loader2 className="w-4 h-4 animate-spin" />
// //             </div>
// //           </div>
// //         )}
// //       </div>

// //       {/* Input Area */}
// //       <div className="border-t bg-white p-4">
// //         <div className="flex space-x-4">
// //           <input
// //             type="text"
// //             value={inputMessage}
// //             onChange={(e) => setInputMessage(e.target.value)}
// //             onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
// //             placeholder="Type your message..."
// //             className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
// //           />
// //           <button
// //             onClick={handleSendMessage}
// //             className="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
// //           >
// //             <Send className="w-5 h-5" />
// //           </button>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default ChatInterface;




// import React, { useState, useEffect, useRef } from 'react';
// import {
//   Send,
//   User as UserIcon,
//   Bot,
//   Loader2,
// } from 'lucide-react';

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
//   const messagesEndRef = useRef<HTMLDivElement>(null);

//   const handleSendMessage = async () => {
//     if (!inputMessage.trim()) return;

//     // Add the user's message to the chat
//     const newMessage: Message = {
//       id: Date.now().toString(),
//       content: inputMessage,
//       sender: 'user',
//       timestamp: new Date(),
//     };

//     setMessages([...messages, newMessage]);
//     setInputMessage('');
//     setIsLoading(true);

//     try {
//       // Send the user's message to the Django backend
//       const response = await fetch('http://localhost:8000/api/chat/', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ message: inputMessage }),
//       });

//       if (!response.ok) {
//         throw new Error('Network response was not ok');
//       }

//       const data = await response.json();

//       // Add the bot's response to the chat
//       const botResponse: Message = {
//         id: (Date.now() + 1).toString(),
//         content: data.response, // Get the response from the backend
//         sender: 'bot',
//         timestamp: new Date(),
//       };

//       setMessages((prev) => [...prev, botResponse]);
//     } catch (error) {
//       console.error('Error fetching response:', error);
//       // Optionally, add an error message to the chat
//       const errorMessage: Message = {
//         id: (Date.now() + 1).toString(),
//         content:
//           'Error: Unable to get a response. Please try again later.',
//         sender: 'bot',
//         timestamp: new Date(),
//       };
//       setMessages((prev) => [...prev, errorMessage]);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   // Scroll to the bottom when new messages are added
//   useEffect(() => {
//     messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
//   }, [messages]);

//   return (
//     <div className="flex flex-col h-screen bg-gray-100">
//       {/* Header */}
//       <div className="bg-teal-600 p-4 flex items-center">
//         <Bot className="w-6 h-6 text-white mr-2" />
//         <h1 className="text-xl font-semibold text-white">
//           Chat Assistant
//         </h1>
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
//               className={`flex items-end max-w-xs md:max-w-sm lg:max-w-md ${
//                 message.sender === 'user' ? 'flex-row-reverse' : ''
//               }`}
//             >
//               {/* Avatar */}
//               <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center">
//                 {message.sender === 'user' ? (
//                   <UserIcon className="w-5 h-5 text-gray-600" />
//                 ) : (
//                   <Bot className="w-5 h-5 text-gray-600" />
//                 )}
//               </div>
//               {/* Message Bubble */}
//               <div
//                 className={`mx-2 p-3 rounded-lg relative ${
//                   message.sender === 'user'
//                     ? 'bg-blue-500 text-white'
//                     : 'bg-white text-gray-800'
//                 }`}
//               >
//                 <p className="text-sm">{message.content}</p>
//                 <span
//                   className={`text-xs mt-1 ${
//                     message.sender === 'user' ? 'text-blue-200' : 'text-gray-500'
//                   }`}
//                 >
//                   {message.timestamp.toLocaleTimeString([], {
//                     hour: '2-digit',
//                     minute: '2-digit',
//                   })}
//                 </span>
//                 {/* Tail Triangle */}
//                 <div
//                   className={`absolute bottom-0 ${
//                     message.sender === 'user' ? 'right-0' : 'left-0'
//                   } w-0 h-0 border-t-8 border-t-transparent ${
//                     message.sender === 'user'
//                       ? 'border-l-8 border-l-blue-500'
//                       : 'border-r-8 border-r-white'
//                   }`}
//                 ></div>
//               </div>
//             </div>
//           </div>
//         ))}
//         {isLoading && (
//           <div className="flex justify-start">
//             <div className="flex items-center space-x-2 p-3 bg-white rounded-lg">
//               <Loader2 className="w-5 h-5 text-gray-500 animate-spin" />
//               <span className="text-sm text-gray-500">Typing...</span>
//             </div>
//           </div>
//         )}
//         {/* Dummy div to maintain scroll position */}
//         <div ref={messagesEndRef} />
//       </div>

//       {/* Input Area */}
//       <div className="bg-white p-4">
//         <div className="flex items-center border rounded-full px-4 py-2 shadow-sm">
//           <input
//             type="text"
//             value={inputMessage}
//             onChange={(e) => setInputMessage(e.target.value)}
//             onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
//             placeholder="Type your message..."
//             className="flex-1 focus:outline-none text-gray-700"
//           />
//           <button
//             onClick={handleSendMessage}
//             className={`ml-2 text-white rounded-full p-2 ${
//               inputMessage.trim()
//                 ? 'bg-blue-500 hover:bg-blue-600'
//                 : 'bg-gray-300 cursor-not-allowed'
//             }`}
//             disabled={!inputMessage.trim()}
//           >
//             <Send className="w-5 h-5" />
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ChatInterface;




import React, { useState, useEffect, useRef } from 'react';
import {
  Send,
  User as UserIcon,
  Bot,
  Loader2,
  MessageSquare,
} from 'lucide-react';

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
  const messagesEndRef = useRef<HTMLDivElement>(null);

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
        content:
          'Error: Unable to get a response. Please try again later.',
        sender: 'bot',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  // Scroll to the bottom when new messages are added
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-teal-600 p-4 flex items-center">
        <Bot className="w-6 h-6 text-white mr-2" />
        <h1 className="text-xl font-semibold text-white">
          Chat Assistant
        </h1>
      </div>

      {/* Chat Container */}
      <div className="flex-1 overflow-y-auto p-4">
        {messages.length === 0 ? (
          // Placeholder when there are no messages
          <div className="flex flex-col items-center justify-center h-full text-center text-gray-700">
            <MessageSquare className="w-16 h-16 text-teal-700 mb-4" />
            <h2 className="text-2xl font-semibold mb-2 ">
              Welcome to AI powered Chat Assistant
            </h2>
            <p className="mb-4">
              Ask me anything or start by typing a message below.
            </p>
            <p className="text-sm text-gray-500">
              I'm here to help you with predictive analytics.
            </p>
          </div>
        ) : (
          // Chat messages
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${
                  message.sender === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                <div
                  className={`flex items-end max-w-xs md:max-w-sm lg:max-w-md ${
                    message.sender === 'user' ? 'flex-row-reverse' : ''
                  }`}
                >
                  {/* Avatar */}
                  <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center">
                    {message.sender === 'user' ? (
                      <UserIcon className="w-5 h-5 text-gray-600" />
                    ) : (
                      <Bot className="w-5 h-5 text-gray-600" />
                    )}
                  </div>
                  {/* Message Bubble */}
                  <div
                    className={`mx-2 p-3 rounded-lg relative ${
                      message.sender === 'user'
                        ? 'bg-teal-600 text-white'
                        : 'bg-white text-gray-800'
                    }`}
                  >
                    <p className="text-sm">{message.content}</p>
                    <span
                      className={`text-xs mt-1 ${
                        message.sender === 'user' ? 'text-blue-200' : 'text-gray-500'
                      }`}
                    >
                      {message.timestamp.toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </span>
                    {/* Tail Triangle */}
                    <div
                      className={`absolute bottom-0 ${
                        message.sender === 'user' ? 'right-0' : 'left-0'
                      } w-0 h-0 border-t-8 border-t-transparent ${
                        message.sender === 'user'
                          ? 'border-l-8 border-l-blue-500'
                          : 'border-r-8 border-r-white'
                      }`}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="flex items-center space-x-2 p-3 bg-white rounded-lg">
                  <Loader2 className="w-5 h-5 text-gray-500 animate-spin" />
                  <span className="text-sm text-gray-500">Typing...</span>
                </div>
              </div>
            )}
            {/* Dummy div to maintain scroll position */}
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      {/* Input Area */}
      <div className="bg-white p-4">
        <div className="flex items-center border rounded-full px-4 py-2 shadow-sm">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder="Type your message..."
            className="flex-1 focus:outline-none text-gray-700"
          />
          <button
            onClick={handleSendMessage}
            className={`ml-2 text-white rounded-full p-2 ${
              inputMessage.trim()
                ? 'bg-teal-600 hover:bg-blue-600'
                : 'bg-gray-300 cursor-not-allowed'
            }`}
            disabled={!inputMessage.trim()}
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;
