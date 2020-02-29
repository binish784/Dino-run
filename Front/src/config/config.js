let height=400;
let width=window.innerWidth-100;

module.exports={
    height,
    width,
    gravity:1,
    ground_level:height-100,
    game_speed:5,
    speed_limit:15,
    KEYS:{
        JUMP:[32,38],
        DOWN:[40],
    },
    PLAYER_STATES:{
        GROUNDED:1,
        JUMPING:2
    },
    GAME_STATES:{
        RUNNING:1,
        PAUSED:2,
        GAMEOVER:3,
    }
}