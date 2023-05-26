import React, { useState } from "react";

function CondensedInput(props) {
const { onChange, value, placeholder, type, name, id, label, options } =
props;
return (
<div className="col-md-6 mb-3">
    <label htmlFor={id} className="form-label">
    {label}
    </label>
    {type !== "select" ? (
    <input
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
        onChange={onChange}
        value={value}
        name={name}
        id={id}
        className="form-control"
    >
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
    <div className="form-control">
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
    dietary_restriction: [],
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
        <h1 className="text-center mb-4">Create a New Item</h1>
        <form onSubmit={handleSubmit} id="create-item-form">
            <div className="row g-3">
            <CondensedInput
                label="Name"
                type="text"
                name="name"
                id="name"
                placeholder="Name"
                value={formData.name}
                onChange={handleFormChange}
            />
            <CondensedInput
                label="Item Type"
                type="select"
                name="item_type"
                id="item_type"
                placeholder="Enter item type"
                value={formData.item_type}
                onChange={handleFormChange}
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
                label="Quantity"
                type="number"
                name="quantity"
                id="quantity"
                placeholder="Quantity"
                value={formData.quantity}
                onChange={handleFormChange}
            />
            <CondensedInput
                label="Purchased or Prepared"
                type="datetime-local"
                name="purchased_or_prepared"
                id="purchased_or_prepared"
                placeholder="Purchased or Prepared"
                value={formData.purchased_or_prepared}
                onChange={handleFormChange}
            />
            <CondensedInput
                label="Time of Post"
                type="datetime-local"
                name="time_of_post"
                id="time_of_post"
                value={formData.time_of_post}
                onChange={handleFormChange}
            />
            <CondensedInput
                label="Expiration"
                type="datetime-local"
                name="expiration"
                id="expiration"
                value={formData.expiration}
                onChange={handleFormChange}
            />
            <CondensedInput
                label="Location"
                type="text"
                name="location"
                id="location"
                placeholder="Location"
                value={formData.location}
                onChange={handleFormChange}
            />
            <CondensedInput
                label="Description"
                type="textarea"
                name="description"
                id="description"
                placeholder="Item Description"
                value={formData.description}
                onChange={handleFormChange}
            />
            <CondensedInput
                label="Pick-up Instructions"
                type="text"
                name="pickup_instructions"
                id="pickup_instructions"
                placeholder="Enter pickup instructions"
                value={formData.pickup_instructions}
                onChange={handleFormChange}
            />
            <CondensedCheckboxInput
                label="Dietary Restriction"
                name="dietary_restriction"
                id="dietary_restriction"
                options={["Vegetarian", "Vegan", "Gluten-Free", "Nut-Free"]}
                value={formData.dietary_restriction}
                onChange={handleFormChange}
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
            </div>
            <div className="col-12">
            <button type="submit" className="btn btn-primary">
                Submit
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
