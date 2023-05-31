import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export default function ItemDetail() {
  const [item, setItem] = useState(null);
  const { itemId } = useParams();

  const fetchData = async () => {
    const url = `http://localhost:8000/items/${itemId}`;
    const authToken = localStorage.getItem("authToken");
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });
    if (response.ok) {
      const data = await response.json();
      console.log("Item data:", data);
      setItem(data);
    } else {
      console.error("Error fetching item:", response.statusText);
    }
  };

  useEffect(() => {
    fetchData();
  }, [itemId]);

  return (
    <div className="container my-4 d-flex justify-content-center align-items-center">
      <div className="row">
        <div className="col-12">
          <h1 className="text-center mb-4">Item Detail</h1>
          {item ? (
            <table className="table table-hover table-striped-columns table-bordered">
              <thead>
                <tr>
                  <th>Item Name</th>
                  <th>Item Type</th>
                  <th>Quantity</th>
                  <th>Purchased or Prepared</th>
                  <th>Expiration</th>
                  <th>Location</th>
                  <th>Dietary restriction</th>
                  <th>Description</th>
                  <th>Pick-up instructions</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{item.name}</td>
                  <td>{item.item_type}</td>
                  <td>{item.quantity}</td>
                  <td>{item.purchased_or_prepared}</td>
                  <td>{item.expiration}</td>
                  <td>{item.location}</td>
                  <td>{item.dietary_restriction.join(", ")}</td>
                  <td>{item.description}</td>
                  <td>{item.pickup_instructions}</td>
                </tr>
              </tbody>
            </table>
          ) : (
            <p>Loading...</p>
          )}
        </div>
      </div>
    </div>
  );
}
