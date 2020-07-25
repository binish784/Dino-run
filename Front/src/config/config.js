let height=300;
let width;
if(window.innerWidth>400){
    width=650;
}else{
    width=window.innerWidth;
}

module.exports={
    height,
    width,
    gravity:1,
    ground_level:height-50,
    game_speed:5, //initial game speed
    speed_limit:15, //the speed limit for player
    up_chance:0.3,//chance that enemy will be upwards
    KEYS:{
        JUMP:[32,38],
        DOWN:[40],
    },
    PLAYER_STATES:{
        GROUNDED:1,
        JUMPING:2,
        CROUCHED:3
    },
    GAME_STATES:{
        RUNNING:1,
        PAUSED:2,
        GAMEOVER:3,
    }
}