import url from 'url';

/**
 * A function to process urls
 * and return a resource
 * @param {string} requestURL
 * @returns {string}  resource
 */
const processUrl = (requestURL) => {
  const parsedURL = url.parse(requestURL, true);
  const path = parsedURL.pathname;
  const cleanPath = path.replace(/^\/+|\/$/g, '');
  const resource = cleanPath.split('/')[0];
  return resource;
};

export default processUrl;
