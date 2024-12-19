import { useEffect, useState } from "react";
import { supabase } from "../../supabaseClient.js";
import "../styles/MisCursos.css";

function MisCursos() {
  const [cursosComprados, setCursosComprados] = useState([]);
  const [loading, setLoading] = useState(true); // Estado de carga

 // useEffect(() => {
    const fetchCursos = async () => {
      console.log("Iniciando fetch de cursos...");
      // try {
        // Obtener la sesión actual del usuario
        // const { data: { session }, error: sessionError } = await supabase.auth.getSession();
        // console.log(session);
        // if (sessionError) {
        //   console.error("Error al obtener la sesión:", sessionError.message);
        //   setLoading(false);
        //   return;
        // }

        // if (!session || !session.user) {
        //   console.error("No se encontró una sesión activa ni un usuario autenticado.");
        //   setLoading(false);
        //   return;
        // }

        // const user = session.user;
        // console.log("Usuario autenticado:", user); // Depuración

        // Consulta a la base de datos para obtener los cursos comprados
        const { data, error } = await supabase
          .from("compras")
          .select()
          .eq("usuario_id", "21f54c95-bf9f-4244-aa1b-ed29834a904c");
          console.log(data);

        if (error) {
          console.error("Error al cargar los cursos comprados:", error.message);
        } else {
          console.log("Cursos obtenidos:", data); // Depuración
          setCursosComprados(data || []);
          setLoading(false);
        } 
      // } catch (error) {
      //   console.error("Error inesperado al obtener los cursos:", error.message);
      // }
    };

    fetchCursos();
 // }, []);

  if (loading) {
    console.log("Cargando cursos...");
    return <button onClick={() => {fetchCursos()} }>Cursos</button>;
  }

  return (
    <div className="mis-cursos-container">
      <h1>Mis Cursos</h1>
      <div className="mis-cursos-grid">
        {cursosComprados.length > 0 ? (
          cursosComprados.map(({ curso_id, cursos }) => (
            <div key={curso_id} className="mis-cursos-card">
              <h2>{cursos.título}</h2>
              <p>{cursos.descripción}</p>
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
