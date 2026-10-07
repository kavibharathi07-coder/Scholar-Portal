import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignupPage from "./components/SignupPage";
import StudentDashboard from "./components/StudentDashboard";
import MentorDashboard from "./components/MentorDashboard";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SignupPage/>} />
        <Route path="/student-dashboard" element={<StudentDashboard />} />
        <Route path="/mentor-dashboard" element={<MentorDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}
