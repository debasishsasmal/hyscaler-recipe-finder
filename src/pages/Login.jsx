import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react"; 
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();

    if (!email.includes('@') || password.length < 6) {
    alert("Please enter a valid email and password (min 6 chars)");
    return;
  }

    if (email && password) {
       localStorage.setItem("user", JSON.stringify({ email }));
       navigate("/");
    } else {
      alert("Please enter details"); 
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-10 rounded-2xl shadow-xl max-w-sm w-full">
        <h1 className="text-3xl font-extrabold text-gray-800 mb-6 text-center">Login</h1>
        
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-gray-600 mb-1">Email</label>
            <input 
              type="email" 
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              placeholder="user@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-gray-600 mb-1">Password</label>
            <div className="relative">
              <input 
                type={showPassword ? "text" : "password"} 
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                placeholder="********"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              
              <button 
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-gray-500 hover:text-orange-500"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          <button 
            type="submit"
            className="w-full bg-orange-500 text-white font-bold py-3 rounded-lg hover:bg-orange-600 transition"
          >
            Login
          </button>
        </form>

        
      </div>
    </div>
  );
};

export default Login;