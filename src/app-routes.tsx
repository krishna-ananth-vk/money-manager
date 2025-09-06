import { createBrowserRouter, Navigate } from "react-router-dom";
import Home from "./pages/home";
import Dashboard from "./pages/dashboard";
import { Layout } from "./components/layout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Navigate to="/dashboard" replace /> }, // redirect
      { path: "dashboard", element: <Dashboard /> },
      { path: "/expense", element: <Home /> },
    ],
  },
]);

export default router