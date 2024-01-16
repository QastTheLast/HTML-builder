const fs = require('fs');

const filePath = './01-read-file/text.txt';

fs.readFile(filePath, 'utf8', (err, data) => {
  if (err) {
    console.error(`Error reading file: ${err.message}`);
    return;
  }
  console.log(data);
});
