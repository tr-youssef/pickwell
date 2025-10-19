import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.svg";

export default function LoginPage({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    
    // Check for admin credentials
    if (email === "admin@admin.com" && password === "admin") {
      onLogin(true); // Pass true to indicate admin
      navigate("/orders");
      return;
    }
    
    // Check for demo account credentials
    if (email === "demo@demo.com" && password === "demo") {
      onLogin(false); // Regular user access
      navigate("/");
      return;
    }
    
    // If credentials don't match, show an error (you can add error handling here)
    alert("Invalid credentials. Please use demo or admin account.");
  };

  const fillDemoCredentials = () => {
    setEmail("demo@demo.com");
    setPassword("demo");
  };

  const fillAdminCredentials = () => {
    setEmail("admin@admin.com");
    setPassword("admin");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-blue-50">
      <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md">
        <div className="flex flex-col items-center mb-6">
          <img src={logo} alt="Pickwell Logo" className="h-16 w-16 mb-3" />
          <h1 className="text-2xl font-bold text-gray-800">Pickwell</h1>
          <p className="text-gray-600 text-sm mt-2">Sign in to continue</p>
        </div>
        
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="your@email.com"
              required
            />
          </div>
          
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="••••••••"
              required
            />
          </div>
          
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition font-medium"
          >
            Login
          </button>
        </form>
        
        {/* Demo Accounts Info Box */}
        <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <h3 className="text-sm font-semibold text-blue-900 mb-3">Test Accounts (Click to fill)</h3>
          <div className="space-y-3 text-xs">
            <div 
              onClick={fillDemoCredentials}
              className="bg-white p-3 rounded border border-blue-100 cursor-pointer hover:border-blue-300 hover:shadow-md transition-all"
            >
              <p className="font-semibold text-blue-800 mb-1">👤 Demo Account</p>
              <p className="text-gray-600"><span className="font-medium">Email:</span> demo@demo.com</p>
              <p className="text-gray-600"><span className="font-medium">Password:</span> demo</p>
              <p className="text-xs text-gray-500 mt-1 italic">Access to shop and order items</p>
            </div>
            <div 
              onClick={fillAdminCredentials}
              className="bg-white p-3 rounded border border-blue-100 cursor-pointer hover:border-blue-300 hover:shadow-md transition-all"
            >
              <p className="font-semibold text-blue-800 mb-1">👨‍💼 Admin Account</p>
              <p className="text-gray-600"><span className="font-medium">Email:</span> admin@admin.com</p>
              <p className="text-gray-600"><span className="font-medium">Password:</span> admin</p>
              <p className="text-xs text-gray-500 mt-1 italic">Access to orders dashboard</p>
            </div>
          </div>
        </div>
        
        <div className="mt-6 text-center text-sm text-gray-600">
          <p>Don't have an account? <a href="/signup" className="text-green-600 hover:underline">Sign up</a></p>
        </div>
      </div>
    </div>
  );
}
