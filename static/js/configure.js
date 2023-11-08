const addVideoForm = document.getElementById('add-video-form');
const spinner = document.getElementById('spinner');

addVideoForm.onsubmit = async (e) => {
  if (!addVideoForm.checkValidity()) {
    return;
  }

  e.preventDefault();

  const form = e.currentTarget;
  const url = form.action;

  let errorMessage = "Ein unbekannter Fehler ist aufgetreten.";

  try {
    spinner.style.display = 'block';

    const formData = new FormData(form);
    const response = await fetch(url, {
      method: 'POST',
      body: formData
    });

    if (response.status != 200) {
      try {
        const jsonResponse = await response.json();

        if (jsonResponse.error) {
          errorMessage = jsonResponse.error;
        }
      } catch (_) {

      }

      const errorMessageBase64 = btoa(errorMessage);

      window.location.href = `/configure?msg=${errorMessageBase64}&mtype=error`;

      return;
    }

    addVideoForm.reset();

    spinner.style.display = 'none';

    const sucessMessage = 'Das Video wurde erfolgreich hinzugefügt.';
    const successMessageBase64 = btoa(sucessMessage);

    window.location.href = `/configure?msg=${successMessageBase64}&mtype=success`;
  } catch (error) {
    const errorMessageBase64 = btoa(errorMessage);

    window.location.href = `/configure?msg=${errorMessageBase64}&mtype=error`;
  }
}

const url = new URL(window.location.href);
const bannerMessage = url.searchParams.get('msg');
const bannerType = url.searchParams.get('mtype');

if (bannerType || bannerMessage) {
  window.history.replaceState(null, '', window.location.pathname);
}

const messageBox = document.getElementById('message-box');

if (bannerType && bannerMessage) {
  messageBox.style.display = 'block';
  messageBox.innerText = atob(bannerMessage);

  if (bannerType === 'success') {
    messageBox.classList.add('alert-success');
  } else if (bannerType === 'error') {
    messageBox.classList.add('alert-danger');
  }

  setTimeout(() => {
    messageBox.style.display = 'none';
  }, 10 * 1000);
}

async function deleteVideo(fileName) {
  const response = await fetch('/delete-video', {
    method: 'POST',
    body: JSON.stringify({
      fileName: fileName
    }),
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  });

  if (response.status != 200) {
    let errorMessage = 'Ein unbekannter Fehler ist aufgetreten';

    try {
      const jsonResponse = await response.json();

      if (jsonResponse.error) {
        errorMessage = jsonResponse.error;
      }
    } catch (_) {

    }

    alert('Video konnte nicht gelöscht werden: ' + errorMessage);

    return;
  }

  const sectionElement = document.getElementById('video-' + fileName);

  sectionElement.remove();

  const orderElement = document.getElementById('order-' + fileName);

  orderElement.remove();

  const dividerElement = document.getElementById('divider-' + fileName);

  dividerElement.remove();
}

function logOut() {
  document.cookie = 'sessionKey =; expires=Thu, 01 Jan 1970 00:00:00 GMT';
  document.location.href = '/';
}

$(function () {
  $("#sortable").sortable({
    axis: "y", // Allow only vertical sorting
    containment: "parent", // Contain within the parent element
    cursor: "move", // Set cursor to move on draggable items
    handle: ".handle"
  });
  $("#sortable").disableSelection();
});

async function saveOrder() {
  const fileNamesInOrder = $("#sortable").sortable('toArray', {
    attribute: 'data-id'
  });

  const response = await fetch('/set-video-order', {
    method: 'POST',
    body: JSON.stringify({
      order: fileNamesInOrder
    }),
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  });

  if (response.status != 200) {
    let errorMessage = 'Ein unbekannter Fehler ist aufgetreten';

    try {
      const jsonResponse = await response.json();

      if (jsonResponse.error) {
        errorMessage = jsonResponse.error;
      }
    } catch (_) {

    }

    alert('Reihenfolge konnte nicht aktualisiert werden: ' + errorMessage);

    
  }

  document.location.href = document.location.href

}