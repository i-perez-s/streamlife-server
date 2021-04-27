 const { response, request } = require('express');
const express = require("express");
const followRouter = express.Router();
import User from "../models/User";
import Follow from "../models/Follow";
import { authorizedToken } from "../middelwares/auth";

followRouter.post(
  "/startFollow/:idFollowed",
  authorizedToken,
  async (req = request, res = response) => {
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
      const myFollow = await follow.save()
      // const followPopulated =  myFollow.populate("follower", "user, email")
      Follow.findById(myFollow._id)
      .populate("followed", "_id username isInLive photo")
      .populate("follower", "_id username isInLive photo")
      .then((follow: typeof Follow) => {
        if (!follow)
          return res
            .status(404)
            .json({ ok: false, err: "follow doesn't exists" });
        return res.json({ ok: true, follow: follow });
      })
    } else {
      return res.json({ ok: false, err: "you're still following this user'" });
    }
  }
);

followRouter.delete(
  "/stopFollowing/:idFollowed",
  authorizedToken,
  async (req = request, res = response) => {
    Follow.findOneAndDelete({
      followed: req.params.idFollowed,
      follower: req.user._id,
    })
      .populate("followed", "_id username isInLive photo")
      .populate("follower", "_id username isInLive photo")
      .then((follow: typeof Follow) => {
        if (!follow)
          return res
            .status(404)
            .json({ ok: false, err: "follow doesn't exists" });
        return res.json({ ok: true, followDeleted: follow });
      })
      .catch((err: any) => res.json({ ok: false, err }));
  }
);

followRouter.get("/myFollows", authorizedToken, async (req = request, res = response) => {
  Follow.find({ follower: req.user._id })
    .populate("followed", "_id username isInLive photo")
    .then((myFollows) => res.json({ ok: true, follows: myFollows }))
    .catch((err) => res.json({ ok: false, err }));
});

followRouter.get("/followersOfUser/:id", authorizedToken, async (req = request, res = response) => {
  const followers = await Follow.find({ followed: req.params.id });
  return res.json({ ok: true, followersOfUser: followers.length });
});

export default followRouter;
