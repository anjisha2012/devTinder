const express = require('express');

const app = express();

app.get("/user" , (req,res) => {
    res.send({firstName: "Anjali" , lastName: "Singh"})
})

// app.use("/test" ,(req, res)=>{
//    res.send("hello from server");
// })

app.post("/user" , (req,res) => {
    res.send("data successfully send to the user");
})
app.delete("/user" , (req,res) => {
    res.send("deleted");
})
app.listen(3000, ()=>{
    console.log("listening....")
});