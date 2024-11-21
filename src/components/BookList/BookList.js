import Book from "../Book/Book";
import "./BookList.css";

const BookList = ({ Books, onDelete, token }) => {
console.log("Books" +Books)  
  // onDelete
  return (
    <div className="Book-list">
      {Books.map((item) => {
        return (
          <Book
            key={item.id}
            Book={item}
            //  onDelete={onDelete}
            onDelete={(id) => onDelete(id, token)}
          />
        );
      })}
    </div>
  );
};

export default BookList;
