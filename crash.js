// ==========================================================
// CRASH
// ==========================================================

const rocket=document.getElementById("rocket");

const multiplierDisplay=document.getElementById("multiplier");

const altitudeDisplay=document.getElementById("altitude");

const result=document.getElementById("crashResult");

const launchButton=document.getElementById("launchRocket");

const cashButton=document.getElementById("cashOutButton");

const betInput=document.getElementById("crashBet");

const scene=document.getElementById("rocketScene");



let multiplier=1;

let altitude=0;

let crashPoint=2;

let playing=false;

let cashedOut=false;

let bet=0;



// position de la fusée

let rocketY=420;

// déplacement du décor

let cameraOffset=0;



// ==========================================================
// LANCER
// ==========================================================

launchButton.onclick=function(){

if(playing){

return;

}



bet=parseInt(betInput.value);



if(isNaN(bet)||bet<=0){

alert("Invalid bet.");

return;

}



if(bet>coins){

alert("Not enough coins.");

return;

}



removeCoins(bet);



playing=true;

cashedOut=false;



multiplier=1;

altitude=0;

cameraOffset=0;

rocketY=420;



rocket.innerHTML="🚀";

rocket.style.bottom=rocketY+"px";

rocket.style.transform="translateX(-50%)";



scene.style.backgroundPositionY="0px";



multiplierDisplay.innerHTML="1.00x";

altitudeDisplay.innerHTML="0 m";



result.innerHTML="Rocket launched!";



cashButton.disabled=false;

launchButton.disabled=true;



// ==========================================================
// CHOIX DU POINT DE CRASH
// ==========================================================

const r=Math.random();



// 55%

if(r<0.35){

crashPoint=

1.20+

Math.random()*0.80;

}



// 25%

else if(r<0.70){

crashPoint=

2+

Math.random()*3;

}



// 10%

else if(r<0.90){

crashPoint=

5+

Math.random()*5;

}



// 8%

else if(r<0.98){

crashPoint=

10+

Math.random()*15;

}



// 2%

else{

crashPoint=

25+

Math.random()*40;

}



animateCrash();

};
// ==========================================================
// CASH OUT
// ==========================================================

cashButton.onclick=function(){

if(!playing){

return;

}

if(cashedOut){

return;

}

cashedOut=true;

cashButton.disabled=true;

const gain=Math.round(

bet*multiplier

);

addCoins(gain);

result.innerHTML=

"💰 Cashed out at "

+

multiplier.toFixed(2)

+

"x<br><br>"

+

"+"+

gain+

" 🪙";

};



// ==========================================================
// ANIMATION
// ==========================================================

function animateCrash(){

if(!playing){

return;

}



// montée beaucoup plus lente

multiplier*=1.0018;



// altitude fictive

altitude+=Math.round(

5+

multiplier*3

);



altitudeDisplay.innerHTML=

altitude.toLocaleString()

+

" m";



// la fusée monte

rocketY+=

0.25+

multiplier*0.05;



// ----------------------------
// CAMERA
// ----------------------------

// Tant que la fusée est basse,
// elle monte normalement.

if(rocketY<280){

rocket.style.bottom=

rocketY+"px";

}

else{

// ensuite on garde la fusée
// quasiment fixe

rocket.style.bottom="280px";



// et on fait défiler le décor

cameraOffset+=

0.25+

multiplier*0.05;



scene.style.backgroundPositionY=

cameraOffset+"px";

}



// petit mouvement

rocket.style.transform=

"translateX(-50%) rotate("

+

Math.sin(Date.now()/180)*5

+

"deg)";



// multiplicateur

multiplierDisplay.innerHTML=

multiplier.toFixed(2)

+

"x";



// ==========================================================
// CRASH
// ==========================================================

if(multiplier>=crashPoint){

playing=false;

cashButton.disabled=true;

launchButton.disabled=false;

rocket.innerHTML="💥";



if(!cashedOut){

result.innerHTML=

"💥 CRASH!<br><br>You lost.";

}

else{

result.innerHTML+=

"<br><br>🚀 Rocket finally crashed at "

+

crashPoint.toFixed(2)

+

"x";

}



// petite explosion

rocket.animate(

[

{

transform:"translateX(-50%) scale(1)"

},

{

transform:"translateX(-50%) scale(1.8)"

},

{

transform:"translateX(-50%) scale(1)"

}

],

{

duration:500

}

);



setTimeout(function(){

rocket.innerHTML="🚀";



rocketY=420;

cameraOffset=0;



rocket.style.bottom="420px";

scene.style.backgroundPositionY="0px";



multiplierDisplay.innerHTML="1.00x";

altitudeDisplay.innerHTML="0 m";



},2500);



return;

}



requestAnimationFrame(animateCrash);

}