import mongoose from "mongoose";

export const connectDB = async () => {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    console.warn("⚠️  MONGODB_URI no está configurada. Se omitirá la conexión a la base de datos en modo desarrollo.");
    return;
  }

  try {
    await mongoose.connect(uri);
    console.log("✅ Conexión exitosa a MongoDB");
  } catch (error) {
    console.error("❌ Error de conexión a MongoDB:", error.message);
    // No forzar salida: dejar que el servidor se inicie para desarrollo local,
    // pero avisar claramente.
  }
};
