import { useQuery } from '@apollo/client'
import { useState, useEffect } from 'react'
import { ME, ALL_BOOKS_OF_GENRE } from '../graphql/queries'

const Recommended = (props) => {
  const [ favioriteGenre, setFavioriteGenre ] = useState(null)
  const [ filteredBooks, setFilteredBooks ] = useState([])
  const result = useQuery(ME)
  const filterResult = useQuery(ALL_BOOKS_OF_GENRE, {
    variables: { genre: favioriteGenre }
  })

  useEffect(() => {
    if (result.data) {
      setFavioriteGenre(result.data.me.favoriteGenre)
    }
  }, [result])

  useEffect(() => {
    if (filterResult.data) {
      setFilteredBooks(filterResult.data.allBooks)
    }
  }, [filterResult])

  if (!props.show || !result.data) {
    return null
  }

  return (
    <div>
      <h2>Recommendations</h2>

      <p>
        books in your favorite genre <b>{favioriteGenre}</b>
      </p>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {filteredBooks.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Recommended
