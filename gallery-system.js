// ==========================================================
// GALLERY SYSTEM
// ==========================================================

let gallery =
JSON.parse(
localStorage.getItem("gallery")
);

if(!gallery){

    gallery=[];

}

function saveGallery(){

    localStorage.setItem(
        "gallery",
        JSON.stringify(gallery)
    );

}

function unlockGalleryImage(img){

    const id=
    img.dataset.id;

    if(!id){

        console.warn("Image has no data-id.");

        return;
    }

    const alreadyUnlocked=
    gallery.some(function(image){

        return image.id===id;

    });

    if(alreadyUnlocked){

        return;

    }

    gallery.push({

        id:id,

        src:img.src,

        title:img.dataset.title,

        description:img.dataset.description,

        location:location.pathname,

        date:new Date().toLocaleDateString()

    });

    saveGallery();

    console.log("Unlocked:",id);

}

window.unlockGalleryImage=
unlockGalleryImage;