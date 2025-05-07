// Middle wares 
const express = require("express");
const app = express();

// Middleware res send 

// What middlewares do 
// They execute any code 
// make changes to the request and response objects 
// they end the request response cycle 
// call the next middleware function in the stack 
//  //

// our first middleware : 
// app.use(middleware)

// Using next(): in middlewares yeh call back karta hai next middleware ko 
// Next ke baad ki cheejein  bhi execute hoti hain 
// Uske baad ki cheejon ko execut na hone ke liye next ke pahle return laga denge taaki voh age ki cheejein execute na hone de 
// Agar req aaa gyi aur response chali gyi aur middleware last mein likha gya hai toh voh execute hi nhi hoga 

app.use((req , res  , next)=>{
   console.log(req.method , req.hostname);
   next();
});


app.use("/random" ,(req , res  , next)=>{
    console.log("I am made for only random babes");
    next();
 });
// Creating utility middlewares
// Agar ham app.use mein ham koi path define kar denge toh voh middleware 
// Sirf ussi ke liye use hoga naa ki dusri cheejon ke liye 

app.get("/" ,  (req,res)=>{
    console.log("Hi I am  root ")
    res.send("root page h bhai")
});

app.use("/api" , (req, res, next)=>{
    let {token} = req.query;
    if (token === "giveaccess"){
        next();
    }
    throw new Error("Access denied !!")
})
// Error handler
// app.get("/wrong",(req , res)=>{
//     rabcd = abdcd;
// })

// Passing multiple middlewares 

app.get("/api",(req , res)=>{
    res.send("Data")
})

app.get("/random",(req, res) =>{
    res.send("This is a random Page")
})

// 404 mtlb ki agr koi page exist  nahi karta aur user uspe jana chahe toh yeh 
// Middleware use hoga 
// Api Token as Query String : kuch api ke liye hamko access toke chahiya hota hai jisse hame api ka 
// data recieve hota hai 



app.use((req , res  )=>{
    res.send("Page not found!!!!");
 });


app.listen(8080, () => {
    console.log("Server listening to port 8080")
})

// Handling error : express default error handler server side errors ko handle karna sikhayenge 

//  Form Validations : When we enter data in the form , the borwser and / or the  web server will check 
//  to see that the data is in the correct format and within the constraints set by the application 
