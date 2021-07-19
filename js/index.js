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

// MUSIC CONTROLS VARIABLES
const audio = document.getElementById("audio1");
let totalTime1 = document.getElementById("totalTime1");
let totalTime2 = document.getElementById("totalTime2");
let totalTime3 = document.getElementById("totalTime3");
let tempVolume = 0, duration, seconds = 0, minutes = 0, intervalProgress;
audio.ondurationchange = function() 
{
	duration = audio.duration;
}

//----------------- MOBIL NAV --------------------------
const hamburgerButton = document.getElementById('hamburger');
const navList = document.getElementById('navLinks');
const navBtn = document.getElementById('navBtn');
const nav = document.getElementById('nav');

function toggleButton() 
{
    if(navList.style.display == "block")
    {
        navList.style.display = "none";
        navBtn.style.display = "none";
    }
    else
    {
        navList.style.display = "block";
        navBtn.style.display = "block";
    }
}
hamburgerButton.addEventListener('click', toggleButton);

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

//--------------- LOGIN WITH FIREBASE ---------------
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
                console.log("INICIO SESION")
                formLog.reset();
                window.open("user.html","_self");
            })
})

//--------------- SIGN UP WITH FIREBASE ---------------
formSign.addEventListener("submit", (e) =>
{
    e.preventDefault();

    const nameSign = document.getElementById("nameSign").value;
    const emailSign = document.getElementById("emailSign").value;
    const passSign = document.getElementById("passSign").value;
    const repassSign = document.getElementById("repassSign").value;

    if(repassSign == passSign)
    {  
        auth.createUserWithEmailAndPassword(emailSign, passSign)
            .then(userCredential =>
            {
                console.log("SE REGISTRO");
                
                let user = firebase.auth().currentUser;
                user.updateProfile({
                displayName: nameSign,
                }).then(function() {
                // Update successful.
                }).catch(function(error) {
                // An error happened.
                });
                
                formSign.reset();
                window.open("user.html","_blank");
            })
    }
})

//--------------- LIST FOR AUTH STATE CHANGES ---------------
auth.onAuthStateChanged((user) => 
{
  if (user) {
    console.log("SESION INICIADA");

  } else {
    console.log("SESION CERRADA");
  }
});

//--------------- LOGIN WITH GOOGLE ---------------
googleBtn.addEventListener("click", (e) => 
{
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

function playAudio(audio,playMusic,pauseMusic,progress,currentTime)
{
    audio.play();
    intervalProgress = setInterval(audioTime, 1000, audio, progress, currentTime);
    playMusic.style.display = "none";
    pauseMusic.style.display = "block";
    console.log("PLAY");
}

function pauseAudio(audio,playMusic,pauseMusic)
{
    audio.pause();
    clearInterval(intervalProgress);
    playMusic.style.display = "block";
    pauseMusic.style.display = "none";
    console.log("PAUSE");
}

function redoAudio(audio)
{
    audio.currentTime = 0;
    if(audio.pause())
        audio.pause();
    else
        audio.play();
    
    seconds = 0;
    minutes = 0;
    console.log("REDO");
}

function volumeAudio(audio,volumeMusic,muteMusic)
{
    volumeMusic.style.display = "none";
    muteMusic.style.display = "block";
    tempVolume = audio.volume;
    audio.volume = 0;
}

function muteAudio(audio,volumeMusic,muteMusic)
{
    volumeMusic.style.display = "block";
    muteMusic.style.display = "none";
    audio.volume = tempVolume;
}

function volumeLevel(audio,volume,volumeMusic,muteMusic)
{
    volume.oninput = (e) =>
    {
        audio.volume = e.target.value;
        volumeMusic.style.display = "block";
        muteMusic.style.display = "none";
    }
}

audio.addEventListener("loadedmetadata", function()
{
    audioDuration(totalTime1);
    audioDuration(totalTime2);
    audioDuration(totalTime3);
})  

function audioDuration(totalTime)
{   console.log("Total Duration")
    let totalMinutes = parseInt(audio.duration/60);
    let totalSeconds = audio.duration - (totalMinutes*60);
    let totalDuration = totalMinutes + ":" + parseInt(totalSeconds);

    if(totalSeconds < 10)
        totalDuration = totalMinutes + ":0" + parseInt(totalSeconds);
    else
        totalTime.innerHTML = "/0" + totalDuration;
    if(totalMinutes > 9)
        totalTime.innerHTML = "/" + totalDuration;
    else
        totalTime.innerHTML = "/0" + totalDuration;
}

function audioTime(audio, progress, current)
{   
	if(duration>0)
	{
        let porcentaje = audio.currentTime*100 / duration;

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