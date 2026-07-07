import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import QuizCreationPage from "./pages/QuizCreationPage.tsx";
import QuizListPage from "./pages/QuizListPage.tsx";
import QuizDetailPage from "./pages/QuizDetailPage.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/create",
    element: <QuizCreationPage />,
  },
  {
    path: "/quizzes",
    element: <QuizListPage />,
  },
  {
    path: "/quizzes/:id",
    element: <QuizDetailPage />,
  },
]);
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
