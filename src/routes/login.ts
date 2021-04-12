const { response, request } = require("express");
import express from "express";
const authRouter = express.Router();
import jwt from "jsonwebtoken";
import User from "../models/User";
import { authorizedToken } from "./../middelwares/auth";

authRouter.post("/login", async (req = request, res = response) => {
  const { email, password } = req.body;
  console.log("login");
  const user = await User.findOne({ email: email });
  // console.log(await bcrypt.compare(password, user.password));

  if (!user) return res.json({ ok: false, err: "user doesn't exists" });

  if (!(await user.comparePassword(password, user.password))) {
    return res.json({ ok: false, err: "incorrect password" });
  }

  const token = jwt.sign({ user }, process.env.TOKEN_SEED);
  return res.json({ ok: true, user, token });
});

authRouter.get(
  "/renewToken",
  authorizedToken,
  async (req = request, res = response) => {
    const uid = req.user._id.toString();
    const user = await User.findById(uid);
    if (!user) {
      return res.status(400).json({ ok: false, err: "Invalid token" });
    }
    const token = jwt.sign({ user }, process.env.TOKEN_SEED);
    return res.json({ user, token });
  }
);

export default authRouter;
