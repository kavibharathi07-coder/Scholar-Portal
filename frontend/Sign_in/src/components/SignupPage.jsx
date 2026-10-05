import React, { useState, useRef } from "react";
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

    setIsLoading(true);

    const payload = {
      user_type: role,
      email: email,
      password: password,
    };

    try {
      /*
        Replace this URL with your actual login API.
      */

      const response = await fetch(
        "https://your-api-endpoint.com/api/login",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify(payload),
        }
      );

      const data = await response.json();

      if (response.ok && data.success) {
        if (data.token) {
          localStorage.setItem(
            "authToken",
            data.token
          );
        }

        triggerToast(
          "success",
          data.message ||
            "Login successful! Redirecting..."
        );
      } else {
        triggerToast(
          "error",
          data.message ||
            "Invalid credentials provided."
        );
      }
    } catch (error) {
      triggerToast(
        "error",
        "Backend server is not running. Please start the server and try again."
      );
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
      /*
        ======================================================
        SEND OTP API
        ======================================================

        Replace this URL with your Flask backend URL.

        Example:

        http://127.0.0.1:5000/api/send-otp
      */

      const response = await fetch(
        "https://your-api-endpoint.com/api/send-otp",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            email: resetEmail,
          }),
        }
      );

      const data = await response.json();

      if (response.ok && data.success) {
        setOtp("");

        setForgotStep(2);

        setModalStatus({
          type: "success",
          message: `OTP sent to ${resetEmail}`,
        });

        /*
          Focus first OTP box after rendering.
        */

        setTimeout(() => {
          otpRefs.current[0]?.focus();
        }, 100);
      } else {
        setModalStatus({
          type: "error",
          message:
            data.message ||
            "Unable to send OTP.",
        });
      }
    } catch (error) {
      setModalStatus({
        type: "error",
        message:
          "Backend server is not running. Unable to send OTP.",
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
      /*
        ======================================================
        VERIFY OTP API
        ======================================================

        Replace this URL with your Flask backend URL.
      */

      const response = await fetch(
        "https://your-api-endpoint.com/api/verify-otp",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            email: resetEmail,
            otp: otp,
          }),
        }
      );

      const data = await response.json();

      if (response.ok && data.success) {
        setModalStatus({
          type: "success",
          message:
            "OTP verified successfully.",
        });

        setTimeout(() => {
          setForgotStep(3);

          setModalStatus({
            type: "",
            message: "",
          });
        }, 700);
      } else {
        setOtpError(
          data.message ||
            "Invalid or expired OTP."
        );
      }
    } catch (error) {
      setOtpError(
        "Backend server is not running. Unable to verify OTP."
      );
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
      const response = await fetch(
        "https://your-api-endpoint.com/api/send-otp",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            email: resetEmail,
          }),
        }
      );

      const data = await response.json();

      if (response.ok && data.success) {
        setModalStatus({
          type: "success",
          message:
            "A new OTP has been sent to your email.",
        });

        setTimeout(() => {
          otpRefs.current[0]?.focus();
        }, 100);
      } else {
        setOtpError(
          data.message ||
            "Unable to resend OTP."
        );
      }
    } catch (error) {
      setOtpError(
        "Backend server is not running."
      );
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

    setIsModalLoading(true);

    try {
      /*
        ======================================================
        RESET PASSWORD API
        ======================================================

        Replace this URL with your Flask backend URL.
      */

      const response = await fetch(
        "https://your-api-endpoint.com/api/reset-password",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            email: resetEmail,
            otp: otp,
            new_password: newPassword,
          }),
        }
      );

      const data = await response.json();

      if (response.ok && data.success) {
        setModalStatus({
          type: "success",
          message:
            "Password updated successfully!",
        });

        setTimeout(() => {
          closeModal();
        }, 1500);
      } else {
        setModalStatus({
          type: "error",
          message:
            data.message ||
            "Unable to update password.",
        });
      }
    } catch (error) {
      setModalStatus({
        type: "error",
        message:
          "Backend server is not running or password reset failed.",
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
                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 00-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                />
              </svg>

              <span>SCHOLAR PORTAL</span>

            </div>

          </div>

          {/* =================================================
              RIGHT PANEL
          ================================================= */}

          <div className="w-full md:w-1/2 bg-white px-8 md:px-12 lg:px-14 py-10 md:py-12 lg:py-14 flex flex-col justify-between">

            <div>

              {/* =================================================
                  ROLE SWITCHER
              ================================================= */}

              <div className="flex justify-end mb-8">

                <div className="relative bg-[#EAEFF5] p-1.5 rounded-lg flex items-center w-64">

                  <div
                    className={`absolute top-1.5 bottom-1.5 w-[calc(50%-6px)] bg-[#18263E] rounded-md shadow-sm transition-transform duration-500 ease-in-out ${
                      isMentor
                        ? "translate-x-[100%]"
                        : "translate-x-0"
                    }`}
                  />

                  {/* STUDENT */}

                  <button
                    type="button"
                    onClick={() =>
                      handleRoleChange("student")
                    }
                    className={`relative z-10 flex-1 flex items-center justify-center space-x-2 py-1.5 text-xs font-bold tracking-wider transition-colors duration-300 ${
                      !isMentor
                        ? "text-white"
                        : "text-slate-500 hover:text-slate-800"
                    }`}
                  >
                    <StudentIcon />

                    <span>STUDENT</span>
                  </button>

                  {/* MENTOR */}

                  <button
                    type="button"
                    onClick={() =>
                      handleRoleChange("mentor")
                    }
                    className={`relative z-10 flex-1 flex items-center justify-center space-x-2 py-1.5 text-xs font-bold tracking-wider transition-colors duration-300 ${
                      isMentor
                        ? "text-white"
                        : "text-slate-500 hover:text-slate-800"
                    }`}
                  >
                    <MentorIcon />

                    <span>MENTOR</span>
                  </button>

                </div>

              </div>

              {/* =================================================
                  TITLE
              ================================================= */}

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

              {/* =================================================
                  LOGIN FORM
              ================================================= */}

              <form
                onSubmit={handleSubmit}
                className="space-y-5"
              >

                {/* EMAIL */}

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
                      onChange={(event) =>
                        setEmail(event.target.value)
                      }
                      placeholder={
                        isMentor
                          ? "Enter faculty email"
                          : "Enter student email"
                      }
                      className="w-full rounded-lg border border-slate-200 bg-white pl-10 pr-4 py-2.5 text-sm text-slate-800 placeholder-slate-400 outline-none transition focus:border-slate-400 focus:ring-1 focus:ring-slate-400"
                    />

                  </div>

                </div>

                {/* PASSWORD */}

                <div>

                  <div className="mb-1.5 flex items-center justify-between">

                    <label
                      htmlFor="password"
                      className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider"
                    >
                      PASSWORD
                    </label>

                    {/* FORGOT PASSWORD */}

                    <button
                      type="button"
                      onClick={() => {
                        setIsForgotModalOpen(true);
                        setForgotStep(1);
                        setModalStatus({
                          type: "",
                          message: "",
                        });
                      }}
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
                      type={
                        showPassword
                          ? "text"
                          : "password"
                      }
                      required
                      autoComplete="current-password"
                      value={password}
                      onChange={(event) =>
                        setPassword(event.target.value)
                      }
                      placeholder="Enter your confidential password"
                      className="w-full rounded-lg border border-slate-200 bg-white pl-10 pr-10 py-2.5 text-sm text-slate-800 placeholder-slate-400 outline-none transition focus:border-slate-400 focus:ring-1 focus:ring-slate-400"
                    />

                    <button
                      type="button"
                      onClick={() =>
                        setShowPassword(!showPassword)
                      }
                      className="absolute right-3.5 flex items-center justify-center"
                    >
                      <EyeIcon
                        show={showPassword}
                      />
                    </button>

                  </div>

                </div>

                {/* =================================================
                    LOGIN BUTTON
                ================================================= */}

                <div className="relative mt-2">

                  <motion.button
                    type="submit"
                    disabled={isLoading}
                    whileTap={{ scale: 0.97 }}
                    className="relative w-full overflow-visible rounded-lg py-3 text-xs font-semibold text-white transition-all duration-200 bg-[#18263E] hover:bg-[#121C2E] flex items-center justify-center space-x-2 disabled:cursor-not-allowed disabled:opacity-50 shadow-md"
                  >

                    {showParticles && (
                      <SuccessParticles />
                    )}

                    <MousePointerClick className="w-4 h-4" />

                    <span>
                      {isLoading
                        ? "Signing in..."
                        : `Sign in as ${role}`}
                    </span>

                    {!isLoading && (
                      <span>&rarr;</span>
                    )}

                  </motion.button>

                </div>

              </form>

            </div>

          </div>

        </div>

        {/* =====================================================
            FOOTER LINKS
        ===================================================== */}

        <div className="w-full mt-4 flex flex-col md:flex-row items-center justify-between text-xs text-slate-100 px-2">

          <div className="flex items-center space-x-6">

            <a
              href="#about"
              className="hover:text-white transition"
            >
              About
            </a>

            <a
              href="#help"
              className="hover:text-white transition"
            >
              Help center
            </a>

            <a
              href="#terms"
              className="hover:text-white transition"
            >
              Terms of use
            </a>

            <a
              href="#privacy"
              className="hover:text-white transition"
            >
              Privacy policy
            </a>

          </div>

          <span className="mt-2 md:mt-0 text-slate-100">
            © 2026 Scholar Hub, Inc.
          </span>

        </div>

      </div>

      {/* =====================================================
          FORGOT PASSWORD MODAL
      ===================================================== */}

      {isForgotModalOpen && (

        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-sm">

          <div className="relative w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl border border-slate-100">

            {/* =================================================
                MODAL HEADER
            ================================================= */}

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

            {/* =================================================
                STATUS MESSAGE
            ================================================= */}

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

            {/* =================================================
                STEP 1 — EMAIL
            ================================================= */}

            {forgotStep === 1 && (

              <form
                onSubmit={handleSendOtp}
                className="mt-4 space-y-4"
              >

                <p className="text-xs text-slate-600 leading-relaxed">
                  Enter your registered institutional
                  email address ending with
                  <span className="font-semibold text-slate-800">
                    {" "}@rajalakshmi.edu.in
                  </span>{" "}
                  to receive a 6-digit OTP.
                </p>

                {/* EMAIL */}

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
                    autoFocus
                    value={resetEmail}
                    onChange={(event) =>
                      setResetEmail(event.target.value)
                    }
                    placeholder="name@rajalakshmi.edu.in"
                    className="w-full rounded-md border border-slate-200 px-3 py-2.5 text-xs outline-none focus:border-slate-400 focus:ring-1 focus:ring-slate-400"
                  />

                </div>

                {/* SEND OTP */}

                <button
                  type="submit"
                  disabled={isModalLoading}
                  className="w-full rounded-md bg-[#18263E] hover:bg-[#121C2E] py-2.5 text-xs font-semibold text-white shadow disabled:opacity-50 transition"
                >
                  {isModalLoading
                    ? "Sending OTP..."
                    : "Send OTP"}
                </button>

              </form>

            )}

            {/* =================================================
                STEP 2 — OTP
            ================================================= */}

            {forgotStep === 2 && (

              <form
                onSubmit={handleVerifyOtp}
                className="mt-5 space-y-5"
              >

                {/* OTP HEADER */}

                <div className="text-center">

                  <p className="text-sm font-semibold text-slate-800">
                    Verify your email
                  </p>

                  <p className="mt-1 text-xs text-slate-500 leading-relaxed">
                    We sent a 6-digit verification
                    code to
                  </p>

                  <p className="mt-1 text-xs font-semibold text-slate-700 break-all">
                    {resetEmail}
                  </p>

                </div>

                {/* =================================================
                    OTP INPUT
                ================================================= */}

                <div
                  className="flex justify-center"
                  onPaste={handleOtpPaste}
                >

                  <div className="flex items-center gap-2">

                    {[0, 1, 2, 3, 4, 5].map(
                      (index) => (
                        <input
                          key={index}
                          ref={(element) => {
                            otpRefs.current[index] =
                              element;
                          }}
                          id={`otp-${index}`}
                          type="text"
                          inputMode="numeric"
                          autoComplete={
                            index === 0
                              ? "one-time-code"
                              : "off"
                          }
                          maxLength={1}
                          value={otp[index] || ""}
                          onChange={(event) =>
                            handleOtpChange(
                              index,
                              event.target.value
                            )
                          }
                          onKeyDown={(event) =>
                            handleOtpKeyDown(
                              index,
                              event
                            )
                          }
                          className={`h-12 w-11 rounded-lg border text-center text-lg font-semibold text-slate-800 outline-none transition-all ${
                            otpError
                              ? "border-red-400 bg-red-50 focus:border-red-500 focus:ring-2 focus:ring-red-100"
                              : "border-slate-200 bg-white focus:border-[#18263E] focus:ring-2 focus:ring-slate-200"
                          }`}
                        />
                      )
                    )}

                  </div>

                </div>

                {/* OTP ERROR */}

                {otpError && (

                  <p className="text-center text-xs font-medium text-red-600">
                    {otpError}
                  </p>

                )}

                {/* VERIFY BUTTON */}

                <button
                  type="submit"
                  disabled={
                    isOtpVerifying ||
                    otp.length !== 6
                  }
                  className="w-full rounded-md bg-[#18263E] hover:bg-[#121C2E] py-2.5 text-xs font-semibold text-white shadow transition disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {isOtpVerifying
                    ? "Verifying OTP..."
                    : "Verify OTP"}
                </button>

                {/* RESEND */}

                <div className="text-center">

                  <button
                    type="button"
                    disabled={resendLoading}
                    onClick={handleResendOtp}
                    className="text-xs font-semibold text-slate-500 hover:text-slate-800 transition disabled:opacity-50"
                  >
                    {resendLoading
                      ? "Sending..."
                      : "Didn't receive the code? Resend OTP"}
                  </button>

                </div>

                {/* CHANGE EMAIL */}

                <button
                  type="button"
                  onClick={() => {
                    setForgotStep(1);
                    setOtp("");
                    setOtpError("");
                    setModalStatus({
                      type: "",
                      message: "",
                    });
                  }}
                  className="w-full text-xs text-slate-400 hover:text-slate-700 transition"
                >
                  ← Change email address
                </button>

              </form>

            )}

            {/* =================================================
                STEP 3 — NEW PASSWORD
            ================================================= */}

            {forgotStep === 3 && (

              <form
                onSubmit={handleResetPassword}
                className="mt-5 space-y-4"
              >

                <div className="mb-4">

                  <p className="text-sm font-semibold text-slate-800">
                    Create a new password
                  </p>

                  <p className="mt-1 text-xs text-slate-500 leading-relaxed">
                    Your OTP has been verified.
                    Enter your new password below.
                  </p>

                </div>

                {/* NEW PASSWORD */}

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
                    autoFocus
                    value={newPassword}
                    onChange={(event) =>
                      setNewPassword(
                        event.target.value
                      )
                    }
                    placeholder="Enter new strong password"
                    className="w-full rounded-md border border-slate-200 px-3 py-2.5 text-xs outline-none focus:border-slate-400 focus:ring-1 focus:ring-slate-400"
                  />

                  <p className="mt-1 text-[10px] text-slate-400">
                    Minimum 8 characters
                  </p>

                </div>

                {/* CONFIRM PASSWORD */}

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
                    onChange={(event) =>
                      setConfirmPassword(
                        event.target.value
                      )
                    }
                    placeholder="Re-enter new password"
                    className="w-full rounded-md border border-slate-200 px-3 py-2.5 text-xs outline-none focus:border-slate-400 focus:ring-1 focus:ring-slate-400"
                  />

                </div>

                {/* UPDATE PASSWORD */}

                <button
                  type="submit"
                  disabled={isModalLoading}
                  className="w-full rounded-md bg-[#18263E] hover:bg-[#121C2E] py-2.5 text-xs font-semibold text-white shadow disabled:opacity-50 transition"
                >
                  {isModalLoading
                    ? "Updating..."
                    : "Update Password"}
                </button>

              </form>

            )}

          </div>

        </div>

      )}

    </main>
  );
}