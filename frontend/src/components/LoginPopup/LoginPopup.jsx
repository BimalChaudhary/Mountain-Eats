import React, { useContext, useState } from "react";
import "./LoginPopup.css";
import { assets } from "../../assets/assets";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";

const LoginPopup = ({ setShowLogin }) => {
  const { url, setToken, setUserPhoto } = useContext(StoreContext);

  const [currState, setCurrState] = useState("Login");
  const [showPassword, setShowPassword] = useState(false);
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setData((data) => ({ ...data, [name]: value }));
  };

  const onLogin = async (event) => {
    event.preventDefault();

    try {
      if (currState === "Login") {
        const response = await axios.post(`${url}/api/user/login`, data);
        if (response.data.success) {
          setToken(response.data.token);
          localStorage.setItem("token", response.data.token);
          if (response.data.user?.photo) {
            setUserPhoto(`${url}/images/${response.data.user.photo}`);
            localStorage.setItem(
              "userPhoto",
              `${url}/images/${response.data.user.photo}`
            );
          }
          alert("Logged in successfully!");
          setShowLogin(false);
        } else {
          alert(response.data.message);
        }
      } else {
        const response = await axios.post(`${url}/api/user/register`, data);
        if (response.data.success) {
          setToken(response.data.token);
          localStorage.setItem("token", response.data.token);
          if (response.data.user?.photo) {
            setUserPhoto(`${url}/images/${response.data.user.photo}`);
            localStorage.setItem(
              "userPhoto",
              `${url}/images/${response.data.user.photo}`
            );
          }
          alert("Account created successfully!");
          setShowLogin(false);
        } else {
          alert(response.data.message);
        }
      }
    } catch (error) {
      alert("Something went wrong. Please try again.");
      console.error(error);
    }
  };

  return (
    <div className="login-popup">
      <form className="login-popup-container" onSubmit={onLogin}>
        <div className="login-popup-title">
          <h2>{currState}</h2>
          <img
            onClick={() => setShowLogin(false)}
            src={assets.cross_icon}
            alt="Close"
            className="close-icon"
          />
        </div>
        <div className="login-popup-inputs">
          {currState === "Login" ? null : (
            <input
              name="name"
              onChange={onChangeHandler}
              value={data.name}
              type="text"
              placeholder="Your name"
              required
            />
          )}

          <input
            name="email"
            onChange={onChangeHandler}
            value={data.email}
            type="email"
            placeholder="Your email"
            required
          />

          <div className="password-input-wrapper">
            <input
              name="password"
              onChange={onChangeHandler}
              value={data.password}
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              required
            />
            <span
              className="toggle-password-visibility"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "🙈" : "👁️"}
            </span>
          </div>
        </div>
        <button type="submit">
          {currState === "Sign Up" ? "Create account" : "Login"}
        </button>
        <div className="login-popup-condition">
          <input type="checkbox" required />
          <p>By Continuing, I agree to the terms of use & privacy policy.</p>
        </div>
        {currState === "Login" ? (
          <p>
            Create a new account?{" "}
            <span
              onClick={() => {
                setCurrState("Sign Up");
              }}
            >
              Click here
            </span>
          </p>
        ) : (
          <p>
            Already have an account?{" "}
            <span
              onClick={() => {
                setCurrState("Login");
              }}
            >
              Login here
            </span>
          </p>
        )}
      </form>
    </div>
  );
};

export default LoginPopup;
