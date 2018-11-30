const fs = require("fs");
const { myEmitter } = require("./MyEmitter");

const loadImage = (filePath) => {


    const image = fs.readFileSync(filePath);
    myEmitter.emit('ImageLoaded');

    return image;

}

module.exports = loadImage;