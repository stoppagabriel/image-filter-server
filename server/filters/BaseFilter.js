const utils = require('./utils');

module.exports = class BaseFilter {
    constructor({ header, content, width }) {
        this.header = header;
        this.content = content;
        this.width = width;
        this.pixels = utils.chunkIntoPixels(content, width);
    }

    filter() {
        return this.content;
    }

    execute() {
        return new Uint8Array([...this.header, ...this.filter()])
    }
}