//این فایل شامل کامپوننت اصلی React
import { useState } from "react"; //وارد کردن هوک‌ها: از useState و useEffect برای مدیریت وضعیت و درخواست‌های API استفاده شده

import * as api from "./api";
import BookList from "./components/BookList/BookList"; // کامپوننت BookList برای نمایش لیست کتاب‌ها و حذف آن‌ها.//////Books: یک state برای ذخیره لیست کتاب‌ها.
import AddBook from "./components/AddBook/AddBook"; // کامپوننت AddBook برای افزودن کتاب      //deleteBook: ارسال درخواست DELETE برای حذف یک کتاب خاص.
import Login from "./components/Login/Login";

const App = () => {
  const [Books, setBooks] = useState([]); // State management for the list of books//+
  const [accessToken, setAccessToken] = useState(
    localStorage.getItem("accessToken")
  ); // ذخیره توکن     // Fetching data from the API when the component mounts//+        // دریافت کتاب‌ها از سرور در هنگام بارگذاری کامپوننت
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
      // setRefreshToken(response.refreshToken);
      localStorage.setItem("accessToken", response.accessToken);
      // localStorage.setItem("refreshToken", response.refreshToken);
      setAccessToken(response.accessToken);
    } catch (error) {
      throw error;
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    // localStorage.removeItem("refreshToken");
    setAccessToken(null);
    // setRefreshToken(null);
  };

  // تابع برای افزودن کتاب
  const addBook = async (title, description) => {
    try {
      let token = accessToken;
      // if (!accessToken) {
      //   token = await refreshAccessToken(); // دریافت توکن جدید
      // }
      const newBook = await api.addBookToServer(title, description, token);
      setBooks([...Books, newBook]);
    } catch (error) {
      console.error("Error adding book:", error);
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
      console.error("Error deleting book:", error);
    }
  };

  return (
    <div className="container">
      {!accessToken ? ( // اگر لاگین نشده، فرم لاگین را نشان بده
        <Login onLogin={handleLogin} />
      ) : (
        <>
          <button className="btn-Logout" onClick={handleLogout}>Logout</button>
          <AddBook onAdd={addBook} />
          <BookList
            Books={Books}
            onDelete={deleteBook}
            accessToken={accessToken}
          />
        </>
      )}
    </div>
  );
};

export default App; // [] باعث می‌شود که فقط یک‌بار در زمان بارگذاری کامپوننت اجرا شود

// Rendering the components//+
