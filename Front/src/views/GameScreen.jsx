import React from "react";

const config = require("../config/config");

import * as PIXI from "pixi.js";


class GameScreen extends React.Component{

    constructor(props){
        super(props);

        //initialize pixi app
        this.app= new PIXI.Application({width:config.width,height:config.height})
        this.pxRender=React.createRef();
        this.container= new PIXI.Container();
        this.app.stage.addChild(this.container);

        //game properties
        this.score=0; // game score
        this.speed=3; // map_speed
        this.gravity=config.gravity; 
        this.min_gap=350; // minimum gap between the obstacles

        //player props;
        this.player;
        this.playerTexture= PIXI.Texture.from("https://s3-us-west-2.amazonaws.com/s.cdpn.io/693612/IaUrttj.png");
        this.jump_vel=0;
        this.jumpCounter=this.jumptime;

        //Score
        this.scoreText=new PIXI.Text(`Score : ${this.score}`,{fill:"white",fontSize:15});
        this.scoreText.x=450;
        this.scoreText.y=10;
        this.container.addChild(this.scoreText);

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
            if(e.keyCode==32 && this.player.currentState==config.PLAYER_STATES.GROUNDED){
                this.jump_vel=14;
                this.player.currentState=config.PLAYER_STATES.JUMPING;
            }
        })
        
    }

    componentDidMount(){
        this.pxRender.current.appendChild(this.app.view);
        this.generatePlayer();
        this.generateCactus();
        this.app.ticker.add(this.updateGame);
    }

    //generate Player
    generatePlayer(){
        this.player=new PIXI.Sprite(this.playerTexture);
        this.player.x=150;
        this.player.y=config.ground_level; 
        this.player.height=40;
        this.player.width=30;
        this.player.currentState=config.PLAYER_STATES.GROUNDED;
        this.container.addChild(this.player);
    }

    //jump player
    jumpPlayer(delta){
        if(this.player.currentState==config.PLAYER_STATES.JUMPING){
            this.player.y-= this.jump_vel * delta;
            if(this.jump_vel>0){
                this.jump_vel-=this.gravity *delta;
            }else{
                this.jump_vel-=this.gravity * delta/2;
            }
     
            //ground Player 
            if(this.player.y>=config.ground_level ){
                this.player.y=config.ground_level;
                this.player.currentState=config.PLAYER_STATES.GROUNDED
            }
        }
     
    }


    //get random number between (min,max)
    getRndInteger(min, max) {
        return Math.floor(Math.random() * (max - min) ) + min;
    }

    //generate Cactus at random position (with minimum gap)

    generateCactus(){

        for(let i=0;i<5;i++){
            let cactie=new PIXI.Sprite(this.cactusTexture);
            cactie.x= (i==0) ? this.getRndInteger(this.min_gap,500) 
                            : this.getRndInteger(this.cactus[i-1].x+this.min_gap,this.cactus[i-1].x+this.min_gap+(Math.random()*50));
            cactie.y=config.ground_level+ 20;
            cactie.height=20;
            cactie.counted=false;
            cactie.width=20;
            this.container.addChild(cactie);
            this.cactus.push(cactie);
        }
    }


    //update Game loop
    updateGame(delta){
        this.moveCactus();
        this.jumpPlayer(delta);
        this.checkCollision();
        this.countScore();
    }

    //checks for collision and recycles the cactus
    checkCollision(){
     
        this.cactus.forEach((cactie,i)=>{

            //check for collision detection
            if (cactie.x < this.player.x + this.player.width &&
                cactie.x + cactie.width > this.player.x &&
                cactie.y < this.player.y + this.player.height &&
                cactie.y + cactie.height > this.player.y) {
                 this.app.ticker.remove(this.updateGame);
             }
            
             //recycle the cactus once pass the screen

             if(cactie.x<0){
                    let prev_post= (i==0) ? this.cactus[this.cactus.length-1].x : this.cactus[i-1].x;
                    cactie.x= this.getRndInteger(prev_post+this.min_gap,prev_post+Math.floor(this.min_gap+Math.random()*300));
                    cactie.counted=false;
                }
        })
    }


    //keep score count

    countScore(){
        this.cactus.forEach((cactie)=>{
            if(cactie.x<this.player.x && !cactie.counted){
                this.score+=10;
                cactie.counted=true;
                this.scoreText.text=(`Score : ${this.score}`);
            }
        })
    }

    //move the cactus

    moveCactus(){
        for(let i=0;i<this.cactus.length;i++){
            this.cactus[i].x-=this.speed;
        }
    }

    
    //render the application

    render(){
        return <div ref={this.pxRender} id="pxrender"> </div>
    }

}

export default GameScreen;