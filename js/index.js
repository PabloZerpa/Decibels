
// NAV VARIABLES
const searchBar = document.getElementById("searchBar");
const searchOptions = document.getElementById("searchOptions");
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

// MUSIC CONTROLS VARIABLES
const track1 = document.getElementById("track1");
const track2 = document.getElementById("track2");
const track3 = document.getElementById("track3");
let intervalProgress, duration, intervalTime;
let tempVolume = [0,0,0];
let seconds = 0, minutes = 0;
track1.ondurationchange = function() 
{
	duration = track1.duration;
}


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
})

signUp.addEventListener("click", function()
{
    document.getElementById("formTitle").innerHTML = "Sign Up";
    document.getElementById("formSign").style.display = "block";
    document.getElementById("formLog").style.display = "none";
})

closeBtnForm.addEventListener("click", function()
{   
    formSign.reset();
    formLog.reset();
    
})

//--------------- LOGIN / SIGN WITH FIREBASE ---------------
formLog.addEventListener("submit", (e) =>
{
    e.preventDefault();
    //window.open("user.html","_blank");

    const emailLog = document.getElementById("emailLog").value;
    const passLog = document.getElementById("passLog").value;

    auth
        .signInWithEmailAndPassword(emailLog, passLog)
        .then(userCredential =>
            {
                console.log("SE REGISTRO")
                formSign.reset();
                window.open("user.html","_self");
            })
})

formSign.addEventListener("submit", (e) =>
{
    e.preventDefault();

    const nameSign = document.getElementById("nameSign").value;
    const emailSign = document.getElementById("emailSign").value;
    const passSign = document.getElementById("passSign").value;
    const repassSign = document.getElementById("repassSign").value;

    auth
        .createUserWithEmailAndPassword(emailSign, passSign)
        .then(userCredential =>
            {
                console.log("INICIO SESION")
                formLog.reset();
                window.open("user.html","_blank");
            })
})

// list for auth state changes
auth.onAuthStateChanged((user) => {
  if (user) {
    console.log("SESION INICIADA");
  } else {
    console.log("SESION CERRADA");
  }
});

// Login with Google
googleBtn.addEventListener("click", (e) => {
  e.preventDefault();
  formSign.reset();

  const provider = new firebase.auth.GoogleAuthProvider();
  auth.signInWithPopup(provider).then((result) => {
    console.log(result);
    console.log("google sign in");
  })
  .catch(err => {
    console.log(err);
  })
});

//--------------- PLAY ---------------
function playAudio(track, playMusic, pauseMusic, progress, current)
{
    track.play();
    intervalProgress = setInterval(trackTime, 1000, track, progress, current);
    playMusic.style.display = "none";
    pauseMusic.style.display = "block";
}

//--------------- PAUSE ---------------
function pauseAudio(track, playMusic, pauseMusic)
{
    track.pause();
    clearInterval(intervalProgress);
    pauseMusic.style.display = "none";
    playMusic.style.display = "block";
}

//--------------- REDO ---------------
function redoAudio(track)
{
  track.currentTime = 0;
  if(track.pause())
    track.pause();
  else
    track.play();
  
  seconds = 0;
  minutes = 0;
}

//--------------- VOLUME ---------------
function volumeAudio(track, n, volumeMusic, volumeMute)
{
    volumeMusic.style.display = "none";
    volumeMute.style.display = "block";
    tempVolume[n] = track.volume;
    track.volume = 0;
}

function volumeMute(track, n, volumeMusic, volumeMute)
{
    volumeMusic.style.display = "block";
    volumeMute.style.display = "none";
    track.volume = tempVolume[n];
}

//--------------- VOLUME LEVEL ---------------
function volumeLevel(track, volume)
{
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

//--------------- TRACK LOAD ---------------
function trackTime(track, progress, current)
{   
    
	if(duration>0)
	{
        let porcentaje = track.currentTime*100 / duration;

        if(porcentaje < 100)
            seconds++;
        if(porcentaje == 100)
        {
          seconds = 0;
          minutes = 0;
          pauseMusic.style.display = "none";
          playMusic.style.display = "block";
        }

        if(seconds < 10)
        {
            current.innerText = "0" + minutes + ":" + "0" + seconds;
        }
        else
        {
            current.innerText = "0" + minutes + ":" + seconds;
        }
        if(seconds >59)
        {
            seconds = 0;
            minutes++;
            current.innerText = "0" + minutes + ":" + "0" + seconds;
        }

        progress.style.width = parseInt(porcentaje) + "%";
	}
}

trackDuration(track1, document.getElementById("totalTime"));
trackDuration(track2, document.getElementById("totalTime2"));
trackDuration(track3, document.getElementById("totalTime3"));

// player.innerHTML = `
      //         <div class="music">
      //           <audio id="audioLoad">
      //             <source src="${audio.path}" type="audio/mpeg">
      //           </audio>
      //           <h6 id="titleMusic">${audio.title}</h6>
      //           <p>${audio.id}</p>
      //           <div class="progress">
      //             <div class="progress-bar progress-bar-striped progress-bar-animated" id="progress" role="progressbar" aria-valuenow="50" aria-valuemin="0" aria-valuemax="100" style="width: 0%"></div>
      //           </div>
      //           <div class="musicControl">
      //             <i class="fas fa-play playMusic" id="playMusic" '></i>
      //             <i class="fas fa-pause pauseMusic" id="pauseMusic" " style="display: none;"></i>
      //             <i class="fas fa-redo-alt redoMusic" id="redoMusic" "></i>
      //             <div class="volumeControl">
      //               <i class="fas fa-volume-up volumeMusic" id="volumeMusic" onclick="volumeAudio(${audio})"></i>
      //               <i class="fas fa-volume-mute volumeMute" id="volumeMute" onclick="volumeMute(${audio})" style="display: none;"></i>
      //               <input type="range" name="volume" class="volume" id="volume" onclick="volumeLevel(${audio})" min="0" max="1" step="0.01" value="0.5">
      //             </div>
      //             <div class="timeMusic">
      //               <p id="currentTime">00:00</p>
      //               <p id="totalTime">/00:00</p>
      //             </div>
      //             <button class="btn btn-primary" id="editMusic" onclick="editAudio()">Edit</button>
      //             <button class="btn btn-warning" id="deleteMusic" onclick="deleteAudio()">Delete</button>
      //         </div>
      //     `;






