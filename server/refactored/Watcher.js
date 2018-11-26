//Front End Feedback
const { myEmitter } = require("./MyEmitter");
//Watcher
const chokidar = require("chokidar");


//folder to watch
const watchedFolder = "./export";



//watcher
const watcher = chokidar.watch(watchedFolder, {
    ignored: /(^|[\/\\])\../,
    persistent: true
  });


  watcher.on("add", async filePath => {
    myEmitter.emit('FileAdded', filePath);


    myEmitter.emit('FileAdded', filePath);


    myEmitter.emit('FileAdded', filePath);


    myEmitter.emit('FileAdded', filePath);
      

  })

  


