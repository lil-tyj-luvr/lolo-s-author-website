// ==========================================================
//                LENA WEBSITE - SLOT MACHINE
// ==========================================================


// ----------------------------------------------------
// Éléments
// ----------------------------------------------------

const reel1 = document.getElementById("reel1");
const reel2 = document.getElementById("reel2");
const reel3 = document.getElementById("reel3");

const spinButton = document.getElementById("spinButton");
const slotResult = document.getElementById("slotResult");


// ----------------------------------------------------
// Symboles
// ----------------------------------------------------

const symbols = [

    "🍒",
    "🍋",
    "🍉",
    "⭐",
    "🔔",
    "💎"

];




// ----------------------------------------------------
// Animation d'un rouleau
// ----------------------------------------------------

function spinReel(reel,duration,finalSymbol){


    const interval = setInterval(function(){

        const random =
        symbols[Math.floor(Math.random()*symbols.length)];

        reel.textContent = random;

    },80);



    setTimeout(function(){

        clearInterval(interval);

        reel.textContent = finalSymbol;

    },duration);


}




// ----------------------------------------------------
// Jouer
// ----------------------------------------------------

function playSlots(){


    if(coins < 10){

        alert("You don't have enough coins!");

        return;

    }


    removeCoins(10);


    spinButton.disabled = true;

    slotResult.innerHTML = "";



    // 1 chance sur 9

    const win =
    Math.random() < (1/9);



    let final1;
    let final2;
    let final3;



    if(win){

        const jackpot =
        symbols[Math.floor(Math.random()*symbols.length)];

        final1 = jackpot;
        final2 = jackpot;
        final3 = jackpot;

    }

    else{

        final1 =
        symbols[Math.floor(Math.random()*symbols.length)];

        final2 =
        symbols[Math.floor(Math.random()*symbols.length)];

        final3 =
        symbols[Math.floor(Math.random()*symbols.length)];


        // éviter un faux jackpot

        while(
            final1===final2 &&
            final2===final3
        ){

            final3 =
            symbols[Math.floor(Math.random()*symbols.length)];

        }

    }




    // ----------------------------------------------------
    // Animation
    // ----------------------------------------------------

    spinReel(reel1,1200,final1);

    spinReel(reel2,1700,final2);

    spinReel(reel3,2200,final3);




    // ----------------------------------------------------
    // Résultat
    // ----------------------------------------------------

    setTimeout(function(){


        if(win){

            addCoins(100);

            slotResult.innerHTML =
            "🎉 JACKPOT!<br><br>+100 🪙";

        }

        else{

            slotResult.innerHTML =
            "💀 You lost 10 🪙";

        }



        spinButton.disabled = false;


    },2300);



}




// ----------------------------------------------------
// Bouton
// ----------------------------------------------------

if(spinButton){

    spinButton.onclick = playSlots;

}