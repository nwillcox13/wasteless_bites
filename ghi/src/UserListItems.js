import React, { useState, useEffect } from "react";

export default function UserListItems() {
  const [items, setItems] = useState([]);

  const fetchData = async () => {
    const url = "http://localhost:8000/user-items";
    const authToken = localStorage.getItem("authToken");

    const options = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
    };

    const response = await fetch(url, options);
    if (response.ok) {
      const data = await response.json();
      setItems(data);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const deleteItem = async (id) => {
    const url = `http://localhost:8000/items/${id}`;
    const authToken = localStorage.getItem("authToken");

    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
    });

    if (response.ok) {
      setItems(items.filter((item) => item.id !== id));
    }
  };

  return (
    <div className="container my-4">
      <div className="row">
        <div className="col-12">
          <h1 className="text-center mb-4">Your Item List</h1>
          <table className="table table-dark table-striped table-bordered">
            <thead>
              <tr>
                <th>Item Name</th>
                <th>Item Type</th>
                <th>Quantity</th>
                <th>Time of post</th>
                <th>Expiration</th>
                <th>Location</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {items?.map((item) => {
                return (
                  <tr key={item.id}>
                    <td>
                      <a href={`/items/${item.id}`}>{item.name}</a>
                    </td>
                    <td>{item.item_type}</td>
                    <td>{item.quantity}</td>
                    <td>{item.time_of_post}</td>
                    <td>{item.expiration}</td>
                    <td>{item.location}</td>
                    <td>
                      <button
                        className="btn btn-secondary"
                        onClick={() => deleteItem(item.id)}
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
