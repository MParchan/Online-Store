import React, { useState } from "react";
import AuthService from "../api/authService";
import { useNavigate } from "react-router-dom";
import { TextField } from "@mui/material";

function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSignup = (e) => {
    e.preventDefault();
    AuthService.signup(email, password, confirmPassword).then(
      (response) => {
        // check for token and user already exists with 200
        console.log("Sign up successfully", response);
        navigate("/log-in");
      },
      (error) => {
        setError(error.response.data);
      }
    );
  };

  return (
    <div className="text-center">
      <form onSubmit={handleSignup}>
        <h1 className="m-5">Sign up</h1>
        <div className="m-3">
          <TextField
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            id="email"
            type="email"
            label="Email"
            className="w-50"
            required
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
            inputProps={{ minLength: 8 }}
            required
          />
        </div>
        <div className="m-3">
          <TextField
            onChange={(e) => setConfirmPassword(e.target.value)}
            value={confirmPassword}
            id="confirmPassword"
            type="password"
            label="Confirm password"
            className="w-50"
            required
          />
        </div>
        <div className="form-group m-3">
          <span className="text-danger">{error}</span>
        </div>
        <button type="submit" className="btn btn-dark">
          Sign up
        </button>
      </form>
    </div>
  );
}

export default SignupPage;
