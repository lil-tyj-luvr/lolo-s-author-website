// ==========================================================
//              LENA WEBSITE - BUTTERFLY HUNTER
// ==========================================================



let butterflyCount = Number(
    localStorage.getItem("butterflies")
);

window.addEventListener("load", function(){

    updateButterflies();

});
function updateButterflies(){

    const displays = document.querySelectorAll("#butterflies");

    displays.forEach(function(display){

        display.textContent = "🦋 " + butterflyCount;

    });

}

if(isNaN(butterflyCount)){

    butterflyCount = 0;

}



// couleurs possibles

const butterflyColors = [

"pink",
"purple",
"blue",
"yellow",
"orange",
"red",
"green"

];





// créer un papillon

function createButterfly(){



    const butterfly = document.createElement("div");


    butterfly.className="butterfly";


    butterfly.innerHTML="🦋";



    // couleur aléatoire

    butterfly.style.filter =
    "hue-rotate("+
    (Math.random()*360)
    +"deg)";



    // position de départ

    butterfly.style.left =
    Math.random()*window.innerWidth
    +"px";


    butterfly.style.top =
    Math.random()*window.innerHeight
    +"px";



    // direction de vol

    butterfly.style.setProperty(

        "--x",

        (Math.random()*600-300)+"px"

    );


    butterfly.style.setProperty(

        "--y",

        (Math.random()*600-300)+"px"

    );



    // durée

    butterfly.style.animationDuration =
    (10+Math.random()*10)+"s";




    document.body.appendChild(butterfly);




    // cliquer dessus

    butterfly.onclick=function(){


        butterflyCount++;

localStorage.setItem(
    "butterflies",
    butterflyCount
);

updateButterflies();


        showButterflyPopup(
            "+1 🦋"
        );



        butterfly.remove();



        if(butterflyCount>=10){

            if(typeof unlockAchievement==="function"){

                unlockAchievement("butterfly");

            }

        }


    };




    // suppression quand il part

    setTimeout(function(){


        if(document.body.contains(butterfly)){

            butterfly.remove();

        }


    },20000);



}






// popup +1

function showButterflyPopup(text){


    const popup=document.createElement("div");


    popup.className="butterflyPopup";


    popup.innerHTML=text;



    popup.style.left =
    event.clientX+"px";


    popup.style.top =
    event.clientY+"px";



    document.body.appendChild(popup);



    setTimeout(function(){

        popup.remove();

    },1000);



}







// apparition aléatoire


setInterval(function(){

    if(document.querySelectorAll(".butterfly").length < 1){

        createButterfly();

    }

},60000);