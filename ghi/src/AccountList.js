import { useState, useEffect } from "react";
import React from "react";
function AccountList() {
  const [accounts, setAccount] = useState([]);

  useEffect(() => {
    const fetchURL = "http://localhost:8000/account";
    fetch(fetchURL)
      .then((response) => response.json())
      .then((data) => {
        console.log("Data", data);
        setAccount(data);
      });
  }, []);
  return (
    <>
      <div>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {accounts.map((i) => {
              return (
                <tr key={i.id}>
                  <td>{i.id}</td>
                  <td>{i.first_name}</td>
                  <td>{i.last_name}</td>
                  <td>{i.email}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}
export default AccountList;
