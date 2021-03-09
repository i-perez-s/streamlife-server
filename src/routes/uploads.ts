import express from 'express'
import { authorizedToken } from "../middelwares/auth";
const { response, request } = require('express');
const uploadRouter  = express.Router();
const cloudinary = require('cloudinary').v2
cloudinary.config(process.env.CLOUDINARY_URL)



uploadRouter.post('/upload', authorizedToken, async(req = response, res = request) => {
    const category = req.category
    switch (category) {
        case "userPhoto":
            
            break;
        case "emote":
            
            break;
        default:
            break;
    }
    
    const {file} = req.files

    const {tempFilePath} = file

    const  {secure_url} = await cloudinary.uploader.upload(tempFilePath)
})

export default uploadRouter