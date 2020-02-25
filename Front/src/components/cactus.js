import React,{Component} from "react";

import {Sprite,Container} from "@inlet/react-pixi";

class Cactus extends Component{

    constructor(props){
        super(props);
        this.state={
            x:400,
            y:230
        }
        this.height=50;
        this.width=30;
    }

    
    componentDidMount() {
        this.speed=this.props.speed;
        this.props.app.ticker.add(this.tick)
    }
  
      componentWillUnmount() {
        this.props.app.ticker.remove(this.tick)
      }
  

    tick = (delta) => {
        let x=this.state.x-this.speed;
        this.setState({
            x
        })
    }


    render(){
        return <Container x={this.state.x} y={this.state.y}>
                <Sprite 
                    image="https://s3-us-west-2.amazonaws.com/s.cdpn.io/693612/coin.png"
                    height={this.height}
                    width={this.width}
                />
                </Container>
    }
}

export default Cactus;