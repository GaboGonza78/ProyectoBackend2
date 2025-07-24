import express from 'express';
import mongoose from 'mongoose';
import userRouter from "./routes/users.router.js";
import productRouter from './routes/product.router.js';
import session from "express-session";
import passport from "passport";
import "./config/passport.config.js"; // importante importar
import sessionsRouter from "./routes/sessions.router.js";


const app = express();

// Iniciamos la conexión con MongoDB
const uri = 'mongodb://127.0.0.1:27017/class-zero';
mongoose.connect(uri);

// Middlewares incorporados de Express
app.use(express.json()); // Formatea los cuerpos json de peticiones entrantes.
app.use(express.urlencoded({extended: true})); // Formatea query params de URLs para peticiones entrantes.
app.use(session({
    secret: "tuSecretoSuperSeguro",
    resave: false,
    saveUninitialized: false
  }));
  
  app.use(passport.initialize());
  app.use(passport.session());
  
app.use('/api/users', userRouter);
app.use('/api/products', productRouter);


const PORT = 8080;
app.listen(PORT, () => {
    console.log(`Start Server in Port ${PORT}`);
});

app.use("/api/sessions", sessionsRouter);




