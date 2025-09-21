import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import "./App.css";

import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Home from "./pages/Home";
import Roommates from "./pages/Roommates";

function App() {
  return (
    <BrowserRouter>
      <header>
        <div id="navbar">
          {/*<Link to="/">Home</Link>
          <Link to="/login">Login</Link>
          <Link to="/Roommates">Roommates</Link>*/}
        </div>
      </header>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/Roommates" element={<Roommates />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
