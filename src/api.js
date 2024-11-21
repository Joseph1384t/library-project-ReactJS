const API_URL = "https://127.0.0.1:8585/v4/save";
const AUTH_URL = "https://127.0.0.1:8585/v4/login";
const API_URL_DRP = "https://127.0.0.1:8585/v4/drop";

export const loginToServer = async (username, password) => {
  console.log("Logging in...");
  try {
    const response = await fetch(AUTH_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    if (!response.ok) {
      console.error("Login failed:", response.statusText);
      // throw new Error("Login failed");
    }

    const data = await response.json();
    // console.log("data :  " + data.username);
    return data.token; // فرض می‌کنیم سرور یک توکن JWT بازمی‌گرداند
  } catch (err) {
    console.error("Error logging in:", err);
    throw err;
  }
};

// export const fetchBooksFromServer = async (title, description, token) => {
//   const response = await fetch(API_URL, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: `Bearer ${token}`, // ارسال توکن
//     },
//     body: JSON.stringify({ title, description })
//   });
//   if (!response.ok) throw new Error("Failed to fetch books");
//   return response.json();
// };

export const addBookToServer = async (title, description, token) => {
  console.log("Adding to...");
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`, // ارسال توکن
    },
    body: JSON.stringify({ title, description }),
  });
  console.log("Login to lib:   ", response.statusText);
  const data = await response.json();
  if (!response.ok) throw new Error("Failed to add book");
  return data;
};
// addBook: ارسال درخواست POST برای افزودن کتاب جدید.//-
// Function to add a new book//+

export const deleteBookFromServer = async (id, token) => {
  const response = await fetch(`${API_URL_DRP}/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`, // ارسال توکن
    },
  });
  if (!response.ok) throw new Error("Failed to delete book");
};
// deleteBook: ارسال درخواست DELETE برای حذف یک کتاب خاص.//-
// Function to delete a book//+
