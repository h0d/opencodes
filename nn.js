const dragAndDropTarget = document.getElementById('target');
const imgContainer = document.getElementById('img');

const math = new dl.NDArrayMathGPU();
// squeezenet is loaded from https://unpkg.com/deeplearn-squeezenet
const squeezeNet = new squeezenet.SqueezeNet(math);
squeezeNet.load();

async function infer(imageEl) {
    console.clear();
    imageEl.width = 227;
    imageEl.height = 227;
    imageEl.style.width = '227px';
    imageEl.style.height = '227px';
    const image = dl.Array3D.fromPixels(imageEl);
    const logits = squeezeNet.predict(image);

    const topClassesToProbs = await squeezeNet.getTopKClasses(logits, 10);

    for (const className in topClassesToProbs) {
        console.log(
            `${topClassesToProbs[className].toFixed(5)}: ${className}`);
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