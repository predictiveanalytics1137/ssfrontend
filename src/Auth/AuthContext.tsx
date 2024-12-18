// import React, { createContext, useContext, useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import Cookies from "js-cookie";
// import axios from "axios";

// interface AuthContextType {
//   user: any;
//   login: (userData: any) => void;
//   logout: () => void;
// }

// const AuthContext = createContext<AuthContextType | null>(null);

// export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
//   const [user, setUser] = useState<any>(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     // Check local storage for user data
//     const savedUser = localStorage.getItem("user");
//     const token = localStorage.getItem("token");
//     if (savedUser && token) {
//       setUser(JSON.parse(savedUser));
//     }
//   }, []);

//   const login = (userData: any) => {
//     setUser(userData);
//   };

//   const logout = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("user");
//     Cookies.remove("refreshToken");
//     setUser(null);
//     navigate("/login");
//   };

//   return (
//     <AuthContext.Provider value={{ user, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => {
//   return useContext(AuthContext);
// };

// working
// import React, { createContext, useContext, useState, useEffect, useMemo } from "react";
// import Cookies from "js-cookie";

// interface User {
//   id: number;
//   username: string;
//   email: string;
//   is_superuser: boolean;
// }

// interface AuthContextType {
//   user: User | null;
//   login: (userData: User) => void;
//   logout: () => void;
//   isAuthenticated: boolean;
// }

// const AuthContext = createContext<AuthContextType | undefined>(undefined);

// export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
//   const [user, setUser] = useState<User | null>(null);

//   useEffect(() => {
//     const savedUser = localStorage.getItem("user");
//     const token = localStorage.getItem("token");

//     if (savedUser && token) {
//       try {
//         setUser(JSON.parse(savedUser));
//       } catch (error) {
//         console.error("Error parsing user data", error);
//         // Clear invalid user data
//         localStorage.removeItem("user");
//         localStorage.removeItem("token");
//       }
//     }
//   }, []);

//   const login = (userData: User) => {
//     setUser(userData);
//     localStorage.setItem("user", JSON.stringify(userData));
//   };

//   const logout = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("user");
//     Cookies.remove("refreshToken");
//     setUser(null);
//   };

//   // Memoize the context value to prevent unnecessary re-renders
//   const contextValue = useMemo(() => ({
//     user,
//     login,
//     logout,
//     isAuthenticated: !!user
//   }), [user]);

//   return (
//     <AuthContext.Provider value={contextValue}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => {
//   const context = useContext(AuthContext);
//   if (context === undefined) {
//     throw new Error("useAuth must be used within an AuthProvider");
//   }
//   return context;
// };


import React, { createContext, useContext, useState, useEffect, useMemo } from "react";
import Cookies from "js-cookie";

interface User {
  id: number;
  username: string;
  email: string;
  is_superuser: boolean;
}

interface AuthContextType {
  user: User | null;
  loading: boolean; // Added loading state
  login: (userData: User) => void;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true); // Track loading state

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    const token = localStorage.getItem("token");

    if (savedUser && token) {
      try {
        setUser(JSON.parse(savedUser)); // Parse and set user data
      } catch (error) {
        console.error("Error parsing user data", error);
        // Clear invalid user data
        localStorage.removeItem("user");
        localStorage.removeItem("token");
      }
    }

    setLoading(false); // Loading is done
  }, []);

  const login = (userData: User) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    Cookies.remove("refreshToken");
    setUser(null);
  };

  // Memoize the context value to prevent unnecessary re-renders
  const contextValue = useMemo(() => ({
    user,
    loading, // Expose loading state
    login,
    logout,
    isAuthenticated: !!user,
  }), [user, loading]);

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
