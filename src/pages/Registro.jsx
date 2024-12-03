import React from "react";
import "../styles/Registro.css";

function Registro() {
  return (
    <div className="registro-container">
      <h1>Regístrate</h1>
      <form>
        <div>
          <label>Nombre:</label>
          <input type="text" placeholder="Tu nombre" required />
        </div>
        <div>
          <label>Email:</label>
          <input type="email" placeholder="Tu email" required />
        </div>
        <div>
          <label>Contraseña:</label>
          <input type="password" placeholder="Tu contraseña" required />
        </div>
        <div>
          <label>Confirmar Contraseña:</label>
          <input type="password" placeholder="Repite tu contraseña" required />
        </div>
        <button type="submit">Crear Cuenta</button>
      </form>
      <p>¿Ya tienes una cuenta? <a href="/login">Inicia sesión aquí</a></p>
    </div>
  );
}

export default Registro;
