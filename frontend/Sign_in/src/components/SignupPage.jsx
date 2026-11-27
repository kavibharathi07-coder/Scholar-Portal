import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "motion/react";
import collegeBg from "../assets/college-bg.jpg";
import {
  MousePointerClick,
  CheckCircle2Icon,
  InfoIcon,
  CircleAlert,
} from "lucide-react";

import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "/src/components/ui/alert";
import { Button } from "/src/components/ui/button";
import {
  loginUser,
  requestPasswordOtp,
  verifyPasswordOtp,
  resetPassword,
} from "../services/authService";

/* =========================================================
   FIXED GRADUATION CAP
========================================================= */

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

/* =========================================================
   STUDENT ICON
========================================================= */

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

/* =========================================================
   MENTOR ICON
========================================================= */

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

/* =========================================================
   USER INPUT ICON
========================================================= */

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

/* =========================================================
   LOCK ICON
========================================================= */

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

/* =========================================================
   EYE ICON
========================================================= */

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

/* =========================================================
   SUCCESS PARTICLES
========================================================= */

function SuccessParticles() {
  const particles = Array.from({ length: 18 }, (_, index) => {
    const angle = (index / 18) * Math.PI * 2;
    const distance = 35 + (index % 4) * 10;

    return {
      x: Math.cos(angle) * distance,
      y: Math.sin(angle) * distance,
    };
  });

  return (
    <div className="absolute inset-0 pointer-events-none overflow-visible">
      <AnimatePresence>
        {particles.map((particle, index) => (
          <motion.span
            key={index}
            className="absolute left-1/2 top-1/2 h-1.5 w-1.5 rounded-full bg-white"
            initial={{
              x: "-50%",
              y: "-50%",
              opacity: 1,
              scale: 1,
            }}
            animate={{
              x: particle.x,
              y: particle.y,
              opacity: 0,
              scale: 0,
            }}
            transition={{
              duration: 0.7,
              ease: "easeOut",
            }}
          />
        ))}
      </AnimatePresence>
    </div>
  );
}

/* =========================================================
   MAIN AUTH PAGE
========================================================= */

export default function AuthPage() {
  /* =======================================================
     LOGIN STATES
  ======================================================= */

  const [role, setRole] = useState("student");

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const [showParticles, setShowParticles] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  /* =======================================================
     TOAST
  ======================================================= */

  const [toast, setToast] = useState({
    show: false,
    type: "",
    message: "",
  });

  /* =======================================================
     FORGOT PASSWORD
  ======================================================= */

  const [isForgotModalOpen, setIsForgotModalOpen] = useState(false);

  /*
    STEP 1 = Email
    STEP 2 = OTP
    STEP 3 = New Password
  */
  const [forgotStep, setForgotStep] = useState(1);

  const [resetEmail, setResetEmail] = useState("");

  const [otp, setOtp] = useState("");

  const [otpError, setOtpError] = useState("");

  const [newPassword, setNewPassword] = useState("");

  const [confirmPassword, setConfirmPassword] = useState("");

  const [isOtpVerifying, setIsOtpVerifying] = useState(false);

  const [resendLoading, setResendLoading] = useState(false);

  const [modalStatus, setModalStatus] = useState({
    type: "",
    message: "",
  });

  const [isModalLoading, setIsModalLoading] = useState(false);

  /* =======================================================
     OTP REFS
  ======================================================= */

  const otpRefs = useRef([]);

  /* =======================================================
     MENTOR CHECK
  ======================================================= */

  const isMentor = role === "mentor";
  const navigate = useNavigate();

  /* =======================================================
     PARTICLE TRIGGER
  ======================================================= */

  const triggerParticles = () => {
    setShowParticles(true);

    setTimeout(() => {
      setShowParticles(false);
    }, 800);
  };

  /* =======================================================
     TOAST
  ======================================================= */

  const triggerToast = (type, message) => {
    setToast({
      show: true,
      type,
      message,
    });

    setTimeout(() => {
      setToast({
        show: false,
        type: "",
        message: "",
      });
    }, 4000);
  };

  /* =======================================================
     ROLE CHANGE
  ======================================================= */

  const handleRoleChange = (newRole) => {
    if (newRole === role) return;

    setRole(newRole);

    setEmail("");

    setPassword("");

    setToast({
      show: false,
      type: "",
      message: "",
    });
  };

  /* =======================================================
     LOGIN
  ======================================================= */

  const handleSubmit = async (event) => {
    event.preventDefault();

    triggerParticles();

    setToast({
      show: false,
      type: "",
      message: "",
    });

    /* EMAIL VALIDATION */

    if (
      !email
        .toLowerCase()
        .endsWith("@rajalakshmi.edu.in")
    ) {
      triggerToast(
        "error",
        "Please enter a valid official email ending with @rajalakshmi.edu.in"
      );

      return;
    }

    /* PASSWORD VALIDATION */

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

      triggerToast(
        "success",
        data.message || "Login successful! Redirecting..."
      );

      navigate(
        data.user?.role === "mentor"
          ? "/mentor-dashboard"
          : "/student-dashboard"
      );
    } catch (error) {
      triggerToast("error", error.message || "Login failed.");
    } finally {
      setIsLoading(false);
    }
  };

  /* =======================================================
     SEND OTP
  ======================================================= */

  const handleSendOtp = async (event) => {
    event.preventDefault();

    setModalStatus({
      type: "",
      message: "",
    });

    setOtpError("");

    /* EMAIL VALIDATION */

    if (
      !resetEmail
        .toLowerCase()
        .endsWith("@rajalakshmi.edu.in")
    ) {
      setModalStatus({
        type: "error",
        message:
          "Email must end with @rajalakshmi.edu.in",
      });

      return;
    }

    setIsModalLoading(true);

    try {
      const normalizedEmail = resetEmail.trim().toLowerCase();
      const data = await requestPasswordOtp(normalizedEmail);

      setResetEmail(normalizedEmail);
      setOtp("");
      setForgotStep(2);
      setModalStatus({
        type: "success",
        message: data.message || `OTP sent to ${normalizedEmail}`,
      });

      setTimeout(() => {
        otpRefs.current[0]?.focus();
      }, 100);
    } catch (error) {
      setModalStatus({
        type: "error",
        message: error.message || "Unable to send OTP.",
      });
    } finally {
      setIsModalLoading(false);
    }
  };

  /* =======================================================
     OTP CHANGE
  ======================================================= */

  const handleOtpChange = (index, value) => {
    /*
      Only allow one number.
    */

    if (!/^\d?$/.test(value)) {
      return;
    }

    const otpArray = otp
      .padEnd(6, "")
      .split("");

    otpArray[index] = value;

    const newOtp = otpArray
      .join("")
      .slice(0, 6);

    setOtp(newOtp);

    setOtpError("");

    /*
      Move to next box automatically.
    */

    if (value && index < 5) {
      otpRefs.current[index + 1]?.focus();
    }
  };

  /* =======================================================
     OTP KEYBOARD CONTROL
  ======================================================= */

  const handleOtpKeyDown = (index, event) => {
    /*
      Backspace
    */

    if (
      event.key === "Backspace" &&
      !otp[index] &&
      index > 0
    ) {
      otpRefs.current[index - 1]?.focus();
    }

    /*
      Arrow Left
    */

    if (
      event.key === "ArrowLeft" &&
      index > 0
    ) {
      otpRefs.current[index - 1]?.focus();
    }

    /*
      Arrow Right
    */

    if (
      event.key === "ArrowRight" &&
      index < 5
    ) {
      otpRefs.current[index + 1]?.focus();
    }
  };

  /* =======================================================
     OTP PASTE
  ======================================================= */

  const handleOtpPaste = (event) => {
    event.preventDefault();

    const pastedValue = event.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, 6);

    if (!pastedValue) return;

    setOtp(pastedValue);

    setOtpError("");

    const focusIndex = Math.min(
      pastedValue.length,
      5
    );

    setTimeout(() => {
      otpRefs.current[focusIndex]?.focus();
    }, 0);
  };

  /* =======================================================
     VERIFY OTP
  ======================================================= */

  const handleVerifyOtp = async (event) => {
    event.preventDefault();

    setOtpError("");

    if (otp.length !== 6) {
      setOtpError(
        "Please enter the complete 6-digit OTP."
      );

      return;
    }

    setIsOtpVerifying(true);

    try {
      const data = await verifyPasswordOtp(resetEmail, otp);

      if (data.success) {
        setOtp("");
        setModalStatus({
          type: "success",
          message: "OTP verified successfully.",
        });

        setTimeout(() => {
          setForgotStep(3);
          setModalStatus({ type: "", message: "" });
        }, 700);
      }
    } catch (error) {
      setOtpError(error.message || "Invalid or expired OTP.");
    } finally {
      setIsOtpVerifying(false);
    }
  };

  /* =======================================================
     RESEND OTP
  ======================================================= */

  const handleResendOtp = async () => {
    setResendLoading(true);

    setOtp("");

    setOtpError("");

    setModalStatus({
      type: "",
      message: "",
    });

    try {
      await requestPasswordOtp(resetEmail);
      setModalStatus({
        type: "success",
        message: "A new OTP has been sent to your email.",
      });

      setTimeout(() => {
        otpRefs.current[0]?.focus();
      }, 100);
    } catch (error) {
      setOtpError(error.message || "Unable to resend OTP.");
    } finally {
      setResendLoading(false);
    }
  };

  /* =======================================================
     RESET PASSWORD
  ======================================================= */

  const handleResetPassword = async (event) => {
    event.preventDefault();

    setModalStatus({
      type: "",
      message: "",
    });

    /* PASSWORD MATCH */

    if (newPassword !== confirmPassword) {
      setModalStatus({
        type: "error",
        message:
          "Passwords do not match.",
      });

      return;
    }

    /* PASSWORD LENGTH */

    if (newPassword.length < 8) {
      setModalStatus({
        type: "error",
        message:
          "Password must contain at least 8 characters.",
      });

      return;
    }

    /* PASSWORD MAXIMUM LENGTH */

    if (newPassword.length > 128) {
      setModalStatus({
        type: "error",
        message: "Password must contain no more than 128 characters.",
      });
      return;
    }

    setIsModalLoading(true);

    try {
      const data = await resetPassword(newPassword, confirmPassword);

      setModalStatus({
        type: "success",
        message: data.message || "Password updated successfully!",
      });

      setTimeout(() => closeModal(), 1500);
    } catch (error) {
      setModalStatus({
        type: "error",
        message: error.message || "Unable to update password.",
      });
    } finally {
      setIsModalLoading(false);
    }
  };

  /* =======================================================
     CLOSE MODAL
  ======================================================= */

  const closeModal = () => {
    setIsForgotModalOpen(false);

    setForgotStep(1);

    setResetEmail("");

    setOtp("");

    setOtpError("");

    setNewPassword("");

    setConfirmPassword("");

    setModalStatus({
      type: "",
      message: "",
    });

    setIsModalLoading(false);

    setIsOtpVerifying(false);

    setResendLoading(false);
  };

  /* =======================================================
     RETURN
  ======================================================= */

  return (
    <main className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-white/90 backdrop-blur-md p-4 md:p-8 lg:p-12 font-sans">

      {/* =====================================================
          BACKGROUND PHOTO
      ===================================================== */}

      <img
        src={collegeBg}
        alt=""
        className="absolute inset-0 z-0 h-full w-full object-cover object-center"
      />

      {/* =====================================================
          DARK OVERLAY
      ===================================================== */}

      <div className="absolute inset-0 z-0 bg-black/40 pointer-events-none" />

      {/* =====================================================
    SHADCN ALERT NOTIFICATION
===================================================== */}

<div
  className={`fixed top-6 left-1/2 -translate-x-1/2 z-[100] w-full max-w-md px-4 transition-all duration-500 ease-in-out ${
    toast.show
      ? "translate-y-0 opacity-100 scale-100"
      : "-translate-y-16 opacity-0 scale-95 pointer-events-none"
  }`}
>
  <Alert
    variant={toast.type === "error" ? "destructive" : "default"}
    className={`relative overflow-hidden bg-white shadow-2xl rounded-xl border ${
      toast.type === "success"
        ? "border-emerald-200"
        : toast.type === "error"
        ? "border-red-200"
        : "border-blue-200"
    }`}
  >
    {/* ICON */}

    {toast.type === "success" ? (
      <CheckCircle2Icon className="h-5 w-5 text-emerald-600" />
    ) : toast.type === "error" ? (
      <CircleAlert className="h-5 w-5 text-red-600" />
    ) : (
      <InfoIcon className="h-5 w-5 text-blue-600" />
    )}

    {/* CONTENT */}

    <AlertTitle
      className={
        toast.type === "success"
          ? "text-emerald-800"
          : toast.type === "error"
          ? "text-red-800"
          : "text-blue-800"
      }
    >
      {toast.type === "success"
        ? "Success"
        : toast.type === "error"
        ? "Something went wrong"
        : "Information"}
    </AlertTitle>

    <AlertDescription
      className={
        toast.type === "success"
          ? "text-emerald-700"
          : toast.type === "error"
          ? "text-red-700"
          : "text-blue-700"
      }
    >
      {toast.message}
    </AlertDescription>

    {/* CLOSE BUTTON */}

    <button
      type="button"
      onClick={() =>
        setToast({
          ...toast,
          show: false,
        })
      }
      className="absolute right-3 top-3 text-slate-400 hover:text-slate-700 transition-colors"
      aria-label="Close notification"
    >
      <span className="text-lg leading-none">&times;</span>
    </button>

    {/* PROGRESS BAR */}

    <motion.div
      initial={{ width: "100%" }}
      animate={{ width: toast.show ? "0%" : "100%" }}
      transition={{
        duration: 4,
        ease: "linear",
      }}
      className={`absolute bottom-0 left-0 h-1 ${
        toast.type === "success"
          ? "bg-emerald-500"
          : toast.type === "error"
          ? "bg-red-500"
          : "bg-blue-500"
      }`}
    />
  </Alert>
</div>

      {/* =====================================================
          CENTER CONTAINER
      ===================================================== */}

      <div className="relative z-10 w-full max-w-5xl mx-auto flex flex-col my-auto">

        {/* ===================================================
            MAIN DUAL PANEL
        =================================================== */}

        <div className="w-full rounded-2xl bg-white shadow-[0_20px_60px_rgba(0,0,0,0.55),0_8px_20px_rgba(0,0,0,0.35)] flex flex-col md:flex-row overflow-hidden border border-slate-200/80">

          {/* =================================================
              LEFT PANEL
          ================================================= */}

          <div className="relative w-full md:w-1/2 bg-[#082F3D] text-white flex flex-col justify-between px-8 md:px-12 lg:px-14 py-10 md:py-12 lg:py-14 min-h-[520px]">

            {/* Background library */}

            <div
              className="absolute inset-0 opacity-[0.18] pointer-events-none"
              style={{
                backgroundImage:
                  "url('https://images.unsplash.com/photo-1507842217343-583bb7270b66?q=80&w=1000&auto=format&fit=crop')",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            />

            {/* Dark overlay */}

            <div className="absolute inset-0 bg-[#082F3D]/75 pointer-events-none" />

            {/* BRAND */}

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

            {/* CENTER CONTENT */}

            <div className="relative z-10 my-auto py-6">

              <div className="w-full h-[2px] bg-amber-500/90 mb-6" />

              <h2 className="text-3xl md:text-4xl font-serif font-normal text-white leading-tight">
                Dream believe achieve
              </h2>

              <p className="text-xs text-slate-300 mt-4 tracking-wider">
                Learn &rarr; Grow &rarr; Consistent &rarr; Success.
              </p>

              <div className="w-full h-[2px] bg-amber-500/90 mt-6" />

            </div>

            {/* SECURITY FOOTER */}

            <div className="relative z-10 flex items-center space-x-2 text-[11px] tracking-widest text-slate-300 uppercase font-medium">

              <svg
                className="w-4 h-4 text-amber-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 00-8.618 3.04A12.025 12.025 0 002 12c0 1.852.396 3.605 1.086 5.207M16 8h6M16 12h6m-7 4h7"
                />
              </svg>

              <p className="leading-none">
                Secure login with industry-standard encryption.
              </p>

            </div>

          </div>

          {/* =================================================
              RIGHT PANEL
          ================================================= */}

          <div className="relative w-full md:w-1/2 bg-white text-slate-800 flex flex-col overflow-hidden">

            {/* SHIMMER EFFECT */}

            <div className="absolute inset-0 z-10 overflow-hidden">
              <div className="h-1/2 bg-gradient-to-b from-white to-transparent" />
              <div className="h-1/2 bg-gradient-to-t from-white to-transparent" />
            </div>

            {/* FORM CONTAINER */}

            <div className="relative z-20 flex-1 p-6 md:p-8 lg:p-10 flex flex-col justify-center">

              {/* TABS */}

              <div className="flex items-center justify-center space-x-2 mb-8">

                <button
                  onClick={() => handleRoleChange("student")}
                  className={`flex-1 px-4 py-2 text-sm font-medium rounded-lg transition-all flex items-center justify-center space-x-2 ${
                    role === "student"
                      ? "bg-amber-500 text-white shadow-md"
                      : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                  }`}
                >
                  <StudentIcon />

                  <span>Student</span>
                </button>

                <button
                  onClick={() => handleRoleChange("mentor")}
                  className={`flex-1 px-4 py-2 text-sm font-medium rounded-lg transition-all flex items-center justify-center space-x-2 ${
                    role === "mentor"
                      ? "bg-amber-500 text-white shadow-md"
                      : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                  }`}
                >
                  <MentorIcon />

                  <span>Mentor</span>
                </button>
              </div>

              {/* TITLE */}

              <h2 className="text-2xl md:text-3xl font-serif font-semibold tracking-tight mb-6 text-center">
                {role === "student"
                  ? "Student Login"
                  : "Mentor Login"}
              </h2>

              {/* FORM */}

              <form
                onSubmit={handleSubmit}
                className="space-y-4"
              >
                {/* EMAIL */}

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-slate-700"
                  >
                    Official Email
                  </label>

                  <div className="relative mt-1">
                    <UserInputIcon />

                    <input
                      type="email"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="w-full h-12 pl-10 pr-4 text-sm rounded-lg border transition-all focus:ring-1 focus:ring-amber-500 focus:outline-none"
                      placeholder="you@rajalakshmi.edu.in"
                    />
                  </div>
                </div>

                {/* PASSWORD */}

                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-slate-700"
                  >
                    Password
                  </label>

                  <div className="relative mt-1">
                    <LockIcon />

                    <input
                      type={showPassword ? "text" : "password"}
                      id="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="w-full h-12 pl-10 pr-4 text-sm rounded-lg border transition-all focus:ring-1 focus:ring-amber-500 focus:outline-none"
                      placeholder="Enter your password"
                    />

                    <button
                      type="button"
                      onClick={() => setShowPassword((prev) => !prev)}
                      className="absolute right-3 top-1/2 -translate-y-1/2"
                      aria-label="Toggle password visibility"
                    >
                      <EyeIcon show={showPassword} />
                    </button>
                  </div>
                </div>

                {/* SUBMIT BUTTON */}

                <div>
                  <button
                    type="submit"
                    className="w-full h-12 px-4 text-sm font-semibold rounded-lg bg-amber-500 text-white transition-all flex items-center justify-center space-x-2 hover:bg-amber-600"
                    disabled={isLoading}
                  >
                    {isLoading && (
                      <svg
                        className="animate-spin h-5 w-5 mr-3 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                          className="opacity-25"
                        />

                        <path
                          d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                          fill="currentColor"
                        />
                      </svg>
                    )}

                    <span>
                      {role === "student"
                        ? "Student Login"
                        : "Mentor Login"}
                    </span>
                  </button>
                </div>

                {/* FORGOT PASSWORD LINK */}

                <div className="text-center">
                  <button
                    type="button"
                    onClick={() => setIsForgotModalOpen(true)}
                    className="text-sm text-amber-500 hover:underline"
                  >
                    Forgot password?
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* =====================================================
          FORGOT PASSWORD MODAL
      ===================================================== */}

      {isForgotModalOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
          <div className="w-full max-w-md p-6 bg-white rounded-xl shadow-lg">
            {/* HEADER */}

            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-slate-800">
                Reset Password
              </h3>

              <button
                onClick={closeModal}
                className="text-slate-400 hover:text-slate-600"
                aria-label="Close"
              >
                &times;
              </button>
            </div>

            {/* CONTENT */}

            <div className="space-y-4">
              {/* STEP 1: EMAIL */}

              {forgotStep === 1 && (
                <div>
                  <p className="text-sm text-slate-500 mb-4">
                    Enter your official email to receive the password reset OTP.
                  </p>

                  <form
                    onSubmit={handleSendOtp}
                    className="space-y-4"
                  >
                    {/* EMAIL INPUT */}

                    <div>
                      <label
                        htmlFor="reset-email"
                        className="block text-sm font-medium text-slate-700"
                      >
                        Official Email
                      </label>

                      <div className="relative mt-1">
                        <UserInputIcon />

                        <input
                          type="email"
                          id="reset-email"
                          value={resetEmail}
                          onChange={(e) => setResetEmail(e.target.value)}
                          required
                          className="w-full h-12 pl-10 pr-4 text-sm rounded-lg border transition-all focus:ring-1 focus:ring-amber-500 focus:outline-none"
                          placeholder="you@rajalakshmi.edu.in"
                        />
                      </div>
                    </div>

                    {/* SUBMIT BUTTON */}

                    <div>
                      <button
                        type="submit"
                        className="w-full h-12 px-4 text-sm font-semibold rounded-lg bg-amber-500 text-white transition-all flex items-center justify-center space-x-2 hover:bg-amber-600"
                        disabled={isModalLoading}
                      >
                        {isModalLoading && (
                          <svg
                            className="animate-spin h-5 w-5 mr-3 text-white"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                              className="opacity-25"
                            />

                            <path
                              d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                              fill="currentColor"
                            />
                          </svg>
                        )}

                        <span>Send OTP</span>
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {/* STEP 2: OTP VERIFICATION */}

              {forgotStep === 2 && (
                <div>
                  <p className="text-sm text-slate-500 mb-4">
                    Enter the OTP sent to{" "}
                    <span className="font-semibold">{resetEmail}</span>
                  </p>

                  <form
                    onSubmit={handleVerifyOtp}
                    className="space-y-4"
                  >
                    {/* OTP INPUTS */}

                    <div className="grid grid-cols-6 gap-2">
                      {Array.from({ length: 6 }).map((_, index) => (
                        <div key={index}>
                          <input
                            type="text"
                            maxLength={1}
                            value={otp[index] || ""}
                            onChange={(e) => handleOtpChange(index, e.target.value)}
                            onKeyDown={(e) => handleOtpKeyDown(index, e)}
                            ref={(el) => (otpRefs.current[index] = el)}
                            className="w-full h-12 text-center text-2xl font-semibold rounded-lg border transition-all focus:ring-1 focus:ring-amber-500 focus:outline-none"
                          />
                        </div>
                      ))}
                    </div>

                    {/* ERROR MESSAGE */}

                    {otpError && (
                      <p className="text-sm text-red-500">
                        {otpError}
                      </p>
                    )}

                    {/* SUBMIT BUTTON */}

                    <div>
                      <button
                        type="submit"
                        className="w-full h-12 px-4 text-sm font-semibold rounded-lg bg-amber-500 text-white transition-all flex items-center justify-center space-x-2 hover:bg-amber-600"
                        disabled={isOtpVerifying}
                      >
                        {isOtpVerifying && (
                          <svg
                            className="animate-spin h-5 w-5 mr-3 text-white"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                              className="opacity-25"
                            />

                            <path
                              d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                              fill="currentColor"
                            />
                          </svg>
                        )}

                        <span>Verify OTP</span>
                      </button>
                    </div>
                  </form>

                  {/* RESEND OTP LINK */}

                  <div className="mt-4 text-center">
                    <button
                      onClick={handleResendOtp}
                      className="text-sm text-amber-500 hover:underline"
                      disabled={resendLoading}
                    >
                      {resendLoading
                        ? "Resending..."
                        : "Resend OTP"}
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 3: NEW PASSWORD */}

              {forgotStep === 3 && (
                <div>
                  <p className="text-sm text-slate-500 mb-4">
                    Enter a new password for your account.
                  </p>

                  <form
                    onSubmit={handleResetPassword}
                    className="space-y-4"
                  >
                    {/* NEW PASSWORD */}

                    <div>
                      <label
                        htmlFor="new-password"
                        className="block text-sm font-medium text-slate-700"
                      >
                        New Password
                      </label>

                      <div className="relative mt-1">
                        <LockIcon />

                        <input
                          type="password"
                          id="new-password"
                          value={newPassword}
                          onChange={(e) => setNewPassword(e.target.value)}
                          required
                          className="w-full h-12 pl-10 pr-4 text-sm rounded-lg border transition-all focus:ring-1 focus:ring-amber-500 focus:outline-none"
                          placeholder="Enter new password"
                        />
                      </div>
                    </div>

                    {/* CONFIRM PASSWORD */}

                    <div>
                      <label
                        htmlFor="confirm-password"
                        className="block text-sm font-medium text-slate-700"
                      >
                        Confirm Password
                      </label>

                      <div className="relative mt-1">
                        <LockIcon />

                        <input
                          type="password"
                          id="confirm-password"
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          required
                          className="w-full h-12 pl-10 pr-4 text-sm rounded-lg border transition-all focus:ring-1 focus:ring-amber-500 focus:outline-none"
                          placeholder="Confirm new password"
                        />
                      </div>
                    </div>

                    {/* ERROR MESSAGE */}

                    {modalStatus.message && (
                      <p className={`text-sm ${modalStatus.type === "error" ? "text-red-500" : "text-emerald-500"}`}>
                        {modalStatus.message}
                      </p>
                    )}

                    {/* SUBMIT BUTTON */}

                    <div>
                      <button
                        type="submit"
                        className="w-full h-12 px-4 text-sm font-semibold rounded-lg bg-amber-500 text-white transition-all flex items-center justify-center space-x-2 hover:bg-amber-600"
                        disabled={isModalLoading}
                      >
                        {isModalLoading && (
                          <svg
                            className="animate-spin h-5 w-5 mr-3 text-white"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                              className="opacity-25"
                            />

                            <path
                              d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                              fill="currentColor"
                            />
                          </svg>
                        )}

                        <span>Reset Password</span>
                      </button>
                    </div>
                  </form>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* =====================================================
          PARTIAL LOADING SCREEN
      ===================================================== */}

      {(isLoading || isModalLoading) && (
        <div className="fixed inset-0 z-[300] flex items-center justify-center bg-white/90 backdrop-blur-md">
          <svg
            className="animate-spin h-10 w-10 text-amber-500"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
              className="opacity-25"
            />

            <path
              d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
              fill="currentColor"
            />
          </svg>
        </div>
      )}
    </main>
  );
}