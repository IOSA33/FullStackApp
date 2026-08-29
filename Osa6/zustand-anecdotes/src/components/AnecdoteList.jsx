import { useAnecdotes, useAnecdoteActions, useAnecdotes123 } from '../store'

const AnecdoteList = () => {
    const anecdotes = useAnecdotes123()
    const sorted = anecdotes.toSorted((a,b) => b.votes - a.votes)
    const { like } = useAnecdoteActions()

    const vote = id => {
        console.log('vote', id)
        like(id)
    }

    return (
        <div>
        {sorted.map(anecdote => (
            <div key={anecdote.id}>
            <div>{anecdote.content}</div>
            <div>
                has {anecdote.votes}
                <button onClick={() => vote(anecdote.id)}>vote</button>
            </div>
            </div>
        ))}
        </div>
    )
}

export default AnecdoteList