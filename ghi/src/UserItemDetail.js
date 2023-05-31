import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { CondensedInput, CondensedCheckboxInput } from "./ItemForm";

export default function UserItemDetail() {
  const [formData, setFormData] = useState({
    name: "",
    item_type: "",
    quantity: "",
    purchased_or_prepared: "",
    expiration: "",
    location: "",
    dietary_restriction: [],
    description: "",
    pickup_instructions: "",
  });

  const { itemId } = useParams();

  useEffect(() => {
    const fetchItem = async () => {
      const url = `http://localhost:8000/items/${itemId}`;
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
        setFormData(data);
      }
    };

    fetchItem();
  }, [itemId]);

const handleFormChange = (event) => {
  const { value, name } = event.target;
  const type = event.target.type;

  if (type === "checkbox") {
    const isChecked = event.target.checked;
    const checkboxValue = event.target.value;

    setFormData((prevData) => {
      let updatedDietaryRestriction = [...prevData.dietary_restriction];

      if (isChecked) {
        updatedDietaryRestriction.push(checkboxValue);
      } else {
        updatedDietaryRestriction = updatedDietaryRestriction.filter((val) => val !== checkboxValue);
      }

      return {
        ...prevData,
        dietary_restriction: updatedDietaryRestriction,
      };
    });
  } else {
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }

  console.log(formData)
};

  const handleSubmit = async (event) => {
    event.preventDefault();
    const updateItemUrl = `http://localhost:8000/items/${itemId}`;
    const access_token = localStorage.getItem("authToken");
    const fetchConfig = {
      method: "PUT",
      body: JSON.stringify(formData),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${access_token}`,
      },
    };
    console.log(formData)
    console.log(fetchConfig)
    const response = await fetch(updateItemUrl, fetchConfig);
    if (response.ok) {
      console.log("Item successfully updated.");
    } else {
      console.error("Failed to update item:", response.statusText);
    }
  };

  const [alertState, setAlertState] = useState("alert alert-success d-none");

  return (
    <div className="row">
      <div className="col-md-6 offset-md-3">
        <div className="card shadow mt-4">
          <div className="card-body">
            <h1>Edit Item</h1>
            <form onSubmit={handleSubmit} id="create-item-form">
              <div className="row g-3">
                <CondensedInput
                  onChange={handleFormChange}
                  value={formData.name}
                  placeholder="Name"
                  type="text"
                  name="name"
                  id="name"
                  label="Name"
                />
                <CondensedInput
                  onChange={handleFormChange}
                  value={formData.item_type}
                  placeholder="Item type"
                  type="select"
                  name="item_type"
                  id="item_type"
                  label="Item Type"
                  required
                  options={[
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
                  ]}
                />
                <CondensedInput
                  onChange={handleFormChange}
                  value={formData.quantity}
                  placeholder="Quantity"
                  type="number"
                  name="quantity"
                  id="quantity"
                  label="Quantity"
                />
                <CondensedInput
                  onChange={handleFormChange}
                  value={formData.location}
                  placeholder="Location"
                  type="number"
                  name="location"
                  id="location"
                  label="Location"
                />
                <CondensedInput
                  onChange={handleFormChange}
                  value={formData.purchased_or_prepared}
                  placeholder="Purchased or Prepared"
                  type="datetime-local"
                  name="purchased_or_prepared"
                  id="purchased_or_prepared"
                  label="Purchased or Prepared"
                />
                <CondensedInput
                  onChange={handleFormChange}
                  value={formData.expiration}
                  placeholder="Expiration"
                  type="datetime-local"
                  name="expiration"
                  id="expiration"
                  label="Expiration"
                />
                <CondensedInput
                  onChange={handleFormChange}
                  value={formData.pickup_instructions}
                  placeholder="Pick-up Instructions"
                  type="text"
                  name="pickup_instructions"
                  id="pickup_instructions"
                  label="Pick-up Instructions"
                />
                <CondensedCheckboxInput
                  onChange={handleFormChange}
                  value={formData.dietary_restriction}
                  name="dietary_restriction"
                  id="dietary_restriction"
                  label="Dietary restrictions"
                  options={[
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
                    "Other",
                  ]}
                />
                <CondensedInput
                  onChange={handleFormChange}
                  value={formData.description}
                  placeholder="Item Description"
                  type="textarea"
                  name="description"
                  id="description"
                  label="Item Description"
                />
              </div>
              <div className="col-12">
                <button
                  type="submit"
                  className="btn btn-primary custom-button"
                  style={{ backgroundColor: "#1E7016", borderColor: "#1E7016" }}
                >
                  Create Post
                </button>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  textAlign: "center",
                }}
                className={alertState}
                role="alert"
              >
                Item Posted
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
