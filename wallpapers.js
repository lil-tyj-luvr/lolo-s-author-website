// ==========================================================
//              LENA WEBSITE - WALLPAPER SYSTEM
// ==========================================================


let ownedWallpapers = JSON.parse(
    localStorage.getItem("ownedWallpapers")
);

let equippedHistory =
JSON.parse(localStorage.getItem("equippedHistory"));

if(equippedHistory==null){

    equippedHistory={};

}


if(ownedWallpapers == null){

    ownedWallpapers = {

        pinkStars:true,
        darkStars:true

    };

    saveWallpapers();

}




function saveWallpapers(){

    localStorage.setItem(
        "ownedWallpapers",
        JSON.stringify(ownedWallpapers)
    );

}





// ==========================================================
// ACHAT
// ==========================================================


function buyWallpaper(id,mode,price){


    if(ownedWallpapers[id]){

        equipWallpaper(id,mode);

        return;

    }



    if(coins < price){

        showWallpaperNotification("❌ Not enough coins!");

        return;

    }



    removeCoins(price);


    ownedWallpapers[id]=true;

    const allWallpapers=[

"pinkStars",
"hyyh",
"nana",
"floral",
"sukuna",
"chemistry",

"darkStars",
"floral1",
"guitar",
"leopard",
"moon",
"bts"

];

let unlockedAll=true;

for(const wallpaper of allWallpapers){

    if(!ownedWallpapers[wallpaper]){

        unlockedAll=false;

        break;

    }

}

if(unlockedAll){

    unlockAchievement("designer");

}


    saveWallpapers();



    showWallpaperNotification("🎨 Wallpaper unlocked!");



    updateWallpaperButtons();


}





// ==========================================================
// EQUIPER
// ==========================================================


function equipWallpaper(id,mode){


    if(!ownedWallpapers[id]){

        return;

    }



    if(mode==="dark"){

        localStorage.setItem(
            "darkWallpaper",
            id
        );

    }


    else{

        localStorage.setItem(
            "lightWallpaper",
            id
        );

    }



    applyWallpaper();

    equippedHistory[id]=true;

localStorage.setItem(

    "equippedHistory",

    JSON.stringify(equippedHistory)

);

const allWallpapers=[

"pinkStars",
"hyyh",
"nana",
"floral",
"sukuna",
"chemistry",

"darkStars",
"floral1",
"guitar",
"leopard",
"moon",
"bts"

];

let equippedAll=true;

for(const wallpaper of allWallpapers){

    if(!equippedHistory[wallpaper]){

        equippedAll=false;

        break;

    }

}

if(equippedAll){

    unlockAchievement("wallpaperMaster");

}


    updateWallpaperButtons();


    showWallpaperNotification("⭐ Wallpaper equipped!");

}





// ==========================================================
// APPLICATION
// ==========================================================


function applyWallpaper(){

    console.log("Applying wallpaper...");


    const dark =
    localStorage.getItem("darkMode")==="true";



    const lightWallpapers={

        pinkStars:"pink wallpaper stars.jpg",

        hyyh:"wallpaper pink.jpg",

        nana:"strawberry.jpg",

        floral:"pink-wallpaper-leopard.jpg",

        sukuna:"uzumaki.jpg",

        chemistry:"lilies.jpg"

    };



    const darkWallpapers={

        darkStars:"dark wallpaper.jpg",

        floral1:"dark wallpaper flowers.jpg",

        guitar:"guitar wallpaper.jpg",

        leopard:"leopard wallpaper.jpg",

        moon:"dark wallpaper no im not a cat.jpg",

        bts:"dark wallpaper iamthegreatest.jpg"

    };



    if(dark){

        let id =
        localStorage.getItem("darkWallpaper")
        ||"darkStars";


        if(!darkWallpapers[id]){

            id="darkStars";

        }

        console.log(id);


        document.body.style.backgroundImage=
        "url('"+darkWallpapers[id]+"')";

    }


    else{


        let id =
        localStorage.getItem("lightWallpaper")
        ||"pinkStars";


        if(!lightWallpapers[id]){

            id="pinkStars";

        }

        console.log(id);


        document.body.style.backgroundImage=
        "url('"+lightWallpapers[id]+"')";

    }


}





// ==========================================================
// BOUTONS DU SHOP
// ==========================================================


function updateWallpaperButtons(){



    const buttons =
    document.querySelectorAll(".wallpaperButton");



    buttons.forEach(function(button){


        const id =
        button.dataset.id;



        const mode =
        button.dataset.mode;



        if(ownedWallpapers[id]){


            let equipped;



            if(mode==="dark"){

                equipped =
                localStorage.getItem("darkWallpaper")===id;

            }

            else{

                equipped =
                localStorage.getItem("lightWallpaper")===id;

            }




            if(equipped){

                button.innerHTML="⭐ EQUIPPED";

            }

            else{

                button.innerHTML="✅ EQUIP";

            }



            button.onclick=function(){

                equipWallpaper(id,mode);

            };


        }



    });


}


// ==========================================================
//          WALLPAPER NOTIFICATION
// ==========================================================


function showWallpaperNotification(text){


    const notif = document.createElement("div");


    notif.className = "wallpaperNotification";


    notif.innerHTML = text;



    document.body.appendChild(notif);



    setTimeout(function(){


        notif.classList.add("show");


    },100);




    setTimeout(function(){


        notif.classList.remove("show");


    },3000);




    setTimeout(function(){


        notif.remove();


    },3500);


}


window.buyWallpaper = buyWallpaper;
window.equipWallpaper = equipWallpaper;
window.applyWallpaper = applyWallpaper;


// Charger le bon wallpaper au démarrage
applyWallpaper();


// Mettre les boutons à jour
updateWallpaperButtons();


// Si on change de thème depuis une autre page,
// on réapplique automatiquement le bon wallpaper.
window.addEventListener("storage", function(){

    applyWallpaper();

});
