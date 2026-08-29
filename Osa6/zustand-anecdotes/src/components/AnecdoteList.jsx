import { useNotificationActions, useAnecdoteActions, useAnecdotes123 } from '../store'

const AnecdoteList = () => {
    const anecdotes = useAnecdotes123()
    const sorted = anecdotes.toSorted((a,b) => b.votes - a.votes)
    const { like, deleteAction } = useAnecdoteActions()
    const { showNotification } = useNotificationActions()

    const vote = (id, content) => {
        showNotification(`You voted \'${content}\'`)
        like(id)
    }

    const deleteUnVoted = (id, votes) => {
        deleteAction(id, votes)
    }

    return (
        <div>
        {sorted.map(anecdote => (
            <div key={anecdote.id}>
            <div>{anecdote.content}</div>
            <div>
                has {anecdote.votes}
                <button onClick={() => vote(anecdote.id, anecdote.content)}>vote</button>
                
                {anecdote.votes !== 0 ? null : <button onClick={() => deleteUnVoted(anecdote.id, anecdote.votes)} type='submit'>delete</button> }

            </div>
            </div>
        ))}
        </div>
    )
}

export default AnecdoteList