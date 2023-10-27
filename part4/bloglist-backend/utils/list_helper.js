const dummy = (blogs) => 1;

const totalLikes = (blogs) => blogs.reduce((previousValue, currentValue) => previousValue + currentValue.likes, 0)

// Note: !blogs?.length returns false only if blogs is not empty|undefined|null
/* const favoriteBlog = (blogs) => !blogs?.length ?
    null :
    blogs.reduce((previousValue, currentValue) =>
        previousValue.likes > currentValue.likes ? previousValue : currentValue) */

const favoriteBlog = (blogs) => !blogs?.length ? null : blogs.sort((a, b) => b.likes - a.likes)[0]

module.exports = { dummy, totalLikes, favoriteBlog }