// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";

// const Register: React.FC = () => {
//   const [formData, setFormData] = useState({ username: "", email: "", password: "" });
//   const [error, setError] = useState("");
//   const navigate = useNavigate();

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     try {
//       await axios.post("http://localhost:8000/api/auth/register/", formData);
//       navigate("/login");
//     } catch (err) {
//       setError("Registration failed");
//     }
//   };

//   return (
//     <div>
//       <h1>Register</h1>
//       <form onSubmit={handleSubmit}>
//         <input name="username" placeholder="Username" onChange={handleChange} />
//         <input name="email" placeholder="Email" onChange={handleChange} />
//         <input name="password" type="password" placeholder="Password" onChange={handleChange} />
//         {error && <p>{error}</p>}
//         <button type="submit">Register</button>
//       </form>
//     </div>
//   );
// };

// export default Register;


import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Register: React.FC = () => {
  const [formData, setFormData] = useState({ username: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    // Basic Validation
    if (!formData.username || !formData.email || !formData.password) {
      setError("All fields are required");
      setIsSubmitting(false);
      return;
    }

    try {
      await axios.post("http://localhost:8000/api/auth/register/", formData);
      navigate("/login");
    } catch (err: any) {
      if (err.response && err.response.data) {
        setError(err.response.data.detail || "Registration failed");
      } else {
        setError("An unexpected error occurred");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        <input name="username" placeholder="Username" onChange={handleChange} value={formData.username} />
        <input name="email" placeholder="Email" onChange={handleChange} value={formData.email} />
        <input name="password" type="password" placeholder="Password" onChange={handleChange} value={formData.password} />
        {error && <p style={{ color: "red" }}>{error}</p>}
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Registering..." : "Register"}
        </button>
      </form>
    </div>
  );
};

export default Register;
