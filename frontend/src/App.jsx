import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import "./App.css";

import Login from "./pages/Login";
import Home from "./pages/Home";

function App() {
  return (
    <BrowserRouter>
      <header>
        <div id="navbar">
          <Link to="/">Home</Link>
          <Link to="/login">Login</Link>
          {/* <Link to="/Roommates">Login</Link> */}
        </div>
      </header>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        {/* <Route path="/Roommates" element={<Roommates />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
