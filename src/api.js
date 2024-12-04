const API_URL = "https://127.0.0.1:8585";

// const refreshAccessToken = async () => {
//   try {
//     const storedRefreshToken = localStorage.getItem("refreshToken");
//     const response = await fetch(`${API_URL}/refresh`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ refreshToken: storedRefreshToken }),
//     });

//     if (!response.ok) throw new Error("Failed to refresh token");
//     const data = await response.json();
//     setAccessToken(data.accessToken);
//   } catch (error) {
//     console.error("Token refresh failed:", error);
//     handleLogout(); // در صورت شکست در Refresh، کاربر را لاگ‌اوت کنید
//   }
// };

export const loginToServer = async (username, password) => {
  try {
    const response = await fetch(`${API_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    if (!response.ok) {
      console.error("Login failed:", response.statusText);
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    // console.log("Login successful, received token:", data);
    return data; // فرض می‌کنیم سرور یک توکن JWT بازمی‌گرداند
  } catch (err) {
    console.error("Error logging in:", err);
    throw err;
  }
};

export const fetchBooksFromServer = async (token) => {
  try {
    const response = await fetch(`${API_URL}/getall`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // ارسال توکن
      },
    });
    console.log("Books fetched infetchBooksFromServer>>>>> :", response);
    const data = await response.json();
    // return data.success?.[0]; // فرض بر این است که لیست کتاب‌ها در `success` بازگردانده می‌شود
    return {
      responseStatus: data.success,
      Book_Array: data.output?.[0],
    };
  } catch (error) {
    console.log("Error in fetchBooksFrom   Server:", error);
    throw error;
  }
};

export const addBookToServer = async (title, description, token) => {
  try {
    const response = await fetch(`${API_URL}/save`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // ارسال توکن
      },
      body: JSON.stringify({ title, description }),
    });

    if (!response.ok) {
      console.error("Failed to add book:", response.statusText);
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    console.log(
      "Book added successfully:",
      data,
      "\n",
      response.ok,
      "\n",
      response.status
    );

    return {
      responseStatus: data.success,
    }; // فقط شیء کتاب برگردانده شود  } catch (error) {
  } catch (error) {
    console.log("Error in addBookToServer:", error);
    throw error;
  }
};

export const deleteBookFromServer = async (id, token) => {
  try {
    const response = await fetch(`${API_URL}/delete`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // ارسال توکن
      },
      body: JSON.stringify({ id }),
    });
    if (!response.ok) {
      console.log("Failed to deleteBookFromServer:", response.statusText);
      throw new Error(`HTTTTP error! status: ${response.status}`);
    }
    console.log("Book deleted successfully");
  } catch (error) {
    console.log("Error in deleteBookFromServer:", error);
    throw error;
  }
};