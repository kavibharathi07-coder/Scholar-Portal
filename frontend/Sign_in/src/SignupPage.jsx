import React, { useState } from 'react';

export default function AuthPage() {
  const [role, setRole] = useState('student');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const [status, setStatus] = useState({ type: '', message: '' });
  const [isLoading, setIsLoading] = useState(false);

  const handleRoleChange = (newRole) => {
    setRole(newRole);
    setStatus({ type: '', message: '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ type: '', message: '' });
    setIsLoading(true);

    try {
      // Example real-world fetch call:
      // const response = await fetch('/api/auth/login', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ email, password, requestedRole: role }),
      // });
      // const data = await response.json();

      // Simulated Async API Request
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Standard success handling
      setStatus({
        type: 'success',
        message: `Successfully authenticated! Redirecting to ${role} dashboard...`,
      });
    } catch (err) {
      setStatus({
        type: 'error',
        message: 'Invalid email or password. Please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100 px-4 py-12">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl">
        
        {/* Header */}
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900">Sign In</h2>
          <p className="mt-2 text-sm text-gray-600">
            Select your portal role to continue
          </p>
        </div>

        {/* Role Switcher */}
        <div className="mt-6 grid grid-cols-2 gap-2 rounded-xl bg-gray-100 p-1.5" role="tablist">
          <button
            type="button"
            role="tab"
            aria-selected={role === 'student'}
            onClick={() => handleRoleChange('student')}
            className={`flex items-center justify-center gap-2 rounded-lg py-2.5 text-sm font-semibold transition-all duration-200 ${
              role === 'student'
                ? 'bg-white text-indigo-600 shadow-sm'
                : 'text-gray-500 hover:text-gray-900'
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
              role === 'mentor'
                ? 'bg-white text-indigo-600 shadow-sm'
                : 'text-gray-500 hover:text-gray-900'
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
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              {role === 'mentor' ? 'Mentor Email' : 'Student Email'}
            </label>
            <input
              id="email"
              type="email"
              required
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={role === 'mentor' ? 'mentor@example.com' : 'student@example.com'}
              className="mt-1 block w-full rounded-lg border border-gray-300 px-3.5 py-2.5 text-gray-900 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 text-sm"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
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
    </div>
  );
}