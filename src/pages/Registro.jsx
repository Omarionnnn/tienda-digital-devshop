import React, { useState, useEffect, useRef } from "react";
import "../styles/Registro.css";
import axios from "axios";


//iconos
import { faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Registro() {

  const userRef = useRef();
  const [userData, setUserData] = useState(null);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const [pwd, setPwd] = useState('');
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  const [matchPwd, setMatchPwd] = useState('');
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setValidMatch(pwd === matchPwd); 
  }, [pwd, matchPwd]); 

  useEffect (()=> {
    if (userRef.current) {
        userRef.current.focus();
    }
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    //Validación de campos
    if (!name|| !email || !pwd) {
      alert("Por favor, completa todos los campos.");
      return;
    }
      const userData = {
        name,
        email,
        password: pwd
      };

   
      try {
        const response = await axios.post('http://localhost:5000/registro', userData);
        console.log(response.data.message);
        window.location.href = "/login"; 
      } catch (error) {
        console.error("Error al registrar el usuario: ", error.message);
        alert(`Error: ${error.message}`);
      }
    setLoading(false);
  };

  return (
    <div className="registro-container">
      <h1>Regístrate</h1>
      <form onSubmit={handleSubmit}> 
        <div>
          <label>Nombre:</label>
          <input 
            type="text" 
            placeholder="Tu nombre" 
            required
            ref={userRef}
            onChange={(e) => setName(e.target.value)}          
          />
        </div>
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
          <label>
            Contraseña:
          </label>
          <input 
            type="password"
            placeholder="Tu contraseña"
            required
            id="password"
            onChange={(e) => setPwd(e.target.value)}
            aria-invalid={validMatch ? "false" : "true"}
            aria-describedby="pwdnote"
            onFocus={() => setPwdFocus(true)}
            onBlur={() => setPwdFocus(false)}
          />
        </div>
        <div>
        <label>
          Confirmar Contraseña:
          <span className={matchPwd && validMatch ? "valid" : "hide"}>
              <FontAwesomeIcon icon={faCheck} />
            </span>
            <span className={matchPwd && !validMatch ? "invalid" : "hide"}>
              <FontAwesomeIcon icon={faTimes} />
            </span>  
        </label>
          <input 
           type="password"
           placeholder="Repite tu contraseña"
           required
           onChange={(e) => setMatchPwd(e.target.value)}
           aria-invalid={validMatch ? "false" : "true"}
           aria-describedby="confirmnote"
           onFocus={() => setMatchFocus(true)}
           onBlur={() => setMatchFocus(false)}
           />
        </div>
        <button type="submit" disabled={!validMatch || loading}>
          {loading ? "Registrando..." : "Crear Cuenta"}
        </button>
      </form>
      <p>¿Ya tienes una cuenta? <a href="/login">Inicia sesión aquí</a></p>
    </div>
  );
}

export default Registro;
