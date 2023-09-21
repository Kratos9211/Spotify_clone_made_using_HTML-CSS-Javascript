//Initialise the variables
let songIndex=0;
let audioElement = new Audio('songs/1.mp3');
let masterPlay=document.getElementById('masterplay');
let myProgessBar=document.getElementById('myProgressBar');
let gif=document.getElementById("gif");
let masterSongName=document.getElementById("masterSongName");
let songItems=Array.from(document.getElementsByClassName("songItem"));

let songs=[
    {songName:"Warriyo - Mortals ",filePath:'songs/1.mp3',coverPath:'covers/1.jpg'},
    {songName:"Cielo- Huma-Huma ",filePath:'songs/2.mp3',coverPath:'covers/2.jpg'},
    {songName:"DEAF KEV ",filePath:'songs/3.mp3',coverPath:'covers/3.jpg'},
    {songName:"Different Heaven & ENIDE ",filePath:'songs/4.mp3',coverPath:'covers/4.jpg'},
    {songName:"Janji-Heroes-Tonight-feat-Johnning ",filePath:'songs/5.mp3',coverPath:'covers/5.jpg'},
    {songName:"WhatsUp Danger",filePath:'songs/6.mp3',coverPath:'covers/10.jpg'},
    {songName:"Scared of the Dark",filePath:'songs/7.mp3',coverPath:'covers/10.jpg'},
    {songName:"Invincible",filePath:'songs/8.mp3',coverPath:'covers/10.jpg'},
    {songName:"Sunflower",filePath:'songs/9.mp3',coverPath:'covers/10.jpg'},

]

songItems.forEach((element, i)=>{ 
    element.getElementsByTagName("img")[0].src = songs[i].coverPath; 
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName; 
})

//audioElement.play();

//Handle play /pause click
masterPlay.addEventListener("click",()=>{
    if (audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        masterPlay.classList.remove("fa-play-circle");
        masterPlay.classList.add("fa-pause-circle");
        gif.style.opacity=1;
    }
    else{
        audioElement.pause();
        masterPlay.classList.remove("fa-pause-circle");
        masterPlay.classList.add("fa-play-circle");
        gif.style.opacity=0;
    }
})

//Listen to Events
audioElement.addEventListener("timeupdate",()=>{
    //Update seekbar
    progress=parseInt((audioElement.currentTime/audioElement.duration)*100);
    myProgessBar.value=progress;
})

myProgessBar.addEventListener("change",()=>{
    audioElement.currentTime=(myProgessBar.value*audioElement.duration)/100;

})

const makeAllplays=()=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.classList.remove("fa-pause-circle");
        element.classList.add("fa-play-circle");
    })
}


Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
    element.addEventListener("click", (e) => {
        // Get the ID of the clicked play button
        const clickedId = parseInt(e.target.id);

        // Check if the clicked song is already playing
        if (songIndex === clickedId) {
            // If it's already playing, pause it
            if (!audioElement.paused) {
                audioElement.pause();
                e.target.classList.remove("fa-pause-circle");
                e.target.classList.add("fa-play-circle");
                gif.style.opacity = 0;
                masterPlay.classList.remove("fa-pause-circle");
                masterPlay.classList.add("fa-play-circle");
            } else {
                // If it's paused, resume playing
                audioElement.play();
                e.target.classList.remove("fa-play-circle");
                e.target.classList.add("fa-pause-circle");
                gif.style.opacity = 1;
                masterPlay.classList.remove("fa-play-circle");
                masterPlay.classList.add("fa-pause-circle");
            }
        } else {
            // If a different song is clicked, load and play that song
            songIndex = clickedId;
            audioElement.src = `songs/${songIndex}.mp3`;
            masterSongName.innerText = songs[songIndex - 1].songName;
            audioElement.currentTime = 0;
            audioElement.play();
            gif.style.opacity = 1;

            // Update the play button for the clicked song
            Array.from(document.getElementsByClassName('songItemPlay')).forEach((button) => {
                button.classList.remove("fa-pause-circle");
                button.classList.add("fa-play-circle");
            });
            e.target.classList.remove("fa-play-circle");
            e.target.classList.add("fa-pause-circle");

            // Update the master play button
            masterPlay.classList.remove("fa-play-circle");
            masterPlay.classList.add("fa-pause-circle");
        }
    });
});


document.getElementById("next").addEventListener("click",()=>{
    if(songIndex>=9){
        songIndex=0;
    }
    else{
        songIndex+=1;
    }
    audioElement.src=`songs/${songIndex}.mp3`;
    masterSongName.innerText=songs[songIndex-1].songName;
    audioElement.currentTime=0;
    audioElement.play();
    gif.style.opacity=1;
    masterPlay.classList.remove("fa-play-circle");
    masterPlay.classList.add("fa-pause-circle");
})

document.getElementById("previous").addEventListener("click",()=>{
    if(songIndex<=0){
        songIndex=9;
    }
    else{
        songIndex-=1;
    }
    audioElement.src=`songs/${songIndex}.mp3`;
    masterSongName.innerText=songs[songIndex-1].songName;
    audioElement.currentTime=0;
    audioElement.play();
    gif.style.opacity=1;
    masterPlay.classList.remove("fa-play-circle");
    masterPlay.classList.add("fa-pause-circle");
})

