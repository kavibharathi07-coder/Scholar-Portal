import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import React, { useState } from "react";
import { loginUser } from "../services/authService"; 
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
        <path
          d="M8 43L72 12L137 43L72 70L8 43Z"
          fill="#1E293B"
          stroke="#0F172A"
          strokeWidth="3.5"
          strokeLinejoin="round"
        />
        <path
          d="M12 43L72 15L133 43"
          stroke="#64748B"
          strokeWidth="2.5"
          opacity="0.9"
        />
        <path
          d="M38 57V91C57 103 88 103 107 91V57L72 72L38 57Z"
          fill="#334155"
          stroke="#0F172A"
          strokeWidth="3.5"
        />
        <path
          d="M38 91C57 80 88 80 107 91"
          stroke="#0F172A"
          strokeWidth="3.5"
        />
        <path
          d="M123 38V75"
          stroke="#F59E0B"
          strokeWidth="3.5"
          strokeLinecap="round"
        />
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
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M3 9l9-5 9 5-9 5-9-5Z" />
      <path d="M7 11v5c3 2 7 2 10 0v-5" />
      <path d="M21 10v6" />
    </svg>
  );
}

function MentorIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M4 19a8 8 0 0 1 16 0" />
      <circle cx="12" cy="7" r="4" />
      <path d="M8 19h8" />
    </svg>
  );
}

export default function AuthPage() {
  const [role, setRole] = useState('student');
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');

  const [status, setStatus] = useState({ type: '', message: '' });
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ type: '', message: '' });
    setIsLoading(true);

    try {
      const response = await fetch('http://localhost:5000/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          identifier: identifier,
          password: password,
          user_type: role,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || data.error || 'Invalid credentials');
      }

      // Check role mismatch if returned from backend
      if (data.user && data.user.role && data.user.role !== role) {
        setStatus({
          type: 'error',
          message: `This account is registered as a ${data.user.role}. Please switch tabs.`,
        });
        setIsLoading(false);
        return;
      }

      // Save auth details
      if (data.token) {
        localStorage.setItem('token', data.token);
      }
      if (data.user) {
        localStorage.setItem('user', JSON.stringify(data.user));
      }

      setStatus({
        type: 'success',
        message: 'Login successful! Redirecting...',
      });

      setTimeout(() => {
        const targetRole = data.user?.role || role;
        if (targetRole === 'student') {
          navigate('/student-dashboard');
        } else if (targetRole === 'mentor') {
          navigate('/mentor-dashboard');
        }
      }, 1000);
    } catch (err) {
      setStatus({
        type: 'error',
        message: err.message || 'Server error. Please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="relative flex min-h-screen items-center justify-center bg-slate-100 p-6 font-sans">
      <div className="relative w-full max-w-5xl rounded-2xl bg-white shadow-2xl flex flex-col md:flex-row overflow-hidden my-6">
        
        {/* Left Side Branding */}
        <div className="relative w-full md:w-1/2 bg-[#0F2137] text-white flex flex-col justify-between p-10 md:p-12 min-h-[450px]">
          <div className="relative z-10 text-center pt-4">
            <FixedGraduationCap />
            <h1 className="text-3xl font-serif tracking-widest font-bold uppercase border-b border-slate-600/50 pb-3 inline-block">
              Scholar Portal
            </h1>
          </div>

          <div className="relative z-10 text-center mt-auto">
            <div className="bg-[#132A4A]/90 backdrop-blur-sm p-6 rounded-2xl border border-slate-700/40">
              <h2 className="text-xl font-serif font-bold mb-2">Welcome Back</h2>
              <p className="text-xs text-slate-300 leading-relaxed">
                Access your academic resources and dashboard.
              </p>
            </div>
          </div>
        </div>

        {/* Right Side Form */}
        <div className="w-full md:w-1/2 bg-white p-8 md:p-12 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-8">
              <span className="font-bold text-slate-900 tracking-wider text-sm">SCHOLAR HUB</span>

              {/* Role Selector */}
              <div className="bg-[#1A2B4C] p-1 rounded-full flex items-center">
                <button
                  type="button"
                  onClick={() => setRole('student')}
                  className={`flex items-center space-x-1 px-3 py-1 rounded-full text-xs font-semibold transition-all ${
                    role === 'student'
                      ? 'bg-amber-600 text-white shadow-md'
                      : 'text-slate-300 hover:text-white'
                  }`}
                >
                  <StudentIcon />
                  <span>Student</span>
                </button>
                <button
                  type="button"
                  onClick={() => setRole('mentor')}
                  className={`flex items-center space-x-1 px-3 py-1 rounded-full text-xs font-semibold transition-all ${
                    role === 'mentor'
                      ? 'bg-amber-600 text-white shadow-md'
                      : 'text-slate-300 hover:text-white'
                  }`}
                >
                  <MentorIcon />
                  <span>Mentor</span>
                </button>
              </div>
            </div>

            <h2 className="text-2xl font-bold text-slate-900 font-serif mb-1">Sign In</h2>
            <p className="text-xs text-slate-500 mb-6 capitalize">
              Logging in as {role}
            </p>

            {/* Status Alert */}
            {status.message && (
              <div
                className={`mb-4 rounded-lg p-3 text-xs font-medium border ${
                  status.type === 'success'
                    ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                    : 'bg-red-50 text-red-700 border-red-200'
                }`}
              >
                {status.message}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Username or Email
                </label>
                <input
                  type="text"
                  required
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  placeholder={
                    role === 'mentor'
                      ? 'mentor_username or email'
                      : 'student_username or email'
                  }
                  className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm text-slate-900 outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Password
                </label>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm text-slate-900 outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full rounded-md py-2.5 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 transition disabled:opacity-50"
              >
                {isLoading ? 'Verifying...' : `Sign In as ${role === 'mentor' ? 'Mentor' : 'Student'}`}
              </button>
            </form>
          </div>
        </div>

      </div>
    </main>
  );
}