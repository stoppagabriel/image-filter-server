const BaseFilter = require('./BaseFilter');

module.exports = class Mirror extends BaseFilter {
    constructor(adaptedImage) {
        super(adaptedImage);
    }

    filter() {
        const result = [];
    
        for(const row of this.pixels) {
            result.push(...row.reverse().flat());
        }

        return result;
    }
}