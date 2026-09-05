const baseurl = 'http://localhost:3001/anecdotes'

export const getAll = async () => {
    const data = await fetch(baseurl)
    if (!data.ok) {
        throw new Error("cant get data!");
    }
    return await data.json()
}

export const createAnecdote = async (data) => {
    const options = {
        method: "POST",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)
    }

    const response = await fetch(baseurl, options)
    if (!response.ok) {
        throw new Error("Cant create new anecdote!");
    }

    return await response.json()
}
