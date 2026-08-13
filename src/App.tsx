import { Routes, Route, Navigate } from "react-router-dom";
import RegisterPage from "./features/auth/pages/registerPage";
import LoginPage from "./features/auth/pages/loginPage";
import TaskPage from "./features/tasks/pages/tasksPage";
import ProtectedRoute from "./components/common/ProtectedRoute";

const isAuthenticated = () => {
  return Boolean(
    localStorage.getItem("token") ||
    sessionStorage.getItem("token")
  );
};

const RootRedirect = () => {
  return isAuthenticated() ? (
    <Navigate to="/tasks" replace />
  ) : (
    <Navigate to="/login" replace />
  );
};

function App() {
  return (
    <Routes>
      <Route path="/" element={<RootRedirect />} />

      <Route path="/register" element={<RegisterPage />} />

      <Route path="/login" element={<LoginPage />} />

      <Route
        path="/tasks"
        element={
          <ProtectedRoute>
            <TaskPage />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;