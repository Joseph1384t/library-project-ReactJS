//این فایل شامل کامپوننت اصلی React
import { useState/*, useEffect */} from "react"; //وارد کردن هوک‌ها: از useState و useEffect برای مدیریت وضعیت و درخواست‌های API استفاده شده
import BookList from "./components/BookList/BookList"; // کامپوننت BookList برای نمایش لیست کتاب‌ها و حذف آن‌ها.//////Books: یک state برای ذخیره لیست کتاب‌ها.
import AddBook from "./components/AddBook/AddBook"; //deleteBook: ارسال درخواست DELETE برای حذف یک کتاب خاص.
import * as api from "./api";
// کامپوننت AddBook برای افزودن کتاب.
import Login from "./components/Login/Login";

const App = () => {
  const [Books, setBooks] = useState([]); // State management for the list of books//+
  const [token, setToken] = useState(null); // ذخیره توکن     // Fetching data from the API when the component mounts//+        // دریافت کتاب‌ها از سرور در هنگام بارگذاری کامپوننت

  const handleLogin = async (username, password) => {
    try {
      const token = await api.loginToServer(username, password);
      setToken(token); // ذخیره توکن پس از لاگین موفق
    } catch (error) {
      throw error;
    }
  };
  
  // تابع برای افزودن کتاب
  const addBook = async (title, description) => {
    try {
      const newBook = await api.addBookToServer(title, description, token); // ارسال توکن
      setBooks([...Books, newBook]);
    } catch (error) {
      console.error("Error adding book:", error);
    }
  };

  // تابع برای حذف کتاب
  const deleteBook = async (id) => {
    try {
      await api.deleteBookFromServer(id, token); // ارسال توکن
      setBooks(Books.filter((book) => book.id !== id));
    } catch (error) {
      console.error("Error deleting book:", error);
    }
  };


  return (
    <div className="container">
      {!token ? ( // اگر لاگین نشده، فرم لاگین را نشان بده
        <Login onLogin={handleLogin} />
      ) : (
        <>
          <AddBook onAdd={addBook} />
          <BookList Books={Books} onDelete={deleteBook} token={token} />
        </>
      )}
    </div>
  );
};

export default App; // [] باعث می‌شود که فقط یک‌بار در زمان بارگذاری کامپوننت اجرا شود

// Rendering the components//+
