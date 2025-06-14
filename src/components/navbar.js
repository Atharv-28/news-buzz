import React from "react";
import { Outlet, Link } from "react-router-dom";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import BiotechIcon from '@mui/icons-material/Biotech';
import MovieIcon from '@mui/icons-material/Movie';
import BusinessIcon from '@mui/icons-material/Business';
import CodeIcon from '@mui/icons-material/Code';
import HomeIcon from '@mui/icons-material/Home';
import SportsBaseballIcon from '@mui/icons-material/SportsBaseball';
import "../styles/nav.css";

const Navbar = () => {
  return (
    <div className="navbar">
      <nav className="navigation">
        <Link className="navbut" to="/">
          <HomeIcon fontSize="small" className="home-icon" />
          HomePage
        </Link>
        <Link className="navbut" to="/Technology">
          <CodeIcon fontSize="small" className="tech-icon" />
          Technology
        </Link>
        <Link className="navbut" to="/Entertainment">
          <MovieIcon fontSize="small" className="entertainment-icon" />
          Entertainment
        </Link>
        <Link className="navbut" to="/Business">
          <BusinessIcon fontSize="small" className="business-icon" />
          Business
        </Link>
        <Link className="navbut" to="/Sports">
          <SportsBaseballIcon fontSize="small" className="sports-icon" />
          Sports
        </Link>
        <Link className="navbut" to="/Science">
          <BiotechIcon fontSize="small" className="science-icon" />
          Science
        </Link>
        <Link className="navbut" to="/saved">
          <BookmarkIcon fontSize="small" className="bookmark-icon" />
          Saved
        </Link>
      </nav>

      <Outlet />
    </div>
  );
};

export default Navbar;
