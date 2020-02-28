const scoreDB = require("../models/score/score.action");


// Add Score

exports.saveScore=(req,res)=>{
    try{
        const score = req.body.new_score;
        const username=req.body.username;
        const new_score=res.send(scoreDB.add(score,username));
        return res.send({success:true,data:new_score}).status(200);

    }catch(e){
        console.log(e);
        return res.send({success:false,data:"Server Error"}).status(500);
    }
}



// Page Not Found

exports.notFound=(req,res)=>{
    return res.send("404 - Page Not Found").status(404);
}