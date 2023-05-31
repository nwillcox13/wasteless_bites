import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAuthContext } from "@galvanize-inc/jwtdown-for-react";

export default function UserItemDetail() {
  const [item, setItem] = useState({
    name: "",
    item_type: "",
    quantity: 0,
    purchased_or_prepared: "",
    time_of_post: "",
    expiration: "",
    location: "",
    dietary_restriction: "",
    description: "",
    pickup_instructions: "",
  });
  const { itemId } = useParams();
  const { token } = useAuthContext();
  console.log(token);
  const fetchData = async () => {
    if (token && token.account) {
      const url = `http://localhost:8000/items/${itemId}?userId=${token.account.id}`;
      const response = await fetch(url, {
        headers: { Authorization: `Bearer ${token.access_token}` },
      });
      if (response.ok) {
        const data = await response.json();
        setItem(data);
      }
    }
  };

  useEffect(() => {
    if (token) {
      fetchData();
    }
  }, [token]);

  // Update the item data in state as form inputs change
  const handleInputChange = (event) => {
    setItem({ ...item, [event.target.name]: event.target.value });
  };

  // Send updated item data back to server
  const handleUpdate = async () => {
    const url = `http://localhost:8000/items/${itemId}?userId=${token.account.id}`;
    const options = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token.access_token}`,
      },
      body: JSON.stringify(item),
    };

    const response = await fetch(url, options);
    if (response.ok) {
      const data = await response.json();
      setItem(data);
      alert("Item updated successfully");
    }
  };

  if (!item) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container my-4 d-flex justify-content-center align-items-center">
      <div className="row">
        <div className="col-12">
          <h1 className="text-center mb-4">Your Item</h1>
          <form>
            <div className="form-group">
              <label htmlFor="name">Item Name</label>
              <input
                type="text"
                className="form-control"
                id="name"
                name="name"
                value={item.name}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="itemType">Item Type</label>
              <input
                type="text"
                className="form-control"
                id="itemType"
                name="item_type"
                value={item.item_type}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="quantity">Quantity</label>
              <input
                type="number"
                className="form-control"
                id="quantity"
                name="quantity"
                value={item.quantity}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="purchasedOrPrepared">Purchased or Prepared</label>
              <input
                type="text"
                className="form-control"
                id="purchasedOrPrepared"
                name="purchased_or_prepared"
                value={item.purchased_or_prepared}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="timeOfPost">Time of Post</label>
              <input
                type="text"
                className="form-control"
                id="timeOfPost"
                name="time_of_post"
                value={item.time_of_post}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="expiration">Expiration</label>
              <input
                type="text"
                className="form-control"
                id="expiration"
                name="expiration"
                value={item.expiration}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="location">Location</label>
              <input
                type="text"
                className="form-control"
                id="location"
                name="location"
                value={item.location}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="dietaryRestriction">Dietary Restriction</label>
              <input
                type="text"
                className="form-control"
                id="dietaryRestriction"
                name="dietary_restriction"
                value={item.dietary_restriction}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="description">Description</label>
              <textarea
                className="form-control"
                id="description"
                name="description"
                value={item.description}
                onChange={handleInputChange}
              ></textarea>
            </div>
            <div className="form-group">
              <label htmlFor="pickupInstructions">Pick-up Instructions</label>
              <textarea
                className="form-control"
                id="pickupInstructions"
                name="pickup_instructions"
                value={item.pickup_instructions}
                onChange={handleInputChange}
              ></textarea>
            </div>
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleUpdate}
            >
              Save
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
