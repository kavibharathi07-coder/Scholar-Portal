export const loginUser = async (userType, username, password) => {
  if (!username.trim()) throw new Error("Username cannot be empty.");
  if (!password) throw new Error("Password is required.");

  const response = await fetch("https://your-api-endpoint.com/api/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      user_type: userType,
      username: username.trim(),
      password: password,
    }),
  });

  const data = await response.json();

  if (response.ok && data.success) {
    if (data.token) localStorage.setItem("authToken", data.token);
    if (data.user) localStorage.setItem("userData", JSON.stringify(data.user));
    return data;
  } else {
    throw new Error(data.message || "Invalid username or password");
  }
};