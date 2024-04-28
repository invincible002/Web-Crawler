import React, { useEffect, useState } from "react";
import { useUserAuth } from "./context/UserContext";
import axios from "axios";

export default function Chatboard() {
  const [mesg, setMesg] = useState({
    role: "",
    parts: [{ text: "" }],
  });
  const [chat, setChat] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleMesg = (e) => {
    setMesg({
      role: "user",
      parts: [{ text: e.target.value }],
    });
  };
  const handleChat = () => {
    setChat([...chat, mesg]);
    setMesg({
      role: "",
      parts: [{ text: "" }],
    });
  };
  useEffect(() => {
    if (chat.length && chat[chat.length - 1]?.role == "user") {
      setLoading(true);
      axios
        .post("http://localhost:8000/chat", { chat, user })
        .then((res) => {
          setLoading(false);
          setChat([
            ...chat,
            {
              role: "model",
              parts: [{ text: res.data.message }],
            },
          ]);
        })
        .catch((error) => {
          setLoading(false);

          console.log(error);
        });
    }
  }, [chat]);

  const { user, setUser } = useUserAuth();
  return (
    <div>
      <div className="chatboar_wrapper">
        <div className="chatboard">
          <div className="chat_header">
            <h4>Chat</h4>
          </div>
          <div className="chat_screen">
            {chat.map((c, index) => {
              return (
                <>
                  {c.role == "user" ? (
                    <div key={index} className="mesgR">
                      <div className="mesg_right">
                        <p>{c?.parts[0].text}</p>
                      </div>
                      <i
                        class="fa-solid fa-circle-user fa-2xl"
                        style={{
                          color: "#059429",
                          padding: "8px",
                          lineHeight: "15px",
                        }}
                      ></i>
                    </div>
                  ) : (
                    <div key={index} className="mesgL">
                      <i
                        class="fa-solid fa-robot fa-xl"
                        style={{ color: "#1100ef", padding: "8px" }}
                      ></i>{" "}
                      <div className="mesg_left">
                        <p>{c?.parts[0].text}</p>
                      </div>
                    </div>
                  )}
                </>
              );
            })}
            {loading && (
              <div className="mesgL">
                <i
                  class="fa-solid fa-robot fa-xl"
                  style={{ color: "#1100ef", padding: "8px" }}
                ></i>{" "}
                <div className="mesg_left">
                  <p>. . .</p>
                </div>
              </div>
            )}
          </div>
          <div className="chat_write">
            <input
              type="text"
              placeholder="Type your message"
              onChange={handleMesg}
              value={mesg.parts[0].text}
              onKeyDown={(e) => {
                if (e.key == "Enter") {
                  handleChat();
                }
              }}
            ></input>
            <button className="send_btn" onClick={handleChat}>
              <i
                class="fa-solid fa-paper-plane"
                style={{ color: "#ffffff" }}
              ></i>{" "}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
