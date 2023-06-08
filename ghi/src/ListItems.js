import React, { useState, useEffect } from "react";
import { PEXELS_API_KEY, OPEN_WEATHER_API_KEY } from "./keys";

export default function ListItems() {
  const [items, setItems] = useState([]);
  const [userLocation, setUserLocation] = useState("");
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

      const itemsWithDistances = await Promise.all(
        filteredItemsByRestriction.map(async (item) => {
          const imageUrl = await fetchItemImage(item.name, item.item_type);
          const { itemLat, itemLon } = await getItemCoords(item.location);
          const { userLat, userLon } = await getUserCoords(userLocation);
          const distance = userItemDistance(itemLat, itemLon, userLat, userLon);
          return { ...item, imageUrl, distance };
        })
      );

      setItems(itemsWithDistances);
    } else {
      console.error("Failed to fetch items:", await response.text());
    }
  };

  useEffect(() => {
    fetchData();
    fetchUserData();
  }, [selectedTypes, selectedRestrictions, items.location, userLocation]);

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

  const getItemCoords = async (itemLocation) => {
    const apiKey = OPEN_WEATHER_API_KEY;
    const itemZipCode = String(itemLocation).trim();

    if (!itemZipCode) {
      console.error("Invalid itemLocation:", itemLocation);
      return { itemLat: null, itemLon: null };
    }

    const url = `http://api.openweathermap.org/geo/1.0/zip?zip=${itemZipCode},US&appid=${apiKey}`;
    const response = await fetch(url);

    if (response.ok) {
      const data = await response.json();
      const itemLat = data.lat;
      const itemLon = data.lon;
      return { itemLat, itemLon };
    } else {
      console.error("Error fetching coordinates:", await response.text());
      return { itemLat: null, itemLon: null };
    }
  };

  const fetchUserData = async () => {
    const url = "http://localhost:8000/api/accounts/me";
    const authToken = localStorage.getItem("authToken");
    const response = await fetch(url, {
      headers: { Authorization: `Bearer ${authToken}` },
    });

    if (response.ok) {
      const data = await response.json();
      const userLocationValue = data.location;
      setUserLocation(userLocationValue);
      if (userLocationValue) {
        await getUserCoords(userLocationValue);
      } else {
        console.error("Invalid user location:", userLocationValue);
      }
    } else {
      console.error("Error fetching user data");
    }
  };

  const getUserCoords = async (userLocation) => {
    const apiKey = OPEN_WEATHER_API_KEY;
    const userZipCode = String(userLocation).trim();

    if (!userZipCode) {
      return { userLat: null, userLon: null };
    }

    const url = `http://api.openweathermap.org/geo/1.0/zip?zip=${userZipCode},US&appid=${apiKey}`;
    const response = await fetch(url);

    if (response.ok) {
      const data = await response.json();
      const userLat = data.lat;
      const userLon = data.lon;
      return { userLat, userLon };
    } else {
      console.error("Error fetching coordinates:", await response.text());
      return { userLat: null, userLon: null };
    }
  };

  function userItemDistance(itemLat, itemLon, userLat, userLon) {
    const earthRadius = 6371;

    const degToRad = (deg) => {
      return deg * (Math.PI / 180);
    };

    const dLat = degToRad(userLat - itemLat);
    const dLon = degToRad(userLon - itemLon);

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(degToRad(itemLat)) *
        Math.cos(degToRad(userLat)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const calculatedDistance = (earthRadius * c).toFixed(2);

    return calculatedDistance;
  }

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
    fetchData();
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
    fetchData();
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

  useEffect(() => {
    const fetchDataAndUser = async () => {
      await fetchData();
      await fetchUserData();
    };

    const calculateItemsWithDistances = async () => {
      if (userLocation && items.location) {
        const sortedItems = sortItems(items, sortOption, sortOrder);
        const itemsWithDistances = await Promise.all(
          sortedItems.map(async (item) => {
            const { itemLat, itemLon } = await getItemCoords(item.location);
            const { userLat, userLon } = await getUserCoords(userLocation);
            const distance = userItemDistance(
              itemLat,
              itemLon,
              userLat,
              userLon
            );
            return { ...item, distance };
          })
        );
        setItems(itemsWithDistances);
      }
    };

    fetchDataAndUser();
    calculateItemsWithDistances();
  }, [items.location, userLocation, sortOption, sortOrder]);

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
                      <label style={{ fontWeight: "bold", fontSize: "1.1rem" }}>
                        Filter by Item Type:
                      </label>
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
                        <label key={type} style={{ marginRight: "8px" }}>
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
                      <label style={{ fontWeight: "bold", fontSize: "1.1rem" }}>
                        Filter by Dietary Restrictions:
                      </label>
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
                        <label key={restriction} style={{ marginRight: "8px" }}>
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
                <th>Distance</th>
              </tr>
            </thead>
            <tbody>
              {sortedItems?.map((item) => {
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
                      <a href={`/items/${item.id}`}>{item.name}</a>
                    </td>
                    <td>{item.item_type}</td>
                    <td>{item.quantity}</td>
                    <td>{item.time_of_post}</td>
                    <td>{item.expiration}</td>
                    <td>{item.distance} miles</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <div className="text-block" style={{ textAlign: "center" }}>
            {
              "These images are generated from the Item name and type and may not be accurate. Users will soon be able to add their own pictures. Thanks for your patience while we work on this feature!"
            }
          </div>
        </div>
      </div>
    </div>
  );
}
