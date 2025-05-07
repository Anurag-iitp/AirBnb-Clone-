const express = require("express");
const app = express();
const ExpressError = require("./ExpressError");

// Error Handling middlewares
app.get("/err", (req , res)=>{
   abcd =abcd;
});


// app.use((err , req , res , next)=>{
//     console.log("-----ERROR-----");
//     next(err)
// });

// doing the same api wali  activity 
const checkToken = ("/api" , (req, res, next)=>{
    let {token} = req.query;
    if (token === "giveaccess"){
        next();
    }
    throw new ExpressError(401 , "Access denied !!")
})

app.use((err,req , res, nest)=>{
    let {status=500  , message = "Some error occured"} = err ;
    res.status(status).send(message);
})
// Error handler
// app.get("/wrong",(req , res)=>{
//     rabcd = abdcd;
// })

// Passing multiple middlewares 

app.get("/api",checkToken,(req , res)=>{
    res.send("Data")
})

// Creating an admin route & send an error with a 403 status code 
app.get("/admin" , (req , res)=>{
    throw new ExpressError(403, "Access to this is forbidden ");
});

app.listen(8080 ,()=>{
    console.log("The server of errors is listening at 8080");
});
// Normal midlleware ho toh fir ham next ko use karte ha 
// But agr default express handler ko use karne ke liye ham next(err)
// ko use karte hain 

// Custom error classes
// jab express error ko throw kar rhe hain then everything is fine but  

// Using async Errors:

 