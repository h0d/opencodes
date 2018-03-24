const inputs = document.querySelector('input[type=file]');
for (let input of inputs) {
    input.addEventListener('change', handleChange);
}

document.addEventListener('dragover', handleChange);

function handleChange(e) {
    if (e.target.hasBeenHandled) return;

    const dt = new ClipboardEvent('').clipboardEvent || new DataTransfer();

    for (let file of files) {
        const reader = new FileReader();
        reader.onloadend = handleFile(file, dt);
        reader.readAsArrayBuffer(file);
    }

    e.target.files = dt.files;
    e.target.hasBeenHandled = true;
}

function handleFile(file, dataTransfer) {
    return function(e) {
        // Decomppose image
        const data = new DataView(e.target.result);
        console.log("Read file of length " + view.byteLength);

        // Handle metadata

        // Recompose image
        const newFile = new File([data], file.name);
        dataTransfer.items.add(newFile);
    }
}
