import { useState } from "react";

import "./AddBook.css";

const AddBook = ({ onAdd }) => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");

  const submitForm = (event) => {
    event.preventDefault();
    if (!title.trim() || !desc.trim()) {
      alert("Both title and description are required.");
      return;
    }
    onAdd(title, desc);
    setTitle("");
    setDesc("");
  };
  

  return (
    <div>
      <form className="add-Book-form" onSubmit={submitForm}>
        <div className="form-control">
          <input
            type="text"
            placeholder="Add Book"
            value={title}
            onChange={(eTitle) => setTitle(eTitle.target.value)}
          />
          <textarea
            id="commentTXT"
            placeholder="Add Comment"
            rows="4"
            cols="50"
            value={desc}
            onChange={(inp) => setDesc(inp.target.value)}
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
