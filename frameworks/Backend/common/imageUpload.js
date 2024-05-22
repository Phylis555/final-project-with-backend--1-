const cloudinary = require("cloudinary").v2;
cloudinary.config({
  cloud_name: "dqq5vqbk4",
  api_key: "469877517994647",
  api_secret: "rbp2q8PzlccBJ1PBWgy5XfS3Y4k",
});

async function imageUpload(imageBase64) {
  try {
    const imageUploaded = await cloudinary.uploader.upload(
      imageBase64,
      {
        folder: "InstantGiving",
      },
      function (error, result) {
        console.log(result, error);
      }
    );
    //   console.log(imageUploaded);
    return imageUploaded.url;
  } catch (error) {
    console.log(error);
  }
}
module.exports = {
  imageUpload,
};
