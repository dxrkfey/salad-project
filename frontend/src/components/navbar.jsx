import React from "react";
import { Link } from "react-router-dom";
import { ShoppingCart,ClockCounterClockwise , Storefront,SignOut} from "phosphor-react";
import "./navbar.css";

export const Navbar = () => {

  

  return (
    <div className="navbar">
      <div className="links">
        <Link to="/shop"> <Storefront size={32} /> </Link>
        <Link to="/history-customer"> <ClockCounterClockwise size={32}/> </Link>
        <Link to="/cart">
          <ShoppingCart size={32} />
        </Link>
        <Link to='/'> <SignOut size={32} /> </Link>
      </div>
    </div>
  );
};
