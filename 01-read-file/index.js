const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'text.txt');

const readStream = fs.createReadStream(filePath, { encoding: 'utf8' });

readStream.on('data', (chunk) => {
  console.log(chunk);
});

readStream.on('end', () => {
  console.log('File reading complete.');
});

readStream.on('error', (error) => {
  console.error(`Error reading the file: ${error.message}`);
});