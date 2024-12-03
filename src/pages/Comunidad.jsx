import React from "react";
import "../styles/Comunidad.css";

function Comunidad() {
  const comentarios = [
    { id: 1, usuario: "Alumno anónimo", mensaje: "xxx" },
    { id: 2, usuario: "Alumno anónimo", mensaje: "xxx" },
  ];

  return (
    <div className="comunidad-container">
      <h1>Únete a nuestra Comunidad</h1>
      <p>Comparte tus ideas, resuelve dudas y crece junto a otros estudiantes.</p>
      <form>
        <textarea placeholder="Escribe tu pregunta o comentario aquí"></textarea>
        <button type="submit">Publicar</button>
      </form>
      <ul className="comentarios">
        {comentarios.map((comentario) => (
          <li key={comentario.id}>
            <strong>{comentario.usuario}:</strong> {comentario.mensaje}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Comunidad;
