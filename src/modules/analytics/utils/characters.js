
const characters = (text) => {
    try {
        return text.match(/[a-zA-Z0-9]/g)
    } catch(e) {
        return []
    }
}

module.exports = characters