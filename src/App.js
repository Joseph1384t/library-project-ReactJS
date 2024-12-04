import { useEffect, useState } from "react"; //وارد کردن هوک‌ها: از useState و useEffect برای مدیریت وضعیت و درخواست‌های API استفاده شده
import { BrowserRouter as Router } from "react-router-dom";

import * as api from "./api";
// import { useContext } from "react";
// import { AuthProvider } from "./services/AuthContext"; // ایمپورت AuthProvider
import AppRoutes from "./services/Routes";

const App = () => {
  const [accessToken, setAccessToken] = useState(
    localStorage.getItem("accessToken") || ""
  );
  const [loading, setLoading] = useState(false); // وضعیت بارگذاری
  const [Books, setBooks] = useState([]); // State management for the list of books//+
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    if (accessToken) {
      fetchBooks(currentPage);
    }
  }, [accessToken, currentPage]);

  // const { accessToken } = useContext(AuthContext);
  // ذخیره توکن     // Fetching data from the API when the component mounts//+        // دریافت کتاب‌ها از سرور در هنگام بارگذاری کامپوننت
  // localStorage.setItem("accessToken")
  // const [refreshToken, setRefreshToken] = useState(
  //   localStorage.getItem("refreshToken")
  // );

  // const refreshAccessToken = async () => {
  //   try {
  //     const response = await api.refreshToken(refreshToken); // فراخوانی API
  //     localStorage.setItem("accessToken", response.accessToken); // به‌روزرسانی LocalStorage
  //     setAccessToken(response.accessToken); // به‌روزرسانی State
  //     return response.accessToken; // بازگرداندن Access Token جدید
  //   } catch (error) {
  //     console.error("Error refreshing token:", error);
  //     handleLogout(); // خروج کاربر در صورت خطا
  //   }
  // };

  const handleLogin = async (username, password) => {
    try {
      const response = await api.loginToServer(username, password);
      localStorage.setItem("accessToken", response.accessToken);
      // setRefreshToken(response.refreshToken);
      // localStorage.setItem("refreshToken", response.refreshToken);
      setAccessToken(response.accessToken);
    } catch (error) {
      console.log("Login error:", error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    setAccessToken(null);
    // localStorage.removeItem("refreshToken");
    // setRefreshToken(null);
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 0 && newPage < totalPages) {
      setCurrentPage(newPage); // تغییر صفحه
    }
  };

  const fetchBooks = async (pageNumber) => {
    try {
      setLoading(true);
      const response = await api.fetchBooksFromServer(pageNumber);
      setBooks(response.Book_Array);
      setTotalPages(response.totalPages);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching books:", error);
      setLoading(false);
      // alert(
      //   "Failed to fetch books. Please check your connection or credentials."
      // );
    }
  };

  const addBook = async (title, description, pageNumber) => {
    try {
      let token = accessToken;
      // if (!accessToken) {
      //   token = await refreshAccessToken(); // دریافت توکن جدید
      // }
      // const { newBook } = await api.addBookToServer(title, description, token);
      await api.addBookToServer(title, description, token);
      await fetchBooks(pageNumber);
    } catch (error) {
      console.log("Failed to add book:", error.message);
      alert("Error adding book. Please try again.");
    }
  };

  const deleteBook = async (id) => {
    try {
      await api.deleteBookFromServer(id);
      setBooks(Books.filter((book) => book.id !== id));
    } catch (error) {
      console.log("Failed to deleteBookAAAA : ", error.message);
      alert("Error dddddeleting book. Please try again.");
    }
  };

  //   // <AuthProvider>
  //   <div className="container">
  //     {!accessToken ? ( // اگر لاگین نشده، فرم لاگین را نشان بده
  //       <Login onLogin={handleLogin} />
  //     ) : (
  //       <>
  //         {/* <p>Current Token: {accessToken}</p> */}
  // <div className="btns">
  //   <button className="btn-Logout" onClick={handleLogout}>
  //     Logout
  //   </button>
  // </div>
  //         <AddBook onAdd={addBook} />
  //         <BookList
  //           Books={Books}
  //           onDelete={deleteBook}
  //           accessToken={accessToken}
  //         />
  //       </>
  //     )}
  //   </div>
  //   // </AuthProvider>
  // );
  return (
    <Router>
      <AppRoutes
        addBook={addBook}
        deleteBook={deleteBook}
        handleLogin={handleLogin}
        handleLogout={handleLogout}
        accessToken={accessToken}
        Books={Books}
        loading={loading}
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </Router>
  );
};

export default App;
