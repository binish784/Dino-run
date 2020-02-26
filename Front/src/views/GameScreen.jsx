// import React,{Component} from "react";
// import { Stage, AppConsumer, Container } from "@inlet/react-pixi";
// import Dino from "../components/dino";
// import Cactus from "../components/cactus";

// import * as PIXI from "pixi.js";

// const config = require("../config/config");

// class GameWorld extends Component{

//     constructor(props){
//         super(props);
//         this.state={
//             speed:2
//         }
//     }

//     componentDidMount() {
//         this.speed=this.props.speed;
//         this.props.app.ticker.add(this.tick)
//     }
  
//     componentWillUnmount() {
//         this.props.app.ticker.remove(this.tick)
//     }
  

//     tick = (delta) => {
    
//     }

//     render(){
//         return <Container >
//             <Cactus speed={this.state.speed} {...this.props} />
//             <Dino {...this.props} />
//         </Container>
//     }

// }

// const GameScreen = () => (
//   <Stage width={config.width} height={config.height}>
//     <AppConsumer>
//       { app => <GameWorld app={app} />}
//     </AppConsumer>
//   </Stage>
// )

// export default GameScreen;



import React from "react";

const config = require("../config/config");

import * as PIXI from "pixi.js";



class GameScreen extends React.Component{

    constructor(props){
        super(props);
        this.app= new PIXI.Application({width:config.width,height:config.height})
        this.pxRender=React.createRef();
        this.container= new PIXI.Container();
        this.app.stage.addChild(this.container);

        //game properties
        this.speed=2;
        this.gravity=4;

        //creating player
        this.playerTexture= PIXI.Texture.from("https://s3-us-west-2.amazonaws.com/s.cdpn.io/693612/IaUrttj.png");
        this.player;
        this.jumping=false;
        this.jumptime=50;
        this.jumpCounter=this.jumptime;


        //Cactus 
        this.cactusTexture= PIXI.Texture.from("https://s3-us-west-2.amazonaws.com/s.cdpn.io/693612/coin.png");
        this.cactus=[];
       
        // binding functions
        this.generateCactus=this.generateCactus.bind(this);
        this.updateGame=this.updateGame.bind(this);
        this.jumpPlayer=this.jumpPlayer.bind(this);
        this.checkCollision=this.checkCollision.bind(this);

        //controller
        document.addEventListener("keypress",(e)=>{
            if(e.keyCode==32){
                this.jumping=true;
            }
        })
        
    }


    componentDidMount(){
        this.pxRender.current.appendChild(this.app.view);
        this.app.ticker.add(this.updateGame);
        this.generatePlayer();
        this.generateCactus();
    }

    //generate Player
    generatePlayer(){
        this.player=new PIXI.Sprite(this.playerTexture);
        this.player.x=150;
        this.player.y=160; 
        this.player.height=40;
        this.player.width=30;
        this.container.addChild(this.player);
    }

    jumpPlayer(){
        if(this.jumping){
            this.jumpCounter--;
            if(this.jumpCounter>=this.jumptime/2){
                this.player.y-=this.gravity;
            }else{
                this.player.y+=this.gravity; 
            }
        }
        if(this.jumpCounter==0){
            this.jumpCounter=this.jumptime;
            this.jumping=false;
        }

    }

    getRndInteger(min, max) {
        return Math.floor(Math.random() * (max - min) ) + min;
    }

    //generate Cactus at random position

    generateCactus(){
        let min_gap=350;
        for(let i=0;i<5;i++){
            let cactie=new PIXI.Sprite(this.cactusTexture);
            cactie.x= (i==0) ? this.getRndInteger(min_gap,500) : this.getRndInteger(this.cactus[i-1].x+min_gap,this.cactus[i-1].x+min_gap+(Math.random()*50));
            cactie.y=160;
            cactie.height=20;
            cactie.width=20;
            this.container.addChild(cactie);
            this.cactus.push(cactie);
        }
    }

    updateGame(){
        this.moveCactus();
        this.jumpPlayer();
        this.checkCollision();
    }

    checkCollision(){
        this.cactus.forEach((cactie)=>{
            if (cactie.x < this.player.x + this.player.width &&
                cactie.x + cactie.width > this.player.x &&
                cactie.y < this.player.y + this.player.height &&
                cactie.y + cactie.height > this.player.y) {
                 this.app.ticker.remove(this.updateGame);
             }
        })
    }

    moveCactus(){
        for(let i=0;i<this.cactus.length;i++){
            this.cactus[i].x-=this.speed;
        }
    }

    render(){
        return <div ref={this.pxRender} id="pxrender"> </div>
    }

}

export default GameScreen;