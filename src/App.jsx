import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Community from "./pages/Community";
import UserDashboard from "./pages/UserDashboard";
import MediatorDashboard from "./pages/MediatorDashboard";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "react-hot-toast";
import LoginForm from "./components/LoginForm";
import RegistrationForm from "./components/RegisterForm";
import AuthRoutesProtector from "./features/Protectors/AuthRoutesProtector";
import AdminRoutesProtector from "./features/Protectors/AdminRoutesProtector";
import UserRoutesProtector from "./features/Protectors/UserRoutesProtector";
import MediatorRoutesProtector from "./features/Protectors/MediatorRoutesProtector";

const MainLayout = () => {
  return (
    <div className="bg-gradient-to-r from-orange-500 via-white to-green-500 min-h-screen flex items-center justify-center">
      <Outlet />
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
        ],
      },
      {
        path: "/admin",
        element: <AdminRoutesProtector />,
        children: [
          {
            path: "dashboard",
            element: <h1>ADMIN DASHBOARD</h1>,
          },
        ],
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
