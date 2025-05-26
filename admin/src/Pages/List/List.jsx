import React, { useState, useEffect } from 'react';
import './List.css';
import axios from 'axios';
import { toast } from 'react-toastify';

const List = ({ url }) => {
  const [list, setList] = useState([]);

  // Fetch list from backend
  const fetchList = async () => {
    try {
      const response = await axios.get(`${url}/api/food/list`);
      if (response.data.success) {
        setList(response.data.data);
      } else {
        toast.error("Error fetching food list");
      }
    } catch (err) {
      toast.error("Something went wrong");
    }
  };

  // Remove food item
  const removeFood = async (foodId) => {
    try {
      const response = await axios.post(`${url}/api/food/remove`, { id: foodId });
      if (response.data.success) {
        toast.success(response.data.message);
        await fetchList();
      } else {
        toast.error("Error deleting food item");
      }
    } catch (err) {
      toast.error("Something went wrong");
    }
  };

  // Group list by category
  const groupedByCategory = list.reduce((acc, item) => {
    if (!acc[item.category]) acc[item.category] = [];
    acc[item.category].push(item);
    return acc;
  }, {});

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <div className='list add flex-col'>
      <p>All Foods List</p>

      {Object.keys(groupedByCategory).map((category) => (
        <div key={category} className="category-group" style={{ marginBottom: '30px' }}>
          <h2>{category}</h2>
          <div className="list-table">
            <div className="list-table-formate title">
              <b>S/N</b>
              <b>Image</b>
              <b>Name</b>
              <b>Price</b>
              <b>Action</b>
            </div>
            {groupedByCategory[category].map((item, index) => (
              <div key={item._id} className="list-table-formate">
                <p>{index + 1}</p>
                <img src={`${url}/images/${item.image}`} alt={item.name} />
                <p>{item.name}</p>
                <p>${item.price}</p>
                <p className="cursor">
                  <button onClick={() => removeFood(item._id)}>Delete</button>
                </p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default List;
