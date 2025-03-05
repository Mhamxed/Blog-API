function replaceSpace_(str) {
    let res = str.split(" ").join("_")
    return res
}

module.exports = replaceSpace_