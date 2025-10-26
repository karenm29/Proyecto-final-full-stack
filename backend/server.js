import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./src/config/db.js";
import authRoutes from "./src/routes/auth.js";

dotenv.config();
const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Conexión a la base de datos
connectDB();

// Rutas
app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Servidor escuchando en http://localhost:${PORT}`));
