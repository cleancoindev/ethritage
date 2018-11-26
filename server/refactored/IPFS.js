const IPFS = require("ipfs");
const IPFSnode = new IPFS();


//This should accept Arrays going forward
const uploadToIPFS = async (file, myEmitter) => {

    const hash = await IPFSnode.files.add(file);
    myEmitter.emit("SavedToIPFS", hash[0].hash);
    return hash[0].hash;

    
}

module.exports = {IPFSnode, uploadToIPFS};