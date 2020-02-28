import React,{Component} from "react";
import {Stage,Text} from  "@inlet/react-pixi";
import { TextStyle } from "pixi.js";

const config = require("../config/config");

const service=require("../services/ScoreService");

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


class MenuScreen extends Component{

    constructor(props){
        super(props);
        this.handleKeyPress=this.handleKeyPress.bind(this);
        this.state={
            scores:[]
        }
    }

    async componentDidMount(){
        document.addEventListener("keypress",this.handleKeyPress);
        const fetchedData=await service.fetchHigh();
        if(fetchedData.success){
            let data=fetchedData.data;
            let score_list=[];
            data.forEach((score)=>{
                score_list.push({"key":score._id,"score":score.score,"username":score.username});
            })
            console.log(score_list);
            this.setState({
                scores:score_list
            })
        }else{
            console.log("Fetching Scores Failed");
        }
    }

    componentWillUnmount(){
        document.removeEventListener("keypress",this.handleKeyPress);
    }

    handleKeyPress(e){
        if(e.key==" " || e.key=="Enter"){
            this.props.history.push("/game");
        }
    }

    render(){
        console.log("Menu Screen loaded");


        return <div>
        
        <Stage height={config.height} width={config.width} >
            <Text text="Bunny Hop" x={config.width/2-70} y={config.height/2-50} style={new TextStyle({
                fontFamily: '"Source Sans Pro", Helvetica, sans-serif',
                align:"center",
                fontSize:20,
                fill:"white",
            })}  />
            <Text text="Press Enter to start" x={config.width/2-100} y={config.height/2} style={new TextStyle({
                align:"center",
                fontFamily: '"Source Sans Pro", Helvetica, sans-serif',
                fontSize:20,
                fill:"white",
            })}  />
            <Text text="'P' to toggle Pause" x={config.width/2-70} y={config.height/2+50} style={new TextStyle({
                align:"center",
                fontFamily: '"Source Sans Pro", Helvetica, sans-serif',
                fontSize:12,
                fill:"white",
            })}  />
        </Stage>
            
        <br></br>
        <br></br>
            
        {this.state.scores.length==0 ?  <p className="scoreTitle"> Scores Loading</p> : <ScoreList scores={this.state.scores} />  }
        
        </div>


    }
}


export default (MenuScreen);