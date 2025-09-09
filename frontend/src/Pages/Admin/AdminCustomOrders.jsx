import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminCustomOrders = () => {
  const [orders, setOrders] = useState([]);

  // Fetch all custom orders from backend
  const fetchOrders = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/custom-orders");
      setOrders(res.data);
    } catch (err) {
      console.error(err);
      alert("Error fetching orders. Check console.");
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2 style={{ color: "#800080" }}>All Custom Orders</h2>
      <div style={{ display: "flex", flexDirection: "column", gap: "15px", marginTop: "20px" }}>
        {orders.length === 0 && <p>No custom orders yet.</p>}
        {orders.map((order) => (
          <div key={order._id} style={{ border: "1px solid #ccc", padding: "15px", borderRadius: "6px" }}>
            <p><strong>Customer Name:</strong> {order.customerName}</p>
            <p><strong>Contact:</strong> {order.contactNo}</p>
            <p><strong>Occasion:</strong> {order.occasionType}</p>
            <p><strong>Preferred Flowers:</strong> {order.preferredFlowers || "-"}</p>
            <p><strong>Wrapping Style:</strong> {order.wrappingStyle || "-"}</p>
            <p><strong>Delivery Date:</strong> {order.deliveryDate || "-"}</p>
            {order.fileURL && (
              <img src={order.fileURL} alt="Custom" style={{ width: "200px", marginTop: "10px", borderRadius: "5px" }} />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminCustomOrders;
