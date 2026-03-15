const Header = (props) => <h1>{props.course}</h1>

const Content = ({ parts }) => {
  return ( 
    <div>
      { parts.map(prop => {
          return <Part key={prop.id} part={prop} />
        }) }
    </div>
  )
}

const Part = ({ part }) => {
  return (
    <p>
      {part.name} {part.exercises}
    </p>
  )
}

const Total = ( {total} ) => {
  return ( 
    <b>Number of exercises {total}</b>
  )
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    id: 1,
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      },
      {
        name: 'Redux',
        exercises: 9,
        id: 4
      }
    ]
  }

  const sumOfEx = (list) => {
    let sum = 0
    for(let i = 0; i<list.length; i++) {
      sum += list[i].exercises
    }

    return sum
  }

  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total total={sumOfEx(course.parts)} />
    </div>
  )
}

export default App