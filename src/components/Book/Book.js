import React, { memo } from "react";

import "./Book.css";

const Book = memo(({ Book, onDelete}) => {
  return (
    <div className="Book">
      <h3>
        {Book.title}
      </h3>
      <div className="description">
        <h4>Description :  {Book.description}</h4>
      </div>
      <div>
        <button className="btn-Delete" onClick={() => onDelete(Book.id)}>
          Delete
        </button>
      </div>
    </div>
  );
});

export default Book;
