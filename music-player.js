const playlisttab = document.getElementById("playlist")
const songimage = document.getElementById("song-image");
const songname = document.getElementById("song-name");
const songartist = document.getElementById("song-artist");
const musicplayer = document.getElementById("music-player")
const songslider = document.getElementById("slider-song");
const shufflebtn = document.getElementById("shuffle-song")
const repeatbtn = document.getElementById("repeat-song")
const playpausebtn = document.getElementById("playpause-song");
const prevsongbutton = document.getElementById("prev-song");
const nextsongbutton = document.getElementById("next-song");
const songname1 = document.getElementById("song-name1")
const songname2 = document.getElementById("song-name2")
const songname3 = document.getElementById("song-name3")
const songartist1 = document.getElementById("song-artist1")
const songartist2 = document.getElementById("song-artist2")
const songartist3 = document.getElementById("song-artist3")
const songimage1 = document.getElementById("song-image1")
const songimage2 = document.getElementById("song-image2")
const songimage3 = document.getElementById("song-image3")
const playerheader = document.getElementById("player-header")
let shuffling = false
let repeating = false
let x = 0
const songupload = document.getElementById("song-upload")
function makeDraggable(element) {
    if (!element) return;
  
    let initialX = 0;
    let initialY = 0;
    let currentX = 0;
    let currentY = 0;
  
    const header = document.getElementById(element.id + "header");
  
    if (header) {
      header.onmousedown = startDragging;
    } else {
      element.onmousedown = startDragging;
    }
  
    function startDragging(e) {
      e = e || window.event;
      e.preventDefault();
  
      initialX = e.clientX;
      initialY = e.clientY;
  
      document.onmouseup = stopDragging;
      document.onmousemove = drag;
    }
  
    function drag(e) {
      e = e || window.event;
      e.preventDefault();
  
      currentX = initialX - e.clientX;
      currentY = initialY - e.clientY;
  
      initialX = e.clientX;
      initialY = e.clientY;
  
      element.style.top = (element.offsetTop - currentY) + "px";
      element.style.left = (element.offsetLeft - currentX) + "px";
    }
  
    function stopDragging() {
      document.onmouseup = null;
      document.onmousemove = null;
    }
  }
    makeDraggable(musicplayer);
    makeDraggable(playlisttab);
let songs = [
    {
        image: "./giphy.gif",
        name: "Canned Heat",
        artist: "Jamiroquai",
        audio: "./Canned-heat.mp3"
    },
    {
        image: "./giphy.gif",
        name: "Canned Heat",
        artist: "Jamiroquai",
        audio: "./Canned-heat.mp3"
    },
    {
        image: "./giphy.gif",
        name: "Canned Heat",
        artist: "Jamiroquai",
        audio: "./Canned-heat.mp3"
    }
];

const audio = document.createElement("audio");

let currentsongindex = 0;
updatesong(false); // startup
prevsongbutton.addEventListener("click", function(){
    if (repeating == false) {
    if (currentsongindex == 0) {
        currentsongindex = songs.length
    }
    currentsongindex--;
    updatesong(true);
    } else {
    updatesong(true)
}
})

shufflebtn.addEventListener("click", function(){
    if (shuffling == false) {
        shuffling = true
    } else {
        shuffling = false
    }
})

nextsongbutton.addEventListener("click", function(){
    if (repeating == false) {
    if (currentsongindex == songs.length - 1) {
        currentsongindex = 0
        updatesong(true);
    } else {
    currentsongindex++;
    updatesong(true);
    }
} else {
    updatesong(true)
}
})

playpausebtn.addEventListener("click", function() {
    if (!audio.paused) {
        audio.pause();
        playpausebtn.className = 'fa-solid fa-circle-play fa-3x';
    } else {
        audio.play();
        playpausebtn.className = 'fa-solid fa-circle-pause fa-3x';
    }
    
});

function updatesong(autoplay = true) {

    if (shuffling) {
        currentsongindex = Math.floor(Math.random() * songs.length);
    }

    const song = songs[currentsongindex];

    songimage.src = song.image;
    songname.innerText = song.name;
    songartist.innerText = song.artist;
    audio.src = song.audio;

    audio.onloadedmetadata = function() {
        songslider.value = 0;
        songslider.max = audio.duration;
    };

    audio.onloadeddata = function() {
        if (autoplay) {
            playpausebtn.className = 'fa-solid fa-circle-pause fa-3x';
            audio.play();
        } else {
            playpausebtn.className = 'fa-solid fa-circle-play fa-3x';
        }
    };
}

repeatbtn.addEventListener("click", function() {
    if (repeating == false) {
        repeating = true
    } else {
        repeating = false
    }
})

songslider.addEventListener("input", function() {
    audio.currentTime = songslider.value;
})

function moveslider() {
    songslider.value = audio.currentTime;
    if (audio.ended) {
        if (repeating == false) {
        if (currentsongindex == songs.length - 1) {
            currentsongindex = 0;
        }
        else {
            currentsongindex++;
        }
        updatesong(true);
    } else {
        updatesong(true);
    }
    }
}


setInterval(moveslider, 1000);

function getAlbumArt(tags) {
    if (!tags.picture) {
        return "./giphy.gif";
    }

    let base64String = "";

    for (let i = 0; i < tags.picture.data.length; i++) {
        base64String += String.fromCharCode(tags.picture.data[i]);
    }

    return `data:${tags.picture.format};base64,${btoa(base64String)}`;
}
songupload.addEventListener("change", function () {
    const files = Array.from(songupload.files);

    if (files.length > 3) {
        alert("You can only upload up to 3 songs.");
        songupload.value = "";
        return;
    }

    songs = new Array(files.length);

let loadedCount = 0;
function updatePlaylistUI() {
    if (songs[0]) {
        songname1.innerText = songs[0].name;
        songartist1.innerText = songs[0].artist;
    }

    if (songs[1]) {
        songname2.innerText = songs[1].name;
        songartist2.innerText = songs[1].artist;
    }

    if (songs[2]) {
        songname3.innerText = songs[2].name;
        songartist3.innerText = songs[2].artist;
    }
}
files.forEach((file, index) => {
    window.jsmediatags.read(file, {
        onSuccess: function(result) {

            const tags = result.tags;

            let image = "./giphy.gif";

            if (tags.picture) {
                let base64String = "";

                for (let i = 0; i < tags.picture.data.length; i++) {
                    base64String += String.fromCharCode(tags.picture.data[i]);
                }

                image = `data:${tags.picture.format};base64,${btoa(base64String)}`;
            }

            songs[index] = {
                image: image,
                name: tags.title || file.name.replace(/\.[^/.]+$/, ""),
                artist: tags.artist || "Unknown Artist",
                audio: URL.createObjectURL(file)
            };

            loadedCount++;

        if (loadedCount === files.length) {
            currentsongindex = 0;
            updatesong(false);
            updatePlaylistUI();
            console.log(songs);
        }
        },
    
        onError: function() {

            songs[index] = {
                image: "./giphy.gif",
                name: file.name.replace(/\.[^/.]+$/, ""),
                artist: "Unknown Artist",
                audio: URL.createObjectURL(file)
            };

            loadedCount++;

            if (loadedCount === files.length) {
                currentsongindex = 0;
                updatesong(false);
                console.log(files.length);
                console.log(songs);
            }
        }
    });
});
})