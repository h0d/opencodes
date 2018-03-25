const dragAndDropTarget = document.getElementById('target');
const imgContainer = document.getElementById('img');

const math = new dl.NDArrayMathGPU();
// squeezenet is loaded from https://unpkg.com/deeplearn-squeezenet
const squeezeNet = new squeezenet.SqueezeNet(math);
squeezeNet.load();

function infer(imageEl) {
    console.clear();

    checkImage(imageEl);
}

async function checkImage(imageEl) {
    var test = {
        "681": 0.2, //notebook
        "527": 0.2, //desktop computer
        "620": 0.2 //laptop
    }

    /*await chrome.storage.sync.get(['classes'], function (result) {
        if (result)
            test = result;
    });*/

    imageEl.width = 227;
    imageEl.height = 227;
    imageEl.style.width = '227px';
    imageEl.style.height = '227px';
    const image = dl.Array3D.fromPixels(imageEl);
    const logits = squeezeNet.predict(image);

    const topClassesToProbs = await squeezeNet.getTopKClasses(logits, 10);


    for (const className in topClassesToProbs) {
        var prob = topClassesToProbs[className];

        console.log(`${prob.toFixed(5)}: ${className}`);
      document.querySelector('p').textContent += `${prob.toFixed(5)}: ${className}`

        var id = classes.classes_name[className];

        if (test[id] < prob) {
            console.log("found")
            return true;
        }
    }

}

// Drag and drop handlers.
window.dragoverit = (e) => {
    e.preventDefault();
    e.stopPropagation();
    e.dataTransfer.dropEffect = "copy";
}
window.dropit = (e) => {
    e.preventDefault();
    e.stopPropagation();
    imgContainer.innerHTML = e.dataTransfer.getData('text/html');
    let imageEl = imgContainer.getElementsByTagName('img')[0];
    if (imageEl == null) {
        imageEl = document.createElement('img');
        imageEl.src = window.URL.createObjectURL(e.dataTransfer.files[0]);
        imgContainer.appendChild(imageEl);
    }
    imageEl.onload = () => infer(imageEl);
}
