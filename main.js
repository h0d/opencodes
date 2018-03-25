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
  const newFile = new File([file], file.name + '.alt');
  newFile.handled = true;
  return newFile;
}
