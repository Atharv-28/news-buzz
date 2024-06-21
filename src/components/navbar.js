import React from "react";
import { Outlet, Link } from "react-router-dom";
import "../styles/nav.css";

const Navbar = () => {
  return (
    <div className="navbar">
      <nav className="navigation">
        <Link className="navbut" to="/">
          HomePage
        </Link>
        <Link className="navbut" to="/Technology">
          Technology
        </Link>
        <Link className="navbut" to="/Entertainment">
          Entertainment
        </Link>
        <Link className="navbut" to="/Business">
          Business
        </Link>
        <Link className="navbut" to="/Sports">
          Sports
        </Link>
        <Link className="navbut" to="/Science">
          Science
        </Link>
        <Link className="navbut" to="/Saved">
          Saved
        </Link>
      </nav>

      <Outlet />
    </div>
  );
};

export default Navbar;
