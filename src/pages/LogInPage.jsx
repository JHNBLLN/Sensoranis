import "./css/LogInPage.css";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function LogInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      console.log("User is already logged in. Redirecting to home.");
      navigate("/");
    }
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const response = await axios.post("/api/login", { email, password });
      localStorage.setItem("accessToken", response.data.accessToken);
      setEmail("");
      setPassword("");
      navigate("/");
    } catch (err) {
      setError(err.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <form onSubmit={handleLogin} className="login-form" noValidate>
        <h1 className="login-title">Login</h1>

        {error && <div className="login-error">{error}</div>}

        <input
          type="email"
          placeholder="Email"
          className="login-input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="login-input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <Link to="/forgot-password" className="login-link">
          Forgot your password?
        </Link>

        <div className="login-actions">
          <button type="submit" className="login-button" disabled={loading}>
            {loading ? "Signing in..." : "Sign in"}
          </button>
          <Link to="/register" className="login-create">
            Create account
          </Link>
        </div>
      </form>
    </div>
  );
}

export default LogInPage;
