// ==========================================================
// RISK LINE
// ==========================================================

const slider=document.getElementById("riskSlider");

const zone=document.getElementById("riskZone");

const ball=document.getElementById("riskBall");

const chanceText=document.getElementById("chanceValue");

const multiplierText=document.getElementById("multiplierValue");

const playButton=document.getElementById("riskPlay");

const result=document.getElementById("riskResult");

const betInput=document.getElementById("riskBet");



let rolling=false;



// ==========================================================
// MAJ DU CURSEUR
// ==========================================================

function updateRisk(){



const chance=

Number(slider.value);



zone.style.width=

chance+"%";



chanceText.innerHTML=

chance+"%";



// léger avantage joueur

const multiplier=

(100/chance)*1.05;



multiplierText.innerHTML=

"x"+

multiplier.toFixed(2);



}



slider.oninput=updateRisk;

updateRisk();



// ==========================================================
// JOUER
// ==========================================================

playButton.onclick=function(){



if(rolling){

return;

}



const bet=

parseInt(betInput.value);



if(isNaN(bet)||bet<=0){

alert("Invalid bet.");

return;

}



if(bet>coins){

alert("Not enough coins.");

return;

}



removeCoins(bet);



rolling=true;



playButton.disabled=true;



result.innerHTML=

"Rolling...";



animateBall(bet);

};



// ==========================================================
// BILLE
// ==========================================================

function animateBall(bet){



const chance=

Number(slider.value);



const multiplier=

(100/chance)*1.05;



// bille part complètement à droite

let position=100;



// vitesse de départ

let speed=

2+

Math.random()*2;



// où elle finira

const target=

Math.random()*100;



const interval=

setInterval(function(){



// ralentissement progressif

speed*=0.985;



// la bille avance vers la gauche

position-=speed;



// on évite qu'elle dépasse sa destination

if(position<=target){

position=target;

}



ball.style.left=

position+"%";



// arrivée

if(position<=target){



clearInterval(interval);



rolling=false;



playButton.disabled=false;



if(position<=chance){



const gain=

Math.round(

bet*

multiplier

);



addCoins(gain);



result.innerHTML=

"🎉 WIN!<br><br>+"

+

gain

+

" 🪙";



}



else{



result.innerHTML=

"💀 You lost.";

}



}



},16);

}