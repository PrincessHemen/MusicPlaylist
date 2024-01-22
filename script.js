let progress = document.getElementById("progress");
let song = document.getElementById("song");
let ctrlIcon = document.getElementById("ctrlIcon");
let rewindButton = document.getElementById("rewind");
let fastForwardButton = document.getElementById("fastForward");
let songTitle = document.querySelector(".music-player h1");
let songSinger = document.querySelector(".music-player p");

// Define an array of songs with their information
const songs = [
    {
      title: "Gold",
      singer: "ImagineDragons",
      file: "./media/Gold_ImagineDragons.mp3"
    },
    {
      title: "HallelujahEh",
      singer: "NathanielBassey",
      file: "./media/HallelujahEh_NathanielBassey.mp3"
    },
    {
        title: "ScarsToYourBeautiful",
        singer: "AlessiaCara",
        file: "./media/ScarsToYourBeautiful_AlessiaCara.mp3"
    },
    {
        title: "Unstoppable",
        singer: "Sia",
        file: "./media/05. Unstoppable.mp3"
    },
    {
        title: "Brown Skin Girl",
        singer: "Beyonce ft Wizkid & Blue Ivy",
        file: "./media/15 BROWN SKIN GIRL (feat. Blue Ivy C.mp3"
    },
    {
        title: "Believer",
        singer: "Imagine Dragons",
        file: "./media/035.  Imagine Dragons - Believer.mp3"
    },
    // Add more songs as needed
];
  
let currentSongIndex = 0;
  
function loadCurrentSong() {
   let currentSong = songs[currentSongIndex];
   song.src = currentSong.file;
  
   // Set the song title and singer based on the current song
   songTitle.textContent = currentSong.title;
   songSinger.textContent = currentSong.singer;
  
   // Reset progress and play icon
   progress.value = 0;
   ctrlIcon.src = "./images/play-button-arrowhead.png";
}

function lastSong() {
    // Move to the previous song in the list
    currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
    loadCurrentSong();
};
  
// Event listener for the right arrow (next song)
function nextSong() {
    // Move to the next song in the list
    currentSongIndex = (currentSongIndex + 1) % songs.length;
    loadCurrentSong(); 
};


song.addEventListener('loadeddata', function () {
    // Extract information from the loaded audio file path
    let mediaSource = new URL(song.currentSrc).pathname;
    let fileNameWithoutExtension = mediaSource.split('/').pop().replace('.mp3', '');
    let parts = fileNameWithoutExtension.split('_');

    console.log('Filename:', mediaSource);
    console.log('Title:', parts[0]);
    console.log('Singer:', parts.slice(1).join(' '));

    // Set the song title and singer based on filename parts
    songTitle.textContent = parts[0];
    songSinger.textContent = parts.slice(1).join(' ');
});


// Attach event listeners after setting the src attribute
song.addEventListener('timeupdate', function () {
    progress.value = song.currentTime;
});

function playPause() {
    if (song.paused) {
        song.play();
        ctrlIcon.src = "./images/pause.png";
    } else {
        song.pause();
        ctrlIcon.src = "./images/play-button-arrowhead.png";
    }
}

setInterval(() => {
    if (!song.paused) {
        progress.value = song.currentTime;
    }
}, 500);

progress.onchange = function () {
    song.currentTime = progress.value;
    if (song.paused) {
        song.play();
        ctrlIcon.src = "./images/pause.png";
    } else {
        song.pause();
        ctrlIcon.src = "./images/play-button-arrowhead.png";
    }
};

rewindButton.onclick = function () {
    song.currentTime = 0;
};

fastForwardButton.onclick = function () {
    song.currentTime = song.duration;
};



//Playlist Stuff



const playlistItems = document.querySelectorAll('.playlist-item');

playlistItems.forEach(item => {
    const copyLink = item.querySelector('.copy-link');
    copyLink.addEventListener('click', (event) => {
      event.preventDefault();

      const playlistName = item.textContent.trim();
      const playlistLink = window.location.href + '#' + playlistName;
      navigator.clipboard.writeText(playlistLink)
        .then(() => {
          alert(`Link for ${playlistName} copied to clipboard!`);
        })
        .catch((error) => {
          console.error('Failed to copy link: ', error);
        });
    });
});  