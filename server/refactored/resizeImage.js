const Jimp = require("jimp");
Jimp.RESIZE_HERMITE;

const resizeMethod = Jimp.AUTO;

const quality = {
  quality: 70,
  resize: 250
};

const makeThumbnails = async (
  imageBuffer,
  myEmitter,
  qualitySettings = [quality]
) => {
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
  console.log("Resized thumbnails 2 is: ", resizedThumbnails);
  return resizedThumbnails[0];
};

module.exports = makeThumbnails;
