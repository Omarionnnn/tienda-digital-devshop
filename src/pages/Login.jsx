import React, { useState } from "react";
import { supabase } from "../../supabaseClient.js";
import "../styles/Login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const syncUserToDatabase = async (user) => {
    if (!user) return;
  
    const { error } = await supabase
      .from("usuarios")
      .upsert(
        {
          id: user.id, // Primary key
          email: user.email,
          created_at: new Date().toISOString(),
        },
        { onConflict: ["id"] } // Resuelve conflictos usando el campo 'id'
      );
  
    if (error) {
      console.error("Error al sincronizar usuario con la base de datos:", error.message);
    }
  };  

  const handleLogin = async (e) => {
    e.preventDefault();
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      alert("Error al iniciar sesión: " + error.message);
    } else {
      alert("Sesión iniciada con éxito.");
      // Sincronizar usuario con la tabla usuarios
      await syncUserToDatabase(data.user);
      window.location.href = "/cursos";
    }
  };

  return (
    <div className="login-container">
      <h1>Iniciar Sesión</h1>
      <form onSubmit={handleLogin}>
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
        <button type="submit">Iniciar Sesión</button>
      </form>
      <p>
        ¿No tienes cuenta? <a href="/registro">Regístrate aquí</a>
      </p>
    </div>
  );
}

export default Login;
