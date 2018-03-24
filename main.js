let prevFiles = null;

const inputs = document.querySelectorAll('input[type=file]');
for (let input of inputs) {
    input.addEventListener('change', handleChange);
}

document.addEventListener('dragend', handleChange);

function handleChange(e) {
    const dtOrigin = (e instanceof DragEvent) ? e.dataTransfer : e.target;

    if (prevFiles === dtOrigin.files) {
        console.log('meh');
        return;
    }

    // Feedback
    console.log('Change detected', e);

    const dt = new DataTransfer();

    for (let file of dtOrigin.files) {
        const reader = new FileReader();
        reader.onloadend = handleFile(file, dt);
        console.log('read ' + file.name);
        reader.readAsArrayBuffer(file);
    }

    dtOrigin.files = dt.files;
    prevFiles = dtOrigin.files;
}

function handleFile(file, dataTransfer) {
    return function(e) {
        // Decomppose image
        const data = new DataView(e.target.result);
        console.log("Read file of length " + data.byteLength);

        // Handle metadata

        // Recompose image
        const newFile = new File([data], file.name);
        dataTransfer.items.add(newFile);
    }
}
