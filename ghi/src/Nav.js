// import React, { useState } from "react";
// import { NavLink } from "react-router-dom";

// function Nav() {
// const [isNavOpen, setIsNavOpen] = useState(false);

// const toggleNav = () => {
//     setIsNavOpen(!isNavOpen);
// };

// const closeNav = () => {
//     setIsNavOpen(false);
// };

// return (
//     <div>
//         <nav className="navbar navbar-expand-lg navbar bg">
//             <div className="container">
//             <NavLink
//                 className="nav-link"
//                 aria-current="page"
//                 to="/"
//                 onClick={closeNav}
//             >
//                 Waste-less Bytes
//             </NavLink>
//             <button
//                 className={`navbar-toggler ${isNavOpen ? "" : "collapsed"}`}
//                 type="button"
//                 data-toggle="collapse"
//                 data-target="#navbarNav"
//                 aria-controls="navbarNav"
//                 aria-expanded={isNavOpen ? "true" : "false"}
//                 aria-label="Toggle navigation"
//                 onClick={toggleNav}
//             >
//                 <span className="navbar-toggler-icon"></span> Menu
//             </button>
//             <div
//                 className={`collapse navbar-collapse ${isNavOpen ? "show" : ""}`}
//                 id="navbarNav"
//             >
//                 <ul className="navbar-nav ml-auto">
//                 <li className="nav-item">
//                 <NavLink className="nav-link active" aria-current="page" to="items/new" onClick={closeNav}>
//             New item
//                 </NavLink>
//                 </li>
//                 <li className="nav-item">
//                 <NavLink className="nav-link" aria-current="page" to="items/list" onClick={closeNav}>
//             List Items
//                 </NavLink>
//                 </li>
//                 <li className="nav-item">
//                 <NavLink className="nav-link" aria-current="page" to="login" onClick={closeNav}>
//             Login
//                 </NavLink>
//                 </li>
//                 <li className="nav-item">
//                 <NavLink className="nav-link" aria-current="page" to="signup" onClick={closeNav}>
//             Signup
//                 </NavLink>
//                 </li>
//                 <li className="nav-item">
//                 <NavLink className="nav-link" aria-current="page" to="" onClick={closeNav} >
//             FAQ
//                 </NavLink>
//                 </li>
//                 </ul>
//             </div>
//             </div>
//         </nav>
//     </div>
//     );
// }

// export default Nav;


import React, { useState } from "react";
import { NavLink } from "react-router-dom";

function Nav() {
const [isNavOpen, setIsNavOpen] = useState(false);

const toggleNav = () => {
setIsNavOpen(!isNavOpen);
};

const closeNav = () => {
setIsNavOpen(false);
};

return (
<div>
    <nav className="navbar navbar-expand-md navbar fixed-top bg">
        <div className="container-fluid">
            <NavLink className="navbar-brand" aria-current="page" to="" onClick={closeNav}>
        Waste-less Bytes
            </NavLink>
            <button
                className={`navbar-toggler ${isNavOpen ? "" : "collapsed"}`}
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarCollapse"
                aria-controls="navbarCollapse"
                aria-expanded={isNavOpen ? "true" : "false"}
                aria-label="Toggle navigation"
                onClick={toggleNav}
            >
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className={`collapse navbar-collapse ${isNavOpen ? "show" : ""}`} id="navbarCollapse">
                <ul className="navbar-nav me-auto mb-2 mb-md-0">
                    <li className="nav-item">
                        <NavLink className="nav-link active" aria-current="page" to="items/new" onClick={closeNav}>
                    New item
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link" aria-current="page" to="items/list" onClick={closeNav}>
                    List Items
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link" aria-current="page" to="login" onClick={closeNav}>
                    Login
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link" aria-current="page" to="signup" onClick={closeNav}>
                    Signup
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link" aria-current="page" to="/faq" onClick={closeNav} >
                    FAQ
                        </NavLink>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
</div>
);
}

export default Nav;
