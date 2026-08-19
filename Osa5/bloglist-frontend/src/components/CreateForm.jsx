import { useState } from 'react'
import { TextField, Button } from '@mui/material'

const CreateForm = ({ createBlog }) => {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')

    const handleAddBlog = (event) => {
      event.preventDefault()

      createBlog({ title, author, url })

      setTitle('')
      setAuthor('')
      setUrl('')
    }

    return (
      <div>
        <h2>create new</h2>
        <form onSubmit={handleAddBlog}>
          <label>
            <label style={{display:'none'}}>title</label>
            <TextField
              style={{width:420}}
              type="text"
              id="outlined-password-input"
              label="title"
              value={title}
              onChange={({ target }) => setTitle(target.value)}
            />
          </label>
          <br></br>
          <label>
            <label style={{display:'none'}}>auhtor</label>
            <br></br>
            <TextField
              style={{width:420}}
              type="text"
              id="outlined-password-input"
              label="author"
              value={author}
              onChange={({ target }) => setAuthor(target.value)}
            />
          </label>
          <br></br>
          <label>
            <label style={{display:'none'}}>url</label>
            <br></br>
            <TextField
              style={{width:420}}
              type="text"
              id="outlined-password-input"
              label="url"
              value={url}
              onChange={({ target }) => setUrl(target.value)}
            />
          </label>
          <br></br>
          <Button type="submit" variant='contained' style={{ marginTop: 10 }}>create</Button>
          <br></br>
        </form>
      </div>
    )
}

export default CreateForm