import React, { useState } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { FiLock, FiMail } from "react-icons/fi";
import { useNavigate, Link } from "react-router-dom";
import NavBar from "./Navbar";
import { adminLogin } from "../api/api";
import { toast } from "react-toastify";

const AdminLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      console.log("Admin Login", username, password);

      const res = await adminLogin({ username, password });
      res.withoutPassword.role = "admin";
      localStorage.setItem("admin", JSON.stringify(res.withoutPassword));
      toast.success("Admin Login Success");
      navigate("/dashboard");
      window.location.reload();
      setLoading(false);
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <NavBar />
      <div
        className="flex items-center justify-center min-h-screen bg-gray-700 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://source.unsplash.com/1600x900/?technology,login')",
        }}
      >
        <div className="w-full max-w-md p-8 bg-gray-800 bg-opacity-80 rounded-lg shadow-lg">
          <h2 className="mb-6 text-3xl font-semibold text-white text-center">
            AdminLogin
          </h2>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="flex items-center border rounded-md border-gray-600 bg-gray-700">
              <FiMail className="w-6 h-6 text-gray-400 ml-3" />
              <input
                type="text"
                className="w-full px-4 py-2 bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                placeholder="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="flex items-center border rounded-md border-gray-600 bg-gray-700">
              <FiLock className="w-6 h-6 text-gray-400 ml-3" />
              <input
                type="password"
                className="w-full px-4 py-2 bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="flex items-center justify-center mt-4">
              <button
                type="submit"
                className="px-6 py-2 text-white bg-indigo-500 rounded-md hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                disabled={loading}
              >
                {loading ? (
                  <AiOutlineLoading3Quarters className="w-6 h-6 animate-spin mx-auto" />
                ) : (
                  "Login"
                )}
              </button>
            </div>
          </form>
          {error && (
            <div className="mt-4 text-red-300 text-center">{error}</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
