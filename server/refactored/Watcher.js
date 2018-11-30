//Front End Feedback
const { myEmitter } = require("./MyEmitter");
//ImageLoader
const FileUtil = require("./FileUtil");
//Exif Parser
const parseExif = require("./parseExif");
//Image Management
const makeThumbnails = require("./resizeImage");
//Watcher
const chokidar = require("chokidar");
//IPFS
const {
  IPFSnode,
  uploadSingleImageToIPFS,
  uploadObjectToIPFS,
  uploadMultipleImagesToIPFS
} = require("./IPFS");
//Blockchain Connection
const { mintIt } = require("./blockchainConnection");
//FS
const fs = require("fs");

//Variables
const watchedFolder = "server/refactored/export";

IPFSnode.on("ready", () => {
  myEmitter.emit("IPFSREADY");
  watch();
});

const watcher = chokidar.watch(watchedFolder, {
  ignored: /(^|[\/\\])\../,
  persistent: true
});

const thumbnailQualities = [
  {
    quality: 70,
    resize: 250
  },
  {
    quality: 70,
    resize: 400
  }
];

const watch = () => {
  watcher.on("add", async filePath => {
    myEmitter.emit("FileAdded", filePath);

    const instance = new FileUtil(filePath, watchedFolder);

    const image = instance.loadImage();

    const exif = await parseExif(image);

    const thumbnail = await makeThumbnails(image, thumbnailQualities);

  
    //const imageHash = await uploadSingleImageToIPFS(image);

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
  });
};
