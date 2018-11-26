const Jimp = require("jimp");
Jimp.RESIZE_HERMITE;

const quality = {
  quality: 70,
  resize: 250
};

const resizeImage = async (imageBuffer, myEmitter, qualitySettings = quality) =>{

    myEmitter.emit('ThumbNail_Start');
    const image = await Jimp.read(imageBuffer)
    const thumbnail = image.clone();

    thumbnail.quality(qualitySettings.quality);
    thumbnail.resize(qualitySettings.resize, Jimp.AUTO);

    const thumbnailBuffer = await thumbnail.getBufferAsync(Jimp.MIME_JPEG);
    myEmitter.emit('ThumbNail_Finished');
    return thumbnailBuffer;
} 

module.exports = resizeImage;