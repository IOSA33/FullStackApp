import { useAnecdoteActions } from "../store"

const Filter = () => {
    const { setFilterWord } = useAnecdoteActions()

    const handleChange = (event) => {
        setFilterWord(event.target.value)
    }
    const style = {
        marginBottom: 10
    }

    return (
        <div style={style}>
        filter <input onChange={handleChange} />
        </div>
    )
}

export default Filter