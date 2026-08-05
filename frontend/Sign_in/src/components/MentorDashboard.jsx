import React, { useState } from 'react';

// Sample Groups with Students
const GROUPS_DATA = [
  {
    groupId: 'group-a',
    groupName: 'Group Alpha (3 Students)',
    students: [
      {
        id: 's1',
        name: 'Alex Johnson',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex',
        tasks: {
          Monday: [
            { id: 1, title: 'Complete Math Exercise 4.2', completed: true, locked: true, proofName: 'math_homework.pdf', proofType: 'pdf', proofUrl: '#', status: 'Submitted' },
            { id: 2, title: 'Physics Lab Report Submission', completed: false, locked: false, proofName: null, proofType: null, proofUrl: null, status: 'In Progress' },
          ],
          Tuesday: [
            { id: 3, title: 'Read English Literature Chapter 3', completed: true, locked: true, proofName: 'chapter_notes.png', proofType: 'image', proofUrl: '#', status: 'Submitted' },
          ],
          Wednesday: [
            { id: 4, title: 'Computer Science Algorithm Assignment', completed: false, locked: false, proofName: null, proofType: null, proofUrl: null, status: 'In Progress' },
          ],
          Thursday: [
            { id: 5, title: 'Chemistry Quiz Preparation', completed: false, locked: false, proofName: null, proofType: null, proofUrl: null, status: 'In Progress' },
          ],
          Friday: [
            { id: 6, title: 'Weekly Essay Submission', completed: false, locked: false, proofName: null, proofType: null, proofUrl: null, status: 'In Progress' },
          ],
        }
      },
      {
        id: 's2',
        name: 'Sarah Chen',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
        tasks: {
          Monday: [
            { id: 101, title: 'Calculus Integration Problems', completed: true, locked: true, proofName: 'calculus.pdf', proofType: 'pdf', proofUrl: '#', status: 'Submitted' },
          ],
          Tuesday: [], Wednesday: [], Thursday: [], Friday: []
        }
      },
      {
        id: 's3',
        name: 'Marcus Vance',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Marcus',
        tasks: {
          Monday: [
            { id: 201, title: 'Database Schema Diagram', completed: true, locked: true, proofName: 'db_schema.png', proofType: 'image', proofUrl: '#', status: 'Submitted' },
          ],
          Tuesday: [], Wednesday: [], Thursday: [], Friday: []
        }
      }
    ]
  },
  {
    groupId: 'group-b',
    groupName: 'Group Beta (6 Students)',
    students: [
      { id: 's4', name: 'Priya Sharma', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Priya', tasks: { Monday: [], Tuesday: [], Wednesday: [], Thursday: [], Friday: [] } },
      { id: 's5', name: 'David Kim', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=David', tasks: { Monday: [], Tuesday: [], Wednesday: [], Thursday: [], Friday: [] } },
    ]
  }
];

const WEEKDAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

export default function MentorDashboard() {
  const [groups, setGroups] = useState(GROUPS_DATA);
  const [selectedGroupId, setSelectedGroupId] = useState('group-a');
  const [selectedStudentId, setSelectedStudentId] = useState('s1');
  
  // Overall report decision states per student
  const [reportStatuses, setReportStatuses] = useState({}); // e.g. { 's1': 'Approved' }
  const [feedbackNote, setFeedbackNote] = useState('');

  const currentGroup = groups.find((g) => g.groupId === selectedGroupId) || groups[0];
  const currentStudent = currentGroup.students.find((s) => s.id === selectedStudentId) || currentGroup.students[0];

  // Handle Final Decision for the overall weekly report
  const handleFinalDecision = (decision) => {
    if (!currentStudent) return;

    // Update overall student report status
    setReportStatuses((prev) => ({
      ...prev,
      [currentStudent.id]: decision,
    }));

    // Update all tasks for this student to reflect the overall decision
    setGroups((prevGroups) =>
      prevGroups.map((group) => {
        if (group.groupId !== selectedGroupId) return group;

        return {
          ...group,
          students: group.students.map((student) => {
            if (student.id !== selectedStudentId) return student;

            const updatedTasks = {};
            WEEKDAYS.forEach((day) => {
              updatedTasks[day] = (student.tasks[day] || []).map((task) => ({
                ...task,
                status: decision,
                mentorNote: feedbackNote || undefined,
              }));
            });

            return {
              ...student,
              tasks: updatedTasks,
            };
          }),
        };
      })
    );

    setFeedbackNote('');
  };

  const currentStudentStatus = reportStatuses[currentStudent?.id] || 'Pending Review';

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 p-4 sm:p-6 md:p-8 font-sans">
      <div className="max-w-7xl mx-auto space-y-6">

        {/* Header */}
        <header className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Mentor Weekly Review Dashboard</h1>
            <p className="text-slate-500 text-sm mt-1">
              Review all weekly task submissions and proofs, then submit a single final approval or rejection for the entire week.
            </p>
          </div>

          {/* Group Switcher */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-slate-500 uppercase">Group:</span>
            <select
              value={selectedGroupId}
              onChange={(e) => {
                setSelectedGroupId(e.target.value);
                const firstStudent = groups.find((g) => g.groupId === e.target.value)?.students[0];
                if (firstStudent) setSelectedStudentId(firstStudent.id);
              }}
              className="bg-slate-100 border border-slate-300 font-semibold text-sm rounded-xl px-3 py-2 text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              {groups.map((group) => (
                <option key={group.groupId} value={group.groupId}>
                  {group.groupName}
                </option>
              ))}
            </select>
          </div>
        </header>

        {/* Main Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">

          {/* Sidebar: Student Selector */}
          <aside className="lg:col-span-1 bg-white rounded-2xl p-4 shadow-sm border border-slate-200 space-y-4 h-fit">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-slate-400 px-2">
              Students ({currentGroup.students.length})
            </h2>

            <div className="space-y-2">
              {currentGroup.students.map((student) => {
                const isSelected = student.id === selectedStudentId;
                const status = reportStatuses[student.id];

                return (
                  <button
                    key={student.id}
                    onClick={() => setSelectedStudentId(student.id)}
                    className={`w-full flex items-center justify-between p-2.5 rounded-xl transition text-left ${
                      isSelected
                        ? 'bg-indigo-600 text-white shadow-md shadow-indigo-100'
                        : 'hover:bg-slate-100 text-slate-700'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={student.avatar}
                        alt={student.name}
                        className="w-8 h-8 rounded-full bg-slate-200 border border-slate-300"
                      />
                      <span className="font-semibold text-sm truncate">{student.name}</span>
                    </div>

                    {status && (
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          status === 'Approved'
                            ? isSelected ? 'bg-emerald-200 text-emerald-900' : 'bg-emerald-100 text-emerald-800'
                            : isSelected ? 'bg-rose-200 text-rose-900' : 'bg-rose-100 text-rose-800'
                        }`}
                      >
                        {status}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </aside>

          {/* Main Area: All Days Weekly Overview */}
          <main className="lg:col-span-3 bg-white rounded-2xl p-6 shadow-sm border border-slate-200 space-y-6">

            {/* Top Bar: Student Name & Current Status Badge */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <img
                  src={currentStudent?.avatar}
                  alt={currentStudent?.name}
                  className="w-10 h-10 rounded-full bg-slate-100 border"
                />
                <div>
                  <h2 className="text-xl font-bold text-slate-900">{currentStudent?.name}'s Full Weekly Report</h2>
                  <p className="text-xs text-slate-500">Review all daily tasks and proofs submitted for this week</p>
                </div>
              </div>

              {/* Status Badge */}
              <span
                className={`text-xs font-bold px-3 py-1.5 rounded-full w-fit ${
                  currentStudentStatus === 'Approved'
                    ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                    : currentStudentStatus === 'Rejected'
                    ? 'bg-rose-100 text-rose-800 border border-rose-300'
                    : 'bg-amber-100 text-amber-800 border border-amber-300'
                }`}
              >
                Overall Status: {currentStudentStatus}
              </span>
            </div>

            {/* All Days Overview Section */}
            <div className="space-y-6">
              {WEEKDAYS.map((day) => {
                const dayTasks = currentStudent?.tasks?.[day] || [];

                return (
                  <div key={day} className="border border-slate-200 rounded-2xl p-4 bg-slate-50/50 space-y-3">
                    <div className="flex items-center justify-between border-b border-slate-200/80 pb-2">
                      <h3 className="font-bold text-slate-800 text-sm flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-indigo-500"></span>
                        {day}
                      </h3>
                      <span className="text-xs text-slate-500 font-medium">{dayTasks.length} Task(s)</span>
                    </div>

                    {dayTasks.length === 0 ? (
                      <p className="text-xs text-slate-400 italic py-2">No tasks logged for {day}.</p>
                    ) : (
                      <div className="space-y-3">
                        {dayTasks.map((task) => (
                          <div
                            key={task.id}
                            className="p-3.5 rounded-xl bg-white border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-2xs"
                          >
                            <div className="flex items-center gap-3">
                              <span
                                className={`w-2.5 h-2.5 rounded-full flex-shrink-0 ${
                                  task.completed ? 'bg-emerald-500' : 'bg-amber-500'
                                }`}
                              />
                              <div>
                                <h4 className="font-semibold text-slate-800 text-sm">{task.title}</h4>
                                <span className="text-[11px] text-slate-400">
                                  {task.completed ? 'Completed' : 'Pending Completion'}
                                </span>
                              </div>
                            </div>

                            {/* Proof Display */}
                            <div className="flex items-center gap-2 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-200 text-xs">
                              <span className="text-slate-400 font-semibold text-[10px] uppercase">Proof:</span>
                              {task.proofName ? (
                                <div className="flex items-center gap-2">
                                  <span className="uppercase font-bold text-[9px] px-1.5 py-0.5 rounded bg-indigo-100 text-indigo-700">
                                    {task.proofType}
                                  </span>
                                  <span className="font-medium text-slate-700 truncate max-w-[120px]">
                                    {task.proofName}
                                  </span>
                                  {task.proofUrl && task.proofUrl !== '#' && (
                                    <a
                                      href={task.proofUrl}
                                      target="_blank"
                                      rel="noreferrer"
                                      className="text-indigo-600 font-bold hover:underline"
                                    >
                                      View ↗
                                    </a>
                                  )}
                                </div>
                              ) : (
                                <span className="text-slate-400 italic">No file uploaded</span>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Final Overall Approval / Rejection Section */}
            <div className="mt-8 pt-6 border-t border-slate-200 bg-slate-100/70 p-5 rounded-2xl space-y-4">
              <h3 className="font-bold text-slate-900 text-base">Final Weekly Evaluation</h3>
              <p className="text-xs text-slate-500">
                Provide overall feedback and issue the final approval or rejection for {currentStudent?.name}'s entire week submission.
              </p>

              <textarea
                rows={3}
                placeholder="Write optional mentor feedback or observations here..."
                value={feedbackNote}
                onChange={(e) => setFeedbackNote(e.target.value)}
                className="w-full p-3 text-xs bg-white border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-800"
              />

              <div className="flex items-center justify-end gap-3">
                <button
                  onClick={() => handleFinalDecision('Rejected')}
                  className="px-5 py-2 text-xs font-semibold text-rose-700 bg-rose-50 hover:bg-rose-100 border border-rose-200 rounded-xl transition"
                >
                  Reject Weekly Submission
                </button>
                <button
                  onClick={() => handleFinalDecision('Approved')}
                  className="px-5 py-2 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl shadow-sm transition"
                >
                  Approve Weekly Submission
                </button>
              </div>
            </div>

          </main>
        </div>

      </div>
    </div>
  );
}