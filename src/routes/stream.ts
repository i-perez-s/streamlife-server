const express = require("express");
const { response, request } = require('express');
const streamRouter = express.Router();
import User from "../models/User";
import Stream from "../models/Stream"
import { authorizedToken } from "../middelwares/auth";
import { getId } from "../helpers/getIdUser"


streamRouter.post("/startStreaming", authorizedToken, async (req = request, res = response) => {
    const id = req.user._id.toString()
    const {tittle, category} = req.body
    const stream = new Stream({tittle, category, streamer: id})
    try {
        await stream.save()
        const user = await User.findById(id)
    const imStreaming = {isInLive: !user.isInLive}
    return res.json({ok: true, user: await User.findByIdAndUpdate(id, imStreaming, {new:true})})
    } catch (error) {
        return res.status(500).json({ok: false, err: error})
    }
})

streamRouter.delete("/stopStreaming", authorizedToken, async (req = request, res = response) => {
    const idStreamer = getId(req)
    try {
        const stream = await Stream.findOneAndDelete({streamer: idStreamer})
        return res.jsos({ok: true, stream})
    } catch (error) {
        return res.status(400).json({ok: false, err: error})
    }
})