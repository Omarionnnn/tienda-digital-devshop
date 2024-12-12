import React, { useEffect, useState } from "react";
import "../styles/MisCursos.css";
import cursos from "../data/cursos";
import { useNavigate } from "react-router-dom";

function MisCursos() {
  const [cursosComprados, setCursosComprados] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    //Simulación
    const idsComprados = JSON.parse(localStorage.getItem("cursosComprados")) || [];
    const cursosFiltrados = cursos.filter((curso) => idsComprados.includes(curso.id));
    setCursosComprados(cursosFiltrados);
  }, []);

  function accederCurso(cursoId) {
    const rutas = {
      1: "/cursoReact",
      2: "/cursoJava",
      3: "/cursoDiseño"
    };


    const ruta = rutas[cursoId];
    if (ruta) {
      navigate(ruta);
    } else {
      console.log("Curso no encontrado");
    }
  }

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
}

export default MisCursos;
