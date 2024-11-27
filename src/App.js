import { useState } from "react"; //وارد کردن هوک‌ها: از useState و useEffect برای مدیریت وضعیت و درخواست‌های API استفاده شده

import * as api from "./api";
// import { useContext } from "react";
// import { AuthProvider } from "./services/AuthContext"; // ایمپورت AuthProvider
import BookList from "./components/BookList/BookList"; // کامپوننت BookList برای نمایش لیست کتاب‌ها و حذف آن‌ها.//////Books: یک state برای ذخیره لیست کتاب‌ها.
import AddBook from "./components/AddBook/AddBook"; // کامپوننت AddBook برای افزودن کتاب      //deleteBook: ارسال درخواست DELETE برای حذف یک کتاب خاص.
import Login from "./components/Login/Login";

const App = () => {
  const [accessToken, setAccessToken] = useState(
    localStorage.getItem("accessToken")
  );
  const [Books, setBooks] = useState([]); // State management for the list of books//+
  // const { accessToken } = useContext(AuthContext);
  // ذخیره توکن     // Fetching data from the API when the component mounts//+        // دریافت کتاب‌ها از سرور در هنگام بارگذاری کامپوننت
  // localStorage.setItem("accessToken")

  const fetchBooks = async () => {
    try {
      const response = await api.fetchBooksFromServer(accessToken);
      const Fbooks = response; // دسترسی به لیست داخل آرایه
      console.log("Fetched Books: issssss", Fbooks);
      setBooks(Fbooks);
      console.log("Fetched Books Data issssss: ", Fbooks); // نمایش مستقیم در کنسول
    } catch (error) {
      console.error("Error fetchbooks ic:", error.message);
      // alert(
      //   "Failed to fetch books. Please check your connection or credentials."
      // );
    }
  };

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
      // await fetchBooks(); // بلافاصله بعد از لاگین
      // console.log("Books fetched Bfter llllllogin :  ", Books); // نمایش کتاب‌ها در کنسول
      // const booksData = await api.fetchBooksFromServer(response.accessToken); // دریافت لیست کتاب‌ها
      // const booksF = booksData.success; // دسترسی به لیست کتاب‌ها
      // setBooks(booksF); // ذخیره در State
      // console.log("Books fetched after llllllogin :  ", Books); // نمایش کتاب‌ها در کنسول
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    setAccessToken(null);
    // localStorage.removeItem("refreshToken");
    // setRefreshToken(null);
  };

  const addBook = async (title, description) => {
    try {
      let token = accessToken;
      // if (!accessToken) {
      //   token = await refreshAccessToken(); // دریافت توکن جدید
      // }
      const newBook = await api.addBookToServer(title, description, token);
      setBooks([...Books, newBook]);
    } catch (error) {
      console.error("Failed to add book:", error.message);
      alert("Error adding book. Please try again.");
    }
  };

  const deleteBook = async (id) => {
    try {
      let token = accessToken;
      // if (!accessToken) {
      //   token = await refreshAccessToken(); // دریافت توکن جدید
      // }
      await api.deleteBookFromServer(id, token);
      setBooks(Books.filter((book) => book.id !== id));
    } catch (error) {
      console.error("Failed to ddelete book:", error.message);
      alert("Error dddddeleting book. Please try again.");
    }
  };

  return (
    // <AuthProvider>
    <div className="container">
      {!accessToken ? ( // اگر لاگین نشده، فرم لاگین را نشان بده
        <Login onLogin={handleLogin} />
      ) : (
        <>
          {/* <p>Current Token: {accessToken}</p> */}
          <div className="btns">
            <button className="btn-Logout" onClick={handleLogout}>
               Logout
            </button>
            <button className="btn-FetchBooks" onClick={fetchBooks}>
              Fetch Books
            </button>
          </div>
          <AddBook onAdd={addBook} />
          <BookList
            Books={Books}
            onDelete={deleteBook}
            accessToken={accessToken}
          />
        </>
      )}
    </div>
    // </AuthProvider>
  );
};

export default App;
