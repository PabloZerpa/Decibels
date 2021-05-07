
export class AudioPlayer {

  create(audio) {

    let playlistContent = document.getElementById("playList");;
    let newAudio = document.createElement("div");
    newAudio.setAttribute("class", "music");
    newAudio.setAttribute("id", audio.id);
    newAudio.innerHTML += `
    <div class="overlay"></div>
    <div class="musicContent">
      <audio id=${audio.sound}>
        <source id="musicPath${audio.id}" src="/${audio.path}" type="audio/mpeg">
        Your browser does not support the audio element.
      </audio>
      <h2 id="musicTitle${audio.id}">${audio.title}</h2>
      <h3 id="musicName${audio.id}">Name of the Band</h3>
      <div class="progress">
        <input id="progressBar" type="range" value="0" />
      </div>
      <div class="musicControls">
        <div class="musicColumn"><i  id="redoMusic" class="fa fa-redo-alt"></i></div>
        <div class="musicColumn"><i class="fa fa-step-backward"></i></div>
        <div class="musicColumn"><i  id="playMusic" class="fa fa-play play-btn fa-fw"></i></div>
        <div class="musicColumn"><i  id="pauseMusic" class="fa fa-pause pause-btn fa-fw" style="display: none;"></i></div>
        <div class="musicColumn"><i class="fa fa-step-forward"></i></div>
        <div class="musicColumn">
          <div class="musicVolume">
            <i class="fas fa-volume-up" id="volumeMusic"></i>
            <i class="fas fa-volume-mute" id="muteMusic"></i>
            <input type="range" name="volume" id="volume" min="0" max="1" step="0.01" value="0.5">
          </div>
        </div>
        <div class="musicTime">
          <p id="currentTime">00:00</p>
          <p id="totalTime">/00:00</p>
        </div>
        <button class="btn btn-outline-warning" id="deleteBtn${audio.id}">Delete</button>
        <button class="btn btn-outline-primary" id="editBtn${audio.id}">Edit</button>
      </div>
    </div>
    `;

    playlistContent.appendChild(newAudio);
    playlistContent.style.height = playlistContent.clientHeight + 225 + "px";

    //------------------------------------------------------------------------------------------------------//
    let totalTime = document.getElementById("totalTime");
    let progress = document.getElementById("progressBar");
    let currentTime = document.getElementById("currentTime");
    let tempVolume = 0, duration, seconds = 0, minutes = 0, intervalProgress;
    audio.ondurationchange = function() 
    {
      duration = audio.duration;
    }
    let playMusic = document.getElementById("playMusic");
    let pauseMusic = document.getElementById("pauseMusic");
    let redoMusic = document.getElementById("redoMusic");
    let volumeMusic = document.getElementById("volumeMusic");
    let muteMusic = document.getElementById("muteMusic");
    let volume = document.getElementById("volume");

    playMusic.addEventListener("click", function()
    {
        audio.sound.play();
        intervalProgress = setInterval(audioTime, 1000, audio, progress, currentTime);
        playMusic.style.display = "none";
        pauseMusic.style.display = "block";
        console.log("PLAY");
    });

    pauseMusic.addEventListener("click", function()
    {
        audio.sound.pause();
        clearInterval(intervalProgress);
        playMusic.style.display = "block";
        pauseMusic.style.display = "none";
        console.log("PAUSE");
    });

    redoMusic.addEventListener("click", function()
    {
        audio.sound.currentTime = 0;
        if(audio.sound.pause())
            audio.sound.pause();
        else
            audio.sound.play();
        
        seconds = 0;
        minutes = 0;
        console.log("REDO");
    });

    volumeMusic.addEventListener("click", function()
    {
        volumeMusic.style.display = "none";
        muteMusic.style.display = "block";
        tempVolume = audio.sound.volume;
        audio.sound.volume = 0;
    });

    muteMusic.addEventListener("click", function()
    {
        volumeMusic.style.display = "block";
        muteMusic.style.display = "none";
        audio.sound.volume = tempVolume;
    });

    volume.addEventListener("click", function()
    {
        volume.oninput = (e) =>
        {
            audio.sound.volume = e.target.value;
            volumeMusic.style.display = "block";
            muteMusic.style.display = "none";
        }
    });

    audio.sound.addEventListener("loadedmetadata", function()
    {
        audioDuration(totalTime);
    })  

    function audioDuration(totalTime)
    {   console.log("Total Duration")
        let totalMinutes = parseInt(audio.sound.duration/60);
        let totalSeconds = audio.sound.duration - (totalMinutes*60);
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
            let porcentaje = audio.sound.currentTime*100 / duration;

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
    //------------------------------------------------------------------------------------------------------//

    const deleteAudios = (id) => db.collection("users").doc("Pablo Andres").collection("audios").doc(id).delete();
    let deleteBtn = document.getElementById("deleteBtn" + audio.id);
    let currentDelete = deleteBtn.parentNode.parentNode.parentNode;
    deleteBtn.addEventListener("click", function()
    {
      audio.sound.pause();
      deleteAudios(audio.title);
      playlistContent.style.height = (playlistContent.clientHeight - 225) + "px";
      console.log("DELETE");
    });

    const updateAudios = (id, title, path) => db.collection("users").doc("Pablo Andres").collection('audios').doc(id).update({"title": title,"path" : path,});
    let editBtn = document.getElementById("editBtn" + audio.id);
    let currentEdit = editBtn.parentNode.parentNode.parentNode;
    editBtn.addEventListener("click", function()
    {
      audio.sound.pause();
      clearInterval(intervalProgress);
      playMusic.style.display = "block";
      pauseMusic.style.display = "none";

      document.getElementById("title").value = audio.title;
      document.getElementById("url").value = audio.path;
      document.getElementById("addBtn").value = "Edit";
      console.log("EDIT");
    });

    document.getElementById("addBtn").addEventListener("click", function(e)
    {
      if(document.getElementById("addBtn").value == "Edit")
      {
        if(document.getElementById("url").value != "" && document.getElementById("title").value != "")
        {
          document.getElementById("musicTitle"+audio.id).innerHTML = document.getElementById("title").value;
          document.getElementById("musicPath"+audio.id).setAttribute("src", document.getElementById("url").value);
          console.log(document.getElementById("musicTitle"+audio.id));console.log(document.getElementById("musicPath"+audio.id))

          updateAudios(audio.title, document.getElementById("title").value, document.getElementById("url").value);

          document.getElementById("title").value = "";
          document.getElementById("url").value = "";
          document.getElementById("addBtn").value = "Add";
          console.log("POST-EDIT");
        }
      }
    });
  }

}