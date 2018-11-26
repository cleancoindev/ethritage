const fs = require("fs");

const loadImage = (filePath, myEmitter) => {


    const image = fs.readFileSync(filePath);
    myEmitter.emit('ImageLoaded');

    return image;

}

module.exports = loadImage;