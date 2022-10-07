const express = require("express")
const moment = require('moment')
const { authenticate } = require("../authentication/authenticate")
const userModel = require("../models/usersModel")

const usersRoute = express.Router()

// get all users
usersRoute.get("/", async(req, res)=>{
    const users = await userModel.find()
    .then((users) =>{
        res.json({ 
            status: true, 
            message: users 
        })
    })
})

// get a user == login/ signin

usersRoute.get('/user', (req, res)=>{
    authenticate(req, res)
    .then((user) =>{
        return user
}).catch(
    (err)=>{
       return err
    }
)
})
    

// create new user == signup
usersRoute.post("/user", (req, res)=>{
    const user = req.body
    const newUser = userModel.create({
        firstName: user.firstName,
        lastName: user.lastName,
        username: user.username,
        password: user.password
    }).then(
        (newUser)=>{
            res.json({ status: true, message: newUser })
        }
    ).catch(
        (err) =>{
            res.status(404).json({
                status: false,
                message: err
            })
        }
    )
})

module.exports = usersRoute