const express = require("express");
const app = express();
const port = 8080;
const mongoose = require("mongoose")
const listing = require("./models/init.js");
const path = require("path");
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
const methodOverride = require("method-override");
app.use(methodOverride("_method"));

app.use(express.static(path.join(__dirname,"public")));
app.use(express.urlencoded({extended:true}));


const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlustcopy";

async function main(){
    await mongoose.connect(MONGO_URL);
};

main().then(()=>{
    console.log("mongoose stablished successfully");
})
.catch((err)=>{
    console.log(err);
})



//  inital route 
app.get("/listing", async (req,res)=>{
  const results = await listing.find();
  res.render("index.ejs",{results});
});

//  route for adding new places
app.get("/listing/new", (req,res)=>{
    res.render("new.ejs");
  })



//  to show detail information when clicl some one
app.get("/listing/:id", async(req,res) =>{
    const {id} = req.params;
    const result = await listing.findById(id);
    res.render("in_detail.ejs",{result});
})

//     to edit existing information 
app.get("/listing/:id/edit", async(req,res)=>{
    const {id} = req.params;
    const result = await listing.findById(id);
    res.render("edit.ejs",{result});
})


//  when old informatin edit and new informatin take place 
app.put("/listing/:id",async(req,res)=>{
    const {id} = req.params;
    const ourdatabase = await listing.findById(id);
    const {title:newtitle,
        description:newdescription,
        image:newimage,
        location:newlocation,
        country:newcountry} = req.body;
    const results = await listing.findByIdAndUpdate(id,{title:newtitle,
        description:newdescription,
        image:newimage,
        location:newlocation,
        country:newcountry})
    res.redirect("/listing");
});


// taking new information of places then add in our list
app.post("/listing", async (req,res)=>{
    const {title:newtitle,
        description:newdescription,
        image:newimage,
        location:newlocation,
        country:newcountry} = req.body;

  const result = new listing({title:newtitle,
    description:newdescription,
    image:newimage,
    location:newlocation,
    country:newcountry})  

    const output = await result.save();
    res.redirect("/listing");

})


// //  Delete route or destroy route to remove some one existing
app.delete("/listing/:id/delete",async(req,res)=>{
    const {id} = req.params;
    const result = await listing.findByIdAndDelete(id);
    res.redirect("/listing");
});


app.listen(port,()=>{
    console.log("shiva is listning");
})
