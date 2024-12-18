
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
//       const response = await axios.post("http://localhost:8000/api/auth/login/", formData);
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


// import Cookies from "js-cookie"; // For handling cookies
// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import { Eye, EyeOff, Lock, User } from 'lucide-react';

// const Login: React.FC = () => {
//   const [formData, setFormData] = useState({ username: "", password: "" });
//   const [error, setError] = useState("");
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [showPassword, setShowPassword] = useState(false);
//   const navigate = useNavigate();

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

  // const handleSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault();
  //   setError("");
  //   setIsSubmitting(true);

  //   // Basic Validation
  //   if (!formData.username || !formData.password) {
  //     setError("Both fields are required");
  //     setIsSubmitting(false);
  //     return;
  //   }

  //   try {
  //     const response = await axios.post("http://localhost:8000/api/auth/login/", formData);
  //     localStorage.setItem("token", response.data.access); // Store the access token
  //   //   navigate("/dashboard");
  //     navigate("/");
  //   } catch (err: any) {
  //     if (err.response && err.response.data) {
  //       setError(err.response.data.error || "Login failed");
  //     } else {
  //       setError("An unexpected error occurred");
  //     }
  //   } finally {
  //     setIsSubmitting(false);
  //   }
  // };

 

// const handleSubmit = async (e: React.FormEvent) => {
//   e.preventDefault();
//   setError("");
//   setIsSubmitting(true);

//   if (!formData.username || !formData.password) {
//     setError("Both fields are required");
//     setIsSubmitting(false);
//     return;
//   }

//   try {
//     const response = await axios.post("http://localhost:8000/api/auth/login/", formData);

//     const { access, refresh, user } = response.data;

//     // Store tokens and user details securely
//     localStorage.setItem("token", access);
//     Cookies.set("refreshToken", refresh, { expires: 7, secure: true, sameSite: "Strict" });
//     localStorage.setItem("user", JSON.stringify(user));

//     // Redirect to dashboard
//     navigate("/dashboard");
//   } catch (err: any) {
//     setError(err.response?.data?.error || "Login failed");
//   } finally {
//     setIsSubmitting(false);
//   }
// };


//   const togglePasswordVisibility = () => {
//     setShowPassword(!showPassword);
//   };

//   const handleForgotPassword = () => {
//     navigate("/forgot-password");
//   };

//   const handleSignUp = () => {
//     navigate("/signup");
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 py-8">
//       <div className="w-full max-w-md bg-white shadow-md rounded-xl p-8">
//         <div className="text-center mb-6">
//           <h1 className="text-3xl font-bold text-gray-800">Welcome Back</h1>
//           <p className="text-gray-600 mt-2">Sign in to continue to your account</p>
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
//             {isSubmitting ? "Logging in..." : "Login"}
//           </button>
          
//           <div className="flex justify-between text-sm">
//             <button 
//               type="button"
//               onClick={handleForgotPassword}
//               className="text-blue-500 hover:underline"
//             >
//               Forgot Password?
//             </button>
//             <button 
//               type="button"
//               onClick={handleSignUp}
//               className="text-blue-500 hover:underline"
//             >
//               Sign Up
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Login;


import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import { User, Lock, Eye, EyeOff } from "lucide-react";
import { useAuth } from "./AuthContext";

interface LoginFormData {
  username: string;
  password: string;
}

const Login: React.FC = () => {
  const [formData, setFormData] = useState<LoginFormData>({
    username: "",
    password: "",
  });
  const [error, setError] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const navigate = useNavigate();
  const { login } = useAuth();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    if (!formData.username || !formData.password) {
      setError("Both fields are required");
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await axios.post("http://localhost:8000/api/auth/login/", formData);

      const { access, refresh, user } = response.data;

      // Store tokens and user details securely
      localStorage.setItem("token", access);
      Cookies.set("refreshToken", refresh, { expires: 7, secure: true, sameSite: "Strict" });
      
      // Use the login function from AuthContext
      login(user);

      // Redirect to dashboard
      navigate("/dashboard");
    } catch (err: any) {
      setError(err.response?.data?.error || "Login failed");
    } finally {
      setIsSubmitting(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleForgotPassword = () => {
    navigate("/forgot-password");
  };

  const handleSignUp = () => {
    navigate("/signup");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 py-8">
      <div className="w-full max-w-md bg-white shadow-md rounded-xl p-8">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Welcome Back</h1>
          <p className="text-gray-600 mt-2">Sign in to continue to your account</p>
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
            {isSubmitting ? "Logging in..." : "Login"}
          </button>
          
          <div className="flex justify-between text-sm">
            <button 
              type="button"
              onClick={handleForgotPassword}
              className="text-blue-500 hover:underline"
            >
              Forgot Password?
            </button>
            <button 
              type="button"
              onClick={handleSignUp}
              className="text-blue-500 hover:underline"
            >
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;