require("dotenv").config();
const express = require("express")
const app = express()
const cors = require("cors")
const { sendEmail } = require("./email")
const mongoose = require('mongoose')
const Email = require("./models/emailData");
const connectDB = require("./config/dbConn")


app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors())
mongoose.set("strictQuery", true)

connectDB()

app.get("/", (req, res) => {
    res.send(`welcom to port 4000`);
    console.log(req.body);
})

app.post("/", async (req, res) => {
    console.log("POST", req.body);
    if (req.body.email !== "bad@test.com") { // was sending through 'bad@test.com to throw a Error / emulate bad request
        const email = req.body.email;
        console.log(email)
        try {
            await sendEmail(email)
                .then(async () => {
                    const newEmail = await Email.create({
                        email: `${email}`
                    })
                    console.log(newEmail)
                })
            res.status(200).json({ success: true, message: "sent!", data: email })
            return
        } catch (e) {
            console.log("error", e)
            res.status(400).json(e)
        }
    } else {
        res.status(400).json({ error: "Bad email" });
    }

  
});

mongoose.connection.once("open", () => {
    console.log('Connected to Mongo')
    app.listen(4000, () => {
        console.log("server start on port 4000")
    });
})