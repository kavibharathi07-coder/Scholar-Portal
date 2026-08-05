import React, { useState } from 'react';

const WEEKDAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

// Helper function to get current weekday name (Monday-Friday)
const getCurrentWeekday = () => {
  const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const today = dayNames[new Date().getDay()];
  
  // If weekend, default to Friday or Monday depending on workflow (defaulting to Monday here)
  return WEEKDAYS.includes(today) ? today : 'Monday';
};

// Helper function to check if a day is before today in the weekday sequence
const isPastDay = (dayName) => {
  const todayName = getCurrentWeekday();
  const currentIndex = WEEKDAYS.indexOf(todayName);
  const targetIndex = WEEKDAYS.indexOf(dayName);

  // If today is a weekend, all standard weekdays are considered past
  const currentDayIndexInWeek = new Date().getDay();
  if (currentDayIndexInWeek === 0 || currentDayIndexInWeek === 6) {
    return true; 
  }

  return targetIndex < currentIndex;
};

const INITIAL_TASKS = {
  Monday: [
    { id: 1, title: 'Complete Math Exercise 4.2', completed: true, locked: false, proofName: 'math_homework.pdf', proofType: 'pdf', proofUrl: '#' },
    { id: 2, title: 'Physics Lab Report Submission', completed: false, locked: false, proofName: null, proofType: null, proofUrl: null },
  ],
  Tuesday: [
    { id: 3, title: 'Read English Literature Chapter 3', completed: true, locked: false, proofName: 'chapter_notes.png', proofType: 'image', proofUrl: '#' },
  ],
  Wednesday: [
    { id: 4, title: 'Computer Science Algorithm Assignment', completed: false, locked: false, proofName: null, proofType: null, proofUrl: null },
  ],
  Thursday: [
    { id: 5, title: 'Chemistry Quiz Preparation', completed: false, locked: false, proofName: null, proofType: null, proofUrl: null },
  ],
  Friday: [
    { id: 6, title: 'Weekly Essay Submission', completed: false, locked: false, proofName: null, proofType: null, proofUrl: null },
  ],
};

export default function StudentDashboard() {
  const [selectedDay, setSelectedDay] = useState(getCurrentWeekday());
  const [tasks, setTasks] = useState(INITIAL_TASKS);
  const [newTaskTitle, setNewTaskTitle] = useState('');

  // State for Pop-up Modal Confirmation
  const [confirmModal, setConfirmModal] = useState({
    isOpen: false,
    taskId: null,
    actionType: null, // 'TOGGLE' or 'UPLOAD'
    pendingFile: null,
  });

  const isSelectedDayPast = isPastDay(selectedDay);
  const currentDayTasks = tasks[selectedDay] || [];
  const completedCount = currentDayTasks.filter((t) => t.completed).length;
  const progressPercent = currentDayTasks.length
    ? Math.round((completedCount / currentDayTasks.length) * 100)
    : 0;

  // Add new task
  const handleAddTask = (e) => {
    e.preventDefault();
    if (!newTaskTitle.trim() || isSelectedDayPast) return;

    const newTask = {
      id: Date.now(),
      title: newTaskTitle.trim(),
      completed: false,
      locked: false,
      proofName: null,
      proofType: null,
      proofUrl: null,
    };

    setTasks((prev) => ({
      ...prev,
      [selectedDay]: [...prev[selectedDay], newTask],
    }));

    setNewTaskTitle('');
  };

  // Trigger Confirmation Modal for Checkbox
  const triggerToggleConfirm = (task) => {
    if (task.locked || isSelectedDayPast) return; // Prevent changing if locked or day has passed
    setConfirmModal({
      isOpen: true,
      taskId: task.id,
      actionType: 'TOGGLE',
      pendingFile: null,
    });
  };

  // Trigger Confirmation Modal for File Upload
  const triggerFileUploadConfirm = (taskId, event) => {
    if (isSelectedDayPast) return;

    const file = event.target.files[0];
    if (!file) return;

    const isPdf = file.type === 'application/pdf';
    const isImage = file.type.startsWith('image/');

    if (!isPdf && !isImage) {
      alert('Please upload an image file (PNG/JPG) or a PDF.');
      return;
    }

    setConfirmModal({
      isOpen: true,
      taskId: taskId,
      actionType: 'UPLOAD',
      pendingFile: file,
    });
    
    // Reset file input value so user can select again if canceled
    event.target.value = '';
  };

  // Execute action AFTER user confirms in pop-up
  const handleConfirmAction = () => {
    const { taskId, actionType, pendingFile } = confirmModal;

    setTasks((prev) => ({
      ...prev,
      [selectedDay]: prev[selectedDay].map((task) => {
        if (task.id !== taskId) return task;

        if (actionType === 'TOGGLE') {
          return {
            ...task,
            completed: !task.completed,
            locked: true, // Lock task permanently once confirmed
          };
        }

        if (actionType === 'UPLOAD' && pendingFile) {
          const isPdf = pendingFile.type === 'application/pdf';
          const fileUrl = URL.createObjectURL(pendingFile);
          return {
            ...task,
            proofName: pendingFile.name,
            proofType: isPdf ? 'pdf' : 'image',
            proofUrl: fileUrl,
            completed: true,
            locked: true, // Lock task permanently once confirmed
          };
        }

        return task;
      }),
    }));

    // Close Modal
    setConfirmModal({ isOpen: false, taskId: null, actionType: null, pendingFile: null });
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 p-4 sm:p-6 md:p-10 font-sans relative">
      <div className="max-w-6xl mx-auto space-y-6">
        
        {/* Header */}
        <header className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Student Task Dashboard</h1>
            <p className="text-slate-500 text-sm mt-1">
              Submit proof and confirm your tasks. Past days are automatically locked once the next day begins.
            </p>
          </div>
          <div className="flex items-center gap-3 bg-indigo-50 text-indigo-700 px-4 py-2 rounded-xl border border-indigo-100">
            <span className="font-semibold text-sm">Active Day:</span>
            <span className="font-bold">{selectedDay}</span>
            {isSelectedDayPast && (
              <span className="text-xs bg-amber-100 text-amber-800 font-semibold px-2 py-0.5 rounded ml-1">
                Locked (Past Day)
              </span>
            )}
          </div>
        </header>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          
          {/* Weekday Selector */}
          <aside className="lg:col-span-1 bg-white rounded-2xl p-4 shadow-sm border border-slate-200">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-slate-400 px-3 mb-3">
              Weekdays
            </h2>
            <nav className="space-y-1">
              {WEEKDAYS.map((day) => {
                const dayTasks = tasks[day] || [];
                const dayCompleted = dayTasks.filter((t) => t.completed).length;
                const isSelected = selectedDay === day;
                const isPast = isPastDay(day);

                return (
                  <button
                    key={day}
                    onClick={() => setSelectedDay(day)}
                    className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all text-left font-medium text-sm ${
                      isSelected
                        ? 'bg-indigo-600 text-white shadow-md shadow-indigo-200'
                        : isPast
                        ? 'text-slate-400 bg-slate-50 hover:bg-slate-100'
                        : 'text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      {day}
                      {isPast && <span className="text-xs" title="Day locked">🔒</span>}
                    </span>
                    <span
                      className={`text-xs px-2 py-0.5 rounded-full ${
                        isSelected
                          ? 'bg-indigo-500 text-white'
                          : 'bg-slate-200 text-slate-600'
                      }`}
                    >
                      {dayCompleted}/{dayTasks.length}
                    </span>
                  </button>
                );
              })}
            </nav>
          </aside>

          {/* Right Area */}
          <main className="lg:col-span-3 bg-white rounded-2xl p-6 shadow-sm border border-slate-200 space-y-6">
            
            {/* Top Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
              <div>
                <h2 className="text-xl font-bold text-slate-900">{selectedDay}'s Schedule</h2>
                <p className="text-sm text-slate-500">
                  {currentDayTasks.length} {currentDayTasks.length === 1 ? 'task' : 'tasks'} total
                </p>
              </div>

              <div className="w-full sm:w-48 bg-slate-100 p-2.5 rounded-xl border border-slate-200">
                <div className="flex justify-between text-xs font-medium text-slate-600 mb-1">
                  <span>Completed</span>
                  <span>{progressPercent}%</span>
                </div>
                <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-indigo-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Add Task Form */}
            <form onSubmit={handleAddTask} className="flex gap-2">
              <input
                type="text"
                placeholder={
                  isSelectedDayPast
                    ? `Cannot add tasks to past days`
                    : `Add a task for ${selectedDay}...`
                }
                value={newTaskTitle}
                disabled={isSelectedDayPast}
                onChange={(e) => setNewTaskTitle(e.target.value)}
                className="flex-1 px-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white disabled:opacity-50 disabled:cursor-not-allowed"
              />
              <button
                type="submit"
                disabled={isSelectedDayPast}
                className="bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Add Task
              </button>
            </form>

            {/* Task List */}
            <div className="space-y-4">
              {currentDayTasks.length === 0 ? (
                <div className="text-center py-12 border-2 border-dashed border-slate-200 rounded-2xl">
                  <p className="text-slate-400 text-sm">No tasks added for {selectedDay} yet.</p>
                </div>
              ) : (
                currentDayTasks.map((task) => {
                  const isTaskLocked = task.locked || isSelectedDayPast;

                  return (
                    <div
                      key={task.id}
                      className={`p-4 rounded-xl border transition-all ${
                        isTaskLocked
                          ? 'bg-slate-100/70 border-slate-200'
                          : 'bg-white border-slate-200 hover:border-indigo-200'
                      }`}
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        
                        {/* Checkbox and Task Title */}
                        <div className="flex items-start gap-3">
                          <input
                            type="checkbox"
                            checked={task.completed}
                            disabled={isTaskLocked}
                            onChange={() => triggerToggleConfirm(task)}
                            className={`mt-1 h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 ${
                              isTaskLocked ? 'cursor-not-allowed opacity-60' : 'cursor-pointer'
                            }`}
                          />
                          <div>
                            <p
                              className={`text-sm font-medium ${
                                task.completed ? 'line-through text-slate-400' : 'text-slate-800'
                              }`}
                            >
                              {task.title}
                            </p>
                            <div className="flex items-center gap-2 mt-1">
                              <span
                                className={`text-[11px] font-semibold px-2 py-0.5 rounded ${
                                  task.completed
                                    ? 'bg-emerald-100 text-emerald-700'
                                    : 'bg-amber-100 text-amber-700'
                                }`}
                              >
                                {task.completed ? 'Completed' : 'Pending'}
                              </span>

                              {isTaskLocked && (
                                <span className="text-[11px] font-semibold px-2 py-0.5 rounded bg-slate-200 text-slate-600 flex items-center gap-1">
                                  🔒 Locked {isSelectedDayPast ? '(Past Day)' : ''}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>

                        {/* Proof File Area */}
                        <div className="flex items-center gap-2 self-start sm:self-center">
                          {task.proofName ? (
                            <div className="flex items-center gap-2 bg-indigo-50 border border-indigo-200 px-3 py-1.5 rounded-lg text-xs font-medium text-indigo-900">
                              <span className="uppercase font-bold text-[10px] px-1.5 py-0.5 rounded bg-indigo-200 text-indigo-800">
                                {task.proofType}
                              </span>
                              <span className="max-w-[140px] truncate" title={task.proofName}>
                                {task.proofName}
                              </span>
                              {task.proofUrl && task.proofUrl !== '#' && (
                                <a
                                  href={task.proofUrl}
                                  target="_blank"
                                  rel="noreferrer"
                                  className="text-indigo-600 hover:underline font-semibold ml-1"
                                >
                                  View
                                </a>
                              )}
                            </div>
                          ) : isTaskLocked ? (
                            <span className="text-xs text-slate-400 italic">No proof attached</span>
                          ) : (
                            <label className="cursor-pointer bg-slate-100 hover:bg-slate-200 border border-slate-300 text-slate-700 text-xs font-medium px-3 py-2 rounded-lg transition flex items-center gap-1.5">
                              <span>Upload Proof</span>
                              <input
                                type="file"
                                accept="image/*,.pdf"
                                onChange={(e) => triggerFileUploadConfirm(task.id, e)}
                                className="hidden"
                              />
                            </label>
                          )}
                        </div>

                      </div>
                    </div>
                  );
                })
              )}
            </div>

          </main>
        </div>

      </div>

      {/* POP-UP CONFIRMATION MODAL */}
      {confirmModal.isOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-100 space-y-4 animate-in fade-in zoom-in duration-150">
            <div className="flex items-center gap-3 text-amber-600">
              <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center text-lg font-bold">
                ⚠️
              </div>
              <h3 className="text-lg font-bold text-slate-900">Confirm Submission</h3>
            </div>

            <p className="text-sm text-slate-600 leading-relaxed">
              Are you sure you want to finalize this task? Once confirmed, <strong className="text-slate-900">this task will be permanently locked and cannot be changed or edited again</strong>.
            </p>

            <div className="flex justify-end gap-3 pt-2">
              <button
                onClick={() => setConfirmModal({ isOpen: false, taskId: null, actionType: null, pendingFile: null })}
                className="px-4 py-2 text-sm font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-xl transition"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmAction}
                className="px-4 py-2 text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow-md shadow-indigo-200 transition"
              >
                Yes, Confirm & Lock
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}