const scoreDB= require("./score");

class ScoreController{

    // add score

    static async add(score,username){
        const new_score= new scoreDB({score,username});
        await new_score.save();
        return new_score;
    }

    // return all scores

    static async fetchScore(){
        const scores = await scoreDB.find();
        return scores;
    }

    //return top 5 high scores

    static async fetchHigh(){
        const query=[
            {$sort:{"score":-1}},
            {$limit:5},
        ]
        const high=await scoreDB.aggregate(query);
        return high;
    }

}

module.exports=ScoreController;