import { useState } from 'react'


const Display = (props) => {
  return (
    <div>
      {props.counter}
    </div>
  )
}

const Button = (props) => {
  return (
    <button onClick={ props.OnClick }>
      { props.text }
    </button>
  )
}

const App = () => {
  const [ counter, setCounter ] = useState(0);

  const increase = () => setCounter(counter + 1)
  const decrease = () => setCounter(counter - 1)
  const zero = () => setCounter(0)

  return (
    <div>
      <Display counter={ counter } />
      <Button OnClick={ increase } text={ "add" }/>
      <Button OnClick={ decrease } text={ "remove" }/>
      <Button OnClick={ zero } text={ "zero" }/>
    </div>
  )

}

export default App
