import React,{Component} from "react";
import {withRouter,Route,Switch} from "react-router-dom"; 

import MenuScreen from "../views/MenuScreen.jsx";
import GameScreen from "../views/GameScreen.jsx";

import ScoreList from "./component/ScoreList";
import GameOverScreen from "../views/GameOverScreen.jsx";

const service=require("../services/ScoreService");

class DinoApp extends Component{

    constructor(props){
        super(props);
        this.state={
            scores:[],
            message:"Score Loading"
        }
    }

    async componentDidMount(){
        const fetchedData=await service.fetchHigh();
        if(fetchedData.success){
            let data=fetchedData.data;
            let score_list=[];
            data.forEach((score)=>{
                score_list.push({"key":score._id,"score":score.score,"username":score.username});
            })
            this.setState({
                scores:score_list
            })
        }else{
            this.setState({
                message:"Loading Failed"
            })
        }
    }

    render(){
        return<div>
             <Switch>
                <Route exact key={1} path="/" render={(props)=><MenuScreen {...props}/>} />
                <Route exact key={2} path="/game" render={(props)=><GameScreen {...props}/>} />
                <Route exact key={3} path="/gameover" render={(props)=><GameOverScreen {...props}/>} />
            </Switch>
            
        <br></br>
        <br></br>
            
        {this.state.scores.length==0 ?  <p className="scoreTitle">{this.state.message}</p> : <ScoreList scores={this.state.scores} />  }
        
            </div>
    }
}

export default withRouter(DinoApp);