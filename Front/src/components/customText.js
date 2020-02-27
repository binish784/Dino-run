import * as PIXI from "pixi.js";

class customText{
    constructor(container,x,y,text,color,size){
        this.container=container;
        this.color=color;
        this.size= size ;
        this.body= new PIXI.Text(text,{fill:color,fontSize:size});
        this.body.x=x;
        this.body.y=y;
        this.container.addChild(this.body);

        this.hideChild=this.hideText.bind(this);
        this.show=this.showText.bind(this);

    }

    //removes child from container
    hideText(){
        this.container.removeChild(this.body);
    }

    showText(){
        this.container.addChild(this.body);
    }

}

export default customText;