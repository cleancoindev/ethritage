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
    console.log("ExifParsed....", exif);
});
myEmitter.on("ThumbNailCreated", () => {
    console.log("Thumbnail Created");
});
myEmitter.on("SavedToIPFS", () => {
    console.log("Saved To IPFS");
});
myEmitter.on("TokenMinted", () => {
    console.log("Token Minted");
});