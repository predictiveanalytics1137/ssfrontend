
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
  const [disableChat, setDisableChat] = useState(false);
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
  // const handleSendMessage = async () => {
  //   if (!inputMessage.trim()) return;
  //   if (!currentChat) return;

  //   // Create a user message
  //   const userMessage: Message = {
  //     id: uuidv4(),
  //     sender: 'user',
  //     text: inputMessage,
  //     timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
  //   };

    

  //   // Append the user message to the current chat
  //   const updatedChat = {
  //     ...currentChat,
  //     messages: [...currentChat.messages, userMessage],
  //   };

  //   setChats((prevChats) =>
  //     prevChats.map((chat) => (chat.id === currentChat.id ? updatedChat : chat))
  //   );

  //   setCurrentChat(updatedChat);
  //   setInputMessage('');
  //   setIsLoading(true);

  //   try {
  //     // Send the chat message to the backend
  //     const response = await fetch('http://localhost:8000/api/chatgpt/', {
  //       method: 'POST',
  //       headers: { 'Content-Type': 'application/json' },
  //       body: JSON.stringify({ message: inputMessage }),
  //     });

  //     if (!response.ok) {
  //       throw new Error(`Failed to send message: ${response.statusText}`);
  //     }

  //     const data = await response.json();

  //     // Create an assistant message with the response
  //     const botMessage: Message = {
  //       id: uuidv4(),
  //       sender: 'assistant',
  //       text: data.response,
  //       timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
  //     };

  //     // If the response includes a prompt to generate a notebook, add a button
  //     if (data.response.toLowerCase().includes('proceed to model creation')) {
  //       botMessage.button = true;
  //     }

  //     // Append the assistant message to the current chat
  //     const updatedMessages = [...updatedChat.messages, botMessage];

  //     setChats((prevChats) =>
  //       prevChats.map((chat) =>
  //         chat.id === currentChat.id
  //           ? { ...chat, messages: updatedMessages }
  //           : chat
  //       )
  //     );

  //     setCurrentChat((prevChat) =>
  //       prevChat
  //         ? { ...prevChat, messages: updatedMessages }
  //         : null
  //     );

  //   } catch (error) {
  //     console.error('Error sending message:', error);
  //     const errorMessage: Message = {
  //       id: uuidv4(),
  //       sender: 'assistant',
  //       text: 'Sorry, I encountered an issue. Please try again later.',
  //       timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
  //     };

  //     // Append the error message to the current chat
  //     setChats((prevChats) =>
  //       prevChats.map((chat) =>
  //         chat.id === currentChat.id
  //           ? { ...chat, messages: [...chat.messages, errorMessage] }
  //           : chat
  //       )
  //     );
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  const handleReset = () => {
    // Enable chat functionality on reset
    setDisableChat(false);

    // Optionally, clear the chat messages or reset the current chat
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
  };


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
      let showButtons = false;
  
      // Check if the response includes 'GENERATE_NOTEBOOK_PROMPT' at the end
      if (botText.trim().endsWith('GENERATE_NOTEBOOK_PROMPT')) {
        showButtons = true; // Set the flag to render buttons
        // Remove 'GENERATE_NOTEBOOK_PROMPT' from the text
        botText = botText.replace('GENERATE_NOTEBOOK_PROMPT', '').trim();
      }
  
      // Create an assistant message with the response
      const botMessage: Message = {
        id: uuidv4(),
        sender: 'assistant',
        text: botText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        button: showButtons,
      };
  
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

  // const handleGenerateNotebook = () => {
  //   // Trigger notebook generation
  //   alert('Notebook generation triggered!');

  //   // Disable chat functionality
  //   setDisableChat(true);
  // };

//   const handleGenerateNotebook = () => {
//     // Locate the summary response in the current chat's messages
//     if (!currentChat) return;

//     const summaryMessage = currentChat.messages.find(
//         (message) =>
//             // message.sender === 'assistant' && message.text.startsWith("Great! To summarize:")
//         message.sender === 'assistant' && message.text.startsWith("summarize:")
//     );

//     if (summaryMessage) {
//         console.log("Summary:", summaryMessage.text); // Print the summary in the console
//         alert(summaryMessage.text); // Optionally, show the summary as an alert
//     } else {
//         console.log("No summary found.");
//         alert("No summary available to generate the note.");
//     }

//     // Disable chat functionality
//     setDisableChat(true);
// };


const handleGenerateNotebook = () => {
  // Ensure there is a current chat
  if (!currentChat || !currentChat.messages || currentChat.messages.length === 0) {
      alert("No messages found in the chat.");
      return;
  }

  // Locate the assistant's last summary response
  const summaryMessage = currentChat.messages.reverse().find(
      (message) =>
          message.sender === "assistant" &&
          (message.text.startsWith("Great! To summarize:") || message.text.includes("To summarize"))
  );

  if (summaryMessage) {
      console.log("Summary:", summaryMessage.text); // Print the summary in the console
      alert(summaryMessage.text); // Show the summary in an alert dialog
  } else {
      console.log("No summary found."); // Log for debugging
      alert("No summary available to generate the notebook.");
  }

  // Revert the message order after searching
  currentChat.messages.reverse();

  // Disable chat functionality
  setDisableChat(true);
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
                {/* {message.button && (
                  <button
                    className="mt-2 px-4 py-2 bg-teal-500 text-white text-xs rounded hover:bg-teal-600"
                    onClick={() => window.location.href = '/generate-notebook'}
                  >
                    Generate Notebook
                  </button>
                )} */}



                {/* Render buttons if the message includes them */}
                  {message.button && (
                    <div className="mt-2 flex gap-2">
                      <button
                        className="px-4 py-2 bg-teal-500 text-white text-xs rounded hover:bg-teal-600"
                        // onClick={() => window.location.href = '/generate-notebook'}
                        onClick={handleGenerateNotebook}
                        disabled={disableChat}
                      >
                        Generate Notebook
                      </button>
                      <button
                        className="px-4 py-2 bg-gray-500 text-white text-xs rounded hover:bg-gray-600"
                        onClick={handleReset}
                        disabled={!disableChat}
                      >
                        Reset
                      </button>
                    </div>
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
                disabled={disableChat} // Disable file selection
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
              disabled={disableChat} // Disable text input
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



