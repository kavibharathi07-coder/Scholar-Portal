// src/services/authService.js

export const API_BASE_URL =
  (import.meta.env.VITE_API_BASE_URL || "http://localhost:8000/api/v1").replace(/\/$/, "");

async function apiRequest(path, options = {}) {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
  });

  let data = null;
  try {
    data = await response.json();
  } catch {
    data = null;
  }

  if (!response.ok) {
    const message =
      data?.error ||
      data?.detail ||
      (Array.isArray(data?.detail) ? data.detail[0]?.msg : null) ||
      `Request failed (${response.status}).`;

    throw new Error(message);
  }

  return data;
}

export const loginUser = async ({ email, password, role }) => {
  const normalizedEmail = email?.trim().toLowerCase();

  if (!normalizedEmail) throw new Error("Email is required.");
  if (!password) throw new Error("Password is required.");
  if (!normalizedEmail.endsWith("@rajalakshmi.edu.in")) {
    throw new Error("Please use your official @rajalakshmi.edu.in email.");
  }
  if (!["student", "mentor"].includes(role)) {
    throw new Error("Please select Student or Mentor.");
  }

  return apiRequest("/auth/login", {
    method: "POST",
    body: JSON.stringify({
      email: normalizedEmail,
      password,
      role,
    }),
  });
};

export const getCurrentUser = () => apiRequest("/auth/me");

export const logoutUser = () =>
  apiRequest("/auth/logout", { method: "POST" });

export const requestPasswordOtp = (email) =>
  apiRequest("/auth/forgot-password/request-otp", {
    method: "POST",
    body: JSON.stringify({ email: email.trim().toLowerCase() }),
  });

export const verifyPasswordOtp = (email, otp) =>
  apiRequest("/auth/forgot-password/verify-otp", {
    method: "POST",
    body: JSON.stringify({
      email: email.trim().toLowerCase(),
      otp: String(otp).trim(),
    }),
  });

export const resetPassword = (newPassword, confirmPassword) =>
  apiRequest("/auth/forgot-password/reset-password", {
    method: "POST",
    body: JSON.stringify({
      new_password: newPassword,
      confirm_password: confirmPassword,
    }),
  });
