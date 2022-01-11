import React from 'react';

const App = () => {
  const course = 'Half Stack application development'
  const parts = [
    {
      name: 'Fundamentals of React',
      exercises: 10
    },
    {
      name: 'Using props to pass data',
      exercises: 7
    },
    {
      name: 'State of a component',
      exercises: 14
    }
  ]

  return (
    <div>
      <Header course={course} />
      <Content parts={parts} />
      <Total total={parts} />
    </div>
  )
}

const Header = (props) => {
  return (
    <h1>{props.course}</h1>
  );
}

const Content = (props) => {
  console.log(props);
  return (
    <div>
      <Part part={props.parts[0]}></Part>
      <Part part={props.parts[1]}></Part>
      <Part part={props.parts[2]}></Part>
    </div>
  );
}

const Part = (props) => {
  console.log(props);
  return (
    <p>
      {props.part.name} {props.part.exercises}
    </p>
  )

}

const Total = (props) => {
  console.log("Total");
  console.log(props.total);
  let sum = 0;
  props.total.forEach(element => sum += element.exercises);

  return (
    <p>Number of exercises {sum}</p>
  )
}

export default App