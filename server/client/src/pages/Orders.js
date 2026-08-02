import { useState, useEffect } from "react";
import api from "../services/api";

function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    async function fetchOrders() {
      const res = await api.get("/orders/my-orders");
      setOrders(res.data);
    }
    fetchOrders();
  }, []);

  if (orders.length === 0) {
    return <p>Abhi tak koi order nahi hai</p>;
  }

  return (
    <div className="orders-page">
      <h2>My Orders</h2>

      {orders.map((order) => (
        <div key={order._id} className="order-card">
          <p>Order ID: {order._id}</p>
          <p>Status: {order.status}</p>
          <p>Total: ₹{order.total}</p>

          <ul>
            {order.items.map((item, index) => (
              <li key={index}>
                {item.name} x {item.quantity}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

export default Orders;