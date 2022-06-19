import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { SmartAuth } from "../util/SmartAuth";
import "./NavBar.css";
import logo from "../media/logo.svg";
import hamburger from "../media/hamburger.svg";
import cross from "../media/cross.svg";

export default function NavBar(props) {

  const [click, setClick] = useState(false);
  const handleClick = () => setClick(!click);
  const { isLoggedIn } = props;

  return (
    <nav className="navbar">
      <div className="nav-container">
        <NavLink to="/" className="nav-logo">
          <img src={logo} alt="Bürgerbüro Logo" />
          Bürgerbüro
        </NavLink>

        <ul className={click ? "nav-menu active" : "nav-menu"}>
          <li className="nav-item">
            <NavLink to="/melden" activeclassname="active" className="nav-links" onClick={handleClick} >Melden</NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/account" activeclassname="active" className="nav-links" onClick={handleClick} >Meine Daten</NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/genehmigungen" activeclassname="active" className="nav-links" onClick={handleClick} >Genehmigungen</NavLink>
          </li>
          {isLoggedIn && (
            <li className="nav-item">
              <a href="/" className="nav-links" onClick={SmartAuth.logout}>Abmelden</a>
            </li>
          )}
        </ul>
        <div className="nav-icon" onClick={handleClick}>
          <img src={click ? cross : hamburger} alt="Menu Icon" height={35} width={35} />
        </div>
      </div>
    </nav>
  );
}

