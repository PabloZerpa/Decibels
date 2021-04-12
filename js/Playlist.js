
export class Playlist 
{
    constructor(id, title) 
    {
        this.id = id;
        this.title = title;
    }

    create()
    {
        const allList = document.querySelector(".allList");
        let select = document.getElementById("selectList");
        let tempTitle, idList;
        let playlist = document.createElement("div");
        playlist.setAttribute("class", "playlist");
        const deleteList = (id) => db.collection("playlist").doc(id).delete();

        let playlistContent = document.createElement("div");
        playlistContent.setAttribute("class", "playlistContent");
        playlistContent.setAttribute("id", "playlist" + this.id);

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
        
        let playlistTitle = document.createElement("h4");
        playlistTitle.setAttribute("id", "playlistTitle2");
        playlistTitle.setAttribute("class", "playlistTitle");
        playlistTitle.innerHTML = this.title + " " + this.id;
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
            let playlistSize = allList.querySelectorAll('h4');
            idList = playlistSize.length;
        });

        document.querySelector(".allList").appendChild(playlist);
        playlist.appendChild(playlistInput);
        playlist.appendChild(playlistTitle);
        playlist.appendChild(playlistContent);
        playlist.appendChild(deletePlaylist);
        select.appendChild(option);
        select.selectedIndex = select.length - 1;

    }
}