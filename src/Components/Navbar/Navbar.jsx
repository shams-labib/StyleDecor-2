import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router";
import ThemeToggle from "../Shared/Theme/Theme";
import CustomNavLink from "../Shared/Custom Navlink/CustomNavlink";
import Logo from "../Shared/Logo/Logo";
import useAuth from "../../Hooks/useAuth";
import Swal from "sweetalert2";
import { HiOutlineViewList } from "react-icons/hi";
import { motion, AnimatePresence } from "framer-motion";
import {
  Home,
  Layers,
  Info,
  Phone,
  LayoutDashboard,
  LogOut,
  X,
  Menu,
  Globe,
} from "lucide-react";

const Navbar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { user, logOutUser } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSignOut = () => {
    logOutUser()
      .then(() => {
        navigate("/");
        Swal.fire({
          title: "Logged Out",
          text: "See you soon, buddy!",
          icon: "success",
          timer: 1500,
          showConfirmButton: false,
        });
      })
      .catch((err) => console.log(err));
  };

  const links = (
    <>
      {[
        { to: "/", icon: <Home size={18} />, label: "Home" },
        { to: "/services", icon: <Layers size={18} />, label: "Services" },
        { to: "/about", icon: <Info size={18} />, label: "About Us" },
        { to: "/contact", icon: <Phone size={18} />, label: "Contact" },
        { to: "/coveragePage", icon: <Globe size={18} />, label: "Coverage" },
      ].map((link) => (
        <li key={link.to}>
          <CustomNavLink to={link.to} onClick={() => setDrawerOpen(false)}>
            <motion.div
              className="flex items-center gap-2 font-medium"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {link.icon}
              <span>{link.label}</span>
            </motion.div>
          </CustomNavLink>
        </li>
      ))}
      {user && (
        <li>
          <CustomNavLink to="/dashboard" onClick={() => setDrawerOpen(false)}>
            <div className="flex items-center gap-2 font-medium">
              <LayoutDashboard size={18} />
              <span>Dashboard</span>
            </div>
          </CustomNavLink>
        </li>
      )}
    </>
  );

  return (
    <>
      <nav className="sticky top-0 z-50 w-full bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-100 dark:border-gray-800 transition-colors duration-300">
        <div className="navbar container mx-auto px-4 py-3">
          <div className="navbar-start">
            <button
              className="p-2 mr-2 lg:hidden text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition-colors"
              onClick={() => setDrawerOpen(true)}
            >
              <Menu size={24} />
            </button>
            <Logo />
          </div>

          <div className="navbar-center hidden lg:flex">
            <ul className="flex items-center gap-8">{links}</ul>
          </div>

          <div className="navbar-end gap-4">
            <div className="hidden md:flex">
              <ThemeToggle />
            </div>

            {user ? (
              <div className="relative" ref={dropdownRef}>
                <motion.div
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center gap-2 p-1.5 pl-3 border border-blue-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 rounded-full cursor-pointer hover:shadow-md transition-all"
                >
                  <span className="hidden sm:block text-xs font-bold text-gray-700 dark:text-gray-200">
                    Menu
                  </span>
                  <div className="relative">
                    <img
                      src={user.photoURL || "/default-user.png"}
                      alt="Profile"
                      className="w-8 h-8 rounded-full ring-2 ring-blue-500 ring-offset-2 dark:ring-offset-gray-900 shadow-sm"
                    />
                  </div>
                </motion.div>

                <AnimatePresence>
                  {dropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      className="absolute right-0 mt-3 w-64 bg-white dark:bg-gray-800 shadow-2xl rounded-2xl border border-gray-100 dark:border-gray-700 py-2 z-50 overflow-hidden"
                    >
                      <div className="px-4 py-3 border-b border-gray-50 dark:border-gray-700 mb-1">
                        <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                          Account
                        </p>
                        <p className="text-sm font-bold text-gray-800 dark:text-gray-100 truncate">
                          {user.displayName || "Anonymous User"}
                        </p>
                      </div>

                      <Link
                        to="/dashboard"
                        onClick={() => setDropdownOpen(false)}
                        className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-gray-700/50 transition-colors font-semibold"
                      >
                        <LayoutDashboard size={18} className="text-blue-500" />
                        Dashboard
                      </Link>

                      <button
                        onClick={handleSignOut}
                        className="flex w-full items-center gap-3 px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors font-semibold"
                      >
                        <LogOut size={18} />
                        Sign Out
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <Link to="/login">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-full font-bold shadow-lg shadow-blue-200 dark:shadow-none transition-all text-sm"
                >
                  Log In
                </motion.button>
              </Link>
            )}
          </div>
        </div>
      </nav>

      {/* Drawer Overlay */}
      <AnimatePresence>
        {drawerOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[60]"
              onClick={() => setDrawerOpen(false)}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-72 bg-white dark:bg-gray-900 shadow-2xl z-[70] p-6"
            >
              <div className="flex items-center justify-between mb-8">
                <Logo />
                <button
                  onClick={() => setDrawerOpen(false)}
                  className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                >
                  <X size={20} className="text-gray-500" />
                </button>
              </div>
              <div className="mb-6 px-2">
                <ThemeToggle />
              </div>
              <ul className="space-y-4">{links}</ul>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
