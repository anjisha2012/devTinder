const mongoose = require("mongoose");

const connectDB = async() => {
await mongoose.connect("mongodb+srv://anjisha2012:h659gGrKq8xflVLy@nodeproject.f1m4e.mongodb.net/devTinder");
}

module.exports = connectDB;



