const Parser = require("exif-parser");

const parseExif = async (imageFile, myEmitter) =>{

    const parser = Parser.create(imageFile);
    const _imageExifData = await parser.parse();

      myEmitter.emit('ExifParsed', _imageExifData);

    return _imageExifData;
    
}

module.exports = parseExif;