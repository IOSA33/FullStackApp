import { create } from "zustand"

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await fetch(baseUrl)

  if (!response.ok) {
    throw new Error('Failed to fetch anecdotes')
  }

  const data = await response.json()
  return data
}

const createOne = async (content) => {
  const response = await fetch(baseUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({content, votes: 0})
  })

  if (!response.ok) {
    throw new Error('Failed to createOne() anecdote')
  }

  return await response.json()
}

const update = async (id, content) => {
  const response = await fetch(`${baseUrl}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(content)
  })

  if (!response.ok) {
    throw new Error('Failed to update() anecdote!')
  }

  return await response.json()
}

export default { getAll, createOne , update}
