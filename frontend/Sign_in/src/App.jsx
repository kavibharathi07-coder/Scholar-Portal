import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthPage from "./components/AuthPage";
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
