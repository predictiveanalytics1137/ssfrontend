

// // import React, { useState } from "react";
// // import { useNavigate } from "react-router-dom";
// // import axios from "axios";

// // const Register: React.FC = () => {
// //   const [formData, setFormData] = useState({ username: "", email: "", password: "" });
// //   const [error, setError] = useState("");
// //   const [isSubmitting, setIsSubmitting] = useState(false);
// //   const navigate = useNavigate();

// //   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
// //     setFormData({ ...formData, [e.target.name]: e.target.value });
// //   };

// //   const handleSubmit = async (e: React.FormEvent) => {
// //     e.preventDefault();
// //     setError("");
// //     setIsSubmitting(true);

// //     // Basic Validation
// //     if (!formData.username || !formData.email || !formData.password) {
// //       setError("All fields are required");
// //       setIsSubmitting(false);
// //       return;
// //     }

// //     try {
// //       await axios.post("http://localhost:8000/api/auth/register/", formData);
// //       navigate("/login");
// //     } catch (err: any) {
// //       if (err.response && err.response.data) {
// //         setError(err.response.data.detail || "Registration failed");
// //       } else {
// //         setError("An unexpected error occurred");
// //       }
// //     } finally {
// //       setIsSubmitting(false);
// //     }
// //   };

// //   return (
// //     <div>
// //       <h1>Register</h1>
// //       <form onSubmit={handleSubmit}>
// //         <input name="username" placeholder="Username" onChange={handleChange} value={formData.username} />
// //         <input name="email" placeholder="Email" onChange={handleChange} value={formData.email} />
// //         <input name="password" type="password" placeholder="Password" onChange={handleChange} value={formData.password} />
// //         {error && <p style={{ color: "red" }}>{error}</p>}
// //         <button type="submit" disabled={isSubmitting}>
// //           {isSubmitting ? "Registering..." : "Register"}
// //         </button>
// //       </form>
// //     </div>
// //   );
// // };

// // export default Register;



// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import { Eye, EyeOff, Lock, User, Mail } from 'lucide-react';

// const Register: React.FC = () => {
//   const [formData, setFormData] = useState({ 
//     username: "", 
//     email: "", 
//     password: "" 
//   });
//   const [error, setError] = useState("");
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [showPassword, setShowPassword] = useState(false);
//   const navigate = useNavigate();

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setError("");
//     setIsSubmitting(true);

//     // Enhanced Validation
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     if (!formData.username) {
//       setError("Username is required");
//       setIsSubmitting(false);
//       return;
//     }
//     if (!formData.email) {
//       setError("Email is required");
//       setIsSubmitting(false);
//       return;
//     }
//     if (!emailRegex.test(formData.email)) {
//       setError("Please enter a valid email address");
//       setIsSubmitting(false);
//       return;
//     }
//     if (formData.password.length < 8) {
//       setError("Password must be at least 8 characters long");
//       setIsSubmitting(false);
//       return;
//     }

//     try {
//       await axios.post("http://localhost:8000/api/auth/register/", formData);
//       navigate("/login");
//     } catch (err: any) {
//       if (err.response && err.response.data) {
//         setError(err.response.data.detail || "Registration failed");
//       } else {
//         setError("An unexpected error occurred");
//       }
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const togglePasswordVisibility = () => {
//     setShowPassword(!showPassword);
//   };

//   const handleLogin = () => {
//     navigate("/login");
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 py-8">
//       <div className="w-full max-w-md bg-white shadow-md rounded-xl p-8">
//         <div className="text-center mb-6">
//           <h1 className="text-3xl font-bold text-gray-800">Create Account</h1>
//           <p className="text-gray-600 mt-2">Sign up to get started</p>
//         </div>
//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div className="relative">
//             <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//               <User className="h-5 w-5 text-gray-400" />
//             </div>
//             <input 
//               name="username"
//               type="text"
//               placeholder="Username"
//               onChange={handleChange}
//               value={formData.username}
//               className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//             />
//           </div>
          
//           <div className="relative">
//             <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//               <Mail className="h-5 w-5 text-gray-400" />
//             </div>
//             <input 
//               name="email"
//               type="email"
//               placeholder="Email"
//               onChange={handleChange}
//               value={formData.email}
//               className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//             />
//           </div>
          
//           <div className="relative">
//             <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//               <Lock className="h-5 w-5 text-gray-400" />
//             </div>
//             <input 
//               name="password"
//               type={showPassword ? "text" : "password"}
//               placeholder="Password"
//               onChange={handleChange}
//               value={formData.password}
//               className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//             />
//             <button
//               type="button"
//               onClick={togglePasswordVisibility}
//               className="absolute inset-y-0 right-0 pr-3 flex items-center"
//             >
//               {showPassword ? (
//                 <EyeOff className="h-5 w-5 text-gray-400" />
//               ) : (
//                 <Eye className="h-5 w-5 text-gray-400" />
//               )}
//             </button>
//           </div>

//           {error && (
//             <p className="text-red-500 text-sm text-center">
//               {error}
//             </p>
//           )}
          
//           <button 
//             type="submit" 
//             disabled={isSubmitting}
//             className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
//           >
//             {isSubmitting ? "Registering..." : "Register"}
//           </button>
          
//           <div className="text-center text-sm text-gray-600">
//             Already have an account?{" "}
//             <button 
//               type="button"
//               onClick={handleLogin}
//               className="text-blue-500 hover:underline"
//             >
//               Log in
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Register;




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

interface Message {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  button?: boolean; // If true, show "Generate Notebook" or "Open Notebook"
  isSchema?: boolean;
  schema?: Array<{ column_name: string; data_type: string }>;
  animated?: boolean; // Indicates whether to show typing animation or not
}

interface Chat {
  id: string; // Will store the UUID from backend
  title: string;
  timestamp: string;
  messages: Message[];
  isHistory?: boolean; // Indicates if this chat is from fetched history or newly created
}

const SchemaTable: React.FC<{ schema: Array<{ column_name: string; data_type: string }> }> = ({ schema }) => {
  return (
    <div className="overflow-x-auto mt-2">
      <table className="min-w-full border-collapse">
        <thead>
          <tr>
            <th className="px-4 py-2 border-b bg-gray-100 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Field</th>
            <th className="px-4 py-2 border-b bg-gray-100 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Data Type</th>
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

const AnimatedMessage: React.FC<{ text: string; sender: 'user' | 'assistant'; animated?: boolean }> = ({ text, sender, animated }) => {
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
      }, 9);
      return () => clearInterval(interval);
    } else {
      setDisplayedText(text);
    }
  }, [text, sender, animated]);

  return <pre className="whitespace-pre-wrap font-sans">{displayedText}</pre>;
};

const parseSchema = (message: Message): Array<{ column_name: string; data_type: string }> | null => {
  if (!message.isSchema || !message.schema) return null;
  return message.schema;
};

// Function to format timestamp to 12hr IST format
function formatTimestamp(ts: string): string {
  const date = new Date(ts);
  return date.toLocaleString('en-IN', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
    timeZone: 'Asia/Kolkata',
  });
}

const ChatInterface: React.FC = () => {
  const defaultMessage = `Hi! 👋 I'm your AI assistant.\nI'll assist you in formulating a predictive question. I'll then create a SQL notebook to build a training set.\nSo, what would you like to predict?`;

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

  const navigate = useNavigate();

  // On mount, we fetch chat history if available
  useEffect(() => {
    const fetchChatHistory = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/chat_history?user_id=1');
        if (!response.ok) {
          initializeDefaultChat();
          return;
        }

        const data = await response.json();
        if (Array.isArray(data) && data.length > 0) {
          const fetchedChats: Chat[] = data.map((chatItem: any) => {
            const allMessagesRaw = [
              ...chatItem.user_messages.map((m: any) => ({ ...m, sender: 'user' })),
              ...chatItem.assistant_messages.map((m: any) => ({ ...m, sender: 'assistant' })),
            ];

            allMessagesRaw.sort((a: any, b: any) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());

            const allMessages: Message[] = allMessagesRaw.map((msg: any) => {
              return {
                id: uuidv4(),
                sender: msg.sender,
                text: msg.text,
                timestamp: formatTimestamp(msg.timestamp),
                animated: false
              };
            });

            return {
              id: chatItem.chat_id,
              title: chatItem.title,
              timestamp: allMessages.length > 0 ? allMessages[allMessages.length - 1].timestamp : '',
              messages: allMessages,
              isHistory: true
            };
          });

          setChats(fetchedChats);
          setCurrentChat(fetchedChats[0]);
        } else {
          initializeDefaultChat();
        }
      } catch (error) {
        console.error('Error fetching chat history:', error);
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
            animated: true
          },
        ],
        isHistory: false
      };
      setChats([initialChat]);
      setCurrentChat(initialChat);
    };

    fetchChatHistory();
  }, []);

  // Modified handleNewChat to create chat via backend and then set local state
  const handleNewChat = async () => {
    try {
      // POST to backend to create chat
      const response = await fetch('http://localhost:8000/api/chats/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: 'New Prediction' }),
        // If authentication is needed, add headers like Authorization
      });
      if (!response.ok) {
        throw new Error(`Failed to create chat: ${response.statusText}`);
      }
      const data = await response.json();
      const newChatId = data.chat_id;

      // Create local chat object using the chat_id from backend
      const newChat: Chat = {
        id: newChatId,
        title: 'New Prediction',
        timestamp: new Date().toLocaleString(),
        messages: [
          {
            id: uuidv4(),
            sender: 'assistant',
            text: defaultMessage,
            timestamp: formatTimestamp(new Date().toISOString()),
            animated: true
          },
        ],
        isHistory: false
      };

      setChats((prev) => [newChat, ...prev]);
      setCurrentChat(newChat);

      setIsGeneratingNotebook(false);
      setNotebookGenerated(false);
      setGeneratedNotebookData(null);
    } catch (error) {
      console.error('Error creating new chat:', error);
    }
  };

  const handleDeleteChat = async (chatId: string) => {
    try {
      const response = await fetch(`http://localhost:8000/api/chats/${chatId}/`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
      });
      if (!response.ok && response.status !== 204) {
        throw new Error(`Failed to delete chat: ${response.statusText}`);
      }
      // Remove from local state
      setChats((prev) => prev.filter((c) => c.id !== chatId));
      if (currentChat?.id === chatId) {
        setCurrentChat(null);
      }
    } catch (error) {
      console.error('Error deleting chat:', error);
    }
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
      const formData = new FormData();
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
      console.log('[DEBUG] File upload response:', data);

      if (data.uploaded_files && data.uploaded_files.length > 0) {
        const uploadedFile = data.uploaded_files[0];
        const schema = uploadedFile.schema;
        const suggestions = uploadedFile.suggestions;

        if (schema && schema.length > 0) {
          const schemaMessage: Message = {
            id: uuidv4(),
            sender: 'assistant',
            text: 'Dataset uploaded successfully! Below is the schema:',
            timestamp: formatTimestamp(new Date().toISOString()),
            isSchema: true,
            schema: schema,
            animated: true
          };

          const confirmationText = `
Suggested Target Column: ${suggestions.target_column}
Suggested Entity ID Column: ${suggestions.entity_id_column}
Suggested Feature Columns: ${suggestions.feature_columns.join(', ')}

Please confirm:
- Is the Target Column correct?
- Is the Entity ID Column correct?
(Reply 'yes' to confirm or provide the correct column names as needed)
          `.trim();

          const confirmationMessage: Message = {
            id: uuidv4(),
            sender: 'assistant',
            text: confirmationText,
            timestamp: formatTimestamp(new Date().toISOString()),
            animated: true
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
        animated: true
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

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;
    if (!currentChat) return;

    // If current chat is history, disable chat compose
    if (currentChat.isHistory) return;

    const userMessage: Message = {
      id: uuidv4(),
      sender: 'user',
      text: inputMessage,
      timestamp: formatTimestamp(new Date().toISOString()),
      animated: false
    };

    const updatedChat = {
      ...currentChat,
      messages: [...currentChat.messages, userMessage],
      timestamp: userMessage.timestamp,
    };

    setChats((prevChats) => prevChats.map((chat) => (chat.id === currentChat.id ? updatedChat : chat)));
    setCurrentChat(updatedChat);
    setInputMessage('');
    setIsLoading(true);

    try {
      const response = await fetch('http://localhost:8000/api/chatgpt/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMessage.text, user_id: 'default_user' }),
      });

      if (!response.ok) {
        throw new Error(`Failed to send message: ${response.statusText}`);
      }

      const data = await response.json();
      let showGenerateButton = data.show_generate_notebook || false;

      const botMessage: Message = {
        id: uuidv4(),
        sender: 'assistant',
        text: data.response,
        timestamp: formatTimestamp(new Date().toISOString()),
        button: showGenerateButton,
        animated: true
      };

      const updatedMessages = [...updatedChat.messages, botMessage];

      setChats((prevChats) =>
        prevChats.map((chat) =>
          chat.id === currentChat.id ? { ...chat, messages: [...updatedMessages] } : chat
        )
      );

      setCurrentChat((prevChat) =>
        prevChat ? { ...prevChat, messages: [...updatedMessages] } : null
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
        animated: true
      };

      setChats((prevChats) =>
        prevChats.map((chat) =>
          chat.id === currentChat.id ? { ...chat, messages: [...chat.messages, errorMessage] } : chat
        )
      );
    } finally {
      setIsLoading(false);
    }
  };

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

        const notebookMessage: Message = {
          id: uuidv4(),
          sender: 'assistant',
          text: 'Notebook has been generated successfully.',
          timestamp: formatTimestamp(new Date().toISOString()),
          animated: true
        };

        setChats((prevChats) =>
          prevChats.map((chat) =>
            chat.id === currentChat.id ? { ...chat, messages: [...chat.messages, notebookMessage] } : chat
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

  const handleOpenNotebook = () => {
    if (generatedNotebookData) {
      navigate('/notebook', { state: { notebooks: generatedNotebookData } });
    } else {
      alert('No notebook data available.');
    }
  };

  const handleReset = async () => {
    await fetch('http://localhost:8000/api/chatgpt/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'reset', user_id: 'default_user' }),
    });

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
          animated: true
        },
      ],
      isHistory: false
    };

    setChats([initialChat]);
    setCurrentChat(initialChat);

    setIsGeneratingNotebook(false);
    setNotebookGenerated(false);
    setGeneratedNotebookData(null);
  };

  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [currentChat?.messages, isLoading, isUploading]);

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
                      handleDeleteChat(chat.id);
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

      <div className="flex-1 flex flex-col">
        <div className="h-12 border-b border-gray-200 flex items-center px-4 bg-white">
          <button
            onClick={() => setShowSidebar(!showSidebar)}
            className="text-gray-500 hover:text-gray-700"
          >
            <FiMenu size={16} />
          </button>
          <span className="ml-4 text-sm font-medium">{currentChat?.title || 'Select a chat'}</span>
          <div className="ml-auto">
            <button
              onClick={handleReset}
              className="text-xs text-red-500 hover:text-red-600 flex items-center gap-1"
            >
              <FiTrash size={12} /> Reset
            </button>
          </div>
        </div>

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

          {isLoading && (
            <div className="mb-4 flex justify-start">
              <div className="max-w-[80%] rounded-lg px-4 py-2 text-xs bg-white border border-gray-200 flex items-center">
                <FiLoader className="animate-spin mr-2" /> Typing...
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {isUploading && (
          <div className="px-4 py-2 border-t border-gray-200 bg-gray-50 text-teal-700 text-xs flex items-center gap-2">
            <FiLoader className="animate-spin" /> Uploading files...
          </div>
        )}
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

        <div className="p-4 border-t border-gray-200 bg-white">
          <div 
            className="flex items-center gap-2"
            style={{ cursor: isHistoryChat ? 'not-allowed' : 'auto' }}
            title={isHistoryChat ? "🚫 You cannot compose messages in history chats" : ""}
          >
            <label className={`cursor-pointer text-gray-400 hover:text-gray-600 ${isHistoryChat ? 'opacity-50 cursor-not-allowed' : ''}`} title={isHistoryChat ? "🚫 You cannot attach files in history chats" : ""}>
              <input type="file" multiple className="hidden" onChange={handleFileSelect} disabled={isHistoryChat ? true : false} />
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
              title={isHistoryChat ? "🚫 You cannot compose messages in history chats" : ""}
            />
            <button 
              onClick={handleSendMessage} 
              className="text-teal-700 hover:text-teal-800"
              disabled={isHistoryChat ? true : false}
              style={{ cursor: isHistoryChat ? 'not-allowed' : 'pointer' }}
              title={isHistoryChat ? "🚫 You cannot compose messages in history chats" : ""}
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
