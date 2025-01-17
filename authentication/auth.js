// where we retrieve token for signup and login using passport

const passport = require('passport')
const localStrategy = require('passport-local').Strategy
const usersModel = require('../models/usersModel')

const JWTstrategy = require('passport-jwt').Strategy
const ExtractJWT = require('passport-jwt').ExtractJwt // to extract token from a request

// this checks if any request coming to the server has a jwt that contains the secret_token(can be anyname as defined in the function) defined
// then, it uses the JWT_SECRET to decrypt the secret_token to get all details, if correct it carries out the next command OR
// if you are using the bearer auth method which is the standard method, extractajwt from header as a bearer token. secret_token is not used here

passport.use(
    new JWTstrategy(
        {
            secretOrKey: process.env.JWT_SECRET,
            jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken()
        }, 
        async(token, done)=>{
            try{
                return done(null, token.user)
            } catch(error){
                return done(error)
            }
        }
    )
)

// this next middleware saves the information provided to the DB,
// then, it sends the users information to the next middleware if successful or returns an error if it fails


