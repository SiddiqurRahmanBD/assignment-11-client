import React, { useContext } from "react";
import logo from "../../assets/blood-logo.png";
import { toast } from "react-toastify";
import { useNavigate, NavLink, Link } from "react-router";
import {
  Home,
  SearchIcon,
  Heart,
  LayoutDashboard,
  LogOut,
  Menu,
} from "lucide-react";
import { BiDonateBlood } from "react-icons/bi";
import { AuthContext } from "../../Provider/AuthContext";

const Navbar = () => {
  const navigate = useNavigate();
  const { user, logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout()
      .then(() => {
        navigate("/");
        toast.success("Logged Out successfully");
      })
      .catch((err) => console.log(err));
  };

  const navLinks = (
    <>
      <li>
        <NavLink
          to="/"
          className={({ isActive }) =>
            `flex items-center gap-2 font-bold px-4 py-2 rounded-xl transition-all ${
              isActive
                ? "bg-red-50 text-red-600 shadow-sm"
                : "hover:bg-red-50 hover:text-red-600"
            }`
          }
        >
          <Home size={18} /> Home
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/search-page"
          className={({ isActive }) =>
            `flex items-center gap-2 font-bold px-4 py-2 rounded-xl transition-all ${
              isActive
                ? "bg-red-50 text-red-600 shadow-sm"
                : "hover:bg-red-50 hover:text-red-600"
            }`
          }
        >
          <SearchIcon size={18} /> Search
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/donation-requests"
          className={({ isActive }) =>
            `flex items-center gap-2 font-bold px-4 py-2 rounded-xl transition-all ${
              isActive
                ? "bg-red-50 text-red-600 shadow-sm"
                : "hover:bg-red-50 hover:text-red-600"
            }`
          }
        >
          <BiDonateBlood size={20} /> Requests
        </NavLink>
      </li>
      {/* Changed 'Available Foods' to 'Donation Camps' for consistency */}
      {/* <li>
        <NavLink
          to="/donation-camps"
          className={({ isActive }) =>
            `flex items-center gap-2 font-bold px-4 py-2 rounded-xl transition-all ${
              isActive
                ? "bg-red-50 text-red-600 shadow-sm"
                : "hover:bg-red-50 hover:text-red-600"
            }`
          }
        >
          <Heart size={18} /> Camps
        </NavLink>
      </li> */}
    </>
  );

  return (
    <div className="sticky top-0 z-[1000] w-full bg-white/70 backdrop-blur-lg border-b border-red-50 shadow-sm">
      <div className="navbar max-w-7xl mx-auto py-3">
        {/* Navbar Start */}
        <div className="navbar-start">
          <div className="dropdown">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost lg:hidden p-2 text-red-600"
            >
              <Menu size={28} />
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-4 shadow-2xl bg-white rounded-[2rem] w-64 border border-red-50 gap-2"
            >
              {navLinks}
            </ul>
          </div>

          <Link to="/" className="flex items-center gap-1 group">
            <div className="relative">
              <img
                src={logo}
                className="h-12 w-12 md:h-14 md:w-14 object-contain group-hover:scale-110 transition-transform duration-300"
                alt="SaveLife Logo"
              />
              <div className="absolute inset-0 bg-red-500/10 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </div>
            <h1 className="text-2xl md:text-3xl font-black text-slate-800">
              Save<span className="text-red-600">Life</span>
            </h1>
          </Link>
        </div>

        {/* Navbar Center (Desktop) */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal gap-2">{navLinks}</ul>
        </div>

        {/* Navbar End */}
        <div className="navbar-end gap-3">
          {user ? (
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="p-1 border-2 border-red-100 rounded-full hover:border-red-500 transition-all shadow-sm"
              >
                <div className="w-10 h-10 rounded-full overflow-hidden">
                  <img
                    src={user.photoURL}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="menu dropdown-content mt-4 z-[1] p-4 shadow-2xl bg-white rounded-3xl w-64 border border-red-50"
              >
                <div className="px-4 py-3 mb-2 border-b border-slate-50">
                  <p className="font-black text-slate-800 text-lg truncate">
                    {user.displayName}
                  </p>
                  <p className="text-xs font-bold text-red-500 truncate">
                    {user.email}
                  </p>
                </div>
                <li>
                  <NavLink
                    to="/dashboard"
                    className="flex items-center gap-2 py-3 hover:bg-red-50 rounded-xl"
                  >
                    <LayoutDashboard size={18} /> Dashboard
                  </NavLink>
                </li>
                <li>
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 py-3 mt-2 bg-red-600 text-white hover:bg-red-700 rounded-xl shadow-lg shadow-red-200"
                  >
                    <LogOut size={18} /> Logout
                  </button>
                </li>
              </ul>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link
                to="/auth/login"
                className="hidden sm:flex btn btn-ghost text-red-600 font-bold hover:bg-red-50 rounded-xl px-6"
              >
                Login
              </Link>
              <Link
                to="/auth/register"
                className="btn bg-red-600 hover:bg-red-700 border-none text-white font-bold rounded-xl px-6 shadow-lg shadow-red-200 transition-all hover:-translate-y-0.5"
              >
                Join Now
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
