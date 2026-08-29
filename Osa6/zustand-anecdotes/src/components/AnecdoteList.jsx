import { useNotificationActions, useAnecdoteActions, useAnecdotes123 } from '../store'

const AnecdoteList = () => {
    const anecdotes = useAnecdotes123()
    const sorted = anecdotes.toSorted((a,b) => b.votes - a.votes)
    const { like } = useAnecdoteActions()
    const { showNotification } = useNotificationActions()

    const vote = (id, content) => {
        showNotification(`You voted \'${content}\'`)
        like(id)
    }

    return (
        <div>
        {sorted.map(anecdote => (
            <div key={anecdote.id}>
            <div>{anecdote.content}</div>
            <div>
                has {anecdote.votes}
                <button onClick={() => vote(anecdote.id, anecdote.content)}>vote</button>
            </div>
            </div>
        ))}
        </div>
    )
}

export default AnecdoteList