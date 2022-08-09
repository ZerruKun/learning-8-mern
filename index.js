import express from "express";

import mongoose from "mongoose";

import {registerValidation, loginValidation, postCreateValidation} from "./validations.js";

import checkAuth from "./utils/checkAuth.js";

import * as  UserController from "./controllers/UserController.js";
import * as  PostController from "./controllers/PostController.js";

mongoose.connect("mongodb://127.0.0.1:27017/mern", {useNewUrlParser: true})
    .then(() => console.log("DB ok"))
    .catch((err) => console.log("DB error", err))

const app = express();

app.use(express.json());

app.post("/auth/login", loginValidation, UserController.login);
app.post("/auth/register", registerValidation, UserController.register);
app.get("/auth/me", checkAuth, UserController.login);

app.get("/posts", PostController.getAll);
app.get("/posts/:id", PostController.getOne);
app.post("/posts", checkAuth, postCreateValidation, PostController.create);
app.delete("/posts/:id", checkAuth, PostController.remove);
app.patch("/posts/:id", PostController.update);

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