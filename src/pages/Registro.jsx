import React, { useState } from "react";
import { supabase } from "../../supabaseClient.js";
import "../styles/Registro.css";

function Registro() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegistro = async (e) => {
    e.preventDefault();

    try {
      // Crear usuario en Supabase Auth
      const { error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) {
        throw new Error("Error al registrarse: " + error.message);
      }

      alert("Usuario registrado con éxito.");
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="registro-container">
      <h1>Regístrate</h1>
      <form onSubmit={handleRegistro}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            placeholder="Tu email"
            required
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label>Contraseña:</label>
          <input
            type="password"
            placeholder="Tu contraseña"
            required
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">Crear Cuenta</button>
      </form>
      <p>
        ¿Ya tienes una cuenta? <a href="/login">Inicia sesión aquí</a>
      </p>
    </div>
  );
}

export default Registro;
