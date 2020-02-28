const scoreDB= require("./score");

class ScoreController{

    // add score

    static async add(score,username){
        const new_score= new scoreDB({score,username});
        await new_score.save();
        return new_score;
    }

}

module.exports=ScoreController;