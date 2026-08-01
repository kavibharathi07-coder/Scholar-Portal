import React from 'react';

export default function MentorDashboard({ currentUser, tasks, onLogout }) {
  return (
    <div className="min-h-screen bg-slate-100 p-4 md:p-8">
      <div className="mx-auto max-w-4xl space-y-6">
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 rounded-2xl bg-white p-6 shadow-md border border-slate-200">
          <div>
            <div className="flex items-center gap-2">
              <span className="rounded-md bg-purple-100 px-2.5 py-1 text-xs font-semibold text-purple-700 uppercase">
                Mentor Portal
              </span>
              <span className="text-xs text-gray-400">ID: {currentUser.id}</span>
            </div>
            <h1 className="mt-1 text-2xl font-bold text-gray-900">Welcome, {currentUser.name}</h1>
            <p className="text-sm text-gray-500">Review student task submissions and monitor completion rates.</p>
          </div>
          <button
            onClick={onLogout}
            className="self-start md:self-auto rounded-lg border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-all"
          >
            Sign Out
          </button>
        </div>

        <div className="rounded-2xl bg-white p-6 shadow-md border border-slate-200">
          <h2 className="text-lg font-bold text-gray-900 mb-2">Student Submissions</h2>
          <p className="text-sm text-gray-600 mb-4">Assigned Student: <strong>Alex Johnson (S-202)</strong></p>

          <div className="rounded-xl border border-gray-200 divide-y divide-gray-200">
            {tasks.map((task) => (
              <div key={task.id} className="p-4 flex items-center justify-between text-sm">
                <div>
                  <span className="font-semibold text-gray-900">{task.day}: </span>
                  <span className="text-gray-700">{task.title}</span>
                </div>
                <div>
                  {task.proofName ? (
                    <span className="inline-flex items-center gap-1 rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                      Verified ({task.proofType})
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 rounded-full bg-yellow-100 px-2.5 py-0.5 text-xs font-medium text-yellow-800">
                      Pending
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}