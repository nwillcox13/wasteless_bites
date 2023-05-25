import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
// import userId ?

export default function UserItemDetail() {
  const [item, setItem] = useState([]);
  const { itemId } = useParams();
  //  const userId =  this is where the imported user id will be
  //  this might also come through like const { userID } = useParams?

  const fetchData = async () => {
    const url = `http://localhost:8000/items?userId=${userId}/${itemId}`;
    const response = await fetch(url);
    console.log(url);
    if (response.ok) {
      const data = await response.json();
      setItem(data);
      console.log(item);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  console.log(item);

  return (
    <div className="container my-4">
      <div className="row">
        <div className="col-12">
          <h1 className="text-center mb-4">Your Item</h1>
          <table className="table table-dark table-striped table-bordered">
            <thead>
              <tr>
                <th>Item Name</th>
                <th>Item Type</th>
                <th>Quantity</th>
                <th>Purchased or Prepared</th>
                <th>Time of post</th>
                <th>Expiration</th>
                <th>Location</th>
                <th>Dietary restriction</th>
                <th>Description</th>
                <th>Pick-up instructions</th>
              </tr>
            </thead>
            <tbody>
              <tr key={item.id}>
                <td>{item.name}</td>
                <td>{item.item_type}</td>
                <td>{item.quantity}</td>
                <td>{item.purchased_or_prepared}</td>
                <td>{item.time_of_post}</td>
                <td>{item.expiration}</td>
                <td>{item.location}</td>
                <td>{item.dietary_restriction}</td>
                <td>{item.description}</td>
                <td>{item.pickup_instructions}</td> */
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}