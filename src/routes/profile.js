const express = require("express");

const profileRouter = express.Router();
const {userAuth} = require("../middlewares/auth")
// Profile API
profileRouter.get("/profile",userAuth, async (req, res) => {
    try {     
         const user = req.user;
    
        res.send(user)
    } catch (err) {
        return res.status(400).send(`Error: ${err.message}`);
    }
});

module.exports = profileRouter;