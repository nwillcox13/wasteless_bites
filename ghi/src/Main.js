import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";

function MainPage() {
    // const navigate = useNavigate()
    return (
        <div>
            Give me your food
            <button className="btn btn-secondary">
                <NavLink className="nav-link" aria-current="page" to="item/new">New item</NavLink>
            </button>
        </div>
    );
}
export default MainPage;
