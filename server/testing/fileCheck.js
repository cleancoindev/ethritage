var chokidar = require("chokidar");
var fs = require("fs");
var md5 = require("md5");
var path = require("path");

const IPFS = require('ipfs')
const IPFSnode = new IPFS()

IPFSnode.on('ready', () => {
  console.log("IPFS READY: ");
})

///Token Interface
const TokenInterface = require("../erc721-Interface");

const Web3 = require("web3");
const HDWalletProvider = require("truffle-hdwallet-provider");
const Tx = require("ethereumjs-tx");
const server = "HTTP://127.0.0.1:7545";
const wsServer = "ws://localhost:7545";
const networkId = 5777;
//const ganacheAccountZero = "0x2ca4488037250f9453032aa8de9be5786c5c178b";



const gas = {
    price: 20 * 1e8,
    limit: 2100000
  };

  const keypair = require('../../secrets');

  const contractInstance = {
    contractBuild: require("../../build/contracts/ethritageToken.json"),
    contractABI: require("../../build/contracts/ethritageToken.json").abi,
    contractAddress: require("../../build/contracts/ethritageToken.json").networks[networkId]
      .address
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



const Jimp = require("jimp");
Jimp.RESIZE_HERMITE;

var Parser = require("exif-parser");


let files = [];

var watcher = chokidar.watch("./testFolder", {
  ignored: /(^|[\/\\])\../,
  persistent: true
});

// Something to use when events are received.

var log = console.log.bind(console);

// Add event listeners.
watcher
  .on("add", thisPath => log(`File ${thisPath} has been added`))
  .on("change", thisPath => log(`File ${thisPath} has been changed`))
  .on("unlink", thisPath => log(`File ${thisPath} has been removed`));

watcher.on("add", async filePath => {
  console.log("The FilePath is: ", filePath);
  const jpegData = fs.readFileSync(filePath);
  //const finalHash = await md5(jpegData);
  const parser = Parser.create(jpegData);

  const image = await Jimp.read(jpegData);

  const image2 = image.clone();
  image2.quality(70);
  image2.resize(250, Jimp.AUTO);

  let result;

  const tokenObject = {
    hiRes: "",
    lowRes: "",
    exif: {}
  }
  const ipfsImage1 = await IPFSnode.files.add(jpegData);

  let image2buffer = await image2.getBufferAsync(Jimp.MIME_JPEG);
  const ipfsImage2 = await IPFSnode.files.add(image2buffer);

  console.log("IPFS -> High: ", ipfsImage1);
  console.log("IPFS -> Low: ", ipfsImage2);

  tokenObject.hiRes = ipfsImage1;
  tokenObject.lowRes = ipfsImage2;

let finalHash;



  try {
    result = await parser.parse();
    //console.log("Parsed Data is: ", result);

    tokenObject.exif = result;
    console.log("");
    console.log("Object is: ", tokenObject);
  
    finalHash = await IPFSnode.files.add(Buffer.from(JSON.stringify(tokenObject), 'utf8'));
    finalHash = finalHash[0].hash;

    console.log("Final Hash Is: ", finalHash);

  } catch (err) {
    // got invalid data, handle error
    console.log(err);
  }

  let filePathArray = filePath.split("/");
  console.log("FILE PATH ARRAY", filePathArray);
  let fileName = filePathArray[1].split(".");
  let newFileName = `${fileName[0]}_${finalHash}.${fileName[1]}`;

  mkdirSync(`./finished/${finalHash}/`);

  fs.rename(filePath, `./finished/${finalHash}/${fileName[0]}_${finalHash}.${image.getExtension()}`, function(
    err
  ) {
    if (err) throw err;
    console.log("Move complete.");
  });

  fs.writeFile(
    `./finished/${finalHash}/${fileName[0]}_${finalHash}.txt`,
    JSON.stringify(tokenObject),
    err => {
      console.log(err);
    }   
  );


let smallfile = `./finished/${finalHash}/${fileName[0]}_small_${finalHash}.` + image2.getExtension();
image2.write(smallfile);


await mintIt(finalHash);

});


const mkdirSync = function (dirPath) {
    try {
      fs.mkdirSync(dirPath)
    } catch (err) {
      if (err.code !== 'EEXIST') throw err
    }
  }

const mintIt = async (uri) => {
    let events = await tokenInterface.subscribeToContractEvents();
    events.Transfer(
      {
        fromBlock: 0
      },
      function(error, event) {
        if (error) {
          console.log(error);
        }

        let tokenId = event.returnValues.tokenId;

        console.log("The Event for Token: ", event.event);
        console.log("The Token id: ", tokenId);
      }
    );

    const result = await tokenInterface.mintToken(uri);
    //console.log("Result is: ", result);
}