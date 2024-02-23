import '@testing-library/jest-dom'
import { queryByRole, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'
import blogsService from '../services/blogs'

let blog

beforeEach(() => {
  blog = {
    title: 'title1',
    author: 'author1',
    url: 'url1',
    likes: 0,
    user: {
      id: 'id1',
      name: 'test1',
    }
  }
})

afterEach(() => {
  // restore replaced property
  jest.restoreAllMocks()
})

describe('<Blog /> ', () => {
  test('Renders the blog title and author', () => {
    render(<Blog blog={blog} setMustUpdateBlogs={null} user='test1' />)

    // To debug the DOM:
    // screen.debug()

    expect(screen.queryByText('title1', { exact: false })).not.toBeNull()
    expect(screen.queryByText('author1', { exact: false })).not.toBeNull()
  })

  test('Does not render the URL or number of likes by default', () => {
    render(<Blog blog={blog} setMustUpdateBlogs={null} user='test1' />)

    expect(screen.queryByText('url1', { exact: false })).toBeNull()
    expect(screen.queryByText('likes', { exact: false })).toBeNull()
  })

  test('The button view is showed by default', () => {
    render(<Blog blog={blog} setMustUpdateBlogs={null} user='test1' />)

    expect(screen.getByRole('button', { name: 'view' })).toBeDefined()
  })

  test('Shown URL and number of likes when show button is clicked', async () => {
    render(<Blog blog={blog} setMustUpdateBlogs={null} user='test1' />)

    const user = userEvent.setup()

    const button = screen.queryByRole('button', { name: 'view' })
    await user.click(button)

    expect(screen.queryByText('url1', { exact: false })).not.toBeNull()
    expect(screen.queryByText('likes', { exact: false })).not.toBeNull()
  })

  test('Ensures that if the like button is clicked twice, the event handler the component received as props is called twice', async () => {
    render(<Blog blog={blog} setMustUpdateBlogs={null} user='test1' />)

    const spy = jest.spyOn(blogsService, 'updateLikes')
    spy.mockReturnValue({ ...blog, likes: blog.likes + 1 })

    const user = userEvent.setup()

    const viewButton = screen.queryByRole('button', { name: 'view' })
    await user.click(viewButton)

    const likeButton = screen.queryByRole('button', { name: 'like' })
    await user.click(likeButton)
    await user.click(likeButton)

    expect(spy).toHaveBeenCalledTimes(2)
    expect(screen.queryByText('likes 2', { exact: false })).not.toBeNull()
  })
})
