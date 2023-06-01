import React, { useState, useEffect } from "react";

export default function MainPage() {
  const [items, setItems] = useState([
    {
      id: 1,
      name: "Organic Apples",
      item_type: "Fruit",
      quantity: 5,
      purchased_or_prepared: "Purchased",
      time_of_post: "2023-05-30 10:00 AM",
      expiration: "2023-06-05",
      location: "Supermarket",
      dietary_restriction: ["Gluten-free", "Vegan"],
      description: "Fresh and juicy organic apples",
      pickup_instructions: "Please bring your own bag",
    },
    {
      id: 2,
      name: "Homemade Chocolate Chip Cookies",
      item_type: "Bakery",
      quantity: 12,
      purchased_or_prepared: "Prepared",
      time_of_post: "2023-05-30 12:30 PM",
      expiration: "2023-06-01",
      location: "Home",
      dietary_restriction: ["Vegetarian"],
      description: "Delicious homemade chocolate chip cookies",
      pickup_instructions: "Handle with care",
    },
    {
      id: 3,
      name: "Grass-fed Ground Beef",
      item_type: "Meat",
      quantity: 2,
      purchased_or_prepared: "Purchased",
      time_of_post: "2023-05-30 2:45 PM",
      expiration: "2023-06-03",
      location: "Butcher Shop",
      dietary_restriction: ["Paleo"],
      description: "Premium quality grass-fed ground beef",
      pickup_instructions: "Keep refrigerated",
    },
    {
      id: 4,
      name: "Organic Kale",
      item_type: "Vegetable",
      quantity: 1,
      purchased_or_prepared: "Purchased",
      time_of_post: "2023-05-30 4:20 PM",
      expiration: "2023-06-02",
      location: "Farmers Market",
      dietary_restriction: ["Gluten-free", "Vegan"],
      description: "Fresh and nutritious organic kale",
      pickup_instructions: "Handle with gloves",
    },
    {
      id: 5,
      name: "Artisanal Sourdough Bread",
      item_type: "Bakery",
      quantity: 1,
      purchased_or_prepared: "Purchased",
      time_of_post: "2023-05-30 6:15 PM",
      expiration: "2023-06-04",
      location: "Artisan Bakery",
      dietary_restriction: ["Vegetarian"],
      description: "Handcrafted sourdough bread with a crispy crust",
      pickup_instructions: "Best when consumed within 2 days",
    },
    {
      id: 6,
      name: "Fresh Salmon Fillets",
      item_type: "Seafood",
      quantity: 3,
      purchased_or_prepared: "Purchased",
      time_of_post: "2023-05-30 8:00 PM",
      expiration: "2023-06-01",
      location: "Fish Market",
      dietary_restriction: [],
      description: "Premium quality fresh salmon fillets",
      pickup_instructions: "Keep refrigerated",
    },
    {
      id: 7,
      name: "Gluten-free Pasta",
      item_type: "Pasta",
      quantity: 2,
      purchased_or_prepared: "Purchased",
      time_of_post: "2023-05-30 9:30 PM",
      expiration: "2023-06-05",
      location: "Supermarket",
      dietary_restriction: ["Gluten-free"],
      description: "Delicious gluten-free pasta for a healthy meal",
      pickup_instructions: "Cook according to package instructions",
    },
    {
      id: 8,
      name: "Organic Blueberries",
      item_type: "Fruit",
      quantity: 1,
      purchased_or_prepared: "Purchased",
      time_of_post: "2023-05-30 11:45 PM",
      expiration: "2023-06-03",
      location: "Farmers Market",
      dietary_restriction: ["Vegan"],
      description: "Sweet and juicy organic blueberries",
      pickup_instructions: "Handle with care",
    },
    {
      id: 9,
      name: "Free-range Eggs",
      item_type: "Dairy",
      quantity: 6,
      purchased_or_prepared: "Purchased",
      time_of_post: "2023-05-31 9:00 AM",
      expiration: "2023-06-06",
      location: "Local Farm",
      dietary_restriction: [],
      description: "Fresh free-range eggs from happy hens",
      pickup_instructions: "Keep refrigerated",
    },
    {
      id: 10,
      name: "Quinoa Salad",
      item_type: "Salad",
      quantity: 1,
      purchased_or_prepared: "Prepared",
      time_of_post: "2023-05-31 11:30 AM",
      expiration: "2023-06-01",
      location: "Catering Company",
      dietary_restriction: ["Vegetarian", "Gluten-free", "Vegan"],
      description: "Healthy quinoa salad with fresh vegetables",
      pickup_instructions: "Serve chilled",
    },
  ]);

  return (
  <div className="container-fluid justify-content-center align-items-center">
    <h1 className="text-center my-4">Food Near You!</h1>
    <div className="table-responsive">
      <table className="table table-hover table-striped-columns table-bordered">
        <thead>
          <tr>
            <th>Item Name</th>
            <th>Item Type</th>
            <th>Quantity</th>
            <th>Purchased or Prepared on</th>
            <th>Expiration</th>
            <th>Location</th>
            <th>Dietary Restrictions</th>
            <th>Description</th>
            <th>Pickup Instructions</th>
          </tr>
        </thead>
        <tbody className="table-group-divider">
          {items.map((item) => (
            <tr key={item.id}>
              <td>{item.name}</td>
              <td>{item.item_type}</td>
              <td>{item.quantity}</td>
              <td>{item.purchased_or_prepared}</td>
              <td>{item.expiration}</td>
              <td>{item.location}</td>
              <td>
                {item.dietary_restriction.join(", ") ||
                  "No dietary restrictions"}
              </td>
              <td>{item.description}</td>
              <td>{item.pickup_instructions}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);
}
