const Types = require('./types/types.js');

module.exports = (originalImage, fileType) => {
    return Types[fileType](originalImage);
}