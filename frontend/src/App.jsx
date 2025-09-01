import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import DailyDeals from "./pages/DailyDeals";
import CustomizeOrders from "./pages/CustomizeOrders";
import Feedback from "./pages/Feedback";
import AboutUs from "./pages/AboutUs";
import FAQ from "./pages/FAQ";
import Birthday from "./pages/Birthday";
import Graduation from "./pages/Graduation";
import Valentine from "./pages/Valentine";
import "./App.css";

function App() {
  return (
    <Router>
      <Header />
      <main style={{ minHeight: "80vh", padding: "20px" }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/daily-deals" element={<DailyDeals />} />
          <Route path="/customize-orders" element={<CustomizeOrders />} />
          <Route path="/feedback" element={<Feedback />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/category/birthday" element={<Birthday />} />
          <Route path="/category/graduation" element={<Graduation />} />
          <Route path="/category/valentine" element={<Valentine />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
