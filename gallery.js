// ==========================================================
// IMAGE VIEWER
// ==========================================================

const imageOverlay=document.createElement("div");

imageOverlay.id="imageOverlay";

imageOverlay.innerHTML=`

<div id="imageViewer">

<button id="closeImageViewer">✕</button>

<img id="viewerImage">

<h2 id="viewerTitle"></h2>

<p id="viewerDescription"></p>

</div>

`;

document.body.appendChild(imageOverlay);



function openGalleryImage(img){

    if(typeof unlockGalleryImage==="function"){

    unlockGalleryImage(img);

}

    

    document.getElementById("viewerImage").src=img.src;

    document.getElementById("viewerTitle").textContent=
    img.dataset.title || "";

    document.getElementById("viewerDescription").textContent=
    img.dataset.description || "";

    imageOverlay.classList.add("show");

}



function closeGalleryImage(){

    imageOverlay.classList.remove("show");

}



document.getElementById("closeImageViewer").onclick=
closeGalleryImage;



imageOverlay.onclick=function(e){

    if(e.target===imageOverlay){

        closeGalleryImage();

    }

};


// ==========================================================
// AU LIEU D'ATTACHER UN onclick A CHAQUE IMAGE,
// ON ECOUTE TOUS LES CLICS DE LA PAGE.
// ==========================================================

document.addEventListener("click",function(e){

    if(!e.target.classList.contains("galleryImage")){

        return;

    }

    openGalleryImage(e.target);

});