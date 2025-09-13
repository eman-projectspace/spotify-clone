console.log("Lets write Javascript");
let currentSong = new Audio();
let songs;

async function getSongs() {
  let a = await fetch("/songs")
  let response = await a.text();
  // console.log(response);
  let div = document.createElement("div")
  div.innerHTML = response;
  let as = div.getElementsByTagName("a")
  let songs = []
  for (let index = 0; index < as.length; index++) {
    const element = as[index];
    if (element.href.endsWith(".mp3")) {
      songs.push(element.href.split("/songs/")[1])
    }
  }
  return songs
}


const playMusic = (track, pause = false) => {
  currentSong.src = "songs/" + track
  if (!pause) {
    currentSong.play()
    play.src = "/imges/video-pause-button.png"
  }
  document.querySelector(".songinfo").innerHTML = track
  document.querySelector(".songtime").innerHTML = "00.00 / 00.00"

}

async function main() {

  //Get the list of all the songs
  songs = await getSongs()
  playMusic(songs[0], true)
  //Show all the songs in the playlist
  let songUL = document.querySelector(".song-list").getElementsByTagName("ul")[0]
  for (const song of songs) {
    songUL.innerHTML = songUL.innerHTML + `
    
       <li>
              <img src="/imges/musical-note.png" height="20px" alt="">
              <div class="info">
                <div>${song.replaceAll("%50", "")}</div>
                <div>Eman</div>
              </div>
              <div class="playnow"> <span>play now</span> <img src="/imges/play-button.png" height="15px"
                  style="filter: invert();" alt=""></div>

            </li>
    
    `;

  };
  //Attach an event listner to each song

  Array.from(document.querySelector(".song-list").getElementsByTagName("li")).forEach(e => {
    e.addEventListener("click", element => {

      console.log(e.querySelector(".info").firstElementChild.innerHTML)

      playMusic(e.querySelector(".info").firstElementChild.innerHTML.trim())
    })
  })
  //Attach event listner to next and previous

  play.addEventListener("click", () => {
    if (currentSong.paused) {
      currentSong.play()
      play.src = "/imges/video-pause-button.png"
    } else {
      currentSong.pause()
      play.src = "/imges/play-button.png"
    }
  })

  //Listen for timeupdate event
  currentSong.addEventListener("timeupdate", () => {
    console.log(currentSong.currentTime, currentSong.duration);

    // optional: update UI
    document.querySelector(".songtime").innerHTML =
      formatTime(currentSong.currentTime) + " / " + formatTime(currentSong.duration);


    //working seekbar
    document.querySelector(".circle").style.left = (currentSong.currentTime / currentSong.duration) * 100 + "%"



  });


  function formatTime(seconds) {
    if (isNaN(seconds)) return "00:00";
    let minutes = Math.floor(seconds / 60);
    let secs = Math.floor(seconds % 60);
    return `${minutes.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  }

  //Add an Event Listen to seekbar
  document.querySelector(".seekbar").addEventListener("click", e => {
    let percent = (e.offsetX / e.target.getBoundingClientRect().width) * 100
    document.querySelector(".circle").style.left = percent + "%"
    currentSong.currentTime = ((currentSong.duration) * percent) / 100
  })

  //Menu toggle functionality
  document.querySelector(".menu").addEventListener("click", () => {
    const leftSide = document.querySelector(".Left-Side");
    leftSide.classList.toggle("show");
  });

  //Add button functionality to hide sidebar
  document.querySelector(".close").addEventListener("click", () => {
    const leftSide = document.querySelector(".Left-Side");
    leftSide.classList.remove("show");
  });


  //Previous Song
  previous.addEventListener("click", () => {
    console.log("previous clicked")
    console.log(currentSong)
    let index = songs.indexOf(currentSong.src.split("/").slice(-1)[0])
    console.log(songs, index)
    if ((index - 1) >= 0)
      playMusic(songs[index - 1])
  })


  next.addEventListener("click", () => {
    console.log("Next clicked")
    let index = songs.indexOf(currentSong.src.split("/").slice(-1)[0])
    console.log(songs, index)
    if ((index + 1) >= length)
      playMusic(songs[index + 1])
  })



}
main()