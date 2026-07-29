// ==========================================================
//              LENA WEBSITE - STATS SYSTEM
// ==========================================================



let stats =
JSON.parse(
localStorage.getItem("siteStats")
);



if(!stats){


    stats={

        coinsEarned:0,

        coinsSpent:0,

        timeSpent:0,

        clicks:0,

        casinoGames:0,

        butterflies:0,

        achievementsUnlocked:0,

        gameOvers:0,

        bestScore:0,

        pagesVisited:0

    };


}






// ==========================================================
// MIGRATION DES ANCIENNES DONNEES
// ==========================================================



function migrateStats(){



    // COINS


    let coins =
    Number(
        localStorage.getItem("coins")
    ) || 0;



    let spent =
    Number(
        localStorage.getItem("spentCoins")
    ) || 0;



    stats.coinsSpent = spent;


    stats.coinsEarned =
    coins + spent;






    // PAPILLONS


    stats.butterflies =
    Number(
        localStorage.getItem("butterflies")
    ) || 0;






    // ACHIEVEMENTS


    let achievements =
    JSON.parse(
        localStorage.getItem("achievements")
    ) || [];



    let count = 0;



    if(Array.isArray(achievements)){


        count = achievements.length;


    }

    else{


        for(let key in achievements){


            if(achievements[key]){

                count++;

            }

        }


    }



    stats.achievementsUnlocked=count;







    // DINO


    stats.bestScore =
    Number(
        localStorage.getItem("offlineBest")
    ) || 0;







    // CASINO


    stats.casinoLosses =
    Number(
        localStorage.getItem("casinoLosses")
    ) || 0;







    // PAGES


    let visits =
    JSON.parse(
        localStorage.getItem("visits")
    ) || {};



    stats.pagesVisited =
    Object.keys(visits).length;






    saveStats();



}





migrateStats();







// ==========================================================
// SAUVEGARDE
// ==========================================================


function saveStats(){


    localStorage.setItem(
        "siteStats",
        JSON.stringify(stats)
    );


}







// ==========================================================
// TEMPS
// ==========================================================


setInterval(function(){


    stats.timeSpent++;


    saveStats();


},1000);







// ==========================================================
// CLICS
// ==========================================================


document.addEventListener(
"click",
function(){


    stats.clicks++;


    saveStats();


});








// ==========================================================
// COINS
// ==========================================================


function addStatCoins(amount){


    stats.coinsEarned += amount;


    saveStats();


}




function addSpentCoins(amount){


    stats.coinsSpent += amount;


    saveStats();


}







function getStats(){


    return stats;


}





window.getStats=getStats;

window.addStatCoins=addStatCoins;

window.addSpentCoins=addSpentCoins;