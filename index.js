import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import mongoose from "mongoose";
import { validationResult } from "express-validator";

import {registerValidation} from "./validations/auth.js"
import UserModel from "./models/User.js"

mongoose.connect("mongodb://127.0.0.1:27017/mern", {useNewUrlParser: true})
    .then(() => console.log("DB ok"))
    .catch((err) => console.log("DB error", err))

const app = express();

app.use(express.json());

app.post("/auth/register", registerValidation, async (req, res) => {
    try {
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            return res.status(400).json(errors.array());
        }
    
        const password = req.body.password;
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);
    
        const doc = new UserModel({
            email: req.body.email,
            fullName: req.body.fullName,
            avatarUrl: req.body.avatarUrl,
            passwordHash: hash,
        })
    
        const user = await doc.save();

        const token = jwt.sign(
            {
            _id: user._id,
            },
            "secret123",
            {
            expiresIn: "30d",
            }
        );

        const {passwordHash, ...userData} = user._doc;
    
        res.json({
            userData,
            token,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Не удалось зарегистрироваться",
        });
    }
});

// app.get("/", (req, res) => {
//     res.send("Hello World!");
// })

// app.post("/auth/login", (req, res) => {
//     console.log(req.body);

//     const token = jwt.sign({
//         email: req.body.email,
//         fullName: "Ncik Tab"
//     }, "secret123");

//     res.json({
//         success: true,
//         token,
//     })
// });

app.listen(4444, (err)=> {
    if(err) {
        return console.log(err);
    }

    console.log("Server OK");
});