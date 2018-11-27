const IPFS = require("ipfs");
const IPFSnode = new IPFS();

//This should accept Arrays going forward
const uploadSingleImageToIPFS = async (file, myEmitter) => {
  const hash = await IPFSnode.files.add(file);
  myEmitter.emit("ImageSavedToIPFS", hash[0].hash);
  return hash[0].hash;
};

const uploadObjectToIPFS = async (object, myEmitter) => {
  const objectHash = await IPFSnode.files.add(
    Buffer.from(JSON.stringify(object), "utf8")
  );
  myEmitter.emit("ObjectSavedToIPFS", objectHash[0].hash);
  return objectHash[0].hash;
};

const uploadMultipleImagesToIPFS = async (fileArray, myEmitter) => {


 const uploadFile = async () => {
    const fileHashArray = [];

    fileArray.forEach(async (file, index) => {
        IPFSnode.files.add(file).then((hash) => {
            console.log("Hash is: ", hash)
            fileHashArray.push(hash[0].hash)
        })
    });

    return fileHashArray;
 }

 const hashArray = await uploadFile();

console.log("FileHash array after: ", hashArray);

  return hashArray;
};

module.exports = {
  IPFSnode,
  uploadSingleImageToIPFS,
  uploadObjectToIPFS,
  uploadMultipleImagesToIPFS
};


      // try {
      //     const hash = await IPFSnode.files.add(file);
      //     console.log("Index of Hash: ", index, " ", hash[0].hash);
      //     //myEmitter.emit("ImageSavedToIPFS", hash[0].hash);
      //     fileHashArray.push(hash[0].hash);
      // } catch (error) {
      //     console.log(error);
      // }