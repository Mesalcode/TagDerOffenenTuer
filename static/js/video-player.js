function playVideo() {
    const videoPlayer = document.getElementById("videoplayer");

    videoPlayer.play();
}

function pauseVideo() {
    const videoPlayer = document.getElementById("videoplayer");

    videoPlayer.pause();
}

function resetVideo() {
    const videoPlayer = document.getElementById("videoplayer");

    videoPlayer.currentTime = 0;
}