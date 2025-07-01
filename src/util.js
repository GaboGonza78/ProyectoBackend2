import bcrypt from "bcrypt";

// Crea un hash a partir de una contraseña (texto plano)
const createHash = async (password) => {
  const saltRounds = 10;
  const hash = await bcrypt.hash(password, saltRounds);
  return hash;
};

// Valida una contraseña comparando el texto plano con el hash guardado
const validatePassword = async (password, hashedPassword) => {
  const match = await bcrypt.compare(password, hashedPassword);
  return match;
};

export { createHash, validatePassword };




