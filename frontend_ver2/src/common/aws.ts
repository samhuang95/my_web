const accessKeyId = import.meta.env.VITE_ACCESS_KEY_ID;
const secretAccessKey = import.meta.env.VITE_SECRET_ACCESS_KEY;
const bucket = import.meta.env.VITE_BUCKET;
const folder = import.meta.env.VITE_DEV_FOLDER;

export const uploadToS3 = async (file, fileName, fileType, path) => {
  return new Promise((resolve) => {
    AWS.config.update({
      accessKeyId: accessKeyId,
      secretAccessKey: secretAccessKey,
    });

    const s3 = new AWS.S3();

    const uploadParams = {
      Bucket: bucket,
      Key: folder + '/' + path + '/' + fileName,
      Body: file,
      ContentEncoding: 'base64',
      ContentType: fileType,
    };

    // 上傳檔案至 S3
    s3.upload(uploadParams, (err, data) => {
      if (err) {
        console.error('上傳檔案時發生錯誤：', err);
        resolve('');
      } else {
        console.log('檔案上傳成功：', data.Location);
        resolve(data.Location);
      }
    });
  });
};
