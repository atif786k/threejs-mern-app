import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/auth/Login";
import Home from "./pages/Home";
import ObjectList from "./pages/ObjectList";
import Viewer from "./components/ThreeDViewer/Viewer";

function App() {
  return (
    <div className="main-container">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          {/* <Route path="/login" element={<Login />} /> */}
          <Route path="/objects" element={<ObjectList />} />
          <Route path="/viewer" element={<Viewer />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
