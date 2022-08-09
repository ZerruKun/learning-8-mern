import express from "express";

import mongoose from "mongoose";

import {registerValidation} from "./validations/auth.js"

import checkAuth from "./utils/checkAuth.js"

import * as  UserControllers from "./controllers/UserControllers.js"

mongoose.connect("mongodb://127.0.0.1:27017/mern", {useNewUrlParser: true})
    .then(() => console.log("DB ok"))
    .catch((err) => console.log("DB error", err))

const app = express();

app.use(express.json());

app.post("/auth/login", UserControllers.login)
app.post("/auth/register", registerValidation, UserControllers.register);
app.get("/auth/me", checkAuth, UserControllers.login)

app.listen(4444, (err)=> {
    if(err) {
        return console.log(err);
    }

    console.log("Server OK");
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