import cloudUpload from '../utilities/cloudUpload';
import { badHttpResponse } from '../utilities/httpResponse';
/**
 * This middleware handles the images upload to cloudinary
 * @param {object} request the request from another middleware
 * @param {object} response the response
 * @param {object} next a callback function
 * @returns {object} next() callback function
 */
const uploadImage = async (request, response, next) => {
  const { image, images } = request.body;
  console.log(images, ' space ' , image);
  const store = [];

  try {
    if (image) {
      await cloudUpload(store, image);
      request.body.images = store;
      return next();
    }
    // For an array of images.
    if (images) {
      await images.forEach(oneImage => cloudUpload(store, oneImage));
      request.body.images = store;
      return next();
    }
    return next();
  } catch (error) {
    return badHttpResponse(response, 400, 'Please ensure that the image is valid', error.message);
  }
};

export default uploadImage;
