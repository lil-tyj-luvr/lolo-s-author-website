// ==========================================================
//              LENA WEBSITE - OFFLINE GAME
// ==========================================================


const player = document.getElementById("player");
const obstacle = document.getElementById("obstacle");
const coin = document.getElementById("coin");

const scoreDisplay = document.getElementById("score");
const bestDisplay = document.getElementById("bestScore");
const gameCoinsDisplay = document.getElementById("gameCoins");
const coinPopup = document.getElementById("coinPopup");

setInterval(function(){


    playTime++;



    if(playTime >= 300){

        if(typeof unlockAchievement==="function"){

            unlockAchievement("touchGrass");

        }

    }


},1000);




// ==========================================================
// SCORE
// ==========================================================


let score = 0;


let bestScore =
Number(localStorage.getItem("offlineBest")) || 0;


if(bestDisplay){

    bestDisplay.innerHTML = bestScore;

}





// ==========================================================
// COINS
// ==========================================================


let collectedCoins = 0;





// ==========================================================
// SAUT
// ==========================================================


let playerY = 20;

let velocity = 0;

let spacePressed = false;


const gravity = 0.8;

const jumpPower = 14;



document.addEventListener(
"keydown",
function(e){


    if(e.code === "Space"){


        e.preventDefault();


        spacePressed = true;



        if(playerY <= 20){


            velocity = jumpPower;


        }


    }


});





document.addEventListener(
"keyup",
function(e){


    if(e.code === "Space"){


        spacePressed = false;


    }


});





setInterval(function(){



    velocity -= gravity;


    playerY += velocity;



    if(playerY <= 20){


        playerY = 20;

        velocity = 0;


    }



    player.style.bottom =
    playerY + "px";



},20);








// ==========================================================
// OBSTACLES
// ==========================================================


const obstacles=[


"LIAM",

"LISA",

"HAYLEY",

"KAEL",

"🔪 KNIFE",

"🧠 BRAIN",

"⚖️ JUSTICE",

"🚁 HELICOPTER"


];



let obstacleX = -200;



function spawnObstacle(){



    let type =
    obstacles[
        Math.floor(
            Math.random()*obstacles.length
        )
    ];



    obstacle.innerHTML = type;



    if(type === "🚁 HELICOPTER"){


        obstacle.style.bottom="160px";


    }

    else{


        obstacle.style.bottom="20px";


    }



    obstacleX = -100;


}





spawnObstacle();





setInterval(function(){



    obstacleX += 10;



    obstacle.style.right =
    obstacleX + "px";



    if(obstacleX > window.innerWidth + 100){


        score++;

        if(score >= 1000){

    if(typeof unlockAchievement==="function"){

        unlockAchievement("stillHere");

    }

}


        if(scoreDisplay){

            scoreDisplay.innerHTML=score;

        }



        if(score > bestScore){

            if(typeof unlockAchievement==="function"){

    unlockAchievement("internetOverrated");

}


            bestScore = score;


            localStorage.setItem(
                "offlineBest",
                bestScore
            );


            if(bestDisplay){

                bestDisplay.innerHTML=bestScore;

            }


        }



        spawnObstacle();


    }



    checkObstacleCollision();



},30);







function checkObstacleCollision(){


    let p =
    player.getBoundingClientRect();


    let o =
    obstacle.getBoundingClientRect();




    if(

        p.left < o.right &&

        p.right > o.left &&

        p.top < o.bottom &&

        p.bottom > o.top

    ){


        gameOver();


    }



}








// ==========================================================
// COINS
// ==========================================================


let coinX = -300;



function spawnCoin(){


    coinX=-100;


    coin.style.bottom="20px";


}



spawnCoin();






setInterval(function(){



    coinX += 8;



    coin.style.right =
    coinX+"px";



    if(coinX > window.innerWidth + 100){


        spawnCoin();


    }



    checkCoinCollision();



},30);








function checkCoinCollision(){



    let p =
    player.getBoundingClientRect();


    let c =
    coin.getBoundingClientRect();




    if(

        p.left < c.right &&

        p.right > c.left &&

        p.top < c.bottom &&

        p.bottom > c.top

    ){



        collectedCoins += 10;



        if(gameCoinsDisplay){

            gameCoinsDisplay.innerHTML =
            collectedCoins;

        }



        if(typeof addCoins === "function"){


            addCoins(10);


        }



        showCoinPopup();



        spawnCoin();



    }


}







function showCoinPopup(){


    if(!coinPopup){

        return;

    }



    coinPopup.style.display="block";


    coinPopup.innerHTML="+10";


    coinPopup.style.left="100px";


    coinPopup.style.bottom="100px";



    setTimeout(function(){


        coinPopup.style.display="none";


    },700);


}







// ==========================================================
// GAME OVER
// ==========================================================


function gameOver(){



    const screen =
    document.createElement("div");



    screen.id="gameOverScreen";



    screen.innerHTML = `

    <h1>💀 LILITH LOST</h1>

    <h2>Score: ${score}</h2>

    <h2>🏆 Best: ${bestScore}</h2>

    <h2>🪙 Coins found: ${collectedCoins}</h2>


    <button onclick="location.reload()">
    🔄 Try again
    </button>

    `;



    document.body.appendChild(screen);



}