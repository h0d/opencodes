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

console.log(prevFiles);

input.addEventListener('change', handleChange);


function handleChange(e) {
    // Feedback
    console.log('Change detected', e);

    //TODO process files
}