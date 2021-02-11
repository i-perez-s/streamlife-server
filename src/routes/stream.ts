const express = require("express");
const streamRouter = express.Router();
import User from "../models/User";
import Stream from "../models/Stream"
import { verificaToken } from "../middelwares/auth";


streamRouter.put("/startStreaming/:id", verificaToken, async (req, res) => {

    const id = req.user._id.toString()
    //const id = req.params.id
    const user = await User.findById(id)
    const imStreaming = {isInLive: !user.isInLive}
    return res.json({ok: true, user: await User.findByIdAndUpdate(id, imStreaming, {new:true})})
})