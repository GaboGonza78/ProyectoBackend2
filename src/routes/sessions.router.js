import { Router } from "express";
import passport from "passport";

const router = Router();

// Ruta que valida al usuario por JWT y devuelve su info
router.get("/current", passport.authenticate("jwt", { session: false }), (req, res) => {
  const { _id, email } = req.user;
  res.send({
    status: "success",
    user: {
      id: _id,
      email
    }
  });
});

export default router;
