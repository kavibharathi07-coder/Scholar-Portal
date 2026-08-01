export const MOCK_DATABASE = {
  mentors: [
    { id: 'M-101', email: 'mentor@example.com', password: 'password123', name: 'Dr. Sarah Smith' },
  ],
  students: [
    { id: 'S-202', email: 'student@example.com', password: 'password123', name: 'Alex Johnson' },
  ],
};

export const INITIAL_WEEKLY_TASKS = [
  { id: 1, day: 'Day 1 - Monday', title: 'Setup Local Environment & Clone Repo', completed: true, proofType: 'code', proofName: 'repo_setup_log.txt' },
  { id: 2, day: 'Day 2 - Tuesday', title: 'Implement Authentication UI Component', completed: true, proofType: 'photo', proofName: 'ui_screenshot.png' },
  { id: 3, day: 'Day 3 - Wednesday', title: 'Connect Form Validation & API Mocks', completed: false, proofType: null, proofName: null },
  { id: 4, day: 'Day 4 - Thursday', title: 'Write Unit Tests for Auth Redirection', completed: false, proofType: null, proofName: null },
  { id: 5, day: 'Day 5 - Friday', title: 'Submit Code Review & Final Documentation', completed: false, proofType: null, proofName: null },
];