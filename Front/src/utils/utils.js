module.exports={
    
    //return an random number between min  and max;
    getRandomNumber:(min,max)=>{
        return Math.floor(Math.random() * (max - min) ) + min;
    }
}