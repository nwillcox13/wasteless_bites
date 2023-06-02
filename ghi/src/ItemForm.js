import React, { useState } from "react";

function CondensedInput(props) {
  const { onChange, value, placeholder, type, name, id, label, options } =
    props;

  if (type === "textarea") {
    return (
      <div className="col-md-12">
        <label htmlFor={id} className="form-label">
          {label}
        </label>
        <textarea
          style={{ backgroundColor: "rgb(228, 230, 240)", width: "100%" }}
          onChange={onChange}
          value={value}
          placeholder={placeholder}
          required
          name={name}
          id={id}
          className="form-control"
        />
      </div>
    );
  }
  return (
    <div className="col-md-6">
      <label htmlFor={id} className="form-label">
        {label}
      </label>
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
          required
        >
          <option value="">Select an option</option>
          {options.map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
        </select>
      )}
    </div>
  );
}

function CondensedCheckboxInput(props) {
  const { onChange, value, name, id, label, options } = props;
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleCollapse = () => {
    setIsExpanded(!isExpanded);
  };

  const handleChange = (event) => {
    const checked = event.target.checked;
    const checkedValue = event.target.value;
    let newValue = [...value];

    if (checked) {
      newValue.push(checkedValue);
    } else {
      newValue = newValue.filter((val) => val !== checkedValue);
    }

    onChange({ target: { name, value: newValue } });
  };

  return (
    <div className="col-md-6">
      <label htmlFor={id} className="form-label">
        {label}
      </label>
      <div
        className={`form-control ${isExpanded ? "expanded" : ""}`}
        style={{ backgroundColor: "rgb(228, 230, 240)" }}
      >
        {isExpanded && (
          <div className="collapse-content">
            {options.map((option, index) => (
              <div className="form-check" key={index}>
                <input
                  className="form-check-input"
                  type="checkbox"
                  name={name}
                  id={`${id}_${index}`}
                  value={option}
                  onChange={handleChange}
                  checked={value.includes(option)}
                />
                <label className="form-check-label" htmlFor={`${id}_${index}`}>
                  {option}
                </label>
              </div>
            ))}
          </div>
        )}
        <div className="collapse-toggle" onClick={toggleCollapse}>
          {isExpanded ? "Collapse" : "Click to Expand"}
        </div>
      </div>
    </div>
  );
}

function ItemForm() {
  const [formData, setFormData] = useState({
    name: "",
    item_type: "",
    quantity: "",
    purchased_or_prepared: "",
    expiration: "",
    dietary_restriction: [],
    description: "",
    pickup_instructions: "",
  });

  const handleFormChange = (event) => {
    const { value, name } = event.target;
    const type = event.target.type;
    if (type === "checkbox") {
      const isChecked = event.target.checked;
      const checkboxValue = event.target.value;
      let updatedValue = [...formData.dietary_restriction];

      if (isChecked) {
        updatedValue.push(checkboxValue);
      } else {
        updatedValue = updatedValue.filter((val) => val !== checkboxValue);
      }

      setFormData((prevData) => ({
        ...prevData,
        [name]: updatedValue,
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  const [alertState, setAlertState] = useState("alert alert-success d-none");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const newItemUrl = "http://localhost:8000/items";
    const location = JSON.parse(
      atob(localStorage.getItem("authToken").split(".")[1])
    ).account.location;
    const itemData = {
      ...formData,
      time_of_post: new Date(),
      location: location,
    };
    const access_token = localStorage.getItem("authToken");
    const fetchConfig = {
      method: "POST",
      body: JSON.stringify(itemData),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${access_token}`,
      },
    };
    console.log("Item data to be sent:", itemData);

    const response = await fetch(newItemUrl, fetchConfig);
    if (response.ok) {
      console.log("Item successfully created.");
      setFormData({
        name: "",
        item_type: "",
        quantity: "",
        purchased_or_prepared: "",
        expiration: "",
        dietary_restriction: [],
        description: "",
        pickup_instructions: "",
      });
      setAlertState("mt-3 alert alert-success");
      await sleep(3000);
      setAlertState("mt-3 alert alert-success d-none");
    } else {
      console.error("Failed to create item:", response.statusText);
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
                  value={formData.purchased_or_prepared}
                  placeholder="Purchased or Prepared on"
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

export { ItemForm, CondensedInput, CondensedCheckboxInput };
export default ItemForm;
