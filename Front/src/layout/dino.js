import React,{Component} from "react";
import {withRouter,Route,Switch} from "react-router-dom"; 

import MenuScreen from "../views/MenuScreen.jsx";
import GameScreen from "../views/GameScreen.jsx";


class DinoApp extends Component{

    constructor(props){
        super(props);
    }

    render(){
        console.log("Dino loaded");
        return <Switch>
                <Route exact key={1} path="/" render={(props)=><MenuScreen {...props}/>} />
                <Route exact key={2} key="okey" path="/game" render={(props)=><GameScreen {...props}/>} />
            </Switch>
    }
}

export default withRouter(DinoApp);