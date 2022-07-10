const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let ready = false;
let imagesLoaded= 0;
let totalImages = 0;
let photosArray = [];



// Unspalsh API
const count = 30;
const apiKey = 'hHBVMcyYHWLuKAo_lcwuygVikt1PgKzRzZSW9xCZj10';
const apiUrl = `https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${count}`;


// check if all images are loaded
const imageLoad =  ()=>{
    imagesLoaded++;
    if( imagesLoaded === totalImages){
        ready = true;
        loader.hidden = true;
        console.log('ready =' ,ready);
    }
    console.log('image is loaded')
}
// define helper function to avoid repetition
function setAttributes(element,attributes) {
    for(const key in attributes) {
        element.setAttribute(key, attributes[key]);
    }
}


// Create Element for links in photos and add to DOM
function displayPhotos() {
    imagesLoaded= 0;
    totalImages = photosArray.length;
    console.log('total images', totalImages);
    // Run function for each object in photosArray
    photosArray.forEach((photo)=> {
        // creating an anchor element to link to unsplash
        const item = document.createElement('a');
        // item.setAttribute('href', photo.links.html);
        // item.setAttribute('target', '_blank');
        setAttributes(item,{
            href:photo.links.html,
            target:'_blank'}
            );
        // create image element for photo
        const img = document.createElement('img');
        // img.setAttribute('src', photo.urls.regular);
        // img.setAttribute('alt', photo.alt_description);
        // img.setAttribute('title', photo.alt_description);
        setAttributes(img,{
            src:photo.urls.regular,
            alt:photo.alt_description,
            title: photo.alt_description
        })

        // Event listenener,check when each photo is done loading
        img.addEventListener('load',imageLoad);
        // put the <img> element inside the <a> element,then put both inside image container
        item.appendChild(img);
        imageContainer.appendChild(item);
    });
    
}

// Get photos from unsplash api

async function getPhotos() {
    try{
        const response = await fetch(apiUrl);
        photosArray = await response.json();
        displayPhotos();
    }
    catch(error) {

    }
}

// check to see if scroll near the end of the page, & load more photos ,we defined infinite photos here
window.addEventListener('scroll',()=>{
    if(window.innerHeight + window.scrollY >= document.body.offsetHeight-1000 && ready){
        ready =  false;
        getPhotos();
    }
})

// On Load
getPhotos();