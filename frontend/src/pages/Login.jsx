import React, { useState } from "react";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);

    try {
      const response = await fetch("/authenticate",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include", // REQUIRED for cookies
          body: JSON.stringify({ email, password }),
        }
      );

      if (!response.ok) {
        switch (response.status) {
          case 401:
            alert("Incorrect username or password");
            break;
          case 403:
            alert("Access forbidden. You do not have permission to access this resource.");
            break;
          case 404:
            alert("User not found. Please check your credentials.");
            break;
          default:
            alert("Login failed. Please try again later.");
        }
        setLoading(false);
        return;
      }

      // Cookies are set automatically by the browser if server sets Set-Cookie with HttpOnly
      alert("Logged in successfully!");
      window.location.href = "/"; // redirect to home

    } catch (error) {
      console.error("Error during login:", error);
      alert("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", marginTop: "50px" }}>
      <div style={{ backgroundColor: "#f1f1f1", padding: 20, borderRadius: 8, textAlign: "center" }}>
        <h3>Login</h3>
        <input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ width: "100%", padding: 10, margin: "10px 0", borderRadius: 4 }}
        />
        <input
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ width: "100%", padding: 10, margin: "10px 0", borderRadius: 4 }}
        />
        <button
          onClick={handleLogin}
          disabled={loading}
          style={{
            backgroundColor: "#FFA500",
            color: "white",
            padding: 10,
            border: "none",
            borderRadius: 4,
            cursor: "pointer",
            width: "100%",
          }}
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </div>
    </div>
  );
}

export default Login;
