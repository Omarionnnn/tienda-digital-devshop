import React from "react";
import { Link } from "react-router-dom";
import "../styles/Header.css";

function Header() {
  return (
    <header className="main-header">
      <div className="logo">
        <h1>DEVSHOP</h1>
      </div>
      <nav>
        <ul className="nav-links">
          <li>
            <Link to="/">Inicio</Link>
          </li>
          <li>
            <Link to="/cursos">Cursos</Link>
          </li>
          <li>
            <Link to="/comunidad">Comunidad</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
