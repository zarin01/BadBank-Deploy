import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./LoginScreen.css";

const LoginScreen = ({ history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    //Checks to see if we have an authtoken in local storage
    if (localStorage.getItem("authToken")) {
      history.push("/");
    }
    //pushes it to the history
  }, [history]);

  const loginHandler = async (e) => {
    e.preventDefault();
    //configs the passed in login
    const config = {
      header: {
        "Content-Type": "application/json",
      },
    };

    const user = {
      email: email,
    };

    const currentBalance = JSON.parse(window.localStorage.getItem("balance"));
    const UserBalance = currentBalance.balance;

    const balance = {
      balance: UserBalance,
    };

    try {
      const { data } = await axios.post(
        "/api/auth/login",
        { email, password },
        user,
        balance,
        config
      );

      localStorage.setItem("authToken", data.token);
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("balance", JSON.stringify(balance));

      //Pushes the info to the route
      history.push("/");
      alert("You have successfully logged in!");
      //Error
    } catch (error) {
      setError(error.response.data.error);
      setTimeout(() => {
        setError("");
      }, 5000);
    }
  };

  return (
    <div className="login-screen">
      <form onSubmit={loginHandler} className="login-screen__form">
        <h3 className="login-screen__title">Login</h3>
        {error && <span className="error-message">{error}</span>}
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            required
            id="email"
            placeholder="Email address"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            tabIndex={1}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">
            Password:{" "}
            <Link to="/forgotpassword" className="login-screen__forgotpassword">
              Forgot Password?
            </Link>
          </label>
          <input
            type="password"
            required
            id="password"
            autoComplete="true"
            placeholder="Enter password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            tabIndex={2}
          />
        </div>
        <button type="submit" className="btn1 btn-primary">
          Login
        </button>

        <span className="login-screen__subtext">
          Don't have an account? <Link to="/register">Register</Link>
        </span>
      </form>
    </div>
  );
};

export default LoginScreen;
