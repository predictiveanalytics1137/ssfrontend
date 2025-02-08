




// // // // // // src/components/ChatInterface/ChatInterface.tsx

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
// // // // // import { useAuth } from '../Auth/AuthContext';

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
// // // // //   id: string;        // This will be the same as chat_id from server
// // // // //   title: string;
// // // // //   timestamp: string;
// // // // //   messages: Message[];
// // // // //   isHistory?: boolean;
// // // // // }

// // // // // interface NotebookMetadata {
// // // // //   file_url: string;
// // // // //   target_column: string;
// // // // //   entity_column: string;
// // // // //   features: string[];
// // // // //   user_id: string;
// // // // //   chat_id: string;
// // // // // }

// // // // // const ChatInterface: React.FC = () => {
// // // // //   const defaultMessage = `Hi! 👋 I'm your AI assistant.\nI'll assist you in formulating a predictive question. I'll then create a SQL notebook to build a training set.\nSo, what would you like to predict?`;

// // // // //   const { user, loading } = useAuth();
// // // // //   const userId = user?.id;  // Ensure you have a valid user ID from your auth context

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
// // // // //   const [generatedFileUrl, setGeneratedFileUrl] = useState<string>('');
// // // // //   const [generatedTargetColumn, setGeneratedTargetColumn] = useState<string>('');
// // // // //   const [generatedEntityColumn, setGeneratedEntityColumn] = useState<string>('');
// // // // //   const [generatedFeatures, setGeneratedFeatures] = useState<string[]>([]);
// // // // //   const [generatedUserId, setGeneratedUserId] = useState<string>('');
// // // // //   const [generatedChatId, setGeneratedChatId] = useState<string>('');

// // // // //   const navigate = useNavigate();
// // // // //   const messagesEndRef = useRef<HTMLDivElement | null>(null);

// // // // //   // Scroll to bottom when messages update
// // // // //   const scrollToBottom = () => {
// // // // //     messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
// // // // //   };

// // // // //   useEffect(() => {
// // // // //     scrollToBottom();
// // // // //   }, [currentChat?.messages, isLoading, isUploading]);

// // // // //   // ---------------------------------------------------------------------------
// // // // //   // Fetch Chat History (merging user/assistant messages in chronological order)
// // // // //   // ---------------------------------------------------------------------------
// // // // //   const fetchChatHistory = async (user_id: string): Promise<Chat[]> => {
// // // // //     const response = await fetch(`http://localhost:8000/api/chat_history/?user_id=${user_id}`);
// // // // //     if (!response.ok) {
// // // // //       throw new Error('Failed to fetch chat history');
// // // // //     }
// // // // //     const data = await response.json();

// // // // //     const chatsFromBackend: Chat[] = data.map((chatObj: any) => {
// // // // //       const mergedMessages = [
// // // // //         ...chatObj.user_messages.map((um: any) => ({
// // // // //           sender: 'user',
// // // // //           text: um.text,
// // // // //           timestamp: um.timestamp,
// // // // //         })),
// // // // //         ...chatObj.assistant_messages.map((am: any) => ({
// // // // //           sender: 'assistant',
// // // // //           text: am.text,
// // // // //           timestamp: am.timestamp,
// // // // //         })),
// // // // //       ];

// // // // //       // Sort them by timestamp
// // // // //       mergedMessages.sort((a: any, b: any) => {
// // // // //         return new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime();
// // // // //       });

// // // // //       const messages: Message[] = mergedMessages.map((msg: any) => ({
// // // // //         id: uuidv4(),
// // // // //         sender: msg.sender as 'user' | 'assistant',
// // // // //         text: msg.text,
// // // // //         timestamp: msg.timestamp,
// // // // //         animated: false,
// // // // //       }));

// // // // //       return {
// // // // //         id: chatObj.chat_id,
// // // // //         title: chatObj.title,
// // // // //         timestamp: new Date().toLocaleString(),
// // // // //         messages,
// // // // //         isHistory: false,
// // // // //       };
// // // // //     });

// // // // //     return chatsFromBackend;
// // // // //   };

// // // // //   const fetchAndInitializeChats = async () => {
// // // // //     try {
// // // // //       if (!userId) {
// // // // //         initializeDefaultChat();
// // // // //         return;
// // // // //       }
// // // // //       const fetchedChats = await fetchChatHistory(userId.toString());
// // // // //       if (fetchedChats.length > 0) {
// // // // //         setChats(fetchedChats);
// // // // //         setCurrentChat(fetchedChats[0]);
// // // // //       } else {
// // // // //         initializeDefaultChat();
// // // // //       }
// // // // //     } catch (error) {
// // // // //       console.error("Error fetching chat history:", error);
// // // // //       initializeDefaultChat();
// // // // //     }
// // // // //   };

// // // // //   const initializeDefaultChat = () => {
// // // // //     const initialChat: Chat = {
// // // // //       id: '', // We'll get an actual chat_id from the server once user sends first message
// // // // //       title: 'New Prediction',
// // // // //       timestamp: new Date().toLocaleString(),
// // // // //       messages: [
// // // // //         {
// // // // //           id: uuidv4(),
// // // // //           sender: "assistant",
// // // // //           text: defaultMessage,
// // // // //           timestamp: formatTimestamp(new Date().toISOString()),
// // // // //           animated: true,
// // // // //         },
// // // // //       ],
// // // // //       isHistory: false,
// // // // //     };
// // // // //     setChats([initialChat]);
// // // // //     setCurrentChat(initialChat);
// // // // //   };

// // // // //   useEffect(() => {
// // // // //     fetchAndInitializeChats();
// // // // //     // eslint-disable-next-line react-hooks/exhaustive-deps
// // // // //   }, [userId]);

// // // // //   // ---------------------------------------------------------------------------
// // // // //   // Upload Files
// // // // //   // ---------------------------------------------------------------------------
// // // // //   const uploadFiles = async (files: FileList): Promise<any> => {
// // // // //     const formData = new FormData();
// // // // //     Array.from(files).forEach((file) => {
// // // // //       formData.append('file', file);
// // // // //     });
// // // // //     if (currentChat && currentChat.id) {
// // // // //       formData.append('chat_id', currentChat.id);
// // // // //     }
// // // // //     if (userId) {
// // // // //       formData.append('user_id', userId.toString());
// // // // //     }

// // // // //     const response = await fetch(`http://localhost:8000/api/chatgpt/`, {
// // // // //       method: 'POST',
// // // // //       body: formData,
// // // // //     });

// // // // //     if (!response.ok) {
// // // // //       throw new Error('Failed to upload files');
// // // // //     }
// // // // //     return response.json();
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
// // // // //       const data = await uploadFiles(selectedFiles);
// // // // //       console.log('[DEBUG] File upload response:', data);

// // // // //       if (data.uploaded_files && data.uploaded_files.length > 0) {
// // // // //         const uploadedFile = data.uploaded_files[0];
// // // // //         const schema = uploadedFile.schema;
// // // // //         const suggestions = uploadedFile.suggestions;

// // // // //         // ------------------------------------------------------------------
// // // // //         // NEW: Check for has_date_column and possible date_columns from backend
// // // // //         // ------------------------------------------------------------------
// // // // //         const hasDateColumn = uploadedFile.has_date_column;
// // // // //         const dateColumns = uploadedFile.date_columns || [];
// // // // //         console.log('[DEBUG] hasDateColumn:', hasDateColumn);
// // // // //         console.log('[DEBUG] dateColumns:', dateColumns);

// // // // //         if (schema && schema.length > 0) {
// // // // //           const schemaMessage: Message = {
// // // // //             id: uuidv4(),
// // // // //             sender: 'assistant',
// // // // //             text: 'Dataset uploaded successfully! Below is the schema:',
// // // // //             timestamp: formatTimestamp(new Date().toISOString()),
// // // // //             isSchema: true,
// // // // //             schema: schema,
// // // // //             animated: true,
// // // // //           };

// // // // //           let confirmationText = `
// // // // // Suggested Target Column: ${suggestions.target_column}
// // // // // Suggested Entity ID Column: ${suggestions.entity_id_column}
// // // // // Suggested Feature Columns: ${suggestions.feature_columns.join(', ')}

// // // // // Please confirm:
// // // // // - Is the Target Column correct?
// // // // // - Is the Entity ID Column correct?
// // // // // (Reply 'yes' to confirm or provide the correct column names as needed)
// // // // // `.trim();

// // // // //           // -------------------------------------------------------------
// // // // //           // If we have a date column, add a hint that time-based is possible
// // // // //           // -------------------------------------------------------------
// // // // //           if (hasDateColumn) {
// // // // //             if (dateColumns.length === 1) {
// // // // //               confirmationText += `
              
// // // // // We detected 1 date column: ${dateColumns[0]}
// // // // // If you'd like a time-based approach, you can confirm with 'yes' or specify a different date column (if any).
// // // // // You can also explicitly say "Time Column: ${dateColumns[0]}" to be certain.
// // // // //               `.trim();
// // // // //             } else if (dateColumns.length > 1) {
// // // // //               confirmationText += `
              
// // // // // We detected multiple date columns: ${dateColumns.join(', ')}.
// // // // // Please specify which one should be used for the time-based approach using:
// // // // // "Time Column: <column_name>"
// // // // //               `.trim();
// // // // //             }
// // // // //           } else {
// // // // //             confirmationText += `

// // // // // No date column was detected, so we'll proceed with a non-time-based approach.
// // // // //             `.trim();
// // // // //           }

// // // // //           const confirmationMessage: Message = {
// // // // //             id: uuidv4(),
// // // // //             sender: 'assistant',
// // // // //             text: confirmationText,
// // // // //             timestamp: formatTimestamp(new Date().toISOString()),
// // // // //             animated: true,
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
// // // // //         animated: true,
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

// // // // //   // ---------------------------------------------------------------------------
// // // // //   // Send Message
// // // // //   // ---------------------------------------------------------------------------
// // // // //   const sendMessage = async (message: string, user_id: string, chat_id?: string): Promise<any> => {
// // // // //     const response = await fetch(`http://localhost:8000/api/chatgpt/`, {
// // // // //       method: 'POST',
// // // // //       headers: { 'Content-Type': 'application/json' },
// // // // //       body: JSON.stringify({ message, user_id, chat_id }),
// // // // //     });

// // // // //     if (!response.ok) {
// // // // //       throw new Error('Failed to send message');
// // // // //     }
// // // // //     return response.json();
// // // // //   };

// // // // //   const handleSendMessage = async () => {
// // // // //     if (!inputMessage.trim()) return;
// // // // //     if (!currentChat) return;

// // // // //     const userMessage: Message = {
// // // // //       id: uuidv4(),
// // // // //       sender: 'user',
// // // // //       text: inputMessage,
// // // // //       timestamp: formatTimestamp(new Date().toISOString()),
// // // // //       animated: false,
// // // // //     };

// // // // //     const updatedChat = {
// // // // //       ...currentChat,
// // // // //       messages: [...currentChat.messages, userMessage],
// // // // //       timestamp: userMessage.timestamp,
// // // // //     };

// // // // //     setChats((prevChats) =>
// // // // //       prevChats.map((chat) => (chat.id === currentChat.id ? updatedChat : chat))
// // // // //     );
// // // // //     setCurrentChat(updatedChat);
// // // // //     setInputMessage('');
// // // // //     setIsLoading(true);

// // // // //     try {
// // // // //       const data = await sendMessage(
// // // // //         userMessage.text,
// // // // //         userId?.toString() || 'default_user',
// // // // //         currentChat.id
// // // // //       );

// // // // //       const newChatId = data.chat_id || currentChat.id;

// // // // //       // CHANGED: We read data.show_generate_notebook to determine if we show the button
// // // // //       let showGenerateButton = data.show_generate_notebook || false;

// // // // //       const botMessage: Message = {
// // // // //         id: uuidv4(),
// // // // //         sender: 'assistant',
// // // // //         text: data.response,
// // // // //         timestamp: formatTimestamp(new Date().toISOString()),
// // // // //         animated: true,
// // // // //         // If the backend says "show_generate_notebook", we show the Generate Notebook button
// // // // //         button: showGenerateButton,
// // // // //       };

// // // // //       const updatedMessages = [...updatedChat.messages, botMessage];

// // // // //       // Update local state with the new chat_id
// // // // //       setChats((prevChats) =>
// // // // //         prevChats.map((chat) =>
// // // // //           chat.id === currentChat.id
// // // // //             ? { ...chat, id: newChatId, messages: updatedMessages }
// // // // //             : chat
// // // // //         )
// // // // //       );

// // // // //       setCurrentChat((prevChat) =>
// // // // //         prevChat ? { ...prevChat, id: newChatId, messages: updatedMessages } : null
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
// // // // //         animated: true,
// // // // //       };

// // // // //       setChats((prevChats) =>
// // // // //         prevChats.map((chat) =>
// // // // //           chat.id === currentChat.id
// // // // //             ? { ...chat, messages: [...chat.messages, errorMessage] }
// // // // //             : chat
// // // // //         )
// // // // //       );
// // // // //     } finally {
// // // // //       setIsLoading(false);
// // // // //     }
// // // // //   };

// // // // //   // Handle creating a new chat
// // // // //   const handleNewChat = () => {
// // // // //     const newChat: Chat = {
// // // // //       id: '',
// // // // //       title: 'New Prediction',
// // // // //       timestamp: new Date().toLocaleString(),
// // // // //       messages: [
// // // // //         {
// // // // //           id: uuidv4(),
// // // // //           sender: 'assistant',
// // // // //           text: defaultMessage,
// // // // //           timestamp: formatTimestamp(new Date().toISOString()),
// // // // //           animated: true,
// // // // //         },
// // // // //       ],
// // // // //       isHistory: false,
// // // // //     };
// // // // //     setChats((prev) => [newChat, ...prev]);
// // // // //     setCurrentChat(newChat);

// // // // //     setIsGeneratingNotebook(false);
// // // // //     setNotebookGenerated(false);
// // // // //     setGeneratedNotebookData(null);
// // // // //   };

// // // // //   // ---------------------------------------------------------------------------
// // // // //   // Generate Notebook
// // // // //   // ---------------------------------------------------------------------------
// // // // //   const handleGenerateNotebook = async () => {
// // // // //     if (!currentChat || !userId) {
// // // // //       console.error('User ID or Current Chat not available.');
// // // // //       return;
// // // // //     }

// // // // //     setIsGeneratingNotebook(true);

// // // // //     try {
// // // // //       const response = await fetch('http://localhost:8000/api/chatgpt/', {
// // // // //         method: 'POST',
// // // // //         headers: { 'Content-Type': 'application/json' },
// // // // //         body: JSON.stringify({
// // // // //           action: 'generate_notebook',
// // // // //           user_id: userId.toString(),
// // // // //           chat_id: currentChat.id,
// // // // //         }),
// // // // //       });

// // // // //       if (!response.ok) {
// // // // //         throw new Error(`Failed to generate notebook: ${response.statusText}`);
// // // // //       }

// // // // //       const data = await response.json();
// // // // //       console.log('[DEBUG] Notebook generated:', data);

// // // // //       if (data.notebooks) {
// // // // //         setGeneratedNotebookData(data.notebooks);
// // // // //         setNotebookGenerated(true);
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
// // // // //           animated: true,
// // // // //           button: true, // Show "Open Notebook" button
// // // // //         };

// // // // //         setChats((prevChats) =>
// // // // //           prevChats.map((chat) =>
// // // // //             chat.id === currentChat.id
// // // // //               ? { ...chat, messages: [...chat.messages, notebookMessage] }
// // // // //               : chat
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

// // // // //   // ---------------------------------------------------------------------------
// // // // //   // Open Notebook
// // // // //   // ---------------------------------------------------------------------------
// // // // //   const handleOpenNotebook = () => {
// // // // //     if (generatedNotebookData) {
// // // // //       navigate('/notebook', {
// // // // //         state: {
// // // // //           notebooks: generatedNotebookData,
// // // // //           file_url: generatedFileUrl,
// // // // //           entity_column: generatedEntityColumn,
// // // // //           target_column: generatedTargetColumn,
// // // // //           features: generatedFeatures,
// // // // //           user_id: generatedUserId,
// // // // //           
// // // // chat_id:"a8ec6a0f-8bd0-4fbb-8ffa-589a9bad53a3"
// // // // //           isTrained: false, // Initially not trained
// // // // //         }
// // // // //       });
// // // // //     } else {
// // // // //       alert('No notebook data available.');
// // // // //     }
// // // // //   };

// // // // //   // ---------------------------------------------------------------------------
// // // // //   // Reset Chat
// // // // //   // ---------------------------------------------------------------------------
// // // // //   const resetChat = async (user_id: string): Promise<void> => {
// // // // //     const response = await fetch(`http://localhost:8000/api/chatgpt/`, {
// // // // //       method: 'POST',
// // // // //       headers: { 'Content-Type': 'application/json' },
// // // // //       body: JSON.stringify({ action: 'reset', user_id }),
// // // // //     });

// // // // //     if (!response.ok) {
// // // // //       throw new Error('Failed to reset chat');
// // // // //     }
// // // // //   };

// // // // //   const handleReset = async () => {
// // // // //     try {
// // // // //       await resetChat(userId?.toString() || 'default_user');
// // // // //       const initialChat: Chat = {
// // // // //         id: '',
// // // // //         title: 'New Prediction',
// // // // //         timestamp: new Date().toLocaleString(),
// // // // //         messages: [
// // // // //           {
// // // // //             id: uuidv4(),
// // // // //             sender: 'assistant',
// // // // //             text: defaultMessage,
// // // // //             timestamp: formatTimestamp(new Date().toISOString()),
// // // // //             animated: true,
// // // // //           },
// // // // //         ],
// // // // //         isHistory: false,
// // // // //       };
// // // // //       setChats([initialChat]);
// // // // //       setCurrentChat(initialChat);
// // // // //       setIsGeneratingNotebook(false);
// // // // //       setNotebookGenerated(false);
// // // // //       setGeneratedNotebookData(null);
// // // // //     } catch (error) {
// // // // //       console.error('Error resetting chat:', error);
// // // // //       alert('Error resetting chat. Please try again.');
// // // // //     }
// // // // //   };

// // // // //   // ---------------------------------------------------------------------------
// // // // //   // Render
// // // // //   // ---------------------------------------------------------------------------
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
// // // // //             {/* Chat History Sidebar */}
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
// // // // //                     aria-label="Delete Chat"
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
// // // // //         {/* Header */}
// // // // //         <div className="h-12 border-b border-gray-200 flex items-center px-4 bg-white">
// // // // //           <button
// // // // //             onClick={() => setShowSidebar(!showSidebar)}
// // // // //             className="text-gray-500 hover:text-gray-700"
// // // // //             aria-label="Toggle sidebar"
// // // // //           >
// // // // //             <FiMenu size={16} />
// // // // //           </button>
// // // // //           <span className="ml-4 text-sm font-medium">{currentChat?.title || 'Select a chat'}</span>
// // // // //           <div className="ml-auto">
// // // // //             <button
// // // // //               onClick={handleReset}
// // // // //               className="text-xs text-red-500 hover:text-red-600 flex items-center gap-1"
// // // // //               aria-label="Reset Chat"
// // // // //             >
// // // // //               <FiTrash size={12} /> Reset
// // // // //             </button>
// // // // //           </div>
// // // // //         </div>

// // // // //         {/* Chat Messages */}
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
// // // // //                           // className="px-4 py-2 bg-teal-700 text-white text-xs rounded hover:bg-teal-600"
// // // // //                           className="px-4 py-2 bg-teal-700 text-white text-xs rounded shadow-lg hover:bg-teal-600 transform hover:scale-105 transition-transform duration-300"
// // // // //                         >
// // // // //                           Open Notebook
// // // // //                         </button>
// // // // //                       ) : (
// // // // //                         <button
// // // // //                           onClick={handleGenerateNotebook}
// // // // //                           // className="px-4 py-2 bg-teal-700 text-white text-xs rounded hover:bg-teal-600"
// // // // //                           className="px-4 py-2 bg-teal-700 text-white text-xs rounded shadow-lg hover:bg-teal-600 transform hover:scale-105 transition-transform duration-300"
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

// // // // //         {/* Uploading Indicator */}
// // // // //         {isUploading && (
// // // // //           <div className="px-4 py-2 border-t border-gray-200 bg-gray-50 text-teal-700 text-xs flex items-center gap-2">
// // // // //             <FiLoader className="animate-spin" /> Uploading files...
// // // // //           </div>
// // // // //         )}

// // // // //         {/* Selected Files Preview */}
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

// // // // //         {/* Message Input */}
// // // // //         <div className="p-4 border-t border-gray-200 bg-white">
// // // // //           <div
// // // // //             className="flex items-center gap-2"
// // // // //             style={{ cursor: isHistoryChat ? 'not-allowed' : 'auto' }}
// // // // //             title={isHistoryChat ? '🚫 You cannot compose messages in history chats' : ''}
// // // // //           >
// // // // //             <label
// // // // //               className={`cursor-pointer text-gray-400 hover:text-gray-600 ${
// // // // //                 isHistoryChat ? 'opacity-50 cursor-not-allowed' : ''
// // // // //               }`}
// // // // //               title={isHistoryChat ? '🚫 You cannot attach files in history chats' : ''}
// // // // //             >
// // // // //               <input
// // // // //                 type="file"
// // // // //                 multiple
// // // // //                 className="hidden"
// // // // //                 onChange={handleFileSelect}
// // // // //                 disabled={isHistoryChat ? true : false}
// // // // //               />
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
// // // // //               title={isHistoryChat ? '🚫 You cannot compose messages in history chats' : ''}
// // // // //             />
// // // // //             <button
// // // // //               onClick={handleSendMessage}
// // // // //               className="text-teal-700 hover:text-teal-800"
// // // // //               disabled={isHistoryChat ? true : false}
// // // // //               style={{ cursor: isHistoryChat ? 'not-allowed' : 'pointer' }}
// // // // //               title={isHistoryChat ? '🚫 You cannot compose messages in history chats' : ''}
// // // // //               aria-label="Send Message"
// // // // //             >
// // // // //               <FiSend size={16} />
// // // // //             </button>
// // // // //           </div>
// // // // //         </div>
// // // // //       </div>
// // // // //     </div>
// // // // //   );
// // // // // };

// // // // // // Inline AnimatedMessage Component
// // // // // const AnimatedMessage: React.FC<{
// // // // //   text: string;
// // // // //   sender: 'user' | 'assistant';
// // // // //   animated?: boolean;
// // // // // }> = ({ text, sender, animated }) => {
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
// // // // //       }, 10);
// // // // //       return () => clearInterval(interval);
// // // // //     } else {
// // // // //       setDisplayedText(text);
// // // // //     }
// // // // //   }, [text, sender, animated]);

// // // // //   return <pre className="whitespace-pre-wrap font-sans">{displayedText}</pre>;
// // // // // };

// // // // // const SchemaTable: React.FC<{
// // // // //   schema: Array<{ column_name: string; data_type: string }>;
// // // // // }> = ({ schema }) => {
// // // // //   return (
// // // // //     <div className="overflow-x-auto mt-2">
// // // // //       <table className="min-w-full border-collapse">
// // // // //         <thead>
// // // // //           <tr>
// // // // //             <th className="px-4 py-2 border-b bg-gray-100 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
// // // // //               Field
// // // // //             </th>
// // // // //             <th className="px-4 py-2 border-b bg-gray-100 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
// // // // //               Data Type
// // // // //             </th>
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

// // // // // // Helper function to parse schema
// // // // // const parseSchema = (message: Message): Array<{ column_name: string; data_type: string }> | null => {
// // // // //   if (!message.isSchema || !message.schema) return null;
// // // // //   return message.schema;
// // // // // };

// // // // // // Helper function to format timestamp
// // // // // function formatTimestamp(ts: string): string {
// // // // //   const date = new Date(ts);
// // // // //   return date.toLocaleString('en-IN', {
// // // // //     hour: '2-digit',
// // // // //     minute: '2-digit',
// // // // //     hour12: true,
// // // // //     timeZone: 'Asia/Kolkata',
// // // // //   });
// // // // // }

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
// // // //   id: string;        // This will be the same as chat_id from server
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

// // // //   const { user, loading } = useAuth();
// // // //   const userId = user?.id;  // Ensure you have a valid user ID from your auth context

// // // //   const [chats, setChats] = useState<Chat[]>([]);
// // // //   const [currentChat, setCurrentChat] = useState<Chat | null>(null);
// // // //   const [showSidebar, setShowSidebar] = useState(true);
// // // //   const [inputMessage, setInputMessage] = useState('');
// // // //   const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);

// // // //   const [isLoading, setIsLoading] = useState(false);
// // // //   const [isUploading, setIsUploading] = useState(false);

// // // //   const [isGeneratingNotebook, setIsGeneratingNotebook] = useState(false);
// // // //   const [notebookGenerated, setNotebookGenerated] = useState(false);
// // // //   const [generatedNotebookData, setGeneratedNotebookData] = useState<any>(null);
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

// // // //   // ---------------------------------------------------------------------------
// // // //   // Fetch Chat History (merging user/assistant messages in chronological order)
// // // //   // ---------------------------------------------------------------------------
// // // //   const fetchChatHistory = async (user_id: string): Promise<Chat[]> => {
// // // //     const response = await fetch(`http://localhost:8000/api/chat_history/?user_id=${user_id}`);
// // // //     if (!response.ok) {
// // // //       throw new Error('Failed to fetch chat history');
// // // //     }
// // // //     const data = await response.json();

// // // //     const chatsFromBackend: Chat[] = data.map((chatObj: any) => {
// // // //       const mergedMessages = [
// // // //         ...chatObj.user_messages.map((um: any) => ({
// // // //           sender: 'user',
// // // //           text: um.text,
// // // //           timestamp: um.timestamp,
// // // //         })),
// // // //         ...chatObj.assistant_messages.map((am: any) => ({
// // // //           sender: 'assistant',
// // // //           text: am.text,
// // // //           timestamp: am.timestamp,
// // // //         })),
// // // //       ];

// // // //       // Sort them by timestamp
// // // //       mergedMessages.sort((a: any, b: any) => {
// // // //         return new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime();
// // // //       });

// // // //       const messages: Message[] = mergedMessages.map((msg: any) => ({
// // // //         id: uuidv4(),
// // // //         sender: msg.sender as 'user' | 'assistant',
// // // //         text: msg.text,
// // // //         timestamp: msg.timestamp,
// // // //         animated: false,
// // // //       }));

// // // //       return {
// // // //         id: chatObj.chat_id,
// // // //         title: chatObj.title,
// // // //         timestamp: new Date().toLocaleString(),
// // // //         messages,
// // // //         isHistory: false,
// // // //       };
// // // //     });

// // // //     return chatsFromBackend;
// // // //   };

// // // //   const fetchAndInitializeChats = async () => {
// // // //     try {
// // // //       if (!userId) {
// // // //         initializeDefaultChat();
// // // //         return;
// // // //       }
// // // //       const fetchedChats = await fetchChatHistory(userId.toString());
// // // //       if (fetchedChats.length > 0) {
// // // //         setChats(fetchedChats);
// // // //         setCurrentChat(fetchedChats[0]);
// // // //       } else {
// // // //         initializeDefaultChat();
// // // //       }
// // // //     } catch (error) {
// // // //       console.error("Error fetching chat history:", error);
// // // //       initializeDefaultChat();
// // // //     }
// // // //   };

// // // //   const initializeDefaultChat = () => {
// // // //     const initialChat: Chat = {
// // // //       id: '', // We'll get an actual chat_id from the server once user sends first message
// // // //       title: 'New Prediction',
// // // //       timestamp: new Date().toLocaleString(),
// // // //       messages: [
// // // //         {
// // // //           id: uuidv4(),
// // // //           sender: "assistant",
// // // //           text: defaultMessage,
// // // //           timestamp: formatTimestamp(new Date().toISOString()),
// // // //           animated: true,
// // // //         },
// // // //       ],
// // // //       isHistory: false,
// // // //     };
// // // //     setChats([initialChat]);
// // // //     setCurrentChat(initialChat);
// // // //   };

// // // //   useEffect(() => {
// // // //     fetchAndInitializeChats();
// // // //     // eslint-disable-next-line react-hooks/exhaustive-deps
// // // //   }, [userId]);

// // // //   // ---------------------------------------------------------------------------
// // // //   // Upload Files
// // // //   // ---------------------------------------------------------------------------
// // // //   const uploadFiles = async (files: FileList): Promise<any> => {
// // // //     const formData = new FormData();
// // // //     Array.from(files).forEach((file) => {
// // // //       formData.append('file', file);
// // // //     });
// // // //     if (currentChat && currentChat.id) {
// // // //       formData.append('chat_id', currentChat.id);
// // // //     }
// // // //     if (userId) {
// // // //       formData.append('user_id', userId.toString());
// // // //     }

// // // //     const response = await fetch(`http://localhost:8000/api/chatgpt/`, {
// // // //       method: 'POST',
// // // //       body: formData,
// // // //     });

// // // //     if (!response.ok) {
// // // //       throw new Error('Failed to upload files');
// // // //     }
// // // //     return response.json();
// // // //   };

// // // //   const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
// // // //     const files = e.target.files;
// // // //     if (files && files.length > 0) {
// // // //       setSelectedFiles(files);
// // // //     }
// // // //   };

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

// // // //         // ------------------------------------------------------------------
// // // //         // NEW: Check for has_date_column and possible date_columns from backend
// // // //         // ------------------------------------------------------------------
// // // //         const hasDateColumn = uploadedFile.has_date_column;
// // // //         const dateColumns = uploadedFile.date_columns || [];
// // // //         console.log('[DEBUG] hasDateColumn:', hasDateColumn);
// // // //         console.log('[DEBUG] dateColumns:', dateColumns);

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

// // // //           let confirmationText = `
// // // // Suggested Target Column: ${suggestions.target_column}
// // // // Suggested Entity ID Column: ${suggestions.entity_id_column}
// // // // Suggested Feature Columns: ${suggestions.feature_columns.join(', ')}

// // // // Please confirm:
// // // // - Is the Target Column correct?
// // // // - Is the Entity ID Column correct?
// // // // (Reply 'yes' to confirm or provide the correct column names as needed)
// // // // `.trim();

// // // //           // -------------------------------------------------------------
// // // //           // If we have a date column, add a hint that time-based is possible
// // // //           // -------------------------------------------------------------
// // // //           if (hasDateColumn) {
// // // //             if (dateColumns.length === 1) {
// // // //               confirmationText += `
              
// // // // We detected 1 date column: ${dateColumns[0]}
// // // // If you'd like a time-based approach, you can confirm with 'yes' or specify a different date column (if any).
// // // // You can also explicitly say "Time Column: ${dateColumns[0]}" to be certain.
// // // //               `.trim();
// // // //             } else if (dateColumns.length > 1) {
// // // //               confirmationText += `
              
// // // // We detected multiple date columns: ${dateColumns.join(', ')}.
// // // // Please specify which one should be used for the time-based approach using:
// // // // "Time Column: <column_name>"
// // // //               `.trim();
// // // //             }
// // // //           } else {
// // // //             confirmationText += `

// // // // No date column was detected, so we'll proceed with a non-time-based approach.
// // // //             `.trim();
// // // //           }

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

// // // //   // ---------------------------------------------------------------------------
// // // //   // Send Message
// // // //   // ---------------------------------------------------------------------------
// // // //   const sendMessage = async (message: string, user_id: string, chat_id?: string): Promise<any> => {
// // // //     const response = await fetch(`http://localhost:8000/api/chatgpt/`, {
// // // //       method: 'POST',
// // // //       headers: { 'Content-Type': 'application/json' },
// // // //       body: JSON.stringify({ message, user_id, chat_id }),
// // // //     });

// // // //     if (!response.ok) {
// // // //       throw new Error('Failed to send message');
// // // //     }
// // // //     return response.json();
// // // //   };

// // // //   const handleSendMessage = async () => {
// // // //     if (!inputMessage.trim()) return;
// // // //     if (!currentChat) return;

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
// // // //       const data = await sendMessage(
// // // //         userMessage.text,
// // // //         userId?.toString() || 'default_user',
// // // //         currentChat.id
// // // //       );

// // // //       const newChatId = data.chat_id || currentChat.id;

// // // //       // CHANGED: We read data.show_generate_notebook to determine if we show the button
// // // //       let showGenerateButton = data.show_generate_notebook || false;

// // // //       const botMessage: Message = {
// // // //         id: uuidv4(),
// // // //         sender: 'assistant',
// // // //         text: data.response,
// // // //         timestamp: formatTimestamp(new Date().toISOString()),
// // // //         animated: true,
// // // //         // If the backend says "show_generate_notebook", we show the Generate Notebook button
// // // //         button: showGenerateButton,
// // // //       };

// // // //       const updatedMessages = [...updatedChat.messages, botMessage];

// // // //       // Update local state with the new chat_id
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

// // // //   // // Handle creating a new chat
// // // //   // const handleNewChat = () => {
// // // //   //   const newChat: Chat = {
// // // //   //     id: '',
// // // //   //     title: 'New Prediction',
// // // //   //     timestamp: new Date().toLocaleString(),
// // // //   //     messages: [
// // // //   //       {
// // // //   //         id: uuidv4(),
// // // //   //         sender: 'assistant',
// // // //   //         text: defaultMessage,
// // // //   //         timestamp: formatTimestamp(new Date().toISOString()),
// // // //   //         animated: true,
// // // //   //       },
// // // //   //     ],
// // // //   //     isHistory: false,
// // // //   //   };
// // // //   //   setChats((prev) => [newChat, ...prev]);
// // // //   //   setCurrentChat(newChat);

// // // //   //   setIsGeneratingNotebook(false);
// // // //   //   setNotebookGenerated(false);
// // // //   //   setGeneratedNotebookData(null);
// // // //   // };

// // // //   // ---------------------------------------------------------------------------
// // // //   // Generate Notebook
// // // //   // ---------------------------------------------------------------------------
// // // //   // const handleGenerateNotebook = async () => {
// // // //   //   if (!currentChat || !userId) {
// // // //   //     console.error('User ID or Current Chat not available.');
// // // //   //     return;
// // // //   //   }

// // // //   //   setIsGeneratingNotebook(true);
// // // //   //   console.log('Generating notebook....................................');
// // // //   //   console.log(userId.toString());
// // // //   //   console.log(currentChat.id);

// // // //   //   try {
// // // //   //     const response = await fetch('http://localhost:8000/api/chatgpt/', {
// // // //   //       method: 'POST',
// // // //   //       headers: { 'Content-Type': 'application/json' },
// // // //   //       body: JSON.stringify({
// // // //   //         action: 'generate_notebook',
// // // //   //         user_id: userId.toString(),
// // // //   //         chat_id: currentChat.id,
// // // //   //       }),
// // // //   //     });

// // // //   //     if (!response.ok) {
// // // //   //       throw new Error(`Failed to generate notebook: ${response.statusText}`);
// // // //   //     }

// // // //   //     const data = await response.json();
// // // //   //     console.log('[DEBUG] Notebook generated:', data);

// // // //   //     if (data.notebooks) {
// // // //   //       // setGeneratedNotebookData(data.notebooks);
// // // //   //       // setNotebookGenerated(true);
// // // //   //       // setGeneratedFileUrl(data.file_url);
// // // //   //       // setGeneratedTargetColumn(data.target_column);
// // // //   //       // setGeneratedEntityColumn(data.entity_column);
// // // //   //       // setGeneratedFeatures(data.features);
// // // //   //       // setGeneratedUserId(data.user_id);
// // // //   //       // setGeneratedChatId(data.chat_id);

// // // //   //       const notebookMessage: Message = {
// // // //   //         id: uuidv4(),
// // // //   //         sender: 'assistant',
// // // //   //         text: 'Notebook has been generated successfully.',
// // // //   //         timestamp: formatTimestamp(new Date().toISOString()),
// // // //   //         animated: true,
// // // //   //         button: true, // Show "Open Notebook" button
// // // //   //       };

// // // //   //       setChats((prevChats) =>
// // // //   //         prevChats.map((chat) =>
// // // //   //           chat.id === currentChat.id
// // // //   //             ? { ...chat, messages: [...chat.messages, notebookMessage] }
// // // //   //             : chat
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

// // // //   // Handle creating a new chat
// // // // const handleNewChat = () => {
// // // //   const newChat: Chat = {
// // // //     id: '',
// // // //     title: 'New Prediction',
// // // //     timestamp: new Date().toLocaleString(),
// // // //     messages: [
// // // //       {
// // // //         id: uuidv4(),
// // // //         sender: 'assistant',
// // // //         text: defaultMessage,
// // // //         timestamp: formatTimestamp(new Date().toISOString()),
// // // //         animated: true,
// // // //       },
// // // //     ],
// // // //     isHistory: false,
// // // //   };
// // // //   setChats((prev) => [newChat, ...prev]);
// // // //   setCurrentChat(newChat);

// // // //   setIsGeneratingNotebook(false);
// // // //   setNotebookGenerated(false);
// // // //   setGeneratedNotebookData(null); // This can be removed if not needed elsewhere
// // // // };

// // // // // ---------------------------------------------------------------------------
// // // // // Generate Notebook
// // // // // ---------------------------------------------------------------------------
// // // // const handleGenerateNotebook = async () => {
// // // //   if (!currentChat || !userId) {
// // // //     console.error('User ID or Current Chat not available.');
// // // //     return;
// // // //   }

// // // //   setIsGeneratingNotebook(true);
// // // //   console.log('Generating notebook....................................');
// // // //   console.log(userId.toString());
// // // //   console.log(currentChat.id);
// // // //   setGeneratedUserId(userId.toString());
// // // //   setGeneratedChatId(currentChat.id);
// // // //   console.log('Generated User ID setting:', generatedUserId);
// // // //   console.log('Generated Chat ID setting:', generatedChatId);

// // // //   try {
// // // //     const response = await fetch('http://localhost:8000/api/chatgpt/', {
// // // //       method: 'POST',
// // // //       headers: { 'Content-Type': 'application/json' },
// // // //       body: JSON.stringify({
// // // //         action: 'generate_notebook',
// // // //         user_id: userId.toString(),
// // // //         chat_id: currentChat.id,
// // // //       }),
// // // //     });

// // // //     if (!response.ok) {
// // // //       throw new Error(`Failed to generate notebook: ${response.statusText}`);
// // // //     }

// // // //      // If the response is OK, set notebook generation status to true
// // // //     setNotebookGenerated(true);
     

// // // //     // Parse the response to ensure success
// // // //     const data = await response.json();
// // // //     console.log('[DEBUG] Notebook generation response:', data);
// // // //     // setGeneratedUserId(data.user_id);
// // // //     // setGeneratedChatId(data.chat_id);

// // // //     // Update chat with a success message
// // // //     const notebookMessage: Message = {
// // // //       id: uuidv4(),
// // // //       sender: 'assistant',
// // // //       text: 'Notebook has been generated and saved successfully.',
// // // //       timestamp: formatTimestamp(new Date().toISOString()),
// // // //       animated: true,
// // // //     };

// // // //     setChats((prevChats) =>
// // // //       prevChats.map((chat) =>
// // // //         chat.id === currentChat.id
// // // //           ? { ...chat, messages: [...chat.messages, notebookMessage] }
// // // //           : chat
// // // //       )
// // // //     );

// // // //     setCurrentChat((prevChat) =>
// // // //       prevChat ? { ...prevChat, messages: [...prevChat.messages, notebookMessage] } : null
// // // //     );
// // // //   } catch (error) {
// // // //     console.error('Error generating notebook:', error);
// // // //     alert('Error generating notebook. Please try again.');
// // // //   } finally {
// // // //     setIsGeneratingNotebook(false);
// // // //   }
// // // // };



  

// // // //   // ---------------------------------------------------------------------------
// // // //   // Open Notebook
// // // //   // ---------------------------------------------------------------------------
// // // //   // const handleOpenNotebook = () => {
// // // //   //   if (generatedNotebookData) {
// // // //   //     navigate('/notebook', {
// // // //   //       state: {
// // // //   //         notebooks: generatedNotebookData,
// // // //   //         file_url: generatedFileUrl,
// // // //   //         entity_column: generatedEntityColumn,
// // // //   //         target_column: generatedTargetColumn,
// // // //   //         features: generatedFeatures,
// // // //   //         user_id: generatedUserId,
// // // //   //         
// // // //   chat_id:"a8ec6a0f-8bd0-4fbb-8ffa-589a9bad53a3"
// // // //   //         isTrained: false, // Initially not trained
// // // //   //       }
// // // //   //     });
// // // //   //   } else {
// // // //   //     alert('No notebook data available.');
// // // //   //   }
// // // //   // };


// // // //   // const handleOpenNotebook = () => {
// // // //   //   console.log('Opening notebook...');
// // // //   //   console.log('Generated User ID:', generatedUserId);
// // // //   //   console.log('Generated Chat ID:', generatedChatId);
// // // //   //   navigate('/notebook', {
// // // //   //     state: {
// // // //   //       user_id: 9,
// // // //   //       // chat_id: generatedChatId,
// // // //   //       chat_id:"a8ec6a0f-8bd0-4fbb-8ffa-589a9bad53a3",
// // // //   //       isTrained: false, // Initially not trained
// // // //   //     },
// // // //   //   });
// // // //   //   // if (generatedUserId && generatedChatId) {
// // // //   //   //   navigate('/notebook', {
// // // //   //   //     state: {
// // // //   //   //       user_id: 9,
// // // //   //   //       // chat_id: generatedChatId,
// // // //   //   //       chat_id:"a8ec6a0f-8bd0-4fbb-8ffa-589a9bad53a3",
// // // //   //   //       isTrained: false, // Initially not trained
// // // //   //   //     },
// // // //   //   //   });
// // // //   //   // } else {
// // // //   //   //   alert('User ID or Chat ID is missing.');
// // // //   //   // }
// // // //   // };

// // // //   const handleOpenNotebook = () => {
// // // //     console.log('Opening notebook...');
// // // //     console.log('Generated User ID:', generatedUserId);
// // // //     console.log('Generated Chat ID:', generatedChatId);
// // // //     navigate(`/notebook/${generatedUserId}/${generatedChatId}`, {
// // // //       // navigate(`/notebook/9/977f5ec5-7b5f-45fa-949d-f850343ec322`, {
// // // //       state: {
// // // //         isTrained: false, // Initially not trained
// // // //       },
// // // //     });
// // // //   };

// // // //   // ---------------------------------------------------------------------------
// // // //   // Reset Chat
// // // //   // ---------------------------------------------------------------------------
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

// // // //   const handleReset = async () => {
// // // //     try {
// // // //       await resetChat(userId?.toString() || 'default_user');
// // // //       const initialChat: Chat = {
// // // //         id: '',
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

// // // //   // ---------------------------------------------------------------------------
// // // //   // Render
// // // //   // ---------------------------------------------------------------------------
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
// // // //                           // className="px-4 py-2 bg-teal-700 text-white text-xs rounded hover:bg-teal-600"
// // // //                           className="px-4 py-2 bg-teal-700 text-white text-xs rounded shadow-lg hover:bg-teal-600 transform hover:scale-105 transition-transform duration-300"
// // // //                         >
// // // //                           Open Notebook
// // // //                         </button>
// // // //                       ) : (
// // // //                         <button
// // // //                           onClick={handleGenerateNotebook}
// // // //                           // className="px-4 py-2 bg-teal-700 text-white text-xs rounded hover:bg-teal-600"
// // // //                           className="px-4 py-2 bg-teal-700 text-white text-xs rounded shadow-lg hover:bg-teal-600 transform hover:scale-105 transition-transform duration-300"
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
// // // //   const defaultMessage = `Hi! 👋 I'm your AI assistant.
// // // // I'll assist you in formulating a predictive question. I'll then create a SQL notebook to build a training set.
// // // // So, what would you like to predict?`;

// // // //   const { user, loading } = useAuth();
// // // //   const userId = user?.id;

// // // //   const [chats, setChats] = useState<Chat[]>([]);
// // // //   const [currentChat, setCurrentChat] = useState<Chat | null>(null);
// // // //   const [showSidebar, setShowSidebar] = useState(true);
// // // //   const [inputMessage, setInputMessage] = useState('');
// // // //   const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);

// // // //   const [isLoading, setIsLoading] = useState(false);
// // // //   const [isUploading, setIsUploading] = useState(false);

// // // //   const [isGeneratingNotebook, setIsGeneratingNotebook] = useState(false);
// // // //   const [notebookGenerated, setNotebookGenerated] = useState(false);
// // // //   const [generatedNotebookData, setGeneratedNotebookData] = useState<any>(null);
// // // //   const [generatedFileUrl, setGeneratedFileUrl] = useState<string>('');
// // // //   const [generatedTargetColumn, setGeneratedTargetColumn] = useState<string>('');
// // // //   const [generatedEntityColumn, setGeneratedEntityColumn] = useState<string>('');
// // // //   const [generatedFeatures, setGeneratedFeatures] = useState<string[]>([]);
// // // //   const [generatedUserId, setGeneratedUserId] = useState<string>('');
// // // //   const [generatedChatId, setGeneratedChatId] = useState<string>('');

// // // //   const navigate = useNavigate();
// // // //   const messagesEndRef = useRef<HTMLDivElement | null>(null);

// // // //   const scrollToBottom = () => {
// // // //     messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
// // // //   };

// // // //   useEffect(() => {
// // // //     scrollToBottom();
// // // //   }, [currentChat?.messages, isLoading, isUploading]);

// // // //   // ---------------------------------------------------------------------------
// // // //   // Fetch Chat History
// // // //   // ---------------------------------------------------------------------------
// // // //   const fetchChatHistory = async (user_id: string): Promise<Chat[]> => {
// // // //     const response = await fetch(`http://localhost:8000/api/chat_history/?user_id=${user_id}`);
// // // //     if (!response.ok) {
// // // //       throw new Error('Failed to fetch chat history');
// // // //     }
// // // //     const data = await response.json();

// // // //     const chatsFromBackend: Chat[] = data.map((chatObj: any) => {
// // // //       const mergedMessages = [
// // // //         ...chatObj.user_messages.map((um: any) => ({
// // // //           sender: 'user',
// // // //           text: um.text,
// // // //           timestamp: um.timestamp,
// // // //         })),
// // // //         ...chatObj.assistant_messages.map((am: any) => ({
// // // //           sender: 'assistant',
// // // //           text: am.text,
// // // //           timestamp: am.timestamp,
// // // //         })),
// // // //       ];

// // // //       mergedMessages.sort((a: any, b: any) => {
// // // //         return new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime();
// // // //       });

// // // //       const messages: Message[] = mergedMessages.map((msg: any) => ({
// // // //         id: uuidv4(),
// // // //         sender: msg.sender as 'user' | 'assistant',
// // // //         text: msg.text,
// // // //         timestamp: msg.timestamp,
// // // //         animated: false,
// // // //       }));

// // // //       return {
// // // //         id: chatObj.chat_id || uuidv4(),
// // // //         title: chatObj.title,
// // // //         timestamp: new Date().toLocaleString(),
// // // //         messages,
// // // //         isHistory: false,
// // // //       };
// // // //     });

// // // //     return chatsFromBackend;
// // // //   };

// // // //   const fetchAndInitializeChats = async () => {
// // // //     try {
// // // //       if (!userId) {
// // // //         initializeDefaultChat();
// // // //         return;
// // // //       }
// // // //       const fetchedChats = await fetchChatHistory(userId.toString());
// // // //       if (fetchedChats.length > 0) {
// // // //         setChats(fetchedChats);
// // // //         setCurrentChat(fetchedChats[0]);
// // // //       } else {
// // // //         initializeDefaultChat();
// // // //       }
// // // //     } catch (error) {
// // // //       console.error("Error fetching chat history:", error);
// // // //       initializeDefaultChat();
// // // //     }
// // // //   };

// // // //   const initializeDefaultChat = () => {
// // // //     const initialChat: Chat = {
// // // //       id: uuidv4(),
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
// // // //     setChats([initialChat]);
// // // //     setCurrentChat(initialChat);
// // // //   };

// // // //   useEffect(() => {
// // // //     fetchAndInitializeChats();
// // // //     // eslint-disable-next-line react-hooks/exhaustive-deps
// // // //   }, [userId]);

// // // //   // ---------------------------------------------------------------------------
// // // //   // Upload Files
// // // //   // ---------------------------------------------------------------------------
// // // //   const uploadFiles = async (files: FileList): Promise<any> => {
// // // //     const formData = new FormData();
// // // //     Array.from(files).forEach((file) => {
// // // //       formData.append('file', file);
// // // //     });
// // // //     if (currentChat && currentChat.id) {
// // // //       formData.append('chat_id', currentChat.id);
// // // //     }
// // // //     if (userId) {
// // // //       formData.append('user_id', userId.toString());
// // // //     }

// // // //     const response = await fetch(`http://localhost:8000/api/chatgpt/`, {
// // // //       method: 'POST',
// // // //       body: formData,
// // // //     });

// // // //     if (!response.ok) {
// // // //       throw new Error('Failed to upload files');
// // // //     }
// // // //     return response.json();
// // // //   };

// // // //   const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
// // // //     const files = e.target.files;
// // // //     if (files && files.length > 0) {
// // // //       setSelectedFiles(files);
// // // //     }
// // // //   };

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

// // // //         const hasDateColumn = uploadedFile.has_date_column;
// // // //         const dateColumns = uploadedFile.date_columns || [];
// // // //         console.log('[DEBUG] hasDateColumn:', hasDateColumn);
// // // //         console.log('[DEBUG] dateColumns:', dateColumns);

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

// // // //           let confirmationText = `
// // // // Suggested Target Column: ${suggestions.target_column}
// // // // Suggested Entity ID Column: ${suggestions.entity_id_column}
// // // // Suggested Feature Columns: ${suggestions.feature_columns.join(', ')}

// // // // Please confirm:
// // // // - Is the Target Column correct?
// // // // - Is the Entity ID Column correct?
// // // // (Reply 'yes' to confirm or provide corrections as needed)
// // // //           `.trim();

// // // //           if (hasDateColumn) {
// // // //             if (dateColumns.length === 1) {
// // // //               confirmationText += `
// // // // We detected 1 date column: ${dateColumns[0]}.
// // // // If you'd like a time-based approach, you can confirm with 'yes' or specify a different date column.
// // // // You can also explicitly say "Time Column: ${dateColumns[0]}".
// // // //               `.trim();
// // // //             } else if (dateColumns.length > 1) {
// // // //               confirmationText += `
// // // // We detected multiple date columns: ${dateColumns.join(', ')}.
// // // // Please specify which one should be used for the time-based approach using:
// // // // "Time Column: <column_name>"
// // // //               `.trim();
// // // //             }
// // // //           } else {
// // // //             confirmationText += `
// // // // No date column was detected, so we'll proceed with a non-time-based approach.
// // // //             `.trim();
// // // //           }

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

// // // //   // ---------------------------------------------------------------------------
// // // //   // Send Message
// // // //   // ---------------------------------------------------------------------------
// // // //   const sendMessage = async (message: string, user_id: string, chat_id?: string): Promise<any> => {
// // // //     const response = await fetch(`http://localhost:8000/api/chatgpt/`, {
// // // //       method: 'POST',
// // // //       headers: { 'Content-Type': 'application/json' },
// // // //       body: JSON.stringify({ message, user_id, chat_id }),
// // // //     });

// // // //     if (!response.ok) {
// // // //       throw new Error('Failed to send message');
// // // //     }
// // // //     return response.json();
// // // //   };

// // // //   const handleSendMessage = async () => {
// // // //     if (!inputMessage.trim()) return;
// // // //     if (!currentChat) return;

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
// // // //       const data = await sendMessage(
// // // //         userMessage.text,
// // // //         userId?.toString() || 'default_user',
// // // //         currentChat.id
// // // //       );

// // // //       console.log("[DEBUG] handleSendMessage data =>", data);
// // // //       // data.response is now guaranteed to be a plain string (from the backend fix)
// // // //       const responseText = typeof data.response === 'string' ? data.response : String(data.response);

// // // //       const newChatId = data.chat_id || currentChat.id;
// // // //       const showGenerateButton = data.show_generate_notebook || false;

// // // //       const botMessage: Message = {
// // // //         id: uuidv4(),
// // // //         sender: 'assistant',
// // // //         text: responseText,
// // // //         timestamp: formatTimestamp(new Date().toISOString()),
// // // //         animated: true,
// // // //         button: showGenerateButton,
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

// // // //   // ---------------------------------------------------------------------------
// // // //   // Handle creating a new chat
// // // //   // ---------------------------------------------------------------------------
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

// // // //   // ---------------------------------------------------------------------------
// // // //   // Generate Notebook
// // // //   // ---------------------------------------------------------------------------
// // // //   const handleGenerateNotebook = async () => {
// // // //     if (!currentChat || !userId) {
// // // //       console.error('User ID or Current Chat not available.');
// // // //       return;
// // // //     }

// // // //     setIsGeneratingNotebook(true);
// // // //     console.log('Generating notebook...');
// // // //     setGeneratedUserId(userId.toString());
// // // //     setGeneratedChatId(currentChat.id);

// // // //     try {
// // // //       const response = await fetch('http://localhost:8000/api/chatgpt/', {
// // // //         method: 'POST',
// // // //         headers: { 'Content-Type': 'application/json' },
// // // //         body: JSON.stringify({
// // // //           action: 'generate_notebook',
// // // //           user_id: userId.toString(),
// // // //           chat_id: currentChat.id,
// // // //         }),
// // // //       });

// // // //       if (!response.ok) {
// // // //         throw new Error(`Failed to generate notebook: ${response.statusText}`);
// // // //       }

// // // //       setNotebookGenerated(true);

// // // //       const data = await response.json();
// // // //       console.log('[DEBUG] Notebook generation response:', data);

// // // //       const notebookMessage: Message = {
// // // //         id: uuidv4(),
// // // //         sender: 'assistant',
// // // //         text: 'Notebook has been generated and saved successfully.',
// // // //         timestamp: formatTimestamp(new Date().toISOString()),
// // // //         animated: true,
// // // //       };

// // // //       setChats((prevChats) =>
// // // //         prevChats.map((chat) =>
// // // //           chat.id === currentChat.id
// // // //             ? { ...chat, messages: [...chat.messages, notebookMessage] }
// // // //             : chat
// // // //         )
// // // //       );

// // // //       setCurrentChat((prevChat) =>
// // // //         prevChat ? { ...prevChat, messages: [...prevChat.messages, notebookMessage] } : null
// // // //       );
// // // //     } catch (error) {
// // // //       console.error('Error generating notebook:', error);
// // // //       alert('Error generating notebook. Please try again.');
// // // //     } finally {
// // // //       setIsGeneratingNotebook(false);
// // // //     }
// // // //   };

// // // //   // ---------------------------------------------------------------------------
// // // //   // Open Notebook
// // // //   // ---------------------------------------------------------------------------
// // // //   const handleOpenNotebook = () => {
// // // //     console.log('Opening notebook...');
// // // //     navigate(`/notebook/${generatedUserId}/${generatedChatId}`, {
// // // //       state: {
// // // //         isTrained: false,
// // // //       },
// // // //     });
// // // //   };

// // // //   // ---------------------------------------------------------------------------
// // // //   // Reset Chat
// // // //   // ---------------------------------------------------------------------------
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

// // // //   const handleReset = async () => {
// // // //     try {
// // // //       await resetChat(userId?.toString() || 'default_user');
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

// // // //   // ---------------------------------------------------------------------------
// // // //   // Render
// // // //   // ---------------------------------------------------------------------------
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
// // // //               {chats.map((chat, index) => (
// // // //                 <div
// // // //                   key={chat.id || `${chat.title}-${index}`}
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
// // // //                     className={`text-[10px] mt-1 ${message.sender === 'user' ? 'text-teal-300' : 'text-gray-400'}`}
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
// // // //                           className="px-4 py-2 bg-teal-700 text-white text-xs rounded shadow-lg hover:bg-teal-600 transform hover:scale-105 transition-transform duration-300"
// // // //                         >
// // // //                           Open Notebook
// // // //                         </button>
// // // //                       ) : (
// // // //                         <button
// // // //                           onClick={handleGenerateNotebook}
// // // //                           className="px-4 py-2 bg-teal-700 text-white text-xs rounded shadow-lg hover:bg-teal-600 transform hover:scale-105 transition-transform duration-300"
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
// // // //               {Array.from(selectedFiles).map((file, index) => (
// // // //                 <div key={`${file.name}-${index}`} className="flex flex-col gap-2 bg-white px-2 py-2 rounded border text-xs">
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
// // // //               className={`cursor-pointer text-gray-400 hover:text-gray-600 ${isHistoryChat ? 'opacity-50 cursor-not-allowed' : ''}`}
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
// // // // const AnimatedMessage: React.FC<{ text: any; sender: 'user' | 'assistant'; animated?: boolean; }> = ({ text, sender, animated }) => {
// // // //   const stringText = typeof text === 'string' ? text : String(text);
// // // //   const [displayedText, setDisplayedText] = useState('');
// // // //   const indexRef = useRef(0);

// // // //   // useEffect(() => {
// // // //   //   if (animated && sender === 'assistant') {
// // // //   //     const interval = setInterval(() => {
// // // //   //       setDisplayedText((prev) => prev + stringText.charAt(indexRef.current));
// // // //   //       indexRef.current += 1;
// // // //   //       if (indexRef.current >= stringText.length) {
// // // //   //         clearInterval(interval);
// // // //   //       }
// // // //   //     }, 10);
// // // //   //     return () => clearInterval(interval);
// // // //   //   } else {
// // // //   //     setDisplayedText(stringText);
// // // //   //   }
// // // //   // }, [stringText, sender, animated]);
// // // //   useEffect(() => {
// // // //     if (animated && sender === 'assistant') {
// // // //         const interval = setInterval(() => {
// // // //             setDisplayedText((prev) => prev + stringText.charAt(indexRef.current));
// // // //             indexRef.current += 1;
// // // //             if (indexRef.current >= stringText.length) {
// // // //                 clearInterval(interval);
// // // //             }
// // // //         }, 10); // Adjust the interval timing if necessary
// // // //         return () => clearInterval(interval);
// // // //     } else {
// // // //         setDisplayedText(stringText);
// // // //     }
// // // // }, [stringText, sender, animated]);

// // // //   return <pre className="whitespace-pre-wrap font-sans">{displayedText}</pre>;
// // // // };

// // // // const SchemaTable: React.FC<{ schema: Array<{ column_name: string; data_type: string }>; }> = ({ schema }) => {
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
// // // //             <tr key={`${field.column_name}-${index}`} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
// // // //               <td className="px-4 py-2 border-b text-xs text-gray-600">{field.column_name}</td>
// // // //               <td className="px-4 py-2 border-b text-xs text-gray-600">{field.data_type}</td>
// // // //             </tr>
// // // //           ))}
// // // //         </tbody>
// // // //       </table>
// // // //     </div>
// // // //   );
// // // // };

// // // // const parseSchema = (message: Message): Array<{ column_name: string; data_type: string }> | null => {
// // // //   if (!message.isSchema || !message.schema) return null;
// // // //   return message.schema;
// // // // };

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






// // // // working code


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
// // //   id: string;
// // //   title: string;
// // //   timestamp: string;
// // //   messages: Message[];
// // //   isHistory?: boolean;
// // // }

// // // const ChatInterface: React.FC = () => {
// // //   const defaultMessage = `Hi! 👋 I'm your AI assistant.
// // // I'll assist you in formulating a predictive question. I'll then create a SQL notebook to build a training set.
// // // So, what would you like to predict?`;

// // //   const { user, loading } = useAuth();
// // //   const userId = user?.id;

// // //   const [chats, setChats] = useState<Chat[]>([]);
// // //   const [currentChat, setCurrentChat] = useState<Chat | null>(null);
// // //   const [showSidebar, setShowSidebar] = useState(true);
// // //   const [inputMessage, setInputMessage] = useState('');
// // //   const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);

// // //   const [isLoading, setIsLoading] = useState(false);
// // //   const [isUploading, setIsUploading] = useState(false);

// // //   const [isGeneratingNotebook, setIsGeneratingNotebook] = useState(false);
// // //   const [notebookGenerated, setNotebookGenerated] = useState(false);
// // //   const [generatedNotebookData, setGeneratedNotebookData] = useState<any>(null);

// // //   // For notebook navigation (stored upon generation success)
// // //   const [generatedUserId, setGeneratedUserId] = useState<string>('');
// // //   const [generatedChatId, setGeneratedChatId] = useState<string>('');

// // //   const navigate = useNavigate();
// // //   const messagesEndRef = useRef<HTMLDivElement | null>(null);

// // //   const scrollToBottom = () => {
// // //     messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
// // //   };

// // //   useEffect(() => {
// // //     scrollToBottom();
// // //   }, [currentChat?.messages, isLoading, isUploading]);

// // //   // ---------------------------------------------------------------------------
// // //   // Fetch Chat History
// // //   // ---------------------------------------------------------------------------
// // //   interface BackendChatData {
// // //     chat_id: string;
// // //     title: string;
// // //     user_messages: Array<{
// // //       text: string;
// // //       timestamp: string;
// // //     }>;
// // //     assistant_messages: Array<{
// // //       text: string;
// // //       timestamp: string;
// // //     }>;
// // //   }

// // //   const fetchChatHistory = async (user_id: string): Promise<Chat[]> => {
// // //     const response = await fetch(`http://localhost:8000/api/chat_history/?user_id=${user_id}`);
// // //     if (!response.ok) {
// // //       throw new Error('Failed to fetch chat history');
// // //     }
// // //     const data = await response.json();

// // //     const chatsFromBackend: Chat[] = data.map((chatObj: BackendChatData) => {
// // //       const mergedMessages = [
// // //         ...chatObj.user_messages.map((um) => ({
// // //           sender: 'user' as const,
// // //           text: um.text,
// // //           timestamp: um.timestamp,
// // //         })),
// // //         ...chatObj.assistant_messages.map((am) => ({
// // //           sender: 'assistant' as const,
// // //           text: am.text,
// // //           timestamp: am.timestamp,
// // //         })),
// // //       ];

// // //       mergedMessages.sort((a, b) => {
// // //         return new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime();
// // //       });

// // //       const messages: Message[] = mergedMessages.map((msg) => ({
// // //         id: uuidv4(),
// // //         sender: msg.sender,
// // //         text: msg.text,
// // //         timestamp: msg.timestamp,
// // //         animated: false,
// // //       }));

// // //       return {
// // //         id: chatObj.chat_id || uuidv4(),
// // //         title: chatObj.title,
// // //         timestamp: new Date().toLocaleString(),
// // //         messages,
// // //         isHistory: false,
// // //       };
// // //     });

// // //     return chatsFromBackend;
// // //   };

// // //   const fetchAndInitializeChats = async () => {
// // //     try {
// // //       if (!userId) {
// // //         initializeDefaultChat();
// // //         return;
// // //       }
// // //       const fetchedChats = await fetchChatHistory(userId.toString());
// // //       if (fetchedChats.length > 0) {
// // //         setChats(fetchedChats);
// // //         setCurrentChat(fetchedChats[0]);
// // //       } else {
// // //         initializeDefaultChat();
// // //       }
// // //     } catch (error) {
// // //       console.error("Error fetching chat history:", error);
// // //       initializeDefaultChat();
// // //     }
// // //   };

// // //   const initializeDefaultChat = () => {
// // //     const initialChat: Chat = {
// // //       id: uuidv4(),
// // //       title: 'New Prediction',
// // //       timestamp: new Date().toLocaleString(),
// // //       messages: [
// // //         {
// // //           id: uuidv4(),
// // //           sender: 'assistant',
// // //           text: defaultMessage,
// // //           timestamp: formatTimestamp(new Date().toISOString()),
// // //           // animated: true,
// // //           animated: false,
// // //         },
// // //       ],
// // //       isHistory: false,
// // //     };
// // //     setChats([initialChat]);
// // //     setCurrentChat(initialChat);
// // //   };

// // //   useEffect(() => {
// // //     fetchAndInitializeChats();
// // //     // eslint-disable-next-line react-hooks/exhaustive-deps
// // //   }, [userId]);

// // //   // ---------------------------------------------------------------------------
// // //   // Upload Files
// // //   // ---------------------------------------------------------------------------
// // //   const uploadFiles = async (files: FileList): Promise<any> => {
// // //     const formData = new FormData();
// // //     Array.from(files).forEach((file) => {
// // //       formData.append('file', file);
// // //     });
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
// // //     return response.json();
// // //   };

// // //   const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
// // //     const files = e.target.files;
// // //     if (files && files.length > 0) {
// // //       setSelectedFiles(files);
// // //     }
// // //   };

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

// // //         const hasDateColumn = uploadedFile.has_date_column;
// // //         const dateColumns = uploadedFile.date_columns || [];
// // //         console.log('[DEBUG] hasDateColumn:', hasDateColumn);
// // //         console.log('[DEBUG] dateColumns:', dateColumns);

// // //         if (schema && schema.length > 0) {
// // //           const schemaMessage: Message = {
// // //             id: uuidv4(),
// // //             sender: 'assistant',
// // //             text: 'Dataset uploaded successfully! Below is the schema:',
// // //             timestamp: formatTimestamp(new Date().toISOString()),
// // //             isSchema: true,
// // //             schema: schema,
// // //             // animated: true,
// // //             animated: false,
// // //           };

// // //           let confirmationText = `
// // // Suggested Target Column: ${suggestions.target_column}
// // // Suggested Entity ID Column: ${suggestions.entity_id_column}
// // // Suggested Feature Columns: ${suggestions.feature_columns.join(', ')}

// // // Please confirm:
// // // - Is the Target Column correct?
// // // - Is the Entity ID Column correct?
// // // (Reply 'yes' to confirm or provide corrections as needed)
// // //           `.trim();

// // //           if (hasDateColumn) {
// // //             if (dateColumns.length === 1) {
// // //               confirmationText += `
// // // We detected 1 date column: ${dateColumns[0]}.
// // // If you'd like a time-based approach, you can confirm with 'yes' or specify a different date column.
// // // You can also explicitly say "Time Column: ${dateColumns[0]}".  
// // //               `.trim();
// // //             } else if (dateColumns.length > 1) {
// // //               confirmationText += `
// // // We detected multiple date columns: ${dateColumns.join(', ')}.
// // // Please specify which one should be used for the time-based approach using:
// // // "Time Column: <column_name>"
// // //               `.trim();
// // //             }
// // //           } else {
// // //             confirmationText += `
// // // No date column was detected, so we'll proceed with a non-time-based approach.
// // //             `.trim();
// // //           }

// // //           const confirmationMessage: Message = {
// // //             id: uuidv4(),
// // //             sender: 'assistant',
// // //             text: confirmationText,
// // //             timestamp: formatTimestamp(new Date().toISOString()),
// // //             // animated: true,
// // //             animated: false,
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
// // //         // animated: true,
// // //         animated: false,
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

// // //   // ---------------------------------------------------------------------------
// // //   // Send Message
// // //   // ---------------------------------------------------------------------------
// // //   const sendMessage = async (message: string, user_id: string, chat_id?: string): Promise<any> => {
// // //     const response = await fetch(`http://localhost:8000/api/chatgpt/`, {
// // //       method: 'POST',
// // //       headers: { 'Content-Type': 'application/json' },
// // //       body: JSON.stringify({ message, user_id, chat_id }),
// // //     });

// // //     if (!response.ok) {
// // //       throw new Error('Failed to send message');
// // //     }
// // //     return response.json();
// // //   };

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
// // //       const data = await sendMessage(
// // //         userMessage.text,
// // //         userId?.toString() || 'default_user',
// // //         currentChat.id
// // //       );

// // //       console.log("[DEBUG] handleSendMessage data =>", data);

// // //       // The updated backend sends: { response: <string>, chat_id: <string>, show_generate_notebook: <boolean> }
// // //       const responseText = typeof data.response === 'string' ? data.response : String(data.response);

// // //       const newChatId = data.chat_id || currentChat.id;
// // //       const showGenerateButton = data.show_generate_notebook || false;

// // //       const botMessage: Message = {
// // //         id: uuidv4(),
// // //         sender: 'assistant',
// // //         text: responseText,
// // //         timestamp: formatTimestamp(new Date().toISOString()),
// // //         // animated: true,
// // //         animated: false,
// // //         button: showGenerateButton,
// // //       };

// // //       const updatedMessages = [...updatedChat.messages, botMessage];

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
// // //         // animated: true,
// // //         animated: false,
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

// // //   // ---------------------------------------------------------------------------
// // //   // Handle creating a new chat
// // //   // ---------------------------------------------------------------------------
// // //   const handleNewChat = () => {
// // //     const newChat: Chat = {
// // //       id: uuidv4(),
// // //       title: 'New Prediction',
// // //       timestamp: new Date().toLocaleString(),
// // //       messages: [
// // //         {
// // //           id: uuidv4(),
// // //           sender: 'assistant',
// // //           text: defaultMessage,
// // //           timestamp: formatTimestamp(new Date().toISOString()),
// // //           // animated: true,
// // //           animated: false,
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

// // //   // ---------------------------------------------------------------------------
// // //   // Generate Notebook
// // //   // ---------------------------------------------------------------------------
// // //   const handleGenerateNotebook = async () => {
// // //     if (!currentChat || !userId) {
// // //       console.error('User ID or Current Chat not available.');
// // //       return;
// // //     }

// // //     setIsGeneratingNotebook(true);
// // //     console.log('Generating notebook...');
// // //     setGeneratedUserId(userId.toString());
// // //     setGeneratedChatId(currentChat.id);

// // //     try {
// // //       const response = await fetch('http://localhost:8000/api/chatgpt/', {
// // //         method: 'POST',
// // //         headers: { 'Content-Type': 'application/json' },
// // //         body: JSON.stringify({
// // //           action: 'generate_notebook',
// // //           user_id: userId.toString(),
// // //           chat_id: currentChat.id,
// // //         }),
// // //       });

// // //       if (!response.ok) {
// // //         throw new Error(`Failed to generate notebook: ${response.statusText}`);
// // //       }

// // //       setNotebookGenerated(true);

// // //       const data = await response.json();
// // //       console.log('[DEBUG] Notebook generation response:', data);

// // //       // We assume notebook generation was successful; you can extract fields if needed

// // //       const notebookMessage: Message = {
// // //         id: uuidv4(),
// // //         sender: 'assistant',
// // //         text: data.message || 'Notebook has been generated and saved successfully.',
// // //         timestamp: formatTimestamp(new Date().toISOString()),
// // //         // animated: true,
// // //         animated: false,
// // //       };

// // //       setChats((prevChats) =>
// // //         prevChats.map((chat) =>
// // //           chat.id === currentChat.id
// // //             ? { ...chat, messages: [...chat.messages, notebookMessage] }
// // //             : chat
// // //         )
// // //       );

// // //       setCurrentChat((prevChat) =>
// // //         prevChat ? { ...prevChat, messages: [...prevChat.messages, notebookMessage] } : null
// // //       );
// // //     } catch (error) {
// // //       console.error('Error generating notebook:', error);
// // //       alert('Error generating notebook. Please try again.');
// // //     } finally {
// // //       setIsGeneratingNotebook(false);
// // //     }
// // //   };

// // //   // ---------------------------------------------------------------------------
// // //   // Open Notebook
// // //   // ---------------------------------------------------------------------------
// // //   const handleOpenNotebook = () => {
// // //     console.log('Opening notebook...');
// // //     navigate(`/notebook/${generatedUserId}/${generatedChatId}`, {
// // //       state: {
// // //         isTrained: false,
// // //       },
// // //     });
// // //   };

// // //   // ---------------------------------------------------------------------------
// // //   // Reset Chat
// // //   // ---------------------------------------------------------------------------
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

// // //   const handleReset = async () => {
// // //     try {
// // //       await resetChat(userId?.toString() || 'default_user');
// // //       const initialChat: Chat = {
// // //         id: uuidv4(),
// // //         title: 'New Prediction',
// // //         timestamp: new Date().toLocaleString(),
// // //         messages: [
// // //           {
// // //             id: uuidv4(),
// // //             sender: 'assistant',
// // //             text: defaultMessage,
// // //             timestamp: formatTimestamp(new Date().toISOString()),
// // //             // animated: true,
// // //             animated: false,
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

// // //   // ---------------------------------------------------------------------------
// // //   // Render
// // //   // ---------------------------------------------------------------------------
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
// // //               {chats.map((chat, index) => (
// // //                 <div
// // //                   key={chat.id || `${chat.title}-${index}`}
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
// // //                           className="px-4 py-2 bg-teal-700 text-white text-xs rounded shadow-lg hover:bg-teal-600 transform hover:scale-105 transition-transform duration-300"
// // //                         >
// // //                           Open Notebook
// // //                         </button>
// // //                       ) : (
// // //                         <button
// // //                           onClick={handleGenerateNotebook}
// // //                           className="px-4 py-2 bg-teal-700 text-white text-xs rounded shadow-lg hover:bg-teal-600 transform hover:scale-105 transition-transform duration-300"
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
// // //               {Array.from(selectedFiles).map((file, index) => (
// // //                 <div key={`${file.name}-${index}`} className="flex flex-col gap-2 bg-white px-2 py-2 rounded border text-xs">
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
// // // // const AnimatedMessage: React.FC<{ text: any; sender: 'user' | 'assistant'; animated?: boolean }> = ({
// // // //   text,
// // // //   sender,
// // // //   animated,
// // // // }) => {
// // // //   const stringText = typeof text === 'string' ? text : String(text);
// // // //   const [displayedText, setDisplayedText] = useState('');
// // // //   const indexRef = useRef(0);

// // // //   useEffect(() => {
// // // //     if (animated && sender === 'assistant') {
// // // //       const interval = setInterval(() => {
// // // //         setDisplayedText((prev) => prev + stringText.charAt(indexRef.current));
// // // //         indexRef.current += 1;
// // // //         if (indexRef.current >= stringText.length) {
// // // //           clearInterval(interval);
// // // //         }
// // // //       }, 10); // Adjust the interval timing if necessary
// // // //       return () => clearInterval(interval);
// // // //     } else {
// // // //       setDisplayedText(stringText);
// // // //     }
// // // //   }, [stringText, sender, animated]);

// // // //   return <pre className="whitespace-pre-wrap font-sans">{displayedText}</pre>;
// // // // };
// // // const AnimatedMessage: React.FC<{ text: any; sender: 'user' | 'assistant'; animated?: boolean }> = ({
// // //   text,
// // //   sender,
// // //   animated,
// // // }) => {
// // //   // Convert text to string if it's not already
// // //   const stringText = typeof text === 'string' ? text : String(text);

// // //   // Directly return the full text without animation
// // //   return <>{stringText}</>;
// // // };

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
// // //             <tr
// // //               key={`${field.column_name}-${index}`}
// // //               className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}
// // //             >
// // //               <td className="px-4 py-2 border-b text-xs text-gray-600">{field.column_name}</td>
// // //               <td className="px-4 py-2 border-b text-xs text-gray-600">{field.data_type}</td>
// // //             </tr>
// // //           ))}
// // //         </tbody>
// // //       </table>
// // //     </div>
// // //   );
// // // };

// // // const parseSchema = (message: Message): Array<{ column_name: string; data_type: string }> | null => {
// // //   if (!message.isSchema || !message.schema) return null;
// // //   return message.schema;
// // // };

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



// // // working with text structure working with backend push
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
// //   id: string;
// //   title: string;
// //   timestamp: string;
// //   messages: Message[];
// //   isHistory?: boolean;
// // }

// // const ChatInterface: React.FC = () => {
// //   const defaultMessage = `Hi! 👋 I'm your AI assistant.
// // I'll assist you in formulating a predictive question. I'll then create a SQL notebook to build a training set.
// // So, what would you like to predict?`;

// //   const { user, loading } = useAuth();
// //   const userId = user?.id;

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

// //   // For notebook navigation (stored upon generation success)
// //   const [generatedUserId, setGeneratedUserId] = useState<string>('');
// //   const [generatedChatId, setGeneratedChatId] = useState<string>('');

// //   const navigate = useNavigate();
// //   const messagesEndRef = useRef<HTMLDivElement | null>(null);

// //   const scrollToBottom = () => {
// //     messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
// //   };

// //   useEffect(() => {
// //     scrollToBottom();
// //   }, [currentChat?.messages, isLoading, isUploading]);

// //   // ---------------------------------------------------------------------------
// //   // Fetch Chat History
// //   // ---------------------------------------------------------------------------
// //   interface BackendChatData {
// //     chat_id: string;
// //     title: string;
// //     user_messages: Array<{
// //       text: string;
// //       timestamp: string;
// //     }>;
// //     assistant_messages: Array<{
// //       text: string;
// //       timestamp: string;
// //     }>;
// //   }

// //   const fetchChatHistory = async (user_id: string): Promise<Chat[]> => {
// //     const response = await fetch(`http://localhost:8000/api/chat_history/?user_id=${user_id}`);
// //     if (!response.ok) {
// //       throw new Error('Failed to fetch chat history');
// //     }
// //     const data = await response.json();

// //     const chatsFromBackend: Chat[] = data.map((chatObj: BackendChatData) => {
// //       const mergedMessages = [
// //         ...chatObj.user_messages.map((um) => ({
// //           sender: 'user' as const,
// //           text: um.text,
// //           timestamp: um.timestamp,
// //         })),
// //         ...chatObj.assistant_messages.map((am) => ({
// //           sender: 'assistant' as const,
// //           text: am.text,
// //           timestamp: am.timestamp,
// //         })),
// //       ];

// //       mergedMessages.sort((a, b) => {
// //         return new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime();
// //       });

// //       const messages: Message[] = mergedMessages.map((msg) => ({
// //         id: uuidv4(),
// //         sender: msg.sender,
// //         text: msg.text,
// //         timestamp: msg.timestamp,
// //         animated: false,
// //       }));

// //       return {
// //         id: chatObj.chat_id || uuidv4(),
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
// //       id: uuidv4(),
// //       title: 'New Prediction',
// //       timestamp: new Date().toLocaleString(),
// //       messages: [
// //         {
// //           id: uuidv4(),
// //           sender: 'assistant',
// //           text: defaultMessage,
// //           timestamp: formatTimestamp(new Date().toISOString()),
// //           animated: false,
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

// //   // ---------------------------------------------------------------------------
// //   // Upload Files
// //   // ---------------------------------------------------------------------------
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
// //     return response.json();
// //   };

// //   const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
// //     const files = e.target.files;
// //     if (files && files.length > 0) {
// //       setSelectedFiles(files);
// //     }
// //   };

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

// //         const hasDateColumn = uploadedFile.has_date_column;
// //         const dateColumns = uploadedFile.date_columns || [];
// //         console.log('[DEBUG] hasDateColumn:', hasDateColumn);
// //         console.log('[DEBUG] dateColumns:', dateColumns);

// //         if (schema && schema.length > 0) {
// //           const schemaMessage: Message = {
// //             id: uuidv4(),
// //             sender: 'assistant',
// //             text: 'Dataset uploaded successfully! Below is the schema:',
// //             timestamp: formatTimestamp(new Date().toISOString()),
// //             isSchema: true,
// //             schema: schema,
// //             animated: false,
// //           };

// //           let confirmationText = `
// // Suggested Target Column: ${suggestions.target_column}
// // Suggested Entity ID Column: ${suggestions.entity_id_column}
// // Suggested Feature Columns: ${suggestions.feature_columns.join(', ')}

// // Please confirm:
// // - Is the Target Column correct?
// // - Is the Entity ID Column correct?
// // (Reply 'yes' to confirm or provide corrections as needed)
// //           `.trim();

// //           if (hasDateColumn) {
// //             if (dateColumns.length === 1) {
// //               confirmationText += `
// // We detected 1 date column: ${dateColumns[0]}.
// // If you'd like a time-based approach, you can confirm with 'yes' or specify a different date column.
// // You can also explicitly say "Time Column: ${dateColumns[0]}".
// //               `.trim();
// //             } else if (dateColumns.length > 1) {
// //               confirmationText += `
// // We detected multiple date columns: ${dateColumns.join(', ')}.
// // Please specify which one should be used for the time-based approach using:
// // "Time Column: <column_name>"
// //               `.trim();
// //             }
// //           } else {
// //             confirmationText += `
// // No date column was detected, so we'll proceed with a non-time-based approach.
// //             `.trim();
// //           }

// //           const confirmationMessage: Message = {
// //             id: uuidv4(),
// //             sender: 'assistant',
// //             text: confirmationText,
// //             timestamp: formatTimestamp(new Date().toISOString()),
// //             animated: false,
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
// //         animated: false,
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

// //   // ---------------------------------------------------------------------------
// //   // Send Message
// //   // ---------------------------------------------------------------------------
// //   const sendMessage = async (message: string, user_id: string, chat_id?: string): Promise<any> => {
// //     const response = await fetch(`http://localhost:8000/api/chatgpt/`, {
// //       method: 'POST',
// //       headers: { 'Content-Type': 'application/json' },
// //       body: JSON.stringify({ message, user_id, chat_id }),
// //     });

// //     if (!response.ok) {
// //       throw new Error('Failed to send message');
// //     }
// //     return response.json();
// //   };

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
// //       const data = await sendMessage(
// //         userMessage.text,
// //         userId?.toString() || 'default_user',
// //         currentChat.id
// //       );

// //       console.log("[DEBUG] handleSendMessage data =>", data);

// //       // The updated backend sends: { response: <string>, chat_id: <string>, show_generate_notebook: <boolean> }
// //       const responseText = typeof data.response === 'string' ? data.response : String(data.response);

// //       const newChatId = data.chat_id || currentChat.id;
// //       const showGenerateButton = data.show_generate_notebook || false;

// //       const botMessage: Message = {
// //         id: uuidv4(),
// //         sender: 'assistant',
// //         text: responseText,
// //         timestamp: formatTimestamp(new Date().toISOString()),
// //         animated: false,
// //         button: showGenerateButton,
// //       };

// //       const updatedMessages = [...updatedChat.messages, botMessage];

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
// //         animated: false,
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

// //   // ---------------------------------------------------------------------------
// //   // Handle creating a new chat
// //   // ---------------------------------------------------------------------------
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
// //           timestamp: formatTimestamp(new Date().toISOString()),
// //           animated: false,
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

// //   // ---------------------------------------------------------------------------
// //   // Generate Notebook
// //   // ---------------------------------------------------------------------------
// //   const handleGenerateNotebook = async () => {
// //     if (!currentChat || !userId) {
// //       console.error('User ID or Current Chat not available.');
// //       return;
// //     }

// //     setIsGeneratingNotebook(true);
// //     console.log('Generating notebook...');
// //     setGeneratedUserId(userId.toString());
// //     setGeneratedChatId(currentChat.id);

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

// //       setNotebookGenerated(true);

// //       const data = await response.json();
// //       console.log('[DEBUG] Notebook generation response:', data);

// //       // We assume notebook generation was successful; you can extract fields if needed

// //       const notebookMessage: Message = {
// //         id: uuidv4(),
// //         sender: 'assistant',
// //         text: data.message || 'Notebook has been generated and saved successfully.',
// //         timestamp: formatTimestamp(new Date().toISOString()),
// //         animated: false,
// //       };

// //       setChats((prevChats) =>
// //         prevChats.map((chat) =>
// //           chat.id === currentChat.id
// //             ? { ...chat, messages: [...chat.messages, notebookMessage] }
// //             : chat
// //         )
// //       );

// //       setCurrentChat((prevChat) =>
// //         prevChat ? { ...prevChat, messages: [...prevChat.messages, notebookMessage] } : null
// //       );
// //     } catch (error) {
// //       console.error('Error generating notebook:', error);
// //       alert('Error generating notebook. Please try again.');
// //     } finally {
// //       setIsGeneratingNotebook(false);
// //     }
// //   };

// //   // ---------------------------------------------------------------------------
// //   // Open Notebook
// //   // ---------------------------------------------------------------------------
// //   const handleOpenNotebook = () => {
// //     console.log('Opening notebook...');
// //     navigate(`/notebook/${generatedUserId}/${generatedChatId}`, {
// //       state: {
// //         isTrained: false,
// //       },
// //     });
// //   };

// //   // ---------------------------------------------------------------------------
// //   // Reset Chat
// //   // ---------------------------------------------------------------------------
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

// //   const handleReset = async () => {
// //     try {
// //       await resetChat(userId?.toString() || 'default_user');
// //       const initialChat: Chat = {
// //         id: uuidv4(),
// //         title: 'New Prediction',
// //         timestamp: new Date().toLocaleString(),
// //         messages: [
// //           {
// //             id: uuidv4(),
// //             sender: 'assistant',
// //             text: defaultMessage,
// //             timestamp: formatTimestamp(new Date().toISOString()),
// //             animated: false,
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

// //   // ---------------------------------------------------------------------------
// //   // Render
// //   // ---------------------------------------------------------------------------
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
// //               {chats.map((chat, index) => (
// //                 <div
// //                   key={chat.id || `${chat.title}-${index}`}
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
// //                           className="px-4 py-2 bg-teal-700 text-white text-xs rounded shadow-lg hover:bg-teal-600 transform hover:scale-105 transition-transform duration-300"
// //                         >
// //                           Open Notebook
// //                         </button>
// //                       ) : (
// //                         <button
// //                           onClick={handleGenerateNotebook}
// //                           className="px-4 py-2 bg-teal-700 text-white text-xs rounded shadow-lg hover:bg-teal-600 transform hover:scale-105 transition-transform duration-300"
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
// //               {Array.from(selectedFiles).map((file, index) => (
// //                 <div key={`${file.name}-${index}`} className="flex flex-col gap-2 bg-white px-2 py-2 rounded border text-xs">
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

// // // AnimatedMessage Component: Displays message text with preserved formatting.
// // const AnimatedMessage: React.FC<{ text: string; sender: 'user' | 'assistant'; animated?: boolean }> = ({
// //   text,
// //   sender,
// //   animated,
// // }) => {
// //   // Using a <pre> tag with whitespace-pre-wrap preserves newlines and spacing,
// //   // ensuring the response is rendered in a human-readable structure.
// //   return <pre className="whitespace-pre-wrap font-sans text-sm m-0">{text}</pre>;
// // };

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
// //             <tr key={`${field.column_name}-${index}`} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
// //               <td className="px-4 py-2 border-b text-xs text-gray-600">{field.column_name}</td>
// //               <td className="px-4 py-2 border-b text-xs text-gray-600">{field.data_type}</td>
// //             </tr>
// //           ))}
// //         </tbody>
// //       </table>
// //     </div>
// //   );
// // };

// // const parseSchema = (message: Message): Array<{ column_name: string; data_type: string }> | null => {
// //   if (!message.isSchema || !message.schema) return null;
// //   return message.schema;
// // };

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



















// // // working so far chat ui improved and pushed backend

// import React, { useState, useEffect, useRef } from 'react';
// import {
//   MessageSquare,
//   Plus,
//   Menu,
//   Paperclip,
//   Send,
//   Trash2,
//   Loader,
// } from 'lucide-react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { v4 as uuidv4 } from 'uuid';
// import { useNavigate } from 'react-router-dom';
// import { useAuth } from '../Auth/AuthContext';

// import { Card, CardContent } from '../components/ui/card';
// import { Button } from '../components/ui/button';
// import { ScrollArea } from '../components/ui/scroll-area';
// import { Avatar } from '../components/ui/avatar';
// import { Separator } from '../components/ui/separator';
// import { Input } from '../components/ui/input';


// interface Message {
//   id: string;
//   sender: 'user' | 'assistant';
//   text: string;
//   timestamp: string;
//   button?: boolean;
//   isSchema?: boolean;
//   schema?: Array<{ column_name: string; data_type: string }>;
//   animated?: boolean;
// }

// interface Chat {
//   id: string;
//   title: string;
//   timestamp: string;
//   messages: Message[];
//   isHistory?: boolean;
// }

// const ChatInterface: React.FC = () => {
//   const defaultMessage = `Hi! 👋 I'm your AI assistant.
// I'll assist you in formulating a predictive question. I'll then create a SQL notebook to build a training set.
// So, what would you like to predict?`;

//   const { user, loading } = useAuth();
//   const userId = user?.id;

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

//   const [generatedUserId, setGeneratedUserId] = useState<string>('');
//   const [generatedChatId, setGeneratedChatId] = useState<string>('');

//   const navigate = useNavigate();
//   const messagesEndRef = useRef<HTMLDivElement | null>(null);

//   // Existing helper functions remain the same
//   const scrollToBottom = () => {
//     messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
//   };

//   useEffect(() => {
//     scrollToBottom();
//   }, [currentChat?.messages, isLoading, isUploading]);

//   // ---------------------------------------------------------------------------
//   // Fetch Chat History
//   // ---------------------------------------------------------------------------
//   interface BackendChatData {
//     chat_id: string;
//     title: string;
//     user_messages: Array<{
//       text: string;
//       timestamp: string;
//     }>;
//     assistant_messages: Array<{
//       text: string;
//       timestamp: string;
//     }>;
//   }

//   const fetchChatHistory = async (user_id: string): Promise<Chat[]> => {
//     const response = await fetch(`http://localhost:8000/api/chat_history/?user_id=${user_id}`);
//     if (!response.ok) {
//       throw new Error('Failed to fetch chat history');
//     }
//     const data = await response.json();

//     const chatsFromBackend: Chat[] = data.map((chatObj: BackendChatData) => {
//       const mergedMessages = [
//         ...chatObj.user_messages.map((um) => ({
//           sender: 'user' as const,
//           text: um.text,
//           timestamp: um.timestamp,
//         })),
//         ...chatObj.assistant_messages.map((am) => ({
//           sender: 'assistant' as const,
//           text: am.text,
//           timestamp: am.timestamp,
//         })),
//       ];

//       mergedMessages.sort((a, b) => {
//         return new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime();
//       });

//       const messages: Message[] = mergedMessages.map((msg) => ({
//         id: uuidv4(),
//         sender: msg.sender,
//         text: msg.text,
//         timestamp: msg.timestamp,
//         animated: false,
//       }));

//       return {
//         id: chatObj.chat_id || uuidv4(),
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
//       id: uuidv4(),
//       title: 'New Prediction',
//       timestamp: new Date().toLocaleString(),
//       messages: [
//         {
//           id: uuidv4(),
//           sender: 'assistant',
//           text: defaultMessage,
//           timestamp: formatTimestamp(new Date().toISOString()),
//           animated: false,
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

//         const hasDateColumn = uploadedFile.has_date_column;
//         const dateColumns = uploadedFile.date_columns || [];
//         console.log('[DEBUG] hasDateColumn:', hasDateColumn);
//         console.log('[DEBUG] dateColumns:', dateColumns);

//         if (schema && schema.length > 0) {
//           const schemaMessage: Message = {
//             id: uuidv4(),
//             sender: 'assistant',
//             text: 'Dataset uploaded successfully! Below is the schema:',
//             timestamp: formatTimestamp(new Date().toISOString()),
//             isSchema: true,
//             schema: schema,
//             animated: false,
//           };

//           let confirmationText = `
// Suggested Target Column: ${suggestions.target_column}
// Suggested Entity ID Column: ${suggestions.entity_column}
// Suggested Feature Columns: ${suggestions.feature_columns.join(', ')}

// Please confirm:
// - Is the Target Column correct?
// - Is the Entity ID Column correct?
// (Reply 'yes' to confirm or provide corrections as needed)
//           `.trim();

//           if (hasDateColumn) {
//             if (dateColumns.length === 1) {
//               confirmationText += `
// We detected 1 date column: ${dateColumns[0]}.
// If you'd like a time-based approach, you can confirm with 'yes' or specify a different date column.
// You can also explicitly say "Time Column: ${dateColumns[0]}".
//               `.trim();
//             } else if (dateColumns.length > 1) {
//               confirmationText += `
// We detected multiple date columns: ${dateColumns.join(', ')}.
// Please specify which one should be used for the time-based approach using:
// "Time Column: <column_name>"
//               `.trim();
//             }
//           } else {
//             confirmationText += `
// No date column was detected, so we'll proceed with a non-time-based approach.
//             `.trim();
//           }

//           const confirmationMessage: Message = {
//             id: uuidv4(),
//             sender: 'assistant',
//             text: confirmationText,
//             timestamp: formatTimestamp(new Date().toISOString()),
//             animated: false,
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
//         animated: false,
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

//       console.log("[DEBUG] handleSendMessage data =>", data);

//       // The updated backend sends: { response: <string>, chat_id: <string>, show_generate_notebook: <boolean> }
//       const responseText = typeof data.response === 'string' ? data.response : String(data.response);

//       const newChatId = data.chat_id || currentChat.id;
//       const showGenerateButton = data.show_generate_notebook || false;

//       const botMessage: Message = {
//         id: uuidv4(),
//         sender: 'assistant',
//         text: responseText,
//         timestamp: formatTimestamp(new Date().toISOString()),
//         animated: false,
//         button: showGenerateButton,
//       };

//       const updatedMessages = [...updatedChat.messages, botMessage];

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
//         animated: false,
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

//   // ---------------------------------------------------------------------------
//   // Handle creating a new chat
//   // ---------------------------------------------------------------------------
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
//           timestamp: formatTimestamp(new Date().toISOString()),
//           animated: false,
//         },
//       ],
//       isHistory: false,
//     };
//     setChats((prev) => [newChat, ...prev]);
//     setCurrentChat(newChat);

//     setIsGeneratingNotebook(false);
//     setNotebookGenerated(false);
//     setGeneratedNotebookData(null);
//   };

//   // ---------------------------------------------------------------------------
//   // Generate Notebook
//   // ---------------------------------------------------------------------------
//   const handleGenerateNotebook = async () => {
//     if (!currentChat || !userId) {
//       console.error('User ID or Current Chat not available.');
//       return;
//     }

//     setIsGeneratingNotebook(true);
//     console.log('Generating notebook...');
//     setGeneratedUserId(userId.toString());
//     setGeneratedChatId(currentChat.id);

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

//       setNotebookGenerated(true);

//       const data = await response.json();
//       console.log('[DEBUG] Notebook generation response:', data);

//       // We assume notebook generation was successful; you can extract fields if needed

//       const notebookMessage: Message = {
//         id: uuidv4(),
//         sender: 'assistant',
//         text: data.message || 'Notebook has been generated and saved successfully.',
//         timestamp: formatTimestamp(new Date().toISOString()),
//         animated: false,
//       };

//       setChats((prevChats) =>
//         prevChats.map((chat) =>
//           chat.id === currentChat.id
//             ? { ...chat, messages: [...chat.messages, notebookMessage] }
//             : chat
//         )
//       );

//       setCurrentChat((prevChat) =>
//         prevChat ? { ...prevChat, messages: [...prevChat.messages, notebookMessage] } : null
//       );
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
//     console.log('Opening notebook...');
//     navigate(`/notebook/${generatedUserId}/${generatedChatId}`, {
//       state: {
//         isTrained: false,
//       },
//     });
//   };

//   // ---------------------------------------------------------------------------
//   // Reset Chat
//   // ---------------------------------------------------------------------------
//   // const resetChat = async (user_id: string): Promise<void> => {
//   //   const response = await fetch(`http://localhost:8000/api/chatgpt/`, {
//   //     method: 'POST',
//   //     headers: { 'Content-Type': 'application/json' },
//   //     body: JSON.stringify({ action: 'reset', user_id }),
//   //   });

//   //   if (!response.ok) {
//   //     throw new Error('Failed to reset chat');
//   //   }
//   // };

//   // const handleReset = async () => {
//   //   try {
//   //     await resetChat(userId?.toString() || 'default_user');
//   //     const initialChat: Chat = {
//   //       id: uuidv4(),
//   //       title: 'New Prediction',
//   //       timestamp: new Date().toLocaleString(),
//   //       messages: [
//   //         {
//   //           id: uuidv4(),
//   //           sender: 'assistant',
//   //           text: defaultMessage,
//   //           timestamp: formatTimestamp(new Date().toISOString()),
//   //           animated: false,
//   //         },
//   //       ],
//   //       isHistory: false,
//   //     };
//   //     setChats([initialChat]);
//   //     setCurrentChat(initialChat);
//   //     setIsGeneratingNotebook(false);
//   //     setNotebookGenerated(false);
//   //     setGeneratedNotebookData(null);
//   //   } catch (error) {
//   //     console.error('Error resetting chat:', error);
//   //     alert('Error resetting chat. Please try again.');
//   //   }
//   // };

//   // ---------------------------------------------------------------------------
//   // Render
//   // ---------------------------------------------------------------------------
//   const isHistoryChat = currentChat?.isHistory;

//   return (
//     <div className="h-screen flex bg-background">
//       <AnimatePresence>
//         {showSidebar && (
//           <motion.aside
//             initial={{ x: -320 }}
//             animate={{ x: 0 }}
//             exit={{ x: -320 }}
//             transition={{ type: "spring", stiffness: 300, damping: 30 }}
//             className="w-80 border-r bg-card"
//           >
//             <div className="p-4 flex items-center justify-between">
//               <div className="flex items-center space-x-2">
//                 <MessageSquare className="w-5 h-5 text-primary" />
//                 <h2 className="font-semibold">Chat History</h2>
//               </div>
//               <Button
//                 variant="ghost"
//                 size="sm"
//                 onClick={handleNewChat}
//                 className="h-8 px-2"
//               >
//                 <Plus className="w-4 h-4" />
//                 <span className="ml-2">New Chat</span>
//               </Button>
//             </div>
//             <Separator />
//             <ScrollArea className="h-[calc(100vh-5rem)] px-2">
//               <div className="space-y-2 p-2">
//                 {chats.map((chat) => (
//                   <div
//                     key={chat.id}
//                     className="cursor-pointer transition-colors"
//                     onClick={() => setCurrentChat(chat)}
//                   >
//                     <Card
//                       className={`${
//                         currentChat?.id === chat.id ? 'bg-accent' : ''
//                       }`}
//                     >
//                       <CardContent className="p-3 flex justify-between items-center">
//                         <div className="flex-1 min-w-0">
//                           <p className="text-sm font-medium truncate">{chat.title}</p>
//                           <p className="text-xs text-muted-foreground">{chat.timestamp}</p>
//                         </div>
//                         <Button
//                           variant="ghost"
//                           size="icon"
//                           className="opacity-0 group-hover:opacity-100"
//                           onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
//                             e.stopPropagation();
//                             setChats((prev) => prev.filter((c) => c.id !== chat.id));
//                           }}
//                         >
//                           <Trash2 className="w-4 h-4" />
//                         </Button>
//                       </CardContent>
//                     </Card>
//                   </div>
//                 ))}
//               </div>
//             </ScrollArea>
//           </motion.aside>
//         )}
//       </AnimatePresence>

//       <div className="flex-1 flex flex-col">
//         <header className="h-14 border-b bg-card flex items-center px-4 justify-between">
//           <div className="flex items-center space-x-4">
//             <Button
//               variant="ghost"
//               size="icon"
//               onClick={() => setShowSidebar(!showSidebar)}
//             >
//               <Menu className="w-5 h-5" />
//             </Button>
//             <h3 className="font-medium">{currentChat?.title || 'Select a chat'}</h3>
//           </div>
//           {/* <Button
//             variant="destructive"
//             size="sm"
//             onClick={handleReset}
//             className="h-8"
//           >
//             <Trash2 className="w-4 h-4 mr-2" />
//             Reset
//           </Button> */}
//         </header>

//         <ScrollArea className="flex-1 p-4">
//           <div className="space-y-4 max-w-3xl mx-auto">
//             {currentChat?.messages.map((message) => (
//               <div
//                 key={message.id}
//                 className={`flex ${
//                   message.sender === 'user' ? 'justify-end' : 'justify-start'
//                 }`}
//               >
//                 <div className="flex items-start max-w-[80%] space-x-2">
//                   {message.sender === 'assistant' && (
//                     <Avatar>
//                       <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
//                         <MessageSquare className="w-5 h-5 text-primary" />
//                       </div>
//                     </Avatar>
//                   )}
//                   <div
//                     className={`rounded-lg px-4 py-2 ${
//                       message.sender === 'user'
//                         ? 'bg-primary text-primary-foreground'
//                         : 'bg-muted'
//                     }`}
//                   >
//                     {message.isSchema ? (
//                       <>
//                         <AnimatedMessage
//                           text={message.text}
//                           sender={message.sender}
//                           animated={message.animated}
//                         />
//                         <SchemaTable schema={message.schema || []} />
//                       </>
//                     ) : (
//                       <AnimatedMessage
//                         text={message.text}
//                         sender={message.sender}
//                         animated={message.animated}
//                       />
//                     )}
//                     <div className="text-xs mt-1 opacity-70">
//                       {message.timestamp}
//                     </div>
//                     {message.button && (
//                       <div className="mt-2">
//                         <Button
//                           variant={notebookGenerated ? "default" : "secondary"}
//                           disabled={isGeneratingNotebook}
//                           onClick={
//                             notebookGenerated
//                               ? handleOpenNotebook
//                               : handleGenerateNotebook
//                           }
//                           className="w-full"
//                         >
//                           {isGeneratingNotebook ? (
//                             <>
//                               <Loader className="w-4 h-4 mr-2 animate-spin" />
//                               Generating...
//                             </>
//                           ) : notebookGenerated ? (
//                             'Open Notebook'
//                           ) : (
//                             'Generate Notebook'
//                           )}
//                         </Button>
//                       </div>
//                     )}
//                   </div>
//                 </div>
//               </div>
//             ))}
//             {isLoading && (
//               <div className="flex justify-start">
//                 <div className="bg-muted rounded-lg p-4 flex items-center space-x-2">
//                   <Loader className="w-4 h-4 animate-spin" />
//                   <span className="text-sm">Typing...</span>
//                 </div>
//               </div>
//             )}
//             <div ref={messagesEndRef} />
//           </div>
//         </ScrollArea>

//         {isUploading && (
//           <div className="px-4 py-2 bg-muted text-sm flex items-center space-x-2">
//             <Loader className="w-4 h-4 animate-spin" />
//             <span>Uploading files...</span>
//           </div>
//         )}

//         {selectedFiles && selectedFiles.length > 0 && (
//           <div className="p-4 border-t bg-muted">
//             <div className="flex flex-wrap gap-2">
//               {Array.from(selectedFiles).map((file, index) => (
//                 <Card key={`${file.name}-${index}`} className="p-2">
//                   <div className="text-sm">
//                     <span className="font-medium">{file.name}</span>
//                     <span className="text-muted-foreground ml-2">
//                       ({(file.size / 1024).toFixed(1)} KB)
//                     </span>
//                   </div>
//                 </Card>
//               ))}
//             </div>
//             <Button
//               onClick={handleFileUpload}
//               className="mt-2"
//             >
//               Upload Files
//             </Button>
//           </div>
//         )}

//         <footer className="p-4 border-t bg-card">
//           <div className="max-w-3xl mx-auto flex items-center space-x-2">
//             <Button
//               variant="ghost"
//               size="icon"
//               disabled={currentChat?.isHistory}
//               onClick={() => document.getElementById('file-input')?.click()}
//             >
//               <Paperclip className="w-5 h-5" />
//             </Button>
//             <Input
//               id="file-input"
//               type="file"
//               multiple
//               className="hidden"
//               onChange={handleFileSelect}
//               disabled={currentChat?.isHistory}
//             />
//             <Input
//               value={inputMessage}
//               onChange={(e: React.ChangeEvent<HTMLInputElement>) => setInputMessage(e.target.value)}
//               onKeyPress={(e: React.KeyboardEvent<HTMLInputElement>) => {
//                 if (e.key === 'Enter') handleSendMessage();
//               }}
//               placeholder="Type your message..."
//               disabled={currentChat?.isHistory}
//               className="flex-1"
//             />
//             <Button
//               variant="ghost"
//               size="icon"
//               disabled={currentChat?.isHistory || !inputMessage.trim()}
//               onClick={handleSendMessage}
//             >
//               <Send className="w-5 h-5" />
//             </Button>
//           </div>
//         </footer>
//       </div>
//     </div>
//   );
// };

// // AnimatedMessage Component: Displays message text with preserved formatting.
// const AnimatedMessage: React.FC<{ text: string; sender: 'user' | 'assistant'; animated?: boolean }> = ({
//   text,
//   sender,
//   animated,
// }) => {
//   // Using a <pre> tag with whitespace-pre-wrap preserves newlines and spacing,
//   // ensuring the response is rendered in a human-readable structure.
//   return <pre className="whitespace-pre-wrap font-sans text-sm m-0">{text}</pre>;
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
//             <tr key={`${field.column_name}-${index}`} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
//               <td className="px-4 py-2 border-b text-xs text-gray-600">{field.column_name}</td>
//               <td className="px-4 py-2 border-b text-xs text-gray-600">{field.data_type}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// const parseSchema = (message: Message): Array<{ column_name: string; data_type: string }> | null => {
//   if (!message.isSchema || !message.schema) return null;
//   return message.schema;
// };

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



// // working so far chat ui improved and pushed backend

import React, { useState, useEffect, useRef } from 'react';
import {
  MessageSquare,
  Plus,
  Menu,
  Paperclip,
  Send,
  Trash2,
  Loader,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { v4 as uuidv4 } from 'uuid';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../Auth/AuthContext';

import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { ScrollArea } from '../components/ui/scroll-area';
import { Avatar } from '../components/ui/avatar';
import { Separator } from '../components/ui/separator';
import { Input } from '../components/ui/input';

interface Message {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  button?: boolean;
  isSchema?: boolean;
  schema?: Array<{ column_name: string; data_type: string }>;
  animated?: boolean;
}

interface Chat {
  id: string;
  title: string;
  timestamp: string;
  messages: Message[];
  isHistory?: boolean;
}

const ChatInterface: React.FC = () => {
  const defaultMessage = `Hi! 👋 I'm your AI assistant.
I'll assist you in formulating a predictive question. I'll then create a SQL notebook to build a training set.
So, what would you like to predict?`;

  const { user, loading } = useAuth();
  const userId = user?.id;

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

  const [generatedUserId, setGeneratedUserId] = useState<string>('');
  const [generatedChatId, setGeneratedChatId] = useState<string>('');

  // New state: when the generate button is visible, we disable chat input.
  const [disableChatInput, setDisableChatInput] = useState(false);

  const navigate = useNavigate();
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  // Existing helper functions remain the same
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [currentChat?.messages, isLoading, isUploading]);

  // ---------------------------------------------------------------------------
  // Fetch Chat History
  // ---------------------------------------------------------------------------
  interface BackendChatData {
    chat_id: string;
    title: string;
    user_messages: Array<{
      text: string;
      timestamp: string;
    }>;
    assistant_messages: Array<{
      text: string;
      timestamp: string;
    }>;
  }

  const fetchChatHistory = async (user_id: string): Promise<Chat[]> => {
    const response = await fetch(`http://localhost:8000/api/chat_history/?user_id=${user_id}`);
    if (!response.ok) {
      throw new Error('Failed to fetch chat history');
    }
    const data = await response.json();

    const chatsFromBackend: Chat[] = data.map((chatObj: BackendChatData) => {
      const mergedMessages = [
        ...chatObj.user_messages.map((um) => ({
          sender: 'user' as const,
          text: um.text,
          timestamp: um.timestamp,
        })),
        ...chatObj.assistant_messages.map((am) => ({
          sender: 'assistant' as const,
          text: am.text,
          timestamp: am.timestamp,
        })),
      ];

      mergedMessages.sort((a, b) => {
        return new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime();
      });

      const messages: Message[] = mergedMessages.map((msg) => ({
        id: uuidv4(),
        sender: msg.sender,
        text: msg.text,
        timestamp: msg.timestamp,
        animated: false,
      }));

      return {
        id: chatObj.chat_id || uuidv4(),
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
      id: uuidv4(),
      title: 'New Prediction',
      timestamp: new Date().toLocaleString(),
      messages: [
        {
          id: uuidv4(),
          sender: 'assistant',
          text: defaultMessage,
          timestamp: formatTimestamp(new Date().toISOString()),
          animated: false,
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
            animated: false,
          };

          let confirmationText = `
Suggested Target Column: ${suggestions.target_column}
Suggested Entity ID Column: ${suggestions.entity_column}
Suggested Feature Columns: ${suggestions.feature_columns.join(', ')}

Please confirm:
- Is the Target Column correct?
- Is the Entity ID Column correct?
(Reply 'yes' to confirm or provide corrections as needed)
          `.trim();

          if (hasDateColumn) {
            if (dateColumns.length === 1) {
              confirmationText += `
We detected 1 date column: ${dateColumns[0]}.
If you'd like a time-based approach, you can confirm with 'yes' or specify a different date column.
You can also explicitly say "Time Column: ${dateColumns[0]}".
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
            animated: false,
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
        animated: false,
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

      console.log("[DEBUG] handleSendMessage data =>", data);

      // The updated backend sends: { response: <string>, chat_id: <string>, show_generate_notebook: <boolean> }
      const responseText = typeof data.response === 'string' ? data.response : String(data.response);

      const newChatId = data.chat_id || currentChat.id;
      const showGenerateButton = data.show_generate_notebook || false;

      const botMessage: Message = {
        id: uuidv4(),
        sender: 'assistant',
        text: responseText,
        timestamp: formatTimestamp(new Date().toISOString()),
        animated: false,
        button: showGenerateButton,
      };

      const updatedMessages = [...updatedChat.messages, botMessage];

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

      // When the backend requests the generate notebook button to be shown,
      // disable the chat input.
      if (showGenerateButton) {
        setDisableChatInput(true);
      }

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
        animated: false,
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

  // ---------------------------------------------------------------------------
  // Handle creating a new chat
  // ---------------------------------------------------------------------------
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
          timestamp: formatTimestamp(new Date().toISOString()),
          animated: false,
        },
      ],
      isHistory: false,
    };
    setChats((prev) => [newChat, ...prev]);
    setCurrentChat(newChat);

    setIsGeneratingNotebook(false);
    setNotebookGenerated(false);
    setGeneratedNotebookData(null);
    // Ensure chat is enabled for a new conversation.
    setDisableChatInput(false);
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
    console.log('Generating notebook...');
    setGeneratedUserId(userId.toString());
    setGeneratedChatId(currentChat.id);

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

      setNotebookGenerated(true);

      const data = await response.json();
      console.log('[DEBUG] Notebook generation response:', data);

      // We assume notebook generation was successful; you can extract fields if needed

      const notebookMessage: Message = {
        id: uuidv4(),
        sender: 'assistant',
        text: data.message || 'Notebook has been generated and saved successfully.',
        timestamp: formatTimestamp(new Date().toISOString()),
        animated: false,
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
  // const handleOpenNotebook = () => {
  //   console.log('Opening notebook...');
  //   navigate(`/notebook/${generatedUserId}/${generatedChatId}`, {
  //     state: {
  //       isTrained: false,
  //     },
  //   });
  // };

  // In ChatInterface (e.g. ChatInterface.tsx)
const handleOpenNotebook = async () => {
  try {
    // Use currentChat.id (or generatedChatId) and userId
    const notebookChatId = currentChat?.id || generatedChatId;
    const response = await fetch(
      `http://localhost:8000/api/predictive-settings/${userId}/${notebookChatId}/`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch predictive settings");
    }
    const predictiveSettings = await response.json();
    console.log("Predictive Settings fetched:", predictiveSettings);
    // Navigate to the Notebook page, passing the predictive settings in state
    navigate(`/notebook/${userId}/${notebookChatId}`, {
      state: {
        isTrained: false,
        predictiveSettings,
      },
    });
  } catch (error) {
    console.error("Error fetching predictive settings:", error);
    alert("Could not fetch notebook details. Please try again.");
  }
};


  // ---------------------------------------------------------------------------
  // Reset Chat
  // ---------------------------------------------------------------------------
  const handleReset = () => {
    if (!currentChat) return;
    // Remove any generate button from messages (by setting button to false)
    const updatedMessages = currentChat.messages.map((msg) => {
      if (msg.button) {
        return { ...msg, button: false };
      }
      return msg;
    });
    setCurrentChat({ ...currentChat, messages: updatedMessages });
    setChats((prevChats) =>
      prevChats.map((chat) =>
        chat.id === currentChat.id ? { ...chat, messages: updatedMessages } : chat
      )
    );
    // Re-enable the chat input.
    setDisableChatInput(false);
    console.log("Reset clicked - chat re-enabled");
    // Further reset logic can be added here.
  };

  // ---------------------------------------------------------------------------
  // Render
  // ---------------------------------------------------------------------------
  const isHistoryChat = currentChat?.isHistory;

  return (
    <div className="h-screen flex bg-background">
      <AnimatePresence>
        {showSidebar && (
          <motion.aside
            initial={{ x: -320 }}
            animate={{ x: 0 }}
            exit={{ x: -320 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="w-80 border-r bg-card"
          >
            <div className="p-4 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <MessageSquare className="w-5 h-5 text-primary" />
                <h2 className="font-semibold">Chat History</h2>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleNewChat}
                className="h-8 px-2"
              >
                <Plus className="w-4 h-4" />
                <span className="ml-2">New Chat</span>
              </Button>
            </div>
            <Separator />
            <ScrollArea className="h-[calc(100vh-5rem)] px-2">
              <div className="space-y-2 p-2">
                {chats.map((chat) => (
                  <div
                    key={chat.id}
                    className="cursor-pointer transition-colors"
                    onClick={() => setCurrentChat(chat)}
                  >
                    <Card
                      className={`${
                        currentChat?.id === chat.id ? 'bg-accent' : ''
                      }`}
                    >
                      <CardContent className="p-3 flex justify-between items-center">
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium truncate">{chat.title}</p>
                          <p className="text-xs text-muted-foreground">{chat.timestamp}</p>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="opacity-0 group-hover:opacity-100"
                          onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                            e.stopPropagation();
                            setChats((prev) => prev.filter((c) => c.id !== chat.id));
                          }}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </CardContent>
                    </Card>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </motion.aside>
        )}
      </AnimatePresence>

      <div className="flex-1 flex flex-col">
        <header className="h-14 border-b bg-card flex items-center px-4 justify-between">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setShowSidebar(!showSidebar)}
            >
              <Menu className="w-5 h-5" />
            </Button>
            <h3 className="font-medium">{currentChat?.title || 'Select a chat'}</h3>
          </div>
          {/* Uncomment below if you want a reset button in the header as well */}
          {/* <Button
            variant="destructive"
            size="sm"
            onClick={handleReset}
            className="h-8"
          >
            <Trash2 className="w-4 h-4 mr-2" />
            Reset
          </Button> */}
        </header>

        <ScrollArea className="flex-1 p-4">
          <div className="space-y-4 max-w-3xl mx-auto">
            {currentChat?.messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${
                  message.sender === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                <div className="flex items-start max-w-[80%] space-x-2">
                  {message.sender === 'assistant' && (
                    <Avatar>
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <MessageSquare className="w-5 h-5 text-primary" />
                      </div>
                    </Avatar>
                  )}
                  <div
                    className={`rounded-lg px-4 py-2 ${
                      message.sender === 'user'
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted'
                    }`}
                  >
                    {message.isSchema ? (
                      <>
                        <AnimatedMessage
                          text={message.text}
                          sender={message.sender}
                          animated={message.animated}
                        />
                        <SchemaTable schema={message.schema || []} />
                      </>
                    ) : (
                      <AnimatedMessage
                        text={message.text}
                        sender={message.sender}
                        animated={message.animated}
                      />
                    )}
                    <div className="text-xs mt-1 opacity-70">
                      {message.timestamp}
                    </div>
                    {message.button && (
                      <div className="mt-2 flex space-x-2">
                        <Button
                          variant={notebookGenerated ? "default" : "secondary"}
                          disabled={isGeneratingNotebook}
                          onClick={
                            notebookGenerated
                              ? handleOpenNotebook
                              : handleGenerateNotebook
                          }
                          className="flex-1"
                        >
                          {isGeneratingNotebook ? (
                            <>
                              <Loader className="w-4 h-4 mr-2 animate-spin" />
                              Generating...
                            </>
                          ) : notebookGenerated ? (
                            'Open Notebook'
                          ) : (
                            'Generate Notebook'
                          )}
                        </Button>
                        <Button
                          variant="destructive"
                          disabled={isGeneratingNotebook}
                          onClick={handleReset}
                          className="flex-1"
                        >
                          Reset
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-muted rounded-lg p-4 flex items-center space-x-2">
                  <Loader className="w-4 h-4 animate-spin" />
                  <span className="text-sm">Typing...</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>

        {isUploading && (
          <div className="px-4 py-2 bg-muted text-sm flex items-center space-x-2">
            <Loader className="w-4 h-4 animate-spin" />
            <span>Uploading files...</span>
          </div>
        )}

        {selectedFiles && selectedFiles.length > 0 && (
          <div className="p-4 border-t bg-muted">
            <div className="flex flex-wrap gap-2">
              {Array.from(selectedFiles).map((file, index) => (
                <Card key={`${file.name}-${index}`} className="p-2">
                  <div className="text-sm">
                    <span className="font-medium">{file.name}</span>
                    <span className="text-muted-foreground ml-2">
                      ({(file.size / 1024).toFixed(1)} KB)
                    </span>
                  </div>
                </Card>
              ))}
            </div>
            <Button onClick={handleFileUpload} className="mt-2">
              Upload Files
            </Button>
          </div>
        )}

        <footer className="p-4 border-t bg-card">
          <div className="max-w-3xl mx-auto flex items-center space-x-2">
            <Button
              variant="ghost"
              size="icon"
              disabled={currentChat?.isHistory}
              onClick={() => document.getElementById('file-input')?.click()}
            >
              <Paperclip className="w-5 h-5" />
            </Button>
            <Input
              id="file-input"
              type="file"
              multiple
              className="hidden"
              onChange={handleFileSelect}
              disabled={currentChat?.isHistory}
            />
            <Input
              value={inputMessage}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setInputMessage(e.target.value)}
              onKeyPress={(e: React.KeyboardEvent<HTMLInputElement>) => {
                if (e.key === 'Enter') handleSendMessage();
              }}
              placeholder="Type your message..."
              disabled={currentChat?.isHistory || disableChatInput}
              className="flex-1"
            />
            <Button
              variant="ghost"
              size="icon"
              disabled={currentChat?.isHistory || disableChatInput || !inputMessage.trim()}
              onClick={handleSendMessage}
            >
              <Send className="w-5 h-5" />
            </Button>
          </div>
        </footer>
      </div>
    </div>
  );
};

// AnimatedMessage Component: Displays message text with preserved formatting.
const AnimatedMessage: React.FC<{ text: string; sender: 'user' | 'assistant'; animated?: boolean }> = ({
  text,
  sender,
  animated,
}) => {
  // Using a <pre> tag with whitespace-pre-wrap preserves newlines and spacing,
  // ensuring the response is rendered in a human-readable structure.
  return <pre className="whitespace-pre-wrap font-sans text-sm m-0">{text}</pre>;
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
            <tr key={`${field.column_name}-${index}`} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
              <td className="px-4 py-2 border-b text-xs text-gray-600">{field.column_name}</td>
              <td className="px-4 py-2 border-b text-xs text-gray-600">{field.data_type}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const parseSchema = (message: Message): Array<{ column_name: string; data_type: string }> | null => {
  if (!message.isSchema || !message.schema) return null;
  return message.schema;
};

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
