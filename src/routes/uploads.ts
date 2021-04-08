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
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

uploadRouter.post(
  "/setUserPhoto/:uid",
  async (req = response, res = request) => {
    const { file } = req.files;
    const { uid } = req.params;
    const { tempFilePath } = file;

    try {
      const user = await User.findById(id.toString());

      if (user.img) {
        const nameArr = user.img.splice("/");
        const nameImg = nameArr[nameArr.length - 1];
        const [public_id] = nameImg.split(".");
        await cloudinary.uploader.destroy(public_id);
      }

      const { secure_url } = await cloudinary.uploader.upload(tempFilePath);
      const userUpdated = await User.findByIdAndUpdate(getId(req), {
        photo: secure_url,
      });

      return res.json({
        ok: true,
        userUpdated,
      });
    } catch (error) {
      return res.status(500).json({
        ok: false,
        error,
      });
    }
  }
);

uploadRouter.post("/createEmote", authorizedToken, async (req, res) => {
  const { file } = req.files;
  const { tempFilePath } = file;
  try {
    const { secure_url } = await cloudinary.uploader.upload(tempFilePath);
    const emote = new Emote({
      idStreamerCreator: getId(req),
      urlEmote: secure_url,
    });
    console.log(emote);
    await emote.save();
    console.log("sabed");
    return res.json({
      ok: true,
      emote,
    });
  } catch (error) {
    return res.json({
      ok: false,
      error,
    });
  }
});

export default uploadRouter;
