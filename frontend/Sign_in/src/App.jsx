import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthPage from "./components/AuthPage";

// Adjust these two import paths to wherever your dashboard components
// actually live in your project (e.g. "./components/StudentDashboard" or
// "./pages/StudentDashboard" — your screenshot doesn't show them yet,
// so create these files if they don't exist).
import StudentDashboard from "./components/StudentDashboard";
import MentorDashboard from "./components/MentorDashboard";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AuthPage />} />
        <Route path="/student-dashboard" element={<StudentDashboard />} />
        <Route path="/mentor-dashboard" element={<MentorDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}
