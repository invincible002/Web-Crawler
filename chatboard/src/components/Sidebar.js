import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function Sidebar() {
  const [activeTab, setActiveTab] = useState(1);

  return (
    <div
      className={`flex flex-col p-4 bg-gray-100 h-screen shadow-lg transition-all ${"sm:w-56 w-24"}`}
    >
      <ul className="list-none space-y-4">
        <li
          className={`p-3 rounded-xl text-left cursor-pointer transition-colors ${
            activeTab === 1 ? "bg-gray-300 text-black" : "hover:bg-gray-200"
          }`}
          onClick={() => setActiveTab(1)}
        >
          <Link to="/" className="block w-full">
            <span className="hidden sm:block">Chatboard</span>
            <span className="block sm:hidden">C</span>
          </Link>
        </li>
        <li
          className={`p-3 rounded-xl text-left cursor-pointer transition-colors ${
            activeTab === 2 ? "bg-gray-300 text-black" : "hover:bg-gray-200"
          }`}
          onClick={() => setActiveTab(2)}
        >
          <Link to="/dashboard" className="block w-full">
            <span className="hidden sm:block">Dashboard</span>
            <span className="block sm:hidden">D</span>
          </Link>
        </li>
      </ul>
    </div>
  );
}
