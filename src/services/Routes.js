import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import Login from "../components/Login/Login";
import AddBook from "../components/AddBook/AddBook";
import BookList from "../components/BookList/BookList";

const AppRoutes = ({
  accessToken,
  handleLogin,
  handleLogout,
  addBook,
  deleteBook,
  Books,
}) => {
  const navigate = useNavigate();
  return (
    <Routes>
      <Route
        path="/login"
        element={
          !accessToken ? (
            <Login onLogin={handleLogin} />
          ) : (
            <Navigate to="/book-list" />
          )
        }
      />
      <Route
        path="/add-book"
        element={
          accessToken ? (
            <>
              <div className="btns">
                <button className="btn-Logout" onClick={handleLogout}>
                  Logout
                </button>
                <button
                  className="btn-Booklist"
                  onClick={() => navigate("/book-list")}
                >
                  Book list
                </button>
              </div>
              <AddBook onAdd={addBook} />
            </>
          ) : (
            <Navigate to="/login" />
          )
        }
      />
      <Route
        path="/book-list"
        element={
          accessToken ? (
            <>
              <div className="btns">
                <button className="btn-Logout" onClick={handleLogout}>
                  Logout
                </button>
                <button
                  className="btn-AddBook"
                  onClick={() => navigate("/add-book")}
                >
                  Add Book
                </button>
              </div>
              <BookList
                Books={Books}
                onDelete={(id) => deleteBook(id, accessToken)}
                accessToken={accessToken}
              />
            </>
          ) : (
            <Navigate to="/login" />
          )
        }
      />
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
};

export default AppRoutes;
