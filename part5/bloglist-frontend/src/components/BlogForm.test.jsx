import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import blogsService from '../services/blogs'
import BlogForm from './BlogForm'

describe('<BlogForm />', () => {
  test.only('New blog is created', async () => {
    const setMustUpdateBlogs = jest.fn()
    const setNotification = jest.fn()
    const toggableButtonRef = {
      current: {
        setShowToggableButton: jest.fn()
      }
    }

    const create = jest.spyOn(blogsService, 'create')
    create.mockReturnValue({})

    const user = userEvent.setup()

    render(<BlogForm setMustUpdateBlogs={setMustUpdateBlogs} setNotification={setNotification} toggableButtonRef={toggableButtonRef}></BlogForm>)

    const inputTitle = screen.getByLabelText('title', { exact: false })
    await user.type(inputTitle, 'TitleAutoTest')
    const inputAuthor = screen.getByLabelText('author', { exact: false })
    await user.type(inputAuthor, 'AuthorAutoTest')
    const inputURL = screen.getByLabelText('url', { exact: false })
    await user.type(inputURL, 'URLAutoTest')

    const buttonCreate = screen.getByRole('button', { name: 'create' })
    await user.click(buttonCreate)

    expect(setMustUpdateBlogs).toHaveBeenCalled()
    expect(setNotification).toHaveBeenCalled()
    expect(toggableButtonRef.current.setShowToggableButton).toHaveBeenCalled()
    expect(create).toHaveBeenCalledWith({ title: 'TitleAutoTest', author: 'AuthorAutoTest', url: 'URLAutoTest' })
    expect(create).toHaveBeenCalled()
  })
})