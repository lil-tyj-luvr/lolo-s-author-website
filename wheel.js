// ==========================================================
// LUCKY WHEEL
// ==========================================================

const wheelCanvas=document.getElementById("wheelCanvas");
const ctx=wheelCanvas.getContext("2d");

const spinButton=document.getElementById("spinWheel");

const betInput=document.getElementById("wheelBet");

const result=document.getElementById("wheelResult");



const wheelSections=[

{
label:"0x",
multiplier:0,
color:"#2c2c2c"
},

{
label:"0.1x",
multiplier:0.1,
color:"#7b1e1e"
},

{
label:"0.25x",
multiplier:0.25,
color:"#aa3b3b"
},

{
label:"0.5x",
multiplier:0.5,
color:"#d67a00"
},

{
label:"1x",
multiplier:1,
color:"#999999"
},

{
label:"2x",
multiplier:2,
color:"#3f8f2f"
},

{
label:"3x",
multiplier:3,
color:"#00a86b"
},

{
label:"5x",
multiplier:5,
color:"#1b83ff"
},

{
label:"35x",
multiplier:35,
color:"#ff00ff"
},

{
label:"Again",
again:true,
color:"#ffe400"
}

];



let angle=0;

let speed=0;

let spinning=false;



// ==========================================================
// DRAW
// ==========================================================

function drawWheel(){

ctx.clearRect(0,0,650,650);

const radius=300;

const cx=325;

const cy=325;

const slice=(Math.PI*2)/wheelSections.length;

ctx.save();

ctx.translate(cx,cy);

ctx.rotate(angle);

wheelSections.forEach(function(section,index){

const start=index*slice;

const end=start+slice;



ctx.beginPath();

ctx.moveTo(0,0);

ctx.arc(0,0,radius,start,end);

ctx.closePath();

ctx.fillStyle=section.color;

ctx.fill();



ctx.strokeStyle="white";

ctx.lineWidth=3;

ctx.stroke();



ctx.save();

ctx.rotate(start+slice/2);

ctx.textAlign="right";

ctx.fillStyle="white";

ctx.font="bold 24px Arial";

ctx.fillText(section.label,radius-20,8);

ctx.restore();

});



ctx.beginPath();

ctx.arc(0,0,70,0,Math.PI*2);

ctx.fillStyle="#111";

ctx.fill();

ctx.strokeStyle="gold";

ctx.lineWidth=6;

ctx.stroke();

ctx.restore();

}



drawWheel();



// ==========================================================
// SPIN
// ==========================================================

spinButton.onclick=function(){

if(spinning){

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



result.innerHTML="Spinning...";



speed=

0.45+

Math.random()*0.18;



spinning=true;



animate();

};



// ==========================================================
// ANIMATION
// ==========================================================

function animate(){

angle+=speed;

speed*=0.992;

drawWheel();



if(speed>0.002){

requestAnimationFrame(animate);

}

else{

finishSpin();

}

}



// ==========================================================
// RESULT
// ==========================================================

function finishSpin(){

spinning=false;



const slice=(Math.PI*2)/wheelSections.length;



let normalized=

(angle%(Math.PI*2));



let pointer=

(Math.PI*1.5-normalized);



if(pointer<0){

pointer+=Math.PI*2;

}



const index=

Math.floor(pointer/slice)%wheelSections.length;



const prize=

wheelSections[index];



if(prize.again){

result.innerHTML="🔁 Spin Again!";



setTimeout(function(){

spinButton.click();

},700);



return;

}



const bet=parseInt(betInput.value);



const gain=

Math.round(

bet*

prize.multiplier

);



addCoins(gain);



result.innerHTML=

prize.label+

"<br><br>"+

"Won "+gain+" coins";

}