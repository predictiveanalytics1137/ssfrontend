

// // // // import React, { useState } from 'react';
// // // // import { FiPlus, FiMenu, FiPaperclip, FiSend, FiX, FiTrash } from 'react-icons/fi';
// // // // import { motion, AnimatePresence } from 'framer-motion';
// // // // import { v4 as uuidv4 } from 'uuid';

// // // // interface Message {
// // // //   id: string;
// // // //   sender: 'user' | 'assistant';
// // // //   text: string;
// // // //   timestamp: string;
// // // // }

// // // // interface Chat {
// // // //   id: string;
// // // //   title: string;
// // // //   timestamp: string;
// // // //   messages: Message[];
// // // // }

// // // // interface FileAttachment {
// // // //   id: string;
// // // //   name: string;
// // // //   size: string;
// // // //   url: string;
// // // //   schema?: { column_name: string; data_type: string }[]; // Schema field
// // // // }

// // // // const ChatPage: React.FC = () => {
// // // //   const defaultMessage = `Hi! 👋 I'm your AI assistant.\nI'll assist you in formulating a predictive question. I'll then create a SQL notebook to build a training set.\nSo, what would you like to predict?`;

// // // //   const [chats, setChats] = useState<Chat[]>([
// // // //     {
// // // //       id: '1',
// // // //       title: 'New Prediction',
// // // //       timestamp: new Date().toLocaleString(),
// // // //       messages: [
// // // //         {
// // // //           id: uuidv4(),
// // // //           sender: 'assistant',
// // // //           text: defaultMessage,
// // // //           timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
// // // //         },
// // // //       ],
// // // //     },
// // // //   ]);

// // // //   const [currentChat, setCurrentChat] = useState<Chat | null>(chats[0]);
// // // //   const [showSidebar, setShowSidebar] = useState(true);
// // // //   const [inputMessage, setInputMessage] = useState('');
// // // //   const [attachments, setAttachments] = useState<FileAttachment[]>([]);
// // // //   const [isLoading, setIsLoading] = useState(false);
// // // //   const [isUploading, setIsUploading] = useState(false);

// // // //   const handleNewChat = () => {
// // // //     const newChat: Chat = {
// // // //       id: uuidv4(),
// // // //       title: 'New Prediction',
// // // //       timestamp: new Date().toLocaleString(),
// // // //       messages: [
// // // //         {
// // // //           id: uuidv4(),
// // // //           sender: 'assistant',
// // // //           text: defaultMessage,
// // // //           timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
// // // //         },
// // // //       ],
// // // //     };
// // // //     setChats((prev) => [newChat, ...prev]);
// // // //     setCurrentChat(newChat);
// // // //   };

// // // //   const handleDeleteChat = (chatId: string, e: React.MouseEvent) => {
// // // //     e.stopPropagation();
// // // //     setChats((prev) => prev.filter((chat) => chat.id !== chatId));
// // // //     if (currentChat?.id === chatId) {
// // // //       setCurrentChat(chats.find((chat) => chat.id !== chatId) || null);
// // // //     }
// // // //   };

// // // //   const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
// // // //     const files = Array.from(e.target.files || []);
// // // //     setIsUploading(true);

// // // //     for (const file of files) {
// // // //       const formData = new FormData();
// // // //       formData.append('file', file);

// // // //       try {
// // // //         const response = await fetch('http://localhost:8000/api/upload/', {
// // // //           method: 'POST',
// // // //           body: formData,
// // // //         });

// // // //         if (!response.ok) {
// // // //           const errorText = await response.text();
// // // //           console.error('Upload failed:', errorText);
// // // //           throw new Error(`Failed to upload file: ${response.statusText}`);
// // // //         }

// // // //         const result = await response.json();
// // // //         setAttachments((prev) => [
// // // //           ...prev,
// // // //           {
// // // //             id: result.id,
// // // //             name: result.name,
// // // //             size: `${(file.size / 1024).toFixed(1)} KB`,
// // // //             url: result.file_url,
// // // //             schema: result.schema, // Include schema from backend response
// // // //           },
// // // //         ]);

// // // //         alert(`File uploaded successfully: ${result.name}`);
// // // //       } catch (error) {
// // // //         console.error('Error uploading file:', error);
// // // //         alert('Error uploading file. Please try again.');
// // // //       }
// // // //     }

// // // //     setIsUploading(false);
// // // //   };

// // // //   const removeAttachment = async (id: string) => {
// // // //     const isConfirmed = window.confirm('Are you sure you want to delete this file? This action cannot be undone.');
// // // //     if (!isConfirmed) {
// // // //       return;
// // // //     }

// // // //     try {
// // // //       const response = await fetch(`http://localhost:8000/api/delete/${id}/`, {
// // // //         method: 'DELETE',
// // // //       });

// // // //       if (!response.ok) {
// // // //         const errorText = await response.text();
// // // //         console.error('Delete failed:', errorText);
// // // //         throw new Error(`Failed to delete file: ${response.statusText}`);
// // // //       }

// // // //       setAttachments((prev) => prev.filter((file) => file.id !== id));
// // // //     } catch (error) {
// // // //       console.error('Error deleting file:', error);
// // // //     }
// // // //   };

// // // //   const handleSendMessage = async () => {
// // // //     if (!inputMessage.trim() && attachments.length === 0) return;
// // // //     if (!currentChat) return;

// // // //     const newMessages: Message[] = [];

// // // //     if (inputMessage.trim()) {
// // // //       newMessages.push({
// // // //         id: uuidv4(),
// // // //         sender: 'user',
// // // //         text: inputMessage,
// // // //         timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
// // // //       });
// // // //     }

// // // //     let updatedChat = {
// // // //       ...currentChat,
// // // //       messages: [...currentChat.messages, ...newMessages],
// // // //     };

// // // //     setChats((prev) => prev.map((chat) => (chat.id === currentChat.id ? updatedChat : chat)));
// // // //     setCurrentChat(updatedChat);
// // // //     setInputMessage('');
// // // //     setIsLoading(true);

// // // //     try {
// // // //       const response = await fetch('http://localhost:8000/api/chat/', {
// // // //         method: 'POST',
// // // //         headers: { 'Content-Type': 'application/json' },
// // // //         body: JSON.stringify({
// // // //           user_id: currentChat?.id,
// // // //           message: inputMessage,
// // // //         }),
// // // //       });

// // // //       if (!response.ok) {
// // // //         throw new Error('Network response was not ok');
// // // //       }

// // // //       const data = await response.json();

// // // //       const botResponse: Message = {
// // // //         id: uuidv4(),
// // // //         sender: 'assistant',
// // // //         text: data.response,
// // // //         timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
// // // //       };

// // // //       updatedChat = {
// // // //         ...updatedChat,
// // // //         messages: [...updatedChat.messages, botResponse],
// // // //       };

// // // //       setChats((prev) => prev.map((chat) => (chat.id === currentChat.id ? updatedChat : chat)));
// // // //       setCurrentChat(updatedChat);
// // // //     } catch (error) {
// // // //       console.error('Error fetching response:', error);
// // // //     } finally {
// // // //       setIsLoading(false);
// // // //     }
// // // //   };

// // // //   return (
// // // //     <div className="h-screen flex bg-gray-50">
// // // //       {/* Sidebar */}
// // // //       <AnimatePresence>
// // // //         {showSidebar && (
// // // //           <motion.div
// // // //             initial={{ x: -240 }}
// // // //             animate={{ x: 0 }}
// // // //             exit={{ x: -240 }}
// // // //             transition={{ duration: 0.2 }}
// // // //             className="w-60 border-r border-gray-200 bg-white"
// // // //           >
// // // //             <div className="p-3 border-b border-gray-100 flex justify-between items-center">
// // // //               <span className="text-xs font-medium text-gray-600">Chat History</span>
// // // //               <button
// // // //                 onClick={handleNewChat}
// // // //                 className="text-xs flex items-center gap-1 text-teal-700 hover:text-teal-800"
// // // //               >
// // // //                 <FiPlus size={12} /> New
// // // //               </button>
// // // //             </div>
// // // //             <div className="overflow-y-auto h-[calc(100vh-49px)]">
// // // //               {chats.map((chat) => (
// // // //                 <div
// // // //                   key={chat.id}
// // // //                   onClick={() => setCurrentChat(chat)}
// // // //                   className={`p-2 mx-2 my-1 rounded text-xs cursor-pointer flex items-center justify-between group ${
// // // //                     currentChat?.id === chat.id ? 'bg-teal-50 text-teal-700' : 'hover:bg-gray-50'
// // // //                   }`}
// // // //                 >
// // // //                   <div className="truncate flex-1">
// // // //                     <div className="font-medium truncate">{chat.title}</div>
// // // //                     <div className="text-[10px] text-gray-400">{chat.timestamp}</div>
// // // //                   </div>
// // // //                   <button
// // // //                     onClick={(e) => handleDeleteChat(chat.id, e)}
// // // //                     className="opacity-0 group-hover:opacity-100 p-1 hover:text-red-500"
// // // //                   >
// // // //                     <FiTrash size={12} />
// // // //                   </button>
// // // //                 </div>
// // // //               ))}
// // // //             </div>
// // // //           </motion.div>
// // // //         )}
// // // //       </AnimatePresence>

// // // //       {/* Main Chat Area */}
// // // //       <div className="flex-1 flex flex-col">
// // // //         {/* Header */}
// // // //         <div className="h-12 border-b border-gray-200 flex items-center px-4 bg-white">
// // // //           <button
// // // //             onClick={() => setShowSidebar(!showSidebar)}
// // // //             className="text-gray-500 hover:text-gray-700"
// // // //           >
// // // //             <FiMenu size={16} />
// // // //           </button>
// // // //           <span className="ml-4 text-sm font-medium">{currentChat?.title || 'Select a chat'}</span>
// // // //         </div>

// // // //         {/* Messages */}
// // // //         <div className="flex-1 overflow-y-auto px-4 py-6">
// // // //           {currentChat?.messages.map((message) => (
// // // //             <div
// // // //               key={message.id}
// // // //               className={`mb-4 flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
// // // //             >
// // // //               <div
// // // //                 className={`max-w-[80%] rounded-lg px-4 py-2 text-xs ${
// // // //                   message.sender === 'user' ? 'bg-teal-700 text-white' : 'bg-white border border-gray-200'
// // // //                 }`}
// // // //               >
// // // //                 <pre className="whitespace-pre-wrap font-sans">{message.text}</pre>
// // // //                 <div
// // // //                   className={`text-[10px] mt-1 ${
// // // //                     message.sender === 'user' ? 'text-teal-300' : 'text-gray-400'
// // // //                   }`}
// // // //                 >
// // // //                   {message.timestamp}
// // // //                 </div>
// // // //               </div>
// // // //             </div>
// // // //           ))}
// // // //           {isLoading && (
// // // //             <div className="mb-4 flex justify-start">
// // // //               <div className="max-w-[80%] rounded-lg px-4 py-2 text-xs bg-white border border-gray-200">
// // // //                 <pre className="whitespace-pre-wrap font-sans">Typing...</pre>
// // // //               </div>
// // // //             </div>
// // // //           )}
// // // //         </div>

// // // //         {/* Attachments Preview */}
// // // //         {isUploading && (
// // // //           <div className="px-4 py-2 border-t border-gray-200 bg-gray-50 text-teal-700 text-xs">
// // // //             Uploading files...
// // // //           </div>
// // // //         )}
// // // //         {attachments.length > 0 && (
// // // //           <div className="px-4 py-2 border-t border-gray-200 bg-gray-50">
// // // //             <div className="flex flex-wrap gap-2">
// // // //               {attachments.map((file) => (
// // // //                 <div
// // // //                   key={file.id}
// // // //                   className="flex flex-col gap-2 bg-white px-2 py-2 rounded border text-xs"
// // // //                 >
// // // //                   <div className="truncate max-w-[150px]">
// // // //                     <strong>{file.name}</strong> ({file.size})
// // // //                   </div>
// // // //                   <p className="text-gray-500 truncate max-w-[150px]">
// // // //                     URL: <a href={file.url} target="_blank" rel="noopener noreferrer">{file.url}</a>
// // // //                   </p>
// // // //                   {/* Render schema if present */}
// // // //                   {file.schema && (
// // // //                     <div>
// // // //                       <h4 className="text-xs font-bold text-gray-600">Schema:</h4>
// // // //                       <ul className="list-disc list-inside">
// // // //                         {file.schema.map((col, index) => (
// // // //                           <li key={index} className="text-gray-500">
// // // //                             <strong>{col.column_name}</strong>: {col.data_type}
// // // //                           </li>
// // // //                         ))}
// // // //                       </ul>
// // // //                     </div>
// // // //                   )}
// // // //                   <button
// // // //                     onClick={() => removeAttachment(file.id)}
// // // //                     className="text-gray-400 hover:text-red-500 mt-2"
// // // //                   >
// // // //                     <FiX size={12} />
// // // //                   </button>
// // // //                 </div>
// // // //               ))}
// // // //             </div>
// // // //           </div>
// // // //         )}

// // // //         {/* Input Area */}
// // // //         <div className="p-4 border-t border-gray-200 bg-white">
// // // //           <div className="flex items-center gap-2">
// // // //             <label className="cursor-pointer text-gray-400 hover:text-gray-600">
// // // //               <input
// // // //                 type="file"
// // // //                 multiple
// // // //                 className="hidden"
// // // //                 onChange={handleFileUpload}
// // // //               />
// // // //               <FiPaperclip size={16} />
// // // //             </label>
// // // //             <input
// // // //               type="text"
// // // //               value={inputMessage}
// // // //               onChange={(e) => setInputMessage(e.target.value)}
// // // //               onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
// // // //               placeholder="Type your message..."
// // // //               className="flex-1 text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:border-teal-400"
// // // //             />
// // // //             <button
// // // //               onClick={handleSendMessage}
// // // //               className="text-teal-700 hover:text-teal-800"
// // // //             >
// // // //               <FiSend size={16} />
// // // //             </button>
// // // //           </div>
// // // //         </div>
// // // //       </div>
// // // //     </div>
// // // //   );
// // // // };

// // // // export default ChatPage;





// // // // # ===========================
// // // // # Below Merge code.
// // // // # ===========================




// // // ChatInterface.jsx

// // import React, { useState } from 'react';
// // import { FiPlus, FiMenu, FiPaperclip, FiSend, FiTrash } from 'react-icons/fi';
// // import { motion, AnimatePresence } from 'framer-motion';
// // import { v4 as uuidv4 } from 'uuid';

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
// //   };

// //   /**
// //    * Handles deleting a chat from the history.
// //    * @param chatId - ID of the chat to delete.
// //    * @param e - Event object.
// //    */
// //   const handleDeleteChat = (chatId: string, e: React.MouseEvent) => {
// //     e.stopPropagation(); // Prevent triggering the chat selection
// //     setChats((prev) => prev.filter((chat) => chat.id !== chatId));
// //     if (currentChat?.id === chatId) {
// //       setCurrentChat(chats.find((chat) => chat.id !== chatId) || null);
// //     }
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
// //   // const handleFileUpload = async () => {
// //   //   if (!selectedFiles || selectedFiles.length === 0) {
// //   //     alert('No files selected.');
// //   //     return;
// //   //   }

// //   //   setIsUploading(true);

// //   //   // Iterate through each selected file and upload
// //   //   for (let i = 0; i < selectedFiles.length; i++) {
// //   //     const file = selectedFiles[i];
// //   //     const formData = new FormData();
// //   //     formData.append('file', file);

// //   //     try {
// //   //       const response = await fetch('http://localhost:8000/api/chatgpt/', {
// //   //         method: 'POST',
// //   //         body: formData,
// //   //       });

// //   //       if (!response.ok) {
// //   //         throw new Error(`Failed to upload file: ${response.statusText}`);
// //   //       }

// //   //       const data = await response.json();

// //   //       // Create a message containing the schema details
// //   //       const schemaMessage: Message = {
// //   //         id: uuidv4(),
// //   //         sender: 'assistant',
// //   //         text: `Dataset '${data.uploaded_files[i].name}' uploaded successfully!\n\n` +
// //   //               `**Columns:** ${data.uploaded_files[i].schema.map((col: { column_name: any; }) => col.column_name).join(', ')}\n\n` +
// //   //               `**Data Types:**\n` +
// //   //               `${data.uploaded_files[i].schema.map((col: { column_name: any; data_type: any; }) => `${col.column_name}: ${col.data_type}`).join('\n')}\n\n` +
// //   //               `**Target Column Suggestion:** ${data.uploaded_files[i].suggestions.target_column}\n` +
// //   //               `**Entity ID Column Suggestion:** ${data.uploaded_files[i].suggestions.entity_id_column}\n\n` +
// //   //               `Please confirm:\n\n` +
// //   //               `- Is the Target Column correct?\n` +
// //   //               `- Is the Entity ID Column correct?\n` +
// //   //               `(Reply "yes" or provide the correct column names.)`,
// //   //         timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
// //   //       };

// //   //       // Append the schema message to the current chat
// //   //       setCurrentChat((prevChat) => {
// //   //         if (!prevChat) return null;
// //   //         const updatedMessages = [...prevChat.messages, schemaMessage];
// //   //         return { ...prevChat, messages: updatedMessages };
// //   //       });

// //   //       // Update the chats state with the new message
// //   //       setChats((prevChats) =>
// //   //         prevChats.map((chat) =>
// //   //           chat.id === currentChat?.id
// //   //             ? { ...chat, messages: [...chat.messages, schemaMessage] }
// //   //             : chat
// //   //         )
// //   //       );

// //   //     } catch (error) {
// //   //       console.error('File upload error:', error);
// //   //       const errorMessage: Message = {
// //   //         id: uuidv4(),
// //   //         sender: 'assistant',
// //   //         text: `Upload Error: ${error instanceof Error ? error.message : 'Unknown error'}`,
// //   //         timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
// //   //       };

// //   //       // Append the error message to the current chat
// //   //       setCurrentChat((prevChat) => {
// //   //         if (!prevChat) return null;
// //   //         const updatedMessages = [...prevChat.messages, errorMessage];
// //   //         return { ...prevChat, messages: updatedMessages };
// //   //       });

// //   //       // Update the chats state with the error message
// //   //       setChats((prevChats) =>
// //   //         prevChats.map((chat) =>
// //   //           chat.id === currentChat?.id
// //   //             ? { ...chat, messages: [...chat.messages, errorMessage] }
// //   //             : chat
// //   //         )
// //   //       );
// //   //     }
// //   //   }

// //   //   // Reset selected files after upload
// //   //   setSelectedFiles(null);
// //   //   setIsUploading(false);
// //   // };


// //   // Define TypeScript interfaces
// // interface UploadedFile {
// //   id: number;
// //   name: string;
// //   file_url: string;
// //   schema: SchemaColumn[];
// //   suggestions: Suggestions;
// // }

// // interface SchemaColumn {
// //   column_name: string;
// //   data_type: string;
// // }

// // interface Suggestions {
// //   target_column: string | null;
// //   entity_id_column: string | null;
// // }

// // const handleFileUpload = async () => {
// //   if (!selectedFiles || selectedFiles.length === 0) {
// //     alert('No files selected.');
// //     return;
// //   }

// //   setIsUploading(true);

// //   try {
// //     const formData = new FormData();

// //     // Append all selected files to FormData
// //     Array.from(selectedFiles).forEach((file) => {
// //       formData.append('file', file);
// //     });

// //     const response = await fetch('http://localhost:8000/api/chatgpt/', {
// //       method: 'POST',
// //       body: formData,
// //     });

// //     if (!response.ok) {
// //       throw new Error(`Failed to upload file: ${response.statusText}`);
// //     }

// //     const data = await response.json();
// //     console.log(data); // Log response to verify structure

// //     // Iterate over uploaded files in the response
// //     if (data.uploaded_files && Array.isArray(data.uploaded_files)) {
// //       data.uploaded_files.forEach((uploadedFile: UploadedFile) => {
// //         const schemaMessage: Message = {
// //           id: uuidv4(),
// //           sender: 'assistant',
// //           text: `Dataset '${uploadedFile.name}' uploaded successfully!\n\n` +
// //                 `**Columns:** ${uploadedFile.schema.map((col: SchemaColumn) => col.column_name).join(', ')}\n\n` +
// //                 `**Data Types:**\n` +
// //                 `${uploadedFile.schema.map((col: SchemaColumn) => `${col.column_name}: ${col.data_type}`).join('\n')}\n\n` +
// //                 `**Target Column Suggestion:** ${uploadedFile.suggestions.target_column || 'None'}\n` +
// //                 `**Entity ID Column Suggestion:** ${uploadedFile.suggestions.entity_id_column || 'None'}\n\n` +
// //                 `Please confirm:\n\n` +
// //                 `- Is the Target Column correct?\n` +
// //                 `- Is the Entity ID Column correct?\n` +
// //                 `(Reply "yes" or provide the correct column names.)`,
// //           timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
// //         };

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
// //       });
// //     } else {
// //       console.error('Invalid response format:', data);
// //     }
// //   } catch (error) {
// //     console.error('File upload error:', error);
// //     const errorMessage: Message = {
// //       id: uuidv4(),
// //       sender: 'assistant',
// //       text: `Upload Error: ${error instanceof Error ? error.message : 'Unknown error'}`,
// //       timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
// //     };

// //     setCurrentChat((prevChat) => {
// //       if (!prevChat) return null;
// //       const updatedMessages = [...prevChat.messages, errorMessage];
// //       return { ...prevChat, messages: updatedMessages };
// //     });

// //     setChats((prevChats) =>
// //       prevChats.map((chat) =>
// //         chat.id === currentChat?.id
// //           ? { ...chat, messages: [...chat.messages, errorMessage] }
// //           : chat
// //       )
// //     );
// //   } finally {
// //     setSelectedFiles(null);
// //     setIsUploading(false);
// //   }
// // };

  
// //   /**
// //    * Handles sending a chat message to the backend.
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
// //       // Send the chat message to the backend
// //       const response = await fetch('http://localhost:8000/api/chatgpt/', {
// //         method: 'POST',
// //         headers: { 'Content-Type': 'application/json' },
// //         body: JSON.stringify({ message: inputMessage }),
// //       });

// //       const data = await response.json();

// //       // Create an assistant message with the response
// //       const botMessage: Message = {
// //         id: uuidv4(),
// //         sender: 'assistant',
// //         text: data.response,
// //         timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
// //       };

// //       // If the response includes a prompt to generate a notebook, add a button
// //       if (data.response.toLowerCase().includes('proceed to model creation')) {
// //         botMessage.button = true;
// //       }

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

// //     } catch (error) {
// //       console.error('Error sending message:', error);
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
// //                     onClick={(e) => handleDeleteChat(chat.id, e)}
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
// //         </div>

// //         {/* Messages */}
// //         <div className="flex-1 overflow-y-auto px-4 py-6">
// //           {currentChat?.messages.map((message) => (
// //             <div
// //               key={message.id}
// //               className={`mb-4 flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
// //             >
// //               <div
// //                 className={`max-w-[80%] rounded-lg px-4 py-2 text-xs ${
// //                   message.sender === 'user' ? 'bg-teal-700 text-white' : 'bg-white border border-gray-200'
// //                 }`}
// //               >
// //                 {/* Display message text */}
// //                 <pre className="whitespace-pre-wrap font-sans">{message.text}</pre>

// //                 {/* Display timestamp */}
// //                 <div
// //                   className={`text-[10px] mt-1 ${
// //                     message.sender === 'user' ? 'text-teal-300' : 'text-gray-400'
// //                   }`}
// //                 >
// //                   {message.timestamp}
// //                 </div>

// //                 {/* Render button if the message includes it */}
// //                 {message.button && (
// //                   <button
// //                     className="mt-2 px-4 py-2 bg-teal-500 text-white text-xs rounded hover:bg-teal-600"
// //                     onClick={() => window.location.href = '/generate-notebook'}
// //                   >
// //                     Generate Notebook
// //                   </button>
// //                 )}
// //               </div>
// //             </div>
// //           ))}

// //           {/* Loading Indicator for Assistant Typing */}
// //           {isLoading && (
// //             <div className="mb-4 flex justify-start">
// //               <div className="max-w-[80%] rounded-lg px-4 py-2 text-xs bg-white border border-gray-200">
// //                 <pre className="whitespace-pre-wrap font-sans">Typing...</pre>
// //               </div>
// //             </div>
// //           )}
// //         </div>

// //         {/* Attachments Preview */}
// //         {isUploading && (
// //           <div className="px-4 py-2 border-t border-gray-200 bg-gray-50 text-teal-700 text-xs">
// //             Uploading files...
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



// // ChatInterface.jsx

// import React, { useState } from 'react';
// import { FiPlus, FiMenu, FiPaperclip, FiSend, FiTrash } from 'react-icons/fi';
// import { motion, AnimatePresence } from 'framer-motion';
// import { v4 as uuidv4 } from 'uuid';

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
//   };

//   /**
//    * Handles deleting a chat from the history.
//    * @param chatId - ID of the chat to delete.
//    * @param e - Event object.
//    */
//   const handleDeleteChat = (chatId: string, e: React.MouseEvent) => {
//     e.stopPropagation(); // Prevent triggering the chat selection
//     setChats((prev) => prev.filter((chat) => chat.id !== chatId));
//     if (currentChat?.id === chatId) {
//       setCurrentChat(chats.find((chat) => chat.id !== chatId) || null);
//     }
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
//    * Defines TypeScript interfaces for uploaded files.
//    */
//   interface UploadedFile {
//     file_name: string; // Original key maintained for chat services
//     s3_key: string;
//     table_name: string;
//     schema: SchemaColumn[];
//     suggestions: Suggestions;
//   }

//   interface SchemaColumn {
//     column_name: string;
//     data_type: string;
//   }

//   interface Suggestions {
//     target_column: string | null;
//     entity_id_column: string | null;
//   }

//   /**
//    * Handles uploading selected files to the backend.
//    */
//   // const handleFileUpload = async () => {
//   //   if (!selectedFiles || selectedFiles.length === 0) {
//   //     alert('No files selected.');
//   //     return;
//   //   }

//   //   setIsUploading(true);

//   //   try {
//   //     const formData = new FormData();

//   //     // Append all selected files to FormData
//   //     Array.from(selectedFiles).forEach((file) => {
//   //       formData.append('file', file);
//   //     });

//   //     const response = await fetch('http://localhost:8000/api/chatgpt/', {
//   //       method: 'POST',
//   //       body: formData,
//   //     });

//   //     if (!response.ok) {
//   //       throw new Error(`Failed to upload file: ${response.statusText}`);
//   //     }

//   //     const data = await response.json();
//   //     console.log(data); // Log response to verify structure

//   //     // Handle 'files' for chat services
//   //     if (data.files && Array.isArray(data.files)) {
//   //       data.files.forEach((uploadedFile: UploadedFile) => {
//   //         // Optionally, you can handle file-specific chat messages here
//   //         // For now, we'll keep chat services as they were
//   //         // If you need to display file upload confirmations, you can add messages here
//   //       });
//   //     }

//   //     // Handle 'chat_message' for schema display
//   //     if (data.chat_message) {
//   //       const schemaMessage: Message = {
//   //         id: uuidv4(),
//   //         sender: 'assistant',
//   //         text: data.chat_message,
//   //         timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
//   //       };

//   //       setCurrentChat((prevChat) => {
//   //         if (!prevChat) return null;
//   //         const updatedMessages = [...prevChat.messages, schemaMessage];
//   //         return { ...prevChat, messages: updatedMessages };
//   //       });

//   //       setChats((prevChats) =>
//   //         prevChats.map((chat) =>
//   //           chat.id === currentChat?.id
//   //             ? { ...chat, messages: [...chat.messages, schemaMessage] }
//   //             : chat
//   //         )
//   //       );
//   //     } else {
//   //       console.error('Invalid response format:', data);
//   //     }
//   //   } catch (error) {
//   //     console.error('File upload error:', error);
//   //     const errorMessage: Message = {
//   //       id: uuidv4(),
//   //       sender: 'assistant',
//   //       text: `Upload Error: ${error instanceof Error ? error.message : 'Unknown error'}`,
//   //       timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
//   //     };

//   //     setCurrentChat((prevChat) => {
//   //       if (!prevChat) return null;
//   //       const updatedMessages = [...prevChat.messages, errorMessage];
//   //       return { ...prevChat, messages: updatedMessages };
//   //     });

//   //     setChats((prevChats) =>
//   //       prevChats.map((chat) =>
//   //         chat.id === currentChat?.id
//   //           ? { ...chat, messages: [...chat.messages, errorMessage] }
//   //           : chat
//   //       )
//   //     );
//   //   } finally {
//   //     setSelectedFiles(null);
//   //     setIsUploading(false);
//   //   }
//   // };

//   /**
//  * Handles uploading selected files to the backend.
//  */
// const handleFileUpload = async () => {
//   if (!selectedFiles || selectedFiles.length === 0) {
//     alert('No files selected.');
//     return;
//   }

//   setIsUploading(true);

//   try {
//     const formData = new FormData();

//     // Append all selected files to FormData
//     Array.from(selectedFiles).forEach((file) => {
//       formData.append('file', file);
//     });

//     const response = await fetch('http://localhost:8000/api/chatgpt/', {
//       method: 'POST',
//       body: formData,
//     });

//     if (!response.ok) {
//       throw new Error(`Failed to upload file: ${response.statusText}`);
//     }

//     const data = await response.json();
//     console.log(data); // Log response to verify structure

//     // Handle 'files' for chat services
//     if (data.files && Array.isArray(data.files)) {
//       data.files.forEach((uploadedFile: UploadedFile) => {
//         // Optionally, you can handle file-specific chat messages here
//         // For now, we'll keep chat services as they were
//         // If you need to display file upload confirmations, you can add messages here
//       });
//     }

//     // Handle 'chat_message' for schema display
//     if (data.chat_message) {
//       const schemaMessage: Message = {
//         id: uuidv4(),
//         sender: 'assistant',
//         text: data.chat_message,
//         timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
//       };

//       // Update current chat state and all chats state to include the new schema message
//       setCurrentChat((prevChat) => {
//         if (!prevChat) return null;
//         const updatedMessages = [...prevChat.messages, schemaMessage];
//         return { ...prevChat, messages: updatedMessages };
//       });

//       setChats((prevChats) =>
//         prevChats.map((chat) =>
//           chat.id === currentChat?.id
//             ? { ...chat, messages: [...chat.messages, schemaMessage] }
//             : chat
//         )
//       );
//     } else {
//       console.error('Invalid response format:', data);
//     }
//   } catch (error) {
//     console.error('File upload error:', error);
//     const errorMessage: Message = {
//       id: uuidv4(),
//       sender: 'assistant',
//       text: `Upload Error: ${error instanceof Error ? error.message : 'Unknown error'}`,
//       timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
//     };

//     setCurrentChat((prevChat) => {
//       if (!prevChat) return null;
//       const updatedMessages = [...prevChat.messages, errorMessage];
//       return { ...prevChat, messages: updatedMessages };
//     });

//     setChats((prevChats) =>
//       prevChats.map((chat) =>
//         chat.id === currentChat?.id
//           ? { ...chat, messages: [...chat.messages, errorMessage] }
//           : chat
//       )
//     );
//   } finally {
//     setSelectedFiles(null);
//     setIsUploading(false);
//   }
// };


//   /**
//    * Handles sending a chat message to the backend.
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
//       // Send the chat message to the backend
//       const response = await fetch('http://localhost:8000/api/chatgpt/', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ message: inputMessage }),
//       });

//       if (!response.ok) {
//         throw new Error(`Failed to send message: ${response.statusText}`);
//       }

//       const data = await response.json();

//       // Create an assistant message with the response
//       const botMessage: Message = {
//         id: uuidv4(),
//         sender: 'assistant',
//         text: data.response,
//         timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
//       };

//       // If the response includes a prompt to generate a notebook, add a button
//       if (data.response.toLowerCase().includes('proceed to model creation')) {
//         botMessage.button = true;
//       }

//       // Append the assistant message to the current chat
//       const updatedMessages = [...updatedChat.messages, botMessage];

//       setChats((prevChats) =>
//         prevChats.map((chat) =>
//           chat.id === currentChat.id
//             ? { ...chat, messages: updatedMessages }
//             : chat
//         )
//       );

//       setCurrentChat((prevChat) =>
//         prevChat
//           ? { ...prevChat, messages: updatedMessages }
//           : null
//       );

//     } catch (error) {
//       console.error('Error sending message:', error);
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
//                     onClick={(e) => handleDeleteChat(chat.id, e)}
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
//           <span className="ml-4 text-sm font-medium">{currentChat?.title || 'Select a chat'}</span>
//         </div>

//         {/* Messages */}
//         <div className="flex-1 overflow-y-auto px-4 py-6">
//           {currentChat?.messages.map((message) => (
//             <div
//               key={message.id}
//               className={`mb-4 flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
//             >
//               <div
//                 className={`max-w-[80%] rounded-lg px-4 py-2 text-xs ${
//                   message.sender === 'user' ? 'bg-teal-700 text-white' : 'bg-white border border-gray-200'
//                 }`}
//               >
//                 {/* Display message text */}
//                 <pre className="whitespace-pre-wrap font-sans">{message.text}</pre>

//                 {/* Display timestamp */}
//                 <div
//                   className={`text-[10px] mt-1 ${
//                     message.sender === 'user' ? 'text-teal-300' : 'text-gray-400'
//                   }`}
//                 >
//                   {message.timestamp}
//                 </div>

//                 {/* Render button if the message includes it */}
//                 {message.button && (
//                   <button
//                     className="mt-2 px-4 py-2 bg-teal-500 text-white text-xs rounded hover:bg-teal-600"
//                     onClick={() => window.location.href = '/generate-notebook'}
//                   >
//                     Generate Notebook
//                   </button>
//                 )}
//               </div>
//             </div>
//           ))}

//           {/* Loading Indicator for Assistant Typing */}
//           {isLoading && (
//             <div className="mb-4 flex justify-start">
//               <div className="max-w-[80%] rounded-lg px-4 py-2 text-xs bg-white border border-gray-200">
//                 <pre className="whitespace-pre-wrap font-sans">Typing...</pre>
//               </div>
//             </div>
//           )}
//         </div>

//         {/* Attachments Preview */}
//         {isUploading && (
//           <div className="px-4 py-2 border-t border-gray-200 bg-gray-50 text-teal-700 text-xs">
//             Uploading files...
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



import React, { useState } from 'react';
import { FiPlus, FiMenu, FiPaperclip, FiSend, FiTrash } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import { v4 as uuidv4 } from 'uuid';

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
  };

  /**
   * Handles deleting a chat from the history.
   * @param chatId - ID of the chat to delete.
   * @param e - Event object.
   */
  const handleDeleteChat = (chatId: string, e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent triggering the chat selection
    setChats((prev) => prev.filter((chat) => chat.id !== chatId));
    if (currentChat?.id === chatId) {
      setCurrentChat(chats.find((chat) => chat.id !== chatId) || null);
    }
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
   * Defines TypeScript interfaces for uploaded files.
   */
  interface UploadedFile {
    id: number; // Assuming ID is a number
    name: string;
    file_url: string;
    schema: SchemaColumn[];
    suggestions: Suggestions;
  }

  interface SchemaColumn {
    column_name: string;
    data_type: string;
  }

  interface Suggestions {
    target_column: string | null;
    entity_id_column: string | null;
  }

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
      console.log(data); // Log response to verify structure

      // Handle 'uploaded_files' for any additional processing if needed
      if (data.uploaded_files && Array.isArray(data.uploaded_files)) {
        data.uploaded_files.forEach((uploadedFile: UploadedFile) => {
          // Optional: Handle file-specific actions here
        });
      }

      // Handle 'chat_message' for schema display
      if (data.chat_message) {
        const schemaMessage: Message = {
          id: uuidv4(),
          sender: 'assistant',
          text: data.chat_message,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        };

        // Update current chat state and all chats state to include the new schema message
        setCurrentChat((prevChat) => {
          if (!prevChat) return null;
          const updatedMessages = [...prevChat.messages, schemaMessage];
          return { ...prevChat, messages: updatedMessages };
        });

        setChats((prevChats) =>
          prevChats.map((chat) =>
            chat.id === currentChat?.id
              ? { ...chat, messages: [...chat.messages, schemaMessage] }
              : chat
          )
        );
      } else {
        console.error('Invalid response format:', data);
      }
    } catch (error) {
      console.error('File upload error:', error);
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
   * Handles sending a chat message to the backend.
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
      // Send the chat message to the backend
      const response = await fetch('http://localhost:8000/api/chatgpt/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: inputMessage }),
      });

      if (!response.ok) {
        throw new Error(`Failed to send message: ${response.statusText}`);
      }

      const data = await response.json();

      // Create an assistant message with the response
      const botMessage: Message = {
        id: uuidv4(),
        sender: 'assistant',
        text: data.response,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      // If the response includes a prompt to generate a notebook, add a button
      if (data.response.toLowerCase().includes('proceed to model creation')) {
        botMessage.button = true;
      }

      // Append the assistant message to the current chat
      const updatedMessages = [...updatedChat.messages, botMessage];

      setChats((prevChats) =>
        prevChats.map((chat) =>
          chat.id === currentChat.id
            ? { ...chat, messages: updatedMessages }
            : chat
        )
      );

      setCurrentChat((prevChat) =>
        prevChat
          ? { ...prevChat, messages: updatedMessages }
          : null
      );

    } catch (error) {
      console.error('Error sending message:', error);
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
                    onClick={(e) => handleDeleteChat(chat.id, e)}
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
          <span className="ml-4 text-sm font-medium">{currentChat?.title || 'Select a chat'}</span>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-4 py-6">
          {currentChat?.messages.map((message) => (
            <div
              key={message.id}
              className={`mb-4 flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] rounded-lg px-4 py-2 text-xs ${
                  message.sender === 'user' ? 'bg-teal-700 text-white' : 'bg-white border border-gray-200'
                }`}
              >
                {/* Display message text */}
                <pre className="whitespace-pre-wrap font-sans">{message.text}</pre>

                {/* Display timestamp */}
                <div
                  className={`text-[10px] mt-1 ${
                    message.sender === 'user' ? 'text-teal-300' : 'text-gray-400'
                  }`}
                >
                  {message.timestamp}
                </div>

                {/* Render button if the message includes it */}
                {message.button && (
                  <button
                    className="mt-2 px-4 py-2 bg-teal-500 text-white text-xs rounded hover:bg-teal-600"
                    onClick={() => window.location.href = '/generate-notebook'}
                  >
                    Generate Notebook
                  </button>
                )}
              </div>
            </div>
          ))}

          {/* Loading Indicator for Assistant Typing */}
          {isLoading && (
            <div className="mb-4 flex justify-start">
              <div className="max-w-[80%] rounded-lg px-4 py-2 text-xs bg-white border border-gray-200">
                <pre className="whitespace-pre-wrap font-sans">Typing...</pre>
              </div>
            </div>
          )}
        </div>

        {/* Attachments Preview */}
        {isUploading && (
          <div className="px-4 py-2 border-t border-gray-200 bg-gray-50 text-teal-700 text-xs">
            Uploading files...
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
