import { motion } from "framer-motion";
import { NavLink, Outlet } from "react-router-dom";
import LogOut from "../components/ui/LogOut";
import Content from "../components/ui/Content";

export default function UserLayout() {
  const navItems = [
    { label: "Dashboard", path: "/user/dashboard" },
    { label: "File a Case", path: "/user/file-case" },
    { label: "Track Case", path: "/user/track-case" },
    { label: "Community", path: "/community" },
  ];

  return (
    <div className="min-h-screen w-screen flex bg-gradient-to-r from-orange-500 via-white to-green-500">
      {/* Sidebar */}
      <motion.div
        initial={{ x: -40, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="fixed w-64 h-screen p-6 bg-white bg-opacity-30 backdrop-blur-md shadow-xl flex flex-col justify-between"
      >
        <div className="flex flex-col gap-4">
          <h1 className="text-3xl font-bold mb-6">
            <Content>Nyaya Path</Content>
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

        <LogOut />
      </motion.div>

      {/* Main Content */}
      <div className="flex-1 ml-64 p-10">
        <Outlet />
      </div>
    </div>
  );
}
