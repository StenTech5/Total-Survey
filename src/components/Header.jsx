// import React from "react";
// import { Link } from "react-router-dom";
// import { FiMenu, FiSearch } from "react-icons/fi";
// import { FaUserCircle } from "react-icons/fa";
// import logo from "../assets/logo.png";

// export default function Header({
//   onOpenSidebar,
//   isCollapsed,
//   title = "Admin Dashboard",
// }) {
//   return (
//     <header className="flex items-center justify-between bg-white p-4 shadow">
//       <div className="flex items-center">
//         <button
//           className="md:hidden mr-4 focus:outline-none cursor-pointer"
//           onClick={onOpenSidebar}
//         >
//           <FiMenu size={24} />
//         </button>

//         {isCollapsed && (
//           <Link to="/" className="cursor-pointer">
//             <img
//               src={logo}
//               alt="TOTALSURVEY Logo"
//               className="h-8 mr-4 object-contain"
//             />
//           </Link>
//         )}

//         <h1 className="text-xl font-semibold">{title}</h1>
//       </div>

//       <div className="flex-1 flex justify-center px-4">
//         <div className="relative w-full max-w-sm">
//           <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
//           <input
//             type="text"
//             placeholder="Search..."
//             className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring focus:border-indigo-300"
//           />
//         </div>
//       </div>

//       <div className="flex items-center">
//         <FaUserCircle className="text-2xl text-gray-600 cursor-pointer" />
//         <span className="absolute bottom-0 right-0 block h-2 w-2 bg-green-500 rounded-full ring-2 ring-white" />
//       </div>
//     </header>
// );
// }
import React from "react";
import { Link } from "react-router-dom";
import { FiMenu, FiSearch } from "react-icons/fi";
import { FaUserCircle } from "react-icons/fa";
import logo from "../assets/logo.png";

export default function Header({
  onOpenSidebar,
  isCollapsed,
  title = "Admin Dashboard",
}) {
  return (
    <header className="flex items-center justify-between bg-white p-4 shadow">
      <div className="flex items-center">
        <button
          className="md:hidden mr-4 focus:outline-none cursor-pointer"
          onClick={onOpenSidebar}
        >
          <FiMenu size={24} />
        </button>

        {isCollapsed && (
          <Link to="/" className="cursor-pointer">
            <img
              src={logo}
              alt="TOTALSURVEY Logo"
              className="h-8 mr-4 object-contain"
            />
          </Link>
        )}

        <h1 className="text-xl font-semibold">{title}</h1>
      </div>

      <div className="flex-1 flex justify-center px-4">
        <div className="relative w-full max-w-sm">
          <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring focus:border-indigo-300"
          />
        </div>
      </div>

      <div className="flex items-center">
        <div className="relative">
          <FaUserCircle className="text-2xl text-gray-600 cursor-pointer" />
          <span className="absolute bottom-0 right-0 block h-2 w-2 bg-green-500 rounded-full ring-2 ring-white" />
        </div>
      </div>
    </header>
  );
}
