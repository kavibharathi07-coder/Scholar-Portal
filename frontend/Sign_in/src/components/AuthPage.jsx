import React, { useState } from 'react';
import { MOCK_DATABASE } from '../data/mockData';

export default function AuthPage({ onLoginSuccess }) {
  const [role, setRole] = useState('student');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState({ type: '', message: '' });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus({ type: '', message: '' });
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);

      const targetDbGroup = role === 'mentor' ? MOCK_DATABASE.mentors : MOCK_DATABASE.students;
      const otherDbGroup = role === 'mentor' ? MOCK_DATABASE.students : MOCK_DATABASE.mentors;

      const userMatch = targetDbGroup.find(
        (user) => user.email === email && user.password === password
      );

      if (userMatch) {
        setStatus({
          type: 'success',
          message: `Welcome back, ${userMatch.name}! Logged in as a ${role.toUpperCase()}.`,
        });
        setTimeout(() => {
          onLoginSuccess({ ...userMatch, role });
        }, 600);
        return;
      }

      const wrongRoleMatch = otherDbGroup.find(
        (user) => user.email === email && user.password === password
      );

      if (wrongRoleMatch) {
        const actualRole = role === 'mentor' ? 'Student' : 'Mentor';
        setStatus({
          type: 'error',
          message: `Access Denied: This account is registered as a ${actualRole}. Please select the correct tab above.`,
        });
        return;
      }

      setStatus({
        type: 'error',
        message: `Invalid email or password for ${role} login.`,
      });
    }, 1000);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100 px-4 py-12">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900">Sign In</h2>
          <p className="mt-2 text-sm text-gray-600">Select your portal role to continue</p>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-2 rounded-xl bg-gray-100 p-1.5">
          <button
            type="button"
            onClick={() => { setRole('student'); setStatus({ type: '', message: '' }); }}
            className={`flex items-center justify-center gap-2 rounded-lg py-2.5 text-sm font-semibold transition-all duration-200 ${
              role === 'student' ? 'bg-white text-indigo-600 shadow-sm' : 'text-gray-500 hover:text-gray-900'
            }`}
          >
            🎓 Student
          </button>
          <button
            type="button"
            onClick={() => { setRole('mentor'); setStatus({ type: '', message: '' }); }}
            className={`flex items-center justify-center gap-2 rounded-lg py-2.5 text-sm font-semibold transition-all duration-200 ${
              role === 'mentor' ? 'bg-white text-indigo-600 shadow-sm' : 'text-gray-500 hover:text-gray-900'
            }`}
          >
            👨‍🏫 Mentor
          </button>
        </div>

        {status.message && (
          <div className={`mt-4 rounded-lg p-3 text-sm font-medium ${
            status.type === 'success' ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-red-50 text-red-700 border border-red-200'
          }`}>
            {status.message}
          </div>
        )}

        <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              {role === 'mentor' ? 'Mentor Email' : 'Student Email'}
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={role === 'mentor' ? 'mentor@example.com' : 'student@example.com'}
              className="mt-1 block w-full rounded-lg border border-gray-300 px-3.5 py-2.5 text-gray-900 shadow-sm focus:border-indigo-500 focus:outline-none text-sm"
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
              className="mt-1 block w-full rounded-lg border border-gray-300 px-3.5 py-2.5 text-gray-900 shadow-sm focus:border-indigo-500 focus:outline-none text-sm"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full rounded-lg bg-indigo-600 py-3 text-sm font-semibold text-white shadow-md hover:bg-indigo-700 transition-all disabled:opacity-50"
          >
            {isLoading ? 'Checking Credentials...' : `Sign In as ${role === 'mentor' ? 'Mentor' : 'Student'}`}
          </button>
        </form>

        <div className="mt-6 rounded-lg bg-gray-50 p-3 text-xs text-gray-500 border border-gray-200">
          <p className="font-semibold text-gray-700 mb-1">Testing Credentials:</p>
          <p>• <strong>Student:</strong> student@example.com / password123</p>
          <p>• <strong>Mentor:</strong> mentor@example.com / password123</p>
        </div>
      </div>
    </div>
  );
}