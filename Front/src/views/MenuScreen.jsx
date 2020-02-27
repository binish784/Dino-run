import React,{Component} from "react";
import {Stage,Text} from  "@inlet/react-pixi";
import { TextStyle } from "pixi.js";

const config = require("../config/config");

class MenuScreen extends Component{

    constructor(props){
        super(props);
        this.handleKeyPress=this.handleKeyPress.bind(this);
    }

    componentDidMount(){
        document.addEventListener("keypress",this.handleKeyPress);
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
        return <Stage height={config.height} width={config.width} >
        <Text text="Bunny Hop" x={150} y={100} style={new TextStyle({
            fontFamily: '"Source Sans Pro", Helvetica, sans-serif',
            align:"center",
            fontSize:20,
            fill:"white",
        })}  />
        <Text text="Press Enter to start" x={150} y={150} style={new TextStyle({
            align:"center",
            fontFamily: '"Source Sans Pro", Helvetica, sans-serif',
            fontSize:20,
            fill:"white",
        })}  />
        </Stage>
    }
}


export default (MenuScreen);