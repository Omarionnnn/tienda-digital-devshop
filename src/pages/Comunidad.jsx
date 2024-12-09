import React, { useEffect, useState } from "react";
import "../styles/Comunidad.css";
import axios from "axios";

function Comunidad() {

  const [comentario, setComentario] = useState('');
  const [comentarios, setComentarios] = useState([]);

  const user = JSON.parse(localStorage.getItem('user')); 
  const usuarioNombre = user ? user.name : "Anonimo"; 
  
  //para obtener los comentarios
  useEffect(() => {
    const fetchComentarios = async () => {
      try {
        const response = await axios.get('http://localhost:5000/comentarios');
        setComentarios(response.data);  
      } catch (error) {
        console.error("Error al obtener los comentarios: ", error);
        alert('Hubo un error al obtener los comentarios');
      }
    };

    fetchComentarios();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault(); 
    if (!comentario) {
      alert('El comentario no puede estar vacío');
      return;
    }

    const nuevoComentario = {
      usuario: usuarioNombre,
      mensaje: comentario,
    };

    try {
      await axios.post('http://localhost:5000/comentarios', nuevoComentario);
      setComentarios([...comentarios, nuevoComentario]); 
      setComentario('');

    } catch (error){
      console.error("Error al publicar el comentario: ", error);
      alert('Hubo un error al publicar tu comentario');
    }
  };

  return (
    <div className="comunidad-container">
      <h1>Únete a nuestra Comunidad</h1>
      <p>Comparte tus ideas, resuelve dudas y crece junto a otros estudiantes.</p>
      <form onSubmit={handleSubmit}>
        <textarea 
          value={comentario}
          onChange={(e) => setComentario(e.target.value)}
          placeholder="Escribe tu pregunta o comentario aquí">
        </textarea>
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
