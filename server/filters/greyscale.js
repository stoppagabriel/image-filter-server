const BaseFilter = require('./BaseFilter');
const utils = require('./utils');

module.exports = class Greyscale extends BaseFilter {
    constructor(adaptedImage) {
        super(adaptedImage);
    }

    updatePixels(pixels, _ , row, column) {
        const pixel = pixels[row][column];
        const intermediaryValue = Math.floor(pixel.reduce((acc, cur) => acc + cur, 0) / 3);
    
        return Array(3).fill(intermediaryValue);
    }
    

    filter() {
        return utils.mapPixels(this.pixels, this.width, this.updatePixels);
    }
}