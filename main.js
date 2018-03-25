let lastFirstFile = undefined;

document.addEventListener('change', handleChange2, {capture: true});

document.addEventListener('dragover', (e) => {
  e.preventDefault();
  e.stopPropagation();
  e.dataTransfer.dragEffect = 'copy';
});

/*
document.addEventListener('drop', (e) => {
  console.log(e.dataTransfer.getData('image'));
  if (!e.target.files) {
    console.log('Dragging on invalid element');
    e.preventDefault();
    e.stopPropagation();
  }
  handleChange2(e);
}, { capture: true });
*/

function handleChange2(e) {
  if (e.target.files.length === 0 || e.target.files[0].handled) {
    return;
  }

  // Manage all files provided
  const dt = new DataTransfer();
  dt.handled = true;

  const files = Array.from(e.target.files)
        .map(handleExif)
        .forEach(file => { dt.items.add(file) });

  lastFirstFile = e.target.files[0];
  e.target.files = dt.files;
}

function handleExif(file) {
  console.log('Handling', file);
  let newFile = undefined;

  const assignFile = (file) => {
    newFile = file;
  };

  // newFile = handleFileSelect0(file, assignFile);
  newFile = new File([handleFileSelect(file)], file.name + '.alt')
  // newFile = new File([file], file.name + '.alt')
  newFile.handled = true;

  return newFile;
}

var test = {
    "0th": [piexif.ImageIFD.Model],
    "1st": [],
    "Exif": [],
    "GPS": [],
    "Interop": []
}

function handleFileSelect0(file, assigner) {
  let newFile = undefined;
    /*await chrome.storage.sync.get(['exif'], function (result) {
        if (result)
            test = result;
    });*/

    var counter = [{
        "id": "loc",
        "text": "removed locations",
        "value": 0
      },
      {
        "id": "cam",
        "text": "removed camera info",
        "value": 0
      },
      {
        "id": "det",
        "text": "detections",
        "value": 0
      }
    ]

    var reader = new FileReader();
    reader.onloadend = function (e) {
      var exifObj = piexif.load(e.target.result);

      console.log(exifObj);

      for (var ifd in exifObj) {
        if (ifd == "thumbnail") {
          continue;
        }
        console.log("-" + ifd);

        if (!(ifd in test))
          continue;

        var el = test[ifd];

        for (var repl in el) {
          var v = el[repl]
          console.log(exifObj[ifd][v])
          delete exifObj[ifd][v];

          switch(ifd){
            case "GPS":
            counter[0].value += 1;
            break;
            case "0th":
            case "1st":
            case "Exif":
            counter[1].value += 1;
            break;
          }
        }

        for (var tag in exifObj[ifd]) {
          console.log("  " + piexif.TAGS[ifd][tag]["name"] + ":" + exifObj[ifd][tag]);
        }
      }

      console.log(counter);

      chrome.storage.sync.set({
          'counter': counter
      }, function () {

      });
      let exifbytes = piexif.dump(exifObj);

      var inserted = piexif.insert(exifbytes, e.target.result);
      //var image = new Image();
      //image.src = inserted;

      //document.getElementById("im").src = inserted;
      const blob = dataURLtoBlob(inserted);
      newFile = new File([blob], file.name + '.alt')

      assigner(newFile);
      console.log(newFile);
    };
    reader.readAsDataURL(file);

  return newFile;
}

function handleFileSelect(file) {
  let newFile = undefined;
    /*await chrome.storage.sync.get(['exif'], function (result) {
        if (result)
            test = result;
    });*/

    var counter = [{
        "id": "loc",
        "text": "removed locations",
        "value": 0
      },
      {
        "id": "cam",
        "text": "removed camera info",
        "value": 0
      },
      {
        "id": "det",
        "text": "detections",
        "value": 0
      }
    ]

    var reader = new FileReader();
    reader.onloadend = function (e) {
      var exifObj = piexif.load(e.target.result);

      console.log(exifObj);

      for (var ifd in exifObj) {
        if (ifd == "thumbnail") {
          continue;
        }
        console.log("-" + ifd);

        if (!(ifd in test))
          continue;

        var el = test[ifd];

        for (var repl in el) {
          var v = el[repl]
          console.log(exifObj[ifd][v])
          delete exifObj[ifd][v];

          switch(ifd){
            case "GPS":
            counter[0].value += 1;
            break;
            case "0th":
            case "1st":
            case "Exif":
            counter[1].value += 1;
            break;
          }
        }

        for (var tag in exifObj[ifd]) {
          console.log("  " + piexif.TAGS[ifd][tag]["name"] + ":" + exifObj[ifd][tag]);
        }
      }

      console.log(counter);

      chrome.storage.sync.set({
          'counter': counter
      }, function () {

      });
      let exifbytes = piexif.dump(exifObj);

      var inserted = piexif.insert(exifbytes, e.target.result);
      //var image = new Image();
      //image.src = inserted;

      //document.getElementById("im").src = inserted;

      let imgEl = document.querySelector('img')
      imgEl.src = inserted;

      const blob = dataURLtoBlob(inserted);
      newFile = new File([blob], file.name + '.alt')
    };
    reader.readAsDataURL(file);

  return newFile;
}

function dataURLtoBlob(dataurl) {
  var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
  while(n--){
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new Blob([u8arr], {type:mime});
}
