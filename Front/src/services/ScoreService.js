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

    static addScore(username,score){
        console.log(username,score);
        return new Promise(function(resolve,reject){
            axios.post(system.BACK_URL,{'score':score,"username":username})
                    .then(function(response){
                        console.log(response.data);
                        resolve(response.data);
                    })
                    .catch(function(err){
                        resolve(err.response.data);
                    })
        })
    }

}


module.exports=ScoreService;