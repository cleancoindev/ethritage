const { myEmitter } = require("./MyEmitter");
const Jimp = require("jimp");
Jimp.RESIZE_HERMITE;
//Front End Feedback



const resizeMethod = Jimp.AUTO;

const quality = {
  quality: 70,
  resize: 250
};

const makeThumbnails = async (imageBuffer, qualitySettings = [quality]) => {

  myEmitter.emit("ThumbNail_Start");

  const image = await Jimp.read(imageBuffer);

  const resizedThumbnails = [];

  const resizeImages = async () => {
    qualitySettings.forEach(async quality => {
      const thumbnail = image.clone();
      thumbnail.quality(quality.quality);
      thumbnail.resize(quality.resize, resizeMethod);

      try {
        const thumbnailBuffer = await thumbnail.getBufferAsync(Jimp.MIME_JPEG);
        resizedThumbnails.push(thumbnailBuffer);
      } catch (error) {
        console.log(error);
      }
    });
  };

  await resizeImages();

  myEmitter.emit("ThumbNail_Finished");

  return resizedThumbnails;
};

module.exports = makeThumbnails;
