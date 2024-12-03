import React from "react";
import "../styles/Login.css";

function Login() {
  return (
    <div className="login-container">
      <h1>Iniciar Sesión</h1>
      <form>
        <div>
          <label>Email:</label>
          <input type="email" placeholder="Tu email" required />
        </div>
        <div>
          <label>Contraseña:</label>
          <input type="password" placeholder="Tu contraseña" required />
        </div>
        <button type="submit">Iniciar Sesión</button>
      </form>
      <p>¿No tienes cuenta? <a href="/registro">Regístrate aquí</a></p>
    </div>
  );
}

export default Login;
