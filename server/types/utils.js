const readInt32LE = (input, offset = 0) =>
    input[offset] +
    input[offset + 1] * 2 ** 8 +
    input[offset + 2] * 2 ** 16 +
    (input[offset + 3] << 24)

const readUInt32LE = (input, offset = 0) => {
    return (
        input[offset] +
        input[offset + 1] * 2 ** 8 +
        input[offset + 2] * 2 ** 16 +
        input[offset + 3] * 2 ** 24
    )
}

module.exports = {
    readInt32LE,
    readUInt32LE
}