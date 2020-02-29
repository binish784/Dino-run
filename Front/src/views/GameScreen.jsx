"use strict"

import React from "react";

const config = require("../config/config");

import * as PIXI from "pixi.js";

import Controller from "../controller/controller";

import customText from "../components/customText";
import Player from "../components/Player";
import Ground from "../components/Ground";
import Cactus from "../components/Cactus";

const utils=require("../utils/utils");


class GameScreen extends React.Component{

    constructor(props){
        super(props);

        //initialize pixi app
        this.app= new PIXI.Application({width:config.width,height:config.height})
       
        this.pxRender=React.createRef();
        this.container= new PIXI.Container();
        this.app.stage.addChild(this.container);

        this.state={
            score:0,
            min_gap:350,
            currentState:config.GAME_STATES.PAUSED,
            speed:config.game_speed
        }

        //Player
        this.player=new Player(this.container,100,config.ground_level,40,30);

        this.ground=new Ground(this.container);

        //Score
        this.scoreText=new customText(this.container,config.width-150,10,`Score : ${this.state.score}`,"white",15);
        
        //Cactus 
        this.cactus=[];

        //paused Text
        this.pausedText=new customText(this.container,200,150,"Paused","white",15);
        
        //game over Text
        this.gameOverText=new customText(this.container,200,150,"Game Over","white",15);
        this.continueText=new customText(this.container,200,200,"press space to continue","white",15);
        this.continueText.hideText();
        this.gameOverText.hideText();
        
        // binding functions
        this.generateCactus=this.generateCactus.bind(this);
        this.updateGame=this.updateGame.bind(this);
        this.checkCollision=this.checkCollision.bind(this);
        this.togglePause=this.togglePause.bind(this);
        this.handleKeyPress=this.handleKeyPress.bind(this);

        //controller
        this.controller=new Controller(this.player);
        
        
    }


    componentDidMount(){
        if(this.props.history.action!= "PUSH"){
            this.props.history.push("/");
        }

        this.setState({
            score:0, // game score
            min_gap:350, // minimum gap between the obstacles
            currentState:config.GAME_STATES.PAUSED,
            speed:config.game_speed
        })


        this.pxRender.current.appendChild(this.app.view);
        this.generateCactus();
        document.addEventListener("keypress",this.handleKeyPress);
        this.app.ticker.add(this.updateGame);
    }

    componentWillUnmount(){
        this.app.ticker.remove(this.updateGame);
        document.removeEventListener("keypress",this.handleKeyPress);
    }

    handleKeyPress(e){
        if(e.keyCode==112){
            this.togglePause();
        } else if(e.keyCode==32 && this.state.currentState==config.GAME_STATES.GAMEOVER){
            this.props.history.push({
                pathname:"/gameover",
                state:{score:this.state.score}
            });
        }
        
    }

    togglePause(){
        if(this.state.currentState==config.GAME_STATES.PAUSED){
            this.setState({
                currentState:config.GAME_STATES.RUNNING,
            })
            this.pausedText.hideText();
        }else if(this.state.currentState==config.GAME_STATES.RUNNING){
            this.setState({
                currentState:config.GAME_STATES.PAUSED,
            })
            this.pausedText.showText();
        }
    }



    //generate Cactus at random position (with minimum gap)

    generateCactus(){

        for(let i=0;i<5;i++){

            let init_x= (i==0) ? utils.getRandomNumber(300+this.state.min_gap,500) 
                            : utils.getRandomNumber(this.cactus[i-1].body.x+this.state.min_gap,this.cactus[i-1].body.x+this.state.min_gap+(Math.random()*50));
            let init_y=config.ground_level+ 20;
            let cactie= new Cactus(this.container,init_x,init_y,20,20);
            this.cactus.push(cactie);
        }
    }


    //checks for collision and recycles the cactus
    checkCollision(){
     
        this.cactus.forEach((cactie,i)=>{

            //check for collision detection
            if (cactie.body.x < this.player.body.x + this.player.body.width &&
                cactie.body.x + cactie.body.width > this.player.body.x &&
                cactie.body.y < this.player.body.y + this.player.body.height &&
                cactie.body.y + cactie.body.height > this.player.body.y) {
                    this.setState({
                        currentState:config.GAME_STATES.GAMEOVER
                    })
                    // this.app.ticker.remove(this.updateGame);
                }
            
            //recycle the cactus once pass the screen
            if(cactie.body.x + cactie.body.width <0){
                    let prev_post= (i==0) ? this.cactus[this.cactus.length-1].body.x : this.cactus[i-1].body.x;
                    cactie.body.x= utils.getRandomNumber(prev_post+this.state.min_gap,prev_post+Math.floor(this.state.min_gap+Math.random()*300));
                    cactie.counted=false;
                }
        })
    }


    //keep score count and increase speed accordingly

    countScore(){

        //count score for jumping
        this.cactus.forEach((cactie)=>{
            if(cactie.body.x<this.player.body.x && !cactie.counted){
                let new_score=this.state.score+10
                this.setState({
                    score:new_score
                })
                cactie.counted=true;
                this.scoreText.changeText(`Score : ${this.state.score}`);
            
                //increase game_speed
                if(this.state.score%20==0 && this.state.speed<=config.speed_limit){
                    // console.log("increase Game speed")
                    let speed=this.state.speed+1;
                    this.setState({
                        speed
                    })
                    if(this.state.speed%7==0){
                        let min_gap=this.state.min_gap + (120 * this.state.speed/7 )
                        this.setState({
                            min_gap
                        })
                    }
                }
            
            }
        })
        
    
    }

    //move all the cactus

    moveCactus(){
        for(let i=0;i<this.cactus.length;i++){
            this.cactus[i].move(this.state.speed);
        }
    }

    //update Game loop

    updateGame(delta){

        if(this.state.currentState==config.GAME_STATES.PAUSED){
            return;
        }
        
        if(this.state.currentState==config.GAME_STATES.GAMEOVER){
            this.gameOverText.showText();
            this.continueText.showText();
            return;
        }

        this.moveCactus();
        this.ground.moveGround(this.state.speed);   
        this.player.update(delta);
        this.checkCollision();
        this.countScore();
    }

    //render the application

    render(){
        return <div ref={this.pxRender} id="pxrender"> </div>
    }

}

export default GameScreen;