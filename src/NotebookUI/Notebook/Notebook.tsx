


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
