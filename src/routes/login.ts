const { response, request } = require("express");
import express from "express";
const authRouter = express.Router();
import jwt from "jsonwebtoken";
import User from "../models/User";
import { checkJwt } from "./../helpers/checkJwt";

authRouter.get("/login/:email/:password", async (req = request, res = response) => {
  const email = req.params.email;
  const password = req.params.password;

  const user = await User.findOne({ email: email });
  if (!user) return res.json({ ok: false, err: "user doesn't exists" });

  if (!(await user.comparePassword(password))) {
    return res.json({ ok: false, err: "incorrect password" });
  }

  const token = jwt.sign({ user }, "top_secret");
  return res.json({ ok: true, user, token });
});

export default authRouter;