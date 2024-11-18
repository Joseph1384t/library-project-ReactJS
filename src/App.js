import { useState, useEffect } from 'react'

import BookList from './components/BookList/BookList'
import AddBook from './components/AddBook/AddBook'

const App = () => {
  const [Books, setBooks] = useState([])

  useEffect(() => {
    const sendRequest = async () => {
      const response = await fetch('http://localhost:8585/Library')

      const responoseData = await response.json()

      setBooks(responoseData)
    }
    sendRequest()
  }, [])

  const addBook = async (title) => {
    const response = await fetch('http://localhost:8585/Library', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(title),
    })

    const responseData = await response.json()

    setBooks([...Books, responseData])
  }

  const deleteBook = async (id) => {
    await fetch(`http://localhost:8585/Library/${id}`, {
      method: 'DELETE',
    })

    setBooks(Books.filter((item) => item.id !== id))
  }

  return (
    <div className="container">
      <AddBook onAdd={addBook} />
      {<BookList Books={Books} onDelete={deleteBook} />}
    </div>
  )
}

export default App;
