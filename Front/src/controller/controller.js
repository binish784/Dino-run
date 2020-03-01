const config = require("../config/config");

class Controller {
    constructor(player){
    
        document.addEventListener("keydown",(e)=>{
            if(config.KEYS.DOWN.find((key)=>{
                if(key==e.keyCode) return true; })){
                    console.log("down");
                    switch(player.currentState){
                        case config.PLAYER_STATES.JUMPING:
                            player.down();
                            break;
                        
                    }
                    player.shrinkActive();
            }

            if(config.KEYS.JUMP.find((key)=>{
                if(key==e.keyCode) return true; }) && player.currentState==config.PLAYER_STATES.GROUNDED){
                player.jump();
            }
            
        })

        document.addEventListener("keyup",(e)=>{
            if(config.KEYS.DOWN.find((key)=>{ if(key==e.keyCode) return true; }) || 
            (config.KEYS.JUMP.find((key)=>{ if(key==e.keyCode) return true; }))) {
                    player.grow();
            }
        })

    }

}

export default Controller;