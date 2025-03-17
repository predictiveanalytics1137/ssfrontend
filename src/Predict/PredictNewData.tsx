


import React, { useState, useEffect, useRef } from "react";
import Papa from "papaparse"; // For parsing CSV
import readXlsxFile from "read-excel-file"; // For parsing Excel (safer alternative to xlsx)
import { Upload, Clock, Monitor, X } from "lucide-react";
import SQLNotebook, { SQLNotebookRef } from "../NotebookUI/Notebook/Notebook";
import { API_BASE_URL } from "../constants";

// ~~~--- Types ---~~~
interface PredictionMetadata {
  prediction_id: string;
  start_time: string;
  chat_id: string;
  user_id: string;
  status: string;
  duration: number | null;
  entity_count: number;
  predictions_csv_path: string | null;
}

interface PredictionFileInfo {
  id: number;
  name: string;
  file_url: string;
  schema: Array<{ column_name: string; data_type: string }>;
  file_size_mb: number;
  has_date_column: boolean;
  date_columns: string[];
  chat_id: string;
  prediction_queries: {
    sampling_query: string;
    feature_query: string;
  };
  prediction_results: {
    sampling_results: any[];
    feature_results: any[];
  };
  prediction_id?: string; // Add this as an optional property
}

interface PredictiveSettingsData {
  target_column: string;         // must NOT appear in CSV if not "Null"
  entity_column: string;         // must appear if not "Null"
  time_column: string;           // we ignore it
  predictive_question: string;
  time_frame: string;
  time_frequency: string;
  machine_learning_type: string;
  features: string[];            // must appear if not empty
  new_target_column: string; 
  prediction_type: boolean    // must appear if not "Null"
}

interface PredictionsUIProps {
  user_id: string;
  chat_id: string;
}

const PredictionsUI: React.FC<PredictionsUIProps> = ({ user_id, chat_id }) => {
  console.log("[PredictionsUI] user_id:", user_id, "chat_id:", chat_id);

  const [predictionsData, setPredictionsData] = useState<PredictionMetadata[]>([]);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);  // The file we ultimately upload
  const [isLoading, setIsLoading] = useState(false);
  const [showPredictionWizard, setShowPredictionWizard] = useState(false);
  const [wizardStep, setWizardStep] = useState<number>(1);
  const [predictionFileInfo, setPredictionFileInfo] = useState<PredictionFileInfo | null>(null);
  const [predictiveSettings, setPredictiveSettings] = useState<PredictiveSettingsData | null>(null);

  // const notebookRef = useRef<SQLNotebookRef>(null);
  const notebookRef = useRef<SQLNotebookRef | null>(null);

  // Hard-coded auth token
  const authToken = "d36e47f0e5c0a356d35a7d6d407aab93f6b0d36b";
  const bucket_name = "pa-documents-storage-bucket";

  // States for dynamic column validation
  const [requiredColumns, setRequiredColumns] = useState<string[]>([]); // entity + features
  const [disallowedTarget, setDisallowedTarget] = useState<string>(""); // target if not "Null"
  const [columnsMatch, setColumnsMatch] = useState<boolean>(true);
  const [mismatchError, setMismatchError] = useState<string>("");

  // 1) On mount or user/chat changes, fetch existing predictions
  useEffect(() => {
    fetchPredictions();
  }, [user_id, chat_id]);

  const fetchPredictions = async () => {
    console.log("[fetchPredictions] Start. user_id:", user_id, "chat_id:", chat_id);
    try {
      const response = await fetch(
        `${API_BASE_URL}/api/get_prediction_metadata/?user_id=${user_id}&chat_id=${chat_id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${authToken}`,
          },
        }
      );
      if (!response.ok) {
        console.error("[fetchPredictions] Failed to fetch prediction metadata");
        return;
      }
      const data = await response.json();
      setPredictionsData(data.metadata);
      console.log("[fetchPredictions] Received metadata:", data.metadata);
      console.log("_________________________________________")
    } catch (error) {
      console.error("[fetchPredictions] Error:", error);
    }
  };

  // 2) When wizard is opened, fetch PredictiveSettings
  useEffect(() => {
    if (!showPredictionWizard) return;

    const fetchPredictiveSettings = async () => {
      console.log("[fetchPredictiveSettings] Start. user_id:", user_id, "chat_id:", chat_id);
      try {
        const url = `${API_BASE_URL}/api/predictive-settings/${user_id}/${chat_id}`;
        const resp = await fetch(url);
        if (!resp.ok) {
          throw new Error(`[fetchPredictiveSettings] Failed: ${resp.statusText}`);
        }
        const data: PredictiveSettingsData = await resp.json();
        console.log("[fetchPredictiveSettings] Data:", data);

        // Store predictive settings
        setPredictiveSettings(data);

        // Build required columns ignoring time_column & ignoring "Null"
        const reqCols: string[] = [];
        if (data.entity_column && data.entity_column !== "Null") {
          reqCols.push(data.entity_column);
        }
        if (Array.isArray(data.features)) {
          data.features.forEach((f) => {
            if (f && f !== "Null") {
              reqCols.push(f);
            }
          });
        }

        // If target_column != "Null", user must NOT have it in CSV
        let disTarget = "";
        if (data.target_column && data.target_column !== "Null") {
          disTarget = data.target_column;
        }

        // Normalize them
        const normalizedRequired = reqCols.map((c) => normalizeColumnName(c));
        const normalizedTarget = disTarget ? normalizeColumnName(disTarget) : "";

        setRequiredColumns(normalizedRequired);
        setDisallowedTarget(normalizedTarget);
        setColumnsMatch(true);
        setMismatchError("");
        console.log("[fetchPredictiveSettings] requiredColumns:", normalizedRequired);
        console.log("[fetchPredictiveSettings] disallowedTarget:", normalizedTarget);
      } catch (err) {
        console.error("[fetchPredictiveSettings] Error:", err);
        setColumnsMatch(false);
        setMismatchError(String(err));
      }
    };

    fetchPredictiveSettings();
  }, [showPredictionWizard, user_id, chat_id]);

  // Helper: normalize column names
  const normalizeColumnName = (col: string) => {
    let normalized = col.trim().toLowerCase().replace(/\s+/g, "_");
    normalized = normalized.replace(/[^a-z0-9_]/g, "");
    if (normalized && /^[0-9]/.test(normalized)) {
      normalized = "_" + normalized;
    }
    return normalized;
  };

  // Compare CSV/XLSX columns to requiredColumns + ensure target not present
  const validateColumns = (fileColumns: string[]) => {
    console.log("[validateColumns] File columns:", fileColumns);
    console.log("[validateColumns] requiredColumns:", requiredColumns);
    console.log("[validateColumns] disallowedTarget:", disallowedTarget);

    if (!requiredColumns.length) {
      setColumnsMatch(false);
      setMismatchError("No required columns loaded from PredictiveSettings. Please wait or re-check logs.");
      return;
    }

    const fileSet = new Set(fileColumns);
    const requiredSet = new Set(requiredColumns);

    // 1) Check if file includes all required columns
    const missing: string[] = [];
    for (const needed of requiredSet) {
      if (!fileSet.has(needed)) {
        missing.push(needed);
      }
    }
    if (missing.length > 0) {
      setColumnsMatch(false);
      setMismatchError(
        `Missing required column(s): ${missing.join(", ")}. ` +
        `Please ensure your file includes all required columns.`
      );
      return;
    }

    // 2) If we have a disallowed target, ensure it's not in the file
    if (disallowedTarget && fileSet.has(disallowedTarget)) {
      setColumnsMatch(false);
      setMismatchError(
        `Your file contains the target column "${disallowedTarget}", which must NOT be present. ` +
        `Please remove it from the file.`
      );
      return;
    }

    // 3) Extra columns are allowed, so we won't fail on them
    const extra = [...fileSet].filter((c) => !requiredSet.has(c) && c !== disallowedTarget);
    if (extra.length) {
      console.log("[validateColumns] File has extra columns:", extra);
    }

    // If we get here, columns pass
    setColumnsMatch(true);
    setMismatchError("");
    console.log("[validateColumns] File columns pass validation!");
  };

  // 4) User picks a file => handle CSV vs. XLSX
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      console.log("[handleFileChange] Chosen file:", file.name);
      setSelectedFile(null);
      setColumnsMatch(true);
      setMismatchError("");

      const fileName = file.name.toLowerCase();
      if (fileName.endsWith(".csv")) {
        // ~~~ CSV ~~~
        parseCsvFile(file);
      } else if (fileName.endsWith(".xlsx") || fileName.endsWith(".xls")) {
        // ~~~ XLSX/XLS ~~~
        await parseXlsxFile(file);
      } else {
        // Not CSV, XLSX, or XLS => fail
        setColumnsMatch(false);
        setMismatchError("Unsupported file type. Please upload a .csv, .xlsx, or .xls file.");
      }
    }
  };

  // 4a) Parse CSV with Papa
  const parseCsvFile = (file: File) => {
    console.log("[parseCsvFile] Start. file:", file.name);
    Papa.parse(file, {
      preview: 1,      // Read only the header row
      header: true,
      skipEmptyLines: true,
      transformHeader: (colName) => normalizeColumnName(colName),
      complete: (results) => {
        if (results.meta && results.meta.fields) {
          const fileColumns = results.meta.fields;
          console.log("[parseCsvFile] CSV columns:", fileColumns);
          validateColumns(fileColumns);
          // If valid, setSelectedFile => can be used for upload
          if (columnsMatch) {
            setSelectedFile(file);
          }
        } else {
          setColumnsMatch(false);
          setMismatchError("Unable to parse CSV header row. Please ensure there's a valid header row.");
        }
      },
      error: (err) => {
        console.error("[parseCsvFile] Papa parse error:", err);
        setColumnsMatch(false);
        setMismatchError("Error parsing CSV. Check console for details.");
      }
    });
  };

  // 4b) Parse XLSX/XLS with read-excel-file => extract headers for validation
  const parseXlsxFile = async (file: File) => {
    console.log("[parseXlsxFile] Start. file:", file.name);
    try {
      // 1) Read entire XLSX
      const rows = await readXlsxFile(file);

      // 2) First row is headers => validate columns
      const headers = rows[0].map((col: any) => normalizeColumnName(String(col)));
      console.log("[parseXlsxFile] XLSX/XLS headers:", headers);
      validateColumns(headers);

      if (!columnsMatch) {
        console.log("[parseXlsxFile] Columns do NOT match => returning");
        return;
      }

      // 3) Convert Date objects to "YYYY-MM-DD HH:mm:ss"
      //    This preserves local date/time without "Fri Feb 05 2010..." strings
      const transformedRows = rows.map((row, rowIndex) =>
        row.map((cell) => {
          if (cell instanceof Date) {
            return formatDate(cell); // see helper below
          }
          return cell;
        })
      );

      // 4) Build CSV from transformed rows
      const csvData = transformedRows
        .map((row) => row.join(",")) // convert each row to a single CSV line
        .join("\n");

      // 5) Turn CSV text into a File object so we can upload
      const csvBlob = new Blob([csvData], { type: "text/csv" });
      const newFile = new File([csvBlob], file.name.replace(/\.xlsx?|\.xls$/, ".csv"), {
        type: "text/csv",
      });
      console.log("[parseXlsxFile] Created new CSV File object =>", newFile.name);

      // 6) Set for upload
      setSelectedFile(newFile);

    } catch (err) {
      console.error("[parseXlsxFile] Error:", err);
      setColumnsMatch(false);
      setMismatchError(`Error parsing XLSX/XLS: ${String(err)}`);
    }
  };

  // Helper to format JS Date as "YYYY-MM-DD HH:mm:ss"
  function formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  }

  const handleQuickPrediction = async () => {
    console.log("[handleQuickPrediction] Start. user_id:", user_id, "chat_id:", chat_id);
    if (!selectedFile) {
      alert("Please select a CSV/XLSX/XLS file first and pass validation.");
      return;
    }
    if (!columnsMatch) {
      alert("File schema doesn't match the required columns. Cannot upload.");
      return;
    }
  
    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append("file", selectedFile);
      formData.append("user_id", user_id);
      formData.append("chat_id", chat_id);
  
      const response = await fetch(`${API_BASE_URL}/api/predict/`, {
        method: "POST",
        headers: {
          Authorization: `Token ${authToken}`,
        },
        body: formData,
      });
  
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText);
      }
      const data = await response.json();
      console.log("[handleQuickPrediction] /api/predict/ response:", data);
  
      if (data.uploaded_files && data.uploaded_files.length > 0) {
        const fileInfoWithId = {
          ...data.uploaded_files[0],
          prediction_id: data.uploaded_files[0].prediction_id  // Extract prediction_id
        };
        setPredictionFileInfo(fileInfoWithId);
      }
    } catch (error) {
      console.error("[handleQuickPrediction] Error:", error);
      alert(`Prediction failed: ${error instanceof Error ? error.message : "Unknown error"}`);
    } finally {
      setIsLoading(false);
    }
  };

  // const handlePredictOnNewData = async () => {
  //   console.log("[handlePredictOnNewData] Start. user_id:", user_id, "chat_id:", chat_id);
  //   if (!predictionFileInfo || !notebookRef.current || !predictionFileInfo.prediction_id) {
  //     alert("Please upload a file and review queries before predicting.");
  //     return;
  //   }
  
  //   setIsLoading(true);
  //   try {
  //     // Step 1: Start the ML process with prediction_id from database
  //     const predictionPayload = {
  //       file_url: predictionFileInfo.file_url,
  //       entity_column: predictiveSettings?.entity_column || "product_id", // Dynamic from PredictiveSettings
  //       user_id: user_id,
  //       chat_id: chat_id,
  //       machine_learning_type: predictiveSettings?.machine_learning_type || "regression", // Map to boolean
  //       prediction_id: predictionFileInfo.prediction_id, // Use DB-generated ID
  //       target_column: predictiveSettings?.target_column || "", // Include for backend context
  //       time_column: predictiveSettings?.time_column || "", // Include for context if needed
  //       new_target_column:predictiveSettings?.new_target_column || "",
  //       prediction_type:predictiveSettings?.prediction_type || "",
  //       // time_frame: predictiveSettings?.time_frame || "30 days", // Default if not set
  //       // time_frequency: predictiveSettings?.time_frequency || "weekly", // Default if not set
  //       features: predictiveSettings?.features || [], // Dynamic features
  //     };
  //     console.log("[handlePredictOnNewData] predictionPayload:", predictionPayload);
  
  //     const predictionResponse = await fetch(`${API_BASE_URL}/api/prediction/`, {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: `Token ${authToken}`,
  //       },
  //       body: JSON.stringify(predictionPayload),
  //     });
  
  //     if (!predictionResponse.ok) {
  //       const errText = await predictionResponse.text();
  //       throw new Error(`Prediction initiation failed: ${errText}`);
  //     }
  
  //     const predictionResult = await predictionResponse.json();
  //     console.log("[handlePredictOnNewData] Prediction started:", predictionResult);
  
  //     // Step 2: Run notebook cells and save results
  //     const cellResults = await notebookRef.current.runAllCellsAndGetResults();
  //     console.log("[handlePredictOnNewData] cellResults:", cellResults);
  
  //     const saveResp = await fetch(`${API_BASE_URL}/api/save_prediction_results/`, {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: `Token ${authToken}`,
  //       },
  //       body: JSON.stringify({
  //         user_id,
  //         chat_id,
  //         file_id: predictionFileInfo.id,
  //         cells: cellResults,
  //         prediction_id: predictionFileInfo.prediction_id, // Include in save request
  //       }),
  //     });
  
  //     if (!saveResp.ok) {
  //       const errText = await saveResp.text();
  //       throw new Error(`Saving results failed: ${errText}`);
  //     }
  
  //     const saveData = await saveResp.json();
  //     console.log("[handlePredictOnNewData] Prediction results saved:", saveData);
  
  //     alert("Prediction Initiated and Results Saved Successfully!");
  //     fetchPredictions();
  //   } catch (error) {
  //     console.error("[handlePredictOnNewData] Error:", error);
  //     alert(`Prediction failed: ${error instanceof Error ? error.message : "Unknown error"}`);
  //   } finally {
  //     setIsLoading(false);
  //     setShowPredictionWizard(false);
  //     setWizardStep(1);
  //     setSelectedFile(null);
  //     setPredictionFileInfo(null);
  //   }
  // };


  // const handlePredictOnNewData = async () => {
  //   console.log("[handlePredictOnNewData] Start. user_id:", user_id, "chat_id:", chat_id);
  //   if (!predictionFileInfo || !notebookRef.current || !predictionFileInfo.prediction_id) {
  //     alert("Please upload a file and review queries before predicting.");
  //     return;
  //   }
  
  //   setIsLoading(true);
  //   try {
  //     let Results: any[] = [];
  //     // Step 1: Run notebook cells and save results
  //     const cellResults = await notebookRef.current.runAllCellsAndGetResults();
  //     Results = cellResults.concat(cellResults);
  //     console.log("[handlePredictOnNewData] cellResults:", cellResults);
  
  //     const saveResp = await fetch(`${API_BASE_URL}/api/save_prediction_results/`, {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: `Token ${authToken}`,
  //       },
  //       body: JSON.stringify({
  //         user_id,
  //         chat_id,
  //         file_id: predictionFileInfo.id,
  //         cells: cellResults,
  //         prediction_id: predictionFileInfo.prediction_id,
  //       }),
  //     });
  
  //     if (!saveResp.ok) {
  //       const errText = await saveResp.text();
  //       throw new Error(`Saving results failed: ${errText}`);
  //     }
  
  //     const saveData = await saveResp.json();
  //     console.log("[handlePredictOnNewData] Prediction results saved:", saveData);
  
  //     // Step 2: Use the modified file URL from saveData (File B)
  //     const modifiedFileUrls = saveData.files; // Object like { "cell1": "s3://bucket/prediction_saves/..." }
  //     const modifiedFileUrl = modifiedFileUrls[Object.keys(modifiedFileUrls)[1]]; // Take the first modified file URL (e.g., cell1)
  
  //     if (!modifiedFileUrl) {
  //       throw new Error("No modified file URL returned from save_prediction_results");
  //     }
  
  //     // Step 3: Start the ML process with the modified file URL
  //     const predictionPayload = {
  //       file_url: modifiedFileUrl, // Use File B instead of predictionFileInfo.file_url (File A)
  //       entity_column: predictiveSettings?.entity_column || "product_id",
  //       user_id: user_id,
  //       chat_id: chat_id,
  //       machine_learning_type: predictiveSettings?.machine_learning_type || "regression",
  //       prediction_id: predictionFileInfo.prediction_id,
  //       target_column: predictiveSettings?.target_column || "",
  //       time_column: predictiveSettings?.time_column || "",
  //       new_target_column: predictiveSettings?.new_target_column || "",
  //       prediction_type: predictiveSettings?.prediction_type || "",
  //       features: predictiveSettings?.features || [],
  //     };
  //     console.log("[handlePredictOnNewData] predictionPayload:", predictionPayload);
  
  //     const predictionResponse = await fetch(`${API_BASE_URL}/api/prediction/`, {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: `Token ${authToken}`,
  //       },
  //       body: JSON.stringify(predictionPayload),
  //     });
  
  //     if (!predictionResponse.ok) {
  //       const errText = await predictionResponse.text();
  //       throw new Error(`Prediction initiation failed: ${errText}`);
  //     }
  
  //     const predictionResult = await predictionResponse.json();
  //     console.log("[handlePredictOnNewData] Prediction started:", predictionResult);
  
  //     alert("Prediction Initiated and Results Saved Successfully!");
  //     fetchPredictions();
  //   } catch (error) {
  //     console.error("[handlePredictOnNewData] Error:", error);
  //     alert(`Prediction failed: ${error instanceof Error ? error.message : "Unknown error"}`);
  //   } finally {
  //     setIsLoading(false);
  //     setShowPredictionWizard(false);
  //     setWizardStep(1);
  //     setSelectedFile(null);
  //     setPredictionFileInfo(null);
  //   }
  // };

  

  const handlePredictOnNewData = async () => {
    console.log("[handlePredictOnNewData] Start. user_id:", user_id, "chat_id:", chat_id);
    if (!predictionFileInfo || !notebookRef.current || !predictionFileInfo.prediction_id) {
      alert("Please upload a file and review queries before predicting.");
      return;
    }
  
    setIsLoading(true);
    try {
      // Step 1: Run notebook cells and gather results
      console.log("[handlePredictOnNewData] Running all notebook cells...");
      let cellResults: any[] = [];
      try {
        cellResults = await notebookRef.current.runAllCellsAndGetResults();
        console.log("[handlePredictOnNewData] Cell execution completed. Results:", cellResults);
      } catch (err) {
        console.error("[handlePredictOnNewData] Error running notebook cells:", err);
        throw new Error("Failed to execute notebook cells. Please check the queries.");
      }
  
      // Step 2: Validate cell results
      if (!cellResults || cellResults.length < 2) {
        throw new Error("Insufficient cell results. Expected 2 cells (sampling and feature queries).");
      }
  
      const samplingCellResult = cellResults[0]; // Cell 1: sampling_query
      const featureCellResult = cellResults[1]; // Cell 2: feature_query
  
      // Validate Cell 1 (sampling query)
      if (!samplingCellResult || !samplingCellResult.rows || samplingCellResult.rows.length === 0) {
        throw new Error("Sampling cell (Cell 1) returned no rows. Please check the sampling query or data availability.");
      }
  
      // Validate Cell 2 (feature query)
      if (!featureCellResult || !featureCellResult.rows || featureCellResult.rows.length === 0) {
        throw new Error("Feature cell (Cell 2) returned no rows. Please check the feature query or data availability.");
      }
  
      // Step 3: Save the results to S3
      console.log("[handlePredictOnNewData] Saving prediction results to S3...");
      const saveResp = await fetch(`${API_BASE_URL}/api/save_prediction_results/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${authToken}`,
        },
        body: JSON.stringify({
          user_id,
          chat_id,
          file_id: predictionFileInfo.id,
          cells: cellResults,
          prediction_id: predictionFileInfo.prediction_id,
        }),
      });
  
      if (!saveResp.ok) {
        const errText = await saveResp.text();
        throw new Error(`Saving results failed: ${errText}`);
      }
  
      const saveData = await saveResp.json();
      console.log("[handlePredictOnNewData] Prediction results saved:", saveData);
  
      // Step 4: Use the modified file URL from saveData (File B)
      const modifiedFileUrls = saveData.files;
      const modifiedFileUrl = modifiedFileUrls[Object.keys(modifiedFileUrls)[1]]; // Cell 2's output
  
      if (!modifiedFileUrl) {
        throw new Error("No modified file URL returned from save_prediction_results for Cell 2.");
      }
  
      // Step 5: Start the ML process with the modified file URL
      const predictionPayload = {
        file_url: modifiedFileUrl,
        entity_column: predictiveSettings?.entity_column || "product_id",
        user_id: user_id,
        chat_id: chat_id,
        machine_learning_type: predictiveSettings?.machine_learning_type || "regression",
        prediction_id: predictionFileInfo.prediction_id,
        target_column: predictiveSettings?.target_column || "",
        time_column: predictiveSettings?.time_column || "",
        new_target_column: predictiveSettings?.new_target_column || "",
        prediction_type: predictiveSettings?.prediction_type || "",
        features: predictiveSettings?.features || [],
      };
      console.log("[handlePredictOnNewData] predictionPayload:", predictionPayload);
  
      const predictionResponse = await fetch(`${API_BASE_URL}/api/prediction/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${authToken}`,
        },
        body: JSON.stringify(predictionPayload),
      });
  
      if (!predictionResponse.ok) {
        const errText = await predictionResponse.text();
        throw new Error(`Prediction initiation failed: ${errText}`);
      }
  
      const predictionResult = await predictionResponse.json();
      console.log("[handlePredictOnNewData] Prediction started:", predictionResult);
  
      alert("Prediction Initiated and Results Saved Successfully!");
      fetchPredictions();
    } catch (error) {
      console.error("[handlePredictOnNewData] Error:", error);
      alert(`Prediction failed: ${error instanceof Error ? error.message : "Unknown error"}`);
    } finally {
      setIsLoading(false);
      setShowPredictionWizard(false);
      setWizardStep(1);
      setSelectedFile(null);
      setPredictionFileInfo(null);
    }
  };

  // Build cells for the notebook
  const buildNotebookCells = () => {
    if (!predictionFileInfo) return [];
    return [
      {
        cell_type: "code",
        source: predictionFileInfo.prediction_queries.sampling_query,
        outputs: [],
      },
      {
        cell_type: "code",
        source: predictionFileInfo.prediction_queries.feature_query,
        outputs: [],
      },
    ];
  };

  // Color for status
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "completed": return "text-green-600";
      case "failed": return "text-red-600";
      case "running": return "text-blue-600";
      default: return "text-gray-600";
    }
  };

  const isUploaded = !!predictionFileInfo;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* HEADER */}
      <header className="bg-[#5B3557]">
        <div className="mx-auto px-8 py-6">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-semibold text-white">Predictions Dashboard</h1>
            <span className="text-sm text-white">
              (User: {user_id}, Chat: {chat_id})
            </span>
          </div>
        </div>
      </header>

      {/* MAIN CONTENT */}
      <div className="mx-auto max-w-screen-xl px-8 py-10 space-y-10">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* LEFT SIDEBAR */}
          <div className="lg:col-span-1 space-y-8">
            {/* Quick Prediction Card */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-4">
              <div className="flex items-center gap-2">
                <Upload className="h-5 w-5 text-gray-600" />
                <h2 className="text-lg font-semibold text-gray-900">Quick Prediction</h2>
              </div>
              <p className="text-sm text-gray-600">
                Upload CSV, and use your model for a one-time prediction on new data.
              </p>
              <button
                onClick={() => {
                  setShowPredictionWizard(true);
                  setWizardStep(1);
                  setSelectedFile(null);
                  setPredictionFileInfo(null);
                  setColumnsMatch(true);
                  setMismatchError("");
                  console.log("[Quick Prediction] Wizard opened. user_id:", user_id, "chat_id:", chat_id);
                }}
                className="
                  w-full
                  bg-[#5B3557] hover:bg-[#4A2C48]
                  text-white font-medium
                  py-2 px-4
                  rounded-lg
                  transition-colors
                "
              >
                One-time predict from csv
              </button>
            </div>

            {/* Scheduled Predictions Card */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-4">
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-gray-600" />
                <h2 className="text-lg font-semibold text-gray-900">Scheduled Predictions</h2>
              </div>
              <button
                className="
                  w-full
                  border border-gray-300
                  hover:bg-gray-50
                  text-gray-700 font-medium
                  py-2 px-4
                  rounded-lg
                  transition-colors
                "
              >
                Configure Schedule
              </button>
            </div>
          </div>

          {/* RIGHT CONTENT: Prediction History */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900">Prediction History</h2>
              </div>
              <div className="overflow-x-auto">
                {predictionsData.length === 0 ? (
                  <div className="p-8 text-center bg-gray-100">
                    <Monitor className="mx-auto mb-4 text-gray-400" size={48} />
                    <p className="text-lg text-gray-600">
                      Dashboard will only be available after you train your model
                    </p>
                  </div>
                ) : (
                  <table className="w-full text-sm">
                    <thead className="bg-gray-50 text-xs uppercase text-gray-500">
                      <tr>
                        <th className="px-6 py-3 text-left font-medium tracking-wider">Prediction ID</th>
                        <th className="px-6 py-3 text-left font-medium tracking-wider">Start Time</th>
                        <th className="px-6 py-3 text-left font-medium tracking-wider">Status</th>
                        <th className="px-6 py-3 text-left font-medium tracking-wider">Duration</th>
                        <th className="px-6 py-3 text-left font-medium tracking-wider">Entity Count</th>
                        <th className="px-6 py-3 text-left font-medium tracking-wider">Results</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {predictionsData.map((data) => (
                        <tr key={data.prediction_id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap font-mono text-gray-900">
                            {data.prediction_id}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                            {new Date(data.start_time).toLocaleString()}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={getStatusColor(data.status)}>
                              {data.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                            {data.duration ? `${data.duration.toFixed(2)}s` : "−"}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                            {data.entity_count}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {data.predictions_csv_path ? (
                              <a
                                // href={`https://s3.amazonaws.com/${bucket_name}/${data.predictions_csv_path}`}
                                href={`https://artifacts1137.s3.us-east-1.amazonaws.com/${data.predictions_csv_path}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-600 hover:text-blue-800 hover:underline"
                              >
                                Download CSV
                              </a>
                            ) : (
                              "−"
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* PREDICTION WIZARD MODAL */}
        {showPredictionWizard && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div
              className="
                bg-white rounded-xl shadow-2xl
                w-full max-w-7xl
                max-h-[90vh]
                overflow-y-auto
                p-8
                relative
              "
            >
              {/* Modal Header */}
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-900">
                  Select Data to Predict 
                </h2>
                <button
                  onClick={() => {
                    setShowPredictionWizard(false);
                    setWizardStep(1);
                    setSelectedFile(null);
                    setPredictionFileInfo(null);
                    setColumnsMatch(true);
                    setMismatchError("");
                    console.log("[Wizard] closed. user_id:", user_id, "chat_id:", chat_id);
                  }}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* STEP 1: Upload CSV */}
              {wizardStep === 1 && (
                <div className="space-y-8">
                  <div className="space-y-2">
                    <p className="text-sm text-gray-600">
                      <strong className="text-purple-800 font-medium">Important:</strong> Your CSV must include the 
                      <span className="text-purple-800 font-medium"> entity & feature columns </span>
                      from the trained model, but <em>exclude</em> the target column.
                      <br />
                      Time column is optional, and extra columns are allowed.
                    </p>
                    {requiredColumns.length > 0 && (
                      <p className="text-sm text-gray-500">
                        <strong className="text-purple-800 font-medium">Required:</strong> {requiredColumns.join(", ")}
                        {disallowedTarget && (
                          <>
                            <br />
                            <strong className="text-red-600 font-medium">Excluded:</strong> {disallowedTarget}
                          </>
                        )}
                      </p>
                    )}
                  </div>

                  <div className="border-t border-gray-200 pt-4 space-y-4">
                    <p className="text-sm text-gray-600">Upload your CSV Below</p>

                    {/* File Input */}
                    <input
                      type="file"
                      accept=".csv"
                      onChange={handleFileChange}
                      className="
                        block w-full text-sm text-gray-500
                        file:mr-4 file:py-2 file:px-4
                        file:rounded-full file:border-0
                        file:text-sm file:font-semibold
                        file:bg-[#5B3557] file:text-white
                        hover:file:bg-[#4A2C48]
                      "
                      id="fileInput"
                    />
                    <label
                      htmlFor="fileInput"
                      className="block w-full text-center text-sm text-gray-500 mt-2"
                    >
                      {selectedFile ? selectedFile.name : "No file chosen"}
                    </label>

                    {/* Show mismatch error if any, styled to match your screenshots */}
                    {mismatchError && (
                      <div className="mt-4 p-3 bg-yellow-100 border-l-4 border-yellow-500 text-sm text-gray-700 rounded-r">
                        {mismatchError}
                      </div>
                    )}

                    <div className="flex items-center gap-4 mt-4">
                      {/* "Upload File" => "Uploading..." => "Uploaded" logic */}
                      <button
                        onClick={handleQuickPrediction}
                        disabled={!selectedFile || isLoading || !columnsMatch || isUploaded}
                        className={`
                          ${
                            isUploaded
                              ? "bg-green-600 cursor-not-allowed"
                              : "bg-[#5B3557] hover:bg-[#4A2C48]"
                          }
                          disabled:bg-gray-300
                          text-white font-medium
                          py-2 px-4
                          rounded-lg
                          transition-colors
                        `}
                      >
                        {isUploaded
                          ? "Uploaded"
                          : isLoading
                          ? "Uploading..."
                          : "Upload File"}
                      </button>

                      {/* “Review Query” is disabled until `predictionFileInfo` is set (upload done) */}
                      <button
                        onClick={() => setWizardStep(2)}
                        disabled={!predictionFileInfo || isLoading}
                        className="
                          bg-[#5B3557] hover:bg-[#4A2C48]
                          disabled:bg-gray-300 disabled:cursor-not-allowed
                          text-white font-medium
                          py-2 px-4
                          rounded-lg
                          transition-colors
                        "
                      >
                        Review Query
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 2: Review Queries */}
              {wizardStep === 2 && predictionFileInfo && (
                <div className="space-y-8">
                  <div className="space-y-2">
                    <p className="text-sm text-gray-600">
                      Review the queries that will pull in new data for prediction...
                    </p>
                  </div>

                  {/* Step 2: Replace Tables */}
                  <div className="border-t border-gray-200 pt-4 space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-gray-700">1</span>
                      <span className="text-sm text-gray-700">Replace tables</span>
                    </div>
                    <p className="text-sm text-gray-600">
                      The new dataset must have entity & features columns, and not the target column.
                    </p>
                    <div className="mt-2 text-sm text-gray-600 space-y-1">
                      <p>New table: {predictionFileInfo.name}</p>
                    </div>
                  </div>

                  {/* Step 2: Review Query as Notebook */}
                  <div className="border-t border-gray-200 pt-4 space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-gray-700">2</span>
                      <span className="text-sm text-gray-700">Review query</span>
                    </div>

                    <SQLNotebook
                      ref={notebookRef}
                      activeTab="prediction_notebook"
                      notebookContent={{
                        file_url: predictionFileInfo.file_url,
                        entity_column: predictiveSettings?.entity_column || "",
                        target_column: predictiveSettings?.target_column || "",
                        features: predictiveSettings?.features || [],
                        user_id,
                        chat_id: predictionFileInfo.chat_id,
                        isTrained: false,
                        handleTrainModel: () => {},
                        cells: buildNotebookCells(),
                      }}
                    />
                  </div>

                  {/* Step 2 Buttons */}
                  <div className="flex justify-end gap-4 mt-6">
                    <button
                      onClick={() => setWizardStep(1)}
                      className="
                        border border-gray-300
                        hover:bg-gray-50
                        text-gray-700 font-medium
                        py-2 px-4
                        rounded-lg
                        transition-colors
                      "
                    >
                      Back
                    </button>
                    <button
                      onClick={handlePredictOnNewData}
                      disabled={isLoading}
                      className="
                        bg-[#5B3557] hover:bg-[#4A2C48]
                        disabled:bg-gray-300
                        text-white font-medium
                        py-2 px-4
                        rounded-lg
                        transition-colors
                      "
                    >
                      {isLoading ? "Predicting..." : "Predict on New Data"}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PredictionsUI;