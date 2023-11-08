const videoChooser = document.getElementById('video-chooser');

function showVideoChooser() {
    videoChooser.style.display = 'block';
}

window.onmessage = function(e) {
    if (e.data == 'closeFrame') {
        videoChooser.style.display = 'none';
    }
}