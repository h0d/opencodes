var s = document.createElement('inject');
s.src = chrome.extension.getURL('inject.js');
(document.head||document.documentElement).appendChild(s);
s.onload = function() {
    s.parentNode.removeChild(s);
};

var input=document.createElement("input");
input.type="file";
input.id="custom-upload"
document.body.appendChild(input);
//input.innerText="Upload with Clairvoyant";

/*
console.log(prevFiles);

const inputs = document.querySelectorAll('input[type=file]');
console.log(inputs);
for (let input of inputs) {
    input.addEventListener('change', handleChange);
}

function handleChange(e) {
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
*/
