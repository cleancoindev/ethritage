//Front End Feedback
const { myEmitter } = require("./MyEmitter");
//ImageLoader
const loadImage = require("./loadImage");
//Exif Parser
const parseExif = require("./parseExif");
//Watcher
const chokidar = require("chokidar");


//Variables
const watchedFolder = "./export";
const thumbnails = []


//watcher
const watcher = chokidar.watch(watchedFolder, {
    ignored: /(^|[\/\\])\../,
    persistent: true
  });


  watcher.on("add", async filePath => {
    myEmitter.emit('FileAdded', filePath);

    const image = await loadImage(filePath, myEmitter);

    const exif = await parseExif(image, myEmitter);



    myEmitter.emit('ThumbNailCreated');

    myEmitter.emit('SavedToIPFS');

    myEmitter.emit('TokenMinted');
      

  })

  


