import express from 'express'
import { authorizedToken } from "../middelwares/auth";
import Emote from '../models/Emote';
import User from '../models/User';
import { getId } from './../helpers/getIdUser';
const { response, request } = require('express');
const uploadRouter = express.Router();
const cloudinary = require('cloudinary').v2
//cloudinary.config(process.env.CLOUDINARY_URL);
cloudinary.config({
  cloud_name: 'zehcnas',
  api_key: '968626554162891',
  api_secret: 'zTzYSc08B1mGrqIh6Qs_KL1-lrs'
});



uploadRouter.post('/uploadUserPhoto', authorizedToken, async(req = response, res = request) => {
    const { file } = req.files
    const { tempFilePath } = file

    try {
        const { secure_url } = await cloudinary.uploader.upload( tempFilePath )
        const userUpdated = await User.findByIdAndUpdate(getId(req), {photo: secure_url})
        return res.json({
            ok: true,
            userUpdated
        })
    } catch (error) {
        return res.status(500).json({
            ok: false,
            error
        })
    }
})

uploadRouter.post("/createEmote", authorizedToken, async(req, res) => {
    const { file } = req.files
    const {tempFilePath} = file
    try {
        const {secure_url} = await cloudinary.uploader.upload(tempFilePath)
        const emote = new Emote({
            idStreamerCreator: getId(req),
            urlEmote: secure_url
        })
        console.log(emote)
        await emote.save()
        console.log('sabed')
        return res.json({
            ok: true,
            emote
        })
    } catch (error) {
        return res.json({
            ok: false,
            error
        })
    }
})

export default uploadRouter