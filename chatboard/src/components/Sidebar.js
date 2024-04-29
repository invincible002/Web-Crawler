import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Sidebar() {
  const [activeTab, setActiveTab] = useState(1);
  const navigate = useNavigate();
  return (
    <>
      <div className="col-2 sidebar_wrapper">
        <div className="list">
          <ul>
            <li
              style={
                activeTab == 1
                  ? {
                      backgroundColor: "#e2e2e2",
                      borderRadius: "5px 60px 5px 60px",
                      color: "black",
                    }
                  : {}
              }
              onClick={() => {
                setActiveTab(1);
                navigate("/");
              }}
            >
              Chatboard
            </li>
            <li
              style={
                activeTab == 2
                  ? {
                      backgroundColor: "#e2e2e2",
                      borderRadius: "5px 60px 5px 60px",
                      color: "black",
                    }
                  : {}
              }
              onClick={() => {
                setActiveTab(2);
                navigate("/dashboard");
              }}
            >
              Dashbaord
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}
