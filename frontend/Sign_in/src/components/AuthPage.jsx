import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AuthPage() {
  const [role, setRole] = useState('student');
  const [identifier, setIdentifier] = useState(''); // Stores Username OR Email
  const [password, setPassword] = useState('');

  const [status, setStatus] = useState({ type: '', message: '' });
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ type: '', message: '' });
    setIsLoading(true);

    try {
      // Send 'identifier' instead of 'email' to backend
      const response = await fetch('http://localhost:5000/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          identifier: identifier,
          password: password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Invalid credentials');
      }

      // Check role mismatch
      if (data.user.role !== role) {
        setStatus({
          type: 'error',
          message: `This account is registered as a ${data.user.role}. Please switch tabs.`,
        });
        setIsLoading(false);
        return;
      }

      // Save user info in localStorage
      localStorage.setItem('user', JSON.stringify(data.user));

      setStatus({
        type: 'success',
        message: 'Login successful! Redirecting to dashboard...',
      });

      // Redirect based on role
      setTimeout(() => {
        if (data.user.role === 'student') {
          navigate('/student-dashboard');
        } else if (data.user.role === 'mentor') {
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
    <div className="flex min-h-screen items-center justify-center bg-slate-100 px-4 py-12">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900">Sign In</h2>
          <p className="mt-2 text-sm text-gray-600">Select your portal role to continue</p>
        </div>

        {/* Role Switcher */}
        <div className="mt-6 grid grid-cols-2 gap-2 rounded-xl bg-gray-100 p-1.5">
          <button
            type="button"
            onClick={() => setRole('student')}
            className={`py-2.5 text-sm font-semibold rounded-lg transition-all ${
              role === 'student' ? 'bg-white text-indigo-600 shadow-sm' : 'text-gray-500'
            }`}
          >
            🎓 Student
          </button>
          <button
            type="button"
            onClick={() => setRole('mentor')}
            className={`py-2.5 text-sm font-semibold rounded-lg transition-all ${
              role === 'mentor' ? 'bg-white text-indigo-600 shadow-sm' : 'text-gray-500'
            }`}
          >
            👨‍🏫 Mentor
          </button>
        </div>

        {/* Status Message */}
        {status.message && (
          <div
            className={`mt-4 rounded-lg p-3 text-sm font-medium ${
              status.type === 'success'
                ? 'bg-green-50 text-green-700 border border-green-200'
                : 'bg-red-50 text-red-700 border border-red-200'
            }`}
          >
            {status.message}
          </div>
        )}

        {/* Login Form */}
        <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-gray-700">Username or Email</label>
            <input
              type="text"
              required
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              placeholder={role === 'mentor' ? 'mentor_username or email' : 'student_username or email'}
              className="mt-1 block w-full rounded-lg border border-gray-300 px-3.5 py-2.5 text-gray-900 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="mt-1 block w-full rounded-lg border border-gray-300 px-3.5 py-2.5 text-gray-900 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 text-sm"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full rounded-lg bg-indigo-600 py-3 text-sm font-semibold text-white shadow-md hover:bg-indigo-700 transition-all disabled:opacity-50"
          >
            {isLoading ? 'Verifying...' : `Sign In as ${role === 'mentor' ? 'Mentor' : 'Student'}`}
          </button>
        </form>
      </div>
    </div>
  );
}