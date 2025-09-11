console.log("Lets write Javascript");

async function getSongs() {
  let a = await fetch("/extra.html")
  let response = await a.text();
  console.log(response);
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
async function main() {
  //get the list of all the songs
  let songs = await getSongs()

  //Show all the songs in the playlist
  let songUL = document.querySelector(".song-list").getElementsByTagName("ul")[0]
  for (const song of songs) {
    songUL.innerHTML = songUL.innerHTML + `
    
       <li>
              <img src="/imges/musical-note.png" height="20px" alt="">
              <div class="info">
                <div>${song.replaceAll("%20", "")}</div>
                <div>Eman</div>
              </div>
              <div class="playnow"> <span>play now</span> <img src="/imges/play-button.png" height="15px"
                  style="filter: invert();" alt=""></div>

            </li>
    
    `;

  };

}
main()