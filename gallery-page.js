// =====================================================
// GALLERY PAGE
// =====================================================

const galleryData=
JSON.parse(
localStorage.getItem("gallery")
) || [];

const grid=
document.getElementById("galleryGrid");

const counter=
document.getElementById("galleryCounter");

const totalImages = 36;

counter.innerHTML=
galleryData.length+
" / "+
totalImages;

galleryData.forEach(function(image){

    const card=
    document.createElement("div");

    card.className="galleryCard";

    card.innerHTML=`

<img src="${image.src}">

<div class="galleryInfo">

<h2>${image.title}</h2>

<div class="galleryDate">

📅 ${image.date}

</div>

<div class="galleryLocation">

📍 ${image.location}

</div>

<div class="galleryDescription">

${image.description}

</div>

</div>

`;

    card.onclick=function(){

        const fakeImage={
            src:image.src,
            dataset:{
                title:image.title,
                description:image.description,
                id:image.id
            }
        };

        openGalleryImage(fakeImage);

    };

    grid.appendChild(card);

});