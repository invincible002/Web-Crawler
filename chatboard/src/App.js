import React from "react";
import UserDetails from "./UserDetails";
import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { UserContext } from "./context/UserContext";
import Chatboard from "./pages/Chatboard";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import Analytics from "./pages/Analytics";

export default function App() {
  return (
    <Router>
      <UserContext>
        <Sidebar />
        <Routes>
          <Route path="/" element={<UserDetails />} />
          <Route path="/chatboard" element={<Chatboard />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </UserContext>
    </Router>
  );
}
