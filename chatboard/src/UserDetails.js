import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useUserAuth } from "./context/UserContext";

export default function UserDetails() {
  const { user, setUser } = useUserAuth();

  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (!user.name || !user.website || user.website == "select") {
      setErrorMsg("Fill the missing fields.");
      return;
    }

    axios
      .post(`http://localhost:8000/crawl/${user.website}`, { user })
      .then((res) => {
        if (res.status == 200) {
          navigate("/chatboard");
        }
      });
  };
  return (
    <div className="col-10 user_detail_wrapper">
      <div class="container" id="container">
        <div class="form-container sign-up">
          <form>
            <h1>Let's Get Started</h1>
            <div class="social-icons">
              <a href="#" class="icon">
                <i class="fa-brands fa-google-plus-g"></i>
              </a>
              <a href="#" class="icon">
                <i class="fa-brands fa-facebook-f"></i>
              </a>
              <a href="#" class="icon">
                <i class="fa-brands fa-github"></i>
              </a>
              <a href="#" class="icon">
                <i class="fa-brands fa-linkedin-in"></i>
              </a>
            </div>
            <input
              type="text"
              name="name"
              onChange={handleChange}
              placeholder="Name"
            />
            <input
              type="email"
              name="email"
              onChange={handleChange}
              placeholder="Email"
            />
            <span>Select a website to crawl</span>
            <select name="website" id="crawl" onChange={handleChange}>
              <option value="select">Select an option</option>
              <option value="zethic">Zethic Technologies</option>
              <option value="Adivid">Adivid Technologies</option>
            </select>
            <button onClick={submitHandler}>Let's Crawl!!</button>
          </form>
        </div>

        <div class="toggle-container">
          <div class="toggle">
            <div class="toggle-panel toggle-right">
              <h1>Hello, Friend!</h1>
              <p>
                Explore, Connect, and Discover with our Chatboard – Ask
                questions about website and uncover insights like never before!
              </p>
            </div>
          </div>
        </div>
      </div>
      {errorMsg ? (
        <div className="error_mesg ">
          <span>{errorMsg}</span>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
