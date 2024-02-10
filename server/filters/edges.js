const BaseFilter = require('./BaseFilter');
const { getSurroundingGrid, mapPixels } = require('./utils');
const GX = [-1, 0, 1, -2, 0, 2, -1, 0, 1];
const GY = [-1, -2, -1, 0, 0, 0, 1, 2, 1];

module.exports = class EdgeHighlight extends BaseFilter {
    constructor(adaptedImage) {
        super(adaptedImage);
    }

    getWeightedPixel(
        grid,
        weights
    ) {
        const result = [0, 0, 0];
    
        for(let i = 0; i < 3; i++) {
            for(let j = 0; j < 9; j++) {
                result[i] += (grid[j][i] * weights[j]);
            }
        }
    
        return result;
    }

    sobel(
        pixelGX,
        pixelGY
    ) { 
        const result = [];
    
        for(let i = 0; i < 3; i++) {
            const colorGX = pixelGX[i];
            const colorGY = pixelGY[i];
    
            const sum = (colorGX ** 2) + (colorGY ** 2);
            const root = Math.min(Math.round(Math.sqrt(sum)), 255);
    
            result.push(
                root 
            )
        }  
    
        return result;
    }

    updatePixels(pixels, width, column, row) {
        const grid = getSurroundingGrid(width, column, pixels, row);
    
        const pixelGX = this.getWeightedPixel(grid, GX);
        const pixelGY = this.getWeightedPixel(grid, GY);
    
        const sobelOperatorResult = this.sobel(pixelGX, pixelGY);
    
        return sobelOperatorResult;
    }

    filter() {
        return mapPixels(this.pixels, this.width, this.updatePixels.bind(this));
    }
}