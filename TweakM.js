#!/usr/bin/env node

const readlineSync = require('readline-sync');
const { execSync } = require('child_process');
const path = require('path');

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
  console.log('\x1b[33m=== Tweaks And Repo Manager ===\x1b[0m');
  console.log('\x1b[33mstarting Tweaks And Repo Manager...\x1b[0m');
  console.log('\x1b[33mby PixelJellyfish\x1b[0m');
  console.log('\x1b[35m...\x1b[0m');
  readlineSync.question('\x1b[33mPress Enter To Continue...\x1b[0m');
  
  const tweaksFolderPath = '/Users/pixeljellyfish/c0mebackf0lders/packages/';
  console.log(`\x1b[35mTweaks folder path: \x1b[32m${tweaksFolderPath}\x1b[0m`);
  readlineSync.question('\x1b[33mPress Enter To Continue...\x1b[0m');
  
  const repoFolderPath = '/Users/pixeljellyfish/repo/debs'; // Replace with the actual path of the repo folder
  console.log(`\x1b[35mRepo folder path: \x1b[32m${repoFolderPath}\x1b[0m`);
  readlineSync.question('\x1b[33mPress Enter To Continue...\x1b[0m');
  
  console.log('\x1b[35mPlease Wait...\x1b[0m');
  console.log('\x1b[35mGetting the latest .deb file...\x1b[0m');
  readlineSync.question('\x1b[33mPress Enter To Continue...\x1b[0m');
  
  console.log(`\x1b[35mExecuting command: find latest .deb file in ${tweaksFolderPath}`);
  readlineSync.question('\x1b[33mPress Enter To Continue...\x1b[0m');
  
  console.log(`\x1b[35mExecuting command: find latest .deb file in ${repoFolderPath}`);
  const latestDebFileCommand = `find "${tweaksFolderPath}" -type f -name '*.deb' -exec stat -f '%m %N' {} \\; | sort -n | tail -1 | awk '{print $2}'`;
  readlineSync.question('\x1b[33mPress Enter To Continue...\x1b[0m');
  
  console.log('\x1b[35mExecuting command to find the latest .deb file...\x1b[0m');
  const source = execSync(latestDebFileCommand).toString().trim();
  console.log('\x1b[35mLatest .deb file:', `\x1b[36m${source}\x1b[0m`);
  
  const destination = path.join(repoFolderPath, path.basename(source));
  copyFile(source, destination);
  
  console.log(`\x1b[35mChanging directory to: \x1b[32m${repoFolderPath}\x1b[0m`);
  process.chdir(repoFolderPath); // Change the current working directory to the repo folder
  
  console.log('\x1b[36mRunning the .sh script in the repo folder...\x1b[0m');
  const scriptPath = '/Users/pixeljellyfish/repo/scan-packages.sh'; // Replace with the actual path of your .sh script
  execSync(`sh ${scriptPath}`, { stdio: 'inherit' });
  
  console.log('\x1b[35mThe scan-packages script has completed successfully.');
  console.log('Repo Has Been Updated!');
  console.log('hank You For Using Tweaks And Repo Manager!');
  console.log('Exiting...\x1b[0m');
  
  process.exit(0);
}

main();
