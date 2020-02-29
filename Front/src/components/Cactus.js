'use strict'

import * as PIXI from "pixi.js";

const config=require("../config/config");

class Cactus{

    constructor(container,init_x,init_y,height,width){
        
        this.texture=PIXI.Texture.from("https://s3-us-west-2.amazonaws.com/s.cdpn.io/693612/coin.png");
        
        this.container=container;
        
        
        //sprite properties
        this.body=new PIXI.Sprite(this.texture);
        this.body.x=init_x;
        this.body.y=init_y;
        this.body.height=height;
        this.body.width=width;
        

        this.counted=false;
        
        this.container.addChild(this.body)
    }

    //move cactus to the left
    move(speed){
        this.body.x-=speed;
    }

}

export default Cactus;