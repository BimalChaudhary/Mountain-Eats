import React, { useContext, useEffect, useState } from "react";
import "./MyOrders.css";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";

const MyOrders = () => {
  const { url, token } = useContext(StoreContext);
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    try {
      const response = await axios.post(
        `${url}/api/order/userOrders`,
        {},
        { headers: { token } }
      );
      setOrders(response.data.data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  useEffect(() => {
    if (token) {
      fetchOrders();
    }
  }, [token]);

  const formatDate = (dateString) => {
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    };
    return new Date(dateString).toLocaleString(undefined, options);
  };

  // Calculate total price of one order
  const getOrderTotal = (items) => {
    return items.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    ).toFixed(2);
  };

  return (
    <div className="my-orders">
      <h2>My Orders</h2>
      {orders.map((order, orderIndex) => (
        <div key={orderIndex} className="order-group">
          <h3 className="order-date">Ordered on: {formatDate(order.createdAt)}</h3>
          <div className="my-orders-table">
            <div className="my-orders-header">
              <p>Image</p>
              <p>Title</p>
              <p>Unit Price</p>
              <p>Quantity</p>
              <p>Total Price</p>
              {/* Removed Status and Action columns here */}
            </div>
            <hr />
            {order.items.map((item, itemIndex) => (
              <div key={`${orderIndex}-${itemIndex}`}>
                <div className="my-orders-row">
                  <img src={`${url}/images/${item.image}`} alt={item.name} />
                  <p>{item.name}</p>
                  <p>${item.price.toFixed(2)}</p>
                  <p>{item.quantity}</p>
                  <p>${(item.price * item.quantity).toFixed(2)}</p>
                </div>
                <hr />
              </div>
            ))}

            {/* Footer row for status, action, and total */}
            <div className="my-orders-footer">
              <p>
                Status: <span>&#x25cf;&#x25cf;&#x25cf;</span> <b>{order.status}</b>
              </p>
              <p>
                Total Price: <b>${getOrderTotal(order.items)}</b>
              </p>
              <button onClick={fetchOrders}>Track</button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MyOrders;
