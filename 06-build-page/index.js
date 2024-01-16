const fs = require('fs');
const path = require('path');
const util = require('util');

const readdir = util.promisify(fs.readdir);
const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);
const mkdir = util.promisify(fs.mkdir);

async function createDistFolder() {
    const distFolderPath = path.join(__dirname, 'project-dist');

  try {
    await mkdir(distFolderPath);
  } catch (err) {
    if (err.code !== 'EEXIST') {
      console.error('Error creating project-dist folder:', err);
      return;
    }
  }

  const templatePath = path.join(__dirname, 'template.html');
  let templateContent = await readFile(templatePath, 'utf-8');

  const stylesFolderPath = path.join(__dirname, 'styles');
  const stylesFiles = await readdir(stylesFolderPath);
  const stylesArray = [];

  for (const styleFile of stylesFiles) {
    const styleFilePath = path.join(stylesFolderPath, styleFile);

    if (fs.statSync(styleFilePath).isFile() && path.extname(styleFilePath) === '.css') {
      const styleContent = await readFile(styleFilePath, 'utf-8');
      stylesArray.push(styleContent);
    }
  }

  const styleFilePath = path.join(distFolderPath, 'style.css');
  await writeFile(styleFilePath, stylesArray.join('\n'), 'utf-8');

  const componentsFolderPath = path.join(__dirname, 'components');
  const componentsFiles = await readdir(componentsFolderPath);

  for (const componentFile of componentsFiles) {
    const componentName = path.parse(componentFile).name;
    const componentFilePath = path.join(componentsFolderPath, componentFile);
    const componentContent = await readFile(componentFilePath, 'utf-8');
    
    const regex = new RegExp(`{{${componentName}}}`, 'g');
    templateContent = templateContent.replace(regex, componentContent);
  }

  const indexPath = path.join(distFolderPath, 'index.html');
  await writeFile(indexPath, templateContent, 'utf-8');

  const assetsFolderPath = path.join(__dirname, 'assets');
  const distAssetsFolderPath = path.join(distFolderPath, 'assets');

  try {
    await mkdir(distAssetsFolderPath);
  } catch (err) {
    if (err.code !== 'EEXIST') {
      console.error('Error creating project-dist/assets folder:', err);
      return;
    }
  }

  copyFolder(assetsFolderPath, distAssetsFolderPath);

  console.log('Script executed successfully!');
}

function copyFolder(src, dest) {
  const entries = fs.readdirSync(src, { withFileTypes: true });

  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    if (entry.isDirectory()) {
      try {
        fs.mkdirSync(destPath);
      } catch (err) {
        if (err.code !== 'EEXIST') {
          console.error('Error creating folder:', err);
        }
      }

      copyFolder(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

createDistFolder();