const BaseFilter = require('./BaseFilter');
const utils = require('./utils');

module.exports = class Invert extends BaseFilter {
    constructor(adaptedImage) {
        super(adaptedImage);
    }
    
    updatePixels(pixels, _, row, column) {
        const pixel = pixels[row][column];
    
        return pixel.reverse();
    }
    

    filter() {
        return utils.mapPixels(this.pixels, this.width, this.updatePixels);
    }
}