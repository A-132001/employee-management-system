import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, NavLink, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Departments from "./pages/Departments";
import Employees from "./pages/Employees";
import Login from "./pages/Login";
import { getUserRole, logout } from "./api/auth";


getUserRole()
function PrivateRoute({ element, roles }) {
  const userRole = "admin";
  return userRole && roles.includes(userRole) ? element : <Navigate to="/login" />;
}

function App() {
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    const role = getUserRole();
    setUserRole(role);
  }, []);

  const handleLogout = () => {
    logout();
    setUserRole(null);
  };


  return (
    <Router>
      <div className="flex h-screen">
        {/* Sidebar */}
        {userRole && (
          <aside className="w-64 bg-gray-800 text-white p-5 h-full fixed">
            <nav className="flex flex-col gap-3">
              <NavLink className={({ isActive }) => isActive ? "text-blue-400" : "text-white"} to="/">🏠 Home</NavLink>
              {['admin', 'manager'].includes(userRole) && (
                <>
                  <NavLink className={({ isActive }) => isActive ? "text-blue-400" : "text-white"} to="/departments">🏢 Departments</NavLink>
                  <NavLink className={({ isActive }) => isActive ? "text-blue-400" : "text-white"} to="/employees">👥 Employees</NavLink>
                </>
              )}
              <button onClick={handleLogout} className="mt-4 bg-red-500 px-3 py-2 rounded">🚪 Logout</button>
            </nav>
          </aside>
        )}

        {/* Main Content */}
        <main className="flex-1 p-6 ml-64">
          <Routes>
            <Route path="/" element={userRole ? <Home /> : <Navigate to="/login" />} />
            <Route path="/login" element={<Login />} />
            <Route path="/departments" element={<PrivateRoute element={<Departments />} roles={["admin", "manager"]} />} />
            <Route path="/employees" element={<PrivateRoute element={<Employees />} roles={["admin", "manager"]} />} />
          </Routes>

        </main>
      </div>
    </Router>
  );
}

function useUserRole() {
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    const role = getUserRole();
    setUserRole(role);
  }, []);

  return userRole;
}

export default App;
