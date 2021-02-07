import passport from 'passport'
import User from "../models/User"
const LocalStrategy = require('passport-local').Strategy;

passport.use('signup', new LocalStrategy({
    usernameField: 'usuarname',
    useremailField: 'email',
    passwordField: 'password'
}, async (username: string, email: string, password: string, done) => {
    try {
        const user = await User.findOne({email})
        if (!user) {
            return done(null, false )
        }
    } catch (err) {
        
    }
}))


passport.use('login' ,new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password'
    },
    function async(email: 'string', password: 'string', done: any) {
        return User.findOne({email, password})
           .then(user => {
               if (!user) {
                   return done(null, false, {message: 'Incorrect email or password.'});
               }
               return done(null, user, {message: 'Logged In Successfully'});
          })
          .catch(err => done(err));
    }
));
