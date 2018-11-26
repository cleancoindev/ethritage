const EventEmitter = require('events');
class MyEmitter extends EventEmitter {
}
const myEmitter = new MyEmitter();
exports.myEmitter = myEmitter;
//
myEmitter.on('FileAdded', (filePath) => {
    console.log(`File Detected....${filePath}`);
});

myEmitter.on('ImageLoaded', () => {
    console.log("ImageLoaded....");
});

myEmitter.on('ExifParsed', (exif) => {
    console.log("ExifParsed....");
});
myEmitter.on("ThumbNail_Start", () => {
    console.log("Thumbnail Started...");
});
myEmitter.on("ThumbNail_Finished", () => {
    console.log("Thumbnail Created...");
});
myEmitter.on("SavedToIPFS", (hash) => {
    console.log("Saved To IPFS...", hash);
});
myEmitter.on("TokenMinted", () => {
    console.log("Token Minted...");
});