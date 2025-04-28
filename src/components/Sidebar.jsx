// import React from "react";
// import { Link, NavLink } from "react-router-dom";
// import {
//   FiMenu,
//   FiLogOut,
//   FiChevronLeft,
//   FiChevronRight,
//   FiBell,
//   FiBarChart2,
// } from "react-icons/fi";
// import { AiOutlinePlusCircle } from "react-icons/ai";
// import { FaChartLine, FaCog, FaUsers } from "react-icons/fa";
// import logo from "../assets/logo.png";

// const menuItems = [
//   { label: "Notifications", icon: <FiBell />, color: "text-red-400", to: "/notifications" },
//   { label: "Assessment",    icon: <AiOutlinePlusCircle />, color: "text-indigo-400", to: "/assessment" },
//   { label: "Publish Survey",icon: <FaChartLine />, color: "text-blue-400", to: "/publish-survey" },
//   { label: "Templates",     icon: <FaCog />, color: "text-yellow-400", to: "/templates" },
//   { label: "Reports",       icon: <FiBarChart2 />, color: "text-green-400", to: "/reports" },
//   { label: "Analytics",     icon: <FaChartLine />, color: "text-pink-400", to: "/analytics" },
//   { label: "Users",         icon: <FaUsers />, color: "text-purple-400", to: "/users" },
//   { label: "Help",          icon: <FaCog />, color: "text-teal-400", to: "/help" },
// ];

// export default function Sidebar({
//   isOpen,
//   isCollapsed,
//   onClose,
//   onToggleCollapse,
// }) {
//   return (
//     <aside
//       className={`fixed inset-y-0 left-0 z-20 bg-gray-800 text-white transform
//         ${isOpen ? "translate-x-0" : "-translate-x-full"}
//         md:translate-x-0 md:static md:flex-shrink-0
//         transition-transform duration-200 ease-in-out
//         ${isCollapsed ? "w-20" : "w-64"}`}
//     >
//       {/* Brand & Toggles */}
//       <div className="flex items-center justify-between p-4 border-b border-gray-700">
//         {!isCollapsed && (
//           <Link to="/" className="cursor-pointer">
//             <img
//               src={logo}
//               alt="TOTALSURVEY Logo"
//               className="h-8 object-contain"
//             />
//           </Link>
//         )}
//         <div className="flex items-center space-x-2">
//           <button
//             className="md:hidden focus:outline-none cursor-pointer"
//             onClick={onClose}
//           >
//             <FiMenu size={24} />
//           </button>
//           <button
//             className="hidden md:inline-flex focus:outline-none cursor-pointer"
//             onClick={onToggleCollapse}
//           >
//             {isCollapsed ? (
//               <FiChevronRight size={20} />
//             ) : (
//               <FiChevronLeft size={20} />
//             )}
//           </button>
//         </div>
//       </div>

//       {/* Navigation */}
//       <nav className="mt-6 flex flex-col px-2 space-y-2">
//         {menuItems.map(({ label, icon, color, to }) => (
//           <NavLink
//             key={label}
//             to={to}
//             className={({ isActive }) =>
//               `group flex items-center w-full rounded px-3 py-2 transition-colors cursor-pointer
//                ${isActive ? "bg-gray-700" : "hover:bg-gray-700"}`
//             }
//           >
//             <span className={`${color} text-xl flex-shrink-0`}>
//               {icon}
//             </span>
//             <span
//               className={`
//                 ml-3 whitespace-nowrap inline-block
//                 ${isCollapsed ? "md:hidden" : ""}
//               `}
//             >
//               {label}
//             </span>
//             {isCollapsed && (
//               <div className="absolute left-full top-1/2 transform -translate-y-1/2 ml-2 bg-gray-900 text-white text-xs rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity duration-150">
//                 {label}
//               </div>
//             )}
//           </NavLink>
//         ))}
//       </nav>

//       <hr className="my-4 border-gray-700" />

//       {/* Logout */}
//       <div className="mb-6 px-2">
//         <div className="group relative">
//           <button
//             className="w-full flex items-center text-red-400 hover:bg-gray-700 px-3 py-2 rounded transition-colors cursor-pointer"
//             onClick={() => alert("Logging out...")}
//           >
//             <FiLogOut className="text-xl flex-shrink-0" />
//             <span
//               className={`ml-3 whitespace-nowrap ${
//                 isCollapsed ? "hidden" : "inline-block"
//               }`}
//             >
//               Logout
//             </span>
//           </button>
//           {isCollapsed && (
//             <div className="absolute left-full top-1/2 transform -translate-y-1/2 ml-2 bg-gray-900 text-white text-xs rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity duration-150">
//               Logout
//             </div>
//           )}
//         </div>
//       </div>
//     </aside>
//   );
// }
import React from "react";
import { Link, NavLink } from "react-router-dom";
import {
  FiMenu,
  FiLogOut,
  FiChevronLeft,
  FiChevronRight,
  FiBell,
  FiBarChart2,
} from "react-icons/fi";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { FaChartLine, FaCog, FaUsers } from "react-icons/fa";
import logo from "../assets/logo.png";

const menuItems = [
  { label: "Notifications", icon: <FiBell />, color: "text-red-400", to: "/notifications" },
  { label: "Assessment",    icon: <AiOutlinePlusCircle />, color: "text-indigo-400", to: "/assessment" },
  { label: "Publish Survey",icon: <FaChartLine />, color: "text-blue-400", to: "/publish-survey" },
  { label: "Templates",     icon: <FaCog />, color: "text-yellow-400", to: "/templates" },
  { label: "Reports",       icon: <FiBarChart2 />, color: "text-green-400", to: "/reports" },
  { label: "Analytics",     icon: <FaChartLine />, color: "text-pink-400", to: "/analytics" },
  { label: "Users",         icon: <FaUsers />, color: "text-purple-400", to: "/users" },
  { label: "Help",          icon: <FaCog />, color: "text-teal-400", to: "/help" },
];

export default function Sidebar({
  isOpen,
  isCollapsed,
  onClose,
  onToggleCollapse,
  notificationsCount = 0,
}) {
  return (
    <aside
      className={`fixed inset-y-0 left-0 z-20 bg-gray-800 text-white transform
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
        md:translate-x-0 md:static md:flex-shrink-0
        transition-transform duration-200 ease-in-out
        ${isCollapsed ? "w-20" : "w-64"}`}
    >
      {/* Brand & Toggles */}
      <div className="flex items-center justify-between p-4 border-b border-gray-700">
        {!isCollapsed && (
          <Link to="/" className="cursor-pointer">
            <img src={logo} alt="TOTALSURVEY Logo" className="h-8 object-contain" />
          </Link>
        )}
        <div className="flex items-center space-x-2">
          <button
            className="md:hidden focus:outline-none cursor-pointer"
            onClick={onClose}
          >
            <FiMenu size={24} />
          </button>
          <button
            className="hidden md:inline-flex focus:outline-none cursor-pointer"
            onClick={onToggleCollapse}
          >
            {isCollapsed ? <FiChevronRight size={20} /> : <FiChevronLeft size={20} />}
          </button>
        </div>
      </div>

      {/* Navigation */}
      <nav className="mt-6 flex flex-col px-2 space-y-2">
        {menuItems.map(({ label, icon, color, to }) => (
          <NavLink
            key={label}
            to={to}
            className={({ isActive }) =>
              `relative group flex items-center w-full rounded px-3 py-2 transition-colors cursor-pointer
               ${isActive ? "bg-gray-700" : "hover:bg-gray-700"}`
            }
          >
            <span className={`${color} text-xl flex-shrink-0`}>{icon}</span>
            <span
              className={`ml-3 whitespace-nowrap inline-block
                ${isCollapsed ? "md:hidden" : ""}`}
            >
              {label}
            </span>
            {isCollapsed && (
              <div className="absolute left-full top-1/2 transform -translate-y-1/2 ml-2 bg-gray-900 text-white text-xs rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity duration-150">
                {label}
              </div>
            )}
          </NavLink>
        ))}
      </nav>

      <hr className="my-4 border-gray-700" />

      {/* Logout */}
      <div className="mb-6 px-2">
        <div className="group relative">
          <button
            className="w-full flex items-center text-red-400 hover:bg-gray-700 px-3 py-2 rounded transition-colors cursor-pointer"
            onClick={() => alert("Logging out...")}
          >
            <FiLogOut className="text-xl flex-shrink-0" />
            <span className={`ml-3 whitespace-nowrap ${isCollapsed ? "hidden" : "inline-block"}`}>
              Logout
            </span>
          </button>
          {isCollapsed && (
            <div className="absolute left-full top-1/2 transform -translate-y-1/2 ml-2 bg-gray-900 text-white text-xs rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity duration-150">
              Logout
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}
