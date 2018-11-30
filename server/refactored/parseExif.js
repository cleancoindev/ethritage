const Parser = require("exif-parser");
//Front End Feedback
const { myEmitter } = require("./MyEmitter");

const parseExif = async (imageFile) =>{

    const parser = Parser.create(imageFile);
    const _imageExifData = await parser.parse();

      myEmitter.emit('ExifParsed', _imageExifData);

    return _imageExifData;
    
}

module.exports = parseExif;