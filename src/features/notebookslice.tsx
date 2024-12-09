// // src/features/notebookSlice.ts
// import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// interface NotebookState {
//   originalNotebookContent: any;
//   editedNotebookContent: any;
// }

// const initialState: NotebookState = {
//   originalNotebookContent: null,
//   editedNotebookContent: null,
// };

// const notebookSlice = createSlice({
//   name: 'notebook',
//   initialState,
//   reducers: {
//     setOriginalNotebookContent: (state, action: PayloadAction<any>) => {
//       state.originalNotebookContent = action.payload;
//     },
//     setEditedNotebookContent: (state, action: PayloadAction<any>) => {
//       state.editedNotebookContent = action.payload;
//     },
//     updateCellQuery: (state, action: PayloadAction<{ cellId: number; newQuery: string }>) => {
//       const { cellId, newQuery } = action.payload;
//       if (state.editedNotebookContent && Array.isArray(state.editedNotebookContent.cells)) {
//         const cell = state.editedNotebookContent.cells.find((c: any) => c.id === cellId && c.cell_type === 'code');
//         if (cell) {
//           cell.source = newQuery;
//         }
//       }
//     },
//     // Add more actions if you need to update markdown cells or add/delete cells
//   }
// });

// export const {
//   setOriginalNotebookContent,
//   setEditedNotebookContent,
//   updateCellQuery,
// } = notebookSlice.actions;

// export default notebookSlice.reducer;
