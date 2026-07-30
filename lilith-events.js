// ==========================================================
// LILITH RANDOM EVENTS
// ==========================================================


// Empêche Lilith de spammer
let lilithEventCooldown = false;


// ==========================================================
// APPARITION SPONTANÉE
// ==========================================================


function lilithAppear(text){


    if(lilithEventCooldown){

        return;

    }


    lilithEventCooldown = true;



    // Elle parle

    lilithSay(text);



    // Elle repart après un moment

    setTimeout(function(){


        const bubble =
        document.getElementById("lilithBubble");


        if(bubble){

            bubble.classList.remove("show");

        }



    },7000);



    // cooldown global

    setTimeout(function(){


        lilithEventCooldown=false;


    },60000);



}





// ==========================================================
// PHRASES RANDOM
// ==========================================================


const lilithRandomEvents=[


    "Oh. It's you.",


    "I was hoping you'd stay offline.",


    "Welcome back.",


    "What did you break this time?",


    "You're still here?",


    "You again.",


    "...",


    "Do you think ghosts pay taxes?",


    "I wasn't talking to you.",


    "Forget I said anything.",


    "Silence is underrated.",


    "I've seen worse decisions.",


    "Everything eventually breaks.",


    "Interesting.",


    "You're making this more complicated than necessary."

];





// ==========================================================
// CHANCE ALEATOIRE
// ==========================================================


// Toutes les 3 minutes environ


setInterval(function(){


    const chance=Math.random();



    // 15% de chance

    if(chance < 0.15){



        const phrase =

        lilithRandomEvents[

            Math.floor(
                Math.random()*lilithRandomEvents.length
            )

        ];



        lilithAppear(phrase);



    }


},180000);






// ==========================================================
// APPARITIONS AU CHARGEMENT
// ==========================================================


// 20% de chance après 30 secondes


setTimeout(function(){


    if(Math.random()<0.2){


        lilithAppear(

            "Oh. You actually came back."

        );


    }


},30000);
