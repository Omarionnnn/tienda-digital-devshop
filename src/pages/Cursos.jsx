import "../styles/Cursos.css";
import cursos from "../data/cursos";
import { supabase } from "../../supabaseClient.js";
import PropTypes from "prop-types";

const CheckoutButton = ({ items, cursoId }) => {
  const handleCheckout = async () => {
    try {
      const { data: user } = await supabase.auth.getUser();
      if (!user) {
        console.error("Usuario no autenticado");
        return;
      }

      // Datos enviados al servidor
      const bodyData = {
        items,
        userId: session.user.id,
        cursoId: String(cursoId),
      };

      console.log("Datos enviados al servidor:", bodyData);

      // Realizar la solicitud al servidor
      const response = await fetch("http://localhost:3001/create-checkout-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bodyData), // Corrección aquí
      });

      if (!response.ok) {
        throw new Error("Error en la solicitud de checkout.");
      }

      // Obtener la sesión de Stripe y redirigir
      const session = await response.json();
      window.location.href = session.url;
    } catch (error) {
      console.error("Error al procesar el checkout:", error);
    }
  };

  return <button onClick={handleCheckout}>Comprar</button>;
};

CheckoutButton.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      quantity: PropTypes.number.isRequired,
    })
  ).isRequired,
  cursoId: PropTypes.string.isRequired,
};

function Cursos() {
  return (
    <div className="cursos-container">
      <div className="cursos-grid">
        {cursos.map((curso) => (
          <div
            key={curso.id}
            className="curso-card"
            style={{
              backgroundImage: `url(${curso.imagen})`,
            }}
          >
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
              cursoId={String(curso.id)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Cursos;
