import React,{Component} from "react";

class ScoreList extends Component{
    constructor(props){
        super(props);
        this.score_list=this.props.scores.map(this.createList);
    }

    createList(score){
        return <li key={score.key}>{score.username} : {score.score}</li>
    }

    render(){
        return <div>
            <p className="scoreTitle">Top Scores</p>
            <ul className="scoreList">
                {this.score_list}
            </ul>
        </div>
    }
}

export default ScoreList;