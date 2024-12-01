
// // import React, { useState } from 'react';
// // import {
// //   FiPlus,
// //   FiMenu,
// //   FiPaperclip,
// //   FiSend,
// //   FiTrash,
// //   FiLoader,
// // } from 'react-icons/fi';
// // import { motion, AnimatePresence } from 'framer-motion';
// // import { v4 as uuidv4 } from 'uuid';
// // import { useNavigate } from 'react-router-dom';

// // /**
// //  * Message Interface
// //  * Represents a single message in the chat.
// //  */
// // interface Message {
// //   id: string;
// //   sender: 'user' | 'assistant';
// //   text: string;
// //   timestamp: string;
// //   button?: boolean; // Flag to render a button (e.g., Generate Notebook)
// // }

// // /**
// //  * Chat Interface
// //  * Represents a single chat session.
// //  */
// // interface Chat {
// //   id: string;
// //   title: string;
// //   timestamp: string;
// //   messages: Message[];
// // }

// // /**
// //  * SchemaTable Component
// //  * Renders a JSON schema as a table.
// //  */
// // const SchemaTable: React.FC<{ schema: any }> = ({ schema }) => {
// //   if (!Array.isArray(schema)) {
// //     return <pre className="font-sans whitespace-pre-wrap">{JSON.stringify(schema, null, 2)}</pre>;
// //   }

// //   const headers = Object.keys(schema[0]);

// //   return (
// //     <div className="overflow-x-auto mt-2">
// //       <table className="min-w-full border-collapse">
// //         <thead>
// //           <tr>
// //             {headers.map((header) => (
// //               <th
// //                 key={header}
// //                 className="px-4 py-2 border-b bg-gray-100 text-left text-xs font-medium text-gray-700 uppercase tracking-wider"
// //               >
// //                 {header}
// //               </th>
// //             ))}
// //           </tr>
// //         </thead>
// //         <tbody>
// //           {schema.map((row: any, index: number) => (
// //             <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
// //               {headers.map((header) => (
// //                 <td key={header} className="px-4 py-2 border-b text-xs text-gray-600">
// //                   {row[header]}
// //                 </td>
// //               ))}
// //             </tr>
// //           ))}
// //         </tbody>
// //       </table>
// //     </div>
// //   );
// // };

// // const ChatInterface: React.FC = () => {
// //   // Default assistant message
// //   const defaultMessage = `Hi! 👋 I'm your AI assistant.\nI'll assist you in formulating a predictive question. I'll then create a SQL notebook to build a training set.\nSo, what would you like to predict?`;

// //   // State for all chats
// //   const [chats, setChats] = useState<Chat[]>([
// //     {
// //       id: '1',
// //       title: 'New Prediction',
// //       timestamp: new Date().toLocaleString(),
// //       messages: [
// //         {
// //           id: uuidv4(),
// //           sender: 'assistant',
// //           text: defaultMessage,
// //           timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
// //         },
// //       ],
// //     },
// //   ]);

// //   // State for the currently selected chat
// //   const [currentChat, setCurrentChat] = useState<Chat | null>(chats[0]);

// //   // State to control the visibility of the sidebar
// //   const [showSidebar, setShowSidebar] = useState(true);

// //   // State for the input message
// //   const [inputMessage, setInputMessage] = useState('');

// //   // State for selected files to upload
// //   const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);

// //   // State for loading indicators
// //   const [isLoading, setIsLoading] = useState(false);
// //   const [isUploading, setIsUploading] = useState(false);

// //   // State for notebook generation
// //   const [isGeneratingNotebook, setIsGeneratingNotebook] = useState(false);
// //   const [notebookGenerated, setNotebookGenerated] = useState(false);
// //   const [generatedNotebookData, setGeneratedNotebookData] = useState<any>(null);

// //   // Import useNavigate from react-router-dom to navigate
// //   const navigate = useNavigate();

// //   /**
// //    * Handles creating a new chat.
// //    */
// //   const handleNewChat = () => {
// //     const newChat: Chat = {
// //       id: uuidv4(),
// //       title: 'New Prediction',
// //       timestamp: new Date().toLocaleString(),
// //       messages: [
// //         {
// //           id: uuidv4(),
// //           sender: 'assistant',
// //           text: defaultMessage,
// //           timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
// //         },
// //       ],
// //     };
// //     setChats((prev) => [newChat, ...prev]);
// //     setCurrentChat(newChat);

// //     // Reset notebook states for the new chat
// //     setIsGeneratingNotebook(false);
// //     setNotebookGenerated(false);
// //     setGeneratedNotebookData(null);
// //   };

// //   /**
// //    * Handles selecting files for upload.
// //    * @param e - Change event from the file input.
// //    */
// //   const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
// //     const files = e.target.files;
// //     if (files && files.length > 0) {
// //       setSelectedFiles(files);
// //     }
// //   };

// //   /**
// //    * Handles uploading selected files to the backend.
// //    */
// //   const handleFileUpload = async () => {
// //     if (!selectedFiles || selectedFiles.length === 0) {
// //       alert('No files selected.');
// //       return;
// //     }

// //     setIsUploading(true);

// //     try {
// //       const formData = new FormData();

// //       // Append all selected files to FormData
// //       Array.from(selectedFiles).forEach((file) => {
// //         formData.append('file', file);
// //       });

// //       const response = await fetch('http://localhost:8000/api/chatgpt/', {
// //         method: 'POST',
// //         body: formData,
// //       });

// //       if (!response.ok) {
// //         throw new Error(`Failed to upload file: ${response.statusText}`);
// //       }

// //       const data = await response.json();
// //       console.log('[DEBUG] File upload response:', data); // Log response to verify structure

// //       // Handle 'chat_message' for schema display
// //       if (data.chat_message) {
// //         const schemaMessage: Message = {
// //           id: uuidv4(),
// //           sender: 'assistant',
// //           text: data.chat_message,
// //           timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
// //         };

// //         // Update current chat state and all chats state to include the new schema message
// //         setCurrentChat((prevChat) => {
// //           if (!prevChat) return null;
// //           const updatedMessages = [...prevChat.messages, schemaMessage];
// //           return { ...prevChat, messages: updatedMessages };
// //         });

// //         setChats((prevChats) =>
// //           prevChats.map((chat) =>
// //             chat.id === currentChat?.id
// //               ? { ...chat, messages: [...chat.messages, schemaMessage] }
// //               : chat
// //           )
// //         );
// //       } else {
// //         console.error('[ERROR] Invalid response format:', data);
// //       }
// //     } catch (error) {
// //       console.error('[ERROR] File upload error:', error);
// //       const errorMessage: Message = {
// //         id: uuidv4(),
// //         sender: 'assistant',
// //         text: `Upload Error: ${error instanceof Error ? error.message : 'Unknown error'}`,
// //         timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
// //       };

// //       setCurrentChat((prevChat) => {
// //         if (!prevChat) return null;
// //         const updatedMessages = [...prevChat.messages, errorMessage];
// //         return { ...prevChat, messages: updatedMessages };
// //       });

// //       setChats((prevChats) =>
// //         prevChats.map((chat) =>
// //           chat.id === currentChat?.id
// //             ? { ...chat, messages: [...chat.messages, errorMessage] }
// //             : chat
// //         )
// //       );
// //     } finally {
// //       setSelectedFiles(null);
// //       setIsUploading(false);
// //     }
// //   };

// //   /**
// //    * Handles sending a message.
// //    */
// //   const handleSendMessage = async () => {
// //     if (!inputMessage.trim()) return;
// //     if (!currentChat) return;

// //     // Create a user message
// //     const userMessage: Message = {
// //       id: uuidv4(),
// //       sender: 'user',
// //       text: inputMessage,
// //       timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
// //     };

// //     // Append the user message to the current chat
// //     const updatedChat = {
// //       ...currentChat,
// //       messages: [...currentChat.messages, userMessage],
// //     };

// //     setChats((prevChats) =>
// //       prevChats.map((chat) => (chat.id === currentChat.id ? updatedChat : chat))
// //     );

// //     setCurrentChat(updatedChat);
// //     setInputMessage('');
// //     setIsLoading(true);

// //     try {
// //       // Send the chat message to the backend, including user_id
// //       const response = await fetch('http://localhost:8000/api/chatgpt/', {
// //         method: 'POST',
// //         headers: { 'Content-Type': 'application/json' },
// //         body: JSON.stringify({ message: inputMessage, user_id: 'default_user' }), // Replace 'default_user' with actual user_id if available
// //       });

// //       if (!response.ok) {
// //         throw new Error(`Failed to send message: ${response.statusText}`);
// //       }

// //       const data = await response.json();

// //       // Initialize variables
// //       let botText = data.response;
// //       let showGenerateButton = data.show_generate_notebook || false;

// //       // Create an assistant message with the response
// //       const botMessage: Message = {
// //         id: uuidv4(),
// //         sender: 'assistant',
// //         text: botText,
// //         timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
// //         button: showGenerateButton,
// //       };

// //       // Append the assistant message to the current chat
// //       const updatedMessages = [...updatedChat.messages, botMessage];

// //       setChats((prevChats) =>
// //         prevChats.map((chat) =>
// //           chat.id === currentChat.id
// //             ? { ...chat, messages: updatedMessages }
// //             : chat
// //         )
// //       );

// //       setCurrentChat((prevChat) =>
// //         prevChat
// //           ? { ...prevChat, messages: updatedMessages }
// //           : null
// //       );

// //       // Reset notebook states if a new response is received
// //       setIsGeneratingNotebook(false);
// //       setNotebookGenerated(false);
// //       setGeneratedNotebookData(null);
// //     } catch (error) {
// //       console.error('[ERROR] Error sending message:', error);
// //       const errorMessage: Message = {
// //         id: uuidv4(),
// //         sender: 'assistant',
// //         text: 'Sorry, I encountered an issue. Please try again later.',
// //         timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
// //       };

// //       // Append the error message to the current chat
// //       setChats((prevChats) =>
// //         prevChats.map((chat) =>
// //           chat.id === currentChat.id
// //             ? { ...chat, messages: [...chat.messages, errorMessage] }
// //             : chat
// //         )
// //       );
// //     } finally {
// //       setIsLoading(false);
// //     }
// //   };

// //   /**
// //    * Handles generating the notebook.
// //    */
// //   const handleGenerateNotebook = async () => {
// //     if (!currentChat) return;

// //     setIsGeneratingNotebook(true);

// //     try {
// //       const response = await fetch('http://localhost:8000/api/chatgpt/', {
// //         method: 'POST',
// //         headers: { 'Content-Type': 'application/json' },
// //         body: JSON.stringify({ action: 'generate_notebook', user_id: 'default_user' }),
// //       });

// //       if (!response.ok) {
// //         throw new Error(`Failed to generate notebook: ${response.statusText}`);
// //       }

// //       const data = await response.json();
// //       console.log('[DEBUG] Notebook generated:', data);

// //       if (data.notebooks) {
// //         setGeneratedNotebookData(data.notebooks);
// //         setNotebookGenerated(true);

// //         // Optionally, you can append a message indicating notebook generation is complete
// //         const notebookMessage: Message = {
// //           id: uuidv4(),
// //           sender: 'assistant',
// //           text: 'Notebook has been generated successfully.',
// //           timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
// //         };

// //         setChats((prevChats) =>
// //           prevChats.map((chat) =>
// //             chat.id === currentChat.id
// //               ? { ...chat, messages: [...chat.messages, notebookMessage] }
// //               : chat
// //           )
// //         );

// //         setCurrentChat((prevChat) =>
// //           prevChat
// //             ? { ...prevChat, messages: [...prevChat.messages, notebookMessage] }
// //             : null
// //         );
// //       } else {
// //         alert('Error generating notebook. Please try again.');
// //       }
// //     } catch (error) {
// //       console.error('[ERROR] Error generating notebook:', error);
// //       alert('Error generating notebook. Please try again.');
// //     } finally {
// //       setIsGeneratingNotebook(false);
// //     }
// //   };

// //   /**
// //    * Handles opening the notebook.
// //    */
// //   const handleOpenNotebook = () => {
// //     if (generatedNotebookData) {
// //       navigate('/notebook', { state: { notebooks: generatedNotebookData } });
// //     } else {
// //       alert('No notebook data available.');
// //     }
// //   };

// //   /**
// //    * Handles resetting the conversation.
// //    */
// //   const handleReset = async () => {
// //     // Send reset action to backend
// //     await fetch('http://localhost:8000/api/chatgpt/', {
// //       method: 'POST',
// //       headers: { 'Content-Type': 'application/json' },
// //       body: JSON.stringify({ action: 'reset', user_id: 'default_user' }),
// //     });

// //     // Reset the chat
// //     setCurrentChat((prevChat) =>
// //       prevChat
// //         ? {
// //             ...prevChat,
// //             messages: [
// //               {
// //                 id: uuidv4(),
// //                 sender: 'assistant',
// //                 text: defaultMessage,
// //                 timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
// //               },
// //             ],
// //           }
// //         : null
// //     );

// //     // Reset notebook states
// //     setIsGeneratingNotebook(false);
// //     setNotebookGenerated(false);
// //     setGeneratedNotebookData(null);
// //   };

// //   /**
// //    * Helper function to determine if a message contains a JSON schema.
// //    */
// //   const parseSchema = (text: string): any | null => {
// //     try {
// //       const parsed = JSON.parse(text);
// //       // Check if parsed data is an object or array suitable for table display
// //       if (typeof parsed === 'object') {
// //         return parsed;
// //       }
// //       return null;
// //     } catch (e) {
// //       return null;
// //     }
// //   };

// //   return (
// //     <div className="h-screen flex bg-gray-50">
// //       {/* Sidebar for Chat History */}
// //       <AnimatePresence>
// //         {showSidebar && (
// //           <motion.div
// //             initial={{ x: -240 }}
// //             animate={{ x: 0 }}
// //             exit={{ x: -240 }}
// //             transition={{ duration: 0.2 }}
// //             className="w-60 border-r border-gray-200 bg-white"
// //           >
// //             {/* Sidebar Header */}
// //             <div className="p-3 border-b border-gray-100 flex justify-between items-center">
// //               <span className="text-xs font-medium text-gray-600">Chat History</span>
// //               <button
// //                 onClick={handleNewChat}
// //                 className="text-xs flex items-center gap-1 text-teal-700 hover:text-teal-800"
// //               >
// //                 <FiPlus size={12} /> New
// //               </button>
// //             </div>
// //             {/* Chat List */}
// //             <div className="overflow-y-auto h-[calc(100vh-49px)]">
// //               {chats.map((chat) => (
// //                 <div
// //                   key={chat.id}
// //                   onClick={() => setCurrentChat(chat)}
// //                   className={`p-2 mx-2 my-1 rounded text-xs cursor-pointer flex items-center justify-between group ${
// //                     currentChat?.id === chat.id
// //                       ? 'bg-teal-50 text-teal-700'
// //                       : 'hover:bg-gray-50'
// //                   }`}
// //                 >
// //                   <div className="truncate flex-1">
// //                     <div className="font-medium truncate">{chat.title}</div>
// //                     <div className="text-[10px] text-gray-400">{chat.timestamp}</div>
// //                   </div>
// //                   <button
// //                     onClick={(e) => {
// //                       e.stopPropagation();
// //                       setChats((prev) => prev.filter((c) => c.id !== chat.id));
// //                       if (currentChat?.id === chat.id) {
// //                         setCurrentChat(null);
// //                       }
// //                     }}
// //                     className="opacity-0 group-hover:opacity-100 p-1 hover:text-red-500"
// //                   >
// //                     <FiTrash size={12} />
// //                   </button>
// //                 </div>
// //               ))}
// //             </div>
// //           </motion.div>
// //         )}
// //       </AnimatePresence>

// //       {/* Main Chat Area */}
// //       <div className="flex-1 flex flex-col">
// //         {/* Header */}
// //         <div className="h-12 border-b border-gray-200 flex items-center px-4 bg-white">
// //           <button
// //             onClick={() => setShowSidebar(!showSidebar)}
// //             className="text-gray-500 hover:text-gray-700"
// //           >
// //             <FiMenu size={16} />
// //           </button>
// //           <span className="ml-4 text-sm font-medium">{currentChat?.title || 'Select a chat'}</span>
// //           <div className="ml-auto">
// //             <button
// //               onClick={handleReset}
// //               className="text-xs text-red-500 hover:text-red-600 flex items-center gap-1"
// //             >
// //               <FiTrash size={12} /> Reset
// //             </button>
// //           </div>
// //         </div>

// //         {/* Messages */}
// //         <div className="flex-1 overflow-y-auto px-4 py-6">
// //           {currentChat?.messages.map((message) => {
// //             const schemaData = parseSchema(message.text);
// //             return (
// //               <div
// //                 key={message.id}
// //                 className={`mb-4 flex ${
// //                   message.sender === 'user' ? 'justify-end' : 'justify-start'
// //                 }`}
// //               >
// //                 <div
// //                   className={`max-w-[80%] rounded-lg px-4 py-2 text-xs ${
// //                     message.sender === 'user'
// //                       ? 'bg-teal-700 text-white'
// //                       : 'bg-white border border-gray-200'
// //                   }`}
// //                 >
// //                   {/* Display message text or schema table */}
// //                   {schemaData ? (
// //                     <SchemaTable schema={schemaData} />
// //                   ) : (
// //                     <pre className="whitespace-pre-wrap font-sans">{message.text}</pre>
// //                   )}

// //                   {/* Display timestamp */}
// //                   <div
// //                     className={`text-[10px] mt-1 ${
// //                       message.sender === 'user' ? 'text-teal-300' : 'text-gray-400'
// //                     }`}
// //                   >
// //                     {message.timestamp}
// //                   </div>

// //                   {/* Render buttons if the message includes them */}
// //                   {message.button && (
// //                     <div className="mt-2 flex gap-2">
// //                       {isGeneratingNotebook ? (
// //                         <button
// //                           disabled
// //                           className="flex items-center gap-2 px-4 py-2 bg-teal-500 text-white text-xs rounded"
// //                         >
// //                           <FiLoader className="animate-spin" /> Generating...
// //                         </button>
// //                       ) : notebookGenerated ? (
// //                         <button
// //                           onClick={handleOpenNotebook}
// //                           className="px-4 py-2 bg-teal-500 text-white text-xs rounded hover:bg-teal-600"
// //                         >
// //                           Open Notebook
// //                         </button>
// //                       ) : (
// //                         <button
// //                           onClick={handleGenerateNotebook}
// //                           className="px-4 py-2 bg-teal-500 text-white text-xs rounded hover:bg-teal-600"
// //                         >
// //                           Generate Notebook
// //                         </button>
// //                       )}
// //                     </div>
// //                   )}
// //                 </div>
// //               </div>
// //             );
// //           })}

// //           {/* Loading Indicator for Assistant Typing */}
// //           {isLoading && (
// //             <div className="mb-4 flex justify-start">
// //               <div className="max-w-[80%] rounded-lg px-4 py-2 text-xs bg-white border border-gray-200 flex items-center">
// //                 <FiLoader className="animate-spin mr-2" /> Typing...
// //               </div>
// //             </div>
// //           )}
// //         </div>

// //         {/* Attachments Preview */}
// //         {isUploading && (
// //           <div className="px-4 py-2 border-t border-gray-200 bg-gray-50 text-teal-700 text-xs flex items-center gap-2">
// //             <FiLoader className="animate-spin" /> Uploading files...
// //           </div>
// //         )}
// //         {selectedFiles && selectedFiles.length > 0 && (
// //           <div className="px-4 py-2 border-t border-gray-200 bg-gray-50">
// //             <div className="flex flex-wrap gap-2">
// //               {Array.from(selectedFiles).map((file) => (
// //                 <div
// //                   key={uuidv4()}
// //                   className="flex flex-col gap-2 bg-white px-2 py-2 rounded border text-xs"
// //                 >
// //                   <div className="truncate max-w-[150px]">
// //                     <strong>{file.name}</strong> ({(file.size / 1024).toFixed(1)} KB)
// //                   </div>
// //                 </div>
// //               ))}
// //             </div>
// //             <button
// //               onClick={handleFileUpload}
// //               className="mt-2 px-4 py-2 bg-teal-700 text-white text-xs rounded hover:bg-teal-800"
// //             >
// //               Upload Files
// //             </button>
// //           </div>
// //         )}

// //         {/* Input Area */}
// //         <div className="p-4 border-t border-gray-200 bg-white">
// //           <div className="flex items-center gap-2">
// //             {/* File Attachment Button */}
// //             <label className="cursor-pointer text-gray-400 hover:text-gray-600">
// //               <input
// //                 type="file"
// //                 multiple
// //                 className="hidden"
// //                 onChange={handleFileSelect}
// //               />
// //               <FiPaperclip size={16} />
// //             </label>

// //             {/* Message Input */}
// //             <input
// //               type="text"
// //               value={inputMessage}
// //               onChange={(e) => setInputMessage(e.target.value)}
// //               onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
// //               placeholder="Type your message..."
// //               className="flex-1 text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:border-teal-400"
// //             />

// //             {/* Send Button */}
// //             <button
// //               onClick={handleSendMessage}
// //               className="text-teal-700 hover:text-teal-800"
// //             >
// //               <FiSend size={16} />
// //             </button>
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default ChatInterface;



// import React, { useState, useEffect, useRef } from 'react';
// import {
//   FiPlus,
//   FiMenu,
//   FiPaperclip,
//   FiSend,
//   FiTrash,
//   FiLoader,
// } from 'react-icons/fi';
// import { motion, AnimatePresence } from 'framer-motion';
// import { v4 as uuidv4 } from 'uuid';
// import { useNavigate } from 'react-router-dom';

// /**
//  * Message Interface
//  * Represents a single message in the chat.
//  */
// interface Message {
//   id: string;
//   sender: 'user' | 'assistant';
//   text: string;
//   timestamp: string;
//   button?: boolean; // Flag to render a button (e.g., Generate Notebook)
//   isSchema?: boolean; // Flag to indicate if the message contains schema data
// }

// /**
//  * Chat Interface
//  * Represents a single chat session.
//  */
// interface Chat {
//   id: string;
//   title: string;
//   timestamp: string;
//   messages: Message[];
// }

// /**
//  * SchemaTable Component
//  * Renders a JSON schema as a table.
//  */
// const SchemaTable: React.FC<{ schema: any }> = ({ schema }) => {
//   if (!Array.isArray(schema) && typeof schema === 'object') {
//     // If schema is an object with fields and types
//     const headers = Object.keys(schema);
//     return (
//       <div className="overflow-x-auto mt-2">
//         <table className="min-w-full border-collapse">
//           <thead>
//             <tr>
//               {headers.map((header) => (
//                 <th
//                   key={header}
//                   className="px-4 py-2 border-b bg-gray-100 text-left text-xs font-medium text-gray-700 uppercase tracking-wider"
//                 >
//                   {header}
//                 </th>
//               ))}
//             </tr>
//           </thead>
//           <tbody>
//             <tr>
//               {headers.map((header) => (
//                 <td
//                   key={header}
//                   className="px-4 py-2 border-b text-xs text-gray-600"
//                 >
//                   {schema[header]}
//                 </td>
//               ))}
//             </tr>
//           </tbody>
//         </table>
//       </div>
//     );
//   } else if (Array.isArray(schema)) {
//     // If schema is an array of objects
//     const headers = Object.keys(schema[0]);
//     return (
//       <div className="overflow-x-auto mt-2">
//         <table className="min-w-full border-collapse">
//           <thead>
//             <tr>
//               {headers.map((header) => (
//                 <th
//                   key={header}
//                   className="px-4 py-2 border-b bg-gray-100 text-left text-xs font-medium text-gray-700 uppercase tracking-wider"
//                 >
//                   {header}
//                 </th>
//               ))}
//             </tr>
//           </thead>
//           <tbody>
//             {schema.map((row: any, index: number) => (
//               <tr
//                 key={index}
//                 className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}
//               >
//                 {headers.map((header) => (
//                   <td
//                     key={header}
//                     className="px-4 py-2 border-b text-xs text-gray-600"
//                   >
//                     {row[header]}
//                   </td>
//                 ))}
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     );
//   } else {
//     // If schema is not recognized, display as preformatted text
//     return (
//       <pre className="font-sans whitespace-pre-wrap mt-2">
//         {JSON.stringify(schema, null, 2)}
//       </pre>
//     );
//   }
// };

// /**
//  * AnimatedMessage Component
//  * Displays text with a typing animation.
//  */
// const AnimatedMessage: React.FC<{ text: string }> = ({ text }) => {
//   const [displayedText, setDisplayedText] = useState('');
//   const indexRef = useRef(0);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setDisplayedText((prev) => prev + text.charAt(indexRef.current));
//       indexRef.current += 1;
//       if (indexRef.current >= text.length) {
//         clearInterval(interval);
//       }
//     }, 10); // Adjust typing speed here (milliseconds per character)

//     return () => clearInterval(interval);
//   }, [text]);

//   return <pre className="whitespace-pre-wrap font-sans">{displayedText}</pre>;
// };

// const ChatInterface: React.FC = () => {
//   // Default assistant message
//   const defaultMessage = `Hi! 👋 I'm your AI assistant.\nI'll assist you in formulating a predictive question. I'll then create a SQL notebook to build a training set.\nSo, what would you like to predict?`;

//   // State for all chats
//   const [chats, setChats] = useState<Chat[]>([
//     {
//       id: '1',
//       title: 'New Prediction',
//       timestamp: new Date().toLocaleString(),
//       messages: [
//         {
//           id: uuidv4(),
//           sender: 'assistant',
//           text: defaultMessage,
//           timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
//         },
//       ],
//     },
//   ]);

//   // State for the currently selected chat
//   const [currentChat, setCurrentChat] = useState<Chat | null>(chats[0]);

//   // State to control the visibility of the sidebar
//   const [showSidebar, setShowSidebar] = useState(true);

//   // State for the input message
//   const [inputMessage, setInputMessage] = useState('');

//   // State for selected files to upload
//   const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);

//   // State for loading indicators
//   const [isLoading, setIsLoading] = useState(false);
//   const [isUploading, setIsUploading] = useState(false);

//   // State for notebook generation
//   const [isGeneratingNotebook, setIsGeneratingNotebook] = useState(false);
//   const [notebookGenerated, setNotebookGenerated] = useState(false);
//   const [generatedNotebookData, setGeneratedNotebookData] = useState<any>(null);

//   // Import useNavigate from react-router-dom to navigate
//   const navigate = useNavigate();

//   /**
//    * Handles creating a new chat.
//    */
//   const handleNewChat = () => {
//     const newChat: Chat = {
//       id: uuidv4(),
//       title: 'New Prediction',
//       timestamp: new Date().toLocaleString(),
//       messages: [
//         {
//           id: uuidv4(),
//           sender: 'assistant',
//           text: defaultMessage,
//           timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
//         },
//       ],
//     };
//     setChats((prev) => [newChat, ...prev]);
//     setCurrentChat(newChat);

//     // Reset notebook states for the new chat
//     setIsGeneratingNotebook(false);
//     setNotebookGenerated(false);
//     setGeneratedNotebookData(null);
//   };

//   /**
//    * Handles selecting files for upload.
//    * @param e - Change event from the file input.
//    */
//   const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const files = e.target.files;
//     if (files && files.length > 0) {
//       setSelectedFiles(files);
//     }
//   };

//   /**
//    * Handles uploading selected files to the backend.
//    */
//   const handleFileUpload = async () => {
//     if (!selectedFiles || selectedFiles.length === 0) {
//       alert('No files selected.');
//       return;
//     }

//     setIsUploading(true);

//     try {
//       const formData = new FormData();

//       // Append all selected files to FormData
//       Array.from(selectedFiles).forEach((file) => {
//         formData.append('file', file);
//       });

//       const response = await fetch('http://localhost:8000/api/chatgpt/', {
//         method: 'POST',
//         body: formData,
//       });

//       if (!response.ok) {
//         throw new Error(`Failed to upload file: ${response.statusText}`);
//       }

//       const data = await response.json();
//       console.log('[DEBUG] File upload response:', data); // Log response to verify structure

//       // Handle 'chat_message' for schema display
//       if (data.chat_message) {
//         let schema = null;
//         let isSchema = false;

//         // Attempt to parse chat_message as JSON schema
//         try {
//           schema = JSON.parse(data.chat_message);
//           isSchema = true;
//         } catch (e) {
//           // If parsing fails, treat as plain text
//           schema = data.chat_message;
//           isSchema = false;
//         }

//         const schemaMessage: Message = {
//           id: uuidv4(),
//           sender: 'assistant',
//           text: data.chat_message,
//           timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
//           isSchema: isSchema,
//         };

//         // Update current chat state and all chats state to include the new schema message
//         setCurrentChat((prevChat) => {
//           if (!prevChat) return null;
//           const updatedMessages = [...prevChat.messages, schemaMessage];
//           return { ...prevChat, messages: updatedMessages };
//         });

//         setChats((prevChats) =>
//           prevChats.map((chat) =>
//             chat.id === currentChat?.id
//               ? { ...chat, messages: [...chat.messages, schemaMessage] }
//               : chat
//           )
//         );
//       } else {
//         console.error('[ERROR] Invalid response format:', data);
//       }
//     } catch (error) {
//       console.error('[ERROR] File upload error:', error);
//       const errorMessage: Message = {
//         id: uuidv4(),
//         sender: 'assistant',
//         text: `Upload Error: ${error instanceof Error ? error.message : 'Unknown error'}`,
//         timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
//       };

//       setCurrentChat((prevChat) => {
//         if (!prevChat) return null;
//         const updatedMessages = [...prevChat.messages, errorMessage];
//         return { ...prevChat, messages: updatedMessages };
//       });

//       setChats((prevChats) =>
//         prevChats.map((chat) =>
//           chat.id === currentChat?.id
//             ? { ...chat, messages: [...chat.messages, errorMessage] }
//             : chat
//         )
//       );
//     } finally {
//       setSelectedFiles(null);
//       setIsUploading(false);
//     }
//   };

//   /**
//    * Handles sending a message.
//    */
//   const handleSendMessage = async () => {
//     if (!inputMessage.trim()) return;
//     if (!currentChat) return;

//     // Create a user message
//     const userMessage: Message = {
//       id: uuidv4(),
//       sender: 'user',
//       text: inputMessage,
//       timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
//     };

//     // Append the user message to the current chat
//     const updatedChat = {
//       ...currentChat,
//       messages: [...currentChat.messages, userMessage],
//     };

//     setChats((prevChats) =>
//       prevChats.map((chat) => (chat.id === currentChat.id ? updatedChat : chat))
//     );

//     setCurrentChat(updatedChat);
//     setInputMessage('');
//     setIsLoading(true);

//     try {
//       // Send the chat message to the backend, including user_id
//       const response = await fetch('http://localhost:8000/api/chatgpt/', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ message: inputMessage, user_id: 'default_user' }), // Replace 'default_user' with actual user_id if available
//       });

//       if (!response.ok) {
//         throw new Error(`Failed to send message: ${response.statusText}`);
//       }

//       const data = await response.json();

//       // Initialize variables
//       let botText = data.response;
//       let showGenerateButton = data.show_generate_notebook || false;

//       // Create an assistant message with the response
//       const botMessage: Message = {
//         id: uuidv4(),
//         sender: 'assistant',
//         text: botText,
//         timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
//         button: showGenerateButton,
//       };

//       // Append the assistant message to the current chat
//       const updatedMessages = [...updatedChat.messages, botMessage];

//       setChats((prevChats) =>
//         prevChats.map((chat) =>
//           chat.id === currentChat.id
//             ? { ...chat, messages: [...updatedMessages] }
//             : chat
//         )
//       );

//       setCurrentChat((prevChat) =>
//         prevChat
//           ? { ...prevChat, messages: [...updatedMessages] }
//           : null
//       );

//       // Reset notebook states if a new response is received
//       setIsGeneratingNotebook(false);
//       setNotebookGenerated(false);
//       setGeneratedNotebookData(null);
//     } catch (error) {
//       console.error('[ERROR] Error sending message:', error);
//       const errorMessage: Message = {
//         id: uuidv4(),
//         sender: 'assistant',
//         text: 'Sorry, I encountered an issue. Please try again later.',
//         timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
//       };

//       // Append the error message to the current chat
//       setChats((prevChats) =>
//         prevChats.map((chat) =>
//           chat.id === currentChat.id
//             ? { ...chat, messages: [...chat.messages, errorMessage] }
//             : chat
//         )
//       );
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   /**
//    * Handles generating the notebook.
//    */
//   const handleGenerateNotebook = async () => {
//     if (!currentChat) return;

//     setIsGeneratingNotebook(true);

//     try {
//       const response = await fetch('http://localhost:8000/api/chatgpt/', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ action: 'generate_notebook', user_id: 'default_user' }),
//       });

//       if (!response.ok) {
//         throw new Error(`Failed to generate notebook: ${response.statusText}`);
//       }

//       const data = await response.json();
//       console.log('[DEBUG] Notebook generated:', data);

//       if (data.notebooks) {
//         setGeneratedNotebookData(data.notebooks);
//         setNotebookGenerated(true);

//         // Optionally, you can append a message indicating notebook generation is complete
//         const notebookMessage: Message = {
//           id: uuidv4(),
//           sender: 'assistant',
//           text: 'Notebook has been generated successfully.',
//           timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
//         };

//         setChats((prevChats) =>
//           prevChats.map((chat) =>
//             chat.id === currentChat.id
//               ? { ...chat, messages: [...chat.messages, notebookMessage] }
//               : chat
//           )
//         );

//         setCurrentChat((prevChat) =>
//           prevChat
//             ? { ...prevChat, messages: [...prevChat.messages, notebookMessage] }
//             : null
//         );
//       } else {
//         alert('Error generating notebook. Please try again.');
//       }
//     } catch (error) {
//       console.error('[ERROR] Error generating notebook:', error);
//       alert('Error generating notebook. Please try again.');
//     } finally {
//       setIsGeneratingNotebook(false);
//     }
//   };

//   /**
//    * Handles opening the notebook.
//    */
//   const handleOpenNotebook = () => {
//     if (generatedNotebookData) {
//       navigate('/notebook', { state: { notebooks: generatedNotebookData } });
//     } else {
//       alert('No notebook data available.');
//     }
//   };

//   /**
//    * Handles resetting the conversation.
//    */
//   const handleReset = async () => {
//     // Send reset action to backend
//     await fetch('http://localhost:8000/api/chatgpt/', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ action: 'reset', user_id: 'default_user' }),
//     });

//     // Reset the chat
//     setCurrentChat((prevChat) =>
//       prevChat
//         ? {
//             ...prevChat,
//             messages: [
//               {
//                 id: uuidv4(),
//                 sender: 'assistant',
//                 text: defaultMessage,
//                 timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
//               },
//             ],
//           }
//         : null
//     );

//     // Reset notebook states
//     setIsGeneratingNotebook(false);
//     setNotebookGenerated(false);
//     setGeneratedNotebookData(null);
//   };

//   /**
//    * Helper function to determine if a message contains a JSON schema.
//    */
//   const parseSchema = (message: Message): any | null => {
//     if (!message.isSchema) return null;

//     try {
//       const parsed = JSON.parse(message.text);
//       // Check if parsed data is an object or array suitable for table display
//       if (typeof parsed === 'object') {
//         return parsed;
//       }
//       return null;
//     } catch (e) {
//       return null;
//     }
//   };

//   /**
//    * Scroll to the bottom of the messages when new messages arrive.
//    */
//   const messagesEndRef = useRef<HTMLDivElement | null>(null);
//   const scrollToBottom = () => {
//     messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
//   };

//   useEffect(() => {
//     scrollToBottom();
//   }, [currentChat?.messages, isLoading, isUploading]);

//   return (
//     <div className="h-screen flex bg-gray-50">
//       {/* Sidebar for Chat History */}
//       <AnimatePresence>
//         {showSidebar && (
//           <motion.div
//             initial={{ x: -240 }}
//             animate={{ x: 0 }}
//             exit={{ x: -240 }}
//             transition={{ duration: 0.2 }}
//             className="w-60 border-r border-gray-200 bg-white"
//           >
//             {/* Sidebar Header */}
//             <div className="p-3 border-b border-gray-100 flex justify-between items-center">
//               <span className="text-xs font-medium text-gray-600">Chat History</span>
//               <button
//                 onClick={handleNewChat}
//                 className="text-xs flex items-center gap-1 text-teal-700 hover:text-teal-800"
//               >
//                 <FiPlus size={12} /> New
//               </button>
//             </div>
//             {/* Chat List */}
//             <div className="overflow-y-auto h-[calc(100vh-49px)]">
//               {chats.map((chat) => (
//                 <div
//                   key={chat.id}
//                   onClick={() => setCurrentChat(chat)}
//                   className={`p-2 mx-2 my-1 rounded text-xs cursor-pointer flex items-center justify-between group ${
//                     currentChat?.id === chat.id
//                       ? 'bg-teal-50 text-teal-700'
//                       : 'hover:bg-gray-50'
//                   }`}
//                 >
//                   <div className="truncate flex-1">
//                     <div className="font-medium truncate">{chat.title}</div>
//                     <div className="text-[10px] text-gray-400">{chat.timestamp}</div>
//                   </div>
//                   <button
//                     onClick={(e) => {
//                       e.stopPropagation();
//                       setChats((prev) => prev.filter((c) => c.id !== chat.id));
//                       if (currentChat?.id === chat.id) {
//                         setCurrentChat(null);
//                       }
//                     }}
//                     className="opacity-0 group-hover:opacity-100 p-1 hover:text-red-500"
//                   >
//                     <FiTrash size={12} />
//                   </button>
//                 </div>
//               ))}
//             </div>
//           </motion.div>
//         )}
//       </AnimatePresence>

//       {/* Main Chat Area */}
//       <div className="flex-1 flex flex-col">
//         {/* Header */}
//         <div className="h-12 border-b border-gray-200 flex items-center px-4 bg-white">
//           <button
//             onClick={() => setShowSidebar(!showSidebar)}
//             className="text-gray-500 hover:text-gray-700"
//           >
//             <FiMenu size={16} />
//           </button>
//           <span className="ml-4 text-sm font-medium">
//             {currentChat?.title || 'Select a chat'}
//           </span>
//           <div className="ml-auto">
//             <button
//               onClick={handleReset}
//               className="text-xs text-red-500 hover:text-red-600 flex items-center gap-1"
//             >
//               <FiTrash size={12} /> Reset
//             </button>
//           </div>
//         </div>

//         {/* Messages */}
//         <div className="flex-1 overflow-y-auto px-4 py-6">
//           {currentChat?.messages.map((message) => {
//             const schemaData = parseSchema(message);
//             return (
//               <div
//                 key={message.id}
//                 className={`mb-4 flex ${
//                   message.sender === 'user' ? 'justify-end' : 'justify-start'
//                 }`}
//               >
//                 <div
//                   className={`max-w-[80%] rounded-lg px-4 py-2 text-xs ${
//                     message.sender === 'user'
//                       ? 'bg-teal-700 text-white'
//                       : 'bg-white border border-gray-200'
//                   }`}
//                 >
//                   {/* Display message text or schema table */}
//                   {message.sender === 'assistant' && !schemaData ? (
//                     <AnimatedMessage text={message.text} />
//                   ) : schemaData ? (
//                     <SchemaTable schema={schemaData} />
//                   ) : (
//                     <pre className="whitespace-pre-wrap font-sans">{message.text}</pre>
//                   )}

//                   {/* Display timestamp */}
//                   <div
//                     className={`text-[10px] mt-1 ${
//                       message.sender === 'user' ? 'text-teal-300' : 'text-gray-400'
//                     }`}
//                   >
//                     {message.timestamp}
//                   </div>

//                   {/* Render buttons if the message includes them */}
//                   {message.button && (
//                     <div className="mt-2 flex gap-2">
//                       {isGeneratingNotebook ? (
//                         <button
//                           disabled
//                           className="flex items-center gap-2 px-4 py-2 bg-teal-500 text-white text-xs rounded"
//                         >
//                           <FiLoader className="animate-spin" /> Generating...
//                         </button>
//                       ) : notebookGenerated ? (
//                         <button
//                           onClick={handleOpenNotebook}
//                           className="px-4 py-2 bg-teal-500 text-white text-xs rounded hover:bg-teal-600"
//                         >
//                           Open Notebook
//                         </button>
//                       ) : (
//                         <button
//                           onClick={handleGenerateNotebook}
//                           className="px-4 py-2 bg-teal-500 text-white text-xs rounded hover:bg-teal-600"
//                         >
//                           Generate Notebook
//                         </button>
//                       )}
//                     </div>
//                   )}
//                 </div>
//               </div>
//             );
//           })}

//           {/* Loading Indicator for Assistant Typing */}
//           {isLoading && (
//             <div className="mb-4 flex justify-start">
//               <div className="max-w-[80%] rounded-lg px-4 py-2 text-xs bg-white border border-gray-200 flex items-center">
//                 <FiLoader className="animate-spin mr-2" /> Typing...
//               </div>
//             </div>
//           )}

//           {/* Reference div for scrolling */}
//           <div ref={messagesEndRef} />
//         </div>

//         {/* Attachments Preview */}
//         {isUploading && (
//           <div className="px-4 py-2 border-t border-gray-200 bg-gray-50 text-teal-700 text-xs flex items-center gap-2">
//             <FiLoader className="animate-spin" /> Uploading files...
//           </div>
//         )}
//         {selectedFiles && selectedFiles.length > 0 && (
//           <div className="px-4 py-2 border-t border-gray-200 bg-gray-50">
//             <div className="flex flex-wrap gap-2">
//               {Array.from(selectedFiles).map((file) => (
//                 <div
//                   key={uuidv4()}
//                   className="flex flex-col gap-2 bg-white px-2 py-2 rounded border text-xs"
//                 >
//                   <div className="truncate max-w-[150px]">
//                     <strong>{file.name}</strong> ({(file.size / 1024).toFixed(1)} KB)
//                   </div>
//                 </div>
//               ))}
//             </div>
//             <button
//               onClick={handleFileUpload}
//               className="mt-2 px-4 py-2 bg-teal-700 text-white text-xs rounded hover:bg-teal-800"
//             >
//               Upload Files
//             </button>
//           </div>
//         )}

//         {/* Input Area */}
//         <div className="p-4 border-t border-gray-200 bg-white">
//           <div className="flex items-center gap-2">
//             {/* File Attachment Button */}
//             <label className="cursor-pointer text-gray-400 hover:text-gray-600">
//               <input
//                 type="file"
//                 multiple
//                 className="hidden"
//                 onChange={handleFileSelect}
//               />
//               <FiPaperclip size={16} />
//             </label>

//             {/* Message Input */}
//             <input
//               type="text"
//               value={inputMessage}
//               onChange={(e) => setInputMessage(e.target.value)}
//               onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
//               placeholder="Type your message..."
//               className="flex-1 text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:border-teal-400"
//             />

//             {/* Send Button */}
//             <button
//               onClick={handleSendMessage}
//               className="text-teal-700 hover:text-teal-800"
//             >
//               <FiSend size={16} />
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ChatInterface;




import React, { useState, useEffect, useRef } from 'react';
import {
  FiPlus,
  FiMenu,
  FiPaperclip,
  FiSend,
  FiTrash,
  FiLoader,
} from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import { v4 as uuidv4 } from 'uuid';
import { useNavigate } from 'react-router-dom';

/**
 * Message Interface
 * Represents a single message in the chat.
 */
interface Message {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  button?: boolean; // Flag to render a button (e.g., Generate Notebook)
  isSchema?: boolean; // Flag to indicate if the message contains schema data
  schema?: Array<{ column_name: string; data_type: string }>; // Array of schema objects
}

/**
 * Chat Interface
 * Represents a single chat session.
 */
interface Chat {
  id: string;
  title: string;
  timestamp: string;
  messages: Message[];
}

/**
 * SchemaTable Component
 * Renders a JSON schema as a two-column table with "Field" and "Data Type".
 */
const SchemaTable: React.FC<{ schema: Array<{ column_name: string; data_type: string }> }> = ({ schema }) => {
  return (
    <div className="overflow-x-auto mt-2">
      <table className="min-w-full border-collapse">
        <thead>
          <tr>
            <th
              className="px-4 py-2 border-b bg-gray-100 text-left text-xs font-medium text-gray-700 uppercase tracking-wider"
            >
              Field
            </th>
            <th
              className="px-4 py-2 border-b bg-gray-100 text-left text-xs font-medium text-gray-700 uppercase tracking-wider"
            >
              Data Type
            </th>
          </tr>
        </thead>
        <tbody>
          {schema.map((field, index) => (
            <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
              <td className="px-4 py-2 border-b text-xs text-gray-600">{field.column_name}</td>
              <td className="px-4 py-2 border-b text-xs text-gray-600">{field.data_type}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

/**
 * AnimatedMessage Component
 * Displays text with a typing animation.
 */
const AnimatedMessage: React.FC<{ text: string }> = ({ text }) => {
  const [displayedText, setDisplayedText] = useState('');
  const indexRef = useRef(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setDisplayedText((prev) => prev + text.charAt(indexRef.current));
      indexRef.current += 1;
      if (indexRef.current >= text.length) {
        clearInterval(interval);
      }
    }, 9); // Adjust typing speed here (milliseconds per character)

    return () => clearInterval(interval);
  }, [text]);

  return <pre className="whitespace-pre-wrap font-sans">{displayedText}</pre>;
};

/**
 * Helper function to determine if a message contains schema data.
 */
const parseSchema = (message: Message): Array<{ column_name: string; data_type: string }> | null => {
  if (!message.isSchema || !message.schema) return null;
  return message.schema;
};

const ChatInterface: React.FC = () => {
  // Default assistant message
  const defaultMessage = `Hi! 👋 I'm your AI assistant.\nI'll assist you in formulating a predictive question. I'll then create a SQL notebook to build a training set.\nSo, what would you like to predict?`;

  // State for all chats
  const [chats, setChats] = useState<Chat[]>([
    {
      id: '1',
      title: 'New Prediction',
      timestamp: new Date().toLocaleString(),
      messages: [
        {
          id: uuidv4(),
          sender: 'assistant',
          text: defaultMessage,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ],
    },
  ]);

  // State for the currently selected chat
  const [currentChat, setCurrentChat] = useState<Chat | null>(chats[0]);

  // State to control the visibility of the sidebar
  const [showSidebar, setShowSidebar] = useState(true);

  // State for the input message
  const [inputMessage, setInputMessage] = useState('');

  // State for selected files to upload
  const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);

  // State for loading indicators
  const [isLoading, setIsLoading] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  // State for notebook generation
  const [isGeneratingNotebook, setIsGeneratingNotebook] = useState(false);
  const [notebookGenerated, setNotebookGenerated] = useState(false);
  const [generatedNotebookData, setGeneratedNotebookData] = useState<any>(null);

  // Import useNavigate from react-router-dom to navigate
  const navigate = useNavigate();

  /**
   * Handles creating a new chat.
   */
  const handleNewChat = () => {
    const newChat: Chat = {
      id: uuidv4(),
      title: 'New Prediction',
      timestamp: new Date().toLocaleString(),
      messages: [
        {
          id: uuidv4(),
          sender: 'assistant',
          text: defaultMessage,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ],
    };
    setChats((prev) => [newChat, ...prev]);
    setCurrentChat(newChat);

    // Reset notebook states for the new chat
    setIsGeneratingNotebook(false);
    setNotebookGenerated(false);
    setGeneratedNotebookData(null);
  };

  /**
   * Handles selecting files for upload.
   * @param e - Change event from the file input.
   */
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setSelectedFiles(files);
    }
  };

  /**
   * Handles uploading selected files to the backend.
   */
  const handleFileUpload = async () => {
    if (!selectedFiles || selectedFiles.length === 0) {
      alert('No files selected.');
      return;
    }

    setIsUploading(true);

    try {
      const formData = new FormData();

      // Append all selected files to FormData
      Array.from(selectedFiles).forEach((file) => {
        formData.append('file', file);
      });

      const response = await fetch('http://localhost:8000/api/chatgpt/', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`Failed to upload file: ${response.statusText}`);
      }

      const data = await response.json();
      console.log('[DEBUG] File upload response:', data); // Log response to verify structure

      // Handle 'uploaded_files' for schema display
      if (data.uploaded_files && data.uploaded_files.length > 0) {
        const uploadedFile = data.uploaded_files[0]; // Assuming single file upload
        const schema = uploadedFile.schema;
        const suggestions = uploadedFile.suggestions;

        if (schema && schema.length > 0) {
          // Create Schema Message
          const schemaMessage: Message = {
            id: uuidv4(),
            sender: 'assistant',
            text: 'Dataset uploaded successfully! Below is the schema:',
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            isSchema: true,
            schema: schema, // Pass the array of schema objects
          };

          // Create Confirmation Message
          const confirmationText = `
Suggested Target Column: ${suggestions.target_column}
Suggested Entity ID Column: ${suggestions.entity_id_column}
Suggested Feature Columns: ${suggestions.feature_columns.join(', ')}

Please confirm:
- Is the Target Column correct?
- Is the Entity ID Column correct?
(Reply 'yes' to confirm or provide the correct column names in the format 'Entity ID Column: <column_name>, Target Column: <column_name>')
          `.trim();

          const confirmationMessage: Message = {
            id: uuidv4(),
            sender: 'assistant',
            text: confirmationText,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          };

          // Update current chat state and all chats state to include both messages
          setCurrentChat((prevChat) => {
            if (!prevChat) return null;
            const updatedMessages = [...prevChat.messages, schemaMessage, confirmationMessage];
            return { ...prevChat, messages: updatedMessages };
          });

          setChats((prevChats) =>
            prevChats.map((chat) =>
              chat.id === currentChat?.id
                ? { ...chat, messages: [...chat.messages, schemaMessage, confirmationMessage] }
                : chat
            )
          );
        } else {
          console.error('[ERROR] Schema data is missing in the uploaded file information.');
        }
      } else {
        console.error('[ERROR] No uploaded_files data found in the response.');
      }
    } catch (error) {
      console.error('[ERROR] File upload error:', error);
      const errorMessage: Message = {
        id: uuidv4(),
        sender: 'assistant',
        text: `Upload Error: ${error instanceof Error ? error.message : 'Unknown error'}`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setCurrentChat((prevChat) => {
        if (!prevChat) return null;
        const updatedMessages = [...prevChat.messages, errorMessage];
        return { ...prevChat, messages: updatedMessages };
      });

      setChats((prevChats) =>
        prevChats.map((chat) =>
          chat.id === currentChat?.id
            ? { ...chat, messages: [...chat.messages, errorMessage] }
            : chat
        )
      );
    } finally {
      setSelectedFiles(null);
      setIsUploading(false);
    }
  };

  /**
   * Handles sending a message.
   */
  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;
    if (!currentChat) return;

    // Create a user message
    const userMessage: Message = {
      id: uuidv4(),
      sender: 'user',
      text: inputMessage,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    // Append the user message to the current chat
    const updatedChat = {
      ...currentChat,
      messages: [...currentChat.messages, userMessage],
    };

    setChats((prevChats) =>
      prevChats.map((chat) => (chat.id === currentChat.id ? updatedChat : chat))
    );

    setCurrentChat(updatedChat);
    setInputMessage('');
    setIsLoading(true);

    try {
      // Send the chat message to the backend, including user_id
      const response = await fetch('http://localhost:8000/api/chatgpt/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: inputMessage, user_id: 'default_user' }), // Replace 'default_user' with actual user_id if available
      });

      if (!response.ok) {
        throw new Error(`Failed to send message: ${response.statusText}`);
      }

      const data = await response.json();

      // Initialize variables
      let botText = data.response;
      let showGenerateButton = data.show_generate_notebook || false;

      // Create an assistant message with the response
      const botMessage: Message = {
        id: uuidv4(),
        sender: 'assistant',
        text: botText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        button: showGenerateButton,
      };

      // Append the assistant message to the current chat
      const updatedMessages = [...updatedChat.messages, botMessage];

      setChats((prevChats) =>
        prevChats.map((chat) =>
          chat.id === currentChat.id
            ? { ...chat, messages: [...updatedMessages] }
            : chat
        )
      );

      setCurrentChat((prevChat) =>
        prevChat
          ? { ...prevChat, messages: [...updatedMessages] }
          : null
      );

      // Reset notebook states if a new response is received
      setIsGeneratingNotebook(false);
      setNotebookGenerated(false);
      setGeneratedNotebookData(null);
    } catch (error) {
      console.error('[ERROR] Error sending message:', error);
      const errorMessage: Message = {
        id: uuidv4(),
        sender: 'assistant',
        text: 'Sorry, I encountered an issue. Please try again later.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      // Append the error message to the current chat
      setChats((prevChats) =>
        prevChats.map((chat) =>
          chat.id === currentChat.id
            ? { ...chat, messages: [...chat.messages, errorMessage] }
            : chat
        )
      );
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Handles generating the notebook.
   */
  const handleGenerateNotebook = async () => {
    if (!currentChat) return;

    setIsGeneratingNotebook(true);

    try {
      const response = await fetch('http://localhost:8000/api/chatgpt/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'generate_notebook', user_id: 'default_user' }),
      });

      if (!response.ok) {
        throw new Error(`Failed to generate notebook: ${response.statusText}`);
      }

      const data = await response.json();
      console.log('[DEBUG] Notebook generated:', data);

      if (data.notebooks) {
        setGeneratedNotebookData(data.notebooks);
        setNotebookGenerated(true);

        // Optionally, append a message indicating notebook generation is complete
        const notebookMessage: Message = {
          id: uuidv4(),
          sender: 'assistant',
          text: 'Notebook has been generated successfully.',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        };

        setChats((prevChats) =>
          prevChats.map((chat) =>
            chat.id === currentChat.id
              ? { ...chat, messages: [...chat.messages, notebookMessage] }
              : chat
          )
        );

        setCurrentChat((prevChat) =>
          prevChat
            ? { ...prevChat, messages: [...prevChat.messages, notebookMessage] }
            : null
        );
      } else {
        alert('Error generating notebook. Please try again.');
      }
    } catch (error) {
      console.error('[ERROR] Error generating notebook:', error);
      alert('Error generating notebook. Please try again.');
    } finally {
      setIsGeneratingNotebook(false);
    }
  };

  /**
   * Handles opening the notebook.
   */
  const handleOpenNotebook = () => {
    if (generatedNotebookData) {
      navigate('/notebook', { state: { notebooks: generatedNotebookData } });
    } else {
      alert('No notebook data available.');
    }
  };

  /**
   * Handles resetting the conversation.
   */
  const handleReset = async () => {
    // Send reset action to backend
    await fetch('http://localhost:8000/api/chatgpt/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'reset', user_id: 'default_user' }),
    });

    // Reset the chat
    setCurrentChat((prevChat) =>
      prevChat
        ? {
            ...prevChat,
            messages: [
              {
                id: uuidv4(),
                sender: 'assistant',
                text: defaultMessage,
                timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
              },
            ],
          }
        : null
    );

    // Reset notebook states
    setIsGeneratingNotebook(false);
    setNotebookGenerated(false);
    setGeneratedNotebookData(null);
  };

  /**
   * Scroll to the bottom of the messages when new messages arrive.
   */
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [currentChat?.messages, isLoading, isUploading]);

  return (
    <div className="h-screen flex bg-gray-50">
      {/* Sidebar for Chat History */}
      <AnimatePresence>
        {showSidebar && (
          <motion.div
            initial={{ x: -240 }}
            animate={{ x: 0 }}
            exit={{ x: -240 }}
            transition={{ duration: 0.2 }}
            className="w-60 border-r border-gray-200 bg-white"
          >
            {/* Sidebar Header */}
            <div className="p-3 border-b border-gray-100 flex justify-between items-center">
              <span className="text-xs font-medium text-gray-600">Chat History</span>
              <button
                onClick={handleNewChat}
                className="text-xs flex items-center gap-1 text-teal-700 hover:text-teal-800"
              >
                <FiPlus size={12} /> New
              </button>
            </div>
            {/* Chat List */}
            <div className="overflow-y-auto h-[calc(100vh-49px)]">
              {chats.map((chat) => (
                <div
                  key={chat.id}
                  onClick={() => setCurrentChat(chat)}
                  className={`p-2 mx-2 my-1 rounded text-xs cursor-pointer flex items-center justify-between group ${
                    currentChat?.id === chat.id
                      ? 'bg-teal-50 text-teal-700'
                      : 'hover:bg-gray-50'
                  }`}
                >
                  <div className="truncate flex-1">
                    <div className="font-medium truncate">{chat.title}</div>
                    <div className="text-[10px] text-gray-400">{chat.timestamp}</div>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setChats((prev) => prev.filter((c) => c.id !== chat.id));
                      if (currentChat?.id === chat.id) {
                        setCurrentChat(null);
                      }
                    }}
                    className="opacity-0 group-hover:opacity-100 p-1 hover:text-red-500"
                  >
                    <FiTrash size={12} />
                  </button>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="h-12 border-b border-gray-200 flex items-center px-4 bg-white">
          <button
            onClick={() => setShowSidebar(!showSidebar)}
            className="text-gray-500 hover:text-gray-700"
          >
            <FiMenu size={16} />
          </button>
          <span className="ml-4 text-sm font-medium">
            {currentChat?.title || 'Select a chat'}
          </span>
          <div className="ml-auto">
            <button
              onClick={handleReset}
              className="text-xs text-red-500 hover:text-red-600 flex items-center gap-1"
            >
              <FiTrash size={12} /> Reset
            </button>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-4 py-6">
          {currentChat?.messages.map((message) => {
            const schemaData = parseSchema(message);
            return (
              <div
                key={message.id}
                className={`mb-4 flex ${
                  message.sender === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                <div
                  className={`max-w-[80%] rounded-lg px-4 py-2 text-xs ${
                    message.sender === 'user'
                      ? 'bg-teal-700 text-white'
                      : 'bg-white border border-gray-200'
                  }`}
                >
                  {/* Display Schema Table and/or Confirmation Prompt */}
                  {message.isSchema && schemaData ? (
                    <>
                      <AnimatedMessage text={message.text} />
                      <SchemaTable schema={schemaData} />
                    </>
                  ) : (
                    <AnimatedMessage text={message.text} />
                  )}

                  {/* Display timestamp */}
                  <div
                    className={`text-[10px] mt-1 ${
                      message.sender === 'user' ? 'text-teal-300' : 'text-gray-400'
                    }`}
                  >
                    {message.timestamp}
                  </div>

                  {/* Render buttons if the message includes them */}
                  {message.button && (
                    <div className="mt-2 flex gap-2">
                      {isGeneratingNotebook ? (
                        <button
                          disabled
                          className="flex items-center gap-2 px-4 py-2 bg-teal-500 text-white text-xs rounded"
                        >
                          <FiLoader className="animate-spin" /> Generating...
                        </button>
                      ) : notebookGenerated ? (
                        <button
                          onClick={handleOpenNotebook}
                          className="px-4 py-2 bg-teal-500 text-white text-xs rounded hover:bg-teal-600"
                        >
                          Open Notebook
                        </button>
                      ) : (
                        <button
                          onClick={handleGenerateNotebook}
                          className="px-4 py-2 bg-teal-500 text-white text-xs rounded hover:bg-teal-600"
                        >
                          Generate Notebook
                        </button>
                      )}
                    </div>
                  )}
                </div>
              </div>
            );
          })}

          {/* Loading Indicator for Assistant Typing */}
          {isLoading && (
            <div className="mb-4 flex justify-start">
              <div className="max-w-[80%] rounded-lg px-4 py-2 text-xs bg-white border border-gray-200 flex items-center">
                <FiLoader className="animate-spin mr-2" /> Typing...
              </div>
            </div>
          )}

          {/* Reference div for scrolling */}
          <div ref={messagesEndRef} />
        </div>

        {/* Attachments Preview */}
        {isUploading && (
          <div className="px-4 py-2 border-t border-gray-200 bg-gray-50 text-teal-700 text-xs flex items-center gap-2">
            <FiLoader className="animate-spin" /> Uploading files...
          </div>
        )}
        {selectedFiles && selectedFiles.length > 0 && (
          <div className="px-4 py-2 border-t border-gray-200 bg-gray-50">
            <div className="flex flex-wrap gap-2">
              {Array.from(selectedFiles).map((file) => (
                <div
                  key={uuidv4()}
                  className="flex flex-col gap-2 bg-white px-2 py-2 rounded border text-xs"
                >
                  <div className="truncate max-w-[150px]">
                    <strong>{file.name}</strong> ({(file.size / 1024).toFixed(1)} KB)
                  </div>
                </div>
              ))}
            </div>
            <button
              onClick={handleFileUpload}
              className="mt-2 px-4 py-2 bg-teal-700 text-white text-xs rounded hover:bg-teal-800"
            >
              Upload Files
            </button>
          </div>
        )}

        {/* Input Area */}
        <div className="p-4 border-t border-gray-200 bg-white">
          <div className="flex items-center gap-2">
            {/* File Attachment Button */}
            <label className="cursor-pointer text-gray-400 hover:text-gray-600">
              <input
                type="file"
                multiple
                className="hidden"
                onChange={handleFileSelect}
              />
              <FiPaperclip size={16} />
            </label>

            {/* Message Input */}
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Type your message..."
              className="flex-1 text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:border-teal-400"
            />

            {/* Send Button */}
            <button
              onClick={handleSendMessage}
              className="text-teal-700 hover:text-teal-800"
            >
              <FiSend size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;
