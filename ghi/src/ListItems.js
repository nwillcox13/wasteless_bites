import React, { useState, useEffect } from "react";

export default function ListItems() {
  const [items, setItems] = useState([]);
  const [sortOption, setSortOption] = useState("time_of_post");
  const [sortOrder, setSortOrder] = useState("asc");
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [selectedRestrictions, setSelectedRestrictions] = useState([]);

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
      const filteredItemsByType = selectedTypes.length
        ? data.filter((item) => selectedTypes.includes(item.item_type))
        : data;
      const filteredItemsByRestriction = filteredItemsByType.filter((item) =>
        selectedRestrictions.every((restriction) =>
          item.dietary_restriction.includes(restriction)
        )
      );
      setItems(filteredItemsByRestriction);
    } else {
      console.error("Failed to fetch items:", await response.text());
    }
  };

  useEffect(() => {
    fetchData();
  }, [selectedTypes, selectedRestrictions]);

  const handleSortOptionChange = (event) => {
    setSortOption(event.target.value);
  };

  const handleSortOrderChange = (event) => {
    setSortOrder(event.target.value);
  };

  const handleTypeChange = (event) => {
    const type = event.target.value;
    if (event.target.checked) {
      setSelectedTypes((prevSelectedTypes) => [...prevSelectedTypes, type]);
    } else {
      setSelectedTypes((prevSelectedTypes) =>
        prevSelectedTypes.filter((t) => t !== type)
      );
    }
  };

  const handleRestrictionChange = (event) => {
    const restriction = event.target.value;
    if (event.target.checked) {
      setSelectedRestrictions((prevSelectedRestrictions) => [
        ...prevSelectedRestrictions,
        restriction,
      ]);
    } else {
      setSelectedRestrictions((prevSelectedRestrictions) =>
        prevSelectedRestrictions.filter((r) => r !== restriction)
      );
    }
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
  const authToken = localStorage.getItem("authToken");

  return (
    <div className="container my-4 d-flex justify-content-center align-items-center">
      <div className="row">
        <div className="col-12">
          <h1 className="text-center mb-4">Item List</h1>
          {authToken ? (
            <>
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
              <div>
                <label>Filter by Item Type:</label>
                <br />
                {[
                  "Baked Goods",
                  "Baby Food/Formula",
                  "Coffee",
                  "Dairy & Eggs",
                  "Deli",
                  "Frozen",
                  "Meat",
                  "Pantry",
                  "Produce",
                  "Ready-to-eat",
                  "Seafood",
                ].map((type) => (
                  <label key={type}>
                    <input
                      type="checkbox"
                      value={type}
                      checked={selectedTypes.includes(type)}
                      onChange={handleTypeChange}
                    />
                    {type}
                  </label>
                ))}
              </div>
              <div>
                <label>Filter by Dietary Restrictions:</label>
                <br />
                {[
                  "Gluten-Free",
                  "Dairy-Free",
                  "Vegetarian",
                  "Vegan",
                  "Organic",
                  "Contains Egg",
                  "Contains Nuts",
                  "Contains Shellfish",
                  "Contains Soy",
                  "Contains Wheat",
                  "Kosher",
                  "Halal",
                ].map((restriction) => (
                  <label key={restriction}>
                    <input
                      type="checkbox"
                      value={restriction}
                      checked={selectedRestrictions.includes(restriction)}
                      onChange={handleRestrictionChange}
                    />
                    {restriction}
                  </label>
                ))}
              </div>
              <h1 className="text-center mb-4">Item List</h1>
              <button
                className="btn btn-primary"
                onClick={() =>
                  (window.location.href = "http://localhost:3000/items/new")
                }
              >
                Create New Item
              </button>
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
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </>
          ) : (
            <div className="alert alert-warning">
              Please <a href="/login">log in</a> to view items.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
