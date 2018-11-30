//Front End Feedback
const { myEmitter } = require("./MyEmitter");
//ImageLoader
const {loadImage, FileUtil} = require("./loadImage");
//Exif Parser
const parseExif = require("./parseExif");
//Image Management
const makeThumbnails = require("./resizeImage");
//Watcher
const chokidar = require("chokidar");
//IPFS
const {IPFSnode, uploadSingleImageToIPFS, uploadObjectToIPFS, uploadMultipleImagesToIPFS } = require("./IPFS");
//Blockchain Connection
const {mintIt} = require("./blockchainConnection");
//FS
const fs = require("fs");


//Variables
const watchedFolder = "server/refactored/export";


IPFSnode.on("ready", () => {
  myEmitter.emit("IPFSREADY");
  watch();
})


const watcher = chokidar.watch(watchedFolder, {
    ignored: /(^|[\/\\])\../,
    persistent: true
  });

const thumbnailQualities = [{
  quality: 70,
  resize: 250
}, {
  quality: 70,
  resize: 400
}]



const watch = () => {
  watcher.on("add", async filePath => {
    myEmitter.emit('FileAdded', filePath);

    const instance = new FileUtil(filePath);

    //const image = await loadImage(filePath);
    const image = instance.loadImage();


    const exif = await parseExif(image);

    //returns and array of thumbnails. But we need an array of quality settings first. 
    const thumbnail = await makeThumbnails(image, thumbnailQualities);

    //Get the main image hash
    const imageHash = await uploadSingleImageToIPFS(image);

    const uuidv4 = require('uuid/v4');
    const newFolderPath = watchedFolder + "/" + uuidv4();
    //Use that hash as new folder
    fs.mkdirSync(newFolderPath);

    // fs.rename(
    //   filePath,
    //   `${newFolderPath}.jpg`,
    //   function(err) {
    //     if (err) throw err; 
    //     console.log("Move complete.");
    //   }
    // );
 
    
    // const thumbHash = await uploadMultipleImagesToIPFS(thumbnail, myEmitter);
    // console.log("Thumbhash: ", thumbHash);
    
    // const instance = {
    //   imageHash,
    //   thumbHash,
    //   exif
    // }

    //const instanceHash = await uploadObjectToIPFS(instance, myEmitter);

    //const token = await mintIt(instanceHash, myEmitter);


  })
}
  


