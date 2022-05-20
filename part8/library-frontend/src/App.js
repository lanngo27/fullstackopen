import { useEffect, useState } from 'react'
import { useApolloClient, useSubscription } from '@apollo/client'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from './components/LoginForm'
import { BOOK_ADDED } from './graphql/subscriptions'
import { ME, ALL_AUTHORS, ALL_BOOKS, ALL_BOOKS_OF_GENRE } from './graphql/queries'
import Recommended from './components/Recommended'

const uniqByTitle = (a) => {
  let seen = new Set()
  return a.filter((item) => {
    let k = item.title
    return seen.has(k) ? false : seen.add(k)
  })
}

export const updateCacheGenre = (cache, book, genre) => {
  // update recommended book for user
  cache.updateQuery({
    query: ALL_BOOKS_OF_GENRE,
    variables: { genre: genre }
  }, ({ allBooks }) => {
    return {
      allBooks: uniqByTitle(allBooks.concat(book))
    }
  })
}

export const updateCache = (cache, data) => {
  cache.updateQuery({ query: ALL_BOOKS }, ({ allBooks }) => {
    return {
      allBooks: uniqByTitle(allBooks.concat(data.book))
    }
  })

  updateCacheGenre(cache, data.book, null)

  const userData = cache.readQuery({ query: ME }).me
  if (userData)
  {
    if (data.book.genres.includes(userData.favoriteGenre)) {
      updateCacheGenre(cache, data.book, userData.favoriteGenre)
    }
  }

  // update author
  const updateAuthor = (authors, data) => {
    if (authors.filter(a => a.name === data.name).lendth === 0)
      return authors.map(a => a.name === data.name ? data : a)
    return authors.concat(data)
  }
  cache.updateQuery({ query: ALL_AUTHORS }, ({ allAuthors }) => {
    return {
      allAuthors: updateAuthor(allAuthors, data.author)
    }
  })
}

const App = () => {
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(null)
  const client = useApolloClient()

  useEffect(() => {
    const savedToken = localStorage.getItem('library-user')
    if (savedToken) {
      setToken(savedToken)
    }
  }, [])

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      const addedBookAndAuthor = subscriptionData.data.bookAdded
      window.alert(`${addedBookAndAuthor.book.title} added`)

      updateCache(client.cache, addedBookAndAuthor)
    }
  })

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {token
          ? (<>
            <button onClick={() => setPage('add')}>add book</button>
            <button onClick={() => setPage('recommended')}>recommended</button>
            <button onClick={logout}>logout</button>
          </>)
          : <button onClick={() => setPage('login')}>login</button>
        }

      </div>

      <Authors show={page === 'authors'} />

      <Books show={page === 'books'} />

      <NewBook show={page === 'add'} />

      <Recommended show={page === 'recommended'} />

      <LoginForm show={page === 'login'} setToken={setToken} setPage={setPage} />

    </div>
  )
}

export default App
