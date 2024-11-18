import './Book.css'

const Book = ({ Book, onDelete }) => {
  return (
    <div className="Book">
      <div>{Book.title}</div>
      <div>
        <button className="btn" onClick={() => onDelete(Book.id)}>
          Delete
        </button>
      </div>
    </div>
  )
}

export default Book