const url = new URL(document.location.href);
const params = new URLSearchParams(url.search);

if (params.has("error")) {
    const errorClear = atob(params.get("error"));

    document.addEventListener("DOMContentLoaded", () => {
        document.getElementById("error-message").innerText = errorClear;
    });
}