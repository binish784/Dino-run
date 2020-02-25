import React,{Component} from "react";
import { Stage, AppConsumer, Container } from "@inlet/react-pixi";
import Dino from "../components/dino";
import Cactus from "../components/cactus";

const config = require("../config/config");

class GameWorld extends Component{

    constructor(props){
        super(props);
        this.state={
            speed:2
        }
    }

    componentDidMount() {
        this.speed=this.props.speed;
        this.props.app.ticker.add(this.tick)
    }
  
    componentWillUnmount() {
        this.props.app.ticker.remove(this.tick)
    }
  

    tick = (delta) => {
    
    }

    render(){
        return <Container >
            <Cactus speed={this.state.speed} {...this.props} />
            <Dino {...this.props} />
        </Container>
    }

}

const GameScreen = () => (
  <Stage width={config.width} height={config.height}>
    <AppConsumer>
      { app => <GameWorld app={app} />}
    </AppConsumer>
  </Stage>
)

export default GameScreen;