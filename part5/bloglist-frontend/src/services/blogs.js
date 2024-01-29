import axios from 'axios'
const baseUrl = '/api/blogs'

const config = {
  headers: { Authorization: null }
}

const setToken = newToken => { config.headers = { Authorization: `Bearer ${newToken}` } }

const getAll = async () => (await axios.get(baseUrl)).data

const create = async newBlog => await axios.post(baseUrl, newBlog, config)

const updateLikes = async (updatedBlog) => await axios.put(baseUrl + `/${updatedBlog.id}`, { likes: updatedBlog.likes }, config)

const remove = async blogToDelete => await axios.delete(baseUrl + `/${blogToDelete.id}`, config)

export default { getAll, create, updateLikes, remove, setToken }