const express = require("express");

const authRouter = express.Router();
const User = require("../models/user");
const { validateSignUpData } = require("../utils/validation");
const bcrypt = require("bcrypt");

authRouter.post("/signup", async (req, res) => {
    const { password, firstName, lastName, emailId } = req.body;

    try {
        // VALIDATION OF DATA
        validateSignUpData(req);

        const passwordHash = await bcrypt.hash(password, 10);
        const user = new User({ firstName, lastName, emailId, password: passwordHash });
        await user.save();
        res.send("User added successfully");
    } catch (err) {
        res.status(400).send(`User cannot be added: ${err.message}`);
    }
});

authRouter.post("/login", async (req, res) => {
    try {
        const { emailId, password } = req.body;

        const user = await User.findOne({ emailId: emailId });

        if (!user) {
            throw new Error("Invalid Credentials");
        }
        const isPasswordValid = await user.validatePassword(password)
        if (isPasswordValid) {
           const token = await user.getJWT()         
            res.cookie("Token", token, { httpOnly: true } , {
                expires: new Date(Date.now() + 8 * 3600000) 
              });
            return res.send("Login Successful!!");
        } else {
            throw new Error("Invalid Credentials");
        }
    } catch (err) {
        res.status(400).send(`Error:  ${err.message}`);
    }
});
module.exports = authRouter;