var chokidar = require("chokidar");
var fs = require("fs");
var md5 = require("md5");
var path = require("path");

///Token Interface
const TokenInterface = require("../server/tokenInterface");

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

  const keypair = require('../../secrets').keypair;

  const contractInstance = {
    contractBuild: require("../build/contracts/testToken"),
    contractABI: require("../build/contracts/testToken").abi,
    contractAddress: require("../build/contracts/testToken").networks[networkId]
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
  const fileHash = await md5(jpegData);
  const parser = Parser.create(jpegData);

  const image = await Jimp.read(jpegData);

  const image2 = image.clone();
  image2.quality(70);
  image2.resize(250, Jimp.AUTO);

  let result;

 await mintIt(fileHash);

  try {
    result = await parser.parse();
    console.log("Parsed Data is: ", result);
  } catch (err) {
    // got invalid data, handle error
    console.log(err);
  }

  let filePathArray = filePath.split("/");
  console.log("FILE PATH ARRAY", filePathArray);
  let fileName = filePathArray[1].split(".");
  let newFileName = `${fileName[0]}_${fileHash}.${fileName[1]}`;

  mkdirSync(`./finished/${fileHash}/`);

  fs.rename(filePath, `./finished/${fileHash}/${fileName[0]}_${fileHash}.${image.getExtension()}`, function(
    err
  ) {
    if (err) throw err;
    console.log("Move complete.");
  });

  fs.writeFile(
    `./finished/${fileHash}/${fileName[0]}_${fileHash}.txt`,
    JSON.stringify(result),
    err => {
      console.log(err);
    }   
  );




let smallfile = `./finished/${fileHash}/${fileName[0]}_small_${fileHash}.` + image2.getExtension();
image2.write(smallfile);

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

        tokenId = event.returnValues.tokenId;

        console.log("The Event for Token: ", event.event);
      }
    );

    const result = await tokenInterface.mintToken(uri);
    console.log("Result is: ", result);
}