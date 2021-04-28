import { Music } from "./Music.js";
import { AudioPlayer } from "./AudioPlayer.js";
import { Playlist } from "./Playlist.js";

//------------------ NAV VARIABLES ------------------
const searchBar = document.getElementById("searchBar");
const searchOptions = document.getElementById("searchOptions");
const formOut = document.getElementById("formOut");

//------------------ AUDIO PLAYER VARIABLES ------------------
const allList = document.querySelector(".allList");
let playlistContent;
let select = document.getElementById("selectList");
let idAudio = 1, idList = 1, idUser, userName;

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

//------------------ ADD PLAYLIST DATABASE ------------------
const playListData = (name, title, id) =>
  db.collection("users").doc(name).collection("playlist").doc("playlist"+id).set({
    id,
    title,
    }).then(() => {;
      console.log("Playlist successfully updated!")
    })

//------------------ ADD AUDIO DATABASE ------------------
const audioData = (name, id, title, path) =>
{ 
  db.collection("users").doc(name).collection("playlist").doc("playlist"+select.selectedIndex).collection("audios"+select.selectedIndex).doc(title).set({
    "audio.id": id,
    "audio.title": title,
    "audio.path": path,
  })
  .then(() => {
    console.log("Audio successfully updated!");
  });
}

//------------------ LOAD DATA FROM DATABASE ------------------
const loadData = () =>
{
  db.collection("users").doc("Pablo Andres").collection("playlist").doc("playlist1")
      .onSnapshot((doc) => {
          console.log("Current data: ", doc.data());
          playlistContent.innerHTML = "";
          if(doc.data() != undefined)
          {
            const data = doc.data();
            const playlist = new Playlist(data.id, data.title);
            playlist.create();
            const music = new Music(data.id, data.title, data.path, data.idList);
            const audioPlayer = new AudioPlayer();
            audioPlayer.create(music);
          }
      });
}

//--------------- AUTH STATES ---------------
auth.onAuthStateChanged((user) => {
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
    }
  } else {
    console.log("SESION CERRADA");
  }
});

const getAudios = () => db.collection("audios").get();
const onGetAudios = (callback) => db.collection("users").doc("Pablo Andres").collection("playlist").doc("playlist1").onSnapshot(callback);
const deleteAudios = (id) => db.collection("audios").doc(id).delete();
//const getAudios = (id) => db.collection("audios").doc(id).get();
const updateAudios = (id, updatedAudios) => db.collection('audios').doc(id).update(updatedAudios);

//--------------- WINDOW LOAD-EVENT ---------------
window.addEventListener("DOMContentLoaded", async (e) => 
{
  
  //--------------- LOAD PLAYLIST AND FILE ---------------
  db.collection("users").doc("Pablo Andres").collection("playlist").doc("playlist1")
    .onSnapshot((doc) => {
        console.log("Current playlist data: ", doc.data());
        if(document.getElementById("playlist" + (select.selectedIndex+1)) != null)
        {
          playlistContent.document.getElementById("playlist" + select.selectedIndex);
          playlistContent.innerHTML = "";
        }
        if(doc.data() != undefined)
        {
          const data = doc.data();
          const playlist = new Playlist(data.id, data.title);
          playlist.create();
          // const music = new Music(data.id, data.title, data.path);
          // const audioPlayer = new AudioPlayer();
          // audioPlayer.create(music);
        }
  });
  db.collection("users").doc("Pablo Andres").collection("playlist").doc("playlist1").collection("audios1").doc("Akatsuki Theme")
    .onSnapshot((doc) => {
      console.log("Current audio data: ", doc.data());
      if(doc.data() != undefined)
      {
        const data2 = doc.data();
        const music = new Music(data2.id, data2.title, data2.path);
        const audioPlayer = new AudioPlayer();
        audioPlayer.create(music);
      }
  });


  // if(document.getElementById("playlist" + select.selectedIndex) != null)
  // {
  //   playlistContent.document.getElementById("playlist" + select.selectedIndex);
  //   onGetAudios((querySnapshot) =>
  //   {
  //     playlistContent.innerHTML = "";
  
  //     querySnapshot.forEach(doc => {
  //       const data = doc.data();
  //       data.id = doc.id;
  //       console.log(doc.data());
  
  //       const music = new Music(data.id, data.title, data.path, data.idList);
  //       const audioPlayer = new AudioPlayer();
  //       audioPlayer.create(music);
  //     })
  
  //     let position = 1;
  //     while(position <= playlistContent.querySelectorAll('h6').length)
  //     {
  //       playlistContent.querySelectorAll('h6').forEach(element => 
  //       {
  //         element.innerHTML = position;
  //         position++;
  //       });
  //     }
  //   })
  // }

});

//--------------- CREATE PLAYLIST ---------------
document.getElementById("createList").addEventListener("click", function(e)
{
  let playlistSize = allList.querySelectorAll('h4');
  idList = playlistSize.length + 1;
  console.log(allList);
  console.log("IDLIST: " + idList);
  console.log("playlist" + select.selectedIndex)
  
  const playlist = new Playlist(idList, "Title");
  playlist.create();
  playListData(userName, "Title"+idList, idList);
  playlistContent = document.getElementById("playlist" + select.selectedIndex);
  //console.log("Select option: " + select.selectedIndex);
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
  
    console.log(idAudio);console.log(title);console.log(path);console.log(currentList);
    const music = new Music(idAudio, title, path, currentList);
    const audioPlayer = new AudioPlayer();
    audioPlayer.create(music);

    document.getElementById("title").value = "";
    audioData(userName, idAudio, title, path);
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

    audioData(userName, idAudio, title, path);
  }
})

//--------------- SHOW FORM AUDIO ---------------
select.addEventListener('change',function()
{
  let selectedOption = this.options[select.selectedIndex];
  document.getElementById("formAudio").style.display = "block";
  console.log(selectedOption.value + ': ' + selectedOption.text);
});
