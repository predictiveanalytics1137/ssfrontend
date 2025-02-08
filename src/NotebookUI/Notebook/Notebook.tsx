


// // // // // // // // // // // // // // SQLNotebook.jsx

// // // // // // // // // // // // // import { useState } from 'react';
// // // // // // // // // // // // // import Editor from '@monaco-editor/react'; // Monaco Editor for SQL editing
// // // // // // // // // // // // // import { Plus, X, Play, ChevronDown, ChevronUp, AlertCircle } from 'lucide-react'; // Icons
// // // // // // // // // // // // // // import dotenv from 'dotenv';
// // // // // // // // // // // // // // dotenv.config();

// // // // // // // // // // // // // // Define the structure of a Cell
// // // // // // // // // // // // // interface Cell {
// // // // // // // // // // // // //   id: number; // Unique identifier
// // // // // // // // // // // // //   query: string; // SQL query string
// // // // // // // // // // // // //   result: any[]; // Result rows
// // // // // // // // // // // // //   columns: { name: string; type: string }[]; // Column names and their data types
// // // // // // // // // // // // //   error: string | null; // Error message
// // // // // // // // // // // // //   isExpanded: boolean; // Expanded/collapsed state
// // // // // // // // // // // // //   executionTime: string | null; // Time taken to execute the query
// // // // // // // // // // // // // }

// // // // // // // // // // // // // // Main SQL Notebook Component
// // // // // // // // // // // // // const SQLNotebook = ({ activeTab = 'notebook1' }) => {
// // // // // // // // // // // // //   const [cells, setCells] = useState<Cell[]>([
// // // // // // // // // // // // //     { id: 1, query: '', result: [], columns: [], error: null, isExpanded: true, executionTime: null },
// // // // // // // // // // // // //   ]);

// // // // // // // // // // // // //   const [loading, setLoading] = useState<number | null>(null); // Tracks loading state

// // // // // // // // // // // // //   // Calculate editor height dynamically based on content
// // // // // // // // // // // // //   const calculateEditorHeight = (content: string) => {
// // // // // // // // // // // // //     const lineCount = (content.match(/\n/g) || []).length + 1;
// // // // // // // // // // // // //     const baseHeight = 150;
// // // // // // // // // // // // //     const lineHeight = 20;
// // // // // // // // // // // // //     const maxHeight = 500;
// // // // // // // // // // // // //     return `${Math.min(Math.max(baseHeight, lineCount * lineHeight), maxHeight)}px`;
// // // // // // // // // // // // //   };

// // // // // // // // // // // // //   // Add a new cell
// // // // // // // // // // // // //   const addCell = () => {
// // // // // // // // // // // // //     setCells(prev => [
// // // // // // // // // // // // //       ...prev,
// // // // // // // // // // // // //       { id: prev.length + 1, query: '', result: [], columns: [], error: null, isExpanded: true, executionTime: null },
// // // // // // // // // // // // //     ]);
// // // // // // // // // // // // //   };

// // // // // // // // // // // // //   // Delete a cell
// // // // // // // // // // // // //   const deleteCell = (id: number) => {
// // // // // // // // // // // // //     setCells(prev => prev.filter(cell => cell.id !== id));
// // // // // // // // // // // // //   };

// // // // // // // // // // // // //   // Toggle expand/collapse state of a cell
// // // // // // // // // // // // //   const toggleExpand = (id: number) => {
// // // // // // // // // // // // //     setCells(prev =>
// // // // // // // // // // // // //       prev.map(cell => (cell.id === id ? { ...cell, isExpanded: !cell.isExpanded } : cell))
// // // // // // // // // // // // //     );
// // // // // // // // // // // // //   };

// // // // // // // // // // // // //   // Execute SQL query for a specific cell
// // // // // // // // // // // // //   const executeQuery = async (cellId: number) => {
// // // // // // // // // // // // //     const cell = cells.find(c => c.id === cellId);
// // // // // // // // // // // // //     if (!cell) return;

// // // // // // // // // // // // //     setLoading(cellId); // Set loading state for this cell

// // // // // // // // // // // // //     const startTime = Date.now(); // Start time measurement

// // // // // // // // // // // // //     try {
// // // // // // // // // // // // //       const response = await fetch('http://127.0.0.1:8000/api/execute-sql/', {
// // // // // // // // // // // // //         method: 'POST',
// // // // // // // // // // // // //         headers: {
// // // // // // // // // // // // //           'Content-Type': 'application/json',
// // // // // // // // // // // // //           'Authorization': 'Token d36e47f0e5c0a356d35a7d6d407aab93f6b0d36b', 
// // // // // // // // // // // // //           // 'Authorization': `Token ${process.env.REACT_APP_ROOT_USER_TOKEN}`, 
// // // // // // // // // // // // //         },
// // // // // // // // // // // // //         body: JSON.stringify({ query: cell.query }),
// // // // // // // // // // // // //       });

// // // // // // // // // // // // //       const endTime = Date.now(); // End time measurement
// // // // // // // // // // // // //       const timeTaken = endTime - startTime; // Time taken in milliseconds
// // // // // // // // // // // // //       const formattedTime = formatTime(timeTaken);

// // // // // // // // // // // // //       if (!response.ok) {
// // // // // // // // // // // // //         const errorData = await response.json().catch(() => ({ error: 'Unknown error occurred' }));
// // // // // // // // // // // // //         throw new Error(errorData.error || 'Query execution failed');
// // // // // // // // // // // // //       }

// // // // // // // // // // // // //       const data = await response.json();

// // // // // // // // // // // // //       // Validate that the number of columns matches
// // // // // // // // // // // // //       if (data.columns.length > 0 && data.rows.length > 0 && data.columns.length !== Object.keys(data.rows[0]).length) {
// // // // // // // // // // // // //         throw new Error('Mismatch between columns and data. Please check the table schema.');
// // // // // // // // // // // // //       }

// // // // // // // // // // // // //       setCells(prev =>
// // // // // // // // // // // // //         prev.map(c =>
// // // // // // // // // // // // //           c.id === cellId
// // // // // // // // // // // // //             ? { ...c, result: data.rows, columns: data.columns, error: null, executionTime: formattedTime }
// // // // // // // // // // // // //             : c
// // // // // // // // // // // // //         )
// // // // // // // // // // // // //       );
// // // // // // // // // // // // //     } catch (err: any) {
// // // // // // // // // // // // //       console.error(`Error executing query for cell ${cellId}:`, err);
// // // // // // // // // // // // //       setCells(prev =>
// // // // // // // // // // // // //         prev.map(c =>
// // // // // // // // // // // // //           c.id === cellId
// // // // // // // // // // // // //             ? { ...c, result: [], columns: [], error: err.message || 'Unknown error', executionTime: null }
// // // // // // // // // // // // //             : c
// // // // // // // // // // // // //         )
// // // // // // // // // // // // //       );
// // // // // // // // // // // // //     } finally {
// // // // // // // // // // // // //       setLoading(null); // Reset loading state
// // // // // // // // // // // // //     }
// // // // // // // // // // // // //   };

// // // // // // // // // // // // //   // Format time from milliseconds to a readable string
// // // // // // // // // // // // //   const formatTime = (ms: number): string => {
// // // // // // // // // // // // //     if (ms < 1000) {
// // // // // // // // // // // // //       return `${ms} ms`;
// // // // // // // // // // // // //     } else {
// // // // // // // // // // // // //       return `${(ms / 1000).toFixed(2)} s`;
// // // // // // // // // // // // //     }
// // // // // // // // // // // // //   };

// // // // // // // // // // // // //   // Render the SQL Notebook interface
// // // // // // // // // // // // //   return (
// // // // // // // // // // // // //     <div className="w-full space-y-4 p-6">
// // // // // // // // // // // // //       {/* Header */}
// // // // // // // // // // // // //       <div className="text-lg font-medium text-center pb-3 border-b border-teal-700">
// // // // // // // // // // // // //         <span className="bg-gradient-to-r from-teal-600 to-emerald-500 bg-clip-text text-transparent">
// // // // // // // // // // // // //           {activeTab === 'notebook1' && 'Data Analysis Notebook'}
// // // // // // // // // // // // //         </span>
// // // // // // // // // // // // //       </div>

// // // // // // // // // // // // //       {/* Cells */}
// // // // // // // // // // // // //       <div className="space-y-4">
// // // // // // // // // // // // //         {cells.map(cell => (
// // // // // // // // // // // // //           <div
// // // // // // // // // // // // //             key={cell.id}
// // // // // // // // // // // // //             className="bg-white rounded-lg border border-gray-100 shadow-sm hover:shadow-md group"
// // // // // // // // // // // // //           >
// // // // // // // // // // // // //             <div className="p-4">
// // // // // // // // // // // // //               {/* Cell Header */}
// // // // // // // // // // // // //               <div className="flex items-center justify-between mb-2">
// // // // // // // // // // // // //                 <div className="flex items-center space-x-2">
// // // // // // // // // // // // //                   <span className="text-xs font-medium text-gray-400">Query {cell.id}</span>
// // // // // // // // // // // // //                   <button
// // // // // // // // // // // // //                     onClick={() => toggleExpand(cell.id)}
// // // // // // // // // // // // //                     className="p-1 hover:bg-gray-100 rounded-md"
// // // // // // // // // // // // //                   >
// // // // // // // // // // // // //                     {cell.isExpanded ? (
// // // // // // // // // // // // //                       <ChevronUp className="h-4 w-4 text-gray-400" />
// // // // // // // // // // // // //                     ) : (
// // // // // // // // // // // // //                       <ChevronDown className="h-4 w-4 text-gray-400" />
// // // // // // // // // // // // //                     )}
// // // // // // // // // // // // //                   </button>
// // // // // // // // // // // // //                 </div>
// // // // // // // // // // // // //                 <div className="flex items-center space-x-2">
// // // // // // // // // // // // //                   <button
// // // // // // // // // // // // //                     onClick={() => executeQuery(cell.id)}
// // // // // // // // // // // // //                     className="flex items-center px-3 py-1.5 text-xs font-medium text-teal-700 bg-teal-50 rounded-md hover:bg-teal-100"
// // // // // // // // // // // // //                     disabled={loading === cell.id}
// // // // // // // // // // // // //                   >
// // // // // // // // // // // // //                     <Play className={`h-3 w-3 mr-1 ${loading === cell.id ? 'animate-spin' : ''}`} />
// // // // // // // // // // // // //                     Run
// // // // // // // // // // // // //                   </button>
// // // // // // // // // // // // //                   {/* Display Execution Time */}
// // // // // // // // // // // // //                   {cell.executionTime && (
// // // // // // // // // // // // //                     <span className="text-xs text-gray-500 ml-2">
// // // // // // // // // // // // //                       ({cell.executionTime})
// // // // // // // // // // // // //                     </span>
// // // // // // // // // // // // //                   )}
// // // // // // // // // // // // //                   <button
// // // // // // // // // // // // //                     onClick={() => deleteCell(cell.id)}
// // // // // // // // // // // // //                     className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-md"
// // // // // // // // // // // // //                   >
// // // // // // // // // // // // //                     <X className="h-4 w-4" />
// // // // // // // // // // // // //                   </button>
// // // // // // // // // // // // //                 </div>
// // // // // // // // // // // // //               </div>

// // // // // // // // // // // // //               {/* Editor */}
// // // // // // // // // // // // //               {cell.isExpanded && (
// // // // // // // // // // // // //                 <>
// // // // // // // // // // // // //                   <div className="border rounded-lg overflow-hidden bg-gray-50">
// // // // // // // // // // // // //                     <Editor
// // // // // // // // // // // // //                       height={calculateEditorHeight(cell.query)}
// // // // // // // // // // // // //                       defaultLanguage="sql"
// // // // // // // // // // // // //                       value={cell.query}
// // // // // // // // // // // // //                       onChange={value =>
// // // // // // // // // // // // //                         setCells(prev =>
// // // // // // // // // // // // //                           prev.map(c =>
// // // // // // // // // // // // //                             c.id === cell.id ? { ...c, query: value || '' } : c
// // // // // // // // // // // // //                           )
// // // // // // // // // // // // //                         )
// // // // // // // // // // // // //                       }
// // // // // // // // // // // // //                       options={{
// // // // // // // // // // // // //                         minimap: { enabled: false },
// // // // // // // // // // // // //                         fontSize: 13,
// // // // // // // // // // // // //                         lineHeight: 1.5,
// // // // // // // // // // // // //                         padding: { top: 8, bottom: 8 },
// // // // // // // // // // // // //                         scrollBeyondLastLine: false,
// // // // // // // // // // // // //                       }}
// // // // // // // // // // // // //                     />
// // // // // // // // // // // // //                   </div>

// // // // // // // // // // // // //                   {/* Error Message */}
// // // // // // // // // // // // //                   {cell.error && (
// // // // // // // // // // // // //                     <div className="mt-3 flex items-start px-4 py-3 bg-red-50 border border-red-100 rounded-lg">
// // // // // // // // // // // // //                       <AlertCircle className="h-4 w-4 text-red-500 mt-0.5" />
// // // // // // // // // // // // //                       <span className="text-xs text-red-600 ml-2">{cell.error}</span>
// // // // // // // // // // // // //                     </div>
// // // // // // // // // // // // //                   )}

// // // // // // // // // // // // //                   {/* Results Table */}
// // // // // // // // // // // // //                   {cell.result.length > 0 && (
// // // // // // // // // // // // //                     <div className="mt-4 border rounded-lg bg-gray-50 overflow-x-auto">
// // // // // // // // // // // // //                       <table className="w-full text-xs">
// // // // // // // // // // // // //                         <thead>
// // // // // // // // // // // // //                           <tr className="bg-gray-100">
// // // // // // // // // // // // //                             {cell.columns.map(col => (
// // // // // // // // // // // // //                               <th key={col.name} className="px-4 py-2 text-left font-medium text-gray-700">
// // // // // // // // // // // // //                                 <div className="flex flex-col items-start">
// // // // // // // // // // // // //                                   <span>{col.name}</span>
// // // // // // // // // // // // //                                   {/* Display data type below the column name */}
// // // // // // // // // // // // //                                   <span style={{ fontSize: '10px', color: '#9CA3AF', fontWeight: '400', letterSpacing: '0.09em' }}>{col.type}</span>
// // // // // // // // // // // // //                                 </div>
// // // // // // // // // // // // //                               </th>
// // // // // // // // // // // // //                             ))}
// // // // // // // // // // // // //                           </tr>
// // // // // // // // // // // // //                         </thead>
// // // // // // // // // // // // //                         <tbody>
// // // // // // // // // // // // //                           {cell.result.map((row, idx) => (
// // // // // // // // // // // // //                             <tr key={idx} className="hover:bg-gray-200">
// // // // // // // // // // // // //                               {cell.columns.map(col => (
// // // // // // // // // // // // //                                 <td
// // // // // // // // // // // // //                                   key={col.name}
// // // // // // // // // // // // //                                   className={`px-4 py-2 text-gray-800 ${
// // // // // // // // // // // // //                                     ['integer', 'int', 'bigint', 'double', 'float'].includes(col.type.toLowerCase())
// // // // // // // // // // // // //                                       ? 'text-right'
// // // // // // // // // // // // //                                       : 'text-left'
// // // // // // // // // // // // //                                   }`}
// // // // // // // // // // // // //                                 >
// // // // // // // // // // // // //                                   {row[col.name] !== null && row[col.name] !== undefined ? row[col.name].toString() : 'NULL'}
// // // // // // // // // // // // //                                 </td>
// // // // // // // // // // // // //                               ))}
// // // // // // // // // // // // //                             </tr>
// // // // // // // // // // // // //                           ))}
// // // // // // // // // // // // //                         </tbody>
// // // // // // // // // // // // //                       </table>
// // // // // // // // // // // // //                     </div>
// // // // // // // // // // // // //                   )}
// // // // // // // // // // // // //                 </>
// // // // // // // // // // // // //               )}
// // // // // // // // // // // // //             </div>
// // // // // // // // // // // // //           </div>
// // // // // // // // // // // // //         ))}
// // // // // // // // // // // // //       </div>

// // // // // // // // // // // // //       {/* Add Cell Button */}
// // // // // // // // // // // // //       <button
// // // // // // // // // // // // //         onClick={addCell}
// // // // // // // // // // // // //         className="flex items-center px-4 py-2 text-xs font-medium text-teal-700 bg-teal-50 rounded-md hover:bg-teal-100"
// // // // // // // // // // // // //       >
// // // // // // // // // // // // //         <Plus className="h-4 w-4 mr-1" />
// // // // // // // // // // // // //         Add Cell
// // // // // // // // // // // // //       </button>
// // // // // // // // // // // // //     </div>
// // // // // // // // // // // // //   );
// // // // // // // // // // // // // };

// // // // // // // // // // // // // export default SQLNotebook;




// // // // // // // // // // // // import { useState, useEffect } from 'react';
// // // // // // // // // // // // import Editor from '@monaco-editor/react'; // Monaco Editor for SQL editing
// // // // // // // // // // // // import { Plus, X, Play, ChevronDown, ChevronUp, AlertCircle } from 'lucide-react'; // Icons

// // // // // // // // // // // // // Define the structure of a Cell
// // // // // // // // // // // // interface Cell {
// // // // // // // // // // // //   id: number; // Unique identifier
// // // // // // // // // // // //   query: string; // SQL query string
// // // // // // // // // // // //   result: any[]; // Result rows
// // // // // // // // // // // //   columns: { name: string; type: string }[]; // Column names and their data types
// // // // // // // // // // // //   error: string | null; // Error message
// // // // // // // // // // // //   isExpanded: boolean; // Expanded/collapsed state
// // // // // // // // // // // //   executionTime: string | null; // Time taken to execute the query
// // // // // // // // // // // // }

// // // // // // // // // // // // // Main SQL Notebook Component
// // // // // // // // // // // // const SQLNotebook = ({ activeTab = 'notebook1', notebookContent }: { activeTab: string; notebookContent: string }) => {
// // // // // // // // // // // //   const [cells, setCells] = useState<Cell[]>([]);
// // // // // // // // // // // //   const [loading, setLoading] = useState<number | null>(null); // Tracks loading state

// // // // // // // // // // // //   useEffect(() => {
// // // // // // // // // // // //     // Parse the notebook content and initialize the cells
// // // // // // // // // // // //     if (notebookContent) {
// // // // // // // // // // // //       try {
// // // // // // // // // // // //         const notebook = JSON.parse(notebookContent);
// // // // // // // // // // // //         const codeCells = notebook.cells.filter((cell: any) => cell.cell_type === 'code');
// // // // // // // // // // // //         const initialCells = codeCells.map((cell: any, index: number) => {
// // // // // // // // // // // //           const query = Array.isArray(cell.source) ? cell.source.join('') : cell.source;
// // // // // // // // // // // //           return {
// // // // // // // // // // // //             id: index + 1,
// // // // // // // // // // // //             query: query,
// // // // // // // // // // // //             result: [],
// // // // // // // // // // // //             columns: [],
// // // // // // // // // // // //             error: null,
// // // // // // // // // // // //             isExpanded: true,
// // // // // // // // // // // //             executionTime: null,
// // // // // // // // // // // //           };
// // // // // // // // // // // //         });
// // // // // // // // // // // //         setCells(initialCells);
// // // // // // // // // // // //       } catch (error) {
// // // // // // // // // // // //         console.error('Error parsing notebook content:', error);
// // // // // // // // // // // //         // Initialize with an empty cell if parsing fails
// // // // // // // // // // // //         setCells([
// // // // // // // // // // // //           { id: 1, query: '', result: [], columns: [], error: null, isExpanded: true, executionTime: null },
// // // // // // // // // // // //         ]);
// // // // // // // // // // // //       }
// // // // // // // // // // // //     } else {
// // // // // // // // // // // //       setCells([
// // // // // // // // // // // //         { id: 1, query: '', result: [], columns: [], error: null, isExpanded: true, executionTime: null },
// // // // // // // // // // // //       ]);
// // // // // // // // // // // //     }
// // // // // // // // // // // //   }, [notebookContent]);

// // // // // // // // // // // //   // Calculate editor height dynamically based on content
// // // // // // // // // // // //   const calculateEditorHeight = (content: string) => {
// // // // // // // // // // // //     const lineCount = (content.match(/\n/g) || []).length + 1;
// // // // // // // // // // // //     const baseHeight = 150;
// // // // // // // // // // // //     const lineHeight = 20;
// // // // // // // // // // // //     const maxHeight = 500;
// // // // // // // // // // // //     return `${Math.min(Math.max(baseHeight, lineCount * lineHeight), maxHeight)}px`;
// // // // // // // // // // // //   };

// // // // // // // // // // // //   // Add a new cell
// // // // // // // // // // // //   const addCell = () => {
// // // // // // // // // // // //     setCells(prev => [
// // // // // // // // // // // //       ...prev,
// // // // // // // // // // // //       { id: prev.length + 1, query: '', result: [], columns: [], error: null, isExpanded: true, executionTime: null },
// // // // // // // // // // // //     ]);
// // // // // // // // // // // //   };

// // // // // // // // // // // //   // Delete a cell
// // // // // // // // // // // //   const deleteCell = (id: number) => {
// // // // // // // // // // // //     setCells(prev => prev.filter(cell => cell.id !== id));
// // // // // // // // // // // //   };

// // // // // // // // // // // //   // Toggle expand/collapse state of a cell
// // // // // // // // // // // //   const toggleExpand = (id: number) => {
// // // // // // // // // // // //     setCells(prev =>
// // // // // // // // // // // //       prev.map(cell => (cell.id === id ? { ...cell, isExpanded: !cell.isExpanded } : cell))
// // // // // // // // // // // //     );
// // // // // // // // // // // //   };

// // // // // // // // // // // //   // Execute SQL query for a specific cell
// // // // // // // // // // // //   const executeQuery = async (cellId: number) => {
// // // // // // // // // // // //     const cell = cells.find(c => c.id === cellId);
// // // // // // // // // // // //     if (!cell) return;

// // // // // // // // // // // //     setLoading(cellId); // Set loading state for this cell

// // // // // // // // // // // //     const startTime = Date.now(); // Start time measurement

// // // // // // // // // // // //     try {
// // // // // // // // // // // //       const response = await fetch('http://127.0.0.1:8000/api/execute-sql/', {
// // // // // // // // // // // //         method: 'POST',
// // // // // // // // // // // //         headers: {
// // // // // // // // // // // //           'Content-Type': 'application/json',
// // // // // // // // // // // //           'Authorization': 'Token d36e47f0e5c0a356d35a7d6d407aab93f6b0d36b', 
// // // // // // // // // // // //           // 'Authorization': `Token ${process.env.REACT_APP_ROOT_USER_TOKEN}`, 
// // // // // // // // // // // //         },
// // // // // // // // // // // //         body: JSON.stringify({ query: cell.query }),
// // // // // // // // // // // //       });

// // // // // // // // // // // //       const endTime = Date.now(); // End time measurement
// // // // // // // // // // // //       const timeTaken = endTime - startTime; // Time taken in milliseconds
// // // // // // // // // // // //       const formattedTime = formatTime(timeTaken);

// // // // // // // // // // // //       if (!response.ok) {
// // // // // // // // // // // //         const errorData = await response.json().catch(() => ({ error: 'Unknown error occurred' }));
// // // // // // // // // // // //         throw new Error(errorData.error || 'Query execution failed');
// // // // // // // // // // // //       }

// // // // // // // // // // // //       const data = await response.json();

// // // // // // // // // // // //       // Validate that the number of columns matches
// // // // // // // // // // // //       if (data.columns.length > 0 && data.rows.length > 0 && data.columns.length !== Object.keys(data.rows[0]).length) {
// // // // // // // // // // // //         throw new Error('Mismatch between columns and data. Please check the table schema.');
// // // // // // // // // // // //       }

// // // // // // // // // // // //       setCells(prev =>
// // // // // // // // // // // //         prev.map(c =>
// // // // // // // // // // // //           c.id === cellId
// // // // // // // // // // // //             ? { ...c, result: data.rows, columns: data.columns, error: null, executionTime: formattedTime }
// // // // // // // // // // // //             : c
// // // // // // // // // // // //         )
// // // // // // // // // // // //       );
// // // // // // // // // // // //     } catch (err: any) {
// // // // // // // // // // // //       console.error(`Error executing query for cell ${cellId}:`, err);
// // // // // // // // // // // //       setCells(prev =>
// // // // // // // // // // // //         prev.map(c =>
// // // // // // // // // // // //           c.id === cellId
// // // // // // // // // // // //             ? { ...c, result: [], columns: [], error: err.message || 'Unknown error', executionTime: null }
// // // // // // // // // // // //             : c
// // // // // // // // // // // //         )
// // // // // // // // // // // //       );
// // // // // // // // // // // //     } finally {
// // // // // // // // // // // //       setLoading(null); // Reset loading state
// // // // // // // // // // // //     }
// // // // // // // // // // // //   };

// // // // // // // // // // // //   // Format time from milliseconds to a readable string
// // // // // // // // // // // //   const formatTime = (ms: number): string => {
// // // // // // // // // // // //     if (ms < 1000) {
// // // // // // // // // // // //       return `${ms} ms`;
// // // // // // // // // // // //     } else {
// // // // // // // // // // // //       return `${(ms / 1000).toFixed(2)} s`;
// // // // // // // // // // // //     }
// // // // // // // // // // // //   };

// // // // // // // // // // // //   // Render the SQL Notebook interface
// // // // // // // // // // // //   return (
// // // // // // // // // // // //     <div className="w-full space-y-4 p-6">
// // // // // // // // // // // //       {/* Header */}
// // // // // // // // // // // //       <div className="text-lg font-medium text-center pb-3 border-b border-teal-700">
// // // // // // // // // // // //         <span className="bg-gradient-to-r from-teal-600 to-emerald-500 bg-clip-text text-transparent">
// // // // // // // // // // // //           {activeTab === 'entity_target_notebook' && 'Entity & Target Analysis Notebook'}
// // // // // // // // // // // //           {activeTab === 'features_notebook' && 'Features Analysis Notebook'}
// // // // // // // // // // // //         </span>
// // // // // // // // // // // //       </div>

// // // // // // // // // // // //       {/* Cells */}
// // // // // // // // // // // //       <div className="space-y-4">
// // // // // // // // // // // //         {cells.map(cell => (
// // // // // // // // // // // //           <div
// // // // // // // // // // // //             key={cell.id}
// // // // // // // // // // // //             className="bg-white rounded-lg border border-gray-100 shadow-sm hover:shadow-md group"
// // // // // // // // // // // //           >
// // // // // // // // // // // //             <div className="p-4">
// // // // // // // // // // // //               {/* Cell Header */}
// // // // // // // // // // // //               <div className="flex items-center justify-between mb-2">
// // // // // // // // // // // //                 <div className="flex items-center space-x-2">
// // // // // // // // // // // //                   <span className="text-xs font-medium text-gray-400">Query {cell.id}</span>
// // // // // // // // // // // //                   <button
// // // // // // // // // // // //                     onClick={() => toggleExpand(cell.id)}
// // // // // // // // // // // //                     className="p-1 hover:bg-gray-100 rounded-md"
// // // // // // // // // // // //                   >
// // // // // // // // // // // //                     {cell.isExpanded ? (
// // // // // // // // // // // //                       <ChevronUp className="h-4 w-4 text-gray-400" />
// // // // // // // // // // // //                     ) : (
// // // // // // // // // // // //                       <ChevronDown className="h-4 w-4 text-gray-400" />
// // // // // // // // // // // //                     )}
// // // // // // // // // // // //                   </button>
// // // // // // // // // // // //                 </div>
// // // // // // // // // // // //                 <div className="flex items-center space-x-2">
// // // // // // // // // // // //                   <button
// // // // // // // // // // // //                     onClick={() => executeQuery(cell.id)}
// // // // // // // // // // // //                     className="flex items-center px-3 py-1.5 text-xs font-medium text-teal-700 bg-teal-50 rounded-md hover:bg-teal-100"
// // // // // // // // // // // //                     disabled={loading === cell.id}
// // // // // // // // // // // //                   >
// // // // // // // // // // // //                     <Play className={`h-3 w-3 mr-1 ${loading === cell.id ? 'animate-spin' : ''}`} />
// // // // // // // // // // // //                     Run
// // // // // // // // // // // //                   </button>
// // // // // // // // // // // //                   {/* Display Execution Time */}
// // // // // // // // // // // //                   {cell.executionTime && (
// // // // // // // // // // // //                     <span className="text-xs text-gray-500 ml-2">
// // // // // // // // // // // //                       ({cell.executionTime})
// // // // // // // // // // // //                     </span>
// // // // // // // // // // // //                   )}
// // // // // // // // // // // //                   <button
// // // // // // // // // // // //                     onClick={() => deleteCell(cell.id)}
// // // // // // // // // // // //                     className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-md"
// // // // // // // // // // // //                   >
// // // // // // // // // // // //                     <X className="h-4 w-4" />
// // // // // // // // // // // //                   </button>
// // // // // // // // // // // //                 </div>
// // // // // // // // // // // //               </div>

// // // // // // // // // // // //               {/* Editor */}
// // // // // // // // // // // //               {cell.isExpanded && (
// // // // // // // // // // // //                 <>
// // // // // // // // // // // //                   <div className="border rounded-lg overflow-hidden bg-gray-50">
// // // // // // // // // // // //                     <Editor
// // // // // // // // // // // //                       height={calculateEditorHeight(cell.query)}
// // // // // // // // // // // //                       defaultLanguage="sql"
// // // // // // // // // // // //                       value={cell.query}
// // // // // // // // // // // //                       onChange={value =>
// // // // // // // // // // // //                         setCells(prev =>
// // // // // // // // // // // //                           prev.map(c =>
// // // // // // // // // // // //                             c.id === cell.id ? { ...c, query: value || '' } : c
// // // // // // // // // // // //                           )
// // // // // // // // // // // //                         )
// // // // // // // // // // // //                       }
// // // // // // // // // // // //                       options={{
// // // // // // // // // // // //                         minimap: { enabled: false },
// // // // // // // // // // // //                         fontSize: 13,
// // // // // // // // // // // //                         lineHeight: 1.5,
// // // // // // // // // // // //                         padding: { top: 8, bottom: 8 },
// // // // // // // // // // // //                         scrollBeyondLastLine: false,
// // // // // // // // // // // //                       }}
// // // // // // // // // // // //                     />
// // // // // // // // // // // //                   </div>

// // // // // // // // // // // //                   {/* Error Message */}
// // // // // // // // // // // //                   {cell.error && (
// // // // // // // // // // // //                     <div className="mt-3 flex items-start px-4 py-3 bg-red-50 border border-red-100 rounded-lg">
// // // // // // // // // // // //                       <AlertCircle className="h-4 w-4 text-red-500 mt-0.5" />
// // // // // // // // // // // //                       <span className="text-xs text-red-600 ml-2">{cell.error}</span>
// // // // // // // // // // // //                     </div>
// // // // // // // // // // // //                   )}

// // // // // // // // // // // //                   {/* Results Table */}
// // // // // // // // // // // //                   {cell.result.length > 0 && (
// // // // // // // // // // // //                     <div className="mt-4 border rounded-lg bg-gray-50 overflow-x-auto">
// // // // // // // // // // // //                       <table className="w-full text-xs">
// // // // // // // // // // // //                         <thead>
// // // // // // // // // // // //                           <tr className="bg-gray-100">
// // // // // // // // // // // //                             {cell.columns.map(col => (
// // // // // // // // // // // //                               <th key={col.name} className="px-4 py-2 text-left font-medium text-gray-700">
// // // // // // // // // // // //                                 <div className="flex flex-col items-start">
// // // // // // // // // // // //                                   <span>{col.name}</span>
// // // // // // // // // // // //                                   {/* Display data type below the column name */}
// // // // // // // // // // // //                                   <span style={{ fontSize: '10px', color: '#9CA3AF', fontWeight: '400', letterSpacing: '0.09em' }}>{col.type}</span>
// // // // // // // // // // // //                                 </div>
// // // // // // // // // // // //                               </th>
// // // // // // // // // // // //                             ))}
// // // // // // // // // // // //                           </tr>
// // // // // // // // // // // //                         </thead>
// // // // // // // // // // // //                         <tbody>
// // // // // // // // // // // //                           {cell.result.map((row, idx) => (
// // // // // // // // // // // //                             <tr key={idx} className="hover:bg-gray-200">
// // // // // // // // // // // //                               {cell.columns.map(col => (
// // // // // // // // // // // //                                 <td
// // // // // // // // // // // //                                   key={col.name}
// // // // // // // // // // // //                                   className={`px-4 py-2 text-gray-800 ${
// // // // // // // // // // // //                                     ['integer', 'int', 'bigint', 'double', 'float'].includes(col.type.toLowerCase())
// // // // // // // // // // // //                                       ? 'text-right'
// // // // // // // // // // // //                                       : 'text-left'
// // // // // // // // // // // //                                   }`}
// // // // // // // // // // // //                                 >
// // // // // // // // // // // //                                   {row[col.name] !== null && row[col.name] !== undefined ? row[col.name].toString() : 'NULL'}
// // // // // // // // // // // //                                 </td>
// // // // // // // // // // // //                               ))}
// // // // // // // // // // // //                             </tr>
// // // // // // // // // // // //                           ))}
// // // // // // // // // // // //                         </tbody>
// // // // // // // // // // // //                       </table>
// // // // // // // // // // // //                     </div>
// // // // // // // // // // // //                   )}
// // // // // // // // // // // //                 </>
// // // // // // // // // // // //               )}
// // // // // // // // // // // //             </div>
// // // // // // // // // // // //           </div>
// // // // // // // // // // // //         ))}
// // // // // // // // // // // //       </div>

// // // // // // // // // // // //       {/* Add Cell Button */}
// // // // // // // // // // // //       <button
// // // // // // // // // // // //         onClick={addCell}
// // // // // // // // // // // //         className="flex items-center px-4 py-2 text-xs font-medium text-teal-700 bg-teal-50 rounded-md hover:bg-teal-100"
// // // // // // // // // // // //       >
// // // // // // // // // // // //         <Plus className="h-4 w-4 mr-1" />
// // // // // // // // // // // //         Add Cell
// // // // // // // // // // // //       </button>
// // // // // // // // // // // //     </div>
// // // // // // // // // // // //   );
// // // // // // // // // // // // };

// // // // // // // // // // // // export default SQLNotebook;




// // // // // // // // // // // // SQLNotebook.tsx

// // // // // // // // // // // import { useState, useEffect } from 'react';
// // // // // // // // // // // import Editor from '@monaco-editor/react'; // Monaco Editor for SQL editing
// // // // // // // // // // // import { Play, ChevronDown, ChevronUp, AlertCircle, X } from 'lucide-react'; // Icons
// // // // // // // // // // // import ReactMarkdown from 'react-markdown'; // For rendering markdown
// // // // // // // // // // // import remarkGfm from 'remark-gfm'; // For GitHub Flavored Markdown support

// // // // // // // // // // // interface Cell {
// // // // // // // // // // //   id: number; // Unique identifier
// // // // // // // // // // //   type: 'code' | 'markdown'; // Cell type
// // // // // // // // // // //   content: string; // Content for markdown cells
// // // // // // // // // // //   query: string; // SQL query for code cells
// // // // // // // // // // //   result: any[]; // Result rows
// // // // // // // // // // //   columns: { name: string; type: string }[]; // Column names and their data types
// // // // // // // // // // //   error: string | null; // Error message
// // // // // // // // // // //   isExpanded: boolean; // Expanded/collapsed state
// // // // // // // // // // //   executionTime: string | null; // Time taken to execute the query
// // // // // // // // // // // }

// // // // // // // // // // // const SQLNotebook = ({
// // // // // // // // // // //   activeTab = 'notebook1',
// // // // // // // // // // //   notebookContent,
// // // // // // // // // // // }: {
// // // // // // // // // // //   activeTab: string;
// // // // // // // // // // //   notebookContent: string;
// // // // // // // // // // // }) => {
// // // // // // // // // // //   const [cells, setCells] = useState<Cell[]>([]);
// // // // // // // // // // //   const [loading, setLoading] = useState<number | null>(null); // Tracks loading state

// // // // // // // // // // //   useEffect(() => {
// // // // // // // // // // //     // Parse the notebook content and initialize the cells
// // // // // // // // // // //     if (notebookContent) {
// // // // // // // // // // //       try {
// // // // // // // // // // //         const notebook = JSON.parse(notebookContent);
// // // // // // // // // // //         const initialCells = notebook.cells
// // // // // // // // // // //           .map((cell: any, index: number) => {
// // // // // // // // // // //             const source = Array.isArray(cell.source)
// // // // // // // // // // //               ? cell.source.join('')
// // // // // // // // // // //               : cell.source;
// // // // // // // // // // //             if (cell.cell_type === 'code') {
// // // // // // // // // // //               // Extract initial result from outputs
// // // // // // // // // // //               let initialResult: any[] = [];
// // // // // // // // // // //               let columns: { name: string; type: string }[] = [];
// // // // // // // // // // //               if (cell.outputs && cell.outputs.length > 0) {
// // // // // // // // // // //                 const output = cell.outputs[0];
// // // // // // // // // // //                 if (
// // // // // // // // // // //                   output.output_type === 'execute_result' &&
// // // // // // // // // // //                   output.data &&
// // // // // // // // // // //                   output.data['application/json']
// // // // // // // // // // //                 ) {
// // // // // // // // // // //                   initialResult = output.data['application/json'];
// // // // // // // // // // //                   if (initialResult.length > 0) {
// // // // // // // // // // //                     columns = Object.keys(initialResult[0]).map((col) => ({
// // // // // // // // // // //                       name: col,
// // // // // // // // // // //                       type: 'string', // Adjust type as needed
// // // // // // // // // // //                     }));
// // // // // // // // // // //                   }
// // // // // // // // // // //                 }
// // // // // // // // // // //               }
// // // // // // // // // // //               return {
// // // // // // // // // // //                 id: index + 1,
// // // // // // // // // // //                 type: 'code',
// // // // // // // // // // //                 content: '', // No content for code cells
// // // // // // // // // // //                 query: source,
// // // // // // // // // // //                 result: initialResult,
// // // // // // // // // // //                 columns: columns,
// // // // // // // // // // //                 error: null,
// // // // // // // // // // //                 isExpanded: true,
// // // // // // // // // // //                 executionTime: null,
// // // // // // // // // // //               };
// // // // // // // // // // //             } else if (cell.cell_type === 'markdown') {
// // // // // // // // // // //               return {
// // // // // // // // // // //                 id: index + 1,
// // // // // // // // // // //                 type: 'markdown',
// // // // // // // // // // //                 content: source,
// // // // // // // // // // //                 query: '', // No query for markdown cells
// // // // // // // // // // //                 result: [],
// // // // // // // // // // //                 columns: [],
// // // // // // // // // // //                 error: null,
// // // // // // // // // // //                 isExpanded: true,
// // // // // // // // // // //                 executionTime: null,
// // // // // // // // // // //               };
// // // // // // // // // // //             } else {
// // // // // // // // // // //               return null; // Skip other cell types
// // // // // // // // // // //             }
// // // // // // // // // // //           })
// // // // // // // // // // //           .filter((cell: null) => cell !== null) as Cell[];
// // // // // // // // // // //         setCells(initialCells);
// // // // // // // // // // //       } catch (error) {
// // // // // // // // // // //         console.error('Error parsing notebook content:', error);
// // // // // // // // // // //         // Initialize with an empty cell if parsing fails
// // // // // // // // // // //         setCells([
// // // // // // // // // // //           {
// // // // // // // // // // //             id: 1,
// // // // // // // // // // //             type: 'code',
// // // // // // // // // // //             content: '',
// // // // // // // // // // //             query: '',
// // // // // // // // // // //             result: [],
// // // // // // // // // // //             columns: [],
// // // // // // // // // // //             error: null,
// // // // // // // // // // //             isExpanded: true,
// // // // // // // // // // //             executionTime: null,
// // // // // // // // // // //           },
// // // // // // // // // // //         ]);
// // // // // // // // // // //       }
// // // // // // // // // // //     } else {
// // // // // // // // // // //       setCells([
// // // // // // // // // // //         {
// // // // // // // // // // //           id: 1,
// // // // // // // // // // //           type: 'code',
// // // // // // // // // // //           content: '',
// // // // // // // // // // //           query: '',
// // // // // // // // // // //           result: [],
// // // // // // // // // // //           columns: [],
// // // // // // // // // // //           error: null,
// // // // // // // // // // //           isExpanded: true,
// // // // // // // // // // //           executionTime: null,
// // // // // // // // // // //         },
// // // // // // // // // // //       ]);
// // // // // // // // // // //     }
// // // // // // // // // // //   }, [notebookContent]);

// // // // // // // // // // //   // Calculate editor height dynamically based on content
// // // // // // // // // // //   const calculateEditorHeight = (content: string) => {
// // // // // // // // // // //     const lineCount = (content.match(/\n/g) || []).length + 1;
// // // // // // // // // // //     const baseHeight = 150;
// // // // // // // // // // //     const lineHeight = 20;
// // // // // // // // // // //     const maxHeight = 500;
// // // // // // // // // // //     return `${Math.min(Math.max(baseHeight, lineCount * lineHeight), maxHeight)}px`;
// // // // // // // // // // //   };

// // // // // // // // // // //   // Execute SQL query for a specific cell
// // // // // // // // // // //   const executeQuery = async (cellId: number) => {
// // // // // // // // // // //     const cell = cells.find((c) => c.id === cellId);
// // // // // // // // // // //     if (!cell || cell.type !== 'code') return;

// // // // // // // // // // //     setLoading(cellId); // Set loading state for this cell

// // // // // // // // // // //     const startTime = Date.now(); // Start time measurement

// // // // // // // // // // //     try {
// // // // // // // // // // //       const response = await fetch('/api/execute-sql/', {
// // // // // // // // // // //         method: 'POST',
// // // // // // // // // // //         headers: {
// // // // // // // // // // //           'Content-Type': 'application/json',
// // // // // // // // // // //           // Include authentication headers if required
// // // // // // // // // // //           // 'Authorization': `Token ${your_token}`,
// // // // // // // // // // //         },
// // // // // // // // // // //         body: JSON.stringify({ query: cell.query }),
// // // // // // // // // // //       });

// // // // // // // // // // //       const endTime = Date.now(); // End time measurement
// // // // // // // // // // //       const timeTaken = endTime - startTime; // Time taken in milliseconds
// // // // // // // // // // //       const formattedTime = formatTime(timeTaken);

// // // // // // // // // // //       if (!response.ok) {
// // // // // // // // // // //         const errorData = await response
// // // // // // // // // // //           .json()
// // // // // // // // // // //           .catch(() => ({ error: 'Unknown error occurred' }));
// // // // // // // // // // //         throw new Error(errorData.error || 'Query execution failed');
// // // // // // // // // // //       }

// // // // // // // // // // //       const data = await response.json();

// // // // // // // // // // //       setCells((prev) =>
// // // // // // // // // // //         prev.map((c) =>
// // // // // // // // // // //           c.id === cellId
// // // // // // // // // // //             ? {
// // // // // // // // // // //                 ...c,
// // // // // // // // // // //                 result: data.rows,
// // // // // // // // // // //                 columns: data.columns,
// // // // // // // // // // //                 error: null,
// // // // // // // // // // //                 executionTime: formattedTime,
// // // // // // // // // // //               }
// // // // // // // // // // //             : c
// // // // // // // // // // //         )
// // // // // // // // // // //       );
// // // // // // // // // // //     } catch (err: any) {
// // // // // // // // // // //       console.error(`Error executing query for cell ${cellId}:`, err);
// // // // // // // // // // //       setCells((prev) =>
// // // // // // // // // // //         prev.map((c) =>
// // // // // // // // // // //           c.id === cellId
// // // // // // // // // // //             ? {
// // // // // // // // // // //                 ...c,
// // // // // // // // // // //                 result: [],
// // // // // // // // // // //                 columns: [],
// // // // // // // // // // //                 error: err.message || 'Unknown error',
// // // // // // // // // // //                 executionTime: null,
// // // // // // // // // // //               }
// // // // // // // // // // //             : c
// // // // // // // // // // //         )
// // // // // // // // // // //       );
// // // // // // // // // // //     } finally {
// // // // // // // // // // //       setLoading(null); // Reset loading state
// // // // // // // // // // //     }
// // // // // // // // // // //   };

// // // // // // // // // // //   // Format time from milliseconds to a readable string
// // // // // // // // // // //   const formatTime = (ms: number): string => {
// // // // // // // // // // //     if (ms < 1000) {
// // // // // // // // // // //       return `${ms} ms`;
// // // // // // // // // // //     } else {
// // // // // // // // // // //       return `${(ms / 1000).toFixed(2)} s`;
// // // // // // // // // // //     }
// // // // // // // // // // //   };

// // // // // // // // // // //   // Toggle expand/collapse state of a cell
// // // // // // // // // // //   const toggleExpand = (id: number) => {
// // // // // // // // // // //     setCells((prev) =>
// // // // // // // // // // //       prev.map((cell) =>
// // // // // // // // // // //         cell.id === id ? { ...cell, isExpanded: !cell.isExpanded } : cell
// // // // // // // // // // //       )
// // // // // // // // // // //     );
// // // // // // // // // // //   };

// // // // // // // // // // //   // Render the SQL Notebook interface
// // // // // // // // // // //   return (
// // // // // // // // // // //     <div className="w-full space-y-4 p-6">
// // // // // // // // // // //       {/* Header */}
// // // // // // // // // // //       <div className="text-lg font-medium text-center pb-3 border-b border-teal-700">
// // // // // // // // // // //         <span className="bg-gradient-to-r from-teal-600 to-emerald-500 bg-clip-text text-transparent">
// // // // // // // // // // //           {activeTab === 'entity_target_notebook' &&
// // // // // // // // // // //             'Entity & Target Analysis Notebook'}
// // // // // // // // // // //           {activeTab === 'features_notebook' && 'Features Analysis Notebook'}
// // // // // // // // // // //         </span>
// // // // // // // // // // //       </div>

// // // // // // // // // // //       {/* Cells */}
// // // // // // // // // // //       <div className="space-y-4">
// // // // // // // // // // //         {cells.map((cell) => (
// // // // // // // // // // //           <div
// // // // // // // // // // //             key={cell.id}
// // // // // // // // // // //             className="bg-white rounded-lg border border-gray-100 shadow-sm hover:shadow-md group"
// // // // // // // // // // //           >
// // // // // // // // // // //             {cell.type === 'markdown' ? (
// // // // // // // // // // //               <div className="p-4">
// // // // // // // // // // //                 {/* Markdown Cell */}
// // // // // // // // // // //                 <ReactMarkdown
// // // // // // // // // // //                   className="prose prose-sm"
// // // // // // // // // // //                   remarkPlugins={[remarkGfm]}
// // // // // // // // // // //                 >
// // // // // // // // // // //                   {cell.content}
// // // // // // // // // // //                 </ReactMarkdown>
// // // // // // // // // // //               </div>
// // // // // // // // // // //             ) : (
// // // // // // // // // // //               <div className="p-4">
// // // // // // // // // // //                 {/* Code Cell */}
// // // // // // // // // // //                 {/* Cell Header */}
// // // // // // // // // // //                 <div className="flex items-center justify-between mb-2">
// // // // // // // // // // //                   <div className="flex items-center space-x-2">
// // // // // // // // // // //                     <span className="text-xs font-medium text-gray-400">
// // // // // // // // // // //                       Query {cell.id}
// // // // // // // // // // //                     </span>
// // // // // // // // // // //                     <button
// // // // // // // // // // //                       onClick={() => toggleExpand(cell.id)}
// // // // // // // // // // //                       className="p-1 hover:bg-gray-100 rounded-md"
// // // // // // // // // // //                     >
// // // // // // // // // // //                       {cell.isExpanded ? (
// // // // // // // // // // //                         <ChevronUp className="h-4 w-4 text-gray-400" />
// // // // // // // // // // //                       ) : (
// // // // // // // // // // //                         <ChevronDown className="h-4 w-4 text-gray-400" />
// // // // // // // // // // //                       )}
// // // // // // // // // // //                     </button>
// // // // // // // // // // //                   </div>
// // // // // // // // // // //                   <div className="flex items-center space-x-2">
// // // // // // // // // // //                     <button
// // // // // // // // // // //                       onClick={() => executeQuery(cell.id)}
// // // // // // // // // // //                       className="flex items-center px-3 py-1.5 text-xs font-medium text-teal-700 bg-teal-50 rounded-md hover:bg-teal-100"
// // // // // // // // // // //                       disabled={loading === cell.id}
// // // // // // // // // // //                     >
// // // // // // // // // // //                       <Play
// // // // // // // // // // //                         className={`h-3 w-3 mr-1 ${
// // // // // // // // // // //                           loading === cell.id ? 'animate-spin' : ''
// // // // // // // // // // //                         }`}
// // // // // // // // // // //                       />
// // // // // // // // // // //                       Run
// // // // // // // // // // //                     </button>
// // // // // // // // // // //                     {/* Display Execution Time */}
// // // // // // // // // // //                     {cell.executionTime && (
// // // // // // // // // // //                       <span className="text-xs text-gray-500 ml-2">
// // // // // // // // // // //                         ({cell.executionTime})
// // // // // // // // // // //                       </span>
// // // // // // // // // // //                     )}
// // // // // // // // // // //                   </div>
// // // // // // // // // // //                 </div>

// // // // // // // // // // //                 {/* Editor */}
// // // // // // // // // // //                 {cell.isExpanded && (
// // // // // // // // // // //                   <>
// // // // // // // // // // //                     <div className="border rounded-lg overflow-hidden bg-gray-50">
// // // // // // // // // // //                       <Editor
// // // // // // // // // // //                         height={calculateEditorHeight(cell.query)}
// // // // // // // // // // //                         defaultLanguage="sql"
// // // // // // // // // // //                         value={cell.query}
// // // // // // // // // // //                         onChange={(value) =>
// // // // // // // // // // //                           setCells((prev) =>
// // // // // // // // // // //                             prev.map((c) =>
// // // // // // // // // // //                               c.id === cell.id
// // // // // // // // // // //                                 ? { ...c, query: value || '' }
// // // // // // // // // // //                                 : c
// // // // // // // // // // //                             )
// // // // // // // // // // //                           )
// // // // // // // // // // //                         }
// // // // // // // // // // //                         options={{
// // // // // // // // // // //                           minimap: { enabled: false },
// // // // // // // // // // //                           fontSize: 13,
// // // // // // // // // // //                           lineHeight: 1.5,
// // // // // // // // // // //                           padding: { top: 8, bottom: 8 },
// // // // // // // // // // //                           scrollBeyondLastLine: false,
// // // // // // // // // // //                         }}
// // // // // // // // // // //                       />
// // // // // // // // // // //                     </div>

// // // // // // // // // // //                     {/* Error Message */}
// // // // // // // // // // //                     {cell.error && (
// // // // // // // // // // //                       <div className="mt-3 flex items-start px-4 py-3 bg-red-50 border border-red-100 rounded-lg">
// // // // // // // // // // //                         <AlertCircle className="h-4 w-4 text-red-500 mt-0.5" />
// // // // // // // // // // //                         <span className="text-xs text-red-600 ml-2">
// // // // // // // // // // //                           {cell.error}
// // // // // // // // // // //                         </span>
// // // // // // // // // // //                       </div>
// // // // // // // // // // //                     )}

// // // // // // // // // // //                     {/* Results Table */}
// // // // // // // // // // //                     {cell.result.length > 0 && (
// // // // // // // // // // //                       <div className="mt-4 border rounded-lg bg-gray-50 overflow-x-auto">
// // // // // // // // // // //                         <table className="w-full text-xs">
// // // // // // // // // // //                           <thead>
// // // // // // // // // // //                             <tr className="bg-gray-100">
// // // // // // // // // // //                               {cell.columns.map((col) => (
// // // // // // // // // // //                                 <th
// // // // // // // // // // //                                   key={col.name}
// // // // // // // // // // //                                   className="px-4 py-2 text-left font-medium text-gray-700"
// // // // // // // // // // //                                 >
// // // // // // // // // // //                                   <div className="flex flex-col items-start">
// // // // // // // // // // //                                     <span>{col.name}</span>
// // // // // // // // // // //                                   </div>
// // // // // // // // // // //                                 </th>
// // // // // // // // // // //                               ))}
// // // // // // // // // // //                             </tr>
// // // // // // // // // // //                           </thead>
// // // // // // // // // // //                           <tbody>
// // // // // // // // // // //                             {cell.result.map((row, idx) => (
// // // // // // // // // // //                               <tr key={idx} className="hover:bg-gray-200">
// // // // // // // // // // //                                 {cell.columns.map((col) => (
// // // // // // // // // // //                                   <td
// // // // // // // // // // //                                     key={col.name}
// // // // // // // // // // //                                     className={`px-4 py-2 text-gray-800 ${
// // // // // // // // // // //                                       [
// // // // // // // // // // //                                         'integer',
// // // // // // // // // // //                                         'int',
// // // // // // // // // // //                                         'bigint',
// // // // // // // // // // //                                         'double',
// // // // // // // // // // //                                         'float',
// // // // // // // // // // //                                       ].includes(col.type.toLowerCase())
// // // // // // // // // // //                                         ? 'text-right'
// // // // // // // // // // //                                         : 'text-left'
// // // // // // // // // // //                                     }`}
// // // // // // // // // // //                                   >
// // // // // // // // // // //                                     {row[col.name] !== null &&
// // // // // // // // // // //                                     row[col.name] !== undefined
// // // // // // // // // // //                                       ? row[col.name].toString()
// // // // // // // // // // //                                       : 'NULL'}
// // // // // // // // // // //                                   </td>
// // // // // // // // // // //                                 ))}
// // // // // // // // // // //                               </tr>
// // // // // // // // // // //                             ))}
// // // // // // // // // // //                           </tbody>
// // // // // // // // // // //                         </table>
// // // // // // // // // // //                       </div>
// // // // // // // // // // //                     )}
// // // // // // // // // // //                   </>
// // // // // // // // // // //                 )}
// // // // // // // // // // //               </div>
// // // // // // // // // // //             )}
// // // // // // // // // // //           </div>
// // // // // // // // // // //         ))}
// // // // // // // // // // //       </div>
// // // // // // // // // // //     </div>
// // // // // // // // // // //   );
// // // // // // // // // // // };

// // // // // // // // // // // export default SQLNotebook;



// // // // // // // // // // // SQLNotebook.tsx

// // // // // // // // // // import { useState, useEffect } from 'react';
// // // // // // // // // // import Editor from '@monaco-editor/react'; // Monaco Editor for SQL editing
// // // // // // // // // // import { Play, ChevronDown, ChevronUp, AlertCircle } from 'lucide-react'; // Icons
// // // // // // // // // // import ReactMarkdown from 'react-markdown'; // For rendering markdown
// // // // // // // // // // import remarkGfm from 'remark-gfm'; // For GitHub Flavored Markdown support

// // // // // // // // // // interface Cell {
// // // // // // // // // //   id: number; // Unique identifier
// // // // // // // // // //   type: 'code' | 'markdown'; // Cell type
// // // // // // // // // //   content: string; // Content for markdown cells
// // // // // // // // // //   query: string; // SQL query for code cells
// // // // // // // // // //   result: any[]; // Result rows
// // // // // // // // // //   columns: { name: string; type: string }[]; // Column names and their data types
// // // // // // // // // //   error: string | null; // Error message
// // // // // // // // // //   isExpanded: boolean; // Expanded/collapsed state
// // // // // // // // // //   executionTime: string | null; // Time taken to execute the query
// // // // // // // // // // }

// // // // // // // // // // const SQLNotebook = ({
// // // // // // // // // //   activeTab = 'notebook1',
// // // // // // // // // //   notebookContent,
// // // // // // // // // // }: {
// // // // // // // // // //   activeTab: string;
// // // // // // // // // //   notebookContent: string;
// // // // // // // // // // }) => {
// // // // // // // // // //   const [cells, setCells] = useState<Cell[]>([]);
// // // // // // // // // //   const [loading, setLoading] = useState<number | null>(null); // Tracks loading state

// // // // // // // // // //   useEffect(() => {
// // // // // // // // // //     // Parse the notebook content and initialize the cells
// // // // // // // // // //     if (notebookContent) {
// // // // // // // // // //       try {
// // // // // // // // // //         console.log('Received notebookContent:', notebookContent); // Debugging

// // // // // // // // // //         // If notebookContent is a string, parse it
// // // // // // // // // //         let notebook;
// // // // // // // // // //         if (typeof notebookContent === 'string') {
// // // // // // // // // //           // Check if it's double-encoded
// // // // // // // // // //           const parsedOnce = JSON.parse(notebookContent);
// // // // // // // // // //           if (typeof parsedOnce === 'string') {
// // // // // // // // // //             notebook = JSON.parse(parsedOnce);
// // // // // // // // // //           } else {
// // // // // // // // // //             notebook = parsedOnce;
// // // // // // // // // //           }
// // // // // // // // // //         } else {
// // // // // // // // // //           notebook = notebookContent;
// // // // // // // // // //         }

// // // // // // // // // //         console.log('Parsed Notebook:', notebook); // Debugging

// // // // // // // // // //         const initialCells = notebook.cells
// // // // // // // // // //           .map((cell: any, index: number): Cell | null => {
// // // // // // // // // //             const source = Array.isArray(cell.source)
// // // // // // // // // //               ? cell.source.join('')
// // // // // // // // // //               : cell.source;
// // // // // // // // // //             if (cell.cell_type === 'code') {
// // // // // // // // // //               // Extract initial result from outputs
// // // // // // // // // //               let initialResult: any[] = [];
// // // // // // // // // //               let columns: { name: string; type: string }[] = [];
// // // // // // // // // //               if (cell.outputs && cell.outputs.length > 0) {
// // // // // // // // // //                 const output = cell.outputs[0];
// // // // // // // // // //                 console.log(`Cell ${index + 1} output:`, output); // Debugging
// // // // // // // // // //                 if (
// // // // // // // // // //                   output.output_type === 'execute_result' &&
// // // // // // // // // //                   output.data &&
// // // // // // // // // //                   output.data['application/json']
// // // // // // // // // //                 ) {
// // // // // // // // // //                   initialResult = output.data['application/json'];
// // // // // // // // // //                   if (initialResult.length > 0) {
// // // // // // // // // //                     columns = Object.keys(initialResult[0]).map((col) => ({
// // // // // // // // // //                       name: col,
// // // // // // // // // //                       type: typeof initialResult[0][col], // Adjust type as needed
// // // // // // // // // //                     }));
// // // // // // // // // //                   }
// // // // // // // // // //                 }
// // // // // // // // // //               }
// // // // // // // // // //               return {
// // // // // // // // // //                 id: index + 1,
// // // // // // // // // //                 type: 'code',
// // // // // // // // // //                 content: '', // No content for code cells
// // // // // // // // // //                 query: source,
// // // // // // // // // //                 result: initialResult,
// // // // // // // // // //                 columns: columns,
// // // // // // // // // //                 error: null,
// // // // // // // // // //                 isExpanded: true,
// // // // // // // // // //                 executionTime: null,
// // // // // // // // // //               };
// // // // // // // // // //             } else if (cell.cell_type === 'markdown') {
// // // // // // // // // //               return {
// // // // // // // // // //                 id: index + 1,
// // // // // // // // // //                 type: 'markdown',
// // // // // // // // // //                 content: source,
// // // // // // // // // //                 query: '', // No query for markdown cells
// // // // // // // // // //                 result: [],
// // // // // // // // // //                 columns: [],
// // // // // // // // // //                 error: null,
// // // // // // // // // //                 isExpanded: true,
// // // // // // // // // //                 executionTime: null,
// // // // // // // // // //               };
// // // // // // // // // //             } else {
// // // // // // // // // //               return null; // Skip other cell types
// // // // // // // // // //             }
// // // // // // // // // //           })
// // // // // // // // // //           .filter((cell: Cell | null): cell is Cell => cell !== null);

// // // // // // // // // //         console.log('Initial Cells:', initialCells); // Debugging
// // // // // // // // // //         setCells(initialCells);
// // // // // // // // // //       } catch (error) {
// // // // // // // // // //         console.error('Error parsing notebook content:', error);
// // // // // // // // // //         // Initialize with an empty cell if parsing fails
// // // // // // // // // //         setCells([
// // // // // // // // // //           {
// // // // // // // // // //             id: 1,
// // // // // // // // // //             type: 'code',
// // // // // // // // // //             content: '',
// // // // // // // // // //             query: '',
// // // // // // // // // //             result: [],
// // // // // // // // // //             columns: [],
// // // // // // // // // //             error: null,
// // // // // // // // // //             isExpanded: true,
// // // // // // // // // //             executionTime: null,
// // // // // // // // // //           },
// // // // // // // // // //         ]);
// // // // // // // // // //       }
// // // // // // // // // //     } else {
// // // // // // // // // //       setCells([
// // // // // // // // // //         {
// // // // // // // // // //           id: 1,
// // // // // // // // // //           type: 'code',
// // // // // // // // // //           content: '',
// // // // // // // // // //           query: '',
// // // // // // // // // //           result: [],
// // // // // // // // // //           columns: [],
// // // // // // // // // //           error: null,
// // // // // // // // // //           isExpanded: true,
// // // // // // // // // //           executionTime: null,
// // // // // // // // // //         },
// // // // // // // // // //       ]);
// // // // // // // // // //     }
// // // // // // // // // //   }, [notebookContent]);

// // // // // // // // // //   // Calculate editor height dynamically based on content
// // // // // // // // // //   const calculateEditorHeight = (content: string) => {
// // // // // // // // // //     const lineCount = (content.match(/\n/g) || []).length + 1;
// // // // // // // // // //     const baseHeight = 150;
// // // // // // // // // //     const lineHeight = 20;
// // // // // // // // // //     const maxHeight = 500;
// // // // // // // // // //     return `${Math.min(Math.max(baseHeight, lineCount * lineHeight), maxHeight)}px`;
// // // // // // // // // //   };

// // // // // // // // // //   // Execute SQL query for a specific cell
// // // // // // // // // //   const executeQuery = async (cellId: number) => {
// // // // // // // // // //     const cell = cells.find((c) => c.id === cellId);
// // // // // // // // // //     if (!cell || cell.type !== 'code') return;

// // // // // // // // // //     setLoading(cellId); // Set loading state for this cell

// // // // // // // // // //     const startTime = Date.now(); // Start time measurement

// // // // // // // // // //     try {
// // // // // // // // // //       const response = await fetch('http://127.0.0.1:8000/api/execute-sql/', {
// // // // // // // // // //         method: 'POST',
// // // // // // // // // //         headers: {
// // // // // // // // // //           'Content-Type': 'application/json',
// // // // // // // // // //           'Authorization': 'Token d36e47f0e5c0a356d35a7d6d407aab93f6b0d36b',
// // // // // // // // // //           // Include authentication headers if required
// // // // // // // // // //           // 'Authorization': `Token ${your_token}`,
// // // // // // // // // //         },
// // // // // // // // // //         body: JSON.stringify({ query: cell.query }),
// // // // // // // // // //       });

// // // // // // // // // //       const endTime = Date.now(); // End time measurement
// // // // // // // // // //       const timeTaken = endTime - startTime; // Time taken in milliseconds
// // // // // // // // // //       const formattedTime = formatTime(timeTaken);

// // // // // // // // // //       if (!response.ok) {
// // // // // // // // // //         const errorData = await response
// // // // // // // // // //           .json()
// // // // // // // // // //           .catch(() => ({ error: 'Unknown error occurred' }));
// // // // // // // // // //         throw new Error(errorData.error || 'Query execution failed');
// // // // // // // // // //       }

// // // // // // // // // //       const data = await response.json();

// // // // // // // // // //       setCells((prev) =>
// // // // // // // // // //         prev.map((c: Cell) =>
// // // // // // // // // //           c.id === cellId
// // // // // // // // // //             ? {
// // // // // // // // // //                 ...c,
// // // // // // // // // //                 result: data.rows,
// // // // // // // // // //                 columns: data.columns,
// // // // // // // // // //                 error: null,
// // // // // // // // // //                 executionTime: formattedTime,
// // // // // // // // // //               }
// // // // // // // // // //             : c
// // // // // // // // // //         )
// // // // // // // // // //       );
// // // // // // // // // //     } catch (err: any) {
// // // // // // // // // //       console.error(`Error executing query for cell ${cellId}:`, err);
// // // // // // // // // //       setCells((prev) =>
// // // // // // // // // //         prev.map((c: Cell) =>
// // // // // // // // // //           c.id === cellId
// // // // // // // // // //             ? {
// // // // // // // // // //                 ...c,
// // // // // // // // // //                 result: [],
// // // // // // // // // //                 columns: [],
// // // // // // // // // //                 error: err.message || 'Unknown error',
// // // // // // // // // //                 executionTime: null,
// // // // // // // // // //               }
// // // // // // // // // //             : c
// // // // // // // // // //         )
// // // // // // // // // //       );
// // // // // // // // // //     } finally {
// // // // // // // // // //       setLoading(null); // Reset loading state
// // // // // // // // // //     }
// // // // // // // // // //   };

// // // // // // // // // //   // Format time from milliseconds to a readable string
// // // // // // // // // //   const formatTime = (ms: number): string => {
// // // // // // // // // //     if (ms < 1000) {
// // // // // // // // // //       return `${ms} ms`;
// // // // // // // // // //     } else {
// // // // // // // // // //       return `${(ms / 1000).toFixed(2)} s`;
// // // // // // // // // //     }
// // // // // // // // // //   };

// // // // // // // // // //   // Toggle expand/collapse state of a cell
// // // // // // // // // //   const toggleExpand = (id: number) => {
// // // // // // // // // //     setCells((prev) =>
// // // // // // // // // //       prev.map((cell: Cell) =>
// // // // // // // // // //         cell.id === id ? { ...cell, isExpanded: !cell.isExpanded } : cell
// // // // // // // // // //       )
// // // // // // // // // //     );
// // // // // // // // // //   };

// // // // // // // // // //   // Render the SQL Notebook interface
// // // // // // // // // //   return (
// // // // // // // // // //     <div className="w-full max-w-6xl mx-auto space-y-2 p-4">
// // // // // // // // // //       {/* Header */}
// // // // // // // // // //       <div className="text-lg font-medium text-center pb-3 border-b border-teal-700">
// // // // // // // // // //         <span className="bg-gradient-to-r from-teal-600 to-emerald-500 bg-clip-text text-transparent">
// // // // // // // // // //           {activeTab === 'entity_target_notebook' &&
// // // // // // // // // //             'Entity & Target Analysis Notebook'}
// // // // // // // // // //           {activeTab === 'features_notebook' && 'Features Analysis Notebook'}
// // // // // // // // // //         </span>
// // // // // // // // // //       </div>

// // // // // // // // // //       {/* Cells */}
// // // // // // // // // //       <div className="space-y-4">
// // // // // // // // // //         {cells.map((cell: Cell) => (
// // // // // // // // // //           <div
// // // // // // // // // //             key={cell.id}
// // // // // // // // // //             className="bg-white rounded-lg border border-gray-100 shadow-sm hover:shadow-md group"
// // // // // // // // // //           >
// // // // // // // // // //             {cell.type === 'markdown' ? (
// // // // // // // // // //               <div className="p-4">
// // // // // // // // // //                 {/* Markdown Cell */}
// // // // // // // // // //                 <ReactMarkdown
// // // // // // // // // //                   className="prose prose-sm"
// // // // // // // // // //                   remarkPlugins={[remarkGfm]}
// // // // // // // // // //                 >
// // // // // // // // // //                   {cell.content}
// // // // // // // // // //                 </ReactMarkdown>
// // // // // // // // // //               </div>
// // // // // // // // // //             ) : (
// // // // // // // // // //               <div className="p-4">
// // // // // // // // // //                 {/* Code Cell */}
// // // // // // // // // //                 {/* Cell Header */}
// // // // // // // // // //                 <div className="flex items-center justify-between mb-2">
// // // // // // // // // //                   <div className="flex items-center space-x-2">
// // // // // // // // // //                     <span className="text-xs font-medium text-gray-400">
// // // // // // // // // //                       Query {cell.id}
// // // // // // // // // //                     </span>
// // // // // // // // // //                     <button
// // // // // // // // // //                       onClick={() => toggleExpand(cell.id)}
// // // // // // // // // //                       className="p-1 hover:bg-gray-100 rounded-md"
// // // // // // // // // //                     >
// // // // // // // // // //                       {cell.isExpanded ? (
// // // // // // // // // //                         <ChevronUp className="h-4 w-4 text-gray-400" />
// // // // // // // // // //                       ) : (
// // // // // // // // // //                         <ChevronDown className="h-4 w-4 text-gray-400" />
// // // // // // // // // //                       )}
// // // // // // // // // //                     </button>
// // // // // // // // // //                   </div>
// // // // // // // // // //                   <div className="flex items-center space-x-2">
// // // // // // // // // //                     <button
// // // // // // // // // //                       onClick={() => executeQuery(cell.id)}
// // // // // // // // // //                       className="flex items-center px-3 py-1.5 text-xs font-medium text-teal-700 bg-teal-50 rounded-md hover:bg-teal-100"
// // // // // // // // // //                       disabled={loading === cell.id}
// // // // // // // // // //                     >
// // // // // // // // // //                       <Play
// // // // // // // // // //                         className={`h-3 w-3 mr-1 ${
// // // // // // // // // //                           loading === cell.id ? 'animate-spin' : ''
// // // // // // // // // //                         }`}
// // // // // // // // // //                       />
// // // // // // // // // //                       Run
// // // // // // // // // //                     </button>
// // // // // // // // // //                     {/* Display Execution Time */}
// // // // // // // // // //                     {cell.executionTime && (
// // // // // // // // // //                       <span className="text-xs text-gray-500 ml-2">
// // // // // // // // // //                         ({cell.executionTime})
// // // // // // // // // //                       </span>
// // // // // // // // // //                     )}
// // // // // // // // // //                   </div>
// // // // // // // // // //                 </div>

// // // // // // // // // //                 {/* Editor */}
// // // // // // // // // //                 {cell.isExpanded && (
// // // // // // // // // //                   <>
// // // // // // // // // //                     <div className="border rounded-lg overflow-hidden bg-gray-50">
                      
// // // // // // // // // //                       <Editor
// // // // // // // // // //                         height={calculateEditorHeight(cell.query)}
// // // // // // // // // //                         defaultLanguage="sql"
// // // // // // // // // //                         value={cell.query}
// // // // // // // // // //                         onChange={(value) =>
// // // // // // // // // //                           setCells((prev) =>
// // // // // // // // // //                             prev.map((c: Cell) =>
// // // // // // // // // //                               c.id === cell.id
// // // // // // // // // //                                 ? { ...c, query: value || '' }
// // // // // // // // // //                                 : c
// // // // // // // // // //                             )
// // // // // // // // // //                           )
// // // // // // // // // //                         }
// // // // // // // // // //                         options={{
// // // // // // // // // //                           minimap: { enabled: false },
// // // // // // // // // //                           fontSize: 11.5,
// // // // // // // // // //                           lineHeight: 1.5,
// // // // // // // // // //                           padding: { top: 8, bottom: 8 },
// // // // // // // // // //                           scrollBeyondLastLine: false,
// // // // // // // // // //                         }}
// // // // // // // // // //                       />
// // // // // // // // // //                     </div>

// // // // // // // // // //                     {/* Error Message */}
// // // // // // // // // //                     {cell.error && (
// // // // // // // // // //                       <div className="mt-3 flex items-start px-4 py-3 bg-red-50 border border-red-100 rounded-lg">
// // // // // // // // // //                         <AlertCircle className="h-4 w-4 text-red-500 mt-0.5" />
// // // // // // // // // //                         <span className="text-xs text-red-600 ml-2">
// // // // // // // // // //                           {cell.error}
// // // // // // // // // //                         </span>
// // // // // // // // // //                       </div>
// // // // // // // // // //                     )}

// // // // // // // // // //                     {/* Results Table */}
// // // // // // // // // //                     {cell.result.length > 0 && (
// // // // // // // // // //                       <div className="mt-4 border rounded-lg bg-gray-50 overflow-x-auto">
// // // // // // // // // //                         <table className="w-full text-xs">
// // // // // // // // // //                           <thead>
// // // // // // // // // //                             <tr className="bg-gray-100">
// // // // // // // // // //                               {cell.columns.map((col) => (
// // // // // // // // // //                                 <th
// // // // // // // // // //                                   key={col.name}
// // // // // // // // // //                                   className="px-4 py-2 text-left font-medium text-gray-700"
// // // // // // // // // //                                 >
// // // // // // // // // //                                   <div className="flex flex-col items-start">
// // // // // // // // // //                                     <span>{col.name}</span>
// // // // // // // // // //                                   </div>
// // // // // // // // // //                                 </th>
// // // // // // // // // //                               ))}
// // // // // // // // // //                             </tr>
// // // // // // // // // //                           </thead>
// // // // // // // // // //                           <tbody>
// // // // // // // // // //                             {cell.result.map((row, idx) => (
// // // // // // // // // //                               <tr key={idx} className="hover:bg-gray-200">
// // // // // // // // // //                                 {cell.columns.map((col) => (
// // // // // // // // // //                                   <td
// // // // // // // // // //                                     key={col.name}
// // // // // // // // // //                                     className={`px-4 py-2 text-gray-800 ${
// // // // // // // // // //                                       [
// // // // // // // // // //                                         'integer',
// // // // // // // // // //                                         'int',
// // // // // // // // // //                                         'bigint',
// // // // // // // // // //                                         'double',
// // // // // // // // // //                                         'float',
// // // // // // // // // //                                       ].includes(col.type.toLowerCase())
                                        
// // // // // // // // // //                                     }`}
// // // // // // // // // //                                   >
// // // // // // // // // //                                     {row[col.name] !== null &&
// // // // // // // // // //                                     row[col.name] !== undefined
// // // // // // // // // //                                       ? row[col.name].toString()
// // // // // // // // // //                                       : 'NULL'}
// // // // // // // // // //                                   </td>
// // // // // // // // // //                                 ))}
// // // // // // // // // //                               </tr>
// // // // // // // // // //                             ))}
// // // // // // // // // //                           </tbody>
// // // // // // // // // //                         </table>
// // // // // // // // // //                       </div>
// // // // // // // // // //                     )}
// // // // // // // // // //                   </>
// // // // // // // // // //                 )}
// // // // // // // // // //               </div>
// // // // // // // // // //             )}
// // // // // // // // // //           </div>
// // // // // // // // // //         ))}
// // // // // // // // // //       </div>
// // // // // // // // // //     </div>
// // // // // // // // // //   );
// // // // // // // // // // };

// // // // // // // // // // export default SQLNotebook;




// // // // // // // // // import { useState, useEffect } from 'react';
// // // // // // // // // import Editor from '@monaco-editor/react'; // Monaco Editor for SQL editing
// // // // // // // // // import { Play, ChevronDown, ChevronUp, AlertCircle, X, Plus } from 'lucide-react'; // Icons

// // // // // // // // // interface Cell {
// // // // // // // // //   id: number; // Unique identifier
// // // // // // // // //   type: 'code' | 'markdown'; // Cell type
// // // // // // // // //   content: string; // Content for markdown cells
// // // // // // // // //   query: string; // SQL query for code cells
// // // // // // // // //   result: any[]; // Result rows
// // // // // // // // //   columns: { name: string; type: string }[]; // Column names and their data types
// // // // // // // // //   error: string | null; // Error message
// // // // // // // // //   isExpanded: boolean; // Expanded/collapsed state
// // // // // // // // //   executionTime: string | null; // Time taken to execute the query
// // // // // // // // // }

// // // // // // // // // const SQLNotebook = ({
// // // // // // // // //   activeTab,
// // // // // // // // //   notebookContent,
// // // // // // // // // }: {
// // // // // // // // //   activeTab: string;
// // // // // // // // //   notebookContent: string;
// // // // // // // // // }) => {
// // // // // // // // //   const [cells, setCells] = useState<Cell[]>([]);
// // // // // // // // //   const [loading, setLoading] = useState<number | null>(null); // Tracks loading state

// // // // // // // // //   useEffect(() => {
// // // // // // // // //     // Parse the notebook content and initialize the cells
// // // // // // // // //     if (notebookContent) {
// // // // // // // // //       try {
// // // // // // // // //         const notebook = JSON.parse(notebookContent);
// // // // // // // // //         const initialCells = notebook.cells
// // // // // // // // //           .map((cell: any, index: number) => {
// // // // // // // // //             const source = Array.isArray(cell.source)
// // // // // // // // //               ? cell.source.join('')
// // // // // // // // //               : cell.source;
// // // // // // // // //             if (cell.cell_type === 'code') {
// // // // // // // // //               // Extract initial result from outputs
// // // // // // // // //               let initialResult: any[] = [];
// // // // // // // // //               let columns: { name: string; type: string }[] = [];
// // // // // // // // //               if (cell.outputs && cell.outputs.length > 0) {
// // // // // // // // //                 const output = cell.outputs[0];
// // // // // // // // //                 if (
// // // // // // // // //                   output.output_type === 'execute_result' &&
// // // // // // // // //                   output.data &&
// // // // // // // // //                   output.data['application/json']
// // // // // // // // //                 ) {
// // // // // // // // //                   initialResult = output.data['application/json'];
// // // // // // // // //                   if (initialResult.length > 0) {
// // // // // // // // //                     columns = Object.keys(initialResult[0]).map((col) => ({
// // // // // // // // //                       name: col,
// // // // // // // // //                       type: 'string', // Adjust type as needed
// // // // // // // // //                     }));
// // // // // // // // //                   }
// // // // // // // // //                 }
// // // // // // // // //               }
// // // // // // // // //               return {
// // // // // // // // //                 id: index + 1,
// // // // // // // // //                 type: 'code',
// // // // // // // // //                 content: '', // No content for code cells
// // // // // // // // //                 query: source,
// // // // // // // // //                 result: initialResult,
// // // // // // // // //                 columns: columns,
// // // // // // // // //                 error: null,
// // // // // // // // //                 isExpanded: true,
// // // // // // // // //                 executionTime: null,
// // // // // // // // //               };
// // // // // // // // //             } else if (cell.cell_type === 'markdown') {
// // // // // // // // //               return {
// // // // // // // // //                 id: index + 1,
// // // // // // // // //                 type: 'markdown',
// // // // // // // // //                 content: source,
// // // // // // // // //                 query: '', // No query for markdown cells
// // // // // // // // //                 result: [],
// // // // // // // // //                 columns: [],
// // // // // // // // //                 error: null,
// // // // // // // // //                 isExpanded: true,
// // // // // // // // //                 executionTime: null,
// // // // // // // // //               };
// // // // // // // // //             } else {
// // // // // // // // //               return null; // Skip other cell types
// // // // // // // // //             }
// // // // // // // // //           })
// // // // // // // // //           .filter((cell: null) => cell !== null) as Cell[];
// // // // // // // // //         setCells(initialCells);
// // // // // // // // //       } catch (error) {
// // // // // // // // //         console.error('Error parsing notebook content:', error);
// // // // // // // // //         // Initialize with an empty cell if parsing fails
// // // // // // // // //         setCells([
// // // // // // // // //           {
// // // // // // // // //             id: 1,
// // // // // // // // //             type: 'code',
// // // // // // // // //             content: '',
// // // // // // // // //             query: '',
// // // // // // // // //             result: [],
// // // // // // // // //             columns: [],
// // // // // // // // //             error: null,
// // // // // // // // //             isExpanded: true,
// // // // // // // // //             executionTime: null,
// // // // // // // // //           },
// // // // // // // // //         ]);
// // // // // // // // //       }
// // // // // // // // //     } else {
// // // // // // // // //       setCells([
// // // // // // // // //         {
// // // // // // // // //           id: 1,
// // // // // // // // //           type: 'code',
// // // // // // // // //           content: '',
// // // // // // // // //           query: '',
// // // // // // // // //           result: [],
// // // // // // // // //           columns: [],
// // // // // // // // //           error: null,
// // // // // // // // //           isExpanded: true,
// // // // // // // // //           executionTime: null,
// // // // // // // // //         },
// // // // // // // // //       ]);
// // // // // // // // //     }
// // // // // // // // //   }, [notebookContent]);

// // // // // // // // //   // Calculate editor height dynamically based on content
// // // // // // // // //   const calculateEditorHeight = (content: string) => {
// // // // // // // // //     const lineCount = (content.match(/\n/g) || []).length + 1;
// // // // // // // // //     const baseHeight = 150;
// // // // // // // // //     const lineHeight = 20;
// // // // // // // // //     const maxHeight = 500;
// // // // // // // // //     return `${Math.min(Math.max(baseHeight, lineCount * lineHeight), maxHeight)}px`;
// // // // // // // // //   };

// // // // // // // // //   // Execute SQL query for a specific cell
// // // // // // // // //   const executeQuery = async (cellId: number) => {
// // // // // // // // //     const cell = cells.find((c) => c.id === cellId);
// // // // // // // // //     if (!cell || cell.type !== 'code') return;

// // // // // // // // //     setLoading(cellId); // Set loading state for this cell

// // // // // // // // //     const startTime = Date.now(); // Start time measurement

// // // // // // // // //     try {
// // // // // // // // //       const response = await fetch('http://127.0.0.1:8000/api/execute-sql/', {
// // // // // // // // //         method: 'POST',
// // // // // // // // //         headers: {
// // // // // // // // //           'Content-Type': 'application/json',
// // // // // // // // //           'Authorization': 'Token d36e47f0e5c0a356d35a7d6d407aab93f6b0d36b',

// // // // // // // // //         },
// // // // // // // // //         body: JSON.stringify({ query: cell.query }),
// // // // // // // // //       });

// // // // // // // // //       const endTime = Date.now(); // End time measurement
// // // // // // // // //       const timeTaken = endTime - startTime; // Time taken in milliseconds
// // // // // // // // //       const formattedTime = formatTime(timeTaken);

// // // // // // // // //       if (!response.ok) {
// // // // // // // // //         const errorData = await response.json().catch(() => ({ error: 'Unknown error occurred' }));
// // // // // // // // //         throw new Error(errorData.error || 'Query execution failed');
// // // // // // // // //       }

// // // // // // // // //       const data = await response.json();

// // // // // // // // //       // Validate that the number of columns matches
// // // // // // // // //       if (data.columns.length > 0 && data.rows.length > 0 && data.columns.length !== Object.keys(data.rows[0]).length) {
// // // // // // // // //         throw new Error('Mismatch between columns and data. Please check the table schema.');
// // // // // // // // //       }

// // // // // // // // //       setCells(prev =>
// // // // // // // // //         prev.map(c =>
// // // // // // // // //           c.id === cellId
// // // // // // // // //             ? { ...c, result: data.rows, columns: data.columns, error: null, executionTime: formattedTime }
// // // // // // // // //             : c
// // // // // // // // //         )
// // // // // // // // //       );
// // // // // // // // //     } catch (err: any) {
// // // // // // // // //       console.error(`Error executing query for cell ${cellId}:`, err);
// // // // // // // // //       setCells(prev =>
// // // // // // // // //         prev.map(c =>
// // // // // // // // //           c.id === cellId
// // // // // // // // //             ? { ...c, result: [], columns: [], error: err.message || 'Unknown error', executionTime: null }
// // // // // // // // //             : c
// // // // // // // // //         )
// // // // // // // // //       );
// // // // // // // // //     } finally {
// // // // // // // // //       setLoading(null); // Reset loading state
// // // // // // // // //     }
// // // // // // // // //   };

// // // // // // // // //   // Format time from milliseconds to a readable string
// // // // // // // // //   const formatTime = (ms: number): string => {
// // // // // // // // //     if (ms < 1000) {
// // // // // // // // //       return `${ms} ms`;
// // // // // // // // //     } else {
// // // // // // // // //       return `${(ms / 1000).toFixed(2)} s`;
// // // // // // // // //     }
// // // // // // // // //   };

// // // // // // // // //   function deleteCell(_id: number): void {
// // // // // // // // //     throw new Error('Function not implemented.');
// // // // // // // // //   }

// // // // // // // // //   // function toggleExpand(id: number): void {
// // // // // // // // //   //   throw new Error('Function not implemented.');
// // // // // // // // //   // }
// // // // // // // // //   const toggleExpand = (id: number) => {
// // // // // // // // //     setCells(prev =>
// // // // // // // // //       prev.map(cell =>
// // // // // // // // //         cell.id === id ? { ...cell, isExpanded: !cell.isExpanded } : cell
// // // // // // // // //       )
// // // // // // // // //     );
// // // // // // // // //   };

// // // // // // // // //   // function addCell(event: MouseEvent<HTMLButtonElement, MouseEvent>): void {
// // // // // // // // //   //   throw new Error('Function not implemented.');
// // // // // // // // //   // }
// // // // // // // // //   const addCell = () => {
// // // // // // // // //     setCells(prev => [
// // // // // // // // //       ...prev,
// // // // // // // // //       { id: prev.length + 1, type: 'code', content: '', query: '', result: [], columns: [], error: null, isExpanded: true, executionTime: null },
// // // // // // // // //     ]);
// // // // // // // // //   };

// // // // // // // // //   // Render the SQL Notebook interface
// // // // // // // // //   return (
// // // // // // // // //     <div className="w-full space-y-4 p-6">
// // // // // // // // //       {/* Header */}
// // // // // // // // //       <div className="text-lg font-medium text-center pb-3 border-b border-teal-700">
// // // // // // // // //         <span className="bg-gradient-to-r from-teal-600 to-emerald-500 bg-clip-text text-transparent">
// // // // // // // // //           {activeTab === 'entity_target_notebook' && 'Entity & Target Analysis Notebook'}
// // // // // // // // //           {activeTab === 'features_notebook' && 'Features Analysis Notebook'}
// // // // // // // // //         </span>
// // // // // // // // //       </div>

// // // // // // // // //       {/* Cells */}
// // // // // // // // //       <div className="space-y-4">
// // // // // // // // //         {cells.map(cell => (
// // // // // // // // //           <div
// // // // // // // // //             key={cell.id}
// // // // // // // // //             className="bg-white rounded-lg border border-gray-100 shadow-sm hover:shadow-md group"
// // // // // // // // //           >
// // // // // // // // //             <div className="p-4">
// // // // // // // // //               {/* Cell Header */}
// // // // // // // // //               <div className="flex items-center justify-between mb-2">
// // // // // // // // //                 <div className="flex items-center space-x-2">
// // // // // // // // //                   <span className="text-xs font-medium text-gray-400">Query {cell.id}</span>
// // // // // // // // //                   <button
// // // // // // // // //                     onClick={() => toggleExpand(cell.id)}
// // // // // // // // //                     className="p-1 hover:bg-gray-100 rounded-md"
// // // // // // // // //                   >
// // // // // // // // //                     {cell.isExpanded ? (
// // // // // // // // //                       <ChevronUp className="h-4 w-4 text-gray-400" />
// // // // // // // // //                     ) : (
// // // // // // // // //                       <ChevronDown className="h-4 w-4 text-gray-400" />
// // // // // // // // //                     )}
// // // // // // // // //                   </button>
// // // // // // // // //                 </div>
// // // // // // // // //                 <div className="flex items-center space-x-2">
// // // // // // // // //                   <button
// // // // // // // // //                     onClick={() => executeQuery(cell.id)}
// // // // // // // // //                     className="flex items-center px-3 py-1.5 text-xs font-medium text-teal-700 bg-teal-50 rounded-md hover:bg-teal-100"
// // // // // // // // //                     disabled={loading === cell.id}
// // // // // // // // //                   >
// // // // // // // // //                     <Play className={`h-3 w-3 mr-1 ${loading === cell.id ? 'animate-spin' : ''}`} />
// // // // // // // // //                     Run
// // // // // // // // //                   </button>
// // // // // // // // //                   {/* Display Execution Time */}
// // // // // // // // //                   {cell.executionTime && (
// // // // // // // // //                     <span className="text-xs text-gray-500 ml-2">
// // // // // // // // //                       ({cell.executionTime})
// // // // // // // // //                     </span>
// // // // // // // // //                   )}
// // // // // // // // //                   <button
// // // // // // // // //                     onClick={() => deleteCell(cell.id)}
// // // // // // // // //                     className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-md"
// // // // // // // // //                   >
// // // // // // // // //                     <X className="h-4 w-4" />
// // // // // // // // //                   </button>
// // // // // // // // //                 </div>
// // // // // // // // //               </div>

// // // // // // // // //               {/* Editor */}
// // // // // // // // //               {cell.isExpanded && (
// // // // // // // // //                 <>
// // // // // // // // //                   <div className="border rounded-lg overflow-hidden bg-gray-50">
// // // // // // // // //                     <Editor
// // // // // // // // //                       height={calculateEditorHeight(cell.query)}
// // // // // // // // //                       defaultLanguage="sql"
// // // // // // // // //                       value={cell.query}
// // // // // // // // //                       onChange={value =>
// // // // // // // // //                         setCells(prev =>
// // // // // // // // //                           prev.map(c =>
// // // // // // // // //                             c.id === cell.id ? { ...c, query: value || '' } : c
// // // // // // // // //                           )
// // // // // // // // //                         )
// // // // // // // // //                       }
// // // // // // // // //                       options={{
// // // // // // // // //                         minimap: { enabled: false },
// // // // // // // // //                         fontSize: 13,
// // // // // // // // //                         lineHeight: 1.5,
// // // // // // // // //                         padding: { top: 8, bottom: 8 },
// // // // // // // // //                         scrollBeyondLastLine: false,
// // // // // // // // //                       }}
// // // // // // // // //                     />
// // // // // // // // //                   </div>

// // // // // // // // //                   {/* Error Message */}
// // // // // // // // //                   {cell.error && (
// // // // // // // // //                     <div className="mt-3 flex items-start px-4 py-3 bg-red-50 border border-red-100 rounded-lg">
// // // // // // // // //                       <AlertCircle className="h-4 w-4 text-red-500 mt-0.5" />
// // // // // // // // //                       <span className="text-xs text-red-600 ml-2">{cell.error}</span>
// // // // // // // // //                     </div>
// // // // // // // // //                   )}

// // // // // // // // //                   {/* Results Table */}
// // // // // // // // //                   {cell.result.length > 0 && (
// // // // // // // // //                     <div className="mt-4 border rounded-lg bg-gray-50 overflow-x-auto">
// // // // // // // // //                       <table className="w-full text-xs">
// // // // // // // // //                         <thead>
// // // // // // // // //                           <tr className="bg-gray-100">
// // // // // // // // //                             {cell.columns.map(col => (
// // // // // // // // //                               <th key={col.name} className="px-4 py-2 text-left font-medium text-gray-700">
// // // // // // // // //                                 <div className="flex flex-col items-start">
// // // // // // // // //                                   <span>{col.name}</span>
// // // // // // // // //                                   {/* Display data type below the column name */}
// // // // // // // // //                                   <span style={{ fontSize: '10px', color: '#9CA3AF', fontWeight: '400', letterSpacing: '0.09em' }}>{col.type}</span>
// // // // // // // // //                                 </div>
// // // // // // // // //                               </th>
// // // // // // // // //                             ))}
// // // // // // // // //                           </tr>
// // // // // // // // //                         </thead>
// // // // // // // // //                         <tbody>
// // // // // // // // //                           {cell.result.map((row, idx) => (
// // // // // // // // //                             <tr key={idx} className="hover:bg-gray-200">
// // // // // // // // //                               {cell.columns.map(col => (
// // // // // // // // //                                 <td
// // // // // // // // //                                   key={col.name}
// // // // // // // // //                                   className={`px-4 py-2 text-gray-800 ${
// // // // // // // // //                                     ['integer', 'int', 'bigint', 'double', 'float'].includes(col.type.toLowerCase())
// // // // // // // // //                                       ? 'text-right'
// // // // // // // // //                                       : 'text-left'
// // // // // // // // //                                   }`}
// // // // // // // // //                                 >
// // // // // // // // //                                   {row[col.name] !== null && row[col.name] !== undefined ? row[col.name].toString() : 'NULL'}
// // // // // // // // //                                 </td>
// // // // // // // // //                               ))}
// // // // // // // // //                             </tr>
// // // // // // // // //                           ))}
// // // // // // // // //                         </tbody>
// // // // // // // // //                       </table>
// // // // // // // // //                     </div>
// // // // // // // // //                   )}
// // // // // // // // //                 </>
// // // // // // // // //               )}
// // // // // // // // //             </div>
// // // // // // // // //           </div>
// // // // // // // // //         ))}
// // // // // // // // //       </div>

// // // // // // // // //       {/* Add Cell Button */}
// // // // // // // // //       <button
// // // // // // // // //         onClick={addCell}
// // // // // // // // //         className="flex items-center px-4 py-2 text-xs font-medium text-teal-700 bg-teal-50 rounded-md hover:bg-teal-100"
// // // // // // // // //       >
// // // // // // // // //         <Plus className="h-4 w-4 mr-1" />
// // // // // // // // //         Add Cell
// // // // // // // // //       </button>
// // // // // // // // //     </div>
// // // // // // // // //   );
// // // // // // // // // };

// // // // // // // // // export default SQLNotebook;




// // // // // // // // // SQLNotebook.tsx

// // // // // // // // import React, { useState, useEffect } from 'react';
// // // // // // // // import Editor from '@monaco-editor/react'; // Monaco Editor for SQL editing
// // // // // // // // import { Play, ChevronDown, ChevronUp, AlertCircle, X, Plus } from 'lucide-react'; // Icons

// // // // // // // // interface Cell {
// // // // // // // //   id: number; // Unique identifier
// // // // // // // //   type: 'code' | 'markdown'; // Cell type
// // // // // // // //   content: string; // Content for markdown cells
// // // // // // // //   query: string; // SQL query for code cells
// // // // // // // //   result: any[]; // Result rows
// // // // // // // //   columns: { name: string; type: string }[]; // Column names and their data types
// // // // // // // //   error: string | null; // Error message
// // // // // // // //   isExpanded: boolean; // Expanded/collapsed state
// // // // // // // //   executionTime: string | null; // Time taken to execute the query
// // // // // // // // }

// // // // // // // // const SQLNotebook = ({
// // // // // // // //   activeTab,
// // // // // // // //   notebookContent,
// // // // // // // // }: {
// // // // // // // //   activeTab: string;
// // // // // // // //   notebookContent: string;
// // // // // // // // }) => {
// // // // // // // //   const [cells, setCells] = useState<Cell[]>([]);
// // // // // // // //   const [loading, setLoading] = useState<number | null>(null); // Tracks loading state

// // // // // // // //   useEffect(() => {
// // // // // // // //     // Parse the notebook content and initialize the cells
// // // // // // // //     if (notebookContent) {
// // // // // // // //       try {
// // // // // // // //         const notebook = JSON.parse(notebookContent);
// // // // // // // //         const initialCells = notebook.cells
// // // // // // // //           .map((cell: any, index: number) => {
// // // // // // // //             const source = Array.isArray(cell.source)
// // // // // // // //               ? cell.source.join('')
// // // // // // // //               : cell.source;
// // // // // // // //             if (cell.cell_type === 'code') {
// // // // // // // //               // Extract initial result from outputs
// // // // // // // //               let initialResult: any[] = [];
// // // // // // // //               let columns: { name: string; type: string }[] = [];
// // // // // // // //               if (cell.outputs && cell.outputs.length > 0) {
// // // // // // // //                 const output = cell.outputs[0];
// // // // // // // //                 if (
// // // // // // // //                   output.output_type === 'execute_result' &&
// // // // // // // //                   output.data &&
// // // // // // // //                   output.data['application/json']
// // // // // // // //                 ) {
// // // // // // // //                   initialResult = output.data['application/json'];
// // // // // // // //                   if (initialResult.length > 0) {
// // // // // // // //                     columns = Object.keys(initialResult[0]).map((col) => ({
// // // // // // // //                       name: col,
// // // // // // // //                       type: 'string', // Adjust type as needed
// // // // // // // //                     }));
// // // // // // // //                   }
// // // // // // // //                 }
// // // // // // // //               }
// // // // // // // //               return {
// // // // // // // //                 id: index + 1,
// // // // // // // //                 type: 'code',
// // // // // // // //                 content: '', // No content for code cells
// // // // // // // //                 query: source,
// // // // // // // //                 result: initialResult,
// // // // // // // //                 columns: columns,
// // // // // // // //                 error: null,
// // // // // // // //                 isExpanded: true,
// // // // // // // //                 executionTime: null,
// // // // // // // //               };
// // // // // // // //             } else if (cell.cell_type === 'markdown') {
// // // // // // // //               return {
// // // // // // // //                 id: index + 1,
// // // // // // // //                 type: 'markdown',
// // // // // // // //                 content: source,
// // // // // // // //                 query: '', // No query for markdown cells
// // // // // // // //                 result: [],
// // // // // // // //                 columns: [],
// // // // // // // //                 error: null,
// // // // // // // //                 isExpanded: true,
// // // // // // // //                 executionTime: null,
// // // // // // // //               };
// // // // // // // //             } else {
// // // // // // // //               return null; // Skip other cell types
// // // // // // // //             }
// // // // // // // //           })
// // // // // // // //           .filter((cell: null | Cell) => cell !== null) as Cell[];
// // // // // // // //         setCells(initialCells);
// // // // // // // //       } catch (error) {
// // // // // // // //         console.error('Error parsing notebook content:', error);
// // // // // // // //         // Initialize with an empty cell if parsing fails
// // // // // // // //         setCells([
// // // // // // // //           {
// // // // // // // //             id: 1,
// // // // // // // //             type: 'code',
// // // // // // // //             content: '',
// // // // // // // //             query: '',
// // // // // // // //             result: [],
// // // // // // // //             columns: [],
// // // // // // // //             error: 'Failed to parse notebook content.',
// // // // // // // //             isExpanded: true,
// // // // // // // //             executionTime: null,
// // // // // // // //           },
// // // // // // // //         ]);
// // // // // // // //       }
// // // // // // // //     } else {
// // // // // // // //       setCells([
// // // // // // // //         {
// // // // // // // //           id: 1,
// // // // // // // //           type: 'code',
// // // // // // // //           content: '',
// // // // // // // //           query: '',
// // // // // // // //           result: [],
// // // // // // // //           columns: [],
// // // // // // // //           error: null,
// // // // // // // //           isExpanded: true,
// // // // // // // //           executionTime: null,
// // // // // // // //         },
// // // // // // // //       ]);
// // // // // // // //     }
// // // // // // // //   }, [notebookContent]);

// // // // // // // //   // Calculate editor height dynamically based on content
// // // // // // // //   const calculateEditorHeight = (content: string) => {
// // // // // // // //     const lineCount = (content.match(/\n/g) || []).length + 1;
// // // // // // // //     const baseHeight = 150;
// // // // // // // //     const lineHeight = 20;
// // // // // // // //     const maxHeight = 500;
// // // // // // // //     return `${Math.min(Math.max(baseHeight, lineCount * lineHeight), maxHeight)}px`;
// // // // // // // //   };

// // // // // // // //   // Execute SQL query for a specific cell
// // // // // // // //   const executeQuery = async (cellId: number) => {
// // // // // // // //     const cell = cells.find((c) => c.id === cellId);
// // // // // // // //     if (!cell || cell.type !== 'code') return;

// // // // // // // //     setLoading(cellId); // Set loading state for this cell

// // // // // // // //     const startTime = Date.now(); // Start time measurement

// // // // // // // //     try {
// // // // // // // //       const response = await fetch('http://127.0.0.1:8000/api/execute-sql/', {
// // // // // // // //         method: 'POST',
// // // // // // // //         headers: {
// // // // // // // //           'Content-Type': 'application/json',
// // // // // // // //           // Include authorization token if required
// // // // // // // //           // 'Authorization': 'Token YOUR_TOKEN_HERE',
// // // // // // // //           'Authorization': 'Token d36e47f0e5c0a356d35a7d6d407aab93f6b0d36b',
// // // // // // // //         },
// // // // // // // //         body: JSON.stringify({ query: cell.query }),
// // // // // // // //       });

// // // // // // // //       const endTime = Date.now(); // End time measurement
// // // // // // // //       const timeTaken = endTime - startTime; // Time taken in milliseconds
// // // // // // // //       const formattedTime = formatTime(timeTaken);

// // // // // // // //       if (!response.ok) {
// // // // // // // //         const errorData = await response.json().catch(() => ({ error: 'Unknown error occurred' }));
// // // // // // // //         throw new Error(errorData.error || 'Query execution failed');
// // // // // // // //       }

// // // // // // // //       const data = await response.json();

// // // // // // // //       // Validate that the number of columns matches
// // // // // // // //       if (data.columns.length > 0 && data.rows.length > 0 && data.columns.length !== Object.keys(data.rows[0]).length) {
// // // // // // // //         throw new Error('Mismatch between columns and data. Please check the table schema.');
// // // // // // // //       }

// // // // // // // //       setCells(prev =>
// // // // // // // //         prev.map(c =>
// // // // // // // //           c.id === cellId
// // // // // // // //             ? { ...c, result: data.rows, columns: data.columns, error: null, executionTime: formattedTime }
// // // // // // // //             : c
// // // // // // // //         )
// // // // // // // //       );
// // // // // // // //     } catch (err: any) {
// // // // // // // //       console.error(`Error executing query for cell ${cellId}:`, err);
// // // // // // // //       setCells(prev =>
// // // // // // // //         prev.map(c =>
// // // // // // // //           c.id === cellId
// // // // // // // //             ? { ...c, result: [], columns: [], error: err.message || 'Unknown error', executionTime: null }
// // // // // // // //             : c
// // // // // // // //         )
// // // // // // // //       );
// // // // // // // //     } finally {
// // // // // // // //       setLoading(null); // Reset loading state
// // // // // // // //     }
// // // // // // // //   };

// // // // // // // //   // Format time from milliseconds to a readable string
// // // // // // // //   const formatTime = (ms: number): string => {
// // // // // // // //     if (ms < 1000) {
// // // // // // // //       return `${ms} ms`;
// // // // // // // //     } else {
// // // // // // // //       return `${(ms / 1000).toFixed(2)} s`;
// // // // // // // //     }
// // // // // // // //   };

// // // // // // // //   // Delete a cell
// // // // // // // //   const deleteCell = (id: number) => {
// // // // // // // //     setCells(prev => prev.filter(cell => cell.id !== id));
// // // // // // // //   };

// // // // // // // //   // Toggle expand/collapse of a cell
// // // // // // // //   const toggleExpand = (id: number) => {
// // // // // // // //     setCells(prev =>
// // // // // // // //       prev.map(cell =>
// // // // // // // //         cell.id === id ? { ...cell, isExpanded: !cell.isExpanded } : cell
// // // // // // // //       )
// // // // // // // //     );
// // // // // // // //   };

// // // // // // // //   // Add a new cell
// // // // // // // //   const addCell = () => {
// // // // // // // //     setCells(prev => [
// // // // // // // //       ...prev,
// // // // // // // //       { id: prev.length + 1, type: 'code', content: '', query: '', result: [], columns: [], error: null, isExpanded: true, executionTime: null },
// // // // // // // //     ]);
// // // // // // // //   };

// // // // // // // //   // Render the SQL Notebook interface
// // // // // // // //   return (
// // // // // // // //     <div className="w-full space-y-4 p-6">
// // // // // // // //       {/* Header */}
// // // // // // // //       <div className="text-lg font-medium text-center pb-3 border-b border-teal-700">
// // // // // // // //         <span className="bg-gradient-to-r from-teal-600 to-emerald-500 bg-clip-text text-transparent">
// // // // // // // //           {activeTab === 'entity_target_notebook' && 'Entity & Target Analysis Notebook'}
// // // // // // // //           {activeTab === 'features_notebook' && 'Features Analysis Notebook'}
// // // // // // // //         </span>
// // // // // // // //       </div>

// // // // // // // //       {/* Cells */}
// // // // // // // //       <div className="space-y-4">
// // // // // // // //         {cells.map(cell => (
// // // // // // // //           <div
// // // // // // // //             key={cell.id}
// // // // // // // //             className="bg-white rounded-lg border border-gray-100 shadow-sm hover:shadow-md group"
// // // // // // // //           >
// // // // // // // //             <div className="p-4">
// // // // // // // //               {/* Cell Header */}
// // // // // // // //               <div className="flex items-center justify-between mb-2">
// // // // // // // //                 <div className="flex items-center space-x-2">
// // // // // // // //                   <span className="text-xs font-medium text-gray-400">
// // // // // // // //                     {cell.type === 'code' ? `Code Cell ${cell.id}` : `Markdown Cell ${cell.id}`}
// // // // // // // //                   </span>
// // // // // // // //                   <button
// // // // // // // //                     onClick={() => toggleExpand(cell.id)}
// // // // // // // //                     className="p-1 hover:bg-gray-100 rounded-md"
// // // // // // // //                   >
// // // // // // // //                     {cell.isExpanded ? (
// // // // // // // //                       <ChevronUp className="h-4 w-4 text-gray-400" />
// // // // // // // //                     ) : (
// // // // // // // //                       <ChevronDown className="h-4 w-4 text-gray-400" />
// // // // // // // //                     )}
// // // // // // // //                   </button>
// // // // // // // //                 </div>
// // // // // // // //                 <div className="flex items-center space-x-2">
// // // // // // // //                   {cell.type === 'code' && (
// // // // // // // //                     <button
// // // // // // // //                       onClick={() => executeQuery(cell.id)}
// // // // // // // //                       className="flex items-center px-3 py-1.5 text-xs font-medium text-teal-700 bg-teal-50 rounded-md hover:bg-teal-100"
// // // // // // // //                       disabled={loading === cell.id}
// // // // // // // //                     >
// // // // // // // //                       <Play className={`h-3 w-3 mr-1 ${loading === cell.id ? 'animate-spin' : ''}`} />
// // // // // // // //                       Run
// // // // // // // //                     </button>
// // // // // // // //                   )}
// // // // // // // //                   {/* Display Execution Time */}
// // // // // // // //                   {cell.executionTime && (
// // // // // // // //                     <span className="text-xs text-gray-500 ml-2">
// // // // // // // //                       ({cell.executionTime})
// // // // // // // //                     </span>
// // // // // // // //                   )}
// // // // // // // //                   <button
// // // // // // // //                     onClick={() => deleteCell(cell.id)}
// // // // // // // //                     className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-md"
// // // // // // // //                   >
// // // // // // // //                     <X className="h-4 w-4" />
// // // // // // // //                   </button>
// // // // // // // //                 </div>
// // // // // // // //               </div>

// // // // // // // //               {/* Editor or Content */}
// // // // // // // //               {cell.isExpanded && (
// // // // // // // //                 <>
// // // // // // // //                   {cell.type === 'code' ? (
// // // // // // // //                     <>
// // // // // // // //                       <div className="border rounded-lg overflow-hidden bg-gray-50">
// // // // // // // //                         <Editor
// // // // // // // //                           height={calculateEditorHeight(cell.query)}
// // // // // // // //                           defaultLanguage="sql"
// // // // // // // //                           value={cell.query}
// // // // // // // //                           onChange={value =>
// // // // // // // //                             setCells(prev =>
// // // // // // // //                               prev.map(c =>
// // // // // // // //                                 c.id === cell.id ? { ...c, query: value || '' } : c
// // // // // // // //                               )
// // // // // // // //                             )
// // // // // // // //                           }
// // // // // // // //                           options={{
// // // // // // // //                             minimap: { enabled: false },
// // // // // // // //                             fontSize: 13,
// // // // // // // //                             lineHeight: 1.5,
// // // // // // // //                             padding: { top: 8, bottom: 8 },
// // // // // // // //                             scrollBeyondLastLine: false,
// // // // // // // //                           }}
// // // // // // // //                         />
// // // // // // // //                       </div>

// // // // // // // //                       {/* Error Message */}
// // // // // // // //                       {cell.error && (
// // // // // // // //                         <div className="mt-3 flex items-start px-4 py-3 bg-red-50 border border-red-100 rounded-lg">
// // // // // // // //                           <AlertCircle className="h-4 w-4 text-red-500 mt-0.5" />
// // // // // // // //                           <span className="text-xs text-red-600 ml-2">{cell.error}</span>
// // // // // // // //                         </div>
// // // // // // // //                       )}

// // // // // // // //                       {/* Results Table */}
// // // // // // // //                       {cell.result.length > 0 && (
// // // // // // // //                         <div className="mt-4 border rounded-lg bg-gray-50 overflow-x-auto">
// // // // // // // //                           <table className="w-full text-xs">
// // // // // // // //                             <thead>
// // // // // // // //                               <tr className="bg-gray-100">
// // // // // // // //                                 {cell.columns.map(col => (
// // // // // // // //                                   <th key={col.name} className="px-4 py-2 text-left font-medium text-gray-700">
// // // // // // // //                                     <div className="flex flex-col items-start">
// // // // // // // //                                       <span>{col.name}</span>
// // // // // // // //                                       {/* Display data type below the column name */}
// // // // // // // //                                       <span style={{ fontSize: '10px', color: '#9CA3AF', fontWeight: '400', letterSpacing: '0.09em' }}>{col.type}</span>
// // // // // // // //                                     </div>
// // // // // // // //                                   </th>
// // // // // // // //                                 ))}
// // // // // // // //                               </tr>
// // // // // // // //                             </thead>
// // // // // // // //                             <tbody>
// // // // // // // //                               {cell.result.map((row, idx) => (
// // // // // // // //                                 <tr key={idx} className="hover:bg-gray-200">
// // // // // // // //                                   {cell.columns.map(col => (
// // // // // // // //                                     <td
// // // // // // // //                                       key={col.name}
// // // // // // // //                                       className={`px-4 py-2 text-gray-800 ${
// // // // // // // //                                         ['integer', 'int', 'bigint', 'double', 'float'].includes(col.type.toLowerCase())
                                        
// // // // // // // //                                       }`}
// // // // // // // //                                     >
// // // // // // // //                                       {row[col.name] !== null && row[col.name] !== undefined ? row[col.name].toString() : 'NULL'}
// // // // // // // //                                     </td>
// // // // // // // //                                   ))}
// // // // // // // //                                 </tr>
// // // // // // // //                               ))}
// // // // // // // //                             </tbody>
// // // // // // // //                           </table>
// // // // // // // //                         </div>
// // // // // // // //                       )}
// // // // // // // //                     </>
// // // // // // // //                   ) : (
// // // // // // // //                     // Markdown content
// // // // // // // //                     <div className="prose">
// // // // // // // //                       <div dangerouslySetInnerHTML={{ __html: cell.content }} />
// // // // // // // //                     </div>
// // // // // // // //                   )}
// // // // // // // //                 </>
// // // // // // // //               )}
// // // // // // // //             </div>
// // // // // // // //           </div>
// // // // // // // //         ))}
// // // // // // // //       </div>

// // // // // // // //       {/* Add Cell Button */}
// // // // // // // //       <button
// // // // // // // //         onClick={addCell}
// // // // // // // //         className="flex items-center px-4 py-2 text-xs font-medium text-teal-700 bg-teal-50 rounded-md hover:bg-teal-100"
// // // // // // // //       >
// // // // // // // //         <Plus className="h-4 w-4 mr-1" />
// // // // // // // //         Add Cell
// // // // // // // //       </button>
// // // // // // // //     </div>
// // // // // // // //   );
// // // // // // // // };

// // // // // // // // export default SQLNotebook;




// // // // // // // Original code starts here, pre-implementation of the new code




// // // // // // import { useState, useEffect } from 'react';
// // // // // // import Editor from '@monaco-editor/react'; 
// // // // // // import { Play, ChevronDown, ChevronUp, AlertCircle, X, Plus } from 'lucide-react';

// // // // // // interface Column {
// // // // // //   name: string;
// // // // // //   type: string;
// // // // // // }

// // // // // // interface Cell {
// // // // // //   id: number;
// // // // // //   type: 'code' | 'markdown';
// // // // // //   content: string;
// // // // // //   query: string;
// // // // // //   result: any[];
// // // // // //   columns: Column[];
// // // // // //   error: string | null;
// // // // // //   isExpanded: boolean;
// // // // // //   executionTime: string | null;
// // // // // // }

// // // // // // const SQLNotebook = ({
// // // // // //   activeTab,
// // // // // //   notebookContent,
// // // // // // }: {
// // // // // //   activeTab: string;
// // // // // //   notebookContent: string;
// // // // // // }) => {
// // // // // //   const [cells, setCells] = useState<Cell[]>([]);
// // // // // //   const [loading, setLoading] = useState<number | null>(null);

// // // // // //   useEffect(() => {
// // // // // //     if (notebookContent) {
// // // // // //       try {
// // // // // //         const notebook = JSON.parse(notebookContent);
// // // // // //         const initialCells = notebook.cells
// // // // // //           .map((cell: any, index: number) => {
// // // // // //             const source = Array.isArray(cell.source)
// // // // // //               ? cell.source.join('')
// // // // // //               : cell.source;
// // // // // //             if (cell.cell_type === 'code') {
// // // // // //               let initialResult: any[] = [];
// // // // // //               let columns: Column[] = [];
// // // // // //               let error: string | null = null;

// // // // // //               if (cell.outputs && cell.outputs.length > 0) {
// // // // // //                 const output = cell.outputs[0];
// // // // // //                 if (
// // // // // //                   output.output_type === 'execute_result' &&
// // // // // //                   output.data &&
// // // // // //                   output.data['application/json']
// // // // // //                 ) {
// // // // // //                   const jsonData = output.data['application/json'];
// // // // // //                   if (jsonData && Array.isArray(jsonData.rows) && Array.isArray(jsonData.columns)) {
// // // // // //                     initialResult = jsonData.rows;
// // // // // //                     columns = jsonData.columns;
// // // // // //                   }
// // // // // //                 }
// // // // // //               }

// // // // // //               return {
// // // // // //                 id: index + 1,
// // // // // //                 type: 'code',
// // // // // //                 content: '',
// // // // // //                 query: source || '',
// // // // // //                 result: initialResult,
// // // // // //                 columns: columns,
// // // // // //                 error: error,
// // // // // //                 isExpanded: true,
// // // // // //                 executionTime: null,
// // // // // //               };
// // // // // //             } else if (cell.cell_type === 'markdown') {
// // // // // //               return {
// // // // // //                 id: index + 1,
// // // // // //                 type: 'markdown',
// // // // // //                 content: source,
// // // // // //                 query: '',
// // // // // //                 result: [],
// // // // // //                 columns: [],
// // // // // //                 error: null,
// // // // // //                 isExpanded: true,
// // // // // //                 executionTime: null,
// // // // // //               };
// // // // // //             } else {
// // // // // //               return null;
// // // // // //             }
// // // // // //           })
// // // // // //           .filter((c: null | Cell) => c !== null) as Cell[];
// // // // // //         setCells(initialCells);
// // // // // //       } catch (error) {
// // // // // //         console.error('Error parsing notebook content:', error);
// // // // // //         setCells([
// // // // // //           {
// // // // // //             id: 1,
// // // // // //             type: 'code',
// // // // // //             content: '',
// // // // // //             query: '',
// // // // // //             result: [],
// // // // // //             columns: [],
// // // // // //             error: 'Failed to parse notebook content.',
// // // // // //             isExpanded: true,
// // // // // //             executionTime: null,
// // // // // //           },
// // // // // //         ]);
// // // // // //       }
// // // // // //     } else {
// // // // // //       setCells([
// // // // // //         {
// // // // // //           id: 1,
// // // // // //           type: 'code',
// // // // // //           content: '',
// // // // // //           query: '',
// // // // // //           result: [],
// // // // // //           columns: [],
// // // // // //           error: null,
// // // // // //           isExpanded: true,
// // // // // //           executionTime: null,
// // // // // //         },
// // // // // //       ]);
// // // // // //     }
// // // // // //   }, [notebookContent]);

// // // // // //   const calculateEditorHeight = (content: string) => {
// // // // // //     const lineCount = (content.match(/\n/g) || []).length + 1;
// // // // // //     const baseHeight = 150;
// // // // // //     const lineHeight = 20;
// // // // // //     const maxHeight = 500;
// // // // // //     return `${Math.min(Math.max(baseHeight, lineCount * lineHeight), maxHeight)}px`;
// // // // // //   };

// // // // // //   const executeQuery = async (cellId: number) => {
// // // // // //     const cell = cells.find((c) => c.id === cellId);
// // // // // //     if (!cell || cell.type !== 'code') return;

// // // // // //     setLoading(cellId);
// // // // // //     const startTime = Date.now();

// // // // // //     try {
// // // // // //       const response = await fetch('http://127.0.0.1:8000/api/execute-sql/', {
// // // // // //         method: 'POST',
// // // // // //         headers: {
// // // // // //           'Content-Type': 'application/json',
// // // // // //           'Authorization': 'Token d36e47f0e5c0a356d35a7d6d407aab93f6b0d36b'
// // // // // //         },
// // // // // //         body: JSON.stringify({ query: cell.query }),
// // // // // //       });

// // // // // //       const endTime = Date.now();
// // // // // //       const timeTaken = endTime - startTime;
// // // // // //       const formattedTime = formatTime(timeTaken);

// // // // // //       if (!response.ok) {
// // // // // //         const errorData = await response.json().catch(() => ({ error: 'Unknown error occurred' }));
// // // // // //         throw new Error(errorData.error || 'Query execution failed');
// // // // // //       }

// // // // // //       const data = await response.json();
// // // // // //       if (data.columns.length > 0 && data.rows.length > 0 && data.columns.length !== Object.keys(data.rows[0]).length) {
// // // // // //         throw new Error('Mismatch between columns and data.');
// // // // // //       }

// // // // // //       setCells(prev =>
// // // // // //         prev.map(c =>
// // // // // //           c.id === cellId
// // // // // //             ? { ...c, result: data.rows, columns: data.columns, error: null, executionTime: formattedTime }
// // // // // //             : c
// // // // // //         )
// // // // // //       );
// // // // // //     } catch (err: any) {
// // // // // //       console.error(`Error executing query for cell ${cellId}:`, err);
// // // // // //       setCells(prev =>
// // // // // //         prev.map(c =>
// // // // // //           c.id === cellId
// // // // // //             ? { ...c, result: [], columns: [], error: err.message || 'Unknown error', executionTime: null }
// // // // // //             : c
// // // // // //         )
// // // // // //       );
// // // // // //     } finally {
// // // // // //       setLoading(null);
// // // // // //     }
// // // // // //   };

// // // // // //   const formatTime = (ms: number): string => {
// // // // // //     if (ms < 1000) {
// // // // // //       return `${ms} ms`;
// // // // // //     } else {
// // // // // //       return `${(ms / 1000).toFixed(2)} s`;
// // // // // //     }
// // // // // //   };

// // // // // //   const deleteCell = (id: number) => {
// // // // // //     setCells(prev => prev.filter(cell => cell.id !== id));
// // // // // //   };

// // // // // //   const toggleExpand = (id: number) => {
// // // // // //     setCells(prev =>
// // // // // //       prev.map(cell =>
// // // // // //         cell.id === id ? { ...cell, isExpanded: !cell.isExpanded } : cell
// // // // // //       )
// // // // // //     );
// // // // // //   };

// // // // // //   const addCell = () => {
// // // // // //     setCells(prev => [
// // // // // //       ...prev,
// // // // // //       { id: prev.length + 1, type: 'code', content: '', query: '', result: [], columns: [], error: null, isExpanded: true, executionTime: null },
// // // // // //     ]);
// // // // // //   };

// // // // // //   return (
// // // // // //     <div className="w-full space-y-4 p-6">
// // // // // //       <div className="text-lg font-medium text-center pb-3 border-b border-teal-700">
// // // // // //         <span className="bg-gradient-to-r from-teal-600 to-emerald-500 bg-clip-text text-transparent">
// // // // // //           {activeTab === 'entity_target_notebook' && 'Entity & Target Analysis Notebook'}
// // // // // //           {activeTab === 'features_notebook' && 'Features Analysis Notebook'}
// // // // // //         </span>
// // // // // //       </div>

// // // // // //       <div className="space-y-4">
// // // // // //         {cells.map(cell => (
// // // // // //           <div
// // // // // //             key={cell.id}
// // // // // //             className="bg-white rounded-lg border border-gray-100 shadow-sm hover:shadow-md group"
// // // // // //           >
// // // // // //             <div className="p-4">
// // // // // //               <div className="flex items-center justify-between mb-2">
// // // // // //                 <div className="flex items-center space-x-2">
// // // // // //                   <span className="text-xs font-medium text-gray-400">
// // // // // //                     {cell.type === 'code' ? `Code Cell ${cell.id}` : `Markdown Cell ${cell.id}`}
// // // // // //                   </span>
// // // // // //                   <button
// // // // // //                     onClick={() => toggleExpand(cell.id)}
// // // // // //                     className="p-1 hover:bg-gray-100 rounded-md"
// // // // // //                   >
// // // // // //                     {cell.isExpanded ? (
// // // // // //                       <ChevronUp className="h-4 w-4 text-gray-400" />
// // // // // //                     ) : (
// // // // // //                       <ChevronDown className="h-4 w-4 text-gray-400" />
// // // // // //                     )}
// // // // // //                   </button>
// // // // // //                 </div>
// // // // // //                 <div className="flex items-center space-x-2">
// // // // // //                   {cell.type === 'code' && (
// // // // // //                     <button
// // // // // //                       onClick={() => executeQuery(cell.id)}
// // // // // //                       className="flex items-center px-3 py-1.5 text-xs font-medium text-teal-700 bg-teal-50 rounded-md hover:bg-teal-100"
// // // // // //                       disabled={loading === cell.id}
// // // // // //                     >
// // // // // //                       <Play className={`h-3 w-3 mr-1 ${loading === cell.id ? 'animate-spin' : ''}`} />
// // // // // //                       Run
// // // // // //                     </button>
// // // // // //                   )}
// // // // // //                   {cell.executionTime && (
// // // // // //                     <span className="text-xs text-gray-500 ml-2">
// // // // // //                       ({cell.executionTime})
// // // // // //                     </span>
// // // // // //                   )}
// // // // // //                   <button
// // // // // //                     onClick={() => deleteCell(cell.id)}
// // // // // //                     className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-md"
// // // // // //                   >
// // // // // //                     <X className="h-4 w-4" />
// // // // // //                   </button>
// // // // // //                 </div>
// // // // // //               </div>

// // // // // //               {cell.isExpanded && (
// // // // // //                 <>
// // // // // //                   {cell.type === 'code' ? (
// // // // // //                     <>
// // // // // //                       <div className="border rounded-lg overflow-hidden bg-gray-50">
// // // // // //                         <Editor
// // // // // //                           height={calculateEditorHeight(cell.query)}
// // // // // //                           defaultLanguage="sql"
// // // // // //                           value={cell.query}
// // // // // //                           onChange={value =>
// // // // // //                             setCells(prev =>
// // // // // //                               prev.map(c =>
// // // // // //                                 c.id === cell.id ? { ...c, query: value || '' } : c
// // // // // //                               )
// // // // // //                             )
// // // // // //                           }
// // // // // //                           options={{
// // // // // //                             minimap: { enabled: false },
// // // // // //                             fontSize: 13,
// // // // // //                             lineHeight: 1.5,
// // // // // //                             padding: { top: 8, bottom: 8 },
// // // // // //                             scrollBeyondLastLine: false,
// // // // // //                           }}
// // // // // //                         />
// // // // // //                       </div>

// // // // // //                       {cell.error && (
// // // // // //                         <div className="mt-3 flex items-start px-4 py-3 bg-red-50 border border-red-100 rounded-lg">
// // // // // //                           <AlertCircle className="h-4 w-4 text-red-500 mt-0.5" />
// // // // // //                           <span className="text-xs text-red-600 ml-2">{cell.error}</span>
// // // // // //                         </div>
// // // // // //                       )}

// // // // // //                       {cell.result.length > 0 && (
// // // // // //                         <div className="mt-4 border rounded-lg bg-gray-50 overflow-x-auto">
// // // // // //                           <table className="w-full text-xs">
// // // // // //                             <thead>
// // // // // //                               <tr className="bg-gray-100">
// // // // // //                                 {cell.columns.map(col => (
// // // // // //                                   <th key={col.name} className="px-4 py-2 text-left font-medium text-gray-700">
// // // // // //                                     <div className="flex flex-col items-start">
// // // // // //                                       <span>{col.name}</span>
// // // // // //                                       <span style={{ fontSize: '10px', color: '#9CA3AF', fontWeight: '400', letterSpacing: '0.09em' }}>{col.type}</span>
// // // // // //                                     </div>
// // // // // //                                   </th>
// // // // // //                                 ))}
// // // // // //                               </tr>
// // // // // //                             </thead>
// // // // // //                             <tbody>
// // // // // //                               {cell.result.map((row, idx) => (
// // // // // //                                 <tr key={idx} className="hover:bg-gray-200">
// // // // // //                                   {cell.columns.map(col => (
// // // // // //                                     <td key={col.name} className="px-4 py-2 text-gray-800">
// // // // // //                                       {row[col.name] !== null && row[col.name] !== undefined ? row[col.name].toString() : 'NULL'}
// // // // // //                                     </td>
// // // // // //                                   ))}
// // // // // //                                 </tr>
// // // // // //                               ))}
// // // // // //                             </tbody>
// // // // // //                           </table>
// // // // // //                         </div>
// // // // // //                       )}
// // // // // //                     </>
// // // // // //                   ) : (
// // // // // //                     <div className="prose">
// // // // // //                       <div dangerouslySetInnerHTML={{ __html: cell.content }} />
// // // // // //                     </div>
// // // // // //                   )}
// // // // // //                 </>
// // // // // //               )}
// // // // // //             </div>
// // // // // //           </div>
// // // // // //         ))}
// // // // // //       </div>

// // // // // //       <button
// // // // // //         onClick={addCell}
// // // // // //         className="flex items-center px-4 py-2 text-xs font-medium text-teal-700 bg-teal-50 rounded-md hover:bg-teal-100"
// // // // // //       >
// // // // // //         <Plus className="h-4 w-4 mr-1" />
// // // // // //         Add Cell
// // // // // //       </button>
// // // // // //     </div>
// // // // // //   );
// // // // // // };

// // // // // // export default SQLNotebook;



// // // // // // // // Below is for State Management with Redux Toolkit

// // // // // // // // src/components/NotebookUI/Notebook/Notebook.tsx
// // // // // // // import React, { useEffect } from 'react';
// // // // // // // import { useLocation } from 'react-router-dom';
// // // // // // // import { useAppDispatch, useAppSelector } from '../../store';
// // // // // // // import {
// // // // // // //   setOriginalNotebookContent,
// // // // // // //   setEditedNotebookContent,
// // // // // // //   updateCellQuery
// // // // // // // } from '../../features/notebookslice';

// // // // // // // const Notebook: React.FC = () => {
// // // // // // //   const location = useLocation();
// // // // // // //   const dispatch = useAppDispatch();
// // // // // // //   const editedNotebookContent = useAppSelector((state) => state.notebook.editedNotebookContent);
// // // // // // //   const originalNotebookContent = useAppSelector((state) => state.notebook.originalNotebookContent);

// // // // // // //   // Extract notebooks data from navigation (from ChatInterface -> "Open Notebook")
// // // // // // //   const { notebooks } = (location.state as { notebooks?: any }) || {};

// // // // // // //   useEffect(() => {
// // // // // // //     // On mount, if we have notebooks from navigation and original not set, initialize
// // // // // // //     if (notebooks && !originalNotebookContent) {
// // // // // // //       dispatch(setOriginalNotebookContent(notebooks));
// // // // // // //       dispatch(setEditedNotebookContent(notebooks));
// // // // // // //     }
// // // // // // //   }, [notebooks, originalNotebookContent, dispatch]);

// // // // // // //   const handleQueryChange = (cellId: number, newQuery: string) => {
// // // // // // //     dispatch(updateCellQuery({ cellId, newQuery }));
// // // // // // //   };

// // // // // // //   if (!editedNotebookContent) {
// // // // // // //     return <div>Loading notebook...</div>;
// // // // // // //   }

// // // // // // //   return (
// // // // // // //     <div className="p-6">
// // // // // // //       <h1 className="text-lg font-medium">Notebook</h1>
// // // // // // //       <div className="mt-4 space-y-4">
// // // // // // //         {Array.isArray(editedNotebookContent.cells) && editedNotebookContent.cells.map((cell: any, idx: number) => {
// // // // // // //           if (cell.cell_type === 'code') {
// // // // // // //             const queryText = typeof cell.source === 'string' ? cell.source : (Array.isArray(cell.source) ? cell.source.join('\n') : '');
// // // // // // //             return (
// // // // // // //               <div key={idx} className="border rounded p-2 bg-gray-50">
// // // // // // //                 <div className="font-bold text-xs text-gray-700 mb-1">Code Cell {idx + 1}</div>
// // // // // // //                 <textarea
// // // // // // //                   className="w-full text-xs border p-1 rounded"
// // // // // // //                   value={queryText}
// // // // // // //                   onChange={(e) => handleQueryChange(cell.id, e.target.value)}
// // // // // // //                 />
// // // // // // //               </div>
// // // // // // //             );
// // // // // // //           } else if (cell.cell_type === 'markdown') {
// // // // // // //             const contentText = Array.isArray(cell.source) ? cell.source.join('') : cell.source;
// // // // // // //             return (
// // // // // // //               <div key={idx} className="border rounded p-2 bg-white">
// // // // // // //                 <div className="font-bold text-xs text-gray-700 mb-1">Markdown Cell {idx + 1}</div>
// // // // // // //                 {/* Display markdown content (editable if you add more logic) */}
// // // // // // //                 <div className="text-xs" dangerouslySetInnerHTML={{ __html: contentText }} />
// // // // // // //               </div>
// // // // // // //             );
// // // // // // //           } else {
// // // // // // //             return <div key={idx} className="text-xs text-gray-500">Unsupported cell type</div>;
// // // // // // //           }
// // // // // // //         })}
// // // // // // //       </div>
// // // // // // //     </div>
// // // // // // //   );
// // // // // // // };

// // // // // // // export default Notebook;







// // // // // // src/components/SQLNotebook/SQLNotebook.tsx

// // // // // import React from 'react';
// // // // // import Editor from '@monaco-editor/react';
// // // // // import { Play, ChevronDown, ChevronUp, AlertCircle, X, Plus } from 'lucide-react';

// // // // // interface Column {
// // // // //   name: string;
// // // // //   type: string;
// // // // // }

// // // // // interface Cell {
// // // // //   id: number;
// // // // //   type: 'code' | 'markdown';
// // // // //   content: string;
// // // // //   query: string;
// // // // //   result: any[];
// // // // //   columns: Column[];
// // // // //   error: string | null;
// // // // //   isExpanded: boolean;
// // // // //   executionTime: string | null;
// // // // // }

// // // // // interface SQLNotebookProps {
// // // // //   activeTab: string;
// // // // //   notebookContent: {
// // // // //     file_url: string;
// // // // //     entity_column: string;
// // // // //     target_column: string;
// // // // //     features: string[];
// // // // //     user_id: string;
// // // // //     chat_id: string;
// // // // //     isTrained: boolean;
// // // // //     handleTrainModel: () => void;
// // // // //     sql_queries?: string[]; // Optional: Include if needed
// // // // //   };
// // // // // }

// // // // // const SQLNotebook: React.FC<SQLNotebookProps> = ({ activeTab, notebookContent }) => {
// // // // //   const { sql_queries, isTrained, handleTrainModel } = notebookContent;
// // // // //   const [cells, setCells] = React.useState<Cell[]>([]);
// // // // //   const [loading, setLoading] = React.useState<number | null>(null);

// // // // //   React.useEffect(() => {
// // // // //     if (sql_queries && sql_queries.length > 0) {
// // // // //       const initialCells: Cell[] = sql_queries.map((query, index) => ({
// // // // //         id: index + 1,
// // // // //         type: 'code',
// // // // //         content: '',
// // // // //         query: query,
// // // // //         result: [],
// // // // //         columns: [],
// // // // //         error: null,
// // // // //         isExpanded: true,
// // // // //         executionTime: null,
// // // // //       }));
// // // // //       setCells(initialCells);
// // // // //     } else {
// // // // //       setCells([
// // // // //         {
// // // // //           id: 1,
// // // // //           type: 'code',
// // // // //           content: '',
// // // // //           query: '',
// // // // //           result: [],
// // // // //           columns: [],
// // // // //           error: null,
// // // // //           isExpanded: true,
// // // // //           executionTime: null,
// // // // //         },
// // // // //       ]);
// // // // //     }
// // // // //   }, [sql_queries]);

// // // // //   const calculateEditorHeight = (content: string) => {
// // // // //     const lineCount = (content.match(/\n/g) || []).length + 1;
// // // // //     const baseHeight = 150;
// // // // //     const lineHeight = 20;
// // // // //     const maxHeight = 500;
// // // // //     return `${Math.min(Math.max(baseHeight, lineCount * lineHeight), maxHeight)}px`;
// // // // //   };

// // // // //   const executeQuery = async (cellId: number) => {
// // // // //     const cell = cells.find((c) => c.id === cellId);
// // // // //     if (!cell || cell.type !== 'code') return;

// // // // //     setLoading(cellId);
// // // // //     const startTime = Date.now();

// // // // //     try {
// // // // //       const response = await fetch(`http://localhost:8000/api/execute-sql/`, {
// // // // //         method: 'POST',
// // // // //         headers: {
// // // // //           'Content-Type': 'application/json',
// // // // //           'Authorization': 'Token d36e47f0e5c0a356d35a7d6d407aab93f6b0d36b', // Consider securing this token
// // // // //         },
// // // // //         body: JSON.stringify({ query: cell.query }),
// // // // //       });

// // // // //       const endTime = Date.now();
// // // // //       const timeTaken = endTime - startTime;
// // // // //       const formattedTime = formatTime(timeTaken);

// // // // //       if (!response.ok) {
// // // // //         const errorData = await response.json().catch(() => ({ error: 'Unknown error occurred' }));
// // // // //         throw new Error(errorData.error || 'Query execution failed');
// // // // //       }

// // // // //       const data = await response.json();
// // // // //       if (data.columns.length > 0 && data.rows.length > 0 && data.columns.length !== Object.keys(data.rows[0]).length) {
// // // // //         throw new Error('Mismatch between columns and data.');
// // // // //       }

// // // // //       setCells((prev) =>
// // // // //         prev.map((c) =>
// // // // //           c.id === cellId
// // // // //             ? { ...c, result: data.rows, columns: data.columns, error: null, executionTime: formattedTime }
// // // // //             : c
// // // // //         )
// // // // //       );
// // // // //     } catch (err: any) {
// // // // //       console.error(`Error executing query for cell ${cellId}:`, err);
// // // // //       setCells((prev) =>
// // // // //         prev.map((c) =>
// // // // //           c.id === cellId
// // // // //             ? { ...c, result: [], columns: [], error: err.message || 'Unknown error', executionTime: null }
// // // // //             : c
// // // // //         )
// // // // //       );
// // // // //     } finally {
// // // // //       setLoading(null);
// // // // //     }
// // // // //   };

// // // // //   const formatTime = (ms: number): string => {
// // // // //     if (ms < 1000) {
// // // // //       return `${ms} ms`;
// // // // //     } else {
// // // // //       return `${(ms / 1000).toFixed(2)} s`;
// // // // //     }
// // // // //   };

// // // // //   const deleteCell = (id: number) => {
// // // // //     setCells((prev) => prev.filter((cell) => cell.id !== id));
// // // // //   };

// // // // //   const toggleExpand = (id: number) => {
// // // // //     setCells((prev) =>
// // // // //       prev.map((cell) =>
// // // // //         cell.id === id ? { ...cell, isExpanded: !cell.isExpanded } : cell
// // // // //       )
// // // // //     );
// // // // //   };

// // // // //   const addCell = () => {
// // // // //     setCells((prev) => [
// // // // //       ...prev,
// // // // //       {
// // // // //         id: prev.length + 1,
// // // // //         type: 'code',
// // // // //         content: '',
// // // // //         query: '',
// // // // //         result: [],
// // // // //         columns: [],
// // // // //         error: null,
// // // // //         isExpanded: true,
// // // // //         executionTime: null,
// // // // //       },
// // // // //     ]);
// // // // //   };

// // // // //   return (
// // // // //     <div className="w-full space-y-4 p-6">
// // // // //       <div className="text-lg font-medium text-center pb-3 border-b border-teal-700">
// // // // //         <span className="bg-gradient-to-r from-teal-600 to-emerald-500 bg-clip-text text-transparent">
// // // // //           {activeTab === 'entity_target_notebook' && 'Entity & Target Analysis Notebook'}
// // // // //           {activeTab === 'features_notebook' && 'Features Analysis Notebook'}
// // // // //         </span>
// // // // //       </div>

// // // // //       <div className="space-y-4">
// // // // //         {cells.map((cell) => (
// // // // //           <div
// // // // //             key={cell.id}
// // // // //             className="bg-white rounded-lg border border-gray-100 shadow-sm hover:shadow-md group"
// // // // //           >
// // // // //             <div className="p-4">
// // // // //               <div className="flex items-center justify-between mb-2">
// // // // //                 <div className="flex items-center space-x-2">
// // // // //                   <span className="text-xs font-medium text-gray-400">
// // // // //                     {cell.type === 'code' ? `Code Cell ${cell.id}` : `Markdown Cell ${cell.id}`}
// // // // //                   </span>
// // // // //                   <button
// // // // //                     onClick={() => toggleExpand(cell.id)}
// // // // //                     className="p-1 hover:bg-gray-100 rounded-md"
// // // // //                     aria-label={cell.isExpanded ? 'Collapse cell' : 'Expand cell'}
// // // // //                   >
// // // // //                     {cell.isExpanded ? (
// // // // //                       <ChevronUp className="h-4 w-4 text-gray-400" />
// // // // //                     ) : (
// // // // //                       <ChevronDown className="h-4 w-4 text-gray-400" />
// // // // //                     )}
// // // // //                   </button>
// // // // //                 </div>
// // // // //                 <div className="flex items-center space-x-2">
// // // // //                   {cell.type === 'code' && (
// // // // //                     <button
// // // // //                       onClick={() => executeQuery(cell.id)}
// // // // //                       className="flex items-center px-3 py-1.5 text-xs font-medium text-teal-700 bg-teal-50 rounded-md hover:bg-teal-100"
// // // // //                       disabled={loading === cell.id}
// // // // //                       aria-label="Run query"
// // // // //                     >
// // // // //                       <Play className={`h-3 w-3 mr-1 ${loading === cell.id ? 'animate-spin' : ''}`} />
// // // // //                       Run
// // // // //                     </button>
// // // // //                   )}
// // // // //                   {cell.executionTime && (
// // // // //                     <span className="text-xs text-gray-500 ml-2">
// // // // //                       ({cell.executionTime})
// // // // //                     </span>
// // // // //                   )}
// // // // //                   <button
// // // // //                     onClick={() => deleteCell(cell.id)}
// // // // //                     className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-gray-100 rounded-md"
// // // // //                     aria-label="Delete cell"
// // // // //                   >
// // // // //                     <X className="h-4 w-4" />
// // // // //                   </button>
// // // // //                 </div>
// // // // //               </div>

// // // // //               {cell.isExpanded && (
// // // // //                 <>
// // // // //                   {cell.type === 'code' ? (
// // // // //                     <>
// // // // //                       <div className="border rounded-lg overflow-hidden bg-gray-50">
// // // // //                         <Editor
// // // // //                           height={calculateEditorHeight(cell.query)}
// // // // //                           defaultLanguage="sql"
// // // // //                           value={cell.query}
// // // // //                           onChange={(value) =>
// // // // //                             setCells((prev) =>
// // // // //                               prev.map((c) =>
// // // // //                                 c.id === cell.id ? { ...c, query: value || '' } : c
// // // // //                               )
// // // // //                             )
// // // // //                           }
// // // // //                           options={{
// // // // //                             minimap: { enabled: false },
// // // // //                             fontSize: 13,
// // // // //                             lineHeight: 1.5,
// // // // //                             padding: { top: 8, bottom: 8 },
// // // // //                             scrollBeyondLastLine: false,
// // // // //                           }}
// // // // //                         />
// // // // //                       </div>

// // // // //                       {cell.error && (
// // // // //                         <div className="mt-3 flex items-start px-4 py-3 bg-red-50 border border-red-100 rounded-lg">
// // // // //                           <AlertCircle className="h-4 w-4 text-red-500 mt-0.5" />
// // // // //                           <span className="text-xs text-red-600 ml-2">{cell.error}</span>
// // // // //                         </div>
// // // // //                       )}

// // // // //                       {cell.result.length > 0 && (
// // // // //                         <div className="mt-4 border rounded-lg bg-gray-50 overflow-x-auto">
// // // // //                           <table className="w-full text-xs">
// // // // //                             <thead>
// // // // //                               <tr className="bg-gray-100">
// // // // //                                 {cell.columns.map((col) => (
// // // // //                                   <th key={col.name} className="px-4 py-2 text-left font-medium text-gray-700 uppercase tracking-wider">
// // // // //                                     <div className="flex flex-col items-start">
// // // // //                                       <span>{col.name}</span>
// // // // //                                       <span style={{ fontSize: '10px', color: '#9CA3AF', fontWeight: '400', letterSpacing: '0.09em' }}>{col.type}</span>
// // // // //                                     </div>
// // // // //                                   </th>
// // // // //                                 ))}
// // // // //                               </tr>
// // // // //                             </thead>
// // // // //                             <tbody>
// // // // //                               {cell.result.map((row, idx) => (
// // // // //                                 <tr key={idx} className="hover:bg-gray-200">
// // // // //                                   {cell.columns.map((col) => (
// // // // //                                     <td key={col.name} className="px-4 py-2 text-gray-800">
// // // // //                                       {row[col.name] !== null && row[col.name] !== undefined ? row[col.name].toString() : 'NULL'}
// // // // //                                     </td>
// // // // //                                   ))}
// // // // //                                 </tr>
// // // // //                               ))}
// // // // //                             </tbody>
// // // // //                           </table>
// // // // //                         </div>
// // // // //                       )}
// // // // //                     </>
// // // // //                   ) : (
// // // // //                     <div className="prose">
// // // // //                       <div dangerouslySetInnerHTML={{ __html: cell.content }} />
// // // // //                     </div>
// // // // //                   )}
// // // // //                 </>
// // // // //               )}
// // // // //             </div>
// // // // //           </div>
// // // // //         ))}
// // // // //       </div>

// // // // //       <button
// // // // //         onClick={addCell}
// // // // //         className="flex items-center px-4 py-2 text-xs font-medium text-teal-700 bg-teal-50 rounded-md hover:bg-teal-100"
// // // // //         aria-label="Add cell"
// // // // //       >
// // // // //         <Plus className="h-4 w-4 mr-1" />
// // // // //         Add Cell
// // // // //       </button>

// // // // //       {/* Conditional Rendering for "After Train" State */}
// // // // //       {isTrained && (
// // // // //         <div className="mt-6 p-4 bg-green-50 border border-green-100 rounded-lg text-green-700">
// // // // //           Model training completed successfully! You can now view the Dashboard or make Predictions.
// // // // //         </div>
// // // // //       )}

// // // // //       {/* Render "Train Model" Button if Not Trained */}
// // // // //       {!isTrained && (
// // // // //         <div className="mt-6">
// // // // //           <button
// // // // //             onClick={handleTrainModel}
// // // // //             className="w-full flex items-center justify-center px-4 py-2 bg-teal-500 text-white text-sm font-medium rounded-md hover:bg-teal-600"
// // // // //             aria-label="Train model"
// // // // //           >
// // // // //             Train Model
// // // // //           </button>
// // // // //         </div>
// // // // //       )}
// // // // //     </div>
// // // // //   );
// // // // // };

// // // // // export default SQLNotebook;



// // // // import React, { useEffect, useState } from 'react';
// // // // import Editor from '@monaco-editor/react';
// // // // import { Play, ChevronDown, ChevronUp, AlertCircle, X, Plus } from 'lucide-react';

// // // // interface Column {
// // // //   name: string;
// // // //   type: string;
// // // // }

// // // // interface Cell {
// // // //   id: number;
// // // //   type: 'code' | 'markdown';
// // // //   content: string;
// // // //   query: string;
// // // //   result: any[];
// // // //   columns: Column[];
// // // //   error: string | null;
// // // //   isExpanded: boolean;
// // // //   executionTime: string | null;
// // // // }

// // // // interface SQLNotebookProps {
// // // //   activeTab: string;
// // // //   notebookContent: {
// // // //     file_url: string;
// // // //     entity_column: string;
// // // //     target_column: string;
// // // //     features: string[];
// // // //     user_id: string;
// // // //     chat_id: string;
// // // //     isTrained: boolean;
// // // //     handleTrainModel: () => void;
// // // //     sql_queries?: string[]; // Optional: Include if needed
// // // //   };
// // // // }

// // // // const SQLNotebook: React.FC<SQLNotebookProps> = ({ activeTab, notebookContent }) => {
// // // //   const { sql_queries, isTrained, handleTrainModel } = notebookContent;
// // // //   const [cells, setCells] = useState<Cell[]>([]);
// // // //   const [loading, setLoading] = useState<number | null>(null);

// // // //   useEffect(() => {
// // // //     console.log('Received notebook content:', notebookContent);
// // // //     if (sql_queries && sql_queries.length > 0) {
// // // //       const initialCells: Cell[] = sql_queries.map((query, index) => ({
// // // //         id: index + 1,
// // // //         type: 'code',
// // // //         content: '',
// // // //         query: query,
// // // //         result: [],
// // // //         columns: [],
// // // //         error: null,
// // // //         isExpanded: true,
// // // //         executionTime: null,
// // // //       }));
// // // //       setCells(initialCells);
// // // //     } else {
// // // //       setCells([
// // // //         {
// // // //           id: 1,
// // // //           type: 'code',
// // // //           content: '',
// // // //           query: '',
// // // //           result: [],
// // // //           columns: [],
// // // //           error: null,
// // // //           isExpanded: true,
// // // //           executionTime: null,
// // // //         },
// // // //       ]);
// // // //     }
// // // //   }, [sql_queries]);

// // // //   const calculateEditorHeight = (content: string) => {
// // // //     const lineCount = (content.match(/\n/g) || []).length + 1;
// // // //     const baseHeight = 150;
// // // //     const lineHeight = 20;
// // // //     const maxHeight = 500;
// // // //     return `${Math.min(Math.max(baseHeight, lineCount * lineHeight), maxHeight)}px`;
// // // //   };

// // // //   const executeQuery = async (cellId: number) => {
// // // //     const cell = cells.find((c) => c.id === cellId);
// // // //     if (!cell || cell.type !== 'code') return;

// // // //     setLoading(cellId);
// // // //     const startTime = Date.now();

// // // //     try {
// // // //       const response = await fetch(`http://localhost:8000/api/execute-sql/`, {
// // // //         method: 'POST',
// // // //         headers: {
// // // //           'Content-Type': 'application/json',
// // // //           'Authorization': 'Token d36e47f0e5c0a356d35a7d6d407aab93f6b0d36b', // Consider securing this token
// // // //         },
// // // //         body: JSON.stringify({ query: cell.query }),
// // // //       });

// // // //       const endTime = Date.now();
// // // //       const timeTaken = endTime - startTime;
// // // //       const formattedTime = formatTime(timeTaken);

// // // //       if (!response.ok) {
// // // //         const errorData = await response.json().catch(() => ({ error: 'Unknown error occurred' }));
// // // //         throw new Error(errorData.error || 'Query execution failed');
// // // //       }

// // // //       const data = await response.json();
// // // //       if (data.columns.length > 0 && data.rows.length > 0 && data.columns.length !== Object.keys(data.rows[0]).length) {
// // // //         throw new Error('Mismatch between columns and data.');
// // // //       }

// // // //       setCells((prev) =>
// // // //         prev.map((c) =>
// // // //           c.id === cellId
// // // //             ? { ...c, result: data.rows, columns: data.columns, error: null, executionTime: formattedTime }
// // // //             : c
// // // //         )
// // // //       );
// // // //     } catch (err: any) {
// // // //       console.error(`Error executing query for cell ${cellId}:`, err);
// // // //       setCells((prev) =>
// // // //         prev.map((c) =>
// // // //           c.id === cellId
// // // //             ? { ...c, result: [], columns: [], error: err.message || 'Unknown error', executionTime: null }
// // // //             : c
// // // //         )
// // // //       );
// // // //     } finally {
// // // //       setLoading(null);
// // // //     }
// // // //   };

// // // //   const formatTime = (ms: number): string => {
// // // //     if (ms < 1000) {
// // // //       return `${ms} ms`;
// // // //     } else {
// // // //       return `${(ms / 1000).toFixed(2)} s`;
// // // //     }
// // // //   };

// // // //   const deleteCell = (id: number) => {
// // // //     setCells((prev) => prev.filter((cell) => cell.id !== id));
// // // //   };

// // // //   const toggleExpand = (id: number) => {
// // // //     setCells((prev) =>
// // // //       prev.map((cell) =>
// // // //         cell.id === id ? { ...cell, isExpanded: !cell.isExpanded } : cell
// // // //       )
// // // //     );
// // // //   };

// // // //   const addCell = () => {
// // // //     setCells((prev) => [
// // // //       ...prev,
// // // //       {
// // // //         id: prev.length + 1,
// // // //         type: 'code',
// // // //         content: '',
// // // //         query: '',
// // // //         result: [],
// // // //         columns: [],
// // // //         error: null,
// // // //         isExpanded: true,
// // // //         executionTime: null,
// // // //       },
// // // //     ]);
// // // //   };

// // // //   return (
// // // //     <div className="w-full space-y-4 p-6">
// // // //       <div className="text-lg font-medium text-center pb-3 border-b border-teal-700">
// // // //         <span className="bg-gradient-to-r from-teal-600 to-emerald-500 bg-clip-text text-transparent">
// // // //           {activeTab === 'entity_target_notebook' && 'Entity & Target Analysis Notebook'}
// // // //           {activeTab === 'features_notebook' && 'Features Analysis Notebook'}
// // // //         </span>
// // // //       </div>

// // // //       <div className="space-y-4">
// // // //         {cells.map((cell) => (
// // // //           <div
// // // //             key={cell.id}
// // // //             className="bg-white rounded-lg border border-gray-100 shadow-sm hover:shadow-md group"
// // // //           >
// // // //             <div className="p-4">
// // // //               <div className="flex items-center justify-between mb-2">
// // // //                 <div className="flex items-center space-x-2">
// // // //                   <span className="text-xs font-medium text-gray-400">
// // // //                     {cell.type === 'code' ? `Code Cell ${cell.id}` : `Markdown Cell ${cell.id}`}
// // // //                   </span>
// // // //                   <button
// // // //                     onClick={() => toggleExpand(cell.id)}
// // // //                     className="p-1 hover:bg-gray-100 rounded-md"
// // // //                     aria-label={cell.isExpanded ? 'Collapse cell' : 'Expand cell'}
// // // //                   >
// // // //                     {cell.isExpanded ? (
// // // //                       <ChevronUp className="h-4 w-4 text-gray-400" />
// // // //                     ) : (
// // // //                       <ChevronDown className="h-4 w-4 text-gray-400" />
// // // //                     )}
// // // //                   </button>
// // // //                 </div>
// // // //                 <div className="flex items-center space-x-2">
// // // //                   {cell.type === 'code' && (
// // // //                     <button
// // // //                       onClick={() => executeQuery(cell.id)}
// // // //                       className="flex items-center px-3 py-1.5 text-xs font-medium text-teal-700 bg-teal-50 rounded-md hover:bg-teal-100"
// // // //                       disabled={loading === cell.id}
// // // //                       aria-label="Run query"
// // // //                     >
// // // //                       <Play className={`h-3 w-3 mr-1 ${loading === cell.id ? 'animate-spin' : ''}`} />
// // // //                       Run
// // // //                     </button>
// // // //                   )}
// // // //                   {cell.executionTime && (
// // // //                     <span className="text-xs text-gray-500 ml-2">
// // // //                       ({cell.executionTime})
// // // //                     </span>
// // // //                   )}
// // // //                   <button
// // // //                     onClick={() => deleteCell(cell.id)}
// // // //                     className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-gray-100 rounded-md"
// // // //                     aria-label="Delete cell"
// // // //                   >
// // // //                     <X className="h-4 w-4" />
// // // //                   </button>
// // // //                 </div>
// // // //               </div>

// // // //               {cell.isExpanded && (
// // // //                 <>
// // // //                   {cell.type === 'code' ? (
// // // //                     <>
// // // //                       <div className="border rounded-lg overflow-hidden bg-gray-50">
// // // //                         <Editor
// // // //                           height={calculateEditorHeight(cell.query)}
// // // //                           defaultLanguage="sql"
// // // //                           value={cell.query}
// // // //                           onChange={(value) =>
// // // //                             setCells((prev) =>
// // // //                               prev.map((c) =>
// // // //                                 c.id === cell.id ? { ...c, query: value || '' } : c
// // // //                               )
// // // //                             )
// // // //                           }
// // // //                           options={{
// // // //                             minimap: { enabled: false },
// // // //                             fontSize: 13,
// // // //                             lineHeight: 1.5,
// // // //                             padding: { top: 8, bottom: 8 },
// // // //                             scrollBeyondLastLine: false,
// // // //                           }}
// // // //                         />
// // // //                       </div>

// // // //                       {cell.error && (
// // // //                         <div className="mt-3 flex items-start px-4 py-3 bg-red-50 border border-red-100 rounded-lg">
// // // //                           <AlertCircle className="h-4 w-4 text-red-500 mt-0.5" />
// // // //                           <span className="text-xs text-red-600 ml-2">{cell.error}</span>
// // // //                         </div>
// // // //                       )}

// // // //                       {cell.result.length > 0 && (
// // // //                         <div className="mt-4 border rounded-lg bg-gray-50 overflow-x-auto">
// // // //                           <table className="w-full text-xs">
// // // //                             <thead>
// // // //                               <tr className="bg-gray-100">
// // // //                                 {cell.columns.map((col) => (
// // // //                                   <th key={col.name} className="px-4 py-2 text-left font-medium text-gray-700 uppercase tracking-wider">
// // // //                                     <div className="flex flex-col items-start">
// // // //                                       <span>{col.name}</span>
// // // //                                       <span style={{ fontSize: '10px', color: '#9CA3AF', fontWeight: '400', letterSpacing: '0.09em' }}>{col.type}</span>
// // // //                                     </div>
// // // //                                   </th>
// // // //                                 ))}
// // // //                               </tr>
// // // //                             </thead>
// // // //                             <tbody>
// // // //                               {cell.result.map((row, idx) => (
// // // //                                 <tr key={idx} className="hover:bg-gray-200">
// // // //                                   {cell.columns.map((col) => (
// // // //                                     <td key={col.name} className="px-4 py-2 text-gray-800">
// // // //                                       {row[col.name] !== null && row[col.name] !== undefined ? row[col.name].toString() : 'NULL'}
// // // //                                     </td>
// // // //                                   ))}
// // // //                                 </tr>
// // // //                               ))}
// // // //                             </tbody>
// // // //                           </table>
// // // //                         </div>
// // // //                       )}
// // // //                     </>
// // // //                   ) : (
// // // //                     <div className="prose">
// // // //                       <div dangerouslySetInnerHTML={{ __html: cell.content }} />
// // // //                     </div>
// // // //                   )}
// // // //                 </>
// // // //               )}
// // // //             </div>
// // // //           </div>
// // // //         ))}
// // // //       </div>

// // // //       <button
// // // //         onClick={addCell}
// // // //         className="flex items-center px-4 py-2 text-xs font-medium text-teal-700 bg-teal-50 rounded-md hover:bg-teal-100"
// // // //         aria-label="Add cell"
// // // //       >
// // // //         <Plus className="h-4 w-4 mr-1" />
// // // //         Add Cell
// // // //       </button>

// // // //       {/* Conditional Rendering for "After Train" State */}
// // // //       {isTrained && (
// // // //         <div className="mt-6 p-4 bg-green-50 border border-green-100 rounded-lg text-green-700">
// // // //           Model training completed successfully! You can now view the Dashboard or make Predictions.
// // // //         </div>
// // // //       )}

// // // //       {/* Render "Train Model" Button if Not Trained */}
// // // //       {!isTrained && (
// // // //         <div className="mt-6">
// // // //           <button
// // // //             onClick={handleTrainModel}
// // // //             className="w-full flex items-center justify-center px-4 py-2 bg-teal-500 text-white text-sm font-medium rounded-md hover:bg-teal-600"
// // // //             aria-label="Train model"
// // // //           >
// // // //             Train Model
// // // //           </button>
// // // //         </div>
// // // //       )}
// // // //     </div>
// // // //   );
// // // // };

// // // // export default SQLNotebook;






// // // // src/components/Notebook/SQLNotebook.tsx

// // // import React, { useEffect, useState } from 'react';
// // // import Editor from '@monaco-editor/react';
// // // import { Play, ChevronDown, ChevronUp, AlertCircle, X, Plus } from 'lucide-react';

// // // interface Column {
// // //   name: string;
// // //   type: string;
// // // }

// // // interface Cell {
// // //   id: number;
// // //   type: 'code' | 'markdown';
// // //   content: string;
// // //   query: string;
// // //   result: any[];
// // //   columns: Column[];
// // //   error: string | null;
// // //   isExpanded: boolean;
// // //   executionTime: string | null;
// // // }

// // // interface SQLNotebookProps {
// // //   activeTab: string;
// // //   notebookContent: {
// // //     file_url: string;
// // //     entity_column: string;
// // //     target_column: string;
// // //     features: string[];
// // //     user_id: string;
// // //     chat_id: string;
// // //     isTrained: boolean;
// // //     handleTrainModel: () => void;
// // //     cells: any[]; // The cells array from the notebook
// // //   };
// // // }

// // // // Enhanced Type Guard to filter out nulls and ensure 'type' is 'code' or 'markdown'
// // // function isCell(cell: any): cell is Cell {
// // //   return cell !== null && (cell.type === 'code' || cell.type === 'markdown');
// // // }

// // // const SQLNotebook: React.FC<SQLNotebookProps> = ({ activeTab, notebookContent }) => {
// // //   const { cells: notebookCells, isTrained, } = notebookContent;
// // //   const [cells, setCells] = useState<Cell[]>([]);
// // //   const [loading, setLoading] = useState<number | null>(null);

// // //   useEffect(() => {
// // //     console.log('Received notebook content:', notebookContent);
// // //     if (notebookCells && notebookCells.length > 0) {
// // //       const initialCells = notebookCells.map((cell: any, index: number) => {
// // //         if (cell.cell_type === 'code') {
// // //           const query = Array.isArray(cell.source) ? cell.source.join('') : cell.source;

// // //           let result: any[] = [];
// // //           let columns: Column[] = [];
// // //           let error: string | null = null;

// // //           if (cell.outputs && cell.outputs.length > 0) {
// // //             const output = cell.outputs[0];
// // //             if (output.output_type === 'execute_result' && output.data) {
// // //               const jsonData = output.data['application/json'];
// // //               if (jsonData && Array.isArray(jsonData.rows) && Array.isArray(jsonData.columns)) {
// // //                 result = jsonData.rows;
// // //                 columns = jsonData.columns;
// // //               }
// // //             } else if (output.output_type === 'error') {
// // //               error = output.evalue || 'Unknown error';
// // //             }
// // //           }

// // //           return {
// // //             id: index + 1,
// // //             type: 'code' as 'code', // Explicit type assertion
// // //             content: '',
// // //             query: query || '',
// // //             result: result,
// // //             columns: columns,
// // //             error: error,
// // //             isExpanded: true,
// // //             executionTime: null,
// // //           };
// // //         } else if (cell.cell_type === 'markdown') {
// // //           const content = Array.isArray(cell.source) ? cell.source.join('') : cell.source;
// // //           return {
// // //             id: index + 1,
// // //             type: 'markdown' as 'markdown', // Explicit type assertion
// // //             content: content,
// // //             query: '',
// // //             result: [],
// // //             columns: [],
// // //             error: null,
// // //             isExpanded: true,
// // //             executionTime: null,
// // //           };
// // //         } else {
// // //           // If cell_type is neither 'code' nor 'markdown', exclude it
// // //           return null;
// // //         }
// // //       }).filter(isCell); // Use the enhanced type guard

// // //       setCells(initialCells.filter(cell => cell !== null) as Cell[]);
// // //     } else {
// // //       setCells([
// // //         {
// // //           id: 1,
// // //           type: 'code',
// // //           content: '',
// // //           query: '',
// // //           result: [],
// // //           columns: [],
// // //           error: null,
// // //           isExpanded: true,
// // //           executionTime: null,
// // //         },
// // //       ]);
// // //     }
// // //   }, [notebookCells, notebookContent]);

// // //   const calculateEditorHeight = (content: string) => {
// // //     const lineCount = (content.match(/\n/g) || []).length + 1;
// // //     const baseHeight = 150;
// // //     const lineHeight = 20;
// // //     const maxHeight = 500;
// // //     return `${Math.min(Math.max(baseHeight, lineCount * lineHeight), maxHeight)}px`;
// // //   };

// // //   const executeQuery = async (cellId: number) => {
// // //     const cell = cells.find((c) => c.id === cellId);
// // //     if (!cell || cell.type !== 'code') return;

// // //     setLoading(cellId);
// // //     const startTime = Date.now();

// // //     try {
// // //       const response = await fetch(`http://localhost:8000/api/execute-sql/`, {
// // //         method: 'POST',
// // //         headers: {
// // //           'Content-Type': 'application/json',
// // //           'Authorization': 'Token d36e47f0e5c0a356d35a7d6d407aab93f6b0d36b', // Consider securing this token
// // //         },
// // //         body: JSON.stringify({ query: cell.query }),
// // //       });

// // //       const endTime = Date.now();
// // //       const timeTaken = endTime - startTime;
// // //       const formattedTime = formatTime(timeTaken);

// // //       if (!response.ok) {
// // //         const errorData = await response.json().catch(() => ({ error: 'Unknown error occurred' }));
// // //         throw new Error(errorData.error || 'Query execution failed');
// // //       }

// // //       const data = await response.json();
// // //       if (
// // //         data.columns.length > 0 &&
// // //         data.rows.length > 0 &&
// // //         data.columns.length !== Object.keys(data.rows[0]).length
// // //       ) {
// // //         throw new Error('Mismatch between columns and data.');
// // //       }

// // //       setCells((prev) =>
// // //         prev.map((c) =>
// // //           c.id === cellId
// // //             ? { ...c, result: data.rows, columns: data.columns, error: null, executionTime: formattedTime }
// // //             : c
// // //         )
// // //       );
// // //     } catch (err: any) {
// // //       console.error(`Error executing query for cell ${cellId}:`, err);
// // //       setCells((prev) =>
// // //         prev.map((c) =>
// // //           c.id === cellId
// // //             ? { ...c, result: [], columns: [], error: err.message || 'Unknown error', executionTime: null }
// // //             : c
// // //         )
// // //       );
// // //     } finally {
// // //       setLoading(null);
// // //     }
// // //   };

// // //   const formatTime = (ms: number): string => {
// // //     if (ms < 1000) {
// // //       return `${ms} ms`;
// // //     } else {
// // //       return `${(ms / 1000).toFixed(2)} s`;
// // //     }
// // //   };

// // //   const deleteCell = (id: number) => {
// // //     setCells((prev) => prev.filter((cell) => cell.id !== id));
// // //   };

// // //   const toggleExpand = (id: number) => {
// // //     setCells((prev) =>
// // //       prev.map((cell) =>
// // //         cell.id === id ? { ...cell, isExpanded: !cell.isExpanded } : cell
// // //       )
// // //     );
// // //   };

// // //   const addCell = () => {
// // //     setCells((prev) => [
// // //       ...prev,
// // //       {
// // //         id: prev.length + 1,
// // //         type: 'code',
// // //         content: '',
// // //         query: '',
// // //         result: [],
// // //         columns: [],
// // //         error: null,
// // //         isExpanded: true,
// // //         executionTime: null,
// // //       },
// // //     ]);
// // //   };

// // //   return (
// // //     <div className="w-full space-y-4 p-6">
// // //       <div className="text-lg font-medium text-center pb-3 border-b border-teal-700">
// // //         <span className="bg-gradient-to-r from-teal-600 to-emerald-500 bg-clip-text text-transparent">
// // //           {activeTab === 'entity_target_notebook' && 'Entity & Target Analysis Notebook'}
// // //           {activeTab === 'features_notebook' && 'Features Analysis Notebook'}
// // //         </span>
// // //       </div>

// // //       <div className="space-y-4">
// // //         {cells.map((cell) => (
// // //           <div
// // //             key={cell.id}
// // //             className="bg-white rounded-lg border border-gray-100 shadow-sm hover:shadow-md group"
// // //           >
// // //             <div className="p-4">
// // //               <div className="flex items-center justify-between mb-2">
// // //                 <div className="flex items-center space-x-2">
// // //                   <span className="text-xs font-medium text-gray-400">
// // //                     {cell.type === 'code' ? `Code Cell ${cell.id}` : `Markdown Cell ${cell.id}`}
// // //                   </span>
// // //                   <button
// // //                     onClick={() => toggleExpand(cell.id)}
// // //                     className="p-1 hover:bg-gray-100 rounded-md"
// // //                     aria-label={cell.isExpanded ? 'Collapse cell' : 'Expand cell'}
// // //                   >
// // //                     {cell.isExpanded ? (
// // //                       <ChevronUp className="h-4 w-4 text-gray-400" />
// // //                     ) : (
// // //                       <ChevronDown className="h-4 w-4 text-gray-400" />
// // //                     )}
// // //                   </button>
// // //                 </div>
// // //                 <div className="flex items-center space-x-2">
// // //                   {cell.type === 'code' && (
// // //                     <button
// // //                       onClick={() => executeQuery(cell.id)}
// // //                       className="flex items-center px-3 py-1.5 text-xs font-medium text-teal-700 bg-teal-50 rounded-md hover:bg-teal-100"
// // //                       disabled={loading === cell.id}
// // //                       aria-label="Run query"
// // //                     >
// // //                       <Play className={`h-3 w-3 mr-1 ${loading === cell.id ? 'animate-spin' : ''}`} />
// // //                       Run
// // //                     </button>
// // //                   )}
// // //                   {cell.executionTime && (
// // //                     <span className="text-xs text-gray-500 ml-2">
// // //                       ({cell.executionTime})
// // //                     </span>
// // //                   )}
// // //                   <button
// // //                     onClick={() => deleteCell(cell.id)}
// // //                     className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-gray-100 rounded-md"
// // //                     aria-label="Delete cell"
// // //                   >
// // //                     <X className="h-4 w-4" />
// // //                   </button>
// // //                 </div>
// // //               </div>

// // //               {cell.isExpanded && (
// // //                 <>
// // //                   {cell.type === 'code' ? (
// // //                     <>
// // //                       <div className="border rounded-lg overflow-hidden bg-gray-50">
// // //                         <Editor
// // //                           height={calculateEditorHeight(cell.query)}
// // //                           defaultLanguage="sql"
// // //                           value={cell.query}
// // //                           onChange={(value) =>
// // //                             setCells((prev) =>
// // //                               prev.map((c) =>
// // //                                 c.id === cell.id ? { ...c, query: value || '' } : c
// // //                               )
// // //                             )
// // //                           }
// // //                           options={{
// // //                             minimap: { enabled: false },
// // //                             fontSize: 13,
// // //                             lineHeight: 1.5,
// // //                             padding: { top: 8, bottom: 8 },
// // //                             scrollBeyondLastLine: false,
// // //                           }}
// // //                         />
// // //                       </div>

// // //                       {cell.error && (
// // //                         <div className="mt-3 flex items-start px-4 py-3 bg-red-50 border border-red-100 rounded-lg">
// // //                           <AlertCircle className="h-4 w-4 text-red-500 mt-0.5" />
// // //                           <span className="text-xs text-red-600 ml-2">{cell.error}</span>
// // //                         </div>
// // //                       )}

// // //                       {cell.result.length > 0 && (
// // //                         <div className="mt-4 border rounded-lg bg-gray-50 overflow-x-auto">
// // //                           <table className="w-full text-xs">
// // //                             <thead>
// // //                               <tr className="bg-gray-100">
// // //                                 {cell.columns.map((col) => (
// // //                                   <th key={col.name} className="px-4 py-2 text-left font-medium text-gray-700 uppercase tracking-wider">
// // //                                     <div className="flex flex-col items-start">
// // //                                       <span>{col.name}</span>
// // //                                       <span style={{ fontSize: '10px', color: '#9CA3AF', fontWeight: '400', letterSpacing: '0.09em' }}>{col.type}</span>
// // //                                     </div>
// // //                                   </th>
// // //                                 ))}
// // //                               </tr>
// // //                             </thead>
// // //                             <tbody>
// // //                               {cell.result.map((row, idx) => (
// // //                                 <tr key={idx} className="hover:bg-gray-200">
// // //                                   {cell.columns.map((col) => (
// // //                                     <td key={col.name} className="px-4 py-2 text-gray-800">
// // //                                       {row[col.name] !== null && row[col.name] !== undefined ? row[col.name].toString() : 'NULL'}
// // //                                     </td>
// // //                                   ))}
// // //                                 </tr>
// // //                               ))}
// // //                             </tbody>
// // //                           </table>
// // //                         </div>
// // //                       )}
// // //                     </>
// // //                   ) : (
// // //                     <div className="prose">
// // //                       <div dangerouslySetInnerHTML={{ __html: cell.content }} />
// // //                     </div>
// // //                   )}
// // //                 </>
// // //               )}
// // //             </div>
// // //           </div>
// // //         ))}
// // //       </div>

// // //       <button
// // //         onClick={addCell}
// // //         className="flex items-center px-4 py-2 text-xs font-medium text-teal-700 bg-teal-50 rounded-md hover:bg-teal-100"
// // //         aria-label="Add cell"
// // //       >
// // //         <Plus className="h-4 w-4 mr-1" />
// // //         Add Cell
// // //       </button>

// // //       {/* Conditional Rendering for "After Train" State */}
// // //       {isTrained && (
// // //         <div className="mt-6 p-4 bg-green-50 border border-green-100 rounded-lg text-green-700">
// // //           Model training completed successfully! You can now view the Dashboard or make Predictions.
// // //         </div>
// // //       )}

// // //       {/* Render "Train Model" Button if Not Trained */}
// // //       {/* {!isTrained && (
// // //         <div className="mt-6">
// // //           <button
// // //             // onClick={handleTrainModel}
// // //             className="w-full flex items-center justify-center px-4 py-2 bg-teal-500 text-white text-sm font-medium rounded-md hover:bg-teal-600"
// // //             aria-label="Train model"
// // //           >
// // //             Train Model
// // //           </button>
// // //         </div>
// // //       )} */}
// // //     </div>
// // //   );
// // // };

// // // export default SQLNotebook;





// // import React, { useEffect, useState } from 'react';
// // import Editor from '@monaco-editor/react';
// // import { Play, ChevronDown, ChevronUp, AlertCircle, X, Plus, Loader2 } from 'lucide-react';

// // // Each column in the query result
// // interface Column {
// //   name: string;
// //   type: string;
// // }

// // // Each cell in our notebook
// // interface Cell {
// //   id: number;
// //   type: 'code' | 'markdown';
// //   content: string;
// //   query: string;
// //   result: any[];
// //   columns: Column[];
// //   error: string | null;
// //   isExpanded: boolean;
// //   executionTime: string | null;

// //   // Pagination states for large queries
// //   currentPage: number;
// //   pageSize: number;

// //   // In case we want a manual "loading" or "placeholder" for each cell
// //   isLoading?: boolean;
// // }

// // interface SQLNotebookProps {
// //   activeTab: string;
// //   notebookContent: {
// //     file_url: string;
// //     entity_column: string;
// //     target_column: string;
// //     features: string[];
// //     user_id: string;
// //     chat_id: string;
// //     isTrained: boolean;
// //     handleTrainModel: () => void;
// //     cells: any[]; // The cells array from the notebook
// // };
// // }
// // // Helper to ensure the input shape is actually a 'Cell'
// // function isCell(cell: any): cell is Cell {
// //   return cell !== null && (cell.type === 'code' || cell.type === 'markdown');
// // }

// // const SQLNotebook: React.FC<SQLNotebookProps> = ({ activeTab, notebookContent }) => {
// //   const { cells: notebookCells, isTrained } = notebookContent;
// //   const [cells, setCells] = useState<Cell[]>([]);
// //   const [loadingCellId, setLoadingCellId] = useState<number | null>(null);

// //   // On initial load, parse the notebook JSON and transform into our local state
// //   useEffect(() => {
// //     console.log('Received notebook content:', notebookContent);
// //     if (notebookCells && notebookCells.length > 0) {
// //       const initialCells = notebookCells.map((cell: any, index: number) => {
// //         if (cell.cell_type === 'code') {
// //           const query = Array.isArray(cell.source) ? cell.source.join('') : cell.source;
          
// //           let result: any[] = [];
// //           let columns: Column[] = [];
// //           let error: string | null = null;

// //           if (cell.outputs && cell.outputs.length > 0) {
// //             const output = cell.outputs[0];
// //             if (output.output_type === 'execute_result' && output.data) {
// //               const jsonData = output.data['application/json'];
// //               if (jsonData && Array.isArray(jsonData.rows) && Array.isArray(jsonData.columns)) {
// //                 result = jsonData.rows;
// //                 columns = jsonData.columns;
// //               }
// //             } else if (output.output_type === 'error') {
// //               error = output.evalue || 'Unknown error';
// //             }
// //           }

// //           return {
// //             id: index + 1,
// //             type: 'code' as 'code',
// //             content: '',
// //             query: query || '',
// //             result: result,
// //             columns: columns,
// //             error: error,
// //             isExpanded: true,
// //             executionTime: null,
// //             currentPage: 1,
// //             pageSize: 10,
// //             isLoading: false,
// //           };
// //         } else if (cell.cell_type === 'markdown') {
// //           const content = Array.isArray(cell.source) ? cell.source.join('') : cell.source;
// //           return {
// //             id: index + 1,
// //             type: 'markdown' as 'markdown',
// //             content: content,
// //             query: '',
// //             result: [],
// //             columns: [],
// //             error: null,
// //             isExpanded: true,
// //             executionTime: null,
// //             currentPage: 1,
// //             pageSize: 10,
// //             isLoading: false,
// //           };
// //         } else {
// //           return null;
// //         }
// //       }).filter(isCell);

// //       setCells(initialCells.filter(cell => cell !== null) as Cell[]);
// //     } else {
// //       // If no cells found, start with one empty code cell
// //       setCells([
// //         {
// //           id: 1,
// //           type: 'code',
// //           content: '',
// //           query: '',
// //           result: [],
// //           columns: [],
// //           error: null,
// //           isExpanded: true,
// //           executionTime: null,
// //           currentPage: 1,
// //           pageSize: 10,
// //           isLoading: false,
// //         }
// //       ]);
// //     }
// //   }, [notebookCells, notebookContent]);

// //   // Utility to calculate editor height based on line count
// //   const calculateEditorHeight = (content: string) => {
// //     const lineCount = (content.match(/\n/g) || []).length + 1;
// //     const baseHeight = 150;
// //     const lineHeight = 20;
// //     const maxHeight = 500;
// //     return `${Math.min(Math.max(baseHeight, lineCount * lineHeight), maxHeight)}px`;
// //   };

// //   // Execute the SQL query in a code cell
// //   const executeQuery = async (cellId: number) => {
// //     const cell = cells.find((c) => c.id === cellId);
// //     if (!cell || cell.type !== 'code') return;

// //     setLoadingCellId(cellId);
// //     updateCell(cellId, { isLoading: true, error: null, result: [], columns: [] });

// //     const startTime = Date.now();

// //     try {
// //       const response = await fetch(`http://localhost:8000/api/execute-sql/`, {
// //         method: 'POST',
// //         headers: {
// //           'Content-Type': 'application/json',
// //           // Provide your authentication token here if needed
// //           'Authorization': 'Token d36e47f0e5c0a356d35a7d6d407aab93f6b0d36b',
// //         },
// //         body: JSON.stringify({ query: cell.query }),
// //       });

// //       const endTime = Date.now();
// //       const timeTaken = endTime - startTime;
// //       const formattedTime = formatTime(timeTaken);

// //       if (!response.ok) {
// //         const errorData = await response.json().catch(() => ({ error: 'Unknown error occurred' }));
// //         throw new Error(errorData.error || 'Query execution failed');
// //       }

// //       const data = await response.json();
// //       if (
// //         data.columns.length > 0 &&
// //         data.rows.length > 0 &&
// //         data.columns.length !== Object.keys(data.rows[0]).length
// //       ) {
// //         throw new Error('Mismatch between columns and data.');
// //       }

// //       updateCell(cellId, {
// //         result: data.rows,
// //         columns: data.columns,
// //         error: null,
// //         executionTime: formattedTime,
// //       });
// //     } catch (err: any) {
// //       console.error(`Error executing query for cell ${cellId}:`, err);
// //       updateCell(cellId, {
// //         error: err.message || 'Unknown error',
// //         result: [],
// //         columns: [],
// //         executionTime: null,
// //       });
// //     } finally {
// //       setLoadingCellId(null);
// //       updateCell(cellId, { isLoading: false });
// //     }
// //   };

// //   // A small helper to update a single cell in the cells array
// //   const updateCell = (cellId: number, newProps: Partial<Cell>) => {
// //     setCells((prev) =>
// //       prev.map((c) => (c.id === cellId ? { ...c, ...newProps } : c))
// //     );
// //   };

// //   // Format time from ms to either "XXX ms" or "X.XX s"
// //   const formatTime = (ms: number): string => {
// //     if (ms < 1000) {
// //       return `${ms} ms`;
// //     } else {
// //       return `${(ms / 1000).toFixed(2)} s`;
// //     }
// //   };

// //   // Delete a cell from the list
// //   const deleteCell = (id: number) => {
// //     setCells((prev) => prev.filter((cell) => cell.id !== id));
// //   };

// //   // Collapse/Expand a cell
// //   const toggleExpand = (id: number) => {
// //     setCells((prev) =>
// //       prev.map((cell) =>
// //         cell.id === id ? { ...cell, isExpanded: !cell.isExpanded } : cell
// //       )
// //     );
// //   };

// //   // Add a new code cell
// //   const addCell = () => {
// //     setCells((prev) => [
// //       ...prev,
// //       {
// //         id: prev.length + 1,
// //         type: 'code',
// //         content: '',
// //         query: '',
// //         result: [],
// //         columns: [],
// //         error: null,
// //         isExpanded: true,
// //         executionTime: null,
// //         currentPage: 1,
// //         pageSize: 10,
// //         isLoading: false,
// //       },
// //     ]);
// //   };

// //   // A function to handle pagination page changes
// //   const handlePageChange = (cellId: number, newPage: number) => {
// //     setCells((prev) =>
// //       prev.map((c) =>
// //         c.id === cellId
// //           ? { ...c, currentPage: newPage }
// //           : c
// //       )
// //     );
// //   };

// // const renderPagination = (cell: Cell) => {
// //   const totalRows = cell.result.length;
// //   const totalPages = Math.ceil(totalRows / cell.pageSize);
// //   if (totalPages <= 1) return null; // No pagination if only one page

// //   const { currentPage } = cell;

// //   const handleNext = () => {
// //     if (currentPage < totalPages) {
// //       handlePageChange(cell.id, currentPage + 1);
// //     }
// //   };

// //   const handlePrev = () => {
// //     if (currentPage > 1) {
// //       handlePageChange(cell.id, currentPage - 1);
// //     }
// //   };

// //   return (
// //     <div className="flex items-center justify-between p-2 text-xs text-gray-700">
// //       <div className="font-semibold text-gray-800">
// //         Showing rows {(currentPage - 1) * cell.pageSize + 1} to{' '}
// //         {Math.min(currentPage * cell.pageSize, totalRows)} of {totalRows}
// //       </div>
// //       <div className="flex items-center space-x-2">
// //         <button
// //           onClick={handlePrev}
// //           disabled={currentPage === 1}
// //           className="px-2 py-1 border rounded disabled:opacity-50 font-semibold text-gray-800"
// //         >
// //           Prev
// //         </button>
// //         <span className="font-semibold text-gray-800">
// //           Page {currentPage} of {totalPages}
// //         </span>
// //         <button
// //           onClick={handleNext}
// //           disabled={currentPage === totalPages}
// //           className="px-2 py-1 border rounded disabled:opacity-50 font-semibold text-gray-800"
// //         >
// //           Next
// //         </button>
// //       </div>
// //     </div>
// //   );
// // };


// //   return (
// //     <div className="w-full space-y-4 p-6">
// //       <div className="text-lg font-medium text-center pb-3 border-b border-teal-700">
// //         <span className="bg-gradient-to-r from-teal-600 to-emerald-500 bg-clip-text text-transparent">
// //           {activeTab === 'entity_target_notebook' && 'Entity & Target Analysis Notebook'}
// //           {activeTab === 'features_notebook' && 'Features Analysis Notebook'}
// //         </span>
// //       </div>

// //       <div className="space-y-4">
// //         {cells.map((cell) => (
// //           <div
// //             key={cell.id}
// //             className="bg-white rounded-lg border border-gray-100 shadow-sm hover:shadow-md group"
// //           >
// //             <div className="p-4">
// //               <div className="flex items-center justify-between mb-2">
// //                 <div className="flex items-center space-x-2">
// //                   <span className="text-xs font-medium text-gray-400">
// //                     {cell.type === 'code' ? `Code Cell ${cell.id}` : `Markdown Cell ${cell.id}`}
// //                   </span>
// //                   <button
// //                     onClick={() => toggleExpand(cell.id)}
// //                     className="p-1 hover:bg-gray-100 rounded-md"
// //                     aria-label={cell.isExpanded ? 'Collapse cell' : 'Expand cell'}
// //                   >
// //                     {cell.isExpanded ? (
// //                       <ChevronUp className="h-4 w-4 text-gray-400" />
// //                     ) : (
// //                       <ChevronDown className="h-4 w-4 text-gray-400" />
// //                     )}
// //                   </button>
// //                 </div>
// //                 <div className="flex items-center space-x-2">
// //                   {cell.type === 'code' && (
// //                     <button
// //                       onClick={() => executeQuery(cell.id)}
// //                       className="flex items-center px-3 py-1.5 text-xs font-medium text-teal-700 bg-teal-50 rounded-md hover:bg-teal-100"
// //                       disabled={loadingCellId === cell.id}
// //                       aria-label="Run query"
// //                     >
// //                       {cell.isLoading ? (
// //                         <Loader2 className="h-3 w-3 mr-1 animate-spin" />
// //                       ) : (
// //                         <Play className="h-3 w-3 mr-1" />
// //                       )}
// //                       Run
// //                     </button>
// //                   )}
// //                   {cell.executionTime && (
// //                     <span className="text-xs text-gray-500 ml-2">
// //                       ({cell.executionTime})
// //                     </span>
// //                   )}
// //                   <button
// //                     onClick={() => deleteCell(cell.id)}
// //                     className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-gray-100 rounded-md"
// //                     aria-label="Delete cell"
// //                   >
// //                     <X className="h-4 w-4" />
// //                   </button>
// //                 </div>
// //               </div>

// //               {cell.isExpanded && (
// //                 <>
// //                   {cell.type === 'code' ? (
// //                     <>
// //                       {/* Editor */}
// //                       <div className="border rounded-lg overflow-hidden bg-gray-50">
// //                         <Editor
// //                           height={calculateEditorHeight(cell.query)}
// //                           defaultLanguage="sql"
// //                           value={cell.query}
// //                           onChange={(value) =>
// //                             updateCell(cell.id, { query: value || '' })
// //                           }
// //                           options={{
// //                             minimap: { enabled: false },
// //                             fontSize: 13,
// //                             lineHeight: 1.5,
// //                             padding: { top: 8, bottom: 8 },
// //                             scrollBeyondLastLine: false,
// //                           }}
// //                         />
// //                       </div>

// //                       {/* Errors */}
// //                       {cell.error && (
// //                         <div className="mt-3 flex items-start px-4 py-3 bg-red-50 border border-red-100 rounded-lg">
// //                           <AlertCircle className="h-4 w-4 text-red-500 mt-0.5" />
// //                           <span className="text-xs text-red-600 ml-2">{cell.error}</span>
// //                         </div>
// //                       )}

// //                       {/* Results Table */}
// //                       {cell.result.length > 0 && (
// //                         <div className="mt-4 border rounded-lg bg-gray-50 overflow-x-auto">
// //                           {renderPagination(cell)}
// //                           <table className="w-full text-xs">
// //                             <thead>
// //                               <tr className="bg-gray-100">
// //                                 {cell.columns.map((col) => (
// //                                   <th
// //                                     key={col.name}
// //                                     className="px-4 py-2 text-left font-medium text-gray-700 uppercase tracking-wider"
// //                                   >
// //                                     <div className="flex flex-col items-start">
// //                                       <span>{col.name}</span>
// //                                       <span style={{ fontSize: '10px', color: '#9CA3AF', fontWeight: '400', letterSpacing: '0.09em' }}>
// //                                         {col.type}
// //                                       </span>
// //                                     </div>
// //                                   </th>
// //                                 ))}
// //                               </tr>
// //                             </thead>
// //                             <tbody>
// //                               {cell.result
// //                                 .slice(
// //                                   (cell.currentPage - 1) * cell.pageSize,
// //                                   cell.currentPage * cell.pageSize
// //                                 )
// //                                 .map((row, idx) => (
// //                                   <tr key={idx} className="hover:bg-gray-200">
// //                                     {cell.columns.map((col) => (
// //                                       <td key={col.name} className="px-4 py-2 text-gray-800">
// //                                         {row[col.name] !== null && row[col.name] !== undefined
// //                                           ? row[col.name].toString()
// //                                           : 'NULL'}
// //                                       </td>
// //                                     ))}
// //                                   </tr>
// //                                 ))}
// //                             </tbody>
// //                           </table>
// //                           {/* {renderPagination(cell)} */}
// //                         </div>
// //                       )}
// //                     </>
// //                   ) : (
// //                     // Markdown cell
// //                     <div className="prose">
// //                       <div dangerouslySetInnerHTML={{ __html: cell.content }} />
// //                     </div>
// //                   )}
// //                 </>
// //               )}
// //             </div>
// //           </div>
// //         ))}
// //       </div>

// //       <button
// //         onClick={addCell}
// //         className="flex items-center px-4 py-2 text-xs font-medium text-teal-700 bg-teal-50 rounded-md hover:bg-teal-100"
// //         aria-label="Add cell"
// //       >
// //         <Plus className="h-4 w-4 mr-1" />
// //         Add Cell
// //       </button>

// //       {/* Conditionally show a notice if the model is trained */}
// //       {isTrained && (
// //         <div className="mt-6 p-4 bg-green-50 border border-green-100 rounded-lg text-green-700">
// //           Model training completed successfully! You can now view the Dashboard or make Predictions.
// //         </div>
// //       )}
// //     </div>
// //   );
// // };

// // export default SQLNotebook;





// import React, { useEffect, useState } from 'react';
// import Editor from '@monaco-editor/react';
// import { Play, ChevronDown, ChevronUp, AlertCircle, X, Plus, Loader2 } from 'lucide-react';

// // Each column in the query result
// interface Column {
//   name: string;
//   type: string;
// }

// // Each cell in our notebook
// interface Cell {
//   id: number;
//   type: 'code' | 'markdown';
//   content: string;
//   query: string;
//   result: any[];
//   columns: Column[];
//   error: string | null;
//   isExpanded: boolean;
//   executionTime: string | null;

//   // Pagination states for large queries
//   currentPage: number;
//   pageSize: number;

//   // Loading flag for the "Run" button
//   isLoading?: boolean;
// }

// interface SQLNotebookProps {
//   activeTab: string;
//   notebookContent: {
//     file_url: string;
//     entity_column: string;
//     target_column: string;
//     features: string[];
//     user_id: string;
//     chat_id: string;
//     isTrained: boolean;
//     handleTrainModel: () => void;
//     cells: any[]; // The cells array from the notebook
// };
// }
// // Helper to ensure the input shape is actually a 'Cell'
// function isCell(cell: any): cell is Cell {
//   return cell !== null && (cell.type === 'code' || cell.type === 'markdown');
// }

// const SQLNotebook: React.FC<SQLNotebookProps> = ({ activeTab, notebookContent }) => {
//   const { cells: notebookCells, isTrained } = notebookContent;
//   const [cells, setCells] = useState<Cell[]>([]);
//   const [loadingCellId, setLoadingCellId] = useState<number | null>(null);

//   // On initial load, parse the notebook JSON into our local "cells" state
//   useEffect(() => {
//     console.log('Received notebook content:', notebookContent);
//     if (notebookCells && notebookCells.length > 0) {
//       const initialCells = notebookCells.map((cell: any, index: number) => {
//         // If it is a code cell:
//         if (cell.cell_type === 'code') {
//           const query = Array.isArray(cell.source) ? cell.source.join('') : cell.source;

//           let result: any[] = [];
//           let columns: Column[] = [];
//           let error: string | null = null;

//           // Check outputs for any existing results or errors
//           if (cell.outputs && cell.outputs.length > 0) {
//             const output = cell.outputs[0];
//             if (output.output_type === 'execute_result' && output.data) {
//               const jsonData = output.data['application/json'];
//               if (jsonData && Array.isArray(jsonData.rows) && Array.isArray(jsonData.columns)) {
//                 result = jsonData.rows;
//                 columns = jsonData.columns;
//               }
//             } else if (output.output_type === 'error') {
//               error = output.evalue || 'Unknown error';
//             }
//           }

//           return {
//             id: index + 1,
//             type: 'code' as 'code',
//             content: '',
//             query: query || '',
//             result,
//             columns,
//             error,
//             isExpanded: true,
//             executionTime: null,
//             currentPage: 1,
//             pageSize: 10,
//             isLoading: false,
//           };
//         }
//         // If it is a markdown cell:
//         else if (cell.cell_type === 'markdown') {
//           const content = Array.isArray(cell.source) ? cell.source.join('') : cell.source;
//           return {
//             id: index + 1,
//             type: 'markdown' as 'markdown',
//             content,
//             query: '',
//             result: [],
//             columns: [],
//             error: null,
//             isExpanded: true,
//             executionTime: null,
//             currentPage: 1,
//             pageSize: 10,
//             isLoading: false,
//           };
//         }
//         // Otherwise, ignore
//         return null;
//       }).filter(isCell);

//       setCells(initialCells.filter(cell => cell !== null) as Cell[]);
//     } else {
//       // If no cells exist, create one empty code cell
//       setCells([
//         {
//           id: 1,
//           type: 'code',
//           content: '',
//           query: '',
//           result: [],
//           columns: [],
//           error: null,
//           isExpanded: true,
//           executionTime: null,
//           currentPage: 1,
//           pageSize: 10,
//           isLoading: false,
//         },
//       ]);
//     }
//   }, [notebookCells, notebookContent]);

//   // Helper to compute dynamic editor height
//   const calculateEditorHeight = (content: string) => {
//     const lineCount = (content.match(/\n/g) || []).length + 1;
//     const baseHeight = 150;
//     const lineHeight = 20;
//     const maxHeight = 500;
//     return `${Math.min(Math.max(baseHeight, lineCount * lineHeight), maxHeight)}px`;
//   };

//   // Execute the query in a code cell by calling our backend
//   const executeQuery = async (cellId: number) => {
//     const cell = cells.find((c) => c.id === cellId);
//     if (!cell || cell.type !== 'code') return;

//     setLoadingCellId(cellId);
//     updateCell(cellId, { isLoading: true, error: null, result: [], columns: [] });

//     const startTime = Date.now();

//     try {
//       const response = await fetch('http://localhost:8000/api/execute-sql/', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           // Provide your authentication token here if your backend requires it
//           'Authorization': 'Token d36e47f0e5c0a356d35a7d6d407aab93f6b0d36b',
//         },
//         body: JSON.stringify({ query: cell.query }),
//       });

//       const endTime = Date.now();
//       const timeTaken = endTime - startTime;
//       const formattedTime = formatTime(timeTaken);

//       if (!response.ok) {
//         const errorData = await response.json().catch(() => ({ error: 'Unknown error occurred' }));
//         throw new Error(errorData.error || 'Query execution failed');
//       }

//       const data = await response.json();

//       // Additional sanity check for column/data mismatch
//       if (
//         data.columns.length > 0 &&
//         data.rows.length > 0 &&
//         data.columns.length !== Object.keys(data.rows[0]).length
//       ) {
//         throw new Error('Mismatch between columns and data.');
//       }

//       // If success, store the new results and columns
//       updateCell(cellId, {
//         result: data.rows,
//         columns: data.columns,
//         error: null,
//         executionTime: formattedTime,
//       });
//     } catch (err: any) {
//       console.error(`Error executing query for cell ${cellId}:`, err);
//       updateCell(cellId, {
//         error: err.message || 'Unknown error',
//         result: [],
//         columns: [],
//         executionTime: null,
//       });
//     } finally {
//       setLoadingCellId(null);
//       updateCell(cellId, { isLoading: false });
//     }
//   };

//   // Helper to update a single cell's data in our array
//   const updateCell = (cellId: number, newProps: Partial<Cell>) => {
//     setCells((prev) =>
//       prev.map((c) => (c.id === cellId ? { ...c, ...newProps } : c))
//     );
//   };

//   // Format time from ms to a user-friendly string
//   const formatTime = (ms: number) => {
//     if (ms < 1000) return `${ms} ms`;
//     return `${(ms / 1000).toFixed(2)} s`;
//   };

//   // Delete a cell
//   const deleteCell = (id: number) => {
//     setCells((prev) => prev.filter((cell) => cell.id !== id));
//   };

//   // Toggle expand/collapse
//   const toggleExpand = (id: number) => {
//     setCells((prev) =>
//       prev.map((cell) =>
//         cell.id === id ? { ...cell, isExpanded: !cell.isExpanded } : cell
//       )
//     );
//   };

//   // Add a new code cell at the bottom
//   const addCell = () => {
//     setCells((prev) => [
//       ...prev,
//       {
//         id: prev.length + 1,
//         type: 'code',
//         content: '',
//         query: '',
//         result: [],
//         columns: [],
//         error: null,
//         isExpanded: true,
//         executionTime: null,
//         currentPage: 1,
//         pageSize: 10,
//         isLoading: false,
//       },
//     ]);
//   };

//   // Handle page changes in pagination
//   const handlePageChange = (cellId: number, newPage: number) => {
//     setCells((prev) =>
//       prev.map((c) =>
//         c.id === cellId
//           ? { ...c, currentPage: newPage }
//           : c
//       )
//     );
//   };

//   // Render the pagination controls (top-only)
//   // const renderPagination = (cell: Cell) => {
//   //   const totalRows = cell.result.length;
//   //   const totalPages = Math.ceil(totalRows / cell.pageSize);
//   //   if (totalPages <= 1) return null; // If only 1 page, no need for pagination

//   //   const { currentPage } = cell;

//   //   const handleNext = () => {
//   //     if (currentPage < totalPages) {
//   //       handlePageChange(cell.id, currentPage + 1);
//   //     }
//   //   };

//   //   const handlePrev = () => {
//   //     if (currentPage > 1) {
//   //       handlePageChange(cell.id, currentPage - 1);
//   //     }
//   //   };

//   //   return (
//   //     <div className="flex items-center justify-between p-2 text-xs border border-teal-200 rounded bg-teal-50 text-teal-700 mb-2">
//   //       <div>
//   //         Showing rows {(currentPage - 1) * cell.pageSize + 1} to{' '}
//   //         {Math.min(currentPage * cell.pageSize, totalRows)} of {totalRows}
//   //       </div>
//   //       <div className="flex items-center space-x-2">
//   //         <button
//   //           onClick={handlePrev}
//   //           disabled={currentPage === 1}
//   //           className="px-2 py-1 border rounded disabled:opacity-50 border-teal-300 hover:bg-teal-100"
//   //         >
//   //           Prev
//   //         </button>
//   //         <span>
//   //           Page {currentPage} of {totalPages}
//   //         </span>
//   //         <button
//   //           onClick={handleNext}
//   //           disabled={currentPage === totalPages}
//   //           className="px-2 py-1 border rounded disabled:opacity-50 border-teal-300 hover:bg-teal-100"
//   //         >
//   //           Next
//   //         </button>
//   //       </div>
//   //     </div>
//   //   );
//   // };

//   // Render pagination controls
// const renderPagination = (cell: Cell) => {
//   const totalRows = cell.result.length;
//   const totalPages = Math.ceil(totalRows / cell.pageSize);
//   if (totalPages <= 1) return null; // No pagination if only one page

//   const { currentPage } = cell;

//   const handleNext = () => {
//     if (currentPage < totalPages) {
//       handlePageChange(cell.id, currentPage + 1);
//     }
//   };

//   const handlePrev = () => {
//     if (currentPage > 1) {
//       handlePageChange(cell.id, currentPage - 1);
//     }
//   };

//   return (
//     <div className="flex items-center justify-between p-2 text-xs text-gray-700">
//       <div className="font-semibold text-gray-800">
//         Showing rows {(currentPage - 1) * cell.pageSize + 1} to{' '}
//         {Math.min(currentPage * cell.pageSize, totalRows)} of {totalRows}
//       </div>
//       <div className="flex items-center space-x-2">
//         <button
//           onClick={handlePrev}
//           disabled={currentPage === 1}
//           className="px-2 py-1 border rounded disabled:opacity-50 font-semibold text-gray-800"
//         >
//           Prev
//         </button>
//         <span className="font-semibold text-gray-800">
//           Page {currentPage} of {totalPages}
//         </span>
//         <button
//           onClick={handleNext}
//           disabled={currentPage === totalPages}
//           className="px-2 py-1 border rounded disabled:opacity-50 font-semibold text-gray-800"
//         >
//           Next
//         </button>
//       </div>
//     </div>
//   );
// };


//   return (
//     <div className="w-full space-y-4 p-6">
//       {/* Header */}
//       <div className="text-lg font-medium text-center pb-3 border-b border-teal-700">
//         <span className="bg-gradient-to-r from-teal-600 to-emerald-500 bg-clip-text text-transparent">
//           {activeTab === 'entity_target_notebook' && 'Entity & Target Analysis Notebook'}
//           {activeTab === 'features_notebook' && 'Features Analysis Notebook'}
//         </span>
//       </div>

//       <div className="space-y-4">
//         {cells.map((cell) => (
//           <div
//             key={cell.id}
//             className="bg-white rounded-lg border border-gray-100 shadow-sm hover:shadow-md group"
//           >
//             <div className="p-4">
//               {/* Cell Header */}
//               <div className="flex items-center justify-between mb-2">
//                 <div className="flex items-center space-x-2">
//                   <span className="text-xs font-medium text-gray-400">
//                     {cell.type === 'code' ? `Code Cell ${cell.id}` : `Markdown Cell ${cell.id}`}
//                   </span>
//                   <button
//                     onClick={() => toggleExpand(cell.id)}
//                     className="p-1 hover:bg-gray-100 rounded-md"
//                     aria-label={cell.isExpanded ? 'Collapse cell' : 'Expand cell'}
//                   >
//                     {cell.isExpanded ? (
//                       <ChevronUp className="h-4 w-4 text-gray-400" />
//                     ) : (
//                       <ChevronDown className="h-4 w-4 text-gray-400" />
//                     )}
//                   </button>
//                 </div>

//                 <div className="flex items-center space-x-2">
//                   {cell.type === 'code' && (
//                     <button
//                       onClick={() => executeQuery(cell.id)}
//                       className="flex items-center px-3 py-1.5 text-xs font-medium text-teal-700 bg-teal-50 rounded-md hover:bg-teal-100"
//                       disabled={loadingCellId === cell.id}
//                       aria-label="Run query"
//                     >
//                       {cell.isLoading ? (
//                         <Loader2 className="h-3 w-3 mr-1 animate-spin" />
//                       ) : (
//                         <Play className="h-3 w-3 mr-1" />
//                       )}
//                       Run
//                     </button>
//                   )}
//                   {cell.executionTime && (
//                     <span className="text-xs text-gray-500 ml-2">
//                       ({cell.executionTime})
//                     </span>
//                   )}
//                   <button
//                     onClick={() => deleteCell(cell.id)}
//                     className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-gray-100 rounded-md"
//                     aria-label="Delete cell"
//                   >
//                     <X className="h-4 w-4" />
//                   </button>
//                 </div>
//               </div>

//               {/* Cell Body */}
//               {cell.isExpanded && (
//                 <>
//                   {cell.type === 'code' ? (
//                     <>
//                       {/* SQL Editor */}
//                       <div className="border rounded-lg overflow-hidden bg-gray-50">
//                         <Editor
//                           height={calculateEditorHeight(cell.query)}
//                           defaultLanguage="sql"
//                           value={cell.query}
//                           onChange={(value) =>
//                             updateCell(cell.id, { query: value || '' })
//                           }
//                           options={{
//                             minimap: { enabled: false },
//                             fontSize: 13,
//                             lineHeight: 1.5,
//                             padding: { top: 8, bottom: 8 },
//                             scrollBeyondLastLine: false,
//                           }}
//                         />
//                       </div>

//                       {/* Errors */}
//                       {cell.error && (
//                         <div className="mt-3 flex items-start px-4 py-3 bg-red-50 border border-red-100 rounded-lg">
//                           <AlertCircle className="h-4 w-4 text-red-500 mt-0.5" />
//                           <span className="text-xs text-red-600 ml-2">{cell.error}</span>
//                         </div>
//                       )}

//                       {/* Results Table */}
//                       {cell.result.length > 0 && (
//                         <div className="mt-4 border rounded-lg bg-gray-50 overflow-x-auto">
//                           {renderPagination(cell)}
//                           <table className="w-full text-xs">
//                             <thead>
//                               <tr className="bg-gray-100">
//                                 {cell.columns.map((col) => (
//                                   <th
//                                     key={col.name}
//                                     className="px-4 py-2 text-left font-medium text-gray-700 uppercase tracking-wider"
//                                   >
//                                     <div className="flex flex-col items-start">
//                                       <span>{col.name}</span>
//                                       <span
//                                         style={{
//                                           fontSize: '10px',
//                                           color: '#9CA3AF',
//                                           fontWeight: '400',
//                                           letterSpacing: '0.09em',
//                                         }}
//                                       >
//                                         {col.type}
//                                       </span>
//                                     </div>
//                                   </th>
//                                 ))}
//                               </tr>
//                             </thead>
//                             <tbody>
//                               {cell.result
//                                 .slice(
//                                   (cell.currentPage - 1) * cell.pageSize,
//                                   cell.currentPage * cell.pageSize
//                                 )
//                                 .map((row, idx) => (
//                                   <tr key={idx} className="hover:bg-gray-200">
//                                     {cell.columns.map((col) => (
//                                       <td key={col.name} className="px-4 py-2 text-gray-800">
//                                         {row[col.name] !== null && row[col.name] !== undefined
//                                           ? row[col.name].toString()
//                                           : 'NULL'}
//                                       </td>
//                                     ))}
//                                   </tr>
//                                 ))}
//                             </tbody>
//                           </table>
//                         </div>
//                       )}
//                     </>
//                   ) : (
//                     // Markdown cell
//                     <div className="prose">
//                       <div dangerouslySetInnerHTML={{ __html: cell.content }} />
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
//         aria-label="Add cell"
//       >
//         <Plus className="h-4 w-4 mr-1" />
//         Add Cell
//       </button>

//       {/* If model is trained, show a success message */}
//       {isTrained && (
//         <div className="mt-6 p-4 bg-green-50 border border-green-100 rounded-lg text-green-700">
//           Model training completed successfully! You can now view the Dashboard or make Predictions.
//         </div>
//       )}
//     </div>
//   );
// };

// export default SQLNotebook;




















// import React, {
//   useEffect,
//   useState,
//   forwardRef,
//   useImperativeHandle,
//   useRef
// } from 'react';
// import Editor from '@monaco-editor/react';
// import {
//   Play,
//   ChevronDown,
//   ChevronUp,
//   AlertCircle,
//   X,
//   Plus,
//   Loader2
// } from 'lucide-react';

// // Each column in the query result
// interface Column {
//   name: string;
//   type: string;
// }

// interface Cell {
//   id: number;
//   type: 'code' | 'markdown';
//   content: string;
//   query: string;
//   result: any[];
//   columns: Column[];
//   error: string | null;
//   isExpanded: boolean;
//   executionTime: string | null;

//   // Pagination
//   currentPage: number;
//   pageSize: number;

//   // Loading state
//   isLoading?: boolean;
// }

// interface SQLNotebookProps {
//   activeTab: string;
//   notebookContent: {
//     file_url: string;
//     entity_column: string;
//     target_column: string;
//     features: string[];
//     user_id: string;
//     chat_id: string;
//     isTrained: boolean;
//     handleTrainModel: () => void;
//     cells: any[];
//   };
// }

// // We define a new type for the "imperative handle"
// // so the parent can call .runAllCellsAndGetResults() on the ref
// export interface SQLNotebookRef {
//   runAllCellsAndGetResults: () => Promise<
//     Array<{
//       cellId: number;
//       query: string;
//       columns: Column[];
//       rows: any[];
//     }>
//   >;
// }

// // We'll wrap the component in `forwardRef` so we can pass a ref from the parent
// const SQLNotebook = forwardRef<SQLNotebookRef, SQLNotebookProps>(
//   ({ activeTab, notebookContent }, ref) => {
//     const { cells: notebookCells, isTrained } = notebookContent;

//     const [cells, setCells] = useState<Cell[]>([]);
//     const [loadingCellId, setLoadingCellId] = useState<number | null>(null);

//     // On initial load, parse the notebook JSON
//     useEffect(() => {
//       console.log('Received notebook content:', notebookContent);
//       if (notebookCells && notebookCells.length > 0) {
//         const initialCells = notebookCells.map((cell: any, index: number) => {
//           if (cell.cell_type === 'code') {
//             const query = Array.isArray(cell.source) ? cell.source.join('') : cell.source;

//             let result: any[] = [];
//             let columns: Column[] = [];
//             let error: string | null = null;

//             if (cell.outputs && cell.outputs.length > 0) {
//               const output = cell.outputs[0];
//               if (output.output_type === 'execute_result' && output.data) {
//                 const jsonData = output.data['application/json'];
//                 if (jsonData && Array.isArray(jsonData.rows) && Array.isArray(jsonData.columns)) {
//                   result = jsonData.rows;
//                   columns = jsonData.columns;
//                 }
//               } else if (output.output_type === 'error') {
//                 error = output.evalue || 'Unknown error';
//               }
//             }

//             return {
//               id: index + 1,
//               type: 'code' as 'code',
//               content: '',
//               query: query || '',
//               result,
//               columns,
//               error,
//               isExpanded: true,
//               executionTime: null,
//               currentPage: 1,
//               pageSize: 10,
//               isLoading: false,
//             };
//           } else if (cell.cell_type === 'markdown') {
//             const content = Array.isArray(cell.source) ? cell.source.join('') : cell.source;
//             return {
//               id: index + 1,
//               type: 'markdown' as 'markdown',
//               content,
//               query: '',
//               result: [],
//               columns: [],
//               error: null,
//               isExpanded: true,
//               executionTime: null,
//               currentPage: 1,
//               pageSize: 10,
//               isLoading: false,
//             };
//           }
//           return null;
//         }).filter((c: any) => c !== null);

        
//         setCells(initialCells.filter(cell => cell !== null) as Cell[]);

//       } else {
//         setCells([
//           {
//             id: 1,
//             type: 'code',
//             content: '',
//             query: '',
//             result: [],
//             columns: [],
//             error: null,
//             isExpanded: true,
//             executionTime: null,
//             currentPage: 1,
//             pageSize: 10,
//             isLoading: false,
//           },
//         ]);
//       }
//     }, [notebookCells, notebookContent]);


//       // Helper to compute dynamic editor height
//   const calculateEditorHeight = (content: string) => {
//     const lineCount = (content.match(/\n/g) || []).length + 1;
//     const baseHeight = 150;
//     const lineHeight = 20;
//     const maxHeight = 500;
//     return `${Math.min(Math.max(baseHeight, lineCount * lineHeight), maxHeight)}px`;
//   };

//     // ---------------
//     // The existing single-cell run
//     // ---------------
//     const executeQuery = async (cellId: number) => {
//       const cell = cells.find((c) => c.id === cellId);
//       if (!cell || cell.type !== 'code') return;

//       setLoadingCellId(cellId);
//       updateCell(cellId, { isLoading: true, error: null, result: [], columns: [] });

//       const startTime = Date.now();

//       try {
//         const response = await fetch('http://localhost:8000/api/execute-sql/', {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//             'Authorization': 'Token d36e47f0e5c0a356d35a7d6d407aab93f6b0d36b',
//           },
//           body: JSON.stringify({ query: cell.query }),
//         });

//         const endTime = Date.now();
//         const timeTaken = endTime - startTime;
//         const formattedTime = formatTime(timeTaken);

//         if (!response.ok) {
//           const errorData = await response.json().catch(() => ({ error: 'Unknown error occurred' }));
//           throw new Error(errorData.error || 'Query execution failed');
//         }

//         const data = await response.json();

//         if (
//           data.columns.length > 0 &&
//           data.rows.length > 0 &&
//           data.columns.length !== Object.keys(data.rows[0]).length
//         ) {
//           throw new Error('Mismatch between columns and data.');
//         }

//         updateCell(cellId, {
//           result: data.rows,
//           columns: data.columns,
//           error: null,
//           executionTime: formattedTime,
//         });
//       } catch (err: any) {
//         console.error(`Error executing query for cell ${cellId}:`, err);
//         updateCell(cellId, {
//           error: err.message || 'Unknown error',
//           result: [],
//           columns: [],
//           executionTime: null,
//         });
//       } finally {
//         setLoadingCellId(null);
//         updateCell(cellId, { isLoading: false });
//       }
//     };

//     // ---------------
//     // NEW: runAllCellsAndGetResults
//     // ---------------
//     const runAllCellsAndGetResults = async () => {
//       // We'll gather results in an array
//       const results: Array<{
//         cellId: number;
//         query: string;
//         columns: Column[];
//         rows: any[];
//       }> = [];

//       // We only run "code" cells
//       for (let i = 0; i < cells.length; i++) {
//         const cell = cells[i];
//         if (cell.type === 'code') {
//           // Force run the cell
//           await executeQuery(cell.id); 
//           // After the run, get the updated cell from state
//           const updatedCell = getCellById(cell.id);
//           if (updatedCell) {
//             results.push({
//               cellId: updatedCell.id,
//               query: updatedCell.query,
//               columns: updatedCell.columns,
//               rows: updatedCell.result,
//             });
//           }
//         }
//       }

//       return results;
//     };

//     // We'll expose runAllCellsAndGetResults via an imperative handle
//     useImperativeHandle(ref, () => ({
//       runAllCellsAndGetResults,
//     }));

//     // Helper function to get the latest cell from state
//     const getCellById = (id: number) => {
//       return cells.find((c) => c.id === id);
//     };

//     // Helper to update cell in state
//     const updateCell = (cellId: number, newProps: Partial<Cell>) => {
//       setCells((prev) =>
//         prev.map((c) => (c.id === cellId ? { ...c, ...newProps } : c))
//       );
//     };

//     const formatTime = (ms: number) => {
//       if (ms < 1000) {
//         return `${ms} ms`;
//       }
//       return `${(ms / 1000).toFixed(2)} s`;
//     };

//     const deleteCell = (id: number) => {
//       setCells((prev) => prev.filter((cell) => cell.id !== id));
//     };

//     const toggleExpand = (id: number) => {
//       setCells((prev) =>
//         prev.map((cell) =>
//           cell.id === id ? { ...cell, isExpanded: !cell.isExpanded } : cell
//         )
//       );
//     };

//     const addCell = () => {
//       setCells((prev) => [
//         ...prev,
//         {
//           id: prev.length + 1,
//           type: 'code',
//           content: '',
//           query: '',
//           result: [],
//           columns: [],
//           error: null,
//           isExpanded: true,
//           executionTime: null,
//           currentPage: 1,
//           pageSize: 10,
//           isLoading: false,
//         },
//       ]);
//     };

//     const handlePageChange = (cellId: number, newPage: number) => {
//       setCells((prev) =>
//         prev.map((c) =>
//           c.id === cellId
//             ? { ...c, currentPage: newPage }
//             : c
//         )
//       );
//     };

//     const renderPagination = (cell: Cell) => {
//       const totalRows = cell.result.length;
//       const totalPages = Math.ceil(totalRows / cell.pageSize);
//       if (totalPages <= 1) return null;

//       const { currentPage } = cell;

//       const handleNext = () => {
//         if (currentPage < totalPages) {
//           handlePageChange(cell.id, currentPage + 1);
//         }
//       };

//       const handlePrev = () => {
//         if (currentPage > 1) {
//           handlePageChange(cell.id, currentPage - 1);
//         }
//       };

//       return (
//         <div className="flex items-center justify-between p-2 text-xs text-gray-700">
//           <div className="font-semibold text-gray-800">
//             Showing rows {(currentPage - 1) * cell.pageSize + 1} to{' '}
//             {Math.min(currentPage * cell.pageSize, totalRows)} of {totalRows}
//           </div>
//           <div className="flex items-center space-x-2">
//             <button
//               onClick={handlePrev}
//               disabled={currentPage === 1}
//               className="px-2 py-1 border rounded disabled:opacity-50 font-semibold text-gray-800"
//             >
//               Prev
//             </button>
//             <span className="font-semibold text-gray-800">
//               Page {currentPage} of {totalPages}
//             </span>
//             <button
//               onClick={handleNext}
//               disabled={currentPage === totalPages}
//               className="px-2 py-1 border rounded disabled:opacity-50 font-semibold text-gray-800"
//             >
//               Next
//             </button>
//           </div>
//         </div>
//       );
//     };

   
//     return (
//       <div className="w-full space-y-4 p-6">
//         {/* Header */}
//         <div className="text-lg font-medium text-center pb-3 border-b border-teal-700">
//           <span className="bg-gradient-to-r from-teal-600 to-emerald-500 bg-clip-text text-transparent">
//             {activeTab === 'entity_target_notebook' && 'Entity & Target Analysis Notebook'}
//             {activeTab === 'features_notebook' && 'Features Analysis Notebook'}
//             {activeTab === 'time_based_notebook' && 'Time-Based Analysis Notebook'}
//           </span>
//         </div>

//         <div className="space-y-4">
//           {cells.map((cell) => (
//             <div
//               key={cell.id}
//               className="bg-white rounded-lg border border-gray-100 shadow-sm hover:shadow-md group"
//             >
//               <div className="p-4">
//                 {/* Cell Header */}
//                 <div className="flex items-center justify-between mb-2">
//                   <div className="flex items-center space-x-2">
//                     <span className="text-xs font-medium text-gray-400">
//                       {cell.type === 'code' ? `Code Cell ${cell.id}` : `Markdown Cell ${cell.id}`}
//                     </span>
//                     <button
//                       onClick={() => toggleExpand(cell.id)}
//                       className="p-1 hover:bg-gray-100 rounded-md"
//                     >
//                       {cell.isExpanded ? (
//                         <ChevronUp className="h-4 w-4 text-gray-400" />
//                       ) : (
//                         <ChevronDown className="h-4 w-4 text-gray-400" />
//                       )}
//                     </button>
//                   </div>

//                   <div className="flex items-center space-x-2">
//                     {cell.type === 'code' && (
//                       <button
//                         onClick={() => executeQuery(cell.id)}
//                         className="flex items-center px-3 py-1.5 text-xs font-medium text-teal-700 bg-teal-50 rounded-md hover:bg-teal-100"
//                         disabled={loadingCellId === cell.id}
//                       >
//                         {cell.isLoading ? (
//                           <Loader2 className="h-3 w-3 mr-1 animate-spin" />
//                         ) : (
//                           <Play className="h-3 w-3 mr-1" />
//                         )}
//                         Run
//                       </button>
//                     )}
//                     {cell.executionTime && (
//                       <span className="text-xs text-gray-500 ml-2">
//                         ({cell.executionTime})
//                       </span>
//                     )}
//                     <button
//                       onClick={() => deleteCell(cell.id)}
//                       className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-gray-100 rounded-md"
//                     >
//                       <X className="h-4 w-4" />
//                     </button>
//                   </div>
//                 </div>

//                 {/* Cell Body */}
//                 {cell.isExpanded && (
//                   <>
//                     {cell.type === 'code' ? (
//                       <>
//                         <div className="border rounded-lg overflow-hidden bg-gray-50">
//                           <Editor
//                             height={calculateEditorHeight(cell.query)}
//                             defaultLanguage="sql"
//                             value={cell.query}
//                             onChange={(value) =>
//                               updateCell(cell.id, { query: value || '' })
//                             }
//                             options={{
//                               minimap: { enabled: false },
//                               fontSize: 13,
//                               lineHeight: 1.5,
//                               padding: { top: 8, bottom: 8 },
//                               scrollBeyondLastLine: false,
//                             }}
//                           />
//                         </div>

//                         {cell.error && (
//                           <div className="mt-3 flex items-start px-4 py-3 bg-red-50 border border-red-100 rounded-lg">
//                             <AlertCircle className="h-4 w-4 text-red-500 mt-0.5" />
//                             <span className="text-xs text-red-600 ml-2">{cell.error}</span>
//                           </div>
//                         )}

//                         {cell.result.length > 0 && (
//                           <div className="mt-4 border rounded-lg bg-gray-50 overflow-x-auto">
//                             {renderPagination(cell)}
//                             <table className="w-full text-xs">
//                               <thead>
//                                 <tr className="bg-gray-100">
//                                   {cell.columns.map((col) => (
//                                     <th
//                                       key={col.name}
//                                       className="px-4 py-2 text-left font-medium text-gray-700 uppercase tracking-wider"
//                                     >
//                                       <div className="flex flex-col items-start">
//                                         <span>{col.name}</span>
//                                         <span
//                                           style={{
//                                             fontSize: '10px',
//                                             color: '#9CA3AF',
//                                             fontWeight: '400',
//                                             letterSpacing: '0.09em',
//                                           }}
//                                         >
//                                           {col.type}
//                                         </span>
//                                       </div>
//                                     </th>
//                                   ))}
//                                 </tr>
//                               </thead>
//                               <tbody>
//                                 {cell.result
//                                   .slice(
//                                     (cell.currentPage - 1) * cell.pageSize,
//                                     cell.currentPage * cell.pageSize
//                                   )
//                                   .map((row, idx) => (
//                                     <tr key={idx} className="hover:bg-gray-200">
//                                       {cell.columns.map((col) => (
//                                         <td key={col.name} className="px-4 py-2 text-gray-800">
//                                           {row[col.name] !== null && row[col.name] !== undefined
//                                             ? row[col.name].toString()
//                                             : 'NULL'}
//                                         </td>
//                                       ))}
//                                     </tr>
//                                   ))}
//                               </tbody>
//                             </table>
//                           </div>
//                         )}
//                       </>
//                     ) : (
//                       <div className="prose">
//                         <div dangerouslySetInnerHTML={{ __html: cell.content }} />
//                       </div>
//                     )}
//                   </>
//                 )}
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* "Add Cell" Button */}
//         <button
//           onClick={addCell}
//           className="flex items-center px-4 py-2 text-xs font-medium text-teal-700 bg-teal-50 rounded-md hover:bg-teal-100"
//         >
//           <Plus className="h-4 w-4 mr-1" />
//           Add Cell
//         </button>

//         {isTrained && (
//           <div className="mt-6 p-4 bg-green-50 border border-green-100 rounded-lg text-green-700">
//             Model training completed successfully! You can now view the Dashboard or make Predictions.
//           </div>
//         )}
//       </div>
//     );
//   }
// );

// export default SQLNotebook;













// import React, {
//   useEffect,
//   useState,
//   forwardRef,
//   useImperativeHandle,
//   useRef
// } from 'react';
// import Editor from '@monaco-editor/react';
// import {
//   Play,
//   ChevronDown,
//   ChevronUp,
//   AlertCircle,
//   X,
//   Plus,
//   Loader2
// } from 'lucide-react';

// interface Column {
//   name: string;
//   type: string;
// }

// interface Cell {
//   id: number;
//   type: 'code' | 'markdown';
//   content: string;
//   query: string;
//   result: any[];
//   columns: Column[];
//   error: string | null;
//   isExpanded: boolean;
//   executionTime: string | null;
//   currentPage: number;
//   pageSize: number;
//   isLoading?: boolean;
// }

// interface SQLNotebookProps {
//   activeTab: string;
//   notebookContent: {
//     file_url: string;
//     entity_column: string;
//     target_column: string;
//     features: string[];
//     user_id: string;
//     chat_id: string;
//     isTrained: boolean;
//     handleTrainModel: () => void;
//     cells: any[]; // raw JSON from nbformat
//   };
// }

// export interface SQLNotebookRef {
//   runAllCellsAndGetResults: () => Promise<
//     Array<{
//       cellId: number;
//       query: string;
//       columns: Column[];
//       rows: any[];
//     }>
//   >;
// }

// const SQLNotebook = forwardRef<SQLNotebookRef, SQLNotebookProps>(
//   ({ activeTab, notebookContent }, ref) => {
//     const { cells: rawNotebookCells } = notebookContent;

//     const [cells, setCells] = useState<Cell[]>([]);
//     const [loadingCellId, setLoadingCellId] = useState<number | null>(null);

//     // This ref ensures we only parse rawNotebookCells -> setCells once
//     const hasInitialized = useRef(false);

//     // 1) Initialize local `cells` once, ignoring subsequent re-renders
//     useEffect(() => {
//       if (!hasInitialized.current && rawNotebookCells?.length > 0) {
//         // Parse the rawNotebookCells from the JSON
//         const initialCells: Cell[] = rawNotebookCells.map((cell: any, index: number) => {
//           if (cell.cell_type === 'code') {
//             const query = Array.isArray(cell.source)
//               ? cell.source.join('')
//               : cell.source;

//             let result: any[] = [];
//             let columns: Column[] = [];
//             let error: string | null = null;

//             if (cell.outputs && cell.outputs.length > 0) {
//               const output = cell.outputs[0];
//               if (output.output_type === 'execute_result' && output.data) {
//                 const jsonData = output.data['application/json'];
//                 if (jsonData && Array.isArray(jsonData.rows) && Array.isArray(jsonData.columns)) {
//                   result = jsonData.rows;
//                   columns = jsonData.columns;
//                 }
//               } else if (output.output_type === 'error') {
//                 error = output.evalue || 'Unknown error';
//               }
//             }

//             return {
//               id: index + 1,
//               type: 'code',
//               content: '',
//               query: query || '',
//               result,
//               columns,
//               error,
//               isExpanded: true,
//               executionTime: null,
//               currentPage: 1,
//               pageSize: 10,
//               isLoading: false,
//             };
//           } else if (cell.cell_type === 'markdown') {
//             const content = Array.isArray(cell.source)
//               ? cell.source.join('')
//               : cell.source;
//             return {
//               id: index + 1,
//               type: 'markdown',
//               content,
//               query: '',
//               result: [],
//               columns: [],
//               error: null,
//               isExpanded: true,
//               executionTime: null,
//               currentPage: 1,
//               pageSize: 10,
//               isLoading: false,
//             };
//           }
//           return null;
//         }).filter(Boolean) as Cell[];

//         setCells(initialCells);
//         hasInitialized.current = true;
//       } else if (!hasInitialized.current && (!rawNotebookCells || rawNotebookCells.length === 0)) {
//         // If there's no raw cells, just create an empty code cell
//         setCells([
//           {
//             id: 1,
//             type: 'code',
//             content: '',
//             query: '',
//             result: [],
//             columns: [],
//             error: null,
//             isExpanded: true,
//             executionTime: null,
//             currentPage: 1,
//             pageSize: 10,
//             isLoading: false,
//           },
//         ]);
//         hasInitialized.current = true;
//       }
//     }, [rawNotebookCells]);

//     // 2) Single-cell "Run" logic
//     const executeQuery = async (cellId: number) => {
//       const cell = cells.find((c) => c.id === cellId && c.type === 'code');
//       if (!cell) return;

//       setLoadingCellId(cellId);
//       updateCell(cellId, {
//         isLoading: true,
//         error: null,
//         result: [],
//         columns: [],
//       });

//       const startTime = Date.now();
//       try {
//         const response = await fetch('http://localhost:8000/api/execute-sql/', {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//             'Authorization': 'Token d36e47f0e5c0a356d35a7d6d407aab93f6b0d36b',
//           },
//           body: JSON.stringify({ query: cell.query }),
//         });

//         const endTime = Date.now();
//         const timeTaken = endTime - startTime;
//         const formattedTime = formatTime(timeTaken);

//         if (!response.ok) {
//           const errorData = await response.json().catch(() => ({
//             error: 'Unknown error occurred',
//           }));
//           throw new Error(errorData.error || 'Query execution failed');
//         }

//         const data = await response.json();
//         if (
//           data.columns.length > 0 &&
//           data.rows.length > 0 &&
//           data.columns.length !== Object.keys(data.rows[0]).length
//         ) {
//           throw new Error('Mismatch between columns and data.');
//         }

//         updateCell(cellId, {
//           result: data.rows,
//           columns: data.columns,
//           error: null,
//           executionTime: formattedTime,
//         });
//       } catch (err: any) {
//         console.error(`Error executing query for cell ${cellId}:`, err);
//         updateCell(cellId, {
//           error: err.message || 'Unknown error',
//           result: [],
//           columns: [],
//           executionTime: null,
//         });
//       } finally {
//         setLoadingCellId(null);
//         updateCell(cellId, { isLoading: false });
//       }
//     };

//     // 3) Run all code cells in order
//     const runAllCellsAndGetResults = async () => {
//       const results: Array<{
//         cellId: number;
//         query: string;
//         columns: Column[];
//         rows: any[];
//       }> = [];

//       for (const cell of cells) {
//         if (cell.type === 'code') {
//           await executeQuery(cell.id);
//           const updatedCell = getCellById(cell.id);
//           if (updatedCell) {
//             results.push({
//               cellId: updatedCell.id,
//               query: updatedCell.query,
//               columns: updatedCell.columns,
//               rows: updatedCell.result,
//             });
//           }
//         }
//       }
//       return results;
//     };

//     // Expose runAllCellsAndGetResults to the parent
//     useImperativeHandle(ref, () => ({
//       runAllCellsAndGetResults,
//     }));

//     // Helpers
//     const getCellById = (id: number) => {
//       return cells.find((c) => c.id === id);
//     };

//     const updateCell = (cellId: number, newProps: Partial<Cell>) => {
//       setCells((prev) =>
//         prev.map((c) => (c.id === cellId ? { ...c, ...newProps } : c))
//       );
//     };

//     const formatTime = (ms: number) => {
//       if (ms < 1000) return `${ms} ms`;
//       return `${(ms / 1000).toFixed(2)} s`;
//     };

//     const deleteCell = (id: number) => {
//       setCells((prev) => prev.filter((cell) => cell.id !== id));
//     };

//     const toggleExpand = (id: number) => {
//       setCells((prev) =>
//         prev.map((cell) =>
//           cell.id === id ? { ...cell, isExpanded: !cell.isExpanded } : cell
//         )
//       );
//     };

//     const addCell = () => {
//       setCells((prev) => [
//         ...prev,
//         {
//           id: prev.length + 1,
//           type: 'code',
//           content: '',
//           query: '',
//           result: [],
//           columns: [],
//           error: null,
//           isExpanded: true,
//           executionTime: null,
//           currentPage: 1,
//           pageSize: 10,
//           isLoading: false,
//         },
//       ]);
//     };

//     const handlePageChange = (cellId: number, newPage: number) => {
//       setCells((prev) =>
//         prev.map((c) =>
//           c.id === cellId ? { ...c, currentPage: newPage } : c
//         )
//       );
//     };

//     const renderPagination = (cell: Cell) => {
//       const totalRows = cell.result.length;
//       const totalPages = Math.ceil(totalRows / cell.pageSize);
//       if (totalPages <= 1) return null;

//       const { currentPage } = cell;

//       const handleNext = () => {
//         if (currentPage < totalPages) {
//           handlePageChange(cell.id, currentPage + 1);
//         }
//       };

//       const handlePrev = () => {
//         if (currentPage > 1) {
//           handlePageChange(cell.id, currentPage - 1);
//         }
//       };

//       return (
//         <div className="flex items-center justify-between p-2 text-xs text-gray-700">
//           <div className="font-semibold text-gray-800">
//             Showing rows {(currentPage - 1) * cell.pageSize + 1} to{' '}
//             {Math.min(currentPage * cell.pageSize, totalRows)} of {totalRows}
//           </div>
//           <div className="flex items-center space-x-2">
//             <button
//               onClick={handlePrev}
//               disabled={currentPage === 1}
//               className="px-2 py-1 border rounded disabled:opacity-50 font-semibold text-gray-800"
//             >
//               Prev
//             </button>
//             <span className="font-semibold text-gray-800">
//               Page {currentPage} of {totalPages}
//             </span>
//             <button
//               onClick={handleNext}
//               disabled={currentPage === totalPages}
//               className="px-2 py-1 border rounded disabled:opacity-50 font-semibold text-gray-800"
//             >
//               Next
//             </button>
//           </div>
//         </div>
//       );
//     };

//     // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//     // Render the notebook UI
//     // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//     return (
//       <div className="w-full space-y-4 p-6">
//         {/* Notebook Title */}
//         <div className="text-lg font-medium text-center pb-3 border-b border-teal-700">
//           <span className="bg-gradient-to-r from-teal-600 to-emerald-500 bg-clip-text text-transparent">
//             {activeTab === 'entity_target_notebook' && 'Entity & Target Analysis Notebook'}
//             {activeTab === 'features_notebook' && 'Features Analysis Notebook'}
//             {activeTab === 'time_based_notebook' && 'Time-Based Analysis Notebook'}
//           </span>
//         </div>

//         <div className="space-y-4">
//           {cells.map((cell) => (
//             <div
//               key={cell.id}
//               className="bg-white rounded-lg border border-gray-100 shadow-sm hover:shadow-md group"
//             >
//               <div className="p-4">
//                 {/* Cell Header */}
//                 <div className="flex items-center justify-between mb-2">
//                   <div className="flex items-center space-x-2">
//                     <span className="text-xs font-medium text-gray-400">
//                       {cell.type === 'code'
//                         ? `Code Cell ${cell.id}`
//                         : `Markdown Cell ${cell.id}`}
//                     </span>
//                     <button
//                       onClick={() => toggleExpand(cell.id)}
//                       className="p-1 hover:bg-gray-100 rounded-md"
//                     >
//                       {cell.isExpanded ? (
//                         <ChevronUp className="h-4 w-4 text-gray-400" />
//                       ) : (
//                         <ChevronDown className="h-4 w-4 text-gray-400" />
//                       )}
//                     </button>
//                   </div>

//                   <div className="flex items-center space-x-2">
//                     {cell.type === 'code' && (
//                       <button
//                         onClick={() => executeQuery(cell.id)}
//                         className="flex items-center px-3 py-1.5 text-xs font-medium text-teal-700 bg-teal-50 rounded-md hover:bg-teal-100"
//                         disabled={loadingCellId === cell.id}
//                       >
//                         {cell.isLoading ? (
//                           <Loader2 className="h-3 w-3 mr-1 animate-spin" />
//                         ) : (
//                           <Play className="h-3 w-3 mr-1" />
//                         )}
//                         Run
//                       </button>
//                     )}
//                     {cell.executionTime && (
//                       <span className="text-xs text-gray-500 ml-2">
//                         ({cell.executionTime})
//                       </span>
//                     )}
//                     <button
//                       onClick={() => deleteCell(cell.id)}
//                       className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-gray-100 rounded-md"
//                     >
//                       <X className="h-4 w-4" />
//                     </button>
//                   </div>
//                 </div>

//                 {/* Cell Body */}
//                 {cell.isExpanded && (
//                   <>
//                     {cell.type === 'code' ? (
//                       <>
//                         <div className="border rounded-lg overflow-hidden bg-gray-50">
//                           <Editor
//                             height={calculateEditorHeight(cell.query)}
//                             defaultLanguage="sql"
//                             value={cell.query}
//                             onChange={(value) =>
//                               updateCell(cell.id, { query: value || '' })
//                             }
//                             options={{
//                               minimap: { enabled: false },
//                               fontSize: 13,
//                               lineHeight: 1.5,
//                               padding: { top: 8, bottom: 8 },
//                               scrollBeyondLastLine: false,
//                             }}
//                           />
//                         </div>

//                         {/* If there's an error */}
//                         {cell.error && (
//                           <div className="mt-3 flex items-start px-4 py-3 bg-red-50 border border-red-100 rounded-lg">
//                             <AlertCircle className="h-4 w-4 text-red-500 mt-0.5" />
//                             <span className="text-xs text-red-600 ml-2">{cell.error}</span>
//                           </div>
//                         )}

//                         {/* If there's a result */}
//                         {cell.result.length > 0 && (
//                           <div className="mt-4 border rounded-lg bg-gray-50 overflow-x-auto">
//                             {renderPagination(cell)}
//                             <table className="w-full text-xs">
//                               <thead>
//                                 <tr className="bg-gray-100">
//                                   {cell.columns.map((col) => (
//                                     <th
//                                       key={col.name}
//                                       className="px-4 py-2 text-left font-medium text-gray-700 uppercase tracking-wider"
//                                     >
//                                       <div className="flex flex-col items-start">
//                                         <span>{col.name}</span>
//                                         <span
//                                           style={{
//                                             fontSize: '10px',
//                                             color: '#9CA3AF',
//                                             fontWeight: '400',
//                                             letterSpacing: '0.09em',
//                                           }}
//                                         >
//                                           {col.type}
//                                         </span>
//                                       </div>
//                                     </th>
//                                   ))}
//                                 </tr>
//                               </thead>
//                               <tbody>
//                                 {cell.result
//                                   .slice(
//                                     (cell.currentPage - 1) * cell.pageSize,
//                                     cell.currentPage * cell.pageSize
//                                   )
//                                   .map((row, idx) => (
//                                     <tr key={idx} className="hover:bg-gray-200">
//                                       {cell.columns.map((col) => (
//                                         <td key={col.name} className="px-4 py-2 text-gray-800">
//                                           {row[col.name] != null
//                                             ? row[col.name].toString()
//                                             : 'NULL'}
//                                         </td>
//                                       ))}
//                                     </tr>
//                                   ))}
//                               </tbody>
//                             </table>
//                           </div>
//                         )}
//                       </>
//                     ) : (
//                       <div className="prose">
//                         <div
//                           dangerouslySetInnerHTML={{ __html: cell.content }}
//                         />
//                       </div>
//                     )}
//                   </>
//                 )}
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* "Add Cell" Button */}
//         <button
//           onClick={addCell}
//           className="flex items-center px-4 py-2 text-xs font-medium text-teal-700 bg-teal-50 rounded-md hover:bg-teal-100"
//         >
//           <Plus className="h-4 w-4 mr-1" />
//           Add Cell
//         </button>
//       </div>
//     );
//   }
// );

// export default SQLNotebook;

// // ~~~~~ Helper to compute dynamic editor height ~~~~~
// function calculateEditorHeight(query: string) {
//   const lines = query.split('\n').length;
//   const baseHeight = 150;
//   const lineHeight = 20;
//   const maxHeight = 500;
//   const computed = Math.min(baseHeight + lineHeight * (lines - 1), maxHeight);
//   return `${computed}px`;
// }














import React, {
  useEffect,
  useState,
  forwardRef,
  useImperativeHandle,
  useRef
} from 'react';
import Editor from '@monaco-editor/react';
import {
  Play,
  ChevronDown,
  ChevronUp,
  AlertCircle,
  X,
  Plus,
  Loader2
} from 'lucide-react';

interface Column {
  name: string;
  type: string;
}

interface Cell {
  id: number;
  type: 'code' | 'markdown';
  content: string;
  query: string;
  result: any[];
  columns: Column[];
  error: string | null;
  isExpanded: boolean;
  executionTime: string | null;
  currentPage: number;
  pageSize: number;
  isLoading?: boolean;
}

interface SQLNotebookProps {
  activeTab: string;
  notebookContent: {
    file_url: string;
    entity_column: string;
    target_column: string;
    features: string[];
    user_id: string;
    chat_id: string;
    isTrained: boolean;
    handleTrainModel: () => void;
    cells: any[]; // raw JSON from nbformat
  };
}

export interface SQLNotebookRef {
  runAllCellsAndGetResults: () => Promise<
    Array<{
      cellId: number;
      query: string;
      columns: Column[];
      rows: any[];
    }>
  >;
}

const SQLNotebook = forwardRef<SQLNotebookRef, SQLNotebookProps>(
  ({ activeTab, notebookContent }, ref) => {
    const { cells: rawNotebookCells } = notebookContent;

    const [cells, setCells] = useState<Cell[]>([]);
    const [loadingCellId, setLoadingCellId] = useState<number | null>(null);

    // Only parse the notebook JSON once
    const hasInitialized = useRef(false);

    useEffect(() => {
      if (!hasInitialized.current && rawNotebookCells?.length > 0) {
        const initialCells: Cell[] = rawNotebookCells.map((cell: any, index: number) => {
          if (cell.cell_type === 'code') {
            const query = Array.isArray(cell.source)
              ? cell.source.join('')
              : cell.source;

            let result: any[] = [];
            let columns: Column[] = [];
            let error: string | null = null;

            if (cell.outputs && cell.outputs.length > 0) {
              const output = cell.outputs[0];
              if (output.output_type === 'execute_result' && output.data) {
                const jsonData = output.data['application/json'];
                if (jsonData && Array.isArray(jsonData.rows) && Array.isArray(jsonData.columns)) {
                  result = jsonData.rows;
                  columns = jsonData.columns;
                }
              } else if (output.output_type === 'error') {
                error = output.evalue || 'Unknown error';
              }
            }

            return {
              id: index + 1,
              type: 'code',
              content: '',
              query: query || '',
              result,
              columns,
              error,
              isExpanded: true,
              executionTime: null,
              currentPage: 1,
              pageSize: 10,
              isLoading: false,
            };
          } else if (cell.cell_type === 'markdown') {
            const content = Array.isArray(cell.source)
              ? cell.source.join('')
              : cell.source;
            return {
              id: index + 1,
              type: 'markdown',
              content,
              query: '',
              result: [],
              columns: [],
              error: null,
              isExpanded: true,
              executionTime: null,
              currentPage: 1,
              pageSize: 10,
              isLoading: false,
            };
          }
          return null;
        }).filter(Boolean) as Cell[];

        setCells(initialCells);
        hasInitialized.current = true;
      } else if (!hasInitialized.current && (!rawNotebookCells || rawNotebookCells.length === 0)) {
        // No raw cells => create an empty default code cell
        setCells([
          {
            id: 1,
            type: 'code',
            content: '',
            query: '',
            result: [],
            columns: [],
            error: null,
            isExpanded: true,
            executionTime: null,
            currentPage: 1,
            pageSize: 10,
            isLoading: false,
          },
        ]);
        hasInitialized.current = true;
      }
    }, [rawNotebookCells]);

    // Single-cell run
    const executeQuery = async (cellId: number) => {
      const cell = cells.find((c) => c.id === cellId && c.type === 'code');
      if (!cell) return;

      setLoadingCellId(cellId);
      updateCell(cellId, { isLoading: true, error: null, result: [], columns: [] });

      const startTime = Date.now();
      try {
        const response = await fetch('http://localhost:8000/api/execute-sql/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Token d36e47f0e5c0a356d35a7d6d407aab93f6b0d36b',
          },
          body: JSON.stringify({ query: cell.query }),
        });

        const endTime = Date.now();
        const timeTaken = endTime - startTime;
        const formattedTime = formatTime(timeTaken);

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({
            error: 'Unknown error occurred',
          }));
          throw new Error(errorData.error || 'Query execution failed');
        }

        const data = await response.json();
        if (
          data.columns.length > 0 &&
          data.rows.length > 0 &&
          data.columns.length !== Object.keys(data.rows[0]).length
        ) {
          throw new Error('Mismatch between columns and data.');
        }

        updateCell(cellId, {
          result: data.rows,
          columns: data.columns,
          error: null,
          executionTime: formattedTime,
        });
      } catch (err: any) {
        console.error(`Error executing query for cell ${cellId}:`, err);
        updateCell(cellId, {
          error: err.message || 'Unknown error',
          result: [],
          columns: [],
          executionTime: null,
        });
      } finally {
        setLoadingCellId(null);
        updateCell(cellId, { isLoading: false });
      }
    };

    // Run all code cells
    const runAllCellsAndGetResults = async () => {
      const results: Array<{
        cellId: number;
        query: string;
        columns: Column[];
        rows: any[];
      }> = [];
      console.log('Running all cells. Total cells:', cells.length); // Debug log

      for (const cell of cells) {
        if (cell.type === 'code') {
          await executeQuery(cell.id);
          const updatedCell = getCellById(cell.id);
          if (updatedCell) {
            results.push({
              cellId: updatedCell.id,
              query: updatedCell.query,
              columns: updatedCell.columns,
              rows: updatedCell.result,
            });
          }
        }
      }
      console.log('Finished running cells. Returning:', results); // 
      return results;
    };

    // Expose runAllCellsAndGetResults
    useImperativeHandle(ref, () => ({
      runAllCellsAndGetResults,
    }));

    // Helpers
    const updateCell = (cellId: number, newProps: Partial<Cell>) => {
      setCells((prev) => prev.map((c) => (c.id === cellId ? { ...c, ...newProps } : c)));
    };

    const getCellById = (id: number) => {
      return cells.find((c) => c.id === id);
    };

    const formatTime = (ms: number) => {
      if (ms < 1000) return `${ms} ms`;
      return `${(ms / 1000).toFixed(2)} s`;
    };

    const deleteCell = (id: number) => {
      setCells((prev) => prev.filter((cell) => cell.id !== id));
    };

    const toggleExpand = (id: number) => {
      setCells((prev) =>
        prev.map((cell) =>
          cell.id === id ? { ...cell, isExpanded: !cell.isExpanded } : cell
        )
      );
    };

    const addCell = () => {
      setCells((prev) => [
        ...prev,
        {
          id: prev.length + 1,
          type: 'code',
          content: '',
          query: '',
          result: [],
          columns: [],
          error: null,
          isExpanded: true,
          executionTime: null,
          currentPage: 1,
          pageSize: 10,
          isLoading: false,
        },
      ]);
    };

    const handlePageChange = (cellId: number, newPage: number) => {
      setCells((prev) =>
        prev.map((c) =>
          c.id === cellId ? { ...c, currentPage: newPage } : c
        )
      );
    };

    const renderPagination = (cell: Cell) => {
      const totalRows = cell.result.length;
      const totalPages = Math.ceil(totalRows / cell.pageSize);
      if (totalPages <= 1) return null;

      const { currentPage } = cell;

      const handleNext = () => {
        if (currentPage < totalPages) {
          handlePageChange(cell.id, currentPage + 1);
        }
      };

      const handlePrev = () => {
        if (currentPage > 1) {
          handlePageChange(cell.id, currentPage - 1);
        }
      };

      return (
        <div className="flex items-center justify-between p-2 text-xs text-gray-700">
          <div className="font-semibold text-gray-800">
            Showing rows {(currentPage - 1) * cell.pageSize + 1} to{' '}
            {Math.min(currentPage * cell.pageSize, totalRows)} of {totalRows}
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={handlePrev}
              disabled={currentPage === 1}
              className="px-2 py-1 border rounded disabled:opacity-50 font-semibold text-gray-800"
            >
              Prev
            </button>
            <span className="font-semibold text-gray-800">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={handleNext}
              disabled={currentPage === totalPages}
              className="px-2 py-1 border rounded disabled:opacity-50 font-semibold text-gray-800"
            >
              Next
            </button>
          </div>
        </div>
      );
    };

    return (
      <div className="w-full space-y-4 p-6">
        {/* Notebook Title */}
        <div className="text-lg font-medium text-center pb-3 border-b border-teal-700">
          <span className="bg-gradient-to-r from-teal-600 to-emerald-500 bg-clip-text text-transparent">
            {activeTab === 'entity_target_notebook' && 'Entity & Target Analysis Notebook'}
            {activeTab === 'features_notebook' && 'Features Analysis Notebook'}
            {activeTab === 'time_based_notebook' && 'Time-Based Analysis Notebook'}
          </span>
        </div>

        <div className="space-y-4">
          {cells.map((cell) => (
            <div
              key={cell.id}
              className="bg-white rounded-lg border border-gray-100 shadow-sm hover:shadow-md group"
            >
              <div className="p-4">
                {/* Cell Header */}
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <span className="text-xs font-medium text-gray-400">
                      {cell.type === 'code'
                        ? `Code Cell ${cell.id}`
                        : `Markdown Cell ${cell.id}`}
                    </span>
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
                    {cell.type === 'code' && (
                      <button
                        onClick={() => executeQuery(cell.id)}
                        className="flex items-center px-3 py-1.5 text-xs font-medium text-teal-700 bg-teal-50 rounded-md hover:bg-teal-100"
                        disabled={loadingCellId === cell.id}
                      >
                        {cell.isLoading ? (
                          <Loader2 className="h-3 w-3 mr-1 animate-spin" />
                        ) : (
                          <Play className="h-3 w-3 mr-1" />
                        )}
                        Run
                      </button>
                    )}
                    {cell.executionTime && (
                      <span className="text-xs text-gray-500 ml-2">
                        ({cell.executionTime})
                      </span>
                    )}
                    <button
                      onClick={() => deleteCell(cell.id)}
                      className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-gray-100 rounded-md"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                {/* Cell Body */}
                {cell.isExpanded && (
                  <>
                    {cell.type === 'code' ? (
                      <>
                        <div className="border rounded-lg overflow-hidden bg-gray-50">
                          <Editor
                            height={calculateEditorHeight(cell.query)}
                            defaultLanguage="sql"
                            value={cell.query}
                            onChange={(value) =>
                              updateCell(cell.id, { query: value || '' })
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

                        {/* If there's an error */}
                        {cell.error && (
                          <div className="mt-3 flex items-start px-4 py-3 bg-red-50 border border-red-100 rounded-lg">
                            <AlertCircle className="h-4 w-4 text-red-500 mt-0.5" />
                            <span className="text-xs text-red-600 ml-2">{cell.error}</span>
                          </div>
                        )}

                        {/* If there's a result */}
                        {cell.result.length > 0 && (
                          <div className="mt-4 border rounded-lg bg-gray-50 overflow-x-auto">
                            {renderPagination(cell)}
                            <table className="w-full text-xs">
                              <thead>
                                <tr className="bg-gray-100">
                                  {cell.columns.map((col) => (
                                    <th
                                      key={col.name}
                                      className="px-4 py-2 text-left font-medium text-gray-700 uppercase tracking-wider"
                                    >
                                      <div className="flex flex-col items-start">
                                        <span>{col.name}</span>
                                        <span
                                          style={{
                                            fontSize: '10px',
                                            color: '#9CA3AF',
                                            fontWeight: '400',
                                            letterSpacing: '0.09em',
                                          }}
                                        >
                                          {col.type}
                                        </span>
                                      </div>
                                    </th>
                                  ))}
                                </tr>
                              </thead>
                              <tbody>
                                {cell.result
                                  .slice(
                                    (cell.currentPage - 1) * cell.pageSize,
                                    cell.currentPage * cell.pageSize
                                  )
                                  .map((row, idx) => (
                                    <tr key={idx} className="hover:bg-gray-200">
                                      {cell.columns.map((col) => (
                                        <td key={col.name} className="px-4 py-2 text-gray-800">
                                          {row[col.name] != null
                                            ? row[col.name].toString()
                                            : 'NULL'}
                                        </td>
                                      ))}
                                    </tr>
                                  ))}
                              </tbody>
                            </table>
                          </div>
                        )}
                      </>
                    ) : (
                      <div className="prose">
                        <div
                          dangerouslySetInnerHTML={{ __html: cell.content }}
                        />
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* "Add Cell" Button */}
        <button
          onClick={addCell}
          className="flex items-center px-4 py-2 text-xs font-medium text-teal-700 bg-teal-50 rounded-md hover:bg-teal-100"
        >
          <Plus className="h-4 w-4 mr-1" />
          Add Cell
        </button>
      </div>
    );
  }
);

export default SQLNotebook;

// ~~~~~ Helper to compute dynamic editor height ~~~~~
function calculateEditorHeight(query: string) {
  const lines = query.split('\n').length;
  const baseHeight = 150;
  const lineHeight = 20;
  const maxHeight = 500;
  const computed = Math.min(baseHeight + lineHeight * (lines - 1), maxHeight);
  return `${computed}px`;
}
