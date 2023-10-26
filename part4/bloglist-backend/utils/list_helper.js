const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    return blogs.reduce((previousValue, currentValue) => {
        return previousValue + currentValue.likes
    }, 0)
}

module.exports = { dummy, totalLikes }