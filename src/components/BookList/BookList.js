import Book from "../Book/Book";
// import { useContext } from "react";
// import { AuthContext } from "../../services/AuthContext";

import "./BookList.css";

const BookList = ({
  Books,
  onDelete,
  currentPage,
  totalPages,
  onPageChange,
}) => {
  return (
    <div className="Book-list-page">
      {Books && Books.length > 0 ? (
        <>
        <div className="Book-list">
          {Books.map((item) => (
            <Book
              key={item.id}
              Book={item}
              onDelete={() => onDelete(item.id)}
            />
          ))}
        </div>
        
          <div className="pagination-btns">
            <button
              onClick={() => onPageChange(currentPage - 1)}
              disabled={currentPage <= 1}
            >
              Previous
            </button>
            <span>
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => onPageChange(currentPage + 1)}
              disabled={currentPage >= totalPages}
            >
              Next
            </button>
          </div>
          </>
      ) : (
        <h1> No books available. </h1>
      )}
    </div>
  );
};

export default BookList;
