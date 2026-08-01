/* ====================================================== */
/*                  FLAPPY LILITH                         */
/* ====================================================== */

(() => {

"use strict";

/* ====================================================== */
/*                      CANVAS                            */
/* ====================================================== */

const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const hud = document.getElementById("flappyHUD");
const startMessage = document.getElementById("startMessage");

/* ====================================================== */
/*                      IMAGES                            */
/* ====================================================== */

const background = new Image();
background.src = "flappy background1.jpg";

const ground = new Image();
ground.src = "flappy ground.jpg";

const lilithSprites = [];

const lilith1 = new Image();
lilith1.src = "lilith flappy sprite1.png";

const lilith2 = new Image();
lilith2.src = "lilith flappy sprite2.png";

lilithSprites.push(lilith1);
lilithSprites.push(lilith2);



const pipeSprites = [];

const doorFiles = [

    "flappy door1.jpg",

    "flappy door2.jpg",

    "flappy door3.jpg",

    "flappy door4.png",

    "flappy door5.png",

    "flappy door6.png",

    "flappy door7.png"

];


doorFiles.forEach(file => {

    const img = new Image();

    img.src = file;

    pipeSprites.push(img);

});


/* ====================================================== */
/*                     GAME STATE                         */
/* ====================================================== */

const STATE = {

    MENU:0,

    PLAYING:1,

    GAMEOVER:2

};

let state = STATE.MENU;


/* ====================================================== */
/*                     PLAYER                             */
/* ====================================================== */

const player = {

    x:110,

    y:300,

    width:150,

    height:150,

    velocity:0,

    gravity:0.55,

    jumpForce:-10,

    rotation:0,

    floatTimer:0

};


/* ====================================================== */
/*                    GAME DATA                           */
/* ====================================================== */

let score = 0;

let bestScore = Number(localStorage.getItem("flappyBestScore")) || 0;

let passedPipes = 0;

let coinsEarned = 0;

let gameOverShown = false;


/* ====================================================== */
/*                     INPUT                              */
/* ====================================================== */

function flap(){

    if(state === STATE.GAMEOVER){

        return;

    }

    if(state === STATE.MENU){

        state = STATE.PLAYING;

        startMessage.style.display = "none";

    }

    player.velocity = player.jumpForce;

}


canvas.addEventListener("click", flap);

document.addEventListener("keydown", e=>{

    if(e.code==="Space"){

        e.preventDefault();

        flap();

    }

});


/* ====================================================== */
/*                 UPDATE PLAYER                          */
/* ====================================================== */

function updatePlayer(){

    if(state===STATE.MENU){

        player.floatTimer += 0.05;

        player.y = 300 + Math.sin(player.floatTimer)*12;

        player.rotation = 0;

        return;

    }

    if(state!==STATE.PLAYING){

        return;

    }

    player.velocity += player.gravity;

    player.y += player.velocity;

    

}


/* ====================================================== */
/*                    DRAW PLAYER                         */
/* ====================================================== */

let wingFrame = 0;

function drawPlayer(){

    wingFrame++;

    const sprite = lilithSprites[Math.floor(wingFrame/10)%2];

    if(!sprite.complete){

        return;

    }

    ctx.save();

    ctx.translate(

        player.x + player.width/2,

        player.y + player.height/2

    );

    ctx.rotate(

        player.rotation*Math.PI/180

    );

    ctx.drawImage(

        sprite,

        -player.width/2,

        -player.height/2,

        player.width,

        player.height

    );

    ctx.restore();

}

/* ====================================================== */
/*                     PIPES                              */
/* ====================================================== */

const PIPE_WIDTH = 130;

const BASE_PIPE_GAP = 350;

const MIN_PIPE_GAP = 210;

const PIPE_DISTANCE = 380;

const BASE_PIPE_SPEED = 3;

const MAX_PIPE_SPEED = 7;

/* ====================================================== */
/*              DIFFICULTY SYSTEM                        */
/* ====================================================== */

function getDifficulty(){


    return {

        speed:Math.min(

            BASE_PIPE_SPEED + score*0.05,

            MAX_PIPE_SPEED

        ),


        gap:Math.max(

            BASE_PIPE_GAP - score*4,

            MIN_PIPE_GAP

        )

    };


}

let pipes = [];

function randomPipe(){

    return{

    x:canvas.width+100,

    gapY:150+Math.random()*200,

    gap:getDifficulty().gap,

    sprite:pipeSprites[
        Math.floor(Math.random()*pipeSprites.length)
    ],

    passed:false

};

}

pipes.push(randomPipe());

function updatePipes(){

    if(state!==STATE.PLAYING){

        return;

    }


    for(const pipe of pipes){

        pipe.x -= getDifficulty().speed;


        // score quand Lilith dépasse la porte

        if(
            !pipe.passed &&
            pipe.x + PIPE_WIDTH < player.x
        ){

            pipe.passed = true;

            score++;

passedPipes++;

earnFlappyCoin();


if(typeof unlockAchievement==="function"){


    if(score===10){

        unlockAchievement("flappy10");

    }


    if(score===50){

        unlockAchievement("flappyMaster");

    }


}

            console.log(
                "Porte passée :",
                passedPipes
            );

        }

    }


    const last = pipes[pipes.length-1];


    if(last.x < canvas.width-PIPE_DISTANCE){

        pipes.push(randomPipe());

    }


    if(pipes[0].x < -PIPE_WIDTH){

        pipes.shift();

    }

}

/* ====================================================== */
/*                  COINS SYSTEM                          */
/* ====================================================== */

function earnFlappyCoin(){

    coinsEarned += 5;


    if(typeof addCoins === "function"){

        addCoins(5);

    }


}

function drawPipes(){

    for(const pipe of pipes){

        // évite les erreurs si une image n'est pas chargée
        if(!pipe.sprite || !pipe.sprite.complete || pipe.sprite.naturalWidth === 0){

            continue;

        }


        const topHeight = pipe.gapY;

        const bottomY = pipe.gapY + pipe.gap;


        // porte du haut retournée

        ctx.save();

        ctx.translate(

            pipe.x + PIPE_WIDTH/2,

            topHeight

        );

        ctx.scale(1,-1);

        ctx.drawImage(

            pipe.sprite,

            -PIPE_WIDTH/2,

            0,

            PIPE_WIDTH,

            topHeight

        );

        ctx.restore();



        // porte du bas

        ctx.drawImage(

            pipe.sprite,

            pipe.x,

            bottomY,

            PIPE_WIDTH,

            canvas.height-bottomY-groundHeight

        );

    }

}

/* ====================================================== */
/*                     GROUND                             */
/* ====================================================== */

const groundHeight=120;

let groundOffset=0;

function drawGround(){

    if(!ground.complete){

        return;

    }

    if(state===STATE.PLAYING){

    groundOffset -= getDifficulty().speed;

}

    if(groundOffset<=-canvas.width){

        groundOffset=0;

    }

    ctx.drawImage(

        ground,

        groundOffset,

        canvas.height-groundHeight,

        canvas.width,

        groundHeight

    );

    ctx.drawImage(

        ground,

        groundOffset+canvas.width,

        canvas.height-groundHeight,

        canvas.width,

        groundHeight

    );

}

/* ====================================================== */
/*                    DRAW HUD                            */
/* ====================================================== */

function drawHUD(){

    hud.textContent = score;

}


/* ====================================================== */
/*                  DRAW BACKGROUND                       */
/* ====================================================== */

function drawBackground(){

    if(background.complete){

        ctx.drawImage(

            background,

            0,

            0,

            canvas.width,

            canvas.height

        );

    }

}

/* ====================================================== */
/*                  COLLISIONS                            */
/* ====================================================== */

function checkCollision(){

    const margin = 35;


    // plafond

    if(player.y + margin <= 0){

        return true;

    }


    // sol

    if(
        player.y + player.height - margin >=
        canvas.height-groundHeight
    ){

        return true;

    }


    for(const pipe of pipes){


        const topHeight = pipe.gapY;

        const bottomY = pipe.gapY + pipe.gap;



        const playerLeft =
        player.x + margin;


        const playerRight =
        player.x + player.width - margin;


        const playerTop =
        player.y + margin;


        const playerBottom =
        player.y + player.height - margin;



        const hitX =

        playerRight > pipe.x &&

        playerLeft < pipe.x + PIPE_WIDTH;



        const hitY =

        playerTop < topHeight ||

        playerBottom > bottomY;



        if(hitX && hitY){

            return true;

        }

    }


    return false;

}

/* ====================================================== */
/*                  GAME OVER SCREEN                      */
/* ====================================================== */

function showGameOver(){


    if(gameOverShown){

        return;

    }


    gameOverShown = true;



    if(score > bestScore){


        bestScore = score;


        localStorage.setItem(

            "flappyBestScore",

            bestScore

        );


    }



    const screen = document.createElement("div");


    screen.id="flappyGameOver";


    screen.innerHTML = `

        <h1>💀 LILITH LOST</h1>

        <h2>Score : ${score}</h2>

        <h2>🏆 Best : ${bestScore}</h2>

        <h2>🪙 Coins : +${coinsEarned}</h2>


        <button id="restartFlappy">

            🔄 Rejouer

        </button>

    `;



    document.body.appendChild(screen);



    document
    .getElementById("restartFlappy")
    .onclick=function(){

        location.reload();

    };


}

/* ====================================================== */
/*                     LOOP                               */
/* ====================================================== */

function update(){

    updatePlayer();

    updatePipes();


    if(state===STATE.PLAYING){

        if(checkCollision()){

    state = STATE.GAMEOVER;

    showGameOver();

}

    }

}


function draw(){

    drawBackground();

drawPipes();

drawPlayer();

drawGround();

drawHUD();

}


function gameLoop(){

    update();

    draw();

    requestAnimationFrame(gameLoop);

}


gameLoop();

})();