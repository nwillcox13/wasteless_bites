import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { PEXELS_API_KEY, OPEN_WEATHER_API_KEY } from "./keys";

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
      const imageUrl = await fetchItemImage(data.name, data.item_type);
      const itemWithImage = { ...data, imageUrl };

      const locationCoords = await getCoords(data.location, "US");
      itemWithImage.lat = locationCoords.lat;
      itemWithImage.lon = locationCoords.lon;

      console.log("Coordinates:", itemWithImage.lat, itemWithImage.lon);

      const dist = distance(itemWithImage.lat, itemWithImage.lon);
      console.log("Distance:", dist);

      setItem(itemWithImage);
    } else {
      console.error("Error fetching item:", await response.text());
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

  const getCoords = async (itemLocation) => {
    const apiKey = OPEN_WEATHER_API_KEY;
    const zipCode = itemLocation;
    const url = `http://api.openweathermap.org/geo/1.0/zip?zip=${zipCode},US&appid=${apiKey}`;
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      return { lat: data.lat, lon: data.lon };
    } else {
      console.error("Error fetching coordinates:", await response.text());
      return { lat: null, lon: null };
    }
  };

  function distance(lat1, lon1) {
    const earthRadius = 6371;

    const degToRad = (deg) => {
      return deg * (Math.PI / 180);
    };

    const dLat = degToRad(40.1486 - lat1);
    const dLon = degToRad(-84.2531 - lon1);

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(degToRad(lat1)) *
        Math.cos(degToRad(40.1486)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = (earthRadius * c).toFixed(2);

    return distance;
  }

  useEffect(() => {
    fetchData();
  }, []);

  if (!item) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container my-4">
      <h1 className="text-center mb-4">Item Detail</h1>
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">{item.name}</h5>
          {item.imageUrl && (
            <img src={item.imageUrl} alt={item.name} className="card-img-top" />
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
            <strong>Location:</strong> {item.location}
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
        </div>
      </div>
    </div>
  );
}
