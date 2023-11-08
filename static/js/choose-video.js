function closeFrame() {
    window.top.postMessage('closeFrame', '*');
}
