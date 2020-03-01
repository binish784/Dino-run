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

        this.shrinked=false;

        this.gravity=config.gravity;
        
        this.ground_level=config.ground_level-height;

        this.def_height=height;
        this.def_width=width;

        //player body props
        this.body.x=init_x;
        this.body.y=init_y || config.ground_level-height;
        this.body.height=height;
        this.body.width=width;
        this.container.addChild(this.body);

    }

    shrinkActive(){
        this.shrinked=true;
    }

    grow(){
        this.shrinked=false;
    }

    handleShrink(){
        if(this.shrinked){
            this.body.height=this.def_height/2;
            this.body.width=this.def_width/2;
        }else{
            this.body.height=this.def_height;
            this.body.width=this.def_width;
        }
        this.body.y=this.body.y+this.body.height;
        this.ground_level=config.ground_level-this.body.height;
    }

    jump(){
        this.jump_vel=14;
        this.currentState=config.PLAYER_STATES.JUMPING;
    }

    down(){
        this.gravity=config.gravity+3;
    }

    update(delta){
        this.inAir(delta);
        if(this.currentState==config.PLAYER_STATES.GROUNDED){
            this.handleShrink();
        }
    }

    inAir(delta){
        if(this.currentState==config.PLAYER_STATES.JUMPING){
            this.body.y-= this.jump_vel * delta;
            if(this.jump_vel>0){
                this.jump_vel-=config.gravity *delta;
            }else{
                this.jump_vel-=this.gravity * delta/2;
            }

        }
     
    }


}

export default Player;