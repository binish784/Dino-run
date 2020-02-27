"use strict"

import React from "react";

const config = require("../config/config");

import * as PIXI from "pixi.js";

import Controller from "../controller/controller";

import Player from "../components/Player";
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

        //game properties
        this.score=0; // game score
        this.speed=config.game_speed; // map_speed
        this.gravity=config.gravity; 
        this.min_gap=350; // minimum gap between the obstacles

        //Player
        this.player=new Player(this.container,100,config.ground_level,40,30);

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
        this.checkCollision=this.checkCollision.bind(this);

        //controller
        this.controller=new Controller(this.player);
        
    }

    componentDidMount(){
        if(this.props.history.action!= "PUSH"){
            this.props.history.push("/");
        }
        this.pxRender.current.appendChild(this.app.view);
        this.generateCactus();
        this.app.ticker.add(this.updateGame);
    }


    //generate Cactus at random position (with minimum gap)

    generateCactus(){

        for(let i=0;i<5;i++){

            let init_x= (i==0) ? utils.getRandomNumber(300+this.min_gap,500) 
                            : utils.getRandomNumber(this.cactus[i-1].body.x+this.min_gap,this.cactus[i-1].body.x+this.min_gap+(Math.random()*50));
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
                 this.app.ticker.remove(this.updateGame);
             }
            
            //recycle the cactus once pass the screen
            if(cactie.body.x<0){
                    let prev_post= (i==0) ? this.cactus[this.cactus.length-1].body.x : this.cactus[i-1].body.x;
                    cactie.body.x= utils.getRandomNumber(prev_post+this.min_gap,prev_post+Math.floor(this.min_gap+Math.random()*300));
                    cactie.counted=false;
                }
        })
    }


    //keep score count

    countScore(){
        this.cactus.forEach((cactie)=>{
            if(cactie.body.x<this.player.body.x && !cactie.counted){
                this.score+=10;
                cactie.counted=true;
                this.scoreText.text=(`Score : ${this.score}`);
            }
        })
    }

    //move all the cactus

    moveCactus(){
        for(let i=0;i<this.cactus.length;i++){
            this.cactus[i].move();
        }
    }

    //update Game loop

    updateGame(delta){
        this.moveCactus();
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