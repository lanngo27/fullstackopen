import { useQuery } from '@apollo/client'
import { useState, useEffect } from 'react'
import { ALL_BOOKS, ALL_BOOKS_OF_GENRE } from '../graphql/queries'

const Books = (props) => {
  const [ selectedGenre, setSelectedGenre ] = useState(null)
  const [ genres, setGenres ] = useState([])
  const [ books, setBooks ] = useState([])
  const [ filteredBooks, setFilteredBooks ] = useState([])
  const result = useQuery(ALL_BOOKS)
  const filterResult = useQuery(ALL_BOOKS_OF_GENRE, {
    variables: { genre: selectedGenre }
  })

  useEffect(() => {
    if (result.data) {
      setBooks(result.data.allBooks)
      let genresList = ['All genres']
      books.forEach(b => {
        b.genres.forEach((g) => {
          if (genresList.indexOf(g) === -1) {
            genresList.push(g)
          }
        })
      })
      setGenres(genresList)
      setFilteredBooks(books)
      setSelectedGenre(null)
    }
  }, [result, books])

  useEffect(() => {
    if (filterResult.data) {
      setFilteredBooks(filterResult.data.allBooks)
    }
  }, [filterResult])

  if (!props.show || !result.data) {
    return null
  }

  const filterBooks = (g) => {
    if (g === 'All genres') {
      setSelectedGenre(null)
    }
    else{
      setSelectedGenre(g)
    }
  }

  return (
    <div>
      <h2>books</h2>

      <p>
        in genre <b>{selectedGenre === null ? 'All genres' : selectedGenre}</b>
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

      <div>
        {genres.length > 0 &&
          genres.map((g) => (
            <button onClick={() => filterBooks(g)} key={g}>
              {g}
            </button>
          ))}
      </div>
    </div>
  )
}

export default Books
