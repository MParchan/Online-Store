import React, { useState } from "react";
import AuthService from "../api/authService";
import { useNavigate } from "react-router-dom";

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
        navigate("/");
      },
      (error) => {
        setError(error.response.data);
      }
    );
  };

  return (
    <div className="text-center">
      <form onSubmit={handleSignup}>
        <h1>Sign up</h1>
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
            minLength={8}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="form-group m-3">
          <label for="confirmPassword" className="m-1 w-100">
            Confirm password
          </label>
          <input
            id="confirmPassword"
            type="password"
            placeholder="confirm password"
            className="w-50"
            required={true}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
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
