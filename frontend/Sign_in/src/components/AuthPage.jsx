import React, { useState } from 'react';

export default function AuthPage() {
  const [role, setRole] = useState('student');
  const [identifier, setIdentifier] = useState(''); // Email input field
  const [password, setPassword] = useState('');

  const [status, setStatus] = useState({ type: '', message: '' });
  const [isLoading, setIsLoading] = useState(false);

  // Forgot Password Modal States
  const [isForgotModalOpen, setIsForgotModalOpen] = useState(false);
  const [forgotStep, setForgotStep] = useState(1);
  const [resetEmail, setResetEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [modalStatus, setModalStatus] = useState({ type: '', message: '' });
  const [isModalLoading, setIsModalLoading] = useState(false);

  const handleRoleChange = (newRole) => {
    setRole(newRole);
    setStatus({ type: '', message: '' });
  };

  // Main Sign-In Handler (Connected to Flask Backend)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ type: '', message: '' });
    setIsLoading(true);

    try {
      // API call to your Flask backend login endpoint
      const response = await fetch('http://localhost:5000/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: identifier,
          password: password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Login failed');
      }

      // Check role authorization on the client side if needed
      if (data.user && data.user.role !== role) {
        setStatus({
          type: 'error',
          message: `Role mismatch: This account is registered as a ${data.user.role}.`,
        });
        return;
      }

      // Store user data in localStorage for session state management
      localStorage.setItem('user', JSON.stringify(data.user));

      setStatus({
        type: 'success',
        message: `Login successful! Welcome ${data.user.name}. Redirecting...`,
      });
    } catch (err) {
      setStatus({
        type: 'error',
        message: err.message || 'Invalid email or password.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Modal Step 1: Send OTP
  const handleSendOtp = async (e) => {
    e.preventDefault();
    setModalStatus({ type: '', message: '' });
    setIsModalLoading(true);

    try {
      const response = await fetch('http://localhost:5000/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: resetEmail }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to send OTP');
      }

      setForgotStep(2);
      setModalStatus({
        type: 'success',
        message: `An OTP has been sent to ${resetEmail}`,
      });
    } catch (err) {
      setModalStatus({
        type: 'error',
        message: err.message || 'Failed to send OTP. Please ensure the email is registered.',
      });
    } finally {
      setIsModalLoading(false);
    }
  };

  // Modal Step 2: Confirm New Password
  const handleResetPassword = async (e) => {
    e.preventDefault();
    setModalStatus({ type: '', message: '' });

    if (newPassword !== confirmPassword) {
      setModalStatus({ type: 'error', message: 'Passwords do not match.' });
      return;
    }

    setIsModalLoading(true);

    try {
      const response = await fetch('http://localhost:5000/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: resetEmail, otp, newPassword }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to update password');
      }

      setModalStatus({
        type: 'success',
        message: 'Password successfully updated! Closing modal...',
      });

      setTimeout(() => {
        closeModal();
      }, 1500);
    } catch (err) {
      setModalStatus({
        type: 'error',
        message: err.message || 'Invalid OTP or failed to update password. Try again.',
      });
    } finally {
      setIsModalLoading(false);
    }
  };

  const closeModal = () => {
    setIsForgotModalOpen(false);
    setForgotStep(1);
    setResetEmail('');
    setOtp('');
    setNewPassword('');
    setConfirmPassword('');
    setModalStatus({ type: '', message: '' });
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100 px-4 py-12">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl">
        {/* Header */}
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900">Sign In</h2>
          <p className="mt-2 text-sm text-gray-600">Select your portal role to continue</p>
        </div>

        {/* Role Switcher */}
        <div className="mt-6 grid grid-cols-2 gap-2 rounded-xl bg-gray-100 p-1.5" role="tablist">
          <button
            type="button"
            role="tab"
            aria-selected={role === 'student'}
            onClick={() => handleRoleChange('student')}
            className={`flex items-center justify-center gap-2 rounded-lg py-2.5 text-sm font-semibold transition-all duration-200 ${
              role === 'student' ? 'bg-white text-indigo-600 shadow-sm' : 'text-gray-500 hover:text-gray-900'
            }`}
          >
            🎓 Student
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={role === 'mentor'}
            onClick={() => handleRoleChange('mentor')}
            className={`flex items-center justify-center gap-2 rounded-lg py-2.5 text-sm font-semibold transition-all duration-200 ${
              role === 'mentor' ? 'bg-white text-indigo-600 shadow-sm' : 'text-gray-500 hover:text-gray-900'
            }`}
          >
            👨‍🏫 Mentor
          </button>
        </div>

        {/* Status Banner */}
        {status.message && (
          <div
            aria-live="polite"
            className={`mt-4 rounded-lg p-3 text-sm font-medium ${
              status.type === 'success'
                ? 'bg-green-50 text-green-700 border border-green-200'
                : 'bg-red-50 text-red-700 border border-red-200'
            }`}
          >
            {status.message}
          </div>
        )}

        {/* Form */}
        <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="identifier" className="block text-sm font-medium text-gray-700">
              Email Address
            </label>
            <input
              id="identifier"
              type="email"
              required
              autoComplete="username"
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              placeholder={role === 'mentor' ? 'mentor@example.com' : 'student@example.com'}
              className="mt-1 block w-full rounded-lg border border-gray-300 px-3.5 py-2.5 text-gray-900 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 text-sm"
            />
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <button
                type="button"
                onClick={() => setIsForgotModalOpen(true)}
                className="text-xs font-semibold text-indigo-600 hover:text-indigo-500 focus:outline-none"
              >
                Forgot Password?
              </button>
            </div>
            <input
              id="password"
              type="password"
              required
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="mt-1 block w-full rounded-lg border border-gray-300 px-3.5 py-2.5 text-gray-900 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 text-sm"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full rounded-lg bg-indigo-600 py-3 text-sm font-semibold text-white shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-all disabled:opacity-50"
          >
            {isLoading ? 'Signing In...' : `Sign In as ${role === 'mentor' ? 'Mentor' : 'Student'}`}
          </button>
        </form>
      </div>

      {/* Forgot Password Modal */}
      {isForgotModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
          <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-2xl transition-all">
            <div className="flex items-center justify-between border-b pb-3">
              <h3 className="text-lg font-bold text-gray-900">Reset Password</h3>
              <button
                type="button"
                onClick={closeModal}
                className="text-gray-400 hover:text-gray-600 text-xl font-semibold leading-none"
              >
                &times;
              </button>
            </div>

            {modalStatus.message && (
              <div
                className={`mt-4 rounded-lg p-2.5 text-xs font-medium ${
                  modalStatus.type === 'success'
                    ? 'bg-green-50 text-green-700 border border-green-200'
                    : 'bg-red-50 text-red-700 border border-red-200'
                }`}
              >
                {modalStatus.message}
              </div>
            )}

            {/* STEP 1: Enter Email to Send OTP */}
            {forgotStep === 1 && (
              <form onSubmit={handleSendOtp} className="mt-4 space-y-4">
                <p className="text-xs text-gray-600">
                  Enter your registered email address to receive an OTP code.
                </p>
                <div>
                  <label htmlFor="resetEmail" className="block text-xs font-medium text-gray-700">
                    Email Address
                  </label>
                  <input
                    id="resetEmail"
                    type="email"
                    required
                    value={resetEmail}
                    onChange={(e) => setResetEmail(e.target.value)}
                    placeholder="user@example.com"
                    className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  />
                </div>
                <button
                  type="submit"
                  disabled={isModalLoading}
                  className="w-full rounded-lg bg-indigo-600 py-2.5 text-xs font-semibold text-white shadow hover:bg-indigo-700 disabled:opacity-50"
                >
                  {isModalLoading ? 'Sending OTP...' : 'Send OTP'}
                </button>
              </form>
            )}

            {/* STEP 2: Enter OTP & New Passwords */}
            {forgotStep === 2 && (
              <form onSubmit={handleResetPassword} className="mt-4 space-y-3">
                <div>
                  <label htmlFor="otp" className="block text-xs font-medium text-gray-700">
                    OTP Code
                  </label>
                  <input
                    id="otp"
                    type="text"
                    required
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    placeholder="Enter OTP"
                    className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  />
                </div>

                <div>
                  <label htmlFor="newPassword" className="block text-xs font-medium text-gray-700">
                    New Password
                  </label>
                  <input
                    id="newPassword"
                    type="password"
                    required
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="••••••••"
                    className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  />
                </div>

                <div>
                  <label htmlFor="confirmPassword" className="block text-xs font-medium text-gray-700">
                    Confirm Password
                  </label>
                  <input
                    id="confirmPassword"
                    type="password"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="••••••••"
                    className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isModalLoading}
                  className="w-full rounded-lg bg-indigo-600 py-2.5 text-xs font-semibold text-white shadow hover:bg-indigo-700 disabled:opacity-50"
                >
                  {isModalLoading ? 'Confirming...' : 'Confirm'}
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}