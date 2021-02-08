const express = require("express");
const authRouter = express.Router();
import jwt from "jsonwebtoken";
import User from "../models/User";

authRouter.post("/register", async (req, res) => {
  const user = new User();
  user.username = req.body.username;
  user.password = req.body.password;
  user.email = req.body.email;

  user
    .save(user)
    .then((userdb: User) => res.json({ ok: true, userdb }))
    .catch((err: any) => res.status(500).json({ ok: false, err }));
});

authRouter.post("/login", async (req, res) => {
  const password = req.body.password;
  const email = req.body.email;

  const user = await User.findOne({ email: email }).exec();
  if (!user) return res.json({ ok: false, err: "user doesn't exists" });

  if (!user.comparePassword(password)) {
    return res.json({ ok: false, err: "incorrect password" });
  }

  const token = jwt.sign({ user }, "top_secret");
  return res.json({ ok: true, user, token });
});

export default authRouter;
