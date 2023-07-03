#!/usr/bin/env node

const readlineSync = require('readline-sync');
const { execSync } = require('child_process');

function findFile(fileName) {
  try {
    const command = `find ~ -type f -name "${fileName}"`;
    const result = execSync(command).toString().trim();
    return result.split('\n');
  } catch (error) {
    console.error('Error occurred while searching for the file.');
    process.exit(1);
  }
}

function copyFile(filePath, destination) {
  try {
    const command = `cp "${filePath}" "${destination}"`;
    execSync(command);
    console.log(`File '${filePath}' copied to '${destination}'.`);
  } catch (error) {
    console.error('Error occurred while copying the file.');
    process.exit(1);
  }
}

function main() {
  console.log('=== File Manager ===');
  const fileName = readlineSync.question('Enter the name of the file: ');

  const filePaths = findFile(fileName);
  if (filePaths.length === 0) {
    console.log(`File '${fileName}' not found.`);
    process.exit(1);
  } else if (filePaths.length === 1) {
    console.log(`File '${fileName}' found at: ${filePaths[0]}`);
    const destination = readlineSync.question('Enter the destination directory: ');
    
    copyFile(filePaths[0], destination);
  } else {
    console.log(`Multiple files found with the name '${fileName}':`);
    console.log(filePaths.join('\n'));
    console.log('Please refine your search.');
    process.exit(1);
  }
}

main();
