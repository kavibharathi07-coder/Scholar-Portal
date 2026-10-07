import React, { useState } from "react";

import {
  ChevronRight,
  CreditCard,
  FileText,
  LogOut,
  Settings,
  User,
} from "lucide-react";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "/src/components/ui/pagination";

// ==================================================
// WEEKDAYS
// ==================================================

const WEEKDAYS = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
];

// ==================================================
// WEEKDAY HELPERS
// ==================================================

const getCurrentWeekday = () => {
  const dayNames = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const today = dayNames[new Date().getDay()];

  return WEEKDAYS.includes(today) ? today : "Monday";
};

const isPastDay = (dayName) => {
  const todayName = getCurrentWeekday();

  const currentIndex = WEEKDAYS.indexOf(todayName);
  const targetIndex = WEEKDAYS.indexOf(dayName);

  const currentDayIndexInWeek = new Date().getDay();

  // Weekend
  if (
    currentDayIndexInWeek === 0 ||
    currentDayIndexInWeek === 6
  ) {
    return true;
  }

  return targetIndex < currentIndex;
};

// ==================================================
// INITIAL TASKS
// ==================================================

const INITIAL_TASKS = {
  Monday: [],
  Tuesday: [],
  Wednesday: [],
  Thursday: [],
  Friday: [],
};

// ==================================================
// STUDENT DASHBOARD
// ==================================================

export default function StudentDashboard() {
  // ==================================================
  // TASK STATES
  // ==================================================

  const [selectedDay, setSelectedDay] =
    useState(getCurrentWeekday());

  const [tasks, setTasks] =
    useState(INITIAL_TASKS);

  const [newTaskTitle, setNewTaskTitle] =
    useState("");

  // ==================================================
  // PAGINATION
  // ==================================================

  const [currentPage, setCurrentPage] =
    useState(1);

  const TASKS_PER_PAGE = 3;

  // ==================================================
  // PROFILE STATES
  // ==================================================

  const [isOpen, setIsOpen] =
    useState(false);

  const [profile] = useState({
    name: "Kavibharathi",
    email: "kavi@rajalakshmi.edu.in",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80",
  });

  // ==================================================
  // CONFIRMATION MODAL
  // ==================================================

  const [confirmModal, setConfirmModal] =
    useState({
      isOpen: false,
      taskId: null,
      actionType: null,
      pendingFile: null,
    });

  // ==================================================
  // CURRENT DAY DATA
  // ==================================================

  const isSelectedDayPast =
    isPastDay(selectedDay);

  const currentDayTasks =
    tasks[selectedDay] || [];

  // ==================================================
  // PAGINATION DATA
  // ==================================================

  const totalPages = Math.ceil(
    currentDayTasks.length / TASKS_PER_PAGE
  );

  const startIndex =
    (currentPage - 1) * TASKS_PER_PAGE;

  const paginatedTasks =
    currentDayTasks.slice(
      startIndex,
      startIndex + TASKS_PER_PAGE
    );

  // ==================================================
  // PROGRESS
  // ==================================================

  const completedCount =
    currentDayTasks.filter(
      (task) => task.completed
    ).length;

  const progressPercent =
    currentDayTasks.length
      ? Math.round(
          (completedCount /
            currentDayTasks.length) *
            100
        )
      : 0;

  // ==================================================
  // ADD TASK
  // ==================================================

  const handleAddTask = (event) => {
    event.preventDefault();

    if (
      !newTaskTitle.trim() ||
      isSelectedDayPast
    ) {
      return;
    }

    const newTask = {
      id: Date.now(),
      title: newTaskTitle.trim(),
      completed: false,
      locked: false,
      proofName: null,
      proofType: null,
      proofUrl: null,
    };

    setTasks((previousTasks) => ({
      ...previousTasks,

      [selectedDay]: [
        ...(previousTasks[selectedDay] || []),
        newTask,
      ],
    }));

    // Go to the last page after adding
    const newTaskCount =
      currentDayTasks.length + 1;

    const newTotalPages = Math.ceil(
      newTaskCount / TASKS_PER_PAGE
    );

    setCurrentPage(newTotalPages);

    setNewTaskTitle("");
  };

  // ==================================================
  // CHECKBOX CONFIRMATION
  // ==================================================

  const triggerToggleConfirm = (task) => {
    if (
      task.locked ||
      isSelectedDayPast
    ) {
      return;
    }

    setConfirmModal({
      isOpen: true,
      taskId: task.id,
      actionType: "TOGGLE",
      pendingFile: null,
    });
  };

  // ==================================================
  // FILE UPLOAD CONFIRMATION
  // ==================================================

  const triggerFileUploadConfirm = (
    taskId,
    event
  ) => {
    if (isSelectedDayPast) {
      return;
    }

    const file = event.target.files[0];

    if (!file) {
      return;
    }

    const isPdf =
      file.type === "application/pdf";

    const isImage =
      file.type.startsWith("image/");

    if (!isPdf && !isImage) {
      alert(
        "Please upload an image file (PNG/JPG) or a PDF."
      );

      return;
    }

    setConfirmModal({
      isOpen: true,
      taskId: taskId,
      actionType: "UPLOAD",
      pendingFile: file,
    });

    event.target.value = "";
  };

  // ==================================================
  // CONFIRM ACTION
  // ==================================================

  const handleConfirmAction = () => {
    const {
      taskId,
      actionType,
      pendingFile,
    } = confirmModal;

    setTasks((previousTasks) => ({
      ...previousTasks,

      [selectedDay]: (
        previousTasks[selectedDay] || []
      ).map((task) => {
        if (task.id !== taskId) {
          return task;
        }

        // ------------------------------------------
        // CHECKBOX CONFIRMATION
        // ------------------------------------------

        if (actionType === "TOGGLE") {
          return {
            ...task,
            completed: !task.completed,
            locked: true,
          };
        }

        // ------------------------------------------
        // FILE UPLOAD CONFIRMATION
        // ------------------------------------------

        if (
          actionType === "UPLOAD" &&
          pendingFile
        ) {
          const isPdf =
            pendingFile.type ===
            "application/pdf";

          const fileUrl =
            URL.createObjectURL(
              pendingFile
            );

          return {
            ...task,
            proofName: pendingFile.name,
            proofType: isPdf
              ? "pdf"
              : "image",
            proofUrl: fileUrl,
            completed: true,
            locked: true,
          };
        }

        return task;
      }),
    }));

    setConfirmModal({
      isOpen: false,
      taskId: null,
      actionType: null,
      pendingFile: null,
    });
  };

  // ==================================================
  // CLOSE PROFILE DROPDOWN
  // ==================================================

  const closeProfileDropdown = () => {
    setIsOpen(false);
  };

  // ==================================================
  // SIGN OUT
  // ==================================================

  const handleSignOut = () => {
    setIsOpen(false);

    localStorage.removeItem(
      "authToken"
    );

    console.log("Sign out clicked");

    // Later:
    // window.location.href = "/";
  };

  // ==================================================
  // PAGE CHANGE
  // ==================================================

  const handlePageChange = (page) => {
    if (
      page >= 1 &&
      page <= totalPages
    ) {
      setCurrentPage(page);
    }
  };

  // ==================================================
  // UI
  // ==================================================

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 p-4 sm:p-6 md:p-10 font-sans relative">

      <div className="max-w-6xl mx-auto space-y-6">

        {/* ==================================================
            HEADER
        ================================================== */}

        <header className="bg-white rounded-2xl p-5 sm:p-6 shadow-sm border border-slate-200 flex flex-col lg:flex-row lg:items-center justify-between gap-5">

          {/* LEFT SIDE */}

          <div>
            <h1 className="text-2xl font-bold text-slate-900">
              Student Task Dashboard
            </h1>

            <p className="text-slate-500 text-sm mt-1">
              Submit proof and confirm your tasks.
              Past days are automatically locked
              once the next day begins.
            </p>
          </div>

          {/* RIGHT SIDE */}

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">

            {/* ACTIVE DAY */}

            <div className="flex items-center gap-3 bg-indigo-50 text-indigo-700 px-4 py-2 rounded-xl border border-indigo-100">

              <span className="font-semibold text-sm">
                Active Day:
              </span>

              <span className="font-bold">
                {selectedDay}
              </span>

              {isSelectedDayPast && (
                <span className="text-xs bg-amber-100 text-amber-800 font-semibold px-2 py-0.5 rounded">
                  Locked
                </span>
              )}

            </div>

            {/* PROFILE */}

            <div className="relative">

              {/* PROFILE BUTTON */}

              <button
                type="button"
                onClick={() =>
                  setIsOpen(
                    (previous) =>
                      !previous
                  )
                }
                className="group flex items-center gap-3 rounded-2xl border border-slate-200 bg-white p-2.5 pr-4 shadow-sm transition-all duration-200 hover:border-slate-300 hover:bg-slate-50 hover:shadow-md focus:outline-none"
              >

                {/* USER DETAILS */}

                <div className="hidden sm:block text-right">

                  <div className="text-sm font-semibold leading-tight text-slate-800">
                    {profile.name}
                  </div>

                  <div className="text-xs leading-tight text-slate-400">
                    {profile.email}
                  </div>

                </div>

                {/* AVATAR */}

                <div className="relative h-10 w-10 rounded-full bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-[2px]">

                  <div className="h-full w-full overflow-hidden rounded-full bg-white">

                    <img
                      src={profile.avatar}
                      alt={profile.name}
                      className="h-full w-full object-cover"
                    />

                  </div>

                </div>

                {/* ARROW */}

                <ChevronRight
                  className={`h-4 w-4 text-slate-400 transition-transform duration-200 ${
                    isOpen
                      ? "rotate-90 text-indigo-500"
                      : ""
                  }`}
                />

              </button>

              {/* ==================================================
                  PROFILE DROPDOWN
              ================================================== */}

              {isOpen && (
                <>

                  {/* BACKDROP */}

                  <div
                    className="fixed inset-0 z-40"
                    onClick={
                      closeProfileDropdown
                    }
                  />

                  {/* DROPDOWN */}

                  <div className="absolute right-0 top-full z-50 mt-2 w-72 origin-top-right rounded-2xl border border-slate-200 bg-white/95 p-2 shadow-2xl backdrop-blur-md">

                    {/* PROFILE HEADER */}

                    <div className="rounded-xl bg-slate-50 p-3 mb-2">

                      <div className="flex items-center gap-3">

                        {/* AVATAR */}

                        <div className="h-11 w-11 overflow-hidden rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 p-[2px]">

                          <img
                            src={profile.avatar}
                            alt={profile.name}
                            className="h-full w-full rounded-full object-cover"
                          />

                        </div>

                        {/* PROFILE INFO */}

                        <div className="min-w-0">

                          <p className="truncate text-sm font-semibold text-slate-900">
                            {profile.name}
                          </p>

                          <p className="truncate text-xs text-slate-500">
                            {profile.email}
                          </p>

                        </div>

                      </div>

                    </div>

                    {/* MENU ITEMS */}

                    <div className="space-y-1">

                      {/* PROFILE */}

                      <button
                        type="button"
                        onClick={
                          closeProfileDropdown
                        }
                        className="group flex w-full items-center gap-3 rounded-xl p-3 text-left transition hover:bg-slate-100"
                      >

                        <User className="h-4 w-4 text-slate-500" />

                        <span className="flex-1 text-sm font-medium text-slate-700">
                          Profile
                        </span>

                        <ChevronRight className="h-4 w-4 text-slate-300" />

                      </button>

                      {/* SUBSCRIPTION */}

                      <button
                        type="button"
                        onClick={
                          closeProfileDropdown
                        }
                        className="group flex w-full items-center gap-3 rounded-xl p-3 text-left transition hover:bg-slate-100"
                      >

                        <CreditCard className="h-4 w-4 text-slate-500" />

                        <span className="flex-1 text-sm font-medium text-slate-700">
                          Subscription
                        </span>

                        <span className="rounded-md border border-indigo-500/10 bg-indigo-50 px-2 py-1 text-[10px] font-bold text-indigo-600">
                          STUDENT
                        </span>

                      </button>

                      {/* SETTINGS */}

                      <button
                        type="button"
                        onClick={
                          closeProfileDropdown
                        }
                        className="group flex w-full items-center gap-3 rounded-xl p-3 text-left transition hover:bg-slate-100"
                      >

                        <Settings className="h-4 w-4 text-slate-500" />

                        <span className="flex-1 text-sm font-medium text-slate-700">
                          Settings
                        </span>

                        <ChevronRight className="h-4 w-4 text-slate-300" />

                      </button>

                      {/* TERMS */}

                      <button
                        type="button"
                        onClick={
                          closeProfileDropdown
                        }
                        className="group flex w-full items-center gap-3 rounded-xl p-3 text-left transition hover:bg-slate-100"
                      >

                        <FileText className="h-4 w-4 text-slate-500" />

                        <span className="flex-1 text-sm font-medium text-slate-700">
                          Terms & Policies
                        </span>

                        <ChevronRight className="h-4 w-4 text-slate-300" />

                      </button>

                    </div>

                    {/* DIVIDER */}

                    <div className="my-2 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />

                    {/* SIGN OUT */}

                    <button
                      type="button"
                      onClick={handleSignOut}
                      className="group flex w-full items-center gap-3 rounded-xl border border-transparent bg-red-50 p-3 text-left transition hover:border-red-200 hover:bg-red-100"
                    >

                      <LogOut className="h-4 w-4 text-red-500" />

                      <span className="text-sm font-semibold text-red-500">
                        Sign Out
                      </span>

                    </button>

                  </div>

                </>
              )}

            </div>

          </div>

        </header>

        {/* ==================================================
            DASHBOARD GRID
        ================================================== */}

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">

          {/* ==================================================
              WEEKDAY SIDEBAR
          ================================================== */}

          <aside className="lg:col-span-1 bg-white rounded-2xl p-4 shadow-sm border border-slate-200">

            <h2 className="text-xs font-semibold uppercase tracking-wider text-slate-400 px-3 mb-3">
              Weekdays
            </h2>

            <nav className="space-y-1">

              {WEEKDAYS.map((day) => {

                const dayTasks =
                  tasks[day] || [];

                const dayCompleted =
                  dayTasks.filter(
                    (task) =>
                      task.completed
                  ).length;

                const isSelected =
                  selectedDay === day;

                const isPast =
                  isPastDay(day);

                return (
                  <button
                    key={day}
                    onClick={() => {
                      setSelectedDay(day);

                      // Reset pagination
                      // whenever weekday changes
                      setCurrentPage(1);
                    }}
                    className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all text-left font-medium text-sm ${
                      isSelected
                        ? "bg-indigo-600 text-white shadow-md shadow-indigo-200"
                        : isPast
                        ? "text-slate-400 bg-slate-50 hover:bg-slate-100"
                        : "text-slate-600 hover:bg-slate-100"
                    }`}
                  >

                    <span className="flex items-center gap-2">

                      {day}

                      {isPast && (
                        <span
                          className="text-xs"
                          title="Day locked"
                        >
                          🔒
                        </span>
                      )}

                    </span>

                    <span
                      className={`text-xs px-2 py-0.5 rounded-full ${
                        isSelected
                          ? "bg-indigo-500 text-white"
                          : "bg-slate-200 text-slate-600"
                      }`}
                    >
                      {dayCompleted}/
                      {dayTasks.length}
                    </span>

                  </button>
                );
              })}

            </nav>

          </aside>

          {/* ==================================================
              RIGHT AREA
          ================================================== */}

          <main className="lg:col-span-3 bg-white rounded-2xl p-6 shadow-sm border border-slate-200 space-y-6">

            {/* ==================================================
                TOP BAR
            ================================================== */}

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">

              <div>

                <h2 className="text-xl font-bold text-slate-900">
                  {selectedDay}'s Schedule
                </h2>

                <p className="text-sm text-slate-500">
                  {currentDayTasks.length}{" "}
                  {currentDayTasks.length === 1
                    ? "task"
                    : "tasks"}{" "}
                  total
                </p>

              </div>

              {/* PROGRESS */}

              <div className="w-full sm:w-48 bg-slate-100 p-2.5 rounded-xl border border-slate-200">

                <div className="flex justify-between text-xs font-medium text-slate-600 mb-1">

                  <span>
                    Completed
                  </span>

                  <span>
                    {progressPercent}%
                  </span>

                </div>

                <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">

                  <div
                    className="bg-indigo-600 h-2 rounded-full transition-all duration-300"
                    style={{
                      width: `${progressPercent}%`,
                    }}
                  />

                </div>

              </div>

            </div>

            {/* ==================================================
                ADD TASK
            ================================================== */}

            <form
              onSubmit={handleAddTask}
              className="flex gap-2"
            >

              <input
                type="text"
                placeholder={
                  isSelectedDayPast
                    ? "Cannot add tasks to past days"
                    : `Add a task for ${selectedDay}...`
                }
                value={newTaskTitle}
                disabled={
                  isSelectedDayPast
                }
                onChange={(event) =>
                  setNewTaskTitle(
                    event.target.value
                  )
                }
                className="flex-1 px-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white disabled:opacity-50 disabled:cursor-not-allowed"
              />

              <button
                type="submit"
                disabled={
                  isSelectedDayPast
                }
                className="bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Add Task
              </button>

            </form>

            {/* ==================================================
                TASK LIST
            ================================================== */}

            <div className="space-y-4">

              {currentDayTasks.length === 0 ? (

                <div className="text-center py-12 border-2 border-dashed border-slate-200 rounded-2xl">

                  <p className="text-slate-400 text-sm">
                    No tasks added for{" "}
                    {selectedDay} yet.
                  </p>

                </div>

              ) : (

                <>
                  {/* ==================================================
                      PAGINATED TASKS
                  ================================================== */}

                  {paginatedTasks.map(
                    (task) => {

                      const isTaskLocked =
                        task.locked ||
                        isSelectedDayPast;

                      return (
                        <div
                          key={task.id}
                          className={`p-4 rounded-xl border transition-all ${
                            isTaskLocked
                              ? "bg-slate-100/70 border-slate-200"
                              : "bg-white border-slate-200 hover:border-indigo-200"
                          }`}
                        >

                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">

                            {/* TASK */}

                            <div className="flex items-start gap-3">

                              <input
                                type="checkbox"
                                checked={
                                  task.completed
                                }
                                disabled={
                                  isTaskLocked
                                }
                                onChange={() =>
                                  triggerToggleConfirm(
                                    task
                                  )
                                }
                                className={`mt-1 h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 ${
                                  isTaskLocked
                                    ? "cursor-not-allowed opacity-60"
                                    : "cursor-pointer"
                                }`}
                              />

                              <div>

                                <p
                                  className={`text-sm font-medium ${
                                    task.completed
                                      ? "line-through text-slate-400"
                                      : "text-slate-800"
                                  }`}
                                >
                                  {task.title}
                                </p>

                                <div className="flex items-center gap-2 mt-1">

                                  {/* STATUS */}

                                  <span
                                    className={`text-[11px] font-semibold px-2 py-0.5 rounded ${
                                      task.completed
                                        ? "bg-emerald-100 text-emerald-700"
                                        : "bg-amber-100 text-amber-700"
                                    }`}
                                  >
                                    {task.completed
                                      ? "Completed"
                                      : "Pending"}
                                  </span>

                                  {/* LOCK */}

                                  {isTaskLocked && (
                                    <span className="text-[11px] font-semibold px-2 py-0.5 rounded bg-slate-200 text-slate-600 flex items-center gap-1">

                                      🔒 Locked{" "}

                                      {isSelectedDayPast
                                        ? "(Past Day)"
                                        : ""}

                                    </span>
                                  )}

                                </div>

                              </div>

                            </div>

                            {/* PROOF */}

                            <div className="flex items-center gap-2 self-start sm:self-center">

                              {task.proofName ? (

                                <div className="flex items-center gap-2 bg-indigo-50 border border-indigo-200 px-3 py-1.5 rounded-lg text-xs font-medium text-indigo-900">

                                  <span className="uppercase font-bold text-[10px] px-1.5 py-0.5 rounded bg-indigo-200 text-indigo-800">
                                    {task.proofType}
                                  </span>

                                  <span
                                    className="max-w-[140px] truncate"
                                    title={
                                      task.proofName
                                    }
                                  >
                                    {task.proofName}
                                  </span>

                                  {task.proofUrl &&
                                    task.proofUrl !==
                                      "#" && (
                                      <a
                                        href={
                                          task.proofUrl
                                        }
                                        target="_blank"
                                        rel="noreferrer"
                                        className="text-indigo-600 hover:underline font-semibold ml-1"
                                      >
                                        View
                                      </a>
                                    )}

                                </div>

                              ) : isTaskLocked ? (

                                <span className="text-xs text-slate-400 italic">
                                  No proof attached
                                </span>

                              ) : (

                                <label className="cursor-pointer bg-slate-100 hover:bg-slate-200 border border-slate-300 text-slate-700 text-xs font-medium px-3 py-2 rounded-lg transition flex items-center gap-1.5">

                                  <span>
                                    Upload Proof
                                  </span>

                                  <input
                                    type="file"
                                    accept="image/*,.pdf"
                                    onChange={(
                                      event
                                    ) =>
                                      triggerFileUploadConfirm(
                                        task.id,
                                        event
                                      )
                                    }
                                    className="hidden"
                                  />

                                </label>

                              )}

                            </div>

                          </div>

                        </div>
                      );
                    }
                  )}

                  {/* ==================================================
                      PAGINATION
                  ================================================== */}

                  {totalPages > 1 && (

                    <div className="pt-4 border-t border-slate-100">

                      <Pagination>

                        <PaginationContent>

                          {/* PREVIOUS */}

                          <PaginationItem>

                            <PaginationPrevious
                              href="#"
                              onClick={(event) => {
                                event.preventDefault();

                                handlePageChange(
                                  currentPage - 1
                                );
                              }}
                              className={
                                currentPage === 1
                                  ? "pointer-events-none opacity-40"
                                  : "cursor-pointer"
                              }
                            />

                          </PaginationItem>

                          {/* PAGE NUMBERS */}

                          {Array.from(
                            {
                              length:
                                totalPages,
                            },
                            (_, index) =>
                              index + 1
                          ).map(
                            (page) => (

                              <PaginationItem
                                key={page}
                              >

                                <PaginationLink
                                  href="#"
                                  isActive={
                                    currentPage ===
                                    page
                                  }
                                  onClick={(
                                    event
                                  ) => {
                                    event.preventDefault();

                                    handlePageChange(
                                      page
                                    );
                                  }}
                                >
                                  {page}
                                </PaginationLink>

                              </PaginationItem>

                            )
                          )}

                          {/* ELLIPSIS FOR MANY PAGES */}

                          {totalPages > 7 && (
                            <PaginationItem>
                              <PaginationEllipsis />
                            </PaginationItem>
                          )}

                          {/* NEXT */}

                          <PaginationItem>

                            <PaginationNext
                              href="#"
                              onClick={(event) => {
                                event.preventDefault();

                                handlePageChange(
                                  currentPage + 1
                                );
                              }}
                              className={
                                currentPage ===
                                totalPages
                                  ? "pointer-events-none opacity-40"
                                  : "cursor-pointer"
                              }
                            />

                          </PaginationItem>

                        </PaginationContent>

                      </Pagination>

                    </div>

                  )}

                </>

              )}

            </div>

          </main>

        </div>

      </div>

      {/* ==================================================
          CONFIRMATION MODAL
      ================================================== */}

      {confirmModal.isOpen && (

        <div className="fixed inset-0 z-[60] bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4">

          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-100 space-y-4">

            {/* TITLE */}

            <div className="flex items-center gap-3 text-amber-600">

              <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center text-lg font-bold">
                ⚠️
              </div>

              <h3 className="text-lg font-bold text-slate-900">
                Confirm Submission
              </h3>

            </div>

            {/* MESSAGE */}

            <p className="text-sm text-slate-600 leading-relaxed">

              Are you sure you want to finalize
              this task?

              Once confirmed,

              <strong className="text-slate-900">
                {" "}
                this task will be permanently
                locked and cannot be changed or
                edited again.
              </strong>

            </p>

            {/* BUTTONS */}

            <div className="flex justify-end gap-3 pt-2">

              <button
                onClick={() =>
                  setConfirmModal({
                    isOpen: false,
                    taskId: null,
                    actionType: null,
                    pendingFile: null,
                  })
                }
                className="px-4 py-2 text-sm font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-xl transition"
              >
                Cancel
              </button>

              <button
                onClick={
                  handleConfirmAction
                }
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