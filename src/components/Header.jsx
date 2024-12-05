import React, { useState, useEffect } from "react";
import {  useNavigate, Link } from "react-router-dom";
import "../styles/Header.css";


function Header() {

  const [user, setUser] = useState(null); 
  const navigate = useNavigate();  

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const user = JSON.parse(storedUser);
      console.log('Usuario cargado desde localStorage:', user); 
      setUser(user);  
    }
  }, []);

  const handleLogout = () => { 
    setUser(null);
    localStorage.removeItem('user');
    navigate('/login');  
  };

  return (
    <header className="main-header">
      <div className="logo">
        <h1>DEVSHOP</h1>
        {user ? (
          <span>Bienvenido, {user.name}</span>   
        ) : (
          <span>Bienvenido, invitado</span>  
        )}
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
          {user === null && <li>
            <Link to="/login">Login</Link>
          </li>}
          <li>
          <button className="cerrar-sesion" onClick={handleLogout}>Cerrar sesión</button>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
