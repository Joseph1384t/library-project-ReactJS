import React, { memo } from "react";

import "./Book.css";

const Book = memo(({ Book, onDelete }) => {
  return (
    <div className="Book">
      <h2>{Book.title}</h2>
      <div className="description">
        <h4>Description : </h4> <h5>{Book.desc}</h5>
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
