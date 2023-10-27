const _ = require('lodash');

const dummy = (blogs) => 1;

const totalLikes = (blogs) => blogs.reduce((previousValue, currentValue) => previousValue + currentValue.likes, 0)

// Note: !blogs?.length returns false only if blogs is not empty|undefined|null
/* const favoriteBlog = (blogs) => !blogs?.length ?
    null :
    blogs.reduce((previousValue, currentValue) =>
        previousValue.likes > currentValue.likes ? previousValue : currentValue) */

const favoriteBlog = (blogs) => !blogs?.length ? null : blogs.sort((a, b) => b.likes - a.likes)[0]

const mostBlogs = (blogs) =>
    // With out Lodash
    // O(n^3)
    /* const accumulatedBlogs = []
    blogs.forEach((blog) => {
        const accBlogIndex = accumulatedBlogs.findIndex((accBlog) => {
            return accBlog.author.toLowerCase().trim() === blog.author.toLowerCase().trim()
        })
        if (accBlogIndex !== -1) {
            accumulatedBlogs[accBlogIndex].blogs += 1
        } else {
            accumulatedBlogs.push({ author: blog.author, blogs: 1 })
        }
    })
    return !accumulatedBlogs?.length ? null : accumulatedBlogs.sort((a, b) => b.blogs - a.blogs)[0] */

    // One can improve the algorithm to be O(n log n) by using tree search (using this structure to
    // insert and look up) and keep the max in some memory value, so you don't have to look for 
    // it when you finish.

    // With Lodash
    !blogs?.length ? null : _.flow([
        blogs => _.countBy(blogs, 'author'), // count by the author
        /* toPairs: convert to array of [key, value] pairs, something like:
        [
            [ 'Michael Chan', 1 ],
            [ 'Edsger W. Dijkstra', 2 ],
            [ 'Robert C. Martin', 1 ]
          ]
        */
        blogs => _.toPairs(blogs),
        /* Use the second elemente in the array to compare */
        blogs => _.maxBy(blogs, element => element[1]),
        blog => _.zipObject(['author', 'blogs'], blog) // convert to an object
    ])(blogs)

module.exports = { dummy, totalLikes, favoriteBlog, mostBlogs }