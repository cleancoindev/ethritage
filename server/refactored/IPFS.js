const IPFS = require("ipfs");
const IPFSnode = new IPFS();


//This should accept Arrays going forward
const uploadImageToIPFS = async (file, myEmitter) => {

    const hash = await IPFSnode.files.add(file);
    myEmitter.emit("ImageSavedToIPFS", hash[0].hash);
    return hash[0].hash;

    
}

const uploadObjectToIPFS = async (object, myEmitter) => {

    const objectHash = await IPFSnode.files.add(
        Buffer.from(JSON.stringify(object), "utf8")
      );
      myEmitter.emit("ObjectSavedToIPFS", objectHash[0].hash);
      return objectHash[0].hash;

}

module.exports = {IPFSnode, uploadImageToIPFS, uploadObjectToIPFS};