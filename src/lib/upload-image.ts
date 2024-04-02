import cloudinary from '@/lib/cloudinary';

export const UploadImage = (file: File, folder: string): Promise<any> => {
  const bufferPromise = file.arrayBuffer();
  const bytesPromise = bufferPromise.then((buffer) => Buffer.from(buffer));

  return new Promise((resolve, reject) => {
    bytesPromise
      .then((bytes) => {
        cloudinary.uploader
          .upload_stream(
            {
              resource_type: 'auto',
              folder,
            },
            (err, result) => {
              if (err) {
                return reject(err.message);
              }
              return resolve(result);
            }
          )
          .end(bytes);
      })
      .catch(reject);
  });
};

export const DeleteImage = (publicId: string): Promise<any> =>
  new Promise((resolve, reject) => {
    cloudinary.uploader.destroy(publicId, (error, result) => {
      if (error) {
        reject(new Error(error.message));
      } else {
        resolve(result);
      }
    });
  });

export const UpdateImage = (file: File, publicId: string): Promise<any> => {
  const bufferPromise = file.arrayBuffer();
  const bytesPromise = bufferPromise.then((buffer) => Buffer.from(buffer));

  return new Promise((resolve, reject) => {
    bytesPromise
      .then((bytes) => {
        cloudinary.uploader
          .upload_stream(
            {
              resource_type: 'auto',
              public_id: publicId, // Specify the public_id of the existing image to be replaced
            },
            (err, result) => {
              if (err) {
                return reject(err.message);
              }
              return resolve(result);
            }
          )
          .end(bytes);
      })
      .catch(reject);
  });
};
