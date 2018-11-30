const fs = require("fs");
const { myEmitter } = require("./MyEmitter");


class FileUtil {
    constructor(filePath) {
        this.filePath = filePath;
      
    }

    // Adding a method to the constructor
    greet() {
        return `${this.name} says hello.`;
    }

    loadImage() {
        const image = fs.readFileSync(this.filePath);
        myEmitter.emit('ImageLoaded');
    
        return image;
    }
}


module.exports = FileUtil;