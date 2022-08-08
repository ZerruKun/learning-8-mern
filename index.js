import express from "express";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

mongoose.connect("mongodb://127.0.0.1:27017/mern", {useNewUrlParser: true})
    .then(() => console.log("DB ok"))
    .catch((err) => console.log("DB error", err))

const app = express();

app.use(express.json());

app.post("/auth/register", (req, res) => {

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