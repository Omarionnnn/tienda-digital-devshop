import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Inicio from "./pages/Inicio";
import Cursos from "./pages/Cursos";
import Comunidad from "./pages/Comunidad";
import Login from "./pages/Login";
import Registro from "./pages/Registro";

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
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
