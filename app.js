
// NAV VARIABLES
const searchBar = document.getElementById("searchBar");
const searchOptions = document.getElementById("searchOptions");
const logIn = document.getElementById("logIn");
const signUp = document.getElementById("signUp");
const signForm = document.getElementById("signForm");
const closeBtn = document.getElementById("closeBtn");
// MUSIC CONTROLS VARIABLES
const volumeMusic = document.getElementById("volumeMusic");
const volume = document.getElementById("volume");
const volumeMusic2 = document.getElementById("volumeMusic2");
const volume2 = document.getElementById("volume2");
const volumeMusic3 = document.getElementById("volumeMusic3");
const volume3 = document.getElementById("volume3");
const track1 = document.getElementById("track1");
const track2 = document.getElementById("track2");
const track3 = document.getElementById("track3");
const progress = document.getElementById("progress");
let total = document.getElementById("totalTime");
let total2 = document.getElementById("totalTime2");
let total3 = document.getElementById("totalTime3");


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

//--------------- LOGIN / SIGN ---------------
logIn.addEventListener("click", function()
{
    document.getElementById("formTitle").innerHTML = "Log In";
    document.getElementById("formLog").style.display = "block";
    document.getElementById("formSign").style.display = "none";
})

signUp.addEventListener("click", function()
{
    document.getElementById("formTitle").innerHTML = "Sign Up";
    document.getElementById("formSign").style.display = "block";
    document.getElementById("formLog").style.display = "none";
})

closeBtn.addEventListener("click", function()
{   
    document.getElementById("formSign").reset();
    document.getElementById("formLog").reset();
    
})

function playAudio(track, playMusic, pauseMusic)
{
    track.play();
    playMusic.style.display = "none";
    pauseMusic.style.display = "block";
}

function pauseAudio(track, playMusic, pauseMusic)
{
    track.pause();
    pauseMusic.style.display = "none";
    playMusic.style.display = "block";
}

function volumeAudio(volumeBtn)
{
    if(volumeBtn.style.display == "block")
        volumeBtn.style.display = "none";
    else
        volumeBtn.style.display = "block";
}

function volumeLevel(track, volume)
{
    console.log("ALO")
    volume.oninput = (e) =>
    {
        track.volume = e.target.value;
    }
}

//--------------- TRACK DURATION ---------------
function trackDuration(track, total)
{
    track.addEventListener("loadedmetadata", function()
    {
        let minutes = parseInt(track.duration/60);
        let seconds = track.duration - (minutes*60);
        let duration = minutes + ":" + parseInt(seconds);

        if(minutes > 9)
            total.innerText = "/" + duration;
        else
            total.innerText = "/0" + duration;
    })
}

trackDuration(track1, total);
trackDuration(track2, total2);
trackDuration(track3, total3);






// progress.addEventListener('click', function(e)
// {
// 	if (track1.currentTime >0){
// 		progress.value = (track1.currentTime / track1.duration) * 100
		
// 		let duracionSegundos = track1.duration.toFixed(0);
// 		dura = secondsToString(duracionSegundos);
// 		let actualSegundos = track1.currentTime.toFixed(0)
// 		actual = secondsToString(actualSegundos);
		
// 		duracion = actual +' / '+ dura;
// 		total.innerHTML = duracion;
// 	}
// })

// progress.addEventListener('click', function(e)
// {
// 	const scrubTime = (e.offsetX / progress.offsetWidth) * track1.duration;
// 	track1.currentTime() = scrubTime;
// 	console.log(e);
// })