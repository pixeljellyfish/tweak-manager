#!/usr/bin/env node

const readlineSync = require('readline-sync');
const { execSync } = require('child_process');
const path = require('path');

function findFolder(folderName) {
  try {
    const command = `find . -type d -name "${folderName}"`;
    console.log(`Executing command: ${command}`);
    const result = execSync(command).toString().trim();
    const folderPaths = result.split('\n').map((folderPath) => folderPath.trim());
    console.log('Folder paths:', folderPaths);
    if (folderPaths.length === 0 || folderPaths[0] === '') {
      console.log(`Folder '${folderName}' not found.`);
      process.exit(1);
    } else {
      console.log(`Folder '${folderName}' found at: ${folderPaths[0]}`);
      return folderPaths[0]; // Return the folder path
    }
  } catch (error) {
    console.error('Error occurred while searching for the folder.');
    process.exit(1);
  }
}

function copyFile(source, destination) {
  try {
    const command = `cp "${source}" "${destination}"`;
    execSync(command);
    console.log(`File '${source}' copied to '${destination}'.`);
  } catch (error) {
    console.error('Error occurred while copying the file.');
    process.exit(1);
  }
}

function main() {
  console.log('=== Tweaks And Repo Manager ===');
  console.log("starting Tweaks And Repo Manager...")
  console.log("by PixelJellyfish")
  console.log("...")
  console.log("getting latest .deb file...")
  const tweaksFolderPath = '/Users/pixeljellyfish/c0mebackf0lders/packages/';
  const repoFolderPath = '/Users/pixeljellyfish/repo/debs'; // Replace with the actual path of the repo folder
  console.log("Please Wait...")
  console.log("Executing command: find")
  const latestDebFileCommand = `find "${tweaksFolderPath}" -type f -name '*.deb' -exec stat -f '%m %N' {} \\; | sort -n | tail -1 | awk '{print $2}'`;
  console.log("Executing command: find latest .deb file in $repoFolderPath")
  const source = execSync(latestDebFileCommand).toString().trim();
  console.log('Latest .deb file:', source);
  const destination = path.join(repoFolderPath, path.basename(source));
  copyFile(source, destination);
  console.log(`Changing directory to: ${repoFolderPath}`);
  process.chdir(repoFolderPath); // Change the current working directory to the repo folder
  console.log('Running the .sh script in the repo folder...');
  const scriptPath = '/Users/pixeljellyfish/repo/scan-packages.sh'; // Replace with the actual path of your .sh script
  execSync(`sh ${scriptPath}`, { stdio: 'inherit' });
  console.log('Scan-packages script has completed successfully.');
  console.log("Repo Has Been Updated!")
  console.log("Thank You For Using Tweaks And Repo Manager!")
  console.log("Exiting...")
  process.exit(0);
}

main();
