const mongoose = require("mongoose");


const listningSchema = {
    title:{
        type:String,
        required:true,
    },
    description:{
        type:String,
       
    },
    image:{
        type:String,
        default:"https://cdn.pixabay.com/photo/2019/05/29/20/01/sunset-4238445_640.jpg",

        set:(v) =>
         v === "" ? "https://cdn.pixabay.com/photo/2019/05/29/20/01/sunset-4238445_640.jpg"
         :v,

        
    },
    price:{
        type:Number,
    },
    location:{
        type:String,
    },
    country:{
        type:String,
    }
};

listing = mongoose.model("listing",listningSchema);
module.exports = listing;