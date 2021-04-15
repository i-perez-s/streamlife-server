import express from "express";
import { authorizedToken } from "../middelwares/auth";
import Emote from "../models/Emote";
import User from "../models/User";
import { getId } from "./../helpers/getIdUser";
const { response, request } = require("express");
const uploadRouter = express.Router();
const cloudinary = require("cloudinary").v2;
//cloudinary.config(process.env.CLOUDINARY_URL);
cloudinary.config({
  cloud_name: "zehcnas",
  api_key: "968626554162891",
  api_secret: "zTzYSc08B1mGrqIh6Qs_KL1-lrs",
});

uploadRouter.post(
  "/setUserPhoto",
  authorizedToken,
  async (req = response, res = request) => {
    const { file } = req.files;
    let tempFilePath = "";
    console.log(req.user);
    if (!file) {
      tempFilePath =
        "http://1.gravatar.com/avatar/47db31bd2e0b161008607d84c74305b5?s=96&d=mm&r=g";
    } else {
      tempFilePath = file.tempFilePath;
    }
    const { _id: uid } = req.user;
    console.log(uid);

    try {
      const user = await User.findById(uid);

      if (user.photo !== "") {
        console.log(user.photo);
        const nameArr = user.photo.split("/");
        const nameImg = nameArr[nameArr.length - 1];
        const [public_id] = nameImg.split(".");
        await cloudinary.uploader.destroy(public_id);
      }

      const { secure_url } = await cloudinary.uploader.upload(tempFilePath);
      console.log(secure_url);
      const userUpdated = await User.findByIdAndUpdate(
        uid,
        {
          photo: secure_url,
        },
        { new: true }
      );

      console.log(userUpdated);
      return res.json({
        ok: true,
        userUpdated,
      });
    } catch (error) {
      return res.status(400).json({
        ok: false,
        error,
      });
    }
  }
);

// uploadRouter.post("/createEmote", authorizedToken, async (req, res) => {
//   const { file } = req.files;
//   const { tempFilePath } = file;
//   try {
//     const { secure_url } = await cloudinary.uploader.upload(tempFilePath);
//     const emote = new Emote({
//       idStreamerCreator: req.user._id,
//       urlEmote: secure_url,
//     });
//     console.log(emote);
//     await emote.save();
//     console.log("sabed");
//     return res.json({
//       ok: true,
//       emote,
//     });
//   } catch (error) {
//     return res.json({
//       ok: false,
//       error,
//     });
//   }
// });

export default uploadRouter;
