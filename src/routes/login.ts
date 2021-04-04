const { response, request } = require("express");
import express from "express";
const authRouter = express.Router();
import jwt from "jsonwebtoken";
import User from "../models/User";
import { checkJwt } from "./../helpers/checkJwt";
import bcrypt from "bcrypt";

authRouter.post("/login", async (req = request, res = response) => {
  const { email, password } = req.body;
  console.log("login");
  const user = await User.findOne({ email: email });
  // console.log(await bcrypt.compare(password, user.password));

  if (!user) return res.json({ ok: false, err: "user doesn't exists" });

  if (!(await user.comparePassword(password, user.password))) {
    return res.json({ ok: false, err: "incorrect password" });
  }

  const token = jwt.sign({ user }, "top_secret");
  return res.json({ ok: true, user, token });
});

export default authRouter;
