import React from "react";
import "../styles/Navigation.css";
import { NavLink } from "react-router-dom";

const Navigation = () => {
  return (
    <div className="container-nav">
      <nav>
        <ul>
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          <li>
            <NavLink to="/films">Films</NavLink>
          </li>
          <li>
            <NavLink to="/series">Series</NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Navigation;
