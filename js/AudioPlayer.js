
export class AudioPlayer {

    create(audio) { //console.log(this.minutes)
      
      let tempVolume, intervalProgress, seconds = 0, minutes = 0, duration = audio.sound.duration;
      const deleteAudios = (id) => db.collection("audios").doc(id).delete();

      //---------- DECLARACION DE ELEMENTOS HTML ----------
      const playlist = document.getElementById("playlist");
      let music = document.createElement("div");
      let title = document.createElement("h5");
      let p = document.createElement("h6");
      let progressBar = document.createElement("div");
      let progress = document.createElement("div");
      let musicControl = document.createElement("div");
      let playMusic = document.createElement("i");
      let pauseMusic = document.createElement("i");
      let redoMusic = document.createElement("i");
      let volumeControl = document.createElement("div");
      let volumeMusic = document.createElement("i");
      let volumeMute = document.createElement("i");
      let volume = document.createElement("input");
      let timeMusic = document.createElement("div");
      let current = document.createElement("p");
      let total = document.createElement("p");
      let deleteMusic = document.createElement("button");
      let editMusic = document.createElement("button");

      //---------- ATRIBUTOS A LOS ELEMENTOS HTML ----------
      music.setAttribute("class", "music");

      title.setAttribute("id", "titleMusic");
      title.innerHTML = audio.title;
      p.innerHTML = audio.id;

      progressBar.setAttribute("class", "progress");
      progress.setAttribute("class", "progress-bar progress-bar-striped progress-bar-animated");
      progress.setAttribute("id", "progress");
      progress.setAttribute("role", "progressbar");

      musicControl.setAttribute("class", "musicControl");
      playMusic.setAttribute("class", "fas fa-play playMusic");
      playMusic.setAttribute("id", "playMusic");
      playMusic.addEventListener("click", function()
      {
        audio.sound.play();
        intervalProgress = setInterval(function()
        { 
          duration = audio.sound.duration;
          if(duration > 0)
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
        }, 1000);
        playMusic.style.display = "none";
        pauseMusic.style.display = "block";
        console.log("PLAY");
      })

      pauseMusic.setAttribute("class", "fas fa-pause pauseMusic");
      pauseMusic.setAttribute("id", "pauseMusic");
      pauseMusic.style.display = "none";
      pauseMusic.addEventListener("click", function(){
        audio.sound.pause();
        clearInterval(intervalProgress);
        pauseMusic.style.display = "none";
        playMusic.style.display = "block";
        console.log("PAUSE");
      })

      redoMusic.setAttribute("class", "fas fa-redo redoMusic");
      redoMusic.setAttribute("id", "redoMusic");
      redoMusic.addEventListener("click", function(){
        audio.sound.currentTime = 0;
        audio.sound.play();
        this.seconds = 0;
        this.minutes = 0;
        console.log("REDO");
      })

      volumeControl.setAttribute("class", "volumeControl");
      volumeMusic.setAttribute("class", "fas fa-volume-up volumeMusic");
      volumeMusic.setAttribute("id", "volumeMusic");
      volumeMusic.addEventListener("click", function(){
        volumeMusic.style.display = "none";
        volumeMute.style.display = "block";
        tempVolume = audio.sound.volume;
        audio.sound.volume = 0;
      })

      volumeMute.setAttribute("class", "fas fa-volume-mute volumeMute");
      volumeMute.style.display = "none";
      volumeMute.addEventListener("click", function(){
        volumeMusic.style.display = "block";
        volumeMute.style.display = "none";
        audio.sound.volume = tempVolume;
      })

      volume.setAttribute("class", "volume");
      volume.setAttribute("id", "volume");
      volume.setAttribute("type", "range");volume.setAttribute("min", "0");volume.setAttribute("max", "1");
      volume.setAttribute("step", "0.01");volume.setAttribute("value", "0.5");
      volume.addEventListener("click", function(){
        volume.oninput = (e) =>
        {
            audio.sound.volume = e.target.value;
            volumeMusic.style.display = "block";
            volumeMute.style.display = "none";
        }
      })

      timeMusic.setAttribute("class", "timeMusic");
      total.setAttribute("id", "totalTime");
      function trackDuration()
      {
        audio.sound.addEventListener("loadedmetadata", function()
        {
            let totalMinutes = parseInt(audio.sound.duration/60);
            let totalSeconds = audio.sound.duration - (totalMinutes*60);
            let totalDuration = totalMinutes + ":" + parseInt(totalSeconds);
    
            if(totalSeconds < 10)
                totalDuration = totalMinutes + ":0" + parseInt(totalSeconds);
            else
                total.innerHTML = "/0" + totalDuration;
            if(totalMinutes > 9)
                total.innerHTML = "/" + totalDuration;
            else
                total.innerHTML = "/0" + totalDuration;
          })  
      };
      trackDuration();

      current.setAttribute("id", "currentTime");
      current.innerHTML = "00:00";

      deleteMusic.setAttribute("class", "btn btn-primary");
      deleteMusic.setAttribute("id", "deleteMusic");
      deleteMusic.setAttribute("data-id", audio.id);
      deleteMusic.innerHTML = "Delete";
      deleteMusic.addEventListener("click", function(e){
        console.log("DELETE")

        audio.sound.pause();
        console.log(e.target.dataset.id);
        deleteAudios(e.target.dataset.id);

        //playlist.removeChild(music);
        playlist.style.height = playlist.clientHeight - 225 + "px";
        let position = 1;
        while(position <= playlist.querySelectorAll('h6').length)
        {
          playlist.querySelectorAll('h6').forEach(element => {
            element.innerHTML = position;
            position++;
          });
        }

      })
      
      editMusic.setAttribute("class", "btn btn-warning");
      editMusic.setAttribute("id", "editMusic");
      editMusic.innerHTML = "Edit";
      editMusic.addEventListener("click", function(){
        console.log("EDIT")
        audio.sound.pause();
        pauseMusic.style.display = "none";
        playMusic.style.display = "block";
        console.log(audio.sound);
      })

      //---------- AGREGACION DE LOS ELEMENTOS AL PLAYLIST ----------
      progressBar.appendChild(progress);
      volumeControl.appendChild(volumeMusic);
      volumeControl.appendChild(volumeMute);
      volumeControl.appendChild(volume);
      musicControl.appendChild(playMusic);
      musicControl.appendChild(pauseMusic);
      musicControl.appendChild(redoMusic);
      musicControl.appendChild(volumeControl);
      musicControl.appendChild(timeMusic);
      timeMusic.appendChild(current);
      timeMusic.appendChild(total);
      music.appendChild(title);
      music.appendChild(p);
      music.appendChild(progressBar);
      music.appendChild(musicControl);
      music.appendChild(deleteMusic);
      music.appendChild(editMusic);

      playlist.appendChild(music);
      playlist.style.height = playlist.clientHeight + 225 + "px";
    }

  }