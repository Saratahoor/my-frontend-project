// components/AdminLayout.jsx
import { motion } from "framer-motion";
import { NavLink, Outlet } from "react-router-dom";
import LogOut from "../components/ui/LogOut";
import Content from "../components/ui/Content";

const AdminLayout = () => {
  const navItems = [
    { label: "Dashboard", path: "/admin/dashboard" },
    { label: "Check Booking", path: "/admin/bookings" },
    { label: "Check Mediators", path: "/admin/mediators" },
    { label: "Create User", path: "/admin/create-user" },
    { label: "Verify User", path: "/admin/verify-user" },
    { label: "Verify Mediator", path: "/admin/verify-mediator" },
  ];

  return (
    <div className="min-h-screen w-screen flex bg-gradient-to-r from-orange-400 via-white to-green-400">
      {/* Sidebar */}
      <motion.div
        initial={{ x: -40, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="fixed w-64 h-screen p-6 bg-white bg-opacity-30 backdrop-blur-md shadow-xl flex flex-col justify-between"
      >
        {/* Top - Navigation */}
        <div className="flex flex-col gap-4">
          <h1 className="text-3xl font-bold text-blue-800 mb-6">
            <Content>Admin Panel</Content>
          </h1>
          {navItems.map((item) => (
            <NavLink
              key={item.label}
              to={item.path}
              className={({ isActive }) =>
                `px-4 py-2 rounded-md text-lg font-medium transition ${
                  isActive
                    ? "bg-blue-600 text-white"
                    : "text-gray-800 hover:bg-orange-200"
                }`
              }
            >
              <Content>{item.label}</Content>
            </NavLink>
          ))}
        </div>

        {/* Bottom - Logout */}
        <LogOut />
      </motion.div>

      {/* Main Content Area */}
      <div className="flex-1 ml-64 p-10 overflow-y-auto">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;
