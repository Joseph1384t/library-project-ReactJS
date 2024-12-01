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
  const [Books, setBooks] = useState([]); // State management for the list of books//+
  // const { accessToken } = useContext(AuthContext);
  // ذخیره توکن     // Fetching data from the API when the component mounts//+        // دریافت کتاب‌ها از سرور در هنگام بارگذاری کامپوننت
  // localStorage.setItem("accessToken")

  useEffect(() => {
    if (accessToken) {
      fetchBooks(accessToken);
    }
  }, [accessToken]); // فقط یک بار و زمانی که accessToken تغییر کند

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
  
  const fetchBooks = async (accessToken) => {
    try {
      // const response = await api.fetchBooksFromServer(localStorage.getItem("accessToken", accessToken));
      const response = await api.fetchBooksFromServer(accessToken);
      setBooks(response);
      console.log("Fetched Books Data issssss: ", response); // نمایش مستقیم در کنسول
    } catch (error) {
      console.log("Error fetchbooks ic:", error.message);
      // alert(
      //   "Failed to fetch books. Please check your connection or credentials."
      // );
    }
  };

  const addBook = async (title, description) => {
    try {
      let token = accessToken;
      // if (!accessToken) {
      //   token = await refreshAccessToken(); // دریافت توکن جدید
      // }
      // const { newBook } = await api.addBookToServer(title, description, token);
      await api.addBookToServer(title, description, token);
      // setBooks([...Books, newBook]);
      const response = await api.fetchBooksFromServer(accessToken);
      setBooks(response);
    } catch (error) {
      console.log("Failed to add book:", error.message);
      alert("Error adding book. Please try again.");
    }
  };

  const deleteBook = async (id, accessToken) => {
    try {
      // if (!accessToken) {
      //   token = await refreshAccessToken(); // دریافت توکن جدید
      // }
      console.log(
        "DDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDD>>>>>>>",
        accessToken
      );
      const title = `${id}`;
      console.log(
        "DDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDTITITTITLTe  >>>>>>>",
        title
      );
      await api.deleteBookFromServer(title, accessToken);
      // console.log("Book DDDDDDDD>>>>>>>", response);
      setBooks(Books.filter((book) => book.id !== id));
      console.log("Book delete<<<<<<<<< ", Books);
    } catch (error) {
      console.log("Failed to deleteBookAAAA : ", error.message);
      // alert("Error dddddeleting book. Please try again.");
    }
  };

  // return (
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
      />
    </Router>
  );
};

export default App;
