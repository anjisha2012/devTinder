const express = require('express');
const connectDB = require("./config/database");
const app = express();
const cookieParser = require('cookie-parser');

app.use(cookieParser());
app.use(express.json());

const authRouter = require('./routes/auth');
const profileRouter = require('./routes/profile');
const requestRouter = require('./routes/requests');

app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);
// Connect to database and start server
connectDB()
    .then(() => {
        console.log("Database connection established");
        app.listen(3000, () => {
            console.log("Listening to port 3000....");
        });
    })
    .catch((err) => {
        console.log("Database cannot be connected:", err);
    });
