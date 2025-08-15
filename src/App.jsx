import { Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import ExpenseTrack from "./pages/ExpenseTrack";
import Login from "./pages/Login";
import Navbar from "./components/NavBar";
export default function App() {
  const token = localStorage.getItem("token");

  return (
    <>
      {token && <Navbar />}

      <Routes>
        <Route path="/login" element={<Login />} />

        <Route
          path="/dashboard"
          element={token ? <Dashboard /> : <Navigate to="/login" replace />}
        />
        <Route
          path="/expenses"
          element={token ? <ExpenseTrack /> : <Navigate to="/login" replace />}
        />

        <Route
          path="*"
          element={<Navigate to={token ? "/expenses" : "/login"} />}
        />
      </Routes>
    </>
  );
}
