require("dotenv").config();

const cors= require("cors");
const express= require("express");
const mongoose= require("mongoose");

const app =new  express();

const PORT = process.env.PORT || 5000;

const routes= require("./routes/routes");
const connection=require("./utils/createConnect");

const corsOption={
    origin:"*",
    methods:"GET,POST",
}

app.use(express.json())
    .use(cors(corsOption))
    .use(express.urlencoded({extended:false}))
    .use(routes);

mongoose.connect(connection.create(),{ useNewUrlParser: true,useUnifiedTopology: true },(e)=>{
    if(e){
        console.log("Unable to connect to bunnyHop Database");
    }else{
        console.log("connected to Database")
    }
})

app.listen(PORT,(e)=>{
    if(e){
        console.log(`PORT LISTENING ERROR: ${PORT}`);
    }else{
        console.log(`SERVER LISTENING ON ${PORT}`)
    }
})
