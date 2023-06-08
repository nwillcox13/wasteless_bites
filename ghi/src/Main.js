import React, { useState, useEffect } from "react";
import dummyItems from "./dummydata";

const PEXELS_API_KEY = `${process.env.PEXELS_API_KEY}`;

export default function MainPage() {
  const [itemsWithImages, setItemsWithImages] = useState([]);
  const [sortOption, setSortOption] = useState("time_of_post");
  const [sortOrder, setSortOrder] = useState("asc");
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [selectedRestrictions, setSelectedRestrictions] = useState([]);

  const fetchData = async () => {
    const filteredItemsByType = selectedTypes.length
      ? dummyItems.filter((item) => selectedTypes.includes(item.item_type))
      : dummyItems;

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

    setItemsWithImages(itemsWithImages);
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
      if (sortOption === "time_of_post") {
        const dateA = new Date(a.time_of_post);
        const dateB = new Date(b.time_of_post);

        return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
      } else if (sortOption === "expiration") {
        const dateA = new Date(a.expiration);
        const dateB = new Date(b.expiration);

        return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
      }

      return 0;
    });

    return sortedItems;
  };

  const sortedItems = sortItems(itemsWithImages);

  return (
    <div className="container my-4 d-flex justify-content-center align-items-center">
      <div className="row">
        <div className="col-12">
          <h1 className="text-center mb-4">
            Welcome! Here's Some Food Near You
          </h1>
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
          <table className="table table-hover table-striped-columns table-bordered">
            <thead>
              <tr>
                <th>Image</th>
                <th>Item Name</th>
                <th>Item Type</th>
                <th>Quantity</th>
                <th>Time of Post</th>
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
                    <a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ">
                      {item.name}
                    </a>
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
