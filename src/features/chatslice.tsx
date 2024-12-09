// // src/features/chatSlice.ts
// import { createSlice, PayloadAction } from '@reduxjs/toolkit';
// import { v4 as uuidv4 } from 'uuid';

// interface SchemaField {
//   column_name: string;
//   data_type: string;
// }

// interface Message {
//   id: string;
//   sender: 'user' | 'assistant';
//   text: string;
//   timestamp: string;
//   button?: boolean;
//   isSchema?: boolean;
//   schema?: SchemaField[];
// }

// interface Chat {
//   id: string;
//   title: string;
//   timestamp: string;
//   messages: Message[];
// }

// interface ChatState {
//   chats: Chat[];
//   currentChat: Chat | null;
//   selectedFiles: FileList | null;

//   isLoading: boolean;
//   isUploading: boolean;
//   isGeneratingNotebook: boolean;
//   notebookGenerated: boolean;
//   generatedNotebookData: any;
// }

// const defaultMessage = `Hi! 👋 I'm your AI assistant.
// I'll assist you in formulating a predictive question. I'll then create a SQL notebook to build a training set.
// So, what would you like to predict?`;

// const initialState: ChatState = {
//   chats: [
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
//   ],
//   currentChat: null,
//   selectedFiles: null,
//   isLoading: false,
//   isUploading: false,
//   isGeneratingNotebook: false,
//   notebookGenerated: false,
//   generatedNotebookData: null,
// };

// const chatSlice = createSlice({
//   name: 'chat',
//   initialState,
//   reducers: {
//     setChats: (state, action: PayloadAction<Chat[]>) => {
//       state.chats = action.payload;
//     },
//     setCurrentChat: (state, action: PayloadAction<Chat | null>) => {
//       state.currentChat = action.payload;
//     },
//     setSelectedFiles: (state, action: PayloadAction<FileList | null>) => {
//       state.selectedFiles = action.payload;
//     },
//     setIsLoading: (state, action: PayloadAction<boolean>) => {
//       state.isLoading = action.payload;
//     },
//     setIsUploading: (state, action: PayloadAction<boolean>) => {
//       state.isUploading = action.payload;
//     },
//     setIsGeneratingNotebook: (state, action: PayloadAction<boolean>) => {
//       state.isGeneratingNotebook = action.payload;
//     },
//     setNotebookGenerated: (state, action: PayloadAction<boolean>) => {
//       state.notebookGenerated = action.payload;
//     },
//     setGeneratedNotebookData: (state, action: PayloadAction<any>) => {
//       state.generatedNotebookData = action.payload;
//     },
//     resetConversation: (state) => {
//       const current = state.currentChat;
//       if (current) {
//         const updatedCurrentChat: Chat = {
//           ...current,
//           messages: [
//             {
//               id: uuidv4(),
//               sender: 'assistant',
//               text: defaultMessage,
//               timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
//             },
//           ],
//         };
//         state.chats = state.chats.map(chat =>
//           chat.id === current.id ? updatedCurrentChat : chat
//         );
//         state.currentChat = updatedCurrentChat;
//         state.isGeneratingNotebook = false;
//         state.notebookGenerated = false;
//         state.generatedNotebookData = null;
//       }
//     },
//     addMessageToCurrentChat: (state, action: PayloadAction<Message>) => {
//       const current = state.currentChat;
//       if (!current) return;
//       const updatedChat: Chat = {
//         ...current,
//         messages: [...current.messages, action.payload],
//       };
//       state.chats = state.chats.map(c => (c.id === current.id ? updatedChat : c));
//       state.currentChat = updatedChat;
//     },
//     addNewChat: (state) => {
//       const newChat: Chat = {
//         id: uuidv4(),
//         title: 'New Prediction',
//         timestamp: new Date().toLocaleString(),
//         messages: [
//           {
//             id: uuidv4(),
//             sender: 'assistant',
//             text: defaultMessage,
//             timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
//           },
//         ],
//       };
//       state.chats = [newChat, ...state.chats];
//       state.currentChat = newChat;
//       state.isGeneratingNotebook = false;
//       state.notebookGenerated = false;
//       state.generatedNotebookData = null;
//     },
//     removeChat: (state, action: PayloadAction<string>) => {
//       const chatId = action.payload;
//       state.chats = state.chats.filter(c => c.id !== chatId);
//       if (state.currentChat && state.currentChat.id === chatId) {
//         state.currentChat = state.chats.length > 0 ? state.chats[0] : null;
//       }
//     },
//     setCurrentChatById: (state, action: PayloadAction<string>) => {
//       const chatId = action.payload;
//       const chat = state.chats.find(c => c.id === chatId) || null;
//       state.currentChat = chat;
//     },
//   }
// });

// export const {
//   setChats,
//   setCurrentChat,
//   setSelectedFiles,
//   setIsLoading,
//   setIsUploading,
//   setIsGeneratingNotebook,
//   setNotebookGenerated,
//   setGeneratedNotebookData,
//   resetConversation,
//   addMessageToCurrentChat,
//   addNewChat,
//   removeChat,
//   setCurrentChatById,
// } = chatSlice.actions;

// export default chatSlice.reducer;
