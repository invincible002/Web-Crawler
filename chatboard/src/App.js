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

export default function App() {
  return (
    <div>
      <Router>
        <UserContext>
          <Routes>
            <Route path="/" element={<UserDetails />} />
            <Route path="/chatboard" element={<Chatboard />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </UserContext>
      </Router>
    </div>
  );
}
