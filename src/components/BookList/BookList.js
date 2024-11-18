import Book from '../Book/Book'

import './BookList.css'

const BookList = ({ Books, onDelete }) => {
  return (
    <div className="Book-list">
      {Books.map((item) => {
        return <Book key={item.id} Book={item} onDelete={onDelete} />
      })}
    </div>
  )
}

export default BookList