// ==========================================================
// BLACKJACK
// ==========================================================

let blackjackWins =
Number(localStorage.getItem("blackjackWins")) || 0;

let blackjackLosses =
Number(localStorage.getItem("blackjackLosses")) || 0;

let deck=[];


let playerHand=[];

let dealerHand=[];


let currentBet=0;


let gameStarted=false;





// ==========================================================
// CREATION DU PAQUET
// ==========================================================


function createDeck(){


const suits=[
"♠",
"♥",
"♦",
"♣"
];


const values=[
"2",
"3",
"4",
"5",
"6",
"7",
"8",
"9",
"10",
"J",
"Q",
"K",
"A"
];


let newDeck=[];



suits.forEach(function(suit){


values.forEach(function(value){


newDeck.push({

value:value,

suit:suit

});


});


});



return newDeck;


}





function drawCard(){


const index=Math.floor(Math.random()*deck.length);


return deck.splice(index,1)[0];


}





// ==========================================================
// CALCUL SCORE
// ==========================================================


function calculateHand(hand){


let total=0;

let aces=0;



hand.forEach(function(card){


if(
card.value==="J" ||
card.value==="Q" ||
card.value==="K"
){

total+=10;


}

else if(card.value==="A"){


total+=11;

aces++;


}

else{


total+=Number(card.value);


}


});



while(total>21 && aces>0){


total-=10;

aces--;


}



return total;


}





// ==========================================================
// AFFICHAGE
// ==========================================================


function displayCards(){



document.getElementById("playerCards")
.innerHTML=
playerHand.map(card=>

card.value+card.suit

).join(" ");



document.getElementById("dealerCards")
.innerHTML=
dealerHand.map(card=>

card.value+card.suit

).join(" ");



document.getElementById("playerScore")
.innerHTML=
"Score: "+calculateHand(playerHand);



if(gameStarted){

document.getElementById("dealerScore")
.innerHTML=
"Score: "+calculateHand(dealerHand);

}



}





// ==========================================================
// START
// ==========================================================


document
.getElementById("startBlackjack")
.onclick=function(){



if(gameStarted){

return;

}

unlockAchievement("firstBlackjack");

if(currentBet>=10000){

    unlockAchievement("highRoller");

}



currentBet=
Number(
document.getElementById("blackjackBet").value
);



if(currentBet<=0){

return;

}



removeCoins(currentBet);



deck=createDeck();



playerHand=[

drawCard(),

drawCard()

];



dealerHand=[

drawCard(),

drawCard()

];



gameStarted=true;



displayCards();



checkBlackjack();



};







// ==========================================================
// HIT
// ==========================================================


document
.getElementById("hitButton")
.onclick=function(){


if(!gameStarted){

return;

}



playerHand.push(drawCard());


displayCards();



if(calculateHand(playerHand)>21){


endGame("Bust 💀",false);


}


};






// ==========================================================
// STAND
// ==========================================================


document
.getElementById("standButton")
.onclick=function(){


if(!gameStarted){

return;

}



while(
calculateHand(dealerHand)<17
){


dealerHand.push(drawCard());


}



displayCards();



let playerScore=
calculateHand(playerHand);



let dealerScore=
calculateHand(dealerHand);





if(
dealerScore>21 ||
playerScore>dealerScore
){


endGame("You win 🤑",true);


}

else if(
playerScore===dealerScore
){


addCoins(currentBet);


endGame("Draw 🤝",null);


}

else{


endGame("Dealer wins 💀",false);


}



};






// ==========================================================
// FIN
// ==========================================================


function endGame(message,win){



document.getElementById("blackjackResult")
.innerHTML=message;



if(win===true){

    

blackjackWins++;

localStorage.setItem(
"blackjackWins",
blackjackWins
);

if(blackjackWins>=10){

unlockAchievement("blackjack10");

}


addCoins(currentBet*2);



}



gameStarted=false;



currentBet=0;



}







function checkBlackjack(){


if(calculateHand(playerHand)===21){

    unlockAchievement("naturalBlackjack");



endGame(
"BLACKJACK 🃏🔥",
true
);


}


}