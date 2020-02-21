import React,{Component} from "react";

import {Stage,Text} from "@inlet/react-pixi";
import { TextStyle } from "pixi.js";

const config = require("../config/config");


class GameScreen extends Component{

    render(){
        console.log("game screen rendered");
        return <Stage height={config.height} width={config.width} >
            <Text text="Render Game " x={150} y={150} style={new TextStyle({
                fontSize:20,
                fill:"white"
            })} />
        </Stage>
    }
}

export default GameScreen;