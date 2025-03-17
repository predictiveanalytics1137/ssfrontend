


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
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../Auth/AuthContext';

import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { ScrollArea } from '../components/ui/scroll-area';
import { Avatar } from '../components/ui/avatar';
import { Separator } from '../components/ui/separator';
import { Input } from '../components/ui/input';
import { API_BASE_URL } from '../constants';

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
  const { user_id: paramUserId, chat_id: paramChatId } = useParams<{ user_id?: string; chat_id?: string }>();
  const userId = user?.id || paramUserId || '';
  const navigate = useNavigate();

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

  const [disableChatInput, setDisableChatInput] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement | null>(null);

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
    const response = await fetch(`${API_BASE_URL}/api/chat_history/?user_id=${user_id}`);
    
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
        timestamp: formatTimestamp(msg.timestamp), // Apply formatting here
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

  const createNewChatObject = (): Chat => {
    return {
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
  };

  // ---------------------------------------------------------------------------
  // Initialize chat history
  // ---------------------------------------------------------------------------
  const fetchAndInitializeChats = async () => {
    try {
      if (!userId) {
        const newChat = createNewChatObject();
        setChats([newChat]);
        setCurrentChat(newChat);
        return;
      }
      const fetchedChats = await fetchChatHistory(userId.toString());
      if (fetchedChats.length > 0) {
        if (paramChatId) {
          const selectedChat = fetchedChats.find((chat) => chat.id === paramChatId);
          if (selectedChat) {
            setChats(fetchedChats);
            setCurrentChat(selectedChat);
          } else {
            const newChat = createNewChatObject();
            setCurrentChat(newChat);
            setChats([newChat, ...fetchedChats]);
          }
        } else {
          const newChat = createNewChatObject();
          setCurrentChat(newChat);
          setChats([newChat, ...fetchedChats]);
        }
      } else {
        const newChat = createNewChatObject();
        setChats([newChat]);
        setCurrentChat(newChat);
      }
    } catch (error) {
      console.error("Error fetching chat history:", error);
      const newChat = createNewChatObject();
      setChats([newChat]);
      setCurrentChat(newChat);
    }
  };

  const handleChatHistoryClick = (chat: Chat) => {
    setCurrentChat(chat);
    navigate(`/chat/${userId}/${chat.id}`);
  };

  useEffect(() => {
    fetchAndInitializeChats();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId, paramChatId]);

  // ---------------------------------------------------------------------------
  // File Upload
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
    const response = await fetch(`${API_BASE_URL}/api/chatgpt/`, {
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
  const sendMessage = async (
    message: string,
    user_id: string,
    chat_id?: string,
    new_chat?: boolean
  ): Promise<any> => {
    const payload: any = { message, user_id };
    if (chat_id) payload.chat_id = chat_id;
    if (new_chat) payload.new_chat = true;

    const response = await fetch(`${API_BASE_URL}/api/chatgpt/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
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

    const newChatFlag = !paramChatId;

    try {
      const data = await sendMessage(
        userMessage.text,
        userId?.toString() || 'default_user',
        currentChat.id,
        newChatFlag
      );

      console.log("[DEBUG] handleSendMessage data =>", data);

      const responseText =
        typeof data.response === 'string' ? data.response : String(data.response);
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
          chat.id === currentChat.id ? { ...chat, id: newChatId, messages: updatedMessages } : chat
        )
      );
      setCurrentChat((prevChat) =>
        prevChat ? { ...prevChat, id: newChatId, messages: updatedMessages } : null
      );

      if (!paramChatId) {
        navigate(`/chat/${userId}/${newChatId}`);
      }
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
    navigate('/chat');
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
      const response = await fetch(`${API_BASE_URL}/api/chatgpt/`, {
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
  const handleOpenNotebook = async () => {
    try {
      const notebookChatId = currentChat?.id || generatedChatId;
      const response = await fetch(
        `${API_BASE_URL}/api/predictive-settings/${userId}/${notebookChatId}/`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch predictive settings");
      }
      const predictiveSettings = await response.json();
      console.log("Predictive Settings fetched:", predictiveSettings);
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
    setDisableChatInput(false);
    console.log("Reset clicked - chat re-enabled");
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
                <MessageSquare className="w-5 h-5 " />
                <h2 className="font-semibold ">Chat History</h2>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleNewChat}
                className="h-8 px-2  bg-purple-100"
              >
                <Plus className="w-4 h-4 " />
                <span className="ml-2">New Chat</span>
              </Button>
            </div>
            <Separator className="bg-purple-200" />
            <ScrollArea className="h-[calc(100vh-5rem)] px-2">
              <div className="space-y-2 p-2">
                {chats.map((chat) => (
                  <div
                    key={chat.id}
                    className="cursor-pointer transition-colors"
                    onClick={() => {
                      setCurrentChat(chat);
                      navigate(`/chat/${userId}/${chat.id}`);
                    }}
                  >
                    <Card className={`${currentChat?.id === chat.id ? 'bg-purple-50' : ''}`}>
                      <CardContent className="p-3 flex justify-between items-center">
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-purple-900 truncate">{chat.title}</p>
                          <p className="text-xs font-medium">{chat.timestamp}</p>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="opacity-0 group-hover:opacity-100 text-purple-900 hover:bg-purple-100"
                          onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                            e.stopPropagation();
                            setChats((prev) => prev.filter((c) => c.id !== chat.id));
                          }}
                        >
                          <Trash2 className="w-4 h-4 text-purple-900" />
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
              className="text-purple-900 hover:bg-purple-100"
            >
              <Menu className="w-5 h-5" />
            </Button>
            <h3 className="font-medium ">{currentChat?.title || 'Select a chat'}</h3>
          </div>
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
                      <div className="w-10 h-10 rounded-full bg-purple-100/10 flex items-center justify-center">
                        <MessageSquare className="w-5 h-5 text-purple-900" />
                      </div>
                    </Avatar>
                  )}
                  <div
                    className={`rounded-lg px-4 py-2 ${
                      message.sender === 'user'
                        ? 'bg-purple-100 '
                        : 'bg-purple-50'
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
                    <div className="text-xs mt-1 opacity-70 ">
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
                          className="flex-1 bg-purple-900 text-white hover:bg-purple-950 focus:ring-purple-800"
                        >
                          {isGeneratingNotebook ? (
                            <>
                              <Loader className="w-4 h-4 mr-2 animate-spin text-white" />
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
                          className="flex-1 bg-purple-100 text-purple-900 hover:bg-purple-200 focus:ring-purple-800"
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
                <div className="bg-purple-50 rounded-lg p-4 flex items-center space-x-2">
                  <Loader className="w-4 h-4 animate-spin text-purple-900" />
                  <span className="text-sm ">Typing...</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>

        {isUploading && (
          <div className="px-4 py-2 bg-purple-50 text-sm flex items-center space-x-2 text-purple-900">
            <Loader className="w-4 h-4 animate-spin text-purple-900" />
            <span>Uploading files...</span>
          </div>
        )}

        {selectedFiles && selectedFiles.length > 0 && (
          <div className="p-4 border-t bg-purple-50">
            <div className="flex flex-wrap gap-2">
              {Array.from(selectedFiles).map((file, index) => (
                <Card key={`${file.name}-${index}`} className="p-2 bg-white ">
                  <div className="text-sm text-purple-900">
                    <span className="font-medium">{file.name}</span>
                    <span className=" ml-2">
                      ({(file.size / 1024).toFixed(1)} KB)
                    </span>
                  </div>
                </Card>
              ))}
            </div>
            <Button onClick={handleFileUpload} className="mt-2  text-white  focus:ring-purple-800">
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
              className="text-purple-900 hover:bg-purple-100"
            >
              <Paperclip className="w-5 h-5 " />
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
              className="flex-1  focus:ring-purple-900"
            />
            <Button
              variant="ghost"
              size="icon"
              disabled={currentChat?.isHistory || disableChatInput || !inputMessage.trim()}
              onClick={handleSendMessage}
              className="text-purple-900 hover:bg-purple-100"
            >
              <Send className="w-5 h-5 text-purple-900" />
            </Button>
          </div>
        </footer>
      </div>
    </div>
  );
};

// AnimatedMessage Component
// const AnimatedMessage: React.FC<{ text: string; sender: 'user' | 'assistant'; animated?: boolean }> = ({
//   text,
//   sender,
//   animated,
// }) => {
//   return <pre className="whitespace-pre-wrap font-sans text-sm m-0">{text}</pre>;
// };
// AnimatedMessage Component
const AnimatedMessage: React.FC<{ text: string; sender: 'user' | 'assistant'; animated?: boolean }> = ({
  text,
  sender,
  animated,
}) => {
  // Function to parse the text and render bold text for **word**
  const parseText = (text: string) => {
    // Split the text by ** to identify bold sections
    const parts = text.split(/\*\*(.*?)\*\*/g);

    return parts.map((part, index) => {
      // If the index is odd, this part was between ** and should be bold
      if (index % 2 === 1) {
        return (
          <span key={index} className="font-bold">
            {part}
          </span>
        );
      }
      // Even-indexed parts are regular text
      return <span key={index}>{part}</span>;
    });
  };

  return (
    <pre className="whitespace-pre-wrap font-sans text-sm m-0">
      {parseText(text)}
    </pre>
  );
};

const SchemaTable: React.FC<{
  schema: Array<{ column_name: string; data_type: string }>;
}> = ({ schema }) => {
  return (
    <div className="overflow-x-auto mt-2">
      <table className="min-w-full border-collapse">
        <thead>
          <tr>
            <th className="px-4 py-2 border-b bg-purple-50 text-left text-xs font-medium text-purple-900 uppercase tracking-wider">
              Field
            </th>
            <th className="px-4 py-2 border-b bg-purple-50 text-left text-xs font-medium text-purple-900 uppercase tracking-wider">
              Data Type
            </th>
          </tr>
        </thead>
        <tbody>
          {schema.map((field, index) => (
            <tr key={`${field.column_name}-${index}`} className={index % 2 === 0 ? 'bg-white' : 'bg-purple-50'}>
              <td className="px-4 py-2 border-b text-xs ">{field.column_name}</td>
              <td className="px-4 py-2 border-b text-xs ">{field.data_type}</td>
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