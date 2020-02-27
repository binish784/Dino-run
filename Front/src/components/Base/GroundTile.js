'use strict'

import * as PIXI from "pixi.js";

const config=require("../../config/config");

class GroundTile{

    constructor(container,x){
        
        this.texture=PIXI.Texture.from("https://art.pixilart.com/0de398bb45ce30b.png");
        
        this.container=container;
        
        
        //sprite properties
        this.body=new PIXI.Sprite(this.texture);
        this.body.x=x;
        this.body.y=config.ground_level;
        this.body.height=100;
        this.body.width=100;
        
        this.container.addChild(this.body)
    }

    //move tile to the left
    move(){
        this.body.x-= (config.game_speed/2);
    }

    moveTo(x){
        this.body.x=x;
    }

}

export default GroundTile;