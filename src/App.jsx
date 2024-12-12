import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
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
import CursoReact from "./pages/cursos/CursoReact";
import CursoJava from "./pages/cursos/CursoJava";
import CursoDiseño from "./pages/cursos/CursoDiseño";

function App() {
  return (
    <Router>
      <div className="page-container">
        <Header />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Inicio />} />
            <Route path="/cursos" element={<Cursos />} />
            <Route path="/comunidad" element={<Comunidad />} />
            <Route path="/login" element={<Login />} />
            <Route path="/registro" element={<Registro />} />
            <Route path="/mis-cursos" element={<MisCursos />} />
            <Route path="/success" element={<Success />} />
            <Route path="/cancel" element={<Cancel />} />
            <Route path="/cursoReact" element={<CursoReact />} />
            <Route path="/cursoJava" element={<CursoJava />} />
            <Route path="/cursoDiseño" element={<CursoDiseño />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
