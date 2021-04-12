import { Music } from "./Music.js";
import { AudioPlayer } from "./AudioPlayer.js";
import { Playlist } from "./Playlist.js";

//------------------ NAV VARIABLES ------------------
const searchBar = document.getElementById("searchBar");
const searchOptions = document.getElementById("searchOptions");
const formOut = document.getElementById("formOut");

//------------------ AUDIO PLAYER VARIABLES ------------------
const playlistContent = document.getElementById("playlist1");
const allList = document.querySelector(".allList");
let userData;
let select = document.getElementById("selectList");
let playlistInput = document.getElementById("playlistInput");
let playlistTitle = document.getElementById("playlistTitle");
playlistTitle.innerText = "Title";
let idAudio = 1, idList = 1, tempTitle;

//------------------ DATABASE ------------------
const audioData = (id, title, path, idPlaylist) =>
  db.collection("audios").doc().set({
    id,
    title,
    path,
    idPlaylist,
  });

  const playlistsData = (id, title, user) =>
  db.collection("playlists").doc().set({
    id,
    title,
    user,
  });


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
formOut.addEventListener("click", (e) =>
{
    e.preventDefault();
    auth
        .signOut().then(() =>
        {
            console.log("CERRO SESION");
            window.open("index.html","_self");
        })
})

//--------------- AUTH STATES ---------------
auth.onAuthStateChanged((user) => {
  if (user) {
    console.log("SESION INICIADA");
    if (user != null) {
      let name, email, uid;
      name = user.displayName;
      email = user.email;
      uid = user.uid; 
      userData = name;
      console.log(name);
      console.log(email);
      console.log(uid);
      console.log(userData);
    }
  } else {
    console.log("SESION CERRADA");
  }
});

const getAudios = () => db.collection("audios").get();
const onGetAudios = (callback) => db.collection("audios").onSnapshot(callback);
const deleteAudios = (id) => db.collection("audios").doc(id).delete();
//const getAudios = (id) => db.collection("audios").doc(id).get();
const updateAudios = (id, updatedAudios) => db.collection('audios').doc(id).update(updatedAudios);

//--------------- WINDOW LOAD-EVENT ---------------
window.addEventListener("DOMContentLoaded", async (e) => 
{ console.log(userData);
  document.getElementById("userName").innerHTML = "Welcome " + userData;
  // db.collection("users").get().then((querySnapshot) => 
  // {
  //   querySnapshot.forEach((doc) => {
  //       // doc.data() is never undefined for query doc snapshots
  //       console.log(doc.id, " => ", doc.data());
  //       userData = doc.data();
        
  //   });
  // })

  onGetAudios((querySnapshot) =>
  {
    playlistContent.innerHTML = "";

    querySnapshot.forEach(doc => {
      const data = doc.data();
      data.id = doc.id;
      console.log(doc.data());

      const music = new Music(data.id, data.title, data.path, data.idList);
      const audioPlayer = new AudioPlayer();
      audioPlayer.create(music);
    })

    let position = 1;
    while(position <= playlistContent.querySelectorAll('h6').length)
    {
      playlistContent.querySelectorAll('h6').forEach(element => 
      {
        element.innerHTML = position;
        position++;
      });
    }
  })

});

document.getElementById("createList").addEventListener("click", function(e)
{
  
  let playlistSize = allList.querySelectorAll('h4');
  idList = playlistSize.length + 1;
  console.log(allList);
  
  const playlist = new Playlist(idList, "Title");
  playlist.create();
  playlistsData(idList,"Title",userData.name);
  console.log(select.selectedIndex);
})

//--------------- PC FILE ---------------
document.getElementById("audioFile").addEventListener("change", function(e)
{ 
  console.log("ALO");
  if(document.getElementById("title").value != "")
  {
    let audioPath = URL.createObjectURL(e.target.files[0]);
    // titleMusic.innerText = document.getElementById("audioFile").files[0].name;
    
    let audioSize = playlistContent.querySelectorAll('h5');
    idAudio = audioSize.length + 1;
    
    const title = document.getElementById("title").value,
    path = audioPath;
    let currentList = select.selectedIndex;
  
    console.log(idAudio);
    console.log(title);
    console.log(path);
    console.log(currentList);
    const music = new Music(idAudio, title, path, currentList);
    const audioPlayer = new AudioPlayer();
    audioPlayer.create(music);

    document.getElementById("title").value = "";
    audioData(idAudio,title,path,currentList);
  }
})

//--------------- URL FILE ---------------
document.getElementById("addBtn").addEventListener("click", function(e)
{
  if(document.getElementById("url").value != "" && document.getElementById("title").value != "")
  {
    let audioPath = document.getElementById("url").value;
    let temp = playlistContent.querySelectorAll('h5')
    idAudio = temp.length + 1;

    const title = document.getElementById("title").value,
    path = audioPath;

    const music = new Music(idAudio, title, path);
    const audioPlayer = new AudioPlayer();
    audioPlayer.create(music);
    document.getElementById("title").value = "";
    document.getElementById("url").value = "";

    audioData(idAudio,title,path);
  }
})

//--------------- PLAYLIST TITLE ---------------
playlistTitle.addEventListener("dblclick", function(e)
{
  tempTitle = playlistTitle.innerHTML;
  playlistTitle.style.display = "none";
  playlistInput.style.display = "block";
  playlistInput.value = playlistTitle.innerHTML;
})

//--------------- PLAYLIST INPUT ---------------
document.addEventListener("click", function(e)
{
    // let index;
    // let select = document.getElementById("selectList");
    // for(let i = 0; i < select.length; i++)
    // {
    //   if(select.options[i].text == playlistTitle.innerText)
    //   {
    //     select.selectedIndex = i;
    //     index = i;
    //   }
    // }

    for(let i = 0; i < select.length; i++)
    {
      if(select.options[i].text == tempTitle)
      {
        select.options[i].text = playlistInput.value;
      }
    }

    if(playlistInput.style.display == "block")
    {
        if(e.target != playlistInput)
        {
          if(playlistInput.value == "")
            playlistTitle.innerText = "Title";
          else
            playlistTitle.innerText = playlistInput.value;
            
          playlistTitle.style.display = "block";
          playlistInput.style.display = "none";
        }
    }
}, false);

//--------------- SHOW FORM AUDIO ---------------
select.addEventListener('change',function()
{
  let selectedOption = this.options[select.selectedIndex];
  document.getElementById("formAudio").style.display = "block";
  console.log(selectedOption.value + ': ' + selectedOption.text);
});

//--------------- DELETE PLAYLIST ---------------
document.getElementById('deletePlaylist').addEventListener("click", () =>
{
  document.querySelector(".allList").removeChild(document.getElementById('second'))
  document.getElementById("selectList").removeChild(document.getElementById("selectList").lastChild)
});