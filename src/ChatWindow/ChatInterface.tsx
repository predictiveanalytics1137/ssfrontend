

import React, { useState } from 'react';
import { FiPlus, FiMenu, FiPaperclip, FiSend, FiX, FiTrash } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import { v4 as uuidv4 } from 'uuid';

interface Message {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
}

interface Chat {
  id: string;
  title: string;
  timestamp: string;
  messages: Message[];
}

interface FileAttachment {
  id: string;
  name: string;
  size: string;
  url: string; // Add the url property
}

const ChatPage: React.FC = () => {
  const defaultMessage = `Hi! 👋 I'm your AI assistant.\nI'll assist you in formulating a predictive question. I'll then create a SQL notebook to build a training set.\nSo, what would you like to predict?`;

  const [chats, setChats] = useState<Chat[]>([{
    id: '1',
    title: 'New Prediction',
    timestamp: new Date().toLocaleString(),
    messages: [{
      id: uuidv4(),
      sender: 'assistant',
      text: defaultMessage,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }]
  }]);

  const [currentChat, setCurrentChat] = useState<Chat | null>(chats[0]);
  const [showSidebar, setShowSidebar] = useState(true);
  const [inputMessage, setInputMessage] = useState('');
  const [attachments, setAttachments] = useState<FileAttachment[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const handleNewChat = () => {
    const newChat: Chat = {
      id: uuidv4(),
      title: 'New Prediction',
      timestamp: new Date().toLocaleString(),
      messages: [{
        id: uuidv4(),
        sender: 'assistant',
        text: defaultMessage,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }]
    };
    setChats(prev => [newChat, ...prev]);
    setCurrentChat(newChat);
  };

  const handleDeleteChat = (chatId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setChats(prev => prev.filter(chat => chat.id !== chatId));
    if (currentChat?.id === chatId) {
      setCurrentChat(chats.find(chat => chat.id !== chatId) || null);
    }
  };


//   const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
//     const files = Array.from(e.target.files || []);
    
//     setIsUploading(true); // Show uploading spinner

//     for (const file of files) {
//         const formData = new FormData();
//         formData.append('file', file);
//         formData.append('name', file.name); // Include 'name' field

//         try {
//             const response = await fetch('http://localhost:8000/api/upload/', {
//                 method: 'POST',
//                 body: formData,
//             });

//             if (!response.ok) {
//                 const errorText = await response.text();
//                 console.error('Upload failed:', errorText);
//                 throw new Error(`Failed to upload file: ${response.statusText}`);
//             }

//             const result = await response.json();

//             // Add file attachment
//             setAttachments((prev) => [
//                 ...prev,
//                 {
//                     id: result.id,
//                     name: result.name,
//                     size: `${(file.size / 1024).toFixed(1)} KB`,
//                     url: result.file_url,
//                 },
//             ]);

//             // Add schema response to the chat
//             const schemaMessage = `File "${result.name}" uploaded successfully. Here is the schema:\n\n` +
//                 result.schema
//                     .map((col: { 'Column Name': string; 'Data Type': string }) => 
//                         `• ${col['Column Name']}: ${col['Data Type']}`)
//                     .join('\n');

//             const newMessage: Message = {
//                 id: uuidv4(),
//                 sender: 'assistant',
//                 text: schemaMessage,
//                 timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
//             };

//             if (currentChat) {
//                 const updatedChat = {
//                     ...currentChat,
//                     messages: [...currentChat.messages, newMessage],
//                 };

//                 setChats((prev) => 
//                     prev.map((chat) => 
//                         chat.id === currentChat.id ? updatedChat : chat
//                     )
//                 );
//                 setCurrentChat(updatedChat);
//             }
//         } catch (error) {
//             console.error('Error uploading file:', error);
//         }
//     }

//     setIsUploading(false); // Hide uploading spinner
// };


const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
  const files = Array.from(e.target.files || []);
  setIsUploading(true);

  for (const file of files) {
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('http://localhost:8000/api/upload/', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Upload failed:', errorText);
        throw new Error(`Failed to upload file: ${response.statusText}`);
      }

      const result = await response.json();
      setAttachments((prev) => [
        ...prev,
        {
          id: result.id,
          name: result.name,
          size: `${(file.size / 1024).toFixed(1)} KB`,
          url: result.file_url,
        },
      ]);

      alert(`File uploaded successfully: ${result.name}`);
    } catch (error) {
      console.error('Error uploading file:', error);
      alert('Error uploading file. Please try again.');
    }
  }

  setIsUploading(false);
};






  const removeAttachment = async (id: string) => {
    // Ask for confirmation before deleting
    const isConfirmed = window.confirm("Are you sure you want to delete this file? This action cannot be undone.");
    if (!isConfirmed) {
      return; // Abort deletion if user does not confirm
    }

    try {
      // Sending DELETE request to remove the file from the backend and S3
      const response = await fetch(`http://localhost:8000/api/delete/${id}/`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Delete failed:', errorText);
        throw new Error(`Failed to delete file: ${response.statusText}`);
      }

      // Removing attachment from the state if the deletion is successful
      setAttachments(prev => prev.filter(file => file.id !== id));
    } catch (error) {
      console.error('Error deleting file:', error);
    }
  };

  

  const handleSendMessage = async () => {
    if (!inputMessage.trim() && attachments.length === 0) return;
    if (!currentChat) return;

    const newMessages: Message[] = [];
    
    if (inputMessage.trim()) {
        newMessages.push({
            id: uuidv4(),
            sender: 'user',
            text: inputMessage,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        });
    }

    let updatedChat = {
        ...currentChat,
        messages: [...currentChat.messages, ...newMessages],
    };

    setChats((prev) =>
        prev.map((chat) =>
            chat.id === currentChat.id ? updatedChat : chat
        )
    );
    setCurrentChat(updatedChat);
    setInputMessage('');
    setIsLoading(true);

    try {
        const response = await fetch('http://localhost:8000/api/chat/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                user_id: currentChat?.id, // Pass chat ID as user ID
                message: inputMessage,
            }),
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();

        const botResponse: Message = {
            id: uuidv4(),
            sender: 'assistant',
            text: data.response,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        };

        updatedChat = {
            ...updatedChat,
            messages: [...updatedChat.messages, botResponse],
        };

        setChats((prev) =>
            prev.map((chat) =>
                chat.id === currentChat.id ? updatedChat : chat
            )
        );
        setCurrentChat(updatedChat);

        // If mandatory, disable user input
        if (data.mandatory) {
            setInputMessage('');
        }
    } catch (error) {
        console.error('Error fetching response:', error);
        const errorMessage: Message = {
            id: uuidv4(),
            sender: 'assistant',
            text: 'Error: Unable to get a response. Please try again later.',
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        };

        updatedChat = {
            ...updatedChat,
            messages: [...updatedChat.messages, errorMessage],
        };

        setChats((prev) =>
            prev.map((chat) =>
                chat.id === currentChat.id ? updatedChat : chat
            )
        );
        setCurrentChat(updatedChat);
    } finally {
        setIsLoading(false);
    }
};


  return (
    <div className="h-screen flex bg-gray-50">
      {/* Sidebar */}
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
              {chats.map(chat => (
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
          {currentChat?.messages.map(message => (
            <div
              key={message.id}
              className={`mb-4 flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] rounded-lg px-4 py-2 text-xs ${
                  message.sender === 'user'
                    ? 'bg-teal-700 text-white'
                    : 'bg-white border border-gray-200'
                }`}
              >
                <pre className="whitespace-pre-wrap font-sans">{message.text}</pre>
                <div
                  className={`text-[10px] mt-1 ${
                    message.sender === 'user' ? 'text-teal-300' : 'text-gray-400'
                  }`}
                >
                  {message.timestamp}
                </div>
              </div>
            </div>
          ))}
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
        {attachments.length > 0 && (
          <div className="px-4 py-2 border-t border-gray-200 bg-gray-50">
            <div className="flex flex-wrap gap-2">
              {attachments.map(file => (
                <div
                  key={file.id}
                  className="flex items-center gap-2 bg-white px-2 py-1 rounded border text-xs"
                >
                  <span className="truncate max-w-[150px]">{file.name}</span>
                  <button
                    onClick={() => removeAttachment(file.id)}
                    className="text-gray-400 hover:text-red-500"
                  >
                    <FiX size={12} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Input Area */}
        <div className="p-4 border-t border-gray-200 bg-white">
          <div className="flex items-center gap-2">
            <label className="cursor-pointer text-gray-400 hover:text-gray-600">
              <input
                type="file"
                multiple
                className="hidden"
                onChange={handleFileUpload}
              />
              <FiPaperclip size={16} />
            </label>
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Type your message..."
              className="flex-1 text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:border-teal-400"
            />
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

export default ChatPage;
