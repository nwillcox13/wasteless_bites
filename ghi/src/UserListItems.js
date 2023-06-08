import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const PEXELS_API_KEY = `${process.env.PEXELS_API_KEY}`;

export default function UserListItems() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const url = `${process.env.REACT_APP_API_HOST}/user-items`;
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
        const itemsWithImages = await Promise.all(
          data.map(async (item) => {
            const imageUrl = await fetchItemImage(item.name, item.item_type);
            return { ...item, imageUrl };
          })
        );
        setItems(itemsWithImages);
      }
    };

    fetchData();
  }, []);

  const deleteItem = async (id) => {
    const url = `${process.env.REACT_APP_API_HOST}/items/${id}`;
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

  const fetchItemImage = async (itemName, itemType) => {
    const apiKey = PEXELS_API_KEY;
    const searchUrl = `https://api.pexels.com/v1/search?query=${encodeURIComponent(
      itemName + " " + itemType
    )}&per_page=1`;
    const response = await fetch(searchUrl, {
      headers: {
        Authorization: apiKey,
      },
    });
    if (response.ok) {
      const data = await response.json();
      if (data.photos && data.photos.length > 0) {
        return data.photos[0].src.medium;
      }
    }
    return "";
  };

  return (
    <div className="container my-4 d-flex justify-content-center align-items-center">
      <div className="row">
        <div className="col-12">
          <h1 className="text-center mb-4">Your Item List</h1>
          <table className="table table-hover table-striped-columns table-bordered">
            <thead>
              <tr>
                <th>Image</th>
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
                      {item.imageUrl && (
                        <img
                          src={item.imageUrl}
                          alt={item.name}
                          style={{ width: "50px" }}
                        />
                      )}
                    </td>
                    <td>
                      <Link to={`/user/items/${item.id}`}>{item.name}</Link>
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
