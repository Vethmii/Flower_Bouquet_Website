import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./Pages/Home";
import DailyDeals from "./Pages/DailyDeals";
import CustomizeOrders from "./Pages/CustomizeOrders";
import Feedback from "./Pages/Feedback";
import AboutUs from "./Pages/AboutUs";
import FAQ from "./Pages/FAQ";
import Birthday from "./Pages/Birthday";
import Graduation from "./Pages/Graduation";
import Valentine from "./Pages/Valentine";
import AdminLogin from "./Pages/admin/AdminLogin";
import AdminPanel from "./Pages/admin/AdminPanel";
import AdminCustomOrders from "./Pages/Admin/AdminCustomOrders";
import AdminHappyCustomers from "./Pages/Admin/AdminHappyCustomers";
import AdminDailyDeals from "./Pages/Admin/AdminDailyDeals";

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
          <Route path="/admin-login" element={<AdminLogin />} />
          <Route path="/admin" element={<AdminPanel />} />
          <Route path="/admin/custom-orders" element={<AdminCustomOrders />} />
          <Route path="/admin/happy-customers" element={<AdminHappyCustomers />} />
          <Route path="/admin/daily-deals" element={<AdminDailyDeals />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}

export default App;

