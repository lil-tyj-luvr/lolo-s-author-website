console.log("QUIZ JS LOADED");

const finish = document.getElementById("finish");

finish.addEventListener("click", function(){

    let score = 0;

    const bonnesReponses = document.querySelectorAll("input[value='correct']");

    bonnesReponses.forEach(function(reponse){

        if(reponse.checked){

            score++;

        }

    });

    document.getElementById("score").innerHTML =
    "Score : " + score + " / " + bonnesReponses.length;


    if(score >= Math.ceil(bonnesReponses.length*0.7)){

        console.log("Passed!");

    unlockAchievement("finished_toabc");

    const achievement = document.getElementById("achievement");

    achievement.style.right="20px";

    addCoins(300);

    setTimeout(function(){

        achievement.style.right="-400px";

    },4000);

}

});