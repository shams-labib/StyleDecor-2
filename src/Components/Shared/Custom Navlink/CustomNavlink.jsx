import { NavLink } from "react-router";

const CustomNavLink = ({ to, children, onClick }) => {
  return (
    <NavLink
      to={to}
      onClick={onClick}
      className={({ isActive }) =>
        `block px-4 py-2 rounded-lg border transition-all duration-200
         ${
           isActive
             ? "bg-primary text-white border-primary"
             : "bg-white text-gray-800 border-gray-300"
         }
         hover:bg-primary hover:text-white hover:border-primary
         shadow-sm hover:shadow-md`
      }
    >
      {children}
    </NavLink>
  );
};

export default CustomNavLink;
