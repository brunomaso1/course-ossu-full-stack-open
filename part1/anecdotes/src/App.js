import React, { useState } from 'react';

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients'
  ]

  const [selected, setSelected] = useState(0);
  const [points, setPoints] = useState(new Uint8Array(anecdotes.length))

  function generateRandomAnecdote() {
    // Generates a random integer between 0 and (anecdotes.length - 1).
    let randomPosition = Math.floor(Math.random() * anecdotes.length);
    setSelected(randomPosition);
  }

  function vote() {
    const newPoints = [...points];
    newPoints[selected] += 1;
    setPoints(newPoints);
    console.log();
  }

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>{anecdotes[selected]}</p>
      <p>has {points[selected]} votes</p>
      <button onClick={vote}>vote</button>
      <button onClick={generateRandomAnecdote}>next anecdote</button>

      <h1>Anecdote with most votes</h1>
      {/* https://stackoverflow.com/questions/11301438/return-index-of-greatest-value-in-an-array */}
      <p>{anecdotes[points.indexOf(Math.max(...points))]}</p>
      <p>has {points[points.indexOf(Math.max(...points))]} votes</p>
    </div>
  )
}

export default App