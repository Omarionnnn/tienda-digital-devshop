import React from "react";
import "../styles/Cursos.css";
import cursos from "../data/cursos";

function Cursos() {
  return (
    <div className="cursos-container">
      <h1>Nuestros Cursos</h1>
      <div className="cursos-grid">
        {cursos.map((curso) => (
          <div key={curso.id} className="curso-card">
            <h2>{curso.titulo}</h2>
            <p>{curso.descripcion}</p>
            <p className="precio">{curso.precio}</p>
            <button>Comprar</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Cursos;
