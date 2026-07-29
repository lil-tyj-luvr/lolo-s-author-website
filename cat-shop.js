// ==========================================================
//              CAT SHOP SYSTEM
// ==========================================================



function buyCatFood(id){


    const item=catItems.food[id];



    if(!item){

        return;

    }



   if(!catData.ownedFood){

    catData.ownedFood={};

}


if(!catData.ownedFood[id]){

    catData.ownedFood[id]=0;

}



    if(coins<item.price){

        showCatMessage("💰 Not enough coins!");

        return;

    }



    removeCoins(item.price);



    catData.ownedFood[id]++;

saveCat();



    saveCat();



    updateCatButtons();



    showCatMessage("🐟 New food unlocked!");


}





function buyCatHat(id){


    const item=catItems.hats[id];



    if(!item){

        return;

    }



    if(catData.ownedHats.includes(id)){

        showCatMessage("🎩 Already bought!");

        return;

    }



    if(coins<item.price){

        showCatMessage("💰 Not enough coins!");

        return;

    }



    removeCoins(item.price);



    catData.ownedHats.push(id);



    saveCat();



    updateCatButtons();



    showCatMessage("🎩 New hat unlocked!");


}





function buyCatSkin(id){


    const item=catItems.skins[id];



    if(!item){

        return;

    }



    if(catData.ownedSkins.includes(id)){

        showCatMessage("✨ Already bought!");

        return;

    }



    if(coins<item.price){

        showCatMessage("💰 Not enough coins!");

        return;

    }



    removeCoins(item.price);



    catData.ownedSkins.push(id);



    saveCat();



    updateCatButtons();



    showCatMessage("✨ New skin unlocked!");


}





function equipCatHat(id){


    if(!catData.ownedHats.includes(id)){

        return;

    }



    catData.hat=id;



    saveCat();



    updateCatHat();



    updateCatButtons();



    showCatMessage("👑 Equipped!");


}









updateCatButtons();