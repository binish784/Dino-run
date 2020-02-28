
module.exports={
    create:()=>{
        return "mongodb+srv://"+process.env.DB_NAME+ ":"+ process.env.PASSWORD+"@"+process.env.USER+"-swqdk.mongodb.net/test?retryWrites=true&w=majority";
    }
}