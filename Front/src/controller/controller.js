const config = require("../config/config");

class Controller {
    constructor(player,game_state){
    document.addEventListener("keydown",(e)=>{
        if(config.KEYS.JUMP.find((key)=>{
            if(key==e.keyCode) return true; }) && player.currentState==config.PLAYER_STATES.GROUNDED){
            player.jump();
        }
        if(config.KEYS.DOWN.find((key)=>{
            if(key==e.keyCode) return true; }) && player.currentState!=config.PLAYER_STATES.GROUNDED){
            player.down();
        }
    })
}

}

export default Controller;