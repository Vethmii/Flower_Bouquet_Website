import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Birthday from "./pages/Birthday";
import "./App.css";

function App() {
  return (
    <Router>
      <Header />
      <main>
        <Routes>
          {/* Home Page */}
          <Route path="/" element={<h1>Welcome to Our Website</h1>} />

          {/* Birthday Page */}
          <Route path="/birthday" element={<Birthday />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;


