import { useState } from "react";

import "./AddBook.css";

const AddBook = ({ onAdd }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const submitForm = (event) => {
    event.preventDefault();
    if (!title.trim() || !description.trim()) {
      alert("Both title and description are required.");
      return;
    }
    onAdd(title, description);
    setTitle("");
    setDescription(
      `Lorem ipsum dolor sit amet, consectetur adipiscing elit,
       sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. `
    );
  };
  ///////////اخر برنامه description : desc\\\\\\\\\\
  return (
    <div>
      <form className="add-Book-form" onSubmit={submitForm}>
        <div className="form-control">
          <input
            autoFocus
            type="text"
            placeholder="Add Book"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            id="commentTXT"
            placeholder="Add Comment"
            rows="3"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>
        <button type="submit" className="form-btn">
          Add to Library
        </button>
      </form>
    </div>
  );
};

export default AddBook;
