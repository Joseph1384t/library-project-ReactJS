import Book from "../Book/Book";
import "./BookList.css";

const BookList = ({ Books, onDelete, accessToken }) => {
  console.log("Books : " + JSON.stringify({ Books }));
  console.log("onDelete : " + onDelete);
  // onDelete
  return (
    <div className="Book-list">
      {Books.map((item) => {
        return (
          <Book
            key={item.id}
            Book={item}
            //  onDelete={onDelete}
            onDelete={(id) => onDelete(id, accessToken)}
          />
        );
      })}
    </div>
  );
};

export default BookList;
