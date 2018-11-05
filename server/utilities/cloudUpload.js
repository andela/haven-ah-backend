import cloudinary from 'cloudinary';
import dotenv from 'dotenv';

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

/**
 * This function takes the localImage URL
 * and stores the file on cloudinary returning the cloudinary URL
 * @param {array} urlStore stores the url(s).
 * @param {string} localImage
 * @returns {object} result. Part of it gets assigned to the request body.
 * @example cloudUpload(request, '/User/guest/pictures/authorsLogo.jpg')
 */
const cloudUpload = (urlStore, localImage) => cloudinary.v2.uploader.upload(localImage,
  (error, result) => {
    if (result !== undefined) {
      urlStore.push(result.secure_url);
    } else {
      urlStore.push(error);
    }
  });

export default cloudUpload;
