import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AccountList from "./AccountList";
import React from "react";
import MainPage from "./Main";
import LoginForm from "./Login";
import Profile from "./Profile";
import SignUpForm from "./Signup";
import ItemForm from "./ItemForm";
import ListItems from "./ListItems";
// import { RequireToken } from "./Auth";

function App() {
  // console.log("HELLO WORLD");
  return (
    <Router>
      <div className="container">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/item/new" element={<ItemForm />} />
          <Route path="/item/list" element={<ListItems />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
{
  /* <Route path="Signup">
            <Route path="" element={<SignUpForm />} />
          </Route>
          <Route path="Login">
            <Route path="" element={<LoginForm />} />
          </Route>

          <Route path="/accounts" element={<AccountList />} />
          <Route path="/profile" element={<Profile />} /> */
}
