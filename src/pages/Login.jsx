import React, { useState }  from "react";
import "../styles/Login.css";
import axios from "axios";

function Login() {

  const [email, setEmail] = useState('');
  const [pwd, setPwd] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !pwd) {
      alert('Todos los campos son obligatorios.');
      return;
    }

    const userData = {
      email,
      password: pwd,
    };

    try {
      const response = await axios.post('http://localhost:5000/login', userData);
      
      console.log('Respuesta del backend:', response.data);  
      
      localStorage.setItem('user', JSON.stringify(response.data));

      console.log(response.data.message);

      window.location.href = "/comunidad";

    } catch (error) {
      console.error("Error al hacer login: ", error.response ? error.response.data.message : error.message);

      alert(`Error: ${error.response ? error.response.data.message : error.message}`);
    }
  };


  return (
    <div className="login-container">
      <h1>Iniciar Sesión</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input 
            type="email" 
            placeholder="Tu email" 
            required 
            value={email}
            onChange={(e) => setEmail(e.target.value)} 
            />
        </div>
        <div>
          <label>Contraseña:</label>
          <input 
            type="password" 
            placeholder="Tu contraseña" 
            required
            value={pwd}
            onChange={(e) => setPwd(e.target.value)}
            />
        </div>
        <button type="submit">Iniciar Sesión</button>
      </form>
      <p>¿No tienes cuenta? <a href="/registro">Regístrate aquí</a></p>
    </div>
  );
}

export default Login;
