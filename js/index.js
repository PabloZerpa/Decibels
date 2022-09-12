function addArtist()
{
    let artistGrid = document.getElementById("artistGrid");
    let images = 
    ["https://www.elnacional.cat/uploads/s1/13/32/17/88/europapress-3575490-nuevo-disco-daft-punk-1.jpeg",
    "https://p4.wallpaperbetter.com/wallpaper/666/915/617/metallica-heavy-metal-metal-thrash-metal-wallpaper-preview.jpg",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSnZkxbY5HBcP93IpIGaV0YG4HAdRfQSxJYNg&usqp=CAU",
    "https://www.latercera.com/resizer/-54YK9C3H3KhD6hxvFLudV6LIds=/900x600/smart/arc-anglerfish-arc2-prod-copesa.s3.amazonaws.com/public/Z7VN22YU6NHWJPKLUQH5ZPZWPI.jpg",
    "https://m.media-amazon.com/images/I/81vzCypTKXL._SS500_.jpg",
    "https://vignette.wikia.nocookie.net/youtubepedia/images/7/75/Marshmello.jpg/revision/latest?cb=20190112082054&path-prefix=es",
    "https://www.metal-hammer.de/wp-content/uploads/2015/04/23/12/System-Of-A-Down_BINARY_663814.jpg",
    "https://img.europapress.es/fotoweb/fotonoticia_20200320182812_420.jpg"];
    
    let names = ["Daft Punk","Metallica","Adele","Gorillaz","Lindsey Sterling","Marshmello","SOAD","The Weeknd",]


    for (let i = 0; i < names.length; i++) 
    {
        let artistPicture = document.createElement("div");
        artistPicture.setAttribute("class", "artistPicture");
        artistPicture.innerHTML = 
        `
            <img src="${images[i]}">
            <h6 id="artistName">${names[i]}</h6>
            <div class="miniBtn">
            <i class="fas fa-play" id="playIcon"></i>
            <i class="fas fa-star" id="starIcon"></i>
            <i class="fas fa-caret-down" id="moreIcon"></i>

        `;

        artistGrid.appendChild(artistPicture);
    }
}

function addSong()
{
    let musicSection = document.getElementById("musicSection");

    for (let i = 0; i < 3; i++) 
    {
        let music = document.createElement("div");
        music.setAttribute("class", "music");
        music.innerHTML = 
        `
        <div class="overlay"></div>
            <div class="musicContent">
                <audio id="audio1">
                  <source src="/Two Sugars.mp3" type="audio/mpeg">
                  Your browser does not support the audio element.
                </audio>
                <h2 id="musicTitle">Song Name</h2>
                <h3 id="musicName">Band Name</h3>
                <div class="progress">
                  <input id="progressBar1" type="range" value="0" />
                </div>
                <div class="musicControls">
                  <div class="musicColumn"><i id="redoMusic1" class="fa fa-redo-alt"  onclick="redoAudio(audio1)"></i></div>
                  <div class="musicColumn"><i class="fa fa-step-backward"></i></div>
                  <div class="musicColumn"><i id="playMusic1" class="fa fa-play play-btn fa-fw" onclick="playAudio(audio1,playMusic1,pauseMusic1,progressBar1,currentTime1)"></i></div>
                  <div class="musicColumn"><i id="pauseMusic1" class="fa fa-pause pause-btn fa-fw" onclick="pauseAudio(audio1,playMusic1,pauseMusic1)" style="display: none;"></i></div>
                  <div class="musicColumn"><i class="fa fa-step-forward"></i></div>
                  <div class="musicColumn">
                    <div class="musicVolume">
                      <i class="fas fa-volume-up" id="volumeMusic1" onclick="volumeAudio(audio1,volumeMusic1,muteMusic1)"></i>
                      <i class="fas fa-volume-mute" id="muteMusic1" onclick="muteAudio(audio1,volumeMusic1,muteMusic1)" style="display: none;"></i>
                      <input type="range" name="volume" id="volume1" min="0" max="1" step="0.01" value="0.5" onclick="volumeLevel(audio1,volume1,volumeMusic1,muteMusic1)">
                    </div>
                  </div>
                  <div class="musicTime">
                    <p id="currentTime1">00:00</p>
                    <p id="totalTime1">/00:00</p>
                  </div>
              </div>
        </div>

        `;

        musicSection.appendChild(music);
    }
}

function addFeactures()
{
    let elements = document.getElementById("elements");
    let title = ["Listen","Share","Follow"];
    let description = ["Listen and find music of the different generes",
                "Share you playlist and upload you own tracks",
                "Follow and know artist of the all world"];

    for (let i = 0; i < 3; i++) 
    {
        let element = document.createElement("div");
        element.setAttribute("class", "element");
        element.innerHTML = 
        `
        <div class="card w-50">
            <div class="card-body">
                <h6>${title[i]}</h6>
                <i class="fas fa-music"></i>
                <p>${description[i]}</p>
                <a href="#" class="btn btn-warning">Read More</a>
            </div>
        </div>

        `;

        elements.appendChild(element);
    }
}

addArtist();
addSong();
addFeactures();


// NAV VARIABLES
const searchBar = document.getElementById("searchBar");
const searchOptions = document.getElementById("searchOptions");

// LOGIN VARIABLES
const logIn = document.getElementById("logIn");
const signUp = document.getElementById("signUp");
const signForm = document.getElementById("signForm");
const closeBtnForm = document.getElementById("closeBtnForm");

const formLog = document.getElementById("formLog");
const formSign = document.getElementById("formSign");
const formOut = document.getElementById("formOut");
const googleBtn = document.getElementById("googleBtn");
const microBtn = document.getElementById("microBtn");
const appleBtn = document.getElementById("appleBtn");

//--------------- SEARCH BAR OPTIONS ---------------
searchBar.addEventListener("click", function()
{   
    if(searchOptions.style.display = "none")
        searchOptions.style.display = "block";
    else if(searchBar.style.display = "none")
        searchOptions.style.display = "block";
})

document.addEventListener("click", function(e)
{
    if(searchOptions.style.display == "block")
    {
        if(e.target != searchBar)
            searchOptions.style.display = "none";
    } 
}, false);

//--------------- OPEN / CLOSE FORMS WINDOWS ---------------
logIn.addEventListener("click", function()
{
    document.getElementById("formTitle").innerHTML = "Log In";
    document.getElementById("formLog").style.display = "block";
    document.getElementById("formSign").style.display = "none";
});

signUp.addEventListener("click", function()
{
    document.getElementById("formTitle").innerHTML = "Sign Up";
    document.getElementById("formSign").style.display = "block";
    document.getElementById("formLog").style.display = "none";
});

closeBtnForm.addEventListener("click", function()
{   
    formSign.reset();
    formLog.reset();
    
});