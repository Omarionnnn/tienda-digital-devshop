import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import Stripe from "stripe";
import { createClient } from "@supabase/supabase-js";

dotenv.config();

const app = express();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

// Middleware para verificar autenticación
const verifyAuth = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    console.error("Token no proporcionado");
    return res.status(401).json({ error: "Token no proporcionado" });
  }

  const { data: {user}, error } = await supabase.auth.getUser(token);
  if (error || !user) {
    console.error("Error al verificar autenticación:", error);
    return res.status(401).json({ error: "Autenticación fallida" });
  }

  req.user = user;
  console.log("Usuario autenticado:", req.user);
  next();
};

// Middlewares globales
app.use(cors({ origin: "http://localhost:5173" }));

// Excluir `/webhook` del middleware `express.json()`
app.use((req, res, next) => {
  if (req.originalUrl === "/webhook") {
    next(); // No procesar el cuerpo aquí
  } else {
    express.json()(req, res, next);
  }
});

// Crear sesión de Stripe
app.post("/create-checkout-session", verifyAuth, async (req, res) => {
  console.log("req.user:", req.user);
  try {
    const { cursoId, items } = req.body;

    if (!req.user || !cursoId || !items) {
      console.error("Datos faltantes:", { userId: req.user?.id, cursoId, items });
      return res.status(400).json({ error: "Faltan datos necesarios para procesar la compra." });
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: items.map((item) => ({
        price_data: {
          currency: "eur",
          product_data: { name: item.name },
          unit_amount: item.price,
        },
        quantity: item.quantity,
      })),
      mode: "payment",
      success_url: "http://localhost:5173/success",
      cancel_url: "http://localhost:5173/cancel",
      metadata: {
        userId: req.user.id,
        cursoId,
      },
    });

    console.log("Sesión de Stripe creada:", session.id);
    res.json({ url: session.url });
  } catch (error) {
    console.error("Error al crear la sesión de Stripe:", error);
    res.status(500).json({ error: "Error al crear la sesión de pago." });
  }
});

// Webhook de Stripe
app.post("/webhook", express.raw({ type: "application/json" }), async (req, res) => {
  const sig = req.headers["stripe-signature"];
  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
    console.log("Webhook recibido:", event.type);
  } catch (err) {
    console.error("Error en la firma del webhook:", err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    const userId = session.metadata.userId;
    const cursoId = session.metadata.cursoId;

    console.log("Insertando en Supabase:", { userId, cursoId });

    const { error } = await supabase.from("compras").insert({
      usuario_id: userId,
      curso_id: cursoId,
      fecha: new Date().toISOString(),
    });

    if (error) {
      console.error("Error al insertar en Supabase:", error.message);
      return res.status(500).send("Error al insertar en la base de datos.");
    }

    console.log("Inserción exitosa en Supabase.");
  }

  res.status(200).send("Webhook procesado con éxito.");
});

// Iniciar el servidor
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Servidor ejecutándose en el puerto ${PORT}`));
