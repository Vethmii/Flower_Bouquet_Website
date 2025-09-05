import React, { useEffect, useState } from "react";
import axios from "axios";
import "./AdminCustomOrders.css";

const AdminCustomOrders = () => {
  const [orders, setOrders] = useState([]);

  // Fetch all custom orders from admin API
  const fetchOrders = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/admin/custom-orders");
      setOrders(res.data);
    } catch (err) {
      console.error("Error fetching orders:", err);
      alert("Error fetching orders. Check console.");
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="admin-orders-container">
      <h1 className="admin-title">All Custom Orders</h1>

      {orders.length === 0 ? (
        <p className="no-orders">No custom orders yet.</p>
      ) : (
        <div className="table-wrapper">
          <table className="orders-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Customer Name</th>
                <th>Contact No</th>
                <th>Occasion</th>
                <th>Preferred Flowers</th>
                <th>Wrapping Style</th>
                <th>Delivery Date</th>
                <th>Attachment</th>
                <th>Created At</th>
                <th>Updated At</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id}>
                  <td>{order._id}</td>
                  <td>{order.customerName}</td>
                  <td>{order.contactNo}</td>
                  <td>{order.occasionType}</td>
                  <td>{order.preferredFlowers || "-"}</td>
                  <td>{order.wrappingStyle || "-"}</td>
                  <td>
                    {order.deliveryDate
                      ? new Date(order.deliveryDate).toLocaleDateString()
                      : "-"}
                  </td>
                  <td>
                    {order.fileURL ? (
                      <a
                        href={order.fileURL}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        View File
                      </a>
                    ) : (
                      "No File"
                    )}
                  </td>
                  <td>
                    {order.createdAt
                      ? new Date(order.createdAt).toLocaleString()
                      : "-"}
                  </td>
                  <td>
                    {order.updatedAt
                      ? new Date(order.updatedAt).toLocaleString()
                      : "-"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminCustomOrders;







