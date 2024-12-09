import React, { useEffect, useState } from "react";
import "../styles/MisCursos.css";
import cursos from "../data/cursos";

function MisCursos() {
  const [cursosComprados, setCursosComprados] = useState([]);

  useEffect(() => {
    //Simulación
    const idsComprados = JSON.parse(localStorage.getItem("cursosComprados")) || [];
    const cursosFiltrados = cursos.filter((curso) => idsComprados.includes(curso.id));
    setCursosComprados(cursosFiltrados);
  }, []);

  return (
    <div className="mis-cursos-container">
      <h1>Mis Cursos</h1>
      <div className="mis-cursos-grid">
        {cursosComprados.length > 0 ? (
          cursosComprados.map((curso) => (
            <div key={curso.id} className="mis-cursos-card">
              <h2>{curso.titulo}</h2>
              <p>{curso.descripcion}</p>
              <button onClick={() => accederCurso(curso.id)}>Acceder</button>
            </div>
          ))
        ) : (
          <p>No has comprado ningún curso aún.</p>
        )}
      </div>
    </div>
  );

  function accederCurso(cursoId) {
    alert(`Accediendo al contenido del curso con ID: ${cursoId}`);
  }
}

export default MisCursos;
