import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { PEXELS_API_KEY, OPEN_WEATHER_API_KEY } from "./keys";
import Map from "./Map";
export default function ItemDetail() {
  const [item, setItem] = useState(null);
  const [userLocation, setUserLocation] = useState("");
  const [itemLocation, setItemLocation] = useState("");
  const [calculatedDistance, setCalculatedDistance] = useState("");
  const { itemId } = useParams();
  const [itemWeather, setItemWeather] = useState(null);

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
      const imageUrl = await fetchItemImage(data.name, data.item_type);
      const itemWithImage = { ...data, imageUrl };
      const itemLocationValue = data.location;
      setItemLocation(itemLocationValue);
      setItem(itemWithImage);
    } else {
      console.error("Error fetching item:", await response.text());
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
    } else {
      console.error("Error fetching user data");
    }
  };
  const fetchItemWeather = async (lat, lon) => {
    const apiKey = OPEN_WEATHER_API_KEY;
    const url = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`;
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      console.error("Error fetching weather:", await response.text());
      return null;
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
  const getItemCoords = async (itemLocation) => {
    const apiKey = OPEN_WEATHER_API_KEY;
    const itemZipCode = String(itemLocation).trim();
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
  const getUserCoords = async (userLocation) => {
    const apiKey = OPEN_WEATHER_API_KEY;
    const userZipCode = String(userLocation).trim();
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
  useEffect(() => {
    fetchData();
    fetchUserData();
  }, []);
  useEffect(() => {
    if (userLocation && itemLocation) {
      (async () => {
        const { itemLat, itemLon } = await getItemCoords(itemLocation);
        const { userLat, userLon } = await getUserCoords(userLocation);
        const distance = userItemDistance(itemLat, itemLon, userLat, userLon);
        setCalculatedDistance(distance);
      })();
    }
  }, [itemLocation, userLocation]);

  useEffect(() => {
    if (itemLocation) {
      (async () => {
        const { itemLat, itemLon } = await getItemCoords(itemLocation);
        const weather = await fetchItemWeather(itemLat, itemLon);
        setItemWeather(weather);
      })();
    }
  }, [itemLocation]);

  if (!item) {
    return <div>Loading...</div>;
  }
  console.log(
    JSON.parse(atob(localStorage.getItem("authToken").split(".")[1])).account
      .first_name
  );
  const history = [];
  const handleMessageOwner = () => {
    const socket = new WebSocket("ws://localhost:8000/ws");
    socket.onopen = () => {
      const user = JSON.parse(
        atob(localStorage.getItem("authToken").split(".")[1])
      );
      const owner = item.account_id;
      socket.send(JSON.stringify({ user, owner }));
    };
    socket.onmessage = (event) => {
      const message = event.data;
      history.push({ message });
    };
    socket.onclose = () => {};
  };
  return (
    <div className="container my-4">
      <h1 className="text-center mb-4">Item Detail</h1>
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">{item.name}</h5>
          {item.imageUrl && (
            <img
              src={item.imageUrl}
              alt={item.name}
              className="card-img-fluid"
            />
          )}
          <p className="card-text">
            <strong>Item Type:</strong> {item.item_type}
          </p>
          <p className="card-text">
            <strong>Quantity:</strong> {item.quantity}
          </p>
          <p className="card-text">
            <strong>Purchased or Prepared:</strong> {item.purchased_or_prepared}
          </p>
          <p className="card-text">
            <strong>Time of Post:</strong> {item.time_of_post}
          </p>
          <p className="card-text">
            <strong>Expiration:</strong> {item.expiration}
          </p>
          <p className="card-text">
            <strong>Distance:</strong> {calculatedDistance} miles
          </p>
          <p className="card-text">
            <strong>Dietary Restriction:</strong>{" "}
            {item.dietary_restriction.join(", ")}
          </p>
          <p className="card-text">
            <strong>Description:</strong> {item.description}
          </p>
          <p className="card-text">
            <strong>Pick-up Instructions:</strong> {item.pickup_instructions}
          </p>
          <button className="btn btn-primary" onClick={handleMessageOwner}>
            Message Owner
          </button>
          <ul className="list-group list-group-flush">
            <li className="list-group-item">
              <strong>Item Type:</strong> {item.item_type}
            </li>
            <li className="list-group-item">
              <strong>Quantity:</strong> {item.quantity}
            </li>
            <li className="list-group-item">
              <strong>Purchased or Prepared:</strong>{" "}
              {item.purchased_or_prepared}
            </li>
            <li className="list-group-item">
              <strong>Time of Post:</strong> {item.time_of_post}
            </li>
            <li className="list-group-item">
              <strong>Expiration:</strong> {item.expiration}
            </li>
            <li className="list-group-item">
              <strong>Location:</strong> {item.location}
            </li>
            <li className="list-group-item">
              <strong>Dietary Restriction:</strong>{" "}
              {item.dietary_restriction.join(", ")}
            </li>
            <li className="list-group-item">
              <strong>Description:</strong> {item.description}
            </li>
            <li className="list-group-item">
              <strong>Pick-up Instructions:</strong> {item.pickup_instructions}
            </li>
            <button className="btn btn-primary" onClick={handleMessageOwner}>
              Message Owner
            </button>
          </ul>
        </div>
      </div>
      {itemWeather && (
        <div className="map-container">
          <h2>Approximate Item Location:</h2>
          <Map weatherData={itemWeather} />
        </div>
      )}
      <div className="text-block" style={{ textAlign: "center" }}>
        {
          "This image is generated from the Item name and type and may not be accurate. Users will soon be able to add their own pictures. Thanks for your patience while we work on this feature!"
        }
      </div>
    </div>
  );
}
