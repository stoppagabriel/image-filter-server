/*
    ISHP
    [WRAP START] - 2 bytes [0 - 1] - 0xac 0xbc
    [OPTION] - 8 bytes [2 - 9]
    [DATA]  - undefined bytes [10 - n]
    [WRAP END] - 2 bytes [n + 1 - n + 2] - 0xac 0xbc
*/

const EventEmitter = require("events");

module.exports = class ISHP extends EventEmitter {
    static WRAPPER = [0x22, 0xac, 0xab, 0xca, 0xbc, 0x22, 0xac, 0x78, 0xbc];
    static OPTIONS_LENGTH = 24;

    constructor() {
        super();
        this.streamData = [];
        this.lastReceivedData = {
            start: null,
            option: null,
            image: null,
            end: null,
        }
    }

    get streamEnded() {
        return this.streamData
            .slice(this.streamData.length - ISHP.WRAPPER.length)
            .every((val, i) => val === ISHP.WRAPPER[i])  
    }

    append(data) {
        this.streamData.push(...data);

        if(this.streamEnded) {
            const [start, option, image, end] = this.destruct();

            this.lastReceivedData = {
                start,
                option,
                image: new Uint8Array(image),
                end
            }

            this.emit('streamEnd');
        }
    }

    static wrap(option, imageData) {
        const optionArr = Array(ISHP.OPTIONS_LENGTH).fill(0).map((zero, i) => option[i]? option[i].charCodeAt(0) : zero);
        
        return new Uint8Array([
            ...ISHP.WRAPPER,
            ...optionArr,
            ...imageData,
            ...ISHP.WRAPPER
        ])
    }

    destruct() {
        const ishpData = this.streamData;

        const [
            start,
            option,
            imageData,
            end
        ] = [
            ishpData.slice(0, ISHP.WRAPPER.length),
            ishpData.slice(ISHP.WRAPPER.length, ISHP.WRAPPER.length + ISHP.OPTIONS_LENGTH)
                .filter(Boolean)
                .map((val) => String.fromCharCode(val))
                .join(''),
            ishpData.slice(ISHP.WRAPPER.length + ISHP.OPTIONS_LENGTH, ishpData.length - ISHP.WRAPPER.length),
            ishpData.slice(ishpData.length - ISHP.WRAPPER.length),
        ]

        return [start, option, imageData, end];
    }

    clear() {
        this.streamData = [];
        this.lastReceivedData = null;
    }
}