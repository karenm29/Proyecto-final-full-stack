import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  try {
    const { nombre, correo, contraseña } = req.body;
    const existe = await User.findOne({ correo });
    if (existe) return res.status(400).json({ mensaje: "El correo ya está registrado" });

    const hash = await bcrypt.hash(contraseña, 10);
    const nuevoUsuario = new User({ nombre, correo, contraseña: hash });
    await nuevoUsuario.save();

    res.status(201).json({ mensaje: "Usuario registrado exitosamente" });
  } catch (error) {
    res.status(500).json({ mensaje: "Error en el servidor", error });
  }
};

export const login = async (req, res) => {
  try {
    const { correo, contraseña } = req.body;
    const usuario = await User.findOne({ correo });
    if (!usuario) return res.status(404).json({ mensaje: "Usuario no encontrado" });

    const valido = await bcrypt.compare(contraseña, usuario.contraseña);
    if (!valido) return res.status(400).json({ mensaje: "Contraseña incorrecta" });

    const token = jwt.sign({ id: usuario._id, correo: usuario.correo }, process.env.JWT_SECRET, { expiresIn: "1h" });
    res.json({ mensaje: "Inicio de sesión exitoso", token });
  } catch (error) {
    res.status(500).json({ mensaje: "Error en el servidor", error });
  }
};
