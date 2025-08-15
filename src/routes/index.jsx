// routes/index.jsx
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "../App.jsx";

import Welcome from "../pages/Welcome.jsx";
import Login from "../pages/Login.jsx";
import Register from "../pages/Register.jsx";
import Dashboard from "../pages/Dashboard.jsx";
import ExpenseTrack from "../pages/ExpenseTrack.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Welcome />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/",
    element: <App />,
    children: [
      { path: "expenses", element: <ExpenseTrack /> },
      { path: "dashboard", element: <Dashboard /> },
    ],
  },
]);

export default function Routes() {
  return <RouterProvider router={router} />;
}
