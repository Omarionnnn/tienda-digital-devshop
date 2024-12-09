import React from "react";
import "../styles/Cursos.css";
import cursos from "../data/cursos";

const CheckoutButton = ({ items, cursoId }) => {
  const handleCheckout = async () => {
    try {
      const response = await fetch("http://localhost:3001/create-checkout-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ items }),
      });

      if (!response.ok) {
        throw new Error("Error en la solicitud de checkout.");
      }

      const session = await response.json();

      // Reemplazar
      guardarCursoComprado(cursoId);

      // Stripe
      window.location.href = session.url;
    } catch (error) {
      console.error("Error al procesar el checkout:", error);
    }
  };

  // Reemplazar
  const guardarCursoComprado = (cursoId) => {
    const cursosComprados = JSON.parse(localStorage.getItem("cursosComprados")) || [];
    if (!cursosComprados.includes(cursoId)) {
      localStorage.setItem("cursosComprados", JSON.stringify([...cursosComprados, cursoId]));
    }
  };

  return <button onClick={handleCheckout}>Comprar</button>;
};

function Cursos() {
  return (
    <div className="cursos-container">
      <div className="cursos-grid">
        {cursos.map((curso) => (
          <div key={curso.id} className="curso-card" style={{
            backgroundImage: `url(${curso.imagen})`}}>
            <h2>{curso.titulo}</h2>
            <p>{curso.descripcion}</p>
            <p className="precio">{curso.precio}</p>
            <CheckoutButton
              items={[
                {
                  name: curso.titulo,
                  price: Number(curso.precio.replace("€", "").replace(".", "")),
                  quantity: 1,
                },
              ]}
              cursoId={curso.id}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Cursos;
