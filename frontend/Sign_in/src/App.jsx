import React, { useState } from 'react';
import AuthPage from './components/AuthPage';
import StudentDashboard from './components/StudentDashboard';
import MentorDashboard from './components/MentorDashboard';
import { INITIAL_WEEKLY_TASKS } from './data/mockData';

export default function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [tasks, setTasks] = useState(INITIAL_WEEKLY_TASKS);

  const handleLogout = () => {
    setCurrentUser(null);
  };

  // Render view conditionally based on session
  if (!currentUser) {
    return <AuthPage onLoginSuccess={(user) => setCurrentUser(user)} />;
  }

  if (currentUser.role === 'student') {
    return (
      <StudentDashboard
        currentUser={currentUser}
        tasks={tasks}
        setTasks={setTasks}
        onLogout={handleLogout}
      />
    );
  }

  if (currentUser.role === 'mentor') {
    return (
      <MentorDashboard
        currentUser={currentUser}
        tasks={tasks}
        onLogout={handleLogout}
      />
    );
  }

  return null;
}