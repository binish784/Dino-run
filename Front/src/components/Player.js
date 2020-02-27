"use strict"

import *  as PIXI from "pixi.js";

const config=require("../config/config");

class Player{
    constructor(container,init_x,init_y,height,width){
        
        this.playerTexture= PIXI.Texture.from("https://s3-us-west-2.amazonaws.com/s.cdpn.io/693612/IaUrttj.png");
        this.container=container;
        
        this.body=new PIXI.Sprite(this.playerTexture);
        
        this.jump_vel=0;
        this.currentState=config.PLAYER_STATES.GROUNDED;

        //player body props
        this.body.x=init_x;
        this.body.y=init_y;
        this.body.height=height;
        this.body.width=width;
        
        this.container.addChild(this.body);
    }

    jump(){
        this.jump_vel=14;
        this.currentState=config.PLAYER_STATES.JUMPING;
    }

    update(delta){
        this.inAir(delta);
    }

    inAir(delta){
        if(this.currentState==config.PLAYER_STATES.JUMPING){
            this.body.y-= this.jump_vel * delta;
            if(this.jump_vel>0){
                this.jump_vel-=config.gravity *delta;
            }else{
                this.jump_vel-=config.gravity * delta/2;
            }
     
            //ground Player 
            if(this.body.y>=config.ground_level ){
                this.body.y=config.ground_level;
                this.currentState=config.PLAYER_STATES.GROUNDED
            }
        }
     
    }


}

export default Player;