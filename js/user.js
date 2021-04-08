import { Music } from "./Music.js";
import { AudioPlayer } from "./AudioPlayer.js";
import { Playlist } from "./Playlist.js";

//------------------ NAV VARIABLES ------------------
const searchBar = document.getElementById("searchBar");
const searchOptions = document.getElementById("searchOptions");
const formOut = document.getElementById("formOut");

//------------------ AUDIO PLAYER VARIABLES ------------------
const playlistContent = document.getElementById("playlistContent");
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

  const playlistsData = (id, title) =>
  db.collection("playlists").doc().set({
    id,
    title,
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
{
  onGetAudios((querySnapshot) =>
  {
    playlistContent.innerHTML = "";

    querySnapshot.forEach(doc => {
      const data = doc.data();
      data.id = doc.id;
      console.log(doc.data());

      const music = new Music(data.id, data.title, data.path);
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
  const playlist = new Playlist(idList, "Title");
  playlist.create();
  playlistsData(idList,"Title");
  idList++;
})

//--------------- PC FILE ---------------
document.getElementById("audioFile").addEventListener("change", function(e)
{
  if(document.getElementById("title").value != "")
  {
    let audioPath = URL.createObjectURL(e.target.files[0]);
    console.log(audioPath);
    // titleMusic.innerText = document.getElementById("audioFile").files[0].name;
    
    let temp = playlistContent.querySelectorAll('h5')
    idAudio = temp.length + 1;
    idList++;
    
    const title = document.getElementById("title").value,
    path = audioPath;
  
    const music = new Music(idAudio, title, path);
    const audioPlayer = new AudioPlayer();
    audioPlayer.create(music);

    document.getElementById("title").value = "";
    audioData(idAudio,title,path,idList);
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

    let select = document.getElementById("selectList");
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
let select = document.getElementById('selectList');
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