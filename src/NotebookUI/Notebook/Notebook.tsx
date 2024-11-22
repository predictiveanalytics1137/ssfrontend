

// // // // // // import React, { useState } from 'react';
// // // // // // import Editor from '@monaco-editor/react'; // Monaco Editor for SQL-like code editing
// // // // // // import { Plus, X, Play, ChevronDown, ChevronUp, AlertCircle } from 'lucide-react'; // Icons from lucide-react

// // // // // // // Define the structure of a Cell, representing each SQL query block in the notebook
// // // // // // interface Cell {
// // // // // //   id: number; // Unique identifier for each cell
// // // // // //   query: string; // The SQL query string entered by the user
// // // // // //   result: any[]; // The result rows returned from the query
// // // // // //   columns: string[]; // Column names of the query result
// // // // // //   error: string | null; // Error message if query execution fails
// // // // // //   isExpanded: boolean; // Determines whether the cell's editor is expanded or collapsed
// // // // // // }

// // // // // // // Main component representing the SQL notebook
// // // // // // const SQLNotebook = ({ activeTab = 'notebook1' }) => {
// // // // // //   // State to manage the list of cells in the notebook
// // // // // //   const [cells, setCells] = useState<Cell[]>([
// // // // // //     // Initial state: One cell with default values
// // // // // //     { id: 1, query: '', result: [], columns: [], error: null, isExpanded: true },
// // // // // //   ]);

// // // // // //   // Function to dynamically calculate the editor's height based on content
// // // // // //   const calculateEditorHeight = (content: string) => {
// // // // // //     const lineCount = (content.match(/\n/g) || []).length + 1; // Count the number of lines
// // // // // //     const baseHeight = 150; // Minimum height of the editor
// // // // // //     const lineHeight = 20; // Approximate height per line
// // // // // //     const maxHeight = 500; // Maximum height of the editor
// // // // // //     return `${Math.min(Math.max(baseHeight, lineCount * lineHeight), maxHeight)}px`; // Return a clamped height
// // // // // //   };

// // // // // //   // Function to add a new cell to the notebook
// // // // // //   const addCell = () => {
// // // // // //     setCells(prev => [
// // // // // //       ...prev, // Preserve existing cells
// // // // // //       {
// // // // // //         id: prev.length + 1, // Assign a unique ID to the new cell
// // // // // //         query: '',
// // // // // //         result: [],
// // // // // //         columns: [],
// // // // // //         error: null,
// // // // // //         isExpanded: true,
// // // // // //       },
// // // // // //     ]);
// // // // // //   };

// // // // // //   // Function to delete a cell by its ID
// // // // // //   const deleteCell = (id: number) => {
// // // // // //     setCells(prev => prev.filter(cell => cell.id !== id)); // Remove the cell with the specified ID
// // // // // //   };

// // // // // //   // Function to toggle the expanded/collapsed state of a cell
// // // // // //   const toggleExpand = (id: number) => {
// // // // // //     setCells(prev =>
// // // // // //       prev.map(cell =>
// // // // // //         cell.id === id ? { ...cell, isExpanded: !cell.isExpanded } : cell // Flip the `isExpanded` state
// // // // // //       )
// // // // // //     );
// // // // // //   };

// // // // // //   // Function to execute the SQL query in a specific cell
// // // // // //   const executeQuery = async (cellId: number) => {
// // // // // //     const cell = cells.find(c => c.id === cellId); // Find the cell to execute
// // // // // //     if (!cell) return; // Exit if cell doesn't exist

// // // // // //     try {
// // // // // //       // Make a POST request to the API to execute the query
// // // // // //       const response = await fetch('http://127.0.0.1:8000/api/execute-sql/', {
// // // // // //         method: 'POST',
// // // // // //         headers: {
// // // // // //           'Content-Type': 'application/json',
// // // // // //           Authorization: 'Token d36e47f0e5c0a356d35a7d6d407aab93f6b0d36b', // Token for API authentication
// // // // // //         },
// // // // // //         body: JSON.stringify({ query: cell.query }), // Send the query in the request body
// // // // // //       });

// // // // // //       const data = await response.json(); // Parse the JSON response
// // // // // //       if (!response.ok) throw new Error(data.error || 'Query execution failed'); // Handle server-side errors

// // // // // //       // Update the cell with the query result
// // // // // //       setCells(prev =>
// // // // // //         prev.map(c =>
// // // // // //           c.id === cellId
// // // // // //             ? { ...c, result: data.rows, columns: data.columns, error: null } // Update result and columns
// // // // // //             : c
// // // // // //         )
// // // // // //       );
// // // // // //     } catch (err: any) {
// // // // // //       // Handle errors by updating the cell with the error message
// // // // // //       setCells(prev =>
// // // // // //         prev.map(c =>
// // // // // //           c.id === cellId
// // // // // //             ? { ...c, result: [], columns: [], error: err.message }
// // // // // //             : c
// // // // // //         )
// // // // // //       );
// // // // // //     }
// // // // // //   };

// // // // // //   // Render the SQL Notebook UI
// // // // // //   return (
// // // // // //     <div className="w-full space-y-4 p-6">
// // // // // //       {/* Header section */}
// // // // // //       <div className="text-lg font-medium text-center pb-3 border-b border-teal-700">
// // // // // //         <span className="bg-gradient-to-r from-teal-600 to-emerald-500 bg-clip-text text-transparent">
// // // // // //           {activeTab === 'notebook1' && 'Data Analysis Notebook'} {/* Tab 1 */}
// // // // // //           {activeTab === 'notebook2' && 'Model Training Notebook'} {/* Tab 2 */}
// // // // // //           {activeTab === 'notebook3' && 'Predictions Notebook'} {/* Tab 3 */}
// // // // // //         </span>
// // // // // //       </div>

// // // // // //       {/* Render each cell */}
// // // // // //       <div className="space-y-4">
// // // // // //         {cells.map(cell => (
// // // // // //           <div
// // // // // //             key={cell.id}
// // // // // //             className="bg-white rounded-lg border border-gray-100 shadow-sm transition-all duration-200 hover:shadow-md group"
// // // // // //           >
// // // // // //             <div className="p-4">
// // // // // //               {/* Cell Header: Title and Controls */}
// // // // // //               <div className="flex items-center justify-between mb-2">
// // // // // //                 <div className="flex items-center space-x-2">
// // // // // //                   <span className="text-xs font-medium text-gray-400">Query {cell.id}</span>
// // // // // //                   <button
// // // // // //                     onClick={() => toggleExpand(cell.id)}
// // // // // //                     className="p-1 hover:bg-gray-100 rounded-md transition-colors"
// // // // // //                   >
// // // // // //                     {/* Toggle expand/collapse icon */}
// // // // // //                     {cell.isExpanded ? (
// // // // // //                       <ChevronUp className="h-4 w-4 text-gray-400" />
// // // // // //                     ) : (
// // // // // //                       <ChevronDown className="h-4 w-4 text-gray-400" />
// // // // // //                     )}
// // // // // //                   </button>
// // // // // //                 </div>
// // // // // //                 <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
// // // // // //                   {/* Execute Query button */}
// // // // // //                   <button
// // // // // //                     onClick={() => executeQuery(cell.id)}
// // // // // //                     className="flex items-center px-3 py-1.5 text-xs font-medium text-teal-700 bg-teal-50 rounded-md hover:bg-teal-100 transition-colors"
// // // // // //                   >
// // // // // //                     <Play className="h-3 w-3 mr-1" /> Run
// // // // // //                   </button>
// // // // // //                   {/* Delete Cell button */}
// // // // // //                   <button
// // // // // //                     onClick={() => deleteCell(cell.id)}
// // // // // //                     className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-md transition-colors"
// // // // // //                   >
// // // // // //                     <X className="h-4 w-4" />
// // // // // //                   </button>
// // // // // //                 </div>
// // // // // //               </div>

// // // // // //               {/* Expandable Editor and Result/Error Display */}
// // // // // //               {cell.isExpanded && (
// // // // // //                 <>
// // // // // //                   {/* SQL Editor */}
// // // // // //                   <div className="border rounded-lg overflow-hidden bg-gray-50">
// // // // // //                     <Editor
// // // // // //                       height={calculateEditorHeight(cell.query)} // Dynamically calculated height
// // // // // //                       defaultLanguage="sql" // Language mode
// // // // // //                       value={cell.query} // Query text
// // // // // //                       onChange={(value) =>
// // // // // //                         setCells(prev =>
// // // // // //                           prev.map(c =>
// // // // // //                             c.id === cell.id ? { ...c, query: value || '' } : c // Update query in state
// // // // // //                           )
// // // // // //                         )
// // // // // //                       }
// // // // // //                       options={{
// // // // // //                         minimap: { enabled: false },
// // // // // //                         fontSize: 13,
// // // // // //                         lineHeight: 1.5,
// // // // // //                         padding: { top: 8, bottom: 8 },
// // // // // //                         scrollBeyondLastLine: false,
// // // // // //                         overviewRulerBorder: false,
// // // // // //                         scrollbar: {
// // // // // //                           vertical: 'auto',
// // // // // //                           horizontal: 'auto',
// // // // // //                         },
// // // // // //                         automaticLayout: true,
// // // // // //                       }}
// // // // // //                     />
// // // // // //                   </div>

// // // // // //                   {/* Error Display */}
// // // // // //                   {cell.error && (
// // // // // //                     <div className="mt-3 flex items-start space-x-2 px-4 py-3 bg-red-50 border border-red-100 rounded-lg">
// // // // // //                       <AlertCircle className="h-4 w-4 text-red-500 mt-0.5" />
// // // // // //                       <span className="text-xs text-red-600">{cell.error}</span>
// // // // // //                     </div>
// // // // // //                   )}

// // // // // //                   {/* Query Result Table */}
// // // // // //                   {cell.result.length > 0 && (
// // // // // //                     <div className="mt-4 border rounded-lg overflow-hidden bg-gray-50">
// // // // // //                       <div className="overflow-x-auto">
// // // // // //                         <table className="w-full text-xs">
// // // // // //                           <thead>
// // // // // //                             <tr className="bg-gray-100/80">
// // // // // //                               {cell.columns.map(col => (
// // // // // //                                 <th
// // // // // //                                   key={col}
// // // // // //                                   className="px-4 py-2.5 text-left font-medium text-gray-700 border-b border-gray-200"
// // // // // //                                 >
// // // // // //                                   {col}
// // // // // //                                 </th>
// // // // // //                               ))}
// // // // // //                             </tr>
// // // // // //                           </thead>
// // // // // //                           <tbody>
// // // // // //                             {cell.result.map((row, idx) => (
// // // // // //                               <tr
// // // // // //                                 key={idx}
// // // // // //                                 className="border-b border-gray-100 last:border-0 hover:bg-white/60 transition-colors"
// // // // // //                               >
// // // // // //                                 {row.map((value: any, colIdx: number) => (
// // // // // //                                   <td
// // // // // //                                     key={colIdx}
// // // // // //                                     className="px-4 py-2.5 text-gray-800 font-normal"
// // // // // //                                   >
// // // // // //                                     {value}
// // // // // //                                   </td>
// // // // // //                                 ))}
// // // // // //                               </tr>
// // // // // //                             ))}
// // // // // //                           </tbody>
// // // // // //                         </table>
// // // // // //                       </div>
// // // // // //                     </div>
// // // // // //                   )}
// // // // // //                 </>
// // // // // //               )}
// // // // // //             </div>
// // // // // //           </div>
// // // // // //         ))}
// // // // // //       </div>

// // // // // //       {/* Add Cell Button */}
// // // // // //       <button
// // // // // //         onClick={addCell}
// // // // // //         className="flex items-center px-4 py-2 text-xs font-medium text-teal-700 hover:text-teal-700 hover:bg-teal-50 rounded-md transition-colors"
// // // // // //       >
// // // // // //         <Plus className="h-4 w-4 mr-1" />
// // // // // //         Add shell
// // // // // //       </button>
// // // // // //     </div>
// // // // // //   );
// // // // // // };

// // // // // // export default SQLNotebook;



// // // // // // // import React, { useState, useRef, useEffect } from 'react';
// // // // // // // import Editor from '@monaco-editor/react';
// // // // // // // import { Plus, X, Play, ChevronDown, ChevronUp, AlertCircle, Terminal, FileText } from 'lucide-react';

// // // // // // // interface Cell {
// // // // // // //   id: number;
// // // // // // //   type: 'query' | 'text';  // New type field to distinguish between query and text cells
// // // // // // //   content: string;         // Generic content field (either SQL query or text)
// // // // // // //   result: any[];
// // // // // // //   columns: string[];
// // // // // // //   error: string | null;
// // // // // // //   isExpanded: boolean;
// // // // // // // }

// // // // // // // // New component for the hover menu
// // // // // // // interface Position {
// // // // // // //   x: number;
// // // // // // //   y: number;
// // // // // // // }

// // // // // // // const CreateShellMenu = ({ position, onCreateCell }: { position: Position | null; onCreateCell: (type: 'query' | 'text') => void }) => {
// // // // // // //   if (!position) return null;

// // // // // // //   return (
// // // // // // //     <div 
// // // // // // //       className="absolute bg-white rounded-lg shadow-lg border border-gray-200 p-2 z-50 w-48"
// // // // // // //       style={{ 
// // // // // // //         left: position.x, 
// // // // // // //         top: position.y,
// // // // // // //         transform: 'translate(-50%, -50%)'
// // // // // // //       }}
// // // // // // //     >
// // // // // // //       <button
// // // // // // //         onClick={() => onCreateCell('query')}
// // // // // // //         className="w-full flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md"
// // // // // // //       >
// // // // // // //         <Terminal className="h-4 w-4 mr-2" />
// // // // // // //         Query Shell
// // // // // // //       </button>
// // // // // // //       <button
// // // // // // //         onClick={() => onCreateCell('text')}
// // // // // // //         className="w-full flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md"
// // // // // // //       >
// // // // // // //         <FileText className="h-4 w-4 mr-2" />
// // // // // // //         Text Shell
// // // // // // //       </button>
// // // // // // //     </div>
// // // // // // //   );
// // // // // // // };

// // // // // // // const SQLNotebook = ({ activeTab = 'notebook1' }) => {
// // // // // // //   const [cells, setCells] = useState<Cell[]>([
// // // // // // //     { id: 1, type: 'query', content: '', result: [], columns: [], error: null, isExpanded: true },
// // // // // // //   ]);
// // // // // // //   const [menuPosition, setMenuPosition] = useState<Position | null>(null);
// // // // // // //   const notebookRef = useRef<HTMLDivElement | null>(null);

// // // // // // //   const handleNotebookClick = (e: React.MouseEvent<HTMLDivElement>) => {
// // // // // // //     // Only show menu if clicking on the notebook container directly (not on cells)
// // // // // // //     if (e.target === notebookRef.current) {
// // // // // // //       setMenuPosition({ x: e.clientX, y: e.clientY });
// // // // // // //     }
// // // // // // //   };

// // // // // // //   // Hide menu when clicking outside
// // // // // // //   useEffect(() => {
// // // // // // //     const handleClickOutside = (e: { target: any; }) => {
// // // // // // //       if (notebookRef.current && !notebookRef.current.contains(e.target)) {
// // // // // // //         setMenuPosition(null);
// // // // // // //       }
// // // // // // //     };

// // // // // // //     document.addEventListener('click', handleClickOutside);
// // // // // // //     return () => document.removeEventListener('click', handleClickOutside);
// // // // // // //   }, []);

// // // // // // //   const calculateEditorHeight = (content: string) => {
// // // // // // //     const lineCount = (content.match(/\n/g) || []).length + 1;
// // // // // // //     const baseHeight = 150;
// // // // // // //     const lineHeight = 20;
// // // // // // //     const maxHeight = 500;
// // // // // // //     return `${Math.min(Math.max(baseHeight, lineCount * lineHeight), maxHeight)}px`;
// // // // // // //   };

// // // // // // //   const createCell = (type: 'query' | 'text') => {
// // // // // // //     setCells(prev => [
// // // // // // //       ...prev,
// // // // // // //       {
// // // // // // //         id: prev.length + 1,
// // // // // // //         type,
// // // // // // //         content: '',
// // // // // // //         result: [],
// // // // // // //         columns: [],
// // // // // // //         error: null,
// // // // // // //         isExpanded: true,
// // // // // // //       },
// // // // // // //     ]);
// // // // // // //     setMenuPosition(null);
// // // // // // //   };

// // // // // // //   const deleteCell = (id: number) => {
// // // // // // //     setCells(prev => prev.filter(cell => cell.id !== id));
// // // // // // //   };

// // // // // // //   const toggleExpand = (id: number) => {
// // // // // // //     setCells(prev =>
// // // // // // //       prev.map(cell =>
// // // // // // //         cell.id === id ? { ...cell, isExpanded: !cell.isExpanded } : cell
// // // // // // //       )
// // // // // // //     );
// // // // // // //   };

// // // // // // //   const executeQuery = async (cellId: number) => {
// // // // // // //     const cell = cells.find(c => c.id === cellId);
// // // // // // //     if (!cell || cell.type !== 'query') return;

// // // // // // //     try {
// // // // // // //       const response = await fetch('http://127.0.0.1:8000/api/execute-sql/', {
// // // // // // //         method: 'POST',
// // // // // // //         headers: {
// // // // // // //           'Content-Type': 'application/json',
// // // // // // //           Authorization: 'Token d36e47f0e5c0a356d35a7d6d407aab93f6b0d36b',
// // // // // // //         },
// // // // // // //         body: JSON.stringify({ query: cell.content }),
// // // // // // //       });

// // // // // // //       const data = await response.json();
// // // // // // //       if (!response.ok) throw new Error(data.error || 'Query execution failed');

// // // // // // //       setCells(prev =>
// // // // // // //         prev.map(c =>
// // // // // // //           c.id === cellId
// // // // // // //             ? { ...c, result: data.rows, columns: data.columns, error: null }
// // // // // // //             : c
// // // // // // //         )
// // // // // // //       );
// // // // // // //     } catch (err: any) {
// // // // // // //       setCells(prev =>
// // // // // // //         prev.map(c =>
// // // // // // //           c.id === cellId
// // // // // // //             ? { ...c, result: [], columns: [], error: err.message }
// // // // // // //             : c
// // // // // // //         )
// // // // // // //       );
// // // // // // //     }
// // // // // // //   };

// // // // // // //   return (
// // // // // // //     <div 
// // // // // // //       ref={notebookRef}
// // // // // // //       className="w-full space-y-4 p-6 min-h-screen relative"
// // // // // // //       onClick={handleNotebookClick}
// // // // // // //     >
// // // // // // //       <div className="text-lg font-medium text-center pb-3 border-b border-teal-700">
// // // // // // //         <span className="bg-gradient-to-r from-teal-600 to-emerald-500 bg-clip-text text-transparent">
// // // // // // //           {activeTab === 'notebook1' && 'Data Analysis Notebook'}
// // // // // // //           {activeTab === 'notebook2' && 'Model Training Notebook'}
// // // // // // //           {activeTab === 'notebook3' && 'Predictions Notebook'}
// // // // // // //         </span>
// // // // // // //       </div>

// // // // // // //       <div className="space-y-4">
// // // // // // //         {cells.map(cell => (
// // // // // // //           <div
// // // // // // //             key={cell.id}
// // // // // // //             className="bg-white rounded-lg border border-gray-100 shadow-sm transition-all duration-200 hover:shadow-md group"
// // // // // // //           >
// // // // // // //             <div className="p-4">
// // // // // // //               <div className="flex items-center justify-between mb-2">
// // // // // // //                 <div className="flex items-center space-x-2">
// // // // // // //                   <span className="text-xs font-medium text-gray-400">
// // // // // // //                     {cell.type === 'query' ? `Query ${cell.id}` : `Text ${cell.id}`}
// // // // // // //                   </span>
// // // // // // //                   <button
// // // // // // //                     onClick={() => toggleExpand(cell.id)}
// // // // // // //                     className="p-1 hover:bg-gray-100 rounded-md transition-colors"
// // // // // // //                   >
// // // // // // //                     {cell.isExpanded ? (
// // // // // // //                       <ChevronUp className="h-4 w-4 text-gray-400" />
// // // // // // //                     ) : (
// // // // // // //                       <ChevronDown className="h-4 w-4 text-gray-400" />
// // // // // // //                     )}
// // // // // // //                   </button>
// // // // // // //                 </div>
// // // // // // //                 <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
// // // // // // //                   {cell.type === 'query' && (
// // // // // // //                     <button
// // // // // // //                       onClick={() => executeQuery(cell.id)}
// // // // // // //                       className="flex items-center px-3 py-1.5 text-xs font-medium text-teal-700 bg-teal-50 rounded-md hover:bg-teal-100 transition-colors"
// // // // // // //                     >
// // // // // // //                       <Play className="h-3 w-3 mr-1" /> Run
// // // // // // //                     </button>
// // // // // // //                   )}
// // // // // // //                   <button
// // // // // // //                     onClick={() => deleteCell(cell.id)}
// // // // // // //                     className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-md transition-colors"
// // // // // // //                   >
// // // // // // //                     <X className="h-4 w-4" />
// // // // // // //                   </button>
// // // // // // //                 </div>
// // // // // // //               </div>

// // // // // // //               {cell.isExpanded && (
// // // // // // //                 <>
// // // // // // //                   <div className="border rounded-lg overflow-hidden bg-gray-50">
// // // // // // //                     {cell.type === 'query' ? (
// // // // // // //                       <Editor
// // // // // // //                         height={calculateEditorHeight(cell.content)}
// // // // // // //                         defaultLanguage="sql"
// // // // // // //                         value={cell.content}
// // // // // // //                         onChange={(value) =>
// // // // // // //                           setCells(prev =>
// // // // // // //                             prev.map(c =>
// // // // // // //                               c.id === cell.id ? { ...c, content: value || '' } : c
// // // // // // //                             )
// // // // // // //                           )
// // // // // // //                         }
// // // // // // //                         options={{
// // // // // // //                           minimap: { enabled: false },
// // // // // // //                           fontSize: 13,
// // // // // // //                           lineHeight: 1.5,
// // // // // // //                           padding: { top: 8, bottom: 8 },
// // // // // // //                           scrollBeyondLastLine: false,
// // // // // // //                           overviewRulerBorder: false,
// // // // // // //                           scrollbar: {
// // // // // // //                             vertical: 'auto',
// // // // // // //                             horizontal: 'auto',
// // // // // // //                           },
// // // // // // //                           automaticLayout: true,
// // // // // // //                         }}
// // // // // // //                       />
// // // // // // //                     ) : (
// // // // // // //                       <textarea
// // // // // // //                         value={cell.content}
// // // // // // //                         onChange={(e) =>
// // // // // // //                           setCells(prev =>
// // // // // // //                             prev.map(c =>
// // // // // // //                               c.id === cell.id ? { ...c, content: e.target.value } : c
// // // // // // //                             )
// // // // // // //                           )
// // // // // // //                         }
// // // // // // //                         className="w-full p-4 min-h-[150px] bg-white resize-y"
// // // // // // //                         placeholder="Enter your documentation here..."
// // // // // // //                       />
// // // // // // //                     )}
// // // // // // //                   </div>

// // // // // // //                   {cell.type === 'query' && cell.error && (
// // // // // // //                     <div className="mt-3 flex items-start space-x-2 px-4 py-3 bg-red-50 border border-red-100 rounded-lg">
// // // // // // //                       <AlertCircle className="h-4 w-4 text-red-500 mt-0.5" />
// // // // // // //                       <span className="text-xs text-red-600">{cell.error}</span>
// // // // // // //                     </div>
// // // // // // //                   )}

// // // // // // //                   {cell.type === 'query' && cell.result.length > 0 && (
// // // // // // //                     <div className="mt-4 border rounded-lg overflow-hidden bg-gray-50">
// // // // // // //                       <div className="overflow-x-auto">
// // // // // // //                         <table className="w-full text-xs">
// // // // // // //                           <thead>
// // // // // // //                             <tr className="bg-gray-100/80">
// // // // // // //                               {cell.columns.map(col => (
// // // // // // //                                 <th
// // // // // // //                                   key={col}
// // // // // // //                                   className="px-4 py-2.5 text-left font-medium text-gray-700 border-b border-gray-200"
// // // // // // //                                 >
// // // // // // //                                   {col}
// // // // // // //                                 </th>
// // // // // // //                               ))}
// // // // // // //                             </tr>
// // // // // // //                           </thead>
// // // // // // //                           <tbody>
// // // // // // //                             {cell.result.map((row, idx) => (
// // // // // // //                               <tr
// // // // // // //                                 key={idx}
// // // // // // //                                 className="border-b border-gray-100 last:border-0 hover:bg-white/60 transition-colors"
// // // // // // //                               >
// // // // // // //                                 {row.map((value: any, colIdx: number) => (
// // // // // // //                                   <td
// // // // // // //                                     key={colIdx}
// // // // // // //                                     className="px-4 py-2.5 text-gray-800 font-normal"
// // // // // // //                                   >
// // // // // // //                                     {value}
// // // // // // //                                   </td>
// // // // // // //                                 ))}
// // // // // // //                               </tr>
// // // // // // //                             ))}
// // // // // // //                           </tbody>
// // // // // // //                         </table>
// // // // // // //                       </div>
// // // // // // //                     </div>
// // // // // // //                   )}
// // // // // // //                 </>
// // // // // // //               )}
// // // // // // //             </div>
// // // // // // //           </div>
// // // // // // //         ))}
// // // // // // //       </div>

// // // // // // //       <CreateShellMenu 
// // // // // // //         position={menuPosition}
// // // // // // //         onCreateCell={createCell}
// // // // // // //       />
// // // // // // //     </div>
// // // // // // //   );
// // // // // // // };

// // // // // // // export default SQLNotebook;



// // // // // import React, { useState } from 'react';
// // // // // import Editor from '@monaco-editor/react'; // Monaco Editor for SQL editing
// // // // // import { Plus, X, Play, ChevronDown, ChevronUp, AlertCircle } from 'lucide-react'; // Icons

// // // // // // Define the structure of a Cell, representing each SQL query block in the notebook
// // // // // interface Cell {
// // // // //   id: number; // Unique identifier for each cell
// // // // //   query: string; // The SQL query string entered by the user
// // // // //   result: any[]; // The result rows returned from the query
// // // // //   columns: string[]; // Column names of the query result
// // // // //   error: string | null; // Error message if query execution fails
// // // // //   isExpanded: boolean; // Determines whether the cell's editor is expanded or collapsed
// // // // // }

// // // // // // Main component representing the SQL notebook
// // // // // const SQLNotebook = ({ activeTab = 'notebook1' }) => {
// // // // //   // State to manage the list of cells in the notebook
// // // // //   const [cells, setCells] = useState<Cell[]>([
// // // // //     // Initial state: One cell with default values
// // // // //     { id: 1, query: '', result: [], columns: [], error: null, isExpanded: true },
// // // // //   ]);

// // // // //   // Function to dynamically calculate the editor's height based on content
// // // // //   const calculateEditorHeight = (content: string) => {
// // // // //     const lineCount = (content.match(/\n/g) || []).length + 1; // Count the number of lines
// // // // //     const baseHeight = 150; // Minimum height of the editor
// // // // //     const lineHeight = 20; // Approximate height per line
// // // // //     const maxHeight = 500; // Maximum height of the editor
// // // // //     return `${Math.min(Math.max(baseHeight, lineCount * lineHeight), maxHeight)}px`; // Return a clamped height
// // // // //   };

// // // // //   // Function to add a new cell to the notebook
// // // // //   const addCell = () => {
// // // // //     setCells(prev => [
// // // // //       ...prev, // Preserve existing cells
// // // // //       {
// // // // //         id: prev.length + 1, // Assign a unique ID to the new cell
// // // // //         query: '',
// // // // //         result: [],
// // // // //         columns: [],
// // // // //         error: null,
// // // // //         isExpanded: true,
// // // // //       },
// // // // //     ]);
// // // // //   };

// // // // //   // Function to delete a cell by its ID
// // // // //   const deleteCell = (id: number) => {
// // // // //     setCells(prev => prev.filter(cell => cell.id !== id)); // Remove the cell with the specified ID
// // // // //   };

// // // // //   // Function to toggle the expanded/collapsed state of a cell
// // // // //   const toggleExpand = (id: number) => {
// // // // //     setCells(prev =>
// // // // //       prev.map(cell =>
// // // // //         cell.id === id ? { ...cell, isExpanded: !cell.isExpanded } : cell // Flip the `isExpanded` state
// // // // //       )
// // // // //     );
// // // // //   };

// // // // //   // Function to execute the SQL query in a specific cell
// // // // //   // const executeQuery = async (cellId: number) => {
// // // // //   //   const cell = cells.find(c => c.id === cellId); // Find the cell to execute
// // // // //   //   if (!cell) return; // Exit if cell doesn't exist

// // // // //   //   try {
// // // // //   //     const response = await fetch('/api/execute-sql/', {
// // // // //   //       method: 'POST',
// // // // //   //       headers: {
// // // // //   //         'Content-Type': 'application/json',
// // // // //   //       },
// // // // //   //       body: JSON.stringify({ query: cell.query }),
// // // // //   //     });
    
// // // // //   //     if (!response.ok) {
// // // // //   //       const errorData = await response.json().catch(() => ({ error: 'Unknown error occurred' }));
// // // // //   //       throw new Error(errorData.error || 'Query execution failed');
// // // // //   //     }
    
// // // // //   //     const data = await response.json();
// // // // //   //     setCells(prev =>
// // // // //   //       prev.map(c =>
// // // // //   //         c.id === cellId ? { ...c, result: data.rows, columns: data.columns, error: null } : c
// // // // //   //       )
// // // // //   //     );
// // // // //   //   } catch (err: any) {
// // // // //   //     setCells(prev =>
// // // // //   //       prev.map(c =>
// // // // //   //         c.id === cellId
// // // // //   //           ? { ...c, result: [], columns: [], error: err.message || 'Unknown error' }
// // // // //   //           : c
// // // // //   //       )
// // // // //   //     );
// // // // //   //   }
    
// // // // //   // };



// // // // //   const executeQuery = async (cellId: number) => {
// // // // //     const cell = cells.find(c => c.id === cellId);
// // // // //     if (!cell) return;

// // // // //     try {
// // // // //       const response = await fetch('/api/execute-sql/', {
// // // // //         method: 'POST',
// // // // //         headers: {
// // // // //           'Content-Type': 'application/json',
// // // // //           Authorization: 'Token d36e47f0e5c0a356d35a7d6d407aab93f6b0d36b',// Optional if authentication is enabled
// // // // //         },
// // // // //         body: JSON.stringify({ query: cell.query }),
// // // // //       });
      

// // // // //         if (!response.ok) {
// // // // //             const errorData = await response.json().catch(() => ({ error: 'Unknown error occurred' }));
// // // // //             throw new Error(errorData.error || 'Query execution failed');
// // // // //         }

// // // // //         const data = await response.json();
// // // // //         setCells(prev =>
// // // // //             prev.map(c =>
// // // // //                 c.id === cellId
// // // // //                     ? { ...c, result: data.rows, columns: data.columns, error: null }
// // // // //                     : c
// // // // //             )
// // // // //         );
// // // // //     } catch (err: any) {
// // // // //         setCells(prev =>
// // // // //             prev.map(c =>
// // // // //                 c.id === cellId
// // // // //                     ? { ...c, result: [], columns: [], error: err.message || 'Unknown error' }
// // // // //                     : c
// // // // //             )
// // // // //         );
// // // // //     }
// // // // // };


// // // // //   // Render the SQL Notebook UI
// // // // //   return (
// // // // //     <div className="w-full space-y-4 p-6">
// // // // //       {/* Header section */}
// // // // //       <div className="text-lg font-medium text-center pb-3 border-b border-teal-700">
// // // // //         <span className="bg-gradient-to-r from-teal-600 to-emerald-500 bg-clip-text text-transparent">
// // // // //           {activeTab === 'notebook1' && 'Data Analysis Notebook'} {/* Tab 1 */}
// // // // //           {activeTab === 'notebook2' && 'Model Training Notebook'} {/* Tab 2 */}
// // // // //           {activeTab === 'notebook3' && 'Predictions Notebook'} {/* Tab 3 */}
// // // // //         </span>
// // // // //       </div>

// // // // //       {/* Render each cell */}
// // // // //       <div className="space-y-4">
// // // // //         {cells.map(cell => (
// // // // //           <div
// // // // //             key={cell.id}
// // // // //             className="bg-white rounded-lg border border-gray-100 shadow-sm transition-all duration-200 hover:shadow-md group"
// // // // //           >
// // // // //             <div className="p-4">
// // // // //               {/* Cell Header: Title and Controls */}
// // // // //               <div className="flex items-center justify-between mb-2">
// // // // //                 <div className="flex items-center space-x-2">
// // // // //                   <span className="text-xs font-medium text-gray-400">Query {cell.id}</span>
// // // // //                   <button
// // // // //                     onClick={() => toggleExpand(cell.id)}
// // // // //                     className="p-1 hover:bg-gray-100 rounded-md transition-colors"
// // // // //                   >
// // // // //                     {/* Toggle expand/collapse icon */}
// // // // //                     {cell.isExpanded ? (
// // // // //                       <ChevronUp className="h-4 w-4 text-gray-400" />
// // // // //                     ) : (
// // // // //                       <ChevronDown className="h-4 w-4 text-gray-400" />
// // // // //                     )}
// // // // //                   </button>
// // // // //                 </div>
// // // // //                 <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
// // // // //                   {/* Execute Query button */}
// // // // //                   <button
// // // // //                     onClick={() => executeQuery(cell.id)}
// // // // //                     className="flex items-center px-3 py-1.5 text-xs font-medium text-teal-700 bg-teal-50 rounded-md hover:bg-teal-100 transition-colors"
// // // // //                   >
// // // // //                     <Play className="h-3 w-3 mr-1" /> Run
// // // // //                   </button>
// // // // //                   {/* Delete Cell button */}
// // // // //                   <button
// // // // //                     onClick={() => deleteCell(cell.id)}
// // // // //                     className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-md transition-colors"
// // // // //                   >
// // // // //                     <X className="h-4 w-4" />
// // // // //                   </button>
// // // // //                 </div>
// // // // //               </div>

// // // // //               {/* Expandable Editor and Result/Error Display */}
// // // // //               {cell.isExpanded && (
// // // // //                 <>
// // // // //                   {/* SQL Editor */}
// // // // //                   <div className="border rounded-lg overflow-hidden bg-gray-50">
// // // // //                     <Editor
// // // // //                       height={calculateEditorHeight(cell.query)} // Dynamically calculated height
// // // // //                       defaultLanguage="sql" // Language mode
// // // // //                       value={cell.query} // Query text
// // // // //                       onChange={(value) =>
// // // // //                         setCells(prev =>
// // // // //                           prev.map(c =>
// // // // //                             c.id === cell.id ? { ...c, query: value || '' } : c // Update query in state
// // // // //                           )
// // // // //                         )
// // // // //                       }
// // // // //                       options={{
// // // // //                         minimap: { enabled: false },
// // // // //                         fontSize: 13,
// // // // //                         lineHeight: 1.5,
// // // // //                         padding: { top: 8, bottom: 8 },
// // // // //                         scrollBeyondLastLine: false,
// // // // //                         overviewRulerBorder: false,
// // // // //                         scrollbar: {
// // // // //                           vertical: 'auto',
// // // // //                           horizontal: 'auto',
// // // // //                         },
// // // // //                         automaticLayout: true,
// // // // //                       }}
// // // // //                     />
// // // // //                   </div>

// // // // //                   {/* Error Display */}
// // // // //                   {cell.error && (
// // // // //                     <div className="mt-3 flex items-start space-x-2 px-4 py-3 bg-red-50 border border-red-100 rounded-lg">
// // // // //                       <AlertCircle className="h-4 w-4 text-red-500 mt-0.5" />
// // // // //                       <span className="text-xs text-red-600">{cell.error}</span>
// // // // //                     </div>
// // // // //                   )}

// // // // //                   {/* Query Result Table */}
// // // // //                   {cell.result.length > 0 && (
// // // // //                     <div className="mt-4 border rounded-lg overflow-hidden bg-gray-50">
// // // // //                       <div className="overflow-x-auto">
// // // // //                         <table className="w-full text-xs">
// // // // //                           <thead>
// // // // //                             <tr className="bg-gray-100/80">
// // // // //                               {cell.columns.map(col => (
// // // // //                                 <th
// // // // //                                   key={col}
// // // // //                                   className="px-4 py-2.5 text-left font-medium text-gray-700 border-b border-gray-200"
// // // // //                                 >
// // // // //                                   {col}
// // // // //                                 </th>
// // // // //                               ))}
// // // // //                             </tr>
// // // // //                           </thead>
// // // // //                           <tbody>
// // // // //                             {cell.result.map((row, idx) => (
// // // // //                               <tr
// // // // //                                 key={idx}
// // // // //                                 className="border-b border-gray-100 last:border-0 hover:bg-white/60 transition-colors"
// // // // //                               >
// // // // //                                 {cell.columns.map((col, colIdx) => (
// // // // //                                   <td
// // // // //                                     key={colIdx}
// // // // //                                     className="px-4 py-2.5 text-gray-800 font-normal"
// // // // //                                   >
// // // // //                                     {row[col]}
// // // // //                                   </td>
// // // // //                                 ))}
// // // // //                               </tr>
// // // // //                             ))}
// // // // //                           </tbody>
// // // // //                         </table>
// // // // //                       </div>
// // // // //                     </div>
// // // // //                   )}
// // // // //                 </>
// // // // //               )}
// // // // //             </div>
// // // // //           </div>
// // // // //         ))}
// // // // //       </div>

// // // // //       {/* Add Cell Button */}
// // // // //       <button
// // // // //         onClick={addCell}
// // // // //         className="flex items-center px-4 py-2 text-xs font-medium text-teal-700 hover:text-teal-700 hover:bg-teal-50 rounded-md transition-colors"
// // // // //       >
// // // // //         <Plus className="h-4 w-4 mr-1" />
// // // // //         Add Cell
// // // // //       </button>
// // // // //     </div>
// // // // //   );
// // // // // };

// // // // // export default SQLNotebook;



// // // // import React, { useState } from 'react';
// // // // import Editor from '@monaco-editor/react'; // Monaco Editor for SQL editing
// // // // import { Plus, X, Play, ChevronDown, ChevronUp, AlertCircle } from 'lucide-react'; // Icons

// // // // // Define the structure of a Cell
// // // // interface Cell {
// // // //   id: number; // Unique identifier
// // // //   query: string; // SQL query string
// // // //   result: any[]; // Result rows
// // // //   columns: string[]; // Column names
// // // //   error: string | null; // Error message
// // // //   isExpanded: boolean; // Expanded/collapsed state
// // // // }

// // // // // Main SQL Notebook Component
// // // // const SQLNotebook = ({ activeTab = 'notebook1' }) => {
// // // //   const [cells, setCells] = useState<Cell[]>([
// // // //     { id: 1, query: '', result: [], columns: [], error: null, isExpanded: true },
// // // //   ]);

// // // //   const [loading, setLoading] = useState<number | null>(null); // Tracks loading state

// // // //   // Calculate editor height dynamically
// // // //   const calculateEditorHeight = (content: string) => {
// // // //     const lineCount = (content.match(/\n/g) || []).length + 1;
// // // //     const baseHeight = 150;
// // // //     const lineHeight = 20;
// // // //     const maxHeight = 500;
// // // //     return `${Math.min(Math.max(baseHeight, lineCount * lineHeight), maxHeight)}px`;
// // // //   };

// // // //   // Add a new cell
// // // //   const addCell = () => {
// // // //     setCells(prev => [
// // // //       ...prev,
// // // //       { id: prev.length + 1, query: '', result: [], columns: [], error: null, isExpanded: true },
// // // //     ]);
// // // //   };

// // // //   // Delete a cell
// // // //   const deleteCell = (id: number) => {
// // // //     setCells(prev => prev.filter(cell => cell.id !== id));
// // // //   };

// // // //   // Toggle expand/collapse state
// // // //   const toggleExpand = (id: number) => {
// // // //     setCells(prev =>
// // // //       prev.map(cell => (cell.id === id ? { ...cell, isExpanded: !cell.isExpanded } : cell))
// // // //     );
// // // //   };

// // // //   // Execute query
// // // //   const executeQuery = async (cellId: number) => {
// // // //     const cell = cells.find(c => c.id === cellId);
// // // //     if (!cell) return;

// // // //     setLoading(cellId); // Set loading state for this cell

// // // //     try {
// // // //       const response = await fetch('http://127.0.0.1:8000/api/execute-sql/', {
// // // //         method: 'POST',
// // // //         headers: {
// // // //           'Content-Type': 'application/json',
// // // //           Authorization: 'Token d36e47f0e5c0a356d35a7d6d407aab93f6b0d36b', // Replace with your token
// // // //         },
// // // //         body: JSON.stringify({ query: cell.query }),
// // // //       });

// // // //       if (!response.ok) {
// // // //         const errorData = await response.json().catch(() => ({ error: 'Unknown error occurred' }));
// // // //         throw new Error(errorData.error || 'Query execution failed');
// // // //       }

// // // //       const data = await response.json();
// // // //       setCells(prev =>
// // // //         prev.map(c =>
// // // //           c.id === cellId
// // // //             ? { ...c, result: data.rows, columns: data.columns, error: null }
// // // //             : c
// // // //         )
// // // //       );
// // // //     } catch (err: any) {
// // // //       setCells(prev =>
// // // //         prev.map(c =>
// // // //           c.id === cellId
// // // //             ? { ...c, result: [], columns: [], error: err.message || 'Unknown error' }
// // // //             : c
// // // //         )
// // // //       );
// // // //     } finally {
// // // //       setLoading(null); // Reset loading state
// // // //     }
// // // //   };

// // // //   // Render
// // // //   return (
// // // //     <div className="w-full space-y-4 p-6">
// // // //       {/* Header */}
// // // //       <div className="text-lg font-medium text-center pb-3 border-b border-teal-700">
// // // //         <span className="bg-gradient-to-r from-teal-600 to-emerald-500 bg-clip-text text-transparent">
// // // //           {activeTab === 'notebook1' && 'Data Analysis Notebook'}
// // // //         </span>
// // // //       </div>

// // // //       {/* Cells */}
// // // //       <div className="space-y-4">
// // // //         {cells.map(cell => (
// // // //           <div
// // // //             key={cell.id}
// // // //             className="bg-white rounded-lg border border-gray-100 shadow-sm hover:shadow-md group"
// // // //           >
// // // //             <div className="p-4">
// // // //               {/* Header */}
// // // //               <div className="flex items-center justify-between mb-2">
// // // //                 <div className="flex items-center space-x-2">
// // // //                   <span className="text-xs font-medium text-gray-400">Query {cell.id}</span>
// // // //                   <button
// // // //                     onClick={() => toggleExpand(cell.id)}
// // // //                     className="p-1 hover:bg-gray-100 rounded-md"
// // // //                   >
// // // //                     {cell.isExpanded ? (
// // // //                       <ChevronUp className="h-4 w-4 text-gray-400" />
// // // //                     ) : (
// // // //                       <ChevronDown className="h-4 w-4 text-gray-400" />
// // // //                     )}
// // // //                   </button>
// // // //                 </div>
// // // //                 <div className="flex items-center space-x-2">
// // // //                   <button
// // // //                     onClick={() => executeQuery(cell.id)}
// // // //                     className="flex items-center px-3 py-1.5 text-xs font-medium text-teal-700 bg-teal-50 rounded-md hover:bg-teal-100"
// // // //                     disabled={loading === cell.id}
// // // //                   >
// // // //                     <Play className={`h-3 w-3 mr-1 ${loading === cell.id ? 'animate-spin' : ''}`} />
// // // //                     Run
// // // //                   </button>
// // // //                   <button
// // // //                     onClick={() => deleteCell(cell.id)}
// // // //                     className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-md"
// // // //                   >
// // // //                     <X className="h-4 w-4" />
// // // //                   </button>
// // // //                 </div>
// // // //               </div>

// // // //               {/* Editor */}
// // // //               {cell.isExpanded && (
// // // //                 <>
// // // //                   <div className="border rounded-lg overflow-hidden bg-gray-50">
// // // //                     <Editor
// // // //                       height={calculateEditorHeight(cell.query)}
// // // //                       defaultLanguage="sql"
// // // //                       value={cell.query}
// // // //                       onChange={value =>
// // // //                         setCells(prev =>
// // // //                           prev.map(c =>
// // // //                             c.id === cell.id ? { ...c, query: value || '' } : c
// // // //                           )
// // // //                         )
// // // //                       }
// // // //                       options={{
// // // //                         minimap: { enabled: false },
// // // //                         fontSize: 13,
// // // //                         lineHeight: 1.5,
// // // //                         padding: { top: 8, bottom: 8 },
// // // //                         scrollBeyondLastLine: false,
// // // //                       }}
// // // //                     />
// // // //                   </div>

// // // //                   {/* Error */}
// // // //                   {cell.error && (
// // // //                     <div className="mt-3 flex items-start px-4 py-3 bg-red-50 border border-red-100 rounded-lg">
// // // //                       <AlertCircle className="h-4 w-4 text-red-500 mt-0.5" />
// // // //                       <span className="text-xs text-red-600">{cell.error}</span>
// // // //                     </div>
// // // //                   )}

// // // //                   {/* Results */}
// // // //                   {cell.result.length > 0 && (
// // // //                     <div className="mt-4 border rounded-lg bg-gray-50 overflow-x-auto">
// // // //                       <table className="w-full text-xs">
// // // //                         <thead>
// // // //                           <tr className="bg-gray-100">
// // // //                             {cell.columns.map(col => (
// // // //                               <th key={col} className="px-4 py-2 text-left font-medium text-gray-700">
// // // //                                 {col}
// // // //                               </th>
// // // //                             ))}
// // // //                           </tr>
// // // //                         </thead>
// // // //                         <tbody>
// // // //                           {cell.result.map((row, idx) => (
// // // //                             <tr key={idx} className="hover:bg-gray-200">
// // // //                               {cell.columns.map(col => (
// // // //                                 <td key={col} className="px-4 py-2 text-gray-800">
// // // //                                   {row[col]}
// // // //                                 </td>
// // // //                               ))}
// // // //                             </tr>
// // // //                           ))}
// // // //                         </tbody>
// // // //                       </table>
// // // //                     </div>
// // // //                   )}
// // // //                 </>
// // // //               )}
// // // //             </div>
// // // //           </div>
// // // //         ))}
// // // //       </div>

// // // //       {/* Add Cell Button */}
// // // //       <button
// // // //         onClick={addCell}
// // // //         className="flex items-center px-4 py-2 text-xs font-medium text-teal-700 bg-teal-50 rounded-md hover:bg-teal-100"
// // // //       >
// // // //         <Plus className="h-4 w-4 mr-1" />
// // // //         Add Cell
// // // //       </button>
// // // //     </div>
// // // //   );
// // // // };

// // // // export default SQLNotebook;



// // // import React, { useState } from 'react';
// // // import Editor from '@monaco-editor/react'; // Monaco Editor for SQL editing
// // // import { Plus, X, Play, ChevronDown, ChevronUp, AlertCircle } from 'lucide-react'; // Icons

// // // // Define the structure of a Cell
// // // interface Cell {
// // //   id: number; // Unique identifier
// // //   query: string; // SQL query string
// // //   result: any[]; // Result rows
// // //   columns: { name: string; type: string }[]; // Column names and their data types
// // //   error: string | null; // Error message
// // //   isExpanded: boolean; // Expanded/collapsed state
// // // }

// // // // Main SQL Notebook Component
// // // const SQLNotebook = ({ activeTab = 'notebook1' }) => {
// // //   const [cells, setCells] = useState<Cell[]>([
// // //     { id: 1, query: '', result: [], columns: [], error: null, isExpanded: true },
// // //   ]);

// // //   const [loading, setLoading] = useState<number | null>(null); // Tracks loading state

// // //   // Calculate editor height dynamically based on content
// // //   const calculateEditorHeight = (content: string) => {
// // //     const lineCount = (content.match(/\n/g) || []).length + 1;
// // //     const baseHeight = 150;
// // //     const lineHeight = 20;
// // //     const maxHeight = 500;
// // //     return `${Math.min(Math.max(baseHeight, lineCount * lineHeight), maxHeight)}px`;
// // //   };

// // //   // Add a new cell
// // //   const addCell = () => {
// // //     setCells(prev => [
// // //       ...prev,
// // //       { id: prev.length + 1, query: '', result: [], columns: [], error: null, isExpanded: true },
// // //     ]);
// // //   };

// // //   // Delete a cell
// // //   const deleteCell = (id: number) => {
// // //     setCells(prev => prev.filter(cell => cell.id !== id));
// // //   };

// // //   // Toggle expand/collapse state of a cell
// // //   const toggleExpand = (id: number) => {
// // //     setCells(prev =>
// // //       prev.map(cell => (cell.id === id ? { ...cell, isExpanded: !cell.isExpanded } : cell))
// // //     );
// // //   };

// // //   // Execute SQL query for a specific cell
// // //   const executeQuery = async (cellId: number) => {
// // //     const cell = cells.find(c => c.id === cellId);
// // //     if (!cell) return;

// // //     setLoading(cellId); // Set loading state for this cell

// // //     try {
// // //       const response = await fetch('http://127.0.0.1:8000/api/execute-sql/', {
// // //         method: 'POST',
// // //         headers: {
// // //           'Content-Type': 'application/json',
// // //           Authorization: 'Token d36e47f0e5c0a356d35a7d6d407aab93f6b0d36b', // Replace with your token
// // //         },
// // //         body: JSON.stringify({ query: cell.query }),
// // //       });

// // //       if (!response.ok) {
// // //         const errorData = await response.json().catch(() => ({ error: 'Unknown error occurred' }));
// // //         throw new Error(errorData.error || 'Query execution failed');
// // //       }

// // //       const data = await response.json();
// // //       setCells(prev =>
// // //         prev.map(c =>
// // //           c.id === cellId
// // //             ? { ...c, result: data.rows, columns: data.columns, error: null }
// // //             : c
// // //         )
// // //       );
// // //     } catch (err: any) {
// // //       setCells(prev =>
// // //         prev.map(c =>
// // //           c.id === cellId
// // //             ? { ...c, result: [], columns: [], error: err.message || 'Unknown error' }
// // //             : c
// // //         )
// // //       );
// // //     } finally {
// // //       setLoading(null); // Reset loading state
// // //     }
// // //   };

// // //   // Render the SQL Notebook interface
// // //   return (
// // //     <div className="w-full space-y-4 p-6">
// // //       {/* Header */}
// // //       <div className="text-lg font-medium text-center pb-3 border-b border-teal-700">
// // //         <span className="bg-gradient-to-r from-teal-600 to-emerald-500 bg-clip-text text-transparent">
// // //           {activeTab === 'notebook1' && 'Data Analysis Notebook'}
// // //         </span>
// // //       </div>

// // //       {/* Cells */}
// // //       <div className="space-y-4">
// // //         {cells.map(cell => (
// // //           <div
// // //             key={cell.id}
// // //             className="bg-white rounded-lg border border-gray-100 shadow-sm hover:shadow-md group"
// // //           >
// // //             <div className="p-4">
// // //               {/* Cell Header */}
// // //               <div className="flex items-center justify-between mb-2">
// // //                 <div className="flex items-center space-x-2">
// // //                   <span className="text-xs font-medium text-gray-400">Query {cell.id}</span>
// // //                   <button
// // //                     onClick={() => toggleExpand(cell.id)}
// // //                     className="p-1 hover:bg-gray-100 rounded-md"
// // //                   >
// // //                     {cell.isExpanded ? (
// // //                       <ChevronUp className="h-4 w-4 text-gray-400" />
// // //                     ) : (
// // //                       <ChevronDown className="h-4 w-4 text-gray-400" />
// // //                     )}
// // //                   </button>
// // //                 </div>
// // //                 <div className="flex items-center space-x-2">
// // //                   <button
// // //                     onClick={() => executeQuery(cell.id)}
// // //                     className="flex items-center px-3 py-1.5 text-xs font-medium text-teal-700 bg-teal-50 rounded-md hover:bg-teal-100"
// // //                     disabled={loading === cell.id}
// // //                   >
// // //                     <Play className={`h-3 w-3 mr-1 ${loading === cell.id ? 'animate-spin' : ''}`} />
// // //                     Run
// // //                   </button>
// // //                   <button
// // //                     onClick={() => deleteCell(cell.id)}
// // //                     className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-md"
// // //                   >
// // //                     <X className="h-4 w-4" />
// // //                   </button>
// // //                 </div>
// // //               </div>

// // //               {/* Editor */}
// // //               {cell.isExpanded && (
// // //                 <>
// // //                   <div className="border rounded-lg overflow-hidden bg-gray-50">
// // //                     <Editor
// // //                       height={calculateEditorHeight(cell.query)}
// // //                       defaultLanguage="sql"
// // //                       value={cell.query}
// // //                       onChange={value =>
// // //                         setCells(prev =>
// // //                           prev.map(c =>
// // //                             c.id === cell.id ? { ...c, query: value || '' } : c
// // //                           )
// // //                         )
// // //                       }
// // //                       options={{
// // //                         minimap: { enabled: false },
// // //                         fontSize: 13,
// // //                         lineHeight: 1.5,
// // //                         padding: { top: 8, bottom: 8 },
// // //                         scrollBeyondLastLine: false,
// // //                       }}
// // //                     />
// // //                   </div>

// // //                   {/* Error Message */}
// // //                   {cell.error && (
// // //                     <div className="mt-3 flex items-start px-4 py-3 bg-red-50 border border-red-100 rounded-lg">
// // //                       <AlertCircle className="h-4 w-4 text-red-500 mt-0.5" />
// // //                       <span className="ml-2 text-xs text-red-600">{cell.error}</span>
// // //                     </div>
// // //                   )}

// // //                   {/* Results Table */}
// // //                   {cell.result.length > 0 && (
// // //                     <div className="mt-4 border rounded-lg bg-gray-50 overflow-x-auto">
// // //                       <table className="w-full text-xs">
// // //                         <thead>
// // //                           <tr className="bg-gray-100">
// // //                             {cell.columns.map(col => (
// // //                               // <th key={col.name} className="px-4 py-2 text-left font-medium text-gray-700">
// // //                               //   <div className="flex items-center">
// // //                               //     <span>{col.name}</span>
// // //                               //     {/* Display data type in smaller font */}
// // //                               //     <span className="ml-2 text-xs text-gray-500">({col.type})</span>
// // //                               //   </div>
// // //                               // </th>
// // //                               <th key={col.name} className="px-4 py-2 text-left font-medium text-gray-700">
// // //   <div className="flex flex-col items-start">
// // //     <span>{col.name}</span>
// // //     {/* Display data type below the column name */}
// // //     <span style={{ fontSize: '10px', color: '#9CA3AF', fontWeight: '400', letterSpacing: '0.09em' }}>{col.type}</span>
// // //   </div>
// // // </th>
// // //                             ))}
// // //                           </tr>
// // //                         </thead>
// // //                         <tbody>
// // //                           {cell.result.map((row, idx) => (
// // //                             <tr key={idx} className="hover:bg-gray-200">
// // //                               {cell.columns.map(col => (
// // //                                 <td
// // //                                   key={col.name}
// // //                                   className={`px-4 py-2 text-gray-800 ${
// // //                                     col.type.toLowerCase().includes('int') || col.type.toLowerCase().includes('double')
// // //                                       ? 'text-right'
// // //                                       : 'text-left'
// // //                                   }`}
// // //                                 >
// // //                                   {row[col.name]}
// // //                                 </td>
// // //                               ))}
// // //                             </tr>
// // //                           ))}
// // //                         </tbody>
// // //                       </table>
// // //                     </div>
// // //                   )}
// // //                 </>
// // //               )}
// // //             </div>
// // //           </div>
// // //         ))}
// // //       </div>

// // //       {/* Add Cell Button */}
// // //       <button
// // //         onClick={addCell}
// // //         className="flex items-center px-4 py-2 text-xs font-medium text-teal-700 bg-teal-50 rounded-md hover:bg-teal-100"
// // //       >
// // //         <Plus className="h-4 w-4 mr-1" />
// // //         Add Cell
// // //       </button>
// // //     </div>
// // //   );
// // // };

// // // export default SQLNotebook;




// // import React, { useState } from 'react';
// // import Editor from '@monaco-editor/react'; // Monaco Editor for SQL editing
// // import { Plus, X, Play, ChevronDown, ChevronUp, AlertCircle } from 'lucide-react'; // Icons

// // // Define the structure of a Cell
// // interface Cell {
// //   id: number; // Unique identifier
// //   query: string; // SQL query string
// //   result: any[]; // Result rows
// //   columns: { name: string; type: string }[]; // Column names and their data types
// //   error: string | null; // Error message
// //   isExpanded: boolean; // Expanded/collapsed state
// // }

// // // Main SQL Notebook Component
// // const SQLNotebook = ({ activeTab = 'notebook1' }) => {
// //   const [cells, setCells] = useState<Cell[]>([
// //     { id: 1, query: '', result: [], columns: [], error: null, isExpanded: true },
// //   ]);

// //   const [loading, setLoading] = useState<number | null>(null); // Tracks loading state

// //   // Calculate editor height dynamically based on content
// //   const calculateEditorHeight = (content: string) => {
// //     const lineCount = (content.match(/\n/g) || []).length + 1;
// //     const baseHeight = 150;
// //     const lineHeight = 20;
// //     const maxHeight = 500;
// //     return `${Math.min(Math.max(baseHeight, lineCount * lineHeight), maxHeight)}px`;
// //   };

// //   // Add a new cell
// //   const addCell = () => {
// //     setCells(prev => [
// //       ...prev,
// //       { id: prev.length + 1, query: '', result: [], columns: [], error: null, isExpanded: true },
// //     ]);
// //   };

// //   // Delete a cell
// //   const deleteCell = (id: number) => {
// //     setCells(prev => prev.filter(cell => cell.id !== id));
// //   };

// //   // Toggle expand/collapse state of a cell
// //   const toggleExpand = (id: number) => {
// //     setCells(prev =>
// //       prev.map(cell => (cell.id === id ? { ...cell, isExpanded: !cell.isExpanded } : cell))
// //     );
// //   };

// //   // Execute SQL query for a specific cell
// //   const executeQuery = async (cellId: number) => {
// //     const cell = cells.find(c => c.id === cellId);
// //     if (!cell) return;

// //     setLoading(cellId); // Set loading state for this cell

// //     try {
// //       const response = await fetch('http://127.0.0.1:8000/api/execute-sql/', {
// //         method: 'POST',
// //         headers: {
// //           'Content-Type': 'application/json',
// //           Authorization: 'Token d36e47f0e5c0a356d35a7d6d407aab93f6b0d36b', // Replace with your token
// //         },
// //         body: JSON.stringify({ query: cell.query }),
// //       });

// //       if (!response.ok) {
// //         const errorData = await response.json().catch(() => ({ error: 'Unknown error occurred' }));
// //         throw new Error(errorData.error || 'Query execution failed');
// //       }

// //       const data = await response.json();
// //       setCells(prev =>
// //         prev.map(c =>
// //           c.id === cellId
// //             ? { ...c, result: data.rows, columns: data.columns, error: null }
// //             : c
// //         )
// //       );
// //     } catch (err: any) {
// //       setCells(prev =>
// //         prev.map(c =>
// //           c.id === cellId
// //             ? { ...c, result: [], columns: [], error: err.message || 'Unknown error' }
// //             : c
// //         )
// //       );
// //     } finally {
// //       setLoading(null); // Reset loading state
// //     }
// //   };

// //   // Render the SQL Notebook interface
// //   return (
// //     <div className="w-full space-y-4 p-6">
// //       {/* Header */}
// //       <div className="text-lg font-medium text-center pb-3 border-b border-teal-700">
// //         <span className="bg-gradient-to-r from-teal-600 to-emerald-500 bg-clip-text text-transparent">
// //           {activeTab === 'notebook1' && 'Data Analysis Notebook'}
// //         </span>
// //       </div>

// //       {/* Cells */}
// //       <div className="space-y-4">
// //         {cells.map(cell => (
// //           <div
// //             key={cell.id}
// //             className="bg-white rounded-lg border border-gray-100 shadow-sm hover:shadow-md group"
// //           >
// //             <div className="p-4">
// //               {/* Cell Header */}
// //               <div className="flex items-center justify-between mb-2">
// //                 <div className="flex items-center space-x-2">
// //                   <span className="text-xs font-medium text-gray-400">Query {cell.id}</span>
// //                   <button
// //                     onClick={() => toggleExpand(cell.id)}
// //                     className="p-1 hover:bg-gray-100 rounded-md"
// //                   >
// //                     {cell.isExpanded ? (
// //                       <ChevronUp className="h-4 w-4 text-gray-400" />
// //                     ) : (
// //                       <ChevronDown className="h-4 w-4 text-gray-400" />
// //                     )}
// //                   </button>
// //                 </div>
// //                 <div className="flex items-center space-x-2">
// //                   <button
// //                     onClick={() => executeQuery(cell.id)}
// //                     className="flex items-center px-3 py-1.5 text-xs font-medium text-teal-700 bg-teal-50 rounded-md hover:bg-teal-100"
// //                     disabled={loading === cell.id}
// //                   >
// //                     <Play className={`h-3 w-3 mr-1 ${loading === cell.id ? 'animate-spin' : ''}`} />
// //                     Run
// //                   </button>
// //                   <button
// //                     onClick={() => deleteCell(cell.id)}
// //                     className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-md"
// //                   >
// //                     <X className="h-4 w-4" />
// //                   </button>
// //                 </div>
// //               </div>

// //               {/* Editor */}
// //               {cell.isExpanded && (
// //                 <>
// //                   <div className="border rounded-lg overflow-hidden bg-gray-50">
// //                     <Editor
// //                       height={calculateEditorHeight(cell.query)}
// //                       defaultLanguage="sql"
// //                       value={cell.query}
// //                       onChange={value =>
// //                         setCells(prev =>
// //                           prev.map(c =>
// //                             c.id === cell.id ? { ...c, query: value || '' } : c
// //                           )
// //                         )
// //                       }
// //                       options={{
// //                         minimap: { enabled: false },
// //                         fontSize: 13,
// //                         lineHeight: 1.5,
// //                         padding: { top: 8, bottom: 8 },
// //                         scrollBeyondLastLine: false,
// //                       }}
// //                     />
// //                   </div>

// //                   {/* Error Message */}
// //                   {cell.error && (
// //                     <div className="mt-3 flex items-start px-4 py-3 bg-red-50 border border-red-100 rounded-lg">
// //                       <AlertCircle className="h-4 w-4 text-red-500 mt-0.5" />
// //                       <span className="text-xs text-red-600">{cell.error}</span>
// //                     </div>
// //                   )}

// //                   {/* Results Table */}
// //                   {cell.result.length > 0 && (
// //                     <div className="mt-4 border rounded-lg bg-gray-50 overflow-x-auto">
// //                       <table className="w-full text-xs">
// //                         <thead>
// //                           <tr className="bg-gray-100">
// //                             {cell.columns.map(col => (
                           
// //                               <th key={col.name} className="px-4 py-2 text-left font-medium text-gray-700">
// //    <div className="flex flex-col items-start">
// //      <span>{col.name}</span>
// //      {/* Display data type below the column name */}
// //      <span style={{ fontSize: '10px', color: '#9CA3AF', fontWeight: '400', letterSpacing: '0.09em' }}>{col.type}</span>
// //    </div>
// //     </th>
// //                             ))}
// //                           </tr>
// //                         </thead>
// //                         <tbody>
// //                           {cell.result.map((row, idx) => (
// //                             <tr key={idx} className="hover:bg-gray-200">
// //                               {cell.columns.map(col => (
// //                                 <td
// //                                   key={col.name}
// //                                   className={`px-4 py-2 text-gray-800 ${
// //                                     col.type.toLowerCase().includes('int') ||
// //                                     col.type.toLowerCase().includes('double') ||
// //                                     col.type.toLowerCase().includes('float')
// //                                       ? 'text-right'
// //                                       : 'text-left'
// //                                   }`}
// //                                 >
// //                                   {row[col.name]}
// //                                 </td>
// //                               ))}
// //                             </tr>
// //                           ))}
// //                         </tbody>
// //                       </table>
// //                     </div>
// //                   )}
// //                 </>
// //               )}
// //             </div>
// //           </div>
// //         ))}
// //       </div>

// //       {/* Add Cell Button */}
// //       <button
// //         onClick={addCell}
// //         className="flex items-center px-4 py-2 text-xs font-medium text-teal-700 bg-teal-50 rounded-md hover:bg-teal-100"
// //       >
// //         <Plus className="h-4 w-4 mr-1" />
// //         Add Cell
// //       </button>
// //     </div>
// //   );
// // };

// // export default SQLNotebook;



// import React, { useState } from 'react';
// import Editor from '@monaco-editor/react'; // Monaco Editor for SQL editing
// import { Plus, X, Play, ChevronDown, ChevronUp, AlertCircle } from 'lucide-react'; // Icons

// // Define the structure of a Cell
// interface Cell {
//   id: number; // Unique identifier
//   query: string; // SQL query string
//   result: any[]; // Result rows
//   columns: { name: string; type: string }[]; // Column names and their data types
//   error: string | null; // Error message
//   isExpanded: boolean; // Expanded/collapsed state
//   executionTime: string | null; // Time taken to execute the query
// }

// // Main SQL Notebook Component
// const SQLNotebook = ({ activeTab = 'notebook1' }) => {
//   const [cells, setCells] = useState<Cell[]>([
//     { id: 1, query: '', result: [], columns: [], error: null, isExpanded: true, executionTime: null },
//   ]);

//   const [loading, setLoading] = useState<number | null>(null); // Tracks loading state

//   // Calculate editor height dynamically based on content
//   const calculateEditorHeight = (content: string) => {
//     const lineCount = (content.match(/\n/g) || []).length + 1;
//     const baseHeight = 150;
//     const lineHeight = 20;
//     const maxHeight = 500;
//     return `${Math.min(Math.max(baseHeight, lineCount * lineHeight), maxHeight)}px`;
//   };

//   // Add a new cell
//   const addCell = () => {
//     setCells(prev => [
//       ...prev,
//       { id: prev.length + 1, query: '', result: [], columns: [], error: null, isExpanded: true, executionTime: null },
//     ]);
//   };

//   // Delete a cell
//   const deleteCell = (id: number) => {
//     setCells(prev => prev.filter(cell => cell.id !== id));
//   };

//   // Toggle expand/collapse state of a cell
//   const toggleExpand = (id: number) => {
//     setCells(prev =>
//       prev.map(cell => (cell.id === id ? { ...cell, isExpanded: !cell.isExpanded } : cell))
//     );
//   };

//   // Execute SQL query for a specific cell
//   const executeQuery = async (cellId: number) => {
//     const cell = cells.find(c => c.id === cellId);
//     if (!cell) return;

//     setLoading(cellId); // Set loading state for this cell

//     const startTime = Date.now(); // Start time measurement

//     try {
//       const response = await fetch('http://127.0.0.1:8000/api/execute-sql/', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           Authorization: 'Token d36e47f0e5c0a356d35a7d6d407aab93f6b0d36b', // Replace with your token
//         },
//         body: JSON.stringify({ query: cell.query }),
//       });

//       const endTime = Date.now(); // End time measurement
//       const timeTaken = endTime - startTime; // Time taken in milliseconds
//       const formattedTime = formatTime(timeTaken);

//       if (!response.ok) {
//         const errorData = await response.json().catch(() => ({ error: 'Unknown error occurred' }));
//         throw new Error(errorData.error || 'Query execution failed');
//       }

//       const data = await response.json();
//       setCells(prev =>
//         prev.map(c =>
//           c.id === cellId
//             ? { ...c, result: data.rows, columns: data.columns, error: null, executionTime: formattedTime }
//             : c
//         )
//       );
//     } catch (err: any) {
//       setCells(prev =>
//         prev.map(c =>
//           c.id === cellId
//             ? { ...c, result: [], columns: [], error: err.message || 'Unknown error', executionTime: null }
//             : c
//         )
//       );
//     } finally {
//       setLoading(null); // Reset loading state
//     }
//   };

//   // Format time from milliseconds to a readable string
//   const formatTime = (ms: number): string => {
//     if (ms < 1000) {
//       return `${ms} ms`;
//     } else {
//       return `${(ms / 1000).toFixed(2)} s`;
//     }
//   };

//   // Render the SQL Notebook interface
//   return (
//     <div className="w-full space-y-4 p-6">
//       {/* Header */}
//       <div className="text-lg font-medium text-center pb-3 border-b border-teal-700">
//         <span className="bg-gradient-to-r from-teal-600 to-emerald-500 bg-clip-text text-transparent">
//           {activeTab === 'notebook1' && 'Data Analysis Notebook'}
//         </span>
//       </div>

//       {/* Cells */}
//       <div className="space-y-4">
//         {cells.map(cell => (
//           <div
//             key={cell.id}
//             className="bg-white rounded-lg border border-gray-100 shadow-sm hover:shadow-md group"
//           >
//             <div className="p-4">
//               {/* Cell Header */}
//               <div className="flex items-center justify-between mb-2">
//                 <div className="flex items-center space-x-2">
//                   <span className="text-xs font-medium text-gray-400">Query {cell.id}</span>
//                   <button
//                     onClick={() => toggleExpand(cell.id)}
//                     className="p-1 hover:bg-gray-100 rounded-md"
//                   >
//                     {cell.isExpanded ? (
//                       <ChevronUp className="h-4 w-4 text-gray-400" />
//                     ) : (
//                       <ChevronDown className="h-4 w-4 text-gray-400" />
//                     )}
//                   </button>
//                 </div>
//                 <div className="flex items-center space-x-2">
//                   <button
//                     onClick={() => executeQuery(cell.id)}
//                     className="flex items-center px-3 py-1.5 text-xs font-medium text-teal-700 bg-teal-50 rounded-md hover:bg-teal-100"
//                     disabled={loading === cell.id}
//                   >
//                     <Play className={`h-3 w-3 mr-1 ${loading === cell.id ? 'animate-spin' : ''}`} />
//                     Run
//                   </button>
//                   {/* Display Execution Time */}
//                   {cell.executionTime && (
//                     <span className="text-xs text-gray-500 ml-2">
//                       ({cell.executionTime})
//                     </span>
//                   )}
//                   <button
//                     onClick={() => deleteCell(cell.id)}
//                     className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-md"
//                   >
//                     <X className="h-4 w-4" />
//                   </button>
//                 </div>
//               </div>

//               {/* Editor */}
//               {cell.isExpanded && (
//                 <>
//                   <div className="border rounded-lg overflow-hidden bg-gray-50">
//                     <Editor
//                       height={calculateEditorHeight(cell.query)}
//                       defaultLanguage="sql"
//                       value={cell.query}
//                       onChange={value =>
//                         setCells(prev =>
//                           prev.map(c =>
//                             c.id === cell.id ? { ...c, query: value || '' } : c
//                           )
//                         )
//                       }
//                       options={{
//                         minimap: { enabled: false },
//                         fontSize: 13,
//                         lineHeight: 1.5,
//                         padding: { top: 8, bottom: 8 },
//                         scrollBeyondLastLine: false,
//                       }}
//                     />
//                   </div>

//                   {/* Error Message */}
//                   {cell.error && (
//                     <div className="mt-3 flex items-start px-4 py-3 bg-red-50 border border-red-100 rounded-lg">
//                       <AlertCircle className="h-4 w-4 text-red-500 mt-0.5" />
//                       <span className="text-xs text-red-600 ml-2">{cell.error}</span>
//                     </div>
//                   )}

//                   {/* Results Table */}
//                   {cell.result.length > 0 && (
//                     <div className="mt-4 border rounded-lg bg-gray-50 overflow-x-auto">
//                       <table className="w-full text-xs">
//                         <thead>
//                           <tr className="bg-gray-100">
//                             {cell.columns.map(col => (
//                               <th key={col.name} className="px-4 py-2 text-left font-medium text-gray-700">
//                                 <div className="flex flex-col items-start">
//                                   <span>{col.name}</span>
//                                   {/* Display data type below the column name */}
//                                   <span style={{ fontSize: '10px', color: '#9CA3AF', fontWeight: '400', letterSpacing: '0.09em' }}>{col.type}</span>
//                                 </div>
//                               </th>
//                             ))}
//                           </tr>
//                         </thead>
//                         <tbody>
//                           {cell.result.map((row, idx) => (
//                             <tr key={idx} className="hover:bg-gray-200">
//                               {cell.columns.map(col => (
//                                 <td
//                                   key={col.name}
//                                   className={`px-4 py-2 text-gray-800 ${
//                                     col.type.toLowerCase().includes('int') ||
//                                     col.type.toLowerCase().includes('double') ||
//                                     col.type.toLowerCase().includes('float')
//                                       ? 'text-right'
//                                       : 'text-left'
//                                   }`}
//                                 >
//                                   {row[col.name] !== null && row[col.name] !== undefined ? row[col.name] : 'NULL'}
//                                 </td>
//                               ))}
//                             </tr>
//                           ))}
//                         </tbody>
//                       </table>
//                     </div>
//                   )}
//                 </>
//               )}
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Add Cell Button */}
//       <button
//         onClick={addCell}
//         className="flex items-center px-4 py-2 text-xs font-medium text-teal-700 bg-teal-50 rounded-md hover:bg-teal-100"
//       >
//         <Plus className="h-4 w-4 mr-1" />
//         Add Cell
//       </button>
//     </div>
//   );
// };

// export default SQLNotebook;



// SQLNotebook.jsx

import { useState } from 'react';
import Editor from '@monaco-editor/react'; // Monaco Editor for SQL editing
import { Plus, X, Play, ChevronDown, ChevronUp, AlertCircle } from 'lucide-react'; // Icons

// Define the structure of a Cell
interface Cell {
  id: number; // Unique identifier
  query: string; // SQL query string
  result: any[]; // Result rows
  columns: { name: string; type: string }[]; // Column names and their data types
  error: string | null; // Error message
  isExpanded: boolean; // Expanded/collapsed state
  executionTime: string | null; // Time taken to execute the query
}

// Main SQL Notebook Component
const SQLNotebook = ({ activeTab = 'notebook1' }) => {
  const [cells, setCells] = useState<Cell[]>([
    { id: 1, query: '', result: [], columns: [], error: null, isExpanded: true, executionTime: null },
  ]);

  const [loading, setLoading] = useState<number | null>(null); // Tracks loading state

  // Calculate editor height dynamically based on content
  const calculateEditorHeight = (content: string) => {
    const lineCount = (content.match(/\n/g) || []).length + 1;
    const baseHeight = 150;
    const lineHeight = 20;
    const maxHeight = 500;
    return `${Math.min(Math.max(baseHeight, lineCount * lineHeight), maxHeight)}px`;
  };

  // Add a new cell
  const addCell = () => {
    setCells(prev => [
      ...prev,
      { id: prev.length + 1, query: '', result: [], columns: [], error: null, isExpanded: true, executionTime: null },
    ]);
  };

  // Delete a cell
  const deleteCell = (id: number) => {
    setCells(prev => prev.filter(cell => cell.id !== id));
  };

  // Toggle expand/collapse state of a cell
  const toggleExpand = (id: number) => {
    setCells(prev =>
      prev.map(cell => (cell.id === id ? { ...cell, isExpanded: !cell.isExpanded } : cell))
    );
  };

  // Execute SQL query for a specific cell
  const executeQuery = async (cellId: number) => {
    const cell = cells.find(c => c.id === cellId);
    if (!cell) return;

    setLoading(cellId); // Set loading state for this cell

    const startTime = Date.now(); // Start time measurement

    try {
      const response = await fetch('http://127.0.0.1:8000/api/execute-sql/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Token d36e47f0e5c0a356d35a7d6d407aab93f6b0d36b', // Replace with your token
        },
        body: JSON.stringify({ query: cell.query }),
      });

      const endTime = Date.now(); // End time measurement
      const timeTaken = endTime - startTime; // Time taken in milliseconds
      const formattedTime = formatTime(timeTaken);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: 'Unknown error occurred' }));
        throw new Error(errorData.error || 'Query execution failed');
      }

      const data = await response.json();

      // Validate that the number of columns matches
      if (data.columns.length > 0 && data.rows.length > 0 && data.columns.length !== Object.keys(data.rows[0]).length) {
        throw new Error('Mismatch between columns and data. Please check the table schema.');
      }

      setCells(prev =>
        prev.map(c =>
          c.id === cellId
            ? { ...c, result: data.rows, columns: data.columns, error: null, executionTime: formattedTime }
            : c
        )
      );
    } catch (err: any) {
      console.error(`Error executing query for cell ${cellId}:`, err);
      setCells(prev =>
        prev.map(c =>
          c.id === cellId
            ? { ...c, result: [], columns: [], error: err.message || 'Unknown error', executionTime: null }
            : c
        )
      );
    } finally {
      setLoading(null); // Reset loading state
    }
  };

  // Format time from milliseconds to a readable string
  const formatTime = (ms: number): string => {
    if (ms < 1000) {
      return `${ms} ms`;
    } else {
      return `${(ms / 1000).toFixed(2)} s`;
    }
  };

  // Render the SQL Notebook interface
  return (
    <div className="w-full space-y-4 p-6">
      {/* Header */}
      <div className="text-lg font-medium text-center pb-3 border-b border-teal-700">
        <span className="bg-gradient-to-r from-teal-600 to-emerald-500 bg-clip-text text-transparent">
          {activeTab === 'notebook1' && 'Data Analysis Notebook'}
        </span>
      </div>

      {/* Cells */}
      <div className="space-y-4">
        {cells.map(cell => (
          <div
            key={cell.id}
            className="bg-white rounded-lg border border-gray-100 shadow-sm hover:shadow-md group"
          >
            <div className="p-4">
              {/* Cell Header */}
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <span className="text-xs font-medium text-gray-400">Query {cell.id}</span>
                  <button
                    onClick={() => toggleExpand(cell.id)}
                    className="p-1 hover:bg-gray-100 rounded-md"
                  >
                    {cell.isExpanded ? (
                      <ChevronUp className="h-4 w-4 text-gray-400" />
                    ) : (
                      <ChevronDown className="h-4 w-4 text-gray-400" />
                    )}
                  </button>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => executeQuery(cell.id)}
                    className="flex items-center px-3 py-1.5 text-xs font-medium text-teal-700 bg-teal-50 rounded-md hover:bg-teal-100"
                    disabled={loading === cell.id}
                  >
                    <Play className={`h-3 w-3 mr-1 ${loading === cell.id ? 'animate-spin' : ''}`} />
                    Run
                  </button>
                  {/* Display Execution Time */}
                  {cell.executionTime && (
                    <span className="text-xs text-gray-500 ml-2">
                      ({cell.executionTime})
                    </span>
                  )}
                  <button
                    onClick={() => deleteCell(cell.id)}
                    className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-md"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* Editor */}
              {cell.isExpanded && (
                <>
                  <div className="border rounded-lg overflow-hidden bg-gray-50">
                    <Editor
                      height={calculateEditorHeight(cell.query)}
                      defaultLanguage="sql"
                      value={cell.query}
                      onChange={value =>
                        setCells(prev =>
                          prev.map(c =>
                            c.id === cell.id ? { ...c, query: value || '' } : c
                          )
                        )
                      }
                      options={{
                        minimap: { enabled: false },
                        fontSize: 13,
                        lineHeight: 1.5,
                        padding: { top: 8, bottom: 8 },
                        scrollBeyondLastLine: false,
                      }}
                    />
                  </div>

                  {/* Error Message */}
                  {cell.error && (
                    <div className="mt-3 flex items-start px-4 py-3 bg-red-50 border border-red-100 rounded-lg">
                      <AlertCircle className="h-4 w-4 text-red-500 mt-0.5" />
                      <span className="text-xs text-red-600 ml-2">{cell.error}</span>
                    </div>
                  )}

                  {/* Results Table */}
                  {cell.result.length > 0 && (
                    <div className="mt-4 border rounded-lg bg-gray-50 overflow-x-auto">
                      <table className="w-full text-xs">
                        <thead>
                          <tr className="bg-gray-100">
                            {cell.columns.map(col => (
                              <th key={col.name} className="px-4 py-2 text-left font-medium text-gray-700">
                                <div className="flex flex-col items-start">
                                  <span>{col.name}</span>
                                  {/* Display data type below the column name */}
                                  <span style={{ fontSize: '10px', color: '#9CA3AF', fontWeight: '400', letterSpacing: '0.09em' }}>{col.type}</span>
                                </div>
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {cell.result.map((row, idx) => (
                            <tr key={idx} className="hover:bg-gray-200">
                              {cell.columns.map(col => (
                                <td
                                  key={col.name}
                                  className={`px-4 py-2 text-gray-800 ${
                                    ['integer', 'int', 'bigint', 'double', 'float'].includes(col.type.toLowerCase())
                                      ? 'text-right'
                                      : 'text-left'
                                  }`}
                                >
                                  {row[col.name] !== null && row[col.name] !== undefined ? row[col.name].toString() : 'NULL'}
                                </td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Add Cell Button */}
      <button
        onClick={addCell}
        className="flex items-center px-4 py-2 text-xs font-medium text-teal-700 bg-teal-50 rounded-md hover:bg-teal-100"
      >
        <Plus className="h-4 w-4 mr-1" />
        Add Cell
      </button>
    </div>
  );
};

export default SQLNotebook;
