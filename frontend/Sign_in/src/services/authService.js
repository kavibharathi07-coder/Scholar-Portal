// src/services/authService.js

const API_BASE_URL = "http://localhost:5000";

/**
 * Logs a student or mentor in.
 * @param {{ email: string, password: string, role: "student" | "mentor" }} credentials
 * @returns {Promise<{ message: string, user: { id, name, email, role } }>}
 */
export const loginUser = async ({ email, password, role }) => {

  // -----------------------------------------
  // Validate email
  // -----------------------------------------

  if (!email || !email.trim()) {
    throw new Error("Email cannot be empty.");
  }

  // -----------------------------------------
  // Validate password
  // -----------------------------------------

  if (!password) {
    throw new Error("Password is required.");
  }

  // -----------------------------------------
  // Validate college email
  // -----------------------------------------

  if (!email.toLowerCase().endsWith("@rajalakshmi.edu.in")) {
    throw new Error(
      "Please use your official @rajalakshmi.edu.in email."
    );
  }

  // -----------------------------------------
  // Validate role
  // -----------------------------------------

  if (!role) {
    throw new Error("Please select Student or Mentor.");
  }

  // -----------------------------------------
  // Send login request to Flask
  // -----------------------------------------

  const response = await fetch(
    `${API_BASE_URL}/api/auth/login`,
    {
      method: "POST",

      headers: {
        "Content-Type": "application/json"
      },

      body: JSON.stringify({
        email: email.trim().toLowerCase(),
        password: password,
        role: role
      })
    }
  );

  // -----------------------------------------
  // Read server response
  // -----------------------------------------

  let data;

  try {
    data = await response.json();
  } catch {
    throw new Error(
      "Server returned an unexpected response."
    );
  }

  // -----------------------------------------
  // Login failed
  // -----------------------------------------

  if (!response.ok) {
    throw new Error(
      data.error || "Invalid email or password."
    );
  }

  // -----------------------------------------
  // Verify selected role
  // -----------------------------------------

  if (
    role &&
    data.user?.role &&
    data.user.role.toLowerCase() !== role.toLowerCase()
  ) {
    throw new Error(
      `This account is registered as a ${data.user.role}. Please switch tabs.`
    );
  }

  // -----------------------------------------
  // Save logged-in user
  // -----------------------------------------

  if (data.user) {
    localStorage.setItem(
      "userData",
      JSON.stringify(data.user)
    );
  }

  // Return successful login response
  return data;
};


/**
 * Registration is not currently used in Scholar Portal.
 *
 * There is no public registration page because
 * students and mentors are provided by the college.
 *
 * This function can be removed later if registration
 * is permanently not required.
 */
