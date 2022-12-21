import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthService from "../api/authService";
import AuthContext from "../store/auth-context";

function LoginPage() {
  const authCtx = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  function handleLogin(e) {
    e.preventDefault();
    AuthService.login(email, password).then(
      () => {
        authCtx.setAuth(true);
        navigate("/");
      },
      (error) => {
        setError(error.response.data);
      }
    );
  }

  return (
    <div className="text-center">
      <form onSubmit={handleLogin}>
        <h1>Log in</h1>
        <div className="form-group m-3">
          <label for="email" className="m-1 w-100">
            Email
          </label>
          <input
            id="email"
            type="email"
            placeholder="email"
            className="w-50"
            required={true}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-group m-3">
          <label for="password" className="m-1 w-100">
            Password
          </label>
          <input
            id="password"
            type="password"
            placeholder="password"
            className="w-50"
            required={true}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="form-group m-3">
          <span className="text-danger">{error}</span>
        </div>
        <button type="submit" className="btn btn-dark">
          Log in
        </button>
      </form>
    </div>
  );
}

export default LoginPage;
