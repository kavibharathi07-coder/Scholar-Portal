import React from 'react';

export default function StudentDashboard({ currentUser, tasks, setTasks, onLogout }) {
  const completedCount = tasks.filter((t) => t.completed).length;
  const progressPercent = Math.round((completedCount / tasks.length) * 100);

  const toggleTaskCompletion = (taskId) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const handleFileUpload = (taskId, e, type) => {
    const file = e.target.files[0];
    if (file) {
      setTasks((prev) =>
        prev.map((task) =>
          task.id === taskId
            ? { ...task, proofType: type, proofName: file.name, completed: true }
            : task
        )
      );
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 p-4 md:p-8">
      <div className="mx-auto max-w-4xl space-y-6">
        
        {/* Header Card */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 rounded-2xl bg-white p-6 shadow-md border border-slate-200">
          <div>
            <div className="flex items-center gap-2">
              <span className="rounded-md bg-indigo-100 px-2.5 py-1 text-xs font-semibold text-indigo-700 uppercase">
                Student Portal
              </span>
              <span className="text-xs text-gray-400">ID: {currentUser.id}</span>
            </div>
            <h1 className="mt-1 text-2xl font-bold text-gray-900">Welcome, {currentUser.name}</h1>
            <p className="text-sm text-gray-500">Track your weekly learning milestones and submit task verification.</p>
          </div>
          <button
            onClick={onLogout}
            className="self-start md:self-auto rounded-lg border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-all"
          >
            Sign Out
          </button>
        </div>

        {/* Progress Overview Card */}
        <div className="rounded-2xl bg-white p-6 shadow-md border border-slate-200">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-lg font-bold text-gray-800">Weekly Progress</h2>
            <span className="text-sm font-semibold text-indigo-600">{completedCount} of 5 Tasks Completed ({progressPercent}%)</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div 
              className="bg-indigo-600 h-3 rounded-full transition-all duration-500" 
              style={{ width: `${progressPercent}%` }}
            ></div>
          </div>
        </div>

        {/* 5-Day Weekly Checklist */}
        <div className="rounded-2xl bg-white p-6 shadow-md border border-slate-200">
          <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            📅 5-Day Task Checklist
          </h2>

          <div className="space-y-4">
            {tasks.map((task) => (
              <div 
                key={task.id} 
                className={`p-4 rounded-xl border transition-all ${
                  task.completed ? 'bg-indigo-50/40 border-indigo-200' : 'bg-white border-gray-200'
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-start gap-3">
                    <input
                      type="checkbox"
                      checked={task.completed}
                      onChange={() => toggleTaskCompletion(task.id)}
                      className="mt-1 h-5 w-5 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer"
                    />
                    <div>
                      <span className="text-xs font-bold text-indigo-600 uppercase tracking-wide">{task.day}</span>
                      <h3 className={`text-base font-semibold ${task.completed ? 'line-through text-gray-500' : 'text-gray-900'}`}>
                        {task.title}
                      </h3>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-xs">
                    {task.proofName ? (
                      <div className="flex items-center gap-1.5 rounded-lg bg-emerald-100 px-3 py-1.5 text-emerald-800 font-medium">
                        <span>{task.proofType === 'photo' ? '📷' : '📁'}</span>
                        <span className="truncate max-w-[150px]">{task.proofName}</span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <label className="cursor-pointer rounded-lg border border-gray-300 bg-white px-2.5 py-1.5 font-medium text-gray-700 hover:bg-gray-50 shadow-sm">
                          📷 Photo
                          <input 
                            type="file" 
                            accept="image/*" 
                            className="hidden" 
                            onChange={(e) => handleFileUpload(task.id, e, 'photo')} 
                          />
                        </label>
                        <label className="cursor-pointer rounded-lg border border-gray-300 bg-white px-2.5 py-1.5 font-medium text-gray-700 hover:bg-gray-50 shadow-sm">
                          📁 Code / Folder
                          <input 
                            type="file" 
                            className="hidden" 
                            onChange={(e) => handleFileUpload(task.id, e, 'code')} 
                          />
                        </label>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}