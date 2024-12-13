import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../../supabaseClient";
import "../styles/Header.css";

function Header() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Obtener el usuario actual al cargar
    const fetchUser = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      setUser(session?.user || null);
    };

    fetchUser();

    // Escuchar cambios en la autenticación
    const { data: authListener } = supabase.auth.onAuthStateChange((_, session) => {
      setUser(session?.user || null);
    });

    // Limpiar el listener al desmontar el componente
    return () => {
      if (authListener) authListener.subscription.unsubscribe();
    };
  }, []);

  const handleLogout = async (e) => {
    e.preventDefault(); // Evitar que el Link recargue la página
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error("Error al cerrar sesión:", error.message);
    } else {
      setUser(null);
      window.location.href = "/"; // Redirigir al inicio después de cerrar sesión
    }
  };

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
          {user && (
            <li>
              <Link to="/mis-cursos">Mis Cursos</Link>
            </li>
          )}
          <li>
            <Link to="/cursos">Cursos</Link>
          </li>
          <li>
            <Link to="/comunidad">Comunidad</Link>
          </li>
          {user ? (
            <li>
              <Link to="/" onClick={handleLogout}>
                Cerrar sesión
              </Link>
            </li>
          ) : (
            <li>
              <Link to="/login">Iniciar sesión</Link>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
}

export default Header;
