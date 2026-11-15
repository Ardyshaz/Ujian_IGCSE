import {copyFile,readFile,writeFile} from 'node:fs/promises';
import {constants} from 'node:fs';
const target='public/js/firebase-config.js';
try{await copyFile('public/js/firebase-config.example.js',target,constants.COPYFILE_EXCL);console.log('Created local Firebase config from example.');}
catch(error){if(error.code!=='EEXIST')throw error;}
const flag=process.argv.includes('--emulators')?true:process.argv.includes('--cloud')?false:null;
if(flag!==null){
 const source=await readFile(target,'utf8');
 if(!/export const useEmulators = (true|false);/.test(source))throw new Error('Expected useEmulators export not found; update your local config manually.');
 await writeFile(target,source.replace(/export const useEmulators = (true|false);/,`export const useEmulators = ${flag};`));
 console.log(flag?'Local-only demo emulators enabled.':'Emulator connections disabled. Firebase Web App config is required for cloud access.');
}
