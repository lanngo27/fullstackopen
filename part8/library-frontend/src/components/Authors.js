import { useMutation, useQuery } from '@apollo/client'
import { useState, useEffect } from 'react'
import { ALL_AUTHORS } from '../graphql/queries'
import { EDIT_AUTHORS } from '../graphql/mutations'

const Authors = (props) => {
  const [ name, setName ] = useState(null)
  const [ year, setYear ] = useState('')
  const [ authors, setAuthors ] = useState([])
  const result = useQuery(ALL_AUTHORS)
  const [ editResult ] = useMutation(EDIT_AUTHORS, {
    refetchQueries: [ { query: ALL_AUTHORS } ]
  })

  useEffect(() => {
    if (result.data) {
      setAuthors(result.data.allAuthors)
    }
  }, [result])

  if (!props.show || !result.data) {
    return null
  }

  if (!name && authors.length > 0) {
    setName(authors[0].name)
  }

  const setBirthYear = async (e) => {
    e.preventDefault()

    editResult({ variables: {
      name, setBornTo: parseInt(year)
    } })
    setName('')
    setYear('')
  }

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.books.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h2>Set birthyear</h2>
      <div>
        {name
          ? <form onSubmit={setBirthYear}>
            <select value={name} onChange={({ target }) => setName(target.value)}>
              {authors.map((a) =>
                (<option value={a.name} key={a.name}>{a.name}</option>))
              }
            </select>
            <div>
              born
              <input
                value={year}
                type="number"
                onChange={({ target }) => setYear(target.value)}
              />
            </div>
            <button type="submit">
              update author
            </button>
          </form>
          : null
        }
      </div>
    </div>
  )
}

export default Authors
