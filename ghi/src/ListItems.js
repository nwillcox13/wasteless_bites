import React, { useState, useEffect } from "react";

export default function ListItems() {
  const [items, setItems] = useState([]);

  const fetchData = async () => {
    const url = "http://localhost:8000/items";
    const authToken = localStorage.getItem("authToken");

    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });

    if (response.ok) {
      const data = await response.json();
      setItems(data);
    } else {
      console.error("Failed to fetch items:", await response.text());
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="container my-4">
      <div className="row">
        <div className="col-12">
          <h1 className="text-center mb-4">Item List</h1>
          <table className="table table-dark table-striped table-bordered">
            <thead>
              <tr>
                <th>Item Name</th>
                <th>Item Type</th>
                <th>Quantity</th>
                <th>Purchased or Prepared</th>
                <th>Time of post</th>
                <th>Expiration</th>
                <th>Location</th>
                <th>Dietary restriction</th>
                <th>Description</th>
                <th>Pick-up instructions</th>
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
                    <td>{item.purchased_or_prepared}</td>
                    <td>{item.time_of_post}</td>
                    <td>{item.expiration}</td>
                    <td>{item.location}</td>
                    <td>{item.dietary_restriction}</td>
                    <td>{item.description}</td>
                    <td>{item.pickup_instructions}</td>
                    <td>
                      {/* <button
                        className="btn btn-secondary"
                        onClick={() => deleteItem(item.id)}
                      >
                        Remove
                      </button> */}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
      {/* {items.length === 0 && (
        <div className="row">
            <div className="col-12 text-center">
                <p className="lead">Loading...</p>
            </div>
        </div>
    )} */}
    </div>
  );
}
