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
import Chatboard from "./Chatboard";
import Sidebar from "./components/Sidebar";
import Dashboard from "./Dashboard";

export default function App() {
  return (
    <div>
      <div className="row">
        <Router>
          <UserContext>
            <Sidebar />
            <Routes>
              <Route path="/" element={<UserDetails />} />
              <Route path="/chatboard" element={<Chatboard />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </UserContext>
        </Router>
      </div>
    </div>
  );
}
