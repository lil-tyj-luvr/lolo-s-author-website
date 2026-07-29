// ==========================================================
//                LENA WEBSITE - ROULETTE
// ==========================================================


// ----------------------------------------------------
// Boutons
// ----------------------------------------------------

const redButton = document.getElementById("red");
const blackButton = document.getElementById("black");
const greenButton = document.getElementById("green");

const result = document.getElementById("rouletteResult");
const betInput = document.getElementById("bet");

const wheel = document.getElementById("wheel");




// ----------------------------------------------------
// Sauvegarde casino
// ----------------------------------------------------

let losses = Number(localStorage.getItem("casinoLosses"));

if(isNaN(losses)){

    losses = 0;

}


let winStreak = Number(localStorage.getItem("winStreak"));

if(isNaN(winStreak)){

    winStreak = 0;

}




// ----------------------------------------------------
// Cases rouges
// ----------------------------------------------------

const redNumbers = [

1,3,5,7,9,

12,14,16,18,

19,21,23,25,27,

30,32,34,36

];




// ----------------------------------------------------
// Récupérer les cases de la roue
// ----------------------------------------------------

const slots = document.querySelectorAll(".slot");




// ----------------------------------------------------
// Placement des ronds
// ----------------------------------------------------

const radius = 105;


slots.forEach(function(slot,index){


    const angle =
(360 / slots.length) * index - 90;


    const rad =
    angle * Math.PI / 180;


    const x =
    Math.cos(rad) * radius;


    const y =
    Math.sin(rad) * radius;



    slot.style.left =
    (130 + x - 15) + "px";


    slot.style.top =
    (130 + y - 15) + "px";


});




// ----------------------------------------------------
// Jouer
// ----------------------------------------------------

function play(choice){


    let bet = Number(betInput.value);



    if(isNaN(bet) || bet <= 0){

        return;

    }



    if(bet > coins){

        alert("You don't have enough coins!");

        return;

    }




    const allIn = (bet === coins);



    removeCoins(bet);





    // ------------------------------------------------
    // Tirage du résultat AVANT animation
    // ------------------------------------------------


    // Choisir une vraie case de la roue

// Choisir une case aléatoire

let targetIndex = Math.floor(Math.random()*slots.length);


// Couleur de la case choisie

let color;

if(slots[targetIndex].classList.contains("red")){

    color="red";

}

else if(slots[targetIndex].classList.contains("black")){

    color="black";

}

else{

    color="green";

}


// faux numéro uniquement pour l'affichage

let number = targetIndex;



   // ------------------------------------------------
// Faire tourner la roue
// ------------------------------------------------


// angle entre chaque case

// ------------------------------------------------
// Faire tourner la roue
// ------------------------------------------------

const anglePerSlot = 360 / slots.length;


// rotation actuelle

let currentRotation = Number(
    wheel.dataset.rotation || 0
);


// IMPORTANT : on remet l'angle choisi face à la flèche

let targetRotation =
-(targetIndex * anglePerSlot);


let finalRotation =
currentRotation + 1800 + targetRotation;


wheel.dataset.rotation = finalRotation;


wheel.style.transition =
"transform 3s cubic-bezier(.17,.9,.2,1)";


wheel.style.transform =
"rotate(" + finalRotation + "deg)";

    // ------------------------------------------------
    // Résultat après animation
    // ------------------------------------------------


    setTimeout(function(){



        if(color==="red"){


            result.innerHTML =
            "🔴 "+number+" RED";


        }

        else if(color==="black"){


            result.innerHTML =
            "⚫ "+number+" BLACK";


        }

        else{


            result.innerHTML =
            "🟢 0 GREEN";


        }





        // ------------------------------------------------
        // Gains
        // ------------------------------------------------


        if(choice === color){



            if(color === "green"){



                addCoins(bet*36);



                result.innerHTML +=

                "<br><br>🎉 JACKPOT! You won "
                +(bet*35)+
                " coins!";



            }


            else{



                addCoins(bet*2);



                result.innerHTML +=

                "<br><br>🎉 You won "
                +bet+
                " coins!";



            }




            winStreak++;


            localStorage.setItem(
                "winStreak",
                winStreak
            );



        }




        else{



            losses += bet;



            localStorage.setItem(
                "casinoLosses",
                losses
            );



            winStreak = 0;



            localStorage.setItem(
                "winStreak",
                0
            );



            result.innerHTML +=

            "<br><br>💀 You lost "
            +bet+
            " coins.";



        }






        // ------------------------------------------------
        // Achievements
        // ------------------------------------------------


        if(losses >= 1000000){

            unlockAchievement("casino");

        }



        if(winStreak >= 5){

            unlockAchievement("lucky");

        }



        if(allIn){

            unlockAchievement("allin");

        }




    },3000);



}







// ----------------------------------------------------
// Boutons
// ----------------------------------------------------


if(redButton){


    redButton.onclick=function(){


        play("red");


    }


}



if(blackButton){


    blackButton.onclick=function(){


        play("black");


    }


}



if(greenButton){


    greenButton.onclick=function(){


        play("green");


    }


}

function allIn(){

    document.getElementById("bet").value = coins;

    localStorage.setItem("lastAllIn", "true");

}