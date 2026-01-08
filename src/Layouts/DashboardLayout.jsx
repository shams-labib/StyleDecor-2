import React from "react";
import { AiOutlineHome } from "react-icons/ai";
import { FiUserPlus } from "react-icons/fi";
import { Link, NavLink, Outlet } from "react-router";
import logoImg from "../assets/logo.png";
import { FaListOl, FaUserShield } from "react-icons/fa";
import {
  Album,
  ContactRound,
  LucidePencilRuler,
  History,
  BookOpenText,
  Settings,
  LayoutDashboard,
  ShieldUser,
} from "lucide-react";
import { BsCart4 } from "react-icons/bs";
import UseRole from "../Hooks/useRole";
import Loading from "../Pages/Loader/Loading";

const DashboardLayout = () => {
  const { role, roleLoading } = UseRole();

  if (roleLoading) return <Loading />;

  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />

      {/* MAIN CONTENT */}
      <div className="drawer-content flex flex-col min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
        {/* NAVBAR */}
        <nav className="navbar bg-white/70 dark:bg-gray-900/70 backdrop-blur-xl shadow-md px-4 py-3 sticky top-0 z-50 border-b border-white/20">
          <label
            htmlFor="my-drawer-4"
            className="btn btn-square btn-ghost lg:hidden"
          >
            <LayoutDashboard className="w-6 h-6" />
          </label>

          <div className="flex items-center gap-2 text-xl font-semibold text-primary mx-auto lg:mx-0">
            <LayoutDashboard />
            <span>Dashboard</span>
          </div>
        </nav>

        {/* PAGE CONTENT */}
        <div className="px-4 lg:px-6 py-6">
          <Outlet />
        </div>
      </div>

      {/* SIDEBAR */}
      <div className="drawer-side">
        <label htmlFor="my-drawer-4" className="drawer-overlay"></label>

        <div
          className="
          w-72 
          min-h-full 
          bg-white/70
          dark:bg-gray-900/70 
          backdrop-blur-xl 
          shadow-xl 
          border-r 
          border-white/20
          flex flex-col
          "
        >
          {/* LOGO */}
          <div className="flex flex-col  items-center  md:mt-0 py-6 mt-22 border-b border-white/20">
            <img
              src={logoImg}
              className="md:w-20 w-10 rounded-full shadow-lg"
              alt="Logo"
            />
            <h2 className="text-lg font-bold text-gray-700 dark:text-gray-300 mt-2">
              StyleDecor
            </h2>
          </div>

          {/* MENU */}
          <ul className="menu px-4 py-4 space-y-3 text-gray-700 dark:text-gray-300 font-medium ">
            <SidebarItem
              to="/"
              icon={<AiOutlineHome size={22} />}
              text="Homepage"
            />

            {/* DECORATOR MENU */}
            {role === "decorator" && (
              <>
                <SidebarItem
                  to="/dashboard/my-profile"
                  icon={<ContactRound />}
                  text="My Profile"
                />
                <SidebarItem
                  to="/dashboard/today-shedule"
                  icon={<History />}
                  text="Today’s Schedule"
                />
                <SidebarItem
                  to="/dashboard/assigned-deliveries"
                  icon={<Album />}
                  text="Assigned Deliveries"
                />

                <SidebarItem
                  to="/dashboard/earings-summary"
                  icon={<BookOpenText />}
                  text="Earnings Summary"
                />
              </>
            )}

            {/* USER MENU */}
            {role === "user" && (
              <>
                <SidebarItem
                  to="/dashboard/my-profile"
                  icon={<ShieldUser />}
                  text="My Profile"
                />
                <SidebarItem
                  to="/dashboard/my-bookings"
                  icon={<Album />}
                  text="My Bookings"
                />
                <SidebarItem
                  to="/dashboard/payment-history"
                  icon={<History />}
                  text="Payment History"
                />
              </>
            )}

            {/* ADMIN MENU */}
            {role === "admin" && (
              <>
                <SidebarItem
                  to="/dashboard/admin-dashboard"
                  icon={<FaUserShield size={22} />}
                  text="Admin Dashboard"
                />
                <SidebarItem
                  to="/dashboard/all-users"
                  icon={<FaUserShield size={22} />}
                  text="All Users"
                />
                <SidebarItem
                  to="/dashboard/create-services"
                  icon={<LucidePencilRuler />}
                  text="Create Services"
                />
                <SidebarItem
                  to="/dashboard/create-decorator"
                  icon={<FiUserPlus size={22} />}
                  text="Create Decorator"
                />
                <SidebarItem
                  to="/dashboard/manage-bookings"
                  icon={<BookOpenText />}
                  text="Manage Bookings"
                />
                <SidebarItem
                  to="/dashboard/decorator-list"
                  icon={<FaListOl size={22} />}
                  text="Decorator List"
                />

                <SidebarItem
                  to="/dashboard/services-list"
                  icon={<BsCart4 size={22} />}
                  text="Services List"
                />
              </>
            )}

            {/* SETTINGS */}
            <li>
              <button
                className="
                flex items-center w-full gap-3 px-4 py-2 rounded-lg 
                transition-all duration-200 
                hover:bg-primary/10 hover:text-primary
                dark:hover:bg-primary/20
              "
              >
                <Settings />
                Settings
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

/* COMPONENT: Sidebar Item */
const SidebarItem = ({ to, icon, text }) => {
  const handleCloseDrawer = () => {
    const checkbox = document.getElementById("my-drawer-4");
    if (checkbox) checkbox.checked = false;
  };

  return (
    <li>
      <NavLink
        to={to}
        onClick={handleCloseDrawer}
        className={({ isActive }) =>
          `
          flex items-center gap-3 px-4 py-2 rounded-lg
          transition-all duration-200 
          hover:bg-primary/10 hover:text-primary
          dark:hover:bg-primary/20 
          ${
            isActive
              ? "bg-primary/20 text-primary shadow-sm dark:bg-primary/30"
              : ""
          }
          `
        }
      >
        {icon}
        {text}
      </NavLink>
    </li>
  );
};

export default DashboardLayout;
