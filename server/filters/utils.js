function getSurroundingGrid(
    imageWidth,
    curRow,
    chunkedBuffer,
    offset
) {
    const result = [];
    const rowIndex = Math.floor((offset + (curRow * imageWidth)) / imageWidth);

    for(let i = -1; i < 2; i++) {
        for(let j = -1; j < 2; j++) {
            const selectedPixel = chunkedBuffer[rowIndex + i]?.[offset + j];
            result.push(selectedPixel? selectedPixel : [0, 0, 0]);
        }
    }

    return result;
}

function chunk(arr, chunkSize) {
    const result = [];
    let container = [];

    for(let i = 0; i < arr.length; i++) {
        container.push(arr[i]);
        if(container.length === chunkSize) {
            result.push(container);
            container = [];
        }
    }

    return result;
}

function chunkIntoPixels(image, width) {
    return chunk(chunk(image, 3), width)
}

function mapPixels(pixels, width, callback) {
    const result = [];

    for(let i = 0; i < pixels.length; i++) {
        for(let j = 0; j < width; j++) {
            result.push(...callback(pixels, width, i, j));
        }
    }

    return new Uint8Array(result);
}


module.exports = {
    getSurroundingGrid,
    chunk,
    chunkIntoPixels,
    mapPixels
}