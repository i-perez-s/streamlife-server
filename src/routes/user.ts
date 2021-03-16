const { response, request } = require('express');
const express = require("express");
const userRouter = express.Router();
import User from "../models/User";
import { authorizedToken } from "../middelwares/auth";

userRouter.get("/users", async (req = request, res = response) => {
  const users = await User.find();
  if (!users)
    return res.status(500).json({
      ok: false,
      err: "error while prcessing the search of the users",
    });

  return res.json({ ok: true, users });
});

userRouter.get("/user/:id", authorizedToken, async (req = request, res = response) => {
  const user = await User.findById(req.params.id).exec();
  if (!user)
    return res.status(404).json({ ok: false, err: "user doesn't exists" });
  return res.json({ ok: true, user });
});

userRouter.delete("/user", authorizedToken, async (req = request, res = response) => {
  const id = req.user._id;
  User.findByIdAndDelete(id)
    .exec()
    .then((user: User) => {
      if (!user)
        return res
          .status(404)
          .json({ ok: false, err: "The user doesn't exists" });
      res.json({ ok: true, user });
    })
    .catch((err: any) => res.status(500).json({ ok: false, err }));
});

userRouter.post("/user", async (req = request, res = response) => {
  const {username, password, email} =  req.body
  const user = new User({username, email, password});
  user
    .save(user)
    .then((userdb: User) => res.json({ ok: true, userdb }))
    .catch((err: any) => res.status(500).json({ ok: false, err }));
});


export default userRouter;
