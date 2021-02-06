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