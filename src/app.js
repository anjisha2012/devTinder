const express = require('express');

const app = express();

const {adminAuth} = require("./middlewares/auth");

app.use("/admin" , adminAuth);

app.get("/admin/getAllData" , (req,res, next) => {
  res.send("all data sent")
})

app.delete("/admin/deleteData" , (req,res, next) => {
    res.send("deleted a user")
})


app.listen(3000, ()=>{
    console.log("listening....")
});