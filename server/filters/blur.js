const BaseFilter = require('./BaseFilter');
const utils  = require('./utils');

module.exports = class Blur extends BaseFilter {
    constructor(adaptedImage) {
        super(adaptedImage);
    }

    blur(surroundingPixels) {
        const colorSum = surroundingPixels.reduce((acc, curPixel) => (
            acc.map((curAcc, i) => curAcc + curPixel[i])
        ), [0, 0, 0])


        return colorSum.map((summed) => Math.floor(summed / 9)); 
    }

    updatePixels(pixels, width, row, column) {
        const grid = utils.getSurroundingGrid(width, row, pixels, column);

        return this.blur(grid);
    }

    filter() {
        return utils.mapPixels(this.pixels, this.width, this.updatePixels.bind(this));
    }
}