import { useEffect, useState } from "react";
import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import SignupPage from "./components/SignupPage";
import StudentDashboard from "./components/StudentDashboard";
import MentorDashboard from "./components/MentorDashboard";
import { getCurrentUser } from "./services/authService";

function ProtectedRoute({ role, children }) {
  const [state, setState] = useState({ loading: true, user: null });

  useEffect(() => {
    let active = true;

    getCurrentUser()
      .then((user) => {
        if (active) setState({ loading: false, user });
      })
      .catch(() => {
        if (active) setState({ loading: false, user: null });
      });

    return () => {
      active = false;
    };
  }, []);

  if (state.loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-50">
        <p className="text-sm font-semibold text-slate-600">
          Checking authentication...
        </p>
      </main>
    );
  }

  if (!state.user) return <Navigate to="/" replace />;
  if (role && state.user.role !== role) {
    return <Navigate to={`/${state.user.role}-dashboard`} replace />;
  }

  return children;
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SignupPage />} />
        <Route
          path="/student-dashboard"
          element={
            <ProtectedRoute role="student">
              <StudentDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/mentor-dashboard"
          element={
            <ProtectedRoute role="mentor">
              <MentorDashboard />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}