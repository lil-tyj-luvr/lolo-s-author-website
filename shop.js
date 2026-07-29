// ==========================================================
//              LENA WEBSITE - SHOP SYSTEM
// ==========================================================



// ==========================================================
//              CHARGEMENT DES ACHATS
// ==========================================================


let boughtItems = JSON.parse(
    localStorage.getItem("boughtItems")
);


if(boughtItems == null){

    boughtItems = {};

}





function saveShop(){

    localStorage.setItem(
        "boughtItems",
        JSON.stringify(boughtItems)
    );

}





// ==========================================================
//              ACHETER UN ITEM
// ==========================================================


function buyItem(id,price){



    if(boughtItems[id]){

        showShopNotification(
            "You already bought that item!"
        );

        return;

    }




    if(coins < price){

        showShopNotification(
            "❌ Not enough coins!"
        );

        return;

    }




    removeCoins(price);



    boughtItems[id]=true;


    saveShop();



    showShopNotification(
        "✨ Successful purchase!"
    );



    updateShop();



    updateLoreButtons();




    // ==============================
    // ACHIEVEMENTS ACHATS
    // ==============================


    if(id==="truth"){

        unlockAchievement("truthShop");

    }


    if(id==="therapistLilith"){

        unlockAchievement("therapist");

    }


    if(id==="leashAlice"){

        unlockAchievement("leash");

    }


    if(id==="adultLisa"){

        unlockAchievement("adult");

    }





    checkShopCompletion();



}






// ==========================================================
//              SHOP COMPLET
// ==========================================================


function checkShopCompletion(){



    const allItems=[


        "deletedScenes",

        "lilithChapter",

        "therapistLilith",

        "leashAlice",

        "adultLisa",

        "happyTOABC",

        "happyBIMS",

        "happyHAW",

        "truth"


    ];



    let complete=true;



    for(const item of allItems){


        if(!boughtItems[item]){


            complete=false;

            break;


        }


    }



    if(complete){

        unlockAchievement("shop");

    }




}






// ==========================================================
//              BOUTONS SHOP
// ==========================================================


function updateShop(){



    const buttons =
    document.querySelectorAll(
        ".shopItem button"
    );



    buttons.forEach(function(button){



        const onclick =
        button.getAttribute("onclick");



        if(!onclick){

            return;

        }



        const match =
        onclick.match(/'([^']+)'/);



        if(!match){

            return;

        }



        const id = match[1];




        if(boughtItems[id]){


            button.innerHTML =
            "✓ OWNED";


            button.disabled=true;



        }




    });

}





// ==========================================================
//              BOUTONS LORE
// ==========================================================


function handleLoreButton(id,page,price){



    if(boughtItems[id]){


        window.location.href=page;


        return;


    }



    buyItem(id,price);



}





function updateLoreButtons(){



    const buttons =
    document.querySelectorAll(
        ".loreButton"
    );



    buttons.forEach(function(button){



        const id =
        button.dataset.id;



        if(boughtItems[id]){


            button.innerHTML =
            "📖 READ";


            button.disabled=false;



            button.onclick=function(){


                window.location.href =
                button.dataset.page;


            };



        }



    });



}






// ==========================================================
//              ACHIEVEMENT LORE
// ==========================================================


function checkLoreAchievement(){



    const loreItems=[


        "deletedScenes",

        "lilithChapter",

        "truth",

        "happyTOABC",

        "happyBIMS",

        "happyHAW"


    ];



    let complete=true;



    for(const item of loreItems){


        if(!boughtItems[item]){


            complete=false;

            break;


        }


    }



    if(complete){

        unlockAchievement("lore");

    }



}






// ==========================================================
//              NOTIFICATION
// ==========================================================


function showShopNotification(text){



    const notif =
    document.createElement("div");



    notif.className =
    "wallpaperNotification";



    notif.innerHTML=text;



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






// ==========================================================
//              INITIALISATION
// ==========================================================


updateShop();

updateLoreButtons();

checkLoreAchievement();






// ==========================================================
//              PUBLIC
// ==========================================================


window.buyItem = buyItem;

window.handleLoreButton = handleLoreButton;

window.updateShop = updateShop;