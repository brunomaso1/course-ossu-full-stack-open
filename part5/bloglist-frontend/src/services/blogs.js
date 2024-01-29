import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => { token = `Bearer ${newToken}` }

const getAll = async () => {
  const { data } = await axios.get(baseUrl)
  return data
}

const create = async newBlog => {
  const config = {
    headers: { Authorization: token }
  }
  const { data } = await axios.post(baseUrl, newBlog, config)
  return data
}

const updateLikes = async (updatedBlog) => {
  const config = {
    headers: { Authorization: token }
  }
  const { data } = await axios.put(baseUrl + `/${updatedBlog.id}`, { likes: updatedBlog.likes }, config)
  return data
}

export default { getAll, create, updateLikes, setToken }