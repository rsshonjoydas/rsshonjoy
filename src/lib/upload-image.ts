import cloudinary from '@/lib/cloudinary';

// Function to get the Cloudinary format based on file extension
function getFileFormat(extension: string | undefined): string {
  switch (extension) {
    case 'jpg':
    case 'jpeg':
    case 'png':
    case 'gif':
    case 'svg':
      return extension;
    default:
      return 'auto'; // For unsupported formats, use 'auto'
  }
}

export const UploadImage = (file: File, folder: string): Promise<any> => {
  const fileExtension = file.name.split('.').pop()?.toLowerCase();
  const format = getFileFormat(fileExtension);

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
              format,
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
  const fileExtension = file.name.split('.').pop()?.toLowerCase();
  const format = getFileFormat(fileExtension);

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
              format,
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
