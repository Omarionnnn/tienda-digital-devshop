import "../styles/Cursos.css";
import cursos from "../data/cursos";
import { supabase } from "../../supabaseClient.js";
import PropTypes from "prop-types";

const CheckoutButton = ({ items, cursoId }) => {
  const handleCheckout = async () => {
    try {
      const { data: { user }, error } = await supabase.auth.getUser();
      if (error || !user) {
        console.error("Error al obtener el usuario o usuario no autenticado:", error);
        return;
      }

      const { data: session } = await supabase.auth.getSession();
      const token = session?.session?.access_token;

      if (!token) {
        console.error("Error: No se pudo obtener el token de sesión.");
        return;
      }

      const bodyData = {
        items,
        userId: user.id,
        cursoId: String(cursoId),
      };

      console.log("Datos enviados al servidor desde cliente:", bodyData);

      const response = await fetch("http://localhost:3001/create-checkout-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(bodyData),
      });

      if (!response.ok) {
        throw new Error("Error en la solicitud de checkout.");
      }

      const stripeSession = await response.json();
      window.location.href = stripeSession.url;
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
