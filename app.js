// Phase 1 : Listings crate karenge

// Part 1 database setup karenge and will build rest api crud operations 
const express = require("express");
const app = express();
const mongoose = require("mongoose")
const Listing = require("./models/listing.js");
const path = require("path")
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate")  //it helps to create templates 
 

const MONGO_URL = "mongodb://127.0.0.1:27017/VortexMind";



app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));
app.engine('ejs',ejsMate);
app.use(express.static(path.join(__dirname,"/public")))


main()
 .then(()=>{
    console.log("Connected to Db")
}).catch((err)=>{
    console.log(err)
})

async function main(){
    await mongoose.connect(MONGO_URL) 
};




app.get("/",(req,res)=>{
    res.send("Hi i am the root")
})

// This one was for testing the database connection
// app.get("/testlisting" , async (req,res)=>{
//     let sampleListing = new Listing ({
//          title: "My home",
//          description:"By the beach",
//          price:1200,
//          location : "Calangute,Goa",
//          country  : "India"
//     });

//     await sampleListing.save()
//     console.log("Sample was saved ")
//     res.send("succesful testing")
// })

// Sample datas

// Index route :
app.get("/listings",async (req,res)=>{
    const alllistings =  await Listing.find({});
    res.render("listings/index.ejs",{alllistings})
});


// Creating a new route to add new listing 
app.get("/listings/new", (req,res)=>{
    res.render("listings/new.ejs")
});

// create route  
app.post("/listings", async(req,res)=>{
    // let {title , description, image, price, location, country}=req.body;
    const newlisting = new Listing(req.body.listing);
    await newlisting.save();
    res.redirect("/listings")
});

// Edit & update route : 
app.get("/listings/:id/edit",async (req,res)=>{
    let {id} = req.params;
  const listing =  await Listing.findById(id);
   res.render("listings/edit.ejs",{ listing })
});

// Update route : 
app.put("/listings/:id", async(req,res)=>{
    let {id} = req.params;
    await Listing.findByIdAndUpdate(id,{...req.body.listing});
    res.redirect(`/listings/${id}`)
});

// Delete route :
app.delete("/listings/:id", async(req,res)=>{
    let {id} = req.params;
   let deletedListing= await Listing.findByIdAndDelete(id)
   console.log(deletedListing)
   res.redirect("/listings");
})

// new route ko uper rakh rhe hain taaki server isko /id na samajh le 
// creating a show route jo ki sab listings ka data print karwayega isko /listings/:id pe get request bhejenge 
app.get("/listings/:id", async (req,res)=>{
    let {id} = req.params;
  const listing =  await Listing.findById(id);
  res.render("listings/show.ejs", { listing });
});



app.listen(8080 , ()=>{
    console.log("Server is running at port 8080")
});






// First error whiling assigning mongo url usko galti se "" inme assign kar diya tha 