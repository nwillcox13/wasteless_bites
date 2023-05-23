import React, { useState, useEffect } from "react";
function ItemForm() {
    const [formData, setFormData] = useState({
        name: '',
        item_type: '',
        quantity: '',
        purchased_or_prepared: '',
        time_of_post: '',
        expiration: '',
        location: '',
        dietary_restriction: '',
        description: '',
        pickup_instructions: '',
    });
    const handleFormChange = (event) => {
        const value = event.target.value;
        const inputName = event.target.name;
        setFormData({
            ...formData,
            [inputName]: value,
        })
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const newItemUrl = 'http://localhost:8000/items'
        const itemData = {...formData}
        const fetchConfig = {
            method: "POST",
            body: JSON.stringify(itemData),
            headers: {
                'Content-Type': 'application/json',
            },
        }
        console.log(itemData)
        const response = await fetch (newItemUrl, fetchConfig);
        if (response.ok) {
            setFormData({
                name: '',
                item_type: '',
                quantity: '',
                purchased_or_prepared: '',
                time_of_post: '',
                expiration: '',
                location: '',
                dietary_restriction: '',
                description: '',
                pickup_instructions: '',
        });
    }
}

    return (
    <div className="row">
    <div className="offset-3 col-6">
        <div className="shadow p-4 mt-4">
        <h1>Create an item</h1>
        <form onSubmit={handleSubmit} id="create-item-form">
            <h1 className="mb-3">Add item</h1>
            <div className="form-floating mb-3">
                <label htmlFor="name">Name</label>
                <input
                    style={{ backgroundColor: "rgb(228, 230, 240)" }}
                    onChange={handleFormChange}
                    value={formData.name}
                    placeholder="name"
                    required
                    type="text"
                    name="name"
                    id="name"
                    className="form-control"
                />
            </div>
            <div className="form-floating mb-3">
                <label htmlFor="item_type">Item type</label>
                <input
                    style={{ backgroundColor: "rgb(228, 230, 240)" }}
                    onChange={handleFormChange}
                    value={formData.item_type}
                    placeholder="item_type"
                    required
                    type="text"
                    name="item_type"
                    id="item_type"
                    className="form-control"
                />
            </div>
            <div className="form-floating mb-3">
                <label htmlFor="quantity">Quantity</label>
                <input
                    style={{ backgroundColor: "rgb(228, 230, 240)" }}
                    onChange={handleFormChange}
                    value={formData.quantity}
                    placeholder="quantity"
                    required
                    type="number"
                    name="quantity"
                    id="quantity"
                    className="form-control"
                />
            </div>
            <div className="form-floating mb-3">
                <label htmlFor="purchased_or_prepared">Purchased or Prepared</label>
                <input
                    style={{ backgroundColor: "rgb(228, 230, 240)" }}
                    onChange={handleFormChange}
                    value={formData.purchased_or_prepared}
                    placeholder="purchased_or_prepared"
                    required
                    type="datetime-local"
                    name="purchased_or_prepared"
                    id="purchased_or_prepared"
                    className="form-control"
                />
            </div>
            <div className="form-floating mb-3">
                <label htmlFor="time_of_post">Time of post</label>
                <input
                    style={{ backgroundColor: "rgb(228, 230, 240)" }}
                    onChange={handleFormChange}
                    value={formData.time_of_post}
                    placeholder="time_of_post"
                    required
                    type="datetime-local"
                    name="time_of_post"
                    id="time_of_post"
                    className="form-control"
                />
            </div>
            <div className="form-floating mb-3">
                <label htmlFor="expiration">Expiration</label>
                <input
                    style={{ backgroundColor: "rgb(228, 230, 240)" }}
                    onChange={handleFormChange}
                    value={formData.expiration}
                    placeholder="expiration"
                    required
                    type="datetime-local"
                    name="expiration"
                    id="expiration"
                    className="form-control"
                />
            </div>
            <div className="form-floating mb-3">
                <label htmlFor="location">Location</label>
                <input
                    style={{ backgroundColor: "rgb(228, 230, 240)" }}
                    onChange={handleFormChange}
                    value={formData.location}
                    placeholder="location"
                    required
                    type="number"
                    name="location"
                    id="location"
                    className="form-control"
                />
            </div>
            <div className="form-floating mb-3">
                <label htmlFor="dietary_restriction">Dietary restrictions</label>
                <input
                    style={{ backgroundColor: "rgb(228, 230, 240)" }}
                    onChange={handleFormChange}
                    value={formData.dietary_restriction}
                    placeholder="dietary_restriction"
                    required
                    type="text"
                    name="dietary_restriction"
                    id="dietary_restriction"
                    className="form-control"
                />
            </div>
            <div className="form-floating mb-3">
                <label htmlFor="description">Item Description</label>
                <input
                    style={{ backgroundColor: "rgb(228, 230, 240)" }}
                    onChange={handleFormChange}
                    value={formData.description}
                    placeholder="description"
                    required
                    type="text"
                    name="description"
                    id="description"
                    className="form-control"
                />
            </div>
            <div className="form-floating mb-3">
                <label htmlFor="pickup_instructions">Pick-up Instructions</label>
                <input
                    style={{ backgroundColor: "rgb(228, 230, 240)" }}
                    onChange={handleFormChange}
                    value={formData.pickup_instructions}
                    placeholder="pickup_instructions"
                    required
                    type="text"
                    name="pickup_instructions"
                    id="pickup_instructions"
                    className="form-control"
                />
            </div>
            <button className="btn btn-secondary">Create</button>
            </form>
        </div>
    </div>
    </div>
    );
}
export default ItemForm;
