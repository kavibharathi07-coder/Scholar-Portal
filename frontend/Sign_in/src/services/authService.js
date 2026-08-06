// src/services/authService.js

const API_BASE_URL = "http://localhost:5000";

/**
 * Logs a student or mentor in.
 * @param {{ email: string, password: string, role: "student" | "mentor" }} credentials
 * @returns {Promise<{ message: string, user: { id, name, email, role } }>}
 */
export const loginUser = async ({ email, password, role }) => {
  if (!email || !email.trim()) {
    throw new Error("Email cannot be empty.");
  }
  if (!password) {
    throw new Error("Password is required.");
  }
  if (!email.toLowerCase().endsWith("@rajalakshmi.edu.in")) {
    throw new Error("Please use your official");
  }

  const response = await fetch(`${API_BASE_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: email.trim(),
      password: password,
    }),
  });

  let data;
  try {
    data = await response.json();
  } catch {
    throw new Error("Server returned an unexpected response.");
  }

  // this backend signals failure via HTTP status + an "error" field,
  // NOT a "success" boolean
  if (!response.ok) {
    throw new Error(data.error || "Invalid email or password.");
  }

  // the backend doesn't check user_type server-side yet, so verify
  // the role the person picked in the UI actually matches their account
  if (role && data.user?.role && data.user.role !== role) {
    throw new Error(
      `This account is registered as a ${data.user.role}. Please switch tabs.`
    );
  }

  if (data.user) {
    localStorage.setItem("userData", JSON.stringify(data.user));
  }

  return data;
};

/**
 * Registers a new student or mentor. Matches POST /auth/register.
 * @param {{ name: string, email: string, password: string, role: "student" | "mentor" }} details
 */
export const registerUser = async ({ email, password, role }) => {
  const response = await fetch(`${API_BASE_URL}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password, role }),
  });

  let data;
  try {
    data = await response.json();
  } catch {
    throw new Error("Server returned an unexpected response.");
  }

  if (!response.ok) {
    throw new Error(data.error || "Registration failed.");
  }

  return data;
};