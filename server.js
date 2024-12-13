import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import Stripe from "stripe";
import { createClient } from "@supabase/supabase-js";

dotenv.config();

const app = express();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

// Middlewares
app.use(cors({ origin: "http://localhost:5173" })); // Permitir solicitudes desde el cliente
app.use(bodyParser.json());

// Rutas
app.post("/create-checkout-session", async (req, res) => {
  try {
    const { userId, cursoId } = req.body;
    console.log("Datos recibidos en el servidor:", { userId, cursoId });

    if (!userId || !cursoId) {
      return res.status(400).json({ error: "Faltan datos necesarios para procesar la compra." });
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: req.body.items.map((item) => ({
        price_data: {
          currency: "eur",
          product_data: {
            name: item.name,
          },
          unit_amount: item.price,
        },
        quantity: item.quantity,
      })),
      mode: "payment",
      success_url: "http://localhost:5173/success",
      cancel_url: "http://localhost:5173/cancel",
    });

    const { error } = await supabase.from("compras").insert({
      usuario_id: userId,
      curso_id: cursoId,
      fecha: new Date().toISOString(),
    });

    if (error) {
      console.error("Error al guardar la compra en Supabase:", error);
      return res.status(500).json({ error: "Error al guardar la compra en Supabase." });
    }

    res.json({ url: session.url });
  } catch (error) {
    console.error("Error creando la sesión de pago:", error);
    res.status(500).send("Error creando la sesión de pago");
  }
});

// Nueva ruta para verificar compras
app.get("/verify-purchase/:userId", async (req, res) => {
  const { userId } = req.params;
  try {
    if (!userId) {
      return res.status(400).json({ error: "Falta el ID del usuario." });
    }

    const { data, error } = await supabase
      .from("compras")
      .select("curso_id, fecha")
      .eq("usuario_id", userId);

    if (error) {
      console.error("Error al verificar las compras:", error);
      return res.status(500).json({ error: "Error al verificar las compras." });
    }

    res.json(data);
  } catch (error) {
    console.error("Error al verificar las compras:", error);
    res.status(500).send("Error al verificar las compras");
  }
});

// Iniciar el servidor
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Servidor ejecutándose en el puerto ${PORT}`));
