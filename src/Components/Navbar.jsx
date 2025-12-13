import React, { useContext } from "react";
import logo from "../assets/blood-logo.png";

import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import { NavLink } from "react-router";
import { AuthContext } from "../Provider/AuthContext";
import { Home, SearchIcon } from "lucide-react";
import { GiBlood } from "react-icons/gi";
import { BiDonateBlood } from "react-icons/bi";

const Navbar = () => {
  const navigate = useNavigate();
  const { user, logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout()
      .then(() => {
        navigate("/");
        toast.success("Logged Out successfully");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="navbar bg-base-300 shadow-sm">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>

          <ul
            tabIndex="-1"
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            <li>
              <NavLink to="/">Home</NavLink>
            </li>
            <li>
              <NavLink to="/available-foods">Available Foods</NavLink>
            </li>
          </ul>
        </div>

        <img src={logo} className="h-20 w-20" alt="" />
        <h1 className=" text-[#9f0707dc] text-2xl font-bold font-serif">
          Save<span className="text-orange-400">Life</span>
        </h1>
      </div>

      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal text-lg font-semibold px-1">
          <li>
            <NavLink to="/" className="hover:text-[#700404]">
              <Home /> Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/search-page" className="hover:text-[#700404]">
              {" "}
              <SearchIcon /> Search{" "}
            </NavLink>
          </li>
          <li>
            <NavLink to="/donation-requests" className="hover:text-[#700404]">
              <BiDonateBlood /> Blood Donation requests
            </NavLink>
          </li>
        </ul>
      </div>

      <div className="navbar-end">
        {user ? (
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className=" w-30 rounded-full">
                <img className="" src={user.photoURL} alt="" />
              </div>
            </div>
            <ul
              tabIndex="-1"
              className="menu menu-md dropdown-content bg-base-100 rounded-box z-50! mt-3 w-52 p-2 shadow"
            >
              {user && (
                <div className="">
                  <div className="text-center">
                    <h3 className="font-semibold text-xl">
                      {user.displayName}
                    </h3>
                    <p className="text-red-600">{user.email}</p>
                  </div>
                  <li>
                    <NavLink to="/add-food">Dashboard</NavLink>
                  </li>
                  <li>
                    <NavLink to="/manage-my-foods">Manage My Foods</NavLink>
                  </li>
                  <li>
                    <NavLink to="/my-food-requests">My Food Requests</NavLink>
                  </li>
                </div>
              )}
              <li className="pt-3">
                <button
                  onClick={handleLogout}
                  className=" btn btn-primary text-white hover:bg-yellow-300 hover:text-black"
                >
                  Logout
                </button>
              </li>
            </ul>
          </div>
        ) : (
          <div className="flex">
            <NavLink to="/auth/login" className="btn btn-primary text-white">
              Login
            </NavLink>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
