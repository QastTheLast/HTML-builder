const fs = require('fs');
const path = require('path');

const stylesFolderPath = './05-merge-styles/styles';
const projectDistFolderPath = './05-merge-styles/project-dist';
const bundleCssFilePath = path.join(projectDistFolderPath, 'bundle.css');

if (!fs.existsSync(projectDistFolderPath)) {
  fs.mkdirSync(projectDistFolderPath);
}

const isValidStyleFile = (file) => {
  return file.isFile() && path.extname(file.name) === '.css';
};

const readStyleFile = (filePath) => {
  return fs.readFileSync(filePath, 'utf8');
};

const compileStyles = () => {
  const stylesArray = [];

  fs.readdirSync(stylesFolderPath, { withFileTypes: true }).forEach(file => {
    const filePath = path.join(stylesFolderPath, file.name);

    if (isValidStyleFile(file)) {
      const styleContent = readStyleFile(filePath);
      stylesArray.push(styleContent);
    }
  });

  return stylesArray;
};

const writeBundleCss = (stylesArray) => {
  const bundleCssContent = stylesArray.join('\n');

  fs.writeFileSync(bundleCssFilePath, bundleCssContent, 'utf8');
  console.log('bundle.css file is created.');
};

const stylesArray = compileStyles();
writeBundleCss(stylesArray);