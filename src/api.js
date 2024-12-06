const API_URL = "http://localhost:8000/Library";
const AUTH_URL = "http://localhost:8000/auth/login";

export const loginToServer = async (username, password) => {
  const response = await fetch(AUTH_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  });

  if (!response.ok) {
    throw new Error("Login failed");
  }
  const data = await response.json();
  return data.token; // فرض می‌کنیم سرور یک توکن JWT بازمی‌گرداند
};

export const fetchBooksFromServer = async () => {
  const response = await fetch(API_URL);
  if (!response.ok) throw new Error("Failed to fetch books");
  return response.json();
};

export const addBookToServer = async (title, desc) => {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title, desc }),
  });

  if (!response.ok) {
    throw new Error("Failed to add book");
  }
  return await response.json();
};
// addBook: ارسال درخواست POST برای افزودن کتاب جدید.//-
// Function to add a new book//+

export const deleteBookFromServer = async (id) => {
  const response = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
  if (!response.ok) throw new Error("Failed to delete book");
};
// deleteBook: ارسال درخواست DELETE برای حذف یک کتاب خاص.//-
// Function to delete a book//+
