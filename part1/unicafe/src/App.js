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
      <>
        <p>good {feedBacks.good}</p>
        <p>neutral {feedBacks.neutral}</p>
        <p>bad {feedBacks.bad}</p>
        <p>all {feedBacks.good + feedBacks.neutral + feedBacks.bad}</p>
        <p>average {(feedBacks.good + feedBacks.bad * -1) / (feedBacks.good + feedBacks.neutral + feedBacks.bad)}</p>
        <p>positive {feedBacks.good / (feedBacks.good + feedBacks.neutral + feedBacks.bad) * 100} %</p>
      </>
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
      <Statistics feedBacks={{good, neutral, bad}} hasFeedback={hasFeedback} ></Statistics>
    </div>
  )
}

export default App