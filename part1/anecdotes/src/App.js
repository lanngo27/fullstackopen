import { useState } from 'react'

const Header = (props) => {
  return (
    <h1>{props.header}</h1>
  )
}

const VotedAnecdote = ({votes, anecdotes}) => {
  const idx = votes.indexOf(Math.max.apply(Math, votes))
  return <p>{anecdotes[idx]}<br />has {votes[idx]} votes</p>
}

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
   
  const [selected, setSelected] = useState(0)
  const [votes, setVoted] = useState(new Uint8Array(7))

  const randomInteger = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min)
  }

  const updateVotes = () => {
    const copy = [...votes]
    copy[selected] += 1
    setVoted(copy)
  }

  return (
    <div>
      <Header header="Anecdote of the day" />
      <p>{anecdotes[selected]}<br />has {votes[selected]} votes</p>
      <button onClick={() => updateVotes()}>vote</button>
      <button onClick={() => setSelected(randomInteger(0, 6))}>next anecdote</button>
      <Header header="Anecdote with most votes" />
      <VotedAnecdote votes={votes} anecdotes={anecdotes}/>
    </div>
  )
}

export default App