import React, { useEffect, useState } from 'react';
import './Orders.css';
import axios from 'axios';
import { toast } from 'react-toastify';

const Orders = ({ url }) => {
  const [orders, setOrders] = useState([]);

  const fetchAllOrders = async () => {
    try {
      const response = await axios.get(`${url}/api/order/list`);
      if (response.data.success) {
        setOrders(response.data.data.reverse()); // newest first
      } else {
        toast.error("Error fetching orders");
      }
    } catch (err) {
      toast.error("Something went wrong");
    }
  };

  const statusHandlers = async (event, orderId) => {
    try {
      const response = await axios.post(`${url}/api/order/status`, {
        orderId,
        status: event.target.value,
      });
      if (response.data.success) {
        await fetchAllOrders();
      }
    } catch (err) {
      toast.error("Status update failed");
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, []);

  return (
    <div className="order add">
      <h3>Order Page</h3>
      <div className="orders-wrapper">
        {orders.map((order, index) => (
          <div key={index} className="order-card">
            <table className="order-table">
              <thead>
                <tr>
                  <th>Items</th>
                  <th>Customer</th>
                  <th>Address</th>
                  <th>Phone</th>
                  <th>Qty</th>
                  <th>Total ($)</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  {/* Items Table */}
                  <td>
                    <table className="nested-table">
                      <thead>
                        <tr>
                          <th>S/N</th>
                          <th>Image</th>
                          <th>Name</th>
                          <th>Qty</th>
                          <th>Rate ($)</th>
                        </tr>
                      </thead>
                      <tbody>
                        {order.items.map((item, idx) => (
                          <tr key={idx}>
                            <td>{idx + 1}</td>
                            <td>
                              <img
                                src={`${url}/images/${item.image}`}
                                alt={item.name}
                                className="item-image"
                                onError={(e) => (e.target.style.display = 'none')}
                              />
                            </td>
                            <td>{item.name}</td>
                            <td>{item.quantity}</td>
                            <td>${item.price}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </td>

                  {/* Customer Name */}
                  <td>{order.address.firstName} {order.address.lastName}</td>

                  {/* Address Table */}
                  <td>
                    <table className="nested-table">
                      <tbody>
                        <tr><td><b>Street:</b> {order.address.street}</td></tr>
                        <tr><td><b>City:</b> {order.address.city}</td></tr>
                        <tr><td><b>State:</b> {order.address.state}</td></tr>
                        <tr><td><b>Zip:</b> {order.address.zipcode}</td></tr>
                        <tr><td><b>Country:</b> {order.address.country}</td></tr>
                      </tbody>
                    </table>
                  </td>

                  {/* Other details */}
                  <td>{order.address.phone}</td>
                  <td>{order.items.length}</td>
                  <td>${order.amount}</td>
                  <td>
                    <select value={order.status} onChange={(e) => statusHandlers(e, order._id)}>
                      <option value="Food Processing">Food Processing</option>
                      <option value="Out for delivery">Out for Delivery</option>
                      <option value="Delivered">Delivered</option>
                    </select>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
