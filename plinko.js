// =====================================================
//                      PLINKO GAME
// =====================================================


const canvas = document.getElementById("plinkoCanvas");
const ctx = canvas.getContext("2d");


const dropButton = document.getElementById("dropBall");
const betInput = document.getElementById("plinkoBet");
const resultText = document.getElementById("plinkoResult");



const WIDTH = canvas.width;
const HEIGHT = canvas.height;



// =====================================================
// PARAMETRES
// =====================================================


const gravity = 0.22;


const pegRadius = 7;


const rows = 12;


const pegSpacingX = 65;

const pegSpacingY = 45;



const multipliers = [

    20,
    10,
    5,
    3,
    2,
    1,
    0.5,
    0.25,
    0.1,
    0.25,
    0.5,
    1,
    2,
    3,
    5,
    10,
    20

];





let balls = [];

let pegs = [];




// =====================================================
// CREATION DES CLOUS
// =====================================================


for(let row = 0; row < rows; row++){


    for(let col = 0; col <= row; col++){



        pegs.push({


            x:
            WIDTH/2
            -
            (row * pegSpacingX)/2
            +
            col * pegSpacingX,


            y:
            80
            +
            row * pegSpacingY


        });



    }

}






// =====================================================
// DROP D'UNE BILLE
// =====================================================


dropButton.onclick = function(){



    let bet = Number(betInput.value);



    if(bet <= 0)
        return;



    if(typeof coins !== "undefined"){



        if(coins < bet){


            resultText.innerHTML =
            "❌ Not enough coins";


            return;

        }



        coins -= bet;

        updateCoins();


    }






    balls.push({



        // départ au sommet

        x:
        WIDTH/2
        +
        (Math.random()-0.5)*40,


        y:30,



        radius:10,



        // direction de départ aléatoire

        vx:
        (Math.random()-0.5)*2,


        vy:0,



        bet:bet,



        finished:false



    });



};









// =====================================================
// PHYSIQUE
// =====================================================


function updateBalls(){



    balls.forEach(ball=>{



        if(ball.finished)
            return;



        ball.vy += gravity;



        ball.x += ball.vx;

        ball.y += ball.vy;






        // collisions avec les clous


        pegs.forEach(peg=>{


            let dx =
            ball.x - peg.x;


            let dy =
            ball.y - peg.y;



            let distance =
            Math.sqrt(
                dx*dx +
                dy*dy
            );




            if(distance < ball.radius + pegRadius){



                let angle =
                Math.atan2(
                    dy,
                    dx
                );



                let force = 3;



                ball.vx =
                Math.cos(angle)
                *
                force;



                ball.vy =
                Math.sin(angle)
                *
                force;



                // petit hasard pour éviter les trajectoires identiques

                ball.vx +=
                (Math.random()-0.5);



            }




        });






        // limites gauche droite


        if(ball.x < 20){

            ball.x=20;

            ball.vx *= -1;

        }



        if(ball.x > WIDTH-20){


            ball.x=WIDTH-20;

            ball.vx *= -1;

        }






        // arrivée en bas


        if(ball.y > HEIGHT-40){


            finishBall(ball);


        }




    });



}









// =====================================================
// FIN DE BILLE
// =====================================================


function finishBall(ball){



    ball.finished=true;



    let slotWidth =
    WIDTH / multipliers.length;




    let slot =
    Math.floor(
        ball.x / slotWidth
    );



    if(slot < 0)
        slot=0;



    if(slot >= multipliers.length)
        slot =
        multipliers.length-1;




    let multiplier =
    multipliers[slot];



    let win =
    Math.floor(
        ball.bet * multiplier
    );





    if(typeof coins !== "undefined"){


        coins += win;


        updateCoins();


    }





    resultText.innerHTML =

    "🎱 x"
    +
    multiplier
    +
    " → +"
    +
    win
    +
    " coins";



}









// =====================================================
// DESSIN
// =====================================================


function draw(){



    ctx.clearRect(
        0,
        0,
        WIDTH,
        HEIGHT
    );





    // clous


    ctx.fillStyle="white";



    pegs.forEach(peg=>{



        ctx.beginPath();



        ctx.arc(

            peg.x,

            peg.y,

            pegRadius,

            0,

            Math.PI*2

        );



        ctx.fill();



    });







    // billes


    balls.forEach(ball=>{



        if(ball.finished)
            return;



        ctx.beginPath();



        ctx.fillStyle="#ff3333";



        ctx.shadowColor="#ff0000";

        ctx.shadowBlur=15;



        ctx.arc(

            ball.x,

            ball.y,

            ball.radius,

            0,

            Math.PI*2

        );



        ctx.fill();



        ctx.shadowBlur=0;



    });



}









// =====================================================
// BOUCLE
// =====================================================


function gameLoop(){



    updateBalls();


    draw();



    requestAnimationFrame(gameLoop);



}



gameLoop();