//این فایل شامل کامپوننت اصلی React
import { useState } from "react"; //وارد کردن هوک‌ها: از useState و useEffect برای مدیریت وضعیت و درخواست‌های API استفاده شده

import * as api from "./api";
import BookList from "./components/BookList/BookList"; // کامپوننت BookList برای نمایش لیست کتاب‌ها و حذف آن‌ها.//////Books: یک state برای ذخیره لیست کتاب‌ها.
import AddBook from "./components/AddBook/AddBook"; //deleteBook: ارسال درخواست DELETE برای حذف یک کتاب خاص.
import Login from "./components/Login/Login"; // کامپوننت AddBook برای افزودن کتاب.

const App = () => {
  const [Books, setBooks] = useState([]); // State management for the list of books//+
  const [accessToken, setAccessToken] = useState(localStorage.getItem("accessToken")); // ذخیره توکن     // Fetching data from the API when the component mounts//+        // دریافت کتاب‌ها از سرور در هنگام بارگذاری کامپوننت
  // const [refreshToken, setRefreshToken] = useState(null);
  // if (!accessToken) return;
  const handleLogin = async (username, password) => {
    try {
      const response = await api.loginToServer(username, password);
      setAccessToken(response.accessToken); // ذخیره توکن پس از لاگین موفق
      // setRefreshToken(response.refreshToken);
      localStorage.setItem("accessToken", response.accessToken);
      // localStorage.setItem("refreshToken", response.refreshToken);
    } catch (error) {
      throw error;
    }
  };

  // تابع برای افزودن کتاب
  const addBook = async (title, description, accessToken) => {
    try {
      const newBook = await api.addBookToServer(
        title,
        description,
        accessToken
      ); // ارسال توکن
      setBooks([...Books, newBook]);
      // console.log("ac " + accessToken);
    } catch (error) {
      console.error("Error adding book:", error);
    }
  };

  // تابع برای حذف کتاب
  const deleteBook = async (id, accessToken) => {
    try {
      await api.deleteBookFromServer(id, accessToken); // ارسال توکن
      setBooks(Books.filter((book) => book.id !== id));
    } catch (error) {
      console.error("Error deleting book:", error);
    }
  };

  return (
    <div className="container">
      {!accessToken ? ( // اگر لاگین نشده، فرم لاگین را نشان بده
        <Login onLogin={handleLogin} value="{accessToken" />
      ) : (
        <>
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
