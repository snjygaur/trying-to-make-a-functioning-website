const mongoose = require("mongoose");
const listing = require("../models/init.js");
const initData = require("./data.js");



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


const initDB = async () =>{
    await listing.deleteMany({});
   await listing.insertMany(initData.data);
};

initDB();
