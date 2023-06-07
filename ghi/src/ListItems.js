import React, { useState, useEffect } from "react";
import { PEXELS_API_KEY } from "./keys";

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
      const itemsWithImages = await Promise.all(
        filteredItemsByRestriction.map(async (item) => {
          const imageUrl = await fetchItemImage(item.name, item.item_type);
          return { ...item, imageUrl };
        })
      );
      setItems(itemsWithImages);
    } else {
      console.error("Failed to fetch items:", await response.text());
    }
  };

  useEffect(() => {
    fetchData();
  }, [selectedTypes, selectedRestrictions]);

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
                <div className="card shadow mt-4">
                  <div className="card-body">
                    <label htmlFor="sortOption" style={{ marginRight: "4px" }}>
                      Sort By:{" "}
                    </label>
                    <select
                      id="sortOption"
                      value={sortOption}
                      onChange={handleSortOptionChange}
                      style={{ marginRight: "8px" }}
                    >
                      <option value="time_of_post">Time of Post</option>
                      <option value="expiration">Expiration</option>
                    </select>
                    <label htmlFor="sortOrder" style={{ marginRight: "4px" }}>
                      Order:{" "}
                    </label>
                    <select
                      id="sortOrder"
                      value={sortOrder}
                      onChange={handleSortOrderChange}
                      style={{ marginRight: "8px" }}
                    >
                      <option value="asc">Ascending</option>
                      <option value="desc">Descending</option>
                    </select>
                    <div className="item-filter">
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
                    <div className="item-filter">
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
                  </div>
                </div>
              </div>
              <button
                className="btn btn-primary new-item-button"
                onClick={() =>
                  (window.location.href = "http://localhost:3000/items/new")
                }
              >
                Create New Item
              </button>
            </>
          ) : (
            <div className="alert alert-warning">
              Please <a href="/login">log in</a> to view items.
            </div>
          )}
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
              </tr>
            </thead>
            <tbody>
              {sortedItems?.map((item) => (
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
                    <a href={`/items/${item.id}`}>{item.name}</a>
                  </td>
                  <td>{item.item_type}</td>
                  <td>{item.quantity}</td>
                  <td>{item.time_of_post}</td>
                  <td>{item.expiration}</td>
                  <td>{item.location}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
