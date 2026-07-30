// ==========================================================
//                  ALICE'S CAT
//                  PARTIE 1
// ==========================================================



// ==========================================================
// SAUVEGARDE
// ==========================================================

let catData =
JSON.parse(
localStorage.getItem("catData")
);



if(!catData){

    catData={};

}

// ==========================================================
// INITIALISATION FOOD
// ==========================================================

if(!catData.ownedFood){

    catData.ownedFood={};

}


if(!catData.ownedFood.fish){

    catData.ownedFood.fish=0;

}


if(!catData.ownedFood.snack){

    catData.ownedFood.snack=0;

}


saveCat();



// ---------- Migration ----------

catData.affection ??= 0;
catData.hunger ??= 100;
catData.mood ??= "happy";

catData.pets ??= 0;

catData.x ??= 50;
catData.direction ??= -1;

catData.sprite ??= "alice-cat.png";

catData.hat ??= null;

catData.ownedFood ??= {};

catData.feedCount ??= 0;
catData.petCount ??= 0;
catData.catCoinsSpent ??= 0;


// CONVERSION ANCIEN SYSTEME FOOD

if(Array.isArray(catData.ownedFood)){

    let oldFood =
    catData.ownedFood;


    catData.ownedFood={};


    oldFood.forEach(function(food){

        if(!catData.ownedFood[food]){

            catData.ownedFood[food]=0;

        }


        catData.ownedFood[food]++;

    });


    saveCat();

}
catData.ownedFood.fish ??= 0;
catData.ownedFood.snack ??= 0;
catData.usedHats ??= [];

catData.usedSkins ??= [];

catData.ownedHats ??= [];

catData.ownedSkins ??= [];
catData.currentSkin ??= "default";

if(!catData.ownedSkins.includes("default")){

    catData.ownedSkins.push("default");

}



saveCat();





function saveCat(){

    localStorage.setItem(

        "catData",

        JSON.stringify(catData)

    );

}





// ==========================================================
// CREATION DU CHAT
// ==========================================================

const cat =
document.createElement("div");

cat.id="aliceCat";



cat.innerHTML=`

<img

id="catHat"

src=""

>

<img

id="catSprite"

src="${catData.sprite}"

draggable="false"

>

`;



document.body.appendChild(cat);





// ==========================================================
// AFFICHAGE DU SPRITE
// ==========================================================

function updateCatSprite(){


    const sprite =

    document.getElementById("catSprite");



    if(!sprite){

        return;

    }



    sprite.src =

    catData.sprite;

}



updateCatSprite();





// ==========================================================
// CHAPEAU
// ==========================================================

function updateCatHat(){


    const hat =

    document.getElementById("catHat");



    if(!hat){

        return;

    }



    if(

        !catData.hat

        ||

        typeof catItems==="undefined"

        ||

        !catItems.hats

        ||

        !catItems.hats[catData.hat]

    ){

        hat.style.display="none";

        return;

    }



    hat.style.display="block";



    hat.src=

    catItems

    .hats

    [catData.hat]

    .image;

}



updateCatHat();





// ==========================================================
// POSITION INITIALE
// ==========================================================

cat.style.left =

catData.x + "%";



cat.style.bottom =

"20px";





// ==========================================================
// DEBUG
// ==========================================================

window.catData = catData;
window.saveCat = saveCat;
window.updateCatSprite = updateCatSprite;
window.updateCatHat = updateCatHat;
window.cat = cat;

// ==========================================================
// DEPLACEMENT
// ==========================================================

let catX = catData.x;

let direction = catData.direction;

let catState = "walking"; // walking | idle | sleeping

function updateCatDirection(){

    const sprite =
    document.getElementById("catSprite");


    const hat =
    document.getElementById("catHat");



    if(!sprite){

        return;

    }



    if(direction===1){

        sprite.style.transform="scaleX(-1)";


        if(hat){

            hat.style.left="auto";
            hat.style.right="2px";

        }

    }

    else{

        sprite.style.transform="scaleX(1)";


        if(hat){

            hat.style.right="auto";
            hat.style.left="2px";

        }

    }

}
updateCatDirection();
function moveCat(){

    if(catState!=="walking"){

        return;

    }

    catX += direction * 0.15;

    if(catX>=92){

        direction=-1;

        updateCatDirection();

    }

    if(catX<=2){

        direction=1;

        updateCatDirection();

    }

    cat.style.left=
    catX+"%";

    catData.x=catX;

    catData.direction=direction;

}
setInterval(function(){

    moveCat();

    saveCat();

},30);
function catIdle(){

    if(catState!=="walking"){

        return;

    }

    catState="idle";

    setTimeout(function(){

        catState="walking";

    },2500);

}
setInterval(function(){

    if(Math.random()<0.35){

        catIdle();

    }

},15000);
function catSleep(){

    if(catState!=="walking"){

        return;

    }

    catState="sleeping";

    catData.mood="sleeping";

    saveCat();

    cat.style.opacity="0.8";

    setTimeout(function(){

        cat.style.opacity="1";

        catState="walking";

        catData.mood="happy";

        saveCat();

    },6000);

}
setInterval(function(){

    if(Math.random()<0.15){

        catSleep();

    }

},60000);
// ==========================================================
// MESSAGES
// ==========================================================

const catMessages=[

    "🐈 *purr...*",

    "🐈 *meow!*",

    "🐈 He seems happy.",

    "🐈 Alice definitely feeds me better.",

    "🐈 +1 trust",

    "🐈 *slow blink*",

    "🐈 He rubs against your hand.",

    "🐈 The cat accepts your existence."

];
function showCatMessage(text){

    const oldBubble = document.querySelector(".catBubble");

    if(oldBubble){

        oldBubble.remove();

    }



    const bubble =
    document.createElement("div");

    bubble.className = "catBubble";

    bubble.innerHTML = text;

    document.body.appendChild(bubble);



    setTimeout(function(){

        bubble.classList.add("show");

    },20);



    setTimeout(function(){

        bubble.classList.remove("show");



        setTimeout(function(){

            bubble.remove();

        },200);

    },2200);

}
// ==========================================================
// CARESSE
// ==========================================================

cat.addEventListener("click",function(){

    if(catState==="sleeping"){

        showCatMessage(
            "😴 Shhh... he's sleeping."
        );

        return;

    }



    cat.classList.add("pet");



    setTimeout(function(){

        cat.classList.remove("pet");

    },150);



    catData.affection = Math.min(
    100,
    catData.affection+0,25
);

    catData.pets++;
catData.petCount++;

if(catData.petCount>=100){

    unlockAchievement("gentleHands");

}

    saveCat();



    const message=

    catMessages[
        Math.floor(
            Math.random()*catMessages.length
        )
    ];



    showCatMessage(message);

});
// ==========================================================
// POPUP
// ==========================================================

const overlay =
document.createElement("div");

overlay.id="catOverlay";

overlay.innerHTML=`

<div id="catMenu">

    <div id="catHeader">

        <h1>🐈 Alice's Cat</h1>

        <button id="closeCatMenu">

            ✕

        </button>

    </div>



    <div id="catContent">

        <h2>Welcome! Interact with Alice's cat!!!</h2>

    </div>

    <div id="catStats"></div>

</div>

`;

document.body.appendChild(overlay);
function openCatMenu(){

    refreshCatMenu();

overlay.classList.add("show");

}



function closeCatMenu(){

    overlay.classList.remove("show");

}
document.addEventListener("contextmenu",function(e){

    const clickedCat = e.target.closest("#aliceCat");


    if(clickedCat){

        e.preventDefault();

        openCatMenu();

    }

});



document

.getElementById("closeCatMenu")

.addEventListener("click",closeCatMenu);



overlay.addEventListener("click",function(e){

    if(e.target===overlay){

        closeCatMenu();

    }

});
document.addEventListener("keydown",function(e){

    if(e.key==="Escape"){

        closeCatMenu();

    }

});
// ==========================================================
// STATS
// ==========================================================

function updateCatMood(){

    if(catData.hunger<=15){

        catData.mood="starving";

    }

    else if(catData.hunger<=35){

        catData.mood="hungry";

    }

    else if(catData.affection>=75){

        catData.mood="loving";

    }

    if(catData.affection>=100){

    unlockAchievement("bestfriends");

}

    else if(catState==="sleeping"){

        catData.mood="sleeping";

    }

    else{

        catData.mood="happy";

    }

}
setInterval(function(){

    if(catData.hunger>0){

        catData.hunger--;

    }

    updateCatMood();

    saveCat();

    refreshCatMenu();

},60000);
function refreshCatMenu(){

    const stats =
    document.getElementById("catStats");


    if(!stats){

        return;

    }




    let mood="😊 Happy";



    switch(catData.mood){


        case "sleeping":

            mood="😴 Sleeping";

        break;


        case "hungry":

            mood="🥺 Hungry";

        break;


        case "starving":

            mood="😿 Starving";

        break;


        case "loving":

            mood="❤️ Loves you";

        break;


    }



    stats.innerHTML=`

<div id="catStatsGrid">


    <div class="catCard">

        <h2>📊 Statistics</h2>

        <p>
        <b>❤️ Affection</b><br>
        ${Math.round(catData.affection)}/100
        </p>


        <p>
        <b>🍗 Hunger</b><br>
        ${catData.hunger}/100
        </p>


        <p>
        <b>😊 Mood</b><br>
        ${mood}
        </p>


    </div>



    <div class="catCard">

        <h2>🍖 Food</h2>

        <div id="catFoodList"></div>

    </div>



    <div class="catCard">

        <h2>🎩 Hats</h2>

        <div id="catHatList"></div>

    </div>



    <div class="catCard">

        <h2>✨ Skins</h2>

        <div id="catSkinList"></div>

    </div>


</div>

`;

console.log("REFRESH POPUP OK");
console.log(catData);

console.log("FOOD DATA :", catData.ownedFood);
console.log("HATS DATA :", catData.ownedHats);
console.log("SKINS DATA :", catData.ownedSkins);

// ======================
// FOOD
// ======================


const foodList =
document.getElementById("catFoodList");



Object.keys(catData.ownedFood)
.forEach(function(food){


    const quantity =
    catData.ownedFood[food];


    if(quantity <= 0){

        return;

    }



    const card =
    document.createElement("div");


    card.className =
    "catInventoryCard";



    card.innerHTML=`

<h3> ${food}</h3>

<p>
x${quantity}
</p>


<button onclick="feedCat('${food}')">

Feed

</button>

`;



    foodList.appendChild(card);



});






// ======================
// HATS
// ======================

const hatList =
document.getElementById("catHatList");


hatList.innerHTML="";

const noHat =
document.createElement("div");


noHat.className =
"catInventoryCard";


noHat.innerHTML=`

<h3>🚫 No hat</h3>

<button onclick="removeCatHat()">

Remove

</button>

`;


hatList.appendChild(noHat);


catData.ownedHats.forEach(function(hat){


    if(!catItems.hats[hat]){

        return;

    }



    const card =
    document.createElement("div");


    card.className =
    "catInventoryCard";


    card.innerHTML=`

<h3>🎩 ${catItems.hats[hat].name}</h3>


<button onclick="equipCatHat('${hat}')">

Equip

</button>

`;


    hatList.appendChild(card);


});

// ======================
// SKINS
// ======================


const skinList =
document.getElementById("catSkinList");


skinList.innerHTML="";


catData.ownedSkins.forEach(function(skin){


    if(!catItems.skins[skin]){

        return;

    }



    const card =
    document.createElement("div");


    card.className =
    "catInventoryCard";


    card.innerHTML=`

<h3>✨ ${catItems.skins[skin].name}</h3>


<button onclick="console.log('CLICK SKIN:', '${skin}'); equipCatSkin('${skin}')">

Equip

</button>

`;


    skinList.appendChild(card);


});}
// ==========================================================
// EQUIP HAT
// ==========================================================

// ==========================================================
// EQUIP HAT
// ==========================================================

function equipCatHat(id){


    if(catData.currentSkin !== "default"){


        showCatMessage(
            "✨ This skin cannot wear hats."
        );


        return;

    }



    if(!catData.ownedHats.includes(id)){

        return;

    }



    catData.hat=id;



    if(!catData.usedHats.includes(id)){


        catData.usedHats.push(id);


        catData.affection=Math.min(

            100,

            catData.affection+3

        );

    }



    saveCat();


    updateCatHat();


    refreshCatMenu();


    showCatMessage(
        "🎩 Looking fancy!"
    );


}





// ==========================================================
// EQUIP SKIN
// ==========================================================

function equipCatSkin(id){

    console.log("EQUIP SKIN FUNCTION CALLED WITH:", id);


    if(!catData.ownedSkins.includes(id)){

        return;

    }



    if(id==="default"){


        catData.sprite="alice-cat.png";

        catData.currentSkin="default";


    }

    else{


        if(!catItems.skins[id]){

            return;

        }


        catData.sprite =
        catItems.skins[id].image;


        catData.currentSkin=id;

        console.log("CURRENT SKIN AFTER CHANGE:", catData.currentSkin);


    }



    catData.hat=null;

    updateCatHat();



    if(!catData.usedSkins.includes(id)){


        catData.usedSkins.push(id);


        catData.affection=Math.min(

            100,

            catData.affection+5

        );

    }



    saveCat();


    updateCatSprite();


    refreshCatMenu();


    showCatMessage(
        "✨ New look!"
    );


}
// ==========================================================
// NOURRIR LE CHAT
// ==========================================================

function feedCat(food){


    if(!catData.ownedFood[food]){

        return;

    }

    if(catData.hunger>=100){

    showCatMessage(
        "🐈 lil bro can't eat anymore."
    );

    return;

}


    if(catData.ownedFood[food]<=0){

        return;

    }



    catData.ownedFood[food]--;

    catData.feedCount++;

if(catData.feedCount>=1){

    unlockAchievement("firstMeal");

}

if(catData.feedCount>=50){

    unlockAchievement("bottomless");

}



    // la faim remonte

    catData.hunger = Math.min(

        100,

        catData.hunger + 25

    );



    // petit bonus affection

    catData.affection = Math.min(

        100,

        catData.affection + 0.5

    );



    updateCatMood();


    saveCat();


    refreshCatMenu();



    const messages=[

        "🐈 *nom nom*",

        "🐈 Delicious!",

        "🐈 He seems happier.",

        "🐈 Best meal ever."

    ];



    showCatMessage(

        messages[

            Math.floor(Math.random()*messages.length)

        ]

    );

}
function removeCatHat(){

    catData.hat = null;

    saveCat();

    updateCatHat();

    refreshCatMenu();

    showCatMessage(
        "🐈 Hat removed!"
    );

}