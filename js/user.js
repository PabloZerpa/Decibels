import { Music } from "./Music.js";
import { AudioPlayer } from "./AudioPlayer.js";

//------------------ NAV VARIABLES ------------------
const searchBar = document.getElementById("searchBar");
const searchOptions = document.getElementById("searchOptions");
const logOut = document.getElementById("logOut");
//------------------ AUDIO PLAYER VARIABLES ------------------
const playList = document.getElementById("playList");
let idAudio = 0, idUser, userName;

//------------------ SEARCH BAR OPTIONS ------------------
searchBar.addEventListener("click", function()
{   
    if(searchOptions.style.display = "none")
        searchOptions.style.display = "block";
    else if(searchBar.style.display = "none")
        searchOptions.style.display = "block";
    
})

//------------------ SEARCH BAR CLICK OUT ------------------
document.addEventListener("click", function(e)
{
    if(searchOptions.style.display == "block")
    {
        if(e.target != searchBar)
            searchOptions.style.display = "none";
    } 
}, false);

//--------------- LOGIN OUT ---------------
logOut.addEventListener("click", (e) =>
{
    e.preventDefault();
    auth
        .signOut().then(() =>
        {
            console.log("CERRO SESION");
            window.open("index.html","_self");
        })
})

//------------------ ADD USER DATABASE------------------
const userData = (id, name, email) =>
{
  db.collection("users").doc(name).set({
    id,
    name,
    email,
  }).then(() => {;
    console.log("User successfully updated!")
  })
}

//------------------ ADD AUDIO DATABASE ------------------
const audioData = (name, id, title, path) =>
{ console.log(name);
  db.collection("users").doc(name).collection("audios").doc(title).set({
    "id": id,
    "title": title,
    "path": path,
  })
  .then(() => {
    console.log("Audio successfully updated!");
  });
}

//--------------- AUTH STATES ---------------
auth.onAuthStateChanged((user) => 
{
  if (user) {
    console.log("SESION INICIADA");
    if (user != null) {
      let email;
      userName = user.displayName;
      email = user.email;
      idUser = user.uid; 
      console.log(userName);console.log(email);console.log(idUser);
      userData(idUser,userName,email);
      document.getElementById("userName").innerHTML = "Welcome " + userName;
      console.log(document.getElementById("userName"));
    }
  } else {
    console.log("SESION CERRADA");
  }
});

const onGetAudios = (callback) => db.collection("users").doc("Pablo Andres").collection("audios").onSnapshot(callback);
//--------------- WINDOW LOAD-EVENT ---------------
window.addEventListener("DOMContentLoaded", async (e) => 
{
  onGetAudios((querySnapshot) =>
  {
      playList.innerHTML = "";

      querySnapshot.forEach(doc => 
      {
        console.log(doc.data());
        const data = doc.data();
        const music = new Music(data.id, data.title, data.path);
        const audioPlayer = new AudioPlayer();
        audioPlayer.create(music);
      });

      let position = 1;
      while(position <= playList.querySelectorAll('h6').length)
      {
        playList.querySelectorAll('h6').forEach(element => 
        {
          element.innerHTML = position;
          position++;
        });
      }
  });
});

//--------------- PC FILE ---------------
document.getElementById("audioFile").addEventListener("change", function(e)
{ 
  console.log("ALO");
  if(document.getElementById("title").value != "")
  {
    let audioPath = URL.createObjectURL(e.target.files[0]);
    // titleMusic.innerText = document.getElementById("audioFile").files[0].name;
    
    //let audioSize = playlistContent.querySelectorAll('h5');
    //idAudio = audioSize.length + 1;
    
    const title = document.getElementById("title").value,
    path = audioPath;
    //let currentList = select.selectedIndex;
    idAudio++;
  
    console.log(idAudio);console.log(title);console.log(path);
    const music = new Music(idAudio, title, path);
    const audioPlayer = new AudioPlayer();
    audioPlayer.create(music);

    document.getElementById("title").value = "";
    audioData(userName, idAudio, title, path);
  }
})

//--------------- URL FILE ---------------
document.getElementById("addBtn").addEventListener("click", function(e)
{
  if(document.getElementById("addBtn").value == "Add")
  {
    if(document.getElementById("url").value != "" && document.getElementById("title").value != "")
    {
      let audioPath = document.getElementById("url").value;
      // let temp = playlistContent.querySelectorAll('h5')
      // idAudio = temp.length + 1;
      idAudio++; 
  
      const title = document.getElementById("title").value,
      path = audioPath;
  
      const music = new Music(idAudio, title, path);
      const audioPlayer = new AudioPlayer();
      audioPlayer.create(music);
      document.getElementById("title").value = "";
      document.getElementById("url").value = "";
  
      audioData(userName, idAudio, title, path);
    }
  }
})

