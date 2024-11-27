import React, { memo } from "react";

import "./Book.css";

const Book = memo(({ Book, onDelete }) => {
  console.log("Book :-----------: " + JSON.stringify(...Book) );
  return (
    <div className="Book">
      <h2>
        {Book[0].title}
        {/* {Book[0].id} */}
      </h2>
      <div className="description">
        <h4>Description : </h4> <h5>{Book.description}</h5>
      </div>
      <div>
        <button className="btn" onClick={() => onDelete(Book.id)}>
          Delete
        </button>
      </div>
    </div>
  );
});

export default Book;
