import React, { useState, useEffect } from "react";

export default function ListItems() {
  const [items, setItems] = useState([]);
  const [sortOption, setSortOption] = useState("time_of_post");
  const [sortOrder, setSortOrder] = useState("asc");

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

  const handleSortOptionChange = (event) => {
    setSortOption(event.target.value);
  };

  const handleSortOrderChange = (event) => {
    setSortOrder(event.target.value);
  };

  const sortItems = (items) => {
    const sortedItems = [...items];
    sortedItems.sort((a, b) => {
      const aValue = a[sortOption];
      const bValue = b[sortOption];
      if (sortOrder === "asc") {
        return aValue.localeCompare(bValue);
      } else {
        return bValue.localeCompare(aValue);
      }
    });
    return sortedItems;
  };

  const sortedItems = sortItems(items);

  return (
    <div className="container my-4">
      <div className="row">
        <div className="col-12">
          <h1 className="text-center mb-4">Item List</h1>
          <div className="mb-4">
            <label htmlFor="sortOption">Sort By:</label>
            <select
              id="sortOption"
              value={sortOption}
              onChange={handleSortOptionChange}
            >
              <option value="time_of_post">Time of Post</option>
              <option value="expiration">Expiration</option>
            </select>
            <label htmlFor="sortOrder">Order:</label>
            <select
              id="sortOrder"
              value={sortOrder}
              onChange={handleSortOrderChange}
            >
              <option value="asc">Ascending</option>
              <option value="desc">Descending</option>
            </select>
          </div>
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
              {sortedItems?.map((item) => {
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
                    <td>{item.dietary_restriction.join(", ")}</td>
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
    </div>
  );
}
