import { useState } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import "./App.css";

import Login from "./pages/Login";
import Home from "./pages/Home";

function App() {
  const [username, setUsername] = useState("");

  return (
    <BrowserRouter>
      <header>
        {username}
        <div id="navbar">
          <Link to="/">Home</Link>
          <Link to="/login">Login</Link>
          {/* <Link to="/Roommates">Login</Link> */}
        </div>
      </header>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login setUser={setUsername} />} />
        {/* <Route path="/Roommates" element={<Roommates />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
