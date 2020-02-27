const config = require("../config/config");

class Controller {
    constructor(player){
    document.addEventListener("keypress",(e)=>{
        if(e.keyCode==config.KEYS.JUMP && player.currentState==config.PLAYER_STATES.GROUNDED){
            player.jump();
        }
    })
}

}

export default Controller;