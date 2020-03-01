import React,{Component} from "react";
import {withRouter,Route,Switch} from "react-router-dom"; 

import MenuScreen from "../views/MenuScreen.jsx";
import GameScreen from "../views/GameScreen.jsx";

import GameOverScreen from "../views/GameOverScreen.jsx";

const service=require("../services/ScoreService");

class DinoApp extends Component{

    constructor(props){
        super(props);
        
    }

    async componentDidMount(){
    }

    render(){
        return<div>
             <Switch>
                <Route exact key={1} path="/" render={(props)=><MenuScreen {...props}/>} />
                <Route exact key={2} path="/game" render={(props)=><GameScreen {...props}/>} />
                <Route exact key={3} path="/gameover" render={(props)=><GameOverScreen {...props}/>} />
            </Switch>
            
            </div>
    }
}

export default withRouter(DinoApp);