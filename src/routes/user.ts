const express = require("express");
const userRouter = express.Router();
import User from "../models/User";
import { verificaToken } from '../middelwares/auth'

userRouter.get("/users", verificaToken, async (req, res) => {
    const users = await User.find()
  if (!users) return res.status(500).json({ ok: false, err: "error while prcessing the search of the users" });

  return res.json({ok: true, users})
})

userRouter.get("/user:id", verificaToken, async (req, res) => {
    const user = await User.findById(req.params.id).exec()
  if (!user) return res.status(404).json({ ok: false, err: "user doesn't exists" });
return res.json({ok: true, user})
})

export default userRouter

