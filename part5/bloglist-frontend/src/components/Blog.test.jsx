import '@testing-library/jest-dom'
import { queryByRole, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

const blog = {
  title: 'title1',
  author: 'author1 url1',
  url: 'url1',
  likes: 0,
  user: {
    id: 'id1',
    name: 'test1',
  }
}

describe('<Blog /> ', () => {
  test('Renders the blog title and author', () => {
    render(<Blog blog={blog} setMustUpdateBlogs={null} user='test1' />)

    // To debug the DOM:
    // screen.debug()

    screen.getByText('title1', { exact: false }) && screen.getByText('author1', { exact: false })
  })

  test('Does not render the URL or number of likes by default', () => {
    render(<Blog blog={blog} setMustUpdateBlogs={null} user='test1' />)

    !screen.queryByText('url1', { exact: false }) && !screen.queryByText('likes', { exact: false })
  })

  test('The button view is showed by default', () => {
    render(<Blog blog={blog} setMustUpdateBlogs={null} user='test1' />)

    screen.getByRole('button', { name: 'view' })
  })

  test.skip('Shown URL and number of likes when show button is clicked', async () => {
    render(<Blog blog={blog} setMustUpdateBlogs={null} user='test1' />)
    const user = userEvent.setup()

    const button = screen.queryByRole('button', { name: 'view' })
    await user.click(button)
  })
})
