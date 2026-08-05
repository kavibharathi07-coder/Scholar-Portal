import React, { useState } from "react";

function FixedGraduationCap() {
  return (
    <div className="flex justify-center mb-4">
      <svg
        width="110"
        height="85"
        viewBox="0 0 145 115"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="drop-shadow-xl"
      >
        {/* Main Cap Diamond */}
        <path
          d="M8 43L72 12L137 43L72 70L8 43Z"
          fill="#1E293B"
          stroke="#0F172A"
          strokeWidth="3.5"
          strokeLinejoin="round"
        />

        {/* Top Diamond Highlight */}
        <path
          d="M12 43L72 15L133 43"
          stroke="#64748B"
          strokeWidth="2.5"
          opacity="0.9"
        />

        {/* Skull Cap Base */}
        <path
          d="M38 57V91C57 103 88 103 107 91V57L72 72L38 57Z"
          fill="#334155"
          stroke="#0F172A"
          strokeWidth="3.5"
        />

        {/* Base Rim Cut Contour */}
        <path
          d="M38 91C57 80 88 80 107 91"
          stroke="#0F172A"
          strokeWidth="3.5"
        />

        {/* Tassel Cord */}
        <path
          d="M123 38V75"
          stroke="#F59E0B"
          strokeWidth="3.5"
          strokeLinecap="round"
        />

        {/* Gold Tassel Fringe */}
        <path
          d="M116 74C113 82 114 94 118 105L123 96L128 105C132 94 133 82 130 74C126 70 120 70 116 74Z"
          fill="#F59E0B"
          stroke="#D97706"
          strokeWidth="2"
        />

        <path
          d="M120 76C119 84 120 91 123 98M126 76C127 84 126 91 123 98"
          stroke="#FDE68A"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    </div>
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
      <path d="M8 19h8" />
    </svg>
  );
}

export default function AuthPage() {
  const [role, setRole] = useState("student");
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");

  const [status, setStatus] = useState({
    type: "",
    message: "",
  });

  const [isLoading, setIsLoading] = useState(false);

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

  const handleRoleChange = (newRole) => {
    if (newRole === role) return;

    setRole(newRole);
    setStatus({
      type: "",
      message: "",
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setStatus({
      type: "",
      message: "",
    });

    setIsLoading(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 700));

      setStatus({
        type: "success",
        message: `Successfully authenticated! Redirecting to ${
          isMentor ? "mentor" : "student"
        } dashboard...`,
      });
    } catch {
      setStatus({
        type: "error",
        message: "Invalid credentials. Please check your details and try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendOtp = async (event) => {
    event.preventDefault();

    setModalStatus({
      type: "",
      message: "",
    });

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
        message: "Unable to send OTP. Please try again.",
      });
    } finally {
      setIsModalLoading(false);
    }
  };

  const handleResetPassword = async (event) => {
    event.preventDefault();

    setModalStatus({
      type: "",
      message: "",
    });

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
        message: "Invalid OTP or password reset failed.",
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
    setModalStatus({
      type: "",
      message: "",
    });
  };

  return (
    <main className="relative flex min-h-screen items-center justify-center bg-slate-100 p-6 font-sans">
      
      {/* Background Academic Pattern Overlay */}
      <div className="absolute inset-0 opacity-5 pointer-events-none bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:16px_16px]" />

      {/* Expanded Container Size: max-w-6xl */}
      <div className="relative w-full max-w-6xl rounded-2xl bg-white shadow-2xl flex flex-col md:flex-row overflow-hidden z-10 my-6">
        
        {/* LEFT PANEL */}
        <div className="relative w-full md:w-1/2 bg-[#0F2137] text-white flex flex-col justify-between p-10 md:p-14 min-h-[550px] md:min-h-[680px] overflow-hidden">
          
          {/* Library Background Image */}
          <div
            className="absolute inset-0 bg-cover bg-center opacity-30 mix-blend-overlay"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1507842217343-583bb7270b66?q=80&w=1000&auto=format&fit=crop')",
            }}
          />

          {/* Top Left Header Section: Fixed Hat directly above Scholar Portal */}
          <div className="relative z-10 text-center pt-4">
            <FixedGraduationCap />
            <h1 className="text-3xl md:text-5xl font-serif tracking-widest font-bold uppercase border-b-2 border-slate-400/30 pb-4 inline-block">
              Scholar Portal
            </h1>
          </div>

          {/* Curved Decorative Bottom Section */}
          <div className="relative z-10 text-center mt-auto">
            <div className="bg-[#132A4A]/90 backdrop-blur-sm p-8 md:p-10 rounded-3xl shadow-lg border border-slate-700/40">
              <h2 className="text-2xl md:text-3xl font-serif font-bold mb-3">
                Welcome back, Scholar.
              </h2>
              <p className="text-sm md:text-base text-slate-300 leading-relaxed max-w-md mx-auto">
                Access your academic resources, research, and collaborative network. Continue your journey of learning.
              </p>
            </div>
          </div>

          {/* Center Connector Dot */}
          <div className="hidden md:flex absolute top-1/2 -right-4 -translate-y-1/2 z-20 w-8 h-8 bg-blue-500 rounded-full items-center justify-center border-4 border-white shadow-md">
            <div className="w-2.5 h-2.5 bg-white rounded-full"></div>
          </div>
        </div>

        {/* RIGHT PANEL */}
        <div className="w-full md:w-1/2 bg-white p-10 md:p-14 flex flex-col justify-between">
          
          <div>
            {/* Top Bar: Brand + Switcher */}
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center space-x-2 text-[#0F2137] font-bold text-xl tracking-wider">
                <StudentIcon />
                <span>SCHOLAR HUB</span>
              </div>

              {/* Role Switcher Pill */}
              <div className="bg-[#1A2B4C] p-1.5 rounded-full flex items-center shadow-inner">
                <button
                  type="button"
                  onClick={() => handleRoleChange("student")}
                  className={`flex items-center space-x-1.5 px-4 py-1.5 rounded-full text-xs font-semibold transition-all duration-300 ${
                    !isMentor
                      ? "bg-gradient-to-r from-amber-600 to-amber-700 text-white shadow-md"
                      : "text-slate-300 hover:text-white"
                  }`}
                >
                  <StudentIcon />
                  <span>Student</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleRoleChange("mentor")}
                  className={`flex items-center space-x-1.5 px-4 py-1.5 rounded-full text-xs font-semibold transition-all duration-300 ${
                    isMentor
                      ? "bg-gradient-to-r from-amber-600 to-amber-700 text-white shadow-md"
                      : "text-slate-300 hover:text-white"
                  }`}
                >
                  <MentorIcon />
                  <span>Mentor</span>
                </button>
              </div>
            </div>

            {/* Title Section */}
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-slate-900 font-serif">Sign In</h2>
              <p className="text-sm text-slate-500 mt-1 font-medium">
                Access Your Scholar Account
              </p>
            </div>

            {/* Status Message */}
            {status.message && (
              <div
                aria-live="polite"
                className={`mb-6 rounded-xl border p-3.5 text-sm font-medium ${
                  status.type === "success"
                    ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                    : "border-red-200 bg-red-50 text-red-700"
                }`}
              >
                {status.message}
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label
                  htmlFor="identifier"
                  className="mb-1.5 block text-xs font-semibold text-slate-700"
                >
                  Email Address or Username
                </label>

                <input
                  id="identifier"
                  type="text"
                  required
                  autoComplete="username"
                  value={identifier}
                  onChange={(event) => setIdentifier(event.target.value)}
                  placeholder="Enter your email"
                  className="w-full rounded-md border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-900 placeholder-slate-400 outline-none transition focus:border-transparent focus:ring-2 focus:ring-blue-400"
                />
              </div>

              <div>
                <div className="mb-1.5 flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="block text-xs font-semibold text-slate-700"
                  >
                    Password
                  </label>
                </div>

                <input
                  id="password"
                  type="password"
                  required
                  autoComplete="current-password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder="Enter your password"
                  className="w-full rounded-md border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-900 placeholder-slate-400 outline-none transition focus:border-transparent focus:ring-2 focus:ring-blue-400"
                />

                <div className="flex justify-end mt-1.5">
                  <button
                    type="button"
                    onClick={() => setIsForgotModalOpen(true)}
                    className="text-xs text-slate-600 hover:text-blue-600 transition"
                  >
                    Forgot Password?
                  </button>
                </div>
              </div>

              {/* Static Log In Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full rounded-md py-3 text-sm font-semibold text-white shadow-md transition-all duration-300 bg-[#2563EB] hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isLoading ? "Logging In..." : "Log In"}
              </button>
            </form>
          </div>

          {/* Footer */}
          <div className="mt-8 pt-4 border-t border-slate-200 flex flex-col md:flex-row items-center justify-between text-xs text-slate-500 space-y-2 md:space-y-0">
            <div className="flex flex-wrap items-center space-x-2 justify-center md:justify-start">
              <a href="#about" className="hover:underline">About Scholar Hub</a>
              <span>|</span>
              <a href="#help" className="hover:underline">Help Center</a>
              <span>|</span>
              <a href="#terms" className="hover:underline">Terms of Use</a>
              <span>|</span>
              <a href="#privacy" className="hover:underline">Privacy Policy</a>
            </div>
            
            <span className="text-slate-400">© 2026 Scholar Hub, Inc.</span>
          </div>

        </div>
      </div>

      {/* Forgot Password Modal (Bar lines at top removed) */}
      {isForgotModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-4 backdrop-blur-sm">
          <div className="relative w-full max-w-md rounded-3xl bg-white p-7 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <h2 className="text-xl font-bold text-slate-900">
                  Reset Password
                </h2>
                <p className="mt-1 text-xs text-slate-500">
                  Recover access to your account
                </p>
              </div>

              <button
                type="button"
                onClick={closeModal}
                className="text-2xl leading-none text-slate-400 transition hover:rotate-90 hover:text-slate-700"
              >
                &times;
              </button>
            </div>

            {modalStatus.message && (
              <div
                className={`mt-5 rounded-xl border p-3 text-sm ${
                  modalStatus.type === "success"
                    ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                    : "border-red-200 bg-red-50 text-red-700"
                }`}
              >
                {modalStatus.message}
              </div>
            )}

            {forgotStep === 1 && (
              <form onSubmit={handleSendOtp} className="mt-5 space-y-5">
                <p className="text-sm text-slate-600">
                  Enter your registered email address and we will send you an OTP code.
                </p>

                <div>
                  <label
                    htmlFor="resetEmail"
                    className="mb-2 block text-sm font-semibold text-slate-700"
                  >
                    Email Address
                  </label>

                  <input
                    id="resetEmail"
                    type="email"
                    required
                    value={resetEmail}
                    onChange={(event) => setResetEmail(event.target.value)}
                    placeholder="you@example.com"
                    className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-transparent focus:ring-2 focus:ring-blue-400"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isModalLoading}
                  className="w-full rounded-xl bg-blue-600 hover:bg-blue-700 py-3 text-sm font-bold text-white shadow-md disabled:opacity-50"
                >
                  {isModalLoading ? "Sending OTP..." : "Send OTP"}
                </button>
              </form>
            )}

            {forgotStep === 2 && (
              <form onSubmit={handleResetPassword} className="mt-5 space-y-4">
                <div>
                  <label
                    htmlFor="otp"
                    className="mb-2 block text-sm font-semibold text-slate-700"
                  >
                    OTP Code
                  </label>

                  <input
                    id="otp"
                    type="text"
                    required
                    value={otp}
                    onChange={(event) => setOtp(event.target.value)}
                    placeholder="Enter OTP"
                    className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-transparent focus:ring-2 focus:ring-blue-400"
                  />
                </div>

                <div>
                  <label
                    htmlFor="newPassword"
                    className="mb-2 block text-sm font-semibold text-slate-700"
                  >
                    New Password
                  </label>

                  <input
                    id="newPassword"
                    type="password"
                    required
                    value={newPassword}
                    onChange={(event) => setNewPassword(event.target.value)}
                    placeholder="Enter new password"
                    className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-transparent focus:ring-2 focus:ring-blue-400"
                  />
                </div>

                <div>
                  <label
                    htmlFor="confirmPassword"
                    className="mb-2 block text-sm font-semibold text-slate-700"
                  >
                    Confirm Password
                  </label>

                  <input
                    id="confirmPassword"
                    type="password"
                    required
                    value={confirmPassword}
                    onChange={(event) =>
                      setConfirmPassword(event.target.value)
                    }
                    placeholder="Confirm new password"
                    className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-transparent focus:ring-2 focus:ring-blue-400"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isModalLoading}
                  className="w-full rounded-xl bg-blue-600 hover:bg-blue-700 py-3 text-sm font-bold text-white shadow-md disabled:opacity-50"
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