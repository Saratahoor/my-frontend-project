import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "react-hot-toast";

import Home from "./pages/Home";
import About from "./pages/About";
import Community from "./pages/Community";
import VoiceTranslator from "./pages/VoiceTranslator";

import AdminDashboard from "./features/Admin/AdminDashboard";
import CheckBookings from "./features/Admin/CheckBookings";
import CheckMediators from "./features/Admin/CheckMediators";
import VerifyUser from "./features/Admin/VerifyUser";
import VerifyMediator from "./features/Admin/VerifyMediator";

import UserDashboard from "./features/User/UserDashboard";
import FileCase from "./features/User/FileCase";
import TrackCase from "./features/User/TrackCase";

import MediatorDashboard from "./features/Mediator/MediatorDashboard";
import CheckCases from "./features/Mediator/CheckCases";

import LoginForm from "./components/LoginForm";
import RegistrationForm from "./components/RegisterForm";

import Chatbot from "./components/ui/ChatBot";

import AuthRoutesProtector from "./features/Protectors/AuthRoutesProtector";
import AdminRoutesProtector from "./features/Protectors/AdminRoutesProtector";
import UserRoutesProtector from "./features/Protectors/UserRoutesProtector";
import MediatorRoutesProtector from "./features/Protectors/MediatorRoutesProtector";

const MainLayout = () => {
  return (
    <div className="bg-gradient-to-r from-orange-500 via-white to-green-500 min-h-screen flex items-center justify-center">
      <Outlet />
      <Chatbot />
    </div>
  );
};

const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/auth",
        element: <AuthRoutesProtector />,
        children: [
          {
            path: "login",
            element: <LoginForm />,
          },
          {
            path: "register",
            element: <RegistrationForm />,
          },
        ],
      },
      {
        path: "/user",
        element: <UserRoutesProtector />,
        children: [
          {
            path: "dashboard",
            element: <UserDashboard />,
          },
          {
            path: "file-case",
            element: <FileCase />,
          },
          {
            path: "track-case",
            element: <TrackCase />,
          },
        ],
      },
      {
        path: "/mediator",
        element: <MediatorRoutesProtector />,
        children: [
          {
            path: "dashboard",
            element: <MediatorDashboard />,
          },
          {
            path: "cases",
            element: <CheckCases />,
          },
        ],
      },
      {
        path: "/admin",
        element: <AdminRoutesProtector />,
        children: [
          {
            path: "dashboard",
            element: <AdminDashboard />,
          },
          { path: "bookings", element: <CheckBookings /> },
          { path: "mediators", element: <CheckMediators /> },
          { path: "verify-user", element: <VerifyUser /> },
          { path: "verify-mediator", element: <VerifyMediator /> },
        ],
      },
      {
        path: "/voice-translator",
        element: <VoiceTranslator />,
      },
      {
        path: "/community",
        element: <Community />,
      },
    ],
  },
]);

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <RouterProvider router={router} />
      <Toaster
        position="top-center"
        gutter={12}
        containerStyle={{ margin: "8px" }}
        toastOptions={{
          success: {
            duration: 1000,
          },
          error: {
            duration: 2000,
          },
          style: {
            fontSize: "16px",
            maxWidth: "500px",
            padding: "16px 24px",
            backgroundColor: "-var(--color-grey-0)",
            color: "-var(--color-grey-7000)",
          },
        }}
      />
    </QueryClientProvider>
  );
}

export default App;
