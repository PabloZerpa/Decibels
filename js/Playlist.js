
export class Playlist 
{
    constructor(id, title) 
    {
        this.id = id;
        this.title = title;
    }

    create()
    {
        let tempTitle;
        let playlist = document.createElement("div");
        playlist.setAttribute("class", "playlist");
        playlist.setAttribute("id", this.id);
        const deleteList = (id) => db.collection("playlist").doc(id).delete();

        let playlistContent = document.createElement("div");
        playlistContent.setAttribute("class", "playlistContent");

        let playlistInput = document.createElement("input");
        playlistInput.setAttribute("type", "text");
        playlistInput.setAttribute("id", "playlistInput2");
        playlistInput.setAttribute("class", "playlistInput");
        document.addEventListener("click", function(e)
        {
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
        
        let playlistTitle = document.createElement("p");
        playlistTitle.setAttribute("id", "playlistTitle2");
        playlistTitle.setAttribute("class", "playlistTitle");
        playlistTitle.innerHTML = this.title + this.id;
        playlistTitle.addEventListener("dblclick", function(e)
        {
          tempTitle = playlistTitle.innerHTML;
          playlistTitle.style.display = "none";
          playlistInput.style.display = "block";
          playlistInput.value = playlistTitle.innerHTML;
        })

        let option = document.createElement("option");
        option.value = playlistTitle.innerHTML;
        option.text = playlistTitle.innerHTML;

        let deletePlaylist = document.createElement("button");
        deletePlaylist.setAttribute("class", "btn btn-secondary deletePlaylist");
        deletePlaylist.setAttribute("id", "deletePlaylist");
        deletePlaylist.setAttribute("data-id", this.id);
        deletePlaylist.innerHTML = "Delete Playlist";
        deletePlaylist.addEventListener("click", (e) =>
        {
            document.querySelector(".allList").removeChild(document.getElementById(this.id))
            document.getElementById("selectList").removeChild(document.getElementById("selectList").lastChild)
            deleteList(e.target.dataset.id);
        });

        document.querySelector(".allList").appendChild(playlist);
        playlist.appendChild(playlistInput);
        playlist.appendChild(playlistTitle);
        playlist.appendChild(playlistContent);
        playlist.appendChild(deletePlaylist);
        let select = document.getElementById('selectList')
        select.appendChild(option);

    }
}