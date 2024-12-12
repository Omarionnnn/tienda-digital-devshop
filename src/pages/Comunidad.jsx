import React, { useEffect, useState } from "react";
import "../styles/Comunidad.css";

function Comunidad() {

  const [comentario, setComentario] = useState('');
  const [comentarios, setComentarios] = useState([]);
  const [respuesta, setRespuesta] = useState(''); 
  const [comentarioId, setComentarioId] = useState(null);

  const user = JSON.parse(localStorage.getItem('user')); 
  const usuarioNombre = user ? user.name : "Anonimo"; 
  
  //para obtener los comentarios
  useEffect(() => {
    const storedComentarios = JSON.parse(localStorage.getItem('comentarios')) || [];
    setComentarios(storedComentarios);
  }, []);

  const saveComentariosToLocalStorage = (comentarios) => {
    localStorage.setItem('comentarios', JSON.stringify(comentarios));
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); 
    if (!comentario) {
      alert('El comentario no puede estar vacío');
      return;
    }

    const nuevoComentario = {
      id: Date.now(),
      usuario: usuarioNombre,
      mensaje: comentario,
      respuestas: [] 
    };

    const updatedComentarios = [...comentarios, nuevoComentario];
    setComentarios(updatedComentarios);
    saveComentariosToLocalStorage(updatedComentarios); // Guardamos en localStorage
    setComentario('');
  };

   //Para manejar las respuestas
  const handleRespuestaSubmit = async (e) => {
    e.preventDefault();
    if (!respuesta) {
      alert('La respuesta no puede estar vacía');
      return;
    }

    const nuevoComentario = {
      usuario: usuarioNombre,
      mensaje: respuesta,
    };

    const updatedComentarios = comentarios.map(comentario =>
      comentario.id === comentarioId
        ? {...comentario, respuestas: [...comentario.respuestas, nuevoComentario]}
        : comentario
    );

    setComentarios(updatedComentarios);
    saveComentariosToLocalStorage(updatedComentarios); // Guardamos en localStorage
    setRespuesta('');
    setComentarioId(null);
  };

  return (
    <div className="comunidad-container">
      <h1>Únete a nuestra Comunidad</h1>
      <p>Comparte tus ideas, resuelve dudas y crece junto a otros estudiantes.</p>
      
      {/* Formulario para publicar un comentario */}
      <form onSubmit={handleSubmit}>
        <textarea 
          value={comentario}
          onChange={(e) => setComentario(e.target.value)}
          placeholder="Escribe tu comentario aquí">
        </textarea>
        <button type="submit">Publicar Comentario</button>
      </form>

      {/* Mostrar los comentarios y respuestas */}
      <ul className="comentarios">
        {comentarios.map((comentario) => (
          <li key={comentario.id} className="comentario">
            <strong>{comentario.usuario}:</strong> {comentario.mensaje}

            {/* Mostrar respuestas si existen */}
            <ul className="respuestas">
              {comentario.respuestas.map((respuesta, index) => (
                <li key={index} className="respuesta">
                  <strong>{respuesta.usuario}:</strong> {respuesta.mensaje}
                </li>
              ))}
            </ul>

            {/* Formulario para responder a un comentario */}
            <button onClick={() => setComentarioId(comentario.id)}>
              Responder
            </button>

            {comentarioId === comentario.id && (
              <form onSubmit={handleRespuestaSubmit}>
                <textarea
                  value={respuesta}
                  onChange={(e) => setRespuesta(e.target.value)}
                  placeholder="Escribe tu respuesta aquí">
                </textarea>
                <button type="submit">Publicar Respuesta</button>
              </form>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Comunidad;
