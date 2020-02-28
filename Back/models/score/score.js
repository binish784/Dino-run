const mongoose = require("mongoose");

const Schema = mongoose.Schema;

//score model

const scoreSchema = new Schema({
    score:{
        type:Number,
        required:true,
    },
    username:{
        type:String,
        required:true,
    }
})

const score=mongoose.model("score",scoreSchema);

module.exports = score;
