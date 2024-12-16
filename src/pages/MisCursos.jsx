import React, { useEffect, useState } from "react";
import { supabase } from "../../supabaseClient.js";
import "../styles/MisCursos.css";

function MisCursos() {
  const [cursosComprados, setCursosComprados] = useState([]);

  useEffect(() => {
    const fetchCursos = async () => {
      const { data: user, error: userError } = await supabase.auth.getUser();
      if (userError) {
        console.error("Error al obtener el usuario:", userError);
        return;
      }
      if (!user || !user.id) {
        console.error("No se encontró un usuario autenticado");
        return;
      }
  
      const { data, error } = await supabase
        .from("compras")
        .select("curso_id, cursos(id, título, descripción)")
        .eq("usuario_id", user.id);
  
      if (error) {
        console.error("Error al cargar los cursos comprados:", error);
      } else {
        setCursosComprados(data || []);
      }
    };
  
    fetchCursos();
  }, []);    

  return (
    <div className="mis-cursos-container">
      <h1>Mis Cursos</h1>
      <div className="mis-cursos-grid">
        {cursosComprados.length > 0 ? (
          cursosComprados.map(({ curso_id, cursos }) => (
            <div key={curso_id} className="mis-cursos-card">
              <h2>{cursos.titulo}</h2>
              <p>{cursos.descripcion}</p>
            </div>
          ))
        ) : (
          <p>No has comprado ningún curso aún.</p>
        )}
      </div>
    </div>
  );
}

export default MisCursos;
