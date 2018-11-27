//Front End Feedback
const { myEmitter } = require("./MyEmitter");
//ImageLoader
const loadImage = require("./loadImage");
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


//Variables
const watchedFolder = "./export";


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

    const image = await loadImage(filePath, myEmitter);

    const exif = await parseExif(image, myEmitter);

    //returns and array of thumbnails. But we need an array of quality settings first. 
    const thumbnail = await makeThumbnails(image, myEmitter, thumbnailQualities);

    //const imageHash = await uploadSingleImageToIPFS(image, myEmitter);
    const thumbHash = await uploadMultipleImagesToIPFS(thumbnail, myEmitter);
    console.log("Thumbhash: ", thumbHash);
    
    // const instance = {
    //   imageHash,
    //   thumbHash,
    //   exif
    // }

    //const instanceHash = await uploadObjectToIPFS(instance, myEmitter);

    //const token = await mintIt(instanceHash, myEmitter);


  })
}
  


