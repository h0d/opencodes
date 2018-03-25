// let prevFiles = null;
let count = 0;

const inputs = document.querySelectorAll('input[type=file]');
for (let input of inputs) {
    input.addEventListener('change', handleChange);
}

document.addEventListener('dragover', (e) => { e.preventDefault(); e.stopPropagation() });
document.ondrop = console.log
document.addEventListener('drop', (e) => { e.preventDefault(); e.stopPropagation(); console.log(e); });

function handleChange(e) {
  const dtOrigin = (e instanceof DragEvent) ? e.dataTransfer : e.target;

  if (count > 1) {
    console.log('meh');
    return;
  }

  // Feedback
  console.log('Change detected', e);

  const dt = new DataTransfer();

  let tmpFiles = Array.from(dtOrigin.files);
  // dt.files = dtOrigin.files;
  tmpFiles.map((file) => {
    const reader = new FileReader();
    let newFile = undefined;
    // reader.onloadend = handleFile(file);
    reader.onloadend = (file) => {
      // Decomppose image
      const data = new DataView(e.target.result);
      console.log("Read file of length " + data.byteLength);

      // Handle metadata

      // Recompose image
      newFile = new File([data], file.name);
    }
    console.log('read ' + file.name);
    reader.readAsArrayBuffer(file);

    return newFile;
  });

  for (let f of dtOrigin.files) {
    const reader = new FileReader();
    let newf = undefined;
    reader.onloadend = handleFile(f, newf);
    console.log(newf);
    dt.items.add(newf);
  }

  console.log(dtOrigin.files);
  console.log(dt.files);
  // prevFiles = dtOrigin.files;
  count++;
}

function handleFile(file, newf) {
  return function(e) {
    // Decomppose image
    const data = new DataView(e.target.result);
    console.log("Read file of length " + data.byteLength);

    // Handle metadata

    // Recompose image
    // return new File([data], file.name);
    n = new File([data], file.name);
  }
}
