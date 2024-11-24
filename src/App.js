//این فایل شامل کامپوننت اصلی React
import { useState, useEffect } from "react"; //وارد کردن هوک‌ها: از useState و useEffect برای مدیریت وضعیت و درخواست‌های API استفاده شده
import BookList from "./components/BookList/BookList"; // کامپوننت BookList برای نمایش لیست کتاب‌ها و حذف آن‌ها.//////Books: یک state برای ذخیره لیست کتاب‌ها.
import AddBook from "./components/AddBook/AddBook"; //deleteBook: ارسال درخواست DELETE برای حذف یک کتاب خاص.
import {
  fetchBooksFromServer,
  addBookToServer,
  deleteBookFromServer,
} from "./api"; // کامپوننت AddBook برای افزودن کتاب.
// import Login from "./components/Login/Login";

const App = () => {
  // State management for the list of books//+
  const [Books, setBooks] = useState([]);
  // const [token, setToken] = useState(null); // ذخیره توکن
  // Fetching data from the API when the component mounts//+
  // دریافت کتاب‌ها از سرور در هنگام بارگذاری کامپوننت
  useEffect(() => {
    if (!token) return; // اگر لاگین نشده، کتاب‌ها را دریافت نکن
    const fetchBooks = async () => {
      try {
        const books = await fetchBooksFromServer();
        setBooks(books); // به‌روزرسانی state با داده‌های دریافت‌شده
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    };

    fetchBooks();
  }, []);

  const handleLogin = async (username, password) => {
    try {
      const token = await loginToServer(username, password);
      setToken(token); // ذخیره توکن پس از لاگین موفق
    } catch (error) {
      throw error;
    }
  };

  // تابع برای افزودن کتاب
  const addBook = async (title, desc) => {
    try {
      const newBook = await addBookToServer(title, desc);
      setBooks([...Books, newBook]); // افزودن کتاب جدید به state
    } catch (error) {
      console.error("Error adding book:", error);
    }
  };

  // تابع برای حذف کتاب
  const deleteBook = async (id) => {
    try {
      await deleteBookFromServer(id);
      setBooks(Books.filter((book) => book.id !== id)); // حذف کتاب از state
    } catch (error) {
      console.error("Error deleting book:", error);
    }
  };

  return (
    <div className="container">
      <AddBook onAdd={addBook} />
      <BookList Books={Books} onDelete={deleteBook} />
    </div>
  );
};

export default App; // [] باعث می‌شود که فقط یک‌بار در زمان بارگذاری کامپوننت اجرا شود

// Rendering the components//+
