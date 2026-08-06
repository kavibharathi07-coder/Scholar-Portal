import React, { useState } from "react";

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

    // Validate email extension
    if (!email.toLowerCase().endsWith("@rajalakshmi.edu.in")) {
      triggerToast(
        "error",
        "Please enter a valid official EmailId"
      );
      return;
    }

    setIsLoading(true);

    const payload = {
      user_type: role,
      email: email,
      password: password,
    };

    try {
      const response = await fetch("https://your-api-endpoint.com/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        if (data.token) {
          localStorage.setItem("authToken", data.token);
        }

        triggerToast(
          "success",
          data.message || "Login successful! Redirecting..."
        );
      } else {
        triggerToast(
          "error",
          data.message || "Invalid credentials provided."
        );
      }
    } catch (err) {
      // Handles network failure or server unreachable condition
      triggerToast(
        "error",
        "Backend server is not running. Please start the server and try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendOtp = async (event) => {
    event.preventDefault();
    setModalStatus({ type: "", message: "" });

    if (!resetEmail.toLowerCase().endsWith("@rajalakshmi.edu.in")) {
      setModalStatus({
        type: "error",
        message: "Invalid Email",
      });
      return;
    }

    setIsModalLoading(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 700));
      setForgotStep(2);
      setModalStatus({
        type: "success",
        message: `An OTP has been sent to ${resetEmail}`,
      });
    } catch {
      setModalStatus({
        type: "error",
        message: "Backend server is not running. Unable to send OTP.",
      });
    } finally {
      setIsModalLoading(false);
    }
  };

  const handleResetPassword = async (event) => {
    event.preventDefault();
    setModalStatus({ type: "", message: "" });

    if (newPassword !== confirmPassword) {
      setModalStatus({
        type: "error",
        message: "Passwords do not match.",
      });
      return;
    }

    setIsModalLoading(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 700));
      setModalStatus({
        type: "success",
        message: "Password updated successfully!",
      });
      setTimeout(() => {
        closeModal();
      }, 1500);
    } catch {
      setModalStatus({
        type: "error",
        message: "Backend server is not running or invalid OTP.",
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
        {/* MAIN DUAL PANEL CONTAINER */}
        <div className="w-full rounded-2xl bg-white shadow-2xl flex flex-col md:flex-row overflow-hidden border border-slate-200/80">
          
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
                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                />
              </svg>
              <span>SCHOLAR PORTAL</span>
            </div>
          </div>

          {/* RIGHT PANEL */}
          <div className="w-full md:w-1/2 bg-white px-8 md:px-12 lg:px-14 py-10 md:py-12 lg:py-14 flex flex-col justify-between">
            <div>
              {/* ROLE SWITCHER */}
              <div className="flex justify-end mb-8">
                <div className="relative bg-[#EAEFF5] p-1.5 rounded-lg flex items-center w-64">
                  <div
                    className={`absolute top-1.5 bottom-1.5 w-[calc(50%-6px)] bg-[#18263E] rounded-md shadow-sm transition-transform duration-500 ease-in-out ${
                      isMentor ? "translate-x-[100%]" : "translate-x-0"
                    }`}
                  />

                  <button
                    type="button"
                    onClick={() => handleRoleChange("student")}
                    className={`relative z-10 flex-1 flex items-center justify-center space-x-2 py-1.5 text-xs font-bold tracking-wider transition-colors duration-300 ${
                      !isMentor ? "text-white" : "text-slate-500 hover:text-slate-800"
                    }`}
                  >
                    <StudentIcon />
                    <span>STUDENT</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleRoleChange("mentor")}
                    className={`relative z-10 flex-1 flex items-center justify-center space-x-2 py-1.5 text-xs font-bold tracking-wider transition-colors duration-300 ${
                      isMentor ? "text-white" : "text-slate-500 hover:text-slate-800"
                    }`}
                  >
                    <MentorIcon />
                    <span>MENTOR</span>
                  </button>
                </div>
              </div>

              {/* Title Section */}
              <div className="mb-8">
                <h2 className="text-2xl font-serif text-slate-800 font-normal">
                  Sign in
                </h2>
                <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                  {isMentor
                    ? "Review submissions, publish feedback and manage your cohorts."
                    : "Track your learning progress and connect with mentors."}
                </p>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label
                    htmlFor="email"
                    className="mb-1.5 block text-[11px] font-bold text-slate-500 uppercase tracking-wider"
                  >
                    Institutional Email ID
                  </label>
                  <div className="relative flex items-center">
                    <div className="absolute left-3.5 pointer-events-none">
                      <UserInputIcon />
                    </div>
                    <input
                      id="email"
                      type="email"
                      required
                      autoComplete="email"
                      value={email}
                      onChange={(event) => setEmail(event.target.value)}
                      placeholder={
                        isMentor
                          ? "Enter faculty email (e.g., name@rajalakshmi.edu.in)"
                          : "Enter student email (e.g., name@rajalakshmi.edu.in)"
                      }
                      className="w-full rounded-lg border border-slate-200 bg-white pl-10 pr-4 py-2.5 text-sm text-slate-800 placeholder-slate-400 outline-none transition focus:border-slate-400 focus:ring-1 focus:ring-slate-400"
                    />
                  </div>
                </div>

                <div>
                  <div className="mb-1.5 flex items-center justify-between">
                    <label
                      htmlFor="password"
                      className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider"
                    >
                      PASSWORD
                    </label>
                    <button
                      type="button"
                      onClick={() => setIsForgotModalOpen(true)}
                      className="text-xs text-slate-500 hover:text-slate-800 transition"
                    >
                      Forgot password?
                    </button>
                  </div>
                  <div className="relative flex items-center">
                    <div className="absolute left-3.5 pointer-events-none">
                      <LockIcon />
                    </div>
                    <input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      required
                      autoComplete="current-password"
                      value={password}
                      onChange={(event) => setPassword(event.target.value)}
                      placeholder="Enter your confidential password"
                      className="w-full rounded-lg border border-slate-200 bg-white pl-10 pr-10 py-2.5 text-sm text-slate-800 placeholder-slate-400 outline-none transition focus:border-slate-400 focus:ring-1 focus:ring-slate-400"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3.5 flex items-center justify-center"
                    >
                      <EyeIcon show={showPassword} />
                    </button>
                  </div>
                </div>

                {/* Action Button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full mt-2 rounded-lg py-3 text-xs font-semibold text-white transition-all duration-200 bg-[#18263E] hover:bg-[#121C2E] flex items-center justify-center space-x-2 disabled:cursor-not-allowed disabled:opacity-50 shadow-md"
                >
                  <span>
                    {isLoading
                      ? "Signing in..."
                      : `Sign in as ${role}`}
                  </span>
                  {!isLoading && <span>&rarr;</span>}
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* EXTERNAL FOOTER LINKS */}
        <div className="w-full mt-4 flex flex-col md:flex-row items-center justify-between text-xs text-slate-500 px-2">
          <div className="flex items-center space-x-6">
            <a href="#about" className="hover:text-slate-800 transition">
              About
            </a>
            <a href="#help" className="hover:text-slate-800 transition">
              Help center
            </a>
            <a href="#terms" className="hover:text-slate-800 transition">
              Terms of use
            </a>
            <a href="#privacy" className="hover:text-slate-800 transition">
              Privacy policy
            </a>
          </div>
          <span className="mt-2 md:mt-0 text-slate-500">
            © 2026 Scholar Hub, Inc.
          </span>
        </div>
      </div>

      {/* Reset Password Modal */}
      {isForgotModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-sm">
          <div className="relative w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl border border-slate-100">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h2 className="text-lg font-serif font-semibold text-slate-800">
                  Reset Password
                </h2>
                <p className="mt-0.5 text-xs text-slate-500">
                  Recover access to your account
                </p>
              </div>

              <button
                type="button"
                onClick={closeModal}
                className="text-xl leading-none text-slate-400 hover:text-slate-700 transition"
              >
                &times;
              </button>
            </div>

            {modalStatus.message && (
              <div
                className={`mt-4 rounded-lg border p-3 text-xs ${
                  modalStatus.type === "success"
                    ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                    : "border-red-200 bg-red-50 text-red-700"
                }`}
              >
                {modalStatus.message}
              </div>
            )}

            {forgotStep === 1 && (
              <form onSubmit={handleSendOtp} className="mt-4 space-y-4">
                <p className="text-xs text-slate-600">
                  Enter your registered institutional email address ending with @rajalakshmi.edu.in to receive an OTP code.
                </p>

                <div>
                  <label
                    htmlFor="resetEmail"
                    className="mb-1 block text-xs font-medium text-slate-700"
                  >
                    Institutional Email Address
                  </label>
                  <input
                    id="resetEmail"
                    type="email"
                    required
                    value={resetEmail}
                    onChange={(event) => setResetEmail(event.target.value)}
                    placeholder="Enter official email (e.g., name@rajalakshmi.edu.in)"
                    className="w-full rounded-md border border-slate-200 px-3 py-2 text-xs outline-none focus:border-slate-400 focus:ring-1 focus:ring-slate-400"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isModalLoading}
                  className="w-full rounded-md bg-[#18263E] hover:bg-[#121C2E] py-2 text-xs font-semibold text-white shadow disabled:opacity-50"
                >
                  {isModalLoading ? "Sending OTP..." : "Send OTP"}
                </button>
              </form>
            )}

            {forgotStep === 2 && (
              <form onSubmit={handleResetPassword} className="mt-4 space-y-3">
                <div>
                  <label
                    htmlFor="otp"
                    className="mb-1 block text-xs font-medium text-slate-700"
                  >
                    OTP Code
                  </label>
                  <input
                    id="otp"
                    type="text"
                    required
                    value={otp}
                    onChange={(event) => setOtp(event.target.value)}
                    placeholder="Enter 6-digit OTP code"
                    className="w-full rounded-md border border-slate-200 px-3 py-2 text-xs outline-none focus:border-slate-400 focus:ring-1 focus:ring-slate-400"
                  />
                </div>

                <div>
                  <label
                    htmlFor="newPassword"
                    className="mb-1 block text-xs font-medium text-slate-700"
                  >
                    New Password
                  </label>
                  <input
                    id="newPassword"
                    type="password"
                    required
                    value={newPassword}
                    onChange={(event) => setNewPassword(event.target.value)}
                    placeholder="Enter new strong password"
                    className="w-full rounded-md border border-slate-200 px-3 py-2 text-xs outline-none focus:border-slate-400 focus:ring-1 focus:ring-slate-400"
                  />
                </div>

                <div>
                  <label
                    htmlFor="confirmPassword"
                    className="mb-1 block text-xs font-medium text-slate-700"
                  >
                    Confirm Password
                  </label>
                  <input
                    id="confirmPassword"
                    type="password"
                    required
                    value={confirmPassword}
                    onChange={(event) => setConfirmPassword(event.target.value)}
                    placeholder="Re-enter new password to confirm"
                    className="w-full rounded-md border border-slate-200 px-3 py-2 text-xs outline-none focus:border-slate-400 focus:ring-1 focus:ring-slate-400"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isModalLoading}
                  className="w-full rounded-md bg-[#18263E] hover:bg-[#121C2E] py-2 text-xs font-semibold text-white shadow disabled:opacity-50"
                >
                  {isModalLoading ? "Updating..." : "Update Password"}
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </main>
  );
}