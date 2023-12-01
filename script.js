"use strict";
const imgEl = document.getElementById('bg_img');
const imgCoverEl = document.getElementById('cover');
const musicTitleEl = document.getElementById('music_title');
const musicArtistEl = document.getElementById('music_artist');
const playerProgressEl = document.getElementById('player_progress');
const progressEl = document.getElementById('progress');
const currentTimeEl = document.getElementById('current_time');
const durationEl = document.getElementById('duration');

const prevBtnEl = document.getElementById('previous');
const playBtnEl = document.getElementById('play');
const nextBtnEl = document.getElementById('next');


const songs =[
     {
        Path:"mp3/Ordinary Person.mp3",
        displayName:"Ordinary Person",
        cover:"img_audio/thalapathyvijayleo41687412697.webp",
        artist:"Anirudh Ravichandran"
    },
     {
        Path:"mp3/cold.mp3",
        displayName:"cold",
        cover:"img_audio/neffex.jpg",
        artist:"NEFFEX"
    },
     {
        Path:"mp3/darkside.mp3",
        displayName:"darkside",
         cover:"img_audio/alan-walker-poster-yazitmrmam8u88tj.jpg",
        artist:"Alan Walker"
    },
    {
        Path:"mp3/Bones.mp3",
        displayName:"Imagine Dragons,Bones",
        cover:"img_audio/bone.jpg",
        artist:"POP BAND"
    },
    {
        Path:"mp3/Gangsta's.mp3",
        displayName:"Gangsta's Paradise",
        cover:"img_audio/gangsta.avif",
        artist:"Coolio & Kylian Mash"
    },
    {
        Path:"mp3/Grateful.mp3",
        displayName:"Grateful",
        cover:"img_audio/neffex.jpg",
        artist:"NEFFEX"
    },
    {
        Path:"mp3/Guli Mata.mp3",
        displayName:"Gulli Matta",
        cover:"img_audio/gullimata.jpg",
        artist:"Shreya Ghoushal"
    },
    {
        Path:"mp3/Headlights.mp3",
        displayName:"Headlights",
        cover:"img_audio/alan-walker-poster-yazitmrmam8u88tj.jpg",
        artist:"Alan Walker"
    },
    {
        Path:"mp3/Maan Meri Jaan.mp3",
        displayName:"Man Meri Jaan",
        cover:"img_audio/Maan-Meri-Jaan-Vijay.jpeg",
        artist:"KING"
    },
]

const music = new Audio();

let musicIndex = 0;
let isPlaying = false;

// play song true or false------------
function togglePlay(){
    if(isPlaying){
        pauseMusic();
    } else{
        playMusic(); 
    }
}
// play music=========
function playMusic(){
    isPlaying = true;
    playBtnEl.classList.replace("fa-play", "fa-pause")
    playBtnEl.setAttribute("title", "pause");
    music.play();
}
function pauseMusic(){
    isPlaying = false;
    playBtnEl.classList.replace("fa-pause", "fa-play")
    playBtnEl.setAttribute("pause", "title");
    music.pause();
}

  function loadMusic(song){
    music.src = song.Path;
    musicTitleEl.textContent = song.displayName;
    musicArtistEl.textContent = song.artist;
    imgCoverEl.src = song.cover;
    imgEl.src = song.cover;
  }

  function changeMusic(direction){
     musicIndex = musicIndex + direction + (songs.length % songs.length)
     loadMusic(songs[musicIndex]);
     music.play();
  }
//   set progress=============
function setProgressBar(e){
    const width = playerProgressEl.clientWidth;
    const xValue = e.offsetX;
    music.currentTime = (xValue/width) * music.duration;
}

function updateprogressBar(){
    const{duration,currentTime} = music;
     const progressPercent = (currentTime / duration) * 100;
    progressEl.style.width = `${progressPercent}%`;

    const formattime = (timeRanges)=>String(Math.floor(timeRanges)).padStart(2, "0");
    durationEl.textContent = `${formattime(duration / 60)}:${formattime(duration % 60,
        )}`
        currentTimeEl.textContent = `${formattime(currentTime / 60)}:${formattime(currentTime % 60,
            )}`
        
        
}

const btnEvents = () =>{
    playBtnEl.addEventListener("click", togglePlay);
    nextBtnEl.addEventListener("click", ()=>changeMusic(1));
    prevBtnEl.addEventListener("click", ()=>changeMusic(-1));


    // progressBar================
    playerProgressEl.addEventListener("click", setProgressBar);
    music.addEventListener("ended", ()=> changeMusic(1));
    music.addEventListener("timeupdate", updateprogressBar);
};
document.addEventListener("DOMContentLoaded", btnEvents);

loadMusic(songs[musicIndex]);