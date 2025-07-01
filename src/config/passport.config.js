import passport from "passport";
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import { Strategy as LocalStrategy } from "passport-local";
import jwt from "jsonwebtoken";
import UserModel from "../models/user.model.js";
import { createHash, validatePassword } from "../util.js";

const JWT_SECRET = "miClaveSecreta123";

// Login local
passport.use("login", new LocalStrategy(
    { usernameField: "email" },
    async (email, password, done) => {
      try {
        const user = await UserModel.findOne({ email });
        if (!user) return done(null, false, { message: "Usuario no encontrado" });
  
        const isValid = await validatePassword(password, user.password);
        if (!isValid) return done(null, false, { message: "Contraseña incorrecta" });
  
        return done(null, user);
      } catch (error) {
        return done(error);
      }
    }
  ));

// Serializar / deserializar usuario para la sesión
passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser(async (id, done) => {
  const user = await UserModel.findById(id);
  done(null, user);
});

// Estrategia JWT para proteger rutas
const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: JWT_SECRET
  };
  
  passport.use("jwt", new JwtStrategy(jwtOptions, async (payload, done) => {
    try {
      const user = await UserModel.findById(payload.id);
      if (!user) return done(null, false);
      return done(null, user);
    } catch (error) {
      return done(error, false);
    }
  }));

// Generador de token
  export const generateToken = (user) => {
    return jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, { expiresIn: "1h" });
  };




