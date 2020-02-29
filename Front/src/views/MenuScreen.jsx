import React,{Component} from "react";
import {Stage,Text} from  "@inlet/react-pixi";
import { TextStyle } from "pixi.js";

const config = require("../config/config");


class MenuScreen extends Component{

    constructor(props){
        super(props);
        this.handleKeyPress=this.handleKeyPress.bind(this);
        this.game=React.createRef();
        
    }

    async componentDidMount(){
        document.addEventListener("keypress",this.handleKeyPress);
    }

    componentWillUnmount(){
        document.removeEventListener("keypress",this.handleKeyPress);
    }

    handleKeyPress(e){
        if(e.key=="Enter"){
            this.props.history.push("/game");
        }
    }

    render(){

        return <div>
        
        <Stage ref={this.game} height={config.height} width={config.width} >
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
            
        </div>

    }
}


export default (MenuScreen);