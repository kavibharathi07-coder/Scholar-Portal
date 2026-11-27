import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  loginUser,
  requestPasswordOtp,
  verifyPasswordOtp,
  resetPassword,
} from "../services/authService";

function FixedGraduationCap() {
  return (
    <svg
      width="40"
      height="40"
      viewBox="0 0 145 115"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M8 43L72 12L137 43L72 70L8 43Z"
        fill="#C5A880"
        stroke="#9A7B4F"
        strokeWidth="3.5"
        strokeLinejoin="round"
      />
      <path
        d="M38 57V91C57 103 88 103 107 91V57L72 72L38 57Z"
        fill="#9A7B4F"
        stroke="#735A36"
        strokeWidth="3.5"
      />
      <path
        d="M123 38V75"
        stroke="#E2C799"
        strokeWidth="3.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function StudentIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-4 w-4"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M3 9l9-5 9 5-9 5-9-5Z" />
      <path d="M7 11v5c3 2 7 2 10 0v-5" />
      <path d="M21 10v6" />
    </svg>
  );
}

function MentorIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-4 w-4"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M4 19a8 8 0 0 1 16 0" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}

function UserInputIcon() {
  return (
    <svg
      className="w-4 h-4 text-slate-400"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.8"
        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
      />
    </svg>
  );
}

function LockIcon() {
  return (
    <svg
      className="w-4 h-4 text-slate-400"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.8"
        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
      />
    </svg>
  );
}

function EyeIcon({ show }) {
  return show ? (
    <svg
      className="w-4 h-4 text-slate-400 hover:text-slate-600"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.8"
        d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858-5.908a9.04 9.04 0 012.122-.363c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21M3 3l18 18"
      />
    </svg>
  ) : (
    <svg
      className="w-4 h-4 text-slate-400 hover:text-slate-600"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.8"
        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.8"
        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
      />
    </svg>
  );
}

export default function AuthPage() {
  const [role, setRole] = useState("student");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const [toast, setToast] = useState({
    show: false,
    type: "",
    message: "",
  });

  const [isForgotModalOpen, setIsForgotModalOpen] = useState(false);
  const [forgotStep, setForgotStep] = useState(1);

  const [resetEmail, setResetEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [modalStatus, setModalStatus] = useState({
    type: "",
    message: "",
  });

  const [isModalLoading, setIsModalLoading] = useState(false);

  const isMentor = role === "mentor";
  const navigate = useNavigate();

  const triggerToast = (type, message) => {
    setToast({ show: true, type, message });
    setTimeout(() => {
      setToast({ show: false, type: "", message: "" });
    }, 4000);
  };

  const handleRoleChange = (newRole) => {
    if (newRole === role) return;
    setRole(newRole);
    setEmail("");
    setPassword("");
    setToast({ show: false, type: "", message: "" });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setToast({ show: false, type: "", message: "" });

    if (!email.trim().toLowerCase().endsWith("@rajalakshmi.edu.in")) {
      triggerToast(
        "error",
        "Please enter a valid official email ending with @rajalakshmi.edu.in"
      );
      return;
    }

    if (!password) {
      triggerToast("error", "Password is required.");
      return;
    }

    setIsLoading(true);

    try {
      const data = await loginUser({
        email,
        password,
        role,
      });

      triggerToast("success", data.message || "Login successful! Redirecting...");
      navigate(data.user.role === "mentor" ? "/mentor-dashboard" : "/student-dashboard");
    } catch (error) {
      triggerToast("error", error.message || "Login failed.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendOtp = async (event) => {
    event.preventDefault();
    setModalStatus({ type: "", message: "" });

    const normalizedEmail = resetEmail.trim().toLowerCase();

    if (!normalizedEmail.endsWith("@rajalakshmi.edu.in")) {
      setModalStatus({
        type: "error",
        message: "Email must end with @rajalakshmi.edu.in",
      });
      return;
    }

    setIsModalLoading(true);

    try {
      const data = await requestPasswordOtp(normalizedEmail);
      setResetEmail(normalizedEmail);
      setForgotStep(2);
      setModalStatus({
        type: "success",
        message: data.message || `An OTP has been sent to ${normalizedEmail}`,
      });
    } catch (error) {
      setModalStatus({
        type: "error",
        message: error.message || "Unable to send OTP.",
      });
    } finally {
      setIsModalLoading(false);
    }
  };

  const handleResetPassword = async (event) => {
    event.preventDefault();
    setModalStatus({ type: "", message: "" });

    if (newPassword !== confirmPassword) {
      setModalStatus({ type: "error", message: "Passwords do not match." });
      return;
    }

    if (newPassword.length < 8 || newPassword.length > 128) {
      setModalStatus({
        type: "error",
        message: "Password must contain 8 to 128 characters.",
      });
      return;
    }

    setIsModalLoading(true);

    try {
      if (!/^\d{6}$/.test(otp)) {
        setModalStatus({
          type: "error",
          message: "Please enter the complete 6-digit OTP.",
        });
        return;
      }

      await verifyPasswordOtp(resetEmail, otp);

      const data = await resetPassword(newPassword, confirmPassword);
      setModalStatus({
        type: "success",
        message: data.message || "Password updated successfully!",
      });
      setTimeout(() => closeModal(), 1500);
    } catch (error) {
      setModalStatus({
        type: "error",
        message: error.message || "Unable to reset password.",
      });
    } finally {
      setIsModalLoading(false);
    }
  };

  const closeModal = () => {
    setIsForgotModalOpen(false);
    setForgotStep(1);
    setResetEmail("");
    setOtp("");
    setNewPassword("");
    setConfirmPassword("");
    setModalStatus({ type: "", message: "" });
  };

  return (
    <main className="relative flex min-h-screen w-full items-center justify-center bg-[#EBEEF2] p-4 md:p-8 lg:p-12 font-sans">
      {/* SLIDING TOP TOAST NOTIFICATION */}
      <div
        className={`fixed top-6 left-1/2 -translate-x-1/2 z-50 transition-all duration-500 ease-in-out transform ${
          toast.show
            ? "translate-y-0 opacity-100 scale-100"
            : "-translate-y-16 opacity-0 scale-95 pointer-events-none"
        }`}
      >
        <div
          className={`flex items-center space-x-3 px-6 py-3.5 rounded-xl shadow-2xl border text-sm font-semibold max-w-md ${
            toast.type === "success"
              ? "bg-emerald-700 text-white border-emerald-600"
              : "bg-red-700 text-white border-red-600"
          }`}
        >
          {toast.type === "error" ? (
            <svg
              className="w-5 h-5 flex-shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          ) : (
            <svg
              className="w-5 h-5 flex-shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 13l4 4L19 7"
              />
            </svg>
          )}
          <span>{toast.message}</span>
          <button
            onClick={() => setToast({ ...toast, show: false })}
            className="ml-auto text-white/80 hover:text-white"
          >
            &times;
          </button>
        </div>
      </div>

      {/* CENTERED CONTAINER WRAPPER */}
      <div className="w-full max-w-5xl mx-auto flex flex-col my-auto">
        {/* MAIN DUAL PANEL CONTAINER — BLACK SHADOW ADDED HERE */}
        <div className="w-full rounded-2xl bg-white shadow-[0_20px_60px_rgba(0,0,0,0.55),0_8px_20px_rgba(0,0,0,0.35)] flex flex-col md:flex-row overflow-hidden border border-slate-200/80">
          
          {/* LEFT PANEL */}
          <div className="relative w-full md:w-1/2 bg-[#0B1321] text-white flex flex-col justify-between px-8 md:px-12 lg:px-14 py-10 md:py-12 lg:py-14 min-h-[520px]">
            {/* Background library image with overlay */}
            <div
              className="absolute inset-0 bg-cover bg-center opacity-25 mix-blend-luminosity"
              style={{
                backgroundImage:
                  "url('https://images.unsplash.com/photo-1507842217343-583bb7270b66?q=80&w=1000&auto=format&fit=crop')",
              }}
            />
            <div
              className="absolute inset-0 opacity-20 pointer-events-none"
              style={{
                backgroundImage:
                  "linear-gradient(to right, #334155 1px, transparent 1px), linear-gradient(to bottom, #334155 1px, transparent 1px)",
                backgroundSize: "40px 40px",
              }}
            />

            {/* Top Brand Info */}
            <div className="relative z-10 flex items-center space-x-4">
              <div className="p-2.5 rounded-xl border border-amber-500/20 bg-amber-500/10 flex items-center justify-center">
                <FixedGraduationCap />
              </div>
              <div>
                <h1 className="text-xl font-serif font-semibold tracking-wide text-slate-100">
                  Scholar Portal
                </h1>
                <p className="text-[11px] tracking-widest text-slate-400 uppercase font-medium mt-0.5">
                  RAJALAKSHMI ENGINEERING COLLEGE
                </p>
              </div>
            </div>

            {/* Center Main Content with Extended Lines */}
            <div className="relative z-10 my-auto py-6">
              <div className="w-full h-[2px] bg-amber-600/80 mb-6" />

              <h2 className="text-3xl md:text-4xl font-serif font-normal text-slate-100 leading-tight">
                Dream believe achieve
              </h2>

              <p className="text-xs text-slate-400 mt-4 tracking-wider">
                Learn &rarr; Grow &rarr; Consistent &rarr; Success.
              </p>

              <div className="w-full h-[2px] bg-amber-600/80 mt-6" />
            </div>

            {/* Bottom Security Footer */}
            <div className="relative z-10 flex items-center space-x-2 text-[11px] tracking-widest text-slate-400 uppercase font-medium">
              <svg
                className="w-4 h-4 text-amber-600/90"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.025 12.025 0 002 12c0 1.104.896 2 2 2h1.618a11.955 11.955 0 018.618 3.04A11.955 11.955 0 0112 21.056a11.955 11.955 0 018.618-3.04A11.955 11.955 0 0122 12c0-1.104-.896-2-2-2h-1.618a11.955 11.955 0 01-8.618-3.04A11.955 11.955 0 0112 2.944z"
                />
              </svg>
              <span className="text-amber-600/90">
                Secure login with 256-bit encryption
              </span>
            </div>
          </div>

          {/* RIGHT PANEL - LOGIN FORM */}
          <div className="relative w-full md:w-1/2 bg-white flex flex-col justify-between px-8 md:px-12 lg:px-14 py-10 md:py-12 lg:py-14">
            {/* Top Switcher Tabs */}
            <div className="flex items-center justify-center space-x-2 mb-8">
              <button
                onClick={() => handleRoleChange("student")}
                className={`flex-1 px-4 py-2 rounded-lg font-semibold transition-all flex items-center justify-center space-x-2 ${
                  role === "student"
                    ? "bg-amber-500 text-white shadow-md"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                }`}
              >
                <StudentIcon />
                <span className="text-sm">Student</span>
              </button>
              <button
                onClick={() => handleRoleChange("mentor")}
                className={`flex-1 px-4 py-2 rounded-lg font-semibold transition-all flex items-center justify-center space-x-2 ${
                  role === "mentor"
                    ? "bg-amber-500 text-white shadow-md"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                }`}
              >
                <MentorIcon />
                <span className="text-sm">Mentor</span>
              </button>
            </div>

            {/* Auth Form - Email & Password Login */}
            <form
              onSubmit={handleSubmit}
              className="space-y-6"
              noValidate
            >
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-slate-700"
                >
                  Official Email
                </label>
                <div className="mt-1 relative">
                  <UserInputIcon />
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="block w-full pl-10 pr-4 py-2 text-sm rounded-lg border focus:ring-2 focus:ring-amber-500 focus:outline-none"
                    placeholder="you@rajalakshmi.edu.in"
                    autoComplete="email"
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-slate-700"
                  >
                    Password
                  </label>
                  <button
                    type="button"
                    onClick={() => setIsForgotModalOpen(true)}
                    className="text-sm font-medium text-amber-600 hover:underline"
                  >
                    Forgot password?
                  </button>
                </div>
                <div className="mt-1 relative">
                  <LockIcon />
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="block w-full pl-10 pr-4 py-2 text-sm rounded-lg border focus:ring-2 focus:ring-amber-500 focus:outline-none"
                    placeholder="Enter your password"
                    autoComplete="current-password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="absolute inset-y-0 right-0 flex items-center pr-3"
                  >
                    <EyeIcon show={showPassword} />
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <button
                  type="submit"
                  disabled={isLoading}
                  className={`w-full px-4 py-2 rounded-lg font-semibold transition-all flex items-center justify-center space-x-2 ${
                    isLoading
                      ? "bg-amber-600/70 text-white cursor-not-allowed"
                      : "bg-amber-600 text-white hover:bg-amber-700"
                  }`}
                >
                  {isLoading && (
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                      />
                    </svg>
                  )}
                  <span className="text-sm">Sign in</span>
                </button>
              </div>
            </form>

            {/* Footer Links - Privacy Policy & Terms of Service */}
            <div className="mt-8 text-center text-sm text-slate-500">
              <p>
                &copy; {new Date().getFullYear()} Rajalakshmi Engineering College. All rights reserved.
              </p>
              <p className="mt-2">
                <a
                  href="#"
                  className="text-amber-600 hover:underline"
                >
                  Privacy Policy
                </a>{" "}
                &bull;{" "}
                <a
                  href="#"
                  className="text-amber-600 hover:underline"
                >
                  Terms of Service
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FORGOT PASSWORD MODAL */}
      {isForgotModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-6">
            {/* Modal Header */}
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-slate-800">
                Reset Password
              </h3>
              <button
                onClick={closeModal}
                className="text-slate-400 hover:text-slate-600"
              >
                &times;
              </button>
            </div>

            {/* Modal Content */}
            {forgotStep === 1 && (
              <div>
                <p className="text-sm text-slate-500 mb-4">
                  Enter your official email to receive the password reset OTP.
                </p>
                <form
                  onSubmit={handleSendOtp}
                  className="space-y-4"
                  noValidate
                >
                  <div>
                    <label
                      htmlFor="reset-email"
                      className="block text-sm font-medium text-slate-700"
                    >
                      Official Email
                    </label>
                    <div className="mt-1 relative">
                      <UserInputIcon />
                      <input
                        type="email"
                        id="reset-email"
                        value={resetEmail}
                        onChange={(e) => setResetEmail(e.target.value)}
                        required
                        className="block w-full pl-10 pr-4 py-2 text-sm rounded-lg border focus:ring-2 focus:ring-amber-500 focus:outline-none"
                        placeholder="you@rajalakshmi.edu.in"
                        autoComplete="email"
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <button
                      type="submit"
                      disabled={isModalLoading}
                      className={`w-full px-4 py-2 rounded-lg font-semibold transition-all flex items-center justify-center space-x-2 ${
                        isModalLoading
                          ? "bg-amber-600/70 text-white cursor-not-allowed"
                          : "bg-amber-600 text-white hover:bg-amber-700"
                      }`}
                    >
                      {isModalLoading && (
                        <svg
                          className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          />
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                          />
                        </svg>
                      )}
                      <span className="text-sm">Send OTP</span>
                    </button>
                  </div>
                </form>
              </div>
            )}

            {forgotStep === 2 && (
              <div>
                <p className="text-sm text-slate-500 mb-4">
                  Enter the OTP sent to {resetEmail} to verify your email.
                </p>
                <form
                  onSubmit={handleResetPassword}
                  className="space-y-4"
                  noValidate
                >
                  <div>
                    <label
                      htmlFor="otp"
                      className="block text-sm font-medium text-slate-700"
                    >
                      OTP
                    </label>
                    <div className="mt-1 relative">
                      <input
                        type="text"
                        id="otp"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        required
                        className="block w-full pl-4 pr-4 py-2 text-sm rounded-lg border focus:ring-2 focus:ring-amber-500 focus:outline-none"
                        placeholder="Enter OTP"
                        autoComplete="one-time-code"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="new-password"
                      className="block text-sm font-medium text-slate-700"
                    >
                      New Password
                    </label>
                    <div className="mt-1 relative">
                      <LockIcon />
                      <input
                        type={showPassword ? "text" : "password"}
                        id="new-password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        required
                        className="block w-full pl-10 pr-4 py-2 text-sm rounded-lg border focus:ring-2 focus:ring-amber-500 focus:outline-none"
                        placeholder="Enter new password"
                        autoComplete="new-password"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword((prev) => !prev)}
                        className="absolute inset-y-0 right-0 flex items-center pr-3"
                      >
                        <EyeIcon show={showPassword} />
                      </button>
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="confirm-password"
                      className="block text-sm font-medium text-slate-700"
                    >
                      Confirm Password
                    </label>
                    <div className="mt-1 relative">
                      <LockIcon />
                      <input
                        type={showPassword ? "text" : "password"}
                        id="confirm-password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                        className="block w-full pl-10 pr-4 py-2 text-sm rounded-lg border focus:ring-2 focus:ring-amber-500 focus:outline-none"
                        placeholder="Confirm your password"
                        autoComplete="new-password"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword((prev) => !prev)}
                        className="absolute inset-y-0 right-0 flex items-center pr-3"
                      >
                        <EyeIcon show={showPassword} />
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <button
                      type="submit"
                      disabled={isModalLoading}
                      className={`w-full px-4 py-2 rounded-lg font-semibold transition-all flex items-center justify-center space-x-2 ${
                        isModalLoading
                          ? "bg-amber-600/70 text-white cursor-not-allowed"
                          : "bg-amber-600 text-white hover:bg-amber-700"
                      }`}
                    >
                      {isModalLoading && (
                        <svg
                          className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          />
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                          />
                        </svg>
                      )}
                      <span className="text-sm">Reset Password</span>
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* Modal Footer - Step Indicator */}
            <div className="mt-6">
              <div className="flex items-center justify-center space-x-2">
                <div
                  className={`w-full h-1 rounded-full transition-all duration-300 ${
                    forgotStep === 1
                      ? "bg-amber-600"
                      : "bg-slate-200"
                  }`}
                />
                <div
                  className={`w-full h-1 rounded-full transition-all duration-300 ${
                    forgotStep === 2
                      ? "bg-amber-600"
                      : "bg-slate-200"
                  }`}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}