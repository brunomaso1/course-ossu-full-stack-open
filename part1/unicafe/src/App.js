import React, { useState } from 'react'

const Title = ({ text }) => {
  return (
    <h1>{text}</h1>
  )
}

const Button = ({ text, handleClick }) => {
  return (
    <button onClick={handleClick}>
      {text}
    </button>
  )
}

// Already done 1.8
const Statistics = ({good, neutral, bad}) => {
  return (
    <>
      <p>good {good}</p>
      <p>neutral {neutral}</p>
      <p>bad {bad}</p>
      <p>all {good + neutral + bad}</p>
      <p>average {(good + bad * -1)/(good + neutral + bad)}</p>
      <p>positive {good/(good + neutral + bad)*100} %</p>
    </>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const setFeedback = ({ value }) => {
    switch (value) {
      case 'good':
        return () => setGood(good + 1);
      case 'neutral':
        return () => setNeutral(neutral + 1);
      case 'bad':
        return () => setBad(bad + 1)
      default:
        console.error('Wrrong function');
        break;
    }
  }

  return (
    <div>
      <Title text='Give Feedback'></Title>
      <Button text='good' handleClick={setFeedback({ value: 'good' })}></Button>
      <Button text='neutral' handleClick={setFeedback({ value: 'neutral' })}></Button>
      <Button text='bad' handleClick={setFeedback({ value: 'bad' })}></Button>
      <Title text='Statistics'></Title>
      <Statistics good={good} neutral={neutral} bad={bad} ></Statistics>
    </div>
  )
}

export default App