import Book from "../Book/Book";
// import { useContext } from "react";
// import { AuthContext } from "../../services/AuthContext";

import "./BookList.css";

const BookList = ({ Books, onDelete }) => {
  if (!Books || Books.length === 0) {
    console.log("NNNNNNUUUUUUUUUUUULLLLLLLLLLLL.....: \n", Books);
    return (
      <div className="Book-list">
        <h1> No books available. </h1>
      </div>
    );
  }

  return (
    <div className="Book-list">
      {Books &&
        Books.map((item) => {
          return (
            <Book
              key={item.id}
              Book={item}
              onDelete={() => onDelete(item.id)}
            />
          );
        })}
    </div>
  );
};

export default BookList;
