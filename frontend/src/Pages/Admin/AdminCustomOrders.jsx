// src/Pages/Admin/AdminCustomOrders.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import "./AdminCustomOrders.css";

const API_BASE = "http://localhost:5000/api/admin/custom-orders";

const AdminCustomOrders = () => {
  const [orders, setOrders] = useState([]);
  const [completedOrders, setCompletedOrders] = useState({});
  const [loading, setLoading] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const res = await axios.get(API_BASE);
      setOrders(res.data || []);
    } catch (err) {
      console.error("Error fetching orders:", err);
      alert("Error fetching orders. Check console.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const toggleCompleted = (id) => {
    setCompletedOrders((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const deleteOrder = async (id) => {
    if (!window.confirm("Are you sure you want to delete this order?")) return;
    try {
      setDeletingId(id);
      await axios.delete(`${API_BASE}/${id}`);
      setOrders((prev) => prev.filter((o) => o._id !== id));
      setCompletedOrders((prev) => {
        const copy = { ...prev };
        delete copy[id];
        return copy;
      });
    } catch (err) {
      console.error("Error deleting order:", err);
      alert("Failed to delete order. See console.");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="admin-orders-container">
      <h1 className="admin-title">All Custom Orders</h1>

      {loading ? (
        <p className="no-orders">Loading orders...</p>
      ) : orders.length === 0 ? (
        <p className="no-orders">No custom orders yet.</p>
      ) : (
        <div className="table-wrapper">
          <table className="orders-table">
            <thead>
              <tr>
                <th>Complete</th>
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
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => {
                const isCompleted = !!completedOrders[order._id];
                return (
                  <tr key={order._id} className={isCompleted ? "completed-row" : ""}>
                    <td>
                      <input
                        type="checkbox"
                        checked={isCompleted}
                        onChange={() => toggleCompleted(order._id)}
                      />
                    </td>
                    <td className="id-cell">{order._id}</td>
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
                        <a href={order.fileURL} target="_blank" rel="noopener noreferrer">
                          View File
                        </a>
                      ) : (
                        "No File"
                      )}
                    </td>
                    <td>
                      {order.createdAt ? new Date(order.createdAt).toLocaleString() : "-"}
                    </td>
                    <td>
                      {order.updatedAt ? new Date(order.updatedAt).toLocaleString() : "-"}
                    </td>
                    <td>
                      <button
                        className="delete-btn"
                        onClick={() => deleteOrder(order._id)}
                        disabled={deletingId === order._id}
                      >
                        {deletingId === order._id ? "Deleting..." : "🗑️"}
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminCustomOrders;











