document.addEventListener("DOMContentLoaded", () => {
    const urlTextElement = document.getElementById("url-text");

    urlTextElement.innerText = window.location.protocol 
        + '//' 
        + window.location.host 
        + window.location.hash.substring(1);
});