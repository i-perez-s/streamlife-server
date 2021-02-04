import passport from 'passport'
<<<<<<< HEAD
=======
<<<<<<< HEAD
<<<<<<< HEAD
const localStrategy = require("passport-local").Strategy
import User from "../models/User"

passport.use('signup', new localStrategy ({
    usernameField: "usuarname",
    emailField: "email",
    passwordField: "password"
},  async  (email: string, password: string, usuarname: string, done: any) => {
    try {
        const user = User.create({email, usuarname, password})
        return done(null, user)
    } catch (e) {
            done(e)
    }
}))

passport.use('login', new localStrategy({
    usernameField: 'username',
    passwordField: 'password'
}, async (email: string, password: string, done: any) => {
    try {
        const user = User.findOne({email})
        if (!user) return done(null, false, {message: "The user doesn't exists"})
        const validate = User.isValidPassword(password)
        if (!validate) return done(null, false, {message: "Invalid password"})

        return done(null, user, {message: "Login  succesfuly"})
    } catch (e) {
        return done(e)
    }

}))
=======
=======
>>>>>>> 1815d7c48536d3d4b12349d8cea4433dca80552a
>>>>>>> c3e3475a07eca487dad9642e372df412dc84f629
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
<<<<<<< HEAD
));
=======
<<<<<<< HEAD
));
>>>>>>> 1815d7c48536d3d4b12349d8cea4433dca80552a
=======
));
>>>>>>> 1815d7c48536d3d4b12349d8cea4433dca80552a
>>>>>>> c3e3475a07eca487dad9642e372df412dc84f629
