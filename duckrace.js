// ==========================================================
// DUCK RACE
// ==========================================================

const duckButtons=document.querySelectorAll(".duckChoice");

const ducks=document.querySelectorAll(".duck");

const startButton=document.getElementById("startRace");

const result=document.getElementById("raceResult");

const betInput=document.getElementById("duckBetInput");

let selectedDuck=null;

let racing=false;



// ==========================================================
// CHOIX DU CANARD
// ==========================================================

duckButtons.forEach(function(button){

button.onclick=function(){

duckButtons.forEach(function(b){

b.classList.remove("selected");

});

button.classList.add("selected");

selectedDuck=Number(button.dataset.duck);

};

});



// ==========================================================
// LANCER
// ==========================================================

startButton.onclick=function(){

if(racing){

return;

}



if(selectedDuck===null){

alert("Choose a duck!");

return;

}



const bet=parseInt(betInput.value);

if(isNaN(bet)||bet<=0){

alert("Invalid bet.");

return;

}



if(bet>coins){

alert("Not enough coins.");

return;

}



removeCoins(bet);

result.innerHTML="GO!!";

racing=true;

startRace(bet);

};



// ==========================================================
// COURSE
// ==========================================================

function startRace(bet){

const positions=[20,20,20,20];

const speeds=[0,0,0,0];



ducks.forEach(function(duck){

duck.style.left="20px";

});



const finish=880;



const race=setInterval(function(){



for(let i=0;i<4;i++){



// accélération aléatoire

speeds[i]+=Math.random()*0.5;



// ralentissement

speeds[i]*=.95;



// petit bonus aléatoire

positions[i]+=

0.4+

Math.random()*0.8+

speeds[i]*0.5;



// effet de "dandinement"

const rotate=

Math.sin(Date.now()/70+i)*8;



ducks[i].style.left=

positions[i]+"px";



ducks[i].style.transform=

"translateY(-50%) rotate("+

rotate+

"deg)";



}



// leader

let leader=0;

for(let i=1;i<4;i++){

if(positions[i]>positions[leader]){

leader=i;

}

}



// petite couronne

ducks.forEach(function(d){

d.innerHTML="🦆";

});



ducks[leader].innerHTML="👑🦆";



// arrivée

for(let i=0;i<4;i++){

if(positions[i]>=finish){

clearInterval(race);

finishRace(i,bet);

return;

}

}



},25);

}



// ==========================================================
// FIN
// ==========================================================

function finishRace(winner,bet){

racing=false;



ducks[winner].animate(

[

{

transform:"translateY(-50%)"

},

{

transform:"translateY(-90%)"

},

{

transform:"translateY(-50%)"

},

{

transform:"translateY(-80%)"

},

{

transform:"translateY(-50%)"

}

],

{

duration:700

}

);



if(winner===selectedDuck){

const gain=Math.round(bet*4.2);

addCoins(gain);

result.innerHTML=

"🎉 YOUR DUCK WON!<br><br>+"+

gain+

" 🪙";

}

else{

result.innerHTML=

"💀 You lost.";

}

}