

// // // // // // // // // import React, { useState, useEffect, useRef } from 'react';
// // // // // // // // // import {
// // // // // // // // //   FiPlus,
// // // // // // // // //   FiMenu,
// // // // // // // // //   FiPaperclip,
// // // // // // // // //   FiSend,
// // // // // // // // //   FiTrash,
// // // // // // // // //   FiLoader,
// // // // // // // // // } from 'react-icons/fi';
// // // // // // // // // import { motion, AnimatePresence } from 'framer-motion';
// // // // // // // // // import { v4 as uuidv4 } from 'uuid';
// // // // // // // // // import { useNavigate } from 'react-router-dom';

// // // // // // // // // interface Message {
// // // // // // // // //   id: string;
// // // // // // // // //   sender: 'user' | 'assistant';
// // // // // // // // //   text: string;
// // // // // // // // //   timestamp: string;
// // // // // // // // //   button?: boolean; // Flag to render a button (e.g., Generate Notebook)
// // // // // // // // //   isSchema?: boolean; // Flag to indicate if the message contains schema data
// // // // // // // // //   schema?: Array<{ column_name: string; data_type: string }>; // Array of schema objects
// // // // // // // // // }

// // // // // // // // // interface Chat {
// // // // // // // // //   id: string;
// // // // // // // // //   title: string;
// // // // // // // // //   timestamp: string;
// // // // // // // // //   messages: Message[];
// // // // // // // // // }

// // // // // // // // // /**
// // // // // // // // //  * SchemaTable Component
// // // // // // // // //  * Renders a JSON schema as a two-column table with "Field" and "Data Type".
// // // // // // // // //  */
// // // // // // // // // const SchemaTable: React.FC<{ schema: Array<{ column_name: string; data_type: string }> }> = ({ schema }) => {
// // // // // // // // //   return (
// // // // // // // // //     <div className="overflow-x-auto mt-2">
// // // // // // // // //       <table className="min-w-full border-collapse">
// // // // // // // // //         <thead>
// // // // // // // // //           <tr>
// // // // // // // // //             <th
// // // // // // // // //               className="px-4 py-2 border-b bg-gray-100 text-left text-xs font-medium text-gray-700 uppercase tracking-wider"
// // // // // // // // //             >
// // // // // // // // //               Field
// // // // // // // // //             </th>
// // // // // // // // //             <th
// // // // // // // // //               className="px-4 py-2 border-b bg-gray-100 text-left text-xs font-medium text-gray-700 uppercase tracking-wider"
// // // // // // // // //             >
// // // // // // // // //               Data Type
// // // // // // // // //             </th>
// // // // // // // // //           </tr>
// // // // // // // // //         </thead>
// // // // // // // // //         <tbody>
// // // // // // // // //           {schema.map((field, index) => (
// // // // // // // // //             <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
// // // // // // // // //               <td className="px-4 py-2 border-b text-xs text-gray-600">{field.column_name}</td>
// // // // // // // // //               <td className="px-4 py-2 border-b text-xs text-gray-600">{field.data_type}</td>
// // // // // // // // //             </tr>
// // // // // // // // //           ))}
// // // // // // // // //         </tbody>
// // // // // // // // //       </table>
// // // // // // // // //     </div>
// // // // // // // // //   );
// // // // // // // // // };

// // // // // // // // // /**
// // // // // // // // //  * AnimatedMessage Component
// // // // // // // // //  * Conditionally animates only for assistant messages.
// // // // // // // // //  * If sender is 'assistant', show typing effect.
// // // // // // // // //  * If sender is 'user', display text immediately.
// // // // // // // // //  */
// // // // // // // // // const AnimatedMessage: React.FC<{ text: string; sender: 'user' | 'assistant' }> = ({ text, sender }) => {
// // // // // // // // //   const [displayedText, setDisplayedText] = useState('');
// // // // // // // // //   const indexRef = useRef(0);

// // // // // // // // //   useEffect(() => {
// // // // // // // // //     if (sender === 'assistant') {
// // // // // // // // //       // Assistant messages: typed animation
// // // // // // // // //       const interval = setInterval(() => {
// // // // // // // // //         setDisplayedText((prev) => prev + text.charAt(indexRef.current));
// // // // // // // // //         indexRef.current += 1;
// // // // // // // // //         if (indexRef.current >= text.length) {
// // // // // // // // //           clearInterval(interval);
// // // // // // // // //         }
// // // // // // // // //       }, 9); // Adjust typing speed here
// // // // // // // // //       return () => clearInterval(interval);
// // // // // // // // //     } else {
// // // // // // // // //       // User messages: display full text at once
// // // // // // // // //       setDisplayedText(text);
// // // // // // // // //     }
// // // // // // // // //   }, [text, sender]);

// // // // // // // // //   return <pre className="whitespace-pre-wrap font-sans">{displayedText}</pre>;
// // // // // // // // // };

// // // // // // // // // /**
// // // // // // // // //  * Helper function to determine if a message contains schema data.
// // // // // // // // //  */
// // // // // // // // // const parseSchema = (message: Message): Array<{ column_name: string; data_type: string }> | null => {
// // // // // // // // //   if (!message.isSchema || !message.schema) return null;
// // // // // // // // //   return message.schema;
// // // // // // // // // };

// // // // // // // // // const ChatInterface: React.FC = () => {
// // // // // // // // //   const defaultMessage = `Hi! 👋 I'm your AI assistant.\nI'll assist you in formulating a predictive question. I'll then create a SQL notebook to build a training set.\nSo, what would you like to predict?`;

// // // // // // // // //   const [chats, setChats] = useState<Chat[]>([
// // // // // // // // //     {
// // // // // // // // //       id: '1',
// // // // // // // // //       title: 'New Prediction',
// // // // // // // // //       timestamp: new Date().toLocaleString(),
// // // // // // // // //       messages: [
// // // // // // // // //         {
// // // // // // // // //           id: uuidv4(),
// // // // // // // // //           sender: 'assistant',
// // // // // // // // //           text: defaultMessage,
// // // // // // // // //           timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
// // // // // // // // //         },
// // // // // // // // //       ],
// // // // // // // // //     },
// // // // // // // // //   ]);

// // // // // // // // //   const [currentChat, setCurrentChat] = useState<Chat | null>(chats[0]);
// // // // // // // // //   const [showSidebar, setShowSidebar] = useState(true);
// // // // // // // // //   const [inputMessage, setInputMessage] = useState('');
// // // // // // // // //   const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);

// // // // // // // // //   const [isLoading, setIsLoading] = useState(false);
// // // // // // // // //   const [isUploading, setIsUploading] = useState(false);

// // // // // // // // //   const [isGeneratingNotebook, setIsGeneratingNotebook] = useState(false);
// // // // // // // // //   const [notebookGenerated, setNotebookGenerated] = useState(false);
// // // // // // // // //   const [generatedNotebookData, setGeneratedNotebookData] = useState<any>(null);

// // // // // // // // //   const navigate = useNavigate();

// // // // // // // // //   const handleNewChat = () => {
// // // // // // // // //     const newChat: Chat = {
// // // // // // // // //       id: uuidv4(),
// // // // // // // // //       title: 'New Prediction',
// // // // // // // // //       timestamp: new Date().toLocaleString(),
// // // // // // // // //       messages: [
// // // // // // // // //         {
// // // // // // // // //           id: uuidv4(),
// // // // // // // // //           sender: 'assistant',
// // // // // // // // //           text: defaultMessage,
// // // // // // // // //           timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
// // // // // // // // //         },
// // // // // // // // //       ],
// // // // // // // // //     };
// // // // // // // // //     setChats((prev) => [newChat, ...prev]);
// // // // // // // // //     setCurrentChat(newChat);

// // // // // // // // //     setIsGeneratingNotebook(false);
// // // // // // // // //     setNotebookGenerated(false);
// // // // // // // // //     setGeneratedNotebookData(null);
// // // // // // // // //   };

// // // // // // // // //   const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
// // // // // // // // //     const files = e.target.files;
// // // // // // // // //     if (files && files.length > 0) {
// // // // // // // // //       setSelectedFiles(files);
// // // // // // // // //     }
// // // // // // // // //   };

// // // // // // // // //   const handleFileUpload = async () => {
// // // // // // // // //     if (!selectedFiles || selectedFiles.length === 0) {
// // // // // // // // //       alert('No files selected.');
// // // // // // // // //       return;
// // // // // // // // //     }

// // // // // // // // //     setIsUploading(true);

// // // // // // // // //     try {
// // // // // // // // //       const formData = new FormData();
// // // // // // // // //       Array.from(selectedFiles).forEach((file) => {
// // // // // // // // //         formData.append('file', file);
// // // // // // // // //       });

// // // // // // // // //       const response = await fetch('http://localhost:8000/api/chatgpt/', {
// // // // // // // // //         method: 'POST',
// // // // // // // // //         body: formData,
// // // // // // // // //       });

// // // // // // // // //       if (!response.ok) {
// // // // // // // // //         throw new Error(`Failed to upload file: ${response.statusText}`);
// // // // // // // // //       }

// // // // // // // // //       const data = await response.json();
// // // // // // // // //       console.log('[DEBUG] File upload response:', data);

// // // // // // // // //       if (data.uploaded_files && data.uploaded_files.length > 0) {
// // // // // // // // //         const uploadedFile = data.uploaded_files[0];
// // // // // // // // //         const schema = uploadedFile.schema;
// // // // // // // // //         const suggestions = uploadedFile.suggestions;

// // // // // // // // //         if (schema && schema.length > 0) {
// // // // // // // // //           const schemaMessage: Message = {
// // // // // // // // //             id: uuidv4(),
// // // // // // // // //             sender: 'assistant',
// // // // // // // // //             text: 'Dataset uploaded successfully! Below is the schema:',
// // // // // // // // //             timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
// // // // // // // // //             isSchema: true,
// // // // // // // // //             schema: schema,
// // // // // // // // //           };

// // // // // // // // //           const confirmationText = `
// // // // // // // // //             Suggested Target Column: ${suggestions.target_column}
// // // // // // // // //             Suggested Entity ID Column: ${suggestions.entity_id_column}
// // // // // // // // //             Suggested Feature Columns: ${suggestions.feature_columns.join(', ')}

// // // // // // // // //             Please confirm:
// // // // // // // // //             - Is the Target Column correct?
// // // // // // // // //             - Is the Entity ID Column correct?
// // // // // // // // //             (Reply 'yes' to confirm or provide the correct column names in the format 'Entity ID Column: <column_name>, Target Column: <column_name>')
// // // // // // // // //           `.trim();

// // // // // // // // //           const confirmationMessage: Message = {
// // // // // // // // //             id: uuidv4(),
// // // // // // // // //             sender: 'assistant',
// // // // // // // // //             text: confirmationText,
// // // // // // // // //             timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
// // // // // // // // //           };

// // // // // // // // //           setCurrentChat((prevChat) => {
// // // // // // // // //             if (!prevChat) return null;
// // // // // // // // //             const updatedMessages = [...prevChat.messages, schemaMessage, confirmationMessage];
// // // // // // // // //             return { ...prevChat, messages: updatedMessages };
// // // // // // // // //           });

// // // // // // // // //           setChats((prevChats) =>
// // // // // // // // //             prevChats.map((chat) =>
// // // // // // // // //               chat.id === currentChat?.id
// // // // // // // // //                 ? { ...chat, messages: [...chat.messages, schemaMessage, confirmationMessage] }
// // // // // // // // //                 : chat
// // // // // // // // //             )
// // // // // // // // //           );
// // // // // // // // //         } else {
// // // // // // // // //           console.error('[ERROR] Schema data is missing in the uploaded file information.');
// // // // // // // // //         }
// // // // // // // // //       } else {
// // // // // // // // //         console.error('[ERROR] No uploaded_files data found in the response.');
// // // // // // // // //       }
// // // // // // // // //     } catch (error) {
// // // // // // // // //       console.error('[ERROR] File upload error:', error);
// // // // // // // // //       const errorMessage: Message = {
// // // // // // // // //         id: uuidv4(),
// // // // // // // // //         sender: 'assistant',
// // // // // // // // //         text: `Upload Error: ${error instanceof Error ? error.message : 'Unknown error'}`,
// // // // // // // // //         timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
// // // // // // // // //       };

// // // // // // // // //       setCurrentChat((prevChat) => {
// // // // // // // // //         if (!prevChat) return null;
// // // // // // // // //         const updatedMessages = [...prevChat.messages, errorMessage];
// // // // // // // // //         return { ...prevChat, messages: updatedMessages };
// // // // // // // // //       });

// // // // // // // // //       setChats((prevChats) =>
// // // // // // // // //         prevChats.map((chat) =>
// // // // // // // // //           chat.id === currentChat?.id
// // // // // // // // //             ? { ...chat, messages: [...chat.messages, errorMessage] }
// // // // // // // // //             : chat
// // // // // // // // //         )
// // // // // // // // //       );
// // // // // // // // //     } finally {
// // // // // // // // //       setSelectedFiles(null);
// // // // // // // // //       setIsUploading(false);
// // // // // // // // //     }
// // // // // // // // //   };

// // // // // // // // //   const handleSendMessage = async () => {
// // // // // // // // //     if (!inputMessage.trim()) return;
// // // // // // // // //     if (!currentChat) return;

// // // // // // // // //     const userMessage: Message = {
// // // // // // // // //       id: uuidv4(),
// // // // // // // // //       sender: 'user',
// // // // // // // // //       text: inputMessage,
// // // // // // // // //       timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
// // // // // // // // //     };

// // // // // // // // //     const updatedChat = {
// // // // // // // // //       ...currentChat,
// // // // // // // // //       messages: [...currentChat.messages, userMessage],
// // // // // // // // //     };

// // // // // // // // //     setChats((prevChats) =>
// // // // // // // // //       prevChats.map((chat) => (chat.id === currentChat.id ? updatedChat : chat))
// // // // // // // // //     );

// // // // // // // // //     setCurrentChat(updatedChat);
// // // // // // // // //     setInputMessage('');
// // // // // // // // //     setIsLoading(true);

// // // // // // // // //     try {
// // // // // // // // //       const response = await fetch('http://localhost:8000/api/chatgpt/', {
// // // // // // // // //         method: 'POST',
// // // // // // // // //         headers: { 'Content-Type': 'application/json' },
// // // // // // // // //         body: JSON.stringify({ message: userMessage.text, user_id: 'default_user' }),
// // // // // // // // //       });

// // // // // // // // //       if (!response.ok) {
// // // // // // // // //         throw new Error(`Failed to send message: ${response.statusText}`);
// // // // // // // // //       }

// // // // // // // // //       const data = await response.json();
// // // // // // // // //       let botText = data.response;
// // // // // // // // //       let showGenerateButton = data.show_generate_notebook || false;

// // // // // // // // //       const botMessage: Message = {
// // // // // // // // //         id: uuidv4(),
// // // // // // // // //         sender: 'assistant',
// // // // // // // // //         text: botText,
// // // // // // // // //         timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
// // // // // // // // //         button: showGenerateButton,
// // // // // // // // //       };

// // // // // // // // //       const updatedMessages = [...updatedChat.messages, botMessage];

// // // // // // // // //       setChats((prevChats) =>
// // // // // // // // //         prevChats.map((chat) =>
// // // // // // // // //           chat.id === currentChat.id
// // // // // // // // //             ? { ...chat, messages: [...updatedMessages] }
// // // // // // // // //             : chat
// // // // // // // // //         )
// // // // // // // // //       );

// // // // // // // // //       setCurrentChat((prevChat) =>
// // // // // // // // //         prevChat
// // // // // // // // //           ? { ...prevChat, messages: [...updatedMessages] }
// // // // // // // // //           : null
// // // // // // // // //       );

// // // // // // // // //       setIsGeneratingNotebook(false);
// // // // // // // // //       setNotebookGenerated(false);
// // // // // // // // //       setGeneratedNotebookData(null);
// // // // // // // // //     } catch (error) {
// // // // // // // // //       console.error('[ERROR] Error sending message:', error);
// // // // // // // // //       const errorMessage: Message = {
// // // // // // // // //         id: uuidv4(),
// // // // // // // // //         sender: 'assistant',
// // // // // // // // //         text: 'Sorry, I encountered an issue. Please try again later.',
// // // // // // // // //         timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
// // // // // // // // //       };

// // // // // // // // //       setChats((prevChats) =>
// // // // // // // // //         prevChats.map((chat) =>
// // // // // // // // //           chat.id === currentChat.id
// // // // // // // // //             ? { ...chat, messages: [...chat.messages, errorMessage] }
// // // // // // // // //             : chat
// // // // // // // // //         )
// // // // // // // // //       );
// // // // // // // // //     } finally {
// // // // // // // // //       setIsLoading(false);
// // // // // // // // //     }
// // // // // // // // //   };

// // // // // // // // //   const handleGenerateNotebook = async () => {
// // // // // // // // //     if (!currentChat) return;

// // // // // // // // //     setIsGeneratingNotebook(true);

// // // // // // // // //     try {
// // // // // // // // //       const response = await fetch('http://localhost:8000/api/chatgpt/', {
// // // // // // // // //         method: 'POST',
// // // // // // // // //         headers: { 'Content-Type': 'application/json' },
// // // // // // // // //         body: JSON.stringify({ action: 'generate_notebook', user_id: 'default_user' }),
// // // // // // // // //       });

// // // // // // // // //       if (!response.ok) {
// // // // // // // // //         throw new Error(`Failed to generate notebook: ${response.statusText}`);
// // // // // // // // //       }

// // // // // // // // //       const data = await response.json();
// // // // // // // // //       console.log('[DEBUG] Notebook generated:', data);

// // // // // // // // //       if (data.notebooks) {
// // // // // // // // //         setGeneratedNotebookData(data.notebooks);
// // // // // // // // //         setNotebookGenerated(true);

// // // // // // // // //         const notebookMessage: Message = {
// // // // // // // // //           id: uuidv4(),
// // // // // // // // //           sender: 'assistant',
// // // // // // // // //           text: 'Notebook has been generated successfully.',
// // // // // // // // //           timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
// // // // // // // // //         };

// // // // // // // // //         setChats((prevChats) =>
// // // // // // // // //           prevChats.map((chat) =>
// // // // // // // // //             chat.id === currentChat.id
// // // // // // // // //               ? { ...chat, messages: [...chat.messages, notebookMessage] }
// // // // // // // // //               : chat
// // // // // // // // //           )
// // // // // // // // //         );

// // // // // // // // //         setCurrentChat((prevChat) =>
// // // // // // // // //           prevChat
// // // // // // // // //             ? { ...prevChat, messages: [...prevChat.messages, notebookMessage] }
// // // // // // // // //             : null
// // // // // // // // //         );
// // // // // // // // //       } else {
// // // // // // // // //         alert('Error generating notebook. Please try again.');
// // // // // // // // //       }
// // // // // // // // //     } catch (error) {
// // // // // // // // //       console.error('[ERROR] Error generating notebook:', error);
// // // // // // // // //       alert('Error generating notebook. Please try again.');
// // // // // // // // //     } finally {
// // // // // // // // //       setIsGeneratingNotebook(false);
// // // // // // // // //     }
// // // // // // // // //   };

// // // // // // // // //   const handleOpenNotebook = () => {
// // // // // // // // //     if (generatedNotebookData) {
// // // // // // // // //       navigate('/notebook', { state: { notebooks: generatedNotebookData } });
// // // // // // // // //     } else {
// // // // // // // // //       alert('No notebook data available.');
// // // // // // // // //     }
// // // // // // // // //   };

// // // // // // // // //   const handleReset = async () => {
// // // // // // // // //     await fetch('http://localhost:8000/api/chatgpt/', {
// // // // // // // // //       method: 'POST',
// // // // // // // // //       headers: { 'Content-Type': 'application/json' },
// // // // // // // // //       body: JSON.stringify({ action: 'reset', user_id: 'default_user' }),
// // // // // // // // //     });

// // // // // // // // //     setCurrentChat((prevChat) =>
// // // // // // // // //       prevChat
// // // // // // // // //         ? {
// // // // // // // // //             ...prevChat,
// // // // // // // // //             messages: [
// // // // // // // // //               {
// // // // // // // // //                 id: uuidv4(),
// // // // // // // // //                 sender: 'assistant',
// // // // // // // // //                 text: defaultMessage,
// // // // // // // // //                 timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
// // // // // // // // //               },
// // // // // // // // //             ],
// // // // // // // // //           }
// // // // // // // // //         : null
// // // // // // // // //     );

// // // // // // // // //     setIsGeneratingNotebook(false);
// // // // // // // // //     setNotebookGenerated(false);
// // // // // // // // //     setGeneratedNotebookData(null);
// // // // // // // // //   };

// // // // // // // // //   const messagesEndRef = useRef<HTMLDivElement | null>(null);
// // // // // // // // //   const scrollToBottom = () => {
// // // // // // // // //     messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
// // // // // // // // //   };

// // // // // // // // //   useEffect(() => {
// // // // // // // // //     scrollToBottom();
// // // // // // // // //   }, [currentChat?.messages, isLoading, isUploading]);

// // // // // // // // //   return (
// // // // // // // // //     <div className="h-screen flex bg-gray-50">
// // // // // // // // //       <AnimatePresence>
// // // // // // // // //         {showSidebar && (
// // // // // // // // //           <motion.div
// // // // // // // // //             initial={{ x: -240 }}
// // // // // // // // //             animate={{ x: 0 }}
// // // // // // // // //             exit={{ x: -240 }}
// // // // // // // // //             transition={{ duration: 0.2 }}
// // // // // // // // //             className="w-60 border-r border-gray-200 bg-white"
// // // // // // // // //           >
// // // // // // // // //             <div className="p-3 border-b border-gray-100 flex justify-between items-center">
// // // // // // // // //               <span className="text-xs font-medium text-gray-600">Chat History</span>
// // // // // // // // //               <button
// // // // // // // // //                 onClick={handleNewChat}
// // // // // // // // //                 className="text-xs flex items-center gap-1 text-teal-700 hover:text-teal-800"
// // // // // // // // //               >
// // // // // // // // //                 <FiPlus size={12} /> New
// // // // // // // // //               </button>
// // // // // // // // //             </div>
// // // // // // // // //             <div className="overflow-y-auto h-[calc(100vh-49px)]">
// // // // // // // // //               {chats.map((chat) => (
// // // // // // // // //                 <div
// // // // // // // // //                   key={chat.id}
// // // // // // // // //                   onClick={() => setCurrentChat(chat)}
// // // // // // // // //                   className={`p-2 mx-2 my-1 rounded text-xs cursor-pointer flex items-center justify-between group ${
// // // // // // // // //                     currentChat?.id === chat.id
// // // // // // // // //                       ? 'bg-teal-50 text-teal-700'
// // // // // // // // //                       : 'hover:bg-gray-50'
// // // // // // // // //                   }`}
// // // // // // // // //                 >
// // // // // // // // //                   <div className="truncate flex-1">
// // // // // // // // //                     <div className="font-medium truncate">{chat.title}</div>
// // // // // // // // //                     <div className="text-[10px] text-gray-400">{chat.timestamp}</div>
// // // // // // // // //                   </div>
// // // // // // // // //                   <button
// // // // // // // // //                     onClick={(e) => {
// // // // // // // // //                       e.stopPropagation();
// // // // // // // // //                       setChats((prev) => prev.filter((c) => c.id !== chat.id));
// // // // // // // // //                       if (currentChat?.id === chat.id) {
// // // // // // // // //                         setCurrentChat(null);
// // // // // // // // //                       }
// // // // // // // // //                     }}
// // // // // // // // //                     className="opacity-0 group-hover:opacity-100 p-1 hover:text-red-500"
// // // // // // // // //                   >
// // // // // // // // //                     <FiTrash size={12} />
// // // // // // // // //                   </button>
// // // // // // // // //                 </div>
// // // // // // // // //               ))}
// // // // // // // // //             </div>
// // // // // // // // //           </motion.div>
// // // // // // // // //         )}
// // // // // // // // //       </AnimatePresence>

// // // // // // // // //       <div className="flex-1 flex flex-col">
// // // // // // // // //         <div className="h-12 border-b border-gray-200 flex items-center px-4 bg-white">
// // // // // // // // //           <button
// // // // // // // // //             onClick={() => setShowSidebar(!showSidebar)}
// // // // // // // // //             className="text-gray-500 hover:text-gray-700"
// // // // // // // // //           >
// // // // // // // // //             <FiMenu size={16} />
// // // // // // // // //           </button>
// // // // // // // // //           <span className="ml-4 text-sm font-medium">
// // // // // // // // //             {currentChat?.title || 'Select a chat'}
// // // // // // // // //           </span>
// // // // // // // // //           <div className="ml-auto">
// // // // // // // // //             <button
// // // // // // // // //               onClick={handleReset}
// // // // // // // // //               className="text-xs text-red-500 hover:text-red-600 flex items-center gap-1"
// // // // // // // // //             >
// // // // // // // // //               <FiTrash size={12} /> Reset
// // // // // // // // //             </button>
// // // // // // // // //           </div>
// // // // // // // // //         </div>

// // // // // // // // //         <div className="flex-1 overflow-y-auto px-4 py-6">
// // // // // // // // //           {currentChat?.messages.map((message) => {
// // // // // // // // //             const schemaData = parseSchema(message);
// // // // // // // // //             return (
// // // // // // // // //               <div
// // // // // // // // //                 key={message.id}
// // // // // // // // //                 className={`mb-4 flex ${
// // // // // // // // //                   message.sender === 'user' ? 'justify-end' : 'justify-start'
// // // // // // // // //                 }`}
// // // // // // // // //               >
// // // // // // // // //                 <div
// // // // // // // // //                   className={`max-w-[80%] rounded-lg px-4 py-2 text-xs ${
// // // // // // // // //                     message.sender === 'user'
// // // // // // // // //                       ? 'bg-teal-700 text-white'
// // // // // // // // //                       : 'bg-white border border-gray-200'
// // // // // // // // //                   }`}
// // // // // // // // //                 >
// // // // // // // // //                   {message.isSchema && schemaData ? (
// // // // // // // // //                     <>
// // // // // // // // //                       <AnimatedMessage text={message.text} sender={message.sender} />
// // // // // // // // //                       <SchemaTable schema={schemaData} />
// // // // // // // // //                     </>
// // // // // // // // //                   ) : (
// // // // // // // // //                     <AnimatedMessage text={message.text} sender={message.sender} />
// // // // // // // // //                   )}

// // // // // // // // //                   <div
// // // // // // // // //                     className={`text-[10px] mt-1 ${
// // // // // // // // //                       message.sender === 'user' ? 'text-teal-300' : 'text-gray-400'
// // // // // // // // //                     }`}
// // // // // // // // //                   >
// // // // // // // // //                     {message.timestamp}
// // // // // // // // //                   </div>

// // // // // // // // //                   {message.button && (
// // // // // // // // //                     <div className="mt-2 flex gap-2">
// // // // // // // // //                       {isGeneratingNotebook ? (
// // // // // // // // //                         <button
// // // // // // // // //                           disabled
// // // // // // // // //                           className="flex items-center gap-2 px-4 py-2 bg-teal-500 text-white text-xs rounded"
// // // // // // // // //                         >
// // // // // // // // //                           <FiLoader className="animate-spin" /> Generating...
// // // // // // // // //                         </button>
// // // // // // // // //                       ) : notebookGenerated ? (
// // // // // // // // //                         <button
// // // // // // // // //                           onClick={handleOpenNotebook}
// // // // // // // // //                           className="px-4 py-2 bg-teal-500 text-white text-xs rounded hover:bg-teal-600"
// // // // // // // // //                         >
// // // // // // // // //                           Open Notebook
// // // // // // // // //                         </button>
// // // // // // // // //                       ) : (
// // // // // // // // //                         <button
// // // // // // // // //                           onClick={handleGenerateNotebook}
// // // // // // // // //                           className="px-4 py-2 bg-teal-500 text-white text-xs rounded hover:bg-teal-600"
// // // // // // // // //                         >
// // // // // // // // //                           Generate Notebook
// // // // // // // // //                         </button>
// // // // // // // // //                       )}
// // // // // // // // //                     </div>
// // // // // // // // //                   )}
// // // // // // // // //                 </div>
// // // // // // // // //               </div>
// // // // // // // // //             );
// // // // // // // // //           })}

// // // // // // // // //           {isLoading && (
// // // // // // // // //             <div className="mb-4 flex justify-start">
// // // // // // // // //               <div className="max-w-[80%] rounded-lg px-4 py-2 text-xs bg-white border border-gray-200 flex items-center">
// // // // // // // // //                 <FiLoader className="animate-spin mr-2" /> Typing...
// // // // // // // // //               </div>
// // // // // // // // //             </div>
// // // // // // // // //           )}

// // // // // // // // //           <div ref={messagesEndRef} />
// // // // // // // // //         </div>

// // // // // // // // //         {isUploading && (
// // // // // // // // //           <div className="px-4 py-2 border-t border-gray-200 bg-gray-50 text-teal-700 text-xs flex items-center gap-2">
// // // // // // // // //             <FiLoader className="animate-spin" /> Uploading files...
// // // // // // // // //           </div>
// // // // // // // // //         )}
// // // // // // // // //         {selectedFiles && selectedFiles.length > 0 && (
// // // // // // // // //           <div className="px-4 py-2 border-t border-gray-200 bg-gray-50">
// // // // // // // // //             <div className="flex flex-wrap gap-2">
// // // // // // // // //               {Array.from(selectedFiles).map((file) => (
// // // // // // // // //                 <div
// // // // // // // // //                   key={uuidv4()}
// // // // // // // // //                   className="flex flex-col gap-2 bg-white px-2 py-2 rounded border text-xs"
// // // // // // // // //                 >
// // // // // // // // //                   <div className="truncate max-w-[150px]">
// // // // // // // // //                     <strong>{file.name}</strong> ({(file.size / 1024).toFixed(1)} KB)
// // // // // // // // //                   </div>
// // // // // // // // //                 </div>
// // // // // // // // //               ))}
// // // // // // // // //             </div>
// // // // // // // // //             <button
// // // // // // // // //               onClick={handleFileUpload}
// // // // // // // // //               className="mt-2 px-4 py-2 bg-teal-700 text-white text-xs rounded hover:bg-teal-800"
// // // // // // // // //             >
// // // // // // // // //               Upload Files
// // // // // // // // //             </button>
// // // // // // // // //           </div>
// // // // // // // // //         )}

// // // // // // // // //         <div className="p-4 border-t border-gray-200 bg-white">
// // // // // // // // //           <div className="flex items-center gap-2">
// // // // // // // // //             <label className="cursor-pointer text-gray-400 hover:text-gray-600">
// // // // // // // // //               <input
// // // // // // // // //                 type="file"
// // // // // // // // //                 multiple
// // // // // // // // //                 className="hidden"
// // // // // // // // //                 onChange={handleFileSelect}
// // // // // // // // //               />
// // // // // // // // //               <FiPaperclip size={16} />
// // // // // // // // //             </label>
// // // // // // // // //             <input
// // // // // // // // //               type="text"
// // // // // // // // //               value={inputMessage}
// // // // // // // // //               onChange={(e) => setInputMessage(e.target.value)}
// // // // // // // // //               onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
// // // // // // // // //               placeholder="Type your message..."
// // // // // // // // //               className="flex-1 text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:border-teal-400"
// // // // // // // // //             />
// // // // // // // // //             <button
// // // // // // // // //               onClick={handleSendMessage}
// // // // // // // // //               className="text-teal-700 hover:text-teal-800"
// // // // // // // // //             >
// // // // // // // // //               <FiSend size={16} />
// // // // // // // // //             </button>
// // // // // // // // //           </div>
// // // // // // // // //         </div>
// // // // // // // // //       </div>
// // // // // // // // //     </div>
// // // // // // // // //   );
// // // // // // // // // };

// // // // // // // // // export default ChatInterface;



// // // // // // // // // Below is for state management:


// // // // // // // // // // src/components/ChatInterface.tsx
// // // // // // // // // import React, { useEffect, useRef, useState } from 'react';
// // // // // // // // // import {
// // // // // // // // //   FiPlus,
// // // // // // // // //   FiMenu,
// // // // // // // // //   FiPaperclip,
// // // // // // // // //   FiSend,
// // // // // // // // //   FiTrash,
// // // // // // // // //   FiLoader,
// // // // // // // // // } from 'react-icons/fi';
// // // // // // // // // import { motion, AnimatePresence } from 'framer-motion';
// // // // // // // // // import { v4 as uuidv4 } from 'uuid';
// // // // // // // // // import { useNavigate } from 'react-router-dom';
// // // // // // // // // import { useAppDispatch, useAppSelector } from '../store';

// // // // // // // // // import {
// // // // // // // // //   setSelectedFiles,
// // // // // // // // //   setIsLoading,
// // // // // // // // //   setIsUploading,
// // // // // // // // //   setIsGeneratingNotebook,
// // // // // // // // //   setNotebookGenerated,
// // // // // // // // //   setGeneratedNotebookData,
// // // // // // // // //   setCurrentChat,
// // // // // // // // //   addMessageToCurrentChat,
// // // // // // // // //   addNewChat,
// // // // // // // // //   removeChat,
// // // // // // // // //   resetConversation
// // // // // // // // // } from '../features/chatslice';

// // // // // // // // // interface SchemaField {
// // // // // // // // //   column_name: string;
// // // // // // // // //   data_type: string;
// // // // // // // // // }

// // // // // // // // // interface Message {
// // // // // // // // //   id: string;
// // // // // // // // //   sender: 'user' | 'assistant';
// // // // // // // // //   text: string;
// // // // // // // // //   timestamp: string;
// // // // // // // // //   button?: boolean;
// // // // // // // // //   isSchema?: boolean;
// // // // // // // // //   schema?: SchemaField[];
// // // // // // // // // }

// // // // // // // // // interface Chat {
// // // // // // // // //   id: string;
// // // // // // // // //   title: string;
// // // // // // // // //   timestamp: string;
// // // // // // // // //   messages: Message[];
// // // // // // // // // }

// // // // // // // // // const AnimatedMessage: React.FC<{ text: string; sender: 'user' | 'assistant' }> = ({ text, sender }) => {
// // // // // // // // //   const [displayedText, setDisplayedText] = useState('');
// // // // // // // // //   const indexRef = useRef(0);

// // // // // // // // //   useEffect(() => {
// // // // // // // // //     if (sender === 'assistant') {
// // // // // // // // //       const interval = setInterval(() => {
// // // // // // // // //         setDisplayedText((prev) => prev + text.charAt(indexRef.current));
// // // // // // // // //         indexRef.current += 1;
// // // // // // // // //         if (indexRef.current >= text.length) {
// // // // // // // // //           clearInterval(interval);
// // // // // // // // //         }
// // // // // // // // //       }, 9);
// // // // // // // // //       return () => clearInterval(interval);
// // // // // // // // //     } else {
// // // // // // // // //       setDisplayedText(text);
// // // // // // // // //     }
// // // // // // // // //   }, [text, sender]);

// // // // // // // // //   return <pre className="whitespace-pre-wrap font-sans">{displayedText}</pre>;
// // // // // // // // // };

// // // // // // // // // const ChatInterface: React.FC = () => {
// // // // // // // // //   const navigate = useNavigate();
// // // // // // // // //   const dispatch = useAppDispatch();

// // // // // // // // //   const {
// // // // // // // // //     chats,
// // // // // // // // //     currentChat,
// // // // // // // // //     selectedFiles,
// // // // // // // // //     isLoading,
// // // // // // // // //     isUploading,
// // // // // // // // //     isGeneratingNotebook,
// // // // // // // // //     notebookGenerated,
// // // // // // // // //     generatedNotebookData,
// // // // // // // // //   } = useAppSelector((state) => state.chat);

// // // // // // // // //   const [inputMessage, setInputMessage] = useState('');

// // // // // // // // //   useEffect(() => {
// // // // // // // // //     if (!currentChat && chats.length > 0) {
// // // // // // // // //       dispatch(setCurrentChat(chats[0]));
// // // // // // // // //     }
// // // // // // // // //   }, [chats, currentChat, dispatch]);

// // // // // // // // //   const handleNewChat = () => {
// // // // // // // // //     dispatch(addNewChat());
// // // // // // // // //   };

// // // // // // // // //   const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
// // // // // // // // //     const files = e.target.files;
// // // // // // // // //     if (files && files.length > 0) {
// // // // // // // // //       dispatch(setSelectedFiles(files));
// // // // // // // // //     }
// // // // // // // // //   };

// // // // // // // // //   const handleFileUpload = async () => {
// // // // // // // // //     if (!selectedFiles || selectedFiles.length === 0) {
// // // // // // // // //       alert('No files selected.');
// // // // // // // // //       return;
// // // // // // // // //     }

// // // // // // // // //     dispatch(setIsUploading(true));

// // // // // // // // //     try {
// // // // // // // // //       const formData = new FormData();
// // // // // // // // //       Array.from(selectedFiles).forEach((file) => {
// // // // // // // // //         formData.append('file', file);
// // // // // // // // //       });

// // // // // // // // //       const response = await fetch('http://localhost:8000/api/chatgpt/', {
// // // // // // // // //         method: 'POST',
// // // // // // // // //         body: formData,
// // // // // // // // //       });

// // // // // // // // //       if (!response.ok) {
// // // // // // // // //         throw new Error(`Failed to upload file: ${response.statusText}`);
// // // // // // // // //       }

// // // // // // // // //       const data = await response.json();
// // // // // // // // //       console.log('[DEBUG] File upload response:', data);

// // // // // // // // //       if (data.uploaded_files && data.uploaded_files.length > 0) {
// // // // // // // // //         const uploadedFile = data.uploaded_files[0];
// // // // // // // // //         const schema = uploadedFile.schema;
// // // // // // // // //         const suggestions = uploadedFile.suggestions;

// // // // // // // // //         if (schema && schema.length > 0) {
// // // // // // // // //           const schemaMessage: Message = {
// // // // // // // // //             id: uuidv4(),
// // // // // // // // //             sender: 'assistant',
// // // // // // // // //             text: 'Dataset uploaded successfully! Below is the schema:',
// // // // // // // // //             timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
// // // // // // // // //             isSchema: true,
// // // // // // // // //             schema: schema,
// // // // // // // // //           };

// // // // // // // // //           const confirmationText = `
// // // // // // // // // Suggested Target Column: ${suggestions.target_column}
// // // // // // // // // Suggested Entity ID Column: ${suggestions.entity_id_column}
// // // // // // // // // Suggested Feature Columns: ${suggestions.feature_columns.join(', ')}

// // // // // // // // // Please confirm:
// // // // // // // // // - Is the Target Column correct?
// // // // // // // // // - Is the Entity ID Column correct?
// // // // // // // // // (Reply 'yes' to confirm or provide the correct column names)
// // // // // // // // //           `.trim();

// // // // // // // // //           const confirmationMessage: Message = {
// // // // // // // // //             id: uuidv4(),
// // // // // // // // //             sender: 'assistant',
// // // // // // // // //             text: confirmationText,
// // // // // // // // //             timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
// // // // // // // // //           };

// // // // // // // // //           dispatch(addMessageToCurrentChat(schemaMessage));
// // // // // // // // //           dispatch(addMessageToCurrentChat(confirmationMessage));
// // // // // // // // //         } else {
// // // // // // // // //           console.error('[ERROR] Schema data is missing in the uploaded file information.');
// // // // // // // // //         }
// // // // // // // // //       } else {
// // // // // // // // //         console.error('[ERROR] No uploaded_files data found in the response.');
// // // // // // // // //       }
// // // // // // // // //     } catch (error: any) {
// // // // // // // // //       console.error('[ERROR] File upload error:', error);
// // // // // // // // //       const errorMessage: Message = {
// // // // // // // // //         id: uuidv4(),
// // // // // // // // //         sender: 'assistant',
// // // // // // // // //         text: `Upload Error: ${error instanceof Error ? error.message : 'Unknown error'}`,
// // // // // // // // //         timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
// // // // // // // // //       };
// // // // // // // // //       dispatch(addMessageToCurrentChat(errorMessage));
// // // // // // // // //     } finally {
// // // // // // // // //       dispatch(setSelectedFiles(null));
// // // // // // // // //       dispatch(setIsUploading(false));
// // // // // // // // //     }
// // // // // // // // //   };

// // // // // // // // //   const handleSendMessage = async () => {
// // // // // // // // //     if (!inputMessage.trim()) return;
// // // // // // // // //     if (!currentChat) return;

// // // // // // // // //     const userMessage: Message = {
// // // // // // // // //       id: uuidv4(),
// // // // // // // // //       sender: 'user',
// // // // // // // // //       text: inputMessage,
// // // // // // // // //       timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
// // // // // // // // //     };

// // // // // // // // //     dispatch(addMessageToCurrentChat(userMessage));
// // // // // // // // //     setInputMessage('');
// // // // // // // // //     dispatch(setIsLoading(true));

// // // // // // // // //     try {
// // // // // // // // //       const response = await fetch('http://localhost:8000/api/chatgpt/', {
// // // // // // // // //         method: 'POST',
// // // // // // // // //         headers: { 'Content-Type': 'application/json' },
// // // // // // // // //         body: JSON.stringify({ message: userMessage.text, user_id: 'default_user' }),
// // // // // // // // //       });

// // // // // // // // //       if (!response.ok) {
// // // // // // // // //         throw new Error(`Failed to send message: ${response.statusText}`);
// // // // // // // // //       }

// // // // // // // // //       const data = await response.json();
// // // // // // // // //       let botText = data.response;
// // // // // // // // //       let showGenerateButton = data.show_generate_notebook || false;

// // // // // // // // //       const botMessage: Message = {
// // // // // // // // //         id: uuidv4(),
// // // // // // // // //         sender: 'assistant',
// // // // // // // // //         text: botText,
// // // // // // // // //         timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
// // // // // // // // //         button: showGenerateButton,
// // // // // // // // //       };

// // // // // // // // //       dispatch(addMessageToCurrentChat(botMessage));
// // // // // // // // //       dispatch(setIsGeneratingNotebook(false));
// // // // // // // // //       dispatch(setNotebookGenerated(false));
// // // // // // // // //       dispatch(setGeneratedNotebookData(null));
// // // // // // // // //     } catch (error) {
// // // // // // // // //       console.error('[ERROR] Error sending message:', error);
// // // // // // // // //       const errorMessage: Message = {
// // // // // // // // //         id: uuidv4(),
// // // // // // // // //         sender: 'assistant',
// // // // // // // // //         text: 'Sorry, I encountered an issue. Please try again later.',
// // // // // // // // //         timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
// // // // // // // // //       };
// // // // // // // // //       dispatch(addMessageToCurrentChat(errorMessage));
// // // // // // // // //     } finally {
// // // // // // // // //       dispatch(setIsLoading(false));
// // // // // // // // //     }
// // // // // // // // //   };

// // // // // // // // //   const handleGenerateNotebook = async () => {
// // // // // // // // //     if (!currentChat) return;

// // // // // // // // //     dispatch(setIsGeneratingNotebook(true));

// // // // // // // // //     try {
// // // // // // // // //       const response = await fetch('http://localhost:8000/api/chatgpt/', {
// // // // // // // // //         method: 'POST',
// // // // // // // // //         headers: { 'Content-Type': 'application/json' },
// // // // // // // // //         body: JSON.stringify({ action: 'generate_notebook', user_id: 'default_user' }),
// // // // // // // // //       });

// // // // // // // // //       if (!response.ok) {
// // // // // // // // //         throw new Error(`Failed to generate notebook: ${response.statusText}`);
// // // // // // // // //       }

// // // // // // // // //       const data = await response.json();
// // // // // // // // //       console.log('[DEBUG] Notebook generated:', data);

// // // // // // // // //       if (data.notebooks) {
// // // // // // // // //         dispatch(setGeneratedNotebookData(data.notebooks));
// // // // // // // // //         dispatch(setNotebookGenerated(true));

// // // // // // // // //         const notebookMessage: Message = {
// // // // // // // // //           id: uuidv4(),
// // // // // // // // //           sender: 'assistant',
// // // // // // // // //           text: 'Notebook has been generated successfully.',
// // // // // // // // //           timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
// // // // // // // // //         };

// // // // // // // // //         dispatch(addMessageToCurrentChat(notebookMessage));
// // // // // // // // //       } else {
// // // // // // // // //         alert('Error generating notebook. Please try again.');
// // // // // // // // //       }
// // // // // // // // //     } catch (error) {
// // // // // // // // //       console.error('[ERROR] Error generating notebook:', error);
// // // // // // // // //       alert('Error generating notebook. Please try again.');
// // // // // // // // //     } finally {
// // // // // // // // //       dispatch(setIsGeneratingNotebook(false));
// // // // // // // // //     }
// // // // // // // // //   };

// // // // // // // // //   const handleOpenNotebook = () => {
// // // // // // // // //     if (generatedNotebookData) {
// // // // // // // // //       // Navigate to notebook page with the notebooks data
// // // // // // // // //       navigate('/notebook', { state: { notebooks: generatedNotebookData } });
// // // // // // // // //     } else {
// // // // // // // // //       alert('No notebook data available.');
// // // // // // // // //     }
// // // // // // // // //   };

// // // // // // // // //   const handleReset = async () => {
// // // // // // // // //     await fetch('http://localhost:8000/api/chatgpt/', {
// // // // // // // // //       method: 'POST',
// // // // // // // // //       headers: { 'Content-Type': 'application/json' },
// // // // // // // // //       body: JSON.stringify({ action: 'reset', user_id: 'default_user' }),
// // // // // // // // //     });

// // // // // // // // //     dispatch(resetConversation());
// // // // // // // // //   };

// // // // // // // // //   const messagesEndRef = useRef<HTMLDivElement | null>(null);
// // // // // // // // //   const scrollToBottom = () => {
// // // // // // // // //     messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
// // // // // // // // //   };

// // // // // // // // //   useEffect(() => {
// // // // // // // // //     scrollToBottom();
// // // // // // // // //   }, [currentChat?.messages, isLoading, isUploading]);

// // // // // // // // //   return (
// // // // // // // // //     <div className="h-screen flex bg-gray-50">
// // // // // // // // //       <AnimatePresence>
// // // // // // // // //         {/* Sidebar toggle can be implemented if needed */}
// // // // // // // // //         <motion.div
// // // // // // // // //           initial={{ x: -240 }}
// // // // // // // // //           animate={{ x: 0 }}
// // // // // // // // //           exit={{ x: -240 }}
// // // // // // // // //           transition={{ duration: 0.2 }}
// // // // // // // // //           className="w-60 border-r border-gray-200 bg-white"
// // // // // // // // //         >
// // // // // // // // //           <div className="p-3 border-b border-gray-100 flex justify-between items-center">
// // // // // // // // //             <span className="text-xs font-medium text-gray-600">Chat History</span>
// // // // // // // // //             <button
// // // // // // // // //               onClick={handleNewChat}
// // // // // // // // //               className="text-xs flex items-center gap-1 text-teal-700 hover:text-teal-800"
// // // // // // // // //             >
// // // // // // // // //               <FiPlus size={12} /> New
// // // // // // // // //             </button>
// // // // // // // // //           </div>
// // // // // // // // //           <div className="overflow-y-auto h-[calc(100vh-49px)]">
// // // // // // // // //             {chats.map((chat) => (
// // // // // // // // //               <div
// // // // // // // // //                 key={chat.id}
// // // // // // // // //                 onClick={() => dispatch(setCurrentChat(chat))}
// // // // // // // // //                 className={`p-2 mx-2 my-1 rounded text-xs cursor-pointer flex items-center justify-between group ${
// // // // // // // // //                   currentChat?.id === chat.id
// // // // // // // // //                     ? 'bg-teal-50 text-teal-700'
// // // // // // // // //                     : 'hover:bg-gray-50'
// // // // // // // // //                 }`}
// // // // // // // // //               >
// // // // // // // // //                 <div className="truncate flex-1">
// // // // // // // // //                   <div className="font-medium truncate">{chat.title}</div>
// // // // // // // // //                   <div className="text-[10px] text-gray-400">{chat.timestamp}</div>
// // // // // // // // //                 </div>
// // // // // // // // //                 <button
// // // // // // // // //                   onClick={(e) => {
// // // // // // // // //                     e.stopPropagation();
// // // // // // // // //                     dispatch(removeChat(chat.id));
// // // // // // // // //                   }}
// // // // // // // // //                   className="opacity-0 group-hover:opacity-100 p-1 hover:text-red-500"
// // // // // // // // //                 >
// // // // // // // // //                   <FiTrash size={12} />
// // // // // // // // //                 </button>
// // // // // // // // //               </div>
// // // // // // // // //             ))}
// // // // // // // // //           </div>
// // // // // // // // //         </motion.div>
// // // // // // // // //       </AnimatePresence>

// // // // // // // // //       <div className="flex-1 flex flex-col">
// // // // // // // // //         <div className="h-12 border-b border-gray-200 flex items-center px-4 bg-white">
// // // // // // // // //           <button
// // // // // // // // //             onClick={() => {}}
// // // // // // // // //             className="text-gray-500 hover:text-gray-700"
// // // // // // // // //           >
// // // // // // // // //             <FiMenu size={16} />
// // // // // // // // //           </button>
// // // // // // // // //           <span className="ml-4 text-sm font-medium">
// // // // // // // // //             {currentChat?.title || 'Select a chat'}
// // // // // // // // //           </span>
// // // // // // // // //           <div className="ml-auto">
// // // // // // // // //             <button
// // // // // // // // //               onClick={handleReset}
// // // // // // // // //               className="text-xs text-red-500 hover:text-red-600 flex items-center gap-1"
// // // // // // // // //             >
// // // // // // // // //               <FiTrash size={12} /> Reset
// // // // // // // // //             </button>
// // // // // // // // //           </div>
// // // // // // // // //         </div>

// // // // // // // // //         <div className="flex-1 overflow-y-auto px-4 py-6">
// // // // // // // // //           {currentChat?.messages.map((message) => (
// // // // // // // // //             <div
// // // // // // // // //               key={message.id}
// // // // // // // // //               className={`mb-4 flex ${
// // // // // // // // //                 message.sender === 'user' ? 'justify-end' : 'justify-start'
// // // // // // // // //               }`}
// // // // // // // // //             >
// // // // // // // // //               <div
// // // // // // // // //                 className={`max-w-[80%] rounded-lg px-4 py-2 text-xs ${
// // // // // // // // //                   message.sender === 'user'
// // // // // // // // //                     ? 'bg-teal-700 text-white'
// // // // // // // // //                     : 'bg-white border border-gray-200'
// // // // // // // // //                 }`}
// // // // // // // // //               >
// // // // // // // // //                 <AnimatedMessage text={message.text} sender={message.sender} />
// // // // // // // // //                 <div
// // // // // // // // //                   className={`text-[10px] mt-1 ${
// // // // // // // // //                     message.sender === 'user' ? 'text-teal-300' : 'text-gray-400'
// // // // // // // // //                   }`}
// // // // // // // // //                 >
// // // // // // // // //                   {message.timestamp}
// // // // // // // // //                 </div>

// // // // // // // // //                 {message.button && (
// // // // // // // // //                   <div className="mt-2 flex gap-2">
// // // // // // // // //                     {isGeneratingNotebook ? (
// // // // // // // // //                       <button
// // // // // // // // //                         disabled
// // // // // // // // //                         className="flex items-center gap-2 px-4 py-2 bg-teal-500 text-white text-xs rounded"
// // // // // // // // //                       >
// // // // // // // // //                         <FiLoader className="animate-spin" /> Generating...
// // // // // // // // //                       </button>
// // // // // // // // //                     ) : notebookGenerated ? (
// // // // // // // // //                       <button
// // // // // // // // //                         onClick={handleOpenNotebook}
// // // // // // // // //                         className="px-4 py-2 bg-teal-500 text-white text-xs rounded hover:bg-teal-600"
// // // // // // // // //                       >
// // // // // // // // //                         Open Notebook
// // // // // // // // //                       </button>
// // // // // // // // //                     ) : (
// // // // // // // // //                       <button
// // // // // // // // //                         onClick={handleGenerateNotebook}
// // // // // // // // //                         className="px-4 py-2 bg-teal-500 text-white text-xs rounded hover:bg-teal-600"
// // // // // // // // //                       >
// // // // // // // // //                         Generate Notebook
// // // // // // // // //                       </button>
// // // // // // // // //                     )}
// // // // // // // // //                   </div>
// // // // // // // // //                 )}
// // // // // // // // //               </div>
// // // // // // // // //             </div>
// // // // // // // // //           ))}

// // // // // // // // //           {isLoading && (
// // // // // // // // //             <div className="mb-4 flex justify-start">
// // // // // // // // //               <div className="max-w-[80%] rounded-lg px-4 py-2 text-xs bg-white border border-gray-200 flex items-center">
// // // // // // // // //                 <FiLoader className="animate-spin mr-2" /> Typing...
// // // // // // // // //               </div>
// // // // // // // // //             </div>
// // // // // // // // //           )}

// // // // // // // // //           <div ref={messagesEndRef} />
// // // // // // // // //         </div>

// // // // // // // // //         {isUploading && (
// // // // // // // // //           <div className="px-4 py-2 border-t border-gray-200 bg-gray-50 text-teal-700 text-xs flex items-center gap-2">
// // // // // // // // //             <FiLoader className="animate-spin" /> Uploading files...
// // // // // // // // //           </div>
// // // // // // // // //         )}
// // // // // // // // //         {selectedFiles && selectedFiles.length > 0 && (
// // // // // // // // //           <div className="px-4 py-2 border-t border-gray-200 bg-gray-50">
// // // // // // // // //             <div className="flex flex-wrap gap-2">
// // // // // // // // //               {Array.from(selectedFiles).map((file) => (
// // // // // // // // //                 <div
// // // // // // // // //                   key={uuidv4()}
// // // // // // // // //                   className="flex flex-col gap-2 bg-white px-2 py-2 rounded border text-xs"
// // // // // // // // //                 >
// // // // // // // // //                   <div className="truncate max-w-[150px]">
// // // // // // // // //                     <strong>{file.name}</strong> ({(file.size / 1024).toFixed(1)} KB)
// // // // // // // // //                   </div>
// // // // // // // // //                 </div>
// // // // // // // // //               ))}
// // // // // // // // //             </div>
// // // // // // // // //             <button
// // // // // // // // //               onClick={handleFileUpload}
// // // // // // // // //               className="mt-2 px-4 py-2 bg-teal-700 text-white text-xs rounded hover:bg-teal-800"
// // // // // // // // //             >
// // // // // // // // //               Upload Files
// // // // // // // // //             </button>
// // // // // // // // //           </div>
// // // // // // // // //         )}

// // // // // // // // //         <div className="p-4 border-t border-gray-200 bg-white">
// // // // // // // // //           <div className="flex items-center gap-2">
// // // // // // // // //             <label className="cursor-pointer text-gray-400 hover:text-gray-600">
// // // // // // // // //               <input
// // // // // // // // //                 type="file"
// // // // // // // // //                 multiple
// // // // // // // // //                 className="hidden"
// // // // // // // // //                 onChange={handleFileSelect}
// // // // // // // // //               />
// // // // // // // // //               <FiPaperclip size={16} />
// // // // // // // // //             </label>
// // // // // // // // //             <input
// // // // // // // // //               type="text"
// // // // // // // // //               value={inputMessage}
// // // // // // // // //               onChange={(e) => setInputMessage(e.target.value)}
// // // // // // // // //               onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
// // // // // // // // //               placeholder="Type your message..."
// // // // // // // // //               className="flex-1 text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:border-teal-400"
// // // // // // // // //             />
// // // // // // // // //             <button
// // // // // // // // //               onClick={handleSendMessage}
// // // // // // // // //               className="text-teal-700 hover:text-teal-800"
// // // // // // // // //             >
// // // // // // // // //               <FiSend size={16} />
// // // // // // // // //             </button>
// // // // // // // // //           </div>
// // // // // // // // //         </div>
// // // // // // // // //       </div>
// // // // // // // // //     </div>
// // // // // // // // //   );
// // // // // // // // // };

// // // // // // // // // export default ChatInterface;




// // // // // // // // import React, { useState, useEffect, useRef } from 'react';
// // // // // // // // import {
// // // // // // // //   FiPlus,
// // // // // // // //   FiMenu,
// // // // // // // //   FiPaperclip,
// // // // // // // //   FiSend,
// // // // // // // //   FiTrash,
// // // // // // // //   FiLoader,
// // // // // // // // } from 'react-icons/fi';
// // // // // // // // import { motion, AnimatePresence } from 'framer-motion';
// // // // // // // // import { v4 as uuidv4 } from 'uuid';
// // // // // // // // import { useNavigate } from 'react-router-dom';

// // // // // // // // interface Message {
// // // // // // // //   id: string;
// // // // // // // //   sender: 'user' | 'assistant';
// // // // // // // //   text: string;
// // // // // // // //   timestamp: string;
// // // // // // // //   button?: boolean; // If true, show "Generate Notebook" or "Open Notebook"
// // // // // // // //   isSchema?: boolean;
// // // // // // // //   schema?: Array<{ column_name: string; data_type: string }>;
// // // // // // // // }

// // // // // // // // interface Chat {
// // // // // // // //   id: string;
// // // // // // // //   title: string;
// // // // // // // //   timestamp: string;
// // // // // // // //   messages: Message[];
// // // // // // // // }

// // // // // // // // const SchemaTable: React.FC<{ schema: Array<{ column_name: string; data_type: string }> }> = ({ schema }) => {
// // // // // // // //   return (
// // // // // // // //     <div className="overflow-x-auto mt-2">
// // // // // // // //       <table className="min-w-full border-collapse">
// // // // // // // //         <thead>
// // // // // // // //           <tr>
// // // // // // // //             <th className="px-4 py-2 border-b bg-gray-100 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Field</th>
// // // // // // // //             <th className="px-4 py-2 border-b bg-gray-100 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Data Type</th>
// // // // // // // //           </tr>
// // // // // // // //         </thead>
// // // // // // // //         <tbody>
// // // // // // // //           {schema.map((field, index) => (
// // // // // // // //             <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
// // // // // // // //               <td className="px-4 py-2 border-b text-xs text-gray-600">{field.column_name}</td>
// // // // // // // //               <td className="px-4 py-2 border-b text-xs text-gray-600">{field.data_type}</td>
// // // // // // // //             </tr>
// // // // // // // //           ))}
// // // // // // // //         </tbody>
// // // // // // // //       </table>
// // // // // // // //     </div>
// // // // // // // //   );
// // // // // // // // };

// // // // // // // // const AnimatedMessage: React.FC<{ text: string; sender: 'user' | 'assistant' }> = ({ text, sender }) => {
// // // // // // // //   const [displayedText, setDisplayedText] = useState('');
// // // // // // // //   const indexRef = useRef(0);

// // // // // // // //   useEffect(() => {
// // // // // // // //     if (sender === 'assistant') {
// // // // // // // //       // Animate assistant messages
// // // // // // // //       const interval = setInterval(() => {
// // // // // // // //         setDisplayedText((prev) => prev + text.charAt(indexRef.current));
// // // // // // // //         indexRef.current += 1;
// // // // // // // //         if (indexRef.current >= text.length) {
// // // // // // // //           clearInterval(interval);
// // // // // // // //         }
// // // // // // // //       }, 9);
// // // // // // // //       return () => clearInterval(interval);
// // // // // // // //     } else {
// // // // // // // //       // User messages show fully at once
// // // // // // // //       setDisplayedText(text);
// // // // // // // //     }
// // // // // // // //   }, [text, sender]);

// // // // // // // //   return <pre className="whitespace-pre-wrap font-sans">{displayedText}</pre>;
// // // // // // // // };

// // // // // // // // const parseSchema = (message: Message): Array<{ column_name: string; data_type: string }> | null => {
// // // // // // // //   if (!message.isSchema || !message.schema) return null;
// // // // // // // //   return message.schema;
// // // // // // // // };

// // // // // // // // const ChatInterface: React.FC = () => {
// // // // // // // //   const defaultMessage = `Hi! 👋 I'm your AI assistant.\nI'll assist you in formulating a predictive question. I'll then create a SQL notebook to build a training set.\nSo, what would you like to predict?`;

// // // // // // // //   // Initial state with a default chat
// // // // // // // //   const [chats, setChats] = useState<Chat[]>([
// // // // // // // //     {
// // // // // // // //       id: '1',
// // // // // // // //       title: 'New Prediction',
// // // // // // // //       timestamp: new Date().toLocaleString(),
// // // // // // // //       messages: [
// // // // // // // //         {
// // // // // // // //           id: uuidv4(),
// // // // // // // //           sender: 'assistant',
// // // // // // // //           text: defaultMessage,
// // // // // // // //           timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
// // // // // // // //         },
// // // // // // // //       ],
// // // // // // // //     },
// // // // // // // //   ]);
// // // // // // // //   const [currentChat, setCurrentChat] = useState<Chat | null>(chats[0]);
// // // // // // // //   const [showSidebar, setShowSidebar] = useState(true);
// // // // // // // //   const [inputMessage, setInputMessage] = useState('');
// // // // // // // //   const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);

// // // // // // // //   const [isLoading, setIsLoading] = useState(false);
// // // // // // // //   const [isUploading, setIsUploading] = useState(false);

// // // // // // // //   const [isGeneratingNotebook, setIsGeneratingNotebook] = useState(false);
// // // // // // // //   const [notebookGenerated, setNotebookGenerated] = useState(false);
// // // // // // // //   const [generatedNotebookData, setGeneratedNotebookData] = useState<any>(null);

// // // // // // // //   const navigate = useNavigate();

// // // // // // // //   const handleNewChat = () => {
// // // // // // // //     const newChat: Chat = {
// // // // // // // //       id: uuidv4(),
// // // // // // // //       title: 'New Prediction',
// // // // // // // //       timestamp: new Date().toLocaleString(),
// // // // // // // //       messages: [
// // // // // // // //         {
// // // // // // // //           id: uuidv4(),
// // // // // // // //           sender: 'assistant',
// // // // // // // //           text: defaultMessage,
// // // // // // // //           timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
// // // // // // // //         },
// // // // // // // //       ],
// // // // // // // //     };
// // // // // // // //     setChats((prev) => [newChat, ...prev]);
// // // // // // // //     setCurrentChat(newChat);

// // // // // // // //     setIsGeneratingNotebook(false);
// // // // // // // //     setNotebookGenerated(false);
// // // // // // // //     setGeneratedNotebookData(null);
// // // // // // // //   };

// // // // // // // //   const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
// // // // // // // //     const files = e.target.files;
// // // // // // // //     if (files && files.length > 0) {
// // // // // // // //       setSelectedFiles(files);
// // // // // // // //     }
// // // // // // // //   };

// // // // // // // //   const handleFileUpload = async () => {
// // // // // // // //     if (!selectedFiles || selectedFiles.length === 0) {
// // // // // // // //       alert('No files selected.');
// // // // // // // //       return;
// // // // // // // //     }

// // // // // // // //     setIsUploading(true);

// // // // // // // //     try {
// // // // // // // //       const formData = new FormData();
// // // // // // // //       Array.from(selectedFiles).forEach((file) => {
// // // // // // // //         formData.append('file', file);
// // // // // // // //       });

// // // // // // // //       // Upload to backend
// // // // // // // //       const response = await fetch('http://localhost:8000/api/chatgpt/', {
// // // // // // // //         method: 'POST',
// // // // // // // //         body: formData,
// // // // // // // //       });

// // // // // // // //       if (!response.ok) {
// // // // // // // //         throw new Error(`Failed to upload file: ${response.statusText}`);
// // // // // // // //       }

// // // // // // // //       const data = await response.json();
// // // // // // // //       console.log('[DEBUG] File upload response:', data);

// // // // // // // //       if (data.uploaded_files && data.uploaded_files.length > 0) {
// // // // // // // //         const uploadedFile = data.uploaded_files[0];
// // // // // // // //         const schema = uploadedFile.schema;
// // // // // // // //         const suggestions = uploadedFile.suggestions;

// // // // // // // //         if (schema && schema.length > 0) {
// // // // // // // //           // Show schema and ask for confirmation
// // // // // // // //           const schemaMessage: Message = {
// // // // // // // //             id: uuidv4(),
// // // // // // // //             sender: 'assistant',
// // // // // // // //             text: 'Dataset uploaded successfully! Below is the schema:',
// // // // // // // //             timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
// // // // // // // //             isSchema: true,
// // // // // // // //             schema: schema,
// // // // // // // //           };

// // // // // // // //           const confirmationText = `
// // // // // // // // Suggested Target Column: ${suggestions.target_column}
// // // // // // // // Suggested Entity ID Column: ${suggestions.entity_id_column}
// // // // // // // // Suggested Feature Columns: ${suggestions.feature_columns.join(', ')}

// // // // // // // // Please confirm:
// // // // // // // // - Is the Target Column correct?
// // // // // // // // - Is the Entity ID Column correct?
// // // // // // // // (Reply 'yes' to confirm or provide the correct column names as needed)
// // // // // // // //           `.trim();

// // // // // // // //           const confirmationMessage: Message = {
// // // // // // // //             id: uuidv4(),
// // // // // // // //             sender: 'assistant',
// // // // // // // //             text: confirmationText,
// // // // // // // //             timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
// // // // // // // //           };

// // // // // // // //           setCurrentChat((prevChat) => {
// // // // // // // //             if (!prevChat) return null;
// // // // // // // //             const updatedMessages = [...prevChat.messages, schemaMessage, confirmationMessage];
// // // // // // // //             return { ...prevChat, messages: updatedMessages };
// // // // // // // //           });

// // // // // // // //           setChats((prevChats) =>
// // // // // // // //             prevChats.map((chat) =>
// // // // // // // //               chat.id === currentChat?.id
// // // // // // // //                 ? { ...chat, messages: [...chat.messages, schemaMessage, confirmationMessage] }
// // // // // // // //                 : chat
// // // // // // // //             )
// // // // // // // //           );
// // // // // // // //         } else {
// // // // // // // //           console.error('Schema data missing.');
// // // // // // // //         }
// // // // // // // //       } else {
// // // // // // // //         console.error('No uploaded_files data.');
// // // // // // // //       }
// // // // // // // //     } catch (error: any) {
// // // // // // // //       console.error('File upload error:', error);
// // // // // // // //       const errorMessage: Message = {
// // // // // // // //         id: uuidv4(),
// // // // // // // //         sender: 'assistant',
// // // // // // // //         text: `Upload Error: ${error instanceof Error ? error.message : 'Unknown error'}`,
// // // // // // // //         timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
// // // // // // // //       };

// // // // // // // //       setCurrentChat((prevChat) => {
// // // // // // // //         if (!prevChat) return null;
// // // // // // // //         return { ...prevChat, messages: [...prevChat.messages, errorMessage] };
// // // // // // // //       });
// // // // // // // //       setChats((prevChats) =>
// // // // // // // //         prevChats.map((chat) =>
// // // // // // // //           chat.id === currentChat?.id ? { ...chat, messages: [...chat.messages, errorMessage] } : chat
// // // // // // // //         )
// // // // // // // //       );
// // // // // // // //     } finally {
// // // // // // // //       setSelectedFiles(null);
// // // // // // // //       setIsUploading(false);
// // // // // // // //     }
// // // // // // // //   };

// // // // // // // //   const handleSendMessage = async () => {
// // // // // // // //     if (!inputMessage.trim()) return;
// // // // // // // //     if (!currentChat) return;

// // // // // // // //     const userMessage: Message = {
// // // // // // // //       id: uuidv4(),
// // // // // // // //       sender: 'user',
// // // // // // // //       text: inputMessage,
// // // // // // // //       timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
// // // // // // // //     };

// // // // // // // //     const updatedChat = {
// // // // // // // //       ...currentChat,
// // // // // // // //       messages: [...currentChat.messages, userMessage],
// // // // // // // //     };

// // // // // // // //     setChats((prevChats) => prevChats.map((chat) => (chat.id === currentChat.id ? updatedChat : chat)));
// // // // // // // //     setCurrentChat(updatedChat);
// // // // // // // //     setInputMessage('');
// // // // // // // //     setIsLoading(true);

// // // // // // // //     try {
// // // // // // // //       // Send user message to backend
// // // // // // // //       const response = await fetch('http://localhost:8000/api/chatgpt/', {
// // // // // // // //         method: 'POST',
// // // // // // // //         headers: { 'Content-Type': 'application/json' },
// // // // // // // //         body: JSON.stringify({ message: userMessage.text, user_id: 'default_user' }),
// // // // // // // //       });

// // // // // // // //       if (!response.ok) {
// // // // // // // //         throw new Error(`Failed to send message: ${response.statusText}`);
// // // // // // // //       }

// // // // // // // //       const data = await response.json();

// // // // // // // //       // Here's the critical part:
// // // // // // // //       // The backend should return something like:
// // // // // // // //       // {
// // // // // // // //       //   "response": "Great! You've confirmed the schema...",
// // // // // // // //       //   "show_generate_notebook": true
// // // // // // // //       // }
// // // // // // // //       // after user confirmation
// // // // // // // //       let showGenerateButton = data.show_generate_notebook || false;

// // // // // // // //       const botMessage: Message = {
// // // // // // // //         id: uuidv4(),
// // // // // // // //         sender: 'assistant',
// // // // // // // //         text: data.response,
// // // // // // // //         timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
// // // // // // // //         button: showGenerateButton, // If true, Generate Notebook button will appear
// // // // // // // //       };

// // // // // // // //       const updatedMessages = [...updatedChat.messages, botMessage];

// // // // // // // //       setChats((prevChats) =>
// // // // // // // //         prevChats.map((chat) =>
// // // // // // // //           chat.id === currentChat.id ? { ...chat, messages: [...updatedMessages] } : chat
// // // // // // // //         )
// // // // // // // //       );

// // // // // // // //       setCurrentChat((prevChat) =>
// // // // // // // //         prevChat ? { ...prevChat, messages: [...updatedMessages] } : null
// // // // // // // //       );

// // // // // // // //       // After confirmation, if show_generate_notebook is true,
// // // // // // // //       // user will see the "Generate Notebook" button in the last assistant message.
// // // // // // // //       setIsGeneratingNotebook(false);
// // // // // // // //       setNotebookGenerated(false);
// // // // // // // //       setGeneratedNotebookData(null);
// // // // // // // //     } catch (error) {
// // // // // // // //       console.error('Error sending message:', error);
// // // // // // // //       const errorMessage: Message = {
// // // // // // // //         id: uuidv4(),
// // // // // // // //         sender: 'assistant',
// // // // // // // //         text: 'Sorry, I encountered an issue. Please try again later.',
// // // // // // // //         timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
// // // // // // // //       };

// // // // // // // //       setChats((prevChats) =>
// // // // // // // //         prevChats.map((chat) =>
// // // // // // // //           chat.id === currentChat.id ? { ...chat, messages: [...chat.messages, errorMessage] } : chat
// // // // // // // //         )
// // // // // // // //       );
// // // // // // // //     } finally {
// // // // // // // //       setIsLoading(false);
// // // // // // // //     }
// // // // // // // //   };

// // // // // // // //   const handleGenerateNotebook = async () => {
// // // // // // // //     if (!currentChat) return;
// // // // // // // //     setIsGeneratingNotebook(true);

// // // // // // // //     try {
// // // // // // // //       const response = await fetch('http://localhost:8000/api/chatgpt/', {
// // // // // // // //         method: 'POST',
// // // // // // // //         headers: { 'Content-Type': 'application/json' },
// // // // // // // //         body: JSON.stringify({ action: 'generate_notebook', user_id: 'default_user' }),
// // // // // // // //       });

// // // // // // // //       if (!response.ok) {
// // // // // // // //         throw new Error(`Failed to generate notebook: ${response.statusText}`);
// // // // // // // //       }

// // // // // // // //       const data = await response.json();
// // // // // // // //       console.log('[DEBUG] Notebook generated:', data);

// // // // // // // //       if (data.notebooks) {
// // // // // // // //         setGeneratedNotebookData(data.notebooks);
// // // // // // // //         setNotebookGenerated(true);

// // // // // // // //         const notebookMessage: Message = {
// // // // // // // //           id: uuidv4(),
// // // // // // // //           sender: 'assistant',
// // // // // // // //           text: 'Notebook has been generated successfully.',
// // // // // // // //           timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
// // // // // // // //         };

// // // // // // // //         setChats((prevChats) =>
// // // // // // // //           prevChats.map((chat) =>
// // // // // // // //             chat.id === currentChat.id ? { ...chat, messages: [...chat.messages, notebookMessage] } : chat
// // // // // // // //           )
// // // // // // // //         );

// // // // // // // //         setCurrentChat((prevChat) =>
// // // // // // // //           prevChat ? { ...prevChat, messages: [...prevChat.messages, notebookMessage] } : null
// // // // // // // //         );
// // // // // // // //       } else {
// // // // // // // //         alert('Error generating notebook. Please try again.');
// // // // // // // //       }
// // // // // // // //     } catch (error) {
// // // // // // // //       console.error('Error generating notebook:', error);
// // // // // // // //       alert('Error generating notebook. Please try again.');
// // // // // // // //     } finally {
// // // // // // // //       setIsGeneratingNotebook(false);
// // // // // // // //     }
// // // // // // // //   };

// // // // // // // //   const handleOpenNotebook = () => {
// // // // // // // //     if (generatedNotebookData) {
// // // // // // // //       navigate('/notebook', { state: { notebooks: generatedNotebookData } });
// // // // // // // //     } else {
// // // // // // // //       alert('No notebook data available.');
// // // // // // // //     }
// // // // // // // //   };

// // // // // // // //   const handleReset = async () => {
// // // // // // // //     await fetch('http://localhost:8000/api/chatgpt/', {
// // // // // // // //       method: 'POST',
// // // // // // // //       headers: { 'Content-Type': 'application/json' },
// // // // // // // //       body: JSON.stringify({ action: 'reset', user_id: 'default_user' }),
// // // // // // // //     });

// // // // // // // //     setCurrentChat((prevChat) =>
// // // // // // // //       prevChat
// // // // // // // //         ? {
// // // // // // // //             ...prevChat,
// // // // // // // //             messages: [
// // // // // // // //               {
// // // // // // // //                 id: uuidv4(),
// // // // // // // //                 sender: 'assistant',
// // // // // // // //                 text: defaultMessage,
// // // // // // // //                 timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
// // // // // // // //               },
// // // // // // // //             ],
// // // // // // // //           }
// // // // // // // //         : null
// // // // // // // //     );

// // // // // // // //     setIsGeneratingNotebook(false);
// // // // // // // //     setNotebookGenerated(false);
// // // // // // // //     setGeneratedNotebookData(null);
// // // // // // // //   };

// // // // // // // //   const messagesEndRef = useRef<HTMLDivElement | null>(null);
// // // // // // // //   const scrollToBottom = () => {
// // // // // // // //     messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
// // // // // // // //   };

// // // // // // // //   useEffect(() => {
// // // // // // // //     scrollToBottom();
// // // // // // // //   }, [currentChat?.messages, isLoading, isUploading]);

// // // // // // // //   return (
// // // // // // // //     <div className="h-screen flex bg-gray-50">
// // // // // // // //       <AnimatePresence>
// // // // // // // //         {showSidebar && (
// // // // // // // //           <motion.div
// // // // // // // //             initial={{ x: -240 }}
// // // // // // // //             animate={{ x: 0 }}
// // // // // // // //             exit={{ x: -240 }}
// // // // // // // //             transition={{ duration: 0.2 }}
// // // // // // // //             className="w-60 border-r border-gray-200 bg-white"
// // // // // // // //           >
// // // // // // // //             <div className="p-3 border-b border-gray-100 flex justify-between items-center">
// // // // // // // //               <span className="text-xs font-medium text-gray-600">Chat History</span>
// // // // // // // //               <button
// // // // // // // //                 onClick={handleNewChat}
// // // // // // // //                 className="text-xs flex items-center gap-1 text-teal-700 hover:text-teal-800"
// // // // // // // //               >
// // // // // // // //                 <FiPlus size={12} /> New
// // // // // // // //               </button>
// // // // // // // //             </div>
// // // // // // // //             <div className="overflow-y-auto h-[calc(100vh-49px)]">
// // // // // // // //               {chats.map((chat) => (
// // // // // // // //                 <div
// // // // // // // //                   key={chat.id}
// // // // // // // //                   onClick={() => setCurrentChat(chat)}
// // // // // // // //                   className={`p-2 mx-2 my-1 rounded text-xs cursor-pointer flex items-center justify-between group ${
// // // // // // // //                     currentChat?.id === chat.id ? 'bg-teal-50 text-teal-700' : 'hover:bg-gray-50'
// // // // // // // //                   }`}
// // // // // // // //                 >
// // // // // // // //                   <div className="truncate flex-1">
// // // // // // // //                     <div className="font-medium truncate">{chat.title}</div>
// // // // // // // //                     <div className="text-[10px] text-gray-400">{chat.timestamp}</div>
// // // // // // // //                   </div>
// // // // // // // //                   <button
// // // // // // // //                     onClick={(e) => {
// // // // // // // //                       e.stopPropagation();
// // // // // // // //                       setChats((prev) => prev.filter((c) => c.id !== chat.id));
// // // // // // // //                       if (currentChat?.id === chat.id) {
// // // // // // // //                         setCurrentChat(null);
// // // // // // // //                       }
// // // // // // // //                     }}
// // // // // // // //                     className="opacity-0 group-hover:opacity-100 p-1 hover:text-red-500"
// // // // // // // //                   >
// // // // // // // //                     <FiTrash size={12} />
// // // // // // // //                   </button>
// // // // // // // //                 </div>
// // // // // // // //               ))}
// // // // // // // //             </div>
// // // // // // // //           </motion.div>
// // // // // // // //         )}
// // // // // // // //       </AnimatePresence>

// // // // // // // //       <div className="flex-1 flex flex-col">
// // // // // // // //         <div className="h-12 border-b border-gray-200 flex items-center px-4 bg-white">
// // // // // // // //           <button
// // // // // // // //             onClick={() => setShowSidebar(!showSidebar)}
// // // // // // // //             className="text-gray-500 hover:text-gray-700"
// // // // // // // //           >
// // // // // // // //             <FiMenu size={16} />
// // // // // // // //           </button>
// // // // // // // //           <span className="ml-4 text-sm font-medium">{currentChat?.title || 'Select a chat'}</span>
// // // // // // // //           <div className="ml-auto">
// // // // // // // //             <button
// // // // // // // //               onClick={handleReset}
// // // // // // // //               className="text-xs text-red-500 hover:text-red-600 flex items-center gap-1"
// // // // // // // //             >
// // // // // // // //               <FiTrash size={12} /> Reset
// // // // // // // //             </button>
// // // // // // // //           </div>
// // // // // // // //         </div>

// // // // // // // //         <div className="flex-1 overflow-y-auto px-4 py-6">
// // // // // // // //           {currentChat?.messages.map((message) => {
// // // // // // // //             const schemaData = parseSchema(message);
// // // // // // // //             return (
// // // // // // // //               <div
// // // // // // // //                 key={message.id}
// // // // // // // //                 className={`mb-4 flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
// // // // // // // //               >
// // // // // // // //                 <div
// // // // // // // //                   className={`max-w-[80%] rounded-lg px-4 py-2 text-xs ${
// // // // // // // //                     message.sender === 'user' ? 'bg-teal-700 text-white' : 'bg-white border border-gray-200'
// // // // // // // //                   }`}
// // // // // // // //                 >
// // // // // // // //                   {message.isSchema && schemaData ? (
// // // // // // // //                     <>
// // // // // // // //                       <AnimatedMessage text={message.text} sender={message.sender} />
// // // // // // // //                       <SchemaTable schema={schemaData} />
// // // // // // // //                     </>
// // // // // // // //                   ) : (
// // // // // // // //                     <AnimatedMessage text={message.text} sender={message.sender} />
// // // // // // // //                   )}

// // // // // // // //                   <div className={`text-[10px] mt-1 ${message.sender === 'user' ? 'text-teal-300' : 'text-gray-400'}`}>
// // // // // // // //                     {message.timestamp}
// // // // // // // //                   </div>

// // // // // // // //                   {/* If message.button is true, show the "Generate Notebook" or "Open Notebook" button */}
// // // // // // // //                   {message.button && (
// // // // // // // //                     <div className="mt-2 flex gap-2">
// // // // // // // //                       {isGeneratingNotebook ? (
// // // // // // // //                         <button
// // // // // // // //                           disabled
// // // // // // // //                           className="flex items-center gap-2 px-4 py-2 bg-teal-500 text-white text-xs rounded"
// // // // // // // //                         >
// // // // // // // //                           <FiLoader className="animate-spin" /> Generating...
// // // // // // // //                         </button>
// // // // // // // //                       ) : notebookGenerated ? (
// // // // // // // //                         <button
// // // // // // // //                           onClick={handleOpenNotebook}
// // // // // // // //                           className="px-4 py-2 bg-teal-500 text-white text-xs rounded hover:bg-teal-600"
// // // // // // // //                         >
// // // // // // // //                           Open Notebook
// // // // // // // //                         </button>
// // // // // // // //                       ) : (
// // // // // // // //                         <button
// // // // // // // //                           onClick={handleGenerateNotebook}
// // // // // // // //                           className="px-4 py-2 bg-teal-500 text-white text-xs rounded hover:bg-teal-600"
// // // // // // // //                         >
// // // // // // // //                           Generate Notebook
// // // // // // // //                         </button>
// // // // // // // //                       )}
// // // // // // // //                     </div>
// // // // // // // //                   )}
// // // // // // // //                 </div>
// // // // // // // //               </div>
// // // // // // // //             );
// // // // // // // //           })}

// // // // // // // //           {isLoading && (
// // // // // // // //             <div className="mb-4 flex justify-start">
// // // // // // // //               <div className="max-w-[80%] rounded-lg px-4 py-2 text-xs bg-white border border-gray-200 flex items-center">
// // // // // // // //                 <FiLoader className="animate-spin mr-2" /> Typing...
// // // // // // // //               </div>
// // // // // // // //             </div>
// // // // // // // //           )}

// // // // // // // //           <div ref={messagesEndRef} />
// // // // // // // //         </div>

// // // // // // // //         {isUploading && (
// // // // // // // //           <div className="px-4 py-2 border-t border-gray-200 bg-gray-50 text-teal-700 text-xs flex items-center gap-2">
// // // // // // // //             <FiLoader className="animate-spin" /> Uploading files...
// // // // // // // //           </div>
// // // // // // // //         )}
// // // // // // // //         {selectedFiles && selectedFiles.length > 0 && (
// // // // // // // //           <div className="px-4 py-2 border-t border-gray-200 bg-gray-50">
// // // // // // // //             <div className="flex flex-wrap gap-2">
// // // // // // // //               {Array.from(selectedFiles).map((file) => (
// // // // // // // //                 <div key={uuidv4()} className="flex flex-col gap-2 bg-white px-2 py-2 rounded border text-xs">
// // // // // // // //                   <div className="truncate max-w-[150px]">
// // // // // // // //                     <strong>{file.name}</strong> ({(file.size / 1024).toFixed(1)} KB)
// // // // // // // //                   </div>
// // // // // // // //                 </div>
// // // // // // // //               ))}
// // // // // // // //             </div>
// // // // // // // //             <button
// // // // // // // //               onClick={handleFileUpload}
// // // // // // // //               className="mt-2 px-4 py-2 bg-teal-700 text-white text-xs rounded hover:bg-teal-800"
// // // // // // // //             >
// // // // // // // //               Upload Files
// // // // // // // //             </button>
// // // // // // // //           </div>
// // // // // // // //         )}

// // // // // // // //         <div className="p-4 border-t border-gray-200 bg-white">
// // // // // // // //           <div className="flex items-center gap-2">
// // // // // // // //             <label className="cursor-pointer text-gray-400 hover:text-gray-600">
// // // // // // // //               <input type="file" multiple className="hidden" onChange={handleFileSelect} />
// // // // // // // //               <FiPaperclip size={16} />
// // // // // // // //             </label>
// // // // // // // //             <input
// // // // // // // //               type="text"
// // // // // // // //               value={inputMessage}
// // // // // // // //               onChange={(e) => setInputMessage(e.target.value)}
// // // // // // // //               onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
// // // // // // // //               placeholder="Type your message..."
// // // // // // // //               className="flex-1 text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:border-teal-400"
// // // // // // // //             />
// // // // // // // //             <button onClick={handleSendMessage} className="text-teal-700 hover:text-teal-800">
// // // // // // // //               <FiSend size={16} />
// // // // // // // //             </button>
// // // // // // // //           </div>
// // // // // // // //         </div>
// // // // // // // //       </div>
// // // // // // // //     </div>
// // // // // // // //   );
// // // // // // // // };

// // // // // // // // export default ChatInterface;



// // // // // // import React, { useState, useEffect, useRef } from 'react';
// // // // // // import {
// // // // // //   FiPlus,
// // // // // //   FiMenu,
// // // // // //   FiPaperclip,
// // // // // //   FiSend,
// // // // // //   FiTrash,
// // // // // //   FiLoader,
// // // // // // } from 'react-icons/fi';
// // // // // // import { motion, AnimatePresence } from 'framer-motion';
// // // // // // import { v4 as uuidv4 } from 'uuid';
// // // // // // import { useNavigate } from 'react-router-dom';

// // // // // // interface Message {
// // // // // //   id: string;
// // // // // //   sender: 'user' | 'assistant';
// // // // // //   text: string;
// // // // // //   timestamp: string;
// // // // // //   button?: boolean; // If true, show "Generate Notebook" or "Open Notebook"
// // // // // //   isSchema?: boolean;
// // // // // //   schema?: Array<{ column_name: string; data_type: string }>;
// // // // // //   animated?: boolean; // Indicates whether to show typing animation or not
// // // // // // }

// // // // // // interface Chat {
// // // // // //   id: string;
// // // // // //   title: string;
// // // // // //   timestamp: string;
// // // // // //   messages: Message[];
// // // // // //   isHistory?: boolean; // Indicates if this chat is from fetched history or newly created
// // // // // // }

// // // // // // const SchemaTable: React.FC<{ schema: Array<{ column_name: string; data_type: string }> }> = ({ schema }) => {
// // // // // //   return (
// // // // // //     <div className="overflow-x-auto mt-2">
// // // // // //       <table className="min-w-full border-collapse">
// // // // // //         <thead>
// // // // // //           <tr>
// // // // // //             <th className="px-4 py-2 border-b bg-gray-100 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Field</th>
// // // // // //             <th className="px-4 py-2 border-b bg-gray-100 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Data Type</th>
// // // // // //           </tr>
// // // // // //         </thead>
// // // // // //         <tbody>
// // // // // //           {schema.map((field, index) => (
// // // // // //             <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
// // // // // //               <td className="px-4 py-2 border-b text-xs text-gray-600">{field.column_name}</td>
// // // // // //               <td className="px-4 py-2 border-b text-xs text-gray-600">{field.data_type}</td>
// // // // // //             </tr>
// // // // // //           ))}
// // // // // //         </tbody>
// // // // // //       </table>
// // // // // //     </div>
// // // // // //   );
// // // // // // };

// // // // // // const AnimatedMessage: React.FC<{ text: string; sender: 'user' | 'assistant'; animated?: boolean }> = ({ text, sender, animated }) => {
// // // // // //   const [displayedText, setDisplayedText] = useState('');
// // // // // //   const indexRef = useRef(0);

// // // // // //   useEffect(() => {
// // // // // //     if (animated && sender === 'assistant') {
// // // // // //       const interval = setInterval(() => {
// // // // // //         setDisplayedText((prev) => prev + text.charAt(indexRef.current));
// // // // // //         indexRef.current += 1;
// // // // // //         if (indexRef.current >= text.length) {
// // // // // //           clearInterval(interval);
// // // // // //         }
// // // // // //       }, 9);
// // // // // //       return () => clearInterval(interval);
// // // // // //     } else {
// // // // // //       setDisplayedText(text);
// // // // // //     }
// // // // // //   }, [text, sender, animated]);

// // // // // //   return <pre className="whitespace-pre-wrap font-sans">{displayedText}</pre>;
// // // // // // };

// // // // // // const parseSchema = (message: Message): Array<{ column_name: string; data_type: string }> | null => {
// // // // // //   if (!message.isSchema || !message.schema) return null;
// // // // // //   return message.schema;
// // // // // // };

// // // // // // // Function to format timestamp to 12hr IST format
// // // // // // function formatTimestamp(ts: string): string {
// // // // // //   const date = new Date(ts);
// // // // // //   return date.toLocaleString('en-IN', {
// // // // // //     hour: '2-digit',
// // // // // //     minute: '2-digit',
// // // // // //     hour12: true,
// // // // // //     timeZone: 'Asia/Kolkata',
// // // // // //   });
// // // // // // }

// // // // // // const ChatInterface: React.FC = () => {
// // // // // //   const defaultMessage = `Hi! 👋 I'm your AI assistant.\nI'll assist you in formulating a predictive question. I'll then create a SQL notebook to build a training set.\nSo, what would you like to predict?`;

// // // // // //   const [chats, setChats] = useState<Chat[]>([]);
// // // // // //   const [currentChat, setCurrentChat] = useState<Chat | null>(null);
// // // // // //   const [showSidebar, setShowSidebar] = useState(true);
// // // // // //   const [inputMessage, setInputMessage] = useState('');
// // // // // //   const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);

// // // // // //   const [isLoading, setIsLoading] = useState(false);
// // // // // //   const [isUploading, setIsUploading] = useState(false);

// // // // // //   const [isGeneratingNotebook, setIsGeneratingNotebook] = useState(false);
// // // // // //   const [notebookGenerated, setNotebookGenerated] = useState(false);
// // // // // //   const [generatedNotebookData, setGeneratedNotebookData] = useState<any>(null);

// // // // // //   const navigate = useNavigate();

// // // // // //   useEffect(() => {
// // // // // //     const fetchChatHistory = async () => {
// // // // // //       try {
// // // // // //         const response = await fetch('http://localhost:8000/api/chat_history?user_id=12');
// // // // // //         if (!response.ok) {
// // // // // //           initializeDefaultChat();
// // // // // //           return;
// // // // // //         }

// // // // // //         const data = await response.json();
// // // // // //         if (Array.isArray(data) && data.length > 0) {
// // // // // //           const fetchedChats: Chat[] = data.map((chatItem: any) => {
// // // // // //             const allMessagesRaw = [
// // // // // //               ...chatItem.user_messages.map((m: any) => ({ ...m, sender: 'user' })),
// // // // // //               ...chatItem.assistant_messages.map((m: any) => ({ ...m, sender: 'assistant' })),
// // // // // //             ];

// // // // // //             allMessagesRaw.sort((a: any, b: any) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());

// // // // // //             const allMessages: Message[] = allMessagesRaw.map((msg: any) => {
// // // // // //               return {
// // // // // //                 id: uuidv4(),
// // // // // //                 sender: msg.sender,
// // // // // //                 text: msg.text,
// // // // // //                 timestamp: formatTimestamp(msg.timestamp),
// // // // // //                 animated: false // History messages should not animate
// // // // // //               };
// // // // // //             });

// // // // // //             return {
// // // // // //               id: chatItem.chat_id,
// // // // // //               title: chatItem.title,
// // // // // //               timestamp: allMessages.length > 0 ? allMessages[allMessages.length - 1].timestamp : '',
// // // // // //               messages: allMessages,
// // // // // //               isHistory: true // Mark this chat as history
// // // // // //             };
// // // // // //           });

// // // // // //           setChats(fetchedChats);
// // // // // //           setCurrentChat(fetchedChats[0]);
// // // // // //         } else {
// // // // // //           initializeDefaultChat();
// // // // // //         }
// // // // // //       } catch (error) {
// // // // // //         console.error('Error fetching chat history:', error);
// // // // // //         initializeDefaultChat();
// // // // // //       }
// // // // // //     };

// // // // // //     const initializeDefaultChat = () => {
// // // // // //       const initialChat: Chat = {
// // // // // //         id: '1',
// // // // // //         title: 'New Prediction',
// // // // // //         timestamp: new Date().toLocaleString(),
// // // // // //         messages: [
// // // // // //           {
// // // // // //             id: uuidv4(),
// // // // // //             sender: 'assistant',
// // // // // //             text: defaultMessage,
// // // // // //             timestamp: formatTimestamp(new Date().toISOString()),
// // // // // //             animated: true // Default new chat assistant message should animate
// // // // // //           },
// // // // // //         ],
// // // // // //         isHistory: false
// // // // // //       };
// // // // // //       setChats([initialChat]);
// // // // // //       setCurrentChat(initialChat);
// // // // // //     };

// // // // // //     fetchChatHistory();
// // // // // //   }, []);

// // // // // //   const handleNewChat = () => {
// // // // // //     const newChat: Chat = {
// // // // // //       id: uuidv4(),
// // // // // //       title: 'New Prediction',
// // // // // //       timestamp: new Date().toLocaleString(),
// // // // // //       messages: [
// // // // // //         {
// // // // // //           id: uuidv4(),
// // // // // //           sender: 'assistant',
// // // // // //           text: defaultMessage,
// // // // // //           timestamp: formatTimestamp(new Date().toISOString()),
// // // // // //           animated: true // New chat initial message should animate
// // // // // //         },
// // // // // //       ],
// // // // // //       isHistory: false
// // // // // //     };
// // // // // //     setChats((prev) => [newChat, ...prev]);
// // // // // //     setCurrentChat(newChat);

// // // // // //     setIsGeneratingNotebook(false);
// // // // // //     setNotebookGenerated(false);
// // // // // //     setGeneratedNotebookData(null);
// // // // // //   };

// // // // // //   const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
// // // // // //     const files = e.target.files;
// // // // // //     if (files && files.length > 0) {
// // // // // //       setSelectedFiles(files);
// // // // // //     }
// // // // // //   };

// // // // // //   const handleFileUpload = async () => {
// // // // // //     if (!selectedFiles || selectedFiles.length === 0) {
// // // // // //       alert('No files selected.');
// // // // // //       return;
// // // // // //     }

// // // // // //     setIsUploading(true);

// // // // // //     try {
// // // // // //       const formData = new FormData();
// // // // // //       Array.from(selectedFiles).forEach((file) => {
// // // // // //         formData.append('file', file);
// // // // // //       });

// // // // // //       const response = await fetch('http://localhost:8000/api/chatgpt/', {
// // // // // //         method: 'POST',
// // // // // //         body: formData,
// // // // // //       });

// // // // // //       if (!response.ok) {
// // // // // //         throw new Error(`Failed to upload file: ${response.statusText}`);
// // // // // //       }

// // // // // //       const data = await response.json();
// // // // // //       console.log('[DEBUG] File upload response:', data);

// // // // // //       if (data.uploaded_files && data.uploaded_files.length > 0) {
// // // // // //         const uploadedFile = data.uploaded_files[0];
// // // // // //         const schema = uploadedFile.schema;
// // // // // //         const suggestions = uploadedFile.suggestions;

// // // // // //         if (schema && schema.length > 0) {
// // // // // //           const schemaMessage: Message = {
// // // // // //             id: uuidv4(),
// // // // // //             sender: 'assistant',
// // // // // //             text: 'Dataset uploaded successfully! Below is the schema:',
// // // // // //             timestamp: formatTimestamp(new Date().toISOString()),
// // // // // //             isSchema: true,
// // // // // //             schema: schema,
// // // // // //             animated: true
// // // // // //           };

// // // // // //           const confirmationText = `
// // // // // // Suggested Target Column: ${suggestions.target_column}
// // // // // // Suggested Entity ID Column: ${suggestions.entity_id_column}
// // // // // // Suggested Feature Columns: ${suggestions.feature_columns.join(', ')}

// // // // // // Please confirm:
// // // // // // - Is the Target Column correct?
// // // // // // - Is the Entity ID Column correct?
// // // // // // (Reply 'yes' to confirm or provide the correct column names as needed)
// // // // // //           `.trim();

// // // // // //           const confirmationMessage: Message = {
// // // // // //             id: uuidv4(),
// // // // // //             sender: 'assistant',
// // // // // //             text: confirmationText,
// // // // // //             timestamp: formatTimestamp(new Date().toISOString()),
// // // // // //             animated: true
// // // // // //           };

// // // // // //           setCurrentChat((prevChat) => {
// // // // // //             if (!prevChat) return null;
// // // // // //             const updatedMessages = [...prevChat.messages, schemaMessage, confirmationMessage];
// // // // // //             return { ...prevChat, messages: updatedMessages };
// // // // // //           });

// // // // // //           setChats((prevChats) =>
// // // // // //             prevChats.map((chat) =>
// // // // // //               chat.id === currentChat?.id
// // // // // //                 ? { ...chat, messages: [...chat.messages, schemaMessage, confirmationMessage] }
// // // // // //                 : chat
// // // // // //             )
// // // // // //           );
// // // // // //         } else {
// // // // // //           console.error('Schema data missing.');
// // // // // //         }
// // // // // //       } else {
// // // // // //         console.error('No uploaded_files data.');
// // // // // //       }
// // // // // //     } catch (error: any) {
// // // // // //       console.error('File upload error:', error);
// // // // // //       const errorMessage: Message = {
// // // // // //         id: uuidv4(),
// // // // // //         sender: 'assistant',
// // // // // //         text: `Upload Error: ${error instanceof Error ? error.message : 'Unknown error'}`,
// // // // // //         timestamp: formatTimestamp(new Date().toISOString()),
// // // // // //         animated: true
// // // // // //       };

// // // // // //       setCurrentChat((prevChat) => {
// // // // // //         if (!prevChat) return null;
// // // // // //         return { ...prevChat, messages: [...prevChat.messages, errorMessage] };
// // // // // //       });
// // // // // //       setChats((prevChats) =>
// // // // // //         prevChats.map((chat) =>
// // // // // //           chat.id === currentChat?.id ? { ...chat, messages: [...chat.messages, errorMessage] } : chat
// // // // // //         )
// // // // // //       );
// // // // // //     } finally {
// // // // // //       setSelectedFiles(null);
// // // // // //       setIsUploading(false);
// // // // // //     }
// // // // // //   };

// // // // // //   const handleSendMessage = async () => {
// // // // // //     if (!inputMessage.trim()) return;
// // // // // //     if (!currentChat) return;

// // // // // //     // If current chat is from history, disable chat compose
// // // // // //     if (currentChat.isHistory) return;

// // // // // //     const userMessage: Message = {
// // // // // //       id: uuidv4(),
// // // // // //       sender: 'user',
// // // // // //       text: inputMessage,
// // // // // //       timestamp: formatTimestamp(new Date().toISOString()),
// // // // // //       animated: false
// // // // // //     };

// // // // // //     const updatedChat = {
// // // // // //       ...currentChat,
// // // // // //       messages: [...currentChat.messages, userMessage],
// // // // // //       timestamp: userMessage.timestamp,
// // // // // //     };

// // // // // //     setChats((prevChats) => prevChats.map((chat) => (chat.id === currentChat.id ? updatedChat : chat)));
// // // // // //     setCurrentChat(updatedChat);
// // // // // //     setInputMessage('');
// // // // // //     setIsLoading(true);

// // // // // //     try {
// // // // // //       const response = await fetch('http://localhost:8000/api/chatgpt/', {
// // // // // //         method: 'POST',
// // // // // //         headers: { 'Content-Type': 'application/json' },
// // // // // //         body: JSON.stringify({ message: userMessage.text, user_id: 'default_user' }),
// // // // // //       });

// // // // // //       if (!response.ok) {
// // // // // //         throw new Error(`Failed to send message: ${response.statusText}`);
// // // // // //       }

// // // // // //       const data = await response.json();
// // // // // //       let showGenerateButton = data.show_generate_notebook || false;

// // // // // //       const botMessage: Message = {
// // // // // //         id: uuidv4(),
// // // // // //         sender: 'assistant',
// // // // // //         text: data.response,
// // // // // //         timestamp: formatTimestamp(new Date().toISOString()),
// // // // // //         button: showGenerateButton,
// // // // // //         animated: true
// // // // // //       };

// // // // // //       const updatedMessages = [...updatedChat.messages, botMessage];

// // // // // //       setChats((prevChats) =>
// // // // // //         prevChats.map((chat) =>
// // // // // //           chat.id === currentChat.id ? { ...chat, messages: [...updatedMessages] } : chat
// // // // // //         )
// // // // // //       );

// // // // // //       setCurrentChat((prevChat) =>
// // // // // //         prevChat ? { ...prevChat, messages: [...updatedMessages] } : null
// // // // // //       );

// // // // // //       setIsGeneratingNotebook(false);
// // // // // //       setNotebookGenerated(false);
// // // // // //       setGeneratedNotebookData(null);
// // // // // //     } catch (error) {
// // // // // //       console.error('Error sending message:', error);
// // // // // //       const errorMessage: Message = {
// // // // // //         id: uuidv4(),
// // // // // //         sender: 'assistant',
// // // // // //         text: 'Sorry, I encountered an issue. Please try again later.',
// // // // // //         timestamp: formatTimestamp(new Date().toISOString()),
// // // // // //         animated: true
// // // // // //       };

// // // // // //       setChats((prevChats) =>
// // // // // //         prevChats.map((chat) =>
// // // // // //           chat.id === currentChat.id ? { ...chat, messages: [...chat.messages, errorMessage] } : chat
// // // // // //         )
// // // // // //       );
// // // // // //     } finally {
// // // // // //       setIsLoading(false);
// // // // // //     }
// // // // // //   };

// // // // // //   const handleGenerateNotebook = async () => {
// // // // // //     if (!currentChat) return;
// // // // // //     setIsGeneratingNotebook(true);

// // // // // //     try {
// // // // // //       const response = await fetch('http://localhost:8000/api/chatgpt/', {
// // // // // //         method: 'POST',
// // // // // //         headers: { 'Content-Type': 'application/json' },
// // // // // //         body: JSON.stringify({ action: 'generate_notebook', user_id: 'default_user' }),
// // // // // //       });

// // // // // //       if (!response.ok) {
// // // // // //         throw new Error(`Failed to generate notebook: ${response.statusText}`);
// // // // // //       }

// // // // // //       const data = await response.json();
// // // // // //       console.log('[DEBUG] Notebook generated:', data);

// // // // // //       if (data.notebooks) {
// // // // // //         setGeneratedNotebookData(data.notebooks);
// // // // // //         setNotebookGenerated(true);

// // // // // //         const notebookMessage: Message = {
// // // // // //           id: uuidv4(),
// // // // // //           sender: 'assistant',
// // // // // //           text: 'Notebook has been generated successfully.',
// // // // // //           timestamp: formatTimestamp(new Date().toISOString()),
// // // // // //           animated: true
// // // // // //         };

// // // // // //         setChats((prevChats) =>
// // // // // //           prevChats.map((chat) =>
// // // // // //             chat.id === currentChat.id ? { ...chat, messages: [...chat.messages, notebookMessage] } : chat
// // // // // //           )
// // // // // //         );

// // // // // //         setCurrentChat((prevChat) =>
// // // // // //           prevChat ? { ...prevChat, messages: [...prevChat.messages, notebookMessage] } : null
// // // // // //         );
// // // // // //       } else {
// // // // // //         alert('Error generating notebook. Please try again.');
// // // // // //       }
// // // // // //     } catch (error) {
// // // // // //       console.error('Error generating notebook:', error);
// // // // // //       alert('Error generating notebook. Please try again.');
// // // // // //     } finally {
// // // // // //       setIsGeneratingNotebook(false);
// // // // // //     }
// // // // // //   };

// // // // // //   const handleOpenNotebook = () => {
// // // // // //     if (generatedNotebookData) {
// // // // // //       navigate('/notebook', { state: { notebooks: generatedNotebookData } });
// // // // // //     } else {
// // // // // //       alert('No notebook data available.');
// // // // // //     }
// // // // // //   };

// // // // // //   const handleReset = async () => {
// // // // // //     await fetch('http://localhost:8000/api/chatgpt/', {
// // // // // //       method: 'POST',
// // // // // //       headers: { 'Content-Type': 'application/json' },
// // // // // //       body: JSON.stringify({ action: 'reset', user_id: 'default_user' }),
// // // // // //     });

// // // // // //     const initialChat: Chat = {
// // // // // //       id: '1',
// // // // // //       title: 'New Prediction',
// // // // // //       timestamp: new Date().toLocaleString(),
// // // // // //       messages: [
// // // // // //         {
// // // // // //           id: uuidv4(),
// // // // // //           sender: 'assistant',
// // // // // //           text: defaultMessage,
// // // // // //           timestamp: formatTimestamp(new Date().toISOString()),
// // // // // //           animated: true
// // // // // //         },
// // // // // //       ],
// // // // // //       isHistory: false
// // // // // //     };

// // // // // //     setChats([initialChat]);
// // // // // //     setCurrentChat(initialChat);

// // // // // //     setIsGeneratingNotebook(false);
// // // // // //     setNotebookGenerated(false);
// // // // // //     setGeneratedNotebookData(null);
// // // // // //   };

// // // // // //   const messagesEndRef = useRef<HTMLDivElement | null>(null);
// // // // // //   const scrollToBottom = () => {
// // // // // //     messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
// // // // // //   };

// // // // // //   useEffect(() => {
// // // // // //     scrollToBottom();
// // // // // //   }, [currentChat?.messages, isLoading, isUploading]);

// // // // // //   const isHistoryChat = currentChat?.isHistory;

// // // // // //   return (
// // // // // //     <div className="h-screen flex bg-gray-50">
// // // // // //       <AnimatePresence>
// // // // // //         {showSidebar && (
// // // // // //           <motion.div
// // // // // //             initial={{ x: -240 }}
// // // // // //             animate={{ x: 0 }}
// // // // // //             exit={{ x: -240 }}
// // // // // //             transition={{ duration: 0.2 }}
// // // // // //             className="w-60 border-r border-gray-200 bg-white"
// // // // // //           >
// // // // // //             <div className="p-3 border-b border-gray-100 flex justify-between items-center">
// // // // // //               <span className="text-xs font-medium text-gray-600">Chat History</span>
// // // // // //               <button
// // // // // //                 onClick={handleNewChat}
// // // // // //                 className="text-xs flex items-center gap-1 text-teal-700 hover:text-teal-800"
// // // // // //               >
// // // // // //                 <FiPlus size={12} /> New
// // // // // //               </button>
// // // // // //             </div>
// // // // // //             <div className="overflow-y-auto h-[calc(100vh-49px)]">
// // // // // //               {chats.map((chat) => (
// // // // // //                 <div
// // // // // //                   key={chat.id}
// // // // // //                   onClick={() => setCurrentChat(chat)}
// // // // // //                   className={`p-2 mx-2 my-1 rounded text-xs cursor-pointer flex items-center justify-between group ${
// // // // // //                     currentChat?.id === chat.id ? 'bg-teal-50 text-teal-700' : 'hover:bg-gray-50'
// // // // // //                   }`}
// // // // // //                 >
// // // // // //                   <div className="truncate flex-1">
// // // // // //                     <div className="font-medium truncate">{chat.title}</div>
// // // // // //                     <div className="text-[10px] text-gray-400">{chat.timestamp}</div>
// // // // // //                   </div>
// // // // // //                   <button
// // // // // //                     onClick={(e) => {
// // // // // //                       e.stopPropagation();
// // // // // //                       setChats((prev) => prev.filter((c) => c.id !== chat.id));
// // // // // //                       if (currentChat?.id === chat.id) {
// // // // // //                         setCurrentChat(null);
// // // // // //                       }
// // // // // //                     }}
// // // // // //                     className="opacity-0 group-hover:opacity-100 p-1 hover:text-red-500"
// // // // // //                   >
// // // // // //                     <FiTrash size={12} />
// // // // // //                   </button>
// // // // // //                 </div>
// // // // // //               ))}
// // // // // //             </div>
// // // // // //           </motion.div>
// // // // // //         )}
// // // // // //       </AnimatePresence>

// // // // // //       <div className="flex-1 flex flex-col">
// // // // // //         <div className="h-12 border-b border-gray-200 flex items-center px-4 bg-white">
// // // // // //           <button
// // // // // //             onClick={() => setShowSidebar(!showSidebar)}
// // // // // //             className="text-gray-500 hover:text-gray-700"
// // // // // //           >
// // // // // //             <FiMenu size={16} />
// // // // // //           </button>
// // // // // //           <span className="ml-4 text-sm font-medium">{currentChat?.title || 'Select a chat'}</span>
// // // // // //           <div className="ml-auto">
// // // // // //             <button
// // // // // //               onClick={handleReset}
// // // // // //               className="text-xs text-red-500 hover:text-red-600 flex items-center gap-1"
// // // // // //             >
// // // // // //               <FiTrash size={12} /> Reset
// // // // // //             </button>
// // // // // //           </div>
// // // // // //         </div>

// // // // // //         <div className="flex-1 overflow-y-auto px-4 py-6">
// // // // // //           {currentChat?.messages.map((message) => {
// // // // // //             const schemaData = parseSchema(message);
// // // // // //             return (
// // // // // //               <div
// // // // // //                 key={message.id}
// // // // // //                 className={`mb-4 flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
// // // // // //               >
// // // // // //                 <div
// // // // // //                   className={`max-w-[80%] rounded-lg px-4 py-2 text-xs ${
// // // // // //                     message.sender === 'user' ? 'bg-teal-700 text-white' : 'bg-white border border-gray-200'
// // // // // //                   }`}
// // // // // //                 >
// // // // // //                   {message.isSchema && schemaData ? (
// // // // // //                     <>
// // // // // //                       <AnimatedMessage text={message.text} sender={message.sender} animated={message.animated} />
// // // // // //                       <SchemaTable schema={schemaData} />
// // // // // //                     </>
// // // // // //                   ) : (
// // // // // //                     <AnimatedMessage text={message.text} sender={message.sender} animated={message.animated} />
// // // // // //                   )}

// // // // // //                   <div
// // // // // //                     className={`text-[10px] mt-1 ${
// // // // // //                       message.sender === 'user' ? 'text-teal-300' : 'text-gray-400'
// // // // // //                     }`}
// // // // // //                   >
// // // // // //                     {message.timestamp}
// // // // // //                   </div>

// // // // // //                   {message.button && (
// // // // // //                     <div className="mt-2 flex gap-2">
// // // // // //                       {isGeneratingNotebook ? (
// // // // // //                         <button
// // // // // //                           disabled
// // // // // //                           className="flex items-center gap-2 px-4 py-2 bg-teal-500 text-white text-xs rounded"
// // // // // //                         >
// // // // // //                           <FiLoader className="animate-spin" /> Generating...
// // // // // //                         </button>
// // // // // //                       ) : notebookGenerated ? (
// // // // // //                         <button
// // // // // //                           onClick={handleOpenNotebook}
// // // // // //                           className="px-4 py-2 bg-teal-500 text-white text-xs rounded hover:bg-teal-600"
// // // // // //                         >
// // // // // //                           Open Notebook
// // // // // //                         </button>
// // // // // //                       ) : (
// // // // // //                         <button
// // // // // //                           onClick={handleGenerateNotebook}
// // // // // //                           className="px-4 py-2 bg-teal-500 text-white text-xs rounded hover:bg-teal-600"
// // // // // //                         >
// // // // // //                           Generate Notebook
// // // // // //                         </button>
// // // // // //                       )}
// // // // // //                     </div>
// // // // // //                   )}
// // // // // //                 </div>
// // // // // //               </div>
// // // // // //             );
// // // // // //           })}

// // // // // //           {isLoading && (
// // // // // //             <div className="mb-4 flex justify-start">
// // // // // //               <div className="max-w-[80%] rounded-lg px-4 py-2 text-xs bg-white border border-gray-200 flex items-center">
// // // // // //                 <FiLoader className="animate-spin mr-2" /> Typing...
// // // // // //               </div>
// // // // // //             </div>
// // // // // //           )}

// // // // // //           <div ref={messagesEndRef} />
// // // // // //         </div>

// // // // // //         {isUploading && (
// // // // // //           <div className="px-4 py-2 border-t border-gray-200 bg-gray-50 text-teal-700 text-xs flex items-center gap-2">
// // // // // //             <FiLoader className="animate-spin" /> Uploading files...
// // // // // //           </div>
// // // // // //         )}
// // // // // //         {selectedFiles && selectedFiles.length > 0 && (
// // // // // //           <div className="px-4 py-2 border-t border-gray-200 bg-gray-50">
// // // // // //             <div className="flex flex-wrap gap-2">
// // // // // //               {Array.from(selectedFiles).map((file) => (
// // // // // //                 <div key={uuidv4()} className="flex flex-col gap-2 bg-white px-2 py-2 rounded border text-xs">
// // // // // //                   <div className="truncate max-w-[150px]">
// // // // // //                     <strong>{file.name}</strong> ({(file.size / 1024).toFixed(1)} KB)
// // // // // //                   </div>
// // // // // //                 </div>
// // // // // //               ))}
// // // // // //             </div>
// // // // // //             <button
// // // // // //               onClick={handleFileUpload}
// // // // // //               className="mt-2 px-4 py-2 bg-teal-700 text-white text-xs rounded hover:bg-teal-800"
// // // // // //             >
// // // // // //               Upload Files
// // // // // //             </button>
// // // // // //           </div>
// // // // // //         )}

// // // // // //         <div className="p-4 border-t border-gray-200 bg-white">
// // // // // //           <div 
// // // // // //             className="flex items-center gap-2"
// // // // // //             style={{ cursor: isHistoryChat ? 'not-allowed' : 'auto' }} // Set the cursor for hover state
// // // // // //             title={isHistoryChat ? "🚫 You cannot compose messages in history chats" : ""}
// // // // // //           >
// // // // // //             {/* Disable Paperclip if isHistoryChat */}
// // // // // //             <label className={`cursor-pointer text-gray-400 hover:text-gray-600 ${isHistoryChat ? 'opacity-50 cursor-not-allowed' : ''}`} title={isHistoryChat ? "🚫 You cannot attach files in history chats" : ""}>
// // // // // //               <input type="file" multiple className="hidden" onChange={handleFileSelect} disabled={isHistoryChat ? true : false} />
// // // // // //               <FiPaperclip size={16} />
// // // // // //             </label>
// // // // // //             <input
// // // // // //               type="text"
// // // // // //               value={inputMessage}
// // // // // //               onChange={(e) => setInputMessage(e.target.value)}
// // // // // //               onKeyPress={(e) => {
// // // // // //                 if (e.key === 'Enter') handleSendMessage();
// // // // // //               }}
// // // // // //               placeholder="Type your message..."
// // // // // //               className="flex-1 text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:border-teal-400"
// // // // // //               disabled={isHistoryChat ? true : false}
// // // // // //               style={{ cursor: isHistoryChat ? 'not-allowed' : 'text' }}
// // // // // //               title={isHistoryChat ? "🚫 You cannot compose messages in history chats" : ""}
// // // // // //             />
// // // // // //             <button 
// // // // // //               onClick={handleSendMessage} 
// // // // // //               className="text-teal-700 hover:text-teal-800"
// // // // // //               disabled={isHistoryChat ? true : false}
// // // // // //               style={{ cursor: isHistoryChat ? 'not-allowed' : 'pointer' }}
// // // // // //               title={isHistoryChat ? "🚫 You cannot compose messages in history chats" : ""}
// // // // // //             >
// // // // // //               <FiSend size={16} />
// // // // // //             </button>
// // // // // //           </div>
// // // // // //         </div>
// // // // // //       </div>
// // // // // //     </div>
// // // // // //   );
// // // // // // };

// // // // // // export default ChatInterface;




// // // // // // // import React, { useState, useEffect, useRef } from 'react';
// // // // // // // import {
// // // // // // //   FiPlus,
// // // // // // //   FiMenu,
// // // // // // //   FiPaperclip,
// // // // // // //   FiSend,
// // // // // // //   FiTrash,
// // // // // // //   FiLoader,
// // // // // // // } from 'react-icons/fi';
// // // // // // // import { motion, AnimatePresence } from 'framer-motion';
// // // // // // // import { v4 as uuidv4 } from 'uuid';
// // // // // // // import { useNavigate } from 'react-router-dom';

// // // // // // // interface Message {
// // // // // // //   id: string;
// // // // // // //   sender: 'user' | 'assistant';
// // // // // // //   text: string;
// // // // // // //   timestamp: string;
// // // // // // //   button?: boolean; 
// // // // // // //   isSchema?: boolean;
// // // // // // //   schema?: Array<{ column_name: string; data_type: string }>;
// // // // // // //   animated?: boolean; 
// // // // // // // }

// // // // // // // interface Chat {
// // // // // // //   id: string; 
// // // // // // //   title: string;
// // // // // // //   timestamp: string;
// // // // // // //   messages: Message[];
// // // // // // //   isHistory?: boolean; 
// // // // // // // }

// // // // // // // const SchemaTable: React.FC<{ schema: Array<{ column_name: string; data_type: string }> }> = ({ schema }) => {
// // // // // // //   return (
// // // // // // //     <div className="overflow-x-auto mt-2">
// // // // // // //       <table className="min-w-full border-collapse">
// // // // // // //         <thead>
// // // // // // //           <tr>
// // // // // // //             <th className="px-4 py-2 border-b bg-gray-100 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Field</th>
// // // // // // //             <th className="px-4 py-2 border-b bg-gray-100 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Data Type</th>
// // // // // // //           </tr>
// // // // // // //         </thead>
// // // // // // //         <tbody>
// // // // // // //           {schema.map((field, index) => (
// // // // // // //             <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
// // // // // // //               <td className="px-4 py-2 border-b text-xs text-gray-600">{field.column_name}</td>
// // // // // // //               <td className="px-4 py-2 border-b text-xs text-gray-600">{field.data_type}</td>
// // // // // // //             </tr>
// // // // // // //           ))}
// // // // // // //         </tbody>
// // // // // // //       </table>
// // // // // // //     </div>
// // // // // // //   );
// // // // // // // };

// // // // // // // const AnimatedMessage: React.FC<{ text: string; sender: 'user' | 'assistant'; animated?: boolean }> = ({ text, sender, animated }) => {
// // // // // // //   const [displayedText, setDisplayedText] = useState('');
// // // // // // //   const indexRef = useRef(0);

// // // // // // //   useEffect(() => {
// // // // // // //     if (animated && sender === 'assistant') {
// // // // // // //       const interval = setInterval(() => {
// // // // // // //         setDisplayedText((prev) => prev + text.charAt(indexRef.current));
// // // // // // //         indexRef.current += 1;
// // // // // // //         if (indexRef.current >= text.length) {
// // // // // // //           clearInterval(interval);
// // // // // // //         }
// // // // // // //       }, 9);
// // // // // // //       return () => clearInterval(interval);
// // // // // // //     } else {
// // // // // // //       setDisplayedText(text);
// // // // // // //     }
// // // // // // //   }, [text, sender, animated]);

// // // // // // //   return <pre className="whitespace-pre-wrap font-sans">{displayedText}</pre>;
// // // // // // // };

// // // // // // // const parseSchema = (message: Message): Array<{ column_name: string; data_type: string }> | null => {
// // // // // // //   if (!message.isSchema || !message.schema) return null;
// // // // // // //   return message.schema;
// // // // // // // };

// // // // // // // function formatTimestamp(ts: string): string {
// // // // // // //   const date = new Date(ts);
// // // // // // //   return date.toLocaleString('en-IN', {
// // // // // // //     hour: '2-digit',
// // // // // // //     minute: '2-digit',
// // // // // // //     hour12: true,
// // // // // // //     timeZone: 'Asia/Kolkata',
// // // // // // //   });
// // // // // // // }

// // // // // // // const ChatInterface: React.FC = () => {
// // // // // // //   console.log('[DEBUG] ChatInterface component mounted');
// // // // // // //   const defaultMessage = `Hi! 👋 I'm your AI assistant.\nI'll assist you in formulating a predictive question. I'll then create a SQL notebook to build a training set.\nSo, what would you like to predict?`;

// // // // // // //   const [chats, setChats] = useState<Chat[]>([]);
// // // // // // //   const [currentChat, setCurrentChat] = useState<Chat | null>(null);
// // // // // // //   const [showSidebar, setShowSidebar] = useState(true);
// // // // // // //   const [inputMessage, setInputMessage] = useState('');
// // // // // // //   const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);

// // // // // // //   const [isLoading, setIsLoading] = useState(false);
// // // // // // //   const [isUploading, setIsUploading] = useState(false);

// // // // // // //   const [isGeneratingNotebook, setIsGeneratingNotebook] = useState(false);
// // // // // // //   const [notebookGenerated, setNotebookGenerated] = useState(false);
// // // // // // //   const [generatedNotebookData, setGeneratedNotebookData] = useState<any>(null);

// // // // // // //   const navigate = useNavigate();

// // // // // // //   useEffect(() => {
// // // // // // //     const fetchChatHistory = async () => {
// // // // // // //       console.log('[DEBUG] Fetching chat history...');
// // // // // // //       try {
// // // // // // //         const response = await fetch('http://localhost:8000/api/chat_history?user_id=1');
// // // // // // //         if (!response.ok) {
// // // // // // //           console.log('[DEBUG] No chat history found, initializing default chat');
// // // // // // //           initializeDefaultChat();
// // // // // // //           return;
// // // // // // //         }

// // // // // // //         const data = await response.json();
// // // // // // //         console.log('[DEBUG] Chat history fetched:', data);
// // // // // // //         if (Array.isArray(data) && data.length > 0) {
// // // // // // //           const fetchedChats: Chat[] = data.map((chatItem: any) => {
// // // // // // //             const allMessagesRaw = [
// // // // // // //               ...chatItem.user_messages.map((m: any) => ({ ...m, sender: 'user' })),
// // // // // // //               ...chatItem.assistant_messages.map((m: any) => ({ ...m, sender: 'assistant' })),
// // // // // // //             ];

// // // // // // //             allMessagesRaw.sort((a: any, b: any) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());

// // // // // // //             const allMessages: Message[] = allMessagesRaw.map((msg: any) => {
// // // // // // //               return {
// // // // // // //                 id: uuidv4(),
// // // // // // //                 sender: msg.sender,
// // // // // // //                 text: msg.text,
// // // // // // //                 timestamp: formatTimestamp(msg.timestamp),
// // // // // // //                 animated: false
// // // // // // //               };
// // // // // // //             });

// // // // // // //             return {
// // // // // // //               id: chatItem.chat_id,
// // // // // // //               title: chatItem.title,
// // // // // // //               timestamp: allMessages.length > 0 ? allMessages[allMessages.length - 1].timestamp : '',
// // // // // // //               messages: allMessages,
// // // // // // //               isHistory: true
// // // // // // //             };
// // // // // // //           });

// // // // // // //           setChats(fetchedChats);
// // // // // // //           setCurrentChat(fetchedChats[0]);
// // // // // // //         } else {
// // // // // // //           console.log('[DEBUG] No chats in the database, initializing default chat');
// // // // // // //           initializeDefaultChat();
// // // // // // //         }
// // // // // // //       } catch (error) {
// // // // // // //         console.error('[DEBUG] Error fetching chat history:', error);
// // // // // // //         initializeDefaultChat();
// // // // // // //       }
// // // // // // //     };

// // // // // // //     const initializeDefaultChat = () => {
// // // // // // //       console.log('[DEBUG] initializeDefaultChat called');
// // // // // // //       const initialChat: Chat = {
// // // // // // //         id: uuidv4(),
// // // // // // //         title: 'New Prediction',
// // // // // // //         timestamp: new Date().toLocaleString(),
// // // // // // //         messages: [
// // // // // // //           {
// // // // // // //             id: uuidv4(),
// // // // // // //             sender: 'assistant',
// // // // // // //             text: defaultMessage,
// // // // // // //             timestamp: formatTimestamp(new Date().toISOString()),
// // // // // // //             animated: true
// // // // // // //           },
// // // // // // //         ],
// // // // // // //         isHistory: false
// // // // // // //       };
// // // // // // //       setChats([initialChat]);
// // // // // // //       setCurrentChat(initialChat);
// // // // // // //     };

// // // // // // //     fetchChatHistory();
// // // // // // //   }, [defaultMessage]);

// // // // // // //   const handleNewChat = async () => {
// // // // // // //     console.log('[DEBUG] handleNewChat called');
// // // // // // //     try {
// // // // // // //       const response = await fetch('http://localhost:8000/api/chats/', {
// // // // // // //         method: 'POST',
// // // // // // //         headers: { 'Content-Type': 'application/json' },
// // // // // // //         body: JSON.stringify({ title: 'New Prediction' }),
// // // // // // //       });
// // // // // // //       if (!response.ok) {
// // // // // // //         throw new Error(`Failed to create chat: ${response.statusText}`);
// // // // // // //       }
// // // // // // //       const data = await response.json();
// // // // // // //       console.log('[DEBUG] New chat created on backend:', data);

// // // // // // //       const newChatId = data.chat_id;

// // // // // // //       const newChat: Chat = {
// // // // // // //         id: newChatId,
// // // // // // //         title: 'New Prediction',
// // // // // // //         timestamp: new Date().toLocaleString(),
// // // // // // //         messages: [
// // // // // // //           {
// // // // // // //             id: uuidv4(),
// // // // // // //             sender: 'assistant',
// // // // // // //             text: defaultMessage,
// // // // // // //             timestamp: formatTimestamp(new Date().toISOString()),
// // // // // // //             animated: true
// // // // // // //           },
// // // // // // //         ],
// // // // // // //         isHistory: false
// // // // // // //       };

// // // // // // //       setChats((prev) => [newChat, ...prev]);
// // // // // // //       setCurrentChat(newChat);

// // // // // // //       setIsGeneratingNotebook(false);
// // // // // // //       setNotebookGenerated(false);
// // // // // // //       setGeneratedNotebookData(null);
// // // // // // //     } catch (error) {
// // // // // // //       console.error('[DEBUG] Error creating new chat:', error);
// // // // // // //     }
// // // // // // //   };

// // // // // // //   const handleDeleteChat = async (chatId: string) => {
// // // // // // //     console.log('[DEBUG] handleDeleteChat called for chatId:', chatId);
// // // // // // //     try {
// // // // // // //       const response = await fetch(`http://localhost:8000/api/chats/${chatId}/`, {
// // // // // // //         method: 'DELETE',
// // // // // // //         headers: { 'Content-Type': 'application/json' },
// // // // // // //       });
// // // // // // //       if (!response.ok && response.status !== 204) {
// // // // // // //         throw new Error(`Failed to delete chat: ${response.statusText}`);
// // // // // // //       }
// // // // // // //       console.log('[DEBUG] Chat deleted successfully on backend');
// // // // // // //       setChats((prev) => prev.filter((c) => c.id !== chatId));
// // // // // // //       if (currentChat?.id === chatId) {
// // // // // // //         setCurrentChat(null);
// // // // // // //       }
// // // // // // //     } catch (error) {
// // // // // // //       console.error('[DEBUG] Error deleting chat:', error);
// // // // // // //     }
// // // // // // //   };

// // // // // // //   const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
// // // // // // //     console.log('[DEBUG] handleFileSelect called');
// // // // // // //     const files = e.target.files;
// // // // // // //     if (files && files.length > 0) {
// // // // // // //       setSelectedFiles(files);
// // // // // // //       console.log('[DEBUG] Files selected:', files);
// // // // // // //     }
// // // // // // //   };

// // // // // // //   const handleFileUpload = async () => {
// // // // // // //     console.log('[DEBUG] handleFileUpload called');
// // // // // // //     if (!selectedFiles || selectedFiles.length === 0) {
// // // // // // //       alert('No files selected.');
// // // // // // //       return;
// // // // // // //     }

// // // // // // //     setIsUploading(true);

// // // // // // //     try {
// // // // // // //       const formData = new FormData();
// // // // // // //       Array.from(selectedFiles).forEach((file) => {
// // // // // // //         formData.append('file', file);
// // // // // // //       });

// // // // // // //       const response = await fetch('http://localhost:8000/api/chatgpt/', {
// // // // // // //         method: 'POST',
// // // // // // //         body: formData,
// // // // // // //       });

// // // // // // //       if (!response.ok) {
// // // // // // //         throw new Error(`Failed to upload file: ${response.statusText}`);
// // // // // // //       }

// // // // // // //       const data = await response.json();
// // // // // // //       console.log('[DEBUG] File upload response:', data);

// // // // // // //       if (data.uploaded_files && data.uploaded_files.length > 0) {
// // // // // // //         const uploadedFile = data.uploaded_files[0];
// // // // // // //         const schema = uploadedFile.schema;
// // // // // // //         const suggestions = uploadedFile.suggestions;

// // // // // // //         if (schema && schema.length > 0) {
// // // // // // //           const schemaMessage: Message = {
// // // // // // //             id: uuidv4(),
// // // // // // //             sender: 'assistant',
// // // // // // //             text: 'Dataset uploaded successfully! Below is the schema:',
// // // // // // //             timestamp: formatTimestamp(new Date().toISOString()),
// // // // // // //             isSchema: true,
// // // // // // //             schema: schema,
// // // // // // //             animated: true
// // // // // // //           };

// // // // // // //           const confirmationText = `
// // // // // // // Suggested Target Column: ${suggestions.target_column}
// // // // // // // Suggested Entity ID Column: ${suggestions.entity_id_column}
// // // // // // // Suggested Feature Columns: ${suggestions.feature_columns.join(', ')}

// // // // // // // Please confirm:
// // // // // // // - Is the Target Column correct?
// // // // // // // - Is the Entity ID Column correct?
// // // // // // // (Reply 'yes' to confirm or provide the correct column names as needed)
// // // // // // //           `.trim();

// // // // // // //           const confirmationMessage: Message = {
// // // // // // //             id: uuidv4(),
// // // // // // //             sender: 'assistant',
// // // // // // //             text: confirmationText,
// // // // // // //             timestamp: formatTimestamp(new Date().toISOString()),
// // // // // // //             animated: true
// // // // // // //           };

// // // // // // //           setCurrentChat((prevChat) => {
// // // // // // //             if (!prevChat) return null;
// // // // // // //             const updatedMessages = [...prevChat.messages, schemaMessage, confirmationMessage];
// // // // // // //             return { ...prevChat, messages: updatedMessages };
// // // // // // //           });

// // // // // // //           setChats((prevChats) =>
// // // // // // //             prevChats.map((chat) =>
// // // // // // //               chat.id === currentChat?.id
// // // // // // //                 ? { ...chat, messages: [...chat.messages, schemaMessage, confirmationMessage] }
// // // // // // //                 : chat
// // // // // // //             )
// // // // // // //           );
// // // // // // //         } else {
// // // // // // //           console.error('[DEBUG] Schema data missing in uploaded file.');
// // // // // // //         }
// // // // // // //       } else {
// // // // // // //         console.error('[DEBUG] No uploaded_files data in response.');
// // // // // // //       }
// // // // // // //     } catch (error: any) {
// // // // // // //       console.error('[DEBUG] File upload error:', error);
// // // // // // //       const errorMessage: Message = {
// // // // // // //         id: uuidv4(),
// // // // // // //         sender: 'assistant',
// // // // // // //         text: `Upload Error: ${error instanceof Error ? error.message : 'Unknown error'}`,
// // // // // // //         timestamp: formatTimestamp(new Date().toISOString()),
// // // // // // //         animated: true
// // // // // // //       };

// // // // // // //       setCurrentChat((prevChat) => {
// // // // // // //         if (!prevChat) return null;
// // // // // // //         return { ...prevChat, messages: [...prevChat.messages, errorMessage] };
// // // // // // //       });
// // // // // // //       setChats((prevChats) =>
// // // // // // //         prevChats.map((chat) =>
// // // // // // //           chat.id === currentChat?.id ? { ...chat, messages: [...chat.messages, errorMessage] } : chat
// // // // // // //         )
// // // // // // //       );
// // // // // // //     } finally {
// // // // // // //       setSelectedFiles(null);
// // // // // // //       setIsUploading(false);
// // // // // // //     }
// // // // // // //   };

// // // // // // //   const handleSendMessage = async () => {
// // // // // // //     console.log('[DEBUG] handleSendMessage called with inputMessage:', inputMessage);
// // // // // // //     if (!inputMessage.trim()) return;
// // // // // // //     if (!currentChat) return;

// // // // // // //     if (currentChat.isHistory) {
// // // // // // //       console.log('[DEBUG] Current chat is history. Cannot send message.');
// // // // // // //       return;
// // // // // // //     }

// // // // // // //     const userMessage: Message = {
// // // // // // //       id: uuidv4(),
// // // // // // //       sender: 'user',
// // // // // // //       text: inputMessage,
// // // // // // //       timestamp: formatTimestamp(new Date().toISOString()),
// // // // // // //       animated: false
// // // // // // //     };

// // // // // // //     const updatedChat = {
// // // // // // //       ...currentChat,
// // // // // // //       messages: [...currentChat.messages, userMessage],
// // // // // // //       timestamp: userMessage.timestamp,
// // // // // // //     };

// // // // // // //     setChats((prevChats) => prevChats.map((chat) => (chat.id === currentChat.id ? updatedChat : chat)));
// // // // // // //     setCurrentChat(updatedChat);
// // // // // // //     setInputMessage('');
// // // // // // //     setIsLoading(true);

// // // // // // //     try {
// // // // // // //       const response = await fetch('http://localhost:8000/api/chatgpt/', {
// // // // // // //         method: 'POST',
// // // // // // //         headers: { 'Content-Type': 'application/json' },
// // // // // // //         body: JSON.stringify({ message: userMessage.text, user_id: 'default_user' }),
// // // // // // //       });

// // // // // // //       if (!response.ok) {
// // // // // // //         throw new Error(`Failed to send message: ${response.statusText}`);
// // // // // // //       }

// // // // // // //       const data = await response.json();
// // // // // // //       console.log('[DEBUG] Response from send message:', data);
// // // // // // //       let showGenerateButton = data.show_generate_notebook || false;

// // // // // // //       const botMessage: Message = {
// // // // // // //         id: uuidv4(),
// // // // // // //         sender: 'assistant',
// // // // // // //         text: data.response,
// // // // // // //         timestamp: formatTimestamp(new Date().toISOString()),
// // // // // // //         button: showGenerateButton,
// // // // // // //         animated: true
// // // // // // //       };

// // // // // // //       const updatedMessages = [...updatedChat.messages, botMessage];

// // // // // // //       setChats((prevChats) =>
// // // // // // //         prevChats.map((chat) =>
// // // // // // //           chat.id === currentChat.id ? { ...chat, messages: [...updatedMessages] } : chat
// // // // // // //         )
// // // // // // //       );

// // // // // // //       setCurrentChat((prevChat) =>
// // // // // // //         prevChat ? { ...prevChat, messages: [...updatedMessages] } : null
// // // // // // //       );

// // // // // // //       setIsGeneratingNotebook(false);
// // // // // // //       setNotebookGenerated(false);
// // // // // // //       setGeneratedNotebookData(null);
// // // // // // //     } catch (error) {
// // // // // // //       console.error('[DEBUG] Error sending message:', error);
// // // // // // //       const errorMessage: Message = {
// // // // // // //         id: uuidv4(),
// // // // // // //         sender: 'assistant',
// // // // // // //         text: 'Sorry, I encountered an issue. Please try again later.',
// // // // // // //         timestamp: formatTimestamp(new Date().toISOString()),
// // // // // // //         animated: true
// // // // // // //       };

// // // // // // //       setChats((prevChats) =>
// // // // // // //         prevChats.map((chat) =>
// // // // // // //           chat.id === currentChat.id ? { ...chat, messages: [...chat.messages, errorMessage] } : chat
// // // // // // //         )
// // // // // // //       );
// // // // // // //     } finally {
// // // // // // //       setIsLoading(false);
// // // // // // //     }
// // // // // // //   };

// // // // // // //   const handleGenerateNotebook = async () => {
// // // // // // //     console.log('[DEBUG] handleGenerateNotebook called');
// // // // // // //     if (!currentChat) return;
// // // // // // //     setIsGeneratingNotebook(true);

// // // // // // //     try {
// // // // // // //       const response = await fetch('http://localhost:8000/api/chatgpt/', {
// // // // // // //         method: 'POST',
// // // // // // //         headers: { 'Content-Type': 'application/json' },
// // // // // // //         body: JSON.stringify({ action: 'generate_notebook', user_id: 'default_user' }),
// // // // // // //       });

// // // // // // //       if (!response.ok) {
// // // // // // //         throw new Error(`Failed to generate notebook: ${response.statusText}`);
// // // // // // //       }

// // // // // // //       const data = await response.json();
// // // // // // //       console.log('[DEBUG] Notebook generated response:', data);

// // // // // // //       if (data.notebooks) {
// // // // // // //         setGeneratedNotebookData(data.notebooks);
// // // // // // //         setNotebookGenerated(true);

// // // // // // //         const notebookMessage: Message = {
// // // // // // //           id: uuidv4(),
// // // // // // //           sender: 'assistant',
// // // // // // //           text: 'Notebook has been generated successfully.',
// // // // // // //           timestamp: formatTimestamp(new Date().toISOString()),
// // // // // // //           animated: true
// // // // // // //         };

// // // // // // //         setChats((prevChats) =>
// // // // // // //           prevChats.map((chat) =>
// // // // // // //             chat.id === currentChat.id ? { ...chat, messages: [...chat.messages, notebookMessage] } : chat
// // // // // // //           )
// // // // // // //         );

// // // // // // //         setCurrentChat((prevChat) =>
// // // // // // //           prevChat ? { ...prevChat, messages: [...prevChat.messages, notebookMessage] } : null
// // // // // // //         );
// // // // // // //       } else {
// // // // // // //         alert('Error generating notebook. Please try again.');
// // // // // // //       }
// // // // // // //     } catch (error) {
// // // // // // //       console.error('[DEBUG] Error generating notebook:', error);
// // // // // // //       alert('Error generating notebook. Please try again.');
// // // // // // //     } finally {
// // // // // // //       setIsGeneratingNotebook(false);
// // // // // // //     }
// // // // // // //   };

// // // // // // //   const handleOpenNotebook = () => {
// // // // // // //     console.log('[DEBUG] handleOpenNotebook called');
// // // // // // //     if (generatedNotebookData) {
// // // // // // //       navigate('/notebook', { state: { notebooks: generatedNotebookData } });
// // // // // // //     } else {
// // // // // // //       alert('No notebook data available.');
// // // // // // //     }
// // // // // // //   };

// // // // // // //   const handleReset = async () => {
// // // // // // //     console.log('[DEBUG] handleReset called');
// // // // // // //     await fetch('http://localhost:8000/api/chatgpt/', {
// // // // // // //       method: 'POST',
// // // // // // //       headers: { 'Content-Type': 'application/json' },
// // // // // // //       body: JSON.stringify({ action: 'reset', user_id: 'default_user' }),
// // // // // // //     });

// // // // // // //     const initialChat: Chat = {
// // // // // // //       id: uuidv4(),
// // // // // // //       title: 'New Prediction',
// // // // // // //       timestamp: new Date().toLocaleString(),
// // // // // // //       messages: [
// // // // // // //         {
// // // // // // //           id: uuidv4(),
// // // // // // //           sender: 'assistant',
// // // // // // //           text: defaultMessage,
// // // // // // //           timestamp: formatTimestamp(new Date().toISOString()),
// // // // // // //           animated: true
// // // // // // //         },
// // // // // // //       ],
// // // // // // //       isHistory: false
// // // // // // //     };

// // // // // // //     setChats([initialChat]);
// // // // // // //     setCurrentChat(initialChat);

// // // // // // //     setIsGeneratingNotebook(false);
// // // // // // //     setNotebookGenerated(false);
// // // // // // //     setGeneratedNotebookData(null);
// // // // // // //   };

// // // // // // //   const messagesEndRef = useRef<HTMLDivElement | null>(null);
// // // // // // //   const scrollToBottom = () => {
// // // // // // //     if (messagesEndRef.current) {
// // // // // // //       console.log('[DEBUG] Scrolling to bottom');
// // // // // // //       messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
// // // // // // //     }
// // // // // // //   };

// // // // // // //   useEffect(() => {
// // // // // // //     scrollToBottom();
// // // // // // //   }, [currentChat?.messages, isLoading, isUploading]);

// // // // // // //   const isHistoryChat = currentChat?.isHistory;

// // // // // // //   return (
// // // // // // //     <div className="h-screen flex bg-gray-50">
// // // // // // //       <AnimatePresence>
// // // // // // //         {showSidebar && (
// // // // // // //           <motion.div
// // // // // // //             initial={{ x: -240 }}
// // // // // // //             animate={{ x: 0 }}
// // // // // // //             exit={{ x: -240 }}
// // // // // // //             transition={{ duration: 0.2 }}
// // // // // // //             className="w-60 border-r border-gray-200 bg-white"
// // // // // // //           >
// // // // // // //             <div className="p-3 border-b border-gray-100 flex justify-between items-center">
// // // // // // //               <span className="text-xs font-medium text-gray-600">Chat History</span>
// // // // // // //               <button
// // // // // // //                 onClick={handleNewChat}
// // // // // // //                 className="text-xs flex items-center gap-1 text-teal-700 hover:text-teal-800"
// // // // // // //               >
// // // // // // //                 <FiPlus size={12} /> New
// // // // // // //               </button>
// // // // // // //             </div>
// // // // // // //             <div className="overflow-y-auto h-[calc(100vh-49px)]">
// // // // // // //               {chats.map((chat) => (
// // // // // // //                 <div
// // // // // // //                   key={chat.id}
// // // // // // //                   onClick={() => {
// // // // // // //                     console.log('[DEBUG] Chat clicked. Setting currentChat to chat_id:', chat.id);
// // // // // // //                     setCurrentChat(chat);
// // // // // // //                   }}
// // // // // // //                   className={`p-2 mx-2 my-1 rounded text-xs cursor-pointer flex items-center justify-between group ${
// // // // // // //                     currentChat?.id === chat.id ? 'bg-teal-50 text-teal-700' : 'hover:bg-gray-50'
// // // // // // //                   }`}
// // // // // // //                 >
// // // // // // //                   <div className="truncate flex-1">
// // // // // // //                     <div className="font-medium truncate">{chat.title}</div>
// // // // // // //                     <div className="text-[10px] text-gray-400">{chat.timestamp}</div>
// // // // // // //                   </div>
// // // // // // //                   <button
// // // // // // //                     onClick={(e) => {
// // // // // // //                       e.stopPropagation();
// // // // // // //                       handleDeleteChat(chat.id);
// // // // // // //                     }}
// // // // // // //                     className="opacity-0 group-hover:opacity-100 p-1 hover:text-red-500"
// // // // // // //                   >
// // // // // // //                     <FiTrash size={12} />
// // // // // // //                   </button>
// // // // // // //                 </div>
// // // // // // //               ))}
// // // // // // //             </div>
// // // // // // //           </motion.div>
// // // // // // //         )}
// // // // // // //       </AnimatePresence>

// // // // // // //       <div className="flex-1 flex flex-col">
// // // // // // //         <div className="h-12 border-b border-gray-200 flex items-center px-4 bg-white">
// // // // // // //           <button
// // // // // // //             onClick={() => {
// // // // // // //               console.log('[DEBUG] Toggling sidebar');
// // // // // // //               setShowSidebar(!showSidebar);
// // // // // // //             }}
// // // // // // //             className="text-gray-500 hover:text-gray-700"
// // // // // // //           >
// // // // // // //             <FiMenu size={16} />
// // // // // // //           </button>
// // // // // // //           <span className="ml-4 text-sm font-medium">{currentChat?.title || 'Select a chat'}</span>
// // // // // // //           <div className="ml-auto">
// // // // // // //             <button
// // // // // // //               onClick={handleReset}
// // // // // // //               className="text-xs text-red-500 hover:text-red-600 flex items-center gap-1"
// // // // // // //             >
// // // // // // //               <FiTrash size={12} /> Reset
// // // // // // //             </button>
// // // // // // //           </div>
// // // // // // //         </div>

// // // // // // //         <div className="flex-1 overflow-y-auto px-4 py-6">
// // // // // // //           {currentChat?.messages.map((message) => {
// // // // // // //             const schemaData = parseSchema(message);
// // // // // // //             return (
// // // // // // //               <div
// // // // // // //                 key={message.id}
// // // // // // //                 className={`mb-4 flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
// // // // // // //               >
// // // // // // //                 <div
// // // // // // //                   className={`max-w-[80%] rounded-lg px-4 py-2 text-xs ${
// // // // // // //                     message.sender === 'user' ? 'bg-teal-700 text-white' : 'bg-white border border-gray-200'
// // // // // // //                   }`}
// // // // // // //                 >
// // // // // // //                   {message.isSchema && schemaData ? (
// // // // // // //                     <>
// // // // // // //                       <AnimatedMessage text={message.text} sender={message.sender} animated={message.animated} />
// // // // // // //                       <SchemaTable schema={schemaData} />
// // // // // // //                     </>
// // // // // // //                   ) : (
// // // // // // //                     <AnimatedMessage text={message.text} sender={message.sender} animated={message.animated} />
// // // // // // //                   )}

// // // // // // //                   <div
// // // // // // //                     className={`text-[10px] mt-1 ${
// // // // // // //                       message.sender === 'user' ? 'text-teal-300' : 'text-gray-400'
// // // // // // //                     }`}
// // // // // // //                   >
// // // // // // //                     {message.timestamp}
// // // // // // //                   </div>

// // // // // // //                   {message.button && (
// // // // // // //                     <div className="mt-2 flex gap-2">
// // // // // // //                       {isGeneratingNotebook ? (
// // // // // // //                         <button
// // // // // // //                           disabled
// // // // // // //                           className="flex items-center gap-2 px-4 py-2 bg-teal-500 text-white text-xs rounded"
// // // // // // //                         >
// // // // // // //                           <FiLoader className="animate-spin" /> Generating...
// // // // // // //                         </button>
// // // // // // //                       ) : notebookGenerated ? (
// // // // // // //                         <button
// // // // // // //                           onClick={handleOpenNotebook}
// // // // // // //                           className="px-4 py-2 bg-teal-500 text-white text-xs rounded hover:bg-teal-600"
// // // // // // //                         >
// // // // // // //                           Open Notebook
// // // // // // //                         </button>
// // // // // // //                       ) : (
// // // // // // //                         <button
// // // // // // //                           onClick={handleGenerateNotebook}
// // // // // // //                           className="px-4 py-2 bg-teal-500 text-white text-xs rounded hover:bg-teal-600"
// // // // // // //                         >
// // // // // // //                           Generate Notebook
// // // // // // //                         </button>
// // // // // // //                       )}
// // // // // // //                     </div>
// // // // // // //                   )}
// // // // // // //                 </div>
// // // // // // //               </div>
// // // // // // //             );
// // // // // // //           })}

// // // // // // //           {isLoading && (
// // // // // // //             <div className="mb-4 flex justify-start">
// // // // // // //               <div className="max-w-[80%] rounded-lg px-4 py-2 text-xs bg-white border border-gray-200 flex items-center">
// // // // // // //                 <FiLoader className="animate-spin mr-2" /> Typing...
// // // // // // //               </div>
// // // // // // //             </div>
// // // // // // //           )}

// // // // // // //           <div ref={messagesEndRef} />
// // // // // // //         </div>

// // // // // // //         {isUploading && (
// // // // // // //           <div className="px-4 py-2 border-t border-gray-200 bg-gray-50 text-teal-700 text-xs flex items-center gap-2">
// // // // // // //             <FiLoader className="animate-spin" /> Uploading files...
// // // // // // //           </div>
// // // // // // //         )}
// // // // // // //         {selectedFiles && selectedFiles.length > 0 && (
// // // // // // //           <div className="px-4 py-2 border-t border-gray-200 bg-gray-50">
// // // // // // //             <div className="flex flex-wrap gap-2">
// // // // // // //               {Array.from(selectedFiles).map((file) => (
// // // // // // //                 <div key={uuidv4()} className="flex flex-col gap-2 bg-white px-2 py-2 rounded border text-xs">
// // // // // // //                   <div className="truncate max-w-[150px]">
// // // // // // //                     <strong>{file.name}</strong> ({(file.size / 1024).toFixed(1)} KB)
// // // // // // //                   </div>
// // // // // // //                 </div>
// // // // // // //               ))}
// // // // // // //             </div>
// // // // // // //             <button
// // // // // // //               onClick={handleFileUpload}
// // // // // // //               className="mt-2 px-4 py-2 bg-teal-700 text-white text-xs rounded hover:bg-teal-800"
// // // // // // //             >
// // // // // // //               Upload Files
// // // // // // //             </button>
// // // // // // //           </div>
// // // // // // //         )}

// // // // // // //         <div className="p-4 border-t border-gray-200 bg-white">
// // // // // // //           <div 
// // // // // // //             className="flex items-center gap-2"
// // // // // // //             style={{ cursor: isHistoryChat ? 'not-allowed' : 'auto' }}
// // // // // // //             title={isHistoryChat ? "🚫 You cannot compose messages in history chats" : ""}
// // // // // // //           >
// // // // // // //             <label className={`cursor-pointer text-gray-400 hover:text-gray-600 ${isHistoryChat ? 'opacity-50 cursor-not-allowed' : ''}`} title={isHistoryChat ? "🚫 You cannot attach files in history chats" : ""}>
// // // // // // //               <input type="file" multiple className="hidden" onChange={handleFileSelect} disabled={isHistoryChat ? true : false} />
// // // // // // //               <FiPaperclip size={16} />
// // // // // // //             </label>
// // // // // // //             <input
// // // // // // //               type="text"
// // // // // // //               value={inputMessage}
// // // // // // //               onChange={(e) => {
// // // // // // //                 console.log('[DEBUG] inputMessage changed:', e.target.value);
// // // // // // //                 setInputMessage(e.target.value);
// // // // // // //               }}
// // // // // // //               onKeyPress={(e) => {
// // // // // // //                 if (e.key === 'Enter') {
// // // // // // //                   console.log('[DEBUG] Enter key pressed in input field');
// // // // // // //                   handleSendMessage();
// // // // // // //                 }
// // // // // // //               }}
// // // // // // //               placeholder="Type your message..."
// // // // // // //               className="flex-1 text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:border-teal-400"
// // // // // // //               disabled={isHistoryChat ? true : false}
// // // // // // //               style={{ cursor: isHistoryChat ? 'not-allowed' : 'text' }}
// // // // // // //               title={isHistoryChat ? "🚫 You cannot compose messages in history chats" : ""}
// // // // // // //             />
// // // // // // //             <button 
// // // // // // //               onClick={handleSendMessage} 
// // // // // // //               className="text-teal-700 hover:text-teal-800"
// // // // // // //               disabled={isHistoryChat ? true : false}
// // // // // // //               style={{ cursor: isHistoryChat ? 'not-allowed' : 'pointer' }}
// // // // // // //               title={isHistoryChat ? "🚫 You cannot compose messages in history chats" : ""}
// // // // // // //             >
// // // // // // //               <FiSend size={16} />
// // // // // // //             </button>
// // // // // // //           </div>
// // // // // // //         </div>
// // // // // // //       </div>
// // // // // // //     </div>
// // // // // // //   );
// // // // // // // };

// // // // // // // export default ChatInterface;




// // // // // import React, { useState, useEffect, useRef } from 'react';
// // // // // import {
// // // // //   FiPlus,
// // // // //   FiMenu,
// // // // //   FiPaperclip,
// // // // //   FiSend,
// // // // //   FiTrash,
// // // // //   FiLoader,
// // // // // } from 'react-icons/fi';
// // // // // import { motion, AnimatePresence } from 'framer-motion';
// // // // // import { v4 as uuidv4 } from 'uuid';
// // // // // import { useNavigate } from 'react-router-dom';

// // // // // interface Message {
// // // // //   id: string;
// // // // //   sender: 'user' | 'assistant';
// // // // //   text: string;
// // // // //   timestamp: string;
// // // // //   button?: boolean; // If true, show "Generate Notebook" or "Open Notebook"
// // // // //   isSchema?: boolean;
// // // // //   schema?: Array<{ column_name: string; data_type: string }>;
// // // // //   animated?: boolean;
// // // // // }

// // // // // interface Chat {
// // // // //   id: string;
// // // // //   title: string;
// // // // //   timestamp: string;
// // // // //   messages: Message[];
// // // // //   isHistory?: boolean; 
// // // // // }

// // // // // const SchemaTable: React.FC<{ schema: Array<{ column_name: string; data_type: string }> }> = ({ schema }) => {
// // // // //   return (
// // // // //     <div className="overflow-x-auto mt-2">
// // // // //       <table className="min-w-full border-collapse">
// // // // //         <thead>
// // // // //           <tr>
// // // // //             <th className="px-4 py-2 border-b bg-gray-100 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Field</th>
// // // // //             <th className="px-4 py-2 border-b bg-gray-100 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Data Type</th>
// // // // //           </tr>
// // // // //         </thead>
// // // // //         <tbody>
// // // // //           {schema.map((field, index) => (
// // // // //             <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
// // // // //               <td className="px-4 py-2 border-b text-xs text-gray-600">{field.column_name}</td>
// // // // //               <td className="px-4 py-2 border-b text-xs text-gray-600">{field.data_type}</td>
// // // // //             </tr>
// // // // //           ))}
// // // // //         </tbody>
// // // // //       </table>
// // // // //     </div>
// // // // //   );
// // // // // };

// // // // // const AnimatedMessage: React.FC<{ text: string; sender: 'user' | 'assistant'; animated?: boolean }> = ({ text, sender, animated }) => {
// // // // //   const [displayedText, setDisplayedText] = useState('');
// // // // //   const indexRef = useRef(0);

// // // // //   useEffect(() => {
// // // // //     if (animated && sender === 'assistant') {
// // // // //       const interval = setInterval(() => {
// // // // //         setDisplayedText((prev) => prev + text.charAt(indexRef.current));
// // // // //         indexRef.current += 1;
// // // // //         if (indexRef.current >= text.length) {
// // // // //           clearInterval(interval);
// // // // //         }
// // // // //       }, 9);
// // // // //       return () => clearInterval(interval);
// // // // //     } else {
// // // // //       setDisplayedText(text);
// // // // //     }
// // // // //   }, [text, sender, animated]);

// // // // //   return <pre className="whitespace-pre-wrap font-sans">{displayedText}</pre>;
// // // // // };

// // // // // const parseSchema = (message: Message): Array<{ column_name: string; data_type: string }> | null => {
// // // // //   if (!message.isSchema || !message.schema) return null;
// // // // //   return message.schema;
// // // // // };

// // // // // function formatTimestamp(ts: string): string {
// // // // //   const date = new Date(ts);
// // // // //   return date.toLocaleString('en-IN', {
// // // // //     hour: '2-digit',
// // // // //     minute: '2-digit',
// // // // //     hour12: true,
// // // // //     timeZone: 'Asia/Kolkata',
// // // // //   });
// // // // // }

// // // // // const ChatInterface: React.FC = () => {
// // // // //   const defaultMessage = `Hi! 👋 I'm your AI assistant.\nI'll assist you in formulating a predictive question. I'll then create a SQL notebook to build a training set.\nSo, what would you like to predict?`;

// // // // //   const [chats, setChats] = useState<Chat[]>([]);
// // // // //   const [currentChat, setCurrentChat] = useState<Chat | null>(null);
// // // // //   const [showSidebar, setShowSidebar] = useState(true);
// // // // //   const [inputMessage, setInputMessage] = useState('');
// // // // //   const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);

// // // // //   const [isLoading, setIsLoading] = useState(false);
// // // // //   const [isUploading, setIsUploading] = useState(false);

// // // // //   const [isGeneratingNotebook, setIsGeneratingNotebook] = useState(false);
// // // // //   const [notebookGenerated, setNotebookGenerated] = useState(false);
// // // // //   const [generatedNotebookData, setGeneratedNotebookData] = useState<any>(null);

// // // // //   // Additional states to store returned info from generate_notebook
// // // // //   const [generatedFileUrl, setGeneratedFileUrl] = useState<string | undefined>(undefined);
// // // // //   const [generatedTargetColumn, setGeneratedTargetColumn] = useState<string | undefined>(undefined);
// // // // //   const [generatedEntityColumn, setGeneratedEntityColumn] = useState<string | undefined>(undefined);
// // // // //   const [generatedFeatures, setGeneratedFeatures] = useState<string[] | undefined>(undefined);
// // // // //   const [generatedUserId, setGeneratedUserId] = useState<string | undefined>(undefined);
// // // // //   const [generatedChatId, setGeneratedChatId] = useState<string | undefined>(undefined);

// // // // //   const navigate = useNavigate();

// // // // //   useEffect(() => {
// // // // //     const fetchChatHistory = async () => {
// // // // //       try {
// // // // //         const response = await fetch('http://localhost:8000/api/chat_history?user_id=12');
// // // // //         if (!response.ok) {
// // // // //           initializeDefaultChat();
// // // // //           return;
// // // // //         }

// // // // //         const data = await response.json();
// // // // //         if (Array.isArray(data) && data.length > 0) {
// // // // //           const fetchedChats: Chat[] = data.map((chatItem: any) => {
// // // // //             const allMessagesRaw = [
// // // // //               ...chatItem.user_messages.map((m: any) => ({ ...m, sender: 'user' })),
// // // // //               ...chatItem.assistant_messages.map((m: any) => ({ ...m, sender: 'assistant' })),
// // // // //             ];

// // // // //             allMessagesRaw.sort((a: any, b: any) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());

// // // // //             const allMessages: Message[] = allMessagesRaw.map((msg: any) => {
// // // // //               return {
// // // // //                 id: uuidv4(),
// // // // //                 sender: msg.sender,
// // // // //                 text: msg.text,
// // // // //                 timestamp: formatTimestamp(msg.timestamp),
// // // // //                 animated: false 
// // // // //               };
// // // // //             });

// // // // //             return {
// // // // //               id: chatItem.chat_id,
// // // // //               title: chatItem.title,
// // // // //               timestamp: allMessages.length > 0 ? allMessages[allMessages.length - 1].timestamp : '',
// // // // //               messages: allMessages,
// // // // //               isHistory: true
// // // // //             };
// // // // //           });

// // // // //           setChats(fetchedChats);
// // // // //           setCurrentChat(fetchedChats[0]);
// // // // //         } else {
// // // // //           initializeDefaultChat();
// // // // //         }
// // // // //       } catch (error) {
// // // // //         console.error('Error fetching chat history:', error);
// // // // //         initializeDefaultChat();
// // // // //       }
// // // // //     };

// // // // //     const initializeDefaultChat = () => {
// // // // //       const initialChat: Chat = {
// // // // //         id: '1',
// // // // //         title: 'New Prediction',
// // // // //         timestamp: new Date().toLocaleString(),
// // // // //         messages: [
// // // // //           {
// // // // //             id: uuidv4(),
// // // // //             sender: 'assistant',
// // // // //             text: defaultMessage,
// // // // //             timestamp: formatTimestamp(new Date().toISOString()),
// // // // //             animated: true
// // // // //           },
// // // // //         ],
// // // // //         isHistory: false
// // // // //       };
// // // // //       setChats([initialChat]);
// // // // //       setCurrentChat(initialChat);
// // // // //     };

// // // // //     fetchChatHistory();
// // // // //   }, [defaultMessage]);

// // // // //   const handleNewChat = () => {
// // // // //     const newChat: Chat = {
// // // // //       id: uuidv4(),
// // // // //       title: 'New Prediction',
// // // // //       timestamp: new Date().toLocaleString(),
// // // // //       messages: [
// // // // //         {
// // // // //           id: uuidv4(),
// // // // //           sender: 'assistant',
// // // // //           text: defaultMessage,
// // // // //           timestamp: formatTimestamp(new Date().toISOString()),
// // // // //           animated: true
// // // // //         },
// // // // //       ],
// // // // //       isHistory: false
// // // // //     };
// // // // //     setChats((prev) => [newChat, ...prev]);
// // // // //     setCurrentChat(newChat);

// // // // //     setIsGeneratingNotebook(false);
// // // // //     setNotebookGenerated(false);
// // // // //     setGeneratedNotebookData(null);
// // // // //   };

// // // // //   const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
// // // // //     const files = e.target.files;
// // // // //     if (files && files.length > 0) {
// // // // //       setSelectedFiles(files);
// // // // //     }
// // // // //   };

// // // // //   const handleFileUpload = async () => {
// // // // //     if (!selectedFiles || selectedFiles.length === 0) {
// // // // //       alert('No files selected.');
// // // // //       return;
// // // // //     }

// // // // //     setIsUploading(true);

// // // // //     try {
// // // // //       const formData = new FormData();
// // // // //       Array.from(selectedFiles).forEach((file) => {
// // // // //         formData.append('file', file);
// // // // //       });

// // // // //       const response = await fetch('http://localhost:8000/api/chatgpt/', {
// // // // //         method: 'POST',
// // // // //         body: formData,
// // // // //       });

// // // // //       if (!response.ok) {
// // // // //         throw new Error(`Failed to upload file: ${response.statusText}`);
// // // // //       }

// // // // //       const data = await response.json();
// // // // //       console.log('[DEBUG] File upload response:', data);

// // // // //       if (data.uploaded_files && data.uploaded_files.length > 0) {
// // // // //         const uploadedFile = data.uploaded_files[0];
// // // // //         const schema = uploadedFile.schema;
// // // // //         const suggestions = uploadedFile.suggestions;

// // // // //         if (schema && schema.length > 0) {
// // // // //           const schemaMessage: Message = {
// // // // //             id: uuidv4(),
// // // // //             sender: 'assistant',
// // // // //             text: 'Dataset uploaded successfully! Below is the schema:',
// // // // //             timestamp: formatTimestamp(new Date().toISOString()),
// // // // //             isSchema: true,
// // // // //             schema: schema,
// // // // //             animated: true
// // // // //           };

// // // // //           const confirmationText = `
// // // // // Suggested Target Column: ${suggestions.target_column}
// // // // // Suggested Entity ID Column: ${suggestions.entity_id_column}
// // // // // Suggested Feature Columns: ${suggestions.feature_columns.join(', ')}

// // // // // Please confirm:
// // // // // - Is the Target Column correct?
// // // // // - Is the Entity ID Column correct?
// // // // // (Reply 'yes' to confirm or provide the correct column names as needed)
// // // // //           `.trim();

// // // // //           const confirmationMessage: Message = {
// // // // //             id: uuidv4(),
// // // // //             sender: 'assistant',
// // // // //             text: confirmationText,
// // // // //             timestamp: formatTimestamp(new Date().toISOString()),
// // // // //             animated: true
// // // // //           };

// // // // //           setCurrentChat((prevChat) => {
// // // // //             if (!prevChat) return null;
// // // // //             const updatedMessages = [...prevChat.messages, schemaMessage, confirmationMessage];
// // // // //             return { ...prevChat, messages: updatedMessages };
// // // // //           });

// // // // //           setChats((prevChats) =>
// // // // //             prevChats.map((chat) =>
// // // // //               chat.id === currentChat?.id
// // // // //                 ? { ...chat, messages: [...chat.messages, schemaMessage, confirmationMessage] }
// // // // //                 : chat
// // // // //             )
// // // // //           );
// // // // //         } else {
// // // // //           console.error('Schema data missing.');
// // // // //         }
// // // // //       } else {
// // // // //         console.error('No uploaded_files data.');
// // // // //       }
// // // // //     } catch (error: any) {
// // // // //       console.error('File upload error:', error);
// // // // //       const errorMessage: Message = {
// // // // //         id: uuidv4(),
// // // // //         sender: 'assistant',
// // // // //         text: `Upload Error: ${error instanceof Error ? error.message : 'Unknown error'}`,
// // // // //         timestamp: formatTimestamp(new Date().toISOString()),
// // // // //         animated: true
// // // // //       };

// // // // //       setCurrentChat((prevChat) => {
// // // // //         if (!prevChat) return null;
// // // // //         return { ...prevChat, messages: [...prevChat.messages, errorMessage] };
// // // // //       });
// // // // //       setChats((prevChats) =>
// // // // //         prevChats.map((chat) =>
// // // // //           chat.id === currentChat?.id ? { ...chat, messages: [...chat.messages, errorMessage] } : chat
// // // // //         )
// // // // //       );
// // // // //     } finally {
// // // // //       setSelectedFiles(null);
// // // // //       setIsUploading(false);
// // // // //     }
// // // // //   };

// // // // //   const handleSendMessage = async () => {
// // // // //     if (!inputMessage.trim()) return;
// // // // //     if (!currentChat) return;

// // // // //     if (currentChat.isHistory) return;

// // // // //     const userMessage: Message = {
// // // // //       id: uuidv4(),
// // // // //       sender: 'user',
// // // // //       text: inputMessage,
// // // // //       timestamp: formatTimestamp(new Date().toISOString()),
// // // // //       animated: false
// // // // //     };

// // // // //     const updatedChat = {
// // // // //       ...currentChat,
// // // // //       messages: [...currentChat.messages, userMessage],
// // // // //       timestamp: userMessage.timestamp,
// // // // //     };

// // // // //     setChats((prevChats) => prevChats.map((chat) => (chat.id === currentChat.id ? updatedChat : chat)));
// // // // //     setCurrentChat(updatedChat);
// // // // //     setInputMessage('');
// // // // //     setIsLoading(true);

// // // // //     try {
// // // // //       const response = await fetch('http://localhost:8000/api/chatgpt/', {
// // // // //         method: 'POST',
// // // // //         headers: { 'Content-Type': 'application/json' },
// // // // //         body: JSON.stringify({ message: userMessage.text, user_id: 'default_user' }),
// // // // //       });

// // // // //       if (!response.ok) {
// // // // //         throw new Error(`Failed to send message: ${response.statusText}`);
// // // // //       }

// // // // //       const data = await response.json();
// // // // //       let showGenerateButton = data.show_generate_notebook || false;

// // // // //       const botMessage: Message = {
// // // // //         id: uuidv4(),
// // // // //         sender: 'assistant',
// // // // //         text: data.response,
// // // // //         timestamp: formatTimestamp(new Date().toISOString()),
// // // // //         button: showGenerateButton,
// // // // //         animated: true
// // // // //       };

// // // // //       const updatedMessages = [...updatedChat.messages, botMessage];

// // // // //       setChats((prevChats) =>
// // // // //         prevChats.map((chat) =>
// // // // //           chat.id === currentChat.id ? { ...chat, messages: [...updatedMessages] } : chat
// // // // //         )
// // // // //       );

// // // // //       setCurrentChat((prevChat) =>
// // // // //         prevChat ? { ...prevChat, messages: [...updatedMessages] } : null
// // // // //       );

// // // // //       setIsGeneratingNotebook(false);
// // // // //       setNotebookGenerated(false);
// // // // //       setGeneratedNotebookData(null);
// // // // //     } catch (error) {
// // // // //       console.error('Error sending message:', error);
// // // // //       const errorMessage: Message = {
// // // // //         id: uuidv4(),
// // // // //         sender: 'assistant',
// // // // //         text: 'Sorry, I encountered an issue. Please try again later.',
// // // // //         timestamp: formatTimestamp(new Date().toISOString()),
// // // // //         animated: true
// // // // //       };

// // // // //       setChats((prevChats) =>
// // // // //         prevChats.map((chat) =>
// // // // //           chat.id === currentChat.id ? { ...chat, messages: [...chat.messages, errorMessage] } : chat
// // // // //         )
// // // // //       );
// // // // //     } finally {
// // // // //       setIsLoading(false);
// // // // //     }
// // // // //   };

// // // // //   const handleGenerateNotebook = async () => {
// // // // //     if (!currentChat) return;
// // // // //     setIsGeneratingNotebook(true);

// // // // //     try {
// // // // //       const response = await fetch('http://localhost:8000/api/chatgpt/', {
// // // // //         method: 'POST',
// // // // //         headers: { 'Content-Type': 'application/json' },
// // // // //         body: JSON.stringify({ action: 'generate_notebook', user_id: 'default_user' }),
// // // // //       });

// // // // //       if (!response.ok) {
// // // // //         throw new Error(`Failed to generate notebook: ${response.statusText}`);
// // // // //       }

// // // // //       const data = await response.json();
// // // // //       console.log('[DEBUG] Notebook generated:', data);

// // // // //       if (data.notebooks) {
// // // // //         setGeneratedNotebookData(data.notebooks);
// // // // //         setNotebookGenerated(true);

// // // // //         // Store additional data from generate_notebook
// // // // //         setGeneratedFileUrl(data.file_url);
// // // // //         setGeneratedTargetColumn(data.target_column);
// // // // //         setGeneratedEntityColumn(data.entity_column);
// // // // //         setGeneratedFeatures(data.features);
// // // // //         setGeneratedUserId(data.user_id);
// // // // //         setGeneratedChatId(data.chat_id);

// // // // //         const notebookMessage: Message = {
// // // // //           id: uuidv4(),
// // // // //           sender: 'assistant',
// // // // //           text: 'Notebook has been generated successfully.',
// // // // //           timestamp: formatTimestamp(new Date().toISOString()),
// // // // //           animated: true
// // // // //         };

// // // // //         setChats((prevChats) =>
// // // // //           prevChats.map((chat) =>
// // // // //             chat.id === currentChat.id ? { ...chat, messages: [...chat.messages, notebookMessage] } : chat
// // // // //           )
// // // // //         );

// // // // //         setCurrentChat((prevChat) =>
// // // // //           prevChat ? { ...prevChat, messages: [...prevChat.messages, notebookMessage] } : null
// // // // //         );
// // // // //       } else {
// // // // //         alert('Error generating notebook. Please try again.');
// // // // //       }
// // // // //     } catch (error) {
// // // // //       console.error('Error generating notebook:', error);
// // // // //       alert('Error generating notebook. Please try again.');
// // // // //     } finally {
// // // // //       setIsGeneratingNotebook(false);
// // // // //     }
// // // // //   };

// // // // //   // const handleOpenNotebook = () => {
// // // // //   //   if (generatedNotebookData) {
// // // // //   //     navigate('/notebook', { 
// // // // //   //       state: { 
// // // // //   //         notebooks: generatedNotebookData,
// // // // //   //         file_url: generatedFileUrl,
// // // // //   //         entity_column: generatedEntityColumn,
// // // // //   //         target_column: generatedTargetColumn,
// // // // //   //         features: generatedFeatures,
// // // // //   //         user_id: generatedUserId,
// // // // //   //         chat_id: generatedChatId,
// // // // //   //       } 
// // // // //   //     });
// // // // //   //   } else {
// // // // //   //     alert('No notebook data available.');
// // // // //   //   }
// // // // //   // };


// // // // //   const handleOpenNotebook = () => {
// // // // //     if (generatedNotebookData) {
// // // // //       console.log('Navigating with notebook data:', {
// // // // //         notebooks: generatedNotebookData,
// // // // //         file_url: generatedFileUrl,
// // // // //         entity_column: generatedEntityColumn,
// // // // //         target_column: generatedTargetColumn,
// // // // //         features: generatedFeatures,
// // // // //         user_id: generatedUserId,
// // // // //         chat_id: generatedChatId,
// // // // //       });
// // // // //       navigate('/notebook', { 
// // // // //         state: { 
// // // // //           notebooks: generatedNotebookData,
// // // // //           file_url: generatedFileUrl,
// // // // //           entity_column: generatedEntityColumn,
// // // // //           target_column: generatedTargetColumn,
// // // // //           features: generatedFeatures,
// // // // //           user_id: generatedUserId,
// // // // //           chat_id: generatedChatId,
// // // // //         } 
// // // // //       });
// // // // //     } else {
// // // // //       alert('No notebook data available.');
// // // // //     }
// // // // //   };

// // // // //   const handleReset = async () => {
// // // // //     await fetch('http://localhost:8000/api/chatgpt/', {
// // // // //       method: 'POST',
// // // // //       headers: { 'Content-Type': 'application/json' },
// // // // //       body: JSON.stringify({ action: 'reset', user_id: 'default_user' }),
// // // // //     });

// // // // //     const initialChat: Chat = {
// // // // //       id: '1',
// // // // //       title: 'New Prediction',
// // // // //       timestamp: new Date().toLocaleString(),
// // // // //       messages: [
// // // // //         {
// // // // //           id: uuidv4(),
// // // // //           sender: 'assistant',
// // // // //           text: defaultMessage,
// // // // //           timestamp: formatTimestamp(new Date().toISOString()),
// // // // //           animated: true
// // // // //         },
// // // // //       ],
// // // // //       isHistory: false
// // // // //     };

// // // // //     setChats([initialChat]);
// // // // //     setCurrentChat(initialChat);

// // // // //     setIsGeneratingNotebook(false);
// // // // //     setNotebookGenerated(false);
// // // // //     setGeneratedNotebookData(null);
// // // // //     setGeneratedFileUrl(undefined);
// // // // //     setGeneratedTargetColumn(undefined);
// // // // //     setGeneratedEntityColumn(undefined);
// // // // //     setGeneratedFeatures(undefined);
// // // // //     setGeneratedUserId(undefined);
// // // // //     setGeneratedChatId(undefined);
// // // // //   };

// // // // //   const messagesEndRef = useRef<HTMLDivElement | null>(null);
// // // // //   const scrollToBottom = () => {
// // // // //     messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
// // // // //   };

// // // // //   useEffect(() => {
// // // // //     scrollToBottom();
// // // // //   }, [currentChat?.messages, isLoading, isUploading]);

// // // // //   const isHistoryChat = currentChat?.isHistory;

// // // // //   return (
// // // // //     <div className="h-screen flex bg-gray-50">
// // // // //       <AnimatePresence>
// // // // //         {showSidebar && (
// // // // //           <motion.div
// // // // //             initial={{ x: -240 }}
// // // // //             animate={{ x: 0 }}
// // // // //             exit={{ x: -240 }}
// // // // //             transition={{ duration: 0.2 }}
// // // // //             className="w-60 border-r border-gray-200 bg-white"
// // // // //           >
// // // // //             <div className="p-3 border-b border-gray-100 flex justify-between items-center">
// // // // //               <span className="text-xs font-medium text-gray-600">Chat History</span>
// // // // //               <button
// // // // //                 onClick={handleNewChat}
// // // // //                 className="text-xs flex items-center gap-1 text-teal-700 hover:text-teal-800"
// // // // //               >
// // // // //                 <FiPlus size={12} /> New
// // // // //               </button>
// // // // //             </div>
// // // // //             <div className="overflow-y-auto h-[calc(100vh-49px)]">
// // // // //               {chats.map((chat) => (
// // // // //                 <div
// // // // //                   key={chat.id}
// // // // //                   onClick={() => setCurrentChat(chat)}
// // // // //                   className={`p-2 mx-2 my-1 rounded text-xs cursor-pointer flex items-center justify-between group ${
// // // // //                     currentChat?.id === chat.id ? 'bg-teal-50 text-teal-700' : 'hover:bg-gray-50'
// // // // //                   }`}
// // // // //                 >
// // // // //                   <div className="truncate flex-1">
// // // // //                     <div className="font-medium truncate">{chat.title}</div>
// // // // //                     <div className="text-[10px] text-gray-400">{chat.timestamp}</div>
// // // // //                   </div>
// // // // //                   <button
// // // // //                     onClick={(e) => {
// // // // //                       e.stopPropagation();
// // // // //                       setChats((prev) => prev.filter((c) => c.id !== chat.id));
// // // // //                       if (currentChat?.id === chat.id) {
// // // // //                         setCurrentChat(null);
// // // // //                       }
// // // // //                     }}
// // // // //                     className="opacity-0 group-hover:opacity-100 p-1 hover:text-red-500"
// // // // //                   >
// // // // //                     <FiTrash size={12} />
// // // // //                   </button>
// // // // //                 </div>
// // // // //               ))}
// // // // //             </div>
// // // // //           </motion.div>
// // // // //         )}
// // // // //       </AnimatePresence>

// // // // //       <div className="flex-1 flex flex-col">
// // // // //         <div className="h-12 border-b border-gray-200 flex items-center px-4 bg-white">
// // // // //           <button
// // // // //             onClick={() => setShowSidebar(!showSidebar)}
// // // // //             className="text-gray-500 hover:text-gray-700"
// // // // //           >
// // // // //             <FiMenu size={16} />
// // // // //           </button>
// // // // //           <span className="ml-4 text-sm font-medium">{currentChat?.title || 'Select a chat'}</span>
// // // // //           <div className="ml-auto">
// // // // //             <button
// // // // //               onClick={handleReset}
// // // // //               className="text-xs text-red-500 hover:text-red-600 flex items-center gap-1"
// // // // //             >
// // // // //               <FiTrash size={12} /> Reset
// // // // //             </button>
// // // // //           </div>
// // // // //         </div>

// // // // //         <div className="flex-1 overflow-y-auto px-4 py-6">
// // // // //           {currentChat?.messages.map((message) => {
// // // // //             const schemaData = parseSchema(message);
// // // // //             return (
// // // // //               <div
// // // // //                 key={message.id}
// // // // //                 className={`mb-4 flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
// // // // //               >
// // // // //                 <div
// // // // //                   className={`max-w-[80%] rounded-lg px-4 py-2 text-xs ${
// // // // //                     message.sender === 'user' ? 'bg-teal-700 text-white' : 'bg-white border border-gray-200'
// // // // //                   }`}
// // // // //                 >
// // // // //                   {message.isSchema && schemaData ? (
// // // // //                     <>
// // // // //                       <AnimatedMessage text={message.text} sender={message.sender} animated={message.animated} />
// // // // //                       <SchemaTable schema={schemaData} />
// // // // //                     </>
// // // // //                   ) : (
// // // // //                     <AnimatedMessage text={message.text} sender={message.sender} animated={message.animated} />
// // // // //                   )}

// // // // //                   <div
// // // // //                     className={`text-[10px] mt-1 ${
// // // // //                       message.sender === 'user' ? 'text-teal-300' : 'text-gray-400'
// // // // //                     }`}
// // // // //                   >
// // // // //                     {message.timestamp}
// // // // //                   </div>

// // // // //                   {message.button && (
// // // // //                     <div className="mt-2 flex gap-2">
// // // // //                       {isGeneratingNotebook ? (
// // // // //                         <button
// // // // //                           disabled
// // // // //                           className="flex items-center gap-2 px-4 py-2 bg-teal-500 text-white text-xs rounded"
// // // // //                         >
// // // // //                           <FiLoader className="animate-spin" /> Generating...
// // // // //                         </button>
// // // // //                       ) : notebookGenerated ? (
// // // // //                         <button
// // // // //                           onClick={handleOpenNotebook}
// // // // //                           className="px-4 py-2 bg-teal-500 text-white text-xs rounded hover:bg-teal-600"
// // // // //                         >
// // // // //                           Open Notebook
// // // // //                         </button>
// // // // //                       ) : (
// // // // //                         <button
// // // // //                           onClick={handleGenerateNotebook}
// // // // //                           className="px-4 py-2 bg-teal-500 text-white text-xs rounded hover:bg-teal-600"
// // // // //                         >
// // // // //                           Generate Notebook
// // // // //                         </button>
// // // // //                       )}
// // // // //                     </div>
// // // // //                   )}
// // // // //                 </div>
// // // // //               </div>
// // // // //             );
// // // // //           })}

// // // // //           {isLoading && (
// // // // //             <div className="mb-4 flex justify-start">
// // // // //               <div className="max-w-[80%] rounded-lg px-4 py-2 text-xs bg-white border border-gray-200 flex items-center">
// // // // //                 <FiLoader className="animate-spin mr-2" /> Typing...
// // // // //               </div>
// // // // //             </div>
// // // // //           )}

// // // // //           <div ref={messagesEndRef} />
// // // // //         </div>

// // // // //         {isUploading && (
// // // // //           <div className="px-4 py-2 border-t border-gray-200 bg-gray-50 text-teal-700 text-xs flex items-center gap-2">
// // // // //             <FiLoader className="animate-spin" /> Uploading files...
// // // // //           </div>
// // // // //         )}
// // // // //         {selectedFiles && selectedFiles.length > 0 && (
// // // // //           <div className="px-4 py-2 border-t border-gray-200 bg-gray-50">
// // // // //             <div className="flex flex-wrap gap-2">
// // // // //               {Array.from(selectedFiles).map((file) => (
// // // // //                 <div key={uuidv4()} className="flex flex-col gap-2 bg-white px-2 py-2 rounded border text-xs">
// // // // //                   <div className="truncate max-w-[150px]">
// // // // //                     <strong>{file.name}</strong> ({(file.size / 1024).toFixed(1)} KB)
// // // // //                   </div>
// // // // //                 </div>
// // // // //               ))}
// // // // //             </div>
// // // // //             <button
// // // // //               onClick={handleFileUpload}
// // // // //               className="mt-2 px-4 py-2 bg-teal-700 text-white text-xs rounded hover:bg-teal-800"
// // // // //             >
// // // // //               Upload Files
// // // // //             </button>
// // // // //           </div>
// // // // //         )}

// // // // //         <div className="p-4 border-t border-gray-200 bg-white">
// // // // //           <div 
// // // // //             className="flex items-center gap-2"
// // // // //             style={{ cursor: isHistoryChat ? 'not-allowed' : 'auto' }}
// // // // //             title={isHistoryChat ? "🚫 You cannot compose messages in history chats" : ""}
// // // // //           >
// // // // //             <label className={`cursor-pointer text-gray-400 hover:text-gray-600 ${isHistoryChat ? 'opacity-50 cursor-not-allowed' : ''}`} title={isHistoryChat ? "🚫 You cannot attach files in history chats" : ""}>
// // // // //               <input type="file" multiple className="hidden" onChange={handleFileSelect} disabled={isHistoryChat ? true : false} />
// // // // //               <FiPaperclip size={16} />
// // // // //             </label>
// // // // //             <input
// // // // //               type="text"
// // // // //               value={inputMessage}
// // // // //               onChange={(e) => setInputMessage(e.target.value)}
// // // // //               onKeyPress={(e) => {
// // // // //                 if (e.key === 'Enter') handleSendMessage();
// // // // //               }}
// // // // //               placeholder="Type your message..."
// // // // //               className="flex-1 text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:border-teal-400"
// // // // //               disabled={isHistoryChat ? true : false}
// // // // //               style={{ cursor: isHistoryChat ? 'not-allowed' : 'text' }}
// // // // //               title={isHistoryChat ? "🚫 You cannot compose messages in history chats" : ""}
// // // // //             />
// // // // //             <button 
// // // // //               onClick={handleSendMessage} 
// // // // //               className="text-teal-700 hover:text-teal-800"
// // // // //               disabled={isHistoryChat ? true : false}
// // // // //               style={{ cursor: isHistoryChat ? 'not-allowed' : 'pointer' }}
// // // // //               title={isHistoryChat ? "🚫 You cannot compose messages in history chats" : ""}
// // // // //             >
// // // // //               <FiSend size={16} />
// // // // //             </button>
// // // // //           </div>
// // // // //         </div>
// // // // //       </div>
// // // // //     </div>
// // // // //   );
// // // // // };

// // // // // export default ChatInterface;








// // // // // src/components/ChatInterface/ChatInterface.tsx

// // // // import React, { useState, useEffect, useRef } from 'react';
// // // // import {
// // // //   FiPlus,
// // // //   FiMenu,
// // // //   FiPaperclip,
// // // //   FiSend,
// // // //   FiTrash,
// // // //   FiLoader,
// // // // } from 'react-icons/fi';
// // // // import { motion, AnimatePresence } from 'framer-motion';
// // // // import { v4 as uuidv4 } from 'uuid';
// // // // import { useNavigate } from 'react-router-dom';
// // // // import { useAuth } from '../Auth/AuthContext';

// // // // interface Message {
// // // //   id: string;
// // // //   sender: 'user' | 'assistant';
// // // //   text: string;
// // // //   timestamp: string;
// // // //   button?: boolean; // If true, show "Generate Notebook" or "Open Notebook"
// // // //   isSchema?: boolean;
// // // //   schema?: Array<{ column_name: string; data_type: string }>;
// // // //   animated?: boolean;
// // // // }

// // // // interface Chat {
// // // //   id: string;
// // // //   title: string;
// // // //   timestamp: string;
// // // //   messages: Message[];
// // // //   isHistory?: boolean;
// // // // }

// // // // interface NotebookMetadata {
// // // //   file_url: string;
// // // //   target_column: string;
// // // //   entity_column: string;
// // // //   features: string[];
// // // //   user_id: string;
// // // //   chat_id: string;
// // // // }

// // // // const ChatInterface: React.FC = () => {
// // // //   const defaultMessage = `Hi! 👋 I'm your AI assistant.\nI'll assist you in formulating a predictive question. I'll then create a SQL notebook to build a training set.\nSo, what would you like to predict?`;



// // // //   // const { user } = useAuth();
// // // //   const { user, loading } = useAuth();
// // // //   // const userId = user?.id || 'Unknown';
// // // //   // console.log('User ID:', userId);
// // // //   console.log('.................................................');

// // // //   const userId = user?.id;
// // // //   console.log('User ID lean:', userId);
// // // //   const [chats, setChats] = useState<Chat[]>([]);
// // // //   const [currentChat, setCurrentChat] = useState<Chat | null>(null);
// // // //   const [showSidebar, setShowSidebar] = useState(true);
// // // //   const [inputMessage, setInputMessage] = useState('');
// // // //   const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);

// // // //   const [isLoading, setIsLoading] = useState(false);
// // // //   const [isUploading, setIsUploading] = useState(false);

// // // //   const [isGeneratingNotebook, setIsGeneratingNotebook] = useState(false);
// // // //   const [notebookGenerated, setNotebookGenerated] = useState(false);
// // // //   const [generatedNotebookData, setGeneratedNotebookData] = useState<any>(null); // Store complete notebook data
// // // //   const [generatedFileUrl, setGeneratedFileUrl] = useState<string>('');
// // // //   const [generatedTargetColumn, setGeneratedTargetColumn] = useState<string>('');
// // // //   const [generatedEntityColumn, setGeneratedEntityColumn] = useState<string>('');
// // // //   const [generatedFeatures, setGeneratedFeatures] = useState<string[]>([]);
// // // //   const [generatedUserId, setGeneratedUserId] = useState<string>('');
// // // //   const [generatedChatId, setGeneratedChatId] = useState<string>('');

// // // //   const navigate = useNavigate();

// // // //   const messagesEndRef = useRef<HTMLDivElement | null>(null);

// // // //   // Scroll to bottom when messages update
// // // //   const scrollToBottom = () => {
// // // //     messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
// // // //   };

// // // //   useEffect(() => {
// // // //     scrollToBottom();
// // // //   }, [currentChat?.messages, isLoading, isUploading]);

// // // //   useEffect(() => {
// // // //     const fetchAndInitializeChats = async () => {
// // // //       try {
// // // //         const fetchedChats = await fetchChatHistory(userId?.toString() || 'default_user'); // Replace 'default_user' with dynamic user_id if available
// // // //         if (fetchedChats.length > 0) {
// // // //           setChats(fetchedChats);
// // // //           setCurrentChat(fetchedChats[0]);
// // // //         } else {
// // // //           initializeDefaultChat();
// // // //         }
// // // //       } catch (error) {
// // // //         console.error("Error fetching chat history:", error);
// // // //         initializeDefaultChat();
// // // //       }
// // // //     };
    
  
// // // //     const initializeDefaultChat = () => {
// // // //       const initialChat: Chat = {
// // // //         id: uuidv4(),
// // // //         title: 'New Prediction',
// // // //         timestamp: new Date().toLocaleString(),
// // // //         messages: [
// // // //           {
// // // //             id: uuidv4(),
// // // //             sender: "assistant",
// // // //             text: defaultMessage,
// // // //             timestamp: formatTimestamp(new Date().toISOString()),
// // // //             animated: true,
// // // //           },
// // // //         ],
// // // //         isHistory: false,
// // // //       };
// // // //       setChats([initialChat]);
// // // //       setCurrentChat(initialChat);
// // // //     };

// // // //     fetchAndInitializeChats();
// // // //   }, [defaultMessage]);

// // // //   // Function to fetch chat history
// // // //   const fetchChatHistory = async (user_id: string): Promise<Chat[]> => {
// // // //     const response = await fetch(`http://localhost:8000/api/chat_history?user_id=${user_id}`);
// // // //     if (!response.ok) {
// // // //       throw new Error('Failed to fetch chat history');
// // // //     }
// // // //     const data = await response.json();
// // // //     return data;
// // // //   };

// // // //   // Function to upload files
// // // //   const uploadFiles = async (files: FileList): Promise<any> => {
// // // //     const formData = new FormData();
// // // //     Array.from(files).forEach((file) => {
// // // //       formData.append('file', file);
// // // //     });

// // // //     const response = await fetch(`http://localhost:8000/api/chatgpt/`, {
// // // //       method: 'POST',
// // // //       body: formData,
// // // //     });

// // // //     if (!response.ok) {
// // // //       throw new Error('Failed to upload files');
// // // //     }

// // // //     const data = await response.json();
// // // //     return data;
// // // //   };

// // // //   // Function to send message
// // // //   const sendMessage = async (message: string, user_id: string): Promise<any> => {
// // // //     const response = await fetch(`http://localhost:8000/api/chatgpt/`, {
// // // //       method: 'POST',
// // // //       headers: { 'Content-Type': 'application/json' },
// // // //       body: JSON.stringify({ message, user_id }),
// // // //     });

// // // //     if (!response.ok) {
// // // //       throw new Error('Failed to send message');
// // // //     }

// // // //     const data = await response.json();
// // // //     return data;
// // // //   };

// // // //   // // Function to generate notebook
// // // //   // const generateNotebook = async (user_id: string): Promise<any> => {
// // // //   //   const response = await fetch(`http://localhost:8000/api/chatgpt/`, {
// // // //   //     method: 'POST',
// // // //   //     headers: { 'Content-Type': 'application/json' },
// // // //   //     body: JSON.stringify({ action: 'generate_notebook', user_id }),
// // // //   //   });

// // // //   //   if (!response.ok) {
// // // //   //     throw new Error('Failed to generate notebook');
// // // //   //   }

// // // //   //   const data = await response.json();
// // // //   //   return data;
// // // //   // };

// // // //   // Function to reset chat
// // // //   const resetChat = async (user_id: string): Promise<void> => {
// // // //     const response = await fetch(`http://localhost:8000/api/chatgpt/`, {
// // // //       method: 'POST',
// // // //       headers: { 'Content-Type': 'application/json' },
// // // //       body: JSON.stringify({ action: 'reset', user_id }),
// // // //     });

// // // //     if (!response.ok) {
// // // //       throw new Error('Failed to reset chat');
// // // //     }
// // // //   };

// // // //   // Handle creating a new chat
// // // //   const handleNewChat = () => {
// // // //     const newChat: Chat = {
// // // //       id: '', // Set empty to let the backend generate a new chat_id
// // // //       title: 'New Prediction',
// // // //       timestamp: new Date().toLocaleString(),
// // // //       messages: [
// // // //         {
// // // //           id: uuidv4(),
// // // //           sender: 'assistant',
// // // //           text: defaultMessage,
// // // //           timestamp: formatTimestamp(new Date().toISOString()),
// // // //           animated: true,
// // // //         },
// // // //       ],
// // // //       isHistory: false,
// // // //     };
// // // //     setChats((prev) => [newChat, ...prev]);
// // // //     setCurrentChat(newChat);

// // // //     setIsGeneratingNotebook(false);
// // // //     setNotebookGenerated(false);
// // // //     setGeneratedNotebookData(null);
// // // //   };

// // // //   // Handle file selection
// // // //   const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
// // // //     const files = e.target.files;
// // // //     if (files && files.length > 0) {
// // // //       setSelectedFiles(files);
// // // //     }
// // // //   };

// // // //   // Handle file upload
// // // //   const handleFileUpload = async () => {
// // // //     if (!selectedFiles || selectedFiles.length === 0) {
// // // //       alert('No files selected.');
// // // //       return;
// // // //     }

// // // //     setIsUploading(true);

// // // //     try {
// // // //       const data = await uploadFiles(selectedFiles);
// // // //       console.log('[DEBUG] File upload response:', data);

// // // //       if (data.uploaded_files && data.uploaded_files.length > 0) {
// // // //         const uploadedFile = data.uploaded_files[0];
// // // //         const schema = uploadedFile.schema;
// // // //         const suggestions = uploadedFile.suggestions;

// // // //         if (schema && schema.length > 0) {
// // // //           const schemaMessage: Message = {
// // // //             id: uuidv4(),
// // // //             sender: 'assistant',
// // // //             text: 'Dataset uploaded successfully! Below is the schema:',
// // // //             timestamp: formatTimestamp(new Date().toISOString()),
// // // //             isSchema: true,
// // // //             schema: schema,
// // // //             animated: true,
// // // //           };

// // // //           const confirmationText = `
// // // // Suggested Target Column: ${suggestions.target_column}
// // // // Suggested Entity ID Column: ${suggestions.entity_id_column}
// // // // Suggested Feature Columns: ${suggestions.feature_columns.join(', ')}

// // // // Please confirm:
// // // // - Is the Target Column correct?
// // // // - Is the Entity ID Column correct?
// // // // (Reply 'yes' to confirm or provide the correct column names as needed)
// // // //           `.trim();

// // // //           const confirmationMessage: Message = {
// // // //             id: uuidv4(),
// // // //             sender: 'assistant',
// // // //             text: confirmationText,
// // // //             timestamp: formatTimestamp(new Date().toISOString()),
// // // //             animated: true,
// // // //           };

// // // //           setCurrentChat((prevChat) => {
// // // //             if (!prevChat) return null;
// // // //             const updatedMessages = [...prevChat.messages, schemaMessage, confirmationMessage];
// // // //             return { ...prevChat, messages: updatedMessages };
// // // //           });

// // // //           setChats((prevChats) =>
// // // //             prevChats.map((chat) =>
// // // //               chat.id === currentChat?.id
// // // //                 ? { ...chat, messages: [...chat.messages, schemaMessage, confirmationMessage] }
// // // //                 : chat
// // // //             )
// // // //           );
// // // //         } else {
// // // //           console.error('Schema data missing.');
// // // //         }
// // // //       } else {
// // // //         console.error('No uploaded_files data.');
// // // //       }
// // // //     } catch (error: any) {
// // // //       console.error('File upload error:', error);
// // // //       const errorMessage: Message = {
// // // //         id: uuidv4(),
// // // //         sender: 'assistant',
// // // //         text: `Upload Error: ${error instanceof Error ? error.message : 'Unknown error'}`,
// // // //         timestamp: formatTimestamp(new Date().toISOString()),
// // // //         animated: true,
// // // //       };

// // // //       setCurrentChat((prevChat) => {
// // // //         if (!prevChat) return null;
// // // //         return { ...prevChat, messages: [...prevChat.messages, errorMessage] };
// // // //       });
// // // //       setChats((prevChats) =>
// // // //         prevChats.map((chat) =>
// // // //           chat.id === currentChat?.id ? { ...chat, messages: [...chat.messages, errorMessage] } : chat
// // // //         )
// // // //       );
// // // //     } finally {
// // // //       setSelectedFiles(null);
// // // //       setIsUploading(false);
// // // //     }
// // // //   };

// // // //   // Handle sending a message
// // // //   const handleSendMessage = async () => {
// // // //     if (!inputMessage.trim()) return;
// // // //     if (!currentChat) return;
  
// // // //     // if (currentChat.isHistory) return;
  
// // // //     const userMessage: Message = {
// // // //       id: uuidv4(),
// // // //       sender: 'user',
// // // //       text: inputMessage,
// // // //       timestamp: formatTimestamp(new Date().toISOString()),
// // // //       animated: false,
// // // //     };
  
// // // //     const updatedChat = {
// // // //       ...currentChat,
// // // //       messages: [...currentChat.messages, userMessage],
// // // //       timestamp: userMessage.timestamp,
// // // //     };
  
// // // //     setChats((prevChats) =>
// // // //       prevChats.map((chat) => (chat.id === currentChat.id ? updatedChat : chat))
// // // //     );
// // // //     setCurrentChat(updatedChat);
// // // //     setInputMessage('');
// // // //     setIsLoading(true);
  
// // // //     try {
// // // //       const data = await sendMessage(userMessage.text, userId?.toString() || 'default_user'); // Replace 'default_user' with dynamic user_id if available

// // // //       let showGenerateButton = data.show_generate_notebook || false;
  
// // // //       // Update chat ID if a new one is generated
// // // //       const newChatId = data.chat_id || currentChat.id;
  
// // // //       const botMessage: Message = {
// // // //         id: uuidv4(),
// // // //         sender: 'assistant',
// // // //         text: data.response,
// // // //         timestamp: formatTimestamp(new Date().toISOString()),
// // // //         button: showGenerateButton,
// // // //         animated: true,
// // // //       };
  
// // // //       const updatedMessages = [...updatedChat.messages, botMessage];
  
// // // //       setChats((prevChats) =>
// // // //         prevChats.map((chat) =>
// // // //           chat.id === currentChat.id
// // // //             ? { ...chat, id: newChatId, messages: updatedMessages }
// // // //             : chat
// // // //         )
// // // //       );
  
// // // //       setCurrentChat((prevChat) =>
// // // //         prevChat ? { ...prevChat, id: newChatId, messages: updatedMessages } : null
// // // //       );
  
// // // //       setIsGeneratingNotebook(false);
// // // //       setNotebookGenerated(false);
// // // //       setGeneratedNotebookData(null);
// // // //     } catch (error) {
// // // //       console.error('Error sending message:', error);
// // // //       const errorMessage: Message = {
// // // //         id: uuidv4(),
// // // //         sender: 'assistant',
// // // //         text: 'Sorry, I encountered an issue. Please try again later.',
// // // //         timestamp: formatTimestamp(new Date().toISOString()),
// // // //         animated: true,
// // // //       };
  
// // // //       setChats((prevChats) =>
// // // //         prevChats.map((chat) =>
// // // //           chat.id === currentChat.id
// // // //             ? { ...chat, messages: [...chat.messages, errorMessage] }
// // // //             : chat
// // // //         )
// // // //       );
// // // //     } finally {
// // // //       setIsLoading(false);
// // // //     }
// // // //   };

// // // //   // // Handle generating notebook
// // // //   // const handleGenerateNotebook = async () => {
// // // //   //   if (!currentChat) return;
// // // //   //   setIsGeneratingNotebook(true);

// // // //   //   try {
// // // //   //     const response = await fetch('http://localhost:8000/api/chatgpt/', {
// // // //   //       method: 'POST',
// // // //   //       headers: { 'Content-Type': 'application/json' },
// // // //   //       body: JSON.stringify({ action: 'generate_notebook', user_id: userId?.toString() || 'default_user' }), // Replace 'default_user' with dynamic user_id if available
// // // //   //     });

// // // //   //     if (!response.ok) {
// // // //   //       throw new Error(`Failed to generate notebook: ${response.statusText}`);
// // // //   //     }

// // // //   //     const data = await response.json();
// // // //   //     console.log('[DEBUG] Notebook generated:', data);

// // // //   //     if (data.notebooks) {
// // // //   //       setGeneratedNotebookData(data.notebooks);
// // // //   //       setNotebookGenerated(true);

// // // //   //       // Store additional data from generate_notebook
// // // //   //       setGeneratedFileUrl(data.file_url);
// // // //   //       setGeneratedTargetColumn(data.target_column);
// // // //   //       setGeneratedEntityColumn(data.entity_column);
// // // //   //       setGeneratedFeatures(data.features);
// // // //   //       setGeneratedUserId(data.user_id);
// // // //   //       setGeneratedChatId(data.chat_id);

// // // //   //       const notebookMessage: Message = {
// // // //   //         id: uuidv4(),
// // // //   //         sender: 'assistant',
// // // //   //         text: 'Notebook has been generated successfully.',
// // // //   //         timestamp: formatTimestamp(new Date().toISOString()),
// // // //   //         animated: true,
// // // //   //         button: true, // To show "Open Notebook" button
// // // //   //       };

// // // //   //       setChats((prevChats) =>
// // // //   //         prevChats.map((chat) =>
// // // //   //           chat.id === currentChat.id ? { ...chat, messages: [...chat.messages, notebookMessage] } : chat
// // // //   //         )
// // // //   //       );

// // // //   //       setCurrentChat((prevChat) =>
// // // //   //         prevChat ? { ...prevChat, messages: [...prevChat.messages, notebookMessage] } : null
// // // //   //       );
// // // //   //     } else {
// // // //   //       alert('Error generating notebook. Please try again.');
// // // //   //     }
// // // //   //   } catch (error) {
// // // //   //     console.error('Error generating notebook:', error);
// // // //   //     alert('Error generating notebook. Please try again.');
// // // //   //   } finally {
// // // //   //     setIsGeneratingNotebook(false);
// // // //   //   }
// // // //   // };


// // // //   // Handle generating notebook
// // // // const handleGenerateNotebook = async () => {
// // // //   if (!currentChat || !userId) {
// // // //     console.error('User ID or Current Chat not available.');
// // // //     return;
// // // //   }

// // // //   setIsGeneratingNotebook(true);

// // // //   try {
// // // //     // Make the API call to generate a notebook
// // // //     const response = await fetch('http://localhost:8000/api/chatgpt/', {
// // // //       method: 'POST',
// // // //       headers: { 'Content-Type': 'application/json' },
// // // //       body: JSON.stringify({
// // // //         action: 'generate_notebook',
// // // //         user_id: userId.toString(),
// // // //         chat_id: currentChat.id, // Include the current chat ID
// // // //       }),
// // // //     });

// // // //     if (!response.ok) {
// // // //       throw new Error(`Failed to generate notebook: ${response.statusText}`);
// // // //     }

// // // //     const data = await response.json();
// // // //     console.log('[DEBUG] Notebook generated:', data);

// // // //     if (data.notebooks) {
// // // //       // Update the frontend state with the generated notebook details
// // // //       setGeneratedNotebookData(data.notebooks);
// // // //       setNotebookGenerated(true);
// // // //       setGeneratedFileUrl(data.file_url);
// // // //       setGeneratedTargetColumn(data.target_column);
// // // //       setGeneratedEntityColumn(data.entity_column);
// // // //       setGeneratedFeatures(data.features);
// // // //       setGeneratedUserId(data.user_id);
// // // //       setGeneratedChatId(data.chat_id);

// // // //       const notebookMessage: Message = {
// // // //         id: uuidv4(),
// // // //         sender: 'assistant',
// // // //         text: 'Notebook has been generated successfully.',
// // // //         timestamp: formatTimestamp(new Date().toISOString()),
// // // //         animated: true,
// // // //         button: true, // To show the "Open Notebook" button
// // // //       };

// // // //       // Update the chat messages to reflect the notebook generation
// // // //       setChats((prevChats) =>
// // // //         prevChats.map((chat) =>
// // // //           chat.id === currentChat.id ? { ...chat, messages: [...chat.messages, notebookMessage] } : chat
// // // //         )
// // // //       );

// // // //       setCurrentChat((prevChat) =>
// // // //         prevChat ? { ...prevChat, messages: [...prevChat.messages, notebookMessage] } : null
// // // //       );
// // // //     } else {
// // // //       alert('Error generating notebook. Please try again.');
// // // //     }
// // // //   } catch (error) {
// // // //     console.error('Error generating notebook:', error);
// // // //     alert('Error generating notebook. Please try again.');
// // // //   } finally {
// // // //     setIsGeneratingNotebook(false);
// // // //   }
// // // // };


// // // //   // Handle opening notebook
// // // //   const handleOpenNotebook = () => {
// // // //     if (generatedNotebookData) {
// // // //       console.log('Navigating with notebook data:', {
// // // //         notebooks: generatedNotebookData,
// // // //         file_url: generatedFileUrl,
// // // //         entity_column: generatedEntityColumn,
// // // //         target_column: generatedTargetColumn,
// // // //         features: generatedFeatures,
// // // //         user_id: generatedUserId,
// // // //         chat_id: generatedChatId,
// // // //       });
// // // //       navigate('/notebook', { 
// // // //         state: { 
// // // //           notebooks: generatedNotebookData,
// // // //           file_url: generatedFileUrl,
// // // //           entity_column: generatedEntityColumn,
// // // //           target_column: generatedTargetColumn,
// // // //           features: generatedFeatures,
// // // //           user_id: generatedUserId,
// // // //           chat_id: generatedChatId,
// // // //           isTrained: false, // Initially not trained
// // // //         } 
// // // //       });
// // // //     } else {
// // // //       alert('No notebook data available.');
// // // //     }
// // // //   };

// // // //   // Handle resetting chat
// // // //   const handleReset = async () => {
// // // //     try {
// // // //       await resetChat('default_user'); // Replace 'default_user' with dynamic user_id if available

// // // //       const initialChat: Chat = {
// // // //         id: uuidv4(),
// // // //         title: 'New Prediction',
// // // //         timestamp: new Date().toLocaleString(),
// // // //         messages: [
// // // //           {
// // // //             id: uuidv4(),
// // // //             sender: 'assistant',
// // // //             text: defaultMessage,
// // // //             timestamp: formatTimestamp(new Date().toISOString()),
// // // //             animated: true,
// // // //           },
// // // //         ],
// // // //         isHistory: false,
// // // //       };

// // // //       setChats([initialChat]);
// // // //       setCurrentChat(initialChat);

// // // //       setIsGeneratingNotebook(false);
// // // //       setNotebookGenerated(false);
// // // //       setGeneratedNotebookData(null);
// // // //     } catch (error) {
// // // //       console.error('Error resetting chat:', error);
// // // //       alert('Error resetting chat. Please try again.');
// // // //     }
// // // //   };

// // // //   const isHistoryChat = currentChat?.isHistory;

// // // //   return (
// // // //     <div className="h-screen flex bg-gray-50">
// // // //       <AnimatePresence>
// // // //         {showSidebar && (
// // // //           <motion.div
// // // //             initial={{ x: -240 }}
// // // //             animate={{ x: 0 }}
// // // //             exit={{ x: -240 }}
// // // //             transition={{ duration: 0.2 }}
// // // //             className="w-60 border-r border-gray-200 bg-white"
// // // //           >
// // // //             {/* Chat History Sidebar */}
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
// // // //                     onClick={(e) => {
// // // //                       e.stopPropagation();
// // // //                       setChats((prev) => prev.filter((c) => c.id !== chat.id));
// // // //                       if (currentChat?.id === chat.id) {
// // // //                         setCurrentChat(null);
// // // //                       }
// // // //                     }}
// // // //                     className="opacity-0 group-hover:opacity-100 p-1 hover:text-red-500"
// // // //                     aria-label="Delete Chat"
// // // //                   >
// // // //                     <FiTrash size={12} />
// // // //                   </button>
// // // //                 </div>
// // // //               ))}
// // // //             </div>
// // // //           </motion.div>
// // // //         )}
// // // //       </AnimatePresence>

// // // //       <div className="flex-1 flex flex-col">
// // // //         {/* Header */}
// // // //         <div className="h-12 border-b border-gray-200 flex items-center px-4 bg-white">
// // // //           <button
// // // //             onClick={() => setShowSidebar(!showSidebar)}
// // // //             className="text-gray-500 hover:text-gray-700"
// // // //             aria-label="Toggle sidebar"
// // // //           >
// // // //             <FiMenu size={16} />
// // // //           </button>
// // // //           <span className="ml-4 text-sm font-medium">{currentChat?.title || 'Select a chat'}</span>
// // // //           <div className="ml-auto">
// // // //             <button
// // // //               onClick={handleReset}
// // // //               className="text-xs text-red-500 hover:text-red-600 flex items-center gap-1"
// // // //               aria-label="Reset Chat"
// // // //             >
// // // //               <FiTrash size={12} /> Reset
// // // //             </button>
// // // //           </div>
// // // //         </div>

// // // //         {/* Chat Messages */}
// // // //         <div className="flex-1 overflow-y-auto px-4 py-6">
// // // //           {currentChat?.messages.map((message) => {
// // // //             const schemaData = parseSchema(message);
// // // //             return (
// // // //               <div
// // // //                 key={message.id}
// // // //                 className={`mb-4 flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
// // // //               >
// // // //                 <div
// // // //                   className={`max-w-[80%] rounded-lg px-4 py-2 text-xs ${
// // // //                     message.sender === 'user' ? 'bg-teal-700 text-white' : 'bg-white border border-gray-200'
// // // //                   }`}
// // // //                 >
// // // //                   {message.isSchema && schemaData ? (
// // // //                     <>
// // // //                       <AnimatedMessage text={message.text} sender={message.sender} animated={message.animated} />
// // // //                       <SchemaTable schema={schemaData} />
// // // //                     </>
// // // //                   ) : (
// // // //                     <AnimatedMessage text={message.text} sender={message.sender} animated={message.animated} />
// // // //                   )}

// // // //                   <div
// // // //                     className={`text-[10px] mt-1 ${
// // // //                       message.sender === 'user' ? 'text-teal-300' : 'text-gray-400'
// // // //                     }`}
// // // //                   >
// // // //                     {message.timestamp}
// // // //                   </div>

// // // //                   {message.button && (
// // // //                     <div className="mt-2 flex gap-2">
// // // //                       {isGeneratingNotebook ? (
// // // //                         <button
// // // //                           disabled
// // // //                           className="flex items-center gap-2 px-4 py-2 bg-teal-500 text-white text-xs rounded"
// // // //                         >
// // // //                           <FiLoader className="animate-spin" /> Generating...
// // // //                         </button>
// // // //                       ) : notebookGenerated ? (
// // // //                         <button
// // // //                           onClick={handleOpenNotebook}
// // // //                           className="px-4 py-2 bg-teal-500 text-white text-xs rounded hover:bg-teal-600"
// // // //                         >
// // // //                           Open Notebook
// // // //                         </button>
// // // //                       ) : (
// // // //                         <button
// // // //                           onClick={handleGenerateNotebook}
// // // //                           className="px-4 py-2 bg-teal-500 text-white text-xs rounded hover:bg-teal-600"
// // // //                         >
// // // //                           Generate Notebook
// // // //                         </button>
// // // //                       )}
// // // //                     </div>
// // // //                   )}
// // // //                 </div>
// // // //               </div>
// // // //             );
// // // //           })}

// // // //           {isLoading && (
// // // //             <div className="mb-4 flex justify-start">
// // // //               <div className="max-w-[80%] rounded-lg px-4 py-2 text-xs bg-white border border-gray-200 flex items-center">
// // // //                 <FiLoader className="animate-spin mr-2" /> Typing...
// // // //               </div>
// // // //             </div>
// // // //           )}

// // // //           <div ref={messagesEndRef} />
// // // //         </div>

// // // //         {/* Uploading Indicator */}
// // // //         {isUploading && (
// // // //           <div className="px-4 py-2 border-t border-gray-200 bg-gray-50 text-teal-700 text-xs flex items-center gap-2">
// // // //             <FiLoader className="animate-spin" /> Uploading files...
// // // //           </div>
// // // //         )}
// // // //         {/* Selected Files Preview */}
// // // //         {selectedFiles && selectedFiles.length > 0 && (
// // // //           <div className="px-4 py-2 border-t border-gray-200 bg-gray-50">
// // // //             <div className="flex flex-wrap gap-2">
// // // //               {Array.from(selectedFiles).map((file) => (
// // // //                 <div key={uuidv4()} className="flex flex-col gap-2 bg-white px-2 py-2 rounded border text-xs">
// // // //                   <div className="truncate max-w-[150px]">
// // // //                     <strong>{file.name}</strong> ({(file.size / 1024).toFixed(1)} KB)
// // // //                   </div>
// // // //                 </div>
// // // //               ))}
// // // //             </div>
// // // //             <button
// // // //               onClick={handleFileUpload}
// // // //               className="mt-2 px-4 py-2 bg-teal-700 text-white text-xs rounded hover:bg-teal-800"
// // // //             >
// // // //               Upload Files
// // // //             </button>
// // // //           </div>
// // // //         )}

// // // //         {/* Message Input */}
// // // //         <div className="p-4 border-t border-gray-200 bg-white">
// // // //           <div
// // // //             className="flex items-center gap-2"
// // // //             style={{ cursor: isHistoryChat ? 'not-allowed' : 'auto' }}
// // // //             title={isHistoryChat ? '🚫 You cannot compose messages in history chats' : ''}
// // // //           >
// // // //             <label
// // // //               className={`cursor-pointer text-gray-400 hover:text-gray-600 ${
// // // //                 isHistoryChat ? 'opacity-50 cursor-not-allowed' : ''
// // // //               }`}
// // // //               title={isHistoryChat ? '🚫 You cannot attach files in history chats' : ''}
// // // //             >
// // // //               <input
// // // //                 type="file"
// // // //                 multiple
// // // //                 className="hidden"
// // // //                 onChange={handleFileSelect}
// // // //                 disabled={isHistoryChat ? true : false}
// // // //               />
// // // //               <FiPaperclip size={16} />
// // // //             </label>
// // // //             <input
// // // //               type="text"
// // // //               value={inputMessage}
// // // //               onChange={(e) => setInputMessage(e.target.value)}
// // // //               onKeyPress={(e) => {
// // // //                 if (e.key === 'Enter') handleSendMessage();
// // // //               }}
// // // //               placeholder="Type your message..."
// // // //               className="flex-1 text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:border-teal-400"
// // // //               disabled={isHistoryChat ? true : false}
// // // //               style={{ cursor: isHistoryChat ? 'not-allowed' : 'text' }}
// // // //               title={isHistoryChat ? '🚫 You cannot compose messages in history chats' : ''}
// // // //             />
// // // //             <button
// // // //               onClick={handleSendMessage}
// // // //               className="text-teal-700 hover:text-teal-800"
// // // //               disabled={isHistoryChat ? true : false}
// // // //               style={{ cursor: isHistoryChat ? 'not-allowed' : 'pointer' }}
// // // //               title={isHistoryChat ? '🚫 You cannot compose messages in history chats' : ''}
// // // //               aria-label="Send Message"
// // // //             >
// // // //               <FiSend size={16} />
// // // //             </button>
// // // //           </div>
// // // //         </div>
// // // //       </div>
// // // //     </div>
// // // //   );
// // // // };

// // // // // Inline AnimatedMessage Component
// // // // const AnimatedMessage: React.FC<{
// // // //   text: string;
// // // //   sender: 'user' | 'assistant';
// // // //   animated?: boolean;
// // // // }> = ({ text, sender, animated }) => {
// // // //   const [displayedText, setDisplayedText] = useState('');
// // // //   const indexRef = useRef(0);

// // // //   useEffect(() => {
// // // //     if (animated && sender === 'assistant') {
// // // //       const interval = setInterval(() => {
// // // //         setDisplayedText((prev) => prev + text.charAt(indexRef.current));
// // // //         indexRef.current += 1;
// // // //         if (indexRef.current >= text.length) {
// // // //           clearInterval(interval);
// // // //         }
// // // //       }, 10);
// // // //       return () => clearInterval(interval);
// // // //     } else {
// // // //       setDisplayedText(text);
// // // //     }
// // // //   }, [text, sender, animated]);

// // // //   return <pre className="whitespace-pre-wrap font-sans">{displayedText}</pre>;
// // // // };

// // // // // Inline SchemaTable Component
// // // // const SchemaTable: React.FC<{
// // // //   schema: Array<{ column_name: string; data_type: string }>;
// // // // }> = ({ schema }) => {
// // // //   return (
// // // //     <div className="overflow-x-auto mt-2">
// // // //       <table className="min-w-full border-collapse">
// // // //         <thead>
// // // //           <tr>
// // // //             <th className="px-4 py-2 border-b bg-gray-100 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
// // // //               Field
// // // //             </th>
// // // //             <th className="px-4 py-2 border-b bg-gray-100 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
// // // //               Data Type
// // // //             </th>
// // // //           </tr>
// // // //         </thead>
// // // //         <tbody>
// // // //           {schema.map((field, index) => (
// // // //             <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
// // // //               <td className="px-4 py-2 border-b text-xs text-gray-600">{field.column_name}</td>
// // // //               <td className="px-4 py-2 border-b text-xs text-gray-600">{field.data_type}</td>
// // // //             </tr>
// // // //           ))}
// // // //         </tbody>
// // // //       </table>
// // // //     </div>
// // // //   );
// // // // };

// // // // // Helper function to parse schema
// // // // const parseSchema = (message: Message): Array<{ column_name: string; data_type: string }> | null => {
// // // //   if (!message.isSchema || !message.schema) return null;
// // // //   return message.schema;
// // // // };

// // // // // Helper function to format timestamp
// // // // function formatTimestamp(ts: string): string {
// // // //   const date = new Date(ts);
// // // //   return date.toLocaleString('en-IN', {
// // // //     hour: '2-digit',
// // // //     minute: '2-digit',
// // // //     hour12: true,
// // // //     timeZone: 'Asia/Kolkata',
// // // //   });
// // // // }

// // // // export default ChatInterface;






// // // // src/components/ChatInterface/ChatInterface.tsx

// // // import React, { useState, useEffect, useRef } from 'react';
// // // import {
// // //   FiPlus,
// // //   FiMenu,
// // //   FiPaperclip,
// // //   FiSend,
// // //   FiTrash,
// // //   FiLoader,
// // // } from 'react-icons/fi';
// // // import { motion, AnimatePresence } from 'framer-motion';
// // // import { v4 as uuidv4 } from 'uuid';
// // // import { useNavigate } from 'react-router-dom';
// // // import { useAuth } from '../Auth/AuthContext';

// // // interface Message {
// // //   id: string;
// // //   sender: 'user' | 'assistant';
// // //   text: string;
// // //   timestamp: string;
// // //   button?: boolean; // If true, show "Generate Notebook" or "Open Notebook"
// // //   isSchema?: boolean;
// // //   schema?: Array<{ column_name: string; data_type: string }>;
// // //   animated?: boolean;
// // // }

// // // interface Chat {
// // //   id: string;        // This will be the same as chat_id from server
// // //   title: string;
// // //   timestamp: string;
// // //   messages: Message[];
// // //   isHistory?: boolean;
// // // }

// // // interface NotebookMetadata {
// // //   file_url: string;
// // //   target_column: string;
// // //   entity_column: string;
// // //   features: string[];
// // //   user_id: string;
// // //   chat_id: string;
// // // }

// // // const ChatInterface: React.FC = () => {
// // //   const defaultMessage = `Hi! 👋 I'm your AI assistant.\nI'll assist you in formulating a predictive question. I'll then create a SQL notebook to build a training set.\nSo, what would you like to predict?`;

// // //   const { user, loading } = useAuth();
// // //   const userId = user?.id;  // Ensure you have a valid user ID from your auth context

// // //   const [chats, setChats] = useState<Chat[]>([]);
// // //   const [currentChat, setCurrentChat] = useState<Chat | null>(null);
// // //   const [showSidebar, setShowSidebar] = useState(true);
// // //   const [inputMessage, setInputMessage] = useState('');
// // //   const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);

// // //   const [isLoading, setIsLoading] = useState(false);
// // //   const [isUploading, setIsUploading] = useState(false);

// // //   const [isGeneratingNotebook, setIsGeneratingNotebook] = useState(false);
// // //   const [notebookGenerated, setNotebookGenerated] = useState(false);
// // //   const [generatedNotebookData, setGeneratedNotebookData] = useState<any>(null); // Store complete notebook data
// // //   const [generatedFileUrl, setGeneratedFileUrl] = useState<string>('');
// // //   const [generatedTargetColumn, setGeneratedTargetColumn] = useState<string>('');
// // //   const [generatedEntityColumn, setGeneratedEntityColumn] = useState<string>('');
// // //   const [generatedFeatures, setGeneratedFeatures] = useState<string[]>([]);
// // //   const [generatedUserId, setGeneratedUserId] = useState<string>('');
// // //   const [generatedChatId, setGeneratedChatId] = useState<string>('');

// // //   const navigate = useNavigate();
// // //   const messagesEndRef = useRef<HTMLDivElement | null>(null);

// // //   // Scroll to bottom when messages update
// // //   const scrollToBottom = () => {
// // //     messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
// // //   };

// // //   useEffect(() => {
// // //     scrollToBottom();
// // //   }, [currentChat?.messages, isLoading, isUploading]);

// // //   useEffect(() => {
// // //     const fetchAndInitializeChats = async () => {
// // //       try {
// // //         // Because the user ID might be missing initially
// // //         if (!userId) {
// // //           initializeDefaultChat();
// // //           return;
// // //         }

// // //         const fetchedChats = await fetchChatHistory(userId.toString());
// // //         if (fetchedChats.length > 0) {
// // //           setChats(fetchedChats);
// // //           setCurrentChat(fetchedChats[0]);
// // //         } else {
// // //           initializeDefaultChat();
// // //         }
// // //       } catch (error) {
// // //         console.error("Error fetching chat history:", error);
// // //         initializeDefaultChat();
// // //       }
// // //     };

// // //     const initializeDefaultChat = () => {
// // //       const initialChat: Chat = {
// // //         id: '', // We'll get an actual chat_id from the server once user sends first message
// // //         title: 'New Prediction',
// // //         timestamp: new Date().toLocaleString(),
// // //         messages: [
// // //           {
// // //             id: uuidv4(),
// // //             sender: "assistant",
// // //             text: defaultMessage,
// // //             timestamp: formatTimestamp(new Date().toISOString()),
// // //             animated: true,
// // //           },
// // //         ],
// // //         isHistory: false,
// // //       };
// // //       setChats([initialChat]);
// // //       setCurrentChat(initialChat);
// // //     };

// // //     fetchAndInitializeChats();
// // //   }, [defaultMessage, userId]);

// // //   // Function to fetch chat history
// // //   const fetchChatHistory = async (user_id: string): Promise<Chat[]> => {
// // //     const response = await fetch(`http://localhost:8000/api/chat_history/?user_id=${user_id}`);
// // //     if (!response.ok) {
// // //       throw new Error('Failed to fetch chat history');
// // //     }
// // //     const data = await response.json();

// // //     // Convert the API's shape to our `Chat[]` shape as needed
// // //     // We'll store messages in a single array or keep them separate
// // //     const chatsFromBackend: Chat[] = data.map((chatObj: any) => {
// // //       return {
// // //         id: chatObj.chat_id,
// // //         title: chatObj.title,
// // //         timestamp: new Date().toLocaleString(),
// // //         messages: [
// // //           ...chatObj.user_messages.map((um: any) => ({
// // //             id: uuidv4(),
// // //             sender: 'user',
// // //             text: um.text,
// // //             timestamp: um.timestamp,
// // //           })),
// // //           ...chatObj.assistant_messages.map((am: any) => ({
// // //             id: uuidv4(),
// // //             sender: 'assistant',
// // //             text: am.text,
// // //             timestamp: am.timestamp,
// // //           })),
// // //         ],
// // //         isHistory: false,
// // //       };
// // //     });

// // //     return chatsFromBackend;
// // //   };

// // //   // Function to upload files
// // //   const uploadFiles = async (files: FileList): Promise<any> => {
// // //     const formData = new FormData();
// // //     Array.from(files).forEach((file) => {
// // //       formData.append('file', file);
// // //     });
// // //     // IMPORTANT: If you already have a chat_id for the currentChat, send it
// // //     if (currentChat && currentChat.id) {
// // //       formData.append('chat_id', currentChat.id);
// // //     }
// // //     if (userId) {
// // //       formData.append('user_id', userId.toString());
// // //     }

// // //     const response = await fetch(`http://localhost:8000/api/chatgpt/`, {
// // //       method: 'POST',
// // //       body: formData,
// // //     });

// // //     if (!response.ok) {
// // //       throw new Error('Failed to upload files');
// // //     }

// // //     const data = await response.json();
// // //     return data;
// // //   };

// // //   // *** CRUCIAL FIX: pass chat_id to the server here ***
// // //   const sendMessage = async (message: string, user_id: string, chat_id?: string): Promise<any> => {
// // //     const response = await fetch(`http://localhost:8000/api/chatgpt/`, {
// // //       method: 'POST',
// // //       headers: { 'Content-Type': 'application/json' },
// // //       body: JSON.stringify({ 
// // //         message, 
// // //         user_id, 
// // //         chat_id 
// // //       }),
// // //     });

// // //     if (!response.ok) {
// // //       throw new Error('Failed to send message');
// // //     }
// // //     const data = await response.json();
// // //     return data;
// // //   };

// // //   // Handle creating a new chat
// // //   const handleNewChat = () => {
// // //     const newChat: Chat = {
// // //       id: '', // The backend will create a new chat_id on first message
// // //       title: 'New Prediction',
// // //       timestamp: new Date().toLocaleString(),
// // //       messages: [
// // //         {
// // //           id: uuidv4(),
// // //           sender: 'assistant',
// // //           text: defaultMessage,
// // //           timestamp: formatTimestamp(new Date().toISOString()),
// // //           animated: true,
// // //         },
// // //       ],
// // //       isHistory: false,
// // //     };
// // //     setChats((prev) => [newChat, ...prev]);
// // //     setCurrentChat(newChat);

// // //     setIsGeneratingNotebook(false);
// // //     setNotebookGenerated(false);
// // //     setGeneratedNotebookData(null);
// // //   };

// // //   // Handle file selection
// // //   const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
// // //     const files = e.target.files;
// // //     if (files && files.length > 0) {
// // //       setSelectedFiles(files);
// // //     }
// // //   };

// // //   // Handle file upload
// // //   const handleFileUpload = async () => {
// // //     if (!selectedFiles || selectedFiles.length === 0) {
// // //       alert('No files selected.');
// // //       return;
// // //     }

// // //     setIsUploading(true);

// // //     try {
// // //       const data = await uploadFiles(selectedFiles);
// // //       console.log('[DEBUG] File upload response:', data);

// // //       if (data.uploaded_files && data.uploaded_files.length > 0) {
// // //         const uploadedFile = data.uploaded_files[0];
// // //         const schema = uploadedFile.schema;
// // //         const suggestions = uploadedFile.suggestions;

// // //         if (schema && schema.length > 0) {
// // //           const schemaMessage: Message = {
// // //             id: uuidv4(),
// // //             sender: 'assistant',
// // //             text: 'Dataset uploaded successfully! Below is the schema:',
// // //             timestamp: formatTimestamp(new Date().toISOString()),
// // //             isSchema: true,
// // //             schema: schema,
// // //             animated: true,
// // //           };

// // //           const confirmationText = `
// // // Suggested Target Column: ${suggestions.target_column}
// // // Suggested Entity ID Column: ${suggestions.entity_id_column}
// // // Suggested Feature Columns: ${suggestions.feature_columns.join(', ')}

// // // Please confirm:
// // // - Is the Target Column correct?
// // // - Is the Entity ID Column correct?
// // // (Reply 'yes' to confirm or provide the correct column names as needed)
// // //           `.trim();

// // //           const confirmationMessage: Message = {
// // //             id: uuidv4(),
// // //             sender: 'assistant',
// // //             text: confirmationText,
// // //             timestamp: formatTimestamp(new Date().toISOString()),
// // //             animated: true,
// // //           };

// // //           setCurrentChat((prevChat) => {
// // //             if (!prevChat) return null;
// // //             const updatedMessages = [...prevChat.messages, schemaMessage, confirmationMessage];
// // //             return { ...prevChat, messages: updatedMessages };
// // //           });

// // //           setChats((prevChats) =>
// // //             prevChats.map((chat) =>
// // //               chat.id === currentChat?.id
// // //                 ? { ...chat, messages: [...chat.messages, schemaMessage, confirmationMessage] }
// // //                 : chat
// // //             )
// // //           );
// // //         } else {
// // //           console.error('Schema data missing.');
// // //         }
// // //       } else {
// // //         console.error('No uploaded_files data.');
// // //       }
// // //     } catch (error: any) {
// // //       console.error('File upload error:', error);
// // //       const errorMessage: Message = {
// // //         id: uuidv4(),
// // //         sender: 'assistant',
// // //         text: `Upload Error: ${error instanceof Error ? error.message : 'Unknown error'}`,
// // //         timestamp: formatTimestamp(new Date().toISOString()),
// // //         animated: true,
// // //       };

// // //       setCurrentChat((prevChat) => {
// // //         if (!prevChat) return null;
// // //         return { ...prevChat, messages: [...prevChat.messages, errorMessage] };
// // //       });
// // //       setChats((prevChats) =>
// // //         prevChats.map((chat) =>
// // //           chat.id === currentChat?.id ? { ...chat, messages: [...chat.messages, errorMessage] } : chat
// // //         )
// // //       );
// // //     } finally {
// // //       setSelectedFiles(null);
// // //       setIsUploading(false);
// // //     }
// // //   };

// // //   // Handle sending a message
// // //   const handleSendMessage = async () => {
// // //     if (!inputMessage.trim()) return;
// // //     if (!currentChat) return;

// // //     const userMessage: Message = {
// // //       id: uuidv4(),
// // //       sender: 'user',
// // //       text: inputMessage,
// // //       timestamp: formatTimestamp(new Date().toISOString()),
// // //       animated: false,
// // //     };

// // //     const updatedChat = {
// // //       ...currentChat,
// // //       messages: [...currentChat.messages, userMessage],
// // //       timestamp: userMessage.timestamp,
// // //     };

// // //     setChats((prevChats) =>
// // //       prevChats.map((chat) => (chat.id === currentChat.id ? updatedChat : chat))
// // //     );
// // //     setCurrentChat(updatedChat);
// // //     setInputMessage('');
// // //     setIsLoading(true);

// // //     try {
// // //       // *** PASS chat_id to the server so it won't create a new chat every time! ***
// // //       const data = await sendMessage(
// // //         userMessage.text, 
// // //         userId?.toString() || 'default_user', 
// // //         currentChat.id  // This is crucial
// // //       );

// // //       // The server might generate a new chat_id if currentChat.id was ''
// // //       const newChatId = data.chat_id || currentChat.id;

// // //       const botMessage: Message = {
// // //         id: uuidv4(),
// // //         sender: 'assistant',
// // //         text: data.response,
// // //         timestamp: formatTimestamp(new Date().toISOString()),
// // //         animated: true,
// // //       };

// // //       const updatedMessages = [...updatedChat.messages, botMessage];

// // //       // Update the local state with new chat_id if needed
// // //       setChats((prevChats) =>
// // //         prevChats.map((chat) =>
// // //           chat.id === currentChat.id
// // //             ? { ...chat, id: newChatId, messages: updatedMessages }
// // //             : chat
// // //         )
// // //       );

// // //       setCurrentChat((prevChat) =>
// // //         prevChat ? { ...prevChat, id: newChatId, messages: updatedMessages } : null
// // //       );

// // //       setIsGeneratingNotebook(false);
// // //       setNotebookGenerated(false);
// // //       setGeneratedNotebookData(null);
// // //     } catch (error) {
// // //       console.error('Error sending message:', error);
// // //       const errorMessage: Message = {
// // //         id: uuidv4(),
// // //         sender: 'assistant',
// // //         text: 'Sorry, I encountered an issue. Please try again later.',
// // //         timestamp: formatTimestamp(new Date().toISOString()),
// // //         animated: true,
// // //       };

// // //       setChats((prevChats) =>
// // //         prevChats.map((chat) =>
// // //           chat.id === currentChat.id
// // //             ? { ...chat, messages: [...chat.messages, errorMessage] }
// // //             : chat
// // //         )
// // //       );
// // //     } finally {
// // //       setIsLoading(false);
// // //     }
// // //   };

// // //   // Handle generating notebook
// // //   const handleGenerateNotebook = async () => {
// // //     if (!currentChat || !userId) {
// // //       console.error('User ID or Current Chat not available.');
// // //       return;
// // //     }

// // //     setIsGeneratingNotebook(true);

// // //     try {
// // //       // Make the API call to generate a notebook
// // //       const response = await fetch('http://localhost:8000/api/chatgpt/', {
// // //         method: 'POST',
// // //         headers: { 'Content-Type': 'application/json' },
// // //         body: JSON.stringify({
// // //           action: 'generate_notebook',
// // //           user_id: userId.toString(),
// // //           chat_id: currentChat.id, // Include the current chat ID
// // //         }),
// // //       });

// // //       if (!response.ok) {
// // //         throw new Error(`Failed to generate notebook: ${response.statusText}`);
// // //       }

// // //       const data = await response.json();
// // //       console.log('[DEBUG] Notebook generated:', data);

// // //       if (data.notebooks) {
// // //         // Update the frontend state with the generated notebook details
// // //         setGeneratedNotebookData(data.notebooks);
// // //         setNotebookGenerated(true);
// // //         setGeneratedFileUrl(data.file_url);
// // //         setGeneratedTargetColumn(data.target_column);
// // //         setGeneratedEntityColumn(data.entity_column);
// // //         setGeneratedFeatures(data.features);
// // //         setGeneratedUserId(data.user_id);
// // //         setGeneratedChatId(data.chat_id);

// // //         const notebookMessage: Message = {
// // //           id: uuidv4(),
// // //           sender: 'assistant',
// // //           text: 'Notebook has been generated successfully.',
// // //           timestamp: formatTimestamp(new Date().toISOString()),
// // //           animated: true,
// // //           button: true, // To show the "Open Notebook" button
// // //         };

// // //         setChats((prevChats) =>
// // //           prevChats.map((chat) =>
// // //             chat.id === currentChat.id
// // //               ? { ...chat, messages: [...chat.messages, notebookMessage] }
// // //               : chat
// // //           )
// // //         );

// // //         setCurrentChat((prevChat) =>
// // //           prevChat ? { ...prevChat, messages: [...prevChat.messages, notebookMessage] } : null
// // //         );
// // //       } else {
// // //         alert('Error generating notebook. Please try again.');
// // //       }
// // //     } catch (error) {
// // //       console.error('Error generating notebook:', error);
// // //       alert('Error generating notebook. Please try again.');
// // //     } finally {
// // //       setIsGeneratingNotebook(false);
// // //     }
// // //   };

// // //   // Handle opening notebook
// // //   const handleOpenNotebook = () => {
// // //     if (generatedNotebookData) {
// // //       navigate('/notebook', { 
// // //         state: { 
// // //           notebooks: generatedNotebookData,
// // //           file_url: generatedFileUrl,
// // //           entity_column: generatedEntityColumn,
// // //           target_column: generatedTargetColumn,
// // //           features: generatedFeatures,
// // //           user_id: generatedUserId,
// // //           chat_id: generatedChatId,
// // //           isTrained: false, // Initially not trained
// // //         } 
// // //       });
// // //     } else {
// // //       alert('No notebook data available.');
// // //     }
// // //   };

// // //   // Function to reset chat
// // //   const resetChat = async (user_id: string): Promise<void> => {
// // //     const response = await fetch(`http://localhost:8000/api/chatgpt/`, {
// // //       method: 'POST',
// // //       headers: { 'Content-Type': 'application/json' },
// // //       body: JSON.stringify({ action: 'reset', user_id }),
// // //     });

// // //     if (!response.ok) {
// // //       throw new Error('Failed to reset chat');
// // //     }
// // //   };

// // //   // Handle resetting chat
// // //   const handleReset = async () => {
// // //     try {
// // //       await resetChat(userId?.toString() || 'default_user');
// // //       const initialChat: Chat = {
// // //         id: '',
// // //         title: 'New Prediction',
// // //         timestamp: new Date().toLocaleString(),
// // //         messages: [
// // //           {
// // //             id: uuidv4(),
// // //             sender: 'assistant',
// // //             text: defaultMessage,
// // //             timestamp: formatTimestamp(new Date().toISOString()),
// // //             animated: true,
// // //           },
// // //         ],
// // //         isHistory: false,
// // //       };
// // //       setChats([initialChat]);
// // //       setCurrentChat(initialChat);
// // //       setIsGeneratingNotebook(false);
// // //       setNotebookGenerated(false);
// // //       setGeneratedNotebookData(null);
// // //     } catch (error) {
// // //       console.error('Error resetting chat:', error);
// // //       alert('Error resetting chat. Please try again.');
// // //     }
// // //   };

// // //   const isHistoryChat = currentChat?.isHistory;

// // //   return (
// // //     <div className="h-screen flex bg-gray-50">
// // //       <AnimatePresence>
// // //         {showSidebar && (
// // //           <motion.div
// // //             initial={{ x: -240 }}
// // //             animate={{ x: 0 }}
// // //             exit={{ x: -240 }}
// // //             transition={{ duration: 0.2 }}
// // //             className="w-60 border-r border-gray-200 bg-white"
// // //           >
// // //             {/* Chat History Sidebar */}
// // //             <div className="p-3 border-b border-gray-100 flex justify-between items-center">
// // //               <span className="text-xs font-medium text-gray-600">Chat History</span>
// // //               <button
// // //                 onClick={handleNewChat}
// // //                 className="text-xs flex items-center gap-1 text-teal-700 hover:text-teal-800"
// // //               >
// // //                 <FiPlus size={12} /> New
// // //               </button>
// // //             </div>
// // //             <div className="overflow-y-auto h-[calc(100vh-49px)]">
// // //               {chats.map((chat) => (
// // //                 <div
// // //                   key={chat.id}
// // //                   onClick={() => setCurrentChat(chat)}
// // //                   className={`p-2 mx-2 my-1 rounded text-xs cursor-pointer flex items-center justify-between group ${
// // //                     currentChat?.id === chat.id ? 'bg-teal-50 text-teal-700' : 'hover:bg-gray-50'
// // //                   }`}
// // //                 >
// // //                   <div className="truncate flex-1">
// // //                     <div className="font-medium truncate">{chat.title}</div>
// // //                     <div className="text-[10px] text-gray-400">{chat.timestamp}</div>
// // //                   </div>
// // //                   <button
// // //                     onClick={(e) => {
// // //                       e.stopPropagation();
// // //                       setChats((prev) => prev.filter((c) => c.id !== chat.id));
// // //                       if (currentChat?.id === chat.id) {
// // //                         setCurrentChat(null);
// // //                       }
// // //                     }}
// // //                     className="opacity-0 group-hover:opacity-100 p-1 hover:text-red-500"
// // //                     aria-label="Delete Chat"
// // //                   >
// // //                     <FiTrash size={12} />
// // //                   </button>
// // //                 </div>
// // //               ))}
// // //             </div>
// // //           </motion.div>
// // //         )}
// // //       </AnimatePresence>

// // //       <div className="flex-1 flex flex-col">
// // //         {/* Header */}
// // //         <div className="h-12 border-b border-gray-200 flex items-center px-4 bg-white">
// // //           <button
// // //             onClick={() => setShowSidebar(!showSidebar)}
// // //             className="text-gray-500 hover:text-gray-700"
// // //             aria-label="Toggle sidebar"
// // //           >
// // //             <FiMenu size={16} />
// // //           </button>
// // //           <span className="ml-4 text-sm font-medium">{currentChat?.title || 'Select a chat'}</span>
// // //           <div className="ml-auto">
// // //             <button
// // //               onClick={handleReset}
// // //               className="text-xs text-red-500 hover:text-red-600 flex items-center gap-1"
// // //               aria-label="Reset Chat"
// // //             >
// // //               <FiTrash size={12} /> Reset
// // //             </button>
// // //           </div>
// // //         </div>

// // //         {/* Chat Messages */}
// // //         <div className="flex-1 overflow-y-auto px-4 py-6">
// // //           {currentChat?.messages.map((message) => {
// // //             const schemaData = parseSchema(message);
// // //             return (
// // //               <div
// // //                 key={message.id}
// // //                 className={`mb-4 flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
// // //               >
// // //                 <div
// // //                   className={`max-w-[80%] rounded-lg px-4 py-2 text-xs ${
// // //                     message.sender === 'user' ? 'bg-teal-700 text-white' : 'bg-white border border-gray-200'
// // //                   }`}
// // //                 >
// // //                   {message.isSchema && schemaData ? (
// // //                     <>
// // //                       <AnimatedMessage text={message.text} sender={message.sender} animated={message.animated} />
// // //                       <SchemaTable schema={schemaData} />
// // //                     </>
// // //                   ) : (
// // //                     <AnimatedMessage text={message.text} sender={message.sender} animated={message.animated} />
// // //                   )}

// // //                   <div
// // //                     className={`text-[10px] mt-1 ${
// // //                       message.sender === 'user' ? 'text-teal-300' : 'text-gray-400'
// // //                     }`}
// // //                   >
// // //                     {message.timestamp}
// // //                   </div>

// // //                   {message.button && (
// // //                     <div className="mt-2 flex gap-2">
// // //                       {isGeneratingNotebook ? (
// // //                         <button
// // //                           disabled
// // //                           className="flex items-center gap-2 px-4 py-2 bg-teal-500 text-white text-xs rounded"
// // //                         >
// // //                           <FiLoader className="animate-spin" /> Generating...
// // //                         </button>
// // //                       ) : notebookGenerated ? (
// // //                         <button
// // //                           onClick={handleOpenNotebook}
// // //                           className="px-4 py-2 bg-teal-500 text-white text-xs rounded hover:bg-teal-600"
// // //                         >
// // //                           Open Notebook
// // //                         </button>
// // //                       ) : (
// // //                         <button
// // //                           onClick={handleGenerateNotebook}
// // //                           className="px-4 py-2 bg-teal-500 text-white text-xs rounded hover:bg-teal-600"
// // //                         >
// // //                           Generate Notebook
// // //                         </button>
// // //                       )}
// // //                     </div>
// // //                   )}
// // //                 </div>
// // //               </div>
// // //             );
// // //           })}

// // //           {isLoading && (
// // //             <div className="mb-4 flex justify-start">
// // //               <div className="max-w-[80%] rounded-lg px-4 py-2 text-xs bg-white border border-gray-200 flex items-center">
// // //                 <FiLoader className="animate-spin mr-2" /> Typing...
// // //               </div>
// // //             </div>
// // //           )}

// // //           <div ref={messagesEndRef} />
// // //         </div>

// // //         {/* Uploading Indicator */}
// // //         {isUploading && (
// // //           <div className="px-4 py-2 border-t border-gray-200 bg-gray-50 text-teal-700 text-xs flex items-center gap-2">
// // //             <FiLoader className="animate-spin" /> Uploading files...
// // //           </div>
// // //         )}
// // //         {/* Selected Files Preview */}
// // //         {selectedFiles && selectedFiles.length > 0 && (
// // //           <div className="px-4 py-2 border-t border-gray-200 bg-gray-50">
// // //             <div className="flex flex-wrap gap-2">
// // //               {Array.from(selectedFiles).map((file) => (
// // //                 <div key={uuidv4()} className="flex flex-col gap-2 bg-white px-2 py-2 rounded border text-xs">
// // //                   <div className="truncate max-w-[150px]">
// // //                     <strong>{file.name}</strong> ({(file.size / 1024).toFixed(1)} KB)
// // //                   </div>
// // //                 </div>
// // //               ))}
// // //             </div>
// // //             <button
// // //               onClick={handleFileUpload}
// // //               className="mt-2 px-4 py-2 bg-teal-700 text-white text-xs rounded hover:bg-teal-800"
// // //             >
// // //               Upload Files
// // //             </button>
// // //           </div>
// // //         )}

// // //         {/* Message Input */}
// // //         <div className="p-4 border-t border-gray-200 bg-white">
// // //           <div
// // //             className="flex items-center gap-2"
// // //             style={{ cursor: isHistoryChat ? 'not-allowed' : 'auto' }}
// // //             title={isHistoryChat ? '🚫 You cannot compose messages in history chats' : ''}
// // //           >
// // //             <label
// // //               className={`cursor-pointer text-gray-400 hover:text-gray-600 ${
// // //                 isHistoryChat ? 'opacity-50 cursor-not-allowed' : ''
// // //               }`}
// // //               title={isHistoryChat ? '🚫 You cannot attach files in history chats' : ''}
// // //             >
// // //               <input
// // //                 type="file"
// // //                 multiple
// // //                 className="hidden"
// // //                 onChange={handleFileSelect}
// // //                 disabled={isHistoryChat ? true : false}
// // //               />
// // //               <FiPaperclip size={16} />
// // //             </label>
// // //             <input
// // //               type="text"
// // //               value={inputMessage}
// // //               onChange={(e) => setInputMessage(e.target.value)}
// // //               onKeyPress={(e) => {
// // //                 if (e.key === 'Enter') handleSendMessage();
// // //               }}
// // //               placeholder="Type your message..."
// // //               className="flex-1 text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:border-teal-400"
// // //               disabled={isHistoryChat ? true : false}
// // //               style={{ cursor: isHistoryChat ? 'not-allowed' : 'text' }}
// // //               title={isHistoryChat ? '🚫 You cannot compose messages in history chats' : ''}
// // //             />
// // //             <button
// // //               onClick={handleSendMessage}
// // //               className="text-teal-700 hover:text-teal-800"
// // //               disabled={isHistoryChat ? true : false}
// // //               style={{ cursor: isHistoryChat ? 'not-allowed' : 'pointer' }}
// // //               title={isHistoryChat ? '🚫 You cannot compose messages in history chats' : ''}
// // //               aria-label="Send Message"
// // //             >
// // //               <FiSend size={16} />
// // //             </button>
// // //           </div>
// // //         </div>
// // //       </div>
// // //     </div>
// // //   );
// // // };

// // // // Inline AnimatedMessage Component
// // // const AnimatedMessage: React.FC<{
// // //   text: string;
// // //   sender: 'user' | 'assistant';
// // //   animated?: boolean;
// // // }> = ({ text, sender, animated }) => {
// // //   const [displayedText, setDisplayedText] = useState('');
// // //   const indexRef = useRef(0);

// // //   useEffect(() => {
// // //     if (animated && sender === 'assistant') {
// // //       const interval = setInterval(() => {
// // //         setDisplayedText((prev) => prev + text.charAt(indexRef.current));
// // //         indexRef.current += 1;
// // //         if (indexRef.current >= text.length) {
// // //           clearInterval(interval);
// // //         }
// // //       }, 10);
// // //       return () => clearInterval(interval);
// // //     } else {
// // //       setDisplayedText(text);
// // //     }
// // //   }, [text, sender, animated]);

// // //   return <pre className="whitespace-pre-wrap font-sans">{displayedText}</pre>;
// // // };

// // // // Inline SchemaTable Component
// // // const SchemaTable: React.FC<{
// // //   schema: Array<{ column_name: string; data_type: string }>;
// // // }> = ({ schema }) => {
// // //   return (
// // //     <div className="overflow-x-auto mt-2">
// // //       <table className="min-w-full border-collapse">
// // //         <thead>
// // //           <tr>
// // //             <th className="px-4 py-2 border-b bg-gray-100 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
// // //               Field
// // //             </th>
// // //             <th className="px-4 py-2 border-b bg-gray-100 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
// // //               Data Type
// // //             </th>
// // //           </tr>
// // //         </thead>
// // //         <tbody>
// // //           {schema.map((field, index) => (
// // //             <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
// // //               <td className="px-4 py-2 border-b text-xs text-gray-600">{field.column_name}</td>
// // //               <td className="px-4 py-2 border-b text-xs text-gray-600">{field.data_type}</td>
// // //             </tr>
// // //           ))}
// // //         </tbody>
// // //       </table>
// // //     </div>
// // //   );
// // // };

// // // // Helper function to parse schema
// // // const parseSchema = (message: Message): Array<{ column_name: string; data_type: string }> | null => {
// // //   if (!message.isSchema || !message.schema) return null;
// // //   return message.schema;
// // // };

// // // // Helper function to format timestamp
// // // function formatTimestamp(ts: string): string {
// // //   const date = new Date(ts);
// // //   return date.toLocaleString('en-IN', {
// // //     hour: '2-digit',
// // //     minute: '2-digit',
// // //     hour12: true,
// // //     timeZone: 'Asia/Kolkata',
// // //   });
// // // }

// // // export default ChatInterface;




// // // src/components/ChatInterface/ChatInterface.tsx

// // import React, { useState, useEffect, useRef } from 'react';
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
// // import { useAuth } from '../Auth/AuthContext';

// // interface Message {
// //   id: string;
// //   sender: 'user' | 'assistant';
// //   text: string;
// //   timestamp: string;
// //   button?: boolean; // If true, show "Generate Notebook" or "Open Notebook"
// //   isSchema?: boolean;
// //   schema?: Array<{ column_name: string; data_type: string }>;
// //   animated?: boolean;
// // }

// // interface Chat {
// //   id: string;        // This will be the same as chat_id from server
// //   title: string;
// //   timestamp: string;
// //   messages: Message[];
// //   isHistory?: boolean;
// // }

// // interface NotebookMetadata {
// //   file_url: string;
// //   target_column: string;
// //   entity_column: string;
// //   features: string[];
// //   user_id: string;
// //   chat_id: string;
// // }

// // const ChatInterface: React.FC = () => {
// //   const defaultMessage = `Hi! 👋 I'm your AI assistant.\nI'll assist you in formulating a predictive question. I'll then create a SQL notebook to build a training set.\nSo, what would you like to predict?`;

// //   const { user, loading } = useAuth();
// //   const userId = user?.id;  // Ensure you have a valid user ID from your auth context

// //   const [chats, setChats] = useState<Chat[]>([]);
// //   const [currentChat, setCurrentChat] = useState<Chat | null>(null);
// //   const [showSidebar, setShowSidebar] = useState(true);
// //   const [inputMessage, setInputMessage] = useState('');
// //   const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);

// //   const [isLoading, setIsLoading] = useState(false);
// //   const [isUploading, setIsUploading] = useState(false);

// //   const [isGeneratingNotebook, setIsGeneratingNotebook] = useState(false);
// //   const [notebookGenerated, setNotebookGenerated] = useState(false);
// //   const [generatedNotebookData, setGeneratedNotebookData] = useState<any>(null); 
// //   const [generatedFileUrl, setGeneratedFileUrl] = useState<string>('');
// //   const [generatedTargetColumn, setGeneratedTargetColumn] = useState<string>('');
// //   const [generatedEntityColumn, setGeneratedEntityColumn] = useState<string>('');
// //   const [generatedFeatures, setGeneratedFeatures] = useState<string[]>([]);
// //   const [generatedUserId, setGeneratedUserId] = useState<string>('');
// //   const [generatedChatId, setGeneratedChatId] = useState<string>('');

// //   const navigate = useNavigate();
// //   const messagesEndRef = useRef<HTMLDivElement | null>(null);

// //   // Scroll to bottom when messages update
// //   const scrollToBottom = () => {
// //     messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
// //   };

// //   useEffect(() => {
// //     scrollToBottom();
// //   }, [currentChat?.messages, isLoading, isUploading]);

// //   // ***** CHANGED: Now we merge user+assistant messages in chronological order *****
// //   const fetchChatHistory = async (user_id: string): Promise<Chat[]> => {
// //     const response = await fetch(`http://localhost:8000/api/chat_history/?user_id=${user_id}`);
// //     if (!response.ok) {
// //       throw new Error('Failed to fetch chat history');
// //     }
// //     const data = await response.json();

// //     // Convert the API's shape to our `Chat[]` shape in correct chronological order
// //     const chatsFromBackend: Chat[] = data.map((chatObj: any) => {
// //       // Merge user_messages and assistant_messages
// //       const mergedMessages = [
// //         ...chatObj.user_messages.map((um: any) => ({
// //           sender: 'user',
// //           text: um.text,
// //           timestamp: um.timestamp,
// //         })),
// //         ...chatObj.assistant_messages.map((am: any) => ({
// //           sender: 'assistant',
// //           text: am.text,
// //           timestamp: am.timestamp,
// //         })),
// //       ];

// //       // Sort by timestamp so user & assistant messages alternate correctly
// //       mergedMessages.sort((a: any, b: any) => {
// //         return new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime();
// //       });

// //       // Convert them into our Message[] shape
// //       const messages: Message[] = mergedMessages.map((msg: any) => ({
// //         id: uuidv4(),
// //         sender: msg.sender as 'user' | 'assistant',
// //         text: msg.text,
// //         timestamp: msg.timestamp,
// //         animated: false,
// //       }));

// //       return {
// //         id: chatObj.chat_id,
// //         title: chatObj.title,
// //         timestamp: new Date().toLocaleString(),
// //         messages,
// //         isHistory: false,
// //       };
// //     });

// //     return chatsFromBackend;
// //   };

// //   const fetchAndInitializeChats = async () => {
// //     try {
// //       if (!userId) {
// //         initializeDefaultChat();
// //         return;
// //       }
// //       const fetchedChats = await fetchChatHistory(userId.toString());
// //       if (fetchedChats.length > 0) {
// //         setChats(fetchedChats);
// //         setCurrentChat(fetchedChats[0]);
// //       } else {
// //         initializeDefaultChat();
// //       }
// //     } catch (error) {
// //       console.error("Error fetching chat history:", error);
// //       initializeDefaultChat();
// //     }
// //   };

// //   const initializeDefaultChat = () => {
// //     const initialChat: Chat = {
// //       id: '', // We'll get an actual chat_id from the server once user sends first message
// //       title: 'New Prediction',
// //       timestamp: new Date().toLocaleString(),
// //       messages: [
// //         {
// //           id: uuidv4(),
// //           sender: "assistant",
// //           text: defaultMessage,
// //           timestamp: formatTimestamp(new Date().toISOString()),
// //           animated: true,
// //         },
// //       ],
// //       isHistory: false,
// //     };
// //     setChats([initialChat]);
// //     setCurrentChat(initialChat);
// //   };

// //   useEffect(() => {
// //     fetchAndInitializeChats();
// //     // eslint-disable-next-line react-hooks/exhaustive-deps
// //   }, [userId]);

// //   // Function to upload files
// //   const uploadFiles = async (files: FileList): Promise<any> => {
// //     const formData = new FormData();
// //     Array.from(files).forEach((file) => {
// //       formData.append('file', file);
// //     });
// //     if (currentChat && currentChat.id) {
// //       formData.append('chat_id', currentChat.id);
// //     }
// //     if (userId) {
// //       formData.append('user_id', userId.toString());
// //     }

// //     const response = await fetch(`http://localhost:8000/api/chatgpt/`, {
// //       method: 'POST',
// //       body: formData,
// //     });

// //     if (!response.ok) {
// //       throw new Error('Failed to upload files');
// //     }

// //     const data = await response.json();
// //     return data;
// //   };

// //   // *** CRUCIAL: pass chat_id to the server here ***
// //   const sendMessage = async (message: string, user_id: string, chat_id?: string): Promise<any> => {
// //     const response = await fetch(`http://localhost:8000/api/chatgpt/`, {
// //       method: 'POST',
// //       headers: { 'Content-Type': 'application/json' },
// //       body: JSON.stringify({ 
// //         message, 
// //         user_id, 
// //         chat_id 
// //       }),
// //     });

// //     if (!response.ok) {
// //       throw new Error('Failed to send message');
// //     }
// //     const data = await response.json();
// //     return data;
// //   };

// //   // Handle creating a new chat
// //   const handleNewChat = () => {
// //     const newChat: Chat = {
// //       id: '', 
// //       title: 'New Prediction',
// //       timestamp: new Date().toLocaleString(),
// //       messages: [
// //         {
// //           id: uuidv4(),
// //           sender: 'assistant',
// //           text: defaultMessage,
// //           timestamp: formatTimestamp(new Date().toISOString()),
// //           animated: true,
// //         },
// //       ],
// //       isHistory: false,
// //     };
// //     setChats((prev) => [newChat, ...prev]);
// //     setCurrentChat(newChat);

// //     setIsGeneratingNotebook(false);
// //     setNotebookGenerated(false);
// //     setGeneratedNotebookData(null);
// //   };

// //   // Handle file selection
// //   const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
// //     const files = e.target.files;
// //     if (files && files.length > 0) {
// //       setSelectedFiles(files);
// //     }
// //   };

// //   // Handle file upload
// //   const handleFileUpload = async () => {
// //     if (!selectedFiles || selectedFiles.length === 0) {
// //       alert('No files selected.');
// //       return;
// //     }

// //     setIsUploading(true);

// //     try {
// //       const data = await uploadFiles(selectedFiles);
// //       console.log('[DEBUG] File upload response:', data);

// //       if (data.uploaded_files && data.uploaded_files.length > 0) {
// //         const uploadedFile = data.uploaded_files[0];
// //         const schema = uploadedFile.schema;
// //         const suggestions = uploadedFile.suggestions;

// //         if (schema && schema.length > 0) {
// //           const schemaMessage: Message = {
// //             id: uuidv4(),
// //             sender: 'assistant',
// //             text: 'Dataset uploaded successfully! Below is the schema:',
// //             timestamp: formatTimestamp(new Date().toISOString()),
// //             isSchema: true,
// //             schema: schema,
// //             animated: true,
// //           };

// //           const confirmationText = `
// // Suggested Target Column: ${suggestions.target_column}
// // Suggested Entity ID Column: ${suggestions.entity_id_column}
// // Suggested Feature Columns: ${suggestions.feature_columns.join(', ')}

// // Please confirm:
// // - Is the Target Column correct?
// // - Is the Entity ID Column correct?
// // (Reply 'yes' to confirm or provide the correct column names as needed)
// //           `.trim();

// //           const confirmationMessage: Message = {
// //             id: uuidv4(),
// //             sender: 'assistant',
// //             text: confirmationText,
// //             timestamp: formatTimestamp(new Date().toISOString()),
// //             animated: true,
// //           };

// //           setCurrentChat((prevChat) => {
// //             if (!prevChat) return null;
// //             const updatedMessages = [...prevChat.messages, schemaMessage, confirmationMessage];
// //             return { ...prevChat, messages: updatedMessages };
// //           });

// //           setChats((prevChats) =>
// //             prevChats.map((chat) =>
// //               chat.id === currentChat?.id
// //                 ? { ...chat, messages: [...chat.messages, schemaMessage, confirmationMessage] }
// //                 : chat
// //             )
// //           );
// //         } else {
// //           console.error('Schema data missing.');
// //         }
// //       } else {
// //         console.error('No uploaded_files data.');
// //       }
// //     } catch (error: any) {
// //       console.error('File upload error:', error);
// //       const errorMessage: Message = {
// //         id: uuidv4(),
// //         sender: 'assistant',
// //         text: `Upload Error: ${error instanceof Error ? error.message : 'Unknown error'}`,
// //         timestamp: formatTimestamp(new Date().toISOString()),
// //         animated: true,
// //       };

// //       setCurrentChat((prevChat) => {
// //         if (!prevChat) return null;
// //         return { ...prevChat, messages: [...prevChat.messages, errorMessage] };
// //       });
// //       setChats((prevChats) =>
// //         prevChats.map((chat) =>
// //           chat.id === currentChat?.id ? { ...chat, messages: [...chat.messages, errorMessage] } : chat
// //         )
// //       );
// //     } finally {
// //       setSelectedFiles(null);
// //       setIsUploading(false);
// //     }
// //   };

// //   // Handle sending a message
// //   const handleSendMessage = async () => {
// //     if (!inputMessage.trim()) return;
// //     if (!currentChat) return;

// //     const userMessage: Message = {
// //       id: uuidv4(),
// //       sender: 'user',
// //       text: inputMessage,
// //       timestamp: formatTimestamp(new Date().toISOString()),
// //       animated: false,
// //     };

// //     const updatedChat = {
// //       ...currentChat,
// //       messages: [...currentChat.messages, userMessage],
// //       timestamp: userMessage.timestamp,
// //     };

// //     setChats((prevChats) =>
// //       prevChats.map((chat) => (chat.id === currentChat.id ? updatedChat : chat))
// //     );
// //     setCurrentChat(updatedChat);
// //     setInputMessage('');
// //     setIsLoading(true);

// //     try {
// //       // Pass chat_id so the server doesn't create a new chat each time
// //       const data = await sendMessage(
// //         userMessage.text, 
// //         userId?.toString() || 'default_user', 
// //         currentChat.id
// //       );

// //       const newChatId = data.chat_id || currentChat.id;

// //       // *** CHANGED: if the response contains the phrase, show the "Generate Notebook" button
// //       let buttonFlag = false;
// //       if (data.response.includes("You can now proceed to generate the notebook.")) {
// //         buttonFlag = true;
// //       }

// //       const botMessage: Message = {
// //         id: uuidv4(),
// //         sender: 'assistant',
// //         text: data.response,
// //         timestamp: formatTimestamp(new Date().toISOString()),
// //         animated: true,
// //         button: buttonFlag, // toggles the 'Generate Notebook' button
// //       };

// //       const updatedMessages = [...updatedChat.messages, botMessage];

// //       // Update local state with the new chat_id
// //       setChats((prevChats) =>
// //         prevChats.map((chat) =>
// //           chat.id === currentChat.id
// //             ? { ...chat, id: newChatId, messages: updatedMessages }
// //             : chat
// //         )
// //       );

// //       setCurrentChat((prevChat) =>
// //         prevChat ? { ...prevChat, id: newChatId, messages: updatedMessages } : null
// //       );

// //       setIsGeneratingNotebook(false);
// //       setNotebookGenerated(false);
// //       setGeneratedNotebookData(null);
// //     } catch (error) {
// //       console.error('Error sending message:', error);
// //       const errorMessage: Message = {
// //         id: uuidv4(),
// //         sender: 'assistant',
// //         text: 'Sorry, I encountered an issue. Please try again later.',
// //         timestamp: formatTimestamp(new Date().toISOString()),
// //         animated: true,
// //       };

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

// //   // Handle generating notebook
// //   const handleGenerateNotebook = async () => {
// //     if (!currentChat || !userId) {
// //       console.error('User ID or Current Chat not available.');
// //       return;
// //     }

// //     setIsGeneratingNotebook(true);

// //     try {
// //       const response = await fetch('http://localhost:8000/api/chatgpt/', {
// //         method: 'POST',
// //         headers: { 'Content-Type': 'application/json' },
// //         body: JSON.stringify({
// //           action: 'generate_notebook',
// //           user_id: userId.toString(),
// //           chat_id: currentChat.id, 
// //         }),
// //       });

// //       if (!response.ok) {
// //         throw new Error(`Failed to generate notebook: ${response.statusText}`);
// //       }

// //       const data = await response.json();
// //       console.log('[DEBUG] Notebook generated:', data);

// //       if (data.notebooks) {
// //         // Update frontend state
// //         setGeneratedNotebookData(data.notebooks);
// //         setNotebookGenerated(true);
// //         setGeneratedFileUrl(data.file_url);
// //         setGeneratedTargetColumn(data.target_column);
// //         setGeneratedEntityColumn(data.entity_column);
// //         setGeneratedFeatures(data.features);
// //         setGeneratedUserId(data.user_id);
// //         setGeneratedChatId(data.chat_id);

// //         const notebookMessage: Message = {
// //           id: uuidv4(),
// //           sender: 'assistant',
// //           text: 'Notebook has been generated successfully.',
// //           timestamp: formatTimestamp(new Date().toISOString()),
// //           animated: true,
// //           button: true, // Show "Open Notebook" button
// //         };

// //         setChats((prevChats) =>
// //           prevChats.map((chat) =>
// //             chat.id === currentChat.id
// //               ? { ...chat, messages: [...chat.messages, notebookMessage] }
// //               : chat
// //           )
// //         );

// //         setCurrentChat((prevChat) =>
// //           prevChat ? { ...prevChat, messages: [...prevChat.messages, notebookMessage] } : null
// //         );
// //       } else {
// //         alert('Error generating notebook. Please try again.');
// //       }
// //     } catch (error) {
// //       console.error('Error generating notebook:', error);
// //       alert('Error generating notebook. Please try again.');
// //     } finally {
// //       setIsGeneratingNotebook(false);
// //     }
// //   };

// //   // Handle opening notebook
// //   const handleOpenNotebook = () => {
// //     if (generatedNotebookData) {
// //       navigate('/notebook', { 
// //         state: { 
// //           notebooks: generatedNotebookData,
// //           file_url: generatedFileUrl,
// //           entity_column: generatedEntityColumn,
// //           target_column: generatedTargetColumn,
// //           features: generatedFeatures,
// //           user_id: generatedUserId,
// //           chat_id: generatedChatId,
// //           isTrained: false, // Initially not trained
// //         } 
// //       });
// //     } else {
// //       alert('No notebook data available.');
// //     }
// //   };

// //   // Function to reset chat
// //   const resetChat = async (user_id: string): Promise<void> => {
// //     const response = await fetch(`http://localhost:8000/api/chatgpt/`, {
// //       method: 'POST',
// //       headers: { 'Content-Type': 'application/json' },
// //       body: JSON.stringify({ action: 'reset', user_id }),
// //     });

// //     if (!response.ok) {
// //       throw new Error('Failed to reset chat');
// //     }
// //   };

// //   // Handle resetting chat
// //   const handleReset = async () => {
// //     try {
// //       await resetChat(userId?.toString() || 'default_user');
// //       const initialChat: Chat = {
// //         id: '',
// //         title: 'New Prediction',
// //         timestamp: new Date().toLocaleString(),
// //         messages: [
// //           {
// //             id: uuidv4(),
// //             sender: 'assistant',
// //             text: defaultMessage,
// //             timestamp: formatTimestamp(new Date().toISOString()),
// //             animated: true,
// //           },
// //         ],
// //         isHistory: false,
// //       };
// //       setChats([initialChat]);
// //       setCurrentChat(initialChat);
// //       setIsGeneratingNotebook(false);
// //       setNotebookGenerated(false);
// //       setGeneratedNotebookData(null);
// //     } catch (error) {
// //       console.error('Error resetting chat:', error);
// //       alert('Error resetting chat. Please try again.');
// //     }
// //   };

// //   const isHistoryChat = currentChat?.isHistory;

// //   return (
// //     <div className="h-screen flex bg-gray-50">
// //       <AnimatePresence>
// //         {showSidebar && (
// //           <motion.div
// //             initial={{ x: -240 }}
// //             animate={{ x: 0 }}
// //             exit={{ x: -240 }}
// //             transition={{ duration: 0.2 }}
// //             className="w-60 border-r border-gray-200 bg-white"
// //           >
// //             {/* Chat History Sidebar */}
// //             <div className="p-3 border-b border-gray-100 flex justify-between items-center">
// //               <span className="text-xs font-medium text-gray-600">Chat History</span>
// //               <button
// //                 onClick={handleNewChat}
// //                 className="text-xs flex items-center gap-1 text-teal-700 hover:text-teal-800"
// //               >
// //                 <FiPlus size={12} /> New
// //               </button>
// //             </div>
// //             <div className="overflow-y-auto h-[calc(100vh-49px)]">
// //               {chats.map((chat) => (
// //                 <div
// //                   key={chat.id}
// //                   onClick={() => setCurrentChat(chat)}
// //                   className={`p-2 mx-2 my-1 rounded text-xs cursor-pointer flex items-center justify-between group ${
// //                     currentChat?.id === chat.id ? 'bg-teal-50 text-teal-700' : 'hover:bg-gray-50'
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
// //                     aria-label="Delete Chat"
// //                   >
// //                     <FiTrash size={12} />
// //                   </button>
// //                 </div>
// //               ))}
// //             </div>
// //           </motion.div>
// //         )}
// //       </AnimatePresence>

// //       <div className="flex-1 flex flex-col">
// //         {/* Header */}
// //         <div className="h-12 border-b border-gray-200 flex items-center px-4 bg-white">
// //           <button
// //             onClick={() => setShowSidebar(!showSidebar)}
// //             className="text-gray-500 hover:text-gray-700"
// //             aria-label="Toggle sidebar"
// //           >
// //             <FiMenu size={16} />
// //           </button>
// //           <span className="ml-4 text-sm font-medium">{currentChat?.title || 'Select a chat'}</span>
// //           <div className="ml-auto">
// //             <button
// //               onClick={handleReset}
// //               className="text-xs text-red-500 hover:text-red-600 flex items-center gap-1"
// //               aria-label="Reset Chat"
// //             >
// //               <FiTrash size={12} /> Reset
// //             </button>
// //           </div>
// //         </div>

// //         {/* Chat Messages */}
// //         <div className="flex-1 overflow-y-auto px-4 py-6">
// //           {currentChat?.messages.map((message) => {
// //             const schemaData = parseSchema(message);
// //             return (
// //               <div
// //                 key={message.id}
// //                 className={`mb-4 flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
// //               >
// //                 <div
// //                   className={`max-w-[80%] rounded-lg px-4 py-2 text-xs ${
// //                     message.sender === 'user' ? 'bg-teal-700 text-white' : 'bg-white border border-gray-200'
// //                   }`}
// //                 >
// //                   {message.isSchema && schemaData ? (
// //                     <>
// //                       <AnimatedMessage text={message.text} sender={message.sender} animated={message.animated} />
// //                       <SchemaTable schema={schemaData} />
// //                     </>
// //                   ) : (
// //                     <AnimatedMessage text={message.text} sender={message.sender} animated={message.animated} />
// //                   )}

// //                   <div
// //                     className={`text-[10px] mt-1 ${
// //                       message.sender === 'user' ? 'text-teal-300' : 'text-gray-400'
// //                     }`}
// //                   >
// //                     {message.timestamp}
// //                   </div>

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

// //           {isLoading && (
// //             <div className="mb-4 flex justify-start">
// //               <div className="max-w-[80%] rounded-lg px-4 py-2 text-xs bg-white border border-gray-200 flex items-center">
// //                 <FiLoader className="animate-spin mr-2" /> Typing...
// //               </div>
// //             </div>
// //           )}

// //           <div ref={messagesEndRef} />
// //         </div>

// //         {/* Uploading Indicator */}
// //         {isUploading && (
// //           <div className="px-4 py-2 border-t border-gray-200 bg-gray-50 text-teal-700 text-xs flex items-center gap-2">
// //             <FiLoader className="animate-spin" /> Uploading files...
// //           </div>
// //         )}

// //         {/* Selected Files Preview */}
// //         {selectedFiles && selectedFiles.length > 0 && (
// //           <div className="px-4 py-2 border-t border-gray-200 bg-gray-50">
// //             <div className="flex flex-wrap gap-2">
// //               {Array.from(selectedFiles).map((file) => (
// //                 <div key={uuidv4()} className="flex flex-col gap-2 bg-white px-2 py-2 rounded border text-xs">
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

// //         {/* Message Input */}
// //         <div className="p-4 border-t border-gray-200 bg-white">
// //           <div
// //             className="flex items-center gap-2"
// //             style={{ cursor: isHistoryChat ? 'not-allowed' : 'auto' }}
// //             title={isHistoryChat ? '🚫 You cannot compose messages in history chats' : ''}
// //           >
// //             <label
// //               className={`cursor-pointer text-gray-400 hover:text-gray-600 ${
// //                 isHistoryChat ? 'opacity-50 cursor-not-allowed' : ''
// //               }`}
// //               title={isHistoryChat ? '🚫 You cannot attach files in history chats' : ''}
// //             >
// //               <input
// //                 type="file"
// //                 multiple
// //                 className="hidden"
// //                 onChange={handleFileSelect}
// //                 disabled={isHistoryChat ? true : false}
// //               />
// //               <FiPaperclip size={16} />
// //             </label>
// //             <input
// //               type="text"
// //               value={inputMessage}
// //               onChange={(e) => setInputMessage(e.target.value)}
// //               onKeyPress={(e) => {
// //                 if (e.key === 'Enter') handleSendMessage();
// //               }}
// //               placeholder="Type your message..."
// //               className="flex-1 text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:border-teal-400"
// //               disabled={isHistoryChat ? true : false}
// //               style={{ cursor: isHistoryChat ? 'not-allowed' : 'text' }}
// //               title={isHistoryChat ? '🚫 You cannot compose messages in history chats' : ''}
// //             />
// //             <button
// //               onClick={handleSendMessage}
// //               className="text-teal-700 hover:text-teal-800"
// //               disabled={isHistoryChat ? true : false}
// //               style={{ cursor: isHistoryChat ? 'not-allowed' : 'pointer' }}
// //               title={isHistoryChat ? '🚫 You cannot compose messages in history chats' : ''}
// //               aria-label="Send Message"
// //             >
// //               <FiSend size={16} />
// //             </button>
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // // Inline AnimatedMessage Component
// // const AnimatedMessage: React.FC<{
// //   text: string;
// //   sender: 'user' | 'assistant';
// //   animated?: boolean;
// // }> = ({ text, sender, animated }) => {
// //   const [displayedText, setDisplayedText] = useState('');
// //   const indexRef = useRef(0);

// //   useEffect(() => {
// //     if (animated && sender === 'assistant') {
// //       const interval = setInterval(() => {
// //         setDisplayedText((prev) => prev + text.charAt(indexRef.current));
// //         indexRef.current += 1;
// //         if (indexRef.current >= text.length) {
// //           clearInterval(interval);
// //         }
// //       }, 10);
// //       return () => clearInterval(interval);
// //     } else {
// //       setDisplayedText(text);
// //     }
// //   }, [text, sender, animated]);

// //   return <pre className="whitespace-pre-wrap font-sans">{displayedText}</pre>;
// // };

// // // Inline SchemaTable Component
// // const SchemaTable: React.FC<{
// //   schema: Array<{ column_name: string; data_type: string }>;
// // }> = ({ schema }) => {
// //   return (
// //     <div className="overflow-x-auto mt-2">
// //       <table className="min-w-full border-collapse">
// //         <thead>
// //           <tr>
// //             <th className="px-4 py-2 border-b bg-gray-100 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
// //               Field
// //             </th>
// //             <th className="px-4 py-2 border-b bg-gray-100 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
// //               Data Type
// //             </th>
// //           </tr>
// //         </thead>
// //         <tbody>
// //           {schema.map((field, index) => (
// //             <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
// //               <td className="px-4 py-2 border-b text-xs text-gray-600">{field.column_name}</td>
// //               <td className="px-4 py-2 border-b text-xs text-gray-600">{field.data_type}</td>
// //             </tr>
// //           ))}
// //         </tbody>
// //       </table>
// //     </div>
// //   );
// // };

// // // Helper function to parse schema
// // const parseSchema = (message: Message): Array<{ column_name: string; data_type: string }> | null => {
// //   if (!message.isSchema || !message.schema) return null;
// //   return message.schema;
// // };

// // // Helper function to format timestamp
// // function formatTimestamp(ts: string): string {
// //   const date = new Date(ts);
// //   return date.toLocaleString('en-IN', {
// //     hour: '2-digit',
// //     minute: '2-digit',
// //     hour12: true,
// //     timeZone: 'Asia/Kolkata',
// //   });
// // }

// // export default ChatInterface;




// // src/components/ChatInterface/ChatInterface.tsx

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
// import { useAuth } from '../Auth/AuthContext';

// interface Message {
//   id: string;
//   sender: 'user' | 'assistant';
//   text: string;
//   timestamp: string;
//   button?: boolean; // If true, show "Generate Notebook" or "Open Notebook"
//   isSchema?: boolean;
//   schema?: Array<{ column_name: string; data_type: string }>;
//   animated?: boolean;
// }

// interface Chat {
//   id: string;        // This will be the same as chat_id from server
//   title: string;
//   timestamp: string;
//   messages: Message[];
//   isHistory?: boolean;
// }

// interface NotebookMetadata {
//   file_url: string;
//   target_column: string;
//   entity_column: string;
//   features: string[];
//   user_id: string;
//   chat_id: string;
// }

// const ChatInterface: React.FC = () => {
//   const defaultMessage = `Hi! 👋 I'm your AI assistant.\nI'll assist you in formulating a predictive question. I'll then create a SQL notebook to build a training set.\nSo, what would you like to predict?`;

//   const { user, loading } = useAuth();
//   const userId = user?.id;  // Ensure you have a valid user ID from your auth context

//   const [chats, setChats] = useState<Chat[]>([]);
//   const [currentChat, setCurrentChat] = useState<Chat | null>(null);
//   const [showSidebar, setShowSidebar] = useState(true);
//   const [inputMessage, setInputMessage] = useState('');
//   const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);

//   const [isLoading, setIsLoading] = useState(false);
//   const [isUploading, setIsUploading] = useState(false);

//   const [isGeneratingNotebook, setIsGeneratingNotebook] = useState(false);
//   const [notebookGenerated, setNotebookGenerated] = useState(false);
//   const [generatedNotebookData, setGeneratedNotebookData] = useState<any>(null); 
//   const [generatedFileUrl, setGeneratedFileUrl] = useState<string>('');
//   const [generatedTargetColumn, setGeneratedTargetColumn] = useState<string>('');
//   const [generatedEntityColumn, setGeneratedEntityColumn] = useState<string>('');
//   const [generatedFeatures, setGeneratedFeatures] = useState<string[]>([]);
//   const [generatedUserId, setGeneratedUserId] = useState<string>('');
//   const [generatedChatId, setGeneratedChatId] = useState<string>('');

//   const navigate = useNavigate();
//   const messagesEndRef = useRef<HTMLDivElement | null>(null);

//   // Scroll to bottom when messages update
//   const scrollToBottom = () => {
//     messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
//   };

//   useEffect(() => {
//     scrollToBottom();
//   }, [currentChat?.messages, isLoading, isUploading]);

//   // ---------------------------------------------------------------------------
//   // Fetch Chat History (merging user/assistant messages in chronological order)
//   // ---------------------------------------------------------------------------
//   const fetchChatHistory = async (user_id: string): Promise<Chat[]> => {
//     const response = await fetch(`http://localhost:8000/api/chat_history/?user_id=${user_id}`);
//     if (!response.ok) {
//       throw new Error('Failed to fetch chat history');
//     }
//     const data = await response.json();

//     const chatsFromBackend: Chat[] = data.map((chatObj: any) => {
//       const mergedMessages = [
//         ...chatObj.user_messages.map((um: any) => ({
//           sender: 'user',
//           text: um.text,
//           timestamp: um.timestamp,
//         })),
//         ...chatObj.assistant_messages.map((am: any) => ({
//           sender: 'assistant',
//           text: am.text,
//           timestamp: am.timestamp,
//         })),
//       ];

//       // Sort them by timestamp
//       mergedMessages.sort((a: any, b: any) => {
//         return new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime();
//       });

//       const messages: Message[] = mergedMessages.map((msg: any) => ({
//         id: uuidv4(),
//         sender: msg.sender as 'user' | 'assistant',
//         text: msg.text,
//         timestamp: msg.timestamp,
//         animated: false,
//       }));

//       return {
//         id: chatObj.chat_id,
//         title: chatObj.title,
//         timestamp: new Date().toLocaleString(),
//         messages,
//         isHistory: false,
//       };
//     });

//     return chatsFromBackend;
//   };

//   const fetchAndInitializeChats = async () => {
//     try {
//       if (!userId) {
//         initializeDefaultChat();
//         return;
//       }
//       const fetchedChats = await fetchChatHistory(userId.toString());
//       if (fetchedChats.length > 0) {
//         setChats(fetchedChats);
//         setCurrentChat(fetchedChats[0]);
//       } else {
//         initializeDefaultChat();
//       }
//     } catch (error) {
//       console.error("Error fetching chat history:", error);
//       initializeDefaultChat();
//     }
//   };

//   const initializeDefaultChat = () => {
//     const initialChat: Chat = {
//       id: '', // We'll get an actual chat_id from the server once user sends first message
//       title: 'New Prediction',
//       timestamp: new Date().toLocaleString(),
//       messages: [
//         {
//           id: uuidv4(),
//           sender: "assistant",
//           text: defaultMessage,
//           timestamp: formatTimestamp(new Date().toISOString()),
//           animated: true,
//         },
//       ],
//       isHistory: false,
//     };
//     setChats([initialChat]);
//     setCurrentChat(initialChat);
//   };

//   useEffect(() => {
//     fetchAndInitializeChats();
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [userId]);

//   // ---------------------------------------------------------------------------
//   // Upload Files
//   // ---------------------------------------------------------------------------
//   const uploadFiles = async (files: FileList): Promise<any> => {
//     const formData = new FormData();
//     Array.from(files).forEach((file) => {
//       formData.append('file', file);
//     });
//     if (currentChat && currentChat.id) {
//       formData.append('chat_id', currentChat.id);
//     }
//     if (userId) {
//       formData.append('user_id', userId.toString());
//     }

//     const response = await fetch(`http://localhost:8000/api/chatgpt/`, {
//       method: 'POST',
//       body: formData,
//     });

//     if (!response.ok) {
//       throw new Error('Failed to upload files');
//     }
//     return response.json();
//   };

//   const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const files = e.target.files;
//     if (files && files.length > 0) {
//       setSelectedFiles(files);
//     }
//   };

//   const handleFileUpload = async () => {
//     if (!selectedFiles || selectedFiles.length === 0) {
//       alert('No files selected.');
//       return;
//     }

//     setIsUploading(true);
//     try {
//       const data = await uploadFiles(selectedFiles);
//       console.log('[DEBUG] File upload response:', data);

//       if (data.uploaded_files && data.uploaded_files.length > 0) {
//         const uploadedFile = data.uploaded_files[0];
//         const schema = uploadedFile.schema;
//         const suggestions = uploadedFile.suggestions;

//         if (schema && schema.length > 0) {
//           const schemaMessage: Message = {
//             id: uuidv4(),
//             sender: 'assistant',
//             text: 'Dataset uploaded successfully! Below is the schema:',
//             timestamp: formatTimestamp(new Date().toISOString()),
//             isSchema: true,
//             schema: schema,
//             animated: true,
//           };

//           const confirmationText = `
// Suggested Target Column: ${suggestions.target_column}
// Suggested Entity ID Column: ${suggestions.entity_id_column}
// Suggested Feature Columns: ${suggestions.feature_columns.join(', ')}

// Please confirm:
// - Is the Target Column correct?
// - Is the Entity ID Column correct?
// (Reply 'yes' to confirm or provide the correct column names as needed)
//           `.trim();

//           const confirmationMessage: Message = {
//             id: uuidv4(),
//             sender: 'assistant',
//             text: confirmationText,
//             timestamp: formatTimestamp(new Date().toISOString()),
//             animated: true,
//           };

//           setCurrentChat((prevChat) => {
//             if (!prevChat) return null;
//             const updatedMessages = [...prevChat.messages, schemaMessage, confirmationMessage];
//             return { ...prevChat, messages: updatedMessages };
//           });

//           setChats((prevChats) =>
//             prevChats.map((chat) =>
//               chat.id === currentChat?.id
//                 ? { ...chat, messages: [...chat.messages, schemaMessage, confirmationMessage] }
//                 : chat
//             )
//           );
//         } else {
//           console.error('Schema data missing.');
//         }
//       } else {
//         console.error('No uploaded_files data.');
//       }
//     } catch (error: any) {
//       console.error('File upload error:', error);
//       const errorMessage: Message = {
//         id: uuidv4(),
//         sender: 'assistant',
//         text: `Upload Error: ${error instanceof Error ? error.message : 'Unknown error'}`,
//         timestamp: formatTimestamp(new Date().toISOString()),
//         animated: true,
//       };

//       setCurrentChat((prevChat) => {
//         if (!prevChat) return null;
//         return { ...prevChat, messages: [...prevChat.messages, errorMessage] };
//       });
//       setChats((prevChats) =>
//         prevChats.map((chat) =>
//           chat.id === currentChat?.id ? { ...chat, messages: [...chat.messages, errorMessage] } : chat
//         )
//       );
//     } finally {
//       setSelectedFiles(null);
//       setIsUploading(false);
//     }
//   };

//   // ---------------------------------------------------------------------------
//   // Send Message
//   // ---------------------------------------------------------------------------
//   const sendMessage = async (message: string, user_id: string, chat_id?: string): Promise<any> => {
//     const response = await fetch(`http://localhost:8000/api/chatgpt/`, {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ message, user_id, chat_id }),
//     });

//     if (!response.ok) {
//       throw new Error('Failed to send message');
//     }
//     return response.json();
//   };

//   const handleSendMessage = async () => {
//     if (!inputMessage.trim()) return;
//     if (!currentChat) return;

//     const userMessage: Message = {
//       id: uuidv4(),
//       sender: 'user',
//       text: inputMessage,
//       timestamp: formatTimestamp(new Date().toISOString()),
//       animated: false,
//     };

//     const updatedChat = {
//       ...currentChat,
//       messages: [...currentChat.messages, userMessage],
//       timestamp: userMessage.timestamp,
//     };

//     setChats((prevChats) =>
//       prevChats.map((chat) => (chat.id === currentChat.id ? updatedChat : chat))
//     );
//     setCurrentChat(updatedChat);
//     setInputMessage('');
//     setIsLoading(true);

//     try {
//       const data = await sendMessage(
//         userMessage.text, 
//         userId?.toString() || 'default_user', 
//         currentChat.id
//       );

//       const newChatId = data.chat_id || currentChat.id;

//       // CHANGED: We read data.show_generate_notebook to determine if we show the button
//       let showGenerateButton = data.show_generate_notebook || false;

//       const botMessage: Message = {
//         id: uuidv4(),
//         sender: 'assistant',
//         text: data.response,
//         timestamp: formatTimestamp(new Date().toISOString()),
//         animated: true,
//         // If the backend says "show_generate_notebook", we show the Generate Notebook button
//         button: showGenerateButton,
//       };

//       const updatedMessages = [...updatedChat.messages, botMessage];

//       // Update local state with the new chat_id
//       setChats((prevChats) =>
//         prevChats.map((chat) =>
//           chat.id === currentChat.id
//             ? { ...chat, id: newChatId, messages: updatedMessages }
//             : chat
//         )
//       );

//       setCurrentChat((prevChat) =>
//         prevChat ? { ...prevChat, id: newChatId, messages: updatedMessages } : null
//       );

//       setIsGeneratingNotebook(false);
//       setNotebookGenerated(false);
//       setGeneratedNotebookData(null);
//     } catch (error) {
//       console.error('Error sending message:', error);
//       const errorMessage: Message = {
//         id: uuidv4(),
//         sender: 'assistant',
//         text: 'Sorry, I encountered an issue. Please try again later.',
//         timestamp: formatTimestamp(new Date().toISOString()),
//         animated: true,
//       };

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

  
//  // Handle creating a new chat
//  const handleNewChat = () => {
//   const newChat: Chat = {
//     id: '', 
//     title: 'New Prediction',
//     timestamp: new Date().toLocaleString(),
//     messages: [
//       {
//         id: uuidv4(),
//         sender: 'assistant',
//         text: defaultMessage,
//         timestamp: formatTimestamp(new Date().toISOString()),
//         animated: true,
//       },
//     ],
//     isHistory: false,
//   };
//   setChats((prev) => [newChat, ...prev]);
//   setCurrentChat(newChat);

//   setIsGeneratingNotebook(false);
//   setNotebookGenerated(false);
//   setGeneratedNotebookData(null);
// };

//   // ---------------------------------------------------------------------------
//   // Generate Notebook
//   // ---------------------------------------------------------------------------
//   const handleGenerateNotebook = async () => {
//     if (!currentChat || !userId) {
//       console.error('User ID or Current Chat not available.');
//       return;
//     }

//     setIsGeneratingNotebook(true);

//     try {
//       const response = await fetch('http://localhost:8000/api/chatgpt/', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//           action: 'generate_notebook',
//           user_id: userId.toString(),
//           chat_id: currentChat.id, 
//         }),
//       });

//       if (!response.ok) {
//         throw new Error(`Failed to generate notebook: ${response.statusText}`);
//       }

//       const data = await response.json();
//       console.log('[DEBUG] Notebook generated:', data);

//       if (data.notebooks) {
//         setGeneratedNotebookData(data.notebooks);
//         setNotebookGenerated(true);
//         setGeneratedFileUrl(data.file_url);
//         setGeneratedTargetColumn(data.target_column);
//         setGeneratedEntityColumn(data.entity_column);
//         setGeneratedFeatures(data.features);
//         setGeneratedUserId(data.user_id);
//         setGeneratedChatId(data.chat_id);

//         const notebookMessage: Message = {
//           id: uuidv4(),
//           sender: 'assistant',
//           text: 'Notebook has been generated successfully.',
//           timestamp: formatTimestamp(new Date().toISOString()),
//           animated: true,
//           button: true, // Show "Open Notebook" button
//         };

//         setChats((prevChats) =>
//           prevChats.map((chat) =>
//             chat.id === currentChat.id
//               ? { ...chat, messages: [...chat.messages, notebookMessage] }
//               : chat
//           )
//         );

//         setCurrentChat((prevChat) =>
//           prevChat ? { ...prevChat, messages: [...prevChat.messages, notebookMessage] } : null
//         );
//       } else {
//         alert('Error generating notebook. Please try again.');
//       }
//     } catch (error) {
//       console.error('Error generating notebook:', error);
//       alert('Error generating notebook. Please try again.');
//     } finally {
//       setIsGeneratingNotebook(false);
//     }
//   };

//   // ---------------------------------------------------------------------------
//   // Open Notebook
//   // ---------------------------------------------------------------------------
//   const handleOpenNotebook = () => {
//     if (generatedNotebookData) {
//       navigate('/notebook', { 
//         state: { 
//           notebooks: generatedNotebookData,
//           file_url: generatedFileUrl,
//           entity_column: generatedEntityColumn,
//           target_column: generatedTargetColumn,
//           features: generatedFeatures,
//           user_id: generatedUserId,
//           chat_id: generatedChatId,
//           isTrained: false, // Initially not trained
//         } 
//       });
//     } else {
//       alert('No notebook data available.');
//     }
//   };

//   // ---------------------------------------------------------------------------
//   // Reset Chat
//   // ---------------------------------------------------------------------------
//   const resetChat = async (user_id: string): Promise<void> => {
//     const response = await fetch(`http://localhost:8000/api/chatgpt/`, {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ action: 'reset', user_id }),
//     });

//     if (!response.ok) {
//       throw new Error('Failed to reset chat');
//     }
//   };

//   const handleReset = async () => {
//     try {
//       await resetChat(userId?.toString() || 'default_user');
//       const initialChat: Chat = {
//         id: '',
//         title: 'New Prediction',
//         timestamp: new Date().toLocaleString(),
//         messages: [
//           {
//             id: uuidv4(),
//             sender: 'assistant',
//             text: defaultMessage,
//             timestamp: formatTimestamp(new Date().toISOString()),
//             animated: true,
//           },
//         ],
//         isHistory: false,
//       };
//       setChats([initialChat]);
//       setCurrentChat(initialChat);
//       setIsGeneratingNotebook(false);
//       setNotebookGenerated(false);
//       setGeneratedNotebookData(null);
//     } catch (error) {
//       console.error('Error resetting chat:', error);
//       alert('Error resetting chat. Please try again.');
//     }
//   };

//   // ---------------------------------------------------------------------------
//   // Render
//   // ---------------------------------------------------------------------------
//   const isHistoryChat = currentChat?.isHistory;

//   return (
//     <div className="h-screen flex bg-gray-50">
//       <AnimatePresence>
//         {showSidebar && (
//           <motion.div
//             initial={{ x: -240 }}
//             animate={{ x: 0 }}
//             exit={{ x: -240 }}
//             transition={{ duration: 0.2 }}
//             className="w-60 border-r border-gray-200 bg-white"
//           >
//             {/* Chat History Sidebar */}
//             <div className="p-3 border-b border-gray-100 flex justify-between items-center">
//               <span className="text-xs font-medium text-gray-600">Chat History</span>
//               <button
//                 onClick={handleNewChat}
//                 className="text-xs flex items-center gap-1 text-teal-700 hover:text-teal-800"
//               >
//                 <FiPlus size={12} /> New
//               </button>
//             </div>
//             <div className="overflow-y-auto h-[calc(100vh-49px)]">
//               {chats.map((chat) => (
//                 <div
//                   key={chat.id}
//                   onClick={() => setCurrentChat(chat)}
//                   className={`p-2 mx-2 my-1 rounded text-xs cursor-pointer flex items-center justify-between group ${
//                     currentChat?.id === chat.id ? 'bg-teal-50 text-teal-700' : 'hover:bg-gray-50'
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
//                     aria-label="Delete Chat"
//                   >
//                     <FiTrash size={12} />
//                   </button>
//                 </div>
//               ))}
//             </div>
//           </motion.div>
//         )}
//       </AnimatePresence>

//       <div className="flex-1 flex flex-col">
//         {/* Header */}
//         <div className="h-12 border-b border-gray-200 flex items-center px-4 bg-white">
//           <button
//             onClick={() => setShowSidebar(!showSidebar)}
//             className="text-gray-500 hover:text-gray-700"
//             aria-label="Toggle sidebar"
//           >
//             <FiMenu size={16} />
//           </button>
//           <span className="ml-4 text-sm font-medium">{currentChat?.title || 'Select a chat'}</span>
//           <div className="ml-auto">
//             <button
//               onClick={handleReset}
//               className="text-xs text-red-500 hover:text-red-600 flex items-center gap-1"
//               aria-label="Reset Chat"
//             >
//               <FiTrash size={12} /> Reset
//             </button>
//           </div>
//         </div>

//         {/* Chat Messages */}
//         <div className="flex-1 overflow-y-auto px-4 py-6">
//           {currentChat?.messages.map((message) => {
//             const schemaData = parseSchema(message);
//             return (
//               <div
//                 key={message.id}
//                 className={`mb-4 flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
//               >
//                 <div
//                   className={`max-w-[80%] rounded-lg px-4 py-2 text-xs ${
//                     message.sender === 'user' ? 'bg-teal-700 text-white' : 'bg-white border border-gray-200'
//                   }`}
//                 >
//                   {message.isSchema && schemaData ? (
//                     <>
//                       <AnimatedMessage text={message.text} sender={message.sender} animated={message.animated} />
//                       <SchemaTable schema={schemaData} />
//                     </>
//                   ) : (
//                     <AnimatedMessage text={message.text} sender={message.sender} animated={message.animated} />
//                   )}

//                   <div
//                     className={`text-[10px] mt-1 ${
//                       message.sender === 'user' ? 'text-teal-300' : 'text-gray-400'
//                     }`}
//                   >
//                     {message.timestamp}
//                   </div>

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

//           {isLoading && (
//             <div className="mb-4 flex justify-start">
//               <div className="max-w-[80%] rounded-lg px-4 py-2 text-xs bg-white border border-gray-200 flex items-center">
//                 <FiLoader className="animate-spin mr-2" /> Typing...
//               </div>
//             </div>
//           )}

//           <div ref={messagesEndRef} />
//         </div>

//         {/* Uploading Indicator */}
//         {isUploading && (
//           <div className="px-4 py-2 border-t border-gray-200 bg-gray-50 text-teal-700 text-xs flex items-center gap-2">
//             <FiLoader className="animate-spin" /> Uploading files...
//           </div>
//         )}

//         {/* Selected Files Preview */}
//         {selectedFiles && selectedFiles.length > 0 && (
//           <div className="px-4 py-2 border-t border-gray-200 bg-gray-50">
//             <div className="flex flex-wrap gap-2">
//               {Array.from(selectedFiles).map((file) => (
//                 <div key={uuidv4()} className="flex flex-col gap-2 bg-white px-2 py-2 rounded border text-xs">
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

//         {/* Message Input */}
//         <div className="p-4 border-t border-gray-200 bg-white">
//           <div
//             className="flex items-center gap-2"
//             style={{ cursor: isHistoryChat ? 'not-allowed' : 'auto' }}
//             title={isHistoryChat ? '🚫 You cannot compose messages in history chats' : ''}
//           >
//             <label
//               className={`cursor-pointer text-gray-400 hover:text-gray-600 ${
//                 isHistoryChat ? 'opacity-50 cursor-not-allowed' : ''
//               }`}
//               title={isHistoryChat ? '🚫 You cannot attach files in history chats' : ''}
//             >
//               <input
//                 type="file"
//                 multiple
//                 className="hidden"
//                 onChange={handleFileSelect}
//                 disabled={isHistoryChat ? true : false}
//               />
//               <FiPaperclip size={16} />
//             </label>
//             <input
//               type="text"
//               value={inputMessage}
//               onChange={(e) => setInputMessage(e.target.value)}
//               onKeyPress={(e) => {
//                 if (e.key === 'Enter') handleSendMessage();
//               }}
//               placeholder="Type your message..."
//               className="flex-1 text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:border-teal-400"
//               disabled={isHistoryChat ? true : false}
//               style={{ cursor: isHistoryChat ? 'not-allowed' : 'text' }}
//               title={isHistoryChat ? '🚫 You cannot compose messages in history chats' : ''}
//             />
//             <button
//               onClick={handleSendMessage}
//               className="text-teal-700 hover:text-teal-800"
//               disabled={isHistoryChat ? true : false}
//               style={{ cursor: isHistoryChat ? 'not-allowed' : 'pointer' }}
//               title={isHistoryChat ? '🚫 You cannot compose messages in history chats' : ''}
//               aria-label="Send Message"
//             >
//               <FiSend size={16} />
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// // Inline AnimatedMessage Component
// const AnimatedMessage: React.FC<{
//   text: string;
//   sender: 'user' | 'assistant';
//   animated?: boolean;
// }> = ({ text, sender, animated }) => {
//   const [displayedText, setDisplayedText] = useState('');
//   const indexRef = useRef(0);

//   useEffect(() => {
//     if (animated && sender === 'assistant') {
//       const interval = setInterval(() => {
//         setDisplayedText((prev) => prev + text.charAt(indexRef.current));
//         indexRef.current += 1;
//         if (indexRef.current >= text.length) {
//           clearInterval(interval);
//         }
//       }, 10);
//       return () => clearInterval(interval);
//     } else {
//       setDisplayedText(text);
//     }
//   }, [text, sender, animated]);

//   return <pre className="whitespace-pre-wrap font-sans">{displayedText}</pre>;
// };

// const SchemaTable: React.FC<{
//   schema: Array<{ column_name: string; data_type: string }>;
// }> = ({ schema }) => {
//   return (
//     <div className="overflow-x-auto mt-2">
//       <table className="min-w-full border-collapse">
//         <thead>
//           <tr>
//             <th className="px-4 py-2 border-b bg-gray-100 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
//               Field
//             </th>
//             <th className="px-4 py-2 border-b bg-gray-100 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
//               Data Type
//             </th>
//           </tr>
//         </thead>
//         <tbody>
//           {schema.map((field, index) => (
//             <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
//               <td className="px-4 py-2 border-b text-xs text-gray-600">{field.column_name}</td>
//               <td className="px-4 py-2 border-b text-xs text-gray-600">{field.data_type}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// // Helper function to parse schema
// const parseSchema = (message: Message): Array<{ column_name: string; data_type: string }> | null => {
//   if (!message.isSchema || !message.schema) return null;
//   return message.schema;
// };

// // Helper function to format timestamp
// function formatTimestamp(ts: string): string {
//   const date = new Date(ts);
//   return date.toLocaleString('en-IN', {
//     hour: '2-digit',
//     minute: '2-digit',
//     hour12: true,
//     timeZone: 'Asia/Kolkata',
//   });
// }

// export default ChatInterface;






// src/components/ChatInterface/ChatInterface.tsx

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
import { useAuth } from '../Auth/AuthContext';

interface Message {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  button?: boolean; // If true, show "Generate Notebook" or "Open Notebook"
  isSchema?: boolean;
  schema?: Array<{ column_name: string; data_type: string }>;
  animated?: boolean;
}

interface Chat {
  id: string;        // This will be the same as chat_id from server
  title: string;
  timestamp: string;
  messages: Message[];
  isHistory?: boolean;
}

interface NotebookMetadata {
  file_url: string;
  target_column: string;
  entity_column: string;
  features: string[];
  user_id: string;
  chat_id: string;
}

const ChatInterface: React.FC = () => {
  const defaultMessage = `Hi! 👋 I'm your AI assistant.\nI'll assist you in formulating a predictive question. I'll then create a SQL notebook to build a training set.\nSo, what would you like to predict?`;

  const { user, loading } = useAuth();
  const userId = user?.id;  // Ensure you have a valid user ID from your auth context

  const [chats, setChats] = useState<Chat[]>([]);
  const [currentChat, setCurrentChat] = useState<Chat | null>(null);
  const [showSidebar, setShowSidebar] = useState(true);
  const [inputMessage, setInputMessage] = useState('');
  const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);

  const [isLoading, setIsLoading] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const [isGeneratingNotebook, setIsGeneratingNotebook] = useState(false);
  const [notebookGenerated, setNotebookGenerated] = useState(false);
  const [generatedNotebookData, setGeneratedNotebookData] = useState<any>(null);
  const [generatedFileUrl, setGeneratedFileUrl] = useState<string>('');
  const [generatedTargetColumn, setGeneratedTargetColumn] = useState<string>('');
  const [generatedEntityColumn, setGeneratedEntityColumn] = useState<string>('');
  const [generatedFeatures, setGeneratedFeatures] = useState<string[]>([]);
  const [generatedUserId, setGeneratedUserId] = useState<string>('');
  const [generatedChatId, setGeneratedChatId] = useState<string>('');

  const navigate = useNavigate();
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  // Scroll to bottom when messages update
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [currentChat?.messages, isLoading, isUploading]);

  // ---------------------------------------------------------------------------
  // Fetch Chat History (merging user/assistant messages in chronological order)
  // ---------------------------------------------------------------------------
  const fetchChatHistory = async (user_id: string): Promise<Chat[]> => {
    const response = await fetch(`http://localhost:8000/api/chat_history/?user_id=${user_id}`);
    if (!response.ok) {
      throw new Error('Failed to fetch chat history');
    }
    const data = await response.json();

    const chatsFromBackend: Chat[] = data.map((chatObj: any) => {
      const mergedMessages = [
        ...chatObj.user_messages.map((um: any) => ({
          sender: 'user',
          text: um.text,
          timestamp: um.timestamp,
        })),
        ...chatObj.assistant_messages.map((am: any) => ({
          sender: 'assistant',
          text: am.text,
          timestamp: am.timestamp,
        })),
      ];

      // Sort them by timestamp
      mergedMessages.sort((a: any, b: any) => {
        return new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime();
      });

      const messages: Message[] = mergedMessages.map((msg: any) => ({
        id: uuidv4(),
        sender: msg.sender as 'user' | 'assistant',
        text: msg.text,
        timestamp: msg.timestamp,
        animated: false,
      }));

      return {
        id: chatObj.chat_id,
        title: chatObj.title,
        timestamp: new Date().toLocaleString(),
        messages,
        isHistory: false,
      };
    });

    return chatsFromBackend;
  };

  const fetchAndInitializeChats = async () => {
    try {
      if (!userId) {
        initializeDefaultChat();
        return;
      }
      const fetchedChats = await fetchChatHistory(userId.toString());
      if (fetchedChats.length > 0) {
        setChats(fetchedChats);
        setCurrentChat(fetchedChats[0]);
      } else {
        initializeDefaultChat();
      }
    } catch (error) {
      console.error("Error fetching chat history:", error);
      initializeDefaultChat();
    }
  };

  const initializeDefaultChat = () => {
    const initialChat: Chat = {
      id: '', // We'll get an actual chat_id from the server once user sends first message
      title: 'New Prediction',
      timestamp: new Date().toLocaleString(),
      messages: [
        {
          id: uuidv4(),
          sender: "assistant",
          text: defaultMessage,
          timestamp: formatTimestamp(new Date().toISOString()),
          animated: true,
        },
      ],
      isHistory: false,
    };
    setChats([initialChat]);
    setCurrentChat(initialChat);
  };

  useEffect(() => {
    fetchAndInitializeChats();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId]);

  // ---------------------------------------------------------------------------
  // Upload Files
  // ---------------------------------------------------------------------------
  const uploadFiles = async (files: FileList): Promise<any> => {
    const formData = new FormData();
    Array.from(files).forEach((file) => {
      formData.append('file', file);
    });
    if (currentChat && currentChat.id) {
      formData.append('chat_id', currentChat.id);
    }
    if (userId) {
      formData.append('user_id', userId.toString());
    }

    const response = await fetch(`http://localhost:8000/api/chatgpt/`, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error('Failed to upload files');
    }
    return response.json();
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setSelectedFiles(files);
    }
  };

  const handleFileUpload = async () => {
    if (!selectedFiles || selectedFiles.length === 0) {
      alert('No files selected.');
      return;
    }

    setIsUploading(true);
    try {
      const data = await uploadFiles(selectedFiles);
      console.log('[DEBUG] File upload response:', data);

      if (data.uploaded_files && data.uploaded_files.length > 0) {
        const uploadedFile = data.uploaded_files[0];
        const schema = uploadedFile.schema;
        const suggestions = uploadedFile.suggestions;

        // ------------------------------------------------------------------
        // NEW: Check for has_date_column and possible date_columns from backend
        // ------------------------------------------------------------------
        const hasDateColumn = uploadedFile.has_date_column;
        const dateColumns = uploadedFile.date_columns || [];
        console.log('[DEBUG] hasDateColumn:', hasDateColumn);
        console.log('[DEBUG] dateColumns:', dateColumns);

        if (schema && schema.length > 0) {
          const schemaMessage: Message = {
            id: uuidv4(),
            sender: 'assistant',
            text: 'Dataset uploaded successfully! Below is the schema:',
            timestamp: formatTimestamp(new Date().toISOString()),
            isSchema: true,
            schema: schema,
            animated: true,
          };

          let confirmationText = `
Suggested Target Column: ${suggestions.target_column}
Suggested Entity ID Column: ${suggestions.entity_id_column}
Suggested Feature Columns: ${suggestions.feature_columns.join(', ')}

Please confirm:
- Is the Target Column correct?
- Is the Entity ID Column correct?
(Reply 'yes' to confirm or provide the correct column names as needed)
`.trim();

          // -------------------------------------------------------------
          // If we have a date column, add a hint that time-based is possible
          // -------------------------------------------------------------
          if (hasDateColumn) {
            if (dateColumns.length === 1) {
              confirmationText += `
              
We detected 1 date column: ${dateColumns[0]}
If you'd like a time-based approach, you can confirm with 'yes' or specify a different date column (if any).
You can also explicitly say "Time Column: ${dateColumns[0]}" to be certain.
              `.trim();
            } else if (dateColumns.length > 1) {
              confirmationText += `
              
We detected multiple date columns: ${dateColumns.join(', ')}.
Please specify which one should be used for the time-based approach using:
"Time Column: <column_name>"
              `.trim();
            }
          } else {
            confirmationText += `

No date column was detected, so we'll proceed with a non-time-based approach.
            `.trim();
          }

          const confirmationMessage: Message = {
            id: uuidv4(),
            sender: 'assistant',
            text: confirmationText,
            timestamp: formatTimestamp(new Date().toISOString()),
            animated: true,
          };

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
          console.error('Schema data missing.');
        }
      } else {
        console.error('No uploaded_files data.');
      }
    } catch (error: any) {
      console.error('File upload error:', error);
      const errorMessage: Message = {
        id: uuidv4(),
        sender: 'assistant',
        text: `Upload Error: ${error instanceof Error ? error.message : 'Unknown error'}`,
        timestamp: formatTimestamp(new Date().toISOString()),
        animated: true,
      };

      setCurrentChat((prevChat) => {
        if (!prevChat) return null;
        return { ...prevChat, messages: [...prevChat.messages, errorMessage] };
      });
      setChats((prevChats) =>
        prevChats.map((chat) =>
          chat.id === currentChat?.id ? { ...chat, messages: [...chat.messages, errorMessage] } : chat
        )
      );
    } finally {
      setSelectedFiles(null);
      setIsUploading(false);
    }
  };

  // ---------------------------------------------------------------------------
  // Send Message
  // ---------------------------------------------------------------------------
  const sendMessage = async (message: string, user_id: string, chat_id?: string): Promise<any> => {
    const response = await fetch(`http://localhost:8000/api/chatgpt/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message, user_id, chat_id }),
    });

    if (!response.ok) {
      throw new Error('Failed to send message');
    }
    return response.json();
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;
    if (!currentChat) return;

    const userMessage: Message = {
      id: uuidv4(),
      sender: 'user',
      text: inputMessage,
      timestamp: formatTimestamp(new Date().toISOString()),
      animated: false,
    };

    const updatedChat = {
      ...currentChat,
      messages: [...currentChat.messages, userMessage],
      timestamp: userMessage.timestamp,
    };

    setChats((prevChats) =>
      prevChats.map((chat) => (chat.id === currentChat.id ? updatedChat : chat))
    );
    setCurrentChat(updatedChat);
    setInputMessage('');
    setIsLoading(true);

    try {
      const data = await sendMessage(
        userMessage.text,
        userId?.toString() || 'default_user',
        currentChat.id
      );

      const newChatId = data.chat_id || currentChat.id;

      // CHANGED: We read data.show_generate_notebook to determine if we show the button
      let showGenerateButton = data.show_generate_notebook || false;

      const botMessage: Message = {
        id: uuidv4(),
        sender: 'assistant',
        text: data.response,
        timestamp: formatTimestamp(new Date().toISOString()),
        animated: true,
        // If the backend says "show_generate_notebook", we show the Generate Notebook button
        button: showGenerateButton,
      };

      const updatedMessages = [...updatedChat.messages, botMessage];

      // Update local state with the new chat_id
      setChats((prevChats) =>
        prevChats.map((chat) =>
          chat.id === currentChat.id
            ? { ...chat, id: newChatId, messages: updatedMessages }
            : chat
        )
      );

      setCurrentChat((prevChat) =>
        prevChat ? { ...prevChat, id: newChatId, messages: updatedMessages } : null
      );

      setIsGeneratingNotebook(false);
      setNotebookGenerated(false);
      setGeneratedNotebookData(null);
    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage: Message = {
        id: uuidv4(),
        sender: 'assistant',
        text: 'Sorry, I encountered an issue. Please try again later.',
        timestamp: formatTimestamp(new Date().toISOString()),
        animated: true,
      };

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

  // Handle creating a new chat
  const handleNewChat = () => {
    const newChat: Chat = {
      id: '',
      title: 'New Prediction',
      timestamp: new Date().toLocaleString(),
      messages: [
        {
          id: uuidv4(),
          sender: 'assistant',
          text: defaultMessage,
          timestamp: formatTimestamp(new Date().toISOString()),
          animated: true,
        },
      ],
      isHistory: false,
    };
    setChats((prev) => [newChat, ...prev]);
    setCurrentChat(newChat);

    setIsGeneratingNotebook(false);
    setNotebookGenerated(false);
    setGeneratedNotebookData(null);
  };

  // ---------------------------------------------------------------------------
  // Generate Notebook
  // ---------------------------------------------------------------------------
  const handleGenerateNotebook = async () => {
    if (!currentChat || !userId) {
      console.error('User ID or Current Chat not available.');
      return;
    }

    setIsGeneratingNotebook(true);

    try {
      const response = await fetch('http://localhost:8000/api/chatgpt/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'generate_notebook',
          user_id: userId.toString(),
          chat_id: currentChat.id,
        }),
      });

      if (!response.ok) {
        throw new Error(`Failed to generate notebook: ${response.statusText}`);
      }

      const data = await response.json();
      console.log('[DEBUG] Notebook generated:', data);

      if (data.notebooks) {
        setGeneratedNotebookData(data.notebooks);
        setNotebookGenerated(true);
        setGeneratedFileUrl(data.file_url);
        setGeneratedTargetColumn(data.target_column);
        setGeneratedEntityColumn(data.entity_column);
        setGeneratedFeatures(data.features);
        setGeneratedUserId(data.user_id);
        setGeneratedChatId(data.chat_id);

        const notebookMessage: Message = {
          id: uuidv4(),
          sender: 'assistant',
          text: 'Notebook has been generated successfully.',
          timestamp: formatTimestamp(new Date().toISOString()),
          animated: true,
          button: true, // Show "Open Notebook" button
        };

        setChats((prevChats) =>
          prevChats.map((chat) =>
            chat.id === currentChat.id
              ? { ...chat, messages: [...chat.messages, notebookMessage] }
              : chat
          )
        );

        setCurrentChat((prevChat) =>
          prevChat ? { ...prevChat, messages: [...prevChat.messages, notebookMessage] } : null
        );
      } else {
        alert('Error generating notebook. Please try again.');
      }
    } catch (error) {
      console.error('Error generating notebook:', error);
      alert('Error generating notebook. Please try again.');
    } finally {
      setIsGeneratingNotebook(false);
    }
  };

  // ---------------------------------------------------------------------------
  // Open Notebook
  // ---------------------------------------------------------------------------
  const handleOpenNotebook = () => {
    if (generatedNotebookData) {
      navigate('/notebook', {
        state: {
          notebooks: generatedNotebookData,
          file_url: generatedFileUrl,
          entity_column: generatedEntityColumn,
          target_column: generatedTargetColumn,
          features: generatedFeatures,
          user_id: generatedUserId,
          chat_id: generatedChatId,
          isTrained: false, // Initially not trained
        }
      });
    } else {
      alert('No notebook data available.');
    }
  };

  // ---------------------------------------------------------------------------
  // Reset Chat
  // ---------------------------------------------------------------------------
  const resetChat = async (user_id: string): Promise<void> => {
    const response = await fetch(`http://localhost:8000/api/chatgpt/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'reset', user_id }),
    });

    if (!response.ok) {
      throw new Error('Failed to reset chat');
    }
  };

  const handleReset = async () => {
    try {
      await resetChat(userId?.toString() || 'default_user');
      const initialChat: Chat = {
        id: '',
        title: 'New Prediction',
        timestamp: new Date().toLocaleString(),
        messages: [
          {
            id: uuidv4(),
            sender: 'assistant',
            text: defaultMessage,
            timestamp: formatTimestamp(new Date().toISOString()),
            animated: true,
          },
        ],
        isHistory: false,
      };
      setChats([initialChat]);
      setCurrentChat(initialChat);
      setIsGeneratingNotebook(false);
      setNotebookGenerated(false);
      setGeneratedNotebookData(null);
    } catch (error) {
      console.error('Error resetting chat:', error);
      alert('Error resetting chat. Please try again.');
    }
  };

  // ---------------------------------------------------------------------------
  // Render
  // ---------------------------------------------------------------------------
  const isHistoryChat = currentChat?.isHistory;

  return (
    <div className="h-screen flex bg-gray-50">
      <AnimatePresence>
        {showSidebar && (
          <motion.div
            initial={{ x: -240 }}
            animate={{ x: 0 }}
            exit={{ x: -240 }}
            transition={{ duration: 0.2 }}
            className="w-60 border-r border-gray-200 bg-white"
          >
            {/* Chat History Sidebar */}
            <div className="p-3 border-b border-gray-100 flex justify-between items-center">
              <span className="text-xs font-medium text-gray-600">Chat History</span>
              <button
                onClick={handleNewChat}
                className="text-xs flex items-center gap-1 text-teal-700 hover:text-teal-800"
              >
                <FiPlus size={12} /> New
              </button>
            </div>
            <div className="overflow-y-auto h-[calc(100vh-49px)]">
              {chats.map((chat) => (
                <div
                  key={chat.id}
                  onClick={() => setCurrentChat(chat)}
                  className={`p-2 mx-2 my-1 rounded text-xs cursor-pointer flex items-center justify-between group ${
                    currentChat?.id === chat.id ? 'bg-teal-50 text-teal-700' : 'hover:bg-gray-50'
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
                    aria-label="Delete Chat"
                  >
                    <FiTrash size={12} />
                  </button>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="h-12 border-b border-gray-200 flex items-center px-4 bg-white">
          <button
            onClick={() => setShowSidebar(!showSidebar)}
            className="text-gray-500 hover:text-gray-700"
            aria-label="Toggle sidebar"
          >
            <FiMenu size={16} />
          </button>
          <span className="ml-4 text-sm font-medium">{currentChat?.title || 'Select a chat'}</span>
          <div className="ml-auto">
            <button
              onClick={handleReset}
              className="text-xs text-red-500 hover:text-red-600 flex items-center gap-1"
              aria-label="Reset Chat"
            >
              <FiTrash size={12} /> Reset
            </button>
          </div>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto px-4 py-6">
          {currentChat?.messages.map((message) => {
            const schemaData = parseSchema(message);
            return (
              <div
                key={message.id}
                className={`mb-4 flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] rounded-lg px-4 py-2 text-xs ${
                    message.sender === 'user' ? 'bg-teal-700 text-white' : 'bg-white border border-gray-200'
                  }`}
                >
                  {message.isSchema && schemaData ? (
                    <>
                      <AnimatedMessage text={message.text} sender={message.sender} animated={message.animated} />
                      <SchemaTable schema={schemaData} />
                    </>
                  ) : (
                    <AnimatedMessage text={message.text} sender={message.sender} animated={message.animated} />
                  )}

                  <div
                    className={`text-[10px] mt-1 ${
                      message.sender === 'user' ? 'text-teal-300' : 'text-gray-400'
                    }`}
                  >
                    {message.timestamp}
                  </div>

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
                          // className="px-4 py-2 bg-teal-700 text-white text-xs rounded hover:bg-teal-600"
                          className="px-4 py-2 bg-teal-700 text-white text-xs rounded shadow-lg hover:bg-teal-600 transform hover:scale-105 transition-transform duration-300"
                        >
                          Open Notebook
                        </button>
                      ) : (
                        <button
                          onClick={handleGenerateNotebook}
                          // className="px-4 py-2 bg-teal-700 text-white text-xs rounded hover:bg-teal-600"
                          className="px-4 py-2 bg-teal-700 text-white text-xs rounded shadow-lg hover:bg-teal-600 transform hover:scale-105 transition-transform duration-300"
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

          {isLoading && (
            <div className="mb-4 flex justify-start">
              <div className="max-w-[80%] rounded-lg px-4 py-2 text-xs bg-white border border-gray-200 flex items-center">
                <FiLoader className="animate-spin mr-2" /> Typing...
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Uploading Indicator */}
        {isUploading && (
          <div className="px-4 py-2 border-t border-gray-200 bg-gray-50 text-teal-700 text-xs flex items-center gap-2">
            <FiLoader className="animate-spin" /> Uploading files...
          </div>
        )}

        {/* Selected Files Preview */}
        {selectedFiles && selectedFiles.length > 0 && (
          <div className="px-4 py-2 border-t border-gray-200 bg-gray-50">
            <div className="flex flex-wrap gap-2">
              {Array.from(selectedFiles).map((file) => (
                <div key={uuidv4()} className="flex flex-col gap-2 bg-white px-2 py-2 rounded border text-xs">
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

        {/* Message Input */}
        <div className="p-4 border-t border-gray-200 bg-white">
          <div
            className="flex items-center gap-2"
            style={{ cursor: isHistoryChat ? 'not-allowed' : 'auto' }}
            title={isHistoryChat ? '🚫 You cannot compose messages in history chats' : ''}
          >
            <label
              className={`cursor-pointer text-gray-400 hover:text-gray-600 ${
                isHistoryChat ? 'opacity-50 cursor-not-allowed' : ''
              }`}
              title={isHistoryChat ? '🚫 You cannot attach files in history chats' : ''}
            >
              <input
                type="file"
                multiple
                className="hidden"
                onChange={handleFileSelect}
                disabled={isHistoryChat ? true : false}
              />
              <FiPaperclip size={16} />
            </label>
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === 'Enter') handleSendMessage();
              }}
              placeholder="Type your message..."
              className="flex-1 text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:border-teal-400"
              disabled={isHistoryChat ? true : false}
              style={{ cursor: isHistoryChat ? 'not-allowed' : 'text' }}
              title={isHistoryChat ? '🚫 You cannot compose messages in history chats' : ''}
            />
            <button
              onClick={handleSendMessage}
              className="text-teal-700 hover:text-teal-800"
              disabled={isHistoryChat ? true : false}
              style={{ cursor: isHistoryChat ? 'not-allowed' : 'pointer' }}
              title={isHistoryChat ? '🚫 You cannot compose messages in history chats' : ''}
              aria-label="Send Message"
            >
              <FiSend size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Inline AnimatedMessage Component
const AnimatedMessage: React.FC<{
  text: string;
  sender: 'user' | 'assistant';
  animated?: boolean;
}> = ({ text, sender, animated }) => {
  const [displayedText, setDisplayedText] = useState('');
  const indexRef = useRef(0);

  useEffect(() => {
    if (animated && sender === 'assistant') {
      const interval = setInterval(() => {
        setDisplayedText((prev) => prev + text.charAt(indexRef.current));
        indexRef.current += 1;
        if (indexRef.current >= text.length) {
          clearInterval(interval);
        }
      }, 10);
      return () => clearInterval(interval);
    } else {
      setDisplayedText(text);
    }
  }, [text, sender, animated]);

  return <pre className="whitespace-pre-wrap font-sans">{displayedText}</pre>;
};

const SchemaTable: React.FC<{
  schema: Array<{ column_name: string; data_type: string }>;
}> = ({ schema }) => {
  return (
    <div className="overflow-x-auto mt-2">
      <table className="min-w-full border-collapse">
        <thead>
          <tr>
            <th className="px-4 py-2 border-b bg-gray-100 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
              Field
            </th>
            <th className="px-4 py-2 border-b bg-gray-100 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
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

// Helper function to parse schema
const parseSchema = (message: Message): Array<{ column_name: string; data_type: string }> | null => {
  if (!message.isSchema || !message.schema) return null;
  return message.schema;
};

// Helper function to format timestamp
function formatTimestamp(ts: string): string {
  const date = new Date(ts);
  return date.toLocaleString('en-IN', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
    timeZone: 'Asia/Kolkata',
  });
}

export default ChatInterface;
