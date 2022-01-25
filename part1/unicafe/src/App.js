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

const Statistics = ({ feedBacks, hasFeedback }) => {
  if (!hasFeedback)
    return (
      <p>No feedback given</p>
    )
  else
    return (
      <table>
        <tbody>
          <StatisticLine text="good" value={feedBacks.good}></StatisticLine>
          <StatisticLine text="neutral" value={feedBacks.neutral}></StatisticLine>
          <StatisticLine text="bad" value={feedBacks.bad}></StatisticLine>
          <StatisticLine text="all" value={feedBacks.good + feedBacks.neutral + feedBacks.bad}></StatisticLine>
          <StatisticLine text="average" value={(feedBacks.good + feedBacks.bad * -1) / (feedBacks.good + feedBacks.neutral + feedBacks.bad)}></StatisticLine>
          <StatisticLine text="positive" value={feedBacks.good / (feedBacks.good + feedBacks.neutral + feedBacks.bad) * 100}></StatisticLine>
        </tbody>
      </table>
    )
}

const StatisticLine = ({ text, value }) => {
  if (text === 'positive')
    return (
      <tr>
        <td>{text}</td>
        <td>{value} %</td>
      </tr>
    )
  else
    return (
      <tr>
        <td>{text}</td>
        <td>{value}</td>
      </tr>
    )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const [hasFeedback, setHasFeedback] = useState(false);

  const setFeedback = ({ value }) => {
    switch (value) {
      case 'good':
        return () => {
          setHasFeedback(true);
          setGood(good + 1);
        };
      case 'neutral':
        return () => {
          setHasFeedback(true);
          setNeutral(neutral + 1);
        }
      case 'bad':
        return () => {
          setHasFeedback(true);
          setBad(bad + 1);
        }
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
      <Statistics feedBacks={{ good, neutral, bad }} hasFeedback={hasFeedback} ></Statistics>
    </div>
  )
}

export default App