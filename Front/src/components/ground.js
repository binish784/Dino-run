'use strict'

import * as PIXI from "pixi.js";
import GroundTile from "./Base/GroundTile";


const config=require("../config/config");

class Ground{

    constructor(container){
        
        this.texture=PIXI.Texture.from("https://art.pixilart.com/0de398bb45ce30b.png");
        
        this.container=container;
        
        //sprite properties
        this.tiles=[];
        this.tileNum=Math.ceil(config.width / 100)+2;
        for(let i=0;i<this.tileNum;i++){
            let x= (i==0) ? 0 : this.tiles[i-1].body.x+this.tiles[i-1].body.width;
            let tile=new GroundTile(this.container,x);
            this.tiles.push(tile);
        }
        
    }

    moveGround(speed){

        //move tile
        this.tiles.forEach((tile,i)=>{

            tile.move(speed);

            //recycle tiles
            if(tile.body.x + tile.body.width <0){
                let prev_tile= (i==0) ? this.tiles[this.tiles.length-1].body.x  : this.tiles[i-1].body.x;
                tile.body.x= prev_tile + this.tiles[0].body.width;
            }

        })
    }

}

export default Ground;