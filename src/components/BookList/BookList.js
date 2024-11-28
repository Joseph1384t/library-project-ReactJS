import Book from "../Book/Book";
// import { useContext } from "react";
// import { AuthContext } from "../../services/AuthContext";

import "./BookList.css";

const BookList = ({ Books, onDelete, accessToken }) => {
  console.log("bb", Books);
  // const { accessToken } = useContext(AuthContext);
  // حالا به accessToken دسترسی دارید
  // console.log("Access Token in BookList:", accessToken);
  if (!Books || Books.length === 0) {
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
              onDelete={(id) => onDelete(id, accessToken)}
            />
          );
        })}
    </div>
  );
};

export default BookList;
