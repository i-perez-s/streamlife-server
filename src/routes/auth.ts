<<<<<<< HEAD
import express from 'express'
import passport from "passport"
import jwt from "jsonwebtoken"

export const router = express.Router()

router.post('signup', passport.authenticate("signup",{session: false}), async(req, res) => {
    res.json({
        message: "Sign up sucessfuly",
        user: req.user
    })
})

router.post("login",  async (req, res, next) =>{
    passport.authenticate("login", async (err, user, info) => {
        try {
            if (err || user) {
                const error =  new Error("new Error");
                return next (error)
            }
        } catch (err) {
        }
    })
})
=======
const express = require('express');
const authRouter  = express.Router();
import jwt from 'jsonwebtoken'
import passport from 'passport'

authRouter.post('/login', function (req: any, res: any) {
    passport.authenticate('local', {session: false}, (err: any, user: any, info: any) => {
        if (err || !user) {
            return res.status(400).json({
                message: 'Something is not right',
                user   : user
            });
        }
       req.login(user, {session: false}, (err: any) => {
           if (err) {
               res.send(err);
           }
           // generate a signed son web token with the contents of user object and return it in the response
           const token = jwt.sign(user, 'your_jwt_secret');
           return res.json({user, token});
        });
    })(req, res);
});

export default authRouter
>>>>>>> 1815d7c48536d3d4b12349d8cea4433dca80552a
