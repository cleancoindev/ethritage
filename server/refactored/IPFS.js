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

  const fileHashArray = [];
  console.log("FileHash array before: ", fileHashArray);


 function uploadFile(file) {
  // 1 - Create a new Promise
  return new Promise(function (resolve, reject) {
      // 2 - Copy-paste your code inside this function
      IPFSnode.files.add(file, function (err, req, hash) {

          if (err) {
              reject(err);
          } else {
            console.log("In the resolve. Hash is: ", hash);
              resolve(hash);
          }
      });
  });
}


uploadFile(fileArray[0]).then(function (result) {
  console.log("The hash result: ",result)
  fileHashArray.push(result);
}).catch(function (err) {
  console.log("Error", err)
});







console.log("FileHash array after: ", fileHashArray);

  
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