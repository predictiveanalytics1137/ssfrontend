// // src/store.ts
// import { configureStore, combineReducers } from '@reduxjs/toolkit';
// import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux';
// import chatReducer from './features/chatslice';
// import notebookReducer from './features/notebookslice';

// import { persistStore, persistReducer } from 'redux-persist';
// import storage from 'redux-persist/lib/storage'; 

// const rootReducer = combineReducers({
//   chat: chatReducer,
//   notebook: notebookReducer,
// });

// const persistConfig = {
//   key: 'root',
//   storage,
//   // If needed, you can blacklist or whitelist certain reducers
// };

// const persistedReducer = persistReducer(persistConfig, rootReducer);

// export const store = configureStore({
//   reducer: persistedReducer,
//   middleware: (getDefaultMiddleware) => getDefaultMiddleware({
//     serializableCheck: false
//   })
// });

// export const persistor = persistStore(store);

// export type AppDispatch = typeof store.dispatch;
// export type RootState = ReturnType<typeof store.getState>;
// export const useAppDispatch: () => AppDispatch = useDispatch;
// export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
