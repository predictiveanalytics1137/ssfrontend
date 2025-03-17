

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
// import { API_BASE_URL } from '../../constants';

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

//     // Only parse the notebook JSON once
//     const hasInitialized = useRef(false);

//     useEffect(() => {
//       if (!hasInitialized.current && rawNotebookCells?.length > 0) {
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
//         // No raw cells => create an empty default code cell
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

//     // Single-cell run
//     const executeQuery = async (cellId: number) => {
//       const cell = cells.find((c) => c.id === cellId && c.type === 'code');
//       if (!cell) return;

//       setLoadingCellId(cellId);
//       updateCell(cellId, { isLoading: true, error: null, result: [], columns: [] });

//       const startTime = Date.now();
//       try {
//         const response = await fetch(`${API_BASE_URL}/api/execute-sql/`, {
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
//         console.log('Query result data:', data);
        
        
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

//     // Run all code cells
//     const runAllCellsAndGetResults = async () => {
//       const results: Array<{
//         cellId: number;
//         query: string;
//         columns: Column[];
//         rows: any[];
//       }> = [];
//       console.log('Running all cells. Total cells:', cells.length); // Debug log

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
//       console.log('Finished running cells. Returning:', results); // 
//       return results;
//     };

//     // Expose runAllCellsAndGetResults
//     useImperativeHandle(ref, () => ({
//       runAllCellsAndGetResults,
//     }));

//     // Helpers
//     const updateCell = (cellId: number, newProps: Partial<Cell>) => {
//       setCells((prev) => prev.map((c) => (c.id === cellId ? { ...c, ...newProps } : c)));
//     };

//     const getCellById = (id: number) => {
//       return cells.find((c) => c.id === id);
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
//         prev.map((cell) =>
//           cell.id === cellId ? { ...cell, currentPage: newPage } : cell
//         )
//       );
//     };

//     const renderPagination = (cell: Cell) => {
//       // Total records from backend
//       const totalRows = cell.result.length;
//       // Display only up to 150 rows
//       const displayedRows = Math.min(totalRows, 150);
//       const totalPages = Math.ceil(displayedRows / cell.pageSize);
//       if (totalPages <= 1) return (
//         <div className="flex items-center p-2 text-xs text-gray-700">
//           <div className="font-semibold text-gray-800">
//             Showing {displayedRows} out of {totalRows} records
//           </div>
//         </div>
//       );

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
//             {Math.min(currentPage * cell.pageSize, displayedRows)} of {displayedRows} results (Total: {totalRows} records)
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
//                                   .slice(0, Math.min(cell.result.length, 150)) // Use only the first 150 rows
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
import { API_BASE_URL } from '../../constants';

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
        console.log('Initialized cells:', initialCells);
      } else if (!hasInitialized.current && (!rawNotebookCells || rawNotebookCells.length === 0)) {
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
        console.log('Initialized with default empty cell');
      }
    }, [rawNotebookCells]);

    // Single-cell run with retry logic, returning the updated cell
    const executeQuery = async (cellId: number, retries = 2): Promise<Cell | undefined> => {
      const cell = cells.find((c) => c.id === cellId && c.type === 'code');
      if (!cell) {
        console.warn(`Cell ${cellId} not found or not a code cell`);
        return undefined;
      }

      console.log(`Executing query for cell ${cellId} with query:`, cell.query);
      // debugger; // Pause to inspect initial cell state

      setLoadingCellId(cellId);
      updateCell(cellId, { isLoading: true, error: null, result: [], columns: [] });
      console.log(`Set loading state for cell ${cellId}`);
      // debugger; // Pause to confirm loading state

      const startTime = Date.now();
      let updatedCellProps: Partial<Cell> = { isLoading: false };
      for (let attempt = 1; attempt <= retries + 1; attempt++) {
        try {
          const response = await fetch(`${API_BASE_URL}/api/execute-sql/`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': 'Token d36e47f0e5c0a356d35a7d6d407aab93f6b0d36b',
            },
            body: JSON.stringify({ query: cell.query }),
          });

          console.log(`Raw response for cell ${cellId}, attempt ${attempt}:`, response);
          // debugger; // Pause to inspect raw response

          const endTime = Date.now();
          const timeTaken = endTime - startTime;
          const formattedTime = formatTime(timeTaken);

          if (!response.ok) {
            const errorData = await response.json().catch(() => ({
              error: 'Unknown error occurred',
            }));
            console.log(`Error data for cell ${cellId}, attempt ${attempt}:`, errorData);
            if (attempt === retries + 1) {
              throw new Error(errorData.error || 'Query execution failed');
            }
            continue;
          }

          const data = await response.json();
          console.log(`Parsed data for cell ${cellId}, attempt ${attempt}:`, data);
          // debugger; // Pause to inspect parsed data

          // Validate API response structure
          if (!data || typeof data !== 'object') {
            console.warn(`Invalid API response structure for cell ${cellId}:`, data);
            if (attempt === retries + 1) {
              throw new Error('Invalid API response structure');
            }
            continue;
          }

          // Ensure columns and rows are present and arrays
          if (!('columns' in data) || !Array.isArray(data.columns)) {
            console.warn(`Invalid columns array for cell ${cellId}:`, data.columns);
            if (attempt === retries + 1) {
              throw new Error('Invalid columns data from API');
            }
            continue;
          }
          if (!('rows' in data) || !Array.isArray(data.rows)) {
            console.warn(`Invalid rows array for cell ${cellId}:`, data.rows);
            if (attempt === retries + 1) {
              throw new Error('Invalid rows data from API');
            }
            continue;
          }

          // Fallback: Infer columns if empty but rows exist
          let columns: Column[] = data.columns;
          if (columns.length === 0 && data.rows.length > 0) {
            console.warn(`No columns returned, inferring from first row for cell ${cellId}`);
            columns = Object.keys(data.rows[0]).map(name => ({ name, type: 'String' }));
          }

          // Validate column and row consistency
          if (
            columns.length > 0 &&
            data.rows.length > 0 &&
            columns.length !== Object.keys(data.rows[0]).length
          ) {
            throw new Error('Mismatch between columns and data.');
          }

          updatedCellProps = {
            result: data.rows,
            columns,
            error: null,
            executionTime: formattedTime,
            isLoading: false,
          };
          updateCell(cellId, updatedCellProps);
          console.log(`Updated cell ${cellId} with result:`, { rows: data.rows.length, columns: columns.length });
          // debugger; // Pause to confirm state update
          break; // Success, exit retry loop
        } catch (err: any) {
          console.error(`Error executing query for cell ${cellId}, attempt ${attempt}:`, err);
          // debugger; // Pause to inspect error
          if (attempt === retries + 1) {
            updatedCellProps = {
              error: err.message || 'Unknown error after retries',
              result: [],
              columns: [],
              executionTime: null,
              isLoading: false,
            };
            updateCell(cellId, updatedCellProps);
          }
        }finally {
          setLoadingCellId(null);
          // Ensure the final state update includes isLoading: false
          updateCell(cellId, { isLoading: false });
          console.log(`Execution complete for cell ${cellId}. Final state:`, getCellById(cellId));
          // debugger; // Pause to confirm final state
        }
      }
      

      // Compute the updated cell manually to avoid timing issues
      const updatedCell = { ...cell, ...updatedCellProps };
      console.log(`Returning updated cell ${cellId}:`, updatedCell);
      return updatedCell;
    };

    // Run all code cells, using the returned updated cell
    const runAllCellsAndGetResults = async () => {
      const results: Array<{
        cellId: number;
        query: string;
        columns: Column[];
        rows: any[];
      }> = [];
      console.log('Running all cells. Total cells:', cells.length);
      // debugger; // Pause to inspect cells array

      for (const cell of cells) {
        if (cell.type === 'code') {
          console.log(`Processing cell ${cell.id} with query:`, cell.query);
          // debugger; // Pause to inspect cell before execution
          const updatedCell = await executeQuery(cell.id);
          console.log(`Cell ${cell.id} after execution:`, updatedCell);
          // debugger; // Pause to inspect updated cell
          if (updatedCell) {
            results.push({
              cellId: updatedCell.id,
              query: updatedCell.query,
              columns: updatedCell.columns,
              rows: updatedCell.result,
            });
            console.log(`Added to results:`, { cellId: updatedCell.id, rows: updatedCell.result.length });
            // debugger; // Pause to inspect results array
          }
        }
      }
      console.log('Finished running cells. Returning:', results);
      // debugger; // Pause to inspect final results
      return results;
    };

    // Expose runAllCellsAndGetResults
    useImperativeHandle(ref, () => ({
      runAllCellsAndGetResults,
    }));

    // Helpers
    const updateCell = (cellId: number, newProps: Partial<Cell>) => {
      setCells(prev => {
        const updatedCells = prev.map((c) =>
          c.id === cellId ? { ...c, ...newProps } : c
        );
        console.log(`Updated cell ${cellId} with:`, newProps);
        return updatedCells;
      });
    };

    const getCellById = (id: number) => {
      const cell = cells.find((c) => c.id === id);
      console.log(`Retrieved cell ${id}:`, cell);
      return cell;
    };

    const formatTime = (ms: number) => {
      if (ms < 1000) return `${ms} ms`;
      return `${(ms / 1000).toFixed(2)} s`;
    };

    const deleteCell = (id: number) => {
      setCells((prev) => prev.filter((cell) => cell.id !== id));
      console.log(`Deleted cell ${id}`);
    };

    const toggleExpand = (id: number) => {
      setCells((prev) =>
        prev.map((cell) =>
          cell.id === id ? { ...cell, isExpanded: !cell.isExpanded } : cell
        )
      );
      console.log(`Toggled expand for cell ${id}`);
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
      console.log('Added new cell');
    };

    const handlePageChange = (cellId: number, newPage: number) => {
      setCells((prev) =>
        prev.map((cell) =>
          cell.id === cellId ? { ...cell, currentPage: newPage } : cell
        )
      );
      console.log(`Changed page for cell ${cellId} to ${newPage}`);
    };

    const renderPagination = (cell: Cell) => {
      const totalRows = cell.result.length;
      const displayedRows = Math.min(totalRows, 150);
      const totalPages = Math.ceil(displayedRows / cell.pageSize);
      if (totalPages <= 1) return (
        <div className="flex items-center p-2 text-xs text-gray-700">
          <div className="font-semibold text-gray-800">
            Showing {displayedRows} out of {totalRows} records
          </div>
        </div>
      );

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
            {Math.min(currentPage * cell.pageSize, displayedRows)} of {displayedRows} results (Total: {totalRows} records)
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
                                  .slice(0, Math.min(cell.result.length, 150)) // Use only the first 150 rows
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

// Helper to compute dynamic editor height
function calculateEditorHeight(query: string) {
  const lines = query.split('\n').length;
  const baseHeight = 150;
  const lineHeight = 20;
  const maxHeight = 500;
  const computed = Math.min(baseHeight + lineHeight * (lines - 1), maxHeight);
  return `${computed}px`;
}