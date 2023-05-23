import React, { useState } from "react";

// function CondensedInput(props) {
//   const { onChange, value, placeholder, type, name, id, label } = props;

//   return (
//     <div className="col-md-6">
//       <label htmlFor={id} className="form-label">
//         {label}
//       </label>
//       <input
//         style={{ backgroundColor: "rgb(228, 230, 240)" }}
//         onChange={onChange}
//         value={value}
//         placeholder={placeholder}
//         required
//         type={type}
//         name={name}
//         id={id}
//         className="form-control"
//       />
//     </div>
//   );
// }

function CondensedInput(props) {
  const { onChange, value, placeholder, type, name, id, label, options } =
    props;
  return (
    <div className="col-md-6">
      {" "}
      <label htmlFor={id} className="form-label">
        {" "}
        {label}{" "}
      </label>{" "}
      {type !== "select" ? (
        <input
          style={{ backgroundColor: "rgb(228, 230, 240)" }}
          onChange={onChange}
          value={value}
          placeholder={placeholder}
          required
          type={type}
          name={name}
          id={id}
          className="form-control"
        />
      ) : (
        <select
          style={{ backgroundColor: "rgb(228, 230, 240)" }}
          onChange={onChange}
          value={value}
          name={name}
          id={id}
          className="form-control"
        >
          {" "}
          {options.map((option, index) => (
            <option key={index} value={option}>
              {" "}
              {option}{" "}
            </option>
          ))}{" "}
        </select>
      )}{" "}
    </div>
  );
}

function ItemForm() {
  const [formData, setFormData] = useState({
    name: "",
    item_type: "",
    quantity: "",
    purchased_or_prepared: "",
    time_of_post: "",
    expiration: "",
    location: "",
    dietary_restriction: "",
    description: "",
    pickup_instructions: "",
  });

  const handleFormChange = (event) => {
    const { value, name } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const newItemUrl = "http://localhost:8000/items";
    const itemData = { ...formData };
    const fetchConfig = {
      method: "POST",
      body: JSON.stringify(itemData),
      headers: {
        "Content-Type": "application/json",
      },
    };
    console.log(itemData);
    const response = await fetch(newItemUrl, fetchConfig);
    if (response.ok) {
      setFormData({
        name: "",
        item_type: "",
        quantity: "",
        purchased_or_prepared: "",
        time_of_post: "",
        expiration: "",
        location: "",
        dietary_restriction: "",
        description: "",
        pickup_instructions: "",
      });
    }
  };

  return (
    <div className="row">
      <div className="col-md-6 offset-md-3">
        <div className="card shadow mt-4">
          <div className="card-body">
            <h1>Add an Item</h1>
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
                  options={[
                    "pantry",
                    "fresh produce",
                    "meat",
                    "seafood",
                    "dairy & eggs",
                    "frozen",
                    "deli",
                    "baked Goods",
                    "coffee",
                    "baby food",
                    "ready-to-eat",
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
                  value={formData.purchased_or_prepared}
                  placeholder="Purchased or Prepared"
                  type="datetime-local"
                  name="purchased_or_prepared"
                  id="purchased_or_prepared"
                  label="Purchased or Prepared"
                />
                <CondensedInput
                  onChange={handleFormChange}
                  value={formData.time_of_post}
                  placeholder="Time of post"
                  type="datetime-local"
                  name="time_of_post"
                  id="time_of_post"
                  label="Time of post"
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
                  value={formData.location}
                  placeholder="Location"
                  type="number"
                  name="location"
                  id="location"
                  label="Location"
                />
                <CondensedInput
                  onChange={handleFormChange}
                  value={formData.dietary_restriction}
                  placeholder="Dietary restrictions"
                  type="text"
                  name="dietary_restriction"
                  id="dietary_restriction"
                  label="Dietary restrictions"
                />
                <CondensedInput
                  onChange={handleFormChange}
                  value={formData.description}
                  placeholder="Item Description"
                  type="text"
                  name="description"
                  id="description"
                  label="Item Description"
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
              </div>
              <div className="col-12">
                <button type="submit" className="btn btn-primary">
                  Add
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ItemForm;
