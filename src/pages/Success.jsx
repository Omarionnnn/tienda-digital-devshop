import React from "react";
import "../styles/Success.css";

function Success() {
  return (
    <div className="success-container">
      <h1>¡Pago realizado con éxito!</h1>
      <p>Gracias por tu compra. Ahora tienes acceso a tus cursos.</p>
      <a href="/mis-cursos" className="button">Ir a Mis Cursos</a>
    </div>
  );
}

export default Success;
