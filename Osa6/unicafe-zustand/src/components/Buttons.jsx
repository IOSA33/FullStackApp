import { useStatControls } from "../store/store"

const Buttons = () => {
  const { goodInc, neutralInc, badInc } = useStatControls()

  return (
    <div>
      <h2>give feedback</h2>
      <button onClick={goodInc}>good</button>
      <button onClick={neutralInc}>neutral</button>
      <button onClick={badInc}>bad</button>
    </div>
  )
}

export default Buttons
