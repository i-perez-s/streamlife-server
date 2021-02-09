const express = require("express");
const followRouter = express.Router();
import User from "../models/User";
import Follow from "../models/Follow";
import { verificaToken } from "../middelwares/auth";

followRouter.post(
  "/startFollow/:idFollowed",
  verificaToken,
  async (req, res) => {
    const followerId = req.user._id.toString();
    const followedId = req.params.idFollowed;
    const follow = new Follow({
      follower: followerId,
      followed: followedId,
    });

    const existsFollow = await Follow.findOne({
      follower: followerId,
      followed: followedId,
    });
    if (existsFollow == null) {
      follow
        .save()
        .then((follow) => res.json({ ok: true, follow }))
        .catch((err) => res.json({ ok: false, err }));
    } else {
      return res.json({ ok: false, err: "you're still following this user'" });
    }
  }
);

followRouter.delete(
  "/stopFollowing/:idFollowed",
  verificaToken,
  async (req, res) => {
    Follow.findOneAndDelete({
      followed: req.params.idFollowed,
      follower: req.user._id,
    })
      .populate("followed", "_id username isInLive")
      .then((follow: Follow) => {
        if (!follow)
          return res
            .status(404)
            .json({ ok: false, err: "follow doesn't exists" });
        return res.json({ ok: true, followDeleted: follow });
      })
      .catch((err: any) => res.json({ ok: false, err }));
  }
);

followRouter.get("/myFollows", verificaToken, async (req, res) => {
  Follow.find({ follower: req.user._id })
    .populate("followed", "_id username isInLive")
    .then((myFollows) => res.json({ ok: true, follows: myFollows }))
    .catch((err) => res.json({ ok: false, err }));
});

followRouter.get("/followersOfUser/:id", verificaToken, async (req, res) => {
  const followers = await Follow.find({ followed: req.params.id });
  return res.json({ ok: true, followersOfUser: followers.length });
});

export default followRouter;
