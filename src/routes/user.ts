const { response, request } = require("express");
const express = require("express");
const userRouter = express.Router();
import User from "../models/User";
import { authorizedToken } from "../middelwares/auth";
const cloudinary = require("cloudinary").v2;
//cloudinary.config(process.env.CLOUDINARY_URL);
cloudinary.config({
  cloud_name: "zehcnas",
  api_key: "968626554162891",
  api_secret: "zTzYSc08B1mGrqIh6Qs_KL1-lrs",
});

userRouter.get("/users", async (req = request, res = response) => {
  const users = await User.find();
  if (!users)
    return res.status(500).json({
      ok: false,
      err: "error while prcessing the search of the users",
    });

  return res.json({ ok: true, users });
});

userRouter.get(
  "/user/:id",
  authorizedToken,
  async (req = request, res = response) => {
    const user = await User.findById(req.params.id).exec();
    if (!user)
      return res.status(404).json({ ok: false, err: "user doesn't exists" });
    return res.json({ ok: true, user });
  }
);

userRouter.delete(
  "/user",
  authorizedToken,
  async (req = request, res = response) => {
    const id = req.user._id;
    try {
      const user = await User.findByIdAndDelete(id);
      if (!user) {
        return res.json({ ok: false, err: "The user doesn't exists" });
      }

      const nameArr = user.photo.split("/");
      const nameImg = nameArr[nameArr.length - 1];
      const [public_id] = nameImg.split(".");
      await cloudinary.uploader.destroy(public_id);
    } catch (error) {
      res.catch((err: any) => res.status(500).json({ ok: false, err }));
    }
  }
);

userRouter.post("/user", async (req = request, res = response) => {
  const { username, password, email } = req.body;
  const user = new User({ username, email, password });
  user
    .save(user)
    .then((userdb: User) => res.json({ ok: true, userdb }))
    .catch((err: any) => res.status(500).json({ ok: false, err }));
});

userRouter.get(
  "/search/:username",
  authorizedToken,
  async (req = request, res = response) => {
    const username = req.params.username.trim();
    const usersSearched = await User.find({
      username: { $regex: `.*${username}.*` },
    });
    return res.json({ ok: true, usersSearched });
  }
);

export default userRouter;
