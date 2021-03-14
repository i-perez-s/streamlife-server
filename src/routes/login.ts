const { response, request } = require("express");
import express from "express";
const authRouter = express.Router();
import jwt from "jsonwebtoken";
import User from "../models/User";
import { checkJwt } from "./../helpers/checkJwt";

authRouter.post("/login", async (req = request, res = response) => {
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

/* authRouter.post("/checkJwt", async (req = request, res = response) => {
  if (!checkJwt(req.body.token)){
    req.status(401).json({
      socket
    })
  }
}) */

export default authRouter;
