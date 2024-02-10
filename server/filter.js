const Filters = require('./filters/Filters');
const fs = require('fs/promises');
const adaptImage = require('./imageAdapter');

module.exports = async (originalImage, filter = 'edges') => {
    return  new Filters[filter](adaptImage(originalImage, 'bmp')).execute();
}
