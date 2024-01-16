const fs = require('fs');
const readline = require('readline');

const filePath = './02-write-file/output.txt';
const promptMessage = 'Enter text (Ctrl+C or type "exit" to exit): ';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const writeToFile = (text) => {
  fs.appendFile(filePath, text + '\n', 'utf8', (err) => {
    if (err) {
      console.error(`Error writing to file: ${err.message}`);
    } else {
      console.log(`Text appended to ${filePath}`);
    }
    rl.prompt();
  });
};

console.log('Hello. Put some text in here.');

rl.setPrompt(promptMessage);
rl.prompt();

rl.on('line', (input) => {
  if (input.toLowerCase() === 'exit') {
    console.log('Thanks!');
    rl.close();
  } else {
    writeToFile(input);
  }
});

rl.on('close', () => {
  console.log('Process terminated.');
  process.exit(0);
});