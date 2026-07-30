// ==========================================================
//             ACHIEVEMENTS SYSTEM
// ==========================================================


// -------------------------------
// Liste des achievements
// -------------------------------

const achievementNames = {

    // lore

    finished_toabc:{
        icon:"📖",
        title:"Finished Tales of a Broken Crown!",
        description:"You're a real one :3"
    },

    // butterflies

    butterfly:{
        icon:"🦋",
        title:"Butterfly Hunter",
        description:"Found 10 hidden butterfly (you've got good eyes) Better than mine at least #glassesteam"
    },

    butterfly2:{
        icon:"🦋",
        title:"Butterfly Hunter pro",
        description:"Found 50 hidden butterflies. That's a hell of a lot, where do you put them??? (don't tell me in your stomach—)"
    },

    butterfly3:{
        icon:"🦋",
        title:"Butterfly Hunter pro max",
        description:"Found 100 hidden butterflies. DAMN. Butterflies should start worrying."
    },

    butterfly4:{
        icon:"🦋",
        title:"Butterfly Hunter exterminator",
        description:"Found 1000 hidden butterflies. Bro, leave some for the rest of us ?"
    },

    // idk

    explorer:{
        icon:"🧭",
        title:"Explorer",
        description:"Visited every page."
    },

    collector:{
        icon:"📚",
        title:"Archivist",
        description:"Read every bonus 👅."
    },

    // casino

    casino:{
        icon:"🎰",
        title:"House Always Wins",
        description:"Lost 1000000 coins."
    },

    allIn:{
        icon:"💸",
        title:"All In",
        description:"Bet everything. DID YOU AT LEAST WIN???"
    },

    lucky:{
        icon:"🍀",
        title:"Lucky Bitch",
        description:"Won five bets in a row. Are you the developper or what ??"
    },

    // offline game

    touchGrass:{

    title:"🌱 Touch grass",

    description:"Play the offline game for 5 minutes."

},


stillHere:{

    title:"💀 Still here?",

    description:"Reach a score of 1000. HOW LONG DID THAT TAKE???"

},


internetOverrated:{

    title:"📡 Internet was overrated",

    description:"Beat your own record."

},

// idk pt.2

    reader:{
        icon:"👑",
        title:"Loyal Reader",
        description:"Spent one hour on the website. I'm not keeping you in hostage gang. Well, now, I am. Deal with it."
    },

    secret:{
        icon:"🔍",
        title:"Secret Finder",
        description:"Discovered a hidden page."
    },

    //coins

    coins1000000:{
        icon:"💰",
        title:"Rich!",
        description:"Own 1000000 coins."
    },

    // shop

    truthShop:{
    icon:"🔍",
    title:"You trusted the author. Big mistake.",
    description:"I fooled you :3"
    },

    therapist:{
    icon:"🛋️",
    title:"Too little, too late.",
    description:"She appreciates the effort, tho (believe it or not)"
    },

    leash:{
    icon:"🦮",
    title:"Good luck.",
    description:"This lasted approximately 3 seconds from the moment she saw it. "
    },

    adult:{
    icon:"👨‍🍼",
    title:"Impossible Challenge",
    description:"Lisa refused adult supervision, and went to the casino, again."
    },

    shop:{
    icon:"🛒",
    title:"Shopaholic",
    description:"Bought every item from the shop. How are you so rich??? Even I, the developper, am not that rich, damn. "
    },

    financial:{
    icon:"🐋",
    title:"Financially Irresponsible",
    description:"Spent 10,000,000 coins."
},

lore:{
    icon:"📚",
    title:"Lore Addict",
    description:"Bought every lore-related item."
},

designer:{
    icon:"🎨",
    title:"Interior Designer",
    description:"Unlocked every wallpaper."
},

wallpaperMaster:{
    icon:"🌈",
    title:"Wallpaper Hoarder",
    description:"Equipped every wallpaper at least once."
},

// cat

bestfriend:{
    Name:"💕 Best friends",
    description:"Affection at 100/100 with the cat. Good job!!"
},

allHats:{
    Name:"🎩 Fashion victim",
    description:"Bought every hats for the cat. He has now more clothes than me lol"
},

specialSkin:{
    Name:"✨ Welcome to the team, Litten!",
    description:"Bought the special Litten skin for the cat. Will you collect them all??? Now I gotta add more Pokemons I guess!!"
},

firstMeal:{
    name:"🍖 First Meal",
    description:"Feed the cat for the first time."
},

bottomless:{
    name:"🍽 Bottomless Pit",
    description:"Feed the cat 50 times. Did you adopt him already ?"
},

gentleHands:{
    name:"🖐 Gentle Hands",
    description:"Pet the cat 100 times."
},

spoiledCat:{
    name:"💸 Spoiled Cat",
    description:"Spend 10,000 coins in the cat shop. Well I guess you like him😭"
},

// final achievement

everything:{
    icon:"👀",
    title:"What's next ?",
    description:"Unlocked every achievement. Congrats!! You 100%ed this website!"
},
};




// ==========================================================
// Chargement
// ==========================================================

let unlocked = JSON.parse(localStorage.getItem("achievements"));

if(unlocked == null){

    unlocked = {};

}




// ==========================================================
// Sauvegarde
// ==========================================================

function saveAchievements(){

    localStorage.setItem(

        "achievements",

        JSON.stringify(unlocked)

    );

}




// ==========================================================
// Débloquer
// ==========================================================

function unlockAchievement(id){

    if(unlocked[id]){

        return;

    }

    unlocked[id]=true;

    addCoins(1000);

    saveAchievements();

showAchievement(id);

updateAchievementPage();

updateAchievementCounter();

    checkEverythingAchievement();

}




// ==========================================================
// Notification Steam
// ==========================================================

function showAchievement(id){

    const data = achievementNames[id];

    if(!data){

        return;

    }

    const notif = document.createElement("div");

    notif.className="notification";

    notif.innerHTML=`

<h3>🏆 Achievement unlocked!</h3>

<h2>${data.icon} ${data.title}</h2>

<p>${data.description}</p>

`;

    document.body.appendChild(notif);

    setTimeout(function(){

        notif.classList.add("show");

    },100);

    setTimeout(function(){

        notif.classList.remove("show");

    },4200);

    setTimeout(function(){

        notif.remove();

    },5000);

}




// ==========================================================
// Mettre à jour la page achievements
// ==========================================================

function updateAchievementPage(){

    for(const id in achievementNames){

        const card=document.getElementById(id);

        if(!card){

            continue;

        }

        if(unlocked[id]){

            card.style.opacity="1";

            card.style.filter="none";

            card.style.borderLeft="8px solid gold";

        }

        else{

            card.style.opacity=".35";

            card.style.filter="grayscale(100%)";

            card.style.borderLeft="8px solid grey";

        }

    }

}

updateAchievementPage();
updateAchievementCounter();




// ==========================================================
// Fonction publique
// ==========================================================

window.unlockAchievement=unlockAchievement;




// ==========================================================
// EXPLORER
// ==========================================================

const pages=[

"website code.html",

"about me.html",

"quiz toabc.html",

"achievements.html",

"casino.html"

];

let visited=0;

pages.forEach(function(page){

    if(localStorage.getItem("visited_"+page)){

        visited++;

    }

});

if(visited==pages.length){

    unlockAchievement("explorer");

}




// ==========================================================
// SECRET PAGE
// ==========================================================

if(location.pathname.endsWith("secret.html")){

    unlockAchievement("secret");

}




// ==========================================================
// BUTTERFLIES
// ==========================================================

let butterflies=

Number(localStorage.getItem("butterflies"));

if(isNaN(butterflies)){

    butterflies=0;

}

if(butterflies>=5){

    unlockAchievement("butterfly");

}




// ==========================================================
// BONUS
// ==========================================================

let bonus=

Number(localStorage.getItem("bonusPages"));

if(isNaN(bonus)){

    bonus=0;

}

if(bonus>=3){

    unlockAchievement("collector");

}




// ==========================================================
// RESET
// ==========================================================

// Tape dans la console :

// resetAchievements()

function resetAchievements(){

    localStorage.removeItem("achievements");

    location.reload();

}

window.resetAchievements=resetAchievements;

function checkEverythingAchievement(){

    for(const id in achievementNames){

        if(id==="everything"){

            continue;

        }

        if(!unlocked[id]){

            return;

        }

    }

    unlockAchievement("everything");

}
function updateAchievementCounter(){


    let total = Object.keys(achievementNames).length;


    let unlockedCount = 0;


    for(const id in achievementNames){

        if(unlocked[id]){

            unlockedCount++;

        }

    }



    const count =
    document.getElementById("achievementCount");


    const totalDisplay =
    document.getElementById("achievementTotal");


    const bar =
    document.getElementById("achievementBarFill");



    if(count){

        count.textContent = unlockedCount;

    }


    if(totalDisplay){

        totalDisplay.textContent = total;

    }


    if(bar){

        let percent =
        (unlockedCount / total) * 100;


        bar.style.width =
        percent + "%";

    }


}