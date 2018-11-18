const { contractInstance } = require("./contractInstance");
const keypair = require("../../secrets");

const chokidar = require("chokidar");
const fs = require("fs");
const IPFS = require("ipfs");
const IPFSnode = new IPFS();
const Parser = require("exif-parser");

//------------ // Image Management // ------------//
const Jimp = require("jimp");
Jimp.RESIZE_HERMITE;

const qualitySettings = {
  quality: 70,
  resize: 250
}

//------------ // Token Management // ------------//
const TokenInterface = require("../erc721-Interface");

//------------ // Web3 Interface // ------------//
const Web3 = require("web3");
const HDWalletProvider = require("truffle-hdwallet-provider");
const Tx = require("ethereumjs-tx");
const server = "HTTP://127.0.0.1:7545";
const wsServer = "ws://localhost:7545";
const gas = {
  price: 20 * 1e8,
  limit: 2100000
};
const web3Plus = {
  Web3,
  HDWalletProvider,
  Tx,
  server,
  wsServer
};
const tokenInterface = new TokenInterface(
  gas,
  keypair,
  contractInstance,
  web3Plus
);

//------------ // Folder To Watch // ------------//

const watchedFolder = "./testFolder";

//------------ // Initialize IPFS Node // ------------//

IPFSnode.on("ready", () => {
  console.log("IPFS READY: ");
  watchFile();
});

const watcher = chokidar.watch(watchedFolder, {
  ignored: /(^|[\/\\])\../,
  persistent: true
});

// Something to use when events are received.

const log = console.log.bind(console);

// Add event listeners.
//watcherGeneral();



const mkdirSync = function(dirPath) {
  try {
    fs.mkdirSync(dirPath);
  } catch (err) {
    if (err.code !== "EEXIST") throw err;
  }
};

const mintIt = async uri => {

  
  try {

    console.log("Creating a Subscription to Events...")
    let events = await tokenInterface.subscribeToContractEvents();
    console.log("Events: ", events);
    console.log("Subscription Created...");
    blockchainSubscription(events);
    console.log("Minting Token...");
   await tokenInterface.mintToken(uri);
  
  } catch (error) {
    console.log("MintIt Error: ", error);
  }

};

function blockchainSubscription(events) {
  events.Transfer({
    fromBlock: 0
  }, function (error, event) {
    if (error) {
      console.log(error);
    }
    let tokenId = event.returnValues.tokenId;
    console.log("The Event for Token: ", event.event);
    console.log("The Token id: ", tokenId);
  });

  events.Approval({
    fromBlock: 0
  }, function (error, event) {
    if (error) {
      console.log(error);
    }
    //let tokenId = event.returnValues.tokenId;
    console.log("The Event for Approval: ", event.event);
   
  });

  events.ApprovalForAll({
    fromBlock: 0
  }, function (error, event) {
    if (error) {
      console.log(error);
    }
    //let tokenId = event.returnValues.tokenId;
    console.log("The Event for ApprovalForAll: ", event.event);
   
  });
  
}

function watchFile() {
  watcher.on("add", async (filePath) => {

    console.log("File Detected....");
    const instance = {};

    //------------ // Create a buffer from the added File // ------------//
    const _jpegData = fs.readFileSync(filePath);
    instance.hiResImage = _jpegData;

    //------------ // Parse the Image for Exif Data // ------------//
    const parser = Parser.create(instance.hiResImage);
    const _imageExifData = await parser.parse();
    instance.imageExifData = _imageExifData;

    console.log("Exif Data Parsed...");

    //------------ // Clone Image // ------------//
    const image_temp = await Jimp.read(instance.hiResImage);
    const imageThumbnail = image_temp.clone();
    
    //------------ // Resize Image // ------------//
    imageThumbnail.quality(qualitySettings.quality);
    imageThumbnail.resize(qualitySettings.resize, Jimp.AUTO);

    console.log("Image ThumbNail Created...");

    //------------ // Convert Thumbnail Image into a Buffer // ------------//
    const _imageThumbnailbuffer = await imageThumbnail.getBufferAsync(Jimp.MIME_JPEG);
    instance.lowResImage = _imageThumbnailbuffer;

    //------------ // Hash individual Images // ------------//
    const tokenObject = {
      timeStamp: new Date(),
      originalFileName: "",
      hiRes: "",
      lowRes: "",
      exif: {}
    };
    tokenObject.exif = instance.imageExifData;

    console.log("Saving to IPFS...");

    const ipfsImageHiResHash = await IPFSnode.files.add(instance.hiResImage);
    const ipfsImageThumbnailHash = await IPFSnode.files.add(instance.lowResImage);

    console.log("IPFS -> High: ", ipfsImageHiResHash);
    console.log("IPFS -> Low: ", ipfsImageThumbnailHash);

    tokenObject.hiRes = ipfsImageHiResHash;
    tokenObject.lowRes = ipfsImageThumbnailHash;

    const _finalHash = await IPFSnode.files.add(Buffer.from(JSON.stringify(tokenObject), "utf8"));
    instance.finalHash = _finalHash[0].hash;

    const filePathArray = filePath.split("/");
    
    const fileName = filePathArray[1].split(".");
    tokenObject.originalFileName = fileName;

    const newFileName = `${fileName[0]}_${instance.finalHash}.${fileName[1]}`;

    mkdirSync(`./finished/${instance.finalHash}/`);

    moveFile(filePath, instance, fileName, image_temp);

    writeMetaDataToDisk(instance, fileName, tokenObject);

    let smallfile = `./finished/${instance.finalHash}/${fileName[0]}_small_${instance.finalHash}.` +
      imageThumbnail.getExtension();
    imageThumbnail.write(smallfile);

    await mintIt(instance.finalHash);
  });
}

function writeMetaDataToDisk(instance, fileName, tokenObject) {
  fs.writeFile(`./finished/${instance.finalHash}/${fileName[0]}_${instance.finalHash}.txt`, JSON.stringify(tokenObject), err => {
    console.log(err);
  });
}

function moveFile(filePath, instance, fileName, image_temp) {
  fs.rename(filePath, `./finished/${instance.finalHash}/${fileName[0]}_${instance.finalHash}.${image_temp.getExtension()}`, function (err) {
    if (err)
      throw err;
    console.log("Move complete.");
  });
}

function watcherGeneral() {
  watcher
    .on("add", thisPath => log(`File ${thisPath} has been added`))
    .on("change", thisPath => log(`File ${thisPath} has been changed`))
    .on("unlink", thisPath => log(`File ${thisPath} has been removed`));
}
