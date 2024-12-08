import { useEffect, useState, useCallback } from "react"; //وارد کردن هوک‌ها: از useState و useEffect برای مدیریت وضعیت و درخواست‌های API استفاده شده
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
  const [currentPage, setCurrentPage] = useState(
    localStorage.getItem("currentPage")
      ? parseInt(localStorage.getItem("currentPage"))
      : 1
  );
  const [totalPages, setTotalPages] = useState(0); // برای ذخیره تعداد صفحات کل
  const [loading, setLoading] = useState(false); // وضعیت بارگذاری
  const limit = 12;

  useEffect(() => {
    localStorage.setItem("currentPage", currentPage);
  }, [currentPage]);

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
    localStorage.removeItem("currentPage");
    // localStorage.removeItem("refreshToken");
    // setRefreshToken(null);
  };

  const handlePageChange = (newPage) => {
    if (0 < newPage && newPage <= totalPages) {
      console.log("»LALL totalPages", currentPage);
      setCurrentPage(newPage); // تغییر صفحه
      console.log("»LALL totalPages", currentPage);
      fetchBooks(newPage); // بارگذاری داده‌های صفحه جدید
    }
  };

  const fetchBooks = useCallback(
    async (page) => {
      console.log(
        "const fetchBooks = async (page) => {const fetchBooks = async (page) => {const fetchBooks = async (page) => {",
        currentPage
      );
      try {
        setLoading(true);
        const response = await api.fetchBooksFromServer(page, limit);
        if (response && response.Book_Array) {
          setBooks(response.Book_Array);
        }
        // console.log("FET CHANGE page", page);
        setLoading(false);
        if (response.Book_Array.length < limit) {
          console.error("Reached the end of books!");
        }
      } catch (error) {
        console.log("Error fetching books:", error);
        setLoading(false);
        alert(
          "Failed to fetch books. Please check your connection or credentials."
        );
      }
    },
    [limit, currentPage]
  );

  const fetchTotalBooks = useCallback(async () => {
    console.log(
      "fetchTotalBooksfetchTotalBooksfetchTotalBooksfetchTotalBooksfetchTotalBooksfetchTotalBooks : ",
      currentPage
    );
    try {
      const response = await api.fetchBooksFromServer(0, 0); // صفحه 0 برای دریافت تمام کتاب‌ها
      const totalBooks = response.totalBooks || 0; // تعداد کل کتاب‌ها
      setTotalPages(Math.ceil(totalBooks / limit)); // محاسبه تعداد صفحات
      // console.log("»LALL totalPages", totalPages);
    } catch (error) {
      console.error("Error fetching total books:", error);
    }
  }, [limit, currentPage]);

  useEffect(() => {
    if (accessToken) {
      fetchTotalBooks().then(() => {
        fetchBooks(currentPage); // پس از دریافت تعداد صفحات، کتاب‌ها را برای صفحه فعلی بارگذاری می‌کنیم
      });
      console.log("BBBBB totalPages", currentPage);
      setCurrentPage(currentPage);
      console.log("BBB totalPages", currentPage);
    }
  }, [accessToken, currentPage, fetchBooks, fetchTotalBooks]);

  const addBook = async (title, description) => {
    try {
      let token = accessToken;
      // if (!accessToken) {
      //   token = await refreshAccessToken(); // دریافت توکن جدید
      // }
      // const { newBook } = await api.addBookToServer(title, description, token);
      await api.addBookToServer(title, description, token);
      await fetchBooks(currentPage);
      fetchTotalBooks();
    } catch (error) {
      console.log("Failed to add book:", error.message);
      alert("Error adding book. Please try again.");
    }
  };

  const deleteBook = async (id) => {
    try {
      await api.deleteBookFromServer(id);
      setBooks(Books.filter((book) => book.id !== id));
      await fetchBooks(currentPage);
      fetchTotalBooks();
    } catch (error) {
      console.log("Failed to deleteBookAAAA : ", error.message);
      alert("Error dddddeleting book. Please try again.");
    }
  };

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
