function onCookieAcceptClicked() {
    document.cookie = "cookiesAccepted=true; max-age=31536000";
    
    const cookieBanner = document.getElementsByClassName("cookie-banner")[0];
    cookieBanner.parentNode.removeChild(cookieBanner);
}