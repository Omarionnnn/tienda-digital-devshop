import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { supabase } from "../supabaseClient.js";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Inicio from "./pages/Inicio";
import Cursos from "./pages/Cursos";
import Comunidad from "./pages/Comunidad";
import Login from "./pages/Login";
import Registro from "./pages/Registro";
import MisCursos from "./pages/MisCursos";
import Success from "./pages/Success";
import Cancel from "./pages/Cancel";

window.supabase = supabase;

function App() {
  const [user, setUser] = useState(null);

  const syncUserToDatabase = async (user) => {
    if (!user) return;

    try {
      const { data: existingUser, error: fetchError } = await supabase
        .from("usuarios")
        .select("id")
        .eq("id", user.id)
        .single();

      if (fetchError && fetchError.code !== "PGRST116") {
        console.error("Error al verificar usuario existente:", fetchError.message);
        return;
      }

      if (!existingUser) {
        const { error: insertError } = await supabase
          .from("usuarios")
          .insert({
            id: user.id,
            email: user.email,
            created_at: new Date().toISOString(),
          });

        if (insertError) {
          console.error("Error al insertar usuario en la base de datos:", insertError.message);
        }
      }
    } catch (error) {
      console.error("Error al sincronizar usuario con la base de datos:", error.message);
    }
  };

  useEffect(() => {
    const getUserSession = async () => {
      const { data: { session }, error } = await supabase.auth.getSession();
      if (error) {
        console.error("Error al obtener la sesión del usuario:", error.message);
      } else {
        setUser(session?.user || null);
        await syncUserToDatabase(session?.user);
      }
    };

    getUserSession();

    const checkSession = async () => {
      const { data: session, error } = await supabase.auth.getSession();
      if (error) {
        console.error("Error al obtener la sesión:", error);
      } else {
        console.log("Sesión actual:", session);
      }
    };
  
    checkSession();
    
    const { data: subscription } = supabase.auth.onAuthStateChange(async (_event, session) => {
      setUser(session?.user || null);
      await syncUserToDatabase(session?.user);
    });

    return () => {
      subscription?.unsubscribe?.();
    };
  }, []);

  return (
    <Router>
      <div className="page-container">
        <Header user={user} />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Inicio />} />
            <Route path="/mis-cursos" element={<MisCursos />} />
            <Route path="/cursos" element={<Cursos />} />
            <Route path="/comunidad" element={<Comunidad />} />
            <Route path="/login" element={<Login />} />
            <Route path="/registro" element={<Registro />} />
            <Route path="/success" element={<Success />} />
            <Route path="/cancel" element={<Cancel />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
