import { Music } from "./Music.js";
import { AudioPlayer } from "./AudioPlayer.js";

//------------------ NAV VARIABLES ------------------
const searchBar = document.getElementById("searchBar");
const searchOptions = document.getElementById("searchOptions");
const formOut = document.getElementById("formOut");

//------------------ AUDIO PLAYER VARIABLES ------------------
const playlist = document.getElementById("playlist");
let playlistInput = document.getElementById("playlistInput");
let playlistTitle = document.getElementById("playlistTitle");
playlistTitle.innerText = "Title";
let iden = 1;

//------------------ DATABASE ------------------
const audioData = (id, title, path) =>
  db.collection("audios").doc().set({
    id,
    title,
    path,
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

window.addEventListener("DOMContentLoaded", async (e) => 
{
  onGetAudios((querySnapshot) =>
  {
    // querySnapshot = getAudios();
    playlist.innerHTML = "";

    querySnapshot.forEach(doc => {
      const data = doc.data();
      data.id = doc.id;
      console.log(doc.data());

  
      const music = new Music(data.id, data.title, data.path);
      const audioPlayer = new AudioPlayer();
      audioPlayer.create(music);
    })
    let position = 1;
    while(position <= playlist.querySelectorAll('h6').length)
    {
      playlist.querySelectorAll('h6').forEach(element => 
      {
        element.innerHTML = position;
        position++;
      });
    }
  })

});

//--------------- PC FILE ---------------
document.getElementById("audioFile").addEventListener("change", function(e)
{
  if(document.getElementById("title").value != "")
  {
    let audioPath = URL.createObjectURL(e.target.files[0]);
    console.log(audioPath);
    // titleMusic.innerText = document.getElementById("audioFile").files[0].name;
  
    let temp = playlist.querySelectorAll('h5')
    iden = temp.length + 1; //console.log(temp.length);
    
    const title = document.getElementById("title").value,
    path = audioPath;
  
    const music = new Music(iden, title, path);
    const audioPlayer = new AudioPlayer();
    audioPlayer.create(music);
    document.getElementById("title").value = "";
  
    audioData(iden,title,path);
  }
})

//--------------- URL FILE ---------------
document.getElementById("addBtn").addEventListener("click", function(e)
{
  
  if(document.getElementById("url").value != "" && document.getElementById("title").value != "")
  {
    let audioPath = document.getElementById("url").value;
    let temp = playlist.querySelectorAll('h5')
    iden = temp.length + 1; //console.log(temp.length);

    const title = document.getElementById("title").value,
    path = audioPath;

    const music = new Music(iden, title, path);
    const audioPlayer = new AudioPlayer();
    audioPlayer.create(music);
    document.getElementById("title").value = "";
    document.getElementById("url").value = "";

    audioData(iden,title,path);
  }
})

//--------------- PLAYLIST TITLE ---------------
playlistTitle.addEventListener("dblclick", function(e)
{
  playlistTitle.style.display = "none";
  playlistInput.style.display = "block";
  playlistInput.value = playlistTitle.innerHTML;
})

//--------------- PLAYLIST INPUT ---------------
document.addEventListener("click", function(e)
{
    let index;
    let select=document.getElementById("selectList");
    for(let i=1;i<select.length;i++)
    {
      if(select.options[i].text==playlistTitle.innerText)
      {
        select.selectedIndex=i;
        index = i;
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
        select.options[index].text = playlistTitle.innerText;
    } 
}, false);

let select = document.getElementById('selectList');
select.addEventListener('change',function()
{
    document.getElementById("formAudio").style.display = "block";
    let selectedOption = this.options[select.selectedIndex];
    console.log(selectedOption.value + ': ' + selectedOption.text);

    if(selectedOption.value == "create")
    {
      createList()
    }
});

function createList()
{
  let list2 = document.createElement("div");
  list2.setAttribute("class", "list");
  let playlist2 = document.createElement("div");
  playlist2.setAttribute("class", "playlist");
  let playlistInput2 = document.createElement("input");
  playlistInput2.setAttribute("type", "text");
  playlistInput2.setAttribute("id", "playlistInput2");
  playlistInput2.setAttribute("class", "playlistInput");
  let playlistTitle2 = document.createElement("p");
  playlistTitle2.setAttribute("id", "playlistTitle2");
  playlistTitle2.setAttribute("class", "playlistTitle");
  playlistTitle2.innerHTML = "Title";

  document.querySelector(".allList").appendChild(list2);
  list2.appendChild(playlistInput2);
  list2.appendChild(playlistTitle2);
  list2.appendChild(playlist2);
}