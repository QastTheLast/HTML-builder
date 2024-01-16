const fs = require('fs').promises;
const path = require('path');

const filesFolderPath = './04-copy-directory/files';
const filesCopyFolderPath = './04-copy-directory/files-copy';

fs.mkdir(filesCopyFolderPath, { recursive: true })
  .then(() => {
    console.log('files-copy folder created.');

    return fs.readdir(filesFolderPath, { withFileTypes: true });
  })
  .then(files => {
    const copyPromises = files.map(file => {
      const sourceFilePath = path.join(filesFolderPath, file.name);
      const destinationFilePath = path.join(filesCopyFolderPath, file.name);

      if (file.isFile()) {
        return fs.copyFile(sourceFilePath, destinationFilePath)
          .then(() => console.log(`Copied: ${file.name}`));
      }
    });

    return Promise.all(copyPromises);
  })
  .then(() => {
    console.log('Copy is completed.');
  })
  .catch(err => {
    console.error(`Error: ${err.message}`);
  });