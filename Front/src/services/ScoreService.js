const axios=require("axios");

const system=require("../config/system");

class ScoreService{

    static fetchHigh(){
        return new Promise(function(resolve,reject){
            axios.get(system.BACK_URL)
            .then(function(response){
                console.log(response.data);
                    resolve(response.data)
            })
            .catch(function(err){
                //handle Error
                resolve(err.response.data);
            })    
        })
    }

}


module.exports=ScoreService;