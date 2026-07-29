// ==========================================================
//              LENA WEBSITE - DARK MODE
// ==========================================================


document.addEventListener("DOMContentLoaded", function(){



    const themeButton = document.getElementById("themeButton");

    const images = document.querySelectorAll(".deco");



    let darkMode = localStorage.getItem("darkMode");





    // ------------------------------------------------------
    // Charger le thème sauvegardé
    // ------------------------------------------------------


    if(darkMode === "true"){


        document.body.classList.add("dark-mode");


        if(themeButton){

            themeButton.innerHTML="☀️";

        }



        images.forEach(function(image){


            if(image.dataset.dark){


                image.dataset.light=image.src;

                image.src=image.dataset.dark;


            }


        });


    }





    // ------------------------------------------------------
    // Appliquer le wallpaper sauvegardé
    // ------------------------------------------------------


    if(typeof applyWallpaper === "function"){

        applyWallpaper();

    }





    if(!themeButton){

        return;

    }





    // ------------------------------------------------------
    // Bouton lune / soleil
    // ------------------------------------------------------


    themeButton.onclick=function(){



        document.body.classList.toggle("dark-mode");



        const isDark =
        document.body.classList.contains("dark-mode");



        localStorage.setItem(
            "darkMode",
            isDark
        );





        // Changer l'icône


        if(isDark){


            themeButton.innerHTML="☀️";



            images.forEach(function(image){



                if(image.dataset.dark){



                    image.dataset.light=image.src;

                    image.src=image.dataset.dark;



                }



            });



        }



        else{



            themeButton.innerHTML="🌙";



            images.forEach(function(image){



                if(image.dataset.light){



                    image.src=image.dataset.light;



                }



            });



        }






        // IMPORTANT :
        // Recharge le bon wallpaper selon le mode


        if(typeof applyWallpaper === "function"){


            applyWallpaper();


        }



    };



});