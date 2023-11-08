async function onFormSubmission() {
    document.getElementById("spinner").style.display = "block";

    const form = document.getElementsByTagName("form")[0];
    const formData = new FormData(form);
    const formDataJSON = Object.fromEntries(formData);

    const request = new XMLHttpRequest();

    request.onreadystatechange = () => {
        if (request.readyState !== XMLHttpRequest.DONE) {
            return;
        }

        const responseStatus = request.status;
        const responseJSON = JSON.parse(request.responseText);

        const error = responseJSON.error || "Unbekannter Fehler.";

        document.location.href = responseStatus === 200 
            ? "/configure"
            : "/login-failed?error=" + btoa(error);
    }

    request.open("POST", "/login");
    request.setRequestHeader('Content-Type', 'application/json');
    request.send(JSON.stringify(formDataJSON));
}