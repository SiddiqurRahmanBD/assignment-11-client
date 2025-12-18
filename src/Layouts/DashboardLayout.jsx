import React, { useContext } from "react";
import {
  CircleUserRound,
  GitPullRequest,
  GitPullRequestClosed,
  NotebookPenIcon,
  Users,
  Home,
  Menu,
  LayoutDashboard,
  Heart,
} from "lucide-react";
import { Link, NavLink, Outlet } from "react-router";
import { AuthContext } from "../Provider/AuthContext";

const DashboardLayout = () => {
  const { role } = useContext(AuthContext);

  // Reusable NavLink styling for a gorgeous active state
  const navLinkStyles = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-3 rounded-2xl font-bold transition-all duration-300 ${
      isActive
        ? "bg-red-600 text-white shadow-lg shadow-red-200"
        : "text-slate-600 hover:bg-red-50 hover:text-red-600"
    }`;

  return (
    <div className="drawer lg:drawer-open bg-[#FDFEFF]">
      <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />

      <div className="drawer-content flex flex-col h-screen overflow-hidden">
        {/* Modern Top Navbar */}
        <header className="h-20 flex items-center justify-between px-6 bg-white/80 backdrop-blur-md border-b border-slate-100 z-10">
          <div className="flex items-center gap-4">
            <label
              htmlFor="my-drawer-4"
              className="p-2 hover:bg-slate-100 rounded-xl lg:hidden cursor-pointer transition-colors"
            >
              <Menu className="text-slate-600" />
            </label>
            <div className="hidden md:block">
              <h2 className="text-xl font-black text-slate-800 tracking-tight">
                SaveLife <span className="text-red-600">Portal</span>
              </h2>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest leading-none mt-1">
                {role} Dashboard
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="bg-red-50 text-red-600 text-xs font-black px-3 py-1.5 rounded-full uppercase tracking-wider">
              Status: Active
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto bg-slate-50/50 p-4 md:p-8">
          <div className="max-w-6xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>

      {/* Sidebar */}
      <div className="drawer-side z-20">
        <label htmlFor="my-drawer-4" className="drawer-overlay"></label>

        <aside className="w-72 min-h-full bg-white border-r border-slate-100 p-6 flex flex-col shadow-2xl lg:shadow-none">
          {/* Logo Area */}
          <div className="flex items-center gap-3 mb-10 px-2">
            <div className="p-2 bg-red-600 rounded-xl shadow-lg shadow-red-200">
              <Heart className="text-white w-6 h-6 fill-white" />
            </div>
            <span className="text-2xl font-black text-slate-900 tracking-tight">
              SaveLife
            </span>
          </div>

          <nav className="flex-1 space-y-2">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4 ml-4">
              Main Menu
            </p>

            <NavLink
              to="/"
              className="flex items-center gap-3 px-4 py-3 rounded-2xl font-bold text-slate-600 hover:bg-slate-100 transition-all"
            >
              <Home size={20} />
              <span>Back to Home</span>
            </NavLink>

            <NavLink to="/dashboard/profile" className={navLinkStyles}>
              <CircleUserRound size={20} />
              <span>My Profile</span>
            </NavLink>

            <div className="h-px bg-slate-100 my-6 mx-4" />

            <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4 ml-4">
              Management
            </p>

            {/* Donor Role Links */}
            {(role === "Donor" || role === "donor") && (
              <>
                <NavLink
                  to="/dashboard/my-donation-requests"
                  className={navLinkStyles}
                >
                  <GitPullRequest size={20} />
                  <span>My Requests</span>
                </NavLink>

                <NavLink
                  to="/dashboard/create-donation-request"
                  className={navLinkStyles}
                >
                  <NotebookPenIcon size={20} />
                  <span>New Request</span>
                </NavLink>
              </>
            )}

            {/* Admin Role Links */}
            {(role === "Admin" || role === "admin") && (
              <>
                <NavLink to="/dashboard/all-users" className={navLinkStyles}>
                  <Users size={20} />
                  <span>User Directory</span>
                </NavLink>
                <NavLink
                  to="/dashboard/all-blood-donation-request"
                  className={navLinkStyles}
                >
                  <GitPullRequestClosed size={20} />
                  <span>Global Requests</span>
                </NavLink>
              </>
            )}

            {/* Volunteer Role Links */}
            {(role === "Volunteer" || role === "volunteer") && (
              <NavLink
                to="/dashboard/all-blood-donation-request"
                className={navLinkStyles}
              >
                <GitPullRequestClosed size={20} />
                <span>Pending Requests</span>
              </NavLink>
            )}
          </nav>

          {/* Sidebar Footer */}
          <div className="mt-auto pt-6 border-t border-slate-50">
            <div className="bg-slate-50 p-4 rounded-[2rem] flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-red-100 flex items-center justify-center text-red-600">
                <LayoutDashboard size={20} />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-500 uppercase tracking-tighter">
                  SaveLife v1.0
                </p>
                <p className="text-[10px] text-slate-400">© 2025 Platform</p>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default DashboardLayout;
