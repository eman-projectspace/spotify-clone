console.log("Lets write Javascript");
let currentSong = new Audio();
// let songs;
let songs = [
  "music1.mp1",
  "music1.mp2",
  "music1.mp3",
  "music1.mp4"
];


let currfolder;
// async function getSongs(folder) {
//   currfolder = folder;
//   let a = await fetch(`songs/${folder}/`)
//   let response = await a.text();
//   // console.log(response);
//   let div = document.createElement("div")
//   div.innerHTML = response;
//   let as = div.getElementsByTagName("a")
//   let songs = []
//   for (let index = 0; index < as.length; index++) {
//     const element = as[index];
//     if (element.href.endsWith(".mp3")) {
//       songs.push(element.href.split(`/${folder}/`)[1])
//     }
//   }
//   return songs
// }

async function getSongs(folder) {
  currfolder = folder;
  return songs; // return your array instead of fetching folder
}

const playMusic = (track, pause = false) => {
  currentSong.src = `/songs/${currfolder}/` + track
  if (!pause) {
    currentSong.play()
    play.src = "/imges/video-pause-button.png"
  }
  document.querySelector(".songinfo").innerHTML = decodeURI(track)
  document.querySelector(".songtime").innerHTML = "00.00 / 00.00"

}

async function main() {

  //Get the list of all the songs
  songs = await getSongs("ncs")
  playMusic(songs[0], true)

  //Show all the songs in the playlist
  let songUL = document.querySelector(".song-list").getElementsByTagName("ul")[0]
  for (const song of songs) {
    songUL.innerHTML = songUL.innerHTML + `
    
       <li>
              <img src="/imges/musical-note.png" height="20px" alt="">
              <div class="info">
                <div>${song.replaceAll("%50", " ")}</div>
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
    let index = songs.indexOf(currentSong.src.split("/").slice(-1)[0])
    console.log(songs, index)
    if ((index - 1) >= 0)
      playMusic(songs[index - 1])
  })


  next.addEventListener("click", () => {
    console.log("Next clicked")
    let index = songs.indexOf(currentSong.src.split("/").slice(-1)[0])
    if ((index + 1) >= length)
      playMusic(songs[index + 1])
  })

  //Add an event to volume
  document.querySelector(".range").getElementsByTagName("input")[0].addEventListener("change", (e) => {
    console.log("Setting volume to", e.target.value, "/100")
    currentSong.volume = parseInt(e.target.value) / 100
    if (currentSong.volume > 0) {
      document.querySelector(".volume>img").src = "/imges/speaker-filled-audio-tool.png";
    } else {
      document.querySelector(".volume>img").src = "/imges/volume-mute (1).png";
    }

  })

  //Add event Listner to mute the track
  document.querySelector(".volume>img").addEventListener("click", e => {
    console.log(e.target)
    console.log("changing", e.target.src)
    if (e.target.src.includes("/imges/speaker-filled-audio-tool.png")) {
      e.target.src = e.target.src.replace("/imges/speaker-filled-audio-tool.png", "/imges/volume-mute (1).png")
      currentSong.volume = 0;
      document.querySelector(".range").getElementsByTagName("input")[0].value = 0;
    }
    else {
      e.target.src = e.target.src.replace("/imges/volume-mute (1).png", "/imges/speaker-filled-audio-tool.png")
      currentSong.volume = .10;
      document.querySelector(".range").getElementsByTagName("input")[0].value = 10;
    }
  })

  // Load the playlist whenever card is clicked

}
main()