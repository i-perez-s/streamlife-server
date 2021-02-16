const { response, request } = require('express');
import express from 'express'
const uploadRouter  = express.Router();
import { authorizedToken } from "../middelwares/auth";

uploadRouter.post('/upload', authorizedToken, (req = response, res = request) => {
    
})