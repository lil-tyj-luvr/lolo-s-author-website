// ======================================================
//                LENA WEBSITE - COINS SYSTEM
// ======================================================


// -------------------------------
// Chargement
// -------------------------------

let coins = Number(localStorage.getItem("coins"));

if(isNaN(coins)){

    coins = 0;

}

updateCoins();




// -------------------------------
// Affichage du compteur
// -------------------------------

function updateCoins(){

    const displays = document.querySelectorAll("#coins, #shopCoins");

displays.forEach(function(display){

    display.textContent = coins;

});

    localStorage.setItem("coins", coins);

}




// -------------------------------
// Ajouter des pièces
// -------------------------------

function addCoins(amount, showPopup = true){

    coins += amount;

    updateCoins();

    if(showPopup){

    showCoinPopup("+" + amount + " 🪙");

    }

    if(typeof addStatCoins==="function"){

        addStatCoins(amount);

    }

}




// -------------------------------
// Retirer des pièces
// -------------------------------

function removeCoins(amount){

    coins -= amount;

    spentCoins += amount;

    localStorage.setItem(
        "spentCoins",
        spentCoins
    );

    if(spentCoins>=5000000){

        unlockAchievement("financial");

    }

    if(coins<0){

        coins=0;

    }

    updateCoins();

    if(typeof addSpentCoins==="function"){

        addSpentCoins(amount);

    }


}
// -------------------------------
// Notification de pièces
// -------------------------------

function showCoinPopup(text){

    const popup = document.createElement("div");

    popup.className = "coinPopup";

    popup.innerHTML = text;

    document.body.appendChild(popup);

    setTimeout(function(){

        popup.remove();

    },2000);

}




// ======================================================
//             PREMIERE VISITE D'UNE PAGE
// ======================================================

const page = location.pathname.split("/").pop();

if(!localStorage.getItem("visited_" + page)){

    localStorage.setItem("visited_" + page, true);

    addCoins(100, false);

}




// ======================================================
//             TEMPS PASSE SUR LE SITE
// ======================================================

// Toutes les secondes :
setInterval(function(){

    addCoins(100, false);

},1000);




// ======================================================
//             SUCCES TEMPS
// ======================================================

let totalTime = Number(localStorage.getItem("timeSpent"));

if(isNaN(totalTime)){

    totalTime = 0;

}

setInterval(function(){

    totalTime++;

    localStorage.setItem("timeSpent", totalTime);

},1000);

let spentCoins =
Number(localStorage.getItem("spentCoins"));

if(isNaN(spentCoins)){

    spentCoins=0;

}


// ======================================================
//             1000000 PIECES
// ======================================================

setInterval(function(){

    if(typeof unlockAchievement === "function"){

        if(coins >= 1000000){

            unlockAchievement("coins1000000");

        }

    }

},1000);




// ======================================================
//             1 HEURE
// ======================================================

setInterval(function(){

    if(typeof unlockAchievement === "function"){

        if(totalTime >= 3600){

            unlockAchievement("reader");

        }

    }

},1000);




// ======================================================
//             BOUTON ACHIEVEMENTS
// ======================================================

const achievementButton = document.getElementById("achievementButton");

if(achievementButton){

    achievementButton.onclick = function(){

        window.location.href = "achievements.html";

    }

}




// ======================================================
//             FONCTIONS PUBLIQUES
// ======================================================

window.addCoins = addCoins;

window.removeCoins = removeCoins;

window.updateCoins = updateCoins;