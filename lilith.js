// ==========================================================
// LILITH NPC
// ==========================================================


const lilith = document.createElement("div");

lilith.id = "lilithNPC";

lilith.innerHTML = `
<img src="lilith.png" id="lilithSprite">

<div id="lilithBubble"></div>
`;

document.body.appendChild(lilith);



let lilithCooldown = false;


// ==========================================================
// PARLER
// ==========================================================


function lilithSay(text, force=false){


    const bubble = document.getElementById("lilithBubble");


    if(lilithCooldown && !force){

        return;

    }


    bubble.innerHTML = `

<div class="lilithText">

${text.replace(/\n/g,"<br>")}

</div>


<button id="${force ? "thankLilithButton" : "talkLilithButton"}">

${force ? "🙏 Thanks" : "💬 Talk to Lilith"}

</button>

`;



    bubble.classList.add("show");



    // =========================
    // DIALOGUE PERMANENT
    // =========================

    if(force){


        document
        .getElementById("thankLilithButton")
        .onclick=function(e){

            e.stopPropagation();

            bubble.classList.remove("show");

        };


        return;

    }



    // =========================
    // DIALOGUE NORMAL
    // =========================


    document
    .getElementById("talkLilithButton")
    .onclick=function(e){

        e.stopPropagation();

        openLilithMenu();

    };



    lilithCooldown=true;



    setTimeout(function(){

        bubble.classList.remove("show");

    },3000000);



    setTimeout(function(){

        lilithCooldown=false;

    },5500);


}





// ==========================================================
// CLICK SUR LILITH
// ==========================================================


lilith.onclick=function(e){


    if(e.target.closest("#lilithBubble")){

        return;

    }


    const line =

    lilithDialogues.idle[
        Math.floor(
            Math.random()*lilithDialogues.idle.length
        )
    ];


    lilithSay(line);


};





// ==========================================================
// RANDOM THOUGHT
// ==========================================================


function lilithRandomThought(){


    const line =

    lilithDialogues.random[
        Math.floor(
            Math.random()*lilithDialogues.random.length
        )
    ];


    lilithSay(line);


}





// ==========================================================
// MENU
// ==========================================================


const lilithMenu=document.createElement("div");

lilithMenu.id="lilithMenuOverlay";


lilithMenu.innerHTML=`

<div id="lilithMenu">

<h2>💬 Lilith</h2>

<div id="lilithMenuButtons"></div>

</div>

`;

document.body.appendChild(lilithMenu);





function openLilithMenu(){

    lilithMenu.classList.add("show");

    buildLilithMainMenu();

}





function closeLilithMenu(){

    lilithMenu.classList.remove("show");

}





lilithMenu.onclick=function(e){

    if(e.target===lilithMenu){

        closeLilithMenu();

    }

};





// ==========================================================
// MENU PRINCIPAL
// ==========================================================


function buildLilithMainMenu(){


const box=document.getElementById("lilithMenuButtons");


box.innerHTML="";


const tutorials=document.createElement("button");

tutorials.className="lilithOption";

tutorials.innerHTML="📖 Tutorials";

tutorials.onclick=buildTutorialMenu;



const questions=document.createElement("button");

questions.className="lilithOption";

questions.innerHTML="❓ Questions";

questions.onclick=buildQuestionMenu;



const leave=document.createElement("button");

leave.className="lilithOption";

leave.innerHTML="Leave";

leave.onclick=closeLilithMenu;



box.appendChild(tutorials);

box.appendChild(questions);

box.appendChild(leave);


}





// ==========================================================
// TUTORIALS
// ==========================================================


function buildTutorialMenu(){


const box=document.getElementById("lilithMenuButtons");


box.innerHTML="";



Object.keys(lilithDialogues.tutorials)

.forEach(function(name){



const button=document.createElement("button");


button.className="lilithOption";

button.innerHTML=name;



button.onclick=function(){



let dialogue=lilithDialogues.tutorials[name];



if(Array.isArray(dialogue)){

dialogue=
dialogue[
Math.floor(Math.random()*dialogue.length)
];

}



closeLilithMenu();



lilithSay(dialogue,true);



};



box.appendChild(button);


});



createBackButton();


}





// ==========================================================
// QUESTIONS
// ==========================================================


function buildQuestionMenu(){


const box=document.getElementById("lilithMenuButtons");


box.innerHTML="";



Object.keys(lilithDialogues.questions)

.forEach(function(question){



const button=document.createElement("button");


button.className="lilithOption";

button.innerHTML=question;



button.onclick=function(){



const answer=lilithDialogues.questions[question];



closeLilithMenu();



if(answer===null){

lilithRandomThought();

}

else{

lilithSay(answer,true);

}



};



box.appendChild(button);


});



createBackButton();


}





// ==========================================================
// BACK
// ==========================================================


function createBackButton(){


const box=document.getElementById("lilithMenuButtons");


const back=document.createElement("button");


back.className="lilithOption";

back.innerHTML="⬅ Back";


back.onclick=buildLilithMainMenu;


box.appendChild(back);


}





// ==========================================================
// EXPORT
// ==========================================================


window.openLilithMenu=openLilithMenu;

window.closeLilithMenu=closeLilithMenu;

window.lilithSay=lilithSay;

window.lilithRandomThought=lilithRandomThought;