import React,{Component} from "react";
import {Stage,Text,Sprite} from  "@inlet/react-pixi";
import { TextStyle } from "pixi.js";
const config = require("../config/config");


class MenuScreen extends Component{

    constructor(props){
        super(props);
        this.handleKeyPress=this.handleKeyPress.bind(this);
        this.game=React.createRef();
        this.state={
            x:0,
            y:0
        }
    }

    async componentDidMount(){
        document.addEventListener("keypress",this.handleKeyPress);
        this.setState({
            y:config.height-40,
        })
    }

    componentWillUnmount(){
        document.removeEventListener("keypress",this.handleKeyPress);
    }

    handleKeyPress(e){
        if(e.keyCode==32){
            this.props.history.push("/game");
        }
    }

    render(){

        return <div>
        
        <Stage ref={this.game} height={config.height} width={config.width} options={{backgroundColor:0x83c6eb}}>
            <Text text="Bunny Hop" x={config.width/2-70} y={config.height/2-50} style={new TextStyle({
                fontFamily: '"Source Sans Pro", Helvetica, sans-serif',
                align:"center",
                fontSize:20,
                fill:"black",
            })}  />
            <Text text="Press Space to start" x={config.width/2-100} y={config.height/2} style={new TextStyle({
                align:"center",
                fontFamily: '"Source Sans Pro", Helvetica, sans-serif',
                fontSize:20,
                fill:"black",
            })}  />
            <Text text="'P' to toggle Pause" x={config.width/2-70} y={config.height/2+50} style={new TextStyle({
                align:"center",
                fontFamily: '"Source Sans Pro", Helvetica, sans-serif',
                fontSize:12,
                fill:"black",
            })}  />
            <Text text="Developed By Binish" x={config.width-100} y={config.height-20} style={new TextStyle({
                fontSize:10,
                fill:"black",
            })}  />
            <Sprite image="https://s3-us-west-2.amazonaws.com/s.cdpn.io/693612/IaUrttj.png" x={this.state.x} y={this.state.y}/>
        </Stage>
            
        </div>

    }
}


export default (MenuScreen);