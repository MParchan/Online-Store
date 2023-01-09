import { TextField } from "@mui/material";
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
        <h1 className="m-5">Log in</h1>
        <div className="m-3">
          <TextField
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            id="email"
            type="email"
            label="Email"
            className="w-50"
          />
        </div>
        <div className="m-3">
          <TextField
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            id="password"
            type="password"
            label="Password"
            className="w-50"
          />
        </div>
        <div className="form-group m-3">
          <span className="text-danger">{error}</span>
        </div>
        <button type="submit" className="btn btn-dark w-25">
          Log in
        </button>
      </form>
    </div>
  );
}

export default LoginPage;
