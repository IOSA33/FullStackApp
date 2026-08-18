import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'
import CreateForm from './CreateForm'
import { MemoryRouter } from 'react-router-dom'

const createFakeJwt = (payload) => {
  const header = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' }))
  const body = btoa(JSON.stringify(payload))
  const signature = 'fake_jwt_signature'
  return `${header}.${body}.${signature}`
}

test.only('renders content for logged-in user when blog belongs to another user', () => {
    const blog = {
        title: "component test",
        author: "testing author",
        url: "testing url",
        likes: 123,
        user: {
            id: "03w9fj09w3jf039fj039wjf99"
        }
    }

    const payload = {
        username: "testing author", 
        id: "03w9fj09w3jf039fj039wjf990",
    }

    const user = {
        token: createFakeJwt(payload),
        username: "testing author",
        name: "Test"
    }

    render(
        <MemoryRouter>
            <Blog blog={blog} user={user}/>
        </MemoryRouter>
    )

    screen.debug()

    let element = screen.getByText("component test by testing author")
    expect(element).toBeDefined()

    element = screen.getByText(/likes/)
    expect(element).toBeDefined()

    const elementNotVisible = screen.getByText("remove")
    expect(elementNotVisible).not.toBeVisible()

    const elementVisible = screen.getByText("like")
    expect(elementVisible).toBeVisible()
})


test.only('renders content for logged-in user when blog belongs to the user', () => {
    const blog = {
        title: "component test",
        author: "testing author",
        url: "testing url",
        likes: 123,
        user: {
            id: "03w9fj09w3jf039fj039wjf99"
        }
    }

    const payload = {
        username: "testing author", 
        id: "03w9fj09w3jf039fj039wjf99",
    }

    const user = {
        token: createFakeJwt(payload),
        username: "testing author",
        name: "Test"
    }

    render(
        <MemoryRouter>
            <Blog blog={blog} user={user}/>
        </MemoryRouter>
    )

    screen.debug()

    let element = screen.getByText("component test by testing author")
    expect(element).toBeDefined()

    element = screen.getByText(/likes/)
    expect(element).toBeDefined()

    const elementNotVisible = screen.getByText("remove")
    expect(elementNotVisible).toBeVisible()

    const elementVisible = screen.getByText("like")
    expect(elementVisible).toBeVisible()
})

test.only('renders content for logged-out user', () => {
    const blog = {
        title: "component test",
        author: "testing author",
        url: "testing url",
        likes: 123,
        user: "03w9fj09w3jf039fj039wjf99"
    }

    render(
        <MemoryRouter>
            <Blog blog={blog}/>
        </MemoryRouter>
    )

    screen.debug()

    let element = screen.getByText("component test by testing author")
    expect(element).toBeDefined()

    element = screen.getByText(/likes/)
    expect(element).toBeDefined()

    let elementNotVisible = screen.getByText("like")
    expect(elementNotVisible).not.toBeVisible()

    elementNotVisible = screen.getByText("remove")
    expect(elementNotVisible).not.toBeVisible()
})

test('render url and likes when clicked view', async () => {
    const blog = {
        title: "component test",
        author: "testing author",
        url: "testing url",
        likes: 123,
        user: "03w9fj09w3jf039fj039wjf99"
    }

    render(
        <MemoryRouter>
            <Blog blog={blog}/>
        </MemoryRouter>
    )
    const user = userEvent.setup()
    const button = screen.getByText("view")
    await user.click(button)
    
    const urlElement = screen.getByText(/testing url/)
    const likesElement = screen.getByText(/123/)

    expect(urlElement).toBeVisible()
    expect(likesElement).toBeVisible()
})

test('like button clicked twise', async () => {
    const blog = {
        title: "component test",
        author: "testing author",
        url: "testing url",
        likes: 123,
        user: "03w9fj09w3jf039fj039wjf99"
    }

    const mockHandler = vi.fn()

    render(
        <MemoryRouter>
            <Blog blog={blog} updateLikes={mockHandler} />
        </MemoryRouter> 
    )

    const user = userEvent.setup()
    const button = screen.getByText("view")
    await user.click(button)
    
    const button_like = screen.getByText("like")
    await user.click(button_like)
    await user.click(button_like)

    expect(mockHandler.mock.calls).toHaveLength(2)
})

test('call the form prop with right values', async () => {
    const user = userEvent.setup()
    const mockHandler = vi.fn()

    render(<CreateForm createBlog={mockHandler} />)

    const input_title = screen.getByLabelText('title')
    const input_author = screen.getByLabelText('author')
    const input_url = screen.getByLabelText('url')
    const createButton = screen.getByText('create')

    await user.type(input_title, 'testing a title input')
    await user.type(input_author, 'testing a auhtor input')
    await user.type(input_url, 'testing a url input')

    await user.click(createButton)

    expect(mockHandler.mock.calls).toHaveLength(1)
    expect(mockHandler.mock.calls[0][0]).toEqual({
            title: 'testing a title input',
            author: 'testing a auhtor input',
            url: 'testing a url input'
        })
})