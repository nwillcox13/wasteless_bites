import React, { useState, useEffect } from "react";
import { json, useParams } from "react-router-dom";
import { PEXELS_API_KEY } from "./keys";

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
      const imageUrl = await fetchItemImage(data.name, data.item_type);
      const itemWithImage = { ...data, imageUrl };
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

  useEffect(() => {
    fetchData();
  }, []);

  if (!item) {
    return <div>Loading...</div>;
  }

  console.log(JSON.parse(atob(localStorage.getItem("authToken").split('.')[1])).account.first_name)
  const history = []
  const handleMessageOwner = () => {
    const socket = new WebSocket("ws://localhost:8000/ws");

    socket.onopen = () => {
      const user = JSON.parse(atob(localStorage.getItem("authToken").split('.')[1]));
      const owner = item.account_id

      socket.send(JSON.stringify({user, owner}))
    }

    socket.onmessage = (event) => {
      const message = event.data
      history.push({message})
    }

    socket.onclose = () => {

    }
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
          <button className="btn btn-primary" onClick={handleMessageOwner}>Message Owner</button>
        </div>
      </div>
    </div>
  );
}
