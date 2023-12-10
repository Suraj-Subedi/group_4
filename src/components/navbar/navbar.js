import React from "react";
import "./navbar.css";
import {FaCartShopping} from "react-icons/fa6";
import {MdLogout} from "react-icons/md";
function Navbar(name) {
  console.log(name);
  return (
    <div className="navHead bg-primary">
      <p className="logo"> Mero Dokan</p>
      <div className="catHead">
        <span className="cat">Men</span>
        <span className="cat">Woman</span>
        <span className="cat">Kids</span>
      </div>
      <div className="iconHead">
        <FaCartShopping size={22} />
        <MdLogout
          size={22}
          onClick={() => {
            localStorage.removeItem("token");
            window.location.href = "/login";
          }}
        />
      </div>
    </div>
  );
}

export default Navbar;
