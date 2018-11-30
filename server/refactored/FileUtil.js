const fs = require("fs");
const { myEmitter } = require("./MyEmitter");
const uuidv4 = require('uuid/v4');



class FileUtil {
    constructor(filePath, watchedFolder) {
        this.watchedFolder = watchedFolder;
        this.filePath = filePath;
        this.exportFolderPath = watchedFolder + "/" + uuidv4();
        this.image;
      
    }


    loadImage() {
        const image = fs.readFileSync(this.filePath);
        myEmitter.emit('ImageLoaded');
    
        this.image = image;
        this.makeNewFolder();
        return image;
    }

    async makeNewFolder(folder = this.exportFolderPath) {
        fs.mkdirSync(folder);
    }

    getExportPath(){
        return this.exportFolderPath;
    }
}


module.exports = FileUtil;