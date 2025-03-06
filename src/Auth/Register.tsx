

// // import React, { useState } from "react";
// // import { useNavigate } from "react-router-dom";
// // import axios from "axios";

// // const Register: React.FC = () => {
// //   const [formData, setFormData] = useState({ username: "", email: "", password: "" });
// //   const [error, setError] = useState("");
// //   const [isSubmitting, setIsSubmitting] = useState(false);
// //   const navigate = useNavigate();

// //   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
// //     setFormData({ ...formData, [e.target.name]: e.target.value });
// //   };

// //   const handleSubmit = async (e: React.FormEvent) => {
// //     e.preventDefault();
// //     setError("");
// //     setIsSubmitting(true);

// //     // Basic Validation
// //     if (!formData.username || !formData.email || !formData.password) {
// //       setError("All fields are required");
// //       setIsSubmitting(false);
// //       return;
// //     }

// //     try {
// //       await axios.post("http://98.70.25.52/api/auth/register/", formData);
// //       navigate("/login");
// //     } catch (err: any) {
// //       if (err.response && err.response.data) {
// //         setError(err.response.data.detail || "Registration failed");
// //       } else {
// //         setError("An unexpected error occurred");
// //       }
// //     } finally {
// //       setIsSubmitting(false);
// //     }
// //   };

// //   return (
// //     <div>
// //       <h1>Register</h1>
// //       <form onSubmit={handleSubmit}>
// //         <input name="username" placeholder="Username" onChange={handleChange} value={formData.username} />
// //         <input name="email" placeholder="Email" onChange={handleChange} value={formData.email} />
// //         <input name="password" type="password" placeholder="Password" onChange={handleChange} value={formData.password} />
// //         {error && <p style={{ color: "red" }}>{error}</p>}
// //         <button type="submit" disabled={isSubmitting}>
// //           {isSubmitting ? "Registering..." : "Register"}
// //         </button>
// //       </form>
// //     </div>
// //   );
// // };

// // export default Register;



// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import { Eye, EyeOff, Lock, User, Mail } from 'lucide-react';

// const Register: React.FC = () => {
//   const [formData, setFormData] = useState({ 
//     username: "", 
//     email: "", 
//     password: "" 
//   });
//   const [error, setError] = useState("");
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [showPassword, setShowPassword] = useState(false);
//   const navigate = useNavigate();

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setError("");
//     setIsSubmitting(true);

//     // Enhanced Validation
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     if (!formData.username) {
//       setError("Username is required");
//       setIsSubmitting(false);
//       return;
//     }
//     if (!formData.email) {
//       setError("Email is required");
//       setIsSubmitting(false);
//       return;
//     }
//     if (!emailRegex.test(formData.email)) {
//       setError("Please enter a valid email address");
//       setIsSubmitting(false);
//       return;
//     }
//     if (formData.password.length < 8) {
//       setError("Password must be at least 8 characters long");
//       setIsSubmitting(false);
//       return;
//     }

//     try {
//       await axios.post("http://98.70.25.52/api/auth/register/", formData);
//       navigate("/login");
//     } catch (err: any) {
//       if (err.response && err.response.data) {
//         setError(err.response.data.detail || "Registration failed");
//       } else {
//         setError("An unexpected error occurred");
//       }
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const togglePasswordVisibility = () => {
//     setShowPassword(!showPassword);
//   };

//   const handleLogin = () => {
//     navigate("/login");
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 py-8">
//       <div className="w-full max-w-md bg-white shadow-md rounded-xl p-8">
//         <div className="text-center mb-6">
//           <h1 className="text-3xl font-bold text-gray-800">Create Account</h1>
//           <p className="text-gray-600 mt-2">Sign up to get started</p>
//         </div>
//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div className="relative">
//             <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//               <User className="h-5 w-5 text-gray-400" />
//             </div>
//             <input 
//               name="username"
//               type="text"
//               placeholder="Username"
//               onChange={handleChange}
//               value={formData.username}
//               className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//             />
//           </div>
          
//           <div className="relative">
//             <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//               <Mail className="h-5 w-5 text-gray-400" />
//             </div>
//             <input 
//               name="email"
//               type="email"
//               placeholder="Email"
//               onChange={handleChange}
//               value={formData.email}
//               className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//             />
//           </div>
          
//           <div className="relative">
//             <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//               <Lock className="h-5 w-5 text-gray-400" />
//             </div>
//             <input 
//               name="password"
//               type={showPassword ? "text" : "password"}
//               placeholder="Password"
//               onChange={handleChange}
//               value={formData.password}
//               className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//             />
//             <button
//               type="button"
//               onClick={togglePasswordVisibility}
//               className="absolute inset-y-0 right-0 pr-3 flex items-center"
//             >
//               {showPassword ? (
//                 <EyeOff className="h-5 w-5 text-gray-400" />
//               ) : (
//                 <Eye className="h-5 w-5 text-gray-400" />
//               )}
//             </button>
//           </div>

//           {error && (
//             <p className="text-red-500 text-sm text-center">
//               {error}
//             </p>
//           )}
          
//           <button 
//             type="submit" 
//             disabled={isSubmitting}
//             className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
//           >
//             {isSubmitting ? "Registering..." : "Register"}
//           </button>
          
//           <div className="text-center text-sm text-gray-600">
//             Already have an account?{" "}
//             <button 
//               type="button"
//               onClick={handleLogin}
//               className="text-blue-500 hover:underline"
//             >
//               Log in
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Register;



// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";

// const Login: React.FC = () => {
//   const [formData, setFormData] = useState({ username: "", password: "" });
//   const [error, setError] = useState("");
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const navigate = useNavigate();

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setError("");
//     setIsSubmitting(true);

//     // Basic Validation
//     if (!formData.username || !formData.password) {
//       setError("Both fields are required");
//       setIsSubmitting(false);
//       return;
//     }

//     try {
//       const response = await axios.post("http://98.70.25.52/api/auth/login/", formData);
//       localStorage.setItem("token", response.data.access); // Store the access token
//       navigate("/dashboard");
//     } catch (err: any) {
//       if (err.response && err.response.data) {
//         setError(err.response.data.error || "Login failed");
//       } else {
//         setError("An unexpected error occurred");
//       }
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <div>
//       <h1>Login</h1>
//       <form onSubmit={handleSubmit}>
//         <input name="username" placeholder="Username" onChange={handleChange} value={formData.username} />
//         <input name="password" type="password" placeholder="Password" onChange={handleChange} value={formData.password} />
//         {error && <p style={{ color: "red" }}>{error}</p>}
//         <button type="submit" disabled={isSubmitting}>
//           {isSubmitting ? "Logging in..." : "Login"}
//         </button>
//       </form>
//     </div>
//   );
// };

// export default Login;






import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Eye, EyeOff, Lock, User, Mail } from 'lucide-react';

const Register: React.FC = () => {
  const [formData, setFormData] = useState({ 
    username: "", 
    email: "", 
    password: "" 
  });
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // const handleSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault();
  //   setError("");
  //   setIsSubmitting(true);

  //   // Enhanced Validation
  //   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  //   if (!formData.username) {
  //     setError("Username is required");
  //     setIsSubmitting(false);
  //     return;
  //   }
  //   if (!formData.email) {
  //     setError("Email is required");
  //     setIsSubmitting(false);
  //     return;
  //   }
  //   if (!emailRegex.test(formData.email)) {
  //     setError("Please enter a valid email address");
  //     setIsSubmitting(false);
  //     return;
  //   }
  //   if (formData.password.length < 8) {
  //     setError("Password must be at least 8 characters long");
  //     setIsSubmitting(false);
  //     return;
  //   }

  //   try {
  //     await axios.post("http://98.70.25.52/api/auth/register/", formData);
  //     navigate("/login");
  //   } catch (err: any) {
  //     if (err.response && err.response.data) {
  //       setError(err.response.data.detail || "Registration failed");
  //     } else {
  //       setError("An unexpected error occurred");
  //     }
  //   } finally {
  //     setIsSubmitting(false);
  //   }
  // };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.username) {
        setError("Username is required");
        setIsSubmitting(false);
        return;
    }
    if (!formData.email) {
        setError("Email is required");
        setIsSubmitting(false);
        return;
    }
    if (!emailRegex.test(formData.email)) {
        setError("Please enter a valid email address");
        setIsSubmitting(false);
        return;
    }
    if (formData.password.length < 8) {
        setError("Password must be at least 8 characters long");
        setIsSubmitting(false);
        return;
    }

    try {
        const response = await axios.post("http://98.70.25.52/api/auth/register/", formData);

        // Log and display user_id or other data
        console.log("Response from server:", response.data);

        if (response.data) {
            console.log("User ID:", response.data.id || "N/A"); // Replace 'id' with the correct key
        }

        navigate("/login");
    } catch (err: any) {
        if (err.response && err.response.data) {
            console.error("Error response:", err.response.data);
            setError(err.response.data.detail || "Registration failed");
        } else {
            console.error("Unexpected error:", err);
            setError("An unexpected error occurred");
        }
    } finally {
        setIsSubmitting(false);
    }
};

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = () => {
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 py-8">
      <div className="w-full max-w-md bg-white shadow-md rounded-xl p-8">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Create Account</h1>
          <p className="text-gray-600 mt-2">Sign up to get started</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <User className="h-5 w-5 text-gray-400" />
            </div>
            <input 
              name="username"
              type="text"
              placeholder="Username"
              onChange={handleChange}
              value={formData.username}
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Mail className="h-5 w-5 text-gray-400" />
            </div>
            <input 
              name="email"
              type="email"
              placeholder="Email"
              onChange={handleChange}
              value={formData.email}
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Lock className="h-5 w-5 text-gray-400" />
            </div>
            <input 
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              onChange={handleChange}
              value={formData.password}
              className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
            >
              {showPassword ? (
                <EyeOff className="h-5 w-5 text-gray-400" />
              ) : (
                <Eye className="h-5 w-5 text-gray-400" />
              )}
            </button>
          </div>

          {error && (
            <p className="text-red-500 text-sm text-center">
              {error}
            </p>
          )}
          
          <button 
            type="submit" 
            disabled={isSubmitting}
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Registering..." : "Register"}
          </button>
          
          <div className="text-center text-sm text-gray-600">
            Already have an account?{" "}
            <button 
              type="button"
              onClick={handleLogin}
              className="text-blue-500 hover:underline"
            >
              Log in
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;