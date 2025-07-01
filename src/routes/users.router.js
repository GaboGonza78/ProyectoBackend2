import {Router} from 'express';
import passport from "passport";
import { generateToken } from "../config/passport.config.js";
import userModel from '../models/user.model.js';
import { createHash } from "../util.js";

const router = Router();



// Consultar todos los usuarios
router.get('/', async (req, res) => {

    try {
        const result = await userModel.find();
        res.send({
            status: 'success',
            payload: result
        });
    } catch (error) {
        res.status(500).send({
            status: 'error',
            message: error.message
        });
    }
});

router.get("/success", (req, res) => res.send("Registro/Login exitoso!"));
router.get("/fail-register", (req, res) => res.send("Falló el registro"));
router.get("/fail-login", (req, res) => res.send("Falló el login"));
router.get("/profile", (req, res) => {
  if (!req.user) return res.send("No autenticado");
  res.send(`Bienvenido ${req.user.email}`);
});

// Ruta protegida con JWT
router.get("/profile", passport.authenticate("jwt", { session: false }), (req, res) => {
    res.send({ message: `Bienvenido, ${req.user.email}`, user: req.user });
  });


// Registro (con hash)
router.post("/register", async (req, res) => {
    const { email, password } = req.body;
  
    const exists = await UserModel.findOne({ email });
    if (exists) return res.status(400).send({ message: "Usuario ya registrado" });
  
    const hashedPassword = await createHash(password);
    const user = await UserModel.create({ email, password: hashedPassword });
    res.send({ status: "success", user });
  });



// Crear un usuario
router.post('/', async (req, res) => {
    
    const {name, age, email} = req.body;
    try {
        const result = await userModel.create({name, age, email});
        res.send({
            status: 'success',
            payload: result
        });
    } catch (error) {
        res.status(400).send({
            status: 'error',
            message: error.message
        });
    }
});


// Registro
router.post("/register", passport.authenticate("register", { session: false }), (req, res) => {
    res.send({ status: "success", message: "Usuario registrado" });
  });
  
  // Login (genera el token)
  router.post("/login", (req, res, next) => {
    passport.authenticate("login", { session: false }, (err, user, info) => {
      if (err) return next(err);
      if (!user) return res.status(401).send({ message: "Error en login" });
  
      const token = generateToken(user);
      res.send({ message: "Login exitoso", token });
    })(req, res, next);
  });


// Actualizar un usuario
router.put('/:uid', async (req, res) => {
    const uid = req.params.uid;
    const {name, age, email} = req.body;
    try {
        const user = await userModel.findOne({_id: uid});
        if (!user) throw new Error('User not found');

        const newUser = {
            name: name ?? user.name,
            age: age ?? user.age,
            email: email ?? user.email
        }

        const updateUser = await userModel.updateOne({_id: uid}, newUser);
        res.send({
            status: 'success',
            payload: updateUser
        });

    } catch (error) {
        res.status(400).send({
            status: 'error',
            message: error.message
        });
    }
});

// Eliminar un usuario
router.delete('/:uid', async (req, res) => {
    const uid = req.params.uid;
    try {
        const result = await userModel.deleteOne({_id: uid});
        res.status(200).send({
            status: 'success',
            payload: result
        });
    } catch (error) {
        res.status(400).send({
            status: 'error',
            message: error.message
        });
    }
});

export default router;







