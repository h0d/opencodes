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


input.addEventListener('change', handleChange);

	const math = new dl.setBackend('webgl');
	// squeezenet is loaded from https://unpkg.com/deeplearn-squeezenet
	const squeezeNet = new squeezenet.SqueezeNet(math);
	squeezeNet.load();

function handleChange(e) {
    // Feedback
    //console.log('Change detected');

    //TODO process files

    var image=document.createElement("img");


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

	        console.log(
	            `${prob.toFixed(5)}: ${className}`);

	        var id = classes.classes_name[className];

	        if (test[id] < prob) {
	            console.log("found")
	            return true;
	        }
	    }

	}

	var imgContainer=document.createElement("img");
	input.id="custom-img"
	document.body.appendChild(input);
	console.log(e.target.files[0]);
	 var fr = new FileReader();
    fr.onload = function () {
        imgContainer.src = fr.result;
    }
    fr.readAsDataURL(e.target.files[0]);

    let imageEl = imgContainer.getElementsByTagName('img')[0];
    imgContainer.onload = () => infer(imgContainer);     

}