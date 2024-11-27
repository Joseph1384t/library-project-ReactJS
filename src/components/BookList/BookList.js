import Book from "../Book/Book";
// import { useContext } from "react";
// import { AuthContext } from "../../services/AuthContext";

import "./BookList.css";

const BookList = ({ Books, onDelete, accessToken }) => {
  console.log("BookList : " + JSON.stringify({ ...Books }));
  // const { accessToken } = useContext(AuthContext);
  // حالا به accessToken دسترسی دارید
  console.log("Access Token in BookList:", accessToken);
  if (!Books || Books.length === 0) {
    return <p>No books available.</p>;
  }

  return (
    <ul className="Book-list">
    {Books.map((book) => (
      <li key={book._id}>
        {book.title} - {book.description}
      </li>
    ))}
  </ul>
    // <div className="Book-list">
    //   {Books.map((item) => {
    //     return (
    //       <Book
    //         key={item._id}
    //         Book={item}
    //         //  onDelete={onDelete}
    //         onDelete={(id) => onDelete(id)}
    //       />
    //     );
    //   })}
    // </div>
  );
};

export default BookList;
