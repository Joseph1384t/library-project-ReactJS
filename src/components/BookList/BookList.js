import Book from "../Book/Book";
// import { useContext } from "react";
// import { AuthContext } from "../../services/AuthContext";

import "./BookList.css";

const BookList = ({ Books, onDelete, accessToken }) => {
  if (!Books || Books.length === 0) {
    console.log("NNNNNNUUUUUUUUUUUULLLLLLLLLLLL.....: \n", Books);
    return <p> No books available.</p>;
  }

  return (
    <div className="Book-list">
      {Books &&
        Books.map((item) => {
          return (
            <Book
              key={item.id}
              Book={item}
              onDelete={() => onDelete(item.id, accessToken)}
            />
          );
        })}
    </div>
  );
};

export default BookList;
