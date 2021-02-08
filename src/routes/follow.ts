const express = require("express");
const followRouter = express.Router();
import User from "../models/User";
import Follow from "../models/Follow";
import { verificaToken } from "../middelwares/auth";

followRouter.post(
  "/startFollow/:idFollowed",
  verificaToken,
  async (req, res) => {
    const follow = new Follow({
      follower: req.user._id.toString(),
      followed: req.params.idFollowed,
    });

    const followDb = await follow.save();
    if (!followDb)
      return res
        .status(500)
        .json({ ok: true, err: "some problems at saving the follow" });
    return res.json({ ok: true, follow: followDb });
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
      .exec()
      .populate()
      .then((follow: Follow) => {
	  if(!follow) return res.status(404).json({ok: false, err:"follow doesn't exists"})
	  return res.json({ ok: true, followDeleted: follow })
      })
      .catch((err: any) => res.json({ ok: false, err }));
  }
);

followRouter.get("/myFollows", verificaToken, async(req, res) => {
    const myFollows = await Follow.find({follower: req.user._id})
    return res.json({ok: true, follows: myFollows})
})

followRouter.get("/followersOfUser/:id", verificaToken, async(req, res) => {
    const followers = await Follow.find({followed: req.params.id})
    return res.json({ok: true, followersOfUser: followers.length})
})


export default followRouter;
