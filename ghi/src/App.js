import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AccountList from "./AccountList";
import React from "react";
import MainPage from "./Main";
import Profile from "./Profile";
import SignUpForm from "./SignupForm";
import ItemForm from "./ItemForm";
import ListItems from "./ListItems";
import ItemDetail from "./ItemDetail";
import LoginForm from "./Login";
import LogoutForm from "./Logout";
import Nav from "./Nav";
import FAQPage from "./Faq";
import { AuthProvider } from "@galvanize-inc/jwtdown-for-react";

// import{ RequireToken } from "./Auth";

function App() {
  // console.log("HELLO WORLD");
  return (
    <AuthProvider>
      <Router>
        <Nav />
        <div className="container">
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/items/new" element={<ItemForm />} />
            <Route path="/items/list" element={<ListItems />} />
            <Route path="/items/:itemId" element={<ItemDetail />} />
            <Route path="signup">
              <Route path="" element={<SignUpForm />} />
            </Route>
            <Route path="login">
              <Route path="" element={<LoginForm />} />
            </Route>
            <Route path="logout">
              <Route path="" element={<LogoutForm />} />
            </Route>
            <Route path="/accounts" element={<AccountList />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/faq" element={<FAQPage />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
