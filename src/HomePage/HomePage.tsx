// import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { 
//   LayoutGrid, 
//   List, 
//   Plus, 
//   Timer, 
//   Zap, 
//   Activity,
//   MoreVertical, 
//   ChevronRight,
//   Search
// } from 'lucide-react';

// const Homepage = () => {
//   const [viewMode, setViewMode] = useState('grid');
//   const [showNewFlow, setShowNewFlow] = useState(false);
//   const navigate = useNavigate();

//   const flows = [
//     {
//       id: '47384',
//       name: 'Customer Churn Predictor',
//       status: 'Active',
//       progress: 76,
//       lastRun: '2h ago',
//       type: 'Production'
//     },
//     {
//       id: '47372',
//       name: 'Revenue Forecasting',
//       status: 'Training',
//       progress: 45,
//       lastRun: '5h ago',
//       type: 'Development'
//     },
//     {
//       id: '47371',
//       name: 'User Segmentation',
//       status: 'Pending',
//       progress: 0,
//       lastRun: '1d ago',
//       type: 'Testing'
//     }
//   ];

//   return (
//     <div className="min-h-screen bg-slate-50">
//       {/* Modern Sidebar */}
//       <div className="fixed left-0 top-0 h-full w-16 bg-teal-700 flex flex-col items-center py-6 space-y-8">
//         <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
//           <span className="text-teal-700 font-bold">P</span>
//         </div>
//         <div className="space-y-6">
//           <button className="w-10 h-10 rounded-lg bg-teal-600 flex items-center justify-center">
//             <Activity className="w-5 h-5 text-white" />
//           </button>
//           <button className="w-10 h-10 rounded-lg hover:bg-teal-600/30 flex items-center justify-center">
//             <Timer className="w-5 h-5 text-white" />
//           </button>
//           <button className="w-10 h-10 rounded-lg hover:bg-teal-600/30 flex items-center justify-center">
//             <Zap className="w-5 h-5 text-white" />
//           </button>
//         </div>
//       </div>

//       {/* Main Content */}
//       <div className="ml-16 p-8">
//         {/* Header */}
//         <div className="flex items-center justify-between mb-8">
//           <div>
//             <h1 className="text-2xl font-semibold text-slate-800">Predictive Flows</h1>
//             <p className="text-slate-500 text-sm mt-1">Manage and monitor your ML predictions</p>
//           </div>
          
//           <div className="flex items-center space-x-4">
//             <div className="relative">
//               <input
//                 type="text"
//                 placeholder="Search flows..."
//                 className="pl-10 pr-4 py-2 w-64 bg-white border-0 rounded-xl shadow-sm text-sm focus:ring-2 focus:ring-teal-500"
//               />
//               <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
//             </div>
            
//             <button 
//               onClick={() => setShowNewFlow(!showNewFlow)}
//               className="bg-teal-500 text-white px-4 py-2 rounded-xl shadow-sm hover:bg-teal-600 flex items-center space-x-2"
//             >
//               <Plus className="w-4 h-4" />
//               <span className="text-sm font-medium">New Flow</span>
//             </button>
//           </div>
//         </div>

//         {/* View Toggle & Filters */}
//         <div className="flex items-center justify-between mb-6">
//           <div className="flex items-center space-x-4">
//             <button 
//               onClick={() => setViewMode('grid')}
//               className={`p-2 rounded-lg ${viewMode === 'grid' ? 'bg-white shadow text-teal-600' : 'text-slate-600'}`}
//             >
//               <LayoutGrid className="w-5 h-5" />
//             </button>
//             <button 
//               onClick={() => setViewMode('list')}
//               className={`p-2 rounded-lg ${viewMode === 'list' ? 'bg-white shadow text-teal-600' : 'text-slate-600'}`}
//             >
//               <List className="w-5 h-5" />
//             </button>
//           </div>
          
//           <div className="flex items-center space-x-3">
//             <button className="px-4 py-1.5 rounded-full text-sm bg-white shadow-sm text-teal-600 border border-teal-200">
//               All Flows
//             </button>
//             <button className="px-4 py-1.5 rounded-full text-sm hover:bg-white hover:shadow-sm text-slate-600">
//               Production
//             </button>
//             <button className="px-4 py-1.5 rounded-full text-sm hover:bg-white hover:shadow-sm text-slate-600">
//               Development
//             </button>
//           </div>
//         </div>

//         {/* Grid View */}
//         {viewMode === 'grid' && (
//           <div className="grid grid-cols-3 gap-6">
//             {flows.map((flow) => (
//               <div key={flow.id} className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
//                 <div className="flex items-start justify-between mb-4">
//                   <div>
//                     <h3 className="font-medium text-slate-800">{flow.name}</h3>
//                     <span className="text-xs text-slate-500">ID: {flow.id}</span>
//                   </div>
//                   <button className="text-slate-400 hover:text-slate-600">
//                     <MoreVertical className="w-4 h-4" />
//                   </button>
//                 </div>
                
//                 <div className="space-y-4">
//                   <div className="flex items-center justify-between text-sm">
//                     <span className="text-slate-500">Status</span>
//                     <span className={`px-2 py-1 rounded-full text-xs ${
//                       flow.status === 'Active' ? 'bg-green-100 text-green-700' :
//                       flow.status === 'Training' ? 'bg-blue-100 text-blue-700' :
//                       'bg-yellow-100 text-yellow-700'
//                     }`}>
//                       {flow.status}
//                     </span>
//                   </div>
                  
//                   <div className="space-y-2">
//                     <div className="flex items-center justify-between text-sm">
//                       <span className="text-slate-500">Progress</span>
//                       <span className="text-slate-700">{flow.progress}%</span>
//                     </div>
//                     <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
//                       <div 
//                         className="h-full bg-teal-500 rounded-full"
//                         style={{ width: `${flow.progress}%` }}
//                       />
//                     </div>
//                   </div>
                  
//                   <div className="pt-4 flex items-center justify-between text-sm">
//                     <span className="text-slate-500">Last run {flow.lastRun}</span>
//                     <button className="text-teal-600 hover:text-teal-700 flex items-center">
//                       Details
//                       <ChevronRight className="w-4 h-4 ml-1" />
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}

//         {/* List View */}
//         {viewMode === 'list' && (
//           <div className="bg-white rounded-xl shadow-sm overflow-hidden">
//             <table className="w-full">
//               <thead>
//                 <tr className="border-b border-slate-100">
//                   <th className="text-left py-4 px-6 text-sm font-medium text-slate-500">Name</th>
//                   <th className="text-left py-4 px-6 text-sm font-medium text-slate-500">Status</th>
//                   <th className="text-left py-4 px-6 text-sm font-medium text-slate-500">Progress</th>
//                   <th className="text-left py-4 px-6 text-sm font-medium text-slate-500">Last Run</th>
//                   <th className="text-left py-4 px-6 text-sm font-medium text-slate-500">Type</th>
//                   <th></th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {flows.map((flow) => (
//                   <tr key={flow.id} className="border-b border-slate-100 hover:bg-slate-50">
//                     <td className="py-4 px-6">
//                       <div>
//                         <div className="font-medium text-slate-800">{flow.name}</div>
//                         <div className="text-xs text-slate-500">ID: {flow.id}</div>
//                       </div>
//                     </td>
//                     <td className="py-4 px-6">
//                       <span className={`px-2 py-1 rounded-full text-xs ${
//                         flow.status === 'Active' ? 'bg-green-100 text-green-700' :
//                         flow.status === 'Training' ? 'bg-blue-100 text-blue-700' :
//                         'bg-yellow-100 text-yellow-700'
//                       }`}>
//                         {flow.status}
//                       </span>
//                     </td>
//                     <td className="py-4 px-6">
//                       <div className="w-32">
//                         <div className="flex items-center justify-between text-sm mb-1">
//                           <span className="text-slate-700">{flow.progress}%</span>
//                         </div>
//                         <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
//                           <div 
//                             className="h-full bg-teal-500 rounded-full"
//                             style={{ width: `${flow.progress}%` }}
//                           />
//                         </div>
//                       </div>
//                     </td>
//                     <td className="py-4 px-6">
//                       <span className="text-sm text-slate-600">{flow.lastRun}</span>
//                     </td>
//                     <td className="py-4 px-6">
//                       <span className="text-sm text-slate-600">{flow.type}</span>
//                     </td>
//                     <td className="py-4 px-6">
//                       <button className="text-slate-400 hover:text-slate-600">
//                         <MoreVertical className="w-4 h-4" />
//                       </button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         )}

//         {/* New Flow Dropdown */}
//         {showNewFlow && (
//           <div className="absolute right-8 top-24 w-64 bg-white rounded-xl shadow-lg border border-slate-100 overflow-hidden">
//             <div className="p-4 border-b border-slate-100">
//               <h3 className="font-medium text-slate-800">Create New Flow</h3>
//             </div>
//             <div className="p-2">
//               <button className="w-full text-left px-4 py-2 text-sm text-slate-600 hover:bg-slate-50 rounded-lg " onClick={() => navigate('/chat')}>
//                 New chat
//               </button>
//               <button className="w-full text-left px-4 py-2 text-sm text-slate-600 hover:bg-slate-50 rounded-lg">
//                 See previous chats
//               </button>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Homepage;




















import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  LayoutGrid,
  List,
  Plus,
  Timer,
  Zap,
  Activity,
  MoreVertical,
  ChevronRight,
  Search
} from 'lucide-react';

// Example interface for a Notebook object
interface Notebook {
  chat_id: any;
  id: number;
  entity_column: string;
  target_column: string;
  time_column: string | null;
  time_frame: string | null;
  time_frequency: string | null;
  features: string[];
  file_url: string;
  created_at: string;
  // We'll also store "chat_id" in a moment (if you keep it in DB),
  // or we might have to guess from your backend. If not, we skip.
  // We'll also attach "status" from the second fetch:
  status?: string;
}

// Hard-coded user ID for demonstration
const HARDCODED_USER_ID = 2;

const Homepage = () => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showNewFlow, setShowNewFlow] = useState(false);
  const [notebooks, setNotebooks] = useState<Notebook[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  // 1) Fetch all notebooks for the user from /api/notebooks/?user_id=2
  useEffect(() => {
    const fetchNotebooks = async () => {
      setLoading(true);
      try {
        const url = `http://localhost:8000/api/notebooks/?user_id=${HARDCODED_USER_ID}`;
        const resp = await fetch(url);
        if (!resp.ok) {
          throw new Error(`Failed to fetch notebooks: ${resp.statusText}`);
        }
        const data = await resp.json();
        if (!data.notebooks) {
          throw new Error('No notebooks found in response');
        }
        const rawNotebooks: Notebook[] = data.notebooks;

        // 2) For each notebook, we also fetch the status from the second endpoint
        //    http://127.0.0.1:8000/api/get_prediction_metadata/?user_id=xxx&chat_id=yyy
        //    If we have a 'user_id' and 'chat_id', we can do that.
        //    But if your backend doesn't store chat_id in the Notebook table, you'll need to adapt.
        //    For demonstration, let's assume "chat_id" is the same as "id" or stored somehow.
        //    We'll skip if we don't have a real chat_id. Adjust as needed.

        const notebooksWithStatus: Notebook[] = [];
        for (const nb of rawNotebooks) {
          // If your code stores chat_id as well, or if 'id' is used as chat_id:
          // For now, let's just pretend "chat_id" is "nb.id" or you might store "chat_id" in the notebook object.
          const chat_id = nb.chat_id.toString(); 
          // The second endpoint expects user_id in string form? We'll try "2" as string:
          const user_id_str = HARDCODED_USER_ID.toString();
          console.log(chat_id, user_id_str);
          console.log("....................");

          try {
            const metaUrl = `http://127.0.0.1:8000/api/get_prediction_metadata/?user_id=${user_id_str}&chat_id=${chat_id}`;
            console.log(metaUrl);
            console.log(" this is meta url....................");
            // const metaUrl = "http://127.0.0.1:8000/api/get_prediction_metadata/?user_id=9&chat_id=cc2ea5cc-0805-4c2d-b79b-47b4751c03d1"
            const metaResp = await fetch(metaUrl);
            if (metaResp.ok) {
              const metaData = await metaResp.json();
              const item = metaData.metadata?.[0];
              if (item?.status) {
                nb.status = item.status; // "step1", "step2", "success", etc.
              } else {
                nb.status = 'unknown';
              }
            } else {
              nb.status = 'unknown';
            }
          } catch (err) {
            // if second fetch fails, set status=unknown
            nb.status = 'unknown';
          }
          notebooksWithStatus.push(nb);
        }

        setNotebooks(notebooksWithStatus);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchNotebooks();
  }, []);

  // 3) We'll reuse your "flows" UI, but now we use "notebooks" from state
  //    We'll rename them "flows" for demonstration, or just keep them as notebooks
  //    So let's create a function to transform them into a shape for your UI
  const flows = notebooks.map((nb) => {
    
    // The "id" can be nb.id
    // The "name" might be something like "Notebook # + id" or entity/target
    // The "status" might be nb.status
    // The "progress" is unclear from the data, so let's guess. If status=success => 100, else 50?
    // The "type" might be derived from time_column or something. We'll just say "time-based"
    let progress = 0;
    if (nb.status === 'success') {
      progress = 100;
    } else if (nb.status?.startsWith('step')) {
      // parse "step2" => progress=66 ?
      // We'll do a quick hack:
      const stepNum = parseInt(nb.status.replace('step', ''), 10);
      if (!isNaN(stepNum)) {
        progress = stepNum * 25; // step1=25, step2=50, step3=75
      }
    }

    return {
      id: nb.id,
      name: `Notebook ${nb.id}`,
      status: nb.status || 'pending',
      progress,
      lastRun: nb.created_at, // or some other date/time
      type: nb.time_column ? 'Time-Based' : 'Non-time', // just an example
      chat_id: nb.chat_id,
      // we can store user_id and chat_id as well if we want
    };
  });

  const handleNotebookClick = (flow: any) => {
    // On click => navigate to /notebook
    // Passing the user_id and chat_id
    // We'll assume "chat_id" = flow.id for demonstration
    // But you might have real user_id in the notebook object
  //   navigate(`/notebook`, {
  //     state: {
  //       user_id: HARDCODED_USER_ID,
  //       chat_id: flow.id, 
  //       isTrained: false // or some logic
  //     },
  //   }
  // );

  navigate(`/notebook/${HARDCODED_USER_ID}/${flow.chat_id}`, {
    // navigate(`/notebook/9/977f5ec5-7b5f-45fa-949d-f850343ec322`, {
    state: {
      isTrained: false, // Initially not trained
    },
  });
  };

  // The rest is your existing UI, but replaced the "flows" array with this new logic
  if (loading) {
    return <div className="p-8">Loading notebooks...</div>;
  }
  if (error) {
    return <div className="p-8 text-red-500">Error: {error}</div>;
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Modern Sidebar */}
      <div className="fixed left-0 top-0 h-full w-16 bg-teal-700 flex flex-col items-center py-6 space-y-8">
        <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
          <span className="text-teal-700 font-bold">P</span>
        </div>
        <div className="space-y-6">
          <button className="w-10 h-10 rounded-lg bg-teal-600 flex items-center justify-center">
            <Activity className="w-5 h-5 text-white" />
          </button>
          <button className="w-10 h-10 rounded-lg hover:bg-teal-600/30 flex items-center justify-center">
            <Timer className="w-5 h-5 text-white" />
          </button>
          <button className="w-10 h-10 rounded-lg hover:bg-teal-600/30 flex items-center justify-center">
            <Zap className="w-5 h-5 text-white" />
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="ml-16 p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-semibold text-slate-800">Predictive Flows</h1>
            <p className="text-slate-500 text-sm mt-1">Manage and monitor your ML predictions</p>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search flows..."
                className="pl-10 pr-4 py-2 w-64 bg-white border-0 rounded-xl shadow-sm text-sm focus:ring-2 focus:ring-teal-500"
              />
              <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
            </div>
            
            <button 
              onClick={() => setShowNewFlow(!showNewFlow)}
              className="bg-teal-500 text-white px-4 py-2 rounded-xl shadow-sm hover:bg-teal-600 flex items-center space-x-2"
            >
              <Plus className="w-4 h-4" />
              <span className="text-sm font-medium">New Flow</span>
            </button>
          </div>
        </div>

        {/* View Toggle & Filters */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <button 
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-lg ${viewMode === 'grid' ? 'bg-white shadow text-teal-600' : 'text-slate-600'}`}
            >
              <LayoutGrid className="w-5 h-5" />
            </button>
            <button 
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-lg ${viewMode === 'list' ? 'bg-white shadow text-teal-600' : 'text-slate-600'}`}
            >
              <List className="w-5 h-5" />
            </button>
          </div>
          
          <div className="flex items-center space-x-3">
            <button className="px-4 py-1.5 rounded-full text-sm bg-white shadow-sm text-teal-600 border border-teal-200">
              All Flows
            </button>
            <button className="px-4 py-1.5 rounded-full text-sm hover:bg-white hover:shadow-sm text-slate-600">
              Production
            </button>
            <button className="px-4 py-1.5 rounded-full text-sm hover:bg-white hover:shadow-sm text-slate-600">
              Development
            </button>
          </div>
        </div>

        {/* Grid View */}
        {viewMode === 'grid' && (
          <div className="grid grid-cols-3 gap-6">
            {flows.map((flow) => (
              <div 
                key={flow.id} 
                className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow"
                onClick={() => handleNotebookClick(flow)}
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="font-medium text-slate-800">{flow.name}</h3>
                    <span className="text-xs text-slate-500">ID: {flow.id}</span>
                  </div>
                  <button className="text-slate-400 hover:text-slate-600">
                    <MoreVertical className="w-4 h-4" />
                  </button>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-500">Status</span>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      flow.status === 'success' ? 'bg-green-100 text-green-700' :
                      flow.status?.startsWith('step') ? 'bg-blue-100 text-blue-700' :
                      'bg-yellow-100 text-yellow-700'
                    }`}>
                      {flow.status}
                    </span>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-slate-500">Progress</span>
                      <span className="text-slate-700">{flow.progress}%</span>
                    </div>
                    <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-teal-500 rounded-full"
                        style={{ width: `${flow.progress}%` }}
                      />
                    </div>
                  </div>
                  
                  <div className="pt-4 flex items-center justify-between text-sm">
                    <span className="text-slate-500">Last run {flow.lastRun}</span>
                    <button 
                      className="text-teal-600 hover:text-teal-700 flex items-center"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleNotebookClick(flow);
                      }}
                    >
                      Details
                      <ChevronRight className="w-4 h-4 ml-1" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* List View */}
        {viewMode === 'list' && (
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-100">
                  <th className="text-left py-4 px-6 text-sm font-medium text-slate-500">Name</th>
                  <th className="text-left py-4 px-6 text-sm font-medium text-slate-500">Status</th>
                  <th className="text-left py-4 px-6 text-sm font-medium text-slate-500">Progress</th>
                  <th className="text-left py-4 px-6 text-sm font-medium text-slate-500">Last Run</th>
                  <th className="text-left py-4 px-6 text-sm font-medium text-slate-500">Type</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {flows.map((flow) => (
                  <tr 
                    key={flow.id} 
                    className="border-b border-slate-100 hover:bg-slate-50"
                    onClick={() => handleNotebookClick(flow)}
                  >
                    <td className="py-4 px-6">
                      <div>
                        <div className="font-medium text-slate-800">{flow.name}</div>
                        <div className="text-xs text-slate-500">ID: {flow.id}</div>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        flow.status === 'success' ? 'bg-green-100 text-green-700' :
                        flow.status?.startsWith('step') ? 'bg-blue-100 text-blue-700' :
                        'bg-yellow-100 text-yellow-700'
                      }`}>
                        {flow.status}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <div className="w-32">
                        <div className="flex items-center justify-between text-sm mb-1">
                          <span className="text-slate-700">{flow.progress}%</span>
                        </div>
                        <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-teal-500 rounded-full"
                            style={{ width: `${flow.progress}%` }}
                          />
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <span className="text-sm text-slate-600">{flow.lastRun}</span>
                    </td>
                    <td className="py-4 px-6">
                      <span className="text-sm text-slate-600">{flow.type}</span>
                    </td>
                    <td className="py-4 px-6">
                      <button 
                        className="text-slate-400 hover:text-slate-600"
                        onClick={(e) => {
                          e.stopPropagation();
                          // maybe show a context menu here
                        }}
                      >
                        <MoreVertical className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* New Flow Dropdown */}
        {showNewFlow && (
          <div className="absolute right-8 top-24 w-64 bg-white rounded-xl shadow-lg border border-slate-100 overflow-hidden">
            <div className="p-4 border-b border-slate-100">
              <h3 className="font-medium text-slate-800">Create New Flow</h3>
            </div>
            <div className="p-2">
              <button 
                className="w-full text-left px-4 py-2 text-sm text-slate-600 hover:bg-slate-50 rounded-lg"
                onClick={() => navigate('/chat')}
              >
                New chat
              </button>
              <button className="w-full text-left px-4 py-2 text-sm text-slate-600 hover:bg-slate-50 rounded-lg">
                See previous chats
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Homepage;
