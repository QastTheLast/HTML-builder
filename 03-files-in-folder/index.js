const fs = require('fs');
const path = require('path');

const folderPath = './03-files-in-folder/secret-folder';

fs.readdir(folderPath, { withFileTypes: true }, (err, files) => {
  if (err) {
    console.error(`Error reading directory: ${err.message}`);
    return;
  }

  files.forEach(file => {
    const filePath = path.join(folderPath, file.name);

    if (file.isFile()) {
      const fileSize = fs.statSync(filePath).size;
      console.log(`${file.name} - ${path.extname(file.name).slice(1)} - ${fileSize} bytes`);
    }
  });
});