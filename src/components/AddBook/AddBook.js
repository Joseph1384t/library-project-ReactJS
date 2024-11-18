import { useState } from 'react'

import './AddBook.css'

const AddBook = ({ onAdd }) => {
  const [title, setTitle] = useState('')

  const submitForm = (event) => {
    event.preventDefault()

    onAdd({ title })

    setTitle('')
  }

  return (
    <div>
      <form className="add-Book-form" onSubmit={submitForm}>
        <div className="form-control">
          <input
            type="text"
            placeholder="Add Book"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            id="commentTXT"
            placeholder="Add Comment"
            rows="4" cols="50"
            // value={desc}
            // onChange={(e) => setTitle(e.target.value)}
            >
          </textarea>
        </div>
        <button type="submit" className="form-btn">
          Add to Library
        </button>
      </form>
    </div>
  )
}

export default AddBook