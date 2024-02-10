const { readUInt32LE, readInt32LE } = require("./utils");

module.exports = (imageFile) => {
    const uintArray = new Uint8Array(imageFile);
    const header = uintArray.slice(0, 54);
    const content = uintArray.slice(54);


    return {
        header,
        content,
        width: readUInt32LE(header, 18),
        height: Math.abs(readInt32LE(header, 22))
    }
}