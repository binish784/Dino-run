import React,{Component} from "react";
import {Sprite,Container} from "@inlet/react-pixi";


class Dino extends Component{
    
    constructor(props){
        super(props);
        this.height=70;
        this.width=50;
        this.state={
            x:150,
            y:240
        }
    }

    // componentDidMount() {
    //     this.speed=this.props.speed;
    //     this.props.app.ticker.add(this.tick)
    // }
  
    // componentWillUnmount() {
    //     this.props.app.ticker.remove(this.tick)
    // }
  

    // tick = (delta) => {
        // this.cactusRef.current.update();
    // }



    update(){
        
    }
    
    render(){

        return  <Container x={this.state.x} y={this.state.y} >
                    <Sprite image="https://s3-us-west-2.amazonaws.com/s.cdpn.io/693612/IaUrttj.png" ></Sprite>
                </Container>
    }

}

export default Dino;